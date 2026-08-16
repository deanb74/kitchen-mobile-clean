# MILESTONE_045 — Pre-Implementation Checkpoint

**Date:** 2026-08-06
**Purpose:** Confirm the conditions are right before a human relationship enters the architecture.

---

## Before Implementation

- [ ] `speakJudgement()` in `lib/annie/conversation/speak.ts` marked `@deprecated`
- [ ] PD-005 exists — LLM as Capability, Not Identity
- [ ] PD-006 exists — Conversation as Experience, Not Interface
- [ ] No engine modifications planned
- [ ] Conversation is an input branch — not a replacement for any existing path

## During Implementation

- [ ] Human speech enters as `Observation { source: "human" }` — not raw string
- [ ] No direct LLM → response path exists
- [ ] Responses pass through `AuthorityEngine` before becoming `Action`
- [ ] No automatic memory creation — `KnowledgeGraph` write requires full governance chain

## After Implementation

- [ ] Conversation branch can be removed without breaking the trunk
- [ ] Existing 121 tests still pass
- [ ] New conversation tests prove all five proof conditions

---

> Before Milestone 045, Helping Hand could learn.
> After Milestone 045, Helping Hand can listen.
>
> A system that learns without listening becomes clever.
> A system that listens without understanding becomes reactive.
> A Digital Colleague understands before it acts.
