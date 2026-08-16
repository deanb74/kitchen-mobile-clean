# Milestone 036 Candidate — Pollination Recipient Boundary Analysis

**Date:** 2026-08-06  
**Status:** Candidate — Analysis  
**Depends on:** Milestone 035 — Pollination Distribution Boundary  
**Constraint:** No code. No types. No implementation. Analysis only.

---

## The Question

> When the Oak offers a seed, who exactly receives it, and how does the destination authority become responsible?

---

## The Missing Half of the Handshake

Milestone 035 defined the sending side:

```
Origin leaf
        ↓
Oak governance
        ↓
Seed packet
        ↓
Delivery to destination
```

The receiving side has its own lifecycle that has not yet been defined:

```
Destination authority receives seed
        ↓
Acknowledges receipt
        ↓
Reviews: is this relevant here?
        ↓
Checks: does existing understanding already cover this?
        ↓
Adapts if required (professional expertise)
        ↓
Accepts / rejects / merges / escalates
        ↓
Creates destination provenance (if adopted)
        ↓
Rejected seeds preserved as history
```

A seed without soil is only potential. The receiving contract determines whether potential becomes growth.

---

## The Core Principle

> A destination does not receive knowledge. It receives an opportunity to consider understanding.

This is the receiving equivalent of the sending principle from Milestone 035. The Oak offers; the destination evaluates. The destination is never obligated by receipt. The Oak is never responsible for what grows.

---

## 1. A Destination Receives Opportunity, Not Authority

The seed packet arrives carrying meaning, evidence, provenance, and boundaries. It does not carry:

- A requirement to adopt
- Governance approval for the destination domain
- Authority over how the destination applies the understanding
- The originating DC's claim on how it should be used

Receiving the seed creates one obligation and one obligation only: acknowledge receipt so the Oak can record that the seed was delivered.

Everything after that is the destination's sovereign decision.

---

## 2. Destination Authority Owns Adoption

Adoption cannot be delegated backward to the Oak. The destination authority that decides adoption is the authority that holds responsibility for what the DCs in that domain inherit.

```
Destination         Authority              Responsibility
─────────────────────────────────────────────────────────
Local venue         DC / venue authority   What this venue's DC inherits
Organisation        Organisation authority What org DCs inherit
Profession          Professional HQ        What profession DCs inherit
Human ecosystem     Helping Hand HQ        What all DCs inherit (universal)
```

The sender cannot choose the planting authority. The destination determines who holds that role. The Oak does not appoint destination decision-makers — they are whoever holds legitimate authority in that domain.

---

## 3. Receipt Is Not Acceptance

Receipt means: "We are aware this seed arrived."  
Acceptance means: "We have evaluated it and choose to let it take root here."

These are distinct events, separated in time and potentially in outcome.

The destination may:
- Acknowledge receipt and begin review (usual path)
- Acknowledge receipt and immediately reject (seed is not relevant)
- Acknowledge receipt and escalate (destination lacks authority alone)
- Acknowledge receipt and defer (waiting for additional evidence)

None of these is a failure of the system. All of them are governed outcomes. The architecture must support all four without treating any as exceptional.

---

## 4. Existing Knowledge Conflicts Require Human Resolution

When a seed arrives and the destination checks its existing understanding, one of three things may be true:

**A — No conflict:** The seed addresses something not yet covered. Standard adoption path.

**B — Partial overlap:** The seed partly aligns with existing knowledge but extends or nuances it. Destination authority reviews both and may merge.

**C — Contradiction:** The seed appears to contradict existing knowledge.

Case C is the most critical. The system must surface the contradiction. It must not resolve it automatically.

```
New seed says: "Process X is safer when done slowly."
Existing knowledge says: "Process X should be completed quickly."

The destination authority must ask:
  - Are these referring to the same context?
  - Is one of them outdated?
  - Is there a domain-specific explanation for both being true?
  - Does this require escalation to a higher authority?
```

Neither the seed nor the existing knowledge is automatically correct. A human with expertise in this domain at the destination must evaluate. This is the conflict resolution gap identified in Milestone 033 — confirmed here as a permanent human decision.

---

## 5. Adaptation Belongs to Destination Expertise

The destination is responsible for expressing the seed's meaning in its own professional vocabulary. This is Milestone 034 in the receiving direction.

The destination does not alter the original provenance. It does not change what the seed means. It interprets what the seed means for this domain.

The test of correct adaptation: if the originating leaf read the destination's adapted expression, would they recognise the underlying principle? If yes, the meaning was preserved. If no, the adaptation has drifted.

This is not a mechanical check — it is a professional judgment. Which is why destination expertise owns adaptation, not the pollination mechanism.

---

## 6. Destination Provenance Begins When Adoption Occurs

When a destination adopts a seed, a new provenance record begins. It is linked to but distinct from the origin provenance.

```
Origin provenance (immutable):
  execution → reflection → learning → governance → pollination

Destination provenance (begins on adoption):
  originSeedId: [pollination record id]
  receivedAt:   [when seed arrived]
  adoptedAt:    [when destination decided to adopt]
  adoptedBy:    [destination authority]
  adaptationNote: [how meaning was expressed in destination domain]
  destinationConceptId: [new concept in destination KnowledgeGraph]
```

The two chains are linked — you can trace from the destination concept back to the original experience. But they are separate — the destination's record does not modify the origin's.

This is the same principle as Invariant 4 in the governance constitution: history is immutable. The destination adds to the provenance chain; it does not rewrite it.

---

## 7. Rejected Seeds Remain Preserved as History

A destination that rejects a seed does not destroy it. The rejection is recorded:

```
Rejection record:
  seedId:       [original pollination record]
  rejectedAt:   [when rejection was decided]
  rejectedBy:   [destination authority]
  reason:       [why: not relevant / already covered / evidence insufficient / etc.]
```

The rejection is not a failure. It is a valid governed outcome. It tells the Oak something valuable: this seed was offered here and was not needed here. Future seeds in the same area can be informed by this history.

The Oak records contribution, not ownership. A rejected seed confirms that the destination evaluated the offer. That confirmation is itself useful.

---

## 8. The Oak Records Contribution, Not Ownership

When a seed has been offered to a destination, the Oak records:

```
Contribution record:
  seedId:           [pollination record]
  destination:      [who received it]
  deliveredAt:      [when delivered]
  outcome:          [adopted / rejected / pending / merged / escalated]
  adaptationId?:    [destination provenance record, if adopted]
```

The Oak does not record this as ownership. The adopted concept belongs to the destination. The Oak records that it contributed the seed from which that concept grew.

This is the difference between a tree and a landlord. The tree does not own the birds that carry its seeds, the soil where they land, or the saplings that grow. It contributes; the ecosystem decides.

---

## The Full Handshake

```
SENDING (Oak)                        RECEIVING (Destination)
─────────────────────────────────    ────────────────────────────────────
Governance validates learning
Pollination gate passes
Seed packet assembled
Delivery to destination ──────────→  Receipt acknowledged
                                     Relevance evaluated
                                     Existing knowledge checked
                                     Conflict check (human if needed)
                                     Adaptation performed (expert)
                                     Adoption decision made
                                         ↓ Accept: destination provenance
                                         ↓ Reject: rejection recorded
                                         ↓ Merge: existing knowledge updated
                                         ↓ Escalate: higher authority notified
Oak records contribution ←──────────  Outcome returned to Oak
```

---

## The Foundational Principle

> The seed is the lesson. Not the leaf.

AI systems tend to transfer answers. Databases transfer information. Search engines transfer documents. Helping Hand transfers understanding.

Understanding only becomes valuable when it grows somewhere meaningful. That requires soil — the destination's context, expertise, and authority. The Oak provides the seed. The forest provides the conditions. Neither can do the other's work.

This principle may be one of the most important Helping Hand has established. It captures not just the pollination architecture but the entire reason Helping Hand builds Digital Colleagues rather than databases.

---

## What This Milestone Does Not Include

- Implementation of receipt acknowledgment
- Technical notification mechanism to destination authorities
- Destination KnowledgeGraph write operations at receiving branches
- Conflict resolution implementation

These belong to Milestone 037 (Recipient Implementation).

---

## Summary: Eight Principles of the Recipient Contract

| # | Principle |
|---|---|
| 1 | A destination receives opportunity, not authority |
| 2 | Destination authority owns adoption |
| 3 | Receipt does not equal acceptance |
| 4 | Existing knowledge conflicts require human resolution |
| 5 | Adaptation belongs to destination expertise |
| 6 | Destination provenance begins when adoption occurs |
| 7 | Rejected seeds are preserved as history |
| 8 | The Oak records contribution, not ownership |

---

**Status:** Recipient contract established | Full handshake defined | Eight principles confirmed | "The seed is the lesson. Not the leaf." recorded as foundational | Milestone 037 scope identified
