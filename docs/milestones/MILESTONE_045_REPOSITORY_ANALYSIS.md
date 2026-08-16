# MILESTONE_045_REPOSITORY_ANALYSIS — Digital Colleague Conversation Boundary

**Date:** 2026-08-06
**Status:** Analysis — No Implementation
**Milestone:** 045 — Digital Colleague Conversation Boundary
**Purpose:** Identify what exists, what can be reused, and the smallest
implementation that proves the five proof conditions.

---

## Objective

Prove that a Digital Colleague can hold a conversation with a human
while preserving the same boundaries that govern learning.

This document records what the repository already contains, what is
correctly layered, what is in the wrong layer, and what is genuinely missing.

No implementation is contained here.

---

## Part 1 — Existing Components That Support Milestone 045

### 1.1 Observation Layer — Partially Ready

| Component | File | Status |
|---|---|---|
| `Observation` type | `platform/cos/observation/types.ts` | Active |
| `ObservationSource` type | `platform/cos/observation/types.ts` | Active — includes `"human"` |
| `ObservationSession` type | `platform/cos/observation/types.ts` | Active |
| `CuriosityRule` mechanism | `platform/cos/observation/curiosity.ts` | Active |
| Annie's `observe()` (vision) | `lib/annie/observation/observe.ts` | Active — hardcoded vision |
| Annie's `hospitalityCuriosityRules` | `lib/annie/observation/curiosity.ts` | Active |

**Key finding:** `ObservationSource` already includes `"human"` as a valid source
value. Human speech can become an `Observation` without any type change.
What does not yet exist is a function that converts a human utterance string
into a typed `Observation`.

---

### 1.2 Translation Layer — Partially Ready

| Component | File | Status |
|---|---|---|
| `translateObservations()` | `platform/cos/translation/translator.ts` | Active |
| `Translation` + `TranslationRule` types | `platform/cos/translation/types.ts` | Active |
| `hospitalityTranslationRules` | `lib/annie/translation/hospitalityRules.ts` | Active — vision/venue rules |
| `hospitalityFoodSafetyRules` | `lib/annie/translation/hospitalityFoodSafetyRules.ts` | Active — equipment rules |
| `translateForFormation()` | `lib/annie/formation/translationAdapter.ts` | Active — applies all rules |

**Key finding:** No `TranslationRule` currently matches `source: "human"` observations.
The existing rules match on `observation.id` or `observation.category`/`description` keywords.
A human utterance observation would pass through `translateForFormation()` without
producing any `Translation` — it would be silently ignored.

What is needed: a `TranslationRule[]` that matches `source === "human"` and extracts
professional meaning from human speech. This is the hospitality conversation translation.

---

### 1.3 Formation Layer — Ready

| Component | File | Status |
|---|---|---|
| `form()` | `platform/cos/understanding-formation/formation.ts` | Active |
| `FormationInput` type | `platform/cos/understanding-formation/types.ts` | Active |
| Annie context adapter | `lib/annie/formation/contextAdapter.ts` | Active |
| Annie knowledge adapter (OS) | `lib/annie/formation/knowledgeAdapter.ts` | Active |
| Annie governed knowledge adapter | `lib/annie/formation/governedKnowledgeAdapter.ts` | Active — Milestone 044 |

**Key finding:** `form()` receives `Translation[]` — it does not care whether translations
came from vision, sensor, or human speech. Proof Condition 1 (human enters through
observation/translation) is architecturally satisfied. The formation layer needs
no modification.

---

### 1.4 Judgement Layer — Ready

| Component | File | Status |
|---|---|---|
| `JudgementEngine.judge()` | `lib/judgement/JudgementEngine.ts` | Active |
| `JudgementResponseKind` | `lib/judgement/Judgement.ts` | Active |
| Response kinds for conversation | `lib/judgement/Judgement.ts` | Active — includes `"speak"`, `"ask"`, `"advise"`, `"escalate"`, `"admit-uncertainty"`, `"remain-silent"` |

**Key finding:** All response kinds needed for a conversation already exist
in `JudgementResponseKind`. The DC can already express `"ask"`, `"admit-uncertainty"`,
`"remain-silent"`, and `"escalate"` as governed response dispositions.
`JudgementEngine` needs no modification.

---

### 1.5 Authority + Execution Layer — Ready

| Component | File | Status |
|---|---|---|
| `AuthorityEngine.assess()` | `lib/authority/AuthorityEngine.ts` | Active |
| `ActionEngine.build()` | `lib/action/ActionEngine.ts` | Active |
| `ExecutionEngine.build()` | `lib/execution/ExecutionEngine.ts` | Active |
| `ReflectionEngine.reflect()` | `lib/reflection/ReflectionEngine.ts` | Active |
| `LearningEngine.build()` | `lib/learning/LearningEngine.ts` | Active |

**Key finding:** A conversational response is an `Action` of kind `"speak"` or `"ask"`.
`ActionEngine` already accepts any `JudgementResponseKind` — it is not restricted to
non-conversational kinds. The execution chain needs no modification.

---

### 1.6 Memory Layer — Ready

| Component | File | Status |
|---|---|---|
| `KnowledgeGraph` | `lib/knowledge/KnowledgeGraph.ts` | Active |
| `governedConceptsToFormation()` | `lib/annie/formation/governedKnowledgeAdapter.ts` | Active — Milestone 044 |
| `applyApprovedChange()` | `lib/knowledge-governance/applyApprovedChange.ts` | Active — Milestone 043 |
| Full governance chain | `lib/knowledge-governance/` | Active |

**Key finding:** The memory layer is fully proven. A conversation that produces an
`Execution` can travel through `ReflectionEngine → LearningEngine → KnowledgeGovernanceEngine`
to eventually become a governed concept. There is no direct write path from a conversation
to `KnowledgeGraph` — Proof Condition 5 is architecturally satisfied already.

---

## Part 2 — Components in the Wrong Layer

### Critical Finding: `lib/annie/conversation/speak.ts` Uses the Pre-Governed Pipeline

`lib/annie/conversation/speak.ts` imports from `lib/os/context`:

```typescript
import type { JudgementResult, SituationIntensity } from "../../os/context";
```

`JudgementResult` from `lib/os/context/judgementEngine.ts` has decisions:
`"ask-now" | "defer" | "interrupt" | "nothing-to-ask"`

This is **not** `JudgementResponseKind` from `lib/judgement/Judgement.ts`:
`"speak" | "ask" | "advise" | "escalate" | "admit-uncertainty" | "remain-silent"`

`speakJudgement()` is wired to the pre-governed OS context layer, not the
governed `JudgementEngine`.

**Risk:** A future implementer following `speak.ts` as a reference will bypass
the governed pipeline. `speakJudgement()` produces `SpokenResponse` without
any `AuthorityEngine` check, any `ActionEngine` pass, or any `ExecutionEngine` record.
It is text generation without governance.

**Ruling:** `lib/annie/conversation/speak.ts` must not be extended.
It is a pre-existing prototype from before the governed architecture.
It is not deprecated — its intent is correct. Its implementation layer is wrong.
Milestone 045 must not connect to it.

**Resolution:** The conversation layer for Milestone 045 must be built
in `lib/annie/conversation/` as a new file alongside `speak.ts` — not as
an extension of it. The new file connects to the governed pipeline.
`speak.ts` remains as a historical prototype.

---

### Secondary Finding: `lib/annie/conversation/listen.ts` and `questions.ts` Are Empty

Both files exist and are exported from `index.ts`. Both are empty.

These were placeholders for conversation input and question handling.

Milestone 045 is the natural point where these files acquire content — but only through
the governed pipeline, not as standalone implementations.

---

## Part 3 — What Is Genuinely Missing

### Missing Component 1 — `humanSpeechToObservation()`

**What it does:**
Converts a human utterance string into a typed `Observation` with `source: "human"`.

**Why it does not exist:**
Annie's current `observe()` is hardcoded for vision observations. There is no
function that accepts a string of human speech and wraps it in the `Observation` type.

**Size:** One function, five lines.

```typescript
// Wraps a human utterance as a governed Observation for pipeline entry.
function humanSpeechToObservation(utterance: string, id: string): Observation
```

**Location:** `lib/annie/conversation/listen.ts` — this file exists and is empty.
This is its natural home.

---

### Missing Component 2 — `hospitalityConversationRules`

**What it does:**
A `TranslationRule[]` that matches `source === "human"` observations and extracts
professional meaning from human speech in a hospitality context.

**Why it does not exist:**
All current `TranslationRule[]` match on `observation.id` or
`observation.category`/description keywords, not on `observation.source`.
Human speech passes through `translateForFormation()` without producing any translation.

**Size:** One set of rules — one file with pattern-matching rules.

```typescript
// Extracts professional hospitality meaning from human speech observations.
export const hospitalityConversationRules: TranslationRule[]
```

**Location:** `lib/annie/translation/hospitalityConversationRules.ts`

**Scope constraint:** These rules must not attempt to understand all human speech.
They pattern-match on common hospitality conversation topics.
Unmatched speech produces no translation — which is correct.
The DC does not pretend to understand what it cannot translate.

---

### Missing Component 3 — Connection from `Judgement.response.kind` to Governed Response

**What it does:**
Takes the `JudgementResponseKind` selected by `JudgementEngine` and produces
the text of the DC's response — still as an `Action` passing through `AuthorityEngine`.

**Why it does not exist:**
`JudgementEngine` selects a response kind. There is nothing that converts
`kind: "ask"` + `Understanding.summary` into a contextually appropriate question.
`speak.ts` does this but for the wrong `JudgementResult` type.

**Size:** One function — converts governed `Judgement` + `ConversationContext`
into a communication `Action`.

```typescript
// Converts a governed Judgement into a communication Action.
// Response kind is already selected; this constructs the instruction for ActionEngine.
function judgementToConversationInstruction(
  judgement: Judgement,
  context: ConversationContext,
): string
```

**Location:** `lib/annie/conversation/speak.ts` — alongside the existing prototype,
as a new governed export. The existing `speakJudgement()` remains unchanged.

---

## Part 4 — The Smallest Implementation

Three functions. Three test files. No engine modifications.

### File 1: `lib/annie/conversation/listen.ts`

```typescript
humanSpeechToObservation(utterance: string, id: string): Observation
```

Takes a string. Returns an `Observation` with `source: "human"`.

---

### File 2: `lib/annie/translation/hospitalityConversationRules.ts`

```typescript
hospitalityConversationRules: TranslationRule[]
```

Rules that match `source === "human"` and extract professional meaning
from recognisable hospitality conversation topics.

The rules do not attempt to understand all speech.
Unrecognised speech produces no translation.
The DC does not pretend.

---

### File 3: `lib/annie/conversation/conversationSession.ts` (optional boundary proof)

A thin function that sequences the five proof conditions in one call:

```typescript
function annieConversationTurn(
  utterance: string,
  graph: KnowledgeGraph,
  context: FormationContext,
): ConversationTurnResult
```

Where `ConversationTurnResult` contains:
- `observation` — the governed `Observation`
- `translations` — what the DC understood
- `understanding` — the formed `Understanding`
- `judgement` — the governed `Judgement`
- `responseKind` — what kind of response was selected
- `execution` — the communication `Action` and its execution record

This function is the proof boundary. It does not produce text.
It proves the pipeline ran correctly.
Text production is a separate concern.

---

## Part 5 — Proposed Tests

### 5.1 Unit Tests — `listen.test.ts`

| Test | Proof Condition |
|---|---|
| Human utterance becomes `Observation` with `source: "human"` | PC1 |
| Observation carries the utterance as `description` | PC1 |
| Observation confidence is explicit, not invented | PC1 |

### 5.2 Unit Tests — `hospitalityConversationRules.test.ts`

| Test | Proof Condition |
|---|---|
| Shift-related utterance produces a translation | PC1 |
| Unrecognised utterance produces no translation | PC1, PC4 |
| Translation confidence reflects observation confidence | PC1 |
| Multiple hospitality topics produce multiple translations | PC1 |

### 5.3 Integration Tests — `milestone-045-conversation-boundary.test.ts`

| Test | Proof Condition |
|---|---|
| Human speech → Observation → Translation → form() — all existing engines unchanged | PC1 |
| Governed memory from KnowledgeGraph enriches Encounter 2 formation | PC2 |
| JudgementEngine selects `"ask"` from Understanding — not `"advise"` — when context is partial | PC2 |
| `JudgementResponseKind` routes through `AuthorityEngine` before any action | PC3 |
| `Judgement` with `disposition: "human-required"` produces `"escalate"` or `"admit-uncertainty"` — not silence | PC4 |
| A conversation without sufficient signal produces no `Learning.proposal` | PC5 |
| A conversation without `Learning.proposal` produces no `KnowledgeGraph` entry | PC5 |

---

## Part 6 — Architectural Risks

### Risk 1: `speak.ts` as a Reference Trap

`lib/annie/conversation/speak.ts` exists, exports from `index.ts`, and appears
to do exactly what Milestone 045 needs. It does not — it is wired to the
pre-governed OS layer. A future implementer will find it and use it.

**Mitigation:** The new governed conversation function must be clearly named and
documented as the canonical path. The existing `speakJudgement()` should receive
a `@deprecated` JSDoc pointing to the governed alternative — not deleted,
but marked as the pre-governed prototype.

---

### Risk 2: Translation Rules and LLM Boundary

In a real conversation, a human may say something that no `TranslationRule`
matches. The correct behaviour is: no translation produced, `form()` receives
empty translations, `Understanding.completeness` is `"insufficient"`,
`JudgementEngine` selects `"admit-uncertainty"` or `"ask"`.

The temptation will be to wire an LLM here to produce translations for
unmatched speech. This must not happen without explicit governance.

Per PD-005: the LLM's output is an observation. If an LLM is used to assist
translation, its output must enter as a `Translation` produced by a translation
rule that acknowledges the LLM as its source. It must not replace the
translation mechanism.

**Mitigation:** The test "unrecognised utterance produces no translation" is
the explicit proof of this boundary. It must pass before any LLM translation
assistance is introduced.

---

### Risk 3: Conversation Confidence

Human speech confidence is not the same as sensor confidence. A sensor
reading `0.97` is nearly certain. A human saying something at `0.97` confidence
is unusual — most human observations should carry moderate confidence
because the DC has not yet verified what was said.

**Mitigation:** `humanSpeechToObservation()` should accept an explicit `confidence`
parameter rather than defaulting to a high value. The caller (the DC) is
responsible for estimating how well it understood what was said.

---

## Part 7 — Implementation Boundary

When implementation begins:

**Create only:**
- `lib/annie/conversation/listen.ts` — `humanSpeechToObservation()`
- `lib/annie/translation/hospitalityConversationRules.ts` — human speech translation rules
- `lib/annie/conversation/conversationSession.ts` — optional boundary proof function
- Unit and integration tests for the above

**Add `@deprecated` JSDoc to:**
- `speakJudgement()` in `lib/annie/conversation/speak.ts` — with pointer to governed path

**Do not modify:**
- `form()` — no change
- `JudgementEngine` — no change
- `AuthorityEngine` — no change
- `ActionEngine` — no change
- `ExecutionEngine` — no change
- Any governance, reflection, or learning component
- `governedKnowledgeAdapter.ts` — no change
- `KnowledgeGraph` — no change

---

## Summary

### What is genuinely ready

The governed pipeline from Observation through to KnowledgeGraph already
handles human-sourced observations correctly. `ObservationSource` already
includes `"human"`. `form()` does not distinguish between observation sources.
`JudgementResponseKind` already includes all conversational response kinds.
`AuthorityEngine` already applies to any action kind.

### What is missing

| Missing component | Size |
|---|---|
| `humanSpeechToObservation()` | ~5 lines |
| `hospitalityConversationRules` | ~30 lines |
| Governed connection from `Judgement` to communication `Action` | ~15 lines |

### The pre-existing risk

`lib/annie/conversation/speak.ts` connects to the pre-governed OS layer.
It must be marked deprecated before implementation begins to prevent
a future developer from using it as the canonical path.

### The proof

Three small additions. Seven tests. No engine modifications.

The smallest proof that a conversation can exist without breaking the roots.
