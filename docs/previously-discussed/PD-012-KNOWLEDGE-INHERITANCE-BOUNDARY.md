# PD-012 — Knowledge Inheritance Boundary

**ID:** PD-012
**Date:** 2026-08-06
**Topic:** When Learning Becomes Shared Wisdom
**Status:** Preserved Architectural Principle — Protects against premature inheritance of local experience as universal knowledge

---

## Where This Fits

| Principle | Protects |
|---|---|
| PD-009 — Context Has Authority | Understanding must carry its origin |
| PD-010 — Authority Requires Context | Authority must be grounded in understanding |
| PD-011 — Learning Requires Causation | Learning must carry why it changed |
| **PD-012 — Knowledge Inheritance Boundary** | **Inheritance must be proportional to evidence breadth** |

---

## Core Principle

> A lesson learned by one Digital Colleague is not automatically wisdom for all.
>
> Inheritance is earned through breadth of evidence,
> not granted through confidence of conviction.

---

## The Inheritance Ladder

Knowledge earned through experience moves through four scopes.
Each step upward requires broader evidence than the step before.

```
Session scope
  — Informed this DC in this conversation
  — Not persisted beyond session end
        ↓ confirmed operational observation
Venue scope
  — This DC has confirmed this applies at this venue
  — Appropriate for venue-specific formation context
        ↓ multi-source validation across venues
Professional scope
  — Validated across multiple venues and DCs within the profession
  — Appropriate to inherit to all DCs of this profession
        ↓ constitutional validation
Universal scope
  — Applies to all Digital Colleagues regardless of profession
  — Requires the highest governance authority
```

A concept at the wrong scope is not wrong in content.
It is wrong in reach.

A concept that should be venue-scoped but inherits to all hospitality DCs reaches
colleagues who have no evidence basis for receiving it.

That is not knowledge sharing. That is noise propagation with the appearance of authority.

---

## Why This Matters

When Annie learns something at The Anne Arms, that learning has a provenance.
It came from a specific venue, a specific situation, a specific set of observations.

If that learning is governed into `KnowledgeGraph` with `inheritsTo: ["hospitality"]`,
it flows into the formation of every hospitality DC — including those at venues with
no shared context with The Anne Arms.

A single-source pattern has become profession-wide guidance.

The inheritance has outrun the evidence.

---

## What Currently Protects Against This

`evaluateGuard()` Invariant 6 blocks the worst case:

> Single-source evidence cannot inherit to `"all"`, `"helping-hand"`, `"hospitality"`,
> `"healthcare"`, or `"construction"`.

This is a negative gate. It prevents the clearest violation.

It does not enforce the positive condition:

> "What evidence is required to inherit to each scope?"

The caller still decides what `inheritsTo` to set on the proposed concept when calling
`applyApprovedChange()`. There is no governed derivation of appropriate inheritance scope
from the evidence available.

---

## The Three Questions Inheritance Must Answer

Before a concept inherits beyond its origin, three questions must be answerable:

**1. How many independent sources confirmed this?**

One venue confirming a pattern is not a profession-wide pattern.
Multiple venues, independently, producing the same governed learning — that begins to be.

**2. Has this been validated in contexts other than the one that produced it?**

A pattern observed under shift pressure may not apply during quiet service.
A pattern from a large venue may not apply to a small one.
The concept must have survived context variation before inheriting broadly.

**3. Who reviewed this inheritance decision?**

The decision to allow a concept to inherit to a profession is not technical.
It is a governance decision about what is known to be true across that profession.
It requires a named authority — not just a reviewer of the learning, but a reviewer
of the inheritance scope.

---

## The Inheritance Proposal

A `LearningProposal` must carry a `proposedInheritanceScope` — the DC's hypothesis
about how broadly this learning should be shared.

This is a hypothesis, not a decision.

The governance reviewer decides. The DC proposes.

```typescript
type ProposedInheritanceScope =
  | "session"     // ephemeral — do not persist
  | "venue"       // this venue only
  | "profession"  // this profession — requires multi-source evidence
  | "universal"   // all DCs — requires constitutional review
```

The `proposedInheritanceScope` does not automatically become `Concept.inheritsTo`.
It informs the governance reviewer, who decides the actual inheritance in the
`ApprovedKnowledgeChange`.

---

## The Relationship to Causation

Milestone 050 established `ProposalCausationCategory`:

- `"knowledge-gap"` — the failure revealed missing professional knowledge
- `"formation-gap"` — the failure revealed incomplete formation inputs
- `"situational"` — circumstances changed; cautious about proposing change
- `"unknown"` — insufficient evidence to determine

Causation and inheritance scope are linked:

| Causation | Appropriate scope |
|---|---|
| `"knowledge-gap"` from single source | `"venue"` at most until multi-source |
| `"knowledge-gap"` from multiple sources | `"profession"` is appropriate |
| `"formation-gap"` | `"venue"` — formation quality is venue-specific |
| `"situational"` | `"session"` — exceptional case, do not inherit |
| `"unknown"` | `"session"` — insufficient evidence for any inheritance |

This table is not enforced by code alone.
It is the governing expectation that a reviewer applies.

---

## Preserved Insight

> A tree does not extend its roots into soil it has not yet reached.
>
> Knowledge must earn the ground it inhabits.

The reach of knowledge is not a technical parameter.

It is an ethical decision about what the ecosystem is asked to trust.

A governance system that allows single-source learning to inherit universally
is not sharing wisdom.

It is spreading untested opinion with institutional authority.

That is precisely what the Oak does not do.
