# Milestone 014 — Understanding Formation Input Boundary Analysis

**Date:** 2026-08-05  
**Status:** Analysis  
**Prerequisite:** Milestone 013 — Understanding Formation Boundary Established  
**Constraint:** No code changes. No refactoring. Evidence only.

---

## Opening Statement

Milestone 013 proved the junction exists:

```
Translation[]  +  Context  +  Knowledge
                     ↓
         COS Understanding Formation
                     ↓
              Understanding → JudgementEngine
```

The junction was built. The milestone tests assembled the inputs by hand.

This milestone asks the prior question:

> **Do the vehicles already know how to reach the roundabout?**

That is: can a Digital Colleague supply the three required inputs from existing capabilities, without COS becoming professional and without the DC inventing new reasoning?

---

## 1. Translation Input Boundary

### Question

Can a Digital Colleague currently provide `Translation[]` without creating profession-specific formation logic?

### What Already Exists

**The universal mechanism — in COS**

```typescript
// platform/cos/translation/translator.ts
export function translateObservations(
  observations: Observation[],
  rules: TranslationRule[]
): Translation[] {
  return observations.flatMap((observation) =>
    rules
      .filter((rule) => rule.matches(observation))
      .map((rule) => rule.translate(observation))
  );
}
```

```typescript
// platform/cos/translation/types.ts
export interface TranslationRule {
  matches: (observation: Observation) => boolean;  // ← this IS the selector
  translate: (observation: Observation) => Translation;
}

export interface Translation {
  observationId: string;
  meaning: string;
  confidence: number;
}
```

COS owns the mechanism. It applies rules without knowing what they mean.

**The professional rules — in the DC layer (correct position)**

```typescript
// lib/annie/translation/hospitalityRules.ts
export const hospitalityTranslationRules: TranslationRule[] = [
  {
    matches: (observation) => observation.id === "tables",
    translate: (observation) => ({
      observationId: observation.id,
      meaning: "The venue has customer seating that may support bookings, table planning and service organisation.",
      confidence: observation.confidence,
    }),
  },
  {
    matches: (observation) => observation.id === "bar",
    translate: (observation) => ({
      observationId: observation.id,
      meaning: "The bar is likely to be both a drinks service point and a customer information point.",
      confidence: observation.confidence,
    }),
  },
];
```

The pattern is established and correct: COS owns the mechanism; the DC supplies the rules.

**The Observation struct already carries the situational dimension**

```typescript
// platform/cos/observation/types.ts
export interface Observation {
  id: string;
  category: string;  // ← semantic dimension already present
  description: string;
  confidence: number;
  source: ObservationSource;
}
```

### What Is Missing — Rule Matching, Not Rule Selection

Current rules match on `observation.id` — venue-specific hardcoded identifiers. Situational rule selection requires matching on `observation.category`, which already exists on every observation. Making rules match categorically rather than by ID is a **content change**, not a new capability. `matches()` is already the selector. The predicate logic needs enriching.

### Translation Flow Diagram

```
World produces input (sensor, conversation, document, vision)
               ↓
Observation {id, category, description, confidence, source}
               ↓  [COS: beginObservationSession()]
ObservationSession {observations[], questions[]}
               ↓  [DC supplies: hospitalityTranslationRules]
               ↓  [COS applies: translateObservations(observations, rules)]
Translation {observationId, meaning, confidence}
               ↓
Translation[]   ← Formation Input 1

Ownership:
  Observation types       → COS
  Session management      → COS
  Translation mechanism   → COS
  Rule predicate logic    → DC (professional)
  Rule semantic content   → DC (professional)
  Situational rule filter → 🟡 needs richer matches() predicates
```

**COS remains profession-neutral throughout.** `translateObservations()` never reads domain content.

### Bridge 1 — 🟡 AMBER

Mechanism exists and is correctly owned. Rules need to match on `observation.category` for situational selection. Content change, not capability change.

---

## 2. Context Input Boundary

### Question

Can a Digital Colleague currently assemble `FormationContext` from existing sources?

### Target Type

```typescript
interface FormationContext {
  situational: FormationSituationalContext;
  institutional: FormationInstitutionalContext[];
}

interface FormationSituationalContext {
  urgency?: "none" | "low" | "medium" | "high" | "critical";
  risk?: string;
  who?: string;
  what?: string;
  where?: string;
  purpose?: string;
}

interface FormationInstitutionalContext {
  category: string;
  key: string;
  value: string;
}
```

### Source 1: `AnnieThought` → Situational Context

```typescript
// lib/annie/thinking.ts
interface AnnieThought {
  stimulus: string;
  who?: string;             → FormationSituationalContext.who      (direct)
  what?: string;            → FormationSituationalContext.what     (direct)
  where?: string;           → FormationSituationalContext.where    (direct)
  when?: string;            (timing — not required by FormationContext)
  why?: string;             → FormationSituationalContext.purpose  (direct)
  confidence: number;       → informs urgency derivation
  needsClarification: bool; → informs urgency derivation
}
```

Four of six `FormationSituationalContext` fields map directly. The one gap is `urgency` — derivable from `confidence` and `needsClarification` through a deterministic rule, not AI.

### Source 2: `ContextStore` → Institutional Context

```typescript
// lib/onboarding/contextStore.ts
interface ContextEntry {
  category: ContextCategory;  // "business" | "venue" | "team" | "systems" | ...
  key: string;
  value: string;
}

// platform/cos/understanding-formation/types.ts
interface FormationInstitutionalContext {
  category: string;
  key: string;
  value: string;
}
```

**The structure is identical.** `ContextStore.getEntries()` maps directly to `FormationContext.institutional[]` with no transformation. The types share the same shape. The only limitation is that `ContextStore` currently lives in `lib/onboarding/` — accessible only during setup, not throughout operations.

### Source 3: `VenueKnowledgeProfile` → Supplementary Institutional Context

```typescript
// lib/os/knowledge/applicability/venueKnowledgeProfile.ts
interface VenueKnowledgeProfile {
  equipment: string[];    → [{category:"equipment", key:item, value:item}]
  departments: string[];  → [{category:"department", key:item, value:item}]
  venueTypes: string[];   → [{category:"venue-type", key:item, value:item}]
}
```

Each array flattens to `FormationInstitutionalContext[]` entries. Mapping is a `flatMap`.

### The "Lucy Sick Three Mondays" Boundary

`VenueProfileFact` with `dimension: "team"` for a named staff member is `kind: "local"` knowledge.

`platform/hq/knowledgeFlow.ts`:
```typescript
case "local":
  return ["digital-colleague"];
```

It routes exclusively to the DC. It does not reach Organisation HQ, Professional HQ, or Helping Hand HQ.

If a *pattern* emerges ("Monday absences affect rota coverage at venues of this type"), that abstracted pattern becomes a *candidate* for governed learning via pollination — with all personal identifying information removed before travel. The personal record stays local. Only the generalised, governed learning can travel.

### Context Ownership Map

```
Level             Source                    FormationTarget            Travels?
─────────────────────────────────────────────────────────────────────────────
Live situation    AnnieThought              FormationSituationalContext No (ephemeral)
                  who/what/where/why
                  confidence → urgency

Venue memory      ContextStore              FormationInstitutional      Only as
                  7 categories              Context                     governed
                  key/value pairs                                       learning

Venue state       VenueKnowledgeProfile     FormationInstitutional      Only as
                  equipment/departments     Context                     governed
                  region/venueType                                      learning

Organisation      Organisation HQ           FormationKnowledge          Yes — through
(optional)        where organisationId      (professional level)        knowledge routing
                  exists

Professional      Professional HQ           FormationKnowledge          Yes — inherited
                  standards/thresholds      (professional level)        by every DC

Universal         Helping Hand HQ           FormationKnowledge          Yes — inherited
                  constitution/principles   (constitutional level)      universally
```

### Bridge 2 — 🟡 AMBER

All three sources exist. `AnnieThought` and `FormationSituationalContext` are structurally aligned. `ContextStore` and `FormationInstitutionalContext` share the same shape. `VenueKnowledgeProfile` is a `flatMap`. `ContextStore` scope (onboarding-only) is the structural barrier — not the data.

---

## 3. Knowledge Input Boundary

### Question

Can a Digital Colleague currently retrieve applicable knowledge for `FormationKnowledge`?

### What Already Exists

**Knowledge applicability matching — in OS (`lib/os/knowledge/applicability/`)**

```typescript
export function isKnowledgeApplicable(
  knowledge: TaggedKnowledgePackage,
  venue: VenueKnowledgeProfile
): boolean { ... }
```

A pub with `equipment: ["beer-lines"]` gets beer-line-cleaning knowledge. A chip shop does not. This is "what knowledge applies here?" — not "what knowledge exists?" The distinction is already implemented and tested.

**Test evidence** (`lib/os/__tests__/knowledgeApplicability.test.ts`):
```
pub  (draught-beer-system, beer-lines) + beer-line-cleaning → applicable ✓
chip-shop (commercial-fryer only)      + beer-line-cleaning → not applicable ✓
```

**Knowledge routing — local first, HQ fallback**

```typescript
// lib/os/routing/knowledgeRouter.ts
async resolve(question, connection) {
  const local = await this.knowledgeStore.findAnswer(question);
  if (local) return local;
  if (connection === "offline") return null;
  const answer = await this.hq.askProfessionHQ(question);
  await this.knowledgeStore.saveAnswer(answer);  // cached
  return answer;
}
```

**Test evidence** (`lib/os/__tests__/knowledgeRoundTrip.test.ts`):
```
Round 1: HQ asked (enquiryCount = 1), answer cached
Round 2: local store used (enquiryCount still = 1)
```

**The KnowledgeAnswer type**

```typescript
type KnowledgeAnswer = {
  answer: string;            // principle text → FormationKnowledge.principle
  sourceLevel: KnowledgeLevel;  // → FormationKnowledge.evidenceLevel
};
```

### The Mapping

```typescript
KnowledgeAnswer.answer      → FormationKnowledge.principle   (direct)
KnowledgeAnswer.sourceLevel → FormationKnowledge.evidenceLevel (lookup):
  "helping-hand"  → "constitutional"
  "profession"    → "professional"
  "organisation"  → "professional"
  "venue"         → "local"
```

A four-entry lookup table. No reasoning.

### Knowledge Inheritance Flow Diagram

```
DC asks: which knowledge packages apply to this venue?
  isKnowledgeApplicable(package, venueProfile) → boolean

         Applicable packages
               ↓
  KnowledgeRouter.resolve(question, connection)
               ↓
  ┌────────────────────────────────────────────┐
  │  Local store has answer?                   │
  │   YES → KnowledgeAnswer (served locally)   │
  │   NO  → Ask correct HQ level:              │
  │                                            │
  │   sourceLevel="venue"        → Venue Intel │
  │   sourceLevel="organisation" → Org HQ (opt)│
  │   sourceLevel="profession"   → Prof HQ     │
  │   sourceLevel="helping-hand" → HH HQ       │
  └────────────────────────────────────────────┘
               ↓
  KnowledgeAnswer {answer, sourceLevel}
               ↓
  [Adapter] sourceLevel → evidenceLevel (4-entry lookup)
               ↓
  FormationKnowledge {principle, evidenceLevel}
               ↓
  FormationKnowledge[]  ← Formation Input 3
```

**Organisation HQ routing respects optionality** (`platform/hq/knowledgeFlow.ts`):
```typescript
case "professional":
  return candidate.origin.organisationId
    ? ["digital-colleague", "organisation-hq", "profession-hq"]  // multi-site
    : ["digital-colleague", "profession-hq"];                     // independent
```

### Bridge 3 — 🟡 AMBER

`KnowledgeRouter`, `isKnowledgeApplicable`, `TaggedKnowledgePackage`, and `KnowledgeAnswer` all exist and are tested. `KnowledgeAnswer` maps to `FormationKnowledge` through a four-entry lookup table. The type adapter is missing — not the underlying capability.

---

## 4. Boundary Validation

### Venue knowledge stays local

**Evidence:** `platform/hq/knowledgeFlow.ts`
```typescript
case "local":
  return ["digital-colleague"];
```
`kind: "local"` routes to the DC only. "Lucy sick three Mondays" stays in Venue Intelligence. Governed learning candidates may travel only after abstraction + 8 governance checks.

### Organisation HQ is optional

**Evidence:** `platform/hq/types.ts`
```typescript
interface KnowledgeOrigin {
  organisationId?: string;  // absent for independent operators
}
```
Independent operators never reach Organisation HQ. Architecture enforces this in routing code.

### Professional HQ owns industry knowledge

**Evidence:** `KnowledgeAnswer.sourceLevel === "profession"` → `evidenceLevel: "professional"`. Professional knowledge is approved by and attributed to Professional HQ (`approvedBy: "Hospitality HQ"`).

### Helping Hand HQ stays universal

**Evidence:** HH HQ is only reached for `kind: "cross-profession"`. No DC can bypass Professional HQ to access it.

### Digital Colleague supplies content, not mechanism

```
Translation: COS owns translateObservations(); DC owns hospitalityTranslationRules
Context:     COS owns FormationContext type; DC owns AnnieThought + ContextStore + VenueProfile
Knowledge:   COS owns form(); DC drives isKnowledgeApplicable() + KnowledgeRouter
```

**All four boundary rules are confirmed in existing code.**

---

## 5. Missing Bridges — Classified

### Bridge 1 — Translation Rule Selector — 🟡 AMBER

| | Status |
|---|---|
| `translateObservations()` mechanism | ✓ Exists in COS |
| `TranslationRule.matches()` selector | ✓ Exists — is the selection function |
| `hospitalityTranslationRules` in DC layer | ✓ Correct position |
| Rules match on `observation.category` | ❌ Currently match on `observation.id` only |

**What is needed:** Richer `matches()` predicates. Content change, not mechanism change.

---

### Bridge 2 — Context Assembler — 🟡 AMBER

| | Status |
|---|---|
| `AnnieThought` situational fields (who/what/where/why) | ✓ Exist |
| `ContextStore` institutional context (7 categories) | ✓ Exists, correct structure |
| `VenueKnowledgeProfile` venue state | ✓ Exists, built from observations |
| `AnnieThought → FormationSituationalContext` mapping function | ❌ Missing (~15 lines) |
| `ContextStore → FormationInstitutionalContext[]` mapping function | ❌ Missing (~5 lines) |
| `VenueKnowledgeProfile → institutional[]` mapping function | ❌ Missing (~10 lines) |
| `ContextStore` accessible outside onboarding | ❌ Scope migration needed |

---

### Bridge 3 — Knowledge Assembler — 🟡 AMBER

| | Status |
|---|---|
| `isKnowledgeApplicable()` filters by venue profile | ✓ Exists, tested |
| `KnowledgeRouter` local-first + HQ fallback | ✓ Exists, tested |
| `KnowledgeAnswer` carries answer + sourceLevel | ✓ Exists |
| `KnowledgeAnswer → FormationKnowledge` adapter | ❌ Missing (~10 lines) |

---

### Master Classification

| Bridge | Classification | What Exists | What Is Missing |
|---|---|---|---|
| 1. Rule Selector | 🟡 AMBER | `matches()` function, COS mechanism | Category-aware rule predicates |
| 2. Context Assembler | 🟡 AMBER | All three source types | Three mapping functions + `ContextStore` scope |
| 3. Knowledge Assembler | 🟡 AMBER | Routing, applicability, answer type | Type adapter (~10 lines) |

**No RED bridges.** All three mechanisms exist on both sides. Three adapters are sufficient.

---

## Recommended Next Milestone

**MILESTONE_015 — Formation Input Adapters**

Implement three adapter functions in the DC layer:

1. `thoughtToSituationalContext(thought: AnnieThought) → FormationSituationalContext`
2. `contextStoreToInstitutional(entries: ContextEntry[]) → FormationInstitutionalContext[]`
3. `knowledgeAnswerToFormation(answer: KnowledgeAnswer) → FormationKnowledge`

Combined scope: approximately 30 lines of pure mapping. No AI. No reasoning.

**Pre-condition:** `ContextStore` must be accessible outside `lib/onboarding/` before MILESTONE_015 begins.

---

## Evidence Summary

| Capability | Location | Status |
|---|---|---|
| Translation mechanism | `platform/cos/translation/` | ✓ Active |
| Hospitality translation rules | `lib/annie/translation/` | ✓ Active, correct layer |
| Curiosity rules | `lib/annie/observation/curiosity.ts` | ✓ Active, correct layer |
| Situational interrogation | `lib/annie/thinking.ts` | ✓ Active — needs mapping |
| Institutional context store | `lib/onboarding/contextStore.ts` | ✓ Active — scope limited |
| Venue state profile | `lib/os/knowledge/applicability/` | ✓ Active, built from observations |
| Knowledge applicability matching | `lib/os/knowledge/applicability/` | ✓ Active, tested |
| Knowledge routing (local + HQ) | `lib/os/routing/knowledgeRouter.ts` | ✓ Active, tested |
| HQ boundary enforcement | `platform/hq/knowledgeFlow.ts` | ✓ Active, Organisation HQ optional |
| KnowledgeAnswer→FormationKnowledge adapter | — | ❌ Missing (~10 lines) |
| AnnieThought→SituationalContext adapter | — | ❌ Missing (~15 lines) |
| ContextStore→Institutional adapter | — | ❌ Missing (~5 lines) |

---

**Status:** Analysis complete | No code changes | Evidence-based | Three AMBER bridges | All boundaries confirmed | Pre-conditions recorded

```
Translation[]   +   Context   +   Prior Knowledge
                        ↓
               Understanding Formation
                        ↓
                   Understanding
```

The milestone tests assembled those inputs by hand.

The next question is:

> Can a Digital Colleague automatically gather Translation, Context, and Prior Knowledge before invoking Formation?

This analysis maps what already exists, what is already in the correct position, and what is missing.

---

## Question 1 — Where Do Professional Translation Rules Currently Live?

### Finding: In the DC layer, already correctly positioned.

**Evidence:** `lib/annie/translation/hospitalityRules.ts`

```typescript
/**
 * Annie's Hospitality Translation Rules
 *
 * COS owns the universal translation mechanism.
 * Annie supplies hospitality meaning.
 */
export const hospitalityTranslationRules: TranslationRule[] = [
  {
    matches: (observation) => observation.id === "tables",
    translate: (observation) => ({
      observationId: observation.id,
      meaning: "The venue has customer seating that may support bookings...",
      confidence: observation.confidence,
    }),
  },
  ...
];
```

**Evidence:** `lib/annie/translation/index.ts`

```typescript
export function translateHospitalityObservations(
  observations: Observation[]
): Translation[] {
  return translateObservations(observations, hospitalityTranslationRules);
}
```

**Evidence:** `lib/annie/observation/curiosity.ts`

```typescript
/**
 * COS provides the universal curiosity mechanism.
 * Annie supplies the questions that require hospitality understanding.
 */
export const hospitalityCuriosityRule: CuriosityRule = ...
```

The pattern is already established and already correct:
- COS owns the translation mechanism (`platform/cos/translation/`)
- The DC supplies domain rules (`lib/annie/translation/hospitalityRules.ts`)

### Where They Should Live

They already live in the right place. No migration required for translation rules.

### What Is Missing

**The translation rules are applied to all observations indiscriminately.**

Currently: every observation is passed through every hospitality rule.  
Needed: a mechanism to select *which rules apply to which situation* before applying them.

Example: a fridge temperature observation should trigger food-safety translation rules, not table-service rules. Currently there is no situational rule selection layer — rules are applied wholesale.

---

## Question 2 — Where Should Translation Rules Live?

### Confirmed Ownership

| Component | Owner | Status |
|---|---|---|
| Translation mechanism (`translateObservations`) | COS | ✓ Correct |
| Hospitality translation rules | DC — Annie | ✓ Correct |
| Curiosity rules (observation → question) | DC — Annie | ✓ Correct |
| Situational rule selection | **Missing** | ❌ |

The boundary is right. The situational selection layer above the rules is absent.

### Implication for Formation

When Annie invokes `form()`, she needs to pass `Translation[]` — only the translations that are relevant to the current situation. Currently she would pass translations from all applied rules. A situational selector is needed to answer: "which translation rules apply to *this* observation in *this* context?"

---

## Question 3 — How Does a DC Currently Access Relevant Context?

### Three Existing Mechanisms

**Mechanism A: `AnnieThought` — contextual interrogation**

```typescript
// lib/annie/thinking.ts
export interface AnnieThought {
  stimulus: string;
  who?: string;     // who is involved?
  what?: string;    // what is happening?
  where?: string;   // where is it happening?
  when?: string;    // when?
  why?: string;     // why does it matter?
  whoElseMightBeAffected?: string[];
  whatElseMightBeAffected?: UnderstandingDomain[];
  confidence: number;
  needsClarification: boolean;
  suggestedNextStep: string;
}

export function think(stimulus: string): AnnieThought {
  return {
    stimulus,
    confidence: 0.3,
    needsClarification: true,
    suggestedNextStep: "Gather enough context to choose the most helpful response.",
  };
}
```

`AnnieThought` is the contextual interrogation layer — it asks the questions that produce situational context. The fields (`who`, `what`, `where`, `urgency`, `risk`) directly map to `FormationSituationalContext`.

**Status:** Exists. Not connected to `FormationContext`.

---

**Mechanism B: `ContextStore` — institutional context**

```typescript
// lib/onboarding/contextStore.ts
export type ContextCategory =
  | "business" | "venue" | "team" | "systems"
  | "communication" | "knowledge" | "memory";

export interface ContextEntry {
  id: string;
  category: ContextCategory;
  key: string;
  value: string;
  source: "conversation" | "photo" | "document" | "system" | "manual";
}
```

`ContextStore` is exactly the institutional context that `FormationContext.institutional` needs. It holds accumulated venue, team, systems, and business knowledge.

**Status:** Exists. Scoped to onboarding only. Not universally accessible to formation.

---

**Mechanism C: `VenueKnowledgeProfile` — structured venue state**

```typescript
// lib/os/knowledge/applicability/venueKnowledgeProfile.ts
export interface VenueKnowledgeProfile {
  venueId: string;
  professions: string[];
  region: string;
  venueTypes: string[];
  departments: string[];
  equipment: string[];
  capabilities: string[];
  facts: VenueProfileFact[];
}
```

`VenueKnowledgeProfile` is built incrementally from Annie's observations and confirmed through conversation. It captures the venue-specific facts that determine which knowledge is applicable.

**Evidence from tests** (`lib/os/__tests__/venueProfileLearning.test.ts`):

```typescript
// Profile builds from observations one fact at a time
profile = addVenueProfileFact(profile, {
  dimension: "equipment",
  value: "walk-in-chiller",
  source: "annie-observation",
  confidence: "observed",
});
// Later: beer-line knowledge becomes applicable when beer-lines equipment is added
```

**Status:** Exists. Provides the venue dimension that makes knowledge applicable. Not connected to `FormationContext`.

---

### What Is Missing

There is no bridge that assembles `AnnieThought` + `ContextStore` + `VenueKnowledgeProfile` into `FormationContext`. The three mechanisms exist. The assembler does not.

---

## Question 4 — How Do the HQ Layers Participate?

### The Knowledge Flow — Already Implemented

**Evidence:** `lib/os/README.md`

```
First knowledge path:
1. A person asks the Digital Colleague.
2. The Digital Colleague supplies local context.
3. Helping Hand OS checks locally held knowledge.
4. If unavailable and online, the OS asks the correct HQ.
5. HQ returns governed knowledge.
6. The OS stores the approved answer.
7. The Digital Colleague communicates it appropriately.
8. Nothing bypasses the Digital Colleague.
```

**Evidence:** `lib/os/routing/knowledgeRouter.ts`

```typescript
export class KnowledgeRouter {
  async resolve(question: KnowledgeQuestion, connection: ConnectionState) {
    const localAnswer = await this.knowledgeStore.findAnswer(question);
    if (localAnswer) return localAnswer;               // local first

    if (connection === "offline") return null;          // graceful offline

    const answer = await this.hq.askProfessionHQ(question);
    await this.knowledgeStore.saveAnswer(answer);      // cache for next time
    return answer;
  }
}
```

**Evidence:** `platform/hq/knowledgeFlow.ts`

```typescript
// Organisation HQ is optional — present only when organisationId exists
case "professional":
  return candidate.origin.organisationId
    ? ["digital-colleague", "organisation-hq", "profession-hq"]
    : ["digital-colleague", "profession-hq"];
```

The HQ layers are correctly structured:

| Layer | Participates | How |
|---|---|---|
| Venue Intelligence | Always | `VenueKnowledgeProfile` + `ContextStore` |
| Organisation HQ | Optional | Only when `organisationId` is present in routing |
| Professional HQ | Always | `KnowledgeRouter` falls back to HQ when local store misses |
| Helping Hand HQ | Cross-profession only | Routing reserved for universal principles |

**What is missing:** The `KnowledgeRouter` returns `KnowledgeAnswer` (a narrative answer string) not `FormationKnowledge[]` (a structured principle with evidence level). There is no bridge from `KnowledgeAnswer` to `FormationKnowledge`.

---

## Question 5 — How Does a DC Retrieve Applicable Knowledge Rather Than All Knowledge?

### Finding: A substantial mechanism already exists.

This is the most significant existing capability discovered in this analysis.

**Evidence:** `lib/os/knowledge/applicability/knowledgeApplicabilityMatcher.ts`

```typescript
export function isKnowledgeApplicable(
  knowledge: TaggedKnowledgePackage,
  venue: VenueKnowledgeProfile
): boolean { ... }
```

A knowledge package is tagged with applicability dimensions:

```typescript
// lib/os/knowledge/packages/taggedKnowledgePackage.ts
export interface KnowledgeApplicabilityTags {
  professions: string[];   // e.g. ["hospitality"]
  regions?: string[];      // e.g. ["uk"]
  venueTypes?: string[];   // e.g. ["pub", "bar"]
  departments?: string[];  // e.g. ["cellar"]
  equipment?: string[];    // e.g. ["draught-beer-system", "beer-lines"]
  topics?: string[];       // descriptive — does not restrict
}
```

A venue profile is matched against those tags:

```typescript
// From the applicability test:
// pub has: equipment: ["draught-beer-system", "beer-lines"]
// beer-line-cleaning knowledge requires: equipment: ["draught-beer-system", "beer-lines"]
// → applicable

// chip-shop has: equipment: ["commercial-fryer", "refrigerated-display"]
// beer-line-cleaning knowledge requires: equipment: ["draught-beer-system", "beer-lines"]
// → not applicable
```

**This is precisely "what knowledge applies here?" rather than "what knowledge exists?"**

The mechanism:
1. Takes a `VenueKnowledgeProfile` (built from Annie's observations)
2. Tests each `TaggedKnowledgePackage` against the profile's dimensions
3. Returns only the knowledge that matches

**Status:** Exists and tested. Not yet connected to `FormationKnowledge[]` assembly.

---

## Question 6 — Existing Mechanisms That Solve Parts of This

### Complete Inventory

| Formation Input | Sub-component | Existing Mechanism | Location | Status |
|---|---|---|---|---|
| **Translation[]** | Translation mechanism | `translateObservations()` | COS | ✓ Active |
| **Translation[]** | Hospitality translation rules | `hospitalityTranslationRules` | DC — Annie | ✓ Active |
| **Translation[]** | Curiosity questions | `hospitalityCuriosityRules` | DC — Annie | ✓ Active |
| **Translation[]** | Situational rule selection | **Missing** | — | ❌ |
| **Context** | Situational interrogation | `AnnieThought` | DC — Annie | ✓ Active |
| **Context** | Institutional context | `ContextStore` (7 categories) | Onboarding | ⚠️ Scoped |
| **Context** | Venue state accumulation | `VenueKnowledgeProfile` | OS | ✓ Active |
| **Context** | Context assembly to FormationContext | **Missing** | — | ❌ |
| **Prior Knowledge** | Knowledge applicability matching | `isKnowledgeApplicable()` | OS | ✓ Active |
| **Prior Knowledge** | Local-first, HQ fallback routing | `KnowledgeRouter` | OS | ✓ Active |
| **Prior Knowledge** | Knowledge tagging | `TaggedKnowledgePackage` | OS | ✓ Active |
| **Prior Knowledge** | Knowledge answer retrieval | `KnowledgeAnswer` | OS | ✓ Active |
| **Prior Knowledge** | FormationKnowledge assembly | **Missing** | — | ❌ |
| **Routing** | Wisdom source selection | `chooseWisdomSource()` | DC — Annie | ✓ Active |
| **Routing** | HQ knowledge routing | `determineKnowledgeRoute()` | Platform HQ | ✓ Active |

---

## Question 7 — What Is Missing?

Three specific bridges are absent. Everything they would connect already exists.

---

### Missing Bridge 1: Situational Translation Rule Selector

**Gap:** Translation rules are applied wholesale to all observations. There is no mechanism to select which rules are relevant to a specific situation before applying them.

**What exists on each side:**
- Left: `Observation[]` + current situation context (urgency, risk, what)
- Right: `TranslationRule[]` organised by domain
- Missing: A selector that asks "which rules match this situation?"

**Why this matters:** Formation needs `Translation[]` — the meanings relevant to the current situation. Without selection, formation receives either all translations (noisy) or hand-picked ones (human assembly required).

**What a solution would look like (not a design — a conceptual description):**
```
situation context + Observation[]
        ↓
Rule selector: "which translation rules match this situation?"
        ↓
Matched TranslationRule[]
        ↓
translateObservations(observations, matchedRules)
        ↓
Translation[]    ← formation input ready
```

---

### Missing Bridge 2: FormationContext Assembler

**Gap:** `AnnieThought`, `ContextStore`, and `VenueKnowledgeProfile` all contain context. None produces a `FormationContext`. No assembler maps them together.

**What exists on each side:**
- Left: `AnnieThought` (situational: who, what, where, urgency, risk), `ContextStore` (institutional: 7 categories), `VenueKnowledgeProfile` (venue state)
- Right: `FormationContext { situational: FormationSituationalContext, institutional: FormationInstitutionalContext[] }`
- Missing: A function that reads the three sources and produces `FormationContext`

**The mapping is direct:**

| Source | Target |
|---|---|
| `AnnieThought.who/what/where` | `FormationSituationalContext.who/what/where` |
| `AnnieThought.confidence` | Part of completeness assessment |
| `ContextStore.getEntries()` | `FormationContext.institutional[]` |
| `VenueKnowledgeProfile.equipment/departments` | Supplement to institutional context |

**ContextStore boundary note:** `ContextStore` currently lives in `lib/onboarding/`. For `FormationContext` assembly to work outside onboarding, `ContextStore` must be accessible as an operational resource. This is the precondition identified in Milestone 013.

---

### Missing Bridge 3: FormationKnowledge Assembler

**Gap:** `KnowledgeRouter` returns `KnowledgeAnswer` (a narrative string). Formation needs `FormationKnowledge[]` (structured principles with evidence levels). The bridge between these is absent.

**What exists on each side:**
- Left: `isKnowledgeApplicable(package, venueProfile)` determines if a package applies; `KnowledgeRouter.resolve()` returns the answer
- Right: `FormationKnowledge { principle: string, evidenceLevel: "constitutional" | "professional" | "local" }`
- Missing: A function that takes applicable `TaggedKnowledgePackage[]` and converts them to `FormationKnowledge[]`

**The mapping is direct:**

| Source | Target |
|---|---|
| `TaggedKnowledgePackage.content` | `FormationKnowledge.principle` |
| `TaggedKnowledgePackage.tags.professions` | Determines `evidenceLevel: "professional"` |
| `TaggedKnowledgePackage.approvedBy === "Helping Hand HQ"` | Determines `evidenceLevel: "constitutional"` |
| Local venue knowledge | `evidenceLevel: "local"` |

---

## Summary: The Input Acquisition Picture

```
SITUATION
(observation received, stimulus present)
          ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    DC RESPONSIBILITY LAYER                           │
│                                                                      │
│  AnnieThought      ContextStore      VenueKnowledgeProfile          │
│  (situational      (institutional    (venue facts from              │
│   interrogation)    knowledge)        observations)                 │
│           ↓               ↓                  ↓                      │
│           └───────────────┴──────────────────┘                      │
│                           ↓                                         │
│              [ Bridge 2: Context Assembler ]  ❌ MISSING            │
│                           ↓                                         │
│                    FormationContext                                  │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                   TRANSLATION LAYER                                  │
│                                                                      │
│  Observation[]   hospitalityTranslationRules                        │
│       ↓                    ↓                                        │
│       └──[ Bridge 1: Rule Selector ]  ❌ MISSING                    │
│                           ↓                                         │
│            translateObservations(obs, matchedRules)                 │
│                           ↓                                         │
│                     Translation[]                                   │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│               KNOWLEDGE ACQUISITION LAYER                            │
│                                                                      │
│  VenueKnowledgeProfile   +   isKnowledgeApplicable()               │
│             ↓                                                       │
│  Applicable TaggedKnowledgePackage[]                                 │
│             ↓                                                       │
│  KnowledgeRouter (local first, HQ fallback)                        │
│             ↓                                                       │
│       KnowledgeAnswer[]                                             │
│             ↓                                                       │
│   [ Bridge 3: FormationKnowledge Assembler ]  ❌ MISSING            │
│             ↓                                                       │
│       FormationKnowledge[]                                          │
└─────────────────────────────────────────────────────────────────────┘

             Translation[]  +  FormationContext  +  FormationKnowledge[]
                                      ↓
                         COS Understanding Formation
                                      ↓
                                Understanding
```

---

## Three Bridges Required

| Bridge | Input (exists) | Output (required) | Complexity |
|---|---|---|---|
| **1. Rule Selector** | Observations + situational context | Matching `TranslationRule[]` | Low — filtering existing rules |
| **2. Context Assembler** | `AnnieThought` + `ContextStore` + `VenueKnowledgeProfile` | `FormationContext` | Low — mapping existing fields |
| **3. Knowledge Assembler** | Applicable `TaggedKnowledgePackage[]` + `KnowledgeAnswer[]` | `FormationKnowledge[]` | Low — converting existing structures |

All three bridges connect things that already exist on both sides. The roads and destinations are built. The on-ramps are missing.

---

## Pre-conditions for Milestone 014 Implementation

Before any bridges are built:

1. **`ContextStore` must be accessible outside onboarding.** Currently scoped to `lib/onboarding/`. It needs to be a persistent, queryable resource throughout a DC's operational lifecycle.

2. **`VenueKnowledgeProfile` and `ContextStore` must serve different roles.** `VenueKnowledgeProfile` determines knowledge applicability (which packages match). `ContextStore` holds accumulated operational context (what we know about this venue). Both feed `FormationContext` but they serve different formation functions.

3. **Translation rule selection must be explicit, not implicit.** Rules cannot simply be applied to every observation. The DC must be able to identify which rules are situationally relevant before passing them to `translateObservations()`.

4. **`KnowledgeAnswer` → `FormationKnowledge` conversion must preserve evidence provenance.** The evidence level (`constitutional`, `professional`, `local`) must be derivable from the source of the answer.

---

## What This Milestone Does Not Include

- Implementation of any bridge
- Migration of `ContextStore`
- Changes to Annie's production pipeline
- HQ routing changes
- Pollination changes

---

**Status:** Analysis complete | No code changes | Evidence-based | Three bridges identified | Pre-conditions recorded
