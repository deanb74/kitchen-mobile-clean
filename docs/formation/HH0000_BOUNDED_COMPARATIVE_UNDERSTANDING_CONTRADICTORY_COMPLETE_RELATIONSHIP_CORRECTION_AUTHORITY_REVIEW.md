# HH-0000 Bounded Comparative Understanding Contradictory Complete Relationship Correction Authority Review

**Status:** OUTCOME 1 - ONE LOCAL CONTRADICTORY-COMPLETE-RELATIONSHIP CORRECTION AUTHORISED
**Review date:** 2026-08-13
**Review type:** Fresh documentation-only MARC and Cyril responsibility and correction-Authority review
**Implementation effect:** One local private complete-relationship consistency correction and minimum additive neutral focused-test work are authorised but unconsumed
**Acceptance effect:** None - post-multi-participant final implementation acceptance Outcome 3 remains in force
**Contribution effect:** None - contribution Authority is not inspected, reconsidered, modified, consumed, revived, or executed

## 1. Purpose

This review asks what exact condition permits multiple explicit authored relationships, each individually relevant to the complete participating record set of one apparent disagreement, to suppress unresolved treatment.

The answer is narrower than mere complete coverage:

> At least one exact complete relationship must exist, and every exact complete relationship for that disagreement must resolve to the same canonical exact structural relationship identity.

A canonical exact structural relationship identity consists only of:

1. the exact governed verb family;
2. the exact resolved actor source ID;
3. the exact resolved target source ID.

The six approved active/passive forms permit structural voice canonicalisation within their three exact pairs. They do not permit synonym mapping across `supersedes`, `replaces`, and `amends`.

If more than one distinct canonical identity remains, the relationship Evidence does not establish one resolved relationship. Every explicit relationship remains independently attributable, unresolved treatment remains, uncertainty remains explicit, and the decision returns to a human.

## 2. Traceability

| Layer | Trace |
| --- | --- |
| Principle | Truth before certainty; Understanding before Judgement; human Authority remains human |
| Theory | Authored relationship text is attributable Evidence, not owner-independent organisational truth |
| Architecture | Existing private, non-deliberative comparative Understanding formation |
| Engineering | Exact identity resolution, exact structural voice canonicalisation, fail-closed complete-relationship consistency, and existing unresolved consequences |
| Milestone | HH-0000 bounded comparative Understanding final correction dependency |
| Evidence | Extraction contract, implementation Authority, human-decision boundary, current private structures, post-multi-participant final acceptance Outcome 3, and this review |

## 3. Exact Review Boundary

This review inspected only:

1. `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_POST_MULTI_PARTICIPANT_CORRECTION_FINAL_ACCEPTANCE_REVIEW.md`;
2. `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_IMPLEMENTATION_AUTHORITY_RECONSIDERATION.md`;
3. `docs/formation/HH0000_AUTHORED_RECORD_METADATA_AND_BOUNDED_CLAIM_EXTRACTION_CONTRACT_REVIEW.md`;
4. the settled human-decision-boundary review;
5. the private relationship types, parser, exact relevance helper, and per-disagreement consequence formation in current `lib/academy/AndyDigitalColleague.ts`;
6. the Formation authoring standard.

No production or test file was edited. No test file was inspected. No Jest, typecheck, lint, build, runtime, hash, or other validation command ran. Andy was not invoked. No real programme source or manifest was inspected. Contribution Authority was not inspected or reconsidered.

The only created artefact is this review record.

## 4. Governing Responsibility

The settled responsibility chain is:

```text
authored relationship text
-> exact structural relationship Observation with provenance
-> comparative Understanding of relationship Evidence
-> labelled uncertainty and unresolved Evidence where needed
-> human decision when supplied Evidence cannot establish the relationship
```

Understanding owns attributable comparison, conflict visibility, uncertainty, and the human-decision boundary. It does not own selection of a governing source, organisational truth, priority, recommendation, or Action.

An explicit relationship Observation establishes only that a source states an exact relationship. It does not independently validate that relationship. Repetition does not turn a claim into organisational truth. Contradiction does not permit Understanding to choose one statement.

Therefore multiple complete relationship Observations may suppress unresolved treatment only when their exact structural content is mutually consistent under already governed syntax.

## 5. Current Private Data

Current `StructuralObservation.explicitRelationship` already carries:

```text
exact verb
literal subject text
literal object text
```

The exact verb union is:

```text
supersedes
is superseded by
replaces
is replaced by
amends
is amended by
```

Each structural Observation also retains exact source ID, source path, title, section, exact text, block location, and heading lineage.

The current relevance helper already:

1. derives the complete participating record set from the current disagreement's Observation IDs;
2. exposes exact title, source ID, and complete source path as identity fields;
3. resolves relationship subject and object independently against those exact fields;
4. requires each side to resolve uniquely;
5. requires distinct subject and object source IDs;
6. requires one relationship's covered source-ID set to equal the complete participating source-ID set.

Current private data is therefore sufficient to derive exact resolved subject and object source IDs for every individually complete relationship. No provider enrichment, public field, parser expansion, graph, transitive rule, source ranking, or architecture change is required.

## 6. Structural Voice Canonicalisation

The extraction contract expressly recognises exact active or passive relationship forms and preserves the exact verb phrase plus literal subject and object spans.

The following voice canonicalisation is structurally determined by those approved forms:

| Exact observed form | Canonical verb family | Canonical actor | Canonical target |
| --- | --- | --- | --- |
| `A supersedes B` | `supersedes` | resolved A | resolved B |
| `B is superseded by A` | `supersedes` | resolved A | resolved B |
| `A replaces B` | `replaces` | resolved A | resolved B |
| `B is replaced by A` | `replaces` | resolved A | resolved B |
| `A amends B` | `amends` | resolved A | resolved B |
| `B is amended by A` | `amends` | resolved A | resolved B |

This does not assert truth, validity, currentness, scope, or Authority. It identifies only the exact grammatical relationship stated by the supplied text.

It is not semantic synonym mapping:

1. `supersedes` remains distinct from `replaces`;
2. `replaces` remains distinct from `amends`;
3. `amends` remains distinct from `supersedes`;
4. no implication, transitivity, strength, temporal ordering, or organisational consequence is inferred.

**Finding:** Active/passive normalisation within each expressly governed pair is safe structural voice canonicalisation inside Understanding. Cross-family equivalence is not governed and must not be invented.

## 7. Exact Canonical Identity

For one explicit relationship that already passes exact complete-set relevance, derive:

```text
canonicalRelationshipIdentity =
  exact canonical verb family
  + exact resolved actor source ID
  + exact resolved target source ID
```

Examples:

```text
A supersedes B
B is superseded by A
```

both become:

```text
supersedes | A-source-ID | B-source-ID
```

But:

```text
A supersedes B
B supersedes A
```

become two different identities:

```text
supersedes | A-source-ID | B-source-ID
supersedes | B-source-ID | A-source-ID
```

And:

```text
A supersedes B
A replaces B
```

also become two different identities because the exact verb families differ.

The identity is programme-neutral, deterministic, order-neutral, and independent of date, rank, score, filename, source position, document count, or source count.

## 8. Exact Suppression Rule

For each apparent disagreement:

1. evaluate every explicit relationship independently through the settled exact identity and complete-set conditions;
2. retain only relationships that individually cover the complete participating record set;
3. derive one canonical exact structural identity for each retained relationship;
4. deduplicate identical canonical identities;
5. suppress possible-supersession, unresolved relationship, unresolved uncertainty, and the human-decision question only when:
   - at least one complete canonical identity exists; and
   - the distinct canonical identity set has size exactly one;
6. otherwise fail closed and preserve existing unresolved consequences.

Formally:

```text
relationship Evidence resolves one disagreement
    iff
completeCanonicalIdentities.length >= 1
    and
unique(completeCanonicalIdentities).size == 1
```

Every explicit authored relationship remains independently attributable regardless of deduplication used for the resolution decision.

This rule does not count sources, weight repetition, select a majority, or strengthen confidence. It asks only whether supplied complete relationship Evidence expresses one exact structural relationship rather than several non-equivalent relationships.

## 9. Candidate Decisions

### A. Any One Complete Relationship Is Sufficient

**Rejected.**

The post-multi-participant acceptance review proves that `some(...)` can treat opposing complete relationships as resolution. One complete statement cannot silence another complete statement that directly opposes it.

### B. Multiple Complete Relationships Must Be Mutually Consistent

**Selected with exact precision.**

Mutual consistency means only that every individually complete relationship canonicalises to one exact structural identity under Section 7. It does not mean semantic compatibility, majority agreement, common direction across different verb families, or organisational validity.

### C. More Than One Complete Relationship Always Means Unresolved

**Rejected.**

Identical repeated statements and exact active/passive restatements of one relationship do not create a second structural relationship identity. Treating harmless repetition as contradiction would discard exact information already available and would make source count alter resolution.

### D. Current Private Data Is Insufficient

**Rejected.**

The current parser exposes exact approved verb, subject, and object. The current helper already resolves subject and object to exact participating source IDs. These fields are sufficient for the canonical identity without new semantics or architecture.

## 10. Required Case Decisions

### A. Identical Duplicate

```text
A supersedes B
A supersedes B
```

Both canonicalise to one identity. The explicit Observations remain separate and attributable. The relationship set may preserve the accepted resolved behavior.

### B. Active/Passive Same Direction - Supersedes

```text
A supersedes B
B is superseded by A
```

Both canonicalise to `supersedes | A | B`. They are structurally equivalent for this bounded decision.

### C. Active/Passive Same Direction - Replaces

```text
A replaces B
B is replaced by A
```

Both canonicalise to `replaces | A | B`. They are structurally equivalent for this bounded decision.

### D. Active/Passive Same Direction - Amends

```text
A amends B
B is amended by A
```

Both canonicalise to `amends | A | B`. They are structurally equivalent for this bounded decision.

### E. Direct Opposition

```text
A supersedes B
B supersedes A
```

The canonical directions differ. The relationship Evidence is contradictory. Both explicit relationships remain visible, unresolved treatment remains, uncertainty remains, and a human decision is required.

### F. Different Verb Families

```text
A supersedes B
A replaces B
```

The exact verb families differ. Existing governance does not establish synonymy, hierarchy, equivalence, or compatibility between them. Understanding must not invent such semantics.

The set is therefore non-equivalent and fails closed. It may be described as multiple non-equivalent complete relationship statements, not necessarily as direct logical contradiction. Existing unresolved treatment and human decision remain.

## 11. Human Consequence

For direct opposition, bounded Understanding must preserve enough formed Evidence to communicate, in effect:

```text
Source X explicitly states A supersedes B.
Source Y explicitly states B supersedes A.
Those exact complete authored relationships conflict.
The supplied Evidence does not establish which relationship currently governs.
Human Context or Authority is required.
```

It must not:

1. select A or B;
2. infer newest wins;
3. use order, date, rank, score, filename, source position, document count, or repetition as Authority;
4. infer a majority or governing source;
5. recommend an Action;
6. create Judgement, deliberation, Reflection, Memory, Learning, feedback, retry, or follow-on behavior.

For different verb families, the wording must remain exact: the supplied complete relationships are non-equivalent and no governed rule establishes one resolved relationship. The implementation must not call distinct verbs synonymous or claim a semantic contradiction it cannot prove.

## 12. Existing Accepted Behavior Preserved

The future correction must preserve:

1. one exact A-to-B two-record relationship as accepted resolved behavior;
2. unrelated relationship locality;
3. three-participant proper-subset fail-closed behavior;
4. collective binary relationships remaining uncomposed;
5. chain, graph, transitive, cycle, and common-anchor non-resolution;
6. independent per-disagreement processing;
7. canonical participating source-ID-set human-question aggregation;
8. every independently formed unresolved Evidence relationship;
9. agreement Inferences, including the governed equal-scope tenth mixed Inference;
10. strict Observation, relationship, Inference, and human-decision separation;
11. non-deliberative and non-persistent comparative behavior;
12. genuine review/recommend behavior;
13. provider and repository closure;
14. programme neutrality;
15. exact identity ambiguity failure and forbidden-input neutrality.

## 13. MARC Finding

A human colleague may report every authored relationship without choosing among them. Two sources repeating one exact relationship do not create a new decision. Two sources stating opposite exact directions expose a conflict that must remain visible. Two sources using different relationship verbs expose non-equivalent Evidence unless governance supplies a semantic rule.

The colleague should not become more certain merely because more relationship statements are present. Certainty is justified only when the complete relationship Evidence expresses one exact structural account.

**MARC finding:** `PRESERVE EVERY ATTRIBUTABLE RELATIONSHIP; SUPPRESS THE HUMAN BOUNDARY ONLY WHEN ALL COMPLETE RELATIONSHIP EVIDENCE EXPRESSES ONE EXACT STRUCTURAL IDENTITY`.

## 14. Cyril Finding

The private parser already provides exact verb, subject, and object. The exact relevance helper already resolves subject and object against the current disagreement's participating records. Passive voice inversion within the three approved pairs is deterministic structural processing, not semantic composition.

A small private canonical identity and a distinct-identity-set check can replace the current Boolean existence decision locally. Existing unresolved relationship, uncertainty, question aggregation, renderer, provider, repository, public contracts, and architecture remain sufficient.

**Cyril finding:** `CURRENT PRIVATE DATA SUPPORTS ONE LOCAL EXACT CONSISTENCY GATE WITHOUT PARSER, PROVIDER, PUBLIC CONTRACT, GRAPH, OR ARCHITECTURE CHANGE`.

## 15. Exact Production Correction Boundary

The only authorised production file is:

`lib/academy/AndyDigitalColleague.ts`

Within the private explicit-relationship relevance and immediately local per-disagreement formation logic, the correction may only:

1. preserve current exact participant derivation and identity matching;
2. preserve the current one-relationship complete-set condition;
3. return or derive the exact resolved subject and object source IDs for individually complete relationships;
4. canonicalise the three approved passive forms into their exact paired active direction;
5. retain the three verb families as distinct;
6. collect canonical identities only from individually complete relationships for the current disagreement;
7. require exactly one distinct canonical identity before treating direct relationship Evidence as resolving that disagreement;
8. preserve every explicit relationship as a separate attributable relationship Observation;
9. preserve existing unresolved relationship, uncertainty, canonical human-question aggregation, and possible-supersession consequences when the identity set is empty or contains more than one identity;
10. use minimum conditional unresolved wording needed to distinguish direct opposing identities from other non-equivalent complete identities, without changing the relationship kind or public rendering contract.

A small private type or helper for the canonical identity is authorised if it remains local to this responsibility and removes repeated local logic.

No parser change, new relationship verb, semantic synonym table, graph, transitive rule, majority rule, source weighting, public field, renderer responsibility, provider, repository, schema, package, service, component, Theory, or architecture change is authorised.

## 16. Exact Additive Test Boundary

The only authorised test file is:

`lib/academy/__tests__/boundedComparativeUnderstanding.test.ts`

Every existing test and assertion must remain unchanged. Add the minimum programme-neutral focused coverage, preferably one test containing clear subcases, for:

1. **Single complete relationship:** A/B disagree plus A supersedes B; preserve accepted resolved behavior.
2. **Identical duplicate:** A/B disagree plus two independently attributable A supersedes B statements; preserve resolved behavior without converting repetition into confidence or truth.
3. **Active/passive same direction:** cover all three exact pairs:
   - A supersedes B / B is superseded by A;
   - A replaces B / B is replaced by A;
   - A amends B / B is amended by A.
4. **Direct opposition:** A/B disagree plus A supersedes B and B supersedes A; retain both explicit relationships, unresolved relationship, uncertainty, and one canonical A/B human question; form no governing-source conclusion.
5. **Different verb families:** A/B disagree plus A supersedes B and A replaces B; retain non-equivalent Evidence and fail closed without claiming synonymy.
6. **Unrelated relationship:** A/B disagree plus X supersedes Y; preserve unresolved A/B.
7. **Three-participant proper subset:** A/B/C disagree plus A supersedes B; preserve complete-set fail-closed behavior.
8. **Multi-relationship union:** A/B/C disagree plus A supersedes B and A supersedes C; preserve no-composition behavior.
9. **Forbidden inputs:** vary and reverse order, date, rank, score, filenames, document count, source position, and unrelated records; none may alter canonical identity or conflict handling.
10. **Independent disagreement preservation:** a resolved relationship set for one disagreement must not suppress another source set's unresolved consequences.

Assertions must distinguish independently attributable explicit relationships from the deduplicated canonical identity used only for the resolution decision.

## 17. Mechanical Pre-Edit Gate

The post-multi-participant final acceptance review records these current baselines:

| Artefact | SHA-256 |
| --- | --- |
| `lib/academy/AndyDigitalColleague.ts` | `9df7d5ebdaae3399c07b01a2cb31fe8b8ead792dced4f36d85de7cd044b91c8e` |
| `lib/academy/__tests__/boundedComparativeUnderstanding.test.ts` | `c5b8282361df4fa4b8f4d0c63caa95ef4c6878300cf4278addbad7affa484727` |

These hashes were recorded by the fresh acceptance review and were not recomputed during this documentation-only review.

Before future editing, implementation must stop unless:

1. both full-file hashes match exactly;
2. the current parser still recognises exactly the same six relationship forms;
3. the current complete-set helper and `directRelationships.some(...)` decision remain the controlling defect path;
4. the focused suite still contains 14 tests and all existing falsifiers unchanged;
5. the future Evidence path is absent;
6. the correction fits the two authorised production/test files;
7. prohibited deliberation, Reflection, Memory, provider, repository, public-contract, and renderer boundaries remain unchanged.

Any mismatch requires fresh review. It must not be silently adopted as a new baseline.

## 18. Required One-Shot Validation

Only after the authorised local correction and additive focused test, run exactly once in this order.

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

Warnings must be recorded and not fixed. Any non-zero result stops without repair or rerun.

No Andy invocation or real-source execution forms part of validation.

## 19. Required Post-Pass Static Validation

Only after all executable stages pass, verify:

1. changed-file scope contains only the authorised production/test changes and fresh Evidence;
2. production diff is confined to exact complete-relationship canonical identity and consistency handling;
3. parser expressions and six recognised verb forms are unchanged;
4. exact title, source-ID, and complete-path identity matching are unchanged;
5. complete participant-set equality remains mandatory;
6. active/passive canonicalisation is confined to the three approved exact pairs;
7. verb families remain distinct;
8. per-disagreement iteration, unresolved Evidence, canonical question aggregation, and agreement Inference formation are unchanged except for minimum conditional conflict wording;
9. all 14 current tests and original falsifiers remain unchanged and present;
10. only additive neutral contradictory-complete-relationship falsifiers were added;
11. prohibited methods and boundaries remain unchanged;
12. production, focused test, and Evidence have no relevant editor diagnostic or trailing whitespace and retain final newlines;
13. programme neutrality is preserved;
14. mechanical reversal reconstructs the exact Section 17 production/test hashes.

## 20. Fresh Evidence Requirement

The authorised future Evidence path is:

`docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_CONTRADICTORY_COMPLETE_RELATIONSHIP_CORRECTION_EVIDENCE.md`

The Evidence must preserve:

1. the complete governance and historical failure chain;
2. this Authority and its exact consumption point;
3. pre/post production and test hashes;
4. exact production and additive test diffs;
5. results for every Section 16 falsifier class;
6. every validation command, output summary, exit status, warning, and withheld stage after failure;
7. every authorised static result;
8. direct observations, Inferences, limitations, and exact non-consequences;
9. the continuing need for fresh independent acceptance;
10. untouched contribution Authority and contribution state.

The Evidence must not accept itself or rewrite any prior failed or accepted record.

## 21. Authority Consumption and Failure Rule

This correction Authority is unconsumed at creation.

It is consumed on the first production edit made under this record. No repair cycle is granted.

Future implementation must stop and create the fresh Evidence record without repair or rerun if:

1. any pre-edit gate fails;
2. canonical identity requires fuzzy, semantic, alias, basename, date, rank, score, source-count, or Authority interpretation;
3. cross-family verb equivalence is required;
4. parser, provider, repository, public contract, renderer responsibility, Theory, or architecture must change;
5. any existing test or assertion must change;
6. another production or test file is required;
7. any focused, adjacent, typecheck, or lint stage exits non-zero;
8. any post-pass static check fails.

A failed attempt remains Evidence. Authority does not widen itself.

## 22. Combined Outcome

**OUTCOME 1 - ONE LOCAL CONTRADICTORY-COMPLETE-RELATIONSHIP CORRECTION AUTHORISED**

Outcome 1 is selected because existing governance and private data fully determine an exact, conservative rule:

```text
at least one individually complete relationship
and exactly one distinct canonical exact structural identity
```

Outcome 2 is unnecessary because active/passive voice is already structurally governed and cross-family equivalence can safely remain withheld.

Outcome 3 is unnecessary because the correction remains inside existing private comparative Understanding formation and existing unresolved consequences.

Outcome 4 is unnecessary because current exact verb, subject, object, participant identity, and complete-set provenance discriminate every required case without semantic composition.

This Outcome grants correction Authority only. It does not implement, execute, validate, evidence, accept, contribute, or reconsider contribution Authority.

## 23. Exact Non-Consequences

This review does not:

1. edit production or tests;
2. run Jest, typecheck, lint, build, runtime, hash, or validation commands;
3. invoke Andy;
4. inspect a real programme source or manifest;
5. inspect, reconsider, amend, replace, consume, revive, or execute contribution Authority;
6. choose A or B as governing;
7. create semantic synonym mapping among supersedes, replaces, and amends;
8. create graph, chain, transitive, common-anchor, majority, ranking, or source-weight semantics;
9. change extraction, provider, repository, public contract, rendering responsibility, Judgement, deliberation, Reflection, Memory, Learning, feedback, Action, retry, or follow-on behavior;
10. accept the implementation;
11. claim capability, programme correctness, Formation completion, production readiness, certification, or contribution readiness.

## 24. Stop State

`DOCUMENTATION-ONLY CORRECTION-AUTHORITY REVIEW COMPLETE - OUTCOME 1 - CONTRADICTORY-COMPLETE-RELATIONSHIP CORRECTION AUTHORITY UNCONSUMED`

Review stops here.
