# HH-0000 Multi-Evidence Understanding C18 Evaluator Evidence Design Review

**Status:** C18 BOUNDED COMPARISON-EVIDENCE DESIGN READY FOR COMBINED AUTHORITY REVIEW

**Review type:** Documentation-only bounded MARC and Cyril design review

**Controlling review:** `docs/formation/HH0000_MULTI_EVIDENCE_UNDERSTANDING_EXPERIMENTAL_OBSERVABILITY_GAP_COMBINED_REVIEW.md`

**Implementation effect:** None - no implementation, type, schema, evaluator, candidate, held-out assessment, fixture, test, helper, configuration, or runtime is changed

**Execution effect:** None - no campaign, cycle, candidate, baseline, evaluator, C20-C24 path, preservation path, or frozen artefact is invoked

**Authority effect:** Design finding only - no implementation, schema, evaluator-change, execution, correction, or capability authority is granted

**Evidence access:** Authored controlling architecture, readiness, coordination, and preservation records only; no `MEU-I-14` semantic evidence, Attempt 1, implementation, test, execution package, other cycle, or frozen artefact was inspected

## 1. Design Question

> What minimum attributable comparison record should C18 produce so that a future mismatch can be reviewed without reconstructing meaning, inspecting implementation, widening semantic access, or treating the held-out expectation as answer authority?

The design objective is `MINIMUM SUFFICIENT ATTRIBUTABLE OBSERVABILITY`.

It is not maximum observability, preservation of more reasoning, or authority to change any existing experimental component.

## 2. Controlling Observability Failure

The controlling review established only that:

1. the V3 evidence preserved candidate-carried acceptance and source-attribution metadata;
2. it preserved evaluator mismatch findings;
3. the authorised review boundary did not expose separately attributable held-out material meaning or a comparison rationale capable of discriminating the five live outcomes;
4. all 16 independent evidential units therefore remained unresolved;
5. the gap concerns attributable comparison evidence, not a proved candidate, held-out, evaluator, implementation, or architecture deficiency.

This review does not reopen those units, inspect their semantics, or infer how any one should be resolved.

## 3. C18 Ownership Boundary

### 3.1 Accepted responsibility

C18 already owns post-capture semantic comparison between:

1. the immutable candidate output captured by C12; and
2. the frozen evaluator-only assessment transported, hash-verified, parsed, and structurally validated by C15-C17 after capture.

An attributable record of what C18 compared and what finding C18 formed belongs wholly to that accepted `EVALUATION` responsibility. Recording the basis of C18's own finding does not create a new semantic owner.

### 3.2 Responsibilities that do not move

| Component | Responsibility retained | Prohibited expansion |
| --- | --- | --- |
| `C12` | Immutable candidate and baseline output capture before evaluator access | Does not interpret, repair, normalize, or produce comparison rationale |
| `C15-C17` | Post-capture held-out byte transport, identity verification, parsing, and structural validation | Do not compare semantic meaning or expose held-out content upstream |
| `C18` | Compare immutable candidate meaning with validated held-out expectations and produce its attributable evaluation record | Does not repair candidate output, rewrite held-out requirements, grant truth authority, or feed execution |
| `C20` | Contemporaneous mechanical access, invocation, ordering, handoff, and seal facts | Does not contain semantic rationale or determine comparison meaning |
| `C21` | Fixed-rule contamination assessment of the sealed C20 record | Does not reinterpret or merge the C18 finding |
| `C22` | Fixed fail-closed sequencing and opaque status routing | Does not inspect comparison content or branch on semantic values |
| `C23` | Deterministic whole-package transport and byte I/O | Does not select, redact, summarize, or interpret C18 fields |
| `C24` | Byte identity, preservation chronology, receipt, and integrity | Does not decide semantic or experimental meaning |

### 3.3 C18 prohibitions

The C18 record must not:

1. feed C07/C08, C09, another cycle, prompt, retrieval, configuration, Memory, cache, prior state, or future execution;
2. repair, normalize, rewrite, enrich, or replace the immutable C12 candidate value;
3. modify, relax, rewrite, or replace the held-out assessment;
4. contain chain-of-thought, hidden reasoning, unrestricted deliberation, or broad semantic logs;
5. turn the held-out requirement into truth or the evaluator finding into truth;
6. select correction, response, Authority, or Action.

## 4. Minimum Comparison Record

### 4.1 Admission test

Every accepted field below satisfies all five tests:

1. it enables a precise later discrimination;
2. identity, reference, digest, or closed status is used instead of copied semantics wherever sufficient;
3. omission would recreate an attribution, criterion, rule, rationale, uncertainty, or linkage gap observed at the level established by the controlling review;
4. its semantic responsibility remains wholly within C18;
5. its privacy exposure is no greater than the comparison requires.

Conceptual field names describe responsibilities only. They do not authorise serialized names, a schema, a TypeScript type, or implementation syntax.

### 4.2 Accepted fields

| Conceptual field | Purpose | Evidence type | Precise later discrimination enabled | Minimum form | Capture timing | Privacy implication | Requirement | Failure behavior |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Comparison record identity | Makes one observation, inference, disposition, and uncertainty set attributable as one record | Provenance | Distinguishes one comparison from aggregation, duplication, or another mismatch | Stable identity | Created when C18 opens the comparison; fixed at finalization | None beyond linkage | Mandatory | Record is not attributable; evaluation evidence is `INCOMPLETE` and cannot support candidate failure |
| Cycle identity | Binds the comparison to one governed evidence cycle | Provenance | Prevents cross-cycle substitution or reconstruction | Identity/reference | Received as fixed cycle context before C18; recorded at finalization | None | Mandatory | Comparison is not evaluated for claim purposes |
| Candidate capture identity | Binds C18 to the immutable C12 output | Integrity provenance | Distinguishes actual candidate evidence from a reconstructed, mutable, or later value | C12 capture reference | Available before held-out loading; recorded by C18 | None | Mandatory | `NOT_EVALUATED`; held-out comparison must not proceed |
| Candidate value reference | Identifies the exact candidate field or proposition compared | Semantic provenance | Enables candidate deficiency, evaluator deficiency, acceptable difference, or unknown to be tested against the actual value | Exact path plus immutable-value identity; use an existing capture digest where sufficient | During comparison, after C12 | Reveals structure, not additional content | Mandatory for an evaluated comparison | Comparison is `INSUFFICIENT`; no candidate-failure inference |
| Candidate material projection | Preserves only the material candidate meaning C18 applied when the referenced value cannot be reviewed without opening broader content | Bounded semantic observation | Lets a reviewer test whether C18 omitted, distorted, or fairly represented candidate meaning | Smallest bounded projection linked to the candidate path; never a rewritten candidate value | During comparison | Conditional semantic exposure; may include person-related meaning | Conditional; prohibited when the exact reference alone suffices | If necessary but unavailable, comparison is `INSUFFICIENT`; do not widen automatically |
| Held-out assessment identity | Establishes the frozen evaluator-only artefact used | Integrity provenance | Detects expectation substitution, version drift, or unverified held-out material | Assessment identity, version, expected hash, and observed verified hash by reference | Only after C12 and C16 verification | No held-out semantics | Mandatory | `NOT_EVALUATED`; preserve identity failure separately |
| Held-out requirement reference | Identifies the exact requirement applied | Semantic provenance | Enables review of whether the evaluator applied the correct requirement and whether that requirement itself was deficient | Requirement identity and exact path | During C18 comparison | Reveals requirement structure, not copied content | Mandatory for an evaluated comparison | Comparison is `INSUFFICIENT`; no candidate-failure inference |
| Held-out material criterion | Preserves the smallest material requirement actually applied, including permitted latitude or exclusion only where the held-out reference cannot provide bounded later review | Bounded semantic criterion | Enables candidate deficiency, held-out deficiency, evaluator deficiency, acceptable difference, and unknown to be distinguished | Reference first; otherwise a bounded projection of only the applied criterion | During comparison, never before C12 | Highest held-out exposure in the record; remains evaluator-only and access-controlled | Conditional; required only when identity/path cannot preserve reviewability | If necessary but unavailable, comparison is `INSUFFICIENT`; never copy the full assessment by default |
| Comparison rule identity | Establishes the governed rule used to compare candidate and criterion | Evaluation provenance | Distinguishes semantic difference from evaluator-rule deficiency or rule substitution | Rule identity and version | Fixed before comparison; recorded by C18 | None | Mandatory | `NOT_EVALUATED` if absent before comparison; `INCOMPLETE` if not preserved |
| Applicable material dimensions | States which dimensions were material to this comparison | Bounded evaluation context | Shows whether C18 treated proposition meaning, attribution, uncertainty, structure, representation, or another dimension as material | References to selected closed dimension identities only | Selected under the comparison rule during C18 evaluation | Low unless a bounded qualification is conditionally required | Mandatory for evaluated comparisons; explicit empty only where the rule permits a dimension-free comparison | Comparison is `INSUFFICIENT` when materiality cannot be attributed |
| Observed comparison | Records what C18 literally detected at the selected dimensions before interpretation | Observation | Distinguishes detected match, difference, absence, contradiction, or inability to observe from later inference | Per selected dimension: closed observation status plus exact candidate and criterion references; bounded note only if statuses cannot discriminate | During C18 evaluation | Low by default; bounded content conditional | Mandatory for evaluated comparisons | Comparison is `INSUFFICIENT`; C18 must not invent an observation |
| Bounded inference | Records C18's limited interpretation of the observations | Inference | Distinguishes a literal difference from an inference that it is material, immaterial, unsupported, contradictory, or indeterminate | Closed inference class plus references; bounded projection only when the class cannot preserve the basis | After observation and before disposition | Conditional semantic exposure | Mandatory for evaluated comparisons; explicit `Not Applicable` for not-evaluated | Comparison is `INSUFFICIENT`; no hidden rationale may be substituted |
| Semantic comparison disposition | Records the semantic result of this comparison without deciding experimental gate status | Conclusion | Separates material equivalence, material difference, insufficient comparison, and not evaluated | One closed disposition | After observation and inference | None beyond conclusion | Mandatory | Missing disposition makes the C18 record `INCOMPLETE`; it cannot silently become failure |
| Evaluator-condition status | Records whether the experiment's accepted evaluator condition was satisfied, separately from semantic meaning | Evaluation conclusion | Prevents "material difference" from collapsing into "candidate failed" and keeps gate interpretation distinct | Closed status with rule/condition reference | Derived only after semantic disposition | None | Mandatory | Status is `NOT_DETERMINABLE`; C22 may receive only its opaque mechanical projection |
| Disagreement and credible alternatives | Preserves attributable competing interpretations of the same observation | Disagreement | Enables evaluator-discrimination deficiency, acceptable difference, or genuine unknown where one reading is not conclusive | Closed presence/status plus bounded alternative identities or projections | During inference, before disposition | Conditional semantic exposure | Conditional; mandatory when disagreement or a credible alternative is detected | If detected but not preservable, comparison is `INSUFFICIENT`; disagreement must not be suppressed |
| Uncertainty and insufficiency | States what C18 could not establish and which missing evidence or linkage caused the limit | Uncertainty | Preserves genuine unknown and distinguishes evidential incompleteness from candidate difference | Closed uncertainty status, reason identity, and exact missing/limiting reference; bounded note only if needed | Before disposition finalization | Low by default; no speculative personal content | Mandatory, including an explicit no-material-uncertainty state | Missing state makes the record `INCOMPLETE`; unknown must not be converted to candidate failure |
| Candidate evidence references | Links the candidate proposition or projection to its own attributable support and limits where material to the comparison | Semantic provenance | Tests whether candidate meaning is supported, unsupported, contradicted, or not reviewable | Exact immutable references and closed limitation statuses | During observation/inference | References avoid duplicating personal evidence | Conditional on the comparison rule requiring support review; otherwise explicit `Not Applicable` | Required support that cannot be referenced makes comparison `INSUFFICIENT` |
| Held-out evidence references | Links the applied criterion to attributable support, exclusions, and limits where material | Semantic provenance | Enables held-out expectation deficiency and unknown to be tested without treating expectation as authority | Exact evaluator-only references and closed limitation statuses | During observation/inference after held-out verification | Held-out references remain access-controlled; no source-content copy | Conditional on the criterion relying on attributable evidence; otherwise explicit `Not Applicable` | Required support that cannot be referenced makes comparison `INSUFFICIENT` |
| Evaluator identity | Attributes the finding to the evaluator contract that formed it | Evaluation provenance | Detects evaluator or version substitution and enables evaluator-discrimination review | Evaluator identity and contract/version reference | Fixed before C18 invocation; recorded at finalization | None | Mandatory | `NOT_EVALUATED` if unavailable before comparison; record `INCOMPLETE` if lost |
| Boundary linkage references | Links the C18 record to C12 capture, C16 verification, and the C20 evaluator-invocation event without absorbing their responsibilities | Mechanical provenance references | Establishes post-capture ordering and the factual evaluation boundary | Identities/references only | References available at C18 finalization | None | Mandatory | Record is `INCOMPLETE`; no clean isolation claim may be inferred |
| Record finalization state | Establishes that the four C18 layers were completed together and made immutable before package handoff | Evaluation-record integrity | Distinguishes a complete finding from partial or reconstructed rationale | Closed finalized/incomplete state and immutable record identity; byte preservation remains C23/C24 | At C18 handoff | None | Mandatory | Preserve `INCOMPLETE`; do not invent missing fields or disposition |

### 4.3 Why projections are conditional

A candidate or held-out material projection is permitted only when all of the following hold:

1. identity, exact path, immutable reference, digest, and closed statuses cannot preserve the material basis for later review;
2. the projection is limited to the proposition or criterion actually compared;
3. it does not include surrounding personal evidence, the whole account, or the whole held-out assessment;
4. it is visibly an evaluator projection, not a replacement for the referenced source value;
5. its later semantic opening remains subject to separate exact-path authority.

C18 must not create a projection merely for readability or hypothetical debugging.

## 5. Rejected / Unnecessary Fields

## Evidence We Deliberately Do Not Preserve

| Rejected field or content | Reason for rejection | Lower-exposure substitute where needed |
| --- | --- | --- |
| Chain-of-thought, hidden reasoning tokens, scratch work, or unrestricted evaluator deliberation | Hidden reasoning is unnecessary, reconstruction-friendly, privacy-expanding, and not attributable evidence of the comparison basis | Observation statuses, bounded inference class, exact references, disposition, and uncertainty |
| Full candidate account copied into each comparison record | Duplicative and expands personal semantic exposure | C12 capture identity, exact candidate path, immutable-value identity, and conditional bounded projection |
| Full held-out assessment or full requirement copied into the record | Duplicative, leaks evaluator-only content, and can make expectation appear authoritative | Assessment identity/version/hash, exact requirement path, and conditional bounded criterion projection |
| Separate candidate digest where capture identity, exact path, and an existing immutable digest already identify the value | Adds no discrimination | Reuse the existing immutable-value identity; require a digest only when those references do not uniquely bind the value |
| Universal material-dimension checklist on every comparison | Records irrelevant semantic metadata and invites checklist compliance rather than material evaluation | Only selected applicable dimension identities |
| Free-form rationale without bounds | Can become hidden deliberation, broad logging, or post-hoc reconstruction | Closed observation and inference classes with a bounded projection only when essential |
| Numeric score, confidence percentage, or similarity metric without a separately governed comparison rule | Does not explain material meaning and may conceal arbitrary evaluator behavior | Rule identity, selected dimensions, observed statuses, and semantic disposition |
| Full prompts, examples, retrieval results, configuration, Memory, caches, or prior state | Unnecessary to understand the comparison and prohibited from evaluator-to-candidate feedback | C20 access and invocation identities plus C21 contamination finding |
| Implementation source path, call trace, stack trace, or test result | Useful only for hypothetical debugging and outside this design question | Evaluator contract/version and mechanical invocation identity |
| Broad source-person content | Expands access to the person beyond the compared proposition | Exact attributable evidence references; bounded projection only if indispensable |
| Baseline, invariant, tamper, other-cycle, or cross-cycle semantic content | Unrelated unless a separately authorised comparison expressly depends on it | Explicit `Not Applicable` or separately governed exact reference |
| Repair recommendation, corrected candidate text, preferred held-out wording, or rerun instruction | Moves from evaluation into correction or Action | Preserve only uncertainty, disagreement, and comparison disposition |
| Speculative future-debug fields or unbounded logs | Fail the current discriminatory-value test | Exclude until a governed comparison demonstrates necessity |
| Duplicated timestamps inside C18 where C20 chronology identities establish order | Adds mechanical duplication without semantic discrimination | C20 event references; retain a C18 time only if a later authority proves chronology cannot otherwise be bound |

## 6. Closed Disposition Model

### 6.1 Semantic disposition

The minimum semantic vocabulary contains four concepts:

| Design-level concept | Meaning | What it does not mean |
| --- | --- | --- |
| Material equivalence | Candidate and held-out criterion preserve materially equivalent meaning across the applicable dimensions | Identical wording, universal truth, or capability success |
| Material difference | Candidate and held-out criterion differ on at least one applicable material dimension | Candidate deficiency, held-out correctness, or experiment failure by itself |
| Comparison insufficient | C18 cannot establish equivalence or difference from the attributable comparison evidence | Candidate failure or acceptable difference |
| Not evaluated | A prerequisite prevented semantic comparison from beginning or completing | Material difference |

These meanings are selected; their eventual serialized labels are not frozen by this design review.

### 6.2 Separate evaluator-condition status

Semantic disposition and experimental condition status must remain separate.

The condition-status vocabulary must express, at minimum:

1. accepted evaluator condition satisfied;
2. accepted evaluator condition not satisfied;
3. condition not determinable;
4. condition not evaluated.

For example, a material difference may cause the accepted evaluator condition not to be satisfied, but that does not establish whether the candidate or held-out expectation is deficient. C22 may consume only an opaque mechanical projection of condition status. It must not receive or inspect semantic disposition or rationale.

Technical evaluator failure, missing record evidence, and C21 contamination are also separate from semantic disposition. They may invalidate claim-bearing use while preserving whatever incomplete evidence was actually produced.

### 6.3 Overlays, not extra dispositions

Disagreement, credible alternatives, uncertainty, and insufficiency reasons are overlays linked to observation and inference. They do not multiply the semantic disposition vocabulary or silently convert uncertainty into difference.

## 7. Material-Dimension Model

C18 must preserve a per-comparison applicability register containing only dimensions that the identified comparison rule makes material for that requirement.

Potential governed dimension concepts include:

1. proposition meaning;
2. negation;
3. attribution;
4. evidence provenance;
5. uncertainty;
6. relationship structure;
7. identifier or remapping identity;
8. grouping;
9. granularity;
10. ordering;
11. wording or representation;
12. prohibited conclusion;
13. Knowledge applicability;
14. contextual significance.

This list is a design vocabulary, not a universal checklist. A C18 record must not emit every dimension with `not applicable`. It records only selected material dimensions, their rule references, and the closed observation made for each.

Wording, ordering, grouping, granularity, or identifier differences are not material by default. The identified comparison rule must make their relevance explicit. A dimension not governed by the applied rule cannot be introduced after observing the candidate merely to justify a finding.

If the rule requires a material dimension that cannot be identified or observed, the disposition is comparison insufficient. C18 must not substitute a nearby dimension or infer materiality from evaluator preference.

## 8. Provenance and Linkage Model

### 8.1 Comparison provenance

One C18 comparison record links, without merging:

```text
comparison record identity
  -> cycle identity
  -> C12 candidate capture identity
  -> exact candidate value reference
  -> C16 verified held-out assessment identity
  -> exact held-out requirement reference
  -> evaluator and comparison-rule identities
  -> selected material dimensions
  -> observation
  -> bounded inference
  -> semantic disposition
  -> disagreement and uncertainty
  -> attributable evidence references
```

The held-out expectation remains comparison evidence. It is not answer authority. The C18 disposition remains an evaluator finding. It is not truth authority.

### 8.2 C20 and C21 relationship

C18, C20, and C21 remain separate immutable records:

1. C20 records the mechanical C18 invocation, post-capture ordering, held-out access, handoff, and sealing facts;
2. the C18 record references the corresponding C20 invocation identity but contains no C20 chronology copy;
3. C21 assesses only the sealed C20 record under fixed contamination rules;
4. the final campaign package links the C18 record identity, C20 record identity, and C21 finding identity;
5. C21 does not edit, endorse, reject, or reinterpret C18 semantic content;
6. C18 does not determine contamination.

Because C21 occurs after the C20 seal, its final finding is linked by the campaign package rather than written retrospectively into the finalized C18 record.

### 8.3 Package and preservation linkage

The immutable campaign package must include the finalized C18 record unchanged and link it to its cycle evidence. C22 routes only the complete package and opaque statuses. C23 serializes and preserves the whole package without semantic selection. C24 proves package-byte identity and preservation integrity through its separate receipt and chronology.

C23/C24 preservation proves what bytes survived. It does not prove that the C18 finding is semantically correct.

## 9. No-Feedback Dependency Graph

```text
C12 immutable candidate capture
        |
        +-----------------------------+
        |                             |
        v                             v
C18 receives immutable value   C15 -> C16 -> C17
        |                             |
        +-------------+---------------+
                      v
          C18 semantic comparison
                      |
                      v
       finalized C18 comparison record
                      |
                      v
       immutable campaign evidence package
                      |
                      v
              C22 opaque routing
                      |
                      v
          C23/C24 byte preservation
```

Mechanical evidence remains parallel and linked:

```text
C20 post-capture access and C18 invocation facts
                      |
                      v
              sealed C20 record
                      |
                      v
             C21 contamination finding
                      |
                      v
      identity linkage in campaign package
```

There is no edge from the C18 record, held-out criterion, evaluator finding, C20 record, C21 finding, campaign package, C22 status, C23 bytes, or C24 receipt to:

1. C07/C08 candidate formation;
2. C09 baseline;
3. candidate or baseline input;
4. another cycle;
5. prompt, retrieval, configuration, Memory, cache, log, prior state, or future execution.

Candidate and baseline remain frozen before held-out loading and comparison. No record may repair, resume, tune, retry, or enrich them.

## 10. Fail-Closed / Insufficiency Model

| Missing or failed requirement | Required preserved state | Prohibited inference or action |
| --- | --- | --- |
| Candidate capture identity or immutable candidate value | `NOT_EVALUATED`; preserve missing prerequisite | Do not load held-out material or infer candidate failure |
| Candidate exact path or immutable-value identity | `COMPARISON_INSUFFICIENT` if evaluation began | Do not reconstruct candidate meaning from evaluator prose |
| Held-out assessment identity/version/hash | `NOT_EVALUATED`; preserve integrity failure separately | Do not parse, normalize, update hash, or compare |
| Held-out requirement identity/path | `COMPARISON_INSUFFICIENT` | Do not infer the requirement from a mismatch message |
| Material criterion when a reference is insufficient | `COMPARISON_INSUFFICIENT` with missing-criterion reason | Do not copy a broader held-out subtree automatically |
| Comparison-rule identity/version | `NOT_EVALUATED` if absent before comparison; otherwise record incomplete | Do not invent or infer a rule after seeing output |
| Required material dimension | `COMPARISON_INSUFFICIENT` | Do not substitute evaluator preference |
| Observed comparison | `COMPARISON_INSUFFICIENT` | Do not invent an observation from the expected disposition |
| Bounded inference | `COMPARISON_INSUFFICIENT` | Do not substitute hidden reasoning or post-hoc rationale |
| Semantic disposition | C18 record `INCOMPLETE`; condition status not determinable | Do not default to material difference or gate failure |
| Uncertainty state | C18 record `INCOMPLETE` | Do not treat silence as certainty |
| Required candidate or held-out evidence reference | `COMPARISON_INSUFFICIENT` with exact missing reference class | Do not widen access or duplicate source content automatically |
| C12/C16/C20 boundary linkage | C18 record `INCOMPLETE`; isolation not established | Do not claim clean post-capture evaluation |
| C18 record finalization | Preserve incomplete record if possible; fail closed before claim-bearing package completion | Do not reconstruct, complete, or reseal rationale later |
| C21 contamination finding adverse or unavailable | Preserve C18 semantic evidence separately but mark experimental use contaminated or not determinable | Do not convert contamination into candidate semantic difference |
| Package inclusion or C23/C24 preservation incomplete | Evidence not reviewable or preservation incomplete | Do not claim the C18 record survived authoritatively |

Unknown remains a valid preserved outcome. Observability failure must never silently become candidate failure, held-out correctness, evaluator correctness, or acceptable difference.

## 11. MARC Independent Finding

### Observation

The design exposes less of the person and less held-out content than full semantic capture because immutable identities and exact references are the default. Candidate and held-out projections are conditional, proposition-bounded, visibly evaluator-authored, and separately access-controlled.

### Assessment

1. **Dignity:** The person is not reduced to an evaluator mismatch; the record points to bounded evidence and preserves limits.
2. **Privacy:** Broad candidate, source, and held-out content is excluded. Semantic projection is permitted only when lower-exposure forms cannot preserve reviewability.
3. **Attribution:** Observation, inference, conclusion, disagreement, uncertainty, candidate meaning, and held-out criterion remain distinguishable.
4. **Person/evidence separation:** References identify evidence used in one comparison; they do not convert a person or account into an evaluator conclusion.
5. **Authority humility:** Held-out evidence remains a governed expectation, not truth. Evaluator evidence remains a finding, not truth.
6. **Unknown and disagreement:** Both are explicit and cannot be collapsed into candidate failure.
7. **Least access:** Later access remains exact-path, unit-specific, and separately authorised.
8. **Non-repair:** C18 cannot normalize or improve candidate or held-out content.
9. **Anti-over-capture:** Chain-of-thought, deliberation, full semantic copies, broad logs, and hypothetical-debug content are expressly rejected.
10. **Challengeability:** A reviewer can challenge what was compared, the material rule, the observation, the inference, and the evidence limits without seeing substantially more of the person than that comparison requires.

**MARC finding:** `HUMANITY / FORMATION MINIMUM ATTRIBUTABLE OBSERVABILITY DESIGN ACCEPTED FOR COMBINED AUTHORITY REVIEW`.

MARC does not grant implementation or semantic-access authority.

## 12. Cyril Independent Finding

### Observation

The accepted graph already supplies every required owner: C12 captures immutable candidate output; C15-C17 isolate and validate held-out material after capture; C18 owns semantic comparison; C20/C21 own mechanical access and contamination evidence; C22 routes opaque statuses; C23/C24 preserve bytes and integrity.

### Assessment

1. **C18 ownership:** Every semantic field records C18's own comparison input, basis, or finding. No new semantic owner is required.
2. **Dependency closure:** C18 depends only on accepted post-capture candidate, held-out, invariant/isolation, and provenance inputs. No upstream edge is added.
3. **Immutable ordering:** Candidate capture identity is mandatory before held-out loading or evaluation.
4. **Held-out isolation:** Identity and references are preferred; conditional criterion projections remain evaluator-side and post-capture.
5. **Record completeness:** The record separately preserves observation, inference, conclusion, uncertainty/disagreement, and exact provenance.
6. **Closed semantics:** Four semantic dispositions are sufficient; evaluator-condition, technical failure, and contamination statuses remain separate.
7. **Provenance:** Exact identities, versions, paths, hashes, and references prevent reconstruction and substitution.
8. **Package inclusion:** The finalized C18 record enters the immutable package unchanged.
9. **C20/C21 linkage:** Records link by identity and never merge responsibilities.
10. **C22 opacity:** C22 receives only opaque mechanical condition/completion statuses.
11. **C23/C24 blindness:** Preservation components transport and verify the whole package without semantic inspection.
12. **No feedback:** No comparison, criterion, rationale, package, or preservation edge returns to candidate, baseline, or another cycle.
13. **Failure states:** Missing attribution produces not-evaluated, insufficient, incomplete, contaminated, or preservation-incomplete evidence rather than invented rationale.
14. **Architecture re-entry:** No proposed responsibility exceeds C18's accepted evaluation ownership or requires a new component. Re-entry becomes mandatory if a future design requires another component to select material dimensions, form semantic rationale, or reinterpret C18 output.

**Cyril finding:** `DIGITAL / TECHNOLOGY / PLATFORM C18 COMPARISON-EVIDENCE DESIGN ACCEPTED FOR COMBINED AUTHORITY REVIEW`.

Cyril does not grant implementation, schema, test, or execution authority.

## 13. Combined Design Finding

**Decision:** `C18 BOUNDED COMPARISON-EVIDENCE DESIGN READY FOR COMBINED AUTHORITY REVIEW`.

The design is ready because:

1. every accepted semantic responsibility remains within C18;
2. every non-semantic component remains within its accepted classification;
3. every field has a specific discriminatory purpose;
4. lower-exposure identities, references, digests, and closed statuses are preferred over copied meaning;
5. conditional semantic projections are bounded and separately authorised for later access;
6. semantic disposition remains distinct from experimental condition, technical failure, contamination, and preservation status;
7. missing evidence fails closed without becoming candidate failure;
8. the dependency graph remains acyclic and no-feedback.

This finding is design readiness only. It does not accept a schema, permit C18 modification, or authorise implementation, tests, semantic inspection, correction, or execution.

## 14. Smallest Justified Next Step

Create one separate documentation-only MARC and Cyril Combined Authority review of this design.

That review must decide whether the minimum field responsibilities, least-access protections, closed semantics, failure behavior, package placement, and unchanged C12/C15-C24 boundaries are sufficient to permit a later bounded implementation-authority question.

It must not implement, define schema syntax, modify an evaluator, inspect execution evidence, change frozen artefacts, or authorise execution directly.

## 15. Final Design Test

> If this minimum C18 record had existed during Gate 4 V3, would a later authorised reviewer have been materially better able to discriminate the 16 unresolved units without seeing substantially more semantic information?

**Answer:** Yes, at design level.

The record would have linked each comparison to the exact immutable candidate proposition, exact frozen held-out requirement, applied rule, selected material dimensions, literal observation, bounded inference, separate semantic disposition, disagreement and uncertainty state, and attributable support or limitation references. That would have let a later authorised reviewer test candidate deficiency, held-out deficiency, evaluator-discrimination deficiency, acceptable representational difference, and genuine unknown without reconstructing the basis from mismatch prose.

The design achieves that improvement without default copies of candidate content, held-out content, source-person evidence, prompts, implementation traces, or evaluator deliberation. Only a proposition-bounded candidate or criterion projection is conditionally preserved when identity and exact reference cannot provide reviewability.

This answer does not claim that any V3 unit would have resolved, does not reinterpret the V3 evidence, and does not authorise creation or use of the record.

Design review stops here.