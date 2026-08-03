#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

ENV_FILE="${BOOTSTRAP_ENV_FILE:-${REPO_ROOT}/.env}"
SKIP_TYPECHECK="${BOOTSTRAP_SKIP_TYPECHECK:-0}"
SKIP_TESTS="${BOOTSTRAP_SKIP_TESTS:-0}"
SKIP_REPRESENTATIVE_SCRIPTS="${BOOTSTRAP_SKIP_REPRESENTATIVE_SCRIPTS:-0}"

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

trim() {
  local value="$1"
  value="${value#${value%%[![:space:]]*}}"
  value="${value%${value##*[![:space:]]}}"
  printf '%s' "$value"
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
  raw="$(trim "$raw")"

  if [[ "${raw:0:1}" == '"' && "${raw: -1}" == '"' ]]; then
    raw="${raw:1:${#raw}-2}"
  elif [[ "${raw:0:1}" == "'" && "${raw: -1}" == "'" ]]; then
    raw="${raw:1:${#raw}-2}"
  fi

  printf '%s' "$raw"
}

validate_api_base_url() {
  local url="$1"

  if [[ -z "$url" ]]; then
    add_blocker "EXPO_PUBLIC_API_BASE_URL is empty in ${ENV_FILE}."
    return
  fi

  if [[ "$url" == *"<development-host>"* ]]; then
    add_blocker "EXPO_PUBLIC_API_BASE_URL still contains placeholder <development-host>."
    return
  fi

  if [[ ! "$url" =~ ^https?://[^[:space:]]+$ ]]; then
    add_blocker "EXPO_PUBLIC_API_BASE_URL must be a valid http:// or https:// URL. Found: ${url}"
    return
  fi

  add_pass "EXPO_PUBLIC_API_BASE_URL is configured and syntactically valid."
}

run_required_command() {
  local description="$1"
  shift

  echo
  echo "Running: ${description}"
  if "$@"; then
    add_pass "${description} passed."
  else
    add_blocker "${description} failed."
  fi
}

echo "Bootstrap verification starting in ${REPO_ROOT}"

if [[ ! -f "${REPO_ROOT}/package.json" || ! -f "${REPO_ROOT}/app.json" ]]; then
  add_blocker "Run this script from a repository clone containing package.json and app.json."
fi

if ! command -v node >/dev/null 2>&1; then
  add_blocker "node is not available in PATH. Run ./bootstrap/setup-mac.sh first."
else
  add_pass "node is available: $(node -v)"
fi

if ! command -v npm >/dev/null 2>&1; then
  add_blocker "npm is not available in PATH. Run ./bootstrap/setup-mac.sh first."
else
  add_pass "npm is available: $(npm -v)"
fi

if ! command -v npx >/dev/null 2>&1; then
  add_blocker "npx is not available in PATH. Run ./bootstrap/setup-mac.sh first."
else
  add_pass "npx is available: $(npx --version)"
fi

if ! command -v git >/dev/null 2>&1; then
  add_blocker "git is not available in PATH."
else
  add_pass "git is available: $(git --version)"
fi

if ! command -v gh >/dev/null 2>&1; then
  add_blocker "GitHub CLI (gh) is not available in PATH."
else
  add_pass "gh is available: $(gh --version | head -n 1)"
fi

if [[ ! -f "$ENV_FILE" ]]; then
  add_blocker ".env is missing. Copy .env.example to .env and set EXPO_PUBLIC_API_BASE_URL to a reachable backend URL before rerunning."
else
  add_pass "Environment file found: ${ENV_FILE}"

  if api_url="$(extract_env_value "EXPO_PUBLIC_API_BASE_URL" "$ENV_FILE")"; then
    validate_api_base_url "$api_url"
  else
    add_blocker "EXPO_PUBLIC_API_BASE_URL is missing from ${ENV_FILE}."
  fi
fi

if [[ ${#BLOCKERS[@]} -eq 0 && "$SKIP_TYPECHECK" != "1" ]]; then
  run_required_command "TypeScript verification (npm run typecheck)" npm run typecheck
elif [[ "$SKIP_TYPECHECK" == "1" ]]; then
  add_warning "TypeScript verification was skipped by BOOTSTRAP_SKIP_TYPECHECK=1."
fi

if [[ ${#BLOCKERS[@]} -eq 0 && "$SKIP_TESTS" != "1" ]]; then
  run_required_command "Jest verification (npm test)" npm test
elif [[ "$SKIP_TESTS" == "1" ]]; then
  add_warning "Jest verification was skipped by BOOTSTRAP_SKIP_TESTS=1."
fi

if [[ -f "${REPO_ROOT}/prisma/schema.prisma" ]] || grep -Eq '"prisma"|"@prisma/client"' "${REPO_ROOT}/package.json"; then
  if [[ ${#BLOCKERS[@]} -eq 0 ]]; then
    run_required_command "Prisma verification (npx prisma --version)" npx prisma --version
  fi
else
  add_warning "Prisma is not configured in this repository. Prisma verification skipped."
fi

if [[ ${#BLOCKERS[@]} -eq 0 ]]; then
  run_required_command "Expo verification (npx expo --version)" npx expo --version
fi

if [[ ${#BLOCKERS[@]} -eq 0 && "$SKIP_REPRESENTATIVE_SCRIPTS" != "1" ]]; then
  run_required_command "Representative script: npm run academy:engineering-verification-001" npm run academy:engineering-verification-001
  run_required_command "Representative script: npm run companion:test-runtime" npm run companion:test-runtime
elif [[ "$SKIP_REPRESENTATIVE_SCRIPTS" == "1" ]]; then
  add_warning "Representative script checks were skipped by BOOTSTRAP_SKIP_REPRESENTATIVE_SCRIPTS=1."
fi

echo
echo "========================"
echo "Mac Bootstrap Readiness"
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
echo "This machine is ready for governed repository development."