# HH-0000 Current Programme Orientation Bounded Comparative Explanation Responsibility Review

**Status:** OUTCOME 2 - EXISTING RESPONSIBILITY IS CORRECT BUT A NARROW LOWER-LAYER CAPABILITY GAP EXISTS
**Review date:** 2026-08-12
**Review type:** Fresh read-only architecture and engineering responsibility review
**Immediate controlling record:** `docs/formation/HH0000_CURRENT_PROGRAMME_ORIENTATION_CONTRIBUTION_REQUEST_ACTIVATION_BOUNDARY_REVIEW.md`
**Implementation effect:** None
**Contribution effect:** None - Andy was not invoked and the approved real manifest was not accessed or assembled
**Authority effect:** None - the existing contribution Authority remains unchanged and unconsumed

## 1. Governing Question

> Does the existing Helping Hand / Andy architecture already contain a bounded responsibility capable of producing a comparative, repository-grounded explanatory account without entering recommendation, deliberation, Reflection, Memory or Learning, and is the current failure merely a missing connection; or is a genuinely new lower-layer responsibility required?

The controlling Outcome 3 is settled: the existing public route cannot support the contribution without prohibited effects. This review asks where the missing behaviour belongs and whether current internal data already forms it. It does not inspect the approved real manifest, design implementation, or reopen contribution Authority.

## 2. Required Human Behaviour

For this review, `BOUNDED COMPARATIVE EXPLANATION` is only a descriptive label for the required behaviour, not a proposed canonical component or capability name.

Given a human-authorised closed set of attributable records, the behaviour must form and communicate one account that:

1. states what records explicitly say;
2. distinguishes status, date, and scope;
3. identifies apparent agreement and disagreement;
4. identifies potentially stale or scope-limited statements;
5. identifies explicitly complete, stopped, and unresolved matters;
6. separates Observation from Inference and exposes the basis of inference;
7. preserves uncertainty and insufficiency;
8. identifies questions requiring human decision;
9. stops before priority selection, recommendation, status amendment, founder-intent inference, or Action;
10. creates no deliberation, Reflection, Memory, Learning, feedback, or automatic follow-on.

The human consequence is explanation for decision preparation. It is not the decision and does not select a course.

## 3. Existing Responsibility Map

| Owner | What it currently owns | What it does not own | Fit for required behaviour |
| --- | --- | --- | --- |
| Repository retrieval | Supplies attributable documents through one configured repository service and preserves returned provenance fields | Meaning, relationship formation, Judgement, or Action | Necessary input boundary, not the cognitive owner |
| Structured Understanding planner | Classifies tasks, creates sub-questions, prioritises retrieved documents, records investigation states, knowns, unknowns, and completion | A rich attributable record-comparison model on compare/explain paths | Correct orchestration location, currently underpowered |
| Understanding / Understanding Engine | Connects knowledge, explains relationships and meaning, distinguishes known/inferred/assumed/missing/changed, exposes uncertainty, document status/date/version, disagreement, and questions | Selection of the most appropriate course or final Action | Existing architectural owner of the required account |
| Companion Intelligence / answer communication | Chooses how formed Understanding is communicated within purpose and Authority | Manufacturing Understanding absent from lower-layer structures | Existing communication owner, currently receives insufficient comparative structure |
| Judgement / Judgement Engine | Evaluates Understanding, uncertainty, Context, consequences, responsibility, and Authority to choose an appropriate response or course | Mere explanation of record relationships without course selection | Bounds the stop; not required to form the account |
| Deliberation / review-recommend path | Alternatives, trade-offs, risks, expected benefits, confidence, recommended direction, and recommendation rationale | Neutral comparison that stops before course selection | Contains some useful evidence bookkeeping but exceeds the required consequence |
| Reflection / Memory / Learning | Considers outcome and records confirmed Learning after recommendation-ready deliberation | Pre-Judgement comparative explanation | Must remain inactive |
| Authority | Determines permitted reading, advice, modification, and execution; access does not create Authority | Truth, Understanding, or programme priority | Constrains source and consequence; humans retain decisions |

No current owner is disproven. The desired flow is already legitimate in the architecture:

```text
Attributable Evidence
        ↓
Relationships and explicit inference
        ↓
Bounded Current Understanding
        ↓
Explanation and unresolved human questions
```

It stops before recommendation, Action, outcome, Reflection, Memory, or Learning.

## 4. Retrieval Boundary

`AndyDigitalColleague` retains an injected `RepositoryKnowledgeService` directly. `retrieveFromRepository` performs one `search(question)` and maps only returned documents into `RetrievedDocument`, preserving `id`, `sourcePath`, `section`, `fragment`, `reason`, and text as `snippet`.

Retrieval therefore already supports attributable closed input through the separately accepted provider mechanism. Retrieval does not compare status, date, scope, or claims and should not absorb that responsibility. Source selection and access remain human-governed; repository presence does not establish relevance, authority, currentness, or priority.

The settled closed-provider mechanism and approved nine-record manifest are not reconsidered. No real manifest content was opened or assembled in this review.

## 5. Compare Path

The structured planner classifies `compare`, `contrast`, `difference`, or `differences` as task `compare`. That path is non-deliberative because a `DeliberationRecord` is created only when task is exactly `review/recommend`.

Current compare processing creates three generic sub-questions:

1. what is being compared;
2. what evidence supports each side;
3. what is materially different.

Each `InvestigationResult` contains only:

1. `subQuestion`;
2. `status` as `answered`, `partial`, `unsupported`, or `contradictory`;
3. one `evidenceSummary` string;
4. one `conclusion` string.

That structure is not enough for the required account:

1. it carries no source IDs or source-to-claim attribution;
2. it carries no document status, date, scope, or version;
3. it carries no explicit Observation or Inference field;
4. it carries no inference basis, alternatives, or materiality;
5. it carries no relationship between multiple record claims;
6. it carries no complete/stopped/unresolved classification;
7. it carries no human-decision question inventory.

`investigateSubQuestions` uses keyword matching and, for a generic match, copies only the first matching document's snippet into `evidenceSummary`. It does not compare both sides. Although `contradictory` exists in the type and completion inventory, no branch in `investigateSubQuestions` returns that status. The separate evidence evaluator can detect only one hard-coded ordering conflict: `understanding before action` versus `action before understanding`.

Uncertainty exists only coarsely through generic `partial` / `unsupported` conclusions, a generic `unknown` statement, and completion arrays. The compare path therefore does not already form the required comparative Understanding. Its information is not merely lost at rendering; most required distinctions do not exist before rendering.

## 6. Explain Path

The `explain` task is also non-deliberative. It asks:

1. what is being asked;
2. what evidence is directly relevant;
3. what should be explained clearly.

This is consistent with the human purpose of explanation and safely avoids recommendation-ready deliberation. The generic public output is partly a presentation limitation: `generateAnswerFromReasoning` does not render investigation results as a structured account and instead emits generic definition, constitutional-purpose, and broad evidence-synthesis language.

It is not only a presentation limitation. The same coarse `InvestigationResult` formation applies before rendering, so status/date/scope relationships, attributable agreement/disagreement, explicit inference bases, complete/stopped/unresolved classifications, and human-decision questions have not been formed for a renderer to expose.

Extending explanation to communicate genuinely formed record relationships belongs naturally within Understanding. Doing so would not absorb Judgement if it remains descriptive, preserves uncertainty, identifies questions rather than answers them, and produces no preferred course, recommendation, consequence selection, or Action. The lower layer must first form the bounded comparative account truthfully; answer rendering may then communicate it.

## 7. Review / Recommend Path

The review/recommend path adds seven sub-questions and creates a `DeliberationRecord` whenever its investigation inventory completes. Useful pre-recommendation material includes:

1. accepted and rejected Evidence with source paths;
2. supported, unsupported, and contradictory finding arrays;
3. assumptions;
4. unresolved questions;
5. confidence.

Those useful shapes do not prove that review/recommend is the correct owner. They are assembled inside `buildDeliberationRecord` together with:

1. alternatives;
2. trade-offs;
3. risks and expected benefits;
4. a recommended direction;
5. reasons for the recommendation and rejected alternatives;
6. `recommendationReady: true`.

The current implementation therefore bundles some evidence bookkeeping with a course-selecting deliberation. The desired behaviour should not reuse the resulting record and pretend its recommendation fields are irrelevant. The pre-recommendation concepts already belong to Understanding or generic evidence provenance; they should be formed there for this consequence rather than extracted after recommendation.

This bundling does not establish an architectural violation requiring a new separation component. Non-deliberative compare and explain paths already exist, and canonical Theory separates Understanding from Judgement. Their lower-layer comparative formation is incomplete. Reflection and Memory rules must remain unchanged.

## 8. Observation / Inference / Uncertainty

Current architecture explicitly requires Understanding to identify:

1. what is known;
2. what is inferred;
3. what is assumed;
4. what is missing;
5. what may have changed;
6. what requires confirmation.

The generic `Understanding` contract also already recognises:

1. `uncertainty`;
2. an optional `evidenceChain`;
3. relational evidence statuses `directly-supported`, `inferred`, `disputed`, and `unknown`;
4. optional `inferenceBasis`, alternatives, confidence, and material relational gaps.

These contracts show that Observation/Inference separation and inspectable relationships are not foreign responsibilities. They do not, by themselves, form the required programme-record account, and the specialised relational or Case 001 structures must not be silently repurposed outside their governed scope.

In Andy's current advisory path, `InvestigationResult` has no equivalent attribution or inference fields. `known` and `unknown` are generic task statements rather than record-derived findings. Contradiction and unsupported statuses exist nominally, but contradiction is not produced by the investigation function and uncertainty is not connected to status/date/scope claims or human decision materiality.

Human-decision questions can be surfaced without recommendation when they state what the records cannot settle and identify the responsible human boundary. Asking or recording such a question does not choose its answer or a course of action.

## 9. Understanding Boundary

Theory of Understanding defines Understanding as explaining what knowledge means, how it relates, why it matters, and what remains uncertain. The Understanding Engine architecture assigns it:

1. connecting facts and knowledge;
2. identifying relationships;
3. distinguishing known, inferred, assumed, missing, changed, and confirmation-required material;
4. producing a concise contextual explanation;
5. preserving source status;
6. identifying document agreement, authority, date/version, and the nature and resolvability of disagreement;
7. producing uncertainty, possible implications, and questions required to improve Understanding.

Current Understanding doctrine reinforces that an account may be evidence-linked, Context-scoped, uncertainty-honest, persistent but revisable, and distinct from truth, Judgement, Authority, and Action. It preserves contradictions, alternatives, assumptions, unknowns, and historical lineage without requiring permanent proof.

Bounded comparative explanation is therefore already an Understanding responsibility. It interprets attributable records into relationships and a scoped account. It does not require a new cognitive layer or canonical responsibility.

The Understanding Engine document is marked `Proposed Architecture`, so it cannot by status alone prove executable capability. Its responsibility allocation is nevertheless consistent with canonical Theory and current downstream Current Understanding doctrine. The engineering path currently under-implements that allocated responsibility for this specific account.

## 10. Judgement Boundary

Theory of Judgement defines Judgement as evaluating Understanding, uncertainty, and Context to determine the most appropriate course of action. Its distinctive responsibilities are choice, priorities, trade-offs, risk, consequences, Authority, and course adequacy.

The Fifth Judgement Theorem governs whether Understanding is adequate for a contemplated course and whether further inquiry is proportionate. It does not turn every explanation of uncertainty into Judgement. Understanding may exist without Judgement.

The desired account remains below course selection when it:

1. describes record claims and relationships;
2. labels inference and uncertainty;
3. identifies apparent conflict without resolving it beyond explicit Evidence;
4. identifies what humans must decide;
5. stops without preferring a priority, proposing Action, or deciding status.

Selecting whether to act, wait, inquire, amend, or prioritise would enter Judgement. The required contribution does not need those selections. Human Authority owns every programme consequence.

## 11. Reflection / Memory / Learning Boundary

In the current Andy route, Reflection is called only when `activeDeliberation?.recommendationReady` is true. `buildReflectionRecord` then guarantees non-empty confirmed Learning and writes a public Memory record.

Compare and explain currently produce no deliberation record, so they provide the correct no-persistence route shape. The missing comparative formation must remain on that side of the boundary.

No solution should:

1. weaken or bypass the existing Reflection condition after genuine recommendation;
2. create a recommendation-ready deliberation and suppress its consequences specially;
3. treat one explanation as an outcome or confirmed Learning;
4. write public Memory, update Current Understanding automatically, or begin feedback;
5. trigger another search, turn, question, or contribution.

Reflection follows outcome-bearing Judgement. It is not required to explain supplied Evidence once.

## 12. Missing Connection or Responsibility

The responsibility owner already exists: Understanding.

The current data is not already sufficient, so this is not a rendering-only or missing-wire finding. One narrow lower-layer capability is missing from the non-deliberative compare/explain path:

> Formation of an attributable comparative Understanding that preserves source claim, status/date/scope, relationship classification, Observation/Inference distinction and basis, uncertainty, complete/stopped/unresolved state, and human-decision questions, followed by bounded explanation of that formed account.

This is one coherent gap because all listed fields are required to form the same record-relationship account before communication. Rendering is part of the gap but cannot precede formation.

No new state machine, cognitive layer, engine, autonomous owner, general repository capability, or Judgement contract is justified. Existing generic Understanding concepts may guide consistency, but no existing specialised contract is automatically suitable or authorised for reuse. The smallest future technical boundary is the existing non-deliberative structured Understanding and answer path.

## 13. MARC Finding

For a developing human colleague, being handed status documents and asked what they collectively say, where they disagree, what remains unresolved, and what the human still needs to decide is primarily Understanding and explanation.

Some judgement is involved in relevance and materiality in the ordinary human sense, but the governed cognitive boundary is crossed only when the colleague selects a course, priority, recommendation, or consequence. A good colleague should naturally stop after giving an attributable account, naming inference and uncertainty, and returning unresolved decision questions to the human.

That work is genuine and useful even when it produces no recommendation. Treating it as recommendation merely because several records are compared would make responsible explanation unnecessarily consequential. Treating generic summary output as completion would under-serve the colleague and Founder.

**MARC finding:** `THE HUMAN TASK IS BOUNDED UNDERSTANDING AND EXPLANATION; IT SHOULD STOP AT EXPLICIT HUMAN-DECISION QUESTIONS BEFORE COURSE SELECTION`.

## 14. Cyril Finding

The existing retrieval injection and provenance mapping supply the correct closed input boundary. The existing `compare` and `explain` planner tasks supply the correct non-deliberative activation boundary. The existing Understanding architecture supplies the correct responsibility owner. The existing Reflection condition should remain untouched.

Current compare/explain investigation data is insufficient: it lacks source-linked claims, metadata distinctions, relationship records, inference basis, programme-state classifications, and human-decision questions. The separate answer renderer also ignores most investigation results. Correcting rendering alone would expose coarse generic conclusions, not the required Understanding.

The smallest technical responsibility boundary is therefore a narrow extension of existing non-deliberative Understanding formation and rendering. A new component or cognitive owner would duplicate an established responsibility. Reusing recommendation-ready deliberation would cross the consequence boundary.

**Cyril finding:** `EXISTING OWNERSHIP AND ROUTE ARE CORRECT; A NARROW ATTRIBUTABLE COMPARATIVE-UNDERSTANDING FORMATION AND RENDERING GAP REMAINS`.

## 15. Combined Outcome

**OUTCOME 2 - EXISTING RESPONSIBILITY IS CORRECT BUT A NARROW LOWER-LAYER CAPABILITY GAP EXISTS**

Bounded comparative explanation is already owned by Understanding and communicated through the existing colleague response path. Judgement owns any later course selection. Reflection, Memory, and Learning remain downstream of outcome-bearing recommendation and must not be activated.

Outcome 1 is not supported because required comparative data is absent before rendering. Outcome 3 is not supported because architecture already separates Understanding and Judgement, and non-deliberative compare/explain paths exist; their implementation is incomplete rather than responsibility-invalid. Outcome 4 would duplicate Understanding. Outcome 5 is unnecessary because source and architecture discriminate the boundary.

## 16. Exact Architecture Consequence

No architecture amendment or new responsibility is required.

The current architecture already permits:

```text
Evidence
  → attributable relationships
  → bounded Current Understanding
  → explanation
  → unresolved questions returned to humans
```

without recommendation, Action, Reflection, Memory, or Learning.

The engineering consequence is only that a future Authority question may consider filling the narrow non-deliberative Understanding formation-and-rendering gap in the existing compare/explain path. That future work would need to preserve attribution, source closure, uncertainty, Observation/Inference separation, human decision ownership, and zero recommendation-ready deliberation.

This finding does not decide whether implementation should occur. Need does not create Authority.

## 17. Exact Non-Consequences

This review does not:

1. modify production, tests, architecture, Theory, or any existing contract;
2. authorise implementation, design, refactoring, or a test;
3. create a canonical `BOUNDED COMPARATIVE EXPLANATION` component or capability;
4. require a new engine, state, owner, cognitive layer, or general repository feature;
5. amend, replace, consume, or reinterpret the existing contribution Authority;
6. invoke Andy, inspect or assemble the approved real manifest, or begin contribution;
7. create a provider, contribution record, Memory, Reflection, Learning, feedback, or another turn;
8. weaken recommendation Reflection or Memory rules;
9. move Judgement, priority, recommendation, status amendment, founder intent, or Action into Understanding;
10. establish correctness, capability, readiness, programme reconciliation, supersession, or programme priority;
11. reopen Context Door, Case 001, C18, or settled source-provider acceptance;
12. claim that generic or specialised existing relational contracts are directly reusable without further review.

## 18. Smallest Justified Next Question

> May one bounded implementation Authority permit the existing non-deliberative compare/explain Understanding path to form and render one attributable comparative account containing source observations, status/date/scope relationships, explicit inference bases, disagreement and uncertainty, complete/stopped/unresolved classifications, and human-decision questions, while creating no deliberation, recommendation, Reflection, Memory, Learning, feedback, Action, or follow-on?

This question is identified only. It does not authorise design, implementation, tests, contribution execution, source access, or amendment of the existing contribution Authority.

Responsibility review stops here.