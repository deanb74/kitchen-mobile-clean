# Milestone 018 Candidate — Understanding Sufficiency and Curiosity Boundary Analysis

**Date recorded:** 2026-08-05

**Status:** Candidate — not yet started

**Depends on:** Milestone 017 — Understanding Formation Input Pipeline Established

---

## The Next Architectural Question

> How does a Digital Colleague determine whether it has sufficient inputs to form Understanding?

---

## Why This Question Comes Next

Milestones 013–017 proved that when a DC has translations, context, and knowledge, COS can form Understanding. The `completeness` field captures whether inputs were sufficient.

What is not yet governed is the step *before* formation:

> A DC receives a stimulus. Before invoking `form()`, it must decide whether it already has enough to form Understanding responsibly — or whether it must first observe, ask, recall, or research.

This is not an intelligence question. It is a **readiness boundary** question.

---

## The Five Readiness Questions

A Digital Colleague standing at the threshold of formation must be able to answer:

```
1. Do I understand enough?
   → Is existing context + knowledge sufficient for this situation?

2. What don't I know?
   → Which Formation inputs are absent or low-confidence?

3. What information is missing?
   → Can I name the specific gaps?

4. Should I ask, observe, or research?
   → Which seeking path closes the gap at the lowest cost?

5. Should I involve a human?
   → Is the gap too significant for autonomous Formation to proceed responsibly?
```

---

## What This Milestone Will Investigate

**Not implement. Investigate.**

1. Does the `completeness` field from Formation already answer "do I have enough?"
2. Does `uncertainty[]` from Formation already answer "what don't I know?"
3. Is `AnnieThought.needsClarification` the existing curiosity signal?
4. Does `JudgementDisposition: "insufficient"` already model "stop and seek"?
5. Is there a gap between these existing signals and a governed readiness protocol?

---

## The Bridge This Milestone Represents

From:

> Information processing  
> (the DC receives and translates inputs)

To:

> Companion Intelligence  
> (the DC decides whether it is ready to form Understanding)

---

## Acceptance Criteria (Anticipated)

Analysis only. The milestone will be complete when:

- The existing readiness signals are inventoried (what Formation, JudgementEngine, and AnnieThought already express)
- The gap between signals and governed readiness is named
- The boundary between "readiness is the DC's judgment" and "readiness is a COS capability" is drawn
- The next implementation decision is documented — not made

---

## What This Milestone Must Not Do

- Implement new readiness logic
- Change the Formation contract
- Change JudgementEngine
- Change AnnieThought
- Extend COS capabilities prematurely

The proven pipeline is a foundation. Do not extend capability until the sufficiency boundary is understood.

---

**Status:** Candidate | Analysis only | Prerequisite: Milestone 017 complete ✓
