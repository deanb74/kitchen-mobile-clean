# Milestone 022 Candidate — Andy Formation Implementation Boundary

**Date:** 2026-08-05

**Status:** Candidate — Implementation Plan (No Code)

**Depends on:**
- Milestone 021 — Andy Boundary Resolution Analysis (Achieved)
- Milestone 019 — Pre-Formation Readiness Gate Established

---

## Purpose

Milestone 021 resolved the seven architectural boundary questions. All answers were settled using evidence.

This milestone translates those settled decisions into an implementation plan.

No code is written here. This is the plan before the build.

The pattern:

```
Milestone 013  Can COS understand?
       ↓
Milestone 015  Who owns interpretation?
       ↓
Milestone 016  Can a DC feed COS?
       ↓
Milestone 019  Can a DC know when it is ready?
       ↓
Milestone 021  Can the architecture understand itself?  ← boundary resolved
       ↓
Milestone 022  Where and how does Andy's layer get built?  ← this document
       ↓
Milestone 023  Andy earns his first answer
```

---

## Question 1 — Where Does Andy's DC Layer Live?

### Options Under Consideration

```
lib/andy/         — new namespace, mirrors lib/annie/
lib/humanity/     — follows Andy's profession designation
lib/academy/      — Andy's existing home
```

### Evidence

Andy's existing implementation already lives in `lib/academy/`:

```
lib/academy/AndyDigitalColleague.ts
lib/academy/MarcMentor.ts
lib/academy/Memory.ts
lib/academy/academyTypes.ts
lib/academy/repositoryKnowledgeService.ts
```

Annie's formation adapters follow this pattern:

```
lib/annie/
  thinking.ts          ← DC cognitive state
  translation/         ← translation rules
  formation/           ← formation adapters (Milestones 016, 019)
```

By parallel structure, Andy's formation adapters would be:

```
lib/academy/
  formation/           ← Andy's formation adapters
    translationAdapter.ts
    contextAdapter.ts
    knowledgeAdapter.ts
    readinessAdapter.ts
```

### The Case Against `lib/andy/`

Creating `lib/andy/` would introduce a new namespace whose long-term purpose is unclear. Andy is the Academy's DC — he belongs in `lib/academy/`. A future restructuring may warrant a `lib/andy/` namespace, but it should not be created before the capability is proven.

### The Case Against `lib/humanity/`

`lib/humanity/` would name the directory after Andy's profession. But "Humanity" is the universal layer beneath all professions — it is not Andy's personal namespace. Using it for his DC layer would conflate his professional identity with his file location.

### Decision

**Andy's DC layer lives in `lib/academy/formation/`.**

This is the same location pattern as Annie (`lib/annie/formation/`) applied to Andy's existing home. No new namespace. No renaming. The structure is consistent with what has already been built.

---

## Question 2 — Where Does Repository Knowledge Belong?

### The Specific Question

Is `RepositoryKnowledgeService` Venue Intelligence (local) or an HH HQ knowledge source (universal)?

### Evidence

`RepositoryKnowledgeService` is a local file scanner. It reads markdown files from a local repository path. It has no network connectivity. It is available offline. It returns scored `RepositoryDocument[]` objects.

This matches Venue Intelligence:

```
Venue Intelligence characteristics:
- locally available
- offline capable
- specific to this instance
- built from what Annie has directly observed
```

But the DOCUMENTS it returns carry different authority levels:

```
constitution/02-CONSTITUTION.md  →  constitutional authority
docs/theory/003-UNDERSTANDING.md →  constitutional authority
docs/architecture/DIGITAL_COLLEAGUE.md  →  professional authority
docs/milestones/MILESTONE_013.md  →  organisational authority
README.md  →  local (instance-specific)
```

The resolution: **`RepositoryKnowledgeService` is the mechanism (local access layer, analogous to Venue Intelligence). The knowledge it returns has authority determined by document source, not by how it was retrieved.**

Local storage of a constitutional document does not make it local knowledge. The `sourceLevel` in `KnowledgeAnswer` reflects the document's governing authority, not where it was physically retrieved from.

### Decision

**`RepositoryKnowledgeService` is Andy's Venue Intelligence equivalent — a local access mechanism.**

The `repositoryDocumentToKnowledgeAnswer()` adapter (the one new function from Milestone 021) determines `sourceLevel` by `sourcePath`:

```
constitution/             →  sourceLevel: "helping-hand"  →  constitutional
docs/theory/              →  sourceLevel: "helping-hand"  →  constitutional
docs/architecture/        →  sourceLevel: "profession"    →  professional
docs/milestones/          →  sourceLevel: "organisation"  →  professional
docs/governance/          →  sourceLevel: "organisation"  →  professional
README.md / root files    →  sourceLevel: "venue"         →  local
```

The mechanism is local. The authority is governed by content.

---

## Question 3 — Does Andy Use `knowledgeAnswerToFormation()` Unchanged?

### The Function

```typescript
// lib/annie/formation/knowledgeAdapter.ts
export function knowledgeAnswerToFormation(answer: KnowledgeAnswer): FormationKnowledge {
  return {
    principle: answer.answer,
    evidenceLevel: sourceLevelToEvidenceLevel(answer.sourceLevel),
  };
}

function sourceLevelToEvidenceLevel(sourceLevel: KnowledgeLevel): FormationKnowledge["evidenceLevel"] {
  switch (sourceLevel) {
    case "helping-hand":  return "constitutional";
    case "profession":    return "professional";
    case "organisation":  return "professional";
    case "venue":         return "local";
  }
}
```

### Testing Against Andy's Knowledge Sources

| Andy's source | `sourceLevel` | `evidenceLevel` | Correct? |
|---|---|---|---|
| Constitution | `"helping-hand"` | `"constitutional"` | ✓ |
| Theory Library | `"helping-hand"` | `"constitutional"` | ✓ |
| Architecture docs | `"profession"` | `"professional"` | ✓ |
| Milestones | `"organisation"` | `"professional"` | ✓ |
| Local repo facts | `"venue"` | `"local"` | ✓ |

No hidden assumptions. The function maps `KnowledgeLevel → evidenceLevel` based on authority. Andy's sources map correctly through the existing switch statement.

### Decision

**Andy uses `knowledgeAnswerToFormation()` unchanged.**

It is already a universal adapter. It lives in `lib/annie/formation/` today. For Andy, it is called from `lib/academy/formation/` rather than from Annie's formation pipeline — but the function itself does not change.

*Note: If the function is moved to a shared location in a future cleanup, it would be a refactoring of the correct architectural principle already established. Not a prerequisite.*

---

## Question 4 — Does Andy Require a `DomainKnowledgeProfile` Rename Now?

### The Evidence

`VenueKnowledgeProfile` is a naming artefact. The structure is generic. Andy can populate it with repository dimensions without any type change. This was confirmed in Milestone 021.

### The Risk of Renaming Now

Renaming `VenueKnowledgeProfile` to `DomainKnowledgeProfile` would:
- Change the name across all files that import it
- Require `addVenueProfileFact()` to be renamed to `addDomainProfileFact()`
- Risk introducing regressions during a capability-proving milestone
- Produce no capability gain

The rename is architecturally correct. It is not architecturally necessary before proving Andy's formation.

### Decision

**Do not rename `VenueKnowledgeProfile` during Milestone 022 or 023. Record the rename as architectural debt to be addressed after Andy's first formation journey passes.**

The architecture is working. Naming cleanup follows evidence, not anticipation.

---

## Question 5 — Andy's First Validation Journey

### The Journey

```
Journey ID:  HH-0000-001
Title:       The First Institutional Understanding
Question:    "What is Helping Hand?"
```

This question is chosen deliberately:
- It is the simplest honest question Andy can be asked
- It requires Understanding, not retrieval
- It has a knowable answer and knowable limits
- It tests whether the formation pipeline works without privileged answers

### Input Sources

Andy gathers Formation inputs from the repository:

**Observations (documents observed):**

```
constitution/02-CONSTITUTION.md         category: "principle",  source: "document"
FOUNDING_PRINCIPLES.md                  category: "identity",   source: "document"
docs/architecture/DIGITAL_COLLEAGUE.md  category: "architecture", source: "document"
KNOWLEDGE_ARCHITECTURE.md               category: "architecture", source: "document"
docs/theory/003-THEORY-OF-UNDERSTANDING.md  category: "theory", source: "document"
```

**Translation rules (Andy's DC layer):**

```
category: "principle"   →  "This is a governing principle with highest authority in Helping Hand."
category: "theory"      →  "This is a theoretical foundation that shapes all design decisions."
category: "architecture"  →  "This is a design decision expressing a governing principle."
category: "identity"    →  "This defines what Helping Hand is or does."
category: "governance"  →  "This records a governed decision or achieved capability."
```

**Context (repository profile):**

```
situational:
  stimulus:  "What is Helping Hand?"
  what:      "the purpose, character, and architecture of Helping Hand"
  why:       "to form Understanding that can be shared and validated"
  confidence: 0.3 → rises as inputs are assembled

institutional:
  category: "constitution"  key: "article-ii"  value: "Seek first to understand."
  category: "identity"      key: "purpose"     value: "help people flourish"
  category: "architecture"  key: "digital-colleague"  value: "a trusted member of Helping Hand"
```

**Knowledge (from RepositoryKnowledgeService):**

```
"Helping Hand exists to help people spend less time operating software
 and more time doing the work they came to do."
sourceLevel: "helping-hand"  → evidenceLevel: "constitutional"

"A Digital Colleague is not software.
 A Digital Colleague is a trusted member of Helping Hand."
sourceLevel: "profession"  → evidenceLevel: "professional"

"Understanding emerges when knowledge is interpreted within context."
sourceLevel: "helping-hand"  → evidenceLevel: "constitutional"
```

### Expected Readiness Gate Behaviour

**First pass (before all inputs assembled):**

```
validateFormationInputs({ translations: [], context: {...}, knowledge: [] })
→ structuralGaps: ["No observations have been translated."]
→ nextStep: "observe"
→ ready: false
```

**Second pass (after translation, but before knowledge):**

```
validateFormationInputs({ translations: [...], context: {...}, knowledge: [] })
→ structuralGaps: ["No applicable knowledge principles provided."]
→ nextStep: "research"
→ ready: false
```

**Third pass (all inputs assembled):**

```
validateFormationInputs({ translations: [...], context: {...}, knowledge: [...] })
→ structurallyReady: true
→ structuralGaps: []
→ ready: true  (assuming thought.confidence > 0.7 after input assembly)
→ nextStep: "form"
```

### Expected Understanding

```typescript
Understanding {
  summary:
    "Helping Hand exists to help people achieve better outcomes by building
     Digital Colleagues that understand before they act. A Digital Colleague
     is a trusted member of the organisation, not software. Its purpose is
     to remove the burden of operating technology so people can focus on
     what matters. This is governed by the principle: seek first to understand.",

  confidence:  0.65  (moderate — documents provide the what; intent requires conversation)

  uncertainty: [
    "I understand the stated purpose but not the founders' current reasoning.",
    "I understand what has been built but not the current development priorities.",
    "The boundary between Helping Hand as a concept and Helping Hand as it currently exists is unclear from documents alone.",
  ]

  completeness: "partial"  (structurally sufficient; professionally incomplete)

  evidenceChain: [
    "constitution-02",
    "founding-principles",
    "architecture-digital-colleague",
    "knowledge-architecture",
    "theory-003-understanding",
  ]
}
```

### Acceptance Criteria for Journey HH-0000-001

The journey passes when Andy's Understanding:

1. **Contains a summary that explains meaning, not text** — Andy does not quote. He synthesises.
2. **Has non-empty `evidenceChain[]`** — every claim traces to a source.
3. **Has specific `uncertainty[]`** — Andy names what documents cannot tell him.
4. **Has `completeness: "partial"`** — Andy is honest about the limits of document-only Understanding.
5. **Does not produce `disposition: "proceed"` from JudgementEngine** — partial Understanding merits caution, not confidence.

The journey fails if:
- Andy's summary quotes document text directly
- `evidenceChain` is empty
- `uncertainty` is empty
- Andy claims certainty about intent or current state

---

## Implementation Scope for Milestone 022 / 023

### What Gets Built (Milestone 023)

**`lib/academy/formation/translationAdapter.ts`**

Andy's document translation rules. Matches on `category` (principle, theory, architecture, identity, governance) and maps to domain meaning without professional hospitality content.

**`lib/academy/formation/contextAdapter.ts`**

Assembles `FormationContext` from:
- Andy's thought (stimulus + what + why + confidence)
- Repository context store entries
- Repository knowledge profile (VenueKnowledgeProfile populated with Andy's domain)

**`lib/academy/formation/knowledgeAdapter.ts`**

Imports and re-exports `knowledgeAnswerToFormation()` from `lib/annie/formation/`. One line.

Adds `repositoryDocumentToKnowledgeAnswer()` — the single new function identified in Milestone 021.

**`lib/academy/formation/readinessAdapter.ts`**

Imports and re-exports `assessReadiness()` from `lib/annie/formation/`. Andy uses the same readiness gate.

**`lib/academy/formation/__tests__/journey-hh-0000-001.test.ts`**

The first validation journey test. Uses `RepositoryKnowledgeService` against the actual repository to produce Formation inputs. Invokes `form()`. Validates the five acceptance criteria above.

---

### What Does NOT Change

```
form()                          — unchanged
JudgementEngine                 — unchanged
AnnieThought                    — unchanged (reused for Andy)
Observation type                — unchanged
knowledgeAnswerToFormation()    — unchanged
assessReadiness()               — unchanged
validateFormationInputs()       — unchanged
VenueKnowledgeProfile           — unchanged (naming debt deferred)
hospitalityTranslationRules     — unchanged
```

---

## Success Condition

Milestone 022 is the plan. Milestone 023 is the proof.

The success condition for Milestone 023:

> Andy, using the formation pipeline established across Milestones 013–019, can answer "What is Helping Hand?" with honest Understanding — evidence-linked, uncertainty-named, completeness-assessed — without being given the answer.

That is the test the architecture was always building toward.

---

**Status:** Implementation plan complete | No code written | Milestone 023 scope defined | One new function identified | All other components inherited unchanged
