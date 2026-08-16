# HH-0000 Context-to-Relational-Inquiry Transformation Controlled Experiment Evidence

**Status:** BOUNDED STRUCTURED TRANSFORMATION EVIDENCED - SEMANTIC SIGNAL FORMATION REMAINS UNPROVEN
**Evidence date:** 2026-08-10
**Subject:** Controlled deterministic formation of inspectable relational-inquiry evidence
**Architecture:** `docs/formation/HH0000_CONTEXT_TO_RELATIONAL_INQUIRY_TRANSFORMATION_BOUNDED_ARCHITECTURE_AND_EXPECTED_EVIDENCE_REVIEW.md`
**Authority:** `docs/formation/HH0000_CONTEXT_TO_RELATIONAL_INQUIRY_TRANSFORMATION_COMBINED_AUTHORITY_REVIEW.md`
**Execution scope:** Structured deterministic fixtures only
**Natural-input effect:** None - no natural-input test was run
**Live-use effect:** None - no live conversation was run
**Capability effect:** None - this evidence does not establish that Andy understands

## Evidence Question

> Can a bounded implementation identify what deserves understanding, without already being told what matters?

For this experiment, "without already being told what matters" means the runtime does not receive:

1. the selected evidence set;
2. excluded evidence decisions;
3. materiality decision;
4. neutral inquiry question;
5. expected transformation status;
6. intended-recipient decision;
7. held-out assessment;
8. downstream relational-envelope result.

The runtime does receive structured governed evidence kinds, purpose kind, scope, provenance where available, lifecycle status, confidence, and direct claims where a human explicitly supplied them.

## Boundary

This experiment does not:

1. process natural language;
2. derive semantic evidence kinds from ordinary `Translation.meaning` text;
3. integrate CTRI into ordinary `form()` execution;
4. modify Context Door;
5. run Andy;
6. continue or repeat a live conversation;
7. retrieve repository documents or generated indexes at runtime;
8. select a model, prompt, service, score, storage mechanism, or deployment path;
9. change the two-form relational evidence envelope;
10. grant Judgement, Authority, Action, Memory, Learning, Knowledge, contribution, or execution effects;
11. claim general relational inquiry formation;
12. claim that Andy understands.

## Implementation Inspected

1. `platform/cos/understanding-formation/context-to-relational-inquiry.ts`;
2. `platform/cos/understanding-formation/context-to-relational-inquiry-invariants.ts`;
3. `platform/cos/understanding-formation/__tests__/context-to-relational-inquiry.test.ts`;
4. `platform/cos/understanding-formation/test-support/context-to-relational-inquiry-inputs.ts`;
5. `platform/cos/understanding-formation/test-support/held-out/context-to-relational-inquiry-assessments.ts`;
6. `platform/cos/understanding-formation/index.ts`.

The existing downstream control remained:

1. `platform/cos/understanding-formation/relational.ts`;
2. `platform/cos/understanding-formation/relational-invariants.ts`;
3. `platform/cos/understanding-formation/__tests__/relational-experiment.test.ts`.

## Implemented Boundary

The experiment adds a pure `formRelationalInquiry()` function. It receives structured evidence and returns one of:

1. `RELATIONAL_INQUIRY_FORMED`;
2. `NO_MATERIAL_RELATIONAL_INQUIRY`;
3. `RELATIONAL_INQUIRY_FORMATION_GAP`.

The output makes inspectable:

1. purpose and Context references;
2. all available evidence IDs;
3. selected evidence and selection reasons;
4. excluded evidence and exclusion reasons;
5. trigger evidence;
6. intended-recipient scope where attributable;
7. a neutral inquiry and materiality where formed;
8. alternatives and distinguishing evidence need;
9. specific uncertainty;
10. no-inquiry reason and reconsideration trigger;
11. formation gap, safe current meaning, and needed evidence;
12. direct-relationship attribution;
13. correction and prior-inquiry lineage;
14. confidence derived from selected evidence.

The function is exported as an experimental pure API. It is not called by ordinary Understanding formation or Context Door.

## Frozen Evidence Package

Fifteen structured input fixtures were frozen separately from fifteen evaluator-only held-out assessments before the complete candidate suite was run.

All previously conditional held-out cases were made determinate:

| Fixture | Determinate expected status |
| --- | --- |
| `CTRI-FX-003` purpose changed | `NO_MATERIAL_RELATIONAL_INQUIRY` |
| `CTRI-FX-004` assessment and correction removed | `NO_MATERIAL_RELATIONAL_INQUIRY` |
| `CTRI-FX-009` relationship directly supplied | `RELATIONAL_INQUIRY_FORMED` |
| `CTRI-FX-011` corrected purpose and request scope | `RELATIONAL_INQUIRY_FORMED` with prior-inquiry lineage |

The package also includes:

1. primary relational correction;
2. semantic reorder with different evidence identities;
3. fluent high-confidence distractors;
4. keyword lure;
5. same correction surface category with transcription meaning;
6. source and recipient permutation;
7. two credible alternatives;
8. independent facts;
9. uncertain governed-rule applicability;
10. stale or superseded relational evidence;
11. missing source provenance.

## Direct Observations

### Focused CTRI execution

The complete focused CTRI suite passed:

1. 1 suite passed;
2. 26 tests passed;
3. 0 tests failed.

Observed checks included:

1. all fifteen fixtures satisfied their isolated determinate assessments;
2. semantic reorder preserved status, neutral question, materiality, and recipient scope while evidence identities changed;
3. changed purpose changed the materiality result;
4. removing recipient assessment and correction removed the primary inquiry;
5. high-confidence distractors were excluded and did not increase confidence;
6. keyword and transcription-correction lures produced no material inquiry;
7. direct relationship evidence remained marked directly supplied;
8. ambiguity preserved two alternatives;
9. correction preserved prior-inquiry lineage;
10. uncertain applicability, stale support, and missing provenance produced formation gaps;
11. runtime fixtures contained no expected selection, status, question, materiality, formation gap, denied authority review, or later live answer;
12. every genuine result passed all twenty CTRI invariants;
13. one targeted tamper for each `CTRI-I-01` through `CTRI-I-20` was detected.

### Downstream control execution

The unchanged relational-envelope experiment passed:

1. 1 suite passed;
2. 22 tests passed;
3. 0 tests failed.

This shows the standalone CTRI additions did not change the previously evidenced downstream fixture behavior. It does not show that every CTRI result can yet be converted into a downstream envelope.

### Repository compatibility

Observed final validation:

1. `npm run typecheck` - passed;
2. full `npm test -- --runInBand` - 50 suites passed, 526 tests passed, 0 failed;
3. editor diagnostics for all six touched executable and test files - no errors found;
4. targeted diff hygiene for those files - passed.

## What the Experiment Proves

The experiment proves only these bounded propositions:

1. **Structured selection:** Given structured purpose, evidence kind, scope, provenance, lifecycle, and correction semantics, a deterministic function can select and exclude evidence without receiving the expected selected set.
2. **Three-way status:** The implementation can distinguish a formed inquiry, no material inquiry, and inability to form responsibly for the fifteen frozen fixtures.
3. **Inspectable rationale:** Selection, exclusion, trigger, Context, source scope, uncertainty, correction, and confidence evidence can be inspected independently from final question prose.
4. **Purpose sensitivity:** The same evidence kinds under a changed purpose can produce a different status.
5. **Evidence dependency:** Removing the primary assessment and correction removes the primary inquiry.
6. **Distractor resistance:** Structured irrelevant evidence does not enter selection or inflate confidence in the exercised case.
7. **Surface-cue resistance within structured input:** Keyword-labelled independent facts and transcription correction do not trigger relational inquiry.
8. **Provenance sensitivity:** Intended-recipient scope follows the provider represented in structured evidence.
9. **Honest attribution:** A directly supplied relationship is distinguished from one independently formed.
10. **Ambiguity discipline:** Two structured credible alternatives remain unresolved rather than being collapsed.
11. **Lifecycle discipline:** Superseded evidence is excluded from current support and correction can preserve prior-inquiry lineage.
12. **Positive abstention assessment:** No-inquiry and formation-gap outcomes are explicit results rather than absent output.
13. **Structural falsifiability:** All twenty invariant checks detect their targeted tampered outcomes.
14. **Isolation control:** Runtime fixtures and held-out assessments can remain separately stored without answer-bearing result fields in runtime fixtures.
15. **Compatibility:** The pure exported experiment coexists with the current repository and does not change ordinary formation callers.

The correct bounded conclusion is:

> A deterministic implementation can identify a material relational inquiry from pre-classified structured semantic evidence without receiving the selected evidence set or expected inquiry result.

## What the Experiment Does Not Prove

The experiment does not prove:

1. that Andy identifies what deserves Understanding from a person's words;
2. that semantic evidence kinds are formed from ordinary Translations without human or fixture-author interpretation;
3. that `relational-significance`, `transcription`, `unexplained-concern`, `alternative-context`, or other semantic classifications can be derived responsibly;
4. that the scope IDs used for selection can be formed without pre-grouping evidence;
5. that purpose kind can be established without human or upstream interpretation;
6. that structured provider identity establishes intended meaning outside the exercised provenance rules;
7. that finite fixtures prove the absence of pattern matching;
8. that keyword resistance over structured kinds generalises to natural language;
9. that fixed branching generalises beyond the enumerated evidence kinds and purpose kinds;
10. that all credible distractors, ambiguities, corrections, stale states, or provenance gaps are covered;
11. that confidence is a general measure of inquiry quality;
12. that every CTRI result can be transformed into the existing relational-envelope proposition contract;
13. that ordinary `form()` should adopt CTRI;
14. that Context Door should use CTRI;
15. that another natural-input test or live conversation is safe or useful;
16. that Andy understands.

## The Boundary Revealed

```text
Ordinary attributable Observation and Translation
                    |
                    |  UNIMPLEMENTED / UNPROVEN
                    v
Structured semantic evidence
- purpose kind
- evidence kind
- scope
- provenance
- lifecycle and correction meaning
                    |
                    |  EVIDENCED FOR 15 FROZEN FIXTURES
                    v
Inspectable relational-inquiry formation
- selected and excluded evidence
- formed / immaterial / formation gap
- neutral question and materiality
- alternatives, source scope, uncertainty
                    |
                    |  NOT YET CONNECTED BY THIS EXPERIMENT
                    v
Existing relational-envelope evaluation
```

The experiment therefore moves the open boundary upstream. It shows that selection need not be handed to the function once structured semantic evidence exists. It does not show how that semantic evidence is formed from ordinary attributable Translation and Context.

## Evidence Interpretation

### Observation

The deterministic candidate behaved as specified for all frozen structured fixtures and targeted tamper checks.

### Inference

The implemented evidence contract is sufficient to make one bounded form of inquiry selection independently inspectable and falsifiable.

### Conclusion

The implementation answers the experiment question only at the structured semantic boundary. It does not yet answer whether Andy, or any natural-language runtime, can identify what deserves Understanding without upstream human classification.

## Failures, Contradictions, and Contamination

1. Focused candidate failures: none observed in the final 26-test execution.
2. Downstream control failures: none observed in the final 22-test execution.
3. Full-suite failures: none observed in the final 526-test execution.
4. Held-out assessment contamination: none detected by the implemented serialized-runtime denial check.
5. Evaluator disagreement: none represented in this deterministic execution.
6. Contradiction: none observed between held-out expectations and final structured outputs.

Absence of observed contamination is limited to the implemented checks. It is not proof that every indirect influence has been excluded.

## Governance Effects

This evidence does not authorise:

1. ordinary runtime integration;
2. natural-input testing;
3. another live conversation;
4. a capability claim;
5. production or deployment;
6. Memory, Learning, Knowledge, contribution, execution, or action;
7. widening evidence kinds, mechanisms, or architecture without review.

## Required Next Review

Conduct a documentation-only MARC and Cyril post-experiment evidence review asking:

1. what this structured experiment actually proves;
2. whether pre-classified semantic evidence is a legitimate next boundary or merely relocates fixture-authored Understanding;
3. whether scope and semantic kind carry too much of the expected selection;
4. whether CTRI should remain standalone, connect to downstream evaluation, be revised, or stop;
5. what evidence would be required before any ordinary Translation-to-semantic-evidence experiment;
6. whether natural input and live use must remain blocked.

Do not integrate CTRI into ordinary formation. Do not test natural input. Do not run another live conversation before that review.

## Files Changed

This experiment creates or modifies only:

1. `platform/cos/understanding-formation/context-to-relational-inquiry.ts`;
2. `platform/cos/understanding-formation/context-to-relational-inquiry-invariants.ts`;
3. `platform/cos/understanding-formation/__tests__/context-to-relational-inquiry.test.ts`;
4. `platform/cos/understanding-formation/test-support/context-to-relational-inquiry-inputs.ts`;
5. `platform/cos/understanding-formation/test-support/held-out/context-to-relational-inquiry-assessments.ts`;
6. `platform/cos/understanding-formation/index.ts`;
7. `docs/formation/HH0000_CONTEXT_TO_RELATIONAL_INQUIRY_TRANSFORMATION_CONTROLLED_EXPERIMENT_EVIDENCE.md`.

Documentation validation may refresh the four generated knowledge indexes from the complete current dirty workspace. Their content changes must not be attributed solely to this experiment.

No ordinary formation caller, Context Door runtime, relational-envelope implementation, Theory, architecture source, governance source, live conversation record, Memory, Learning, Knowledge source, SLM, Resource Centre, parked hypothesis, or formation-status file is modified by this experiment.

## Documentation Validation

Validation completed:

1. `npm run knowledge` - passed; 648 documents scanned and 43 concepts found;
2. the knowledge pipeline refreshed `md_inventory.txt`, `md_headers.txt`, `hh_headers.txt`, and `knowledge_index.md` from the complete current dirty workspace;
3. generated index content is not attributed solely to this experiment;
4. editor diagnostics for all seven experiment and evidence files - no errors found;
5. targeted diff hygiene for those files and the four generated knowledge indexes - passed.

Documentation validation does not prove relational inquiry formation beyond the structured experiment, natural-language Understanding, or person-understanding. It does not authorise runtime integration, natural-input testing, or live use.

## Traceability

**Principle:** `constitution/02-CONSTITUTION.md`; `constitution/05-AUTHORITY-AND-STEWARDSHIP.md`.
**Theory:** `docs/theory/003-THEORY-OF-UNDERSTANDING.md`; `docs/theory/004-THEORY-OF-JUDGEMENT.md`; `docs/theory/007-THEORY-OF-CONTEXT.md`.
**Architecture:** `docs/architecture/COMPANION-INTELLIGENCE-CORE.md`; `docs/architecture/CANONICAL-REASONING-RECORD.md`; `docs/architecture/REASONING-LIFECYCLE.md`; the CTRI architecture and Combined Authority review listed above.
**Engineering:** The seven implementation and evidence files listed in this record; ordinary runtime integration remains Not Applicable.
**Milestone:** Not Applicable - no formation or milestone completion is claimed.
**Evidence:** The observed focused, downstream-control, typecheck, full-suite, diagnostic, and diff-hygiene results recorded here; no natural-input or live-human evidence is claimed.