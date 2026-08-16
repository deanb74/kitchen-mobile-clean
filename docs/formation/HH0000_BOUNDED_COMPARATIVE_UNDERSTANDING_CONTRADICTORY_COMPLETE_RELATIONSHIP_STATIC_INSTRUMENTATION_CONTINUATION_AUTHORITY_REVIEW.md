# HH-0000 Bounded Comparative Understanding Contradictory Complete Relationship Static Instrumentation Continuation Authority Review

**Status:** OUTCOME 1 - ONE STATIC-INSTRUMENTATION-ONLY CONTINUATION AUTHORISED
**Review date:** 2026-08-13
**Review type:** Fresh documentation-only static-instrumentation correction-Authority review
**Implementation effect:** None
**Test effect:** None
**Validation effect:** One corrected read-only structural assertion and continuation of the interrupted post-pass static/Evidence validation are authorised but unconsumed
**Acceptance effect:** None - the corrected implementation remains unaccepted
**Contribution effect:** None - contribution Authority is not inspected, reconsidered, modified, consumed, revived, or executed

## 1. Purpose

This review determines whether the post-pass static failure recorded in the contradictory-complete-relationship correction Evidence is isolated to the read-only static instrument.

Yes.

The failed assertion required six textual comparisons against passive relationship forms. Current source contains five such comparisons because:

1. `passiveRelationship` explicitly checks all three governed passive forms;
2. the verb-family expression then checks `is superseded by` and `is replaced by` again;
3. after those two families are excluded, `amends` is the only remaining family admitted by the closed exact six-form parser and private type;
4. `is amended by` therefore needs no second textual comparison in the family expression.

The expected count of six was an instrumentation assumption. It was not a governed requirement and does not identify a missing passive form or implementation defect.

## 2. Traceability

| Layer | Trace |
| --- | --- |
| Principle | Truth before certainty; Evidence before claims; historical failures remain visible |
| Theory | Not Applicable - this review changes no relationship meaning or Understanding responsibility |
| Architecture | Not Applicable - no architecture or implementation surface changes |
| Engineering | Read-only structural validation of the closed six-form canonicalisation invariant |
| Milestone | HH-0000 contradictory-complete-relationship correction static-validation continuation |
| Evidence | Controlling correction Authority, failed correction Evidence, human-supplied Terminal observations, current private type/parser/canonicalisation source, and this review |

## 3. Exact Review Boundary

This review inspected only:

1. `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_CONTRADICTORY_COMPLETE_RELATIONSHIP_CORRECTION_AUTHORITY_REVIEW.md`;
2. `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_CONTRADICTORY_COMPLETE_RELATIONSHIP_CORRECTION_EVIDENCE.md`;
3. the current private `StructuralObservation.explicitRelationship` verb type;
4. the current private `parseExplicitRelationship` expression;
5. the current private canonicalisation block in `getCompleteRelationshipIdentityForDisagreement`;
6. the supplied read-only Terminal observations concerning phrase counts and exact source locations.

No production or test file was edited. No test file was inspected. No Jest, adjacent suite, typecheck, ESLint, build, runtime, hash, or implementation-validation command ran. Andy was not invoked. No real programme source or manifest was inspected. Contribution Authority was not inspected or altered.

## 4. Historical Failure Preserved

The original static result remains historical Evidence:

```text
FAIL passive canonicalisation limited to three forms
```

The controlling Evidence correctly stopped without repair or rerun. It records that the failed instrument counted textual comparisons matching the three passive phrases and required six occurrences.

This review does not relabel, delete, weaken, or rewrite that result as PASS. It grants fresh Authority for a later corrected instrument that tests the governed structural property directly.

## 5. Human-Supplied Terminal Evidence

The supplied read-only Terminal observations report whole-file phrase counts:

```text
"is superseded by" = 3
"is replaced by"   = 3
"is amended by"    = 2
```

They identify one occurrence of each phrase in the private type declaration, then five canonicalisation comparisons:

```text
passive predicate: is superseded by
passive predicate: is replaced by
passive predicate: is amended by
family selection:  is superseded by
family selection:  is replaced by
```

Those observations support the hypothesis that the failed expected count described an accidental source spelling rather than the authorised invariant. This review did not accept them without corroboration; Section 6 records fresh direct source inspection.

## 6. Independent Source Corroboration

### 6.1 Closed Governed Vocabulary

The current private relationship verb type admits exactly:

```text
supersedes
is superseded by
replaces
is replaced by
amends
is amended by
```

The current parser expression recognises exactly the same six forms. No seventh form, synonym, fuzzy match, alias, or semantic relationship phrase appears in either boundary.

### 6.2 Exact Passive Predicate

The current canonicalisation block defines:

```ts
const passiveRelationship = explicitRelationship.verb === "is superseded by" ||
  explicitRelationship.verb === "is replaced by" ||
  explicitRelationship.verb === "is amended by";
```

The predicate explicitly recognises exactly the three approved passive forms and no active or additional form.

### 6.3 Actor and Target Inversion

The current source derives both canonical endpoints solely from that predicate:

```ts
const actorSourceId = passiveRelationship ? objectSourceIds[0] : subjectSourceIds[0];
const targetSourceId = passiveRelationship ? subjectSourceIds[0] : objectSourceIds[0];
```

Every governed passive form therefore reverses actor and target. Every governed active form retains subject as actor and object as target.

### 6.4 Distinct Verb Families

The current family expression produces:

```text
supersedes
replaces
amends
```

It explicitly groups only:

1. `supersedes` with `is superseded by`;
2. `replaces` with `is replaced by`;
3. all remaining values with `amends`.

The final fallback is exhaustive only because the exact private type and parser boundaries are closed to six forms. After the supersedes and replaces pairs are excluded, the only possible values are `amends` and `is amended by`.

No cross-family equivalence is introduced. Supersedes, replaces, and amends remain distinct canonical outputs.

### 6.5 Prohibited Semantics Absent

The inspected block uses only:

1. the exact parsed verb;
2. exact resolved subject and object source IDs;
3. the passive predicate;
4. the three exact canonical family labels.

It contains no synonym, fuzzy, graph, chain, transitive, majority, source-count, date, rank, score, order, currentness, Authority, or organisational-truth rule.

## 7. Failure Classification

The original instrument conflated two different properties:

```text
accidental property:
number of passive phrase comparisons in one source expression

controlled property:
closed vocabulary + exact passive membership + endpoint inversion + exact family output
```

Six textual comparisons are not required by the controlling Authority. A valid implementation may spell the exhaustive family decision with five comparisons, a switch, a closed map, or another local expression while preserving the same governed invariant.

The current implementation has five canonicalisation comparisons because the amends family is the exhaustive remainder of the closed six-form input domain. Requiring a repeated `is amended by` comparison would add textual symmetry but no structural discrimination.

**Failure classification:** `ISOLATED READ-ONLY STATIC-INSTRUMENTATION COUNT DEFECT`.

No inspected Evidence indicates a missing passive form, incorrect endpoint inversion, collapsed verb family, parser widening, or semantic implementation defect.

## 8. Corrected Structural Assertion Required

The corrected read-only assertion must prove the structural invariant rather than replace expected literal `6` with `5`.

It must establish all of:

1. the private verb type contains exactly the six approved forms and no other form;
2. the parser recognises exactly the same six forms in the same closed vocabulary;
3. `passiveRelationship` contains exactly the three approved passive forms and no active or additional form;
4. canonical actor selection uses object for passive and subject for active;
5. canonical target selection uses subject for passive and object for active;
6. verb-family canonicalisation can produce only `supersedes`, `replaces`, or `amends`;
7. supersedes and replaces pairs are explicitly discriminated;
8. the amends fallback is accepted only after the type/parser closed-domain checks prove that no other input family can reach it;
9. no additional passive form or cross-family equivalence exists;
10. no synonym, fuzzy, graph, transitive, ranking, date, score, order, source-count, currentness, or Authority input enters the canonicalisation block.

A checker may extract and compare exact closed sets or exact bounded source blocks. It must fail if the type vocabulary, parser vocabulary, passive set, endpoint expressions, canonical output set, or closed fallback assumption differs.

A raw whole-file phrase-count expectation is insufficient.

## 9. Continuation Authority Granted

One fresh static-instrumentation-only continuation Authority is granted.

It permits only:

1. read-only confirmation that current production and focused-test SHA-256 values still equal the post-edit hashes recorded in the failed Evidence:
   - production: `0cc709a1fc2c601aa7b0014e5e970f16f6dd9591fafe44ffbbb7cbbddcbc685c`;
   - focused test: `b55f2e7768bc83c401382c66414b1a1596ee92b3831cecc95ff63e8661822c07`;
2. replacement of the failed read-only static assertion with the structural assertion in Section 8;
3. one execution of that corrected read-only assertion;
4. only after corrected assertion PASS, continuation of Section 19 static checks that were withheld or not conclusively completed after the original failure;
5. append-only continuation of the existing correction Evidence to record:
   - this Authority and its consumption point;
   - the original FAIL unchanged;
   - the exact reason the original instrument was defective;
   - the corrected structural assertion and result;
   - every subsequently authorised static result and any withheld stages;
   - the distinction between historical executable validation and fresh static-instrument validation;
   - direct observations, Inferences, limitations, and exact non-consequences;
   - the continuing requirement for fresh independent acceptance;
6. document-only diagnostics, trailing-whitespace, final-newline, required-section, and required-reference checks on the completed Evidence document.

The correction Evidence may update only its current continuation/status wording where necessary to distinguish the later static continuation from the preserved original failure. The historical failure and mandatory stop text must remain visible and unchanged.

## 10. Authority Consumption

This continuation Authority is unconsumed at creation.

It is consumed when the corrected structural static assertion is first executed after the exact post-edit identity gate passes.

Read-only identity confirmation does not consume Authority. Appending Evidence occurs only after the corrected assertion and authorised continuation checks have produced results.

No repair cycle is granted.

## 11. Exact Continuation Sequence

A future continuation must proceed exactly:

1. confirm the current production and focused-test hashes against Section 9;
2. stop without adoption of a new baseline if either hash differs;
3. execute the corrected structural assertion once;
4. stop without correction or rerun if it fails;
5. only after PASS, execute once each remaining authorised Section 19 static check not already conclusively established before the original failure, including:
   - current changed-file scope limited to the authorised production/test changes and Evidence continuation;
   - exact production/test diff confinement;
   - unchanged parser and six-form vocabulary;
   - unchanged exact title, source-ID, and complete-path matching;
   - retained complete participant-set equality;
   - exact active/passive confinement and distinct verb families;
   - unchanged per-disagreement, unresolved Evidence, canonical question aggregation, and agreement-Inference formation;
   - preserved 14-test baseline plus only the additive neutral test;
   - protected methods and boundaries;
   - production/test/Evidence diagnostics, trailing whitespace, and final newlines;
   - programme neutrality;
   - mechanical reversal to the exact pre-edit Authority hashes;
6. stop without repair or rerun on any non-zero or failed static result;
7. append the Evidence continuation with all observed results and withheld stages;
8. perform the authorised document-only checks once against the completed Evidence document;
9. stop.

The already recorded focused `15/15`, adjacent `58/58`, typecheck PASS, and ESLint zero-error/seven-warning results remain historical Evidence. They must not be rerun or described as newly obtained results.

## 12. Failure and Stop Rule

The continuation must stop without repair or rerun if:

1. either current post-edit hash differs from Section 9;
2. the corrected assertion cannot prove every Section 8 property mechanically;
3. any corrected or remaining static check fails;
4. production or test editing would be required;
5. parser or semantic change would be required;
6. another implementation, test, provider, repository, public-contract, renderer, Theory, or architecture surface would be required;
7. any historical Evidence would need deletion or reinterpretation;
8. any file other than the existing correction Evidence would require modification.

A continuation failure remains Evidence. Fresh human Authority is required for any later action.

## 13. MARC Finding

The original stop was correct because a failed governed check cannot be silently repaired. Fresh inspection now distinguishes the check from the behavior it attempted to measure.

Preserving the original FAIL while authorising a structurally discriminating continuation is the truthful course. It neither erases the failure nor burdens implementation with a redundant comparison added only to satisfy an accidental count.

**MARC finding:** `PRESERVE THE FAILED CHECK AS HISTORY; TEST THE GOVERNED STRUCTURE DIRECTLY BEFORE MAKING ANY NEW STATIC CLAIM`.

## 14. Cyril Finding

The current closed type, parser, passive predicate, endpoint expressions, and family expression expose enough exact source structure for a deterministic read-only assertion.

The checker can prove set equality and bounded control-flow properties without compiling, executing application behavior, editing code, or relying on phrase frequency. No implementation repair or executable validation rerun is technically required.

**Cyril finding:** `THE FAILURE IS LOCAL TO TEXTUAL-COUNT INSTRUMENTATION; A CLOSED-SET STRUCTURAL ASSERTION CAN CONTINUE STATIC VALIDATION READ-ONLY`.

## 15. Combined Outcome

**OUTCOME 1 - ONE STATIC-INSTRUMENTATION-ONLY CONTINUATION AUTHORISED**

Outcome 1 is selected because the failure is mechanically isolated to an unjustified count expectation. Current source independently proves that all three passive forms control inversion and that the three families remain distinct under an exact closed six-form domain.

A broader implementation correction is not authorised because no implementation defect is established by the failed assertion.

A semantic dependency is not required because the corrected check concerns exact syntax and closed private types only.

Acceptance is not granted because successful static continuation, if later earned, remains Evidence requiring fresh independent acceptance.

## 16. Strict Non-Consequences

This review does not authorise or perform:

1. any production edit;
2. any test edit;
3. Jest or adjacent-suite rerun;
4. typecheck or ESLint rerun;
5. implementation repair, refactor, formatting, or parser change;
6. semantic change or a new relationship form;
7. synonym, fuzzy, graph, chain, transitive, majority, ranking, date, score, order, source-count, currentness, or Authority semantics;
8. Andy invocation;
9. real programme source or manifest inspection;
10. contribution work or contribution-Authority inspection or reconsideration;
11. implementation acceptance;
12. reinterpretation of historical executable PASS results as newly obtained;
13. reinterpretation of the original static FAIL as though it never happened;
14. capability, programme-correctness, Formation-completion, production-readiness, certification, or contribution-readiness claims.

## 17. Exact Next Authorised Action

The next authorised action is:

> Read-only SHA-256 confirmation of the current production and focused-test files against the recorded post-edit hashes, followed only on exact match by one execution of a corrected closed-set structural canonicalisation assertion satisfying Section 8.

No implementation or test edit precedes or follows that action under this Authority.

## 18. Stop State

`DOCUMENTATION-ONLY STATIC-INSTRUMENTATION REVIEW COMPLETE - OUTCOME 1 - CONTINUATION AUTHORITY UNCONSUMED`

Review stops here.
