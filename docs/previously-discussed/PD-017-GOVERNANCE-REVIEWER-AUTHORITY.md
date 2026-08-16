# PD-017 — Governance Reviewer Authority

**ID:** PD-017
**Date:** 2026-08-06
**Topic:** Who Has the Authority to Approve Knowledge Becoming Inheritance
**Status:** Preserved Architectural Principle — Governs the boundary between a text field and genuine authority

---

## Where This Fits

| Principle | Protects |
|---|---|
| PD-010 — Authority Requires Context | Authority must be grounded in understanding |
| PD-016 — Independent Reinforcement | Evidence must come from genuinely independent sources |
| **PD-017 — Governance Reviewer Authority** | **`reviewedBy` must represent real authority, not a declaration** |

---

## Core Principle

> Authority is not a name in a field.
>
> Authority is the earned right to make a governed decision on behalf of others
> who will be affected by it.

---

## The Problem

`BuildKnowledgeGovernanceInput.reviewedBy` accepts a `string`.

The string is never verified. Any string passes `evaluateGuard()` Invariant 2.

This means "Hospitality HQ" and "anyone" are structurally equivalent.
The system cannot distinguish a genuine professional authority from a self-declaration.

`evaluateGuard()` Invariant 2 correctly enforces that professional-scope changes
require a named reviewer. It does not enforce that the named reviewer has the
authority to approve that specific class of change.

---

## Authority Is Not Uniform

Different classes of knowledge change require different authority.

**Class 1 — Constitutional authority**
Applies to: `evidenceLevel: "constitutional"`, `scope: "universal"`
Required authority: Helping Hand HQ (founding authority)
Cannot be reviewed by: any single person, any profession HQ, any venue authority

**Class 2 — Professional authority**
Applies to: `evidenceLevel: "multi-source"`, `scope: "professional"`, `inheritsTo: ["hospitality"]` etc.
Required authority: The relevant Profession HQ (e.g. Hospitality HQ for hospitality concepts)
Cannot be reviewed by: the creating DC, the venue manager, individual team members

**Class 3 — Venue authority**
Applies to: `evidenceLevel: "single-source"`, `scope: "professional"`, `inheritsTo: ["<venue-id>"]`
Required authority: Venue manager or nominated venue authority
Cannot be reviewed by: the creating DC alone (recommendation — see below)

**Class 4 — Operational authority**
Applies to: routine operational knowledge with local scope
Required authority: Named operational authority — may be less formal than Class 3

---

## Three Authority Boundaries That Must Not Be Crossed

### Boundary 1 — Creator ≠ Approver

The person who proposed the learning should not be the same person who approves it.

This is the same principle enforced in Milestone 043 (`Creator ≠ Approver ≠ Enforcer`).
It applies equally to governance reviews.

A reviewer who approves their own learning has no independence.

**Recommendation:** `KnowledgeGovernanceEngine` should compare `learning.approvedBy`
(or the learning cycle's originating DC) against `reviewedBy`. If they match,
additional confirmation should be required.

---

### Boundary 2 — Authority Must Be Appropriate to Scope

A venue manager cannot approve profession-wide inheritance.
A DC cannot approve its own creation as `"validated"`.
Profession HQ cannot approve constitutional-level concepts.

The authority of the reviewer must be appropriate to the scope of the change.

**Recommendation:** `reviewedBy` should eventually carry a reference to a governed
reviewer identity — not just a string — with a declared authority scope. This is a
future implementation question. The principle is stated here.

---

### Boundary 3 — Authority Must Be Earned, Not Assumed

Reviewer authority in the current system is declared.

A future system where reviewer authority is verified (via a governance role, a
professional membership, or an institutional responsibility) will be more trustworthy
than one where it is accepted on declaration alone.

The transition from declared to verified authority does not need to happen immediately.
But it must be the direction of travel.

The principle is: reviewer authority is earned by holding the right relationship
to the knowledge being reviewed — not by being the person who happens to fill in the form.

---

## Can One Person Approve Their Own Learning?

**No — as a general principle.**

There may be narrow exceptions (e.g. correcting a factual error in a concept the reviewer
originally created, where no other authority is available). But these are exceptions
that require explicit governance recognition, not the normal path.

The reason: a person approving their own learning has an interest in its approval.
Independence requires the possibility of refusal.

---

## What This Means for Implementation

When a governance reviewer workflow is built:

1. `reviewedBy` should eventually reference a governed reviewer identity, not just a string
2. The workflow should check that the reviewer's authority scope matches the change class
3. The workflow should flag when `reviewedBy` matches the learning's originating source
4. Different confirmation requirements apply for each authority class
5. Constitutional class changes require a multi-person confirmation — no single reviewer

**None of this requires changing `evaluateGuard()` now.** Invariant 2 remains correct
as a minimum gate. This principle defines what the gate should eventually become.

---

## The Professional Consistency

A hospitality venue manager has authority over venue-level knowledge.
Hospitality HQ has authority over profession-level knowledge.
Helping Hand HQ has authority over universal knowledge.

A healthcare DC's formation should not be affected by decisions made without healthcare authority.
A construction concept should not inherit universally without Helping Hand HQ review.

Authority is not just a name. It is a relationship between the reviewer
and the people who will be affected by the reviewed decision.

---

## Preserved Insight

> The question is not: "Did someone review this?"
>
> The question is: "Did the right person — with the right authority,
> for the right reason — decide that this knowledge deserves to travel further?"

A text field filled with a name is not authority.

Authority is the acceptance of responsibility for a decision
on behalf of the people who will live with its consequences.

That is what governance means.
