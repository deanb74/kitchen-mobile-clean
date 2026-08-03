# Mac Bootstrap Assessment

## Summary

The bootstrap scripts were updated to better match the stated requirements: stricter Apple Silicon defaults, explicit API base URL validation, and clearer bootstrap documentation. The scripts are structured to be idempotent and non-destructive, and they do not contain commit or push behavior.

## Assessment

- `bootstrap/setup-mac.sh`: now blocks non-arm64 shells by default on Apple Silicon unless `BOOTSTRAP_ALLOW_NON_ARM64=1` is set for controlled verification.
- `bootstrap/setup-mac.sh`: now validates `EXPO_PUBLIC_API_BASE_URL` from `.env` before proceeding.
- `bootstrap/setup-mac.sh`: now sources NVM with `--no-use`, checks that `nvm` is defined immediately after sourcing, and writes a single guarded zsh profile block so interactive sessions can load it later.
- `bootstrap/test-nvm-clean-machine.sh`: reproduces the clean-machine failure mode deterministically with a fake NVM install, no Node versions, and `errexit` enabled.
- `bootstrap/verify-install.sh`: already checks the requested verification surfaces and keeps `.env` as a required input.
- `bootstrap/README.md`: now documents the strict arm64 default and the verification-only override.

## Evidence Caveat

I was not able to capture exact live stdout/stderr from the workspace terminal/task tools in this session, but the clean-machine defect was observed directly and the fix is now captured by a deterministic regression test. I did not invent outputs.

## Readiness Judgment

- Script behavior: ready by inspection.
- Runtime proof set: incomplete.
- Final operational readiness: pending live command-output capture for the post-fix bootstrap run.

## Remaining Checks To Capture

- Missing Node simulation.
- Existing dependencies run.
- Missing `.env` failure.
- Invalid API URL failure.
- Repository-root execution.
- Path-with-spaces execution.
- `npm run typecheck`.
- `npm test`.
