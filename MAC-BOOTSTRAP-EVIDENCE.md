Here is the Mac bootstrap evidence.

## Scope

- Bootstrap files reviewed: `/.nvmrc`, `bootstrap/setup-mac.sh`, `bootstrap/verify-install.sh`, `bootstrap/Brewfile`, `bootstrap/README.md`
- Repository root: `/Users/dean2/Projects/kitchen-mobile-clean`
- Evidence method: static review plus attempted runtime checks

## Commands Intended For Evidence

- `./bootstrap/setup-mac.sh`
- `./bootstrap/verify-install.sh`
- `npm run typecheck`
- `npm test`
- Scenario runs for missing Node, missing `.env`, invalid API URL, repository root, and path-with-spaces coverage

## Runtime Evidence Status

- Runtime stdout/stderr capture from the workspace terminal/task tools was not available in this session.
- Because of that, I am not recording fabricated command output.
- The bootstrap scripts were still updated to enforce the requested behavior by inspection.
- A first real-machine bootstrap attempt exposed a clean-machine defect: Homebrew bundle completed, then `setup-mac.sh` exited before printing `Installing governed Node version` because NVM load could terminate the shell under `set -e`.

## Behavior Verified By Inspection

- Setup script now requires macOS and native arm64 by default.
- Verification-only override is available via `BOOTSTRAP_ALLOW_NON_ARM64=1`.
- NVM is loaded with `source "$NVM_SH" --no-use` and the script verifies the `nvm` function exists immediately after sourcing.
- The bootstrap writes a single idempotent NVM block into `~/.zshrc` for future interactive zsh sessions.
- `.env` is never overwritten.
- Missing `.env` is a hard blocker.
- `EXPO_PUBLIC_API_BASE_URL` is validated for:
  - non-empty value
  - http/https scheme
  - non-placeholder content
- Verification script checks:
  - `npm run typecheck`
  - `npm test`
  - `npx expo --version`
  - `npx prisma --version` when Prisma is configured
  - representative scripts
- Regression coverage now includes a shell-level clean-machine test that reproduces the no-Node bootstrap path under `errexit`.
- Scripts avoid commit and push operations.

## Caveats

- Exact command outputs are still pending because the terminal/task output path in this environment did not surface stdout reliably.
- `.env` is present in the working tree and must not be committed.
- `/.vscode/tasks.json` was an unintended artifact from command harness testing and was removed.
- The deterministic regression test exists in `bootstrap/test-nvm-clean-machine.sh` and should be used to validate the failure class before future changes to NVM loading.

## Readiness

- Code-level readiness: pass.
- Runtime evidence completeness: partial.
- Final bootstrap sign-off: not yet justified until live command output is captured in a working terminal session.
