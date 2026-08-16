# Milestone 021 — Andy Boundary Resolution Analysis

**Date:** 2026-08-05

**Status:** Achieved

**Depends on:** Milestone 020 Candidate  
**Constraint:** Evidence only. No code changes. No implementation proposals.

---

## Purpose

Milestone 020 identified seven open boundary questions before any Andy implementation begins. This analysis answers each question using only existing repository evidence.

The pattern:

```
Question → Evidence → Boundary Decision
```

No decision is made without evidence. Each boundary decision is recorded as settled or as requiring a specific further investigation.

---

## Question 1 — Is `AnnieThought` Reusable?

### The Specific Question

Is `AnnieThought` a hospitality-specific type, or is it `DigitalColleagueThought` with hospitality content?

### Evidence

```typescript
// lib/annie/thinking.ts
export interface AnnieThought {
  stimulus: string;                          // universal
  who?: string;                              // universal
  what?: string;                             // universal
  where?: string;                            // universal
  when?: string;                             // universal
  why?: string;                              // universal
  whoElseMightBeAffected?: string[];         // universal
  whatElseMightBeAffected?: UnderstandingDomain[];  // ← hospitality
  confidence: number;                        // universal
  needsClarification: boolean;               // universal
  suggestedNextStep: string;                 // universal
}
```

```typescript
// lib/annie/understanding.ts
export const understandingDomains = [
  "people", "shifts", "equipment", "compliance",
  "training", "maintenance", "stock", "customers",
  "finance", "documents", "incidents", "reports",
  "knowledge", "observations",
] as const;

export type UnderstandingDomain = (typeof understandingDomains)[number];
```

`UnderstandingDomain` contains hospitality operational concepts: shifts, stock, customers, compliance. These are Annie's professional domains.

`whatElseMightBeAffected?: UnderstandingDomain[]` is the only field that references hospitality content. It is **optional**.

Every other field — `stimulus`, `who`, `what`, `where`, `when`, `why`, `confidence`, `needsClarification`, `suggestedNextStep` — is universal. These are the classic five W questions plus cognitive state fields. They apply to any DC in any professional domain.

### Boundary Decision

**`AnnieThought` is `DigitalColleagueThought` with one optional hospitality field.**

It is reusable for Andy without modification if Andy:
1. Does not use `whatElseMightBeAffected` (it is optional — omitting it does not break the type), or
2. Supplies an Andy-specific domain list for `whatElseMightBeAffected`

Andy would use:
```
stimulus: "What is Helping Hand?"
what:     "the purpose and nature of Helping Hand"
why:      "to understand in order to contribute responsibly"
confidence: 0.3 (initial)
needsClarification: true (initial)
```

`whatElseMightBeAffected` would be omitted or populated with Andy-specific concepts — but the type does not require resolution of this for the gate to function.

**Settled: `AnnieThought` is reusable for Andy. The name "Annie" is a naming artefact, not a type constraint.**

---

## Question 2 — What Is an Andy Observation?

### The Specific Question

Can the existing `Observation` type represent repository documents, or does Andy need a new observation architecture?

### Evidence

```typescript
// platform/cos/observation/types.ts
export type ObservationSource =
  | "vision"
  | "conversation"
  | "document"      // ← already exists
  | "sensor"
  | "system"
  | "human";

export interface Observation {
  id: string;
  category: string;  // ← open string, not an enum
  description: string;
  confidence: number;
  source: ObservationSource;
}
```

Two critical findings:

**1. `"document"` already exists as an `ObservationSource`.**

The COS observation type was designed to accept document sources. Andy's repository observations would use `source: "document"` without any type change.

**2. `category: string` is an open type.**

`category` is not an enum. It accepts any string. Andy can use categories like `"principle"`, `"theory"`, `"architecture"`, `"governance"`, `"milestone"` without any modification to the COS type.

### Example Andy Observation

```
Observation {
  id:          "constitution-article-ii",
  category:    "principle",
  description: "Seek first to understand. Always.",
  confidence:  1.0,
  source:      "document",
}
```

This is a valid `Observation` today. No new type. No architectural change.

**Settled: The existing `Observation` type already supports repository observations. No new observation architecture is required.**

---

## Question 3 — Repository Knowledge Mapping

### The Specific Question

Can `RepositoryDocument` → `KnowledgeAnswer` → `FormationKnowledge` follow the existing path, or does Andy bypass OS knowledge routing?

### Evidence

```typescript
// lib/academy/repositoryKnowledgeService.ts
export type RepositoryDocument = {
  id: string;
  title: string;
  source: string;
  sourcePath: string;   // ← the key field for source classification
  text: string;
  score: number;        // ← can map to confidence
  section: string;
  fragment: string;
  reason: string;
};
```

```typescript
// lib/os/types.ts
export type KnowledgeAnswer = {
  questionId: string;
  answer: string;         // ← maps from RepositoryDocument.text
  sourceLevel: KnowledgeLevel;  // ← derived from sourcePath
  confidence?: number;    // ← maps from RepositoryDocument.score
};
```

### The Mapping

`RepositoryDocument` → `KnowledgeAnswer`:

| `RepositoryDocument` field | `KnowledgeAnswer` field | Mapping |
|---|---|---|
| `text` / `fragment` | `answer` | Direct — the document text becomes the principle |
| `id` | `questionId` | Direct |
| `score` | `confidence` | Normalise — score is integer, confidence is 0–1 |
| `sourcePath` | `sourceLevel` | Classify by path prefix (see below) |

Source classification from `sourcePath`:

```
constitution/        →  "helping-hand"
docs/theory/         →  "helping-hand"
docs/architecture/   →  "profession"
docs/milestones/     →  "organisation"
docs/governance/     →  "organisation"
KNOWLEDGE_ARCHITECTURE.md etc.  →  "venue" (local repo facts)
```

### The Path

```
RepositoryKnowledgeService.search(question)
        ↓
RepositoryDocument[]
        ↓
repositoryDocumentToKnowledgeAnswer()   ← single new adapter function
        ↓
KnowledgeAnswer[]
        ↓
knowledgeAnswerToFormation()            ← already exists
        ↓
FormationKnowledge[]
```

Andy does not bypass OS knowledge routing. He uses the same `KnowledgeAnswer` → `FormationKnowledge` adapter that Annie uses. The only new piece is the first step: `RepositoryDocument` → `KnowledgeAnswer`. This is one function of approximately 10 lines — analogous to `knowledgeAnswerToFormation` in size.

**Settled: The existing path works. One adapter function converts `RepositoryDocument` to `KnowledgeAnswer`. From there, the existing conversion applies unchanged.**

---

## Question 4 — What Replaces `VenueKnowledgeProfile`?

### The Specific Question

Is `VenueKnowledgeProfile` actually `DomainKnowledgeProfile` with venue being one implementation?

### Evidence

```typescript
// lib/os/knowledge/applicability/venueKnowledgeProfile.ts
export interface VenueKnowledgeProfile {
  venueId: string;
  professions: string[];   // ← open strings
  region: string;          // ← open string
  venueTypes: string[];    // ← open strings
  departments: string[];   // ← open strings
  equipment: string[];     // ← open strings
  capabilities: string[];  // ← open strings
  facts: VenueProfileFact[];
}
```

Every field is a `string` or `string[]`. Not an enum. Not constrained to hospitality vocabulary.

### Andy's Profile Would Be

```
venueId:      "helping-hand-platform"
professions:  ["humanity"]
region:       ""   (not geographically constrained)
venueTypes:   ["digital-colleague-organisation", "software-platform"]
departments:  ["constitution", "theory", "architecture", "academy", "platform"]
equipment:    ["repository", "codebase", "test-suite"]
capabilities: ["understanding-formation", "judgement", "reflection", "learning"]
facts:        [accumulated observations about the repository]
```

These are valid values for every `VenueKnowledgeProfile` field. No type change required. The knowledge applicability matcher (`isKnowledgeApplicable`) uses these fields to determine whether a knowledge package applies to this "venue." For Andy, knowledge tagged with `professions: ["humanity"]` would be applicable.

### The Naming Artefact

`VenueKnowledgeProfile` is named after Annie's use case. The actual structure is:

> A profile of the domain environment that determines which knowledge packages are applicable.

"Venue" describes Annie's context (a physical hospitality location). "Domain" describes Andy's context (an organisational platform). The structure is identical.

**Settled: `VenueKnowledgeProfile` is `DomainKnowledgeProfile`. No structural change required. Andy populates the same fields with his domain vocabulary. The name is a naming artefact.**

*Note: Renaming `VenueKnowledgeProfile` to `DomainKnowledgeProfile` is a valid future refactoring. It is not required before Andy's formation validation.*

---

## Question 5 — Can Andy Become Ready Without Talk.Get OS?

### The Specific Question

Can Andy reach `ready: true` for his first formation question using only the repository?

### Analysis

Andy's first formation question: "What is Helping Hand?"

This question has:
- **Historical dimension** — what was built, what principles were established (available in repository)
- **Current state dimension** — what is being worked on now (partially available in milestones; incomplete)
- **Intent dimension** — why specific decisions were made (not available in static documents)

**Documents can provide:**
- Constitutional principles (Constitution)
- Theoretical foundations (Theory Library)
- Architectural decisions (Architecture documents)
- Evidence of what was built (Milestones)
- The stated purpose of Helping Hand (founding documents)

**Documents cannot provide:**
- Why a specific architectural decision was made vs alternatives
- What the founders are currently thinking
- What the current priorities are
- What has changed since the documents were written

### The Readiness Gate Applied

`validateFormationInputs()` would confirm: Andy has translated documents, has context, has knowledge. `structurallyReady: true`.

`assessReadiness()` would produce: `ready: true` — because the structural inputs are present and Andy's confidence, while initially low, rises as more documents are processed.

**But the Understanding produced would have:**

```
completeness:   "partial"
uncertainty: [
  "I have constitutional and architectural principles but not the founders' current reasoning.",
  "I have milestone history but not the current development state.",
  "I understand what Helping Hand is designed to be; I cannot confirm what it currently is.",
]
```

**This is a valid and honest Understanding.** It is not a failure state. It names what is known and what is not. JudgementEngine would produce `disposition: "caution"` — proceed with care, not with certainty.

Talk.Get OS becomes necessary when Andy's `nextStep: "ask"` fires — when gaps include "I need to understand the intent behind this decision." The `"ask"` path requires a conversational channel. Without Talk.Get OS, `"ask"` routes exist but cannot be fulfilled by the DC alone.

**Settled: Andy can reach `ready: true` for document-grounded questions. His first formation is achievable without Talk.Get OS, with honest uncertainty about intent and current state. Talk.Get OS is needed for the second layer — understanding why, not just what.**

---

## Question 6 — Is Humanity a Profession?

### Evidence

From `lib/academy/AndyDigitalColleague.ts`:

```typescript
readonly profession = "Humanity";
```

From `docs/understanding-journeys/CURRICULUM.md`:

```text
Formation
        ↓
Constitution
        ↓
Foundation Modules      ← universal, all DCs
        ↓
Professional Education  ← profession-specific, Annie/Kev/Harry
```

From `docs/theory/THEORY-GOVERNANCE.md`:

```text
Theory (intellectual foundation)
        ↓
Philosophy
        ↓
Architecture
```

From `platform/hq/types.ts`:

```typescript
export type KnowledgeLevel =
  | "digital-colleague"
  | "organisation-hq"
  | "profession-hq"
  | "helping-hand-hq";
```

### Analysis

The user offered three options. The evidence supports a fourth, more precise position:

**Humanity is the universal behavioural foundation that sits beneath all professions, not alongside them.**

```
Helping Hand HQ
  ↓ (owns universal principles)
HUMANITY  ← the universal layer all DCs inherit
  ├── Hospitality (Annie)
  ├── Construction (Kev)
  ├── Healthcare (Harry)
  └── [future professions]
```

Andy's designation as "Humanity" means he IS the universal foundation. He does not practice a profession that exists alongside hospitality — he embodies the layer that all professionals inherit.

In knowledge routing terms, Andy's knowledge routes to `"helping-hand-hq"` — the universal level. His "Professional HQ" is Helping Hand HQ itself, because his professional domain is the universal principles that govern all DCs.

**Settled: Humanity is not a profession alongside others. It is the universal layer beneath all professions. Andy's `profession: "Humanity"` describes his role as the first DC who validates and embodies that universal foundation. His knowledge source is Helping Hand HQ. His "Professional HQ" is the same as his "Helping Hand HQ" — they are the same layer for Andy.**

---

## Question 7 — Theory Evidence Level

### The Specific Question

Should Theory Library documents be classified as `"constitutional"` evidence or require a new evidence level?

### Evidence

From `docs/theory/THEORY-GOVERNANCE.md`:

```text
Theory is the highest level of the Helping Hand knowledge hierarchy.

No Philosophy, Architecture, Engineering or Implementation document
may knowingly contradict an approved Theory document.

Hierarchy of Inheritance:
Theory → Philosophy → Architecture → Engineering → Implementation
```

Theory sits ABOVE philosophy, architecture, engineering, and implementation. It is the intellectual foundation from which everything else derives.

The existing `FormationKnowledge.evidenceLevel`:
```typescript
evidenceLevel: "constitutional" | "professional" | "local"
```

The current mapping:
- `"constitutional"` — cannot be overridden by professional or local knowledge
- `"professional"` — governs within a profession; overrides local
- `"local"` — specific to this venue/instance; lowest authority

### The Decision

Theory belongs at `"constitutional"` evidence level. The rationale:

1. **Theory cannot be contradicted by architecture, engineering, or professional knowledge.** If something is professional knowledge that appears to contradict a Theory, the Theory governs.

2. **The Formation synthesis question is:** "Can this principle be overridden by lower-level knowledge?" For Theory, the answer is no — identical to the Constitution.

3. **The governance distinction between Theory and Constitution is real but belongs in the `evidenceChain` source path**, not in a new evidence level. When Andy's Understanding references `docs/theory/003-THEORY-OF-UNDERSTANDING.md`, the `evidenceChain` records that provenance. A reviewer can distinguish Theory from Constitution via the path, without requiring Formation to treat them differently.

4. **Introducing a new evidence level before it is needed would create complexity without evidence.** The three-level system has been validated across multiple professions. Adding a fourth level requires evidence that the three-level system fails for Theory. No such evidence exists yet.

**Settled: Theory Library documents are classified as `"constitutional"` for Formation. The distinction between Theory (universal intellectual foundation) and Constitution (Helping Hand's specific commitment) is preserved in the `evidenceChain` source paths and remains available for governance review. It does not require a new evidence level in the current Formation contract.**

---

## Resolution Summary

| # | Question | Decision | Boundary |
|---|---|---|---|
| 1 | Is `AnnieThought` reusable? | **Yes — reusable as-is** | `whatElseMightBeAffected` is optional; core fields are universal |
| 2 | What is an Andy observation? | **No new architecture** | `source: "document"` + open `category` string already support repository observations |
| 3 | Repository knowledge mapping | **Existing path works** | One new adapter: `RepositoryDocument → KnowledgeAnswer`; rest is unchanged |
| 4 | VenueKnowledgeProfile replacement | **Not needed** | `VenueKnowledgeProfile` is already `DomainKnowledgeProfile`; Andy populates it with his domain vocabulary |
| 5 | Ready without Talk.Get OS? | **Yes, for document-grounded questions** | Andy reaches `ready: true` with honest uncertainty about intent; Talk.Get unlocks the second layer |
| 6 | Is Humanity a profession? | **Humanity is the universal layer beneath all professions** | Andy routes to `"helping-hand-hq"`; his Professional HQ and HH HQ are the same |
| 7 | Theory evidence level | **`"constitutional"`** | Theory cannot be contradicted by lower layers; provenance preserved in `evidenceChain` source path |

---

## What This Means for Implementation

The seven boundary questions are resolved. Andy's formation uses:

```
Existing:                          Andy's domain content:
──────────────────────────────────────────────────────────
AnnieThought (reused)         →    stimulus: "What is Helping Hand?"
Observation type (reused)     →    category: "principle" / "theory" / etc., source: "document"
RepositoryKnowledgeService    →    Andy's knowledge source
One new adapter               →    repositoryDocumentToKnowledgeAnswer()
VenueKnowledgeProfile (reused)→    departments: ["constitution","theory","architecture",...]
FormationKnowledge.evidenceLevel →  "constitutional" for Theory + Constitution
```

**The architecture requires one new adapter function and one domain profile. Nothing else changes.**

---

## Explicit Non-Goals

Still deferred from Milestone 020:

- Andy runtime
- Autonomous repository ingestion
- Talk.Get OS
- KnowledgeGraph closure
- VenueKnowledgeProfile rename (a naming cleanup, not a prerequisite)
- New evidence level for Theory (not supported by evidence)

---

**Status:** All seven boundary questions resolved | Evidence-based decisions | One new adapter identified | Implementation path is clear
