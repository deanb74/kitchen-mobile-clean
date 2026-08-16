# PD-011 — Learning Requires Causation

**ID:** PD-011
**Date:** 2026-08-06
**Topic:** Why Understanding Changed
**Status:** Preserved Architectural Principle — Protects against knowledge accumulated without understanding why

---

## Where This Fits

| Principle | Protects |
|---|---|
| PD-009 — Context Has Authority | Understanding must remember where it came from |
| PD-010 — Authority Requires Context | Authority must remember why it can act |
| **PD-011 — Learning Requires Causation** | **Learning must remember why it changed** |

---

## Core Principle

> A Digital Colleague must not only record what it learned.
> It must record why the outcome warranted learning at all.

Without causation, a system improves through consequence.

With causation, a system improves through understanding.

The difference is not speed or accuracy.

It is whether the system can be trusted.

---

## The Problem

A DC acts. The outcome is poor. The learning engine produces a proposal.

Currently, the proposal text describes what should change.

It does not distinguish:

- whether the failure was caused by incomplete understanding
- whether the failure was caused by missing professional knowledge
- whether the failure occurred despite correct judgement and adequate understanding
- whether the failure was situational — the circumstances changed after a correct decision

All four produce the same proposal template.

A learning system that cannot distinguish these four cases is not improving.

It is pattern-matching on failure.

---

## The Four Cases

| Case | Situation | Correct Learning Response |
|---|---|---|
| A | Judgement correct, outcome good | Reinforce the approach |
| B | Judgement reasonable, outcome poor | Propose adjustment to knowledge or process |
| C | Judgement wrong — understanding was incomplete | Improve formation quality, not just knowledge |
| D | Action correct, circumstances changed | Observe; do not propose — require human review |

The DC currently cannot distinguish B from C from D.

All three produce `disposition: "adjust"` and `proposal: "process adjustment"`.

---

## The Confidence–Completeness Distinction

Confidence and completeness are different dimensions of understanding quality.

**Confidence** answers: "How certain am I in this synthesis?"

**Completeness** answers: "Were the inputs adequate?"

A DC can be highly confident while missing information:

> "Based on what I know, I'm confident." — confidence: 0.85
> "But did I know enough?" — completeness: "partial"

This is not a contradiction. Humans experience this constantly.

When a high-confidence, incomplete-understanding DC fails:
- The failure may be Case C (incomplete inputs caused the failure)
- Not Case B (knowledge was adequate but outcome was unexpected)

The learning proposal for Case C should say: "The formation inputs were insufficient.
Improve observation coverage or translation quality."

Not: "Introduce a targeted process adjustment."

**This distinction requires `priorUnderstandingCompleteness` to survive into reflection.**

---

## Why This Matters Beyond Annie

A healthcare DC that learns "escalation should happen faster" from a poor outcome, without
knowing whether the poor outcome was caused by incomplete patient context (Case C) or
by adequate understanding of an exceptional case (Case D), may escalate more aggressively —
and erode the very trust its restraint was building.

A construction DC that learns "equipment warnings should trigger shutdown" from a failure,
without distinguishing whether the failure was caused by missing safety knowledge (Case B)
or by a rare environmental factor (Case D), may over-restrict legitimate operation.

The learning must remember why it changed.

---

## What This Principle Requires of the Architecture

**1. The prior judgement disposition must survive into reflection.**

If the DC acted under caution (`Judgement.disposition: "caution"`) and the outcome failed,
the reflection must know this. The failure is less surprising — the DC already flagged
uncertainty. Learning should acknowledge that the prior uncertainty was warranted.

**2. The prior understanding confidence must survive into reflection.**

High-confidence failure is a signal that circumstances may have changed, not that the DC
learned incorrectly. It should trigger human review before a learning proposal.

**3. The prior understanding completeness must survive into reflection.**

Partial understanding that resulted in failure is a signal that formation quality may need
improvement — not just that professional knowledge is missing.

**4. Learning proposals must carry a `causationCategory`.**

A proposal without a causation category is a hypothesis, not a governed learning claim.

Candidates:
- `"knowledge-gap"` — adequate understanding, failed due to missing professional knowledge
- `"formation-gap"` — incomplete understanding caused the failure
- `"situational"` — correct understanding and judgement, circumstances changed
- `"unknown"` — insufficient evidence to determine cause

---

## The Architectural Mechanism

Three optional fields carried from caller through the reflection chain:

```
Judgement.disposition + Understanding.confidence + Understanding.completeness
    ↓ caller supplies to BuildReflectionInput
priorJudgementDisposition? + priorUnderstandingConfidence? + priorUnderstandingCompleteness?
    ↓ ReflectionEngine.copyContext()
ReflectionContext (carried forward)
    ↓ LearningEngine
LearningContext (carried forward into proposal causation)
```

This follows the exact pattern of `understandingContextSources` from Milestone 047.

Zero engine logic changes for the carrier step alone.

The detection logic — distinguishing the four cases — is the implementation milestone.

---

## The Tree Metaphor

A tree does not strengthen every branch that breaks.

Sometimes the branch broke because it grew badly.

Sometimes because the storm was exceptional.

Sometimes because the tree needed to grow differently.

The tree needs to know which.

A system that strengthens every broken branch eventually becomes rigid and brittle.

A system that understands why a branch broke becomes resilient.

---

## Preserved Insight

> A learning proposal is not a conclusion about what changed.
> It is a governed hypothesis about why change may be warranted.

The correct chain is:

```
Outcome
    ↓
Reflection
    ↓
Causation hypothesis
    ↓
Governed learning proposal
    ↓
Human-approved knowledge change
```

Not:

```
Outcome → Learning → Truth
```

> Without causation, a DC accumulates responses to consequences.
> With causation, a DC develops understanding of its own growth.

The difference between a system that improves and one that merely accumulates
is not the volume of learning.

It is whether each learning claim can answer:

> "Why did this outcome warrant a change, and what specifically needed to change?"

That is the difference between intelligence and pattern matching.

That is what separates a Digital Colleague from a recommendation engine.
