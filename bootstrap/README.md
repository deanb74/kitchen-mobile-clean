# Mac Bootstrap

This directory provides a compatibility-first bootstrap for a fresh Apple Silicon Mac development machine.

## Target Command

Run from repository root:

```bash
./bootstrap/setup-mac.sh
```

## What The Bootstrap Does

- Confirms macOS and Apple Silicon compatibility.
- Requires a native arm64 shell by default; `BOOTSTRAP_ALLOW_NON_ARM64=1` is reserved for controlled verification only.
- Confirms Homebrew is available.
- Installs approved CLI dependencies from `bootstrap/Brewfile`.
- Installs Visual Studio Code if absent.
- Enforces governed Node version from `.nvmrc`.
- Confirms `node`, `npm`, and `npx`.
- Installs dependencies from `package-lock.json` with `npm ci`.
- Refuses to overwrite `.env`.
- Stops if `.env` is missing and instructs user to copy `.env.example`.
- Validates `EXPO_PUBLIC_API_BASE_URL`.
- Verifies Git and GitHub CLI.
- Verifies TypeScript and Jest.
- Verifies Prisma when repository Prisma configuration exists.
- Verifies Expo CLI.
- Runs representative portable scripts.
- Prints explicit PASS, WARN, BLOCKERS, READY sections.

## Safety

- Idempotent and safe to rerun.
- Non-destructive: does not remove project files.
- Never overwrites `.env`.
- Does not commit or push.
- Does not print credentials.

## Supporting Commands

Standalone verification:

```bash
./bootstrap/verify-install.sh
```

Optional environment variables for controlled verification scenarios:

- `BOOTSTRAP_ENV_FILE=/path/to/env` to verify a specific env file.
- `BOOTSTRAP_SKIP_TESTS=1` to skip Jest in constrained checks.
- `BOOTSTRAP_SKIP_TYPECHECK=1` to skip typecheck in constrained checks.
- `BOOTSTRAP_SKIP_REPRESENTATIVE_SCRIPTS=1` to skip representative script runs.
- `BOOTSTRAP_ALLOW_NON_ARM64=1` to permit verification-only runs from a non-arm64 shell on Apple Silicon.