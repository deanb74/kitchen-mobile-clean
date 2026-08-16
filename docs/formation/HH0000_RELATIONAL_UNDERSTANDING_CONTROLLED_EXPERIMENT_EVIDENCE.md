# HH-0000 Relational Understanding Controlled Experiment Evidence

**Status:** CONTROLLED EXPERIMENT EVIDENCE RECORDED - CAPABILITY AND LIVE USE REVIEW REQUIRED
**Evidence date:** 2026-08-10
**Subject:** Smallest controlled relational Understanding experiment
**Implementation authority:** `docs/formation/HH0000_RELATIONAL_UNDERSTANDING_PRE_IMPLEMENTATION_COMBINED_AUTHORITY_REVIEW.md`
**Evidence class:** Deterministic implementation and fixture evidence only
**Capability effect:** None - this record does not establish that Andy understands
**Live-use effect:** Another live conversation remains blocked

## Evidence Boundary

This record documents the implementation and deterministic execution of the authorised controlled experiment.

It does not:

1. claim that Andy understands Dean or another person;
2. treat fixtures as live human evidence;
3. authorise another live conversation;
4. claim general relational Understanding;
5. claim production readiness, certification, formation completion, or milestone completion;
6. authorise Memory, Learning, Knowledge, contribution, execution, or external-world action;
7. promote a deterministic rule mechanism into canonical architecture;
8. prove that the experiment will generalise beyond its bounded propositions and fixtures;
9. conceal failed checks, evaluator defects, or the rejected answer-bearing fixture design;
10. select the outcome of the required fresh evidence review.

The maximum available conclusion is that the corrected controlled experiment produced the recorded deterministic results.

## Governing Sources

1. `docs/formation/HH0000_CONTEXT_DOOR_PARTIAL_UNDERSTANDING_EVIDENCE_REVIEW.md`;
2. `docs/formation/HH0000_CONTEXT_DOOR_PARTIAL_UNDERSTANDING_COMBINED_AUTHORITY_REVIEW.md`;
3. `docs/formation/HH0000_UNDERSTANDING_RESPONSIBILITY_IMPLEMENTATION_READINESS_REVIEW.md`;
4. `docs/formation/HH0000_UNDERSTANDING_RESPONSIBILITY_BOUNDED_ARCHITECTURE_CONFIRMATION.md`;
5. `docs/formation/HH0000_RELATIONAL_UNDERSTANDING_PRE_IMPLEMENTATION_EVIDENCE_PACKAGE.md`;
6. `docs/formation/HH0000_RELATIONAL_UNDERSTANDING_PRE_IMPLEMENTATION_COMBINED_AUTHORITY_REVIEW.md`.

## Implemented Experiment Surface

### Universal Understanding contract

`lib/understanding/Understanding.ts` now permits an optional relational evidence envelope with:

1. common identity, purpose, participating meanings, Context, evidence status, confidence, uncertainty, and lifecycle links;
2. `RELATIONSHIP_PROPOSED` claim, significance, inference basis, alternatives, and intended recipient scope;
3. `MATERIAL_RELATIONAL_GAP` gap, materiality, safe current meaning, needed Context, source rationale, and discovery need.

Existing hand-authored and formed Understanding objects remain compatible because the envelope is optional.

### Universal formation experiment

`platform/cos/understanding-formation/` now contains:

1. an optional neutral relational inquiry input;
2. a conservative examiner that uses attributable facts, governed rules, recipient feedback, alternatives, and corrections;
3. no relational envelope when no material relationship is supported;
4. an explicit baseline option that disables relational examination while preserving the same `FormationInput` object;
5. executable checks for `RU-I-01` through `RU-I-10`;
6. isolated runtime fixtures and separately stored held-out assessments;
7. one evaluator suite covering all ten cases and required family comparisons.

No Context Door-specific relational synthesis was added. Existing callers that do not supply a relational inquiry retain their prior formation behavior.

## Isolation Record

### Runtime-under-test input

The candidate receives only the selected `FormationInput` from:

`platform/cos/understanding-formation/test-support/relational-inputs.ts`

Runtime fixtures contain:

1. translated meanings;
2. ordinary situational Context;
3. no held-out assessment object;
4. neutral relational facts, governed rules, attributable feedback, alternatives, or corrections where the fixture supplies them;
5. no result fields named `gap`, `materiality`, `safeCurrentMeaning`, `neededContext`, `sourceRationale`, or `discoveryNeed`;
6. no evidence-package, live-record, architecture-result, Combined Authority outcome, or held-out assessment path.

### Evaluator-only input

The evaluator imports semantic assessments from:

`platform/cos/understanding-formation/test-support/held-out/relational-assessments.ts`

The formation implementation does not import that module. The evaluator calls `form(fixture.input)` and examines the returned envelope after formation.

### Retrieval boundary observed

The deterministic `form()` implementation has no repository retrieval dependency or retrieval input. It receives the in-memory `FormationInput` only. The test asserts that serialized runtime fixtures do not contain:

1. held-out assessment identifiers;
2. denied document names;
3. the later live answer;
4. the Combined Authority outcome;
5. held-out result-field names.

This proves fixture-content separation for this implementation path. It does not prove isolation for a future implementation that introduces retrieval, prompts, model Context, persistent state, or another input channel. Any such change triggers re-entry.

## Observed Corrections During Implementation

### 1. Evaluator prohibited-text scope

The first experiment execution produced 19 passing checks and one failed check. `FX-005` correctly returned a material gap, but the evaluator searched the copied input purpose and mistook the question "whether the package may proceed" for an asserted conclusion.

The evaluator was corrected to assess prohibited claims only in formed relational fields. The input purpose remains inspectable but is not treated as Andy's conclusion.

### 2. Test-support discovery

A broader Jest command initially reported two failed suites because data-only fixture and held-out modules were located beneath `__tests__`. Jest required each file there to contain a test.

The modules were moved to separate sibling `test-support` paths. No runtime behavior changed. The identical broader command then passed 80 tests across five suites.

### 3. Answer-bearing runtime input

An internal evidence review found that the first fixture representation supplied pre-authored `gap`, `materiality`, `neededContext`, `sourceRationale`, and `discoveryNeed` fields to the runtime. Although the suite was green, that design gave the candidate too much of the held-out answer and was not accepted as valid experiment evidence.

That representation was removed. Runtime fixtures now supply only neutral attributable feedback, facts, governed rules, alternatives, corrections, purpose, and provenance-bearing references. The examiner must form the gap fields. A leakage assertion now prevents the rejected result fields from re-entering runtime fixture serialization.

The first green execution is not used as evidence for the final result.

### 4. Stricter non-leaking execution

The first execution after removing answer-bearing fields failed three checks:

1. two held-out phrases required "repetition alone" while the formed result used the semantically equivalent "preservation alone";
2. the ambiguity case's discovery need addressed a related phrase rather than the exact recorded gap and correctly failed `RU-I-06`.

The evaluator phrases were corrected without changing their semantic requirement. The ambiguity discovery need was changed to address its exact gap. The same experiment then passed.

## Final Executable Evidence Matrix

| Evidence family | Observed final result |
| --- | --- |
| `FX-001` primary prior-live extract | `MATERIAL_RELATIONAL_GAP`; identifies the missing reason/relationship, Dean as source, alignment limit, and a relevant discovery need without the later answer |
| `FX-002` paraphrase | Materially equivalent gap with variant-specific evidence reference |
| `FX-003` supported relationship | `RELATIONSHIP_PROPOSED`; temporal omissions block presentation, not the eventual outcome |
| `FX-004` material change | Proposal changes because temporal evidence is present and the prior blocker no longer remains |
| `FX-005` evidence removal | Weakens to `MATERIAL_RELATIONAL_GAP` because no governing rule establishes materiality |
| `FX-006` fluent distractors | Same material proposal, significance, and confidence as `FX-003` |
| `FX-007` ambiguity | Preserves two alternatives and forms a distinguishing gap directed to the mentor |
| `FX-008` no material relationship | No relational envelope is produced |
| `FX-009` correction | Current proposal changes and retains prior-result and correction links |
| `FX-010` source permutation | Gap and discovery need follow Priya's provenance rather than Morgan or a memorised identity |
| Same-input baseline | Baseline receives the identical fixture object, preserves ordinary summary and evidence chain, and produces no relational envelope |
| Leakage assertions | Runtime fixture serialization excludes denied documents, outcomes, later live answer, assessment identifiers, and result-field names |
| Genuine invariant checks | Every produced envelope passes `RU-I-01` through `RU-I-10` |
| Tamper detection | Ten targeted altered outputs each trigger their intended invariant |

## What Was Directly Observed

1. all ten held-out case assessments passed after the non-leaking correction;
2. harmless paraphrase preserved the material gap while evidence references followed the actual variant;
3. material evidence changes changed the current relationship;
4. removing governing evidence weakened a proposal to a gap;
5. irrelevant fluent additions did not alter the material result or confidence;
6. ambiguity produced alternatives and a discovery need rather than forced synthesis;
7. independent facts produced no relationship;
8. correction preserved prior-result and correction links;
9. source selection followed current provenance;
10. the baseline and candidate consumed the same admissible fixture object;
11. all ten relational invariants passed genuine outputs and detected targeted tampering;
12. existing universal formation and Context Door behavior remained green;
13. the full repository test suite and TypeScript check passed;
14. targeted lint passed without warnings or errors.

## What Was Not Observed

1. Andy independently interpreted unrestricted natural language;
2. Andy understood Dean's hidden reason;
3. a human recipient assessed a candidate result;
4. a model, retrieval system, or general semantic parser formed the neutral propositions;
5. the mechanism generalised beyond the bounded proposition shapes and fixtures;
6. evaluator independence outside the in-process deterministic test boundary;
7. live conversation safety or usefulness;
8. Memory, Learning, Knowledge, contribution, execution, or external action;
9. production performance, reliability, or security;
10. evidence sufficient for a capability or live-use decision.

## Evidence Interpretation

The experiment demonstrates that an optional inspectable relational envelope can be represented within canonical Understanding, formed conservatively from bounded structured propositions, compared with the existing baseline, and assessed against isolated semantic expectations and executable invariants.

It does not demonstrate general relational Understanding. The neutral propositions are supplied by deterministic fixtures; the experiment does not establish how unrestricted human meaning would become those propositions without answer leakage or unsupported inference.

The correct claim is:

> The controlled mechanism behaved as specified for the bounded final fixtures.

The incorrect claim is:

> Andy understands.

## Re-entry Assessment

No architecture re-entry was required by the final bounded mechanism:

1. the envelope remains owned by Understanding;
2. no third result form was required;
3. Judgement, Authority, Action, and human alignment remain separate;
4. Context Door did not acquire private synthesis;
5. correction remains append-only and inspectable;
6. no new persistence, scoring, trust, or promotion rule was introduced.

Re-entry remains mandatory if a next proposal introduces unrestricted language interpretation, retrieval, prompts, model Context, evaluator automation, persistent state, another proposition kind with material semantics, another cognitive owner, or live use.

## Conclusion

**CONTROLLED EXPERIMENT EVIDENCE RECORDED - FRESH EVIDENCE REVIEW REQUIRED.**

The bounded final fixture set and implementation pass their deterministic checks. The implementation also preserves existing formation and Context Door regressions.

This result does not establish that Andy understands. It does not authorise another live conversation. MARC and Cyril must assess the actual evidence, its corrections, its structured-input limitation, and its isolation boundary before any next permission is considered.

## Exact Next Step

Conduct a focused post-experiment MARC and Cyril evidence review. The review must decide only what the deterministic experiment supports and whether another bounded technical step is justified.

Do not run another live conversation.

## Files Changed

Experiment implementation and tests:

1. `lib/understanding/Understanding.ts`;
2. `platform/cos/understanding-formation/formation.ts`;
3. `platform/cos/understanding-formation/index.ts`;
4. `platform/cos/understanding-formation/types.ts`;
5. `platform/cos/understanding-formation/relational.ts`;
6. `platform/cos/understanding-formation/relational-invariants.ts`;
7. `platform/cos/understanding-formation/__tests__/relational-experiment.test.ts`;
8. `platform/cos/understanding-formation/test-support/relational-inputs.ts`;
9. `platform/cos/understanding-formation/test-support/held-out/relational-assessments.ts`.

Evidence record:

10. `docs/formation/HH0000_RELATIONAL_UNDERSTANDING_CONTROLLED_EXPERIMENT_EVIDENCE.md`.

Documentation validation may refresh the four generated knowledge indexes from the complete dirty workspace. Their content changes must not be attributed solely to this experiment.

No live record, Theory, architecture source, governance source, Memory, Learning, Knowledge source, SLM, Resource Centre, parked hypothesis, or formation-status file is modified.

## Validation Record

Validation completed:

1. controlled experiment: 1 suite passed; 22 tests passed; 0 failed;
2. universal formation and Context Door focused regression: 5 suites passed; 80 tests passed; 0 failed;
3. full repository suite: 49 suites passed; 498 tests passed; 0 failed;
4. `npm run typecheck`: passed;
5. targeted ESLint across the contract, implementation, fixtures, held-out assessments, and evaluator: passed without warnings or errors;
6. `npm run knowledge`: passed; 644 documents scanned and 43 concepts found;
7. editor diagnostics for the touched implementation and evidence surfaces: no errors found;
8. targeted diff hygiene for implementation, experiment tests, evidence record, and generated indexes: passed;
9. scoped status: the shared Understanding contract is modified; the formation experiment module and three relational formation records are new; the four generated knowledge indexes are modified;
10. forbidden-effect scan of the implementation found no Memory, Learning, KnowledgeGraph, persistence-write, ActionEngine, AuthorityEngine, or JudgementEngine dependency. The only matches were existing comments describing the downstream Judgement consumer;
11. generated diff attribution: the indexes reflect the complete current dirty workspace, so their content changes are not claimed as solely caused by this experiment.

## Traceability

**Principle:** `constitution/02-CONSTITUTION.md`; `constitution/05-AUTHORITY-AND-STEWARDSHIP.md`.
**Theory:** `docs/theory/003-THEORY-OF-UNDERSTANDING.md`; `docs/theory/004-THEORY-OF-JUDGEMENT.md`; `docs/theory/007-THEORY-OF-CONTEXT.md`.
**Architecture:** `docs/architecture/COMPANION-INTELLIGENCE-CORE.md`; `docs/architecture/CANONICAL-REASONING-RECORD.md`; `docs/architecture/REASONING-LIFECYCLE.md`; `docs/formation/HH0000_UNDERSTANDING_RESPONSIBILITY_BOUNDED_ARCHITECTURE_CONFIRMATION.md`.
**Engineering:** The implementation and tests listed in this record under the bounded permission of the pre-implementation Combined Authority review.
**Milestone:** Not Applicable - no formation or milestone completion is claimed.
**Evidence:** The deterministic commands and final fixture results recorded here; no live-human evidence is claimed.