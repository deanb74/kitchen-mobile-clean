# MILESTONE_045_IMPLEMENTATION_PLAN — Digital Colleague Conversation Boundary

**Date:** 2026-08-06
**Status:** Implementation Plan — Ready to Execute
**Depends on:**
- MILESTONE_045_CANDIDATE_CONVERSATION_BOUNDARY.md — five proof conditions ✓
- MILESTONE_045_REPOSITORY_ANALYSIS.md — audit complete ✓
- PD-005 — LLM as Capability, Not Identity ✓
- PD-006 — Conversation as Experience, Not Interface ✓

**Constraint:** No engine modifications. Three small additions. Seven tests.
Prove the five conditions. No more.

---

## Pre-Implementation Action (Required Before Any Code)

Mark the pre-governed conversation prototype as deprecated.

`lib/annie/conversation/speak.ts` — `speakJudgement()` — is wired to
`lib/os/context` (the pre-governed OS layer). It must receive a `@deprecated`
JSDoc before implementation begins, pointing to the governed path.

This is not a code change. It is a documentation guard.

**File:** `lib/annie/conversation/speak.ts`
**Action:** Add `@deprecated` JSDoc to `speakJudgement()` — one line.

---

## Step 1 — `humanSpeechToObservation()`

**File:** `lib/annie/conversation/listen.ts`
*(This file exists and is empty. This is its natural content.)*

**Function:**
```typescript
function humanSpeechToObservation(
  utterance: string,
  id: string,
  confidence?: number,
): Observation
```

**Rules:**
- `source: "human"` — always
- `category: "conversation"` — always
- `description: utterance` — verbatim; no interpretation here
- `confidence` — caller supplies; no default; DC does not pretend certainty
- `id` — caller supplies; must be unique within the session

**Proof Condition:** 1 — Human enters through observation, not bypass.

---

## Step 2 — `hospitalityConversationRules`

**File:** `lib/annie/translation/hospitalityConversationRules.ts`
*(New file. Follows the pattern of `hospitalityRules.ts` and `hospitalityFoodSafetyRules.ts`.)*

**Rules match:** `observation.source === "human"`
**Rules extract:** Professional meaning from recognisable hospitality topics.

Example topics to cover:
- shift handover / transitions
- staffing / team concerns
- equipment / facilities
- stock / supplies
- service pressure

**Unrecognised speech produces no translation.** This is correct.
The DC does not pretend to understand what it cannot translate.
An empty `Translation[]` produces `Understanding.completeness: "insufficient"`.
`JudgementEngine` selects `"ask"` or `"admit-uncertainty"`. The DC asks.

**Proof Condition:** 1 — Human speech is translated by professional rules, not raw-passed to LLM.

---

## Step 3 — Governed Judgement to Communication Action

**File:** `lib/annie/conversation/speak.ts`
*(Add alongside the existing deprecated `speakJudgement()`. Do not replace it.)*

**Function:**
```typescript
function judgementToConversationInstruction(
  judgement: Judgement,
  context: ConversationContext,
): string
```

Takes the governed `Judgement` (from `lib/judgement/Judgement.ts`) and the
`ConversationContext`. Returns the instruction string for `ActionEngine.build()`.

This is not text generation. It is instruction construction.
The `ActionEngine` builds the `Action`. The `ExecutionEngine` records it.
The instruction is bounded by what the `Judgement.response.kind` permits.

**Proof Condition:** 3 — Responses are governed actions.

---

## Step 4 — Tests

### Unit Tests

**`lib/annie/conversation/__tests__/listen.test.ts`**

| Test | Proof Condition |
|---|---|
| Human utterance becomes `Observation` with `source: "human"` | PC1 |
| Observation carries utterance verbatim as `description` | PC1 |
| `confidence` is required — no invented default | PC1 |
| `category` is `"conversation"` | PC1 |

**`lib/annie/translation/__tests__/hospitalityConversationRules.test.ts`**

| Test | Proof Condition |
|---|---|
| Shift-related utterance produces a translation | PC1 |
| Unrecognised utterance produces no translation | PC1, PC4 |
| Translation confidence reflects observation confidence | PC1 |
| Translation meaning is professional — not the raw utterance | PC1 |

### Integration Tests

**`lib/annie/formation/__tests__/milestone-045-conversation-boundary.test.ts`**

| Test | Proof Condition |
|---|---|
| Human speech → Observation → Translation → `form()` — full pipeline | PC1 |
| Prior governed memory enriches Encounter 2 formation from a conversation | PC2 |
| `JudgementEngine` selects `"ask"` when Understanding is partial | PC2 |
| Response kind routes through `AuthorityEngine` before becoming an Action | PC3 |
| `"human-required"` disposition produces `"escalate"` — not silence | PC4 |
| Conversation without sufficient signal produces no `Learning.proposal` | PC5 |
| Conversation without `Learning.proposal` produces no `KnowledgeGraph` entry | PC5 |

---

## What Must Not Be Modified

| Component | File |
|---|---|
| `form()` | `platform/cos/understanding-formation/formation.ts` |
| `JudgementEngine` | `lib/judgement/JudgementEngine.ts` |
| `AuthorityEngine` | `lib/authority/AuthorityEngine.ts` |
| `ActionEngine` | `lib/action/ActionEngine.ts` |
| `ExecutionEngine` | `lib/execution/ExecutionEngine.ts` |
| `ReflectionEngine` | `lib/reflection/ReflectionEngine.ts` |
| `LearningEngine` | `lib/learning/LearningEngine.ts` |
| `KnowledgeGovernanceEngine` | `lib/knowledge-governance/KnowledgeGovernanceEngine.ts` |
| `evaluateGuard()` | `lib/knowledge-governance/writeGuard.ts` |
| `applyApprovedChange()` | `lib/knowledge-governance/applyApprovedChange.ts` |
| `governedConceptsToFormation()` | `lib/annie/formation/governedKnowledgeAdapter.ts` |
| `KnowledgeGraph` | `lib/knowledge/KnowledgeGraph.ts` |

---

## Milestone Definition of Done

All five proof conditions pass as automated tests.
No existing test is broken.
`speakJudgement()` carries a `@deprecated` JSDoc.
The conversation layer can be removed entirely and the trunk remains intact.

> The branch must be able to fall off the Oak and leave the roots undamaged.
