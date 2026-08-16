# CANDIDATE — Pre-Governed Prototype Cleanup

**Date:** 2026-08-06
**Status:** Candidate — Future Cleanup Work
**Basis:** CONTEXTSTORE_MEMORY_AUDIT_REPORT_2026_08_06.md (Separate Finding)

---

## Purpose

Preserve the understanding of why these prototypes became obsolete,
before removing the code that embodies them.

A good engineer removes obsolete code.
A good architect preserves why it became obsolete.

---

## The Prototypes

These components predate the governed pipeline. They were built to prove ideas
that were later implemented correctly in the governed architecture.
They are not broken. They are superseded.

| Prototype | File | What it proved | Governed replacement |
|---|---|---|---|
| `LivingMemory` | `lib/annie/memory/livingMemory.ts` | Memory should be alive, reviewable, and context-sensitive | `PersonContextStore` (Milestone 046) + `KnowledgeGraph` (Milestone 043+) |
| `WisdomSource` | `lib/annie/wisdom.ts` | Annie should decide where to look before answering | Governed formation chain: `KnowledgeGraph → governedConceptsToFormation() → form()` |
| Annie Brain prototype | `lib/annie/brain/index.ts` | Annie should coordinate observation, memory, and decision | Governed pipeline: Observation → Translation → form() → JudgementEngine → AuthorityEngine |
| `anniePlatformVoice.ts` / `annieJourneyVoice.ts` | `lib/annie/platform/` | Voice of Annie's decisions | `judgementToConversationInstruction()` (Milestone 045) |
| `useWisdom.ts` | `lib/annie/platform/useWisdom.ts` | Annie always calls `askAnnieWisdom()` with fixed confidence | Governed understanding: `form()` derives confidence from formation inputs |

---

## Active Callers

| Prototype | Called from |
|---|---|
| `lib/annie/brain/index.ts` | `app/annie/brain.tsx`, `app/annie/first-shift.tsx` |
| `lib/annie/platform/useWisdom.ts` | Not called anywhere outside its own file |
| `lib/annie/platform/anniePlatformVoice.ts` | Not called anywhere outside `brain/index.ts` indirectly |

The app routes `app/annie/brain.tsx` and `app/annie/first-shift.tsx` are the only
active callers reaching into this prototype layer.

---

## Why These Must Not Be Removed Without Documentation

### `LivingMemory`

`LivingMemory` correctly understood that:
- Memory should carry its source
- Memory should know when to review itself (via `reviewTriggers`)
- Memory is not static fact storage

These insights led to `PersonContextStore` and the `lastReinforcedAt` pattern in
`KnowledgeGraph`. The design thinking in `LivingMemory` is the reason the replacements
were built well.

When it is deprecated, the deprecation notice should say:
> "This pattern proved correct — see `PersonContextStore` (consent-gated, session-scoped)
> and `Concept.lastReinforcedAt` (renewed through evidence)."

---

### `WisdomSource`

`WisdomSource` correctly understood that:
- Annie should decide where to get knowledge from, not just answer from assumption
- Prior learning has higher confidence than speculation
- The source of knowledge affects how it should be used

These insights led to `governedConceptsToFormation()` (Milestone 044) and the
`FormationKnowledge.sourceType` field (Milestone 047).

When it is deprecated, the deprecation notice should say:
> "This routing logic is now governed: `KnowledgeGraph.search()` → `governedConceptsToFormation()` → `form()`.
> The idea was right. The mechanism is now provenance-tracked."

---

### Annie Brain prototype

`lib/annie/brain/index.ts` correctly understood that:
- Annie needs to observe before answering
- Memory should inform action, not replace observation
- Reflection is a step, not an afterthought

These insights are now the governed pipeline (Milestones 043–053).

When it is deprecated, the deprecation notice should say:
> "This demonstration pipeline proved the concept. The governed implementation
> is documented in docs/milestones/ from Milestone 043 onwards."

---

## Cleanup Sequence

When governance authorises this cleanup:

1. **Add `@deprecated` JSDoc to each component** pointing to its governed replacement.
   Do not remove yet. Deprecation before deletion.

2. **Update `app/annie/brain.tsx` and `app/annie/first-shift.tsx`** to use the
   governed pipeline or remove the app routes if they are demo-only.

3. **Confirm no other callers** via TypeScript compiler after deprecation.

4. **Remove the deprecated files** in a subsequent milestone once all callers are migrated.

---

## What This Cleanup Is Not

This is not a feature. This is not a milestone proving new capability.

It is the Oak pruning branches that grew before the roots were established.

The branches were good. The roots grew better.
The old branches should come down with respect, not with haste.
