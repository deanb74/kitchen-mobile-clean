# PD-005 — Language Models as Temporary Learning Capability

**ID:** PD-005
**Date:** 2026-08-06
**Topic:** LLM as Capability, Not Identity
**Status:** Architectural Principle — Preserved for Future Capability Design

---

## Core Principle

> Helping Hand governs the intelligence it uses. The intelligence does not govern Helping Hand.

---

## 1. The LLM is a Capability, Not the Digital Colleague

The LLM provides:

- language capability
- pattern recognition
- explanation assistance
- conversational fluency

It does not provide:

- identity
- values
- memory ownership
- authority
- professional judgement

---

## 2. Capability Can Be Borrowed. Understanding Must Be Earned.

An LLM can provide capability immediately.

A Digital Colleague earns understanding through:

```
Experience
    ↓
Observation
    ↓
Context
    ↓
Formation
    ↓
Reflection
    ↓
Learning
    ↓
Governance
    ↓
Memory
```

The LLM can accelerate expression.

It cannot bypass the journey.

---

## 3. The LLM is the Teacher, Not the Graduate

Early Digital Colleagues may rely heavily on LLM capability.

As Helping Hand matures, the relationship changes.

The goal is not:

> "Build the best AI assistant."

The goal is:

> "Develop Digital Colleagues that can use intelligence responsibly."

The teacher's success is measured by the student's independence.

---

## 4. Model Independence

The Digital Colleague must not become dependent on a specific underlying model.

The model may change.

The Digital Colleague remains.

```
Annie ≠ LLM

Annie uses LLM
Annie is governed by HH
Annie grows through experience
```

---

## 5. The LLM Remains Behind the Boundaries

The LLM does not bypass:

- Formation
- Judgement
- Governance
- Provenance
- Human authority

The LLM may suggest.

The system determines what is permitted.

---

## Relationship to the Existing Architecture

The boundaries already proven in the codebase are the same boundaries the LLM must respect:

| Boundary | Proven by |
|---|---|
| Formation cannot invent meaning | `platform/cos/understanding-formation/formation.ts` — Invariant 1 |
| Judgement routes through authority | `lib/judgement/JudgementEngine.ts` + `lib/authority/AuthorityEngine.ts` |
| Memory requires governance | `lib/knowledge-governance/writeGuard.ts` — 8 invariants |
| Provenance is never destroyed | `lib/knowledge/ConceptProvenanceRecord.ts` |
| Human authority is not automated | `constitution/05-AUTHORITY-AND-STEWARDSHIP.md` |

An LLM operating inside Helping Hand is subject to these same boundaries.

Its output is an observation.

What that observation becomes is governed.

---

## Preserved Insight

The LLM is a window, not a door.

It helps the Digital Colleague see and express.

It does not decide what the Digital Colleague becomes.

> Authority is earned through governance.
> The LLM has not earned it.
> The Digital Colleague is working towards it.
