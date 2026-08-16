# Stage A Formation Verification Criteria 001

**Volume:** VIII - Graduation
**Document ID:** STAGE_A_FORMATION_VERIFICATION_CRITERIA_001
**Status:** Evidence-Criteria Record
**Source records:** [Stage A Formation Verification Scope 001](STAGE_A_FORMATION_VERIFICATION_SCOPE_001.md), [Stage A Academy Readiness Evidence 001](STAGE_A_ACADEMY_READINESS_EVIDENCE_001.md), [Stage A Readiness Gap Analysis 001](STAGE_A_READINESS_GAP_ANALYSIS_001.md), and existing Andy formation evidence references.
**Purpose:** Define the criteria by which the Stage A gap, `Formation Complete`, could be assessed.
**Decision authority:** None. This record does not perform verification, assess Andy, create a PASS outcome, or alter the Stage A `HOLD` outcome.

## 1. Meaning of Formation Complete in Stage A

Within the Stage A Academy graduation context, `Formation Complete` means that the Academy has evidence sufficient to distinguish what is authored, intended, executed, validated, repeatable, and unresolved across the formation scope required for professional graduation.

It does not mean:

- that a curriculum is complete because it is documented;
- that intended journeys equal demonstrated runtime behaviour;
- that passing a bounded formation test establishes the full Humanity curriculum;
- that a partial result is equivalent to PASS;
- that a Candidate 0 reasoning validation establishes formation completion;
- that professional readiness, certification, or graduation has occurred.

## 2. Evidence Categories and Assessment Criteria

| Evidence category | Criterion for future assessment | Does not establish alone |
|---|---|---|
| Documented curriculum | The curriculum source and its intended formation scope are identifiable and distinguished from execution evidence. | Formation completion |
| Intended journeys | Journey intent, order, and stated outcomes are identifiable without being treated as runtime achievement. | Validated runtime achievement |
| Execution evidence | A formation execution record identifies its scenario, result, evidence source, tested scope, and recorded limitations. | Completion beyond the executed scope |
| Validated runtime achievement | Direct runtime evidence demonstrates the specified formation behaviour or stage against a stated verification scope. | Full curriculum completion unless the whole required scope is demonstrated |
| Repeatability | Evidence demonstrates whether a specified formation behaviour remains consistent across repeated runs, relevant scenarios, or mentor paths. | Consistency in untested scenarios or unrepresented curriculum areas |
| Unknowns | Missing journey evidence, unresolved partial outcomes, and scope gaps are identified with their source boundary. | A PASS outcome |
| Traceability | Every conclusion can be linked to a source path, evidence class, stated scenario, and outcome. | An inference beyond recorded evidence |

## 3. Documented Curriculum

A documented curriculum establishes what the Academy intends to form, including stated journeys, standards, and learning objectives.

A future assessment must record documented curriculum separately from execution evidence. Curriculum presence does not demonstrate that a Digital Colleague has completed, retained, or demonstrated the curriculum at runtime.

```text
DOCUMENTED_CURRICULUM != EXECUTION_EVIDENCE
DOCUMENTED_CURRICULUM != VALIDATED_RUNTIME_ACHIEVEMENT
```

## 4. Intended Journeys

Intended journeys establish the authored progression and expected learning direction of formation material.

A future assessment must identify whether a journey is:

- authored only;
- represented by execution evidence;
- represented by validation evidence; or
- unresolved due to missing evidence.

An intended journey must not be counted as a completed formation outcome without direct runtime and verification evidence for the asserted scope.

```text
INTENDED_JOURNEY != COMPLETED_JOURNEY
```

## 5. Execution Evidence

Execution evidence may establish results for the formation scenario that was actually run. It must identify the relevant run or evidence source, the stated test or scenario scope, and any recorded non-PASS result or limitation.

The existing Andy formation reports demonstrate that bounded formation execution and mentor-independence evidence can be recorded. A future assessment must not generalise a result beyond the scope stated in its record.

```text
EXECUTED_SCENARIO != FULL_FORMATION_COMPLETION
PARTIAL_RESULT != PASS
```

## 6. Validated Runtime Achievement

Validated runtime achievement requires direct evidence that the runtime demonstrated the relevant formation behaviour or stage under the defined assessment scope.

A future assessment must distinguish:

- gateway-stage evidence from full curriculum evidence;
- a module review from live validated module achievement;
- a formation test result from claims about untested journeys, behaviour, or contexts.

The current scope record identifies full Humanity curriculum achievement and Foundation Module 1 validated runtime achievement as evidence categories requiring direct support rather than inference.

```text
GATEWAY_EVIDENCE != FULL_FORMATION_COMPLETION
MODULE_REVIEW != VALIDATED_RUNTIME_ACHIEVEMENT
```

## 7. Repeatability

Repeatability evidence assesses whether a specified formation behaviour remains consistent across the evidence scope actually tested, including relevant repeated runs or mentor paths.

A future assessment must record:

- the repeated or comparative conditions;
- the behaviour or formation signal assessed;
- the stated result;
- any remaining partial, failed, or untested conditions.

Repeatability in one bounded formation area does not establish repeatability across the full formation curriculum.

```text
BOUNDED_REPEATABILITY != WHOLE_CURRICULUM_REPEATABILITY
```

## 8. Preservation of Unknowns

A future assessment must retain `UNKNOWN` when:

- a curriculum area or journey lacks direct runtime evidence;
- an intended journey lacks a corresponding execution or validation record;
- a formation report does not cover the asserted completion scope;
- a partial result contains unresolved conditions;
- evidence is only relevant to Candidate 0 reasoning or engineering scope;
- a source-to-claim relationship is not directly traceable.

```text
UNKNOWN_REMAINS_UNKNOWN
DOCUMENTATION_DOES_NOT_FILL_EVIDENCE_GAPS
```

## 9. Criteria, Verification, and Governance Boundaries

| Layer | Permitted role | Must not become |
|---|---|---|
| Criteria | Define what Formation Complete verification must distinguish and assess | Verification evidence or a PASS outcome |
| Verification | Assess in-scope formation evidence and record supported limits and unknowns | Certification, professional readiness, or graduation decision |
| Governance decision | Make an authorised human conclusion from sufficient verified evidence across Stage A scopes | An automatic consequence of documentation or verification alone |

```text
DOCUMENTATION != VERIFICATION
VERIFICATION != GOVERNANCE_DECISION
HUMAN_AUTHORITY_REMAINS_HUMAN
```

## 10. Preserved Stage A Outcome

**Stage A Outcome:** HOLD

This criteria record does not perform formation verification, assess Andy, resolve the Formation Complete gap, create a PASS outcome, or authorise Stage B.
