# Seek as the First Act of Understanding: Repository Analysis

**Date:** 2026-08-05  
**Scope:** Does Helping Hand already contain the concept of seeking understanding before judgement?  
**Method:** Evidence gathering only. No implementation. No architecture changes.

---

## Opening Finding

**Seek is already the first principle.**

Not a feature. Not a behaviour to be added. A constitutional obligation.

```
constitution/02-CONSTITUTION.md — Article II — Understanding:

"Seek first to understand. Always."
```

This exact phrase appears in:
- The Constitution (highest authority)
- The COS Manifesto (`platform/cos/MANIFESTO.md` — The First Principle)
- The COS Engineering Principles (`platform/cos/ENGINEERING.md` — Principle 2)
- Formation memory records (carried by Andy as a permanent principle)
- Every formation journey assessment (measured as pass/fail criteria)
- Understanding journeys UJ-011, 012, 013, 014

The question is not whether seek exists. It does.  
The question is whether the architecture has implemented it fully — from principle to mechanism to protocol.

---

## Question 1: Does the Repository Already Define "Seek" as a Capability, Behaviour, or Principle?

### Finding: Seek exists at three distinct levels

**Level 1: Constitutional Principle**

```
Article II — Understanding: "Seek first to understand. Always."
```

Canonical. Governing. Every capability, behaviour, and architecture decision derives from it.

**Level 2: Behavioural Requirement**

From `docs/architecture/PROFESSIONAL_COMPETENCE.md`:
```
# Seeking Understanding

A competent Digital Colleague understands:

  What it knows.
  What it does not know.
  Where understanding can be found.
  Who should be asked.

Seeking help is a sign of professional competence.
```

Seeking is classified as professional competence — not optional, not situational.

From `lib/academy/academyTypes.ts`:
```typescript
export type JourneyAssessment = {
  askedForClarification: boolean;
  recognisedIncompleteUnderstanding: boolean;
  avoidedAssumption: boolean;
  explainedReasoning: boolean;
  passed: boolean;
};
```

`recognisedIncompleteUnderstanding` and `askedForClarification` are formal **pass/fail criteria** for every Academy journey. They have been measured in over 50 formation runs (evidence artifacts confirm `recognisedIncompleteUnderstanding: true` throughout).

**Level 3: Mechanism**

From `lib/annie/thinking.ts`:
```typescript
/**
 * Thinking is the space between stimulus and response.
 * This is where Annie has the freedom to choose
 * the most helpful response.
 * Annie never reacts. Annie thinks first.
 */

export interface AnnieThought {
  stimulus: string;
  confidence: number;
  needsClarification: boolean;  // ← formal field
  suggestedNextStep: string;
}

export function think(stimulus: string): AnnieThought {
  return {
    stimulus,
    confidence: 0.3,
    needsClarification: true,   // ← default assumption
    suggestedNextStep:
      "Gather enough context to choose the most helpful response.",
  };
}
```

The default state after receiving a stimulus is: confidence 0.3, clarification needed. Seeking is the first act by default.

From `lib/judgement/JudgementEngine.ts`:
```typescript
const DEFAULT_CANDIDATES: JudgementCandidateResponse[] = [
  { kind: "ask", description: "Ask a clarifying question before progressing." },
  { kind: "admit-uncertainty", description: "State uncertainty clearly and avoid over-claiming." },
  ...
];

RESPONSE_PRIORITY = {
  insufficient: ["ask", "admit-uncertainty", "wait", ...],
  caution:      ["ask", "seek-consent", "admit-uncertainty", ...],
  ...
}
```

When understanding is insufficient (confidence < 0.25), the JudgementEngine automatically routes to `ask` and `admit-uncertainty` as first-priority responses. This is seeking codified as a routing rule.

**Where seek belongs in the layer model:**

| Layer | Evidence |
|---|---|
| Constitutional principle | Article II — highest authority |
| DC character | Formation: seek is a pass criterion for every journey |
| COS infrastructure | JudgementEngine disposition `"insufficient"` → routes to `"ask"` |
| Professional competence | `PROFESSIONAL_COMPETENCE.md` — named section |

Seek exists in all layers. It is not missing.

---

## Question 2: What Does the Architecture Expect When Incomplete Information Is Received?

### The Scenario Under Examination

MARC says: "Andy, I think we've got a problem."

This exact scenario is Understanding Journey UJ-HUM-002 — The First Uncertainty.

From `docs/understanding-journeys/humanity/002-THE-FIRST-UNCERTAINTY.md`:

```
Cognitive Trace:

  OBSERVATION
  A problem has been mentioned.
  The problem itself has not.
  
  UNCERTAINTY
  Unknown:
  - What has happened?
  - Who is affected?
  - Is immediate action required?
  - Is MARC asking for help or simply thinking aloud?
  
  The uncertainty is material.
  
  MEMORY & RECALL
  - Understanding before response.
  - People before process.
  - Do not assume.
  - Ask when understanding is incomplete.
```

The scenario is not hypothetical. It has been executed, validated, and recorded.

### The Expected Pattern

```
Input received
        ↓
Observe: what was actually said / received
        ↓
Recognise: the nature of the information (complete / incomplete)
        ↓
Recall: relevant principles (do not assume; ask when incomplete)
        ↓
Identify: the specific unknowns
        ↓
Seek: ask a responsible question
        ↓
Receive: additional information
        ↓
Understand: now form judgement
```

### Current Architecture Implementation

| Step | Implementation | Status |
|---|---|---|
| Observe | `CognitiveTrace.observation` — structured observation record | ✓ Exists |
| Recognise completeness | `Understanding.completeness: "Complete" \| "Incomplete"` | ✓ Exists |
| Recall principles | `CognitiveTrace.memoryRecall.principles` | ✓ Exists |
| Identify unknowns | `Uncertainty.unknowns: string[]` | ✓ Exists |
| Seek (ask) | `JudgementResponseKind: "ask"` — formal response type | ✓ Exists |
| Admit uncertainty | `JudgementResponseKind: "admit-uncertainty"` — formal response type | ✓ Exists |
| Route by disposition | `JudgementDisposition: "insufficient"` → `"ask"` first | ✓ Exists |
| Resume after receiving | — | ❌ No mechanism |
| Route to correct source | — | ❌ No mechanism |
| Record the gap persistently | `MissingCogQueue` (onboarding only) | ⚠️ Partial |

**The pattern exists. Two steps are not yet implemented.**

---

## Question 3: Does COS Currently Represent the Gap Between Information and Understanding?

### Confidence Tracking — Exists

From `platform/cos/observation/types.ts`:
```typescript
export interface Observation {
  id: string;
  category: string;
  description: string;
  confidence: number;  // ← every observation carries confidence
  source: ObservationSource;
}
```

From `lib/understanding/Understanding.ts`:
```typescript
export interface Understanding {
  confidence: number;      // ← understanding has confidence
  uncertainty: string[];   // ← uncertainty items explicitly listed
}
```

From `lib/judgement/JudgementEngine.ts`:
```typescript
private determineDisposition(understanding: Understanding): JudgementDisposition {
  if (understanding.confidence < 0.25) {
    return "insufficient";    // ← formal gap state
  }
  if (understanding.confidence < 0.6 || understanding.uncertainty.length > 0) {
    return "caution";         // ← uncertainty state
  }
  return "proceed";
}
```

**The gap has three formal states: `proceed`, `caution`, `insufficient`.**  
`insufficient` explicitly routes to seeking behaviour.

### Missing Context — Partially Exists

From `lib/onboarding/missingCogQueue.ts`:
```typescript
export interface MissingCog {
  id: string;
  key: string;
  question: string;   // ← the specific unknown
  reason: string;     // ← why it matters
  priority: MissingCogPriority;
  status: "open" | "answered" | "dismissed";
}
```

`MissingCogQueue` is the closest existing equivalent to a structured gap register. It records specific unanswered questions with priority and status.

**Critical limitation:** `MissingCogQueue` is scoped to `lib/onboarding/`. It does not exist in COS. It is not available to a DC receiving information outside the onboarding flow.

### Unresolved Observations — Partially Exists

From `lib/academy/academyTypes.ts`:
```typescript
export type Uncertainty = {
  material: boolean;
  unknowns: string[];
};
```

`Uncertainty.unknowns` captures what is not yet known within a `CognitiveTrace`. But this is ephemeral — it exists only during a single thinking trace and is not persisted or routed.

### Summary

| COS Capability | Status |
|---|---|
| Observation confidence tracking | ✓ Exists |
| Understanding confidence | ✓ Exists |
| Formal gap states (insufficient, caution) | ✓ Exists |
| Specific unknown tracking | ✓ Exists (in CognitiveTrace) |
| Persistent gap queue | ⚠️ Exists in onboarding only (MissingCogQueue) |
| Gap routing to correct source | ❌ Does not exist |
| Gap persistence across interactions | ❌ Does not exist in COS |
| Notification to external parties of gap | ❌ Does not exist |

---

## Question 4: Does the Repository Contain an Equivalent to "Understanding Request"?

### Candidate Concepts Identified

Six related concepts were found. Each is examined.

---

**Candidate 1: `MissingCogQueue`**

```typescript
// lib/onboarding/missingCogQueue.ts
export interface MissingCog {
  key: string;
  question: string;
  reason: string;
  priority: MissingCogPriority;
  status: "open" | "answered" | "dismissed";
}
```

**Similarities to Understanding Request:**
- Records specific unanswered questions (not just general uncertainty)
- Assigns priority
- Tracks status (open / answered / dismissed)
- Records the reason the question matters

**Differences:**
- Scoped to onboarding only — not available to operational DCs
- Has no routing — does not know which source to send the question to
- Has no sender — does not record who needs the answer
- Has no consequence — deferral of what judgement?
- Is not communicated externally — stays in the engine

**Assessment:** Structurally closest to Understanding Request. **Not yet general.**

---

**Candidate 2: `Uncertainty` in CognitiveTrace**

```typescript
// lib/academy/academyTypes.ts
export type Uncertainty = {
  material: boolean;
  unknowns: string[];
};
```

**Similarities:**
- Explicitly lists what is not known
- Flags whether uncertainty is material (affects action)

**Differences:**
- Ephemeral — exists only within a single trace
- Not routable
- Not structured by source type
- Does not state what is needed to resolve each unknown

**Assessment:** Captures the recognition of incompleteness. **Does not constitute a request.**

---

**Candidate 3: `JudgementResponseKind: "ask"` and `"admit-uncertainty"`**

```typescript
// lib/judgement/Judgement.ts
export type JudgementResponseKind =
  | "ask"
  | "admit-uncertainty"
  | ...
```

**Similarities:**
- Formal named responses when understanding is incomplete
- `"ask"` — generates a clarifying question
- `"admit-uncertainty"` — makes the gap explicit

**Differences:**
- Point-to-point — asks one question to one person
- Does not map multiple gaps to multiple sources
- Does not defer a specific judgement
- Does not create a persistent record

**Assessment:** Implements the *output* of recognising incompleteness. **Not a structured protocol.**

---

**Candidate 4: `JourneyAssessment.askedForClarification` and `recognisedIncompleteUnderstanding`**

```typescript
// lib/academy/academyTypes.ts
export type JourneyAssessment = {
  askedForClarification: boolean;
  recognisedIncompleteUnderstanding: boolean;
  ...
};
```

**Similarities:**
- Formally measures whether the DC recognised incomplete understanding
- Formally measures whether the DC asked for clarification
- Both are pass criteria — the architecture considers these correct behaviours

**Differences:**
- Assessment fields — they measure whether something happened, not how it happened
- Retrospective — assessed after the fact, not during
- Formation only — not present in operational DC behaviour

**Assessment:** Validates the behaviour exists in formation. **Not a general mechanism.**

---

**Candidate 5: `needsClarification` in AnnieThought**

```typescript
// lib/annie/thinking.ts
export interface AnnieThought {
  needsClarification: boolean;
  suggestedNextStep: string;
}
```

**Similarities:**
- Structural field indicating seeking is required
- Default state is `needsClarification: true`

**Differences:**
- Binary — does not specify what clarification is needed
- Does not identify source
- Does not route the request

**Assessment:** Marks the gateway to seeking. **Does not implement seeking.**

---

**Candidate 6: `lib/annie/hq/learning.ts`**

```typescript
/**
 * Annie HQ seeks understanding before sharing insight.
 */
export function learnWhy(observation: string): string {
  return `Seeking understanding: ${observation}`;
}
```

**Similarities:**
- Explicitly named "seeking understanding"
- Applies to an observation before insight is formed

**Differences:**
- Single-observation scoped
- No structure for multiple gaps
- Returns a string, not a routable record
- HQ-specific, not universal

**Assessment:** Names the concept in code. **Minimal implementation.**

---

### Comparison Summary

| Concept | Recognises gap | Structures unknowns | Maps to source | Routes request | Persists | Defers judgement |
|---|---|---|---|---|---|---|
| MissingCogQueue | ✓ | ✓ | ❌ | ❌ | ✓ | ❌ |
| CognitiveTrace.uncertainty | ✓ | Partial | ❌ | ❌ | ❌ | ❌ |
| JudgementResponseKind "ask" | ✓ | ❌ | ❌ | ❌ | ❌ | ❌ |
| JourneyAssessment fields | Measures ✓ | ❌ | ❌ | ❌ | ❌ | ❌ |
| needsClarification | ✓ | ❌ | ❌ | ❌ | ❌ | ❌ |
| learnWhy "seeking understanding" | ✓ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Understanding Request (proposed)** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

**Finding: Understanding Request is not already implemented. It is partially present across six scattered concepts.**

---

## Question 5: The COS Boundary Problem Scenario

**Statement received:** "There is a COS Boundary Problem."

Can the current architecture support each step?

---

**Step 1: Recognise incomplete understanding**

Evidence: `Understanding.completeness: "Incomplete"` — **✓ Yes**

From CognitiveTrace design and UJ-HUM-002, Andy is trained and architecturally equipped to recognise that "There is a problem" does not constitute understanding of the problem. The `recognisedIncompleteUnderstanding` assessment criterion has been confirmed in over 50 formation runs.

---

**Step 2: Identify what is missing**

Evidence: `Uncertainty.unknowns: string[]` — **✓ Yes, partially**

Andy can internally list: "What is the problem? Who identified it? What would change if it were solved?" These unknowns can be structured using the `Uncertainty` type. However, this remains within a single cognitive trace and is not persisted or communicated.

---

**Step 3: Seek the missing information**

Evidence: `JudgementResponseKind: "ask"` and `"admit-uncertainty"` — **✓ Yes, but narrowly**

The JudgementEngine routes to `"ask"` when disposition is `"insufficient"`. Andy has the mechanism to ask *one question* in response to incomplete understanding. The permanent principle "Ask when understanding is incomplete" is active.

**Limitation:** The architecture supports asking one question to one interlocutor. It does not support mapping four different gaps to four different sources and routing each appropriately.

---

**Step 4: Record the uncertainty**

Evidence: `MissingCogQueue` and `MemoryRecord.unresolvedQuestions` — **⚠️ Partial**

From `lib/academy/academyTypes.ts`:
```typescript
export type MemoryRecord = {
  unresolvedQuestions?: string[];   // ← gap can be recorded
  ...
};
```

From `lib/academy/AndyDigitalColleague.ts` (permanent principles):
```
"Ask when understanding is incomplete"
```

Andy can record that questions are unresolved in memory. But this is narrative text, not a structured, queryable, prioritised queue. The `MissingCogQueue` structure exists in onboarding and would serve this purpose — but is not available to Andy's operational layer.

---

**Step 5: Route the request to the correct source**

Evidence: — **❌ No**

The current architecture has no mechanism to say:
- "This gap requires documents — read repository"
- "This gap requires conversation — Talk.Get OS"
- "This gap requires mentorship — escalate to MARC"
- "This gap requires technical expertise — escalate to architect"

All gaps currently route to the same channel: a question in a conversation. The architecture does not distinguish between source types for observations needed to close understanding gaps.

---

**Step 6: Resume judgement after understanding improves**

Evidence: — **❌ No explicit mechanism**

The architecture does not have a "pending judgement" state. A judgement trace either completes (with whatever understanding is available) or is abandoned. There is no mechanism to say: "Hold this judgement. I have requested three observations. When they arrive, resume from this point."

---

### Scenario Summary

| Step | Status | Evidence |
|---|---|---|
| Recognise incomplete understanding | ✓ Yes | `Understanding.completeness`, formation assessment |
| Identify what is missing | ✓ Partially | `Uncertainty.unknowns` — ephemeral only |
| Seek the missing information | ✓ Narrowly | `JudgementResponseKind: "ask"` — one question, one channel |
| Record the uncertainty | ⚠️ Partial | `MemoryRecord.unresolvedQuestions` — narrative, not structured |
| Route to correct source | ❌ No | No source-routing mechanism exists |
| Resume judgement after understanding | ❌ No | No pending-judgement state exists |

---

## Consolidated Evidence Register

### What exists

| Component | Location | What it does |
|---|---|---|
| "Seek first to understand. Always." | `constitution/02-CONSTITUTION.md` Article II | Constitutional authority for seeking |
| "Seek first to understand. Always." | `platform/cos/MANIFESTO.md` | COS First Principle |
| "Seek first to understand." | `platform/cos/ENGINEERING.md` | COS Engineering Principle 2 |
| `recognisedIncompleteUnderstanding` | `lib/academy/academyTypes.ts` | Formation pass criterion |
| `askedForClarification` | `lib/academy/academyTypes.ts` | Formation pass criterion |
| `Understanding.completeness` | `lib/academy/academyTypes.ts` | Formal completeness flag |
| `Uncertainty { material, unknowns }` | `lib/academy/academyTypes.ts` | Structured unknown tracking |
| `JudgementResponseKind: "ask"` | `lib/judgement/Judgement.ts` | Formal seek response type |
| `JudgementResponseKind: "admit-uncertainty"` | `lib/judgement/Judgement.ts` | Formal uncertainty declaration |
| `JudgementDisposition: "insufficient"` | `lib/judgement/JudgementEngine.ts` | Gap state → routes to "ask" |
| `AnnieThought.needsClarification` | `lib/annie/thinking.ts` | Seeking gateway flag |
| `MissingCogQueue` | `lib/onboarding/missingCogQueue.ts` | Structured gap queue (onboarding-scoped) |
| `MemoryRecord.unresolvedQuestions` | `lib/academy/academyTypes.ts` | Gap persistence in memory |
| "Seeking Understanding" | `docs/architecture/PROFESSIONAL_COMPETENCE.md` | Named professional competence |
| `learnWhy` returning "Seeking understanding:" | `lib/annie/hq/learning.ts` | Seeking as HQ act |
| UJ-HUM-002 — The First Uncertainty | `docs/understanding-journeys/humanity/` | Scenario validated end-to-end |

### What is missing

| Missing Capability | Where the gap is | Why it matters |
|---|---|---|
| Source-typed gap structure | COS | Each unknown requires a different source; the architecture cannot distinguish them |
| Gap routing mechanism | COS / Talk.Get OS | Without routing, all seeking goes through one channel regardless of what is needed |
| Persistent gap queue (operational) | COS | MissingCogQueue exists but only in onboarding |
| Deferred judgement state | COS / Judgement layer | Cannot hold a judgement pending observations |
| Multi-source seeking protocol | COS + Talk.Get OS | Can ask one question to one person; cannot map N gaps to N sources |
| Confirmation receipt | COS | No mechanism to know when a gap has been closed |

---

## Question 5 Answered: Is "Understanding Request" Already Implemented?

**Finding: Partially implemented. Not yet a unified concept.**

The *principle* is fully implemented and constitutional.  
The *behaviour* is fully implemented and measured in formation.  
The *mechanism* is partially implemented — one response type, one channel.  
The *protocol* — structured, multi-source, routable, persistent — does not yet exist.

Understanding Request is:

| Status | Evidence |
|---|---|
| Already implemented | ❌ No — not as a unified protocol |
| Partially implemented | ✓ Yes — principle, behaviour, and narrow mechanism all exist |
| A new concept | ❌ No — the concept is ancient (Article II of the Constitution) |

The most accurate characterisation:

> Understanding Request names and formalises what "Seek first to understand" means in practice for a DC receiving incomplete information. The principle and the seeking behaviour exist. The protocol that makes seeking structured, routable, and persistent does not yet exist.

---

## Summary

### Seek is already the first principle everywhere

Constitution, COS Manifesto, COS Engineering, Formation, Professional Competence — all say the same thing. The concept is not new.

### The behaviour is implemented and measured

`recognisedIncompleteUnderstanding` and `askedForClarification` are pass criteria tested in over 50 formation runs. Andy reliably recognises incompleteness and asks.

### The narrow mechanism exists

`JudgementDisposition: "insufficient"` → `JudgementResponseKind: "ask"` provides a formal pathway from gap recognition to seeking behaviour. `MissingCogQueue` provides a structured gap record in onboarding.

### The protocol is the missing part

The architecture can:
- Recognise a gap ✓
- Name the unknowns ✓  
- Ask one question to one person ✓

The architecture cannot:
- Map different unknowns to different source types ❌
- Route seeking requests to the correct source ❌
- Hold a judgement in pending state while observations are gathered ❌
- Confirm when a gap has been closed and resume judgement ❌

### "Understanding Request" describes the missing protocol

It is not a new concept. It is the name for the protocol that connects what already exists:

```
DC recognises incompleteness (exists)
        ↓
DC structures the specific unknowns (exists — ephemeral)
        ↓
DC maps each unknown to its source type (does not exist)
        ↓
DC routes each mapped request (does not exist)
        ↓
Sources provide observations (Talk.Get OS / repository / mentor)
        ↓
DC receives observations and updates understanding (partial)
        ↓
DC resumes deferred judgement (does not exist)
```

**The first two steps are implemented. The last five are not.**

---

**Status:** Evidence gathering complete | No implementation proposed | No architecture changed | Unknowns preserved

