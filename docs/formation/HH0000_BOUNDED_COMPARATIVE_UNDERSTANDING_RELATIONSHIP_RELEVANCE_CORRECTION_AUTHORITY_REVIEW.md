# HH-0000 Bounded Comparative Understanding Relationship-Relevance Correction Authority Review

**Status:** OUTCOME 1 - ONE LOCAL RELATIONSHIP-RELEVANCE CORRECTION AUTHORISED
**Review date:** 2026-08-12
**Review type:** Fresh documentation-only MARC and Cyril correction-Authority review
**Implementation effect:** One bounded production correction and one focused neutral regression update are authorised but unconsumed
**Acceptance effect:** None - the existing Outcome 3 remains in force until fresh correction Evidence and independent acceptance
**Contribution effect:** None - no real programme source or manifest content was inspected, Andy was not invoked, and contribution Authority was not reconsidered

## 1. Purpose

This review asks:

> May one fresh bounded correction Authority permit only the local comparative-formation correction required so that an explicit authored relationship suppresses unresolved treatment only when that relationship is relevant to the specific apparent disagreement being evaluated, together with one neutral regression falsifier for the uncovered mixed case?

Yes. The defect is directly present in private comparative formation, the required relevance rule already follows from the governing Understanding responsibility, and current private Observations contain enough exact provenance to implement one conservative fail-closed relevance test without changing extraction, retrieval, public contracts, activation, rendering responsibilities, Judgement, deliberation, Reflection, Memory, Learning, provider/repository contracts, Theory, or architecture.

This record grants correction Authority only. It does not implement, validate, evidence, or accept the correction.

## 2. Controlling Records and Inspection Boundary

This review used only:

1. `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_IMPLEMENTATION_ACCEPTANCE_REVIEW.md`;
2. `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_IMPLEMENTATION_AUTHORITY_RECONSIDERATION.md`;
3. `docs/formation/HH0000_AUTHORED_RECORD_METADATA_AND_BOUNDED_CLAIM_EXTRACTION_CONTRACT_REVIEW.md`;
4. `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_IMPLEMENTATION_EVIDENCE.md`;
5. `lib/academy/AndyDigitalColleague.ts`;
6. `lib/academy/__tests__/boundedComparativeUnderstanding.test.ts`.

No real programme source, approved real manifest content, contribution record, or contribution Authority was inspected.

No test, typecheck, lint, Andy invocation, synthetic execution, or real execution was run during this documentation-only review.

## 3. Governing Responsibility

The existing governance already assigns to Understanding:

1. attributable comparison across relevant structural Observations;
2. explicit separation of Observation and Inference;
3. visible uncertainty;
4. unresolved-relationship formation where supplied Evidence cannot safely determine a relationship;
5. human-decision questions where organisational intent, current Context, or Authority is absent.

The implementation Authority requires formation to compare relevant Observations across the supplied set. Its human-decision boundary permits omission of a question only when an attributable explicit relationship and its relevant scope resolve the requested relationship.

The extraction contract separately requires that an explicit relationship remain an attributable Observation, not independent truth. Understanding owns assessment of scope, qualification, conflict, currentness, applicability, and relationship consequence.

Therefore the candidate rule is:

**A. already required by the existing extraction and comparative-Understanding contracts**, and

**B. a clarification of the existing implementation responsibility**.

It is not C, a new cognitive responsibility or wider architecture requirement.

## 4. Independent Defect Verification

Direct inspection of `formComparativeUnderstanding` independently confirms the acceptance defect.

The current method:

1. forms one global `directRelationships` array from every comparable Observation carrying `explicitRelationship`;
2. creates attributable `explicit-authored-relationship` entries for those Observations;
3. separately finds the first `apparent-disagreement` relationship;
4. creates `possible-supersession` only when the disagreement exists, at least two valid date Observations exist, and `directRelationships.length === 0`;
5. creates `unresolved-relationship`, uncertainty, and the human-decision question only when the disagreement exists and `directRelationships.length === 0`.

No later code checks whether a direct relationship:

1. supports any Observation ID participating in the disagreement;
2. identifies the same records as the disagreement Observations;
3. concerns the same claim or metadata dimension;
4. has relevant structural section or scope;
5. resolves the disagreement rather than merely coexisting in the supplied set.

The direct relationship's own `observationIds` contains only the authored relationship Observation. The disagreement's `observationIds` contains the differing metadata Observations. Those sets are not associated before the global count is used.

The defect description is therefore correct: an explicit relationship concerning Matter A can suppress unresolved treatment for a separate disagreement concerning Matter B.

## 5. Current Test Gap

The focused suite does not contain the discriminating mixed case.

It currently tests:

1. extraction of an explicit relationship by itself;
2. one explicit relationship alongside an unrelated non-disagreement claim, expecting no human-decision question;
3. status disagreement without any explicit relationship, expecting possible supersession, unresolved relationship, uncertainty, and a human-decision question;
4. order, score, and document-count neutrality without an explicit relationship.

It does not test:

1. an unrelated explicit relationship coexisting with a separate status disagreement; or
2. the converse where an explicit relationship exactly identifies the records participating in that disagreement.

The existing 53 falsifiers remain valid. The new regression is additive and must not weaken, replace, delete, skip, or reinterpret any existing assertion.

## 6. Material Human Boundary

The omission is material. Under the current global gate, one unrelated relationship can remove:

1. `POSSIBLE_SUPERSESSION` where differing dates otherwise support only that bounded Inference;
2. `UNRESOLVED_RELATIONSHIP` for the status disagreement;
3. explicit uncertainty that no attributable relationship establishes which position governs;
4. the human-decision question returning unresolved control to a human.

This can make a bundle of records appear more settled than its attributable content permits. It weakens honesty, non-assumption, uncertainty, and human decision ownership even though no preferred source is explicitly named.

The defect is not in extraction or rendering. It is local to the relevance condition used during comparative formation.

## 7. Required Semantic Rule

The correction must enforce:

> An explicit authored relationship may constrain or resolve an apparent disagreement only when the relationship is attributable to the Observations, claims, records, or scoped matter participating in that disagreement. An unrelated explicit relationship elsewhere in the supplied material must not suppress uncertainty, unresolved-relationship formation, or a required human-decision question.

An explicit relationship that is irrelevant to one disagreement remains valid attributable Evidence for the relationship it actually states. The correction must not delete it, ignore it globally, relabel it, or treat it as false.

Relevance permits relationship consequence only within the exact disagreement it supports. It does not establish organisational truth, Authority, present currentness, substantive scope, or valid supersession outside the supplied account.

## 8. Existing Private Evidence Available

No new metadata field is required. Current private `StructuralObservation` values already retain:

1. Observation ID;
2. source ID;
3. source path;
4. supplied title;
5. supplied section;
6. exact authored text;
7. heading lineage;
8. metadata category;
9. exact relationship subject and object spans;
10. the approved relationship verb.

The current `apparent-disagreement` relationship already retains the participating Observation IDs. Those IDs resolve back to the exact Observations and therefore to their distinct participating records and metadata category.

This is sufficient for one narrow, deterministic record-level relevance test. No provider enrichment, extraction change, new parser, public type, schema, repository mapping, or semantic source lookup is required.

## 9. Exact Safe Relevance Boundary

The authorised correction may add one narrowly supporting private helper, or equivalent local logic inside `formComparativeUnderstanding`, with this exact responsibility:

1. resolve the current apparent disagreement's `observationIds` against the already formed `observations` array;
2. derive the distinct participating records only from those matched Observations;
3. for each explicit relationship Observation, compare its already extracted exact `subject` and `object` spans against existing exact identity fields of the participating records;
4. treat the relationship as relevant only when subject and object each exactly identify a participating record and identify two distinct participating source IDs;
5. return unresolved when identity is absent, ambiguous, unmatched, or maps both spans to the same participating record.

The permitted exact identity fields are:

1. supplied `title`;
2. `sourceId`;
3. complete canonical `sourcePath`.

Matching must be exact after only the trimming already performed by `parseExplicitRelationship`. No new case folding, punctuation repair, basename extraction, alias table, stemming, substring comparison, fuzzy matching, or semantic normalisation is authorised.

Exact matching against these existing identity fields is provenance comparison, not inferred meaning. It gives the future neutral converse test a deterministic way to state `Record X supersedes Record Y` when the participating records have exact supplied titles `Record X` and `Record Y`.

This Authority permits record-pair relevance only. It does not authorise guessed claim-level or substantive-scope equivalence. If a future case cannot be established through the exact participating identities above, it must fail closed: the relationship remains attributable Evidence, but it does not suppress unresolved treatment for that disagreement.

## 10. Forbidden Relevance Inputs

Relevance must not be inferred from:

1. manifest order;
2. retrieval rank;
3. provider score;
4. document count;
5. newest date alone;
6. filename or basename similarity;
7. directory proximity;
8. loose keyword or topic overlap;
9. shared status value;
10. mere co-presence in the supplied set;
11. relationship-Observation source alone;
12. an unstated alias or guessed reference.

Date and structural scope may retain their existing bounded qualification role. They must not become identity selectors or relationship truth.

## 11. Exact Production Correction Authorised

The production correction is limited to private comparative formation in `lib/academy/AndyDigitalColleague.ts`.

It may:

1. add one private helper implementing Section 9, or use equivalent local logic;
2. compute whether at least one explicit relationship is relevant to the current disagreement;
3. replace both uses of global `directRelationships.length === 0` with the same local relevant-relationship decision;
4. preserve creation and attribution of every explicit authored relationship regardless of its relevance to the disagreement;
5. preserve current possible-supersession, unresolved, uncertainty, and human-question content when no relevant explicit relationship exists.

It may not:

1. modify structural extraction or `parseExplicitRelationship`;
2. add or change private Observation, relationship, Inference, or public fields;
3. change comparison grouping or metadata categories;
4. expand this task into general multi-disagreement redesign;
5. change qualification, rendering, activation, retrieval, prioritisation, deliberation, Reflection, Memory, Learning, recommendation readiness, feedback, or Action;
6. modify a prohibited method;
7. add a dependency, service, schema, package, shared helper, or architecture component.

The correction changes only which existing explicit relationship can suppress existing unresolved consequences. It does not change what authored relationship text means or whether it is true.

## 12. Neutral Regression Authorised

The only authorised test file is:

`lib/academy/__tests__/boundedComparativeUnderstanding.test.ts`

One new neutral regression test may contain both discriminating subcases.

### 12.1 Unrelated Mixed Case

Use three synthetic records structurally equivalent to:

```text
Source A, title: Status Record A
Status: ACTIVE
Date: 2031-01-01

Source B, title: Status Record B
Status: STOPPED
Date: 2032-01-01

Source C, title: Relationship Note
Record X supersedes Record Y.
```

The test must establish that Source C's explicit relationship remains present and attributable while the A/B disagreement still forms:

1. `apparent-disagreement`;
2. `qualification` where the supplied dates support it;
3. `possible-supersession` only as Inference;
4. `unresolved-relationship`;
5. explicit uncertainty;
6. one human-decision question.

It must establish that the relationship in Source C does not resolve or suppress A/B merely because it is present.

### 12.2 Relevant Converse Case

Use the same neutral structure with participating Source A and Source B supplied exact titles `Record X` and `Record Y`, and Source C retaining the exact statement `Record X supersedes Record Y.`

The test must establish:

1. the explicit relationship remains present and attributable;
2. `apparent-disagreement` remains visible as the differing authored values;
3. no `unresolved-relationship` is generated for that disagreement;
4. no human-decision question is generated merely because the authored values differ;
5. no `possible-supersession` Inference is generated where the relevant relationship is already explicit.

This converse proves that the correction improves relevance rather than ignoring all explicit relationships.

The fixture must remain synthetic and programme-neutral. It must not name Helping Hand, HH-0000, programme orientation, Formation, Case 001, C18, a real record, or a real manifest path.

## 13. Minimum File Surface

The complete future correction task is limited to:

1. `lib/academy/AndyDigitalColleague.ts` - one private comparative-formation correction;
2. `lib/academy/__tests__/boundedComparativeUnderstanding.test.ts` - one additive neutral regression containing the mixed and converse cases;
3. `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RELATIONSHIP_RELEVANCE_CORRECTION_EVIDENCE.md` - one fresh Evidence record.

No other production, test, documentation, provider, repository, contract, package, schema, component, service, Theory, or architecture surface is authorised.

If another surface is required, implementation must stop. Outcome 1 does not widen itself.

## 14. Preservation Requirements

The future correction must preserve:

1. all existing 53 falsifiers;
2. every current focused test assertion;
3. structural extraction behavior and fail-closed metadata handling;
4. exact Observation provenance and Observation / Inference distinction;
5. attribution of every explicit relationship;
6. possible supersession only as Inference unless an exact relevant relationship is authored;
7. generic compare and comparative-explain activation;
8. ordinary explain behavior;
9. review/recommend classification, deliberation, recommendation readiness, Reflection, and Memory;
10. null Reflection and empty public Memory for comparative work;
11. no Confirmed Learning, feedback, Action, or automatic follow-on;
12. exactly one provider search per public invocation;
13. accepted bounded-source closure and one-use refusal;
14. public Academy and repository/provider contracts;
15. `prioritizeDocumentsForUnderstanding`, `retrieveFromRepository`, `buildDeliberationRecord`, and `buildReflectionRecord` unchanged;
16. programme-neutral production logic and fixtures.

An unrelated explicit relationship must continue to be rendered as attributable Evidence for its own claim. It becomes irrelevant only to the separate disagreement, not globally ignored.

## 15. Correction Authority and Consumption

**Authority granted:**

1. one production correction within Section 11;
2. one focused test update within Section 12;
3. one fresh Evidence record at the exact path in Section 13;
4. one implementation attempt;
5. the exact validation and static checks in Section 17;
6. production/test hash capture and focused diff proof.

Correction Authority is unconsumed at creation of this record. It is consumed on the first production edit made under this record.

The test update may be authored before that production edit so the missing mixed case can expose the defect, but this record authorises no pre-correction test execution. The future task has one complete post-correction validation sequence and no open-ended repair cycle.

**Authority withheld:**

1. every production and test file outside Section 13;
2. changes to extraction, explicit relationship parsing, metadata fields, public types, repository/provider contracts, packages, schemas, services, components, shared helpers, Theory, or architecture;
3. loose or semantic identity matching;
4. modification, removal, weakening, skipping, or replacement of an existing falsifier;
5. correction of existing lint warnings or another unrelated defect;
6. real source inspection, real manifest assembly, Andy invocation, contribution execution, acceptance, or contribution Authority reconsideration.

## 16. Failure and Stop Rule

One correction attempt is sufficient because the defect, available private provenance, exact matching rule, and expected outputs are local and deterministic.

The future task must stop and record the exact failure without repair or rerun if:

1. relevance cannot be established from the existing exact structures in Section 9;
2. the mixed or converse case fails after the one correction;
3. any existing focused or adjacent test fails;
4. typecheck or lint exits non-zero;
5. another production or test file is required;
6. an existing falsifier must be weakened;
7. a public contract or new metadata field is required;
8. extraction semantics, rendering responsibility, persistence, Judgement, or architecture must change;
9. a prohibited method or changed-file boundary differs;
10. runtime behavior would require fuzzy, inferred, or programme-specific identity matching.

A failed correction becomes Evidence. No correction cycle is granted.

## 17. Required Revalidation

After the one local production correction and focused test update, the future task must run exactly once in this order.

First:

```text
npm test -- --runInBand lib/academy/__tests__/boundedComparativeUnderstanding.test.ts
```

Second, only after focused PASS:

```text
npm test -- --runInBand lib/academy/__tests__/boundedSourceProvider.test.ts lib/academy/__tests__/deliberation.test.ts lib/academy/__tests__/reflection.test.ts lib/academy/__tests__/repositoryKnowledgeService.test.ts
```

Third, only after adjacent PASS:

```text
npm run typecheck
```

Fourth, only after typecheck PASS:

```text
npx eslint lib/academy/AndyDigitalColleague.ts lib/academy/__tests__/boundedComparativeUnderstanding.test.ts
```

Then perform:

1. editor diagnostics on production, focused test, and fresh Evidence;
2. focused production/test diff review;
3. whitespace checks;
4. changed-file boundary verification;
5. prohibited-method hash verification;
6. production and focused-test hash capture.

No real source or contribution execution is authorised.

## 18. Evidence Continuity

The existing implementation Evidence and first acceptance review must not be rewritten.

The future task must create:

`docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RELATIONSHIP_RELEVANCE_CORRECTION_EVIDENCE.md`

That record must preserve:

```text
implementation
-> validation complete
-> independent acceptance Outcome 3
-> fresh relationship-relevance correction Authority
-> bounded correction
-> revalidation
-> fresh independent acceptance
```

It must record the Authority-consumption point, pre/post hashes, exact production/test diffs, every command and result, static boundaries, direct observations, Inferences, limitations, and stop status. The first acceptance failure remains valid historical Evidence and must not be converted into a clean-first-pass story.

## 19. MARC Finding

A developing human colleague must not treat an explicit relationship about one matter as resolving a different disagreement merely because both occur in one supplied bundle. Co-presence is not relevance.

Local relevance protects dignity because the colleague does not pressure the human with a false resolution. It protects honesty and uncertainty because an unresolved disagreement remains visible. It protects human decision ownership because organisational control returns to a human unless the supplied relationship exactly concerns the participating records.

Exact identity matching is restrained: it accepts only what the supplied provenance can directly support and fails closed when reference or scope is ambiguous.

**MARC finding:** `RELATIONSHIP RELEVANCE MUST BE LOCAL TO THE DISAGREEMENT; EXACT PARTICIPATING-RECORD IDENTITY PRESERVES USEFUL EXPLANATION WITHOUT ASSUMPTION`.

## 20. Cyril Finding

The defect is confined to two global gate conditions in private comparative formation. Current Observations already contain disagreement Observation IDs, source IDs, paths, titles, sections, metadata categories, and exact relationship subject/object spans.

One private exact-identity helper can associate an explicit relationship with the two distinct records participating in the current disagreement. Both gate conditions can then use that local result. Existing relationship attribution and all other responsibilities remain unchanged.

One additive focused regression can demonstrate both that an unrelated relationship does not suppress unresolved treatment and that an exact relevant relationship still does. No extraction, parser, public contract, provider, repository, rendering, persistence, Judgement, package, schema, Theory, or architecture change is required.

**Cyril finding:** `ONE PRIVATE RELEVANCE CHECK, TWO LOCAL GATE REPLACEMENTS, AND ONE TWO-SIDED NEUTRAL REGRESSION FIT THE EXISTING TWO-FILE IMPLEMENTATION BOUNDARY`.

## 21. Combined Outcome

**OUTCOME 1 - ONE LOCAL RELATIONSHIP-RELEVANCE CORRECTION AUTHORISED**

Outcome 2 is unnecessary because current exact private provenance is sufficient for a conservative record-pair relevance test.

Outcome 3 is unsupported because no wider implementation responsibility, extraction change, public contract, persistence change, Theory amendment, or architecture review is required.

Outcome 4 is unnecessary because the global gate, missing mixed test, exact current structures, and bounded correction are directly inspectable.

This Outcome grants only the Authority in Sections 9 through 18. It does not implement, validate, evidence, or accept the correction.

## 22. Exact Non-Consequences

This review does not:

1. edit production or tests;
2. rerun focused tests, adjacent tests, typecheck, or lint;
3. fix lint warnings;
4. consume correction Authority;
5. invoke Andy on synthetic or real material;
6. inspect, assemble, or reinterpret the real programme manifest;
7. execute or begin a contribution;
8. modify, consume, or reconsider contribution Authority;
9. create Memory, Reflection, Learning, feedback, Action, recommendation, priority selection, or follow-on;
10. reopen Context Door;
11. amend Theory or architecture;
12. accept the implementation or claim capability, readiness, production status, certification, or Formation completion.

## 23. Smallest Next Question

> Will the authorised implementer make only the local relationship-relevance correction and discriminating neutral regression, preserve every existing boundary, run the complete validation sequence once, and create fresh correction Evidence before another independent acceptance review?

This question is identified only. It is not answered by this review.

Correction-Authority review stops here.