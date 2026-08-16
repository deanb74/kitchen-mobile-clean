# HH-0000 Current Programme Orientation Andy Repository Retrieval Activation Boundary Review

**Status:** OUTCOME 1 - EXISTING NEUTRAL RETRIEVAL-ACTIVATING ROUTE IDENTIFIED
**Review date:** 2026-08-12
**Review type:** Read-only source and governance review
**Implementation effect:** None
**Test effect:** None - the failed synthetic test was not changed or rerun
**Contribution effect:** None
**Programme-source effect:** None - no real manifest or programme record was inspected

## 1. Governing Question

> What exact existing decision, classification, branch, or input condition causes `AndyDigitalColleague.runConstitutionalExamination` to activate repository retrieval, and can that condition be exercised with a neutral synthetic question without invoking recommendation, Reflection, Learning, contribution, programme judgement, or another prohibited consequence?

**Answer:** Repository retrieval is reached when the invocation survives the pre-retrieval returns. The smallest explicit ordinary input class that does so without recommendation meaning is `definition`, for which `analyzeConversation` sets `shouldRetrieve: true`. A neutral `what does ...` definition shape can use that existing route honestly.

No invocation was executed during this review.

## 2. Immediate Basis and Traceability

The immediate Evidence is:

1. `docs/formation/HH0000_CURRENT_PROGRAMME_ORIENTATION_BOUNDED_SOURCE_PROVIDER_SYNTHETIC_TEST_EVIDENCE.md`.

The controlling Authority history is:

1. `docs/formation/HH0000_CURRENT_PROGRAMME_ORIENTATION_BOUNDED_SOURCE_PROVIDER_SYNTHETIC_TEST_AUTHORITY_REVIEW.md`.

**Principle:** Truth before certainty, evidence before claims, and contribution only under explicit human Authority.

**Theory:** `docs/theory/004-THEORY-OF-JUDGEMENT.md`.

**Architecture:** Existing `AndyDigitalColleague` conversation classifier, public examination method, and injected repository-service boundary.

**Engineering:** Read-only trace of current source; no executable change or invocation.

**Milestone:** Not Applicable.

**Evidence:** Current `lib/academy/AndyDigitalColleague.ts` and the bounded synthetic test Evidence named above.

## 3. Exact Retrieval Activation Path

`runConstitutionalExamination(question)` performs these steps before repository search:

1. `analyzeConversation(question)` classifies the input and computes `shouldRetrieve`;
2. `prepareConversationState` updates private conversational state;
3. `buildContextualResponse`, judgement-follow-up detection, and formation-recall detection are evaluated;
4. a matching stored-judgement follow-up returns with `retrievalActive: false`;
5. a matching inherited formation recall returns with `retrievalActive: false`;
6. Compass, Authority, and Moral Compass advisories are computed;
7. a surfaced moral block or escalation returns with `retrievalActive: false`;
8. when `shouldRetrieve` is false and a contextual response exists, that response returns with `retrievalActive: false`;
9. a narrow direct capability question returns with `retrievalActive: false` even though the capability category is generally retrieval-eligible;
10. otherwise `retrieveFromRepository(question)` calls `this.repositoryKnowledgeService.search(question)` exactly once.

After search, one availability branch remains. If search returns no documents and the retained service has a non-null unavailable reason, Andy reports repository unavailability and returns `retrievalActive: false`. Otherwise processing continues and the final result reports `retrievalActive: true`.

No fallback repository service is selected on this path. `retrieveFromRepository` maps only the documents returned by the retained service.

## 4. Input Classification Boundary

The early classifier sets `shouldRetrieve: true` when the primary category is:

1. `identity`;
2. `definition`;
3. `capability`;
4. `purpose`;
5. `trust`;
6. `uncertainty`;
7. `review or recommendation`.

It also sets retrieval eligibility whenever review/recommendation vocabulary sets the separate `shouldRetrieveForAnalysis` flag, even if another category has primary precedence.

Important distinctions in current source are:

1. `definition` is recognized before retrieval by `what exactly is`, `what is a`, `what does`, `define`, or `definition`;
2. `review`, `repository`, `gap`, `recommend`, `priority`, and related terms enter `review or recommendation` before retrieval;
3. `explain` is not recognized by the early conversation classifier;
4. `explain` is recognized only later by `buildStructuredUnderstandingPlan`, after repository search has already occurred;
5. `compare`, `reflect`, `evaluate`, `advise`, `summarise`, and `identify gaps` are also later task-planner concepts, not all independent early retrieval classes;
6. a generic request or generic explanation that matches no early category becomes `unknown`;
7. `buildContextualResponse` always supplies an ordinary response for `unknown`, so the `!shouldRetrieve && contextualResponse` branch returns before search;
8. ordinary direct capability wording has its own later early return and therefore does not provide the smallest reliable integration route.

There is no separately named early `repository-grounded question`, `ask`, `investigate`, or general `knowledge request` class. Private conversation state may label several eligible categories as knowledge, but that label does not itself activate retrieval.

## 5. Exact Failed Input Classification

The failed authorised input was:

> Explain the fictional lantern catalogue boundary.

Source trace establishes:

1. it matches none of the early conversation category expressions;
2. its primary category is therefore `unknown`;
3. `shouldRetrieve` is `false`;
4. `prepareConversationState` does not convert that category into retrieval eligibility;
5. no stored deliberation exists on the fresh Andy instance, so the judgement-follow-up branch does not apply;
6. the input contains no formation-recall term, so formation recall does not apply;
7. the neutral wording does not require a moral or Authority override;
8. `buildContextualResponse` handles `unknown` through the ordinary participatory response path;
9. `!conversationAnalysis.shouldRetrieve && contextualResponse` is therefore true;
10. Andy returns that contextual response with `retrievalActive: false` before `retrieveFromRepository` is reached.

`repositoryKnowledgeService.search` was unreachable on that invocation. The result is expected under the present classifier ordering. No exception, provider rejection, injection failure, or production defect is established.

The later planner's `explain` recognition cannot help this input because that planner runs only after repository search.

## 6. Smallest Existing Neutral Retrieval Class

The smallest ordinary non-contribution class is `definition`.

The smallest neutral synthetic input shape is:

> What does [fictional synthetic concept] mean?

One concrete, unexecuted shape is:

> What does the fictional lantern catalogue boundary mean?

This shape is identified from source only. It was not submitted to Andy.

It is suitable in principle because:

1. `what does` assigns the existing `definition` category;
2. `definition` sets `shouldRetrieve: true`;
3. the contextual-response early return is guarded by `!shouldRetrieve` and therefore does not apply;
4. it is not the special direct capability branch;
5. the later task planner classifies `what does` as `explain`, not `review/recommend`;
6. it asks for factual explanation of invented material rather than priority, advice, contribution, status, or judgement;
7. it does not invoke Context Door, real founder intent, relational understanding, or programme content.

The shape must still avoid formation-recall terms, moral or Authority triggers, and recommendation vocabulary. Identifying it does not authorise its execution or a test edit.

## 7. State and Side-Effect Trace

### A. Necessarily Caused on the Successful Neutral Definition Route

If the neutral definition input survives the pre-retrieval branches and the supplied service is not reported unavailable:

1. private conversation state is prepared before retrieval;
2. Compass, Authority, and Moral Compass advisories are computed;
3. the retained repository service receives one `search(question)` call;
4. returned documents are mapped into `RetrievedDocument` values;
5. a structured `explain` plan, investigation results, prioritization, context summary, reasoning trace, and answer are built;
6. `activeDeliberation` is assigned the planner result, which is `null` for an `explain` task;
7. one transient private `conversationHistory` entry is recorded with retrieval active;
8. the method returns one result with `retrievalActive: true`.

The private conversation entry and private state update are not public `Memory`, confirmed Learning, feedback, contribution Evidence, or another turn.

### B. Conditionally Possible on Other Inputs or States

1. repository-unavailability reporting occurs only when search returns no documents and an unavailable reason exists;
2. deliberation is constructed only when the later task is `review/recommend` and its investigation is complete;
3. Reflection is built only when `activeDeliberation.recommendationReady` is true;
4. public Memory and confirmed Learning are written by the Reflection path only when that recommendation-ready reflection has confirmed learning;
5. judgement-understanding responses are possible only on a later call when an active deliberation already exists and the new input matches a judgement follow-up;
6. moral block or escalation can return before retrieval when the input independently triggers it;
7. recommendation output is possible on review/recommendation or priority routes, not merely because retrieval occurred.

### C. Not on the Neutral Definition Route

Current source shows no automatic:

1. recommendation or priority selection;
2. deliberation record for an `explain` task;
3. Reflection;
4. public Memory or confirmed Learning promotion;
5. feedback event;
6. automatic follow-up;
7. second repository search;
8. second conversation turn;
9. Context Door use;
10. real contribution.

These source findings identify the route. A future authorised executable probe would still need to falsify prohibited effects rather than treating source inspection as runtime acceptance.

## 8. Failed Test Interpretation

**A. TEST INPUT DID NOT ENTER THE EXISTING RETRIEVAL CLASS**

This is the most accurate interpretation because the input was classified as `unknown`, received an ordinary contextual response, and returned before repository search. The Evidence does not show that an eligible retrieval path ignored the injected provider, that every public retrieval route has prohibited consequences, or that production violated an accepted responsibility.

## 9. Evidence Status Preserved

The previous Evidence remains exactly bounded as follows:

**Direct provider closure:** DEMONSTRATED FOR THE AUTHORISED SYNTHETIC PROVIDER CASES.

**Andy integration closure:** NOT YET DEMONSTRATED.

This review neither downgrades the direct provider Evidence nor upgrades it into integration closure.

## 10. MARC Independent Review

**Question:** Is there an honest neutral way to ask Andy for repository-grounded information without pretending that synthetic work is a real contribution or pushing him into recommendation or formation work?

**Finding:** Yes. A definition question about a plainly fictional synthetic concept is an honest request for repository-grounded information. It does not ask Andy to choose priorities, understand a person, interpret founder intent, judge programme status, or advise consequential action. Treating any generated answer only as discarded integration output keeps the work an access-boundary test rather than a disguised contribution.

**MARC conclusion:** `NEUTRAL SYNTHETIC DEFINITION ROUTE IS A FAIR NON-CONTRIBUTION ACCESS TEST`.

## 11. Cyril Independent Review

**Question:** Does the current public API already contain a retrieval-activating route suitable for the closure integration probe, or would proving integration require a new test hook or production change?

**Finding:** The public API already contains the route. `runConstitutionalExamination` sends an eligible `definition` input through the retained injected service, and the later planner treats `what does` as explanation rather than review/recommendation. The failed call selected a non-eligible input shape at the early classifier; it did not expose a missing test hook, production defect, or architectural gap.

**Cyril conclusion:** `EXISTING PUBLIC DEFINITION ROUTE IS SUFFICIENT IN PRINCIPLE; INVOCATION CHOICE REQUIRES FRESH AUTHORITY`.

## 12. Outcome

**OUTCOME 1 - EXISTING NEUTRAL RETRIEVAL-ACTIVATING ROUTE IDENTIFIED**

The identified activating condition is an input classified as `definition`, with `shouldRetrieve: true`, that does not match an earlier judgement, formation, moral, Authority, or direct-capability return.

The smallest neutral synthetic shape is `What does [fictional synthetic concept] mean?` It is non-contribution because it asks only for factual explanation of invented supplied material and contains no real programme, priority, recommendation, person, or action consequence.

A future separately authorised probe must still falsify:

1. actual use of the injected provider;
2. absence of fallback or source expansion;
3. exact provenance retention;
4. absence of public Memory, Reflection, Learning, feedback, follow-up, external writes, and a second turn;
5. one-use refusal after the single Andy search.

## 13. Smallest Justified Next Question and Stop

The smallest justified next question is:

> May the existing failed synthetic integration probe receive fresh, exact Authority to replace only its neutral input with one source-established `definition` shape, execute once, preserve the demonstrated direct-provider Evidence, and record new integration Evidence without changing production or beginning contribution?

This review grants no such Authority.

Do not change or rerun the test, try the identified shape, modify production, create a provider or real manifest, inspect programme records, use Context Door, perform independent acceptance, or begin contribution.

Repository retrieval activation boundary review stops here.