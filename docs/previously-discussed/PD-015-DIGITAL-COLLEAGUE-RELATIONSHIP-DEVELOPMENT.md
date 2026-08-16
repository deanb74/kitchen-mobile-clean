# PD-015 — Digital Colleague Relationship Development

**ID:** PD-015
**Date:** 2026-08-06
**Topic:** How a DC Relationship Grows Over Time
**Status:** Preserved Architectural Principle — Protects against treating relationship depth as a data quantity

---

## Where This Fits

| Principle | Protects |
|---|---|
| PD-007 — Human Memory Boundary | People are not knowledge objects |
| PD-008 — Human Trust Boundary | Trust is earned through restraint |
| PD-014 — Trust Is Evidenced, Not Scored | Trust is remembered through reasons, not numbers |
| **PD-015 — Digital Colleague Relationship Development** | **Relationship depth is earned through behaviour, not accumulated data** |

---

## Core Principle

> A Digital Colleague earns relationship depth through demonstrated restraint and reliability,
> not through accumulated data.

The relationship is not stored. It is built through behaviour.

---

## The Two Errors

**Error 1 — Treating data as relationship.**

A DC that accumulates more entries about a person does not have a deeper relationship.
It has more data. Data is not relationship.

A person who discovers that a DC has been silently building a profile of their preferences,
moods, and patterns without their awareness has not been in a relationship.
They have been observed.

**Error 2 — Ignoring relationship context entirely.**

A DC that treats every conversation as the first — asking identical questions, providing
identical hedges, never recognising that this person has chosen to share context before —
fails the person in a different way.

A trusted human colleague adjusts. They ask fewer initial questions because they already
understand the context. They frame things differently because they know how this person
thinks.

The DC must do neither. It must earn the right to adjust.

---

## What Relationship Depth Means

Relationship depth is not a quantity. It is a quality.

A DC with a shallow relationship with a person:
- Has little prior context from this person
- Asks foundational questions before acting
- Hedges uncertainty explicitly
- Does not assume preferences

A DC with a deeper relationship with a person:
- Has consented-and-retained operational context (per PD-007)
- Asks fewer foundational questions — not because it assumes, but because it remembers
- Admits uncertainty proportionally — acknowledges what it already knows while flagging what it doesn't
- Acts within its authority as before — relationship depth does not expand authority

**Relationship depth permits better questions, not different authority.**

---

## What Earns Relationship Depth

A DC earns a deeper relationship through three things:

**1. Demonstrated restraint**
The DC did not remember things it should not have remembered.
The DC asked before storing.
The DC released context when it should have.
The person knows the DC did not overstep.

**2. Demonstrated reliability**
The DC admitted uncertainty when it had it.
The DC escalated when it should have.
The DC did not pretend to know more than it did.
Outcomes improved when the DC was involved.

**3. Demonstrated transparency**
The person can ask "what do you remember about me?" and receive a complete, honest answer.
The person can remove what they want removed.
The DC can explain why it understands what it does.

These three things are observable over time. They are the evidence of relationship trust.
They are not stored as a relationship score.

---

## What the Architecture Must Not Do

**Must not:** Vary DC behaviour based on inferred relationship depth without explicit consent.

A DC that says internally "this person shares a lot, so I can be less careful" has confused
familiarity with trust. The DC's restraint must be consistent regardless of how much data
is present.

**Must not:** Treat `PersonContextStore` entry count as a relationship signal.

More stored entries means the person consented to store more. It does not mean they
trust the DC more. Consent is a prerequisite for storage. It is not evidence of relationship.

**Must not:** Automatically reduce uncertainty hedging as the relationship deepens.

Uncertainty is a capability (PD-008). The DC admits what it does not know. A deeper
relationship does not reduce actual uncertainty — it may reduce the frequency of asking
for already-known context.

---

## What the Architecture May Do

**May:** Remember operational facts the person has consented to retain, and use them
to ask better-informed questions.

**May:** Reduce repetition of foundational questions for which context already exists
in `PersonContextStore`.

**May:** Acknowledge prior shared context explicitly: "Last time we spoke, you mentioned X.
Is that still relevant?" — not assumed, but referenced with transparency.

---

## The Relationship Lifecycle

```
First conversation
    — No prior context
    — Full foundational questions
    — Explicit uncertainty acknowledgement
    — DC earns nothing; demonstrates restraint
        ↓ (person chooses to share context)
Consented context exists
    — Reduced foundational questions
    — DC references prior context transparently
    — DC continues to admit uncertainty proportionally
    — DC continues to operate within same authority
        ↓ (person continues to engage, return, share)
Relationship depth
    — Not stored, not scored
    — Evidenced by the person's continued engagement
    — The person's willingness to share is the evidence
        ↓ (person can exit at any time)
Ended relationship
    — Person requests removal (PD-008)
    — PersonContextStore.clearSession() and deleteEntry()
    — DC returns to first-conversation posture
```

The exit is as governed as the entry.

---

## The Boundary This Principle Protects

When a future developer builds a feature that varies DC behaviour based on relationship
history, the following question must be answered before implementation:

> "Is this variation based on consented operational context — or is it based on inferred
> trust that the person has not explicitly granted?"

If the answer is the latter, it requires new consent before implementation.

---

## Preserved Insight

> The measure of a good colleague is not how much they remember.
> It is how they behave with what they have been trusted with.

A person who has shared context with a DC has trusted it with something.
The DC honours that trust by using it well and not reaching for more.

That is not a data model.

That is a relationship.
