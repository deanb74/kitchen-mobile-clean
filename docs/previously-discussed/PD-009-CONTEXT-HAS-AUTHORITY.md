# PD-009 — Context Has Authority

**ID:** PD-009
**Date:** 2026-08-06
**Topic:** The Origin and Authority of Understanding
**Status:** Preserved Architectural Principle — Protects against understanding that cannot explain itself

---

## Where This Fits

| Principle | Protects |
|---|---|
| PD-005 — LLM as Capability | The DC is not the model |
| PD-006 — Conversation as Experience | The human is not a query |
| PD-007 — Memory as Relationship | People are not knowledge objects |
| PD-008 — Human Trust Boundary | Trust is earned through restraint |
| **PD-009 — Context Has Authority** | **Understanding cannot lose its origin** |

---

## Core Principle

> Information without origin is incomplete understanding.

A Digital Colleague must remember not only what it knows.

It must remember why it is allowed to know it.

---

## The Oak Has Rings

A tree does not simply grow.

Each ring tells the story of the season that produced it.

A year of drought leaves a thin ring.
A year of growth leaves a wide one.
A ring does not just record that the tree grew.
It records the conditions under which growth was possible.

The Oak does not just need roots.

It needs rings.

Every ring tells the tree where its growth came from.

---

## What This Principle Means

Context that enters formation from a person's consent-gated memory carries different authority than context from a professionally governed concept.

A `Concept` in `KnowledgeGraph` has earned its authority through:
- Observation
- Translation
- Understanding
- Reflection
- Learning
- Governance
- Human approval

A `RelationshipMemoryEntry` in `PersonContextStore` has earned a different authority through:
- A person's explicit consent
- A specific session
- A specific relationship

These are not the same authority.

They are not interchangeable.

When both reach `form()` as `FormationInstitutionalContext { category, key, value }` —
with all source metadata stripped — the system has forgotten the conditions that made each
piece of context legitimate.

---

## The Three Authorities

**Constitutional authority** — principles that govern all Digital Colleagues. No single experience can override them. No governance chain can retire them.

**Professional authority** — understanding earned through governed experience. Traceable to the execution that produced it. Reproducible. De-identified. Inherited by profession.

**Relational authority** — context given by a person within a specific relationship. Consent-gated. Session-scoped by default. Not transferable to other people. Not eligible for professional inheritance without explicit de-identification.

A system that conflates these three authorities does not produce understanding.

It produces confusion with the appearance of intelligence.

---

## The Practical Consequence

When `LearningEngine` produces a `LearningProposal`, it must be able to answer:

> "Was any part of the Understanding that informed this proposal derived from relational authority?"

If yes, the proposal requires explicit de-identification before governance can approve it.

Not because the insight is wrong.

Because the insight belongs to a person until a human reviewer confirms it has been earned as professional understanding.

---

## The Two Questions Every Understanding Must Answer

1. **What do I know?** — captured in `Understanding.summary`

2. **Why am I allowed to know it?** — captured in `Understanding.contextSources` and `Understanding.evidenceChain`

Currently `Understanding` can answer question 1. It cannot answer question 2 for institutional context sources.

---

## What This Principle Does Not Mean

This principle does not mean:

- Every piece of context needs a governance record
- Relationship context is forbidden from informing understanding
- Professional knowledge cannot be informed by individual experiences

It means:

- The origin of context must survive into understanding
- The system must be able to distinguish relational from professional authority
- De-identification is a deliberate governance act, not an automatic one

---

## Preserved Insight

> A Digital Colleague that cannot explain why it understands something is not demonstrating intelligence.
> It is demonstrating pattern matching without responsibility.

The difference between wisdom and information is knowing where the understanding came from
and what conditions made it legitimate.

A tree's rings are not decoration.

They are proof of growth.

Every piece of understanding Helping Hand develops should carry its rings.
