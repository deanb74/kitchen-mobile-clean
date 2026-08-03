# COMMIT_PLAN

## Scope

This plan covers the current modified and untracked files visible in `git status --short` at planning time. The grouping is by dependency and release order, not by directory.

## Dependency Map

### Foundation edges

- Governance and organisational authority documents are the semantic foundation for `platform/ci/authority.ts` and the related Andy authority behavior.
- `docs/architecture/CANONICAL-REASONING-RECORD.md`, `docs/architecture/REASONING-LIFECYCLE.md`, `docs/architecture/REASONING-RECORD-FIELD-MAP.md`, `docs/architecture/REASONING-RECORD-MIGRATION-PLAN.md`, and `docs/architecture/REASONING-RECORD-RISK-ASSESSMENT.md` form a separate architecture-definition stream. They are not constitutional foundations.
- `platform/ci/authority.ts`, `platform/ci/compass.ts`, `platform/ci/behaviourPrototype.ts`, `platform/ci/navigator.ts`, `platform/ci/types.ts`, and `platform/ci/index.ts` are the executable foundation for:
  - `lib/academy/AndyDigitalColleague.ts`
  - `app/academy/runtime.tsx`
  - `scripts/academy/run-academy.ts`
  - `scripts/academy/run-engineering-verification-001.ts`
  - `scripts/academy/run-formation-test-001.ts`
  - `scripts/academy/run-formation-test-002.ts`
  - `scripts/academy/run-formation-test-003.ts`
  - `scripts/academy/run-validation-set-001.ts`
- `lib/academy/repositoryKnowledgeService.ts` and the exported Academy surface in `lib/academy/index.ts` are the executable foundation for the Academy runtime screen, Academy scripts, Academy tests, and most Academy evidence documents.
- `lib/api.ts` is the foundation for all current API consumers:
  - `app/login.tsx`
  - `app/register.tsx`
  - `app/(tabs)/checks.tsx`
  - `app/(tabs)/explore.tsx`
  - `app/(tabs)/manager.tsx`
  - `lib/notifications.ts`
  - `lib/syncQueue.ts`
  - `src/companion/adapters/TemperatureAdapter.ts`
- `scripts/support/repositoryRoot.ts` is the foundation for the Academy and runtime harness scripts that now resolve repository paths independently of the invoking directory.
- Generated artifacts and indexes depend on their source code and documents already being committed.
- `repo-sweep/` and `UNDERSTANDING-JOURNEYS-COMPLETE-BUNDLE.md` are inspection bundles, not canonical source. They should be treated as local or reproducible outputs unless a later governed archival decision says otherwise.

### Files that are mixed-concern and will force commit coupling unless split by hunk

- `lib/academy/AndyDigitalColleague.ts`
  Reason: contains both Academy behavior growth and portability boundary changes.
- `lib/academy/__tests__/repositoryKnowledgeService.test.ts`
  Reason: covers both Academy behavior and portability/root-resolution behavior.
- `scripts/academy/run-academy.ts`
- `scripts/academy/run-engineering-verification-001.ts`
- `scripts/academy/run-formation-test-001.ts`
- `scripts/academy/run-formation-test-002.ts`
- `scripts/academy/run-formation-test-003.ts`
- `scripts/academy/run-validation-set-001.ts`
  Reason: these are Academy verification scripts, but they also now carry portability root-resolution changes.

If you want perfectly clean history, those files should be split by hunk before commit. If you do not want hunk-splitting, keep them in the later Academy executable commit rather than in a portability-only commit. Do not force a hunk split unless the separation is technically safe and independently testable.

## Commit Order

## Commit 1

Commit message:

`docs(governance): establish authority and institutional foundations`

Why first:

- Later CI and Academy code refers to these documents as provenance and authority sources.
- This commit gives the later executable changes a stable documentary base.

Included files:

- `constitution/02-CONSTITUTION.md`
- `constitution/05-AUTHORITY-AND-STEWARDSHIP.md`
- `constitution/DOCUMENT_REGISTER.md`
- `constitution/README.md`
- `docs/FOUNDING_BOARD_CYRIL.md`
- `docs/FOUNDING_BOARD_WILLIAM_WEBB.md`
- `docs/HELPING_HAND_ORGANISATION.md`
- `docs/HH-CON-003.md`
- `docs/ORGANISATIONAL_SECURITY.md`
- `docs/README.md`
- `docs/institution/README.md`
- all current files under `docs/institution/decisions/`
- all current files under `docs/institution/reviews/`
- all current files under `docs/organisation/`
- `docs/architecture/CONSTITUTION.md`
- `docs/architecture/CONSTITUTIONAL_ENGINEERING_NOTE_FOUNDATION_MATURITY.md`
- `docs/architecture/CONSTITUTIONAL_FRAMEWORK.md`
- `docs/architecture/DOCUMENT_REGISTER.md`
- `docs/architecture/HQ_INTELLIGENCE.md`
- `docs/architecture/HQ_MODEL.md`
- `docs/architecture/KNOWLEDGE_INHERITANCE_MODEL.md`
- `docs/architecture/REPOSITORY_TRACEABILITY_STANDARD.md`
- `docs/architecture/README.md`
- `docs/architecture/PROFESSIONAL_INTELLIGENCE.md`
- `docs/ENGINEERING_PRINCIPLES.md`
- `docs/engineering/ENGINEERING_PRINCIPLE_002_TRACEABLE_DECISIONS.md`
- `docs/engineering/README.md`
- `docs/engineering/VALIDATION_PHILOSOPHY.md`
- `docs/theory/README.md`
- `docs/theory/THEORY-MAP.md`
- `docs/theory/HH-THEORY-010-AWARENESS.md`
- `docs/theory/HH-THEORY-011-MORAL-COMPASS.md`
- `docs/theory/HH-THEORY-012-THE-COMPASS.md`
- `docs/theory/HH-THEORY-013-THE-THREE-TOGETHER.md`
- `docs/theory/HH-THEORY-014-AWARENESS-REGISTER-CURRENT-MISSION.md`
- `docs/theory/HH-THEORY-015-UNDERSTANDING-BEFORE-BEING-UNDERSTOOD.md`
- `docs/theory/HH-THEORY-016-LESSONS.md`
- `docs/theory/THEORY-016-ASSESSMENT.md`
- `docs/theory/THEORY-016-EVIDENCE.md`

Dependency reasoning:

- `platform/ci/authority.ts` names `constitution/05-AUTHORITY-AND-STEWARDSHIP.md`, `docs/HELPING_HAND_ORGANISATION.md`, `docs/ORGANISATIONAL_SECURITY.md`, and `docs/organisation/BOARD_AND_STEWARDSHIP.md` as source documents.
- The architecture and theory files define the vocabulary that later CI and Academy changes use.

## Commit 2

Commit message:

`docs(architecture): define canonical reasoning lifecycle`

Why second:

- These files define cognitive architecture and review material, not constitutional governance.
- They should land before Academy runtime behavior if that behavior is later reviewed against this architecture, but they do not belong in the governance-foundation commit.

Included files:

- `docs/architecture/CANONICAL-REASONING-RECORD.md`
- `docs/architecture/REASONING-LIFECYCLE.md`
- `docs/architecture/REASONING-RECORD-FIELD-MAP.md`
- `docs/architecture/REASONING-RECORD-MIGRATION-PLAN.md`
- `docs/architecture/REASONING-RECORD-RISK-ASSESSMENT.md`
- `ASR-001-ARCHITECTURE-REVIEW.md`
- `ASR-001-ASSESSMENT.md`
- `ASR-001-DUPLICATION-REPORT.md`
- `ASR-001-SIMPLIFICATION-CANDIDATES.md`

Dependency reasoning:

- These documents are directly related to one another and collectively define the canonical reasoning record concept and its review context.
- They are architecture and assessment material, not constitutional or institutional-governance foundations.

## Commit 3

Commit message:

`feat(ci): add authority, compass, navigator, and governed prototype core`

Why second:

- Academy behavior and the Academy runtime screen depend on these CI primitives.
- This is the executable base for the later Andy and Academy commits.

Included files:

- `platform/ci/authority.ts`
- `platform/ci/behaviourPrototype.ts`
- `platform/ci/compass.ts`
- `platform/ci/index.ts`
- `platform/ci/navigator.ts`
- `platform/ci/types.ts`
- `platform/ci/__tests__/behaviourPrototype.test.ts`
- `platform/ci/__tests__/compass.test.ts`
- `platform/ci/__tests__/navigator.test.ts`

Dependency reasoning:

- `lib/academy/AndyDigitalColleague.ts` imports authority and compass behavior from this commit.
- `app/academy/runtime.tsx` imports `buildGovernedPrototype` from this commit.

## Commit 4

Commit message:

`feat(academy): add repository-grounded Andy and Academy validation flows`

Why third:

- This is the main executable feature commit for Academy and Andy behavior.
- It must land after CI core and before the evidence/report commits.

Included files:

- `app/academy/runtime.tsx`
- `lib/academy/AndyDigitalColleague.ts`
- `lib/academy/academyTypes.ts`
- `lib/academy/index.ts`
- `lib/academy/repositoryKnowledgeService.ts`
- all current files under `lib/academy/__tests__/`
- `ACADEMY-COMPLETION-CLAIMS-REGISTER.md`
- `ACADEMY-CURRENT-TRUTH.md`
- `ACADEMY-EVIDENCE-RECONCILIATION.md`
- `HUMANITY-JOURNEY-STATUS-MATRIX.md`
- `CANDIDATE-0-VALIDATION-STATUS.md`
- `CANDIDATE_0_PIPELINE_CHECKPOINT_001.md`
- `MILESTONE_011_NEXT_IMPLEMENTATION_CHECKPOINT.md`
- `MILESTONE_011_NEXT_IMPLEMENTATION_TARGET.md`
- `scripts/academy/run-academy.ts`
- `scripts/academy/run-engineering-verification-001.ts`
- `scripts/academy/run-formation-test-001.ts`
- `scripts/academy/run-formation-test-002.ts`
- `scripts/academy/run-formation-test-003.ts`
- `scripts/academy/run-validation-set-001.ts`
- `docs/formation/README.md`
- all current files under `docs/formation/00-formation/`
- `docs/milestones/README.md`
- `docs/milestones/CANDIDATE_0_RUNTIME_BASELINE_001.md`
- `docs/milestones/CONSTITUTIONAL_PROGRESS_BOARD.md`
- `docs/milestones/IMPLEMENTATION_EVIDENCE_001.md`
- `docs/milestones/MILESTONE_006_GOVERNED_COMPANION_INTELLIGENCE.md`
- `docs/milestones/MILESTONE_009_INHERITANCE_VALIDATION.md`
- `docs/milestones/MILESTONE_010_BASELINE_EVIDENCE_CAPTURE_PROTOCOL.md`
- `docs/milestones/MILESTONE_010_EXECUTION_PROTOCOL.md`
- `docs/milestones/MILESTONE_010_FIRST_CONSTITUTIONAL_VALIDATION.md`
- `docs/milestones/MILESTONE_010_IMPLEMENTATION_STATUS.md`
- `docs/milestones/MILESTONE_011_IMPLEMENTATION_HANDOFF.md`
- `docs/milestones/MILESTONE_011_IMPLEMENTATION_OPERATING_RULE.md`
- `docs/milestones/MILESTONE_011_IMPLEMENTATION_PLAN.md`
- `docs/milestones/MILESTONE_011_PIPELINE_VERIFICATION_PROTOCOL.md`
- `docs/milestones/MILESTONE_011_REPOSITORY_GROUNDED_REASONING.md`
- `docs/understanding-journeys/STANDARD.md`
- `docs/understanding-journeys/TEMPLATE.md`
- `UNDERSTANDING-JOURNEYS-COMPLETE-BUNDLE.md`
- `UNDERSTANDING-JOURNEYS-FILE-MANIFEST.md`

Dependency reasoning:

- Depends on Commit 3 for authority and compass behavior.
- Produces the Academy executable behavior that later evidence and proof documents describe.
- The Academy scripts are logically tied to this feature set even though they also include portability root-resolution edits.

Files that would be wrong in an earlier commit:

- `app/academy/runtime.tsx`
- `scripts/academy/run-academy.ts`
- `scripts/academy/run-engineering-verification-001.ts`
- `scripts/academy/run-formation-test-001.ts`
- `scripts/academy/run-formation-test-002.ts`
- `scripts/academy/run-formation-test-003.ts`
- `scripts/academy/run-validation-set-001.ts`

These all depend on Commit 2 and on the Academy exports in this commit.

## Commit 5

Commit message:

`chore(portability): externalize API configuration and anchor repository-relative execution`

Why fourth:

- This is an infrastructure hardening commit on top of the executable behavior.
- It updates API consumers, script path resolution, and machine-portability verification docs.

Included files:

- `.env.example`
- `lib/api.ts`
- all current files under `lib/__tests__/`
- `app/login.tsx`
- `app/register.tsx`
- `app/(tabs)/checks.tsx`
- `app/(tabs)/explore.tsx`
- `app/(tabs)/manager.tsx`
- `lib/notifications.ts`
- `lib/syncQueue.ts`
- `src/companion/adapters/TemperatureAdapter.ts`
- `src/companion/adapters/__tests__/TemperatureAdapter.test.ts`
- `scripts/support/repositoryRoot.ts`
- all current files under `scripts/support/__tests__/`
- `scripts/knowledge/build-knowledge.mjs`
- `scripts/reset-project.js`
- `scripts/test-companion-runtime.ts`
- `scripts/test-companion-runtime-negative.ts`
- `scripts/test-temperature-adapter-contract.ts`
- `MACHINE-PORTABILITY-REMEDIATION.md`
- `MACHINE-PORTABILITY-VERIFICATION.md`

Dependency reasoning:

- API consumer files depend on `lib/api.ts` and should not be committed earlier.
- The script harness files depend on `scripts/support/repositoryRoot.ts` or on the same repository-root discipline.
- The portability reports depend on the code and verification behavior already existing.

Files that are wrong in a code-feature commit and belong here instead:

- `MACHINE-PORTABILITY-REMEDIATION.md`
- `MACHINE-PORTABILITY-VERIFICATION.md`
- `.env.example`

## Commit 6

Commit message:

`docs(evidence): add Academy, proof, and institutional evidence corpus`

Why fifth:

- These documents describe or evaluate behavior introduced by Commits 2 through 4.
- They should not precede the executable and portability commits they refer to.

Included files:

- `docs/VOLUME_VI_VENUE_BRAIN.md`
- `docs/professions/hospitality/HOSPITALITY_HQ.md`
- `docs/handovers/README.md`
- all current files under `docs/handovers/VOLUME_IX/`
- `docs/handovers/VOLUME_VIII_EXIT_CRITERIA.md`
- `docs/organisational-learning/README.md`
- `docs/organisational-learning/LESSONS_LEARNED_001.md`
- `docs/proofs/README.md`
- `docs/proofs/PROOF-0011-FIRST-OPERATIONAL-HUMAN-OUTCOME-VALIDATION.md`
- `docs/proofs/PROOF-0012-ANDY-GOVERNED-ADVISORY-INHERITANCE.md`
- `docs/proofs/artifacts/HOER-0002-EQUIPMENT-FAULT.md`
- `scripts/operations/run-hoer-0002-interactive.ts`
- `provenance-evidence.md`
- all current files under `docs/validation/`

Dependency reasoning:

- These files are evidence, proof, or assessment outputs. They depend on the Academy/CI behavior and the portability verification state already being present.

## Commit 7

Commit message:

`chore(generated): refresh knowledge indexes and validation outputs`

Why last:

- These files are generated or derivative outputs.
- They depend on the final source and docs state and should be the easiest commit to drop or regenerate.
- `repo-sweep/` and `UNDERSTANDING-JOURNEYS-COMPLETE-BUNDLE.md` are excluded from normal commit history unless separately approved for governed archival use.

Included files:

- `docs/proofs/artifacts/companion-runtime-trace.latest.json`
- `docs/understanding-journeys/validation/artifacts/engineering-verification-001.json`
- `docs/understanding-journeys/validation/artifacts/validation-set-001-runs.json`
- `hh_headers.txt`
- `knowledge_index.md`
- `md_headers.txt`
- `md_inventory.txt`

Dependency reasoning:

- Depends on Commits 1 through 6 because it is derived from the updated docs and scripts.
- If any earlier commit changes, these outputs should be regenerated rather than hand-merged.

Files that are wrong in earlier commits:

- `hh_headers.txt`
- `knowledge_index.md`
- `md_headers.txt`
- `md_inventory.txt`
- `docs/proofs/artifacts/companion-runtime-trace.latest.json`
- `docs/understanding-journeys/validation/artifacts/engineering-verification-001.json`
- `docs/understanding-journeys/validation/artifacts/validation-set-001-runs.json`

Explicitly excluded from normal commit history:

- all current files under `repo-sweep/`
- `UNDERSTANDING-JOURNEYS-COMPLETE-BUNDLE.md`

Retained as governed or useful sources:

- `UNDERSTANDING-JOURNEYS-FILE-MANIFEST.md`

## Unassigned or intentionally deferred

These current changes are visible in the working tree but do not fit cleanly into the six-commit portability and Academy chain above without further review. They should be reviewed before commit, not silently swept into another commit:

- `lib/academy/index.ts`
  Note: included in Commit 3, but verify it exports only symbols that exist in the same commit.
- `platform/ci/index.ts`
  Note: included in Commit 2, but verify the new export surface matches the introduced files.
- `scripts/operations/run-hoer-0002-interactive.ts`
  Note: assigned to Commit 6 because it supports the proof workflow.
- all current files under `repo-sweep/`
  Note: defer from commit history by default; treat as ignored local inspection output unless a later archival decision says otherwise.
- `UNDERSTANDING-JOURNEYS-COMPLETE-BUNDLE.md`
  Note: defer from commit history by default as a reproducible duplicate bundle.

## Practical recommendation

If you want the cleanest history without hunk-splitting, use this operational sequence:

1. Commit 1 exactly as documents-only foundation.
2. Commit 2 as the canonical reasoning architecture definition.
3. Commit 3 as CI executable base.
4. Commit 4 as the large Academy executable commit, keeping the mixed Academy script files here.
5. Commit 5 as portability hardening for API and repository-relative execution.
6. Commit 6 as narrative evidence and institutional documentation.
7. Commit 7 as generated outputs only.

If you want stricter separation, split the mixed-concern files by hunk before step 4 so portability-only edits can move fully into Commit 5.