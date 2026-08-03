Here is the machine-portability evidence.

# MACHINE-PORTABILITY-REMEDIATION

## Judgement

PASS

## Scope

Phase 1 removed the confirmed machine-specific execution blockers without redesigning application behavior, rewriting frozen historical evidence, or introducing a bootstrap process.

## Files Changed

- `.env.example`
- `MACHINE-PORTABILITY-REMEDIATION.md`
- `MACHINE-PORTABILITY-VERIFICATION.md`
- `lib/api.ts`
- `lib/__tests__/api.test.ts`
- `lib/academy/AndyDigitalColleague.ts`
- `lib/academy/repositoryKnowledgeService.ts`
- `lib/academy/__tests__/repositoryKnowledgeService.test.ts`
- `scripts/support/repositoryRoot.ts`
- `scripts/support/__tests__/repositoryRoot.test.ts`
- `scripts/academy/run-academy.ts`
- `scripts/academy/run-engineering-verification-001.ts`
- `scripts/academy/run-formation-test-001.ts`
- `scripts/academy/run-formation-test-002.ts`
- `scripts/academy/run-formation-test-003.ts`
- `scripts/academy/run-validation-set-001.ts`
- `scripts/test-companion-runtime.ts`
- `scripts/test-companion-runtime-negative.ts`
- `scripts/test-temperature-adapter-contract.ts`
- `scripts/knowledge/build-knowledge.mjs`
- `scripts/reset-project.js`
- `src/companion/adapters/__tests__/TemperatureAdapter.test.ts`

Verification commands also regenerated repository-managed outputs:

- `md_inventory.txt`
- `md_headers.txt`
- `hh_headers.txt`
- `knowledge_index.md`
- `docs/understanding-journeys/validation/artifacts/engineering-verification-001.json`
- `docs/proofs/artifacts/companion-runtime-trace.latest.json`

## API Host Remediation

- Old API-host location: `lib/api.ts` contained `http://192.168.0.182:3001`.
- New configuration path: `EXPO_PUBLIC_API_BASE_URL` via `lib/api.ts` and `.env.example`.
- Canonical behavior now enforced in one place:
  - requires a non-empty configured value;
  - accepts only `http` or `https` URLs;
  - normalizes trailing slashes;
  - exports one canonical `API_BASE_URL` for all consumers.
- No executable source now contains the old LAN IP. This is covered by `lib/__tests__/api.test.ts`.

## API Consumers Confirmed

The current executable consumers still import the canonical API base URL rather than defining their own host:

- `app/login.tsx`
- `app/register.tsx`
- `app/(tabs)/checks.tsx`
- `app/(tabs)/explore.tsx`
- `app/(tabs)/manager.tsx`
- `lib/notifications.ts`
- `lib/syncQueue.ts`
- `src/companion/adapters/TemperatureAdapter.ts`

## Repository-Root Strategy

- `AndyDigitalColleague` no longer infers a repository filesystem from browser location.
- Repository knowledge is now explicit:
  - caller may inject `repositoryRoot`;
  - caller may inject a `RepositoryKnowledgeService` directly;
  - default Node behavior derives the repository root from the module location rather than `process.cwd()`.
- If no repository root is available, Andy reports that boundary honestly instead of inventing a path.
- `RepositoryKnowledgeService` no longer returns synthetic fallback documents when repository access is unavailable or the scan fails.

## Repository Path Tests Remediated

- `lib/academy/__tests__/repositoryKnowledgeService.test.ts` no longer assumes `/Users/dean2/Projects/kitchen-mobile-clean`.
- The suite now proves:
  - repository root can be injected;
  - default repository selection is independent of the current working directory;
  - repository unavailability is reported honestly.

## Scripts Corrected

TypeScript scripts now derive the repository root from module location via `scripts/support/repositoryRoot.ts`:

- `scripts/academy/run-academy.ts`
- `scripts/academy/run-engineering-verification-001.ts`
- `scripts/academy/run-formation-test-001.ts`
- `scripts/academy/run-formation-test-002.ts`
- `scripts/academy/run-formation-test-003.ts`
- `scripts/academy/run-validation-set-001.ts`
- `scripts/test-companion-runtime.ts`
- `scripts/test-companion-runtime-negative.ts`
- `scripts/test-temperature-adapter-contract.ts`

Non-TypeScript scripts now anchor to their own file locations instead of `process.cwd()`:

- `scripts/knowledge/build-knowledge.mjs`
- `scripts/reset-project.js`

Related source-probe tests were also corrected to resolve repository-relative files from stable file locations:

- `src/companion/adapters/__tests__/TemperatureAdapter.test.ts`

## Evidence and Documentation Boundary

Frozen historical evidence was deliberately not rewritten in this phase.

Historical absolute-path artifacts left unchanged:

- `CANDIDATE_0_PIPELINE_CHECKPOINT_001.md`
- `docs/formation/00-formation/HH-EVID-003-SYNTHESISED-CONSTITUTIONAL-EXPLANATION.json`
- `docs/proofs/PROOF-0012-ANDY-GOVERNED-ADVISORY-INHERITANCE.md`
- `provenance-evidence.md`
- `repo-sweep/DOCUMENTATION-COMPLETE-BUNDLE.md`

These remain cosmetic portability debt until a later evidence-hygiene phase. This remediation instead prevents current executable code and newly exercised scripts from depending on machine-local repository paths.

## Remaining Machine-Specific Assumptions

- Networked application flows now require a valid `EXPO_PUBLIC_API_BASE_URL`; this is intentional and explicit.
- A physical phone still cannot use `localhost` for backend access. The configured API base URL must match the actual reachable host for the target runtime.
- Repository-grounded Andy behavior in mobile or browser runtime still requires an injected repository knowledge source or repository root. Without one, the runtime now states that repository knowledge is unavailable.
- Historical evidence documents still contain absolute Mac paths and usernames by design in this phase.

## Failures Or Surprises

- A Jest dynamic-import limitation required the new API tests to use `jest.resetModules()` plus `require()`.
- One Academy script patch was mechanically malformed during editing and was repaired before final verification.
- No business-logic regressions were observed after repair.

## No Secrets Added

- `.env.example` contains a placeholder only: `EXPO_PUBLIC_API_BASE_URL=http://<development-host>:3001`.
- No private IP, secret, or credential was introduced.