# PROOF-0006 - CSA-0003 Cleaning Capability Validation

Date: 2026-07-27
Status: COMPLETE WITH EVIDENCE
CSA Reference: CSA-0003
Capability: cleaning.complete

## 1. Purpose

Record formal proof that the Cleaning Completion capability executes through the Companion Runtime with contract conformance, branch coverage, and governance-ready evidence structure.

## 2. Closure Status

Current status:

CSA-0003 - COMPLETE WITH EVIDENCE

Promotion condition:

Achieved.

CSA-0003 evidence package is complete for cleaning capability closure.

## 3. Architecture and Runtime Scope

- Companion Runtime pipeline: Context -> Decision -> Authority -> Action -> Evidence -> Reflection
- Operational Event: Cleaning Completed
- Capability ID: cleaning.complete
- Governance surface: Interaction Record Viewer
- Local persistence: AsyncStorage runtime trace store

## 4. Validation Commands and Results

Automated validation results:

- npx tsc --noEmit: PASS
- npm run companion:test-cleaning-adapter: PASS
- npm run companion:test-runtime-expansion: PASS

Expansion summary:

- Runtime expansion harness passed
- Adapters validated: 5

## 5. Branch Validation Results

Low-risk branch (completed and no findings):

- decisionSnapshot.risk: Low
- csaConformant: true
- contractViolations: []
- action.outcome: succeeded

High-risk branch (completed with finding note):

- decisionSnapshot.risk: High
- csaConformant: true
- contractViolations: []
- action.sideEffects includes follow-up-review-required

## 6. Authority Correction Applied

Correction:

- Added cleaning.complete to staff role allowlist.

Reason:

- Without allowlist alignment, valid staff cleaning runs could be denied and would not produce expected action outcomes for governed branch verification.

Evidence reference:

- src/companion/AuthorityEngine.ts

## 7. Identity Resolution and Governance

Improvement applied:

- Cleaning actor context now attempts JWT payload fallback when stored identity keys are absent.

Expected governance outcome:

- Reduce unknown-user traces and improve auditability for actorId and userId in runtime records.

Known limitation:

- If token payload does not include expected identity claims and local storage keys are absent, unknown-user may still appear. Treat as follow-up hardening if observed in live evidence.

## 8. Operational-to-Companion Correlation Record

For each live cleaning evidence capture, record all fields below in one row:

- Cleaning task/check ID:
- Site ID:
- Completion time (operational record):
- Cleaning interaction ID:
- Runtime trace timestamp:
- Manager-visible completion record reference:

Correlation method for this proof:

- Timestamp alignment plus checklist ID equivalence.

## 9. Live Evidence Artefacts

Attach these five artefacts under docs/proofs/artifacts/proof-0006/:

1. cleaning-modal.png
   - Cleaning completion modal screenshot
2. cleaning-success-interaction-id.png
   - Success message including interaction ID
3. cleaning-manager-visible-completion-record.png
   - Manager-visible completed cleaning record
4. cleaning-runtime-json-normal-branch.png
   - Runtime JSON showing capabilityId cleaning.complete, successful action, csaConformant true, and no contract violations
5. cleaning-runtime-json-high-risk-branch.png
   - Runtime JSON showing finding-driven high-risk branch and follow-up side effect

Live evidence captured from attached cleaning runtime trace screenshots (2026-07-27):

- accepted: true
- interactionId/requestId: cleaning-1785167808636
- userId/actorId: 4
- role/actorRole: manager
- siteId: 2
- capabilityId: cleaning.complete
- decision.disposition: proceed
- authority.disposition: allow
- action.attempted: true
- action.outcome: succeeded
- action.sideEffects: ["cleaning-completion-recorded"]
- csaConformant: true
- contractViolations: []

## 10. Required Runtime JSON Confirmations

Normal branch confirmation checklist:

- capabilityId: cleaning.complete
- interactionId prefixed cleaning-
- decision.disposition: proceed
- action.attempted: true
- action.outcome: succeeded
- csaConformant: true
- contractViolations: []

High-risk branch confirmation checklist:

- decisionSnapshot.risk: High
- action.sideEffects contains follow-up-review-required
- csaConformant: true
- contractViolations: []

## 11. AsyncStorage Persistence Verification

Manual persistence test steps:

1. Complete cleaning event.
2. Confirm runtime record appears in Interaction Record Viewer.
3. Fully close app.
4. Reopen app.
5. Confirm record remains present.

Result:

- Pass

Evidence file:

- docs/proofs/artifacts/proof-0006/cleaning-persistence-after-restart.png

## 12. Regressions Found and Fixed During Closure

Regression 1:

- Strict JWT payload typing in cleaning identity fallback.
- Fix: narrowed nested payload objects before id extraction.

Regression 2:

- High-risk side-effects assertion initially checked the wrong object level.
- Fix: validated sideEffects on interactionRecord.action where action payload is surfaced.

Why this matters:

- Confirms closure process exercised real behavior and corrected non-happy-path test defects.

## 13. Acceptance Statement

Implementation acceptance:

- Cleaning capability is runtime-conformant.
- Automated branch coverage includes both low-risk and high-risk paths.
- Runtime expansion remains stable across five adapters.

Formal closure condition:

- Met.
- CSA-0003 is complete with evidence for cleaning capability validation.

## 14. Related References

- docs/proofs/VALIDATION-CSA-0003-MULTI-CAPABILITY.md
- scripts/test-cleaning-adapter.ts
- src/companion/adapters/CleaningAdapter.ts
- app/(tabs)/checks.tsx
- src/companion/AuthorityEngine.ts
