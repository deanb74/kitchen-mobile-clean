# HH-0000 Multi-Evidence Understanding Case 001 Implementation Evidence Design Review

**Status:** CORRECTED BOUNDARY MAP PROPOSED - MARC AND CYRIL REASSESSMENT REQUIRED BEFORE IMPLEMENTATION
**Review date:** 2026-08-10
**Case:** `MEU-CASE-001`
**Review type:** Documentation-only implementation evidence design review
**Controlling readiness review:** `docs/formation/HH0000_MULTI_EVIDENCE_UNDERSTANDING_CASE_001_BOUNDED_IMPLEMENTATION_READINESS_REVIEW.md`
**Frozen runtime fixture:** `docs/formation/HH0000_MULTI_EVIDENCE_UNDERSTANDING_CASE_001_RUNTIME_FIXTURE.json`
**Frozen evaluator-only assessment:** `docs/formation/HH0000_MULTI_EVIDENCE_UNDERSTANDING_CASE_001_EVALUATOR_ONLY_HELD_OUT_ASSESSMENT.json`
**Implementation effect:** None - implementation remains blocked pending corrected boundary-map reassessment
**Execution effect:** None - execution remains blocked
**Capability effect:** None - no Multi-Evidence Understanding claim is made

## 1. Review Question

> What exact component, dependency, utility, ownership, evaluation, contamination, and execution-evidence boundaries must govern the Case 001 implementation so that Understanding remains entirely inside the candidate?

For every proposed component, this review permits exactly one classification:

1. `TRANSPORT`;
2. `INTEGRITY`;
3. `VALIDATION`;
4. `EVALUATION`;
5. `UNDERSTANDING`.

Any component that performs Understanding must be inside the candidate boundary. Any component with an ambiguous, mixed, or changing classification is a stop condition.

## 2. Review Outcome

**Outcome:** `CORRECTED BOUNDARY MAP PROPOSED - MARC AND CYRIL REASSESSMENT REQUIRED BEFORE IMPLEMENTATION`

The proposed boundary map is complete enough for Combined Authority assessment because:

1. every required component has one primary classification;
2. every permitted dependency direction is explicit;
3. all shared utilities are non-semantic and bounded;
4. all semantic utilities outside the candidate are forbidden;
5. all Observation comparison, relevance, relationship, applicability, significance, uncertainty, confidence, completeness, and synthesis operations remain inside the candidate;
6. baseline, validation, invariant, evaluator, and harness responsibilities remain downstream or non-semantic;
7. required implementation evidence is defined before code exists;
8. execution gates require observable isolation and contamination evidence rather than design claims.

This document does not accept its own corrected boundary map. MARC and Cyril must reassess the four corrections and record explicit acceptance before implementation begins.

## 3. Frozen Authority and Inputs

### Runtime fixture

| Field | Frozen value |
| --- | --- |
| Path | `docs/formation/HH0000_MULTI_EVIDENCE_UNDERSTANDING_CASE_001_RUNTIME_FIXTURE.json` |
| Version | `1.0.0` |
| SHA-256 | `c80d564c88844ad0d99a3622a1cc2d173b306e2e10a504c61d7ef07c53ac7840` |

### Evaluator-only assessment

| Field | Frozen value |
| --- | --- |
| Path | `docs/formation/HH0000_MULTI_EVIDENCE_UNDERSTANDING_CASE_001_EVALUATOR_ONLY_HELD_OUT_ASSESSMENT.json` |
| Version | `1.0.0` |
| SHA-256 | `e3fee9672fe05df8c614081672d5b2ca1fd8dbd586512f4ce91b1d6c7f1e305b` |

The earlier readiness permission is now procedurally held at this narrower evidence-design checkpoint. No implementation may begin until this map is accepted. Neither frozen artifact may change through this review.

## 4. Four-Ambiguity Correction Proposal

This proposal changes only the four ambiguities recorded in `docs/formation/HH0000_MULTI_EVIDENCE_UNDERSTANDING_CASE_001_IMPLEMENTATION_EVIDENCE_DESIGN_COMBINED_AUTHORITY_REVIEW.md`. All other component classifications, candidate ownership, forbidden semantic edges, utility boundaries, baseline limits, evaluator separation, human protections, and fail-closed gates remain unchanged.

### Correction 1 - `C17` mixed parsing and validation

| Required view | Correction proposal |
| --- | --- |
| Original ambiguity | `C17` combined JSON parsing, which the map classifies as `TRANSPORT` in `C03`, with structural validation, which the map classifies as `VALIDATION` in `C04`, while assigning `C17` only `VALIDATION`. |
| Proposed boundary change | Reuse `C03` Literal JSON parser for hash-verified runtime bytes after `C02` and for hash-verified held-out bytes after `C16`. Narrow `C17` to Held-out structural validator receiving only the parsed held-out value from `C03`. |
| Why uncertainty is resolved | Parsing remains one existing `TRANSPORT` responsibility wherever invoked. Held-out structural conformance remains one `VALIDATION` responsibility. Invocation after `C16` preserves verify-before-parse order and does not give `C03` authority to locate or read held-out bytes. |
| MARC impact | No human evidence is added, interpreted, selected, or transformed. Held-out meaning remains unavailable before immutable output capture. |
| Cyril impact | Removes the mixed classification and makes held-out loading symmetrical with the accepted runtime `C03/C04` separation. |
| New component classification introduced | No. Existing `C03` remains `TRANSPORT`; corrected `C17` remains `VALIDATION`. |

### Correction 2 - `C19` conflicting incoming evidence edges

| Required view | Correction proposal |
| --- | --- |
| Original ambiguity | The evidence-flow diagram converged `C13/C14` and `C15-C18` into `C19`, while the explicit rule allowed `C19` to receive only immutable candidate and baseline outputs. |
| Proposed boundary change | Place `C19` on an independent post-`C12` branch. It receives only immutable candidate and baseline outputs. Invariant/tamper evidence remains on the `C13/C14` branch; held-out evaluation remains on the `C15-C18` branch. |
| Why uncertainty is resolved | The diagram and dependency rule now identify the same two `C19` inputs and deny evaluator-result or held-out-result ingress into baseline comparison. |
| MARC impact | Baseline comparison cannot import held-out expectations or convert evaluator judgement into a claim about the person. |
| Cyril impact | Removes the contradictory edges and preserves independent, attributable evaluation records. |
| New component classification introduced | No. `C19` remains `EVALUATION`. |

### Correction 3 - `C20` contemporaneous access evidence

| Required view | Correction proposal |
| --- | --- |
| Original ambiguity | `C20` was required to record all runtime access and order evidence but was permitted to inspect only after output capture; no named responsibility observed or emitted access events while execution occurred. |
| Proposed boundary change | Define `C20` as the contemporaneous append-only boundary recorder. It is activated before `C01`, mechanically observes and records every enumerated input, each `C01-C20` invocation, each `C22` control transition, actual access, denied-access attempt, output-capture event, evaluator invocation, dependency identity, and the `C21` invocation handoff as those events occur, then seals the immutable factual record immediately before `C21` assesses it. Any hook, wrapper, sandbox boundary, or instrumentation used solely to perform this behavior is part of `C20`, not an unnamed component. |
| Why uncertainty is resolved | Observation and recording now have a named owner and an explicit during-execution event path. `C20` records facts without deciding whether they are contamination; `C21` alone evaluates the sealed facts. No post-output reconstruction is treated as proof of complete access observation. |
| MARC impact | Hidden private, prior, generated, or evaluator material has an attributable ingress record or a denied attempt; no access is excused as helpfulness. |
| Cyril impact | Makes zero-unenumerated-input and denied-access claims falsifiable through contemporaneous evidence while preserving the `INTEGRITY`/`EVALUATION` split between `C20` and `C21`. |
| New component classification introduced | No. `C20` remains `INTEGRITY`; `C21` remains `EVALUATION`. |

### Correction 4 - `C22` control dependencies

| Required view | Correction proposal |
| --- | --- |
| Original ambiguity | `C22` was said to invoke the sequence but appeared only at the end of the evidence-flow diagram, and its control dependencies were not enumerated separately. |
| Proposed boundary change | Separate control flow from evidence flow. `C22` may activate and invoke the accepted `C01-C21` sequence only after Gate 1 acceptance; it receives only mechanical gate, integrity, validation, capture, evaluation, and contamination statuses needed to continue or stop. It never receives or branches upon semantic field values or expected results. |
| Why uncertainty is resolved | The map now distinguishes orchestration edges from data/evidence edges, lists the controlled invocation order, and bounds every response to continue or fail-closed behavior. |
| MARC impact | The coordinator cannot turn a semantic result into Judgement, response selection, or action; contamination and uncertainty cannot be bypassed for convenience. |
| Cyril impact | Makes the coordinator's control authority explicit without moving semantic assessment into `TRANSPORT`. |
| New component classification introduced | No. `C22` remains `TRANSPORT`. |

### Correction Boundary

No new component is proposed. The complete component set remains `C01-C22`. This correction does not alter `C07/C08`, add a semantic utility, strengthen the baseline, weaken an evaluator boundary, or grant implementation permission.

# Part A - Classification Rules

## A1. `TRANSPORT`

Transport components move an already governed value without interpreting it.

They may:

1. receive and pass immutable values;
2. sequence calls;
3. capture immutable outputs;
4. preserve identifiers and timing evidence;
5. expose no semantic result of their own.

They must not inspect content to decide what matters or how it relates.

## A2. `INTEGRITY`

Integrity components establish byte identity, immutability, equality, or provenance continuity.

They may:

1. calculate hashes and deterministic structural digests;
2. compare expected and observed hashes;
3. freeze or deeply clone values;
4. record integrity evidence;
5. refuse mismatched artifacts.

They must not classify semantic content or derive an Understanding result.

## A3. `VALIDATION`

Validation components assess structural conformance or referential consistency without deciding semantic correctness.

They may validate:

1. required field presence;
2. field and container types;
3. closed technical value sets;
4. identifier uniqueness;
5. reference existence;
6. output contract shape;
7. explicit empty or `Not Applicable` treatment.

They must not decide relevance, relationship correctness, Knowledge applicability, significance, confidence adequacy, uncertainty adequacy, or expected case status.

## A4. `EVALUATION`

Evaluation components assess already captured candidate or baseline output. They are always post-output.

They may:

1. run architecture invariant checks;
2. construct isolated targeted tampered outputs;
3. compare output against evaluator-only held-out evidence;
4. compare candidate and baseline after both outputs exist;
5. record pass, failure, disagreement, uncertainty, or contamination.

They must not supply input or semantic helpers to candidate or baseline, repair output, or derive expected results with candidate logic.

## A5. `UNDERSTANDING`

Understanding components form current contextual meaning from governed evidence.

This classification includes any operation that:

1. compares Observations or Translations for semantic effect;
2. assesses admissibility or relevance;
3. selects, excludes, rejects, or preserves unresolved evidence for a reason;
4. determines source dependency or evidential independence;
5. forms corroboration, qualification, contradiction, supersession, contextual, applicability, or independence relationships;
6. decides Knowledge applicability;
7. forms candidate accounts;
8. establishes findings or Context-specific significance;
9. identifies assumptions, alternatives, contradictions, unknowns, or evidence needs;
10. derives Understanding confidence or completeness;
11. selects formed, partial, or insufficient status;
12. synthesizes the inspectable current account or its faithful concise explanation.

Every `UNDERSTANDING` component must be enclosed by the candidate boundary and inaccessible to baseline, loader, validator, invariant checker, evaluator, and harness.

# Part B - Proposed Component Boundary Map

## B1. Component Classification

| Component reference | Proposed responsibility | Classification | Boundary finding |
| --- | --- | --- | --- |
| `C01` Runtime artifact byte reader | Read exact bytes from the one governed runtime-fixture path | `TRANSPORT` | Outside candidate; path is fixed and content is not interpreted |
| `C02` Runtime artifact hash verifier | Calculate SHA-256, compare with frozen hash, refuse mismatch | `INTEGRITY` | Outside candidate; bytes and hashes only |
| `C03` Literal JSON parser | Convert runtime bytes verified by `C02`, or post-output held-out bytes verified by `C16`, into a value without defaults, coercion, enrichment, or reclassification | `TRANSPORT` | Outside candidate; receives bytes only and cannot locate or read either artifact |
| `C04` Runtime structural validator | Validate field types, required fields, IDs, and references | `VALIDATION` | Outside candidate; no semantic checks |
| `C05` Immutable input duplicator | Produce separate immutable candidate and baseline values | `INTEGRITY` | Outside candidate; values remain equivalent |
| `C06` Input equivalence digester | Produce deterministic structural digests for equality evidence | `INTEGRITY` | Outside candidate; digest is evidence only and never candidate input |
| `C07` Candidate boundary | Own all Case 001 Multi-Evidence Understanding formation | `UNDERSTANDING` | Sole permitted Understanding owner |
| `C08` Candidate internal formation operations | Perform candidate-owned semantic operations listed in Part D | `UNDERSTANDING` | Must remain inside `C07`; not shareable |
| `C09` Accumulation baseline | Preserve and accumulate the complete identical input without semantic treatment | `TRANSPORT` | Outside candidate; no Understanding account |
| `C10` Candidate output structural validator | Validate account shape, references, closed technical statuses, and explicit non-applicability | `VALIDATION` | Post-output; no semantic acceptance |
| `C11` Baseline output structural validator | Validate accumulation record shape and input preservation | `VALIDATION` | Post-output; no semantic acceptance |
| `C12` Immutable output capture | Preserve candidate and baseline outputs before any evaluator access | `INTEGRITY` | Post-output; no repair or normalization |
| `C13` Architecture invariant evaluator | Assess genuine output against `MEU-I-*` invariants | `EVALUATION` | Post-output and independent from candidate internals |
| `C14` Targeted tamper constructor | Mutate isolated output copies for one named invariant at a time | `EVALUATION` | Post-output; copies never flow back to candidate |
| `C15` Held-out artifact byte reader | Read exact held-out bytes only after immutable output capture | `TRANSPORT` | Evaluator side only |
| `C16` Held-out hash verifier | Verify evaluator-only artifact before parsing | `INTEGRITY` | Evaluator side only |
| `C17` Held-out structural validator | Validate evaluator-only field types, required fields, IDs, and references after post-output parsing by `C03` | `VALIDATION` | Evaluator side only; no parsing and no candidate dependency path |
| `C18` Held-out semantic evaluator | Compare structured output with frozen evaluator-only expectations | `EVALUATION` | Post-output only |
| `C19` Candidate/baseline comparator | Compare preserved accumulation with candidate structured meaning | `EVALUATION` | Post-output only |
| `C20` Contemporaneous contamination evidence recorder | Mechanically observe and append enumerated inputs, `C01-C20` invocations, `C22` control transitions, actual and denied accesses, capture events, evaluator invocations, dependency identities, and the `C21` handoff from before `C01` until record sealing | `INTEGRITY` | Records immutable facts during execution; seals immediately before `C21` and does not assess contamination or semantic correctness |
| `C21` Contamination assessor | Determine whether an unpermitted input or result reached candidate or baseline | `EVALUATION` | Post-capture assessment; may block claim or execution result |
| `C22` Gated execution coordinator | Activate and invoke the accepted sequence, consuming only mechanical statuses required to continue or stop | `TRANSPORT` | Control flow only; no semantic payload, expected-result access, or semantic branching |

## B2. Candidate Boundary

```text
+-----------------------------------------------------------+
| C07 CANDIDATE BOUNDARY              [UNDERSTANDING]        |
|                                                           |
| C08 Candidate internal formation operations               |
| - evidence treatment                                      |
| - relevance                                               |
| - evidence relationships                                  |
| - Knowledge applicability                                 |
| - candidate accounts                                      |
| - findings and significance                               |
| - alternatives, assumptions, unknowns                     |
| - confidence, completeness, status                        |
| - structured account and faithful synthesis               |
+-----------------------------------------------------------+
```

No other component may be classified `UNDERSTANDING`.

## B3. No Hidden Component Rule

Every function, module, object, callback, adapter, mapper, normalizer, builder, policy, configuration source, prompt, retrieval step, generated context source, cache, or prior-state source introduced by implementation must map to one and only one `C01` through `C22` responsibility or trigger a new boundary review.

An unnamed component is an unreviewed component. An unreviewed component blocks implementation continuation.

# Part C - Dependency Boundary Map

## C1. Permitted Dependency Direction

### Evidence and data flow

```text
Frozen runtime bytes
  -> C01 -> C02 -> C03 -> C04 -> C05 -> C06
                                      |       |
                                      v       v
                                 C07/C08     C09
                                      |       |
                                      v       v
                                     C10     C11
                                      |       |
                                      +--C12--+
                                           |
                         +-----------------+-----------------+
                         |                 |                 |
                         v                 v                 v
                    C13 -> C14            C19       C15 -> C16 -> C03
                                                               |
                                                               v
                                                          C17 -> C18
```

`C19` receives only the immutable candidate and baseline outputs preserved by `C12`. It receives no `C13/C14` or `C15-C18` result.

### Contemporaneous integrity-evidence flow

```text
Before C01: activate C20
                  |
                  v
C01-C20 invocation, C22 control, input, dependency, access,
denied-access, capture, evaluator-invocation, and C21-handoff events
                  |
                  v
       C20 append-only factual record
                  |
                  v
        seal immutable record -> C21
```

`C20` observes and records mechanical boundary events while they occur. It supplies no value, status, result, or feedback to candidate or baseline. It records the `C21` invocation handoff and seals immediately before assessment. `C21` assesses only that sealed record after candidate and baseline outputs have been captured; its finding is a separate immutable evaluation record and is not appended back into `C20`.

### Control flow

```text
Accepted Gate 1 record
          |
          v
         C22
          |
          +-> activate C20
          +-> C01 -> C02 -> C03 -> C04 -> C05 -> C06
          +-> C07/C08 and C09
          +-> C10 and C11 -> C12
          +-> C13 -> C14
          +-> C19
          +-> C15 -> C16 -> C03 -> C17 -> C18
          +-> seal C20 -> C21
```

`C22` receives only mechanical gate, integrity, validation, capture, evaluation, and contamination statuses. It may continue or stop. It cannot receive or inspect semantic account fields, held-out expected values, evaluator rationale, or candidate-internal state.

The diagrams distinguish evidence/data flow, contemporaneous integrity-evidence flow, and orchestration control flow. They do not prescribe source-file layout.

## C2. Permitted Dependencies

1. `C01` may depend only on repository-root resolution and byte-reading infrastructure.
2. `C02` may receive bytes and the frozen runtime hash constant.
3. `C03` may receive hash-verified runtime bytes from `C02`, or hash-verified held-out bytes from `C16` only after `C12`; it cannot locate, read, select, enrich, or retain either artifact.
4. `C04` may receive only the parsed runtime value and structural rules.
5. `C05` and `C06` may receive only the validated parsed runtime value.
6. `C07/C08` may receive only one immutable candidate input from `C05`.
7. `C09` may receive only one equivalent immutable baseline input from `C05`.
8. `C10` may receive candidate output and structural account rules only.
9. `C11` may receive baseline output and structural accumulation rules only.
10. `C12` may receive validated candidate and baseline outputs.
11. `C13/C14` may receive frozen runtime evidence, immutable candidate output, invariant definitions, and isolated tampered copies.
12. `C15-C18` may begin only after `C12` records immutable output capture; `C16` passes verified held-out bytes to `C03`, and `C03` passes only the parsed held-out value to `C17`.
13. `C18` may receive the structurally validated held-out assessment, immutable candidate output, invariant results, and isolation evidence.
14. `C19` may receive only immutable candidate and baseline outputs after capture; it may not receive invariant, tamper, held-out, semantic-evaluator, or contamination-assessment results.
15. `C20` must be activated before `C01`; it may contemporaneously observe and append mechanical input, `C01-C20` invocation, `C22` control-transition, dependency, access, denied-access, capture, evaluator-invocation, and `C21` handoff events, but may not supply data or feedback to candidate or baseline.
16. `C21` may receive only the sealed immutable `C20` record and fixed contamination rules after candidate and baseline output capture; its static dependency and access closure must be evidenced separately, and its finding must remain a separate immutable evaluation record.
17. `C22` may depend on the accepted Gate 1 record, invoke `C20` and `C01-C21` only in the explicit control order in C1, receive only mechanical component statuses, and stop on an incomplete gate, mismatch, failure, or contamination.

## C3. Forbidden Dependency Edges

The following edges are prohibited:

1. `C01-C06 -> held-out assessment, evidence package, architecture expected result, generated indexes, or prior output`;
2. `C07/C08 -> filesystem, repository root, network, environment, prompt, retrieval, generated context, cache, Memory, logs, prior state, or evaluator-only material`;
3. `C09 -> C07/C08 internal helpers or outputs`;
4. `C09 -> held-out assessment`;
5. `C10/C11 -> held-out semantic expectations`;
6. `C13/C14/C18/C19/C21 -> C07/C08 input or internal state`;
7. `C15-C18 -> candidate or baseline before immutable output capture`;
8. `C18 -> C07/C08 semantic helpers`;
9. `C22 -> semantic classifications or expected result values`;
10. `C20 -> candidate or baseline data, status, result, or feedback`;
11. any evaluator-to-candidate feedback edge in the same evidence cycle.

## C4. Cycles

All semantic and evidence flow must be acyclic for one execution. No output, invariant result, evaluator result, contamination finding, or held-out value may return to candidate or baseline.

Repair and rerun require a new attributable implementation or evidence cycle. The original output remains preserved.

# Part D - Candidate-Owned Operations

The following operations belong only to `C07/C08`:

1. establish the complete available evidence inventory for account treatment;
2. distinguish source claims from Translations in the account;
3. decide admissibility;
4. assess evidence relevance to current purpose and Context;
5. accept, exclude, reject, or preserve unresolved evidence with reasons;
6. determine what shared provenance means for evidential dependence;
7. assess Knowledge applicability from candidate conditions and current evidence;
8. compare Observations or Translations for semantic effect;
9. form supported evidence relationships;
10. form and test materially different candidate accounts;
11. establish supported findings;
12. establish Context-specific significance;
13. preserve contradictions and credible alternatives;
14. identify assumptions and inference bases;
15. identify unknowns and evidence needs;
16. derive evidence-linked confidence and completeness;
17. select one formation status;
18. produce a structured account satisfying `MEU-C-01` through `MEU-C-16`;
19. produce concise synthesis faithful to the structured account;
20. refrain from Judgement, Authority, Action, communication, or intervention selection.

Candidate-internal decomposition is permitted only after map acceptance and only if every decomposed operation remains classified `UNDERSTANDING` inside `C07`.

# Part E - Shared Utility Rules

## E1. Permitted Shared Utilities

Candidate and baseline may share only utilities classified `TRANSPORT`, `INTEGRITY`, or non-semantic `VALIDATION`:

1. repository-root resolution anchored to module location, used outside candidate and baseline invocation;
2. exact byte reading, used outside candidate and baseline invocation;
3. SHA-256 hashing;
4. exact string or byte equality;
5. JSON parsing without revivers, defaults, coercion, or enrichment;
6. deep immutable cloning or freezing;
7. deterministic canonical serialization for equality evidence only;
8. identifier uniqueness checks;
9. reference-existence checks;
10. primitive and container type checks;
11. closed technical status-value checks on already produced output;
12. append-only evidence recording that does not inspect semantic content.

Each shared utility requires:

1. one classification;
2. one declared purpose;
3. complete callers;
4. complete dependencies;
5. evidence that it cannot access held-out content;
6. evidence that it does not alter semantic content;
7. focused tests before execution.

## E2. Forbidden Semantic Utilities

No shared or external utility may:

1. normalize meanings or synonyms;
2. compare Observation or Translation content;
3. detect a pattern, change, trend, anomaly, concern, emotion, or causal cue;
4. select, rank, filter, cluster, or group evidence by meaning;
5. infer source dependence or independence;
6. map source status to evidential weight;
7. determine Knowledge relevance or applicability;
8. generate relationship labels;
9. calculate semantic materiality or significance;
10. generate candidate findings;
11. generate assumptions, alternatives, contradictions, unknowns, or evidence needs;
12. derive Understanding confidence, completeness, or status;
13. summarize or synthesize evidence;
14. convert held-out fields into runtime labels;
15. embed case-specific expected language or branches.

If the candidate requires one of these operations, it must exist inside `C07/C08`, be classified `UNDERSTANDING`, and remain unavailable to all other components.

## E3. Utility Ambiguity Test

For every proposed utility, ask:

> Could changing this utility change which evidence matters, how evidence relates, whether Knowledge applies, why the evidence matters, what remains unknown, or what the current account says?

If yes, the utility is semantic and cannot be shared. If the answer is uncertain, implementation stops pending boundary review.

# Part F - Baseline Limitations

The `C09` accumulation baseline may:

1. receive a separate immutable value with the same structural digest as candidate input;
2. preserve every entity, source, Observation, Translation, Context item, and Knowledge candidate;
3. preserve exact source order or stable identifier order without semantic ranking;
4. concatenate or enumerate already supplied text;
5. produce a distinct accumulation record.

It must not:

1. use candidate internals;
2. use evaluator-only content;
3. compare prior and current values;
4. select evidence;
5. classify source dependence;
6. apply Knowledge;
7. form relationships;
8. assess significance;
9. derive alternatives or unknowns;
10. derive confidence, completeness, or Understanding status;
11. produce `MEU-C-*` concepts as though formed;
12. present accumulation as Understanding.

If the baseline becomes semantically stronger to make comparison more competitive, it becomes another `UNDERSTANDING` candidate and requires a separate governed boundary and assessment. It cannot remain the baseline under this review.

# Part G - Evaluator Separation

## G1. Separation Requirements

1. `C15-C18` must reside outside candidate and baseline dependency closure.
2. The held-out path and hash must not occur in candidate, baseline, loader, or shared-utility source or configuration.
3. Held-out bytes must not be read before immutable candidate and baseline output capture.
4. The evaluator must not import candidate semantic helpers.
5. The candidate must not import invariant or evaluator code.
6. Invariant failure and held-out failure must remain distinct.
7. Evaluator results must not return to candidate within the same evidence cycle.
8. Semantic equivalence assessment must follow structured-account assessment and cannot be satisfied by wording alone.
9. Human evaluator disagreement and uncertainty must remain attributable.
10. Contaminated output cannot receive a semantic pass.

## G2. Evaluator Evidence Required

Before execution, evidence must show:

1. static dependency closure for `C13-C19`;
2. no dependency path from `C07-C09` to `C15-C18`;
3. no dependency path from `C15-C18` to candidate internals;
4. actual file-read order proving held-out access follows immutable output capture;
5. exact held-out hash verification before parsing;
6. immutable evaluator inputs;
7. separate architecture-invariant and held-out-semantic results;
8. no output repair;
9. no expectation relaxation after output;
10. no candidate-derived expected result.

# Part H - Contamination Evidence Requirements

## H1. Static Evidence

Before execution, implementation evidence must enumerate:

1. every component and its accepted `C01-C22` mapping;
2. every source file implementing each component;
3. every import and transitive dependency;
4. every shared utility and caller;
5. every embedded string, case ID, field name, path, hash, and status constant;
6. every filesystem API reachable from candidate and baseline;
7. every environment, network, retrieval, prompt, model, generated-context, cache, log, Memory, and prior-state API reachable from candidate and baseline;
8. every denied document and held-out path occurrence;
9. ownership-location evidence for all twenty candidate operations in Part D;
10. absence of forbidden semantic utilities outside `C07/C08`.

## H2. Executable Evidence

Before execution permission, focused checks must prove:

1. runtime hash match permits loading;
2. runtime hash mismatch refuses loading;
3. held-out hash match permits post-output evaluation;
4. held-out hash mismatch refuses evaluation;
5. malformed JSON is rejected without defaults or repair;
6. broken references are rejected structurally;
7. candidate and baseline receive equal structural digests;
8. each receives a separate immutable value;
9. mutation attempts do not alter the other input or frozen source value;
10. candidate cannot read files, environment, network, retrieval, prompts, generated context, prior state, or held-out content;
11. baseline has the same denied access;
12. held-out access occurs after immutable output capture;
13. evaluator cannot mutate captured output;
14. invariant checks do not run before candidate output;
15. evaluator and invariant findings never become candidate input;
16. every actual input and access is recorded;
17. any unenumerated input blocks the run;
18. any ownership-violation probe fails closed.

## H3. Serialized Runtime Scan

The exact candidate input serialization must be scanned for:

1. held-out assessment ID, path, hash, status, and field names;
2. expected status;
3. expected evidence treatment;
4. expected relationship and support rationale;
5. expected Knowledge applicability;
6. required findings and significance;
7. expected alternatives, assumptions, unknowns, confidence, and completeness;
8. prohibited conclusions;
9. denied document names and generated-index snippets;
10. case-specific semantic labels not present in the frozen fixture.

Lexical absence is supporting evidence only. Dependency, access, and field-level reviews remain controlling.

## H4. Contamination Classification

| Finding | Required outcome |
| --- | --- |
| No unenumerated input and all boundaries evidenced | Eligible for execution-gate assessment, not automatically passed |
| Ambiguous utility or dependency | `IMPLEMENTATION STOPPED - BOUNDARY AMBIGUITY` |
| Understanding outside candidate | `IMPLEMENTATION STOPPED - OWNERSHIP VIOLATION` |
| Held-out access before output capture | `CONTAMINATED - NO EXECUTION OR CAPABILITY CLAIM` |
| Hash mismatch | `ARTIFACT INTEGRITY FAILURE - EXECUTION BLOCKED` |
| Unenumerated runtime input or access | `CONTAMINATED - NO EXECUTION OR CAPABILITY CLAIM` |
| Evaluator-to-candidate feedback | `CONTAMINATED - EVIDENCE CYCLE INVALID` |

# Part I - Execution Gate Criteria

## I1. Gate 1 - Boundary Acceptance

Required before implementation:

1. MARC accepts the Humanity / Formation implications of the component map;
2. Cyril accepts the Digital / Technology / Platform component and dependency map;
3. material disagreement, reservation, or ambiguity is resolved or recorded as blocking;
4. the two frozen hashes still match;
5. no component classification remains pending.

**Current status:** `PENDING - IMPLEMENTATION BLOCKED`.

## I2. Gate 2 - Implementation Conformance

Required after implementation and before execution consideration:

1. every implemented component maps exactly to accepted `C01-C22` responsibility;
2. actual dependency graph conforms to Part C;
3. every utility passes Part E classification;
4. all Understanding operations reside inside candidate;
5. baseline conforms to Part F;
6. evaluator conforms to Part G;
7. static contamination evidence in Part H passes;
8. no frozen artifact changed.

## I3. Gate 3 - Executable Isolation Evidence

Required before execution permission:

1. all Part H executable controls pass;
2. control fixtures required by `MEU-I-14` and `MEU-I-15` are separately governed and frozen;
3. applicable genuine-output and targeted-tamper checks exist;
4. execution coordinator demonstrably refuses incomplete gates;
5. exact candidate and baseline input equivalence is evidenced;
6. held-out access order is evidenced;
7. zero unenumerated inputs or accesses remain;
8. no contamination or ownership violation remains.

## I4. Gate 4 - Controlled Execution Decision

After Gates 1 through 3, a separate implementation evidence review must record exactly one:

1. `EXECUTION BLOCKED - OWNERSHIP OR ISOLATION FAILURE`;
2. `CORRECTION REQUIRED BEFORE EXECUTION DECISION`;
3. `PASSED FOR CONTROLLED CASE 001 EXECUTION`.

This document cannot make that decision.

# Part J - Ambiguity and Ownership Stop Rules

Implementation must stop if:

1. a component fits more than one classification;
2. reviewers disagree about a component classification;
3. a dependency edge is absent from Part C;
4. a shared utility's semantic effect is uncertain;
5. structural validation requires case meaning;
6. the baseline requires semantic comparison;
7. invariant evaluation requires candidate-internal helpers;
8. the evaluator requires candidate logic to derive expected meaning;
9. the coordinator needs an expected semantic value to sequence components;
10. a prompt, retrieval source, generated context, model, environment setting, cache, Memory, or prior state is proposed;
11. any Understanding operation appears outside `C07/C08`;
12. a frozen artifact or hash changes.

The recorded outcome must be one of:

1. `IMPLEMENTATION STOPPED - BOUNDARY AMBIGUITY`;
2. `IMPLEMENTATION STOPPED - OWNERSHIP VIOLATION`;
3. `IMPLEMENTATION STOPPED - FROZEN ARTIFACT CHANGED`.

Do not resolve ambiguity through naming, indirection, private helpers, fixture builders, or preprocessing.

# Part K - MARC and Cyril Acceptance Questions

## K1. MARC - Humanity / Formation

MARC should accept the map only if:

1. no component before candidate classifies Ellie or her internal state;
2. Ellie's direct account remains attributable evidence;
3. private unavailable evidence cannot enter through utility, configuration, retrieval, or prior state;
4. candidate uncertainty remains legitimate;
5. baseline accumulation cannot become a judgement about Ellie;
6. evaluator rejects unsupported emotional, medical, motivational, deceptive, or response conclusions;
7. contamination invalidates the evidence rather than being excused as helpfulness;
8. Judgement and intervention remain outside scope.

## K2. Cyril - Digital / Technology / Platform

Cyril should accept the map only if:

1. every component has one classification;
2. every dependency edge is permitted explicitly;
3. all semantic operations are enclosed by `C07/C08`;
4. shared utilities are mechanically non-semantic;
5. baseline and candidate receive equivalent frozen evidence;
6. held-out material has no pre-output dependency or access path;
7. static and executable contamination controls can falsify isolation claims;
8. hash checks fail closed;
9. execution remains impossible before all gates pass;
10. ambiguity stops work.

## K3. Pending Acceptance Record

This review does not fabricate MARC or Cyril acceptance.

The required next authority record must state:

1. evidence reviewed;
2. MARC finding;
3. Cyril finding;
4. component-map acceptance or rejection;
5. dependency-map acceptance or rejection;
6. utility-boundary acceptance or rejection;
7. reservations or disagreement;
8. conditions before implementation;
9. re-entry triggers;
10. exactly one final decision:
   - `BLOCKED`;
   - `CORRECTION REQUIRED BEFORE DECISION`;
   - `BOUNDARY MAP ACCEPTED - BOUNDED IMPLEMENTATION MAY BEGIN`.

# Part L - Current Decision and Next Step

## L1. Current Decision

**Decision:** `IMPLEMENTATION BLOCKED PENDING CORRECTED BOUNDARY MAP REASSESSMENT`

The four ambiguities recorded by Combined Authority have been addressed as a correction proposal without introducing a new component classification. That is an authored design proposal, not authority acceptance. The corrected map remains unaccepted until MARC and Cyril reassess it.

## L2. Exact Next Step

Conduct a new documentation-only MARC and Cyril Combined Authority reassessment of only the four corrections in Section 4 and their resulting component and dependency map.

Do not implement candidate, baseline, evaluator, schemas, helpers, runtime files, invariants, prompts, configuration, retrieval, generated context, or execution environment before that decision.

## L3. Re-entry Conditions

Return to this design stage if:

1. MARC or Cyril rejects or conditions any classification;
2. a required component is missing;
3. a component requires mixed responsibility;
4. a dependency edge must change;
5. a utility cannot be proven non-semantic;
6. a candidate operation must move outside `C07/C08`;
7. baseline or evaluator scope changes;
8. contamination evidence cannot be produced;
9. execution gates cannot fail closed;
10. either frozen artifact changes.

## Files Changed

This correction modifies only:

1. `docs/formation/HH0000_MULTI_EVIDENCE_UNDERSTANDING_CASE_001_IMPLEMENTATION_EVIDENCE_DESIGN_REVIEW.md`.

Documentation validation may refresh the four generated knowledge indexes from the complete dirty workspace. Their changes must not be attributed solely to this review.

No candidate, baseline, evaluator, schema, helper, runtime file, invariant, test, prompt, configuration, retrieval layer, generated context, execution environment, frozen artifact, Talk.Get, natural input, ordinary `form()`, CTRI, Context Door, Memory, Learning, Knowledge write, Judgement, Authority, or Action is created or changed.

## Validation

Corrected-proposal knowledge validation recorded:

1. command: `npm run knowledge`;
2. result: passed;
3. documents scanned: `654`;
4. concepts found: `43`;
5. generated indexes: `md_inventory.txt`, `md_headers.txt`, `hh_headers.txt`, and `knowledge_index.md`.

Corrected-proposal checks recorded:

1. final `npm run knowledge` rerun: passed with `654` documents and `43` concepts;
2. editor diagnostics for this review: no errors found;
3. runtime fixture SHA-256: matched the frozen value;
4. evaluator-only assessment SHA-256: matched the frozen value;
5. targeted `git diff --check`: passed for this review and the four generated indexes.

The final unchanged-state knowledge pipeline passed with `655` documents and `43` concepts; editor diagnostics reported no errors; both frozen SHA-256 values matched; and targeted `git diff --check` passed for this proposal and the four generated indexes. No runtime tests were required because this remained a documentation-only design review and no executable source was changed.

## Traceability

**Principle:** `constitution/02-CONSTITUTION.md`; people, truth, and seeking Understanding before assumption remain controlling.
**Theory:** `docs/theory/002-THEORY-OF-KNOWLEDGE.md`; `docs/theory/003-THEORY-OF-UNDERSTANDING.md`; `docs/theory/004-THEORY-OF-JUDGEMENT.md`; `docs/theory/007-THEORY-OF-CONTEXT.md`.
**Architecture:** `docs/architecture/TRANSLATION.md`; `docs/architecture/COMPANION-INTELLIGENCE-CORE.md`; the MEU architecture, Combined Authority review, evidence package, fixture freeze review, and bounded implementation-readiness review named above.
**Engineering:** Not Applicable - implementation evidence design only; implementation remains blocked pending map acceptance.
**Milestone:** Not Applicable - no formation or milestone completion is claimed.
**Evidence:** The frozen Case 001 artifacts, their hashes, controlling reviews, and this proposed boundary map; no implementation, runtime, natural-input, Talk.Get, live-human, or capability evidence is claimed.