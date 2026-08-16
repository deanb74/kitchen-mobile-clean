# HH-0000 Bounded Comparative Understanding Implementation Authority Review

**Status:** OUTCOME 2 - IMPLEMENTATION AUTHORISABLE AFTER ONE NARROW DEPENDENCY IS RESOLVED
**Review date:** 2026-08-12
**Review type:** Fresh documentation-only MARC and Cyril implementation Authority review
**Immediate controlling record:** `docs/formation/HH0000_CURRENT_PROGRAMME_ORIENTATION_BOUNDED_COMPARATIVE_EXPLANATION_RESPONSIBILITY_REVIEW.md`
**Implementation effect:** None
**Contribution effect:** None - Andy was not invoked and the approved real manifest was not inspected or assembled
**Authority effect:** No implementation Authority is granted; the existing contribution Authority remains unchanged and unconsumed

## 1. Governing Question

> May one bounded implementation task extend the existing non-deliberative compare/explain Understanding path so that it can form and render one attributable comparative account containing source observations, status/date/scope relationships, explicit inference bases, agreement/disagreement, uncertainty, complete/stopped/unresolved classifications, and human-decision questions, while creating no deliberation, recommendation, priority choice, Reflection, Memory, Learning, feedback, Action, or automatic follow-on?

This review decides implementation Authority only. It does not implement, test, execute a contribution, or reconsider the settled responsibility owner.

## 2. Controlling Understanding

The controlling Outcome 2 is settled:

> `EXISTING RESPONSIBILITY IS CORRECT BUT A NARROW LOWER-LAYER CAPABILITY GAP EXISTS`.

Understanding already owns relating attributable records, explaining collective meaning, distinguishing Observation from Inference, preserving uncertainty, exposing agreement and disagreement, and returning questions requiring human decision. Judgement owns course selection. Authority remains independent. Reflection, Memory, and Learning remain downstream of recommendation-ready deliberation and outcome.

The approved nine-record manifest, accepted closed one-use provider mechanism, Context Door block, advisory role, human decision ownership, and unconsumed contribution Authority are not reopened. No real programme record was inspected in this review.

## 3. Exact Capability Gap

The current non-deliberative compare/explain path retrieves attributable documents but does not form a comparative Understanding containing:

1. source-linked observations and bounded claims;
2. explicit authored status, date, and scope;
3. relationships among more than one source claim;
4. Observation / Inference separation and inference basis;
5. explicit agreement, apparent disagreement, qualification, possible supersession, unresolved relationship, or insufficient Evidence;
6. explicit complete, stopped, unresolved, active, or unknown state where source language supports it;
7. material questions that supplied Evidence returns to humans.

`InvestigationResult` is too coarse. It contains one sub-question, one status, one evidence-summary string, and one conclusion. Generic matching takes the first matching snippet rather than forming a relationship. `contradictory` is declared but not produced by `investigateSubQuestions`. The renderer cannot communicate comparative data that was never formed.

The gap remains internal to existing Understanding formation and rendering. It is not a programme-orientation feature, new cognitive owner, new engine, or recommendation variant.

## 4. Existing Code Surface

The minimum relevant production surface is `lib/academy/AndyDigitalColleague.ts`:

1. `buildStructuredUnderstandingPlan` classifies compare/explain and carries formed data toward reasoning and rendering;
2. `generateSubQuestions` defines generic compare/explain investigation questions;
3. `investigateSubQuestions` currently creates coarse results from first keyword matches;
4. `prioritizeDocumentsForUnderstanding` orders documents but must not determine authority, currentness, or programme priority;
5. `buildContextSummary` and `buildReasoningTrace` carry Understanding toward communication;
6. `evaluateRepositoryEvidence`, `detectConflictingEvidence`, and `summariseEvidence` provide only narrow or generic synthesis;
7. `generateAnswerFromReasoning` renders no multi-record compare/explain account;
8. `retrieveFromRepository` preserves the repository service's existing provenance fields;
9. `buildDeliberationRecord` and `buildReflectionRecord` define boundaries that must not be entered or changed.

Current generic contracts provide useful vocabulary but not an immediately sufficient implementation:

1. `lib/understanding/Understanding.ts` includes uncertainty, evidence chains, and relational statuses such as directly supported, inferred, disputed, and unknown;
2. `lib/academy/academyTypes.ts` exposes retrieved provenance and public examination output, but no comparative Understanding field;
3. `lib/academy/repositoryKnowledgeService.ts` returns source identity, title, source path, text fragment, section, score, and reason, but no structured authored status, date, scope, or lifecycle state.

Specialised relational and Case 001 contracts are outside this generic responsibility and are not authorised for reuse merely because they contain Observation or Inference terminology.

## 5. Minimum Data Shape

The smallest intended shape is an internal extension of structured Understanding, not a new public service or repository schema. Exact TypeScript naming remains subordinate to the unresolved dependency in Section 7.

The formed account must be able to represent:

### A. Attributable Observation

1. source `id`;
2. canonical `sourcePath`;
3. optional supplied `section`;
4. exact or bounded source claim/reference copied from supplied content;
5. explicitly authored status, date, and scope when available under an approved extraction rule;
6. observation classification such as source claim, authored metadata, or explicit lifecycle statement.

### B. Comparative Relationship

1. participating source-observation IDs;
2. relationship kind: agreement, apparent disagreement, qualification, possible supersession, unresolved relationship, or insufficient Evidence;
3. a descriptive relationship statement;
4. whether the relationship is directly stated or inferred;
5. explicit Evidence basis;
6. uncertainty and whether a human decision is required.

`possible supersession` must never mean supersession established. It is an unresolved relationship unless supplied Evidence explicitly states that one source supersedes another.

### C. Inference

1. inference statement;
2. IDs of supporting observations;
3. explicit inference basis;
4. confidence or uncertainty using existing generic concepts where suitable;
5. no hidden preferred source or conclusion.

### D. Programme-Neutral Explicit State

Where explicit source language supports it, an observation may be classified as complete, stopped, unresolved, active, or unknown/cannot determine. These values are a bounded descriptive set for the intended implementation, not a universal repository status taxonomy. Unknown is required whenever no approved rule supports another value.

### E. Human-Decision Question

1. the unresolved relationship or fact;
2. why supplied Evidence cannot resolve it;
3. why human Context, intent, or Authority is required;
4. no proposed answer or course.

The comparative result should remain internal unless a later review demonstrates a public contract need. `ExaminationRunResult` can continue exposing the bounded account through `answer`, existing provenance, context summary, and reasoning trace.

## 6. Observation / Inference Boundary

The implementation invariant is:

```text
SOURCE TEXT
  != OBSERVATION
  != INFERENCE
  != HUMAN DECISION
```

Source text is attributable authored content. An Observation is a bounded statement that the supplied source explicitly contains particular text or metadata. An Inference relates observations and must name its Evidence basis. A human decision resolves what Evidence and bounded inference cannot decide within Andy's Authority.

The renderer must label these categories and must not present an inference as source language. Two sources may be observed as carrying different statements. The system may infer that they appear inconsistent, time-separated, or scope-dependent when the Evidence basis is shown. It may not decide which governs from date, rank, order, confidence, or convenience.

If source A names a next target and source B later records no immediate dependency, both are observations. Any inconsistency, temporal qualification, or scope distinction is inference unless supplied text states the relationship. Current control remains a human question absent explicit supersession Evidence.

## 7. Status / Date / Scope Boundary

Current availability is:

| Information | Current structural availability | Consequence |
| --- | --- | --- |
| Source identity | `RepositoryDocument.id` and `RetrievedDocument.id` | Directly available |
| Canonical path | `sourcePath` | Directly available |
| Section scope | `section` | Directly available only for the supplied section identity; not proof of a document's full substantive scope |
| Bounded source content | `text` / `fragment` mapped to `snippet` / `fragment` | Directly available as authored text |
| Document status | Not a structured field | May be present as labelled text; requires governed extraction |
| Document date | Not a structured field | May be present as labelled text; requires governed extraction |
| Substantive scope | Not a structured field | May be explicit in prose or headings; requires governed extraction and may remain unknown |
| Complete/stopped/unresolved/active state | Not a structured field | Requires an explicit-language extraction rule; otherwise unknown |

No current Markdown parser or metadata contract is present on this route. Recognising labels, headings, dates, negation, or lifecycle phrases from text is parsing and interpretation. It must not be described as already structured or introduced silently as ad hoc regex.

**Single unresolved dependency:** a human-governed, programme-neutral authored metadata and bounded-claim extraction contract must define:

1. which exact Markdown structures or explicit labels count as status, date, and scope observations;
2. which exact source-language forms may support complete, stopped, unresolved, or active classification;
3. how verbatim claim references and source offsets or bounded text are retained;
4. how missing, conflicting, malformed, or ambiguous values become unknown rather than guessed;
5. whether extraction belongs inside the closed provider contract or inside non-deliberative Understanding formation;
6. how provider-side extraction avoids becoming human pre-interpretation;
7. the neutral synthetic falsifiers required before use.

Until that contract is settled, the exact implementation surface could require either an internal extractor or an optional repository metadata contract. Assuming either choice would exceed this review.

## 8. Comparative Relationship Rules

Comparison must evaluate relationships among all supplied observations relevant to the requested dimensions. It must not use:

1. first keyword hit as the conclusion;
2. first document as truth;
3. newest date as automatic authority;
4. filename or manifest order as priority;
5. retrieval score or rank as currentness;
6. document count as confidence;
7. omission as supersession or resolution.

The formed account must permit:

1. explicit agreement where supplied claims state materially compatible positions;
2. apparent disagreement where supplied claims conflict but control is not established;
3. qualification where status, date, or scope may explain a difference;
4. possible supersession only as inference unless a source explicitly establishes it;
5. unresolved relationship where Evidence cannot decide;
6. insufficient Evidence where a requested relationship has no adequate source basis.

Comparison is explanatory. It preserves multiple positions and their provenance; it does not adjudicate programme truth.

## 9. Compare / Explain Route

The smallest intended route is one common internal comparative-Understanding formation function used by existing non-deliberative tasks:

1. `compare` invokes it when multiple attributable records are to be related;
2. `explain` invokes it only when the human request asks what multiple supplied records collectively mean or asks for their relationships;
3. ordinary single-concept explain requests retain current behaviour;
4. neither route creates `DeliberationRecord`;
5. `review/recommend` remains unchanged and does not supply the implementation shortcut.

This refines option B: enrich both through one lower-layer Understanding formation seam. It avoids duplicate relationship logic and keeps the safe boundary before recommendation machinery.

The exact trigger for comparative explain must be generic and covered by neutral requests. It must not name Helping Hand, HH-0000, programme orientation, Case 001, or any approved manifest path.

## 10. Rendering Boundary

The renderer may communicate only fields present in the formed comparative Understanding. It may communicate, without mandatory hard-coded headings:

1. source observations;
2. agreement;
3. apparent disagreement and qualification;
4. explicit complete, stopped, unresolved, active, or unknown state;
5. labelled inference and Evidence basis;
6. uncertainty and insufficiency;
7. questions requiring human decision.

It must not manufacture a relationship, state, inference, or question from missing structure. It must not add a preferred source, priority, recommendation, implementation suggestion, founder intent, or course. Generic wording belongs in the existing answer renderer; no programme-orientation response template is authorised.

## 11. No-Persistence Boundary

The required invariant is:

```text
compare / comparative explain
  → no DeliberationRecord
  → no recommendationReady
  → no Reflection
  → no public Memory
  → no Confirmed Learning
  → no feedback
  → no automatic follow-on
```

The implementation must not alter `buildDeliberationRecord`, `buildReflectionRecord`, `Memory`, or Learning rules. It must prove that the result has no `deliberation`, `getLastReflection()` remains `null`, and `memory.all()` remains empty on a fresh Andy instance.

One public invocation must cause one provider search only. No automatic second turn, retry, follow-up question to Andy, additional retrieval, feedback event, or Action may occur.

## 12. Authority / Human Decision Boundary

The generic account is advisory Understanding only. It may say:

1. `The records do not establish this.`
2. `These statements appear inconsistent.`
3. `This may be scope- or time-dependent.`
4. `A human needs to decide which currently governs.`

It must not say:

1. `You should now do X.`
2. `X is the current priority.`
3. `Record A supersedes Record B.`

The third statement is permissible only when supplied Evidence explicitly states that relationship, in which case it must remain an attributable Observation rather than an inferred decision.

Understanding does not create read, advisory, modification, execution, or programme Authority. Human-decision questions expose the boundary; they do not delegate or answer the decision.

## 13. Minimum Falsifiers

A later implementation must use neutral synthetic records only and falsify at least:

1. two records explicitly agree;
2. two records explicitly disagree;
3. a later date without explicit supersession does not establish control;
4. different scopes that only appear contradictory are qualified rather than collapsed;
5. one record explicitly says completed;
6. one record explicitly says stopped;
7. unresolved wording remains unresolved;
8. insufficient Evidence does not become a guessed conclusion;
9. Observation is distinguishable from Inference;
10. source ID, path, section, and bounded claim provenance survive;
11. a human-decision question appears when Evidence cannot resolve a material relationship;
12. manifest order does not determine authority;
13. date alone does not determine authority;
14. rank alone does not determine authority;
15. no recommendation or proposed Action is produced;
16. no deliberation is produced;
17. Reflection remains absent;
18. public Memory remains empty;
19. Confirmed Learning remains absent;
20. no second search, automatic turn, retry, feedback, or follow-on occurs;
21. ordinary non-comparative explain behaviour remains intact;
22. existing review/recommend behaviour, including genuine recommendation readiness, remains unchanged.

The suite must also falsify every extraction rule settled by the dependency in Section 7, including malformed, missing, repeated, and conflicting metadata.

## 14. Regression / Preservation Boundary

Future focused validation must preserve:

1. ordinary definition/explain behaviour;
2. existing compare semantics except the explicitly authorised enrichment;
3. existing review/recommend output and deliberation;
4. recommendation-ready Reflection and Memory after genuine recommendation;
5. repository-service injection and provenance mapping;
6. accepted closed-provider source closure and one-use refusal;
7. Context Door and natural-input boundaries;
8. production Authority contracts;
9. Andy's Formation status;
10. no-feedback and no-automatic-follow-on boundaries.

Adjacent tests required after dependency resolution are:

1. a new focused neutral comparative-Understanding suite;
2. `lib/academy/__tests__/boundedSourceProvider.test.ts`;
3. `lib/academy/__tests__/deliberation.test.ts`;
4. `lib/academy/__tests__/reflection.test.ts`;
5. `lib/academy/__tests__/repositoryKnowledgeService.test.ts`.

No full repository suite is presently justified because the intended production change is local to Andy's internal structured Understanding and rendering. A material public or repository contract change caused by the unresolved dependency would require fresh scope and validation judgement.

## 15. Exact Proposed Code Surface

No code surface is authorised in this Outcome 2.

If the Section 7 dependency later approves internal extraction from supplied text without changing repository contracts, the smallest proposed surface is:

1. modify `lib/academy/AndyDigitalColleague.ts` only;
2. add `lib/academy/__tests__/boundedComparativeUnderstanding.test.ts` only.

Within `AndyDigitalColleague.ts`, a later Authority could permit:

1. internal comparative Observation, relationship, Inference, state, and human-decision-question types;
2. one common internal formation helper for compare and comparative explain;
3. bounded rendering from that helper's result;
4. carrying the internal result through the existing structured plan without adding it to the public `ExaminationRunResult` contract.

It would not permit changes to:

1. `lib/academy/repositoryKnowledgeService.ts`;
2. `lib/academy/academyTypes.ts` public contracts;
3. `lib/understanding/Understanding.ts`;
4. `lib/academy/Memory.ts`;
5. Reflection, deliberation, Learning, Authority, Context Door, provider, or production persistence code.

If the dependency instead requires provider-supplied structured metadata, this two-file surface is invalid and a fresh Authority review must name the repository contract and provider-test consequences. No schema migration, database migration, new package, service, engine, route, or parser is currently authorised.

## 16. MARC Finding

MARC finds the intended capability humanly appropriate: a developing colleague should be able to say what authorised records collectively state, where they agree or differ, what is inferred, what remains unknown, and what the human must decide. The colleague should not select a convenient source as truth, question beyond the supplied work, or feel pressure to produce a recommendation.

The proposed internal Understanding boundary preserves that dignity and usefulness. It avoids unnecessary permanence because no Memory or Learning follows. It avoids hidden Judgement because unresolved control returns to the human.

MARC rejects implementation before the extraction boundary is settled. A human colleague can recognise authored labels through language and context; software encoding that recognition must say which forms count and how ambiguity is preserved. Unstated parser assumptions could falsely turn prose into official status or turn silence into resolution.

**MARC finding:** `THE WORK IS GENUINE AND THE UNDERSTANDING BOUNDARY IS FAIR, BUT AUTHORED METADATA AND CLAIM RECOGNITION MUST BE GOVERNED BEFORE IMPLEMENTATION`.

## 17. Cyril Finding

Cyril finds that existing planner, retrieval mapping, non-deliberative task boundary, and renderer provide a narrow implementation seam. No new component, public state, architecture owner, database schema, repository traversal feature, or recommendation suppression is needed.

The present blocker is technical and semantic: current retrieval contracts expose text but not structured status/date/scope/state. A parser or provider metadata extension would materially determine attribution, tests, and code surface. Neither option can be assumed. The repository contains no verified generic contract on this route that resolves that choice.

Once the extraction contract is governed, internal formation plus rendering in `AndyDigitalColleague.ts` and one neutral test file may be sufficient. If the contract requires a repository interface change, the implementation is materially wider and must return to Authority.

**Cyril finding:** `THE CODE SEAM IS NARROW, BUT ONE METADATA-AND-CLAIM EXTRACTION CONTRACT MUST FIX THE INPUT SEMANTICS BEFORE CODE AUTHORITY`.

## 18. Combined Outcome

**OUTCOME 2 - IMPLEMENTATION AUTHORISABLE AFTER ONE NARROW DEPENDENCY IS RESOLVED**

The gap can be filled within existing Understanding ownership, without architecture change or prohibited persistence. A finite neutral falsifier suite can prove the intended boundary. However, the exact code surface cannot be authorised honestly until one programme-neutral authored metadata and bounded-claim extraction contract determines how text becomes attributable Observation without guessed status, scope, lifecycle state, or human pre-interpretation.

Outcome 1 is withheld because current source does not structurally expose required metadata and no parser contract is established. Outcome 3 is unnecessary because source inspection supports the settled architecture. Outcome 4 is unnecessary because the missing dependency is exact and discriminating.

## 19. Exact Authority Granted / Withheld

**Implementation Authority granted:** `NONE`.

**Authority granted by this record:** documentation-only identification of the single dependency, conditional code surface, falsifiers, validation boundary, and next question.

**Authority withheld for:**

1. production or test edits;
2. metadata or claim parsing;
3. repository contract changes;
4. provider changes or structured metadata injection;
5. new packages, schemas, services, routes, components, or public types;
6. Andy invocation, synthetic execution, real manifest access, or contribution execution;
7. amendment or consumption of existing contribution Authority;
8. recommendation, Reflection, Memory, Learning, feedback, Action, or programme decision.

Resolving the dependency does not automatically grant implementation Authority. A fresh review must confirm the resulting exact surface.

## 20. Validation Required

If a later fresh Authority permits the two-file internal-extraction surface, validation must run in this order:

1. focused new suite:

```text
npm test -- --runInBand lib/academy/__tests__/boundedComparativeUnderstanding.test.ts
```

2. adjacent regressions:

```text
npm test -- --runInBand lib/academy/__tests__/boundedSourceProvider.test.ts lib/academy/__tests__/deliberation.test.ts lib/academy/__tests__/reflection.test.ts lib/academy/__tests__/repositoryKnowledgeService.test.ts
```

3. typecheck:

```text
npm run typecheck
```

4. focused lint:

```text
npx eslint lib/academy/AndyDigitalColleague.ts lib/academy/__tests__/boundedComparativeUnderstanding.test.ts
```

The Evidence path would be:

`docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_IMPLEMENTATION_EVIDENCE.md`.

Every command, output, changed-file hash, direct observation, static support, inference, and limitation must be recorded. No real manifest or real contribution may be used for validation.

Any first focused-test failure, unlisted file need, public-interface need, parser ambiguity outside the approved contract, prohibited side effect, or regression stops the task. No repair run is permitted unless the later implementation Authority expressly defines one; otherwise failure is Evidence and requires fresh review.

## 21. Independent Acceptance Requirement

Passing implementation Evidence would not accept itself. A fresh read-only MARC and Cyril acceptance review must independently:

1. confirm exact Authority and changed-file conformity;
2. inspect the complete neutral falsifier suite;
3. reproduce focused and adjacent validation as authorised;
4. verify Observation / Inference / human-decision separation;
5. verify metadata extraction against the governed contract;
6. verify order, date, and rank do not decide authority;
7. verify compare/explain remains non-deliberative and non-persistent;
8. verify genuine recommendation Reflection and Memory remain unchanged;
9. distinguish demonstrated behaviour from static support and unknowns;
10. grant no real source, contribution, capability, or programme consequence automatically.

The independent acceptance record path would be:

`docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_IMPLEMENTATION_ACCEPTANCE_REVIEW.md`.

Only accepted focused Evidence could support later reconsideration of request and contribution Authority.

## 22. Smallest Justified Next Question

> What exact programme-neutral authored metadata and bounded-claim extraction contract may convert supplied Markdown text into attributable status, date, scope, explicit lifecycle-state, and bounded claim Observations while preserving malformed, missing, conflicting, or ambiguous material as unknown, and should that extraction belong to the closed provider input contract or the existing non-deliberative Understanding formation path?

This question is identified only. It does not authorise contract creation, parser design, provider change, implementation, tests, Andy invocation, source access, or contribution execution.

Implementation Authority review stops here.