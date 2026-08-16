# HH-0000 Andy First Live Formation Conversation Runtime Capability Mapping

**Status:** Discovery / evidence mapping only  
**Date:** 2026-08-09  
**Subject:** HH-0000 Andy runtime  
**Purpose:** Map the requirements in `docs/formation/HH0000_ANDY_FIRST_LIVE_FORMATION_CONVERSATION.md` to capability evidenced in the current runtime.

---

## Scope

This document records implementation and test evidence only.

It does not:

- change code;
- propose architecture;
- propose runtime features;
- treat data structures as end-to-end capability without an execution path;
- declare the live formation conversation supported as a whole;
- declare Andy formed.

---

## Classification Method

- **Already supported:** The current runtime has an evidenced execution path for the requirement as written.
- **Partially supported:** Relevant runtime behaviour exists, but the complete conversation requirement is not evidenced.
- **Not supported:** No current execution path is evidenced for the requirement as written.

Gap classifications describe the observed boundary only:

- **Missing data input:** Required live information is not available to the runtime from current inherited sources.
- **Missing conversation flow:** Existing behaviours are not connected into the required conversational sequence.
- **Missing memory structure:** The required information is not represented and recorded by the active memory path.
- **Missing reflection capability:** The current reflection path cannot perform the required operation.
- **Genuine new runtime capability:** The requirement cannot be accounted for by an existing runtime primitive or by a missing input, flow, or record.

---

## Evidence Base

Current implementation:

1. `lib/academy/AndyDigitalColleague.ts`
2. `lib/academy/JourneyRunner.ts`
3. `lib/academy/MarcMentor.ts`
4. `lib/academy/Memory.ts`
5. `lib/academy/academyTypes.ts`
6. `lib/academy/repositoryKnowledgeService.ts`

Focused tests:

1. `lib/academy/__tests__/repositoryKnowledgeService.test.ts`
2. `lib/academy/__tests__/reflection.test.ts`
3. `lib/academy/__tests__/formationInheritance.test.ts`

Controlling audit and conversation preparation:

1. `docs/formation/HH0000_ANDY_RUNTIME_EVIDENCE_AUDIT.md`
2. `docs/formation/HH0000_ANDY_FIRST_LIVE_FORMATION_CONVERSATION.md`

Focused verification executed on 2026-08-09:

```text
npm test -- --runInBand lib/academy/__tests__/repositoryKnowledgeService.test.ts lib/academy/__tests__/reflection.test.ts lib/academy/__tests__/formationInheritance.test.ts
```

Observed result:

- 3 test suites passed;
- 62 tests passed;
- 0 tests failed.

---

## Summary Mapping

| # | Conversation requirement | Classification | Observed gap |
| ---: | --- | --- | --- |
| 1 | Initial interpretation of inherited context | Partially supported | Missing data input; missing conversation flow |
| 2 | Distinction between known, inferred, and unknown | Partially supported | Missing conversation flow |
| 3 | Requesting missing human context | Partially supported | Missing conversation flow |
| 4 | Receiving human clarification | Partially supported | Missing conversation flow |
| 5 | Restating updated understanding | Not supported | Missing conversation flow |
| 6 | Preserving unresolved questions | Partially supported | Missing conversation flow; missing memory structure |
| 7 | Recording relationship/context memory | Partially supported | Missing conversation flow; missing memory structure |
| 8 | Capturing feedback route | Not supported | Missing data input; missing conversation flow; missing memory structure |

No reviewed requirement is evidenced end to end as written. The review found no gap that must be classified as a genuine new runtime capability. Existing primitives account for parts of the required behaviour, but this mapping does not establish that connecting them would be sufficient.

---

## 1. Initial Interpretation of Inherited Context

**Classification:** Partially supported  
**Gap:** Missing data input; missing conversation flow

### Evidence present

1. `runConstitutionalExamination` retrieves repository documents and builds a structured understanding plan before generating an answer.
2. The structured plan contains selected and rejected documents, evidence quality, known material, unknown material, and a deliberation record.
3. Repository-review tests evidence that Andy can review the repository, investigate sub-questions, surface unsupported findings, and provide a bounded recommendation.
4. Formation inheritance tests evidence later recall of formation learning that has first been recorded through `runFormationStage`.

### Evidence boundary

1. The repository cannot supply current human priorities, recent changes outside the repository, current worries, held tensions, or what humans need from Andy now.
2. Ordinary repository ranking excludes formation documents, although formation learning recorded through the separate formation gateway can be recalled.
3. No focused test executes the prepared opening question and evidences an initial interpretation specifically bounded to inherited context and live confirmation needs.

The runtime can form an interpretation from inherited evidence, but the complete initial movement is not currently evidenced.

---

## 2. Distinction Between Known, Inferred, and Unknown

**Classification:** Partially supported  
**Gap:** Missing conversation flow

### Evidence present

1. `CognitiveTrace` separates an understanding summary and completeness from material uncertainty and unknowns.
2. The structured understanding plan separates known and unknown material.
3. `DeliberationRecord` separates supported findings, unsupported findings, contradictory findings, assumptions, confidence, and unresolved questions.
4. Repository-review tests evidence answers that state when something cannot be determined from the repository and distinguish supported, suggested, and insufficient evidence.

### Evidence boundary

1. The current types do not provide one unified `known / inferred / unknown` conversation result.
2. No focused test shows Andy answering the live formation opening by explicitly presenting all three categories.
3. Inference is represented indirectly through assumptions, evidence quality, confidence, and supported or unsupported findings rather than through a single explicit inference category.

The distinctions exist in the reasoning machinery, but the required human-facing response form is not evidenced.

---

## 3. Requesting Missing Human Context

**Classification:** Partially supported  
**Gap:** Missing conversation flow

### Evidence present

1. `consider` produces material unknowns and clarification-seeking responses for uncertainty journeys.
2. `MarcMentor.assess` explicitly checks whether Andy asked for clarification, recognised incomplete understanding, and avoided assumption.
3. Generic conversation state records asked questions, unresolved unknowns, and the next question.
4. Multi-turn tests evidence context-specific follow-up questions and progression from one missing fact to the next.

### Evidence boundary

1. The evidenced questions concern generic decisions, mistakes, emotional context, or fixed journey prompts.
2. No current flow identifies the five live institutional context categories in the conversation preparation: current priority, change, worry, tension, and present need.
3. No focused test shows Andy naming why a missing item matters and directing the request to the human able to clarify it.

Andy can ask clarifying questions, but the prepared human-context request is not evidenced as a complete flow.

---

## 4. Receiving Human Clarification

**Classification:** Partially supported  
**Gap:** Missing conversation flow

### Evidence present

1. Repeated calls to `runConstitutionalExamination` accept successive human statements.
2. Generic multi-turn tests evidence that later human input updates known facts, topic, emotional context, goals, choices, unresolved unknowns, and next step.
3. Tests evidence that an answered unknown can be removed while remaining unknowns stay open.

### Evidence boundary

1. The runtime does not identify a human turn as confirmed context, current interpretation, correction, or unresolved human uncertainty.
2. `JourneyRunner` has a fixed sequence of opening, learner response, reasoning question, learner explanation, mentor feedback, and reflection. It does not provide a human-clarification turn followed by another Andy turn.
3. No focused test provides current Helping Hand clarification and demonstrates that Andy incorporates it as such.

The runtime receives multi-turn human input, but the clarification movement is not represented or evidenced.

---

## 5. Restating Updated Understanding

**Classification:** Not supported  
**Gap:** Missing conversation flow

### Evidence reviewed

1. Generic conversation responses can use accumulated in-instance state.
2. Judgement follow-up responses can explain a stored deliberation.
3. Reflection can record changed and unchanged understanding after a recommendation-ready repository investigation.

### Evidence boundary

1. No runtime method or journey stage requests a closing restatement after human clarification.
2. No execution path assembles updated situation, role, human need, responsibility boundary, remaining unknowns, context-request route, and feedback route into one restatement.
3. No focused test evidences a correction followed by Andy accurately restating the corrected understanding.

The reviewed evidence does not support this requirement as written. The gap is in the conversation flow; the evidence does not require classifying it as a genuine new runtime capability.

---

## 6. Preserving Unresolved Questions

**Classification:** Partially supported  
**Gap:** Missing conversation flow; missing memory structure

### Evidence present

1. In-instance conversation state contains `unresolvedUnknowns` and `askedQuestions`.
2. Multi-turn tests evidence that unresolved unknowns remain while answered unknowns are removed.
3. `DeliberationRecord` contains `unresolvedQuestions`.
4. `ReflectionRecord` contains `unresolvedUncertainty` and `futureInvestigation`, and reflection tests evidence that these remain available after judgement follow-up.
5. `MemoryRecord` defines an optional `unresolvedQuestions` field.

### Evidence boundary

1. The active generic conversation state is private and remains in the current runtime instance.
2. The reviewed `reflect` and `buildReflectionRecord` memory writes do not copy unresolved questions into `MemoryRecord.unresolvedQuestions`.
3. Formation-stage memory writes also do not populate `unresolvedQuestions`.
4. No live formation flow carries the unresolved questions from initial interpretation through human clarification into a dated conversation record.

Unresolved questions are preserved in active state and reflection output, but not through the complete conversation and memory path required here.

---

## 7. Recording Relationship/Context Memory

**Classification:** Partially supported  
**Gap:** Missing conversation flow; missing memory structure

### Evidence present

1. `Memory` stores and retrieves `MemoryRecord` values in the runtime instance.
2. Journey reflection stores lesson, principles, mentor feedback, and timestamp.
3. Formation inheritance stores learning for later recall.
4. `MemoryRecord` defines optional `relationshipUnderstanding`, `identityUnderstanding`, `formationStatus`, `unresolvedQuestions`, and provenance fields.
5. Generic conversation state tracks topic, known facts, emotional context, person goal, choices, asked questions, unresolved unknowns, and next step.

### Evidence boundary

1. Generic conversation state and conversation history are not written to `Memory` by the reviewed conversation path.
2. The reviewed journey and formation memory writes do not populate relationship understanding, identity understanding, live institutional context, human corrections, or a closing restatement.
3. `Memory` is an in-process array; this mapping found no persistence evidence for carrying this live conversation record beyond the runtime instance.

The runtime has memory and context structures, but it does not evidence recording this conversation's relationship and current-context outcome.

---

## 8. Capturing Feedback Route

**Classification:** Not supported  
**Gap:** Missing data input; missing conversation flow; missing memory structure

### Evidence reviewed

1. `JourneyRunner` obtains mentor feedback from `MarcMentor.feedback` and passes it to `reflect`.
2. `MemoryRecord` stores `mentorFeedback` as feedback content.
3. Generic conversation handling recognises positive feedback from a human.

### Evidence boundary

1. The current runtime has no evidenced input for feedback owner, route, timing, or criteria for useful, incomplete, or off-track contribution.
2. `JourneyRunner` provides fixed mentor feedback after assessment; it does not establish a future human feedback route.
3. No reviewed active memory structure records feedback owner, route, and timing.
4. No focused test captures or recalls a feedback route.

Feedback content exists, but a feedback route does not. The requirement is not supported as written.

---

## Evidence Conclusion

The current Andy runtime contains substantial component evidence:

1. repository-grounded interpretation;
2. uncertainty and assumption handling;
3. clarification questions;
4. multi-turn conversational state;
5. unresolved-question tracking;
6. reflection;
7. journey and formation memory;
8. mentor feedback content.

The current evidence does not show those components operating as the prepared live formation conversation.

The principal observed boundary is missing conversation flow. Current human context and feedback-route details also require missing data input, while unresolved-question continuity, relationship/context recording, and feedback-route capture expose missing active memory structure.

This mapping does not establish a need for new architecture or a genuine new runtime capability. It records only what the present implementation and focused tests do and do not demonstrate.

---

## Status

Evidence-only capability mapping recorded.  
No code changed.  
No architecture proposed.  
No runtime capability declared beyond current evidence.