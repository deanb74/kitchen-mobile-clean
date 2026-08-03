#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

TMP_ROOT="$(mktemp -d)"
trap 'rm -rf "$TMP_ROOT"' EXIT

FAKE_HOME="$TMP_ROOT/home"
FAKE_BIN="$TMP_ROOT/bin"
FAKE_BREW_PREFIX="$TMP_ROOT/brew-prefix"
FAKE_LOG="$TMP_ROOT/bootstrap.log"
MISSING_ENV="$TMP_ROOT/missing.env"
OUTPUT="$TMP_ROOT/output.log"

mkdir -p "$FAKE_HOME" "$FAKE_BIN" "$FAKE_BREW_PREFIX/opt/nvm"
export FAKE_LOG FAKE_BIN

cat > "$FAKE_BREW_PREFIX/opt/nvm/nvm.sh" <<'EOF'
if [[ "${1:-}" != "--no-use" ]]; then
  return 3
fi

nvm() {
  case "$1" in
    install)
      printf 'nvm install %s\n' "${2:-}" >> "$FAKE_LOG"
      return 0
      ;;
    use)
      printf 'nvm use %s\n' "${2:-}" >> "$FAKE_LOG"
      cat > "$FAKE_BIN/node" <<'NODE'
#!/usr/bin/env bash
if [[ "${1:-}" == "-v" || "${1:-}" == "--version" ]]; then
  echo "v24.14.0"
else
  echo "v24.14.0"
fi
NODE
      cat > "$FAKE_BIN/npm" <<'NPM'
#!/usr/bin/env bash
if [[ "${1:-}" == "-v" || "${1:-}" == "--version" ]]; then
  echo "11.9.0"
elif [[ "${1:-}" == "ci" ]]; then
  echo "npm ci"
fi
NPM
      cat > "$FAKE_BIN/npx" <<'NPX'
#!/usr/bin/env bash
if [[ "${1:-}" == "--version" ]]; then
  echo "11.9.0"
elif [[ "${1:-}" == "expo" && "${2:-}" == "--version" ]]; then
  echo "54.0.0"
elif [[ "${1:-}" == "prisma" && "${2:-}" == "--version" ]]; then
  echo "prisma 0.0.0"
fi
NPX
      chmod +x "$FAKE_BIN/node" "$FAKE_BIN/npm" "$FAKE_BIN/npx"
      export PATH="$FAKE_BIN:$PATH"
      return 0
      ;;
    *)
      return 0
      ;;
  esac
}
EOF

cat > "$FAKE_BIN/brew" <<EOF
#!/usr/bin/env bash
case "\${1:-}" in
  --prefix)
    echo "$FAKE_BREW_PREFIX"
    ;;
  bundle)
    exit 0
    ;;
  install)
    exit 0
    ;;
  *)
    exit 0
    ;;
esac
EOF

cat > "$FAKE_BIN/gh" <<'EOF'
#!/usr/bin/env bash
echo "gh version 2.89.0"
EOF

chmod +x "$FAKE_BIN/brew" "$FAKE_BIN/gh"

set +e
HOME="$FAKE_HOME" PATH="$FAKE_BIN:/usr/bin:/bin" BOOTSTRAP_ALLOW_NON_ARM64=1 BOOTSTRAP_ENV_FILE="$MISSING_ENV" "${REPO_ROOT}/bootstrap/setup-mac.sh" > "$OUTPUT" 2>&1
first_exit=$?
set -e

if [[ "$first_exit" -ne 1 && "$first_exit" -ne 0 ]]; then
  echo "unexpected first run exit: $first_exit"
  exit 1
fi

grep -Fq 'Installing governed Node version' "$OUTPUT"
grep -Fq 'nvm install 24.14.0' "$FAKE_LOG"
grep -Fq 'nvm use 24.14.0' "$FAKE_LOG"
grep -Fq '.env is missing. Copy .env.example to .env and set EXPO_PUBLIC_API_BASE_URL before rerunning.' "$OUTPUT"

if [[ ! -f "$FAKE_HOME/.zshrc" ]]; then
  echo "expected .zshrc to be created"
  exit 1
fi

set +e
HOME="$FAKE_HOME" PATH="$FAKE_BIN:/usr/bin:/bin" BOOTSTRAP_ALLOW_NON_ARM64=1 BOOTSTRAP_ENV_FILE="$MISSING_ENV" "${REPO_ROOT}/bootstrap/setup-mac.sh" > "$OUTPUT" 2>&1
second_exit=$?
set -e

if [[ "$second_exit" -ne 1 && "$second_exit" -ne 0 ]]; then
  echo "unexpected second run exit: $second_exit"
  exit 1
fi

if [[ "$(grep -Fc '# BEGIN kitchen-mobile-clean bootstrap nvm' "$FAKE_HOME/.zshrc")" != "1" ]]; then
  echo "expected exactly one NVM profile block"
  exit 1
fi

echo "NVM clean-machine regression passed"