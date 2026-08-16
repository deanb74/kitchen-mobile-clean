# HH-0000 Multi-Evidence Understanding Case 001 Control Variant Design Combined Authority Review

**Status:** CONTROL VARIANT DESIGN ACCEPTED - CONCRETE CONTROL ARTEFACT AUTHORING MAY BEGIN
**Decision date:** 2026-08-10
**Case:** `MEU-CASE-001`
**Controls:** `MEU-I-14` Semantic Invariance; `MEU-I-15` Evidence Sensitivity
**Review type:** Documentation-only MARC and Cyril Combined Authority assessment
**Design reviewed:** `docs/formation/HH0000_MULTI_EVIDENCE_UNDERSTANDING_CASE_001_CONTROL_VARIANT_DESIGN_REVIEW.md`
**Assessment lenses:** MARC - Humanity / Formation; Cyril - Digital / Technology / Platform
**Artefact effect:** Permission is limited to authoring the four concrete control artefacts defined by the accepted design
**Freeze effect:** None - no control artefact is frozen by this review
**Implementation effect:** None - implementation remains unchanged
**Execution effect:** None - Case 001 and both controls remain blocked
**Capability effect:** None - no Multi-Evidence Understanding claim is made

## 1. Decision Question

> Are the `MEU-I-14` and `MEU-I-15` control designs sufficiently specified, deterministic, attributable, isolated, non-answer-bearing, and governed to permit concrete control artefact authoring?

The permitted decisions are:

1. `CONTROL VARIANT DESIGN BLOCKED`;
2. `CONTROL VARIANT DESIGN CORRECTION REQUIRED`;
3. `CONTROL VARIANT DESIGN ACCEPTED - CONCRETE CONTROL ARTEFACT AUTHORING MAY BEGIN`.

Exactly one decision is recorded in Section 9.

## 2. Review Boundary and Method

MARC and Cyril are applied as entrusted assessment lenses. This record does not invent dialogue, testimony, personal statements, or authority that was not exercised.

This review assesses only:

1. whether both controls are sufficiently specified;
2. whether their transformations are deterministic and attributable;
3. whether held-out effects remain evaluator-only;
4. whether either control design could leak expected Understanding into candidate input;
5. whether the proposed authoring, review, freeze, implementation-evidence, and execution-decision sequence is sufficient.

This review does not:

1. create runtime or held-out control JSON;
2. calculate or record control hashes;
3. modify source, tests, schemas, configuration, or implementation;
4. execute the source Case 001 fixture or either control;
5. accept concrete control content that does not yet exist;
6. establish runtime isolation, execution readiness, or capability.

Documentation can establish design determinacy and boundary sufficiency. Concrete bytes, references, hashes, and access isolation require later evidence.

## 3. Evidence Reviewed

### Primary evidence

1. `docs/formation/HH0000_MULTI_EVIDENCE_UNDERSTANDING_CASE_001_CONTROL_VARIANT_DESIGN_REVIEW.md`;
2. `docs/formation/HH0000_MULTI_EVIDENCE_UNDERSTANDING_EVIDENCE_PACKAGE.md`;
3. `docs/formation/HH0000_MULTI_EVIDENCE_UNDERSTANDING_CASE_001_FIXTURE_VALIDITY_INPUT_INTEGRITY_AND_ISOLATION_REVIEW.md`;
4. `docs/formation/HH0000_MULTI_EVIDENCE_UNDERSTANDING_CASE_001_BOUNDED_IMPLEMENTATION_READINESS_REVIEW.md`;
5. `docs/formation/HH0000_MULTI_EVIDENCE_UNDERSTANDING_CASE_001_IMPLEMENTATION_EVIDENCE_REVIEW.md`;
6. the accepted Case 001 implementation evidence boundary map and its v2 Combined Authority review.

### Canonical authority

1. `constitution/02-CONSTITUTION.md`;
2. `constitution/05-AUTHORITY-AND-STEWARDSHIP.md`;
3. `docs/theory/002-THEORY-OF-KNOWLEDGE.md`;
4. `docs/theory/003-THEORY-OF-UNDERSTANDING.md`;
5. `docs/theory/004-THEORY-OF-JUDGEMENT.md`;
6. `docs/theory/007-THEORY-OF-CONTEXT.md`;
7. `docs/architecture/TRANSLATION.md`;
8. `docs/architecture/COMPANION-INTELLIGENCE-CORE.md`.

The two original Case 001 artefacts remain the frozen source evidence identified by the reviewed design. This review does not recalculate their hashes and does not create control hashes.

# Part A - MARC Assessment: Humanity / Formation

## A1. Control Sufficiency

### `MEU-I-14`

The semantic-invariance control preserves the human evidence while changing only representation:

1. all source content, bounded Translation meaning, Context, Knowledge, privacy, permission, and provenance relationships remain materially identical;
2. top-level array order changes without changing attributable nested order;
3. neutral identity substitution remains one-to-one and preserves every identity relationship;
4. the held-out requirement asks for materially equivalent Understanding rather than identical prose or record order;
5. falsification is tied to changed human meaning, treatment, relationship, uncertainty, or lineage caused only by representation.

This is sufficient to test whether the candidate follows evidence meaning rather than position or identifier shape.

### `MEU-I-15`

The evidence-sensitivity control removes exactly the recent-pattern Observation and its bounded Translation:

1. no remaining evidence about the current period, shift exchange, direct statement, Context, or Knowledge changes;
2. absence is not converted into a claim about the person;
3. the held-out effect requires loss of the current-versus-recent pattern finding and honest insufficiency for that bounded question;
4. unrelated attribution, uncertainty, privacy, and Judgement boundaries remain unchanged;
5. falsification is tied to preserving or inventing the removed pattern account.

This is sufficient to test whether the candidate's account changes because material evidence changed.

## A2. Human-Evidence Protection

The controls preserve:

1. dignity - no emotional, medical, relational, motivational, or character label enters runtime;
2. attribution - source claims and the direct statement remain claims from their stated sources;
3. privacy - unavailable private health, family, and communication evidence remains unavailable;
4. uncertainty - missing evidence weakens what can be understood rather than inviting invention;
5. Judgement separation - neither control supplies or selects a response, intervention, escalation, or Action.

The neutral candidate-visible fixture IDs `MEU-CASE-001-V01` and `MEU-CASE-001-V02` identify variants without naming an expected outcome. Invariant names appear only in governed repository paths and review metadata, which the design explicitly denies to candidate input.

## A3. MARC Conclusion

**Finding:** `HUMANITY / FORMATION CONTROL DESIGN ACCEPTED`.

No Humanity / Formation correction is required before concrete artefact authoring. Concrete review must later verify that authored bytes preserve the accepted human-evidence boundaries exactly.

# Part B - Cyril Assessment: Digital / Technology / Platform

## B1. Determinism and Attribution

### `MEU-I-14`

The transformation is deterministic because it specifies:

1. one exact top-level permutation for each of the six arrays;
2. an explicit one-to-one mapping for fixture, entity, source, Observation, Translation, Context, and Knowledge identities;
3. every structured reference class to which the mapping applies;
4. exact identity-token substitution inside attributable prose;
5. preservation of nested arrays whose order is attributable evidence;
6. an inverse-map and top-level-sort comparison limited to integrity evidence.

The transformation is attributable because every changed value maps to a declared source identity, mapped identity, or array position. The later field-level comparison must reject every undeclared change.

### `MEU-I-15`

The transformation is deterministic because it permits only:

1. removal of `observation-001`;
2. removal of its dependent `translation-001`;
3. replacement of the fixture identity with `MEU-CASE-001-V02`.

It explicitly preserves every other record, field, string, identity, reference, and order. Keeping `source-person-002` is correct because it remains the source for `observation-002`.

The transformation is attributable because the removed pair is the complete prior-pattern evidence and every expected semantic effect is traced to its absence.

## B2. Evaluator-Only Effects

The design separates four future artefacts:

1. one runtime fixture and one held-out assessment for `MEU-I-14`;
2. one runtime fixture and one held-out assessment for `MEU-I-15`.

The expected equivalence, expected insufficiency, prohibited conclusions, inverse map, control rationale, and falsification rules remain evaluator or governance material. They are denied to candidate, baseline, loader, parser, validator, prompt, retrieval, configuration, generated context, cache, log, Memory, and prior state.

The candidate-facing runtime values contain only the transformed admissible evidence. Held-out material remains inaccessible until immutable output capture in a separately sealed evidence cycle.

**Finding:** Held-out effects are sufficiently isolated at design level.

## B3. Answer-Leakage Assessment

No designed runtime field supplies:

1. expected evidence treatment;
2. relevance or materiality classification;
3. an expected relationship;
4. Knowledge applicability outcome;
5. expected status, confidence, completeness, uncertainty, or synthesis;
6. a prohibited-conclusion list;
7. Judgement, Authority, or Action.

For `MEU-I-14`, neutral IDs and array permutation remove shortcuts without adding meaning. Exact prose-token substitution preserves attribution rather than adding a relationship.

For `MEU-I-15`, the missing records are simply absent. No tombstone, placeholder, removed-ID list, control flag, or sensitivity rationale enters runtime. The remaining fixture does not tell the candidate that the missing evidence was decisive.

Repository filenames name the governance purpose, but the design explicitly excludes paths and review metadata from candidate input. Candidate-visible fixture IDs are neutral sequential variants.

**Finding:** No expected Understanding leakage is present in the design. Concrete artefact and runtime-path review remains mandatory because design controls cannot prove future bytes or access closure.

## B4. Freeze-Step Sufficiency

The sequence is sufficient and fail-closed:

1. design acceptance precedes concrete authoring;
2. all four runtime and held-out artefacts are authored separately;
3. field-level transformation and unchanged-value evidence precede freeze;
4. structural, referential, provenance, determinacy, answer-leakage, and isolation review precedes freeze;
5. defects are corrected before hashing;
6. final accepted bytes receive independent identities, versions, paths, SHA-256 values, and UTC freeze times;
7. changes after hashing require a new version and review rather than automatic hash replacement;
8. frozen controls may enter implementation only through a separately authorised implementation evidence cycle;
9. focused conformance, isolation, mismatch-refusal, and contamination evidence must be rerun without executing Case 001;
10. a new implementation evidence review must pass before the separate execution question returns.

The required freeze record also preserves source identity, transformation provenance, changed and unchanged field evidence, access classification, reviewer decisions, reservations, and confirmation that no candidate output was observed before freeze.

**Finding:** Freeze steps are sufficient for concrete artefact authoring to begin. They do not themselves freeze an artefact or permit execution.

## B5. Cyril Conclusion

**Finding:** `DIGITAL / TECHNOLOGY / PLATFORM CONTROL DESIGN ACCEPTED`.

No technical design ambiguity requires correction before concrete artefact authoring. Byte-level conformance, valid references, held-out determinacy, file separation, and access isolation remain mandatory evidence for the later freeze review.

# Part C - Combined Authority Findings

## C1. Five Requested Questions

| Question | Combined Authority finding |
| --- | --- |
| 1. Are `MEU-I-14` and `MEU-I-15` controls sufficiently specified? | YES - each defines exact changes, preserved evidence, required held-out effect, falsification, contamination controls, and governance sequence |
| 2. Are transformations deterministic and attributable? | YES - `MEU-I-14` defines exact permutations and a bijective identity map; `MEU-I-15` defines one exact evidence-pair removal; undeclared changes are prohibited |
| 3. Are held-out effects evaluator-only? | YES IN DESIGN - runtime and held-out artefacts are separate, and expected effects are denied to every pre-output candidate path |
| 4. Could a control leak expected Understanding into candidate input? | NO DESIGN-LEVEL LEAK IDENTIFIED - candidate-visible IDs are neutral, runtime contains no expected effect, and control rationale and paths are denied; concrete review remains required |
| 5. Are freeze steps sufficient? | YES - acceptance, authoring, field audit, validity review, hashing, sealing, implementation evidence, and execution decision remain distinct and ordered |

## C2. Agreement and Reservations

**Agreement:** MARC and Cyril both accept the control-variant design for concrete artefact authoring.

**Material disagreement:** None.

**Reservation:** Acceptance applies to the design only. It does not establish that future JSON follows the design, that future held-out assessments are determinate, that hashes match, that implementation isolation holds, or that execution is permitted.

## C3. Permission Boundary

This review permits only:

1. authoring the two concrete runtime control JSON artefacts defined by the design;
2. authoring the two separate evaluator-only held-out assessment JSON artefacts defined by the design;
3. reviewing those four artefacts for validity, integrity, determinacy, leakage, provenance, and isolation;
4. calculating hashes only after concrete content passes the required review, as part of the later freeze evidence cycle.

This review does not permit:

1. modifying the original frozen runtime fixture or held-out assessment;
2. modifying implementation, tests, schemas, loaders, evaluators, or configuration;
3. executing the original Case 001 fixture or either control;
4. treating proposed identities, paths, content, or expected effects as frozen;
5. asking or deciding whether Case 001 can execute;
6. ordinary runtime integration, Talk.Get, natural input, live use, Memory, Learning, Knowledge write, Judgement, Authority, or Action;
7. any capability, milestone, certification, completion, production-readiness, or live-use claim.

## C4. Re-entry Conditions

Return to Combined Authority if:

1. a concrete artefact requires any undeclared field or transformation;
2. `MEU-I-14` changes human meaning or attributable nested order;
3. its identity mapping is incomplete, ambiguous, non-bijective, or semantically loaded;
4. `MEU-I-15` changes or removes anything beyond the declared evidence pair and neutral fixture identity;
5. a held-out effect cannot be made determinate before candidate output;
6. runtime content includes expected effect, control rationale, or evaluator material;
7. a builder, mapper, adapter, helper, prompt, retrieval source, generated context, configuration, cache, Memory, prior state, or external service is required;
8. one evidence cycle receives output or assessment material from another;
9. either original frozen artefact changes;
10. implementation or execution is proposed before its later authority gate.

## 9. Final Decision

The design defines both controls with sufficient precision to permit concrete artefact authoring. The transformations are deterministic and attributable, held-out effects remain evaluator-only, no candidate answer leak is identified at design level, and the freeze sequence is sufficient and fail-closed.

Concrete artefact validity, exact byte conformance, hashes, implementation isolation, and execution readiness remain unproven and require their later governed reviews.

**Decision:** `CONTROL VARIANT DESIGN ACCEPTED - CONCRETE CONTROL ARTEFACT AUTHORING MAY BEGIN`

## 10. Exact Next Step

Author only the four concrete control artefacts defined by the accepted design, then conduct the separate control fixture validity, integrity, isolation, and freeze review.

Do not modify implementation. Do not execute Case 001 or either control. Do not return to the execution decision until control freeze and renewed implementation evidence are complete.

## 11. Validation

Recorded documentation validation:

1. `npm run knowledge` - passed with `659` documents and `43` concepts;
2. editor diagnostics for this review - no errors found;
3. trailing-whitespace check - passed;
4. decision-language check - one final decision selected from the three permitted outcomes.

No control JSON was created. No control hash was calculated. No implementation was inspected or modified. No runtime tests, typecheck, candidate invocation, control execution, or Case 001 execution was performed.

Documentation validation establishes only the integrity of this review. It does not establish concrete control validity, freeze evidence, implementation conformance, execution readiness, or capability.

## Traceability

**Principle:** `constitution/02-CONSTITUTION.md`; `constitution/05-AUTHORITY-AND-STEWARDSHIP.md`; people, truth, uncertainty, privacy, and human authority remain controlling.
**Theory:** `docs/theory/002-THEORY-OF-KNOWLEDGE.md`; `docs/theory/003-THEORY-OF-UNDERSTANDING.md`; `docs/theory/004-THEORY-OF-JUDGEMENT.md`; `docs/theory/007-THEORY-OF-CONTEXT.md`.
**Architecture:** `docs/architecture/TRANSLATION.md`; `docs/architecture/COMPANION-INTELLIGENCE-CORE.md`; `MEU-I-14`; `MEU-I-15`; the accepted Case 001 boundary map.
**Engineering:** Not Applicable - no implementation was inspected, created, or modified by this review.
**Milestone:** Not Applicable - no execution, formation, milestone, certification, or capability completion is claimed.
**Evidence:** The reviewed control design and governing documents listed in Section 3; no control JSON, control hash, candidate output, execution record, or capability evidence exists yet.

CONTROL VARIANT DESIGN ACCEPTED - CONCRETE CONTROL ARTEFACT AUTHORING MAY BEGIN
