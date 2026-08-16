# HH-0000 Andy First Live Formation Conversation Minimum Runtime Addition

**Status:** Candidate implementation-readiness analysis  
**Date:** 2026-08-09  
**Subject:** HH-0000 Andy first live formation conversation  
**Purpose:** Identify the smallest runtime addition that could support the prepared conversation without building a general conversation engine.

---

## Scope

This document reviews:

1. `docs/formation/HH0000_ANDY_FIRST_LIVE_FORMATION_CONVERSATION.md`;
2. `docs/formation/HH0000_ANDY_FIRST_LIVE_FORMATION_CONVERSATION_RUNTIME_CAPABILITY_MAPPING.md`;
3. the current Andy runtime and inherited understanding-formation pipeline.

It does not:

- change code;
- authorise implementation;
- settle new architecture;
- create a general conversation capability;
- permit human context to be inferred;
- give Andy new authority;
- declare the conversation supported or Andy formed.

"Context Door" is used here only as a candidate label for the bounded formation flow described below. It is not an existing runtime concept or new doctrine.

---

## Governing Boundary

The first goal is alignment, not answers.

The runtime addition must help Andy and the participating humans establish:

1. what Andy currently interprets from inherited evidence;
2. what requires live human confirmation;
3. what humans provide as current context;
4. what remains unresolved;
5. whether Andy's closing restatement matches human intent.

It must not turn the conversation into recommendation generation, capability testing, or decision automation.

### Preserved principles

1. **Formation before expansion:** the addition is bounded to HH-0000's prepared formation activity.
2. **Evidence before capability claims:** successful execution would evidence only the degree of context alignment reached.
3. **Human context cannot be inferred:** absent human input remains absent or unknown.
4. **Andy does not gain authority:** Andy interprets, asks, and restates; humans clarify, confirm, and decide.
5. **Alignment before answers:** no recommendation or broader contribution is required for the flow to complete.

---

## Determination

The smallest justified runtime addition is one formation-specific orchestration flow for the prepared HH-0000 conversation, plus a narrowly scoped record of the human context and alignment evidence produced by that flow.

The addition does not require:

1. a general conversation engine;
2. a new understanding-formation mechanism;
3. a new deliberation engine;
4. a new authority model;
5. a new general memory service;
6. expansion of ordinary repository retrieval to treat live human context as repository knowledge.

The addition does require a bounded way to:

1. start from inherited evidence;
2. expose interpretation and uncertainty;
3. pause for explicit human context;
4. accept correction and clarification without inferring missing values;
5. form an updated understanding through the existing formation pipeline;
6. produce a closing restatement;
7. let a human mark alignment as aligned, partly aligned, or not yet aligned;
8. record the transcript, provenance, unresolved questions, feedback route, and alignment outcome.

---

## 1. Existing Runtime Primitives Reused Unchanged

### Repository retrieval

`RepositoryKnowledgeService` already retrieves relevant constitutional, theoretical, architectural, historical, and organisational evidence. It remains the inherited-information source.

It must not be used to manufacture current human context.

### Andy's institutional translation

`translateDocumentsForFormation` already converts repository documents into institutional translations with evidence references and confidence.

No new translation mechanism is required for inherited repository evidence.

### Governed knowledge conversion

`repositoryDocumentsToFormation` already converts repository documents into governed formation knowledge.

No new knowledge mechanism is required.

### Universal understanding formation

The COS `form()` function already combines translations, context, and knowledge; derives uncertainty; assesses completeness; and preserves an evidence chain.

This remains the only understanding-formation mechanism. The Context Door must not hand-author an understanding or introduce a parallel synthesis path.

### Pre-formation readiness

`assessReadiness` and `validateFormationInputs` already identify absent observations, context, and knowledge and can route toward asking when situational context is absent.

Their readiness result concerns whether understanding inputs are present. It must not be reinterpreted as human confirmation, formation completion, or permission to contribute.

### Existing uncertainty structures

`CognitiveTrace`, `DeliberationRecord`, `ReflectionRecord`, and the COS `Understanding` type already represent uncertainty, assumptions, unsupported findings, unresolved questions, completeness, and confidence.

These structures can supply evidence for what is inherited and unresolved. They do not need replacement.

### Existing authority safeguards

The current governed advisory and authority paths remain unchanged. The formation flow does not grant approval, execution, or decision rights.

### Existing memory container

`Memory.remember`, `Memory.all`, and `Memory.learningForJourney` can store and retrieve a formation memory record once the human-confirmed conversation outcome exists.

The container can be reused unchanged. The information written to it requires a bounded representation described below.

---

## 2. Existing Structures Requiring Orchestration Only

The following sequence connects existing behaviour without broadening it into a general conversation engine.

### Movement 1: Inherited interpretation

Use existing repository retrieval, institutional translation, governed knowledge conversion, readiness assessment, and understanding formation to produce an initial evidence-grounded interpretation.

Present the result as:

1. inherited evidence;
2. current interpretation;
3. inferences or assumptions;
4. unknowns requiring human confirmation.

The labels organise existing outputs. They do not require a new reasoning engine.

### Movement 2: Role and boundary statement

Use existing formation recall, uncertainty, and authority-boundary language to state Andy's current interpreted role and where human authority remains decisive.

No authority decision is made by Andy.

### Movement 3: Context request

Use existing unknowns, readiness gaps, and clarification behaviour to ask only for missing human context.

The questions are constrained by the prepared conversation rather than generated as open-ended general dialogue.

### Movement 4: Human clarification

Accept a human-provided context record. Preserve its source, wording, provider, time, and unresolved values.

The runtime may organise this input for formation. It must not complete, predict, or improve the human's meaning.

### Movement 5: Updated understanding and restatement

Run the existing understanding-formation mechanism again with the explicit human context included, then render a bounded restatement of:

1. current situation;
2. Andy's role;
3. current human need;
4. human decision ownership;
5. remaining unknowns;
6. future context-request route;
7. feedback route.

The human then records whether the restatement is aligned, partly aligned, or not yet aligned. That classification is human evidence, not Andy's self-assessment.

### Evidence recording

After human confirmation, use the existing memory container to retain the bounded formation outcome and return a dated evidence record.

An unconfirmed or incomplete conversation may still be recorded as incomplete. It must not be promoted to aligned.

---

## 3. Missing Concepts That Need Representation

The capability mapping found no need for a genuinely new general runtime capability. It did find four formation-specific concepts that are not adequately represented in the active path.

### A. Human context provenance

The flow must distinguish human-provided context from repository evidence and runtime inference.

Minimum representation:

1. context category;
2. human-provided wording or value;
3. provider;
4. recorded time;
5. status as confirmed human context, human interpretation, or explicitly unresolved.

The existing COS institutional-context source value `relationship` can preserve source authority during understanding formation. A formation-specific provenance record is still required because the current context type does not carry provider, time, or confirmation status.

### B. Context Door phase

The runtime must know which bounded movement is active:

1. inherited interpretation;
2. role and boundaries;
3. context request;
4. human clarification;
5. restatement and human alignment check;
6. complete or incomplete recording.

This is flow state for one formation activity, not a general dialogue state model.

### C. Feedback route

The current runtime records feedback content but not the route by which later feedback will be provided.

Minimum representation:

1. feedback owner;
2. route or channel;
3. expected timing;
4. what the feedback will distinguish;
5. unknown status where any item has not been supplied.

The runtime must not invent defaults for these fields.

### D. Human-confirmed alignment outcome

The flow requires a human-owned result:

1. aligned;
2. partly aligned;
3. not yet aligned;
4. reasons;
5. remaining corrections or unknowns.

This is not a capability score, readiness decision, or authority grant.

### Relationship and context memory

Relationship understanding, current context, human corrections, unresolved questions, feedback route, provenance, and alignment outcome must be carried into the formation evidence record.

The existing `MemoryRecord` has some relevant optional fields, but the active memory writes do not represent this complete outcome. The smallest addition is a formation-specific outcome record with a deliberate projection into existing memory, not a redesign of general memory.

---

## 4. Context Door Scope Decision

### Answer

Yes. The Context Door can be implemented as a formation-specific flow rather than a general capability.

### Evidence for that boundary

1. The prepared conversation has a fixed purpose, five fixed movements, explicit human inputs, and a bounded evidence outcome.
2. The capability mapping found that existing primitives account for repository interpretation, uncertainty, questioning, multi-turn intake, reflection, and memory.
3. The missing behavior is principally orchestration plus narrow representation of human provenance, feedback route, and alignment outcome.
4. The current generic `JourneyRunner` is too fixed for the clarification and restatement movements, while the ordinary conversation path is broader than this formation need.
5. Andy already inherits the universal understanding-formation functions through `lib/academy/formation/index.ts`; a new synthesis mechanism would duplicate existing capability.

### Formation-specific boundary

The first implementation should apply only to:

1. HH-0000 Andy;
2. this prepared first live formation conversation;
3. the named human context categories;
4. the five defined conversation movements;
5. the specified alignment evidence record.

It should not initially support:

1. arbitrary conversation designs;
2. arbitrary participants or Digital Colleagues;
3. recommendation or decision workflows;
4. general long-term relationship memory;
5. automatic progression into bounded contribution;
6. automatic formation completion.

Any later generalisation requires evidence from the live formation conversation. Formation evidence should pull expansion; anticipated reuse should not.

---

## 5. Minimum Evidence Required Before Implementation

Implementation should not begin until the following evidence exists.

### 1. Human-approved conversation contract

Required evidence:

1. confirmation that the five movements in the prepared conversation are the intended first flow;
2. confirmation that alignment, not recommendation, is the outcome;
3. confirmation that an incomplete conversation is an acceptable result;
4. confirmation that the Context Door label remains candidate terminology.

Current status:

- The preparation document defines the flow.
- Human approval of this implementation boundary is not recorded by this analysis.

### 2. Dated human input specimen

Required evidence:

1. a real or explicitly marked representative human input for current situation, current need, current role, human ownership, open uncertainties, and feedback route;
2. named provider and date;
3. explicit unknowns where humans cannot yet answer;
4. no runtime-generated substitutions.

Purpose:

Prove that the proposed input boundary can carry what humans actually need to say before code fixes a premature shape.

### 3. Expected conversation evidence specimen

Required evidence:

1. initial interpretation;
2. known, inferred, and unknown distinctions;
3. context questions;
4. human corrections;
5. closing restatement;
6. remaining unknowns;
7. feedback route;
8. human-owned alignment outcome.

The specimen is an expected record shape, not evidence that Andy has already completed the conversation.

### 4. Provenance and memory boundary confirmation

Required evidence:

1. which human context is retained;
2. which transcript content is retained;
3. how human wording is preserved;
4. how repository evidence, runtime inference, and human clarification remain distinguishable;
5. when an incomplete or unconfirmed record may be written;
6. confirmation that no alignment status is generated by Andy.

### 5. Focused acceptance scenarios

Required before implementation:

1. inherited evidence is available but human context is absent: the flow asks and does not infer;
2. a human leaves one field unknown: the field remains unresolved;
3. a human corrects Andy's interpretation: the correction remains attributed to the human;
4. Andy restates the updated situation, role, need, authority boundary, unknowns, and feedback route;
5. a human marks the restatement partly aligned: the flow records corrections and does not complete as aligned;
6. human authority remains unchanged and no recommendation is required;
7. the formation outcome is recorded without changing ordinary conversation behavior;
8. no stage is marked inherited, complete, or formed merely because the flow executed.

### 6. Baseline preservation evidence

The existing focused runtime suites must remain the baseline:

```text
npm test -- --runInBand lib/academy/__tests__/repositoryKnowledgeService.test.ts lib/academy/__tests__/reflection.test.ts lib/academy/__tests__/formationInheritance.test.ts
```

The capability mapping records 3 suites and 62 tests passing on 2026-08-09. That evidence proves the current primitives only. It does not prove the Context Door.

---

## Minimum Post-Implementation Evidence

Before any capability claim, evidence would need to show:

1. focused engineering tests for every acceptance scenario above;
2. one real execution using human-provided current context;
3. the unedited transcript or governed execution record;
4. provenance separating repository evidence, runtime interpretation, and human clarification;
5. Andy's closing restatement;
6. a human-owned alignment outcome with reasons;
7. unresolved questions preserved;
8. feedback route captured;
9. no authority expansion;
10. no regression in the existing focused suites.

Even that evidence would support only this bounded formation flow and the alignment reached in that execution. It would not establish a general conversation capability, complete learning-loop closure, broader contribution readiness, or completed formation.

---

## Traceability

**Principle:** `constitution/02-CONSTITUTION.md` — understanding before action and truth before certainty; `constitution/05-AUTHORITY-AND-STEWARDSHIP.md` — Digital Colleagues advise and humans decide.  
**Theory:** `docs/theory/003-THEORY-OF-UNDERSTANDING.md` — understanding emerges when knowledge is interpreted within context.  
**Architecture:** Existing COS understanding formation and Andy's inherited formation adapters; no new architecture is settled here.  
**Engineering:** `docs/engineering/VALIDATION_PHILOSOPHY.md` — validate understanding before capability.  
**Milestone:** Not Applicable — no implementation milestone is authorised by this analysis.  
**Evidence:** Runtime capability mapping, focused runtime tests, prepared conversation, and future human-confirmed execution evidence.

---

## Conclusion

The smallest runtime addition is not a broader intelligence or conversation capability.

It is a bounded formation doorway that:

1. uses existing inheritance and understanding formation;
2. pauses where only humans can supply context;
3. preserves source and uncertainty;
4. asks Andy to restate rather than recommend;
5. leaves alignment judgement and authority with humans;
6. records only what the conversation actually establishes.

Implementation is not yet justified by this analysis alone. The minimum pre-implementation evidence must first establish the real human input, expected evidence record, provenance boundary, and focused acceptance scenarios.

---

## Status

Candidate minimum runtime addition identified.  
No code changed.  
No architecture settled.  
No implementation authorised.  
No capability claim made.