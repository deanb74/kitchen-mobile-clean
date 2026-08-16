# MILESTONE_045_CANDIDATE — Digital Colleague Conversation Boundary

**Date:** 2026-08-06
**Status:** Candidate — Boundary Analysis
**Depends on:**
- Milestone 040 — Foundation Demonstration Certificate ✓
- Milestone 043 — First Governed Capability (trunk proven) ✓
- Milestone 044 — Learning Loop (growth cycle proven) ✓
- PD-005 — LLM as Capability, Not Identity ✓

**Constraint:** No new principles. No new governance. No shortcuts.
Prove the existing architecture can carry a live human relationship
without weakening any boundary already established.

---

## The Question

> Can a Digital Colleague hold a conversation with a human while
> preserving the same boundaries that govern learning?

---

## What Has Been Proven

The internal loop is complete:

```
Experience
    ↓ [form()]
Understanding
    ↓ [JudgementEngine]
Judgement
    ↓ [ActionEngine + AuthorityEngine]
Action
    ↓ [ExecutionEngine]
Execution
    ↓ [ReflectionEngine]
Reflection
    ↓ [LearningEngine]
Learning
    ↓ [KnowledgeGovernanceEngine + applyApprovedChange()]
KnowledgeGraph
    ↓ [governedConceptsToFormation()]
Better future Understanding
```

121 tests confirm this chain.

What has not been proven is that the same boundaries hold when a human
is on the other side of the loop.

---

## The Gap

The internal loop treats Experience as a structured `Execution` object.

A human conversation is not a structured object.

A human says something.

That is not yet an `Observation`.

It is not yet a `Translation`.

It is not yet `FormationKnowledge`.

The gap is the boundary between human speech and the formation pipeline.

---

## The Four Proof Conditions

### Proof Condition 1 — Human Is Not a Query Engine

Human speech must enter through observation, not bypass formation.

The correct path:

```
Human speech
    ↓
Observation
    ↓
Translation
    ↓
Context formation
    ↓
Understanding
```

The incorrect path — which must not exist:

```
Human question
    ↓
LLM
    ↓
Answer
```

**What this means architecturally:**
Human speech is an `Observation` with `source: "human"`.
It is translated by the existing translation mechanism.
Formation receives translations, not raw speech.
The LLM may assist translation. It does not replace formation.

---

### Proof Condition 2 — Understanding Informs, It Does Not Answer

Governed memory must influence the DC's curiosity — not replace it.

The DC does not say:

> "The system says shift handovers need improvement."

The DC says:

> "I've noticed a pattern where information seems to be getting lost between
> shifts. Can I ask you a bit more about what happens at handover?"

The governed principle from `KnowledgeGraph` reached `form()`.
It enriched the DC's Understanding.
The Understanding informed Judgement.
Judgement selected `"ask"` as the response kind.
The DC asked — it did not tell.

**What this means architecturally:**
`FormationKnowledge[]` from `governedConceptsToFormation()` enters `form()`.
The summary is richer. The DC's curiosity is more directed.
The DC does not retrieve an answer. It forms better questions.

---

### Proof Condition 3 — Responses Are Actions

A conversational response is not just text.

A response changes the human situation.

It must therefore pass through the same authority boundary as any other action.

```
Understanding
    ↓
Judgement (response kind selected: ask / advise / escalate / admit-uncertainty...)
    ↓
AuthorityEngine
    ↓
Action (communication action)
    ↓
Execution (the DC speaks)
    ↓
Reflection (what happened after speaking?)
```

**What this means architecturally:**
Speaking to a human is an `Action` of kind `"speak"` or `"ask"`.
The `AuthorityEngine` applies the same boundaries.
The DC cannot choose `"advise"` when `AuthorityEngine` returns `"do-not-execute"`.
`JudgementResponseKind` already includes `"speak"`, `"ask"`, `"advise"`, `"escalate"`,
`"admit-uncertainty"`, `"remain-silent"`. These are not new.

---

### Proof Condition 4 — Uncertainty Is a Capability

The DC must be able to say:

- "I don't know."
- "I need more context."
- "I can look into that."
- "This needs someone with authority."

This is not failure. This is governed intelligence.

**What this means architecturally:**
`Judgement.disposition` of `"human-required"` must produce a response,
not silence. The DC responding with `"admit-uncertainty"` is a permitted
`JudgementResponseKind`. It is still an action. It still passes through
`AuthorityEngine`. The DC never simply stops.

---

## The Failure Mode to Guard Against

> A conversation system that optimises for answering creates an assistant.
> A Digital Colleague that optimises for understanding creates a relationship.

The failure mode is a conversational loop that:

- accepts human speech as a query
- passes it directly to an LLM
- returns the LLM's output as the DC's response

This must not exist inside Helping Hand, because:

1. Formation is bypassed — no Translation, no Context, no synthesis
2. Judgement is bypassed — no disposition, no response kind selection
3. Authority is bypassed — no boundary assessment before speaking
4. Governance is bypassed — responses are not governed actions
5. Provenance is lost — the DC cannot explain why it said what it said
6. The human relationship is reduced to a query/answer loop

---

### Proof Condition 5 — Conversation Does Not Automatically Become Memory

A conversation creates observations.

It does not automatically create learning.

The flow must remain:

```
Conversation
    ↓
Observation
    ↓
Context
    ↓
Understanding
    ↓
Reflection
    ↓
Learning proposal
    ↓
Governance
    ↓
Memory
```

Otherwise every conversation becomes a database entry.

That destroys trust.

A person telling Annie:

> "I'm having a bad day."

does not become:

> "Staff member is unhappy."

It becomes an observed human moment requiring context, empathy and judgement.

A human colleague does not remember every sentence someone says.

They remember what matters.

The question is not:

> "Can Annie remember this conversation?"

The question is:

> "Did this experience create understanding worth preserving?"

Leaves do not store sunlight. They convert sunlight into nourishment for the tree.

**What this means architecturally:**
The conversation session has no direct write path to `KnowledgeGraph`.
The only write path is through `ReflectionEngine → LearningEngine → KnowledgeGovernanceEngine → applyApprovedChange()`.
A conversation that produces no reflection produces no memory.
That is correct behaviour, not a missing feature.

**Test:**
A conversation containing the utterance "The dishwasher broke again today" does not
immediately produce a `Concept` in `KnowledgeGraph` with the definition "Dishwasher
reliability issue." The DC must observe, understand context, reflect, determine whether
learning exists, and pass governance. Only then can memory grow.

---

## What Must Not Be Modified

Milestone 045 must not change:

- `form()` — the formation mechanism is proven
- `KnowledgeGraph` — the memory layer is proven
- `evaluateGuard()` — the write guard is proven
- `applyApprovedChange()` — the mutation bridge is proven
- `governedConceptsToFormation()` — the memory→formation bridge is proven
- `JudgementEngine` — the judgement layer is proven
- `AuthorityEngine` — the authority boundary is proven

---

## What Must Be Proven

Milestone 045 must prove that:

1. A human utterance becomes an `Observation` with `source: "human"`
2. The observation is translated by the existing translation mechanism
3. Translation feeds `form()` alongside governed context and knowledge
4. `form()` produces Understanding informed by prior governed memory
5. `JudgementEngine` selects a response kind from Understanding
6. The response kind is bounded by `AuthorityEngine`
7. The response is an `Action` and an `Execution`
8. The `Execution` feeds `ReflectionEngine` → `LearningEngine`
9. The conversation contributes to future governed understanding

The DC must enter the human conversation the same way it enters any experience.

The human is not a special case.

The human is the purpose.

---

## Recommended Demonstration

**Scenario:** Annie has a conversation with a venue manager about shift handovers.

The venue manager says:

> "Our handovers have been really difficult lately. Staff keep not knowing
> what happened on the previous shift."

**Encounter 1 (no prior memory):**
Annie forms Understanding from this observation.
She has no prior governed principle on shift context.
She asks a clarifying question.
The execution is recorded. Reflection and learning follow.
Governance approves a principle. KnowledgeGraph stores it.

**Encounter 2 (prior memory):**
A second conversation begins.
Annie's formation includes the governed principle.
Her Understanding is richer.
She still asks — but her question is better directed.
She does not tell the manager what to do.
She creates the conditions for the manager to reach their own understanding.

**The proof:** Two conversations. One pattern. Governed memory makes
the second conversation better than the first — without any change to
the formation, judgement, or governance architecture.

---

## Implementation Boundary

When implementation begins:

**Create only:**
- `lib/annie/conversation/` — conversation session type and DC conversation entry point
- Tests proving the four proof conditions

**Do not modify:**
- Any existing engine, adapter, or governance component

The conversation layer is a new branch on the Oak.

It does not replace any existing branch.

It must be able to fall off the Oak entirely and leave the trunk intact.

---

## The Transition This Milestone Represents

> The first systems answered questions. Helping Hand understands conversations.

That is the difference between an interface and a colleague.

---

## Summary

```
Foundation → Boundary → Demonstration → Capability
```

The Oak does not grow branches before discovering where the roots are.

The roots are proven.

The trunk is proven.

The growth cycle is proven.

The next branch is the human relationship.
