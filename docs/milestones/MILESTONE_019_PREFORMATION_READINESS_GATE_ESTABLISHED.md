# Milestone 019 — Pre-Formation Readiness Gate Established

**Date:** 2026-08-05

**Status:** Achieved

**Category:** Companion Intelligence Boundary Milestone

**Evidence:**
- `platform/cos/understanding-formation/readiness.ts` — `validateFormationInputs()`
- `lib/annie/formation/readinessAdapter.ts` — `assessReadiness()`
- `lib/annie/formation/__tests__/milestone-019-readiness.test.ts` — 12 tests
- **71 tests passing across 6 suites**

---

> A chatbot tries to answer.  
> An AI assistant tries to predict.  
> A Digital Colleague first asks: *Do I understand enough to be useful?*
>
> This milestone establishes the boundary at which that question is answered.

---

## Achievement

A Digital Colleague can now determine whether it should attempt Understanding Formation or first seek missing inputs.

The Pre-Formation Readiness Gate is established. The seeking loop is governed. The phrase "I don't know yet" is now a valid, architected state — not an error condition.

---

## What Was Built

### COS: `validateFormationInputs()` in `platform/cos/understanding-formation/`

```typescript
validateFormationInputs(input: Partial<FormationInput>): StructuralReadinessReport {
  structurallyReady: boolean;
  structuralGaps: string[];
}
```

Structural check only. Knows nothing about professional domains. No professional terms in source file — verified by boundary test. Checks:
- `translations.length > 0`
- `translations.every(confidence >= 0.7)` (all-low-confidence guard)
- `context.situational` has at least one populated field
- `knowledge.length > 0`

### DC: `assessReadiness()` in `lib/annie/formation/`

```typescript
assessReadiness(
  thought: AnnieThought,
  candidateInput: Partial<FormationInput>,
  professionalGaps?: string[],
): ReadinessDecision {
  ready: boolean;
  nextStep: "form" | "observe" | "ask" | "research" | "remember" | "wait";
  gaps: string[];
  explanation?: string;
}
```

Combines DC cognitive state (`AnnieThought`) + COS structural report + professional gaps. Bridges to `seekFirstToUnderstand()` for routing. Returns `ReadinessDecision`.

---

## Architecture Decisions

### `validateFormationInputs()` belongs to COS — structural only

COS owns the Formation type contract. COS owns structural validation of that contract. The function checks Formation type fields without any domain knowledge. Exported alongside `form()` and `checkAllInvariants()` from the Formation module.

### `assessReadiness()` belongs to DC cognitive layer

Professional readiness requires professional judgment. Annie knows whether she has the right hospitality translations, adequate food-safety knowledge, and appropriate situational context. COS does not. The DC combines its own assessment (`AnnieThought.needsClarification`, `confidence`) with the COS structural report.

### `seekFirstToUnderstand()` remains the routing mechanism — unchanged

The routing logic in `platform/core/companion/` is correct. The DC gate assembles `CompanionInput` from Formation input state and `AnnieThought`, then routes to `seekFirstToUnderstand()`. The function itself is not modified.

### `gaps[]` represents evidence of missing inputs

Not reasoning. Not inference. The gaps array names what Formation types are absent (structural, from COS) and what domain content is missing (professional, from DC). It is evidence of absence, not analysis of why.

### `explanation` describes navigation, not reasoning

`explanation?: string` is a human-readable description of the routing choice. It is optional. It does not contain chain-of-thought reasoning. It complements `gaps[]` without replacing it.

---

## The Four Tests

| Test | Input | nextStep | Key assertion |
|---|---|---|---|
| No translation | Empty translations | `"observe"` | COS gap names "translated" — no professional terms |
| Missing knowledge | Translations + context, no knowledge | `"research"` | COS gap names "knowledge" without domain content |
| Complete inputs | Full Formation inputs, confident DC | `"form"` | gaps: [], ready: true |
| Fridge lifecycle | Observation → seek loop → form() | observe → research → form | No human-authored Understanding at any step |

---

## The Seeking Loop — Now Governed

```
Stimulus
   ↓
Observation
   ↓
DC Interpretation Layer
   ↓
PRE-FORMATION READINESS GATE    ← this milestone
   ↓
   ├─ NOT READY
   │   observe / ask / research / remember / wait
   │   → seeks missing input
   │   → loops back to DC Interpretation Layer
   │   → re-evaluates readiness
   │
   └─ READY → form() → Understanding → JudgementEngine → ...
```

---

## Boundary Confirmed

```
COS owns:
  validateFormationInputs()  — structural check on Formation types
  StructuralReadinessReport  — structural gaps only

DC owns:
  assessReadiness()          — combines structural + professional assessment
  ReadinessDecision          — combines structural + professional gaps + routing

Routing:
  seekFirstToUnderstand()   — unchanged; called from DC gate
```

**COS source files verified to contain no professional domain terms** — enforced by Milestone 016 boundary test, now extended to `readiness.ts`.

---

## What This Milestone Does Not Include

Explicitly deferred:

| Item | Status |
|---|---|
| Talk.Get OS — conversational channel for readiness asks | Deferred |
| Learning loop closure (`ApprovedKnowledgeChange` → `KnowledgeGraph`) | Deferred |
| KnowledgeGraph changes | Deferred |
| `platform/core/companion/` architecture migration | Deferred |
| Annie production brain integration | Deferred |
| `ContextStore` migration to `lib/os/context/` | Deferred — boundary agreed |

---

## Traceability

| Layer | Source |
|---|---|
| Constitutional | `constitution/02-CONSTITUTION.md` — Article II: "Seek first to understand. Always." |
| Theory | `docs/theory/004-THEORY-OF-JUDGEMENT.md` — "Judgement cannot exist without understanding." |
| Architecture | `docs/architecture/UNDERSTANDING_SUFFICIENCY_BOUNDARY_ANALYSIS.md` — Milestone 018 |
| Architecture | `docs/architecture/PRE_FORMATION_READINESS_GATE_BOUNDARY_ANALYSIS.md` — Milestone 019 analysis |
| Architecture | `docs/architecture/PRE_FORMATION_READINESS_OUTPUT_BOUNDARY_ANALYSIS.md` — output contract |
| Implementation | `platform/cos/understanding-formation/readiness.ts` |
| Implementation | `lib/annie/formation/readinessAdapter.ts` |
| Evidence | 71 tests passing across 6 suites |
