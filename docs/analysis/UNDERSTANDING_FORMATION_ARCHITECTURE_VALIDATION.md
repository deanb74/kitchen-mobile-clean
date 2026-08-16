# Understanding Formation Architecture Validation

**Date:** 2026-08-05  
**Purpose:** Validate that the repository architecture supports the full information-to-inheritance model and confirm the Understanding Formation contract before implementation.  
**Constraint:** Analysis only. No code changes.

---

## Architecture Model — Validated ✓

The full chain is documented, partially implemented, and architecturally coherent. Every node exists. The roundabout between Translation and Judgement is the one missing piece.

```
Information Sources     ✓  ObservationSource types named in COS
        ↓
Observation (COS)       ✓  platform/cos/observation/ — active
        ↓
Translation (COS+DC)    ✓  platform/cos/translation/ — active; DC supplies rules
        ↓
Understanding Formation 🔴 platform/cos/ — does not exist yet
        ↓
Understanding           ✓  lib/understanding/Understanding.ts — struct exists
        ↓
Judgement               ✓  lib/judgement/JudgementEngine.ts — active, tested
        ↓
Action                  ✓  lib/action/ActionEngine.ts — active
        ↓
Reflection              ✓  lib/reflection/ReflectionEngine.ts + platform/cos/reflection/ — active
        ↓
Learning                ✓  lib/learning/LearningEngine.ts — active
        ↓
Governed Promotion      ✓  platform/cos/pollination/ + platform/hq/knowledgeFlow.ts
        ↓
Inheritance             ✓  KnowledgeGraph → UnderstandingEngine → downstream
```

`platform/cos/understanding-formation/` is confirmed absent. Directory listing of `platform/cos/`:

```
observation/
translation/
reflection/
pollination/
registry/
```

Every adjacent road exists. The junction does not.

---

## Boundary Validation

### Helping Hand HQ — Validated ✓

**Evidence:** `docs/architecture/HELPING_HAND_HQ.md`

> HH HQ is not a command centre, a surveillance platform, a replacement for local judgement, or a controller of Digital Colleagues.

> Knowledge should always remain at the lowest sensible level. Sensitive local detail should not travel with it unless genuinely required and appropriately governed.

- ✓ Owns universal principles, governance, wisdom, cross-profession learning
- ✓ Does not own venue details, employee information, or operational decisions
- ✓ "Venue Digital Colleagues do not contact Helping Hand HQ directly"

---

### Professional HQ — Validated ✓

**Evidence:** `docs/architecture/KNOWLEDGE_INHERITANCE_MODEL.md`

```
Industry HQ — Rules are shared.
Owns knowledge shared by every organisation within an industry.
Examples: Food Safety, HACCP, Licensing (Hospitality)
          NHS Guidance, CQC (Healthcare)
          Building Regulations, HSE (Construction)
```

- ✓ Owns industry knowledge and professional standards
- ✓ Does not own individual venue information

---

### Organisation HQ — Optional Layer Validated ✓

**Evidence:** `KNOWLEDGE_ARCHITECTURE.md` (explicit):

> Organisation HQ exists for organisations operating multiple venues.  
> Independent operators do not require an Organisation HQ.  
> **Organisation HQ is optional.**

**Evidence:** `platform/hq/types.ts` (in code):

```typescript
export interface KnowledgeOrigin {
  digitalColleagueId: string;
  profession: string;
  organisationId?: string;   // optional — absent for independents
  workplaceId?: string;
}
```

**Evidence:** `platform/hq/knowledgeFlow.ts` (routing logic):

```typescript
case "professional":
  return candidate.origin.organisationId
    ? ["digital-colleague", "organisation-hq", "profession-hq"]  // multi-site
    : ["digital-colleague", "profession-hq"];                     // independent
```

Tested and passing. An independent operator's knowledge never touches Organisation HQ. The architecture enforces this in code, not just documentation.

---

### Venue Intelligence — Minimum Boundary Validated ✓

**Evidence:** `docs/philosophy/UNDERSTANDING_LIFECYCLE.md`:

> Venue Intelligence exists for every venue.

**Evidence:** `docs/architecture/KNOWLEDGE_INHERITANCE_MODEL.md`:

```
Operations — Experience is local.
Examples: Today's temperatures, today's conversations, today's incidents
```

"Lucy has had the last three Mondays off sick" — local experience. Stays at venue level unless it earns the right to travel through governance. The architecture supports this explicitly.

---

### Digital Colleague — Validated ✓

**Evidence:** `lib/annie/observation/index.ts` (the DC's role):

```typescript
/**
 * COS provides: the universal observation session, the curiosity mechanism
 * Annie provides: hospitality observations, hospitality curiosity rules
 */
```

**Evidence:** `docs/architecture/HELPING_HAND_HQ.md`:

> Venue Digital Colleagues do not contact Helping Hand HQ directly.  
> Independent Digital Colleagues contribute through their Profession HQ.

- ✓ Receives observations
- ✓ Provides professional interpretation (translation rules)
- ✓ Provides live context
- ✓ Reflects on outcomes
- ✓ Contributes evidence upward (through pollination governance, not directly to HH)
- ✓ Does not write directly to Helping Hand HQ

---

## Learning Flow Validation — Validated ✓

```
DC experience                ✓  Execution records outcome (ExecutionEngine)
        ↓
Reflection                   ✓  ReflectionEngine.reflect({ execution })
        ↓
Learning candidate           ✓  LearningEngine.build({ reflection })
        ↓
Governance checks            ✓  evaluateGovernance() in pollination/governance.ts
        ↓
Approved learning            ✓  pollinate() blocks if not approved
        ↓
Correct HQ level             ✓  determineKnowledgeRoute() in platform/hq/knowledgeFlow.ts
        ↓
Inheritance to relevant DCs  🟡 KnowledgeGovernanceEngine produces ApprovedKnowledgeChange;
                                 wire back to KnowledgeGraph not yet closed
```

### No automatic propagation — confirmed in code

```typescript
// platform/cos/pollination/pollinationEngine.ts
if (!governance.approved) {
  return { approved: false, message: "Knowledge remains local." };
}
if (governance.reviewRequired) {
  return { approved: false, message: "Knowledge requires human review before wider distribution." };
}
```

Eight governance checks must pass before anything moves. Safety-critical candidates additionally require human review. Nothing propagates automatically. ✓

**The one open loop:** `ApprovedKnowledgeChange` is produced but not yet wired back to `KnowledgeGraph`. The learning cycle closes except for this final connection. This is a known gap, not a design flaw.

---

## Understanding Formation Contract — Validated ✓

### Inputs

**`Translation[]`** — validated required. Carries domain-applied meaning. `Translation.observationId` preserves the evidence link. Source type recoverable through the parent observation.

**`Context`** — validated required. Two types confirmed necessary:
- *Situational* — live circumstances: urgency, risk, who, what, purpose (from `AcademyContext` prototype)
- *Institutional* — background knowledge: venue, team, systems (from `ContextStore`)

Both are needed. They answer different questions. Situational context asks "what is happening right now?" Institutional context asks "what do I know about this environment?"

**`Prior Knowledge`** — validated required. Governing principles, applicable concepts, previous learning. Theory First Theorem: "Understanding cannot exist without knowledge." This is what makes translated observations significant or routine.

**All three together are sufficient. None alone is sufficient.** Confirmed by the three-profession test (hospitality, construction, healthcare) — same structure, different professional content.

---

### Output

```typescript
Understanding {
  summary:       string       // synthesised meaning of all inputs together
  confidence:    number       // derived from input quality — never authored
  uncertainty:   string[]     // named gaps affecting confidence
  completeness:  "sufficient" | "partial" | "insufficient"
  evidenceChain: string[]     // observation + translation IDs — traceability
}
```

**`summary`** — confirmed. JudgementEngine requires it. Cannot be replaced by structured fields — meaning spans all inputs simultaneously.

**`confidence`** — confirmed. Must be *derived* from translation confidences × context completeness × knowledge coverage. JudgementEngine uses thresholds: < 0.25 = insufficient, < 0.6 = caution.

**`uncertainty[]`** — confirmed. First-class output. JudgementEngine scans for high-risk terms. Never optional.

**`completeness`** — confirmed, not redundant with confidence. They measure different things:
- `confidence` = certainty in the synthesis given the inputs provided
- `completeness` = whether the inputs themselves were adequate

A DC can have 0.65 confidence from partial inputs (should seek before acting) or 0.65 confidence from complete inputs (should proceed with caution). JudgementEngine cannot distinguish these without `completeness`.

**`evidenceChain`** — confirmed. Governance, learning, and trust all require traceability from observation to Understanding. An opaque synthesis cannot be audited.

---

### Invariants

| # | Invariant | Enforceable? |
|---|---|---|
| 1 | Formation never invents meaning absent from evidence | ✓ Synthesis is bounded to inputs; no external calls |
| 2 | Uncertainty cannot be hidden | ✓ `uncertainty[]` is non-nullable; derived from input gaps |
| 3 | Evidence chain cannot disappear | ✓ `evidenceChain` derived from inputs; fails if inputs have no IDs |
| 4 | Confidence must be derived | ✓ No `confidence` parameter in input contract; computed only |
| 5 | Completeness must be derived | ✓ Computed from input coverage against minimum required set |

All five are enforceable as structural guarantees, not behavioural guidelines. They can be unit-tested at the capability boundary.

---

## Implementation Question — Answered

### Confirmed location: `platform/cos/understanding-formation/`

**Why this location is correct:**

1. Every adjacent capability already lives in `platform/cos/` — observation, translation, reflection, pollination. Formation belongs in the same layer.

2. The established pattern is already proven: COS owns mechanism; DC supplies content. Formation follows this without inventing a new pattern.

3. `lib/` engines (JudgementEngine, ActionEngine, etc.) already import from `lib/understanding/Understanding.ts`. Formation produces that type. No downstream change is required at the contract boundary — only the source of the Understanding changes from "human-authored" to "formation-produced."

4. No existing capability needs to be moved or refactored first. ContextStore can be migrated to COS as a separate subsequent step.

### The minimal initial structure

```
platform/cos/understanding-formation/
  types.ts             — FormationInput, FormationContext, FormationKnowledge,
                         extended Understanding (completeness + evidenceChain)
  invariants.ts        — the five enforceable guarantees as functions
  formation.ts         — form(translations, context, knowledge) → Understanding
  index.ts             — public exports
  __tests__/
    formation.test.ts  — fridge scenario: inputs produce correct Understanding
    invariants.test.ts — each invariant passes and fails correctly
```

No UI. No Annie changes. No venue changes. No engine refactoring.

### The first test

Take the fridge scenario from `scripts/test-companion-intelligence-cycle.ts` — currently using hand-authored Understanding — and prove that `form(translations, context, knowledge)` produces a structurally equivalent Understanding. When that test passes, the junction is built and traffic can flow.

---

## Summary

The repository is not missing intelligence. It is missing a junction.

```
Observation road    ✓
Translation road    ✓
Judgement road      ✓
Reflection road     ✓
Learning road       ✓
The roundabout      🔴  platform/cos/understanding-formation/
```

The roads are complete. The roundabout is small. Build it first, then connect the traffic.

---

**Status:** Architecture validated | Contract confirmed | Location confirmed | No code written
