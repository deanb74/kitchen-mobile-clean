# HH-0000 Bounded Comparative Understanding Human-Decision Boundary Review

**Status:** OUTCOME 1 - EXISTING ONE-QUESTION EXPECTATIONS ARE GOVERNED AND A DETERMINISTIC AGGREGATION RULE EXISTS
**Review date:** 2026-08-12
**Review type:** Fresh documentation-only MARC and Cyril human-decision-boundary review
**Implementation effect:** None - no correction Authority is granted
**Acceptance effect:** None - the failed multi-disagreement correction remains failed and unaccepted
**Contribution effect:** None - no real programme source or manifest content was inspected, Andy was not invoked, no real contribution was executed, and contribution Authority was not reconsidered

## 1. Purpose

This review answers:

> When several independently formed `apparent-disagreement` relationships remain unresolved, what constitutes one materially distinct human-decision boundary?

The answer is not one question per unresolved Evidence relationship.

Every unresolved relationship must remain independently represented as Evidence. Human-decision questions are aggregated separately. Within the current bounded private model, unresolved relationships share one human-decision boundary when their participating Observations resolve to the same canonical set of distinct supplied `sourceId` values. Different participating source sets remain distinct human-decision boundaries.

The governing invariant is preserved:

```text
unresolved Evidence relationship
    != automatically
separate human decision
```

A human-decision question represents the absent organisational intent, current Context, Authority, or decision that only a human can supply. It does not count disagreements.

## 2. Traceability

```text
Principle: truth before certainty; human Authority remains human
Theory: authored text != structural Observation != Inference != human decision
Architecture: existing private non-deliberative comparative Understanding path
Engineering: independent unresolved Evidence plus exact human-question aggregation
Milestone: HH-0000 human-decision-boundary clarification
Evidence: controlling governance, failed correction Evidence, focused expectations, current private structures, and this review
```

## 3. Review Boundary

This review used only:

1. the bounded comparative-Understanding implementation Authority and reconsideration records;
2. the authored-record extraction contract;
3. the first implementation acceptance Outcome 3;
4. the relationship-relevance correction Authority, Evidence, and second acceptance Outcome 3;
5. the multi-disagreement correction Authority and failed correction Evidence;
6. the existing focused test expectations in `lib/academy/__tests__/boundedComparativeUnderstanding.test.ts`;
7. the private Observation, relationship, Inference, human-question, exact relevance, and comparative-formation structures in `lib/academy/AndyDigitalColleague.ts`.

No production or test file was edited. No Jest, typecheck, lint, Andy invocation, synthetic execution, real execution, or real contribution was run. The approved real programme manifest was not inspected or assembled.

## 4. Complete Historical Continuity

The durable history remains:

```text
implementation
-> first acceptance Outcome 3
-> relationship-relevance correction
-> second acceptance Outcome 3
-> multi-disagreement correction Authority
-> correction attempt
-> new scenarios PASS
-> three existing question-count regressions FAIL
-> mandatory stop
-> human-decision-boundary review
```

The correction Authority was consumed by the attempted production edit. The failed attempt remains in the worktree but is not accepted. This review does not repair, validate, accept, reverse, or authorise that attempt.

## 5. Controlling Human-Decision Rule

The implementation Authority permits a human-decision question only when:

1. supplied Evidence leaves a material relationship unresolved; and
2. resolution requires organisational intent, Authority, current real-world Context, or a decision absent from the supplied records.

The question must identify that absent human boundary and why the supplied Evidence cannot answer it. It must not propose an answer or course.

The controlling object is therefore the missing human decision, not the number of `apparent-disagreement` or `unresolved-relationship` objects formed while describing the Evidence.

Independent relationship formation and question aggregation are separate responsibilities:

```text
each material disagreement
-> independent relevance and unresolved assessment
-> independent unresolved Evidence when applicable

all independently unresolved Evidence
-> exact human-decision-boundary grouping
-> one question per materially distinct human boundary
```

Aggregation does not delete, merge, relabel, or resolve an unresolved Evidence relationship.

## 6. Direct Observations

Directly observed in the controlling records, focused tests, and current private structures:

1. `ComparativeRelationship` carries its own ID, kind, supporting Observation IDs, basis, and uncertainty;
2. `HumanDecisionQuestion` is a separate private type carrying one question, reason, and linked unresolved relationship ID;
3. each structural Observation carries an exact `sourceId`, complete `sourcePath`, title, category, text, and location;
4. each apparent disagreement carries the IDs of its participating Observations;
5. the accepted exact relevance helper resolves those Observations to participating records and uses exact identity to obtain distinct participating source IDs;
6. that helper treats an exact relationship between the participating records as relevant without requiring category-level semantic matching;
7. the attempted question key instead used each unresolved relationship's exact Observation-ID set plus its generic missing-decision basis;
8. status, date, scope, and state disagreements necessarily have different Observation IDs even when they concern the same supplied records;
9. all three failing existing fixtures contain multiple disagreements among the same exact record pair;
10. the new independently-unresolved scenario that passed uses one record pair for status and a different record pair for state;
11. the three existing assertions require exactly one question for their same-record-set fixtures;
12. the new scenario requires distinct questions for its different-record-set fixtures.

## 7. Evidence Relationship Versus Human Decision

An `apparent-disagreement` is formed per comparable governed metadata group. An `unresolved-relationship` records that supplied Evidence does not establish the relationship for that group. Those are appropriate Evidence-level distinctions.

They do not prove separate absent human decisions. Status, date, and scope differences between the same two supplied records may all be consequences of one absent decision about the relationship between those records. Asking the same human three times which of the same two records currently governs does not expose three boundaries; it repeats one boundary at three lower-level Evidence locations.

Conversely, a status disagreement between one record pair and a state disagreement between another record pair do not share an exact decision boundary. Collapsing those questions would hide which independent relationship requires human Context or Authority.

Therefore:

```text
same unresolved Observation IDs
-> same Evidence item

same canonical participating source set
-> same human-decision boundary

different canonical participating source set
-> different human-decision boundary
```

## 8. Exact Aggregation Rule

For each independently formed unresolved relationship:

1. resolve its Observation IDs against the already formed structural Observations;
2. collect only their exact `sourceId` values;
3. remove duplicates;
4. require at least two distinct participating source IDs;
5. sort the source IDs deterministically;
6. use that canonical source-ID set as the human-decision-boundary identity;
7. emit one human-decision question for the first unresolved relationship in each boundary;
8. retain every unresolved relationship, basis, uncertainty entry, and Inference independently.

No title, filename, basename, directory, rank, score, date order, category wording, topic similarity, question wording, fuzzy match, alias, or semantic interpretation enters this rule.

`sourceId` is safer than title or path for aggregation because it is the existing exact record identity to which the accepted relevance helper already resolves exact title, source-ID, or complete-path references. Titles and paths remain permitted inputs for exact authored relationship matching; the resulting participating-record boundary is expressed canonically by source ID.

The rule applies to sets, not only pairs, so it remains deterministic if one formed disagreement contains more than two participating records.

## 9. Why Observation-ID Identity Is Too Low-Level

Exact Observation IDs correctly identify Evidence provenance. They do not identify the human decision.

For the same records:

1. the status disagreement points to status Observation IDs;
2. the date disagreement points to date Observation IDs;
3. the scope disagreement points to scope Observation IDs;
4. the state disagreement points to state Observation IDs.

Those sets differ by construction. Adding the existing generic inference basis does not distinguish the missing decision because the basis is the same absence statement while the Observation IDs preserve category-level Evidence granularity.

The attempted key therefore proved only that the unresolved Evidence relationships were different. It did not prove that the decisions required from a human were different.

## 10. Existing Private Basis

No new metadata or architecture responsibility is required.

The safer exact basis already exists through the combination of:

1. `ComparativeRelationship.observationIds`;
2. `StructuralObservation.id`;
3. `StructuralObservation.sourceId`;
4. the participating-record resolution already used by `isExplicitRelationshipRelevantToDisagreement`.

That accepted helper establishes an important symmetry. If one exact authored relationship identifying a participating record set may resolve the unresolved consequence for that set without semantic category matching, the absence of such a relationship returns that same record-set relationship to a human. The decision boundary should not become narrower than the accepted resolution boundary merely because several metadata categories expose it.

This is exact private provenance, not semantic deduplication.

## 11. Hypothesis A - One Question Per Unresolved Relationship

**Finding:** Rejected within the current bounded capability.

Hypothesis A correctly requires every material disagreement to receive independent Evidence and unresolved assessment. It incorrectly promotes each resulting unresolved Evidence object into a separate human decision.

The failed correction demonstrates the consequence: same-record status/date or status/date/scope differences generated two or three questions carrying the same generic question and reason. Different relationship IDs and Observation sets establish different Evidence provenance, not different absent organisational decisions.

The three existing one-question assertions are therefore not stale merely because per-disagreement formation now exposes more unresolved relationships.

## 12. Hypothesis B - Several Disagreements May Share One Boundary

**Finding:** Accepted where exact participating source sets are equal.

Several unresolved relationships legitimately map to one question when they arise among the same canonical set of participating records. The existing model can prove this without guessing by resolving each relationship's Observation IDs to exact `sourceId` values.

This does not infer what the human will decide or why the records differ. It establishes only that the current private capability asks one record-relationship question: which position among this exact supplied record set currently governs, given that organisational intent, Context, or Authority is absent.

## 13. Hypothesis C - Mixed

**Finding:** Accepted as the operational shape under Outcome 1.

Some unresolved relationships share one human-decision boundary and some do not. The exact programme-neutral distinction is:

```text
equal canonical participating source-ID sets
-> one shared human-decision boundary

non-equal canonical participating source-ID sets
-> distinct human-decision boundaries
```

This mixed result does not require Outcome 3 because the distinction is already deterministic in current exact private provenance. No semantic clarification is needed for the bounded current model.

## 14. Existing Test Expectations

The existing one-question expectations reveal the intended aggregation boundary rather than stale expectations.

The discriminating pattern is consistent:

1. falsifiers 13-20 compare `older` and `newer`; status and date disagreements share the same two source IDs and require one question;
2. falsifiers 21-24 compare `c` and `d`; status, date, and scope disagreements share the same two source IDs and require one question;
3. the relationship-relevance unrelated case compares `status-a` and `status-b`; status and date disagreements share the same two source IDs and require one question;
4. falsifiers 32-34 preserve one question when an unrelated third document is added because the disagreement still involves only `first` and `second`;
5. the new Scenario B uses `status-a` / `status-b` and `state-c` / `state-d`, which are different source-ID sets and therefore correctly exposes two human-decision boundaries.

These expectations align with the governing definition of a question as absent human Context or Authority and with the accepted record-level relevance boundary.

## 15. Duplicate or Distinct Questions in the Failed Attempt

The failed correction correctly formed distinct unresolved Evidence relationships. Its questions were not all correctly distinct.

For the three failing fixtures, the additional questions were genuine duplicates at the human-decision layer because each fixture's questions depended on the same exact participating source set and carried the same absent organisational intent, current Context, or Authority basis.

The passing new Scenario B questions were correctly distinct because they depended on different exact participating source sets. Scenario A also correctly required an unresolved question only for the independently unresolved record set, while the other record set had exact relevant authored relationship Evidence. Scenario C correctly required no unresolved question for either exactly resolved record set.

The failed result was therefore mixed: correct per-disagreement Evidence completeness, duplicate questions in the three same-record-set regressions, and correctly distinct questions in the different-record-set scenario.

## 16. MARC Independent Finding

MARC asks:

> If a human colleague found three inconsistencies in the records, would I expect three separate questions, or one question where all three really depend on the same human decision?

One question is appropriate where all three inconsistencies concern the same exact supplied records and ask for the same missing organisational decision about their relationship. Repeating the question for status, date, and scope would burden the human without preserving additional decision ownership. The inconsistencies must still remain independently visible as Evidence.

Different record sets remain different human boundaries. Combining those would hide uncertainty and deprive the human of a clear account of what must be decided.

**MARC finding:** `PRESERVE EVERY UNRESOLVED EVIDENCE RELATIONSHIP, BUT ASK ONCE FOR EACH EXACT RECORD-SET DECISION THAT ONLY A HUMAN CAN SUPPLY`.

## 17. Cyril Independent Finding

Cyril asks:

> Does the current private data already contain a deterministic representation of the missing decision boundary, or would deduplicating questions require semantics the implementation does not presently possess?

The current private data is sufficient for the bounded current capability. Relationship Observation IDs resolve exactly to structural Observations, and those Observations carry exact source IDs. The accepted relevance helper already derives participating records through that path.

A sorted distinct source-ID set is deterministic, programme-neutral, order-neutral, and independent of wording. It requires no semantic comparison, fuzzy matching, programme rule, new field, parser change, provider enrichment, public contract, or architecture responsibility.

**Cyril finding:** `THE CANONICAL PARTICIPATING SOURCE-ID SET IS THE EXISTING EXACT HUMAN-DECISION-BOUNDARY KEY; OBSERVATION-ID SETS REMAIN EVIDENCE IDENTITY`.

## 18. Combined Outcome

**OUTCOME 1 - EXISTING ONE-QUESTION EXPECTATIONS ARE GOVERNED AND A DETERMINISTIC AGGREGATION RULE EXISTS**

Outcome 2 is not selected because the failed attempt's extra questions in the three regressions do not represent distinct exact record-set decisions.

Outcome 3 is not selected because current exact private provenance already distinguishes shared and distinct boundaries without a new semantic rule.

Outcome 4 is not selected because the governance, failed Evidence, test pattern, and accepted relevance structure converge on one deterministic boundary.

## 19. Smallest Exact Correction Boundary

No implementation Authority is granted.

If fresh human Authority is later considered, the smallest exact correction boundary is confined to human-question aggregation inside private comparative formation:

1. preserve the current independent per-disagreement relevance and consequence evaluation;
2. preserve every independently formed unresolved relationship and uncertainty;
3. replace only the attempted Observation-ID-plus-basis question key with a canonical sorted set of distinct participating `sourceId` values derived from the unresolved relationship's existing Observation IDs;
4. emit at most one question for each canonical participating source set;
5. preserve separate questions for different source sets;
6. preserve the existing private types, renderer responsibility, extraction, exact relationship relevance, and all existing tests;
7. add or refine only the minimum neutral regression needed to prove same-set aggregation and different-set separation if separately authorised.

This boundary does not authorise an edit, repair, test change, validation run, or correction-Authority record.

## 20. Limitations

This review settles only the bounded current private model.

It does not claim that every real-world decision involving the same records is universally one decision. The present model has no attributable decision identifier, scoped Authority object, or authored intent reference that could safely divide one record set into multiple semantic decision domains. Introducing such a distinction would require fresh governance and is outside this review.

The review also does not establish that the failed attempted production change otherwise passes typecheck, lint, adjacent tests, static checks, prohibited-region checks, or acceptance. Those stages remain not run after the mandatory focused failure.

## 21. Explicit Non-Consequences

This review does not:

1. edit production or tests;
2. repair or validate the failed correction;
3. rerun Jest or run typecheck or lint;
4. invoke Andy;
5. inspect or assemble the real programme manifest;
6. execute a real or synthetic contribution;
7. create or grant correction Authority;
8. consume, modify, or reconsider contribution Authority;
9. accept implementation or correction Evidence;
10. create Reflection, Memory, Learning, feedback, Action, retry, or automatic follow-on;
11. change Theory, architecture, public contracts, provider/repository contracts, extraction, rendering, Judgement, or organisational truth;
12. claim capability, production readiness, real-source compatibility, programme correctness, Formation completion, certification, or contribution readiness.

## 22. Stop State

`DOCUMENTATION-ONLY HUMAN-DECISION-BOUNDARY REVIEW COMPLETE - OUTCOME 1 - NO IMPLEMENTATION AUTHORITY GRANTED`

Human-decision-boundary review stops here.