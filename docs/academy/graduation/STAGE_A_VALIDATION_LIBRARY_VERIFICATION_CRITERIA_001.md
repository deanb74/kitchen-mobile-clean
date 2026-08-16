# Stage A Validation Library Verification Criteria 001

**Volume:** VIII - Graduation
**Document ID:** STAGE_A_VALIDATION_LIBRARY_VERIFICATION_CRITERIA_001
**Status:** Evidence-Criteria Record
**Source scope:** [Stage A Validation Library Verification Scope 001](STAGE_A_VALIDATION_LIBRARY_VERIFICATION_SCOPE_001.md)
**Purpose:** Define the criteria by which the Stage A gap, `Validation Library Operational`, could be assessed.
**Decision authority:** None. This record does not perform verification, assign outcomes, alter the Stage A `HOLD` outcome, enable Stage B, or make a graduation recommendation or governance decision.

## 1. Meaning of Validation Library Operational in Stage A

Within the Stage A Academy graduation context, `Validation Library Operational` means that the Academy can identify and assess validation design, execution, evidence capture, focused verification, regression evidence, repeatability, coverage, traceability, and unknowns across the validation scope required for professional graduation.

It does not mean:

- validation documents or test structures merely exist;
- a single completed set establishes complete coverage;
- a focused verification proves all validation dimensions;
- a regression-confirmed baseline establishes professional-graduation coverage;
- validation evidence creates certification, Stage B authority, or a graduation decision.

## 2. Evidence Categories and Assessment Criteria

| Evidence category | Criterion for future assessment | Does not establish alone |
|---|---|---|
| Validation design | A validation set identifies a stated objective, theme, scenario or variation scope, and expected reasoning or behavioural boundary. | Executed validation or a passing outcome |
| Validation execution | A validation record identifies completed runs, recorded outcomes, and the scope actually exercised. | Complete validation-library coverage |
| Evidence capture | A validation claim is linked to a bounded execution record or artefact that identifies the relevant source, outcome, and scope. | Validity beyond the captured scope |
| Focused verification | A focused verification identifies its hypothesis, scenarios, observed outcome, and stated limit. | Whole-library operation or graduation readiness |
| Regression evidence | A rerun identifies its baseline, its preserved or changed behaviour, and the resulting bounded regression observation. | Coverage of untested dimensions or sets |
| Repeatability | Repeated or varied runs identify the conditions compared and the consistency observed within those conditions. | Repeatability across all planned validation sets or professional contexts |
| Coverage | Completed validation evidence can be mapped against the required Stage A professional-graduation validation dimensions, with unexecuted or pending areas visible. | Completion inferred from planned, documented, or partial coverage |
| Traceability | Each assessment statement can be linked to source path, execution record, artefact where available, and stated scope. | Sufficiency of evidence by linkage alone |
| Unknown preservation | Missing runs, artefacts, outcomes, scope connections, and coverage dimensions are recorded as `UNKNOWN`. | A PASS outcome |

## 3. Validation Design

Validation design establishes the intended validation objective and planned scope. A future assessment must distinguish a designed set from an executed set.

```text
VALIDATION_DESIGN != VALIDATION_EXECUTION
DOCUMENTATION != VERIFICATION
```

A design record may be assessed only for its stated objective, variation plan, and expected scope. It must not be treated as evidence that the design was executed or that its conditions passed.

## 4. Validation Execution

Validation execution requires a direct record of the runs completed, the outcomes recorded, and the scope actually exercised. A future assessment must retain the distinction between planned runs and completed runs.

An executed validation set may establish results for its stated set and variations. It must not be generalised to unexecuted sets, untested conditions, or complete library coverage.

```text
EXECUTED_VALIDATION_SET != COMPLETE_VALIDATION_LIBRARY
```

## 5. Evidence Capture

Evidence capture requires a bounded record or linked artefact that supports the specific validation claim. The record must preserve enough identity, outcome, and scope information to distinguish the observed result from a summary or narrative assertion.

The presence of evidence-capture tooling or focused tests may be relevant only where direct execution or test evidence supports the capture claim. Tooling existence does not establish that all validation evidence is captured, sufficient, or complete.

```text
EVIDENCE_CAPTURE_TOOLING != COMPLETE_EVIDENCE_CAPTURE
```

## 6. Focused Verification

Focused verification requires a stated hypothesis, defined scenarios, observed results, and a declared bounded scope. A future assessment must distinguish focused verification from validation-library coverage.

```text
FOCUSED_VERIFICATION != COMPLETE_VALIDATION_COVERAGE
```

A focused result may establish its stated hypothesis. It does not establish every validation dimension needed for Stage A.

## 7. Regression Evidence

Regression evidence requires a baseline and a recorded rerun or comparison against that baseline. A future assessment must identify the baseline scope, the change or preservation observed, and any remaining limits.

```text
REGRESSION_CONFIRMATION != UNTESTED_COVERAGE
```

Regression confirmation may establish preservation within its stated baseline. It must not be treated as evidence for unexecuted validation sets or broader professional-graduation coverage.

## 8. Repeatability

Repeatability evidence requires explicit comparative conditions, such as variations or reruns, and a stated account of the consistency observed within those conditions.

A future assessment must record:

- the variations or reruns compared;
- the validation dimension assessed;
- the recorded consistency result;
- all untested conditions and dimensions that remain outside the comparison.

```text
BOUNDED_REPEATABILITY != WHOLE_LIBRARY_REPEATABILITY
```

## 9. Coverage

Coverage assessment requires mapping what has completed against the validation dimensions required for Stage A professional graduation. Completed evidence, pending sets, unexecuted plans, and unrepresented dimensions must remain distinct.

```text
BOUNDED_VALIDATION != COMPLETE_VALIDATION_COVERAGE
```

A future assessment must not infer coverage from the existence of a validation library, the completion of one set, a focused verification, or a regression baseline.

## 10. Traceability

Every future assessment conclusion must identify:

- the source path;
- the evidence category;
- the validation subject, scenario, set, or run where applicable;
- the observed or recorded outcome;
- the demonstrated scope;
- the limits and dependencies of the conclusion.

Traceability permits review of a claim's origin. It does not establish the claim's sufficiency beyond the evidence scope recorded.

## 11. Unknown Preservation

A future assessment must retain `UNKNOWN` where:

- a validation set or planned variation lacks direct execution evidence;
- a completed run, artefact, or outcome cannot be linked to the claim;
- an evidence-capture assertion has no direct test or execution support;
- a focused verification or regression result is not relevant to the asserted coverage dimension;
- a connection from completed evidence to professional-graduation coverage is not directly established;
- evidence belongs to formation, constitutional, implementation, certification, or governance scope instead.

```text
UNKNOWN_REMAINS_UNKNOWN
DOCUMENTATION_DOES_NOT_FILL_EVIDENCE_GAPS
```

## 12. Criteria, Verification, and Governance Boundaries

| Layer | Permitted role | Must not become |
|---|---|---|
| Criteria | Define what Validation Library Operational verification must distinguish and assess | Verification evidence or a readiness outcome |
| Verification | Assess in-scope validation evidence and record supported limits and unknowns | Certification, Stage B authorisation, or graduation decision |
| Governance decision | Make an authorised human conclusion from sufficient verified evidence across Stage A scopes | An automatic consequence of validation evidence or a passing test |

```text
DOCUMENTATION != VERIFICATION
VERIFICATION != GOVERNANCE_DECISION
VALIDATION_EVIDENCE != GRADUATION_DECISION
BOUNDED_VALIDATION != COMPLETE_VALIDATION_COVERAGE
UNKNOWN_REMAINS_UNKNOWN
```

## 13. Preserved Stage A Outcome

**Stage A Outcome:** HOLD

This criteria record does not perform Validation Library Operational verification, assign `PASS`, `PARTIAL`, or `UNKNOWN` outcomes, resolve the Stage A gap, or authorise Stage B.
