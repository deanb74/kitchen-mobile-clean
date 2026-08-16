# HH-0000 Bounded Comparative Understanding Inference Count Expectation Review

**Status:** OUTCOME 1 - TEST EXPECTATION WAS INCORRECT; PRESERVED TENTH INFERENCE IS GOVERNED
**Review date:** 2026-08-12
**Review type:** Fresh documentation-only failed-Evidence review
**Implementation effect:** None - no implementation Authority is granted
**Test effect:** None - no test-edit Authority is granted
**Acceptance effect:** None - the aggregation correction remains failed and unaccepted
**Contribution effect:** None - contribution Authority remains untouched

## 1. Purpose

This review answers only:

> Was the failed `expect(mixed.inferences).toHaveLength(9)` assertion a mistaken new test expectation because the preserved equal-scope agreement legitimately contributes the tenth Inference, or does the tenth Inference reveal a material implementation defect?

The assertion was mistaken. The tenth Inference is the governed Inference representation of an independently formed equal-scope agreement. Human-question aggregation is not authorised to remove it.

## 2. Review Boundary

This review used only:

1. `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_HUMAN_DECISION_AGGREGATION_CORRECTION_AUTHORITY_REVIEW.md`;
2. `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_HUMAN_DECISION_AGGREGATION_CORRECTION_EVIDENCE.md`;
3. `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_HUMAN_DECISION_BOUNDARY_REVIEW.md`;
4. `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_MULTI_DISAGREEMENT_CORRECTION_EVIDENCE.md`;
5. current `lib/academy/AndyDigitalColleague.ts`;
6. current `lib/academy/__tests__/boundedComparativeUnderstanding.test.ts`.

No production or test file was edited. No Jest, adjacent test, typecheck, lint, Andy invocation, real manifest access, contribution, or acceptance review was run.

## 3. Preserved Governance State

The current state remains:

1. the human-decision aggregation correction is failed and unaccepted;
2. correction Authority was consumed on its first production edit;
3. no repair cycle exists;
4. the focused result was 12 passed and 1 failed out of 13 tests;
5. that result is Evidence, not acceptance;
6. the three original governed one-question regressions passed unchanged;
7. no assertions after the failing Inference-count assertion executed in that run;
8. no adjacent tests, typecheck, lint, or post-pass static validation followed;
9. contribution Authority remains untouched.

This review does not alter any of those facts.

## 4. Exact Mixed Fixture

The relevant fixture supplies five synthetic records:

1. `record-x` with `Status: ACTIVE`;
2. `record-y` with `Status: STOPPED`;
3. `status-relationship` with the explicit statement `Record X supersedes Record Y.`;
4. `state-a` with `State: OPEN`, `Date: 2031-01-01`, and `Scope: Shared bench`;
5. `state-b` with `State: CLOSED`, `Date: 2032-01-01`, and `Scope: Shared bench`.

Status, state, and date differ. Scope does not differ: both scope values are exact authored `Shared bench` values.

The relevant exact structural Observations are:

```text
observation-state-a-3
sourceId: state-a
metadata category: scope
exact authored value: Shared bench

observation-state-b-3
sourceId: state-b
metadata category: scope
exact authored value: Shared bench
```

These IDs and their source/value identity are directly supported by the failed focused output and the deterministic Observation ordering in the current fixture and structural formation path.

## 5. Relationship Formation Trace

Current comparative formation groups structurally valid governed metadata by metadata category.

For the two scope Observations:

1. two distinct source IDs participate: `state-a` and `state-b`;
2. both normalised comparison values are textually identical: `shared bench`;
3. the comparison group therefore forms an `agreement` relationship;
4. the relationship carries both exact scope Observation IDs;
5. it is non-direct because it is formed by Understanding rather than copied as an explicit authored relationship;
6. it carries the basis `The attributable values are textually identical across more than one source.`;
7. it carries uncertainty that textual agreement does not independently establish organisational truth or current authority.

In the recorded mixed result this is `relationship-5`:

```text
kind: agreement
statement: The supplied observations appear materially compatible for scope.
observationIds:
  - observation-state-a-3
  - observation-state-b-3
```

The equal-scope agreement is therefore not created by question aggregation. It is formed earlier by the general comparison-group behavior.

## 6. Inference Formation Trace

After all relationships and per-disagreement consequences are formed, the existing final relationship loop converts every non-direct relationship carrying both an inference basis and uncertainty into a `ComparativeInference`, except `possible-supersession`, which is inserted separately.

The equal-scope agreement satisfies that rule:

1. it is non-direct;
2. it is not `possible-supersession`;
3. it carries an inference basis;
4. it carries uncertainty.

It therefore forms the recorded `inference-6`:

```text
id: inference-6
statement: The supplied observations appear materially compatible for scope.
supportingObservationIds:
  - observation-state-a-3
  - observation-state-b-3
basis: The attributable values are textually identical across more than one source.
uncertainty: Textual agreement does not independently establish organisational truth or current authority.
```

This is the tenth item in the complete mixed `inferences` array. It is not a duplicate human question, unresolved relationship, qualification, or possible-supersession Inference.

## 7. Complete Count Trace

The mixed account contains ten Inferences for independently formed relationships:

1. possible supersession for the state disagreement;
2. possible supersession for the date disagreement;
3. apparent status disagreement;
4. apparent state disagreement;
5. apparent date disagreement;
6. equal-scope agreement;
7. state qualification;
8. state unresolved relationship;
9. date qualification;
10. date unresolved relationship.

The count of ten follows from preserved relationship formation. A count of nine requires omission of the equal-scope agreement Inference even though the fixture explicitly supplies two identical attributable scope values and current governed formation represents non-direct agreements as Inferences.

## 8. Previously Governed Behavior

The equal-scope Inference existed under the previously governed comparative behavior.

Directly supported facts are:

1. the same mixed fixture with `Scope: Shared bench` on both `state-a` and `state-b` was added during the earlier multi-disagreement attempt;
2. that additive multi-disagreement test passed during the earlier 10/13 focused execution;
3. the earlier production attempt did not change comparison grouping or the final relationship-to-Inference loop;
4. the human-decision aggregation correction Authority treated that attempted per-disagreement state as its baseline;
5. the later authorised production delta was confined to the key guarding insertion into `humanDecisionQuestions`;
6. the recorded tenth Inference is generated by comparison grouping and the final Inference loop, not by the new source-ID question key.

The earlier additive test did not assert the complete Inference count. Its PASS therefore did not separately certify the number ten, but the governing formation path that produces the equal-scope agreement was already present and outside the later correction boundary.

## 9. Preservation Requirements

The aggregation correction Authority expressly requires independent preservation of:

1. `apparent-disagreement` relationships;
2. independently formed `unresolved-relationship` relationships;
3. `ComparativeInference` values;
4. uncertainty entries;
5. qualification relationships;
6. possible-supersession Inferences;
7. attributable explicit relationships;
8. supporting Observation IDs.

It states that only insertion into `humanDecisionQuestions` may aggregate by canonical participating source-ID set.

It also withholds deletion or aggregation of any Evidence relationship, Inference, uncertainty, or qualification. The required static validation would have needed to prove that same-set question aggregation did not reduce Inferences or other Evidence structures.

Removing the equal-scope agreement Inference to satisfy a count of nine would conflict with those preservation requirements.

## 10. Human-Question Aggregation Boundary

The candidate interpretation is confirmed:

> Human-question aggregation may reduce repeated human questions, but it must not reduce independently formed Evidence, agreement relationships, Inferences, uncertainty, qualification, or unresolved relationships.

The current source reflects this separation:

1. comparison groups form agreement and disagreement relationships before question aggregation;
2. per-disagreement processing forms qualification, possible supersession, unresolved relationships, and uncertainty;
3. the source-ID boundary controls only whether a new item is pushed into `humanDecisionQuestions`;
4. the final relationship loop forms Inferences independently of `humanDecisionQuestions` and `humanDecisionBoundaries`.

Human-question aggregation is therefore not permitted to change Inference count at all.

## 11. Origin of the Expected Count Nine

No reviewed governance record derives or requires a mixed Inference count of nine.

The correction Authority requires applicable Inferences to remain independently present, but it does not enumerate nine Inferences for the mixed fixture. Its required regression scenarios specify preservation behavior, source-set distinction, and question counts. They do not authorise omission of a textually supported agreement or prescribe the number nine.

The exact `toHaveLength(9)` assertion first appears in the newly expanded additive regression authored during the failed aggregation correction attempt. The failed Evidence records that the expectation omitted the existing equal-scope agreement Inference.

The count of nine was therefore an unsupported implementation-time assumption in new test work, not a governed expected result.

## 12. Material-Defect Assessment

The tenth Inference does not expose a material implementation defect within the reviewed boundary.

It has:

1. exact attributable supporting Observations;
2. a governed `agreement` relationship kind;
3. an explicit textual-identity basis;
4. uncertainty preventing promotion to organisational truth or authority;
5. formation independent from the human-question aggregation change;
6. direct protection under the correction Authority's Evidence-preservation rules.

No duplicate insertion, missing provenance, semantic guess, hidden preferred source, question-derived Evidence, or prohibited aggregation behavior is shown by the tenth item.

## 13. Outcome

**OUTCOME 1 - TEST EXPECTATION WAS INCORRECT; PRESERVED TENTH INFERENCE IS GOVERNED**

Outcome 2 is not selected because the tenth Inference has exact supporting scope Observations, follows the existing agreement and Inference formation rules, and is required to remain independent of question aggregation.

Outcome 3 is not selected because the reviewed Authority, Evidence, fixture, and current private formation path deterministically explain both the item and the count.

## 14. Smallest Future Correction Boundary

No test-edit Authority is granted by this review.

If fresh human Authority is later granted, the smallest exact future correction boundary is one newly added assertion in:

`lib/academy/__tests__/boundedComparativeUnderstanding.test.ts`

The bounded correction would change only:

```text
expect(mixed.inferences).toHaveLength(9)
```

to the governed complete count:

```text
expect(mixed.inferences).toHaveLength(10)
```

No production edit is indicated by this finding. No existing original test, governed one-question expectation, fixture, relationship count, Inference, uncertainty, qualification, unresolved relationship, or later assertion should change.

Fresh explicit test-edit Authority and a fresh validation sequence remain required before that correction may occur.

## 15. Evidence Versus Acceptance

The 12/13 result remains Evidence only.

It directly supports that:

1. the three original governed one-question regressions passed unchanged;
2. the new same-source-set assertions before the failure completed;
3. the new mixed relationship, uncertainty, source-set, and one-question assertions before the failure completed;
4. ten Inferences were present, including the equal-scope agreement Inference.

It does not establish complete focused PASS, adjacent preservation, type correctness, lint conformance, static-boundary conformance, implementation acceptance, production readiness, or contribution readiness.

No assertion after the failed Inference-count assertion executed in that run.

## 16. Explicit Non-Consequences

This review does not:

1. edit production or tests;
2. grant test-edit or implementation Authority;
3. repair or rerun the focused suite;
4. run Jest, adjacent tests, typecheck, or lint;
5. accept the aggregation correction or prior multi-disagreement attempt;
6. restore or create a correction cycle;
7. alter the consumed Authority state;
8. inspect a real manifest or real programme source;
9. invoke Andy;
10. execute or begin contribution;
11. create an acceptance review;
12. modify or reconsider contribution Authority;
13. claim post-edit hashes, reversibility, prohibited-region preservation, changed-file conformity, production readiness, certification, or Formation completion.

## 17. Stop State

`DOCUMENTATION-ONLY REVIEW COMPLETE - OUTCOME 1 - NO TEST-EDIT AUTHORITY GRANTED`

Inference count expectation review stops here.