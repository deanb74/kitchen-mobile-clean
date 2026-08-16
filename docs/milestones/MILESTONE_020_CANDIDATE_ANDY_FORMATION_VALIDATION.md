# Milestone 020 Candidate — Andy Formation Validation

**Date:** 2026-08-05

**Status:** Candidate — Analysis Complete

**Depends on:**
- Milestone 017 — Understanding Formation Input Pipeline Established
- Milestone 019 — Pre-Formation Readiness Gate Established

---

## Purpose

Validate whether the established Digital Colleague architecture can create a Digital Colleague whose professional domain is the organisation that created it.

The question:

> Can HH-0000 Andy form Understanding of Helping Hand using the same governed lifecycle that future Digital Colleagues will inherit?

---

## Why Andy Is The Correct Candidate

Andy uniquely tests three boundaries:

### 1. Domain

Unlike Annie, Kev, or Harry:

```
Annie → Hospitality
Kev   → Construction
Harry → Healthcare
Andy  → Helping Hand itself
```

Andy is not learning an external profession.

His domain is the understanding of the organisation, philosophy, architecture, and purpose that created him.

### 2. Knowledge Source

Future DCs receive:

```
Professional HQ
Organisation knowledge
Venue Intelligence
```

Andy receives:

```
Constitution
Theory Library
Architecture
Governance
Milestones
Repository history
```

His knowledge source is the living repository.

### 3. Adequacy Threshold

Unlike food safety:

```
Fridge temperature → 5°C threshold
```

Andy has no equivalent numerical threshold.

His readiness boundary is interpretive:

> "Do I understand enough of the relationships between these artefacts to explain their meaning?"

---

## Analysis Findings

### Question 1 — Andy's Profession

Three interpretations remain possible:

**Constitutional validation role** — Andy validates whether Helping Hand principles can be understood by a Digital Colleague.

**Profession of Understanding** — Andy represents the domain of understanding itself.

**Organisational role** — Andy is the first internal Digital Colleague responsible for understanding Helping Hand.

Decision:

No implementation depends on resolving this immediately. The architecture only requires that Andy has appropriate translation rules and knowledge sources.

---

### Question 2 — Formation Input Mapping

Andy follows the same architecture:

```
External DC                      Andy

Observation                      Repository Observation
     ↓                                    ↓
DC Interpretation                Andy Interpretation
     ↓                                    ↓
Formation Inputs                 Formation Inputs
     ↓                                    ↓
COS Understanding Formation      COS Understanding Formation
     ↓                                    ↓
Judgement                        Judgement
```

---

### Question 3 — Translation Rules

Document observations are interpreted through DC-owned rules.

Possible categories:

```
constitution
theory
architecture
governance
milestone
implementation
```

Translation rules belong in:

```
lib/academy/formation/
```

Reason: COS translates mechanically. Andy determines meaning. The same pattern as Annie's `lib/annie/translation/hospitalityRules.ts`.

---

### Question 4 — Context

Existing mapping for Annie:

```
Venue Intelligence → Institutional Context
```

For Andy:

```
Repository Intelligence → Institutional Context
```

Open question: Does `VenueKnowledgeProfile` need a broader abstraction for non-physical environments?

The seven-category `ContextStore` structure maps directly to Andy's institutional context — constitution, theory, architecture, governance, milestones, implementation, history. No structural change required. Only content changes.

---

### Question 5 — Knowledge Sources

Candidate classification:

| Source | Evidence level |
|---|---|
| Constitution | `constitutional` |
| Theory Library | `constitutional` (under review) |
| Architecture | `professional` |
| Milestones | `professional` |
| Repository facts | `local` |

Open question: Does Theory require a distinct evidence level between constitutional and professional?

---

### Question 6 — Readiness

Andy differs from operational DCs.

**Operational readiness:**

> Do I have enough information to act safely?

**Andy readiness:**

> Do I understand the relationships and purpose of what I have learned?

Likely gap examples:

```
"I have the documents but have not connected them."
"I understand the architecture but not why this decision was made."
"I know what was built. I do not know what problem it solves."
```

Andy seeking may require:

```
remember   — recall from formation journeys or prior context
research   — retrieve additional repository documents
ask        — ask MARC or founders about intent and reasoning
reflect    — synthesise before attempting formation
```

A conversational path (the `"ask"` route) may require Talk.Get OS for questions about intent. Andy may reach `ready: true` with `completeness: "partial"` without it — structurally sufficient, professionally incomplete.

---

### Question 7 — Proof of Understanding

Andy succeeds only if:

**1. Evidence linked** — claims trace back to source material via `evidenceChain[]`.

**2. Uncertainty named** — `uncertainty[]` is specific: "I understand the principles but not why they were sequenced this way."

**3. Knowledge separated from Understanding** — documents are inputs, not answers. Andy explains meaning, not sentences.

**4. Graceful failure** — insufficient information produces seeking behaviour, not invented Understanding.

**5. No direct quotation substitution** — "The Constitution says X" is retrieval. "Helping Hand builds this way because..." is Understanding.

---

## Seven Open Boundary Questions Before Implementation

| # | Question | Status |
|---|---|---|
| 1 | Is `AnnieThought` reusable for Andy, or does Andy need a different thought structure? | Unknown |
| 2 | What categories should Andy's document observations receive? | Unknown |
| 3 | Can `RepositoryDocument` map directly to `FormationKnowledge`? | Likely yes — needs validation |
| 4 | What is Andy's equivalent of `VenueKnowledgeProfile`? | Unknown |
| 5 | Can Andy reach `ready: true` without Talk.Get OS? | Unknown |
| 6 | Is "Humanity" a profession with its own HQ or a constitutional validation role? | Unknown |
| 7 | Should Theory Library documents remain `constitutional` evidence or require a new level? | Unknown |

---

## Explicit Non-Goals

This milestone does NOT implement:

- Andy runtime
- Autonomous repository ingestion
- Autonomous learning
- Memory migration
- Talk.Get OS
- KnowledgeGraph closure
- New reasoning engines

Andy must use the same formation pipeline as all future Digital Colleagues. He must not receive privileged answers.

---

## Success Condition

Milestone 020 is complete only when the architecture can answer:

> "Can a Digital Colleague understand the organisation that created it — without being given privileged answers?"

---

**Status:** Candidate recorded | Analysis complete | Seven boundary questions open | Implementation deferred
