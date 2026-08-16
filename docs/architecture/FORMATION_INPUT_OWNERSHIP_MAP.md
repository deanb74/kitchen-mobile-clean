# Formation Input Ownership Map

**Date:** 2026-08-05  
**Milestone:** 015  
**Status:** Architecture Boundary — Pre-Implementation  
**Purpose:** Establish where the three Formation input adapters belong before any code is written.

---

## The Question

Milestone 014 proved that all three Formation inputs can be assembled from existing capabilities.

This document answers the prior question:

> **In which architectural layer do the assembly adapters belong?**

If an adapter is placed in the wrong layer, the boundary that Milestone 013 established will erode. The purpose of this document is to prevent that.

---

## The Governing Principle

From `platform/cos/MANIFESTO.md`:

> Every behaviour within COS grows from this principle:  
> **Seek first to understand. Always.**

From the established COS pattern:

> **Mechanism is universal. Content is professional.**

From `docs/architecture/DIGITAL_COLLEAGUE_COGNITIVE_ARCHITECTURE.md`:

> The cognitive architecture should support many professions without reducing them to one generic pattern. Every Digital Colleague should inherit the same constitutional foundation. Each profession should then express cognition through its own vocabulary, knowledge base, risk thresholds, and escalation boundaries.

Applied to Formation:

```
COS owns:  what types the inputs must conform to
           how those types combine into Understanding
           the invariants that govern the output

DC owns:   what content those types contain
           which professional rules apply
           what context this situation requires
           which knowledge governs this decision
```

---

## 1. Translation Adapter Ownership

### The Question

Who owns the selection of which `TranslationRule[]` to apply?

### Evidence

**The mechanism owner is COS:**

```typescript
// platform/cos/translation/translator.ts
export function translateObservations(
  observations: Observation[],
  rules: TranslationRule[]
): Translation[] {
  return observations.flatMap((observation) =>
    rules.filter((rule) => rule.matches(observation))
         .map((rule) => rule.translate(observation))
  );
}
```

COS applies rules. COS does not know what the rules mean or which situation they serve. It is a mechanical application.

**The content owner is the DC:**

```typescript
// lib/annie/translation/hospitalityRules.ts
export const hospitalityTranslationRules: TranslationRule[] = [...]
```

```typescript
// lib/annie/observation/curiosity.ts
/**
 * COS provides the universal curiosity mechanism.
 * Annie supplies the questions that require hospitality understanding.
 */
export const hospitalityCuriosityRule: CuriosityRule = ...
```

Annie decides what observations mean in a hospitality context. COS applies her decision.

### Ownership Decision

```
Translation Adapter belongs to: DC Layer

Reason:
  Deciding WHICH rules match a situation requires professional judgment.
  "This is a temperature observation in a food-safety context" is
  hospitality knowledge. COS does not know what food safety means.
  The DC does.

  Deciding HOW to apply matched rules belongs to COS.
  translateObservations() is already correctly positioned.
```

### Boundary Line

```
DC                                   COS
────────────────────────────────   ────────────────────────────────
Selects which rules are relevant    Applies the selected rules
Provides TranslationRule[]          Returns Translation[]
Owns matches() predicate logic      Owns translate() mechanism
Owns domain meaning (meaning field) Owns Translation type contract
                                    Owns Translation output shape
```

**Confirmed: no professional logic belongs inside `translateObservations()` or any COS mechanism.**

---

## 2. Context Assembly Ownership

### The Question

Who owns the assembly of `FormationContext`? And what kind of capability is `ContextStore`?

### The Two Context Types

`FormationContext` contains two distinct parts with different ownership:

**Situational Context** — the live moment

```typescript
interface FormationSituationalContext {
  urgency?: FormationUrgency;
  risk?: string;
  who?: string;
  what?: string;
  where?: string;
  purpose?: string;
}
```

This answers: "What is happening right now?"

Source: `AnnieThought` (DC cognitive layer)

```typescript
// lib/annie/thinking.ts
export interface AnnieThought {
  stimulus: string;
  who?: string;    // the person or situation
  what?: string;   // what is happening
  where?: string;  // where it is happening
  why?: string;    // the purpose or concern
  confidence: number;
  needsClarification: boolean;
}
```

`AnnieThought` IS Context Formation — the cognitive act of perceiving what situation this is. It lives in the DC cognitive layer because situational awareness requires professional judgment. A hospitality DC and a healthcare DC assess the same fridge temperature differently.

**Institutional Context** — accumulated venue knowledge

```typescript
interface FormationInstitutionalContext {
  category: string;
  key: string;
  value: string;
}
```

This answers: "What do I know about this environment?"

Source: `ContextStore` (Venue Intelligence) + `VenueKnowledgeProfile` (Venue Intelligence)

---

### What Kind of Capability Is `ContextStore`?

The three options:
- A) COS context capability
- B) OS / Venue Intelligence capability
- C) Shared resource consumed by COS

**Answer: B — Venue Intelligence capability**

Evidence from `docs/architecture/DIGITAL_COLLEAGUE_COGNITIVE_ARCHITECTURE.md`:

> **Venue Intelligence** provides local realities including procedures, equipment history, recurring issues, terminology and site constraints.

`ContextStore` contains exactly this:

```typescript
// lib/onboarding/contextStore.ts
type ContextCategory =
  | "business"      // ← venue business facts
  | "venue"         // ← venue physical facts
  | "team"          // ← team members and roles
  | "systems"       // ← technology in use
  | "communication" // ← communication preferences
  | "knowledge"     // ← accumulated learning
  | "memory";       // ← remembered events
```

These are venue-specific facts accumulated through Annie's operational experience. This is Venue Intelligence — it is not universal COS capability.

**Why not COS?**

COS capabilities must be universal across all professions and venues. `ContextStore` holds content that is different at every venue. COS defines the `FormationInstitutionalContext` type that this content must conform to. COS does not own the content itself.

**Why not shared resource consumed by COS?**

COS does not consume `ContextStore` directly. The DC consumes `ContextStore` when assembling `FormationContext`, then passes that context to COS. COS never holds a reference to `ContextStore`.

---

### The "Lucy Sick Three Mondays" Validation

"Lucy has had the last three Mondays off sick."

Classification:
- Source: `annie-conversation`, `annie-observation`
- `ContextStore` category: `"team"`
- `VenueProfileFact` dimension: `"team"` (if applicable)
- Knowledge kind: `"local"` in `platform/hq/knowledgeFlow.ts`

Routing evidence:

```typescript
// platform/hq/knowledgeFlow.ts
case "local":
  return ["digital-colleague"];
```

Routes exclusively to the DC. Does not reach Organisation HQ, Professional HQ, or Helping Hand HQ.

**This stays in Venue Intelligence. It is the correct layer.**

If a pattern emerges — "venues with this staffing structure should consider Monday rota resilience" — the *abstracted* learning may become a governed learning *candidate* through the pollination process. But the personal record is never the candidate. The personal record stays local.

---

### Ownership Decision

```
Context Assembler belongs to: DC Layer (consuming Venue Intelligence)

FormationSituationalContext:
  Owner:  DC cognitive layer (AnnieThought = DC professional perception)
  Source: AnnieThought (lib/annie/thinking.ts)
  Reason: Situational awareness requires professional judgment.
          What "urgent" means differs between professions.

FormationInstitutionalContext:
  Owner:  Venue Intelligence (OS layer)
  Source: ContextStore (lib/onboarding/ → should be lib/os/ or platform/cos/context/)
          VenueKnowledgeProfile (lib/os/knowledge/applicability/)
  Reason: These are venue-specific accumulated facts.
          They are local operational reality, not universal capability.

Assembly function:
  Owner:  DC Layer
  Reason: The DC knows which context is relevant to this situation.
          COS defines the types. The DC populates them.
```

### Boundary Line

```
DC                         Venue Intelligence (OS)    COS
────────────────────────   ──────────────────────    ────────────────────────
Provides AnnieThought       Provides ContextStore     Defines FormationContext
Performs assembly           Provides VenueProfile     type contract only
Supplies FormationContext   Holds local facts          Applies inputs to form()
to COS                      Enforces local routing
```

---

## 3. Knowledge Assembly Ownership

### The Question

Who owns applicability matching, HQ routing, source authority, and the conversion to `FormationKnowledge`?

### Applicability Matching — OS Layer

```typescript
// lib/os/knowledge/applicability/knowledgeApplicabilityMatcher.ts
export function isKnowledgeApplicable(
  knowledge: TaggedKnowledgePackage,
  venue: VenueKnowledgeProfile
): boolean { ... }
```

Already in the OS layer. Already tested. Already correctly positioned.

`isKnowledgeApplicable()` uses the venue's professional profile (profession, region, equipment, departments) to filter knowledge packages. This is the OS answering: "given what I know about this venue, does this package apply?"

**Owner: OS layer. No change needed.**

---

### HQ Routing — OS Layer

```typescript
// lib/os/routing/knowledgeRouter.ts
export class KnowledgeRouter {
  async resolve(question, connection) {
    const local = await this.knowledgeStore.findAnswer(question);
    if (local) return local;             // local first
    if (connection === "offline") return null;
    const answer = await this.hq.askProfessionHQ(question);
    await this.knowledgeStore.saveAnswer(answer);  // cached
    return answer;
  }
}
```

Already in the OS layer. Local-first routing. HQ fallback when needed. The DC asks the OS; the OS routes to the correct level.

**Owner: OS layer. No change needed.**

---

### Source Authority — Preserved Through the Chain

```typescript
// lib/os/types.ts
type KnowledgeAnswer = {
  answer: string;
  sourceLevel: KnowledgeLevel;  // "venue" | "organisation" | "profession" | "helping-hand"
};
```

The routing layer (`platform/hq/knowledgeFlow.ts`) determines which HQ level answers. That level is recorded in `sourceLevel`. The chain from routing → answer → formation preserves authority provenance.

Evidence (`platform/hq/knowledgeFlow.ts`):

```typescript
case "local":           → "digital-colleague" only
case "organisational":  → ["digital-colleague", "organisation-hq"] (optional)
case "professional":    → [..., "profession-hq"]
case "cross-profession":→ [..., "helping-hand-hq"]
```

```typescript
// Confirmed: independent operators never reach Organisation HQ
case "professional":
  return candidate.origin.organisationId
    ? ["digital-colleague", "organisation-hq", "profession-hq"]
    : ["digital-colleague", "profession-hq"];
```

**Source authority is preserved through the existing chain. No change needed.**

---

### Conversion to `FormationKnowledge` — DC Layer

```typescript
// platform/cos/understanding-formation/types.ts
interface FormationKnowledge {
  principle: string;
  evidenceLevel: "constitutional" | "professional" | "local";
}
```

The conversion:

```
KnowledgeAnswer.answer      → FormationKnowledge.principle
KnowledgeAnswer.sourceLevel → FormationKnowledge.evidenceLevel

"helping-hand"              → "constitutional"
"profession"                → "professional"
"organisation"              → "professional"
"venue"                     → "local"
```

**Why does this belong in the DC layer and not the OS layer?**

The OS returns `KnowledgeAnswer` — a governed answer with source attribution. Converting that to `FormationKnowledge` is the DC's act of incorporating knowledge into a formation input. The DC is the formation participant, not the OS. The OS routes; the DC assembles.

This follows the same principle as the context assembler: COS defines the type; the DC populates it; the OS supplies the underlying data.

---

### Ownership Decision

```
Knowledge Assembler:
  isKnowledgeApplicable()     → OS layer (already correct)
  KnowledgeRouter             → OS layer (already correct)
  Source authority tracking   → OS layer (already correct)
  KnowledgeAnswer → FormationKnowledge adapter → DC Layer

Reason for DC ownership of the adapter:
  The DC is the formation participant.
  The DC presents knowledge to COS.
  The OS routes to knowledge. The DC decides what to present.
```

### Boundary Line

```
DC                       OS (Venue Intelligence)      COS
────────────────────────  ──────────────────────    ────────────────────
Calls isKnowledgeApplicable  isKnowledgeApplicable   Defines FormationKnowledge
Asks KnowledgeRouter          KnowledgeRouter         type contract only
Converts KnowledgeAnswer      KnowledgeAnswer         Applies inputs to form()
to FormationKnowledge         (answer + sourceLevel)
Supplies FormationKnowledge[]
to COS
```

---

## 4. Final Architecture Boundary

### The Formation Input Ownership Map

```
╔══════════════════════════════════════════════════════════════════╗
║              HELPING HAND HQ                                     ║
║  universal principles → KnowledgeAnswer(sourceLevel="helping-hand")
╚══════════════════════════════════════════════════════════════════╝
                          ↓ through KnowledgeRouter
╔══════════════════════════════════════════════════════════════════╗
║              PROFESSIONAL HQ                                     ║
║  industry standards → KnowledgeAnswer(sourceLevel="profession")  ║
╚══════════════════════════════════════════════════════════════════╝
                          ↓ through KnowledgeRouter
╔══════════════════════════════════════════════════════════════════╗
║           ORGANISATION HQ  (optional)                            ║
║  org policies → KnowledgeAnswer(sourceLevel="organisation")      ║
╚══════════════════════════════════════════════════════════════════╝
                          ↓ through KnowledgeRouter
╔══════════════════════════════════════════════════════════════════╗
║           OS / VENUE INTELLIGENCE                                ║
║                                                                  ║
║  ContextStore        → FormationInstitutionalContext[]  (data)   ║
║  VenueKnowledgeProfile → FilterDimensions + institutional (data) ║
║  KnowledgeRouter     → routes questions to correct HQ           ║
║  isKnowledgeApplicable → filters packages by venue profile      ║
║  KnowledgeAnswer     → carries governed answer + sourceLevel    ║
╚══════════════════════════════════════════════════════════════════╝
                          ↓ consumed by
╔══════════════════════════════════════════════════════════════════╗
║           DIGITAL COLLEAGUE LAYER                                ║
║                                                                  ║
║  [Adapter 1: Translation Rule Selector]                          ║
║  hospitalityTranslationRules → select by category                ║
║  → TranslationRule[]  (DC selects; COS applies)                  ║
║                                                                  ║
║  [Adapter 2: Context Assembler]                                  ║
║  AnnieThought → FormationSituationalContext                      ║
║  ContextStore entries → FormationInstitutionalContext[]          ║
║  VenueKnowledgeProfile → supplementary institutional context     ║
║  → FormationContext                                              ║
║                                                                  ║
║  [Adapter 3: Knowledge Assembler]                                ║
║  isKnowledgeApplicable filters packages                         ║
║  KnowledgeRouter retrieves answers                              ║
║  sourceLevel → evidenceLevel lookup (4 entries)                 ║
║  → FormationKnowledge[]                                          ║
║                                                                  ║
║  Translation[] + FormationContext + FormationKnowledge[]         ║
╚══════════════════════════════════════════════════════════════════╝
                          ↓ supplied to
╔══════════════════════════════════════════════════════════════════╗
║           COS — UNDERSTANDING FORMATION                          ║
║                                                                  ║
║  Owns:  form() mechanism                                         ║
║         synthesis algorithm                                      ║
║         confidence derivation                                    ║
║         uncertainty derivation                                   ║
║         completeness assessment                                  ║
║         evidence chain traceability                              ║
║         Translation type contract                               ║
║         FormationContext type contract                          ║
║         FormationKnowledge type contract                        ║
║         Understanding output contract                            ║
║         The five invariants                                      ║
║                                                                  ║
║  Does not own: professional content, venue data, HQ answers     ║
╚══════════════════════════════════════════════════════════════════╝
                          ↓
╔══════════════════════════════════════════════════════════════════╗
║           Understanding → JudgementEngine                        ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## Adapter Implementation Locations

This table records where each adapter must be built. These locations are architectural decisions, not implementation suggestions.

| Adapter | Location | Layer | Reason |
|---|---|---|---|
| Translation Rule Selector | `lib/annie/` (or equivalent DC path per profession) | DC | Professional judgment — DC decides which rules match this situation |
| Context Assembler | `lib/annie/` (or equivalent DC path per profession) | DC | Situational awareness is professional — DC assembles from its own cognition + Venue Intelligence |
| Knowledge Assembler | `lib/annie/` (or equivalent DC path per profession) | DC | DC presents knowledge to COS; OS routes and stores; DC interprets source level |

---

## What Must NOT Happen

**Do not place adapters in COS.**

If `translateHospitalityObservations()` moves into COS, COS becomes hospitality-aware. That is the COS boundary violation that Milestone 013's invariants were designed to prevent.

**Do not place adapters in the OS.**

The OS routes and stores. It does not know which knowledge is relevant to a specific formation input. That judgment belongs to the DC.

**Do not hardcode formation inputs in tests.**

The current test approach (hand-authored `translations`, `context`, `knowledge`) is correct for validating the COS mechanism. Production usage must assemble inputs through DC-layer adapters. Hardcoding is the human-assembly pattern that this milestone is designed to replace.

---

## ContextStore Migration Decision

`ContextStore` currently lives in `lib/onboarding/contextStore.ts`.

**Target location: Venue Intelligence (OS layer)**

Evidence: `ContextStore` holds venue-specific accumulated facts — exactly what `docs/architecture/DIGITAL_COLLEAGUE_COGNITIVE_ARCHITECTURE.md` defines as Venue Intelligence.

Candidate target: `lib/os/context/contextStore.ts` or `platform/cos/context/contextStore.ts`.

**Decision: Venue Intelligence (OS layer).**

`platform/cos/context/` is a planned COS Phase 5 capability (COS Roadmap). But `ContextStore`'s content is venue-specific — not universal. Phase 5 context may be a universal interface; the venue data store is OS-specific.

The correct migration target is `lib/os/context/contextStore.ts` — the same layer as `VenueKnowledgeProfile` and `KnowledgeRouter`. This keeps all Venue Intelligence in one layer.

---

## Pre-Implementation Checklist for Milestone 015

Before building adapters, all of the following must be confirmed:

| Item | Status |
|---|---|
| Adapters belong in DC layer | ✓ Confirmed by this document |
| `isKnowledgeApplicable()` stays in OS | ✓ Already there — no change |
| `KnowledgeRouter` stays in OS | ✓ Already there — no change |
| COS `form()` stays unchanged | ✓ Milestone 013 boundary is settled |
| `ContextStore` target location agreed | `lib/os/context/contextStore.ts` |
| No professional logic enters COS | ✓ Enforced by type contract only |
| Source authority preserved through adapters | ✓ `sourceLevel → evidenceLevel` lookup |

---

**Status:** Ownership boundaries established | No code changes | Pre-implementation record | Milestone 015 unblocked
