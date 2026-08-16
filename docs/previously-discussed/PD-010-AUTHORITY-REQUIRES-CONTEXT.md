# PD-010 — Authority Requires Context

**ID:** PD-010
**Date:** 2026-08-06
**Topic:** The Nature of Governed Authority
**Status:** Preserved Architectural Principle — Protects against permission systems that operate independently of understanding

---

## Where This Fits

| Principle | Protects |
|---|---|
| PD-005 — LLM as Capability | The DC is not the model |
| PD-006 — Conversation as Experience | The human is not a query |
| PD-007 — Memory as Relationship | People are not knowledge objects |
| PD-008 — Human Trust Boundary | Trust is earned through restraint |
| PD-009 — Context Has Authority | Understanding must carry its origin |
| **PD-010 — Authority Requires Context** | **Permission without understanding is configuration** |

---

## Core Principle

> Permission without understanding is configuration.
> Authority is the ability to act appropriately within context.

A Digital Colleague must not only know whether it may act.

It must know why that action is within its authority.

---

## The Distinction

**Permission** is a static rule: *this actor may do this thing in this role.*

**Authority** is a contextual assessment: *this actor, with this understanding, in this situation, may proceed in this way.*

A door key is permission.

Knowing when to open the door — and when not to — is authority.

A system that only checks permission will eventually act at the wrong moment.

A system that checks authority checks permission and understands why the permission applies here.

---

## What This Means for Digital Colleagues

When Annie considers a response, the question is not only:

> "Am I a contributor? Does a contributor have permission to advise?"

The question is:

> "Is my understanding of this situation sufficient to warrant advice?
> Is the basis for my advice appropriate to the authority I hold?
> Would a responsible colleague act here, or wait?"

The authority level — `"observer"`, `"contributor"`, `"responsible"`, `"accountable"` — defines
the scope of what the DC may do.

The quality of understanding defines whether that scope applies in this moment.

Both are required.

Neither alone is sufficient.

---

## The Risk Level Is Not External

In a permission system, risk level is a property of the action: *advising about compliance is medium risk.*

In an authority system, risk level is partially a property of the understanding: *advising about compliance, based on partial understanding, is higher risk than the same advice based on complete, governed understanding.*

The same action, in the same role, with different quality of understanding, carries different authority implications.

A DC that does not account for the quality of its understanding when assessing its authority
is a DC operating on permission, not authority.

---

## The Professional Consistency

A healthcare DC, a construction DC, and a hospitality DC all face the same principle.

The specific risk changes:
- Healthcare: clinical judgement about patient condition
- Construction: safety judgement about equipment state
- Hospitality: service judgement about shift readiness

The principle does not change:

> The DC must not act on an authority it has not earned from its understanding of this situation.

The authority levels, risk weights, and action kinds are different by profession.

The requirement to ground authority in contextual understanding is universal.

It belongs in COS.

---

## What This Principle Requires of the Architecture

**1. The judgement that preceded the action must inform the authority assessment.**

`Judgement.disposition` encodes the DC's own verdict on its understanding quality.
That verdict must contribute to the authority risk level — not be supplied independently
by a caller who may not have considered it.

**2. The authority record must be able to explain its risk basis.**

An `AuthorityAssessment` that cannot explain why a particular risk level was appropriate
to the understanding that preceded it is a record without rings.

**3. Authority must not permit action that understanding has already qualified.**

If `JudgementEngine` returned `disposition: "caution"`, `AuthorityEngine` cannot
contradict that verdict by returning `decision: "allow"` at a lower risk threshold.
The merge that `ActionEngine` performs is the structural safety net.
The governed translation from Judgement to risk level is the explanation.

---

## The Tree Metaphor

The Oak now has:

- Roots — why it exists (`constitution/`)
- Trunk — how it thinks (formation → judgement → action chain)
- Rings — why it knows (provenance, source authority, contextSources)
- Leaves — where it helps (Digital Colleagues, professions, venues)

The branches are now learning to explain:

> "Before I carry weight, I need to know why I am strong enough."

A branch that grows without knowing whether the roots can support it is not confidence.

It is ignorance wearing the shape of action.

Authority — real authority, not permission — is a branch that knows the roots.

---

## Preserved Insight

> A Digital Colleague must not only know whether it may act.
> It must know why that action is within its authority.

The difference between permission and authority is not capability.

It is accountability.

Permission is granted.

Authority is earned — through governed understanding, appropriate context, and the restraint
to acknowledge when the understanding is not yet sufficient.
