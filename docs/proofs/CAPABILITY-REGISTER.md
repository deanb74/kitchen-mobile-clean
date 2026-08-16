# Capability Register

Status: Active
Owner: Companion Runtime Engineering
Date opened: 2026-07-27

## Purpose

Provide one authoritative register for every certified capability identity across Helping Hand.

## Model

- `CSA` identifies the capability specification revision.
- `CC` identifies the long-lived certified capability.
- A single `CC` can map to multiple CSA revisions over time.

## Stewardship Contract Requirement

Every governed capability must carry an explicit stewardship contract.

Minimum required stewardship fields:

1. technical steward
2. capability steward
3. bounded purpose
4. can do / cannot do
5. input assumptions and data prerequisites
6. known failure modes
7. evaluation method
8. confidence and uncertainty disclosure expectation
9. decision criticality class
10. permitted uses / prohibited uses
11. escalation conditions
12. profession or context meaning owners
13. authority envelope
14. lifecycle, version, and deprecation path

Core separation that must remain explicit:

- technical steward owns capability integrity;
- professional or context owner owns meaning;
- judgement owns appropriateness;
- authority owns permission;
- execution owns state-change evidence.

## Evidence Strength and Ownership Source Rule

For each stewardship contract field, reviewers must record:

1. Evidence strength class: Directly evidenced, Governed derivation, or Evidence gap
2. Accountable evidence source boundary

A field must never be silently inferred only to complete a contract.

Required source boundaries by field type:

- technical integrity: Digital or technical stewardship
- capability-specific boundaries: capability stewardship
- professional meaning ownership: relevant Profession HQ
- profession-sensitive escalation thresholds: relevant Profession HQ
- authority envelope: authority or governance evidence
- lifecycle or deprecation: capability governance

Runtime actor evidence alone does not establish professional meaning ownership.

## Capability Entries

| Capability ID | Name | Current CSA revision | Runtime version first certified | Certification status | Date certified | Latest review | Evidence location | Successor CSA revisions |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CC-001 | Cleaning Completion | CSA-0003 | 0.1.0 | Certified | 2026-07-27 | 2026-07-27 | docs/proofs/PROOF-0006-CSA-0003-CLEANING-CAPABILITY-VALIDATION.md | None recorded |
| CC-002 | Temperature Control | CSA-0002 | 0.1.0 | Certified | 2026-07-27 | 2026-07-27 | docs/proofs/PROOF-0005-FIRST-LIVE-COMPANION-OPERATION.md | CSA-0003 control row (CSA3-EVT-010) |
| CC-003 | Equipment Fault | CSA-0003 | 0.1.0 | Certified | 2026-07-27 | 2026-07-27 | docs/proofs/PROOF-0007-CC-003-EQUIPMENT-FAULT-CERTIFICATION.md | None recorded |
| CC-004 | Corrective Action | CSA-0003 | 0.1.0 | Certified | 2026-07-27 | 2026-07-27 | docs/proofs/PROOF-0008-CC-004-CORRECTIVE-ACTION-CERTIFICATION.md | None recorded |
| CC-005 | Opening Checks | CSA-0003 | 0.1.0 | Certified | 2026-07-27 | 2026-07-27 | docs/proofs/PROOF-0009-CC-005-OPENING-CHECKS-CERTIFICATION.md | None recorded |
| CC-006 | Closing Checks | CSA-0003 | 0.1.0 | Certified | 2026-07-27 | 2026-07-27 | docs/proofs/PROOF-0010-CC-006-CLOSING-CHECKS-CERTIFICATION.md | None recorded |

## Stewardship Contract Index (Required)

The following index fields must be present for each new or recertified capability entry.

| Capability ID | Contract status | Technical steward | Capability steward | Meaning owners (profession/context) | Authority envelope | Lifecycle/deprecation status | Contract evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CC-001 | Backfilled (2026-08-09) | Cyril (Technical, Security, Capability evolution stewardship boundary) | Companion Runtime Engineering (register owner) under Digital stewardship | Operations context owner (site manager/staff role context); profession-level owner not explicitly named in current proof package | Runtime authority allowlist + authority decision gating (no independent execution authority claim) | Certified / active / deprecation not yet defined | docs/proofs/PROOF-0006-CSA-0003-CLEANING-CAPABILITY-VALIDATION.md |
| CC-002 | Backfilled (2026-08-09) | Cyril (Technology, Security, Platform stability, Capability evolution) | Companion Runtime Engineering (register owner) | Hospitality operations context is evidenced; explicit profession-level meaning owner not named | Runtime authority disposition and conformance evidence recorded in first live run | Certified / active / deprecation not yet defined | docs/proofs/PROOF-0005-FIRST-LIVE-COMPANION-OPERATION.md |
| CC-003 | Backfilled (2026-08-09) | Cyril (Technology, Security, Platform stability, Capability evolution) | Companion Runtime Engineering (register owner) | Hospitality operations context is evidenced; explicit profession-level meaning owner not named | Runtime authority disposition and conformance evidence recorded in certification run | Certified / active / deprecation not yet defined | docs/proofs/PROOF-0007-CC-003-EQUIPMENT-FAULT-CERTIFICATION.md |
| CC-004 | Backfilled (2026-08-09) | Cyril (Technology, Security, Platform stability, Capability evolution) | Companion Runtime Engineering (register owner) | Hospitality operations context is evidenced; explicit profession-level meaning owner not named | Runtime authority disposition and conformance evidence recorded in certification run | Certified / active / deprecation not yet defined | docs/proofs/PROOF-0008-CC-004-CORRECTIVE-ACTION-CERTIFICATION.md |
| CC-005 | Backfilled (2026-08-09) | Cyril (Technology, Security, Platform stability, Capability evolution) | Companion Runtime Engineering (register owner) | Hospitality operations context is evidenced; explicit profession-level meaning owner not named | Runtime authority disposition and conformance evidence recorded in certification run | Certified / active / deprecation not yet defined | docs/proofs/PROOF-0009-CC-005-OPENING-CHECKS-CERTIFICATION.md |
| CC-006 | Backfilled (2026-08-09) | Cyril (Technology, Security, Platform stability, Capability evolution) | Companion Runtime Engineering (register owner) | Hospitality operations context is evidenced; explicit profession-level meaning owner not named | Runtime authority disposition and conformance evidence recorded in certification run | Certified / active / deprecation not yet defined | docs/proofs/PROOF-0010-CC-006-CLOSING-CHECKS-CERTIFICATION.md |

## Legacy Backfill Example (Single Entry)

### CC-001 - Cleaning Completion

Source evidence used for backfill:

- docs/proofs/PROOF-0006-CSA-0003-CLEANING-CAPABILITY-VALIDATION.md
- docs/organisation/BOARD_AND_STEWARDSHIP.md

Contract fields:

| Contract field | Backfilled value | Evidence status |
| --- | --- | --- |
| capability identity and name | CC-001 / Cleaning Completion (`cleaning.complete`) | Supported |
| bounded purpose | Record and govern cleaning completion through the Companion Runtime pipeline with contract-conformant interaction evidence | Supported |
| technical steward | Cyril stewardship boundary (Technology, Security, Platform stability, Capability evolution) | Supported |
| capability steward | Companion Runtime Engineering (register owner) under Digital stewardship | Supported |
| what it can do | Execute cleaning completion operational flow and produce governed interaction records, including low-risk and high-risk branches | Supported |
| what it cannot do | No evidence supports independent authority to bypass runtime authority gating, fabricate identity, or bypass evidence requirements | Partially supported |
| input assumptions and data prerequisites | Requires cleaning task/check context, site context, actor context; identity fallback behavior documented | Partially supported |
| known failure modes | Allowlist mismatch causing denial; identity resolution can produce unknown-user when claims are absent; high-risk branch requires follow-up-review-required side effect | Supported |
| evaluation method | Typecheck, adapter tests, runtime expansion tests, branch validation, live operational evidence, persistence verification | Supported |
| confidence and uncertainty disclosure expectation | Not explicitly documented as a contract field in proof | Evidence gap |
| decision criticality class | Low-risk and high-risk branch distinction is explicit; full criticality taxonomy not explicit | Partially supported |
| permitted uses | Operational cleaning completion event processing through governed runtime with valid role/allowlist | Supported |
| prohibited uses | Bypass authority/evidence or run outside role boundaries is not permitted by authority model; explicit capability-specific prohibited list not present in proof | Partially supported |
| escalation conditions | High-risk branch emits follow-up-review-required side effect; broader escalation thresholds are not fully explicit in proof text | Partially supported |
| relevant profession/context meaning owners | Operational venue role owners (manager/staff) visible in evidence; explicit profession-owner naming not present | Partially supported |
| authority envelope | Runtime authority disposition (`allow`/`deny`/`require-human`) applies; staff allowlist correction explicitly recorded | Supported |
| version and change history | CSA-0003 certified; correction history and regressions fixed are recorded in proof; CC-level successor path is none recorded | Supported |
| retirement and deprecation path | Not defined for CC-001 in current proof package or register row | Evidence gap |

Backfill outcome:

- CC-001 is now populated as one legacy stewardship-contract example.
- CC-002 through CC-006 are now backfilled under the refined stewardship model.

## Legacy Stewardship Backfill Records

Evidence strength classes used below:

- Directly evidenced
- Governed derivation
- Evidence gap

Unresolved owner boundary is required only when the field is currently an evidence gap.

### CC-002 - Temperature Control

Source evidence used:

- docs/proofs/PROOF-0005-FIRST-LIVE-COMPANION-OPERATION.md
- docs/proofs/VALIDATION-CSA-0003-MULTI-CAPABILITY.md
- docs/organisation/BOARD_AND_STEWARDSHIP.md

| Contract field | Backfilled value | Evidence strength class | Unresolved owner boundary (if gap) |
| --- | --- | --- | --- |
| capability identity and name | CC-002 / Temperature Control (`temperature.log`) | Directly evidenced | Not applicable (resolved) |
| bounded purpose | Governed, end-to-end temperature recording through Companion Runtime with canonical Interaction Record evidence | Directly evidenced | Not applicable (resolved) |
| technical steward | Cyril stewardship boundary (Technology, Security, Platform stability, Capability evolution) | Governed derivation | Not applicable (resolved) |
| capability steward | Companion Runtime Engineering (register owner) | Governed derivation | Not applicable (resolved) |
| what it can do | Execute governed temperature recording workflow and produce CSA-conformant Interaction Record with no contract violations | Directly evidenced | Not applicable (resolved) |
| what it cannot do | No evidence supports bypassing decision or authority gating, bypassing evidence production, or independent authority override | Governed derivation | Not applicable (resolved) |
| input assumptions and data prerequisites | Requires operational temperature submission context, actor identity context, and site context | Governed derivation | Not applicable (resolved) |
| known failure modes | Historical run identified unknown-user risk in identity fallback and routing friction before fixes | Directly evidenced | Not applicable (resolved) |
| evaluation method | Typecheck, runtime positive and negative harness, adapter test, live mobile execution, raw JSON and viewer validation | Directly evidenced | Not applicable (resolved) |
| confidence and uncertainty disclosure expectation | Not explicitly defined as a governed disclosure statement in current CC-002 proof package | Evidence gap | Capability stewardship |
| decision criticality class | No explicit criticality taxonomy for temperature events is recorded in CC-002 proof package | Evidence gap | Capability stewardship |
| permitted uses | Temperature recording in Kitchen Daily Checks through governed runtime and review surface | Directly evidenced | Not applicable (resolved) |
| prohibited uses | Capability-specific prohibited-use list is not explicitly recorded | Evidence gap | Capability stewardship |
| escalation conditions | Escalation thresholds for temperature context are not explicitly defined in CC-002 proof package | Evidence gap | Profession HQ |
| relevant profession/context meaning owners | Manager/staff context is visible but explicit profession-level meaning owner is not named | Evidence gap | Profession HQ |
| authority envelope | decision.disposition proceed with authority.disposition allow and contract-conformant output | Directly evidenced | Not applicable (resolved) |
| version and change history | CSA-0002 accepted and identified as predecessor to CSA3-EVT-010 temperature control evidence | Directly evidenced | Not applicable (resolved) |
| retirement and deprecation path | No CC-level retirement/deprecation and successor evidence-continuity contract is defined | Evidence gap | Capability lifecycle governance |

Responsibility separation check:

- technical integrity: evidenced via runtime conformance and technical stewardship boundary
- capability boundary: evidenced as temperature workflow envelope
- professional/context meaning: unresolved explicit named owner
- judgement: evidenced through decision stage presence
- authority: evidenced through authority disposition
- execution: evidenced through action outcome and side effects
- reflection/learning: evidenced through Interaction Record reflection and review flow

### CC-003 - Equipment Fault

Source evidence used:

- docs/proofs/PROOF-0007-CC-003-EQUIPMENT-FAULT-CERTIFICATION.md
- docs/proofs/VALIDATION-CSA-0003-MULTI-CAPABILITY.md
- docs/organisation/BOARD_AND_STEWARDSHIP.md

| Contract field | Backfilled value | Evidence strength class | Unresolved owner boundary (if gap) |
| --- | --- | --- | --- |
| capability identity and name | CC-003 / Equipment Fault (`equipment.fault.report`) | Directly evidenced | Not applicable (resolved) |
| bounded purpose | Certify exception-based equipment fault reporting through governed Companion Runtime path | Directly evidenced | Not applicable (resolved) |
| technical steward | Cyril stewardship boundary (Technology, Security, Platform stability, Capability evolution) | Governed derivation | Not applicable (resolved) |
| capability steward | Companion Runtime Engineering (register owner) | Governed derivation | Not applicable (resolved) |
| what it can do | Record equipment fault report, preserve conformance, and emit escalation-related side effects in governed flow | Directly evidenced | Not applicable (resolved) |
| what it cannot do | No evidence supports bypassing decision or authority gating, bypassing evidence production, or independent authority override | Governed derivation | Not applicable (resolved) |
| input assumptions and data prerequisites | Requires equipment item and severity context plus actor and site context | Governed derivation | Not applicable (resolved) |
| known failure modes | Capability-specific failure-mode catalogue is not explicitly recorded in certification proof | Evidence gap | Capability stewardship |
| evaluation method | Live governed event execution, canonical Interaction Record validation, review outcome capture, persistence verification | Directly evidenced | Not applicable (resolved) |
| confidence and uncertainty disclosure expectation | Not explicitly defined as a governed disclosure statement in current CC-003 proof package | Evidence gap | Capability stewardship |
| decision criticality class | Exception and high-severity scenario are evidenced but criticality taxonomy is not explicitly governed for this capability | Governed derivation | Not applicable (resolved) |
| permitted uses | Equipment fault reporting in governed runtime with reviewable evidence outputs | Directly evidenced | Not applicable (resolved) |
| prohibited uses | Capability-specific prohibited-use list is not explicitly recorded | Evidence gap | Capability stewardship |
| escalation conditions | Escalation-related side effects are present, but profession-sensitive threshold definitions are not explicitly governed | Evidence gap | Profession HQ |
| relevant profession/context meaning owners | Operational manager context is visible but explicit profession-level meaning owner is not named | Evidence gap | Profession HQ |
| authority envelope | decision.disposition proceed with authority.disposition allow and csaConformant true | Directly evidenced | Not applicable (resolved) |
| version and change history | CSA-0003 certified for CC-003 with dated certification proof | Directly evidenced | Not applicable (resolved) |
| retirement and deprecation path | No CC-level retirement/deprecation and successor evidence-continuity contract is defined | Evidence gap | Capability lifecycle governance |

Responsibility separation check:

- technical integrity: evidenced via conformance and stewardship boundary
- capability boundary: evidenced as equipment fault reporting envelope
- professional/context meaning: unresolved explicit named owner
- judgement: evidenced through decision stage
- authority: evidenced through authority stage
- execution: evidenced through action outcome and side effects
- reflection/learning: evidenced through reflection findings and review outcome

### CC-004 - Corrective Action

Source evidence used:

- docs/proofs/PROOF-0008-CC-004-CORRECTIVE-ACTION-CERTIFICATION.md
- docs/proofs/VALIDATION-CSA-0003-MULTI-CAPABILITY.md
- docs/organisation/BOARD_AND_STEWARDSHIP.md

| Contract field | Backfilled value | Evidence strength class | Unresolved owner boundary (if gap) |
| --- | --- | --- | --- |
| capability identity and name | CC-004 / Corrective Action (`corrective.action.complete`) | Directly evidenced | Not applicable (resolved) |
| bounded purpose | Certify live corrective-action completion through governed Companion Runtime path | Directly evidenced | Not applicable (resolved) |
| technical steward | Cyril stewardship boundary (Technology, Security, Platform stability, Capability evolution) | Governed derivation | Not applicable (resolved) |
| capability steward | Companion Runtime Engineering (register owner) | Governed derivation | Not applicable (resolved) |
| what it can do | Record corrective action completion with governance review and persistence evidence | Directly evidenced | Not applicable (resolved) |
| what it cannot do | No evidence supports bypassing decision or authority gating, bypassing evidence production, or independent authority override | Governed derivation | Not applicable (resolved) |
| input assumptions and data prerequisites | Requires compliance-risk context, corrective action text, actor context, and site context | Governed derivation | Not applicable (resolved) |
| known failure modes | Capability-specific failure-mode catalogue is not explicitly recorded in certification proof | Evidence gap | Capability stewardship |
| evaluation method | Live event execution, canonical JSON confirmation, review outcome capture, and persistence verification | Directly evidenced | Not applicable (resolved) |
| confidence and uncertainty disclosure expectation | Not explicitly defined as a governed disclosure statement in current CC-004 proof package | Evidence gap | Capability stewardship |
| decision criticality class | Risk context is evidenced but explicit criticality taxonomy is not governed in current proof | Governed derivation | Not applicable (resolved) |
| permitted uses | Corrective action completion and review within governed runtime | Directly evidenced | Not applicable (resolved) |
| prohibited uses | Capability-specific prohibited-use list is not explicitly recorded | Evidence gap | Capability stewardship |
| escalation conditions | Side effects include manager review and follow-up, but profession-sensitive threshold definitions are not explicitly governed | Evidence gap | Profession HQ |
| relevant profession/context meaning owners | Operational manager context is visible but explicit profession-level meaning owner is not named | Evidence gap | Profession HQ |
| authority envelope | decision.disposition proceed with authority.disposition allow and csaConformant true | Directly evidenced | Not applicable (resolved) |
| version and change history | CSA-0003 certified for CC-004 with dated certification proof | Directly evidenced | Not applicable (resolved) |
| retirement and deprecation path | No CC-level retirement/deprecation and successor evidence-continuity contract is defined | Evidence gap | Capability lifecycle governance |

Responsibility separation check:

- technical integrity: evidenced via conformance and stewardship boundary
- capability boundary: evidenced as corrective action completion envelope
- professional/context meaning: unresolved explicit named owner
- judgement: evidenced through decision stage
- authority: evidenced through authority stage
- execution: evidenced through action outcome and side effects
- reflection/learning: evidenced through reflection findings and review outcome

### CC-005 - Opening Checks

Source evidence used:

- docs/proofs/PROOF-0009-CC-005-OPENING-CHECKS-CERTIFICATION.md
- docs/proofs/VALIDATION-CSA-0003-MULTI-CAPABILITY.md
- docs/organisation/BOARD_AND_STEWARDSHIP.md

| Contract field | Backfilled value | Evidence strength class | Unresolved owner boundary (if gap) |
| --- | --- | --- | --- |
| capability identity and name | CC-005 / Opening Checks (`opening.checks.complete`) | Directly evidenced | Not applicable (resolved) |
| bounded purpose | Certify opening-check completion event through governed Companion Runtime path | Directly evidenced | Not applicable (resolved) |
| technical steward | Cyril stewardship boundary (Technology, Security, Platform stability, Capability evolution) | Governed derivation | Not applicable (resolved) |
| capability steward | Companion Runtime Engineering (register owner) | Governed derivation | Not applicable (resolved) |
| what it can do | Record opening check completion and produce canonical reviewable runtime evidence | Directly evidenced | Not applicable (resolved) |
| what it cannot do | No evidence supports bypassing decision or authority gating, bypassing evidence production, or independent authority override | Governed derivation | Not applicable (resolved) |
| input assumptions and data prerequisites | Requires selected opening check, note content, actor context, and site context | Governed derivation | Not applicable (resolved) |
| known failure modes | Capability-specific failure-mode catalogue is not explicitly recorded in certification proof | Evidence gap | Capability stewardship |
| evaluation method | Live event execution, canonical JSON confirmation, review outcome capture, and persistence verification | Directly evidenced | Not applicable (resolved) |
| confidence and uncertainty disclosure expectation | Not explicitly defined as a governed disclosure statement in current CC-005 proof package | Evidence gap | Capability stewardship |
| decision criticality class | No explicit criticality taxonomy is recorded for opening checks in current proof package | Evidence gap | Capability stewardship |
| permitted uses | Opening-check completion in governed runtime with persisted review trace | Directly evidenced | Not applicable (resolved) |
| prohibited uses | Capability-specific prohibited-use list is not explicitly recorded | Evidence gap | Capability stewardship |
| escalation conditions | Capability records completion, but profession-sensitive escalation thresholds are not explicitly governed | Evidence gap | Profession HQ |
| relevant profession/context meaning owners | Operational manager context is visible but explicit profession-level meaning owner is not named | Evidence gap | Profession HQ |
| authority envelope | decision.disposition proceed with authority.disposition allow and csaConformant true | Directly evidenced | Not applicable (resolved) |
| version and change history | CSA-0003 certified for CC-005 with dated certification proof | Directly evidenced | Not applicable (resolved) |
| retirement and deprecation path | No CC-level retirement/deprecation and successor evidence-continuity contract is defined | Evidence gap | Capability lifecycle governance |

Responsibility separation check:

- technical integrity: evidenced via conformance and stewardship boundary
- capability boundary: evidenced as opening-check completion envelope
- professional/context meaning: unresolved explicit named owner
- judgement: evidenced through decision stage
- authority: evidenced through authority stage
- execution: evidenced through action outcome and side effects
- reflection/learning: evidenced through reflection findings and review outcome

### CC-006 - Closing Checks

Source evidence used:

- docs/proofs/PROOF-0010-CC-006-CLOSING-CHECKS-CERTIFICATION.md
- docs/proofs/VALIDATION-CSA-0003-MULTI-CAPABILITY.md
- docs/organisation/BOARD_AND_STEWARDSHIP.md

| Contract field | Backfilled value | Evidence strength class | Unresolved owner boundary (if gap) |
| --- | --- | --- | --- |
| capability identity and name | CC-006 / Closing Checks (`closing.checks.complete`) | Directly evidenced | Not applicable (resolved) |
| bounded purpose | Certify closing-check completion event through governed Companion Runtime path | Directly evidenced | Not applicable (resolved) |
| technical steward | Cyril stewardship boundary (Technology, Security, Platform stability, Capability evolution) | Governed derivation | Not applicable (resolved) |
| capability steward | Companion Runtime Engineering (register owner) | Governed derivation | Not applicable (resolved) |
| what it can do | Record closing check completion and produce canonical reviewable runtime evidence | Directly evidenced | Not applicable (resolved) |
| what it cannot do | No evidence supports bypassing decision or authority gating, bypassing evidence production, or independent authority override | Governed derivation | Not applicable (resolved) |
| input assumptions and data prerequisites | Requires selected closing check, note content, actor context, and site context | Governed derivation | Not applicable (resolved) |
| known failure modes | Capability-specific failure-mode catalogue is not explicitly recorded in certification proof | Evidence gap | Capability stewardship |
| evaluation method | Live event execution, canonical JSON confirmation, review outcome capture, and persistence verification | Directly evidenced | Not applicable (resolved) |
| confidence and uncertainty disclosure expectation | Not explicitly defined as a governed disclosure statement in current CC-006 proof package | Evidence gap | Capability stewardship |
| decision criticality class | Closing side effect exists but explicit criticality taxonomy is not governed in current proof package | Governed derivation | Not applicable (resolved) |
| permitted uses | Closing-check completion in governed runtime with persisted review trace | Directly evidenced | Not applicable (resolved) |
| prohibited uses | Capability-specific prohibited-use list is not explicitly recorded | Evidence gap | Capability stewardship |
| escalation conditions | Side effect evidence exists (closing-follow-up-required), but profession-sensitive threshold definitions are not explicitly governed | Evidence gap | Profession HQ |
| relevant profession/context meaning owners | Operational manager context is visible but explicit profession-level meaning owner is not named | Evidence gap | Profession HQ |
| authority envelope | decision.disposition proceed with authority.disposition allow and csaConformant true | Directly evidenced | Not applicable (resolved) |
| version and change history | CSA-0003 certified for CC-006 with dated certification proof | Directly evidenced | Not applicable (resolved) |
| retirement and deprecation path | No CC-level retirement/deprecation and successor evidence-continuity contract is defined | Evidence gap | Capability lifecycle governance |

Responsibility separation check:

- technical integrity: evidenced via conformance and stewardship boundary
- capability boundary: evidenced as closing-check completion envelope
- professional/context meaning: unresolved explicit named owner
- judgement: evidenced through decision stage
- authority: evidenced through authority stage
- execution: evidenced through action outcome and side effects
- reflection/learning: evidenced through reflection findings and review outcome

Cross-capability observation (evidence only, no restructure):

- CC-005 and CC-006 behave as a checks-completion capability family with different operational phase contexts (opening vs closing).
- CC-003 and CC-004 behave as a risk-response capability family (fault report and corrective closure) with escalation-adjacent side effects.
- CC-001, CC-005, and CC-006 share completion-pattern mechanics and appear to be profession-specific applications of a broader completion capability pattern.
- CC-002 appears as a control/monitoring event lineage with explicit predecessor-to-successor validation history (CSA-0002 to CSA3-EVT-010).

## Stewardship Proof Candidates (Discovery Only)

These are governance proof candidates for stewardship-contract fitness.
They are not certified capability entries.

| Candidate ID | Name | Contract status | Technical steward | Capability steward | Meaning owners (profession/context) | Authority envelope summary | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CAND-000 | Mathematics / Computation | Populated in read-only stewardship proof | Digital (Cyril boundary) | Digital stewardship at current scale | Hospitality, Economics, Healthcare, other profession contexts | Advisory computation output; authority remains outside capability | docs/formation/00-formation/FORMATION-REGISTER.md |
| CAND-001 | Coding / Tool Execution | Populated in read-only stewardship proof | Digital (Cyril boundary) | Capability family with graduated envelopes | Technical and profession context owners by scenario | Advisory code generation vs governed state-change execution | docs/formation/00-formation/FORMATION-REGISTER.md |
| CAND-002 | Cyber Defence / Security Response | Discovery hold recorded; specialist validation required before any architecture settlement | Digital (Cyril boundary) for technical stewardship context only; independent challenge ownership unresolved | Candidate family only; no certified capability decomposition approved | Security meaning and threshold ownership unresolved pending specialist review | Candidate-only: bounded pre-authorisation and control-plane independence not settled as architecture | docs/proofs/CAPABILITY-REGISTER.md |

### CAND-002 - Cyber Defence / Security Response (Discovery Hold)

Status:

- Discovery only.
- No implementation authorised.
- No new Board or Profession HQ decision is recorded here.
- Findings are preserved for future Digital or Security specialist review.

What is already governed universally (do not re-decide in CAND-002):

- capability boundaries and stewardship are required
- judgement, authority, and execution responsibilities must remain distinct
- no self-authorisation of significant organisational change
- combined authority remains required for significant decisions
- evidence and provenance are mandatory
- reflection and governed learning are mandatory

Candidate questions requiring specialist Digital or Security review (not settled):

- independent Security Challenge responsibility
- emergency bounded pre-authorisation contract details
- authority-plane and evidence-plane independence with tamper resilience
- explicit security meaning ownership
- escalation-threshold ownership
- shared-LLM correlated failure risk across logically separate capabilities
- logical independence versus genuine technical independence
- cyber containment and recovery capability decomposition

Interpretation boundary for this candidate:

- Candidate findings must not be promoted to settled architecture without specialist validation.
- Statements from Candidate 2 remain candidate claims unless independently mandated by released canonical governance.

## Maintenance Rule

Whenever a capability status changes:

1. Update this register row.
2. Update the CCCM status in the active CSA validation document.
3. Link the relevant PROOF document.
4. Record review date and reviewer outcome.
5. Confirm the stewardship contract is complete for the entry.
6. Confirm meaning-owner and authority-envelope fields are explicit.
7. Record deprecation or successor path when lifecycle status changes.
