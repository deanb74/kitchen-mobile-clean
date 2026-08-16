# HH-0000 Bounded Comparative Understanding Contradictory Complete Relationship Correction Evidence

**Status:** CORRECTION EXECUTED - EXECUTABLE VALIDATION PASSED - POST-PASS STATIC VALIDATION FAILED - STOPPED WITHOUT REPAIR
**Evidence date:** 2026-08-13
**Evidence type:** Authorised local correction execution, validation, and failure record
**Controlling Authority:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_CONTRADICTORY_COMPLETE_RELATIONSHIP_CORRECTION_AUTHORITY_REVIEW.md`
**Acceptance effect:** None - the corrected implementation remains unaccepted
**Contribution effect:** None - contribution Authority and contribution state remain untouched

## 1. Purpose

This record preserves direct Evidence from the one authorised contradictory-complete-relationship correction attempt.

Every executable stage passed. Most authorised static checks passed, including exact mechanical reconstruction of both Section 17 baselines. One static instrumentation assertion exited non-zero because it expected six textual passive-form comparisons while the bounded implementation contains five textual comparisons across three direct passive checks and two repeated family checks. The `is amended by` form safely reaches the only remaining `amends` family without a repeated comparison.

The controlling Authority requires any static failure to stop without repair or rerun. No instrumentation correction, production repair, test change, or static rerun followed. This Evidence does not accept itself.

## 2. Traceability

| Layer | Trace |
| --- | --- |
| Principle | Truth before certainty; coverage is not consistency; contradiction is not resolution; human Authority remains human |
| Theory | Explicit relationship text remains attributable Evidence rather than owner-independent organisational truth |
| Architecture | Existing private, non-deliberative comparative Understanding formation |
| Engineering | Exact participant identity, exact complete-set coverage, exact structural voice canonicalisation, distinct verb families, and fail-closed consistency |
| Milestone | HH-0000 bounded comparative Understanding final correction dependency |
| Evidence | Complete historical chain, controlling Authority, commands and results below, current worktree changes, and this record |

## 3. Historical Continuity

The durable chain remains:

```text
bounded comparative Understanding implementation
-> first acceptance Outcome 3
-> relationship-relevance correction
-> second acceptance Outcome 3
-> multi-disagreement correction attempt 10/13 FAIL
-> human-decision-boundary Outcome 1
-> aggregation correction attempt 12/13 FAIL
-> Inference-count expectation Outcome 1
-> exact 9-to-10 correction and complete validation PASS
-> final acceptance Outcome 3: A/B could suppress A/B/C
-> multi-participant complete-set correction
-> focused 14/14 and executable validation PASS
-> Evidence-document whitespace FAIL
-> documentation-only continuation and terminal document PASS
-> post-multi-participant acceptance Outcome 3
   opposing complete A-to-B and B-to-A relationships suppressed unresolved treatment
-> contradictory-complete-relationship correction Authority Outcome 1
-> this correction attempt
-> executable validation PASS
-> post-pass static instrumentation assertion FAIL
-> mandatory stop without repair or rerun
```

Every prior Outcome 3, failed correction execution, and documentation failure remains historical Evidence. This execution does not rewrite any earlier record as a first-pass success.

## 4. Section 17 Pre-Edit Gates

Every pre-edit gate passed before the first production edit.

### 4.1 Exact Full-File Identity

| Artefact | Required SHA-256 | Observed SHA-256 | Result |
| --- | --- | --- | --- |
| `lib/academy/AndyDigitalColleague.ts` | `9df7d5ebdaae3399c07b01a2cb31fe8b8ead792dced4f36d85de7cd044b91c8e` | `9df7d5ebdaae3399c07b01a2cb31fe8b8ead792dced4f36d85de7cd044b91c8e` | PASS |
| `lib/academy/__tests__/boundedComparativeUnderstanding.test.ts` | `c5b8282361df4fa4b8f4d0c63caa95ef4c6878300cf4278addbad7affa484727` | `c5b8282361df4fa4b8f4d0c63caa95ef4c6878300cf4278addbad7affa484727` | PASS |

### 4.2 Mechanical Gates

Direct gate results were:

```text
PASS six-form parser exact once
PASS complete-set helper once
PASS complete-set size condition once
PASS complete-set membership condition once
PASS directRelationships.some gate once
PASS helper call once
PASS 14 existing tests
PASS original falsifier range retained
PASS multi-participant test retained once
PASS multi-disagreement test retained once
PASS production final newline
PASS test final newline
PASS fresh Evidence path absent
PASS production and focused-test editor diagnostics
```

The parser still recognised exactly:

```text
supersedes
is superseded by
replaces
is replaced by
amends
is amended by
```

The exact complete-set helper and one `directRelationships.some(...)` call remained the controlling defect path. The correction fit the authorised production and focused-test files; no additional production, test, parser, provider, repository, public-contract, renderer, Theory, or architecture surface was required.

### 4.3 Protected Regions

All accepted method hashes matched before editing:

| Method | SHA-256 | Result |
| --- | --- | --- |
| `prioritizeDocumentsForUnderstanding` | `7239538b2fa0412aa6b36a71d24fc9091cb7e12befb3001c65e2c0e1d6f074ca` | PASS |
| `retrieveFromRepository` | `8d7ac48b43885918197c442b4e5696782a47d576c98b35348985d58c7598fa0f` | PASS |
| `buildDeliberationRecord` | `f4585b894a86e86f04618e293f74f93f0d84c6e2a24e9e9a6a4a25d1ae92f070` | PASS |
| `buildReflectionRecord` | `bea18b8dcf043f32283cfa2e53372997df7997e09ef5da85514c964cfc6b033a` | PASS |

No edit or executable validation occurred before all pre-edit gates passed.

## 5. Authority Consumption

Correction Authority was consumed on the first production edit to `lib/academy/AndyDigitalColleague.ts`.

The same `apply_patch` operation:

1. changed the private one-relationship Boolean helper into an exact complete-relationship identity helper;
2. replaced `directRelationships.some(...)` with a distinct canonical identity-set decision;
3. added one programme-neutral focused test containing the authorised subcases.

No prior production or test edit occurred under this Authority. No correction cycle remains.

## 6. Exact Production Diff

The existing participant derivation, exact title/source-ID/complete-path matching, unique identity checks, distinct-record check, and complete participant-set equality remain byte-semantically present.

The helper return changed from Boolean relevance to one exact canonical identity or `null`:

```diff
-  private isExplicitRelationshipRelevantToDisagreement(
+  private getCompleteRelationshipIdentityForDisagreement(
     relationshipObservation: StructuralObservation,
     disagreement: ComparativeRelationship,
     observations: StructuralObservation[],
-  ): boolean {
+  ): string | null {
     const explicitRelationship = relationshipObservation.explicitRelationship;
-    if (!explicitRelationship) return false;
+    if (!explicitRelationship) return null;
```

Existing failures now return `null`, and the unchanged exact sufficiency condition guards canonical identity formation:

```diff
-    return subjectSourceIds.length === 1 &&
+    if (!(subjectSourceIds.length === 1 &&
       objectSourceIds.length === 1 &&
       subjectSourceIds[0] !== objectSourceIds[0] &&
       coveredSourceIds.size === participatingRecords.size &&
-      [...participatingRecords.keys()].every((sourceId) => coveredSourceIds.has(sourceId));
+      [...participatingRecords.keys()].every((sourceId) => coveredSourceIds.has(sourceId)))) {
+      return null;
+    }
```

Only the three exact passive forms reverse actor and target. The three verb families remain distinct:

```ts
const passiveRelationship = explicitRelationship.verb === "is superseded by" ||
  explicitRelationship.verb === "is replaced by" ||
  explicitRelationship.verb === "is amended by";
const verbFamily = explicitRelationship.verb === "supersedes" || explicitRelationship.verb === "is superseded by"
  ? "supersedes"
  : explicitRelationship.verb === "replaces" || explicitRelationship.verb === "is replaced by"
    ? "replaces"
    : "amends";
const actorSourceId = passiveRelationship ? objectSourceIds[0] : subjectSourceIds[0];
const targetSourceId = passiveRelationship ? subjectSourceIds[0] : objectSourceIds[0];

return [verbFamily, actorSourceId, targetSourceId].join("\u0000");
```

The former existence gate changed exactly to canonical identity deduplication for the resolution decision:

```diff
-      const hasRelevantDirectRelationship = directRelationships.some((observation) =>
-        this.isExplicitRelationshipRelevantToDisagreement(observation, disagreement, observations),
-      );
+      const completeRelationshipIdentities = new Set(directRelationships
+        .map((observation) => this.getCompleteRelationshipIdentityForDisagreement(observation, disagreement, observations))
+        .filter((identity): identity is string => identity !== null));
+      const hasRelevantDirectRelationship = completeRelationshipIdentities.size === 1;
```

Every explicit relationship continues to be added independently before this decision. No attributable Evidence is deduplicated or erased.

## 7. Exact Additive Test Diff

One test was inserted immediately before the existing multi-disagreement test:

```text
requires all complete authored relationships to share one exact structural identity
```

No existing test or assertion was changed. Mechanical removal of exactly that contiguous test reconstructs the Section 17 test hash.

The additive test introduced local neutral helpers `expectResolved`, `expectUnresolved`, `makePair`, `comparePair`, and `relationship`, then exercised exactly:

1. one `Record A supersedes Record B` statement;
2. two independently attributable identical `Record A supersedes Record B` statements;
3. `Record A supersedes Record B` plus `Record B is superseded by Record A`;
4. `Record A replaces Record B` plus `Record B is replaced by Record A`;
5. `Record A amends Record B` plus `Record B is amended by Record A`;
6. direct opposition through `Record A supersedes Record B` plus `Record B supersedes Record A`;
7. cross-family Evidence through `Record A supersedes Record B` plus `Record A replaces Record B`;
8. unrelated `Record X supersedes Record Y`;
9. A/B/C proper subset with A-to-B;
10. A/B/C multi-relationship union with A-to-B and A-to-C;
11. forward and reversed order for opposition, cross-family, proper-subset, and union cases;
12. varied dates, ranks, scores, filenames, document count, source positions, and an unrelated document;
13. one resolved A/B disagreement alongside an independently unresolved C/D state disagreement.

The assertions require independently attributable explicit-relationship counts in every case. Resolved cases require no possible-supersession, unresolved relationship, uncertainty, or human question. Fail-closed cases require unresolved relationship, uncertainty, and one canonical human question.

## 8. Post-Edit Hashes and Reversible Scope

| Artefact | Pre-edit SHA-256 | Post-edit SHA-256 |
| --- | --- | --- |
| `lib/academy/AndyDigitalColleague.ts` | `9df7d5ebdaae3399c07b01a2cb31fe8b8ead792dced4f36d85de7cd044b91c8e` | `0cc709a1fc2c601aa7b0014e5e970f16f6dd9591fafe44ffbbb7cbbddcbc685c` |
| `lib/academy/__tests__/boundedComparativeUnderstanding.test.ts` | `c5b8282361df4fa4b8f4d0c63caa95ef4c6878300cf4278addbad7affa484727` | `b55f2e7768bc83c401382c66414b1a1596ee92b3831cecc95ff63e8661822c07` |

The first authorised reversible-scope script passed every assertion:

```text
PASS production correction helper found once
PASS production decision gate found once
PASS production reversal restores baseline
PASS additive test found once
PASS test reversal restores baseline
PASS 15 tests present
PASS all original falsifiers present
PASS production no trailing whitespace
PASS test no trailing whitespace
PASS production final newline
PASS test final newline
```

Mechanical reconstruction proves that only the production helper/gate and one additive test separate the current files from the exact Authority baselines.

## 9. Focused Validation

Command run exactly once:

```text
npm test -- --runInBand lib/academy/__tests__/boundedComparativeUnderstanding.test.ts
```

Result: `PASS`, exit status `0`.

```text
Test Suites: 1 passed, 1 total
Tests:       15 passed, 15 total
Snapshots:   0 total
Time:        0.449 s, estimated 1 s
```

The output named and passed the new contradictory-complete-relationship test. All 14 existing tests also passed.

### 9.1 Neutral Falsifier Results

| Falsifier class | Result |
| --- | --- |
| Single complete relationship | PASS |
| Identical duplicate | PASS |
| Supersedes active/passive same direction | PASS |
| Replaces active/passive same direction | PASS |
| Amends active/passive same direction | PASS |
| Direct opposition retains unresolved consequences | PASS |
| Different verb families fail closed | PASS |
| Unrelated relationship locality | PASS |
| Three-participant proper subset | PASS |
| Multi-relationship union remains uncomposed | PASS |
| Forbidden-input and reversed-order neutrality | PASS |
| Independent disagreement preservation | PASS |
| Every explicit relationship remains independently attributable | PASS |
| Existing 14-test inventory | PASS |

## 10. Adjacent Validation

Command run exactly once after focused PASS:

```text
npm test -- --runInBand lib/academy/__tests__/boundedSourceProvider.test.ts lib/academy/__tests__/deliberation.test.ts lib/academy/__tests__/reflection.test.ts lib/academy/__tests__/repositoryKnowledgeService.test.ts
```

Result: `PASS`, exit status `0`.

```text
Test Suites: 4 passed, 4 total
Tests:       58 passed, 58 total
Snapshots:   0 total
Time:        1.704 s, estimated 2 s
```

## 11. Typecheck

Command run exactly once after adjacent PASS:

```text
npm run typecheck
```

Result: `PASS`, exit status `0`. `tsc --noEmit` produced no diagnostic.

## 12. Focused Lint

Command run exactly once after typecheck PASS:

```text
npx eslint lib/academy/AndyDigitalColleague.ts lib/academy/__tests__/boundedComparativeUnderstanding.test.ts
```

Result: `PASS WITH WARNINGS`, exit status `0`.

ESLint reported zero errors and seven warnings:

1. `AndyDigitalColleague.ts:192:32` - `@typescript-eslint/array-type`;
2. `AndyDigitalColleague.ts:1893:31` - `@typescript-eslint/array-type`;
3. `AndyDigitalColleague.ts:1926:25` - `@typescript-eslint/array-type`;
4. `AndyDigitalColleague.ts:4016:11` - `@typescript-eslint/no-unused-vars` for `askedQuestions`;
5. `boundedComparativeUnderstanding.test.ts:46:18` - `@typescript-eslint/array-type`;
6. `boundedComparativeUnderstanding.test.ts:55:15` - `@typescript-eslint/array-type`;
7. `boundedComparativeUnderstanding.test.ts:63:27` - `@typescript-eslint/array-type`.

No warning was fixed. The changed `askedQuestions` line number reflects the local production insertion; the warning itself is unchanged.

## 13. Post-Pass Static Validation

Static validation began only after all executable stages passed.

### 13.1 Passed Static Results

Direct PASS results were:

```text
PASS production correction helper found once
PASS production decision gate found once
PASS production reversal restores baseline
PASS additive test found once
PASS test reversal restores baseline
PASS 15 tests present
PASS all original falsifiers present
PASS production no trailing whitespace
PASS test no trailing whitespace
PASS production final newline
PASS test final newline
PASS parser six forms unchanged
PASS exact title identity retained
PASS exact source ID identity retained
PASS exact complete path identity retained
PASS unique subject resolution retained
PASS unique object resolution retained
PASS distinct records retained
PASS complete set size retained
PASS complete set membership retained
PASS three exact verb families retained
PASS one distinct identity gate
PASS per-disagreement loop unchanged
PASS canonical question aggregation retained
PASS agreement inference loop retained
PASS additive fixture programme-neutral
PASS all active passive pairs covered
PASS opposition covered
PASS cross-family covered
PASS reversed order covered
PASS independent disagreement covered
PASS prioritizeDocumentsForUnderstanding protected hash
PASS retrieveFromRepository protected hash
PASS buildDeliberationRecord protected hash
PASS buildReflectionRecord protected hash
PASS production editor diagnostics
PASS focused-test editor diagnostics
```

### 13.2 Static Failure

The semantic static script also contained this instrumentation assertion:

```text
passive canonicalisation limited to three forms
```

Its implementation counted textual comparisons matching:

```text
explicitRelationship.verb === "is superseded by"
explicitRelationship.verb === "is replaced by"
explicitRelationship.verb === "is amended by"
```

and required a total count of six.

Observed result:

```text
FAIL passive canonicalisation limited to three forms
```

The authored source contains:

1. three direct passive checks in `passiveRelationship`;
2. one repeated `is superseded by` comparison in verb-family selection;
3. one repeated `is replaced by` comparison in verb-family selection;
4. no repeated `is amended by` family comparison because `amends` is the only remaining exact family after the two preceding branches.

The script therefore observes five textual comparisons, not six. Its count expectation does not correspond to the authored ternary structure.

This explains the static result but does not convert it into PASS. The controlling Authority states that any static failure must stop without repair or rerun. No corrected instrumentation was run.

## 14. Mandatory Stop and Withheld Work

After the static failure:

1. production was not repaired or reformatted;
2. the focused test was not changed;
3. no executable validation was rerun;
4. no static check was rerun;
5. no additional changed-file, diff, parser, identity, canonicalisation, protected-region, diagnostics, whitespace, programme-neutrality, or reversal check ran;
6. no acceptance review began;
7. no contribution activity occurred.

The static checks already returned in the same parallel batch remain recorded as direct results. No unexecuted check is inferred as passing.

## 15. Direct Observations

Direct observations are:

1. every Section 17 pre-edit gate passed;
2. Authority was consumed on the first production edit;
3. one private complete-relationship canonical identity helper and one local distinct-identity gate were authored;
4. every explicit relationship continues to be formed independently;
5. one additive programme-neutral focused test was added;
6. all 15 focused tests passed;
7. all 58 adjacent tests passed;
8. typecheck passed without diagnostics;
9. lint exited zero with seven warnings and no errors;
10. exact production and test reversal to both Authority baselines passed;
11. all protected methods retained accepted hashes;
12. the static canonicalisation count assertion failed;
13. no repair or rerun followed;
14. no real source, real manifest, Andy programme invocation, contribution execution, or contribution-Authority reconsideration occurred.

## 16. Inferences

It is inferred from source shape and focused PASS that:

1. one relationship and identical duplicates retain accepted resolved behavior;
2. exact active/passive pairs collapse to one structural identity;
3. direct opposition and cross-family complete Evidence fail closed;
4. multi-participant proper subsets and unions remain unresolved;
5. canonical deduplication affects only the resolution decision, not attributable Evidence.

It is inferred that the failed static assertion reflects an over-specified textual occurrence count rather than discovery of a fourth passive form or cross-family semantic mapping.

Those Inferences do not override the non-zero static result or establish completed governed validation.

## 17. Limitations and Unknowns

Known limitations are:

1. post-pass static validation did not complete successfully under the controlling Authority;
2. no repair cycle or instrumentation rerun is available;
3. this Evidence document was created after the mandatory stop and was not itself post-pass validated;
4. the implementation has not received fresh independent acceptance;
5. no real source, real manifest, or contribution execution was inspected or run.

Unknowns include the result of a freshly authorised corrected static instrument, independent implementation acceptance, real-source compatibility, programme correctness, general capability, production readiness, certification, and Formation completion.

## 18. Exact Claim Supported

The maximum directly supported claim is:

> One authorised local canonical complete-relationship consistency correction and one additive programme-neutral regression were authored after every pre-edit gate passed. Focused validation passed 15 of 15 tests, adjacent validation passed 58 of 58 tests, typecheck passed, lint exited zero with seven warnings, exact reversible scope passed, and most static checks passed. One static textual-count assertion exited non-zero because it required six passive-form comparisons while the bounded implementation uses five textual comparisons across three direct passive checks and two repeated family checks. The task stopped without repair or rerun, so completed governed validation and acceptance are not established.

No stronger implementation or capability claim is supported.

## 19. Exact Non-Consequences

This execution and Evidence do not:

1. accept the corrected implementation;
2. authorise a repair or static rerun;
3. change the parser or introduce another relationship form;
4. create synonym, graph, chain, transitive, majority, source-count, date, rank, score, order, or Authority semantics;
5. change provider, repository, public contract, renderer responsibility, Judgement, deliberation, Reflection, Memory, Learning, feedback, Action, retry, or follow-on behavior;
6. inspect a real programme source or manifest;
7. invoke Andy on programme material;
8. inspect, reconsider, amend, replace, consume, revive, or execute contribution Authority;
9. rewrite any prior failure or acceptance record;
10. claim completed validation, acceptance, capability, programme correctness, Formation completion, production readiness, certification, or contribution readiness.

## 20. Stop State

`POST-PASS STATIC VALIDATION FAILED - AUTHORITY CONSUMED - NO REPAIR OR RERUN - FRESH HUMAN AUTHORITY REQUIRED`

Correction Evidence stops here.

## 21. Static Instrumentation Continuation

**Continuation status:** CORRECTED STRUCTURAL INSTRUMENT FAILED - CONTINUATION AUTHORITY CONSUMED - REMAINING STATIC CHECKS WITHHELD - STOPPED WITHOUT REPAIR OR RERUN
**Continuation date:** 2026-08-13
**Continuation Authority:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_CONTRADICTORY_COMPLETE_RELATIONSHIP_STATIC_INSTRUMENTATION_CONTINUATION_AUTHORITY_REVIEW.md`

This section is an append-only continuation. It does not alter the original static failure, mandatory stop, or historical executable results recorded above.

### 21.1 Read-Only Identity Gate

The two authorised SHA-256 checks ran before the structural instrument.

| Artefact | Required SHA-256 | Observed SHA-256 | Result |
| --- | --- | --- | --- |
| `lib/academy/AndyDigitalColleague.ts` | `0cc709a1fc2c601aa7b0014e5e970f16f6dd9591fafe44ffbbb7cbbddcbc685c` | `0cc709a1fc2c601aa7b0014e5e970f16f6dd9591fafe44ffbbb7cbbddcbc685c` | PASS |
| `lib/academy/__tests__/boundedComparativeUnderstanding.test.ts` | `b55f2e7768bc83c401382c66414b1a1596ee92b3831cecc95ff63e8661822c07` | `b55f2e7768bc83c401382c66414b1a1596ee92b3831cecc95ff63e8661822c07` | PASS |

Both current files exactly matched the post-edit identities authorised for continuation. No new baseline was adopted.

### 21.2 Continuation Authority Consumption

The continuation Authority was consumed when the corrected read-only structural assertion was first executed after the identity gate passed.

No production or test edit consumed this Authority. No implementation behavior was invoked.

### 21.3 Corrected Structural Instrument

One Node.js instrument parsed `lib/academy/AndyDigitalColleague.ts` with the TypeScript compiler API as a syntax tree. It did not use whole-file relationship-phrase counts.

The instrument was authored to inspect mechanically:

1. the exact private relationship verb union;
2. the exact parser relationship alternatives;
3. the exact `passiveRelationship` equality members;
4. the actor and target conditional expressions;
5. the canonical family conditional expressions and outputs;
6. the closed-domain basis of the `amends` fallback;
7. out-of-domain family or passive forms;
8. prohibited extra semantic inputs in the bounded canonicalisation slice.

The instrument first attempted to locate `StructuralObservation` as an interface declaration. Its result was:

```text
Error: expected one StructuralObservation interface, found 0
```

The Node.js process exited non-zero with status `1` before evaluating the governed invariant.

**Corrected structural assertion result:** `FAIL`

### 21.4 Failure Classification

The observed failure is in the fresh static instrument's declaration-shape assumption. The instrument required an interface node before inspecting the relationship type and found none.

Because execution stopped at that first assertion:

1. it did not prove or disprove the six-form private type set;
2. it did not prove or disprove parser/type set equality;
3. it did not prove or disprove the exact passive set;
4. it did not prove or disprove endpoint inversion;
5. it did not prove or disprove canonical family closure;
6. it did not prove or disprove the exhaustive `amends` fallback;
7. it did not prove or disprove absence of cross-family or extra semantics.

No implementation defect is inferred from failure to locate the expected syntax-node kind. Equally, no governed structural PASS is claimed.

### 21.5 Mandatory Stop and Withheld Stages

The continuation Authority grants no correction or rerun after a failed structural assertion. Therefore:

1. the structural instrument was not corrected or rerun;
2. no remaining Section 19 static check ran;
3. no changed-file-scope check ran;
4. no production or focused-test diff-confinement check ran;
5. no parser, identity, participant-set, canonicalisation, per-disagreement, unresolved-Evidence, question-aggregation, or agreement-Inference continuation check ran;
6. no focused-inventory or protected-boundary continuation check ran;
7. no programme-neutrality continuation check ran;
8. no mechanical reversal continuation check ran;
9. no Jest, adjacent test, typecheck, or ESLint command reran;
10. no acceptance review began;
11. no contribution action or contribution-Authority inspection occurred.

Every withheld stage remains unknown. No unexecuted check is inferred as passing.

### 21.6 Historical Executable Evidence

The previously recorded focused `15/15`, adjacent `58/58`, typecheck PASS, and ESLint zero-error/seven-warning results remain historical Evidence only. They were not rerun and are not presented as newly obtained results.

### 21.7 Direct Observations and Inferences

Direct observations from this continuation are:

1. both read-only SHA-256 identity gates passed exactly;
2. the continuation Authority was consumed by the first structural-instrument execution;
3. the instrument used TypeScript syntax-tree inspection rather than whole-file phrase counts;
4. the instrument expected one `StructuralObservation` interface declaration and found zero;
5. the process exited non-zero before the structural invariant was evaluated;
6. no correction, rerun, remaining static check, executable validation, implementation edit, test edit, acceptance review, or contribution action followed.

It is inferred that the fresh failure concerns the instrument's assumed declaration kind rather than relationship behavior. That Inference does not convert the result into PASS and does not establish the governed invariant.

### 21.8 Exact Claim Supported After Continuation

The maximum additional claim supported is:

> The authorised post-edit identity gate passed for both production and focused-test files. One syntax-tree-based structural instrument then exited non-zero because it expected `StructuralObservation` to be an interface declaration and found none. The continuation stopped without correction or rerun before the governed structural invariant or any remaining Section 19 static check was established.

No stronger validation or implementation claim is supported.

### 21.9 Continuation Non-Consequences

This continuation does not:

1. rewrite or convert the original textual-count failure into PASS;
2. establish the corrected structural invariant;
3. accept or reject the implementation;
4. authorise another instrumentation correction or rerun;
5. edit production or tests;
6. create relationship semantics or change the parser;
7. rerun or refresh historical executable Evidence;
8. inspect or act under contribution Authority;
9. claim programme correctness, capability, Formation completion, production readiness, certification, or contribution readiness.

### 21.10 Continuation Stop State

`CORRECTED STRUCTURAL INSTRUMENT FAILED - CONTINUATION AUTHORITY CONSUMED - NO REPAIR OR RERUN - REMAINING STATIC CHECKS WITHHELD - FRESH HUMAN AUTHORITY REQUIRED`

Static instrumentation continuation stops here.

## 22. Declaration-Shape Static Continuation

**Continuation status:** DECLARATION-SHAPE-CORRECT STRUCTURAL INSTRUMENT FAILED - AUTHORITY CONSUMED - REMAINING STATIC CHECKS WITHHELD - STOPPED WITHOUT REPAIR OR RERUN
**Continuation date:** 2026-08-13
**Continuation Authority:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_CONTRADICTORY_COMPLETE_RELATIONSHIP_DECLARATION_SHAPE_STATIC_CONTINUATION_AUTHORITY_REVIEW.md`

This section is an append-only continuation. It leaves both earlier static failures, their classifications, and their mandatory stops unchanged.

### 22.1 Read-Only Identity Gate

The two required SHA-256 checks ran before the structural instrument.

| Artefact | Required SHA-256 | Observed SHA-256 | Result |
| --- | --- | --- | --- |
| `lib/academy/AndyDigitalColleague.ts` | `0cc709a1fc2c601aa7b0014e5e970f16f6dd9591fafe44ffbbb7cbbddcbc685c` | `0cc709a1fc2c601aa7b0014e5e970f16f6dd9591fafe44ffbbb7cbbddcbc685c` | PASS |
| `lib/academy/__tests__/boundedComparativeUnderstanding.test.ts` | `b55f2e7768bc83c401382c66414b1a1596ee92b3831cecc95ff63e8661822c07` | `b55f2e7768bc83c401382c66414b1a1596ee92b3831cecc95ff63e8661822c07` | PASS |

Both files exactly matched the authorised post-edit identities. No new baseline was adopted.

### 22.2 Authority Consumption

The declaration-shape continuation Authority was consumed when the single TypeScript AST assertion executed after both identity gates passed.

No production or test edit consumed this Authority. No implementation behavior was invoked.

### 22.3 Declaration-Shape-Correct Structural Instrument

One Node.js instrument parsed `lib/academy/AndyDigitalColleague.ts` with the TypeScript compiler API. It did not use whole-file passive-phrase counts.

Before its failure, the instrument mechanically established without throwing that:

1. exactly one `TypeAliasDeclaration` named `StructuralObservation` exists;
2. the alias body is a `TypeLiteralNode`;
3. exactly one optional `explicitRelationship` property exists in that type literal;
4. the property's type is a nested `TypeLiteralNode`;
5. its `verb` property is a `UnionTypeNode` of string literals;
6. that union's exact set is the six approved forms.

The instrument next inspected all regular-expression literals inside `parseExplicitRelationship` and required exactly one. Its observed result was:

```text
Error: expected one parser regex, found 2
```

The Node.js process exited non-zero with status `1` before selecting the relationship-vocabulary regex or evaluating parser/type set equality and the remaining canonicalisation invariant.

**Declaration-shape-correct structural assertion result:** `FAIL`

### 22.4 Failure Classification

The fresh instrument correctly traversed the authorised type-alias path, then imposed an additional unsupported cardinality assumption on all regex literals in the parser method.

The method contains a separate punctuation guard regex before the relationship-matching regex. Section 8 required one relationship-vocabulary alternative group, not exactly one regex literal in the entire method.

Because the process stopped at the regex-count assertion:

1. the exact six-form private type union was mechanically established during this execution;
2. parser/type vocabulary equality was not established;
3. the exact passive set was not established;
4. endpoint inversion was not established;
5. canonical family closure was not established;
6. the exhaustive `amends` fallback was not established;
7. canonical identity confinement was not established;
8. absence of cross-family or additional semantics was not established.

No implementation defect is inferred from the presence of two parser-method regex literals. Equally, the incomplete structural invariant is not converted into PASS.

**Failure classification:** `READ-ONLY STATIC-INSTRUMENT PARSER-REGEX-SELECTION DEFECT`.

### 22.5 Historical Static Failures Preserved

The earlier results remain historical Evidence exactly as recorded:

```text
FAIL passive canonicalisation limited to three forms
```

```text
Error: expected one StructuralObservation interface, found 0
```

The new result is recorded separately:

```text
Error: expected one parser regex, found 2
```

None of these results is relabelled or converted to PASS.

### 22.6 Mandatory Stop and Withheld Stages

The Authority grants no correction or rerun after a failed structural assertion. Therefore:

1. the AST instrument was not corrected or rerun;
2. no parser-vocabulary selection assertion ran after the failure;
3. no remaining canonicalisation assertion ran;
4. no remaining Section 19 static check ran;
5. no changed-file-scope or diff-confinement check ran;
6. no parser, identity, participant-set, per-disagreement, unresolved-Evidence, question-aggregation, agreement-Inference, inventory, protected-boundary, programme-neutrality, or mechanical-reversal continuation check ran;
7. no Jest, adjacent test, typecheck, or ESLint command reran;
8. no production or test file was edited;
9. no acceptance review began;
10. no contribution action or contribution-Authority inspection occurred.

Every withheld stage remains unknown. No unexecuted assertion is inferred as passing.

### 22.7 Historical Executable Evidence

The recorded focused `15/15`, adjacent `58/58`, typecheck PASS, and ESLint zero-error/seven-warning results remain historical Evidence only. They were not rerun or promoted as fresh results.

### 22.8 Direct Observations and Inferences

Direct observations from this continuation are:

1. both SHA-256 identity gates passed exactly;
2. the Authority was consumed by the first declaration-shape-correct AST execution;
3. the instrument located the type alias, nested type literals, optional relationship property, and exact six-form string-literal union without failure;
4. it found two regex literals in `parseExplicitRelationship` where it required one;
5. the process exited non-zero before parser/type equality or canonicalisation assertions ran;
6. no correction, rerun, remaining static check, executable validation, implementation edit, test edit, acceptance review, or contribution action followed.

It is inferred from the known parser structure that the failed cardinality assumption counted the punctuation guard and relationship matcher together. That Inference does not convert the assertion into PASS or establish the withheld invariant.

### 22.9 Exact Claim Supported After Continuation

The maximum additional claim supported is:

> Both authorised file identities matched. One type-alias-aware AST instrument mechanically established the actual `StructuralObservation` declaration path and exact six-form private verb union, then exited non-zero because it required one regex literal in `parseExplicitRelationship` and found two. Parser/type equality, the remaining canonicalisation invariant, and all remaining Section 19 static checks remain unestablished.

No stronger validation or implementation claim is supported.

### 22.10 Continuation Non-Consequences

This continuation does not:

1. rewrite or convert either earlier static failure into PASS;
2. convert the new parser-regex-count failure into PASS;
3. establish the complete Section 8 structural invariant;
4. accept or reject the implementation;
5. authorise an instrumentation repair or rerun;
6. edit production or tests;
7. rerun or refresh historical executable Evidence;
8. create relationship semantics or change the parser;
9. inspect or act under contribution Authority;
10. claim programme correctness, capability, Formation completion, production readiness, certification, or contribution readiness.

### 22.11 Continuation Stop State

`DECLARATION-SHAPE-CORRECT STRUCTURAL INSTRUMENT FAILED - AUTHORITY CONSUMED - NO REPAIR OR RERUN - REMAINING STATIC CHECKS WITHHELD - FRESH HUMAN AUTHORITY REQUIRED`

Declaration-shape static continuation stops here.

## 23. Parser-Vocabulary-Selection Static Continuation

**Continuation status:** STRUCTURAL ASSERTION PASSED - SECTION 19 CHECK 1 CHANGED-FILE SCOPE FAILED - AUTHORITY CONSUMED - CHECKS 2-14 WITHHELD - STOPPED WITHOUT REPAIR OR RERUN
**Continuation date:** 2026-08-13
**Continuation Authority:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_CONTRADICTORY_COMPLETE_RELATIONSHIP_PARSER_VOCABULARY_SELECTION_STATIC_CONTINUATION_AUTHORITY_REVIEW.md`

This section is an append-only continuation. It preserves all three earlier static failures and mandatory stops exactly as historical Evidence.

### 23.1 Read-Only Identity Gate

The two required SHA-256 checks ran before source-shape inspection or Authority consumption.

| Artefact | Required SHA-256 | Observed SHA-256 | Result |
| --- | --- | --- | --- |
| `lib/academy/AndyDigitalColleague.ts` | `0cc709a1fc2c601aa7b0014e5e970f16f6dd9591fafe44ffbbb7cbbddcbc685c` | `0cc709a1fc2c601aa7b0014e5e970f16f6dd9591fafe44ffbbb7cbbddcbc685c` | PASS |
| `lib/academy/__tests__/boundedComparativeUnderstanding.test.ts` | `b55f2e7768bc83c401382c66414b1a1596ee92b3831cecc95ff63e8661822c07` | `b55f2e7768bc83c401382c66414b1a1596ee92b3831cecc95ff63e8661822c07` | PASS |

Both files exactly matched the authorised identities. No new baseline was adopted.

### 23.2 Read-Only Source-Shape Sanity Inspection

Before constructing the instrument, bounded source reads directly observed:

1. `StructuralObservation` is a `type` alias with a type-literal body;
2. its optional `explicitRelationship` property contains the exact six-form verb union;
3. `parseExplicitRelationship` contains a punctuation guard regex and a separate anchored relationship matcher;
4. the relationship matcher contains the exact six alternatives;
5. `passiveRelationship` contains the three passive comparisons;
6. `verbFamily` contains explicit supersedes and replaces active/passive branches and an `amends` fallback;
7. actor and target are direct conditionals on `passiveRelationship`;
8. canonical identity is the joined array of `verbFamily`, `actorSourceId`, and `targetSourceId`.

The instrument was constructed from those observed AST shapes. It did not assume a total regex count, select a regex by source position, search for an interface, use whole-file phrase counts, or invent a textual cardinality.

### 23.3 Authority Consumption

The parser-vocabulary-selection continuation Authority was consumed when the complete Section 8 AST assertion first executed after both identity checks passed.

No production or test edit consumed this Authority. No implementation behavior was invoked.

### 23.4 Complete Structural Assertion

One Node.js instrument parsed the production source with the TypeScript compiler API and inspected every regex literal inside `parseExplicitRelationship`.

Direct result:

```text
PASS parser-vocabulary-selection structural assertion
declaration: StructuralObservation TypeAliasDeclaration with TypeLiteralNode
type forms: ["supersedes","is superseded by","replaces","is replaced by","amends","is amended by"]
parser regexes inspected: 2
matching vocabulary candidates: 1
selected parser alternatives: ["supersedes","is superseded by","replaces","is replaced by","amends","is amended by"]
passive forms: ["is superseded by","is replaced by","is amended by"]
endpoints: passive object->actor/subject->target; active subject->actor/object->target
canonical families: ["supersedes","replaces","amends"]
closed fallback domain: ["amends","is amended by"]
canonical identity components: ["verbFamily","actorSourceId","targetSourceId"]
prohibited additional semantic inputs: absent from the bounded canonical identity expressions
```

**Parser-vocabulary-selection structural assertion result:** `PASS`

The assertion mechanically established:

1. the actual type-alias declaration path and exact six-form private union;
2. inspection of both parser-method regex literals;
3. exactly one extracted alternative-set candidate equal to the independently proven union;
4. parser/type vocabulary equality from that candidate;
5. permission for the unrelated punctuation guard;
6. the exact three passive forms;
7. passive-only endpoint inversion and active endpoint preservation;
8. three distinct canonical families;
9. explicit supersedes and replaces active/passive pairs;
10. an exhaustive `amends` fallback whose proven remainder is only `amends` and `is amended by`;
11. identity confinement to family, actor source ID, and target source ID;
12. absence of prohibited additional semantic inputs from the bounded identity expressions.

This fresh structural PASS does not alter any historical failed result.

### 23.5 Section 19 Check 1 - Changed-File Scope

After structural PASS, the first remaining Section 19 check ran once through:

```text
git status --short --untracked-files=all
```

The captured output exceeded the terminal display limit and was preserved by the tool as a read-only output resource. Inspection of that single captured result showed many modified and untracked paths outside the authorised production, focused-test, and correction-Evidence scope.

Examples directly present in the captured output include:

```text
 M docs/PREVIOUSLY_DISCUSSED.md
 M docs/README.md
 M docs/architecture/CAPABILITY-GRADUATION-STANDARD.md
 M docs/architecture/DIGITAL_COLLEAGUE_COGNITIVE_ARCHITECTURE.md
 M docs/organisation/BOARD_AND_STEWARDSHIP.md
?? lib/academy/formation/contextDoor.ts
?? lib/annie/relationship/PersonContextStore.ts
?? platform/cos/understanding-formation/formation.ts
```

Numerous additional unrelated modified and untracked files were also present. No attempt was made to attribute, revert, adopt, filter, or repair those changes.

**Section 19 check 1 result:** `FAIL - CHANGED-FILE SCOPE IS NOT LIMITED TO THE AUTHORISED PRODUCTION/TEST CHANGES AND CORRECTION EVIDENCE`

This is a worktree-scope result, not an implementation or structural-invariant result. The governing failure rule nevertheless requires immediate stop on any post-pass static failure.

### 23.6 Historical Static Failures Preserved

The three earlier results remain historical Evidence exactly as recorded:

```text
FAIL passive canonicalisation limited to three forms
```

```text
Error: expected one StructuralObservation interface, found 0
```

```text
Error: expected one parser regex, found 2
```

None is relabelled, superseded, or converted to PASS by the fresh structural result.

### 23.7 Mandatory Stop and Withheld Checks

Execution stopped immediately after Section 19 check 1 failed. Therefore Section 19 checks 2 through 14 did not run:

1. production-diff confinement was withheld;
2. parser-expression and six-form preservation was withheld;
3. exact title, source-ID, and complete-path identity preservation was withheld;
4. complete participant-set equality preservation was withheld;
5. exact active/passive-pair confinement was withheld;
6. distinct verb-family preservation was withheld;
7. per-disagreement, unresolved Evidence, canonical-question, and agreement-Inference preservation was withheld;
8. the 14-test baseline and original-falsifier preservation check was withheld;
9. additive-neutral-falsifier confinement was withheld;
10. prohibited-method and boundary preservation was withheld;
11. production/test/Evidence diagnostics, trailing-whitespace, and final-newline static check was withheld;
12. programme-neutrality was withheld;
13. mechanical reversal to the Section 17 production/test hashes was withheld.

The scope check was not repaired or rerun. No later static check is inferred as passing.

### 23.8 Historical Executable Evidence

The recorded focused `15/15`, adjacent `58/58`, typecheck PASS, and ESLint zero-error/seven-warning results remain historical Evidence only. They were not rerun or promoted as fresh results.

No build, runtime, Andy, real programme source, real manifest, acceptance, contribution action, or contribution-Authority inspection occurred.

### 23.9 Direct Observations and Inferences

Direct observations from this continuation are:

1. both exact identity gates passed;
2. bounded source inspection identified the actual declaration, parser, and canonicalisation shapes;
3. the one complete AST structural assertion passed;
4. all two parser regexes were inspected and exactly one vocabulary candidate matched the six-form type union;
5. the first remaining Section 19 check observed many changed paths outside the authorised correction scope;
6. execution stopped before checks 2 through 14;
7. no repair, rerun, executable validation, production edit, test edit, acceptance review, or contribution action followed.

It is inferred that the Section 19 failure reflects the current wider dirty worktree rather than a failure of the governed relationship canonicalisation invariant. The status observation alone does not establish when, why, or by whom those unrelated changes were made. That Inference does not convert the scope result into PASS.

### 23.10 Exact Read-Only Human Sanity Check

The exact source-shape observation available to a human is:

```text
StructuralObservation: TypeAliasDeclaration with a TypeLiteralNode
parseExplicitRelationship regex literals inspected: 2
relationship-vocabulary candidates equal to the type union: 1
selected alternatives: supersedes, is superseded by, replaces, is replaced by, amends, is amended by
passive forms: is superseded by, is replaced by, is amended by
canonical families: supersedes, replaces, amends
fallback remainder: amends, is amended by
identity components: verbFamily, actorSourceId, targetSourceId
```

The exact worktree-scope sanity command is:

```text
git status --short --untracked-files=all
```

Its current captured result is not limited to the correction files.

### 23.11 Exact Claim Supported After Continuation

The maximum additional claim supported is:

> Both authorised identities matched, and one source-shape-grounded AST assertion passed the complete parser/type and canonicalisation invariant. The first remaining Section 19 check then failed because the current worktree contains many modified and untracked paths outside the authorised correction scope. Checks 2 through 14 remain withheld, so completed post-pass static validation and acceptance are not established.

No stronger validation or implementation claim is supported.

### 23.12 Continuation Non-Consequences

This continuation does not:

1. rewrite or convert any historical failure into PASS;
2. convert the changed-file-scope failure into PASS;
3. establish checks 2 through 14;
4. accept or reject the implementation;
5. authorise scope repair, cleanup, filtering, baseline adoption, or rerun;
6. edit production or tests;
7. rerun or refresh historical executable Evidence;
8. inspect real programme sources, the real manifest, or contribution Authority;
9. begin acceptance or contribution work;
10. claim programme correctness, capability, Formation completion, production readiness, certification, or contribution readiness.

### 23.13 Continuation Stop State

`STRUCTURAL ASSERTION PASSED - SECTION 19 CHECK 1 CHANGED-FILE SCOPE FAILED - AUTHORITY CONSUMED - NO REPAIR OR RERUN - CHECKS 2-14 WITHHELD - FRESH HUMAN AUTHORITY REQUIRED`

Parser-vocabulary-selection static continuation stops here.

## 24. Baseline-Relative Changed-File-Scope Static Continuation

**Continuation status:** BASELINE-RELATIVE SCOPE PASSED - SECTION 19 CHECKS 2-9 PASSED - CHECK 10 INSTRUMENT-OFFSET FAILURE - AUTHORITY CONSUMED - CHECKS 11-14 WITHHELD - STOPPED WITHOUT REPAIR OR RERUN
**Continuation date:** 2026-08-13
**Continuation Authority:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_CONTRADICTORY_COMPLETE_RELATIONSHIP_BASELINE_RELATIVE_CHANGED_FILE_SCOPE_STATIC_CONTINUATION_AUTHORITY_REVIEW.md`

This section is append-only. It preserves the global-status scope FAIL, all earlier static failures, the parser-vocabulary structural PASS, and every historical executable result unchanged.

### 24.1 Exact Identity Gate

The two required post-edit identities were checked before Authority consumption.

| Artefact | Required SHA-256 | Observed SHA-256 | Result |
| --- | --- | --- | --- |
| `lib/academy/AndyDigitalColleague.ts` | `0cc709a1fc2c601aa7b0014e5e970f16f6dd9591fafe44ffbbb7cbbddcbc685c` | `0cc709a1fc2c601aa7b0014e5e970f16f6dd9591fafe44ffbbb7cbbddcbc685c` | PASS |
| `lib/academy/__tests__/boundedComparativeUnderstanding.test.ts` | `b55f2e7768bc83c401382c66414b1a1596ee92b3831cecc95ff63e8661822c07` | `b55f2e7768bc83c401382c66414b1a1596ee92b3831cecc95ff63e8661822c07` | PASS |

Neither identity was adopted or changed.

### 24.2 Targeted Source-Shape Inspection

Before constructing the scope proof, read-only inspection bounded the attributable units as:

1. one `getCompleteRelationshipIdentityForDisagreement` helper;
2. one immediately local `completeRelationshipIdentities` decision gate;
3. one contiguous focused test beginning with `requires all complete authored relationships to share one exact structural identity` and ending immediately before the existing multi-disagreement test;
4. the named correction Evidence continuation.

No global Git status, repository `HEAD`, unrelated file, whole-file phrase count, or clean-worktree assumption defined the proof.

### 24.3 Authority Consumption

Authority was consumed when the complete baseline-relative scope proof first executed after the identity gate and targeted inspection passed.

No production or test edit consumed this Authority.

### 24.4 Baseline-Relative Scope Proof

One Node.js instrument reversed only the recorded helper, local gate, and additive test in memory. It compared each reconstructed full-file identity with the exact Section 17 pre-edit hash.

Direct result:

```text
PASS baseline-relative changed-file-scope proof
production current identity: 0cc709a1fc2c601aa7b0014e5e970f16f6dd9591fafe44ffbbb7cbbddcbc685c
production reconstructed identity: 9df7d5ebdaae3399c07b01a2cb31fe8b8ead792dced4f36d85de7cd044b91c8e
production attributable units: one complete-relationship helper and one immediately local decision gate
production attributable unit bytes: current=2790, baseline=1871
focused-test current identity: b55f2e7768bc83c401382c66414b1a1596ee92b3831cecc95ff63e8661822c07
focused-test reconstructed identity: c5b8282361df4fa4b8f4d0c63caa95ef4c6878300cf4278addbad7affa484727
focused-test attributable unit: one contiguous additive neutral test (5582 bytes)
focused-test inventory: current=15, reconstructed=14
Evidence attribution: authorised correction Evidence exists and preserves all historical failures plus structural PASS
Attribution conclusion: this correction changed no code or test bytes outside its authorised helper/gate and additive-test boundaries; documentation attribution remains the named append-only correction Evidence
Repository cleanliness conclusion: not measured and not claimed
```

**Baseline-relative changed-file-scope result:** `PASS`

The historical global-status scope result remains FAIL. The fresh PASS measures correction attribution against exact baselines; it does not reinterpret the earlier instrument or claim repository cleanliness.

### 24.5 Terminal Sanity-Check Rule

Before each later check, the execution identified:

1. the governed quantity;
2. the exact baseline or bounded source unit defining it;
3. the read-only instrument that directly measured that quantity.

No later check used repository-wide cleanliness, source position alone, whole-file phrase frequency, or another convenient proxy as its stated measurement.

### 24.6 Section 19 Checks 2-9

One fail-fast read-only script began the remaining checks in controlling order.

| Check | Governed quantity and direct baseline | Result |
| --- | --- | --- |
| 2 | Production attributable delta against exact reconstructed Section 17 bytes | PASS |
| 3 | `parseExplicitRelationship` method bytes in current and reconstructed production, plus exact six-form parser vocabulary | PASS |
| 4 | Exact title, source-ID, and source-path identity-matching statements in current and reconstructed helper units | PASS |
| 5 | Exact complete participant-set size and membership predicates in current and reconstructed helper units | PASS |
| 6 | Passive comparison set extracted from the bounded helper against the three governed passive forms | PASS |
| 7 | Canonical outputs extracted from the bounded `verbFamily` expression against the three distinct families | PASS |
| 8 | Exact `formComparativeUnderstanding` method equality after substituting only the authorised local gate | PASS |
| 9 | Full reconstructed focused-test hash and 14-test baseline inventory | PASS |

Direct output was:

```text
PASS Section 19 check 2 production diff confined to canonical identity helper and local consistency gate
PASS Section 19 check 3 parser expressions and six recognised forms unchanged
PASS Section 19 check 4 exact title, source-ID, and complete-path identity matching unchanged
PASS Section 19 check 5 complete participant-set equality remains mandatory
PASS Section 19 check 6 active/passive canonicalisation confined to three approved pairs
PASS Section 19 check 7 verb families remain distinct
PASS Section 19 check 8 per-disagreement and consequence formation unchanged beyond the authorised gate
PASS Section 19 check 9 all 14 baseline tests and original falsifiers remain unchanged and present
```

### 24.7 Section 19 Check 10 Failure

The governed quantity for check 10 was whether one unique contiguous additive test contains only programme-neutral contradictory-complete-relationship falsifiers.

The bounded unit was the test block already located from its title to the next existing test declaration. The instrument then attempted an additional uniqueness assertion:

```js
test.indexOf(
  "requires all complete authored relationships to share one exact structural identity",
  testStart + 1,
) === -1
```

The observed result was:

```text
Error: check 10 additive test is not unique
```

The process exited non-zero with status `1` before completing check 10 and before check 11 began.

**Section 19 check 10 result:** `FAIL - STATIC INSTRUMENT SEARCH OFFSET REDISCOVERED THE SAME TEST TITLE`

### 24.8 Exact Source-Shape Observation

The test title begins after the opening `  it("` characters at `testStart`. Searching from `testStart + 1` begins inside that same test declaration and before the title text. The search therefore finds the title occurrence belonging to the already bounded test.

The failed assertion did not demonstrate a second test declaration or second additive block. It failed because the uniqueness search did not begin after the first matched title or after the bounded test block.

This is an apparent static-instrument source-shape failure. Under the current Authority it remains a real failed check and cannot be repaired, rerun, or converted to PASS.

The human read-only sanity observation is:

```text
testStart points to the beginning of:   it("requires all complete authored relationships...
testStart + 1 is still before the title text
indexOf(title, testStart + 1) therefore rediscovers the same title occurrence
```

### 24.9 Historical Results Preserved

The following historical results remain unchanged:

```text
FAIL passive canonicalisation limited to three forms
```

```text
Error: expected one StructuralObservation interface, found 0
```

```text
Error: expected one parser regex, found 2
```

```text
PASS parser-vocabulary-selection structural assertion
```

```text
FAIL - CHANGED-FILE SCOPE IS NOT LIMITED TO THE AUTHORISED PRODUCTION/TEST CHANGES AND CORRECTION EVIDENCE
```

The fresh baseline-relative scope PASS and checks 2-9 PASS are recorded separately. No result rewrites another result.

### 24.10 Mandatory Stop and Withheld Checks

Execution stopped immediately after check 10 failed. Therefore:

1. check 10 was not repaired or rerun;
2. check 11, prohibited-method and boundary preservation, was withheld;
3. check 12, diagnostics, trailing whitespace, and final-newline validation for production, test, and Evidence, was withheld;
4. check 13, programme-neutrality validation, was withheld;
5. check 14, mechanical reversal to the exact Section 17 hashes, was withheld as a separately numbered Section 19 result;
6. no executable validation or structural assertion reran;
7. no production or test edit occurred;
8. no acceptance or contribution work began.

No withheld check is inferred as passing. The successful reversal inside the baseline-relative scope proof remains direct scope Evidence but does not silently convert withheld Section 19 check 14 into an executed result.

### 24.11 Historical Executable Evidence

The focused `15/15`, adjacent `58/58`, typecheck PASS, and ESLint zero-error/seven-warning results remain historical Evidence only. They were not rerun or promoted as fresh results.

No build, runtime, Andy, real programme source, real manifest, or contribution Authority was inspected or executed.

### 24.12 Direct Observations and Inferences

Direct observations are:

1. both identity gates passed;
2. the baseline-relative scope proof passed;
3. correction-attributable code/test bytes are confined to the exact helper/gate and additive-test units;
4. repository cleanliness was not measured or claimed;
5. Section 19 checks 2-9 passed;
6. check 10 exited non-zero because its uniqueness search began inside the same test declaration;
7. checks 11-14 did not run;
8. no repair, rerun, code edit, executable validation, acceptance, or contribution action followed.

It is inferred that the check 10 failure concerns the search offset rather than duplicate additive test content. That Inference does not convert check 10 into PASS or establish checks 11-14.

### 24.13 Exact Claim Supported

The maximum additional claim supported is:

> Exact baseline-relative reversal proves that this correction changed no code or focused-test bytes outside its authorised helper/gate and one additive-test boundaries. Section 19 checks 2-9 also passed. Check 10 then failed because its uniqueness search restarted inside the same test declaration and rediscovered that title. Checks 11-14 remain withheld; completed post-pass static validation and acceptance are not established.

No repository-cleanliness, implementation-acceptance, or broader capability claim is supported.

### 24.14 Non-Consequences

This continuation does not:

1. reinterpret the global-status scope FAIL or any earlier FAIL as PASS;
2. convert check 10 into PASS;
3. establish checks 11-14;
4. claim repository cleanliness or adopt unrelated worktree state;
5. clean, revert, stage, commit, reset, stash, checkout, or mutate unrelated files;
6. edit production or tests;
7. rerun executable validation or the structural assertion;
8. accept the implementation;
9. inspect or act under contribution Authority;
10. claim programme correctness, capability, Formation completion, production readiness, certification, or contribution readiness.

### 24.15 Stop State

`BASELINE-RELATIVE SCOPE PASSED - SECTION 19 CHECKS 2-9 PASSED - CHECK 10 INSTRUMENT-OFFSET FAILURE - AUTHORITY CONSUMED - NO REPAIR OR RERUN - CHECKS 11-14 WITHHELD - FRESH HUMAN AUTHORITY REQUIRED`

Baseline-relative changed-file-scope continuation stops here.

## 25. Check 10 Declaration-Measurement Static Continuation

**Continuation status:** CORRECTED CHECK 10 PASSED - SECTION 19 CHECKS 11-14 PASSED - POST-PASS STATIC VALIDATION COMPLETED - AUTHORITY CONSUMED - FRESH INDEPENDENT ACCEPTANCE STILL REQUIRED
**Continuation date:** 2026-08-13
**Continuation Authority:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_CONTRADICTORY_COMPLETE_RELATIONSHIP_CHECK_10_DECLARATION_MEASUREMENT_STATIC_CONTINUATION_AUTHORITY_REVIEW.md`

This section is append-only. It preserves every historical FAIL, PASS, stop, and withheld-stage record above. Fresh corrected measurements are recorded separately and do not rewrite prior results.

### 25.1 Exact Identity Gate

The two required identities were checked before Authority consumption.

| Artefact | Required SHA-256 | Observed SHA-256 | Result |
| --- | --- | --- | --- |
| `lib/academy/AndyDigitalColleague.ts` | `0cc709a1fc2c601aa7b0014e5e970f16f6dd9591fafe44ffbbb7cbbddcbc685c` | `0cc709a1fc2c601aa7b0014e5e970f16f6dd9591fafe44ffbbb7cbbddcbc685c` | PASS |
| `lib/academy/__tests__/boundedComparativeUnderstanding.test.ts` | `b55f2e7768bc83c401382c66414b1a1596ee92b3831cecc95ff63e8661822c07` | `b55f2e7768bc83c401382c66414b1a1596ee92b3831cecc95ff63e8661822c07` | PASS |

No baseline was adopted or changed.

### 25.2 Source-Shape Inspection

Read-only inspection before corrected Check 10 observed one focused-test declaration beginning:

```ts
it("requires all complete authored relationships to share one exact structural identity", () => {
```

The declaration ends before the existing multi-disagreement test. This inspection bound the AST instrument to actual `it(...)` declarations rather than raw title offsets.

### 25.3 Authority Consumption

Authority was consumed when the complete corrected Check 10 declaration instrument first executed after the identity gate passed.

No production or test edit consumed this Authority.

### 25.4 Corrected Section 19 Check 10

Before execution, the required measurement fields were stated:

| Field | Direct statement |
| --- | --- |
| Governed quantity | One unique additive, programme-neutral contradictory-complete-relationship test declaration |
| Unit | The exact-title `it(...)` AST statement and its bounded declaration body |
| Baseline | 15 current declarations, 14 reconstructed declarations, reconstructed hash `c5b8282361df4fa4b8f4d0c63caa95ef4c6878300cf4278addbad7affa484727`, and Section 16 neutral falsifier classes |
| Direct instrument | TypeScript AST declaration counting, AST-bound declaration removal in memory, full-file hashing, and bounded literal/call/property inspection |

The instrument directly measured declarations and bounded declaration content. It did not use `testStart + 1`, raw title-substring counts, source position alone, or whole-file phrase counts.

Direct result:

```text
PASS corrected Section 19 check 10 declaration measurement
current it declarations: 15
exact-title it declarations: 1
bounded additive block bytes: 5582
reconstructed it declarations: 14
reconstructed focused-test identity: c5b8282361df4fa4b8f4d0c63caa95ef4c6878300cf4278addbad7affa484727
neutral falsifier classes: single, duplicate, three active/passive pairs, opposition, cross-family, unrelated, subset, union, forbidden-input/reversed-order, independent disagreement, attributable Evidence
programme-specific literals: absent from bounded additive declaration
```

**Corrected Section 19 Check 10 result:** `PASS`

The historical Check 10 offset FAIL remains unchanged and visible in Section 24.

### 25.5 Section 19 Check 11

Before execution:

| Field | Direct statement |
| --- | --- |
| Governed quantity | Prohibited methods and boundaries remain unchanged |
| Unit | Exact AST text of `prioritizeDocumentsForUnderstanding`, `retrieveFromRepository`, `buildDeliberationRecord`, and `buildReflectionRecord` |
| Baseline | The same method bytes in the exact reconstructed Section 17 production content |
| Direct instrument | In-memory reversal of only the authorised helper/gate, exact reconstructed production hash confirmation, then byte-for-byte AST method comparison |

The instrument measured the protected method units directly rather than line numbers, Git status, or repository `HEAD`.

Direct result:

```text
PASS protected method byte equality: prioritizeDocumentsForUnderstanding
PASS protected method byte equality: retrieveFromRepository
PASS protected method byte equality: buildDeliberationRecord
PASS protected method byte equality: buildReflectionRecord
PASS Section 19 check 11 prohibited methods and boundaries unchanged
```

**Section 19 Check 11 result:** `PASS`

### 25.6 Section 19 Check 12

Before execution:

| Field | Direct statement |
| --- | --- |
| Governed quantity | Production, focused test, and correction Evidence have no relevant editor diagnostics or trailing whitespace and retain final newlines |
| Unit | Each named file's editor diagnostic set, trailing-horizontal-whitespace lines, and final byte |
| Baseline | Zero relevant diagnostics, zero trailing-whitespace lines, and terminal byte `0a` for each file |
| Direct instrument | Editor diagnostics plus direct line-pattern and final-byte inspection of exactly the three named files |

The instruments measured diagnostics and bytes directly.

Direct result:

```text
PASS production editor diagnostics
PASS focused-test editor diagnostics
PASS correction-Evidence editor diagnostics
PASS production no trailing whitespace and final newline
PASS focused test no trailing whitespace and final newline
PASS correction Evidence no trailing whitespace and final newline
```

**Section 19 Check 12 result:** `PASS`

### 25.7 Section 19 Check 13

Before execution:

| Field | Direct statement |
| --- | --- |
| Governed quantity | Programme neutrality of this correction |
| Unit | Only the correction-attributable production helper/gate and additive test declaration |
| Baseline | Section 15/16 prohibition on programme-specific material and on rank, score, date, order, contribution, or Authority entering canonical identity; neutral synthetic falsifier boundary |
| Direct instrument | Bounded AST identifiers/literals, canonical identity components, gate dependencies, synthetic source paths, and neutral outcome assertions |

The instrument did not scan unrelated repository material or infer neutrality from filenames alone.

Direct result:

```text
PASS Section 19 check 13 programme neutrality preserved
canonical identity components: ["verbFamily","actorSourceId","targetSourceId"]
prohibited semantic inputs in helper/gate: absent
programme-specific additive literals: 0
explicit additive source paths: ["synthetic/first-position.md","synthetic/second-position.md","synthetic/third-position.md"]
rank, score, source-path, and reverse-order values remain bounded synthetic falsifier inputs, not canonical identity inputs
```

**Section 19 Check 13 result:** `PASS`

### 25.8 Section 19 Check 14

Before execution:

| Field | Direct statement |
| --- | --- |
| Governed quantity | Mechanical reversal reconstructs the exact Section 17 identities |
| Unit | The recorded production helper/gate and unique additive test declaration |
| Baseline | Production `9df7d5ebdaae3399c07b01a2cb31fe8b8ead792dced4f36d85de7cd044b91c8e`; focused test `c5b8282361df4fa4b8f4d0c63caa95ef4c6878300cf4278addbad7affa484727` |
| Direct instrument | Reverse only those units in memory and hash each resulting full file |

The instrument measured exact reconstruction directly rather than Git diff or repository state.

Direct result:

```text
PASS Section 19 check 14 production reversal: 9df7d5ebdaae3399c07b01a2cb31fe8b8ead792dced4f36d85de7cd044b91c8e
PASS Section 19 check 14 focused-test reversal: c5b8282361df4fa4b8f4d0c63caa95ef4c6878300cf4278addbad7affa484727
PASS Section 19 check 14 mechanical reversal reconstructs exact Section 17 identities
```

**Section 19 Check 14 result:** `PASS`

### 25.9 Historical Results Preserved

The following historical failures remain unchanged:

```text
FAIL passive canonicalisation limited to three forms
```

```text
Error: expected one StructuralObservation interface, found 0
```

```text
Error: expected one parser regex, found 2
```

```text
FAIL - CHANGED-FILE SCOPE IS NOT LIMITED TO THE AUTHORISED PRODUCTION/TEST CHANGES AND CORRECTION EVIDENCE
```

```text
FAIL - STATIC INSTRUMENT SEARCH OFFSET REDISCOVERED THE SAME TEST TITLE
```

The fresh corrected PASS results do not relabel or erase any of those execution records.

The parser-vocabulary structural PASS, baseline-relative scope PASS, and Section 19 checks 2-9 PASS also remain historical Evidence and were not rerun.

### 25.10 Historical Executable Evidence

The focused `15/15`, adjacent `58/58`, typecheck PASS, and ESLint zero-error/seven-warning results remain historical Evidence only. They were not rerun or presented as freshly obtained.

No build, runtime, Andy, real programme source, real manifest, acceptance review, contribution action, or contribution-Authority inspection occurred.

### 25.11 Direct Observations and Inferences

Direct observations are:

1. both current identities matched;
2. corrected Check 10 found exactly one exact-title `it(...)` declaration and reconstructed the exact focused-test baseline;
3. corrected Check 10's bounded neutrality measurement passed;
4. Check 11 protected method/boundary byte equality passed;
5. Check 12 diagnostics, trailing-whitespace, and final-newline measurements passed;
6. Check 13 programme-neutrality measurement passed;
7. Check 14 exact mechanical reversal passed;
8. no production/test edit or executable validation occurred;
9. no acceptance or contribution work began.

It is concluded that all fourteen Section 19 static properties now have direct PASS Evidence across the preserved execution and authorised continuations. This conclusion does not convert any historical failed instrument into PASS and does not accept the implementation.

### 25.12 Exact Claim Supported

The maximum additional claim supported is:

> One declaration-level corrected Check 10 directly established a unique additive programme-neutral test and exact focused-test reconstruction. Checks 11-14 then passed under explicit governed-quantity, unit, baseline, and direct-instrument gates. Together with the preserved structural, baseline-relative scope, and checks 2-9 PASS Evidence, the required post-pass static properties have completed PASS Evidence. Fresh independent acceptance remains required.

No implementation acceptance, programme correctness, repository cleanliness, broader capability, production-readiness, certification, or contribution-readiness claim is supported.

### 25.13 Non-Consequences

This continuation does not:

1. rewrite or convert any historical FAIL into PASS;
2. rerun or refresh historical executable or structural results;
3. edit production or tests;
4. clean, stage, commit, reset, stash, checkout, or alter unrelated worktree state;
5. establish repository cleanliness;
6. accept the implementation;
7. inspect real programme sources, the real manifest, or contribution Authority;
8. begin contribution work;
9. claim programme correctness, capability, Formation completion, production readiness, certification, or contribution readiness.

### 25.14 Stop State

`CORRECTED CHECK 10 PASSED - SECTION 19 CHECKS 11-14 PASSED - POST-PASS STATIC PROPERTIES COMPLETED - AUTHORITY CONSUMED - FRESH INDEPENDENT ACCEPTANCE REQUIRED`

Check 10 declaration-measurement static continuation stops here.
