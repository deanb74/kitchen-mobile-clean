# VALIDATION - CSA-0003 Multi-capability Operational Validation

Status: Complete With Evidence
Owner: Companion Runtime Engineering
Date opened: 2026-07-27

## Purpose

Prove the Companion Runtime is generic across multiple operational capabilities, not only temperature recording.

## Validation Goal

Execute 5 to 10 different operational events through the same governed pipeline:

Operational Event
-> Companion Runtime
-> Interaction Record
-> Capability Register
-> Venue Brain
-> Learning
-> Recommendations
-> Validated Improvements
-> Capability Evolution

Framework reference:

- docs/proofs/CAPABILITY-CERTIFICATION-FRAMEWORK.md
- docs/proofs/CAPABILITY-REGISTER.md
- docs/proofs/CERTIFICATION-ROADMAP.md

## Companion Capability Certification Matrix (CCCM)

Minimum target: 5 capabilities
Stretch target: 10 capabilities

| Scenario | Event | Automated adapter validation | Mobile validation |
| --- | --- | ---: | ---: |
| CSA3-EVT-001 | Equipment fault | Pass | Pass (Certified evidence captured) |
| CSA3-EVT-002 | Corrective action | Pass | Pass (Certified evidence captured) |
| CSA3-EVT-003 | Cleaning completion | Pass | Ready for tap-through |
| CSA3-EVT-004 | Opening checks | Pass | Pass (Certified evidence captured) |
| CSA3-EVT-005 | Closing checks | Pass | Pass (Certified evidence captured) |
| CSA3-EVT-010 | Temperature control | Pass | Previously proven |

## The Companion Validation Loop

Every new capability follows the same lifecycle:

1. Build Adapter
2. TypeScript Compile
3. Adapter Regression
4. Runtime Expansion Harness
5. Mobile Tap-through
6. Interaction Record Viewer
7. Raw JSON Validation
8. Proof Artifact
9. CCCM Updated

## Required Validation Steps

1. Run TypeScript compile validation.
2. Run positive Companion Runtime harness.
3. Run negative Companion Runtime harness.
4. Run adapter regression suite(s) for affected capabilities.
5. Execute mobile tap-through for each selected event.
6. Confirm each event produces canonical Interaction Record sections:
   - Context
   - Decision
   - Authority
   - Action
   - Evidence
   - Reflection
   - Review Outcome
7. Confirm csaConformant=true and contractViolations=[] for expected-positive runs.

## Evidence Package Requirements

- Screenshots per event from workflow and Interaction Record Viewer.
- Raw JSON excerpt per event with accepted/conformant fields.
- Validation command outputs recorded in summary.
- Issues discovered and applied fixes.

### CSA3-EVT-001 Equipment Fault Certification Evidence

Certification proof reference:

- docs/proofs/PROOF-0007-CC-003-EQUIPMENT-FAULT-CERTIFICATION.md

Live interaction record validated (2026-07-27):

- interactionId: fault-1785171050125
- capabilityId: equipment.fault.report
- actor: userId 4, role manager, siteId 2
- decision.disposition: proceed
- authority.disposition: allow
- action.outcome: succeeded
- action.sideEffects includes escalation-related follow-up requirements
- evidence.provenance: companion-runtime v0.1.0 (schemaVersion 1.0)
- reflection captured
- contractViolations: []
- csaConformant: true

Persistence check:

- Companion Review record remained present after app reload/reopen flow.

### CSA3-EVT-002 Corrective Action Certification Evidence

Certification proof reference:

- docs/proofs/PROOF-0008-CC-004-CORRECTIVE-ACTION-CERTIFICATION.md

Live interaction record validated (2026-07-27):

- interactionId: corrective-1785171783624
- capabilityId: corrective.action.complete
- actor: userId 4, role manager, siteId 2
- decision.disposition: proceed
- authority.disposition: allow
- action.outcome: succeeded
- action.sideEffects includes manager-review-required and follow-up-assignment-required
- evidence.provenance: companion-runtime v0.1.0 (schemaVersion 1.0)
- reflection captured
- contractViolations: []
- csaConformant: true

Persistence check:

- Corrective action record remained present after reload and Refresh Records in Companion Review.

### CSA3-EVT-003 Cleaning Closure Checklist

1. Capture cleaning trace JSON from Interaction Record Viewer with:
   - `capabilityId: "cleaning.complete"`
   - `interactionId` prefixed `cleaning-`
   - `decision.disposition: "proceed"`
   - `action.attempted: true` and `action.outcome: "succeeded"`
   - `csaConformant: true` and `contractViolations: []`
2. Record operational-to-companion correlation using:
   - cleaning task/check ID
   - site ID
   - completion timestamp from operational record
   - cleaning interaction ID
   - runtime trace timestamp
3. Capture high-risk branch evidence with a finding note and confirm:
   - `decisionSnapshot.risk: "High"`
   - `action.sideEffects` includes `follow-up-review-required`
4. Verify local persistence after full app restart:
   - record appears before close
   - record remains after reopen
5. Attach five closure artefacts:
   - cleaning modal screenshot
   - success message with interaction ID
   - manager-visible completion record
   - cleaning runtime JSON (normal branch)
   - cleaning runtime JSON (finding/high-risk branch)

### CSA3-EVT-004 Opening Checks Certification Evidence

Certification proof reference:

- docs/proofs/PROOF-0009-CC-005-OPENING-CHECKS-CERTIFICATION.md

Live interaction record validated (2026-07-27):

- interactionId: opening-1785173207113
- capabilityId: opening.checks.complete
- actor: userId 4, role manager, siteId 2
- decision.disposition: proceed
- authority.disposition: allow
- action.outcome: succeeded
- action.sideEffects includes opening-checks-completion-recorded
- evidence.provenance: companion-runtime v0.1.0 (schemaVersion 1.0)
- reflection captured
- contractViolations: []
- csaConformant: true

Persistence check:

- Opening checks record remained present after reload and Refresh Records in Companion Review.

### CSA3-EVT-005 Closing Checks Certification Evidence

Certification proof reference:

- docs/proofs/PROOF-0010-CC-006-CLOSING-CHECKS-CERTIFICATION.md

Live interaction record validated (2026-07-27):

- interactionId: closing-1785173802880
- capabilityId: closing.checks.complete
- actor: userId 4, role manager, siteId 2
- decision.disposition: proceed
- authority.disposition: allow
- action.outcome: succeeded
- action.sideEffects includes closing-follow-up-required
- evidence.provenance: companion-runtime v0.1.0 (schemaVersion 1.0)
- reflection captured
- contractViolations: []
- csaConformant: true

Persistence check:

- Closing checks record remained present after reload and Refresh Records in Companion Review.

## Acceptance Criteria

- At least 5 distinct event types pass end-to-end through the same runtime pipeline.
- Each passing event yields a canonical Interaction Record.
- Runtime contracts remain active and enforceable.
- Governance review is possible for every validated event.
- No critical regression to existing temperature workflow.

## Output Artefacts

- PROOF-0006 documenting multi-capability operational validation.
- Updated validation record with pass/fail by scenario ID.
- Linked screenshot and raw JSON evidence under docs/proofs/artifacts/.

## Notes

Operational Communications are validated as Operational Events, not as a standalone messaging subsystem.

## Outcome

Successful completion of CSA-0003 enables progression to the following architectural milestones:

- Milestone 2 - Venue Intelligence
- Milestone 3 - Operational Communications
- Milestone 4 - Voice Input Adapter

Roadmap reference:

- docs/architecture/COMPANION-RUNTIME-EVOLUTION.md
