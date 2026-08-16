# HH-0000 Andy First Live Formation Conversation Technical Execution Plan

**Status:** Authorised implementation plan — partially superseded as recorded below  
**Date:** 2026-08-09  
**Authorised correction date:** 2026-08-10  
**Subject:** HH-0000 Andy Context Door  
**Purpose:** Define the smallest technical execution path for allowing supplied human context to enter Andy's existing understanding-formation process.

---

## Authorised Technical-Plan Correction — 2026-08-10

The plan below is preserved as the historical candidate analysis that established the formation-specific implementation locality. The following corrections supersede only the conflicting parts of that plan and control the authorised implementation.

**Authority:** `docs/formation/HH0000_CONTEXT_DOOR_PRE_IMPLEMENTATION_GATE.md` — `PASSED FOR BOUNDED IMPLEMENTATION` through the recorded MARC and Cyril Combined Authority decision on 2026-08-10.

1. Context Door produces an inspectable governed relationship/context-memory **candidate**. It does not write the result through `Memory.remember()` in Version 1.
2. Every Andy clarification question and restatement must evidence the complete `Understanding -> Judgement -> Authority -> conversational Action` chain.
3. The existing Action boundary maps an insufficient or human-required Judgement to a blocked Action even when the selected Action is the clarification communication needed to involve the human and Authority permits that communication.
4. The smallest shared correction is a narrowly bounded clarification-communication rule: only a governed clarification communication selected because Understanding requires human input may be emitted when Authority independently permits that communication. Consequential progression and every unrelated Action remain blocked.
5. `PersonContextStore` is not the initial Context Door persistence mechanism. It does not represent the complete governed Understanding, correction, lifecycle, alignment, and evidence-separation boundary required here.
6. The full append-only Context Door event/evidence record remains separate from personal or relationship memory. A relationship/context-memory candidate contains only governed Understanding and relevant permitted Context, never the conversation transcript merely because it occurred.

The following historical statements are therefore superseded:

1. direct Context Door use of `Memory.remember()` at alignment closure;
2. any requirement to record a transcript as the relationship-memory outcome;
3. the statement that no governed conversational Action is produced;
4. the conclusion that no shared Action-boundary correction is required.

No new Authority model, conversation engine, memory service, persistence mechanism, UI, API, Learning promotion, Knowledge promotion, or general Andy capability is authorised by this correction.

---

## Scope

This plan is derived from:

1. `docs/formation/HH0000_ANDY_FIRST_LIVE_FORMATION_CONVERSATION.md`;
2. `docs/formation/HH0000_ANDY_FIRST_LIVE_FORMATION_CONVERSATION_RUNTIME_CAPABILITY_MAPPING.md`;
3. `docs/formation/HH0000_ANDY_FIRST_LIVE_FORMATION_CONVERSATION_MINIMUM_RUNTIME_ADDITION.md`;
4. the current Andy and COS formation runtime.

It does not implement anything, authorise implementation, settle architecture, or create a capability claim.

The technical goal is one formation-specific doorway:

```text
Inherited evidence
  -> initial formed understanding
  -> explicit request for human context
  -> supplied human context
  -> updated formed understanding
  -> Andy restatement
  -> human alignment decision
  -> bounded evidence and memory record
```

The goal is not a conversation engine.

---

## Preserved Invariants

1. **Human context is supplied, never inferred.** Missing values remain unresolved.
2. **Understanding is formed, not retrieved.** Retrieval supplies evidence; COS `form()` produces Understanding.
3. **Andy advises, humans decide.** The flow creates no approval, execution, or decision authority.
4. **Alignment before action.** Completion of the flow does not begin contribution or mark formation complete.
5. **Evidence remains attributable.** Repository evidence, runtime interpretation, and human statements retain distinct provenance.

---

## Smallest Change Surface

The proposed implementation surface is limited to:

1. one new formation-specific module: `lib/academy/formation/contextDoor.ts`;
2. one export update: `lib/academy/formation/index.ts`;
3. one focused test file: `lib/academy/formation/__tests__/context-door.test.ts`.

Types should be colocated in `contextDoor.ts` unless implementation shows a concrete need to separate them.

No initial change is required in:

1. `lib/academy/AndyDigitalColleague.ts`;
2. `lib/academy/JourneyRunner.ts`;
3. `lib/academy/Memory.ts`;
4. `platform/cos/understanding-formation/`;
5. ordinary repository retrieval;
6. authority or advisory runtimes.

---

## 1. Existing Runtime Functions Reused

| Existing function | Source | Use in Context Door | Boundary |
| --- | --- | --- | --- |
| `RepositoryKnowledgeService.search()` | `lib/academy/repositoryKnowledgeService.ts` | Retrieve inherited repository evidence for the fixed formation question | Never used to infer current human context |
| `translateDocumentsForFormation()` | `lib/academy/formation/translationAdapter.ts` | Translate inherited repository documents into evidence-linked institutional meaning | Repository evidence only |
| `repositoryDocumentsToFormation()` | `lib/academy/formation/knowledgeAdapter.ts` | Convert retrieved documents into governed formation knowledge | Human statements are not converted into governed knowledge |
| `assessReadiness()` | re-exported by `lib/academy/formation/index.ts` | Check whether the initial or updated formation inputs still require observation, research, or clarification | Readiness to call `form()`, not alignment or contribution readiness |
| `validateFormationInputs()` | `platform/cos/understanding-formation/readiness.ts` | Preserve the COS structural check where a direct report is required | Does not decide whether human context is true or sufficient |
| `form()` | `platform/cos/understanding-formation/formation.ts` | Form both initial and updated Understanding from translations, context, and knowledge | The only understanding synthesis path |
| `checkAllInvariants()` | `platform/cos/understanding-formation/invariants.ts` | Verify no meaning without evidence, visible uncertainty, and complete evidence chains | Structural verification only |
| `Memory.remember()` | `lib/academy/Memory.ts` | Record one bounded memory after human alignment or an explicitly incomplete close | Must not turn execution into formation completion |

### Existing functions explicitly not reused

1. `runConstitutionalExamination()` is not the Context Door entry point. Its ordinary path includes recommendation, deliberation, priority, and advisory behaviour beyond this alignment flow.
2. `JourneyRunner.run()` is not extended. Its fixed opening-response-reasoning-feedback sequence has no human clarification and restatement movement.
3. `runFormationStage()` is not called. It can mark a stage inherited and therefore carries a stronger outcome than this conversation proves.
4. `buildReflectionRecord()` is not used. It is private and tied to recommendation-ready deliberation rather than human-confirmed alignment.

---

## 2. Existing Adapters Reused

### Reused unchanged

1. `translateDocumentsForFormation()` provides Andy's institutional translation of repository documents.
2. `repositoryDocumentsToFormation()` provides governed formation knowledge from repository documents.
3. `assessReadiness()` provides the inherited pre-formation route toward asking when required context is absent.
4. COS `FormationInput`, `FormationContext`, `FormationInstitutionalContext`, and `FormationSituationalContext` provide the existing input contract.

### Not suitable for human context

`assembleFormationContext()` and `contextEntriesToInstitutional()` from `lib/annie/formation/contextAdapter.ts` must not be used for the supplied human context because:

1. they accept venue-oriented `ContextEntry` data;
2. they label institutional entries as `venue-context`;
3. they derive urgency from an `AnnieThought`;
4. they do not preserve human provider, supplied time, or confirmation status.

Reusing them would misclassify the source and could infer context that humans did not supply.

### Minimum new projection

`contextDoor.ts` needs one private, formation-specific projection that:

1. converts supplied human statements into `Observation` values with `source: "human"`;
2. converts supported human statements into evidence-linked `Translation` values without changing their meaning;
3. projects current situation, role, need, ownership, uncertainty, and feedback context into existing `FormationContext` fields and institutional entries with `source: "relationship"`;
4. retains provider, time, status, and original wording in the Context Door record;
5. does not convert human context into `FormationKnowledge`.

This projection is necessary because COS `form()` builds its summary from translations and knowledge. Institutional-context values alone affect context and provenance but do not enter the formed summary.

The projection must preserve human wording. It is an adapter, not a new interpretation or reasoning mechanism.

---

## 3. Minimum New Types and Interfaces

Only formation-specific contracts should be introduced.

### A. Context category and status aliases

`ContextDoorCategory`:

1. current situation;
2. current need;
3. current role;
4. human ownership;
5. open uncertainty.

`HumanContextStatus`:

1. confirmed human context;
2. human interpretation;
3. unresolved.

These aliases prevent free-form categories from silently expanding scope.

### B. `ContextDoorHumanInput`

Minimum fields:

1. stable input ID;
2. category;
3. exact supplied statement or an explicit unresolved marker;
4. status;
5. provider;
6. supplied time.

No field receives a runtime-generated default other than a technical ID or capture timestamp. Content, status, and provider are human supplied.

### C. `ContextDoorFeedbackRoute`

Minimum fields:

1. owner;
2. route or channel;
3. expected timing;
4. what feedback will distinguish;
5. unresolved fields.

The runtime stores this input exactly. It does not choose the owner or route.

### D. `ContextDoorPhase`

Closed phase values:

1. inherited interpretation;
2. awaiting human context;
3. updated understanding;
4. awaiting human alignment;
5. complete;
6. incomplete.

This is state for one fixed formation flow, not a general conversation-state model.

### E. `ContextDoorRecord`

Minimum fields:

1. conversation ID and date;
2. current phase;
3. repository evidence references;
4. initial `Understanding`;
5. requested context categories and reasons;
6. supplied `ContextDoorHumanInput` values;
7. feedback route;
8. updated `Understanding`, when formed;
9. Andy's bounded restatement;
10. unresolved questions;
11. human alignment record, when supplied;
12. provenance.

This one record is both flow state and emitted evidence. A second generic session or transcript model is not required for the first implementation.

### F. `ContextDoorAlignment`

Minimum fields:

1. status: aligned, partly aligned, or not yet aligned;
2. reasons;
3. corrections;
4. confirmed by;
5. confirmed time.

Only a human may supply this value.

### Existing types retained

The plan reuses these types unchanged:

1. `RepositoryDocument`;
2. `Observation`;
3. `Translation`;
4. `FormationInput` and its context and knowledge types;
5. COS `Understanding`;
6. `MemoryRecord`.

The final memory write should project the bounded outcome into existing `MemoryRecord` fields: lesson, principles, mentor feedback, relationship understanding, formation status, unresolved questions, provenance, and recorded time. The full `ContextDoorRecord` remains the evidence output; it is not forced into general memory fields.

---

## Execution Steps

### Step 0: Confirm pre-implementation evidence

Do not begin implementation until the minimum-runtime-addition analysis requirements are met:

1. human-approved conversation contract;
2. dated human input specimen;
3. expected evidence specimen;
4. provenance and memory boundary confirmation;
5. focused acceptance scenarios.

### Step 1: Begin the Context Door

Add one exported formation function that:

1. accepts an injected `RepositoryKnowledgeService`;
2. searches for the fixed first-live-formation question;
3. calls `translateDocumentsForFormation()`;
4. calls `repositoryDocumentsToFormation()`;
5. builds initial `FormationInput` without invented human context;
6. calls `assessReadiness()` and `form()`;
7. calls `checkAllInvariants()`;
8. returns a `ContextDoorRecord` in the awaiting-human-context phase with explicit context requests.

If current human context is absent, the function must not fill it from repository documents, conversation history, or defaults.

### Step 2: Supply human context

Add one exported formation function that:

1. accepts an existing Context Door record, supplied human inputs, and supplied feedback route;
2. validates required provenance and explicit unresolved markers;
3. applies the private human-context projection;
4. combines human translations with existing repository translations;
5. calls `assessReadiness()`, `form()`, and `checkAllInvariants()` again;
6. produces the bounded restatement;
7. returns the record in awaiting-human-alignment or incomplete phase.

No recommendation, action, or role authority is generated.

### Step 3: Record human alignment

Add one exported formation function that:

1. accepts the current record and a human-supplied `ContextDoorAlignment`;
2. preserves human corrections and remaining unknowns;
3. marks the record complete only when the human status is aligned;
4. otherwise marks it incomplete or keeps it open according to the approved conversation contract;
5. writes one bounded `MemoryRecord` through an injected `Memory` only at the approved recording point;
6. returns the final evidence record.

Completion means only that this alignment flow closed. It does not mean formed, capable, ready to contribute, or authorised.

### Step 4: Export only the bounded surface

Update `lib/academy/formation/index.ts` to export:

1. the three Context Door functions;
2. the formation-specific input, record, feedback, phase, and alignment types.

Do not export internal projection or rendering helpers.

---

## 4. Minimum Test Scenarios

One focused test file should contain the following minimum scenarios.

### 1. Missing human context opens the door

Given inherited repository evidence and no human context:

1. initial Understanding is formed from inherited evidence;
2. phase is awaiting human context;
3. missing categories are requested;
4. no human values are inferred;
5. no recommendation, action, alignment, or formation-complete claim appears.

### 2. Human context enters through evidence-linked translations

Given supplied human context:

1. observations use `source: "human"`;
2. translations retain evidence IDs and supplied meaning;
3. institutional context uses `source: "relationship"`;
4. provider, time, status, and exact wording remain in the record;
5. COS invariants pass.

### 3. Unknown and correction remain human-owned

Given one unresolved value and one correction:

1. the unresolved value remains unresolved;
2. the correction remains attributed to its provider;
3. the runtime does not replace either with repository inference;
4. the restatement reflects the correction and names the unresolved item.

### 4. Restatement is alignment-focused

The restatement contains:

1. current situation;
2. Andy's bounded role;
3. current human need;
4. human decision ownership;
5. remaining unknowns;
6. context-request route;
7. feedback route.

It contains no recommendation or action instruction.

### 5. Alignment is supplied only by a human

1. no alignment exists before human input;
2. partly aligned preserves corrections and does not complete as aligned;
3. not yet aligned remains incomplete;
4. aligned records the human confirmer and time;
5. no runtime function derives alignment from confidence or completeness.

### 6. Memory and completion remain bounded

1. no memory is written before the approved recording point;
2. the memory record preserves relationship understanding, unresolved questions, provenance, and formation-specific status;
3. `runFormationStage()` is not invoked;
4. no formation stage becomes inherited or complete;
5. ordinary Andy conversation state is unchanged.

### 7. Existing baseline remains green

Run:

```text
npm test -- --runInBand lib/academy/__tests__/repositoryKnowledgeService.test.ts lib/academy/__tests__/reflection.test.ts lib/academy/__tests__/formationInheritance.test.ts
```

Then run the new focused Context Door test separately. A passing baseline is regression evidence only; it is not proof of live alignment.

---

## 5. Human-Controlled Decisions and Inputs

The following remain exclusively human-controlled:

1. the wording and status of current context;
2. what matters now and what has changed;
3. current worries and held tensions;
4. what humans need from Andy;
5. Andy's invited role and its limits;
6. all decision and action ownership;
7. feedback owner, route, timing, and criteria;
8. corrections to Andy's interpretation or restatement;
9. aligned, partly aligned, or not yet aligned status;
10. whether the evidence is accepted;
11. whether any later bounded contribution may begin;
12. any future formation or capability claim.

The runtime may preserve, organise, and restate these inputs. It may not supply or approve them.

---

## 6. Explicitly Not Built

The first implementation must not build:

1. a general conversation engine;
2. a generic dialogue state machine;
3. a general multi-participant transcript platform;
4. a new COS understanding or reasoning engine;
5. a new deliberation, recommendation, or decision path;
6. automatic human-context extraction, completion, prediction, or defaults;
7. automatic alignment scoring;
8. automatic authority, role, or contribution progression;
9. automatic formation completion or inheritance;
10. full formation-curriculum runtime ingestion;
11. a new persistence database or general memory redesign;
12. a generalized Context Door for other Digital Colleagues;
13. UI, API, scheduling, notification, or feedback-delivery infrastructure;
14. changes to ordinary Andy conversation behavior;
15. retrospective synthesis that rewrites what the human actually said.

Generalisation may be considered only after evidence from the first live formation conversation demonstrates a repeated need.

---

## Verification Order

If implementation is later authorised, validate in this order:

1. human-context projection tests;
2. Context Door phase and boundary tests;
3. restatement and human-alignment tests;
4. memory and evidence-record tests;
5. existing focused Andy baseline;
6. one human-led live execution;
7. human review of the resulting evidence before any capability claim.

---

## Conclusion

The smallest technical plan adds one formation-specific module that opens, receives supplied human context, forms updated understanding through existing COS capability, requests human alignment, and records the bounded result.

Retrieval remains evidence gathering. Understanding remains formed by `form()`. Human context remains human supplied. Andy gains no authority. No action follows until humans confirm alignment and separately authorise what comes next.

---

## Status

Smallest technical execution plan recorded.  
No code implemented.  
No architecture settled.  
No implementation authorised.  
No capability claim made.