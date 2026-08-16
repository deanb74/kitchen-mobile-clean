# Milestone 015 — Formation Input Ownership Boundary

**Date:** 2026-08-05

**Status:** Achieved

**Category:** Architecture Boundary Milestone

**Evidence:** `docs/architecture/FORMATION_INPUT_OWNERSHIP_MAP.md`

---

> Before the roads leading to the roundabout can be built,  
> the ownership of each road must be settled.
>
> This milestone settles that question.

---

## Achievement

Helping Hand has established the architectural ownership boundary for the three Formation input adapters — without writing any code.

The three decisions are:

1. **Translation Rule Selector** belongs to the DC layer.
2. **Context Assembler** belongs to the DC layer, consuming Venue Intelligence.
3. **Knowledge Assembler** belongs to the DC layer, using OS routing.

All three adapters belong to the same layer, for the same reason:

> COS owns the types and the mechanism.  
> The DC owns the content and the judgment of what is relevant.

---

## The Three Ownership Decisions

### Decision 1 — Translation Rule Selector: DC Layer

| Component | Owner |
|---|---|
| `translateObservations()` mechanism | COS — unchanged |
| `TranslationRule.matches()` predicate | DC — professional judgment |
| Hospitality translation rules | DC — Annie layer |
| `Translation` output type contract | COS — unchanged |

**Reason:** Deciding which rules match a situation requires professional knowledge. "This is a food-safety observation" is hospitality judgment. COS does not know what food safety means.

---

### Decision 2 — Context Assembler: DC Layer (consuming Venue Intelligence)

| Component | Owner |
|---|---|
| `FormationSituationalContext` type | COS — defines contract |
| `FormationInstitutionalContext` type | COS — defines contract |
| `AnnieThought` → situational context | DC cognitive layer |
| `ContextStore` → institutional context | Venue Intelligence (OS layer) |
| `VenueKnowledgeProfile` → venue state | Venue Intelligence (OS layer) |
| Assembly function | DC layer |

**`ContextStore` classification: B — Venue Intelligence capability.**

Evidence: `ContextStore` holds venue-specific accumulated facts — procedures, team, systems, business context. This is exactly what `docs/architecture/DIGITAL_COLLEAGUE_COGNITIVE_ARCHITECTURE.md` defines as Venue Intelligence. COS defines the type that this content must conform to. COS does not own the content.

**"Lucy sick three Mondays" boundary confirmed:** `kind: "local"` routes to `["digital-colleague"]` only. The personal record stays in Venue Intelligence. Abstracted patterns may become governed learning candidates. The record does not travel.

---

### Decision 3 — Knowledge Assembler: DC Layer (using OS routing)

| Component | Owner |
|---|---|
| `isKnowledgeApplicable()` | OS layer — already correct |
| `KnowledgeRouter` | OS layer — already correct |
| `KnowledgeAnswer.sourceLevel` tracking | OS layer — already correct |
| `KnowledgeAnswer → FormationKnowledge` conversion | DC layer |
| `FormationKnowledge` type contract | COS — defines contract |

**Source authority mapping:**

| `KnowledgeAnswer.sourceLevel` | `FormationKnowledge.evidenceLevel` |
|---|---|
| `"helping-hand"` | `"constitutional"` |
| `"profession"` | `"professional"` |
| `"organisation"` | `"professional"` |
| `"venue"` | `"local"` |

**Reason:** The OS routes and stores. The DC presents. Converting a governed answer into a Formation input is the DC's act of incorporating knowledge into the formation it is about to invoke.

---

## ContextStore Migration Decision

`ContextStore` currently lives in `lib/onboarding/contextStore.ts`.

**Agreed target: `lib/os/context/contextStore.ts`**

Reason: Venue-specific accumulated facts belong in Venue Intelligence alongside `VenueKnowledgeProfile` and `KnowledgeRouter`. `platform/cos/context/` is a planned Phase 5 COS capability for universal context interfaces — not the correct home for venue-specific data.

---

## What Must Not Happen

**Do not place adapters in COS.**

If `translateHospitalityObservations()` or any equivalent moves into COS, COS becomes profession-aware. The invariants from Milestone 013 were designed to prevent this.

**Do not place adapters in the OS.**

The OS routes and stores. It does not know which knowledge, context, or rules are relevant to a specific situation. That judgment belongs to the DC.

**Do not hardcode Formation inputs in production code.**

Hand-authored inputs are correct for COS mechanism tests. Production usage must assemble inputs through DC-layer adapters.

---

## The Architecture This Milestone Confirms

```
HH HQ — universal principles
  ↓ through KnowledgeRouter
Professional HQ — industry standards
  ↓ through KnowledgeRouter
Organisation HQ — optional, multi-site only
  ↓ through KnowledgeRouter
OS / Venue Intelligence
  ContextStore, VenueKnowledgeProfile, KnowledgeRouter, isKnowledgeApplicable
  ↓ consumed by
Digital Colleague Layer ← all three adapters live here
  Adapter 1: Translation Rule Selector
  Adapter 2: Context Assembler
  Adapter 3: Knowledge Assembler
  ↓ supplies Translation[] + FormationContext + FormationKnowledge[]
COS Understanding Formation — mechanism + type contracts + invariants
  ↓
Understanding → JudgementEngine
```

---

## Pre-Implementation Checklist — Confirmed

| Item | Status |
|---|---|
| All three adapters belong in DC layer | ✓ |
| `isKnowledgeApplicable()` stays in OS | ✓ No change |
| `KnowledgeRouter` stays in OS | ✓ No change |
| COS `form()` stays unchanged | ✓ Milestone 013 boundary is settled |
| `ContextStore` migration target agreed | `lib/os/context/contextStore.ts` |
| No professional logic enters COS | ✓ Enforced by type contract only |
| Source authority preserved through adapters | ✓ `sourceLevel → evidenceLevel` lookup |

---

## Traceability

| Layer | Source |
|---|---|
| Constitutional | `constitution/02-CONSTITUTION.md` — Article II: "Seek first to understand." |
| Theory | `docs/theory/003-THEORY-OF-UNDERSTANDING.md` — "Understanding emerges when knowledge is interpreted within context." |
| Architecture | `docs/architecture/DIGITAL_COLLEAGUE_COGNITIVE_ARCHITECTURE.md` — Context Formation, Venue Intelligence, Knowledge Sources |
| Architecture | `docs/architecture/FORMATION_INPUT_OWNERSHIP_MAP.md` — this milestone's evidence document |
| Implementation | `platform/cos/understanding-formation/` — Milestone 013 capability |
| Prior analysis | `docs/milestones/MILESTONE_014_UNDERSTANDING_FORMATION_INPUT_BOUNDARY_ANALYSIS.md` |

---

## What This Milestone Does Not Include

Explicitly deferred to Milestone 016:

- Implementation of the three adapters
- Migration of `ContextStore` to `lib/os/context/`
- Enrichment of translation rule `matches()` predicates
- Annie production integration
- End-to-end Formation Input pipeline test

---

## Next Milestone — Earned

> MILESTONE_016 — Formation Input Adapters (Implementation)
>
> Implement the three DC-layer adapters:
> 1. `thoughtToSituationalContext(thought: AnnieThought) → FormationSituationalContext`
> 2. `contextStoreToInstitutional(entries: ContextEntry[]) → FormationInstitutionalContext[]`
> 3. `knowledgeAnswerToFormation(answer: KnowledgeAnswer) → FormationKnowledge`
>
> Pre-condition: `ContextStore` migrated to `lib/os/context/contextStore.ts`.
>
> Success criterion: A DC can invoke `form()` with inputs assembled entirely from
> existing capabilities — no hand-authored content required.

---

**Status:** Ownership boundary established | Architecture decisions recorded | No code written | Milestone 016 pre-conditions documented
