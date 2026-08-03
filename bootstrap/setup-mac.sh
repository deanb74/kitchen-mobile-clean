#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
ENV_FILE="${BOOTSTRAP_ENV_FILE:-${REPO_ROOT}/.env}"

PASSES=()
WARNINGS=()
BLOCKERS=()

add_pass() {
  PASSES+=("$1")
}

add_warning() {
  WARNINGS+=("$1")
}

add_blocker() {
  BLOCKERS+=("$1")
}

print_report() {
  echo
  echo "========================"
  echo "Mac Setup Bootstrap"
  echo "========================"

  if [[ ${#PASSES[@]} -gt 0 ]]; then
    echo "PASS"
    for item in "${PASSES[@]}"; do
      echo "  - ${item}"
    done
  fi

  if [[ ${#WARNINGS[@]} -gt 0 ]]; then
    echo
    echo "WARN"
    for item in "${WARNINGS[@]}"; do
      echo "  - ${item}"
    done
  fi

  if [[ ${#BLOCKERS[@]} -gt 0 ]]; then
    echo
    echo "BLOCKERS"
    for item in "${BLOCKERS[@]}"; do
      echo "  - ${item}"
    done
    exit 1
  fi

  echo
  echo "READY"
  echo "Install bootstrap completed successfully."
}

validate_api_base_url() {
  local url="$1"

  if [[ -z "$url" ]]; then
    add_blocker "EXPO_PUBLIC_API_BASE_URL is empty in ${REPO_ROOT}/.env."
    return
  fi

  if [[ "$url" == *"<development-host>"* ]]; then
    add_blocker "EXPO_PUBLIC_API_BASE_URL still contains placeholder <development-host>."
    return
  fi

  if [[ ! "$url" =~ ^https?://[^[:space:]]+$ ]]; then
    add_blocker "EXPO_PUBLIC_API_BASE_URL must be a valid http:// or https:// URL."
    return
  fi

  add_pass "EXPO_PUBLIC_API_BASE_URL is configured and syntactically valid."
}

extract_env_value() {
  local key="$1"
  local file_path="$2"
  local line

  line="$(grep -E "^[[:space:]]*${key}[[:space:]]*=" "$file_path" | tail -n 1 || true)"
  if [[ -z "$line" ]]; then
    return 1
  fi

  local raw="${line#*=}"
  raw="${raw#${raw%%[![:space:]]*}}"
  raw="${raw%${raw##*[![:space:]]}}"

  if [[ "${raw:0:1}" == '"' && "${raw: -1}" == '"' ]]; then
    raw="${raw:1:${#raw}-2}"
  elif [[ "${raw:0:1}" == "'" && "${raw: -1}" == "'" ]]; then
    raw="${raw:1:${#raw}-2}"
  fi

  printf '%s' "$raw"
}

ensure_zsh_nvm_profile() {
  local zshrc_path="$HOME/.zshrc"
  local begin_marker="# BEGIN kitchen-mobile-clean bootstrap nvm"
  local end_marker="# END kitchen-mobile-clean bootstrap nvm"
  local nvm_init_line="[ -s \"${BREW_PREFIX}/opt/nvm/nvm.sh\" ] && . \"${BREW_PREFIX}/opt/nvm/nvm.sh\" --no-use"

  mkdir -p "$(dirname "$zshrc_path")"

  if [[ -f "$zshrc_path" ]] && grep -Fq "$begin_marker" "$zshrc_path"; then
    return 0
  fi

  {
    echo
    echo "$begin_marker"
    echo "export NVM_DIR=\"$HOME/.nvm\""
    echo "$nvm_init_line"
    echo "$end_marker"
  } >> "$zshrc_path"
}

echo "Starting Mac bootstrap from ${REPO_ROOT}"

if [[ ! -f "${REPO_ROOT}/package.json" || ! -f "${REPO_ROOT}/app.json" ]]; then
  add_blocker "Run this script from repository root where package.json and app.json are present."
  print_report
fi

if [[ "$(uname -s)" != "Darwin" ]]; then
  add_blocker "This setup supports macOS only."
fi

machine_arch="$(uname -m)"
arm64_capable="$(sysctl -in hw.optional.arm64 2>/dev/null || echo 0)"
allow_non_arm64="${BOOTSTRAP_ALLOW_NON_ARM64:-0}"

if [[ "$machine_arch" == "arm64" ]]; then
  add_pass "Host architecture is arm64."
elif [[ "$allow_non_arm64" == "1" ]]; then
  add_warning "Non-arm64 host override enabled with BOOTSTRAP_ALLOW_NON_ARM64=1. This mode is for controlled verification only."
elif [[ "$arm64_capable" == "1" ]]; then
  add_blocker "Current shell reports ${machine_arch} on an arm64-capable host. Re-run from a native arm64 shell or set BOOTSTRAP_ALLOW_NON_ARM64=1 for verification only."
else
  add_blocker "This setup supports Apple Silicon arm64 hosts only."
fi

if ! command -v brew >/dev/null 2>&1; then
  add_blocker "Homebrew is required but not found. Install Homebrew, then rerun."
fi

if [[ ${#BLOCKERS[@]} -gt 0 ]]; then
  print_report
fi

BREWFILE_PATH="${REPO_ROOT}/bootstrap/Brewfile"
if [[ ! -f "$BREWFILE_PATH" ]]; then
  add_blocker "Missing bootstrap/Brewfile."
  print_report
fi

echo
echo "Installing approved Homebrew tools from ${BREWFILE_PATH}"
brew bundle --file "$BREWFILE_PATH" --no-upgrade
add_pass "Approved Homebrew tools are installed."

if [[ -d "/Applications/Visual Studio Code.app" ]]; then
  add_pass "Visual Studio Code is installed."
else
  echo
  echo "Installing Visual Studio Code"
  brew install --cask visual-studio-code

  if [[ -d "/Applications/Visual Studio Code.app" ]]; then
    add_pass "Visual Studio Code is installed."
  else
    add_warning "Visual Studio Code app was not found in /Applications after installation attempt."
  fi
fi

if [[ ! -f "${REPO_ROOT}/.nvmrc" ]]; then
  add_blocker "Missing .nvmrc Node version policy file."
  print_report
fi

NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
mkdir -p "$NVM_DIR"

BREW_PREFIX="$(brew --prefix)"
NVM_SH="${BREW_PREFIX}/opt/nvm/nvm.sh"

if [[ ! -f "$NVM_SH" ]]; then
  add_blocker "nvm.sh not found at ${NVM_SH}. Ensure brew installed nvm."
  print_report
fi

# shellcheck source=/dev/null
if ! source "$NVM_SH" --no-use; then
  add_blocker "NVM failed to load from ${NVM_SH} with --no-use."
  print_report
fi

if ! declare -F nvm >/dev/null 2>&1; then
  add_blocker "NVM did not define the nvm function after sourcing ${NVM_SH}."
  print_report
fi

ensure_zsh_nvm_profile

NODE_VERSION="$(tr -d '[:space:]' < "${REPO_ROOT}/.nvmrc")"
if [[ -z "$NODE_VERSION" ]]; then
  add_blocker ".nvmrc is empty."
  print_report
fi

echo
echo "Installing governed Node version ${NODE_VERSION}"
nvm install "$NODE_VERSION"
nvm use "$NODE_VERSION"
add_pass "Governed Node version ${NODE_VERSION} is active."

if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1 || ! command -v npx >/dev/null 2>&1; then
  add_blocker "node/npm/npx are not all available after nvm setup."
  print_report
fi
add_pass "node/npm/npx are available in PATH."

if [[ -f "${REPO_ROOT}/package-lock.json" ]]; then
  echo
  echo "Installing dependencies from lockfile with npm ci"
  npm ci
  add_pass "Dependencies installed deterministically with npm ci."
else
  add_blocker "package-lock.json not found; deterministic npm ci install cannot proceed."
  print_report
fi

if [[ ! -f "$ENV_FILE" ]]; then
  add_blocker ".env is missing. Copy .env.example to .env and set EXPO_PUBLIC_API_BASE_URL before rerunning."
  print_report
fi

if api_base_url="$(extract_env_value "EXPO_PUBLIC_API_BASE_URL" "$ENV_FILE")"; then
  validate_api_base_url "$api_base_url"
else
  add_blocker "EXPO_PUBLIC_API_BASE_URL is missing from ${ENV_FILE}."
fi

if ! command -v git >/dev/null 2>&1; then
  add_blocker "git is required but not available."
fi

if ! command -v gh >/dev/null 2>&1; then
  add_blocker "GitHub CLI (gh) is required but not available."
fi

if [[ ${#BLOCKERS[@]} -gt 0 ]]; then
  print_report
fi

echo
echo "Running repository verification checks"
"${REPO_ROOT}/bootstrap/verify-install.sh"
add_pass "Repository verification checks passed."

print_report