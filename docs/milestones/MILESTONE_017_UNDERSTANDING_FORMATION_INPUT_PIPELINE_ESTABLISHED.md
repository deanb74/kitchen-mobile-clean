# Milestone 017 — Understanding Formation Input Pipeline Established

**Date:** 2026-08-05

**Status:** Achieved

**Category:** Architecture Consolidation Milestone

**Evidence:**
- `platform/cos/understanding-formation/` — 41 tests (Milestone 013)
- `lib/annie/formation/` — 18 tests (Milestone 016)
- `docs/architecture/FORMATION_INPUT_OWNERSHIP_MAP.md` (Milestone 015)
- **59 tests passing across 5 suites**

---

> The junction exists.  
> The vehicles can reach it.  
> The roads feed it correctly.

---

## What This Milestone Records

Milestones 013 through 016 collectively established a complete, evidence-based pipeline from real-world input to governed judgement — without human-authored Understanding at any stage.

This milestone records that pipeline as a settled foundation.

---

## What Milestone 013 Proved

**COS Understanding Formation is a universal capability.**

`platform/cos/understanding-formation/`

```
form(translations, context, knowledge) → Understanding
```

Evidence:
- 41 tests passing
- Three professions (hospitality, construction, healthcare) used the same `form()` — no `AnnieFormation()`, `KevFormation()`, or `HarryFormation()`
- JudgementEngine accepted output from all three unchanged
- Five invariants verified as structural guarantees

**The five invariants:**

| # | Invariant |
|---|---|
| 1 | Formation never invents meaning absent from evidence |
| 2 | Uncertainty cannot be hidden when inputs are incomplete |
| 3 | Evidence chain is present whenever translations exist |
| 4 | Confidence is computed from input quality — never supplied |
| 5 | Completeness is assessed from input coverage — never supplied |

**Safe failure confirmed:** When a DC provides no professional translation content, formation produces `completeness: "insufficient"` and `confidence: 0`. JudgementEngine routes to `disposition: "insufficient"` → `selected.kind: "ask"`. The system does not guess.

---

## What Milestone 015 Proved

**Ownership boundaries for the three Formation input adapters.**

`docs/architecture/FORMATION_INPUT_OWNERSHIP_MAP.md`

| Adapter | Owner | Source data |
|---|---|---|
| Translation Rule Selector | DC layer | DC professional rules |
| Context Assembler | DC layer | Venue Intelligence (OS) |
| Knowledge Assembler | DC layer | OS routing + HQ answers |

**Key decision: `ContextStore` classification.**

`ContextStore` is **Venue Intelligence** — not COS. COS defines the `FormationContext` type contract. The DC populates it from Venue Intelligence. COS never owns venue-specific data.

**Target migration:** `lib/os/context/contextStore.ts`

**"Lucy sick three Mondays" boundary confirmed:** Named staff records are `kind: "local"`. They route to `["digital-colleague"]` only. They never reach Organisation HQ, Professional HQ, or Helping Hand HQ. Abstracted patterns — not personal data — are eligible for governed learning candidacy.

**The governing principle confirmed:**

```
COS owns:   type contracts and formation mechanism
OS owns:    venue data, knowledge routing, source authority
DC owns:    professional judgment, situational awareness, content assembly
```

---

## What Milestone 016 Proved

**A Digital Colleague can assemble the three Formation inputs without human authorship.**

`lib/annie/formation/`

Three DC-layer adapters implemented:

```typescript
translateForFormation(observations: Observation[]) → Translation[]
assembleFormationContext(thought, entries, profile?) → FormationContext
knowledgeAnswerToFormation(answer: KnowledgeAnswer) → FormationKnowledge
```

**Evidence — the fridge scenario (seven steps, no hand-authored input):**

```
Sensor reading (8°C)
    ↓  DC: translateForFormation()
Translation[] — "temperature exceeds 5°C safe limit"
    ↓  DC: assembleFormationContext()
FormationContext — urgency: high, risk: food safety
    ↓  DC: knowledgeAnswersToFormation()
FormationKnowledge[] — evidenceLevel: constitutional + professional
    ↓  COS: form()
Understanding — summary derived, confidence 0–1, uncertainty present
    ↓  JudgementEngine
Judgement — disposition: human-required or caution (never: proceed)
```

No Understanding was hand-authored at any step.

**Knowledge provenance survives through the entire chain:**

| KnowledgeAnswer.sourceLevel | FormationKnowledge.evidenceLevel |
|---|---|
| `"helping-hand"` | `"constitutional"` |
| `"profession"` | `"professional"` |
| `"organisation"` | `"professional"` |
| `"venue"` | `"local"` |

**COS boundary confirmed by test:** `formation.ts`, `invariants.ts`, and `types.ts` contain no hospitality, food-safety, clinical, or construction domain terms. Professional content cannot enter COS.

---

## The Complete Pipeline

```
World
  │  (sensor, conversation, document, vision)
  ↓
Observation {id, category, description, confidence, source}
  │  [COS: beginObservationSession()]
  ↓
ObservationSession
  │  [DC: translateForFormation() using hospitalityFoodSafetyRules + hospitalityTranslationRules]
  │  [COS: translateObservations(observations, rules)]
  ↓
Translation[]                              ← Formation Input 1

AnnieThought + ContextStore + VenueProfile
  │  [DC: assembleFormationContext()]
  ↓
FormationContext                           ← Formation Input 2

KnowledgeAnswer[] from KnowledgeRouter
  │  [DC: knowledgeAnswersToFormation()]
  ↓
FormationKnowledge[]                       ← Formation Input 3

                    ↓
        COS: form(translations, context, knowledge)
                    ↓
Understanding { summary, confidence, uncertainty, completeness, evidenceChain }
                    ↓
        JudgementEngine.judge({ understanding })
                    ↓
Judgement { disposition, selected, uncertainty, governingPrinciples }
                    ↓
        ActionEngine → ExecutionEngine → ReflectionEngine → LearningEngine
```

---

## What Remains Deferred

Explicitly outside the scope of Milestones 013–016:

| Item | Status |
|---|---|
| `ContextStore` migration to `lib/os/context/` | Deferred — boundary agreed, migration not yet executed |
| Annie production brain integration | Deferred — adapters exist; wiring to `brain/index.ts` not yet done |
| KnowledgeGraph learning loop closure | Deferred — `ApprovedKnowledgeChange` → `KnowledgeGraph` wire missing |
| `platform/core/companion/` alignment | Deferred — two parallel architectures not yet reconciled |
| HQ pollination changes | Deferred |
| Translation rule `matches()` enrichment beyond temperature/stock | Deferred — pattern established; coverage can grow |

---

## The Architecture This Pipeline Confirms

```
HH HQ         — universal principles          → FormationKnowledge (constitutional)
Prof HQ       — industry knowledge            → FormationKnowledge (professional)
Org HQ        — optional, multi-site          → FormationKnowledge (professional)
OS / Venue    — ContextStore, KnowledgeRouter → FormationContext + FormationKnowledge
DC            — adapters, judgment, awareness → assembles all three Formation inputs
COS           — form() + invariants           → Understanding
JudgementEngine                               → Judgement
```

COS remains profession-neutral. The DC is the governed source of professional information.

---

## Traceability

| Layer | Source |
|---|---|
| Constitutional | `constitution/02-CONSTITUTION.md` — Article II: "Seek first to understand." |
| Theory | `docs/theory/003-THEORY-OF-UNDERSTANDING.md` — "Understanding emerges when knowledge is interpreted within context." |
| Theory | `docs/theory/009-THEORY-OF-TRANSFORMATION.md` — transformation chain: Knowledge → Understanding → Judgement |
| Architecture | `docs/architecture/FORMATION_INPUT_OWNERSHIP_MAP.md` |
| Architecture | `docs/analysis/INFORMATION_TO_TRUST_MAP.md` — original gap identified |
| Milestone | `MILESTONE_013_UNDERSTANDING_FORMATION_BOUNDARY_ESTABLISHED.md` |
| Milestone | `MILESTONE_014_UNDERSTANDING_FORMATION_INPUT_BOUNDARY_ANALYSIS.md` |
| Milestone | `MILESTONE_015_FORMATION_INPUT_OWNERSHIP_BOUNDARY.md` |
| Implementation | `platform/cos/understanding-formation/` — COS mechanism |
| Implementation | `lib/annie/formation/` — DC adapters |
| Evidence | 59 tests passing across 5 suites |

---

**Status:** Pipeline established | 59 tests passing | No human-authored Understanding required | Boundaries confirmed | Foundation settled
