# Milestone 023 — Foundation Review

**Date:** 2026-08-05  
**Purpose:** Capture what must now be treated as stable before new capability is added.

---

## What Has Been Proven

The formation pipeline has been validated end-to-end across four professional domains — hospitality, construction, healthcare, and Helping Hand itself. The following sequence is evidenced:

```
Experience (repository, sensor, conversation, document)
        ↓
Observation (COS — universal)
        ↓
Translation (COS mechanism + DC professional rules)
        ↓
Context + Knowledge assembly (DC layer)
        ↓
Pre-Formation Readiness Gate (COS structural + DC professional)
        ↓
COS Understanding Formation
        ↓
Understanding { summary, confidence, uncertainty, completeness, evidenceChain }
        ↓
Judgement
        ↓
Action
```

Everything from Experience through to Judgement is implemented and tested.

---

## Proven Immutable Boundaries

These are not design preferences. They are evidenced architectural principles. They must not be reversed without a governed process that produces new evidence.

### COS does not interpret professional meaning

COS owns `translateObservations()`. COS never knows what a temperature reading means, what a constitutional principle governs, or what a structural defect implies. The DC supplies that content. This boundary has been tested — the Milestone 016 universality test scans COS source files for professional domain terms and fails if any are found.

### DC owns interpretation

Translation rules, context assembly, and knowledge presentation belong to the DC layer. Each DC supplies different professional content. COS applies the same mechanism. This pattern was confirmed across Annie, Kev, Harry, and Andy.

### OS owns local intelligence and routing

`ContextStore`, `VenueKnowledgeProfile`, `KnowledgeRouter`, and `isKnowledgeApplicable()` belong to the OS layer. The DC consumes OS data. COS accepts the result. Neither COS nor the DC manages local storage or knowledge routing.

### Authority comes from governed source, not storage location

A constitutional document accessed locally is still constitutional. A professional threshold stored in a cache is still professional. Authority is determined by `sourceLevel` in `KnowledgeAnswer`, which is derived from the document's origin — not from where it was retrieved. `repositoryDocumentToKnowledgeAnswer()` classifies by `sourcePath` prefix, not by access method.

### Understanding precedes judgement

Theory of Judgement: "Judgement cannot exist without understanding." `JudgementEngine.judge()` requires `Understanding` as a structural input. The formation pipeline enforces this sequence. The Pre-Formation Readiness Gate prevents premature judgement by ensuring Formation inputs are present before `form()` is invoked.

### Uncertainty is a valid state

`Understanding.uncertainty[]` is never empty when inputs are incomplete. `completeness: "partial"` is the honest result of document-only Understanding. `disposition: "caution"` is the correct response to partial Understanding. Andy's first journey produced `completeness: "partial"` — that is the right answer, not a failure.

### No DC receives privileged answers

Andy used the same `form()` mechanism as Annie, Kev, and Harry. His `repositoryDocumentToKnowledgeAnswer()` adapter classified documents by source; it did not inject knowledge that was not present in the documents. His Understanding of Helping Hand was partial because documents alone are partial. This is correct.

---

## Deferred Items

These decisions have been made but not yet implemented. They belong to future milestones only.

| Item | Status | Reason for deferral |
|---|---|---|
| `ReflectionEngine` → `LearningEngine` → `KnowledgeGraph` learning loop closure | Deferred | `ApprovedKnowledgeChange` exists; the wire back to `KnowledgeGraph` is missing. Capability before closure. |
| Talk.Get OS | Deferred | Required for intent-based questions ("why was this decided?"). Andy's first journey completed without it, with named uncertainty. |
| `VenueKnowledgeProfile` rename to `DomainKnowledgeProfile` | Deferred | Naming artefact. Architecture works without renaming. Rename after the second non-venue DC uses it and the name creates friction. |
| Shared namespace cleanup (`lib/annie/formation/` vs universal location) | Deferred | Functions work. Location is suboptimal. Move when duplication creates maintenance cost. |
| Andy's second journey (intent, current state) | Deferred | Requires Talk.Get OS. Depends on conversational observation layer. |
| `ContextStore` migration from `lib/onboarding/` to `lib/os/context/` | Deferred | Boundary agreed. Migration is mechanical. Deferred to avoid scope during proof milestone. |

---

## The Next Architectural Question

Not:

> "How do we make Andy smarter?"

Instead:

> "How does a Digital Colleague transform experience into governed learning without corrupting inherited understanding?"

This is the frontier the architecture has reached.

The full lifecycle chain:

```
Experience
    ↓  (memory — retains significance)
Memory
    ↓  (knowledge — organises relationships)
Knowledge
    ↓  (understanding — explains meaning)
Understanding            ← proven, Milestones 013–023
    ↓  (judgement — evaluates action)
Judgement                ← proven
    ↓
Action                   ← proven
    ↓
Reflection               ← ReflectionEngine exists, connected
    ↓
Learning                 ← LearningEngine exists, connected to Reflection
    ↓
Governed Knowledge       ← KnowledgeGovernanceEngine exists
    ↓
KnowledgeGraph           ← wire from ApprovedKnowledgeChange not yet closed
    ↓
Better future Understanding  ← the loop not yet closed
```

Everything up to and including Judgement is proven.

The next frontier is the loop back. That is where a Digital Colleague stops merely understanding the world and starts contributing to the improvement of the world.

### What the Next Question Requires

The closing question is not a technical problem. It is a governance problem:

- What level of evidence makes a learning candidate worthy of inheritance?
- Who governs whether a lesson from Andy's experience can change what future DCs inherit?
- How does the learning loop preserve the integrity of what was already proven?

The `platform/cos/pollination/` capability already exists as an experimental governance gate. The `KnowledgeGovernanceEngine` already produces `ApprovedKnowledgeChange`. The missing piece is the wire from approved change back to `KnowledgeGraph` — and the governance decisions about what may travel that wire.

The next milestone does not add intelligence. It closes the loop that makes intelligence self-improving.

---

## The Architecture That Has Been Built

```
HH HQ
  │  universal principles → constitutional knowledge
COS
  │  universal mechanisms: observe, translate, form, judge, reflect, learn
DC layer
  │  professional content: rules, context, knowledge
  │  Annie → hospitality  Kev → construction  Harry → healthcare  Andy → Helping Hand
OS / Venue Intelligence
  │  local knowledge, routing, applicability
HQs
  │  governed knowledge by level
Venue / Repository
  │  lived experience and observed facts
People
```

This is a clean architecture. It holds. It has been tested under four professions including the profession whose domain is Helping Hand itself.

The work ahead is not redesign. It is completion.

---

**Status:** Foundation stable | Boundaries proven | Deferrals recorded | Next question identified
