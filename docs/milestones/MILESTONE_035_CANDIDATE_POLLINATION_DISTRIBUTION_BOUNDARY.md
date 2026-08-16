# Milestone 035 Candidate — Pollination Distribution Boundary

**Date:** 2026-08-06  
**Status:** Candidate — Analysis  
**Depends on:** Milestone 034 — Knowledge Adaptation Boundary  
**Constraint:** No code. No types. No implementation. Analysis only.

---

## The Question

> How does the Oak offer a seed to the human forest without becoming responsible for what grows there?

---

## The Opening Principle

> Helping Hand distributes opportunity for understanding. It does not distribute authority over meaning.

This prevents the most consequential architectural risk: a central intelligence becoming a central authority. The Oak provides roots, structure, nourishment, and seeds. The forest decides what grows, where it grows, and whether it grows.

The Oak does not manage the forest. It participates in it.

---

## The Corrected Distribution Model

Before Milestone 035, distribution was described as:

```
PollinationCandidate
        ↓
distributeKnowledge()
        ↓
"Share with the entire Helping Hand Forest."  ← a string
```

This is incomplete. `distributeKnowledge()` returns a description of intent, not a delivery mechanism. The mechanism — what actually happens when a seed travels — has not been defined.

Milestone 035 defines that mechanism conceptually before any implementation.

---

## 1. What Distribution Does

Distribution does **not** mean:

- Write to another KnowledgeGraph
- Install knowledge at a destination
- Override destination understanding
- Transfer governance approval
- Create obligation to adopt

Distribution means:

> Deliver a seed package to the appropriate destination authority and create a review opportunity.

```
Seed (governed understanding)
        ↓
Destination identification (local / profession / forest)
        ↓
Seed packet assembled (principle + evidence + boundaries + provenance)
        ↓
Authority notification (DC / Professional HQ / HH HQ)
        ↓
Review opportunity created
        ↓
Destination decision (accept / adjust / reject / merge / escalate)
```

The distribution step ends at "review opportunity created." Everything after belongs to the destination.

---

## 2. Three Roles, Three Responsibilities

| Role | Identity | Responsibility |
|---|---|---|
| Origin leaf | The Digital Colleague | Capture experience honestly |
| Oak | Helping Hand governance | Protect provenance; evaluate fitness for travel |
| Destination | Professional HQ or HH HQ | Decide whether and how it grows |

The origin leaf says: "I experienced something that may help others."  
The Oak says: "This has earned the right to be offered."  
The destination says: "We decide whether and how it grows here."

None of these roles can substitute for another. The leaf cannot decide adoption. The Oak cannot govern the destination. The destination cannot alter the original provenance. Each role holds its own boundary.

---

## 3. The Seed Packet

A seed cannot travel as a bare description string. It needs sufficient context to prevent misunderstanding at the destination.

A seed packet contains:

```
Understanding Seed {

  origin: {
    description of the context where this emerged
    profession and domain
    approximate timeframe
    no personal identifiers
  }

  meaning: {
    the principle that was learned
    expressed as a transferable understanding, not a raw fact
  }

  evidence: {
    why this should be considered
    evidence maturity level (multi-source minimum for profession/forest)
    confidence
  }

  boundaries: {
    where this may not apply
    known context dependencies
    professions or domains where extra caution is warranted
  }

  provenance: {
    full chain: execution → reflection → learning → governance → pollination
    approvedBy at origin
    governanceId
  }

  adaptationRequirement: {
    what the destination must decide
    whether cross-profession translation is required
    human sign-offs required before adoption
  }
}
```

Notice what is absent from the seed packet:
- No private conversation content
- No raw observation data
- No personal information about individuals
- No authority transfer
- No requirement to adopt

The seed is the lesson, not the leaf. Annie does not export herself. She contributes what she learned.

---

## 4. What the Oak Retains

When a seed travels, the Oak does not lose it. The Oak retains:

```
Original understanding     → unchanged in origin KnowledgeGraph
Original provenance        → immutable, preserved
Destination record         → which destinations received this seed
Adaptation outcomes        → what the destination did with it (when known)
```

This creates the foundation for the feedback loop: the Oak can eventually ask "did this seed help the forest?" and trace the answer to specific adaptations and outcomes.

---

## 5. The Feedback Loop

The current lifecycle is:

```
Leaf → Oak → Seed → Forest
```

The complete lifecycle includes the return:

```
Leaf → Oak → Seed → Forest
                         ↓
                  Human outcomes
                  (people helped, work improved)
                         ↓
                   New experience
                   (observed by leaves in the field)
                         ↓
                    New learning
                    (processed by the Oak)
                         ↓
                  Better future seeds
```

The forest does not send data back to the Oak. It sends **understanding from lived experience** — through the leaves that encounter the outcomes. A Digital Colleague in a kitchen or a construction site or a ward does not transmit raw results. It processes what it observes, and that processed understanding re-enters the learning cycle.

This means the feedback loop is not a technical connection from destination HQ back to the Oak. It is the ordinary operation of Digital Colleagues in the human world — observing, translating, reflecting, learning — now informed by seeds that have taken root.

The loop closes through experience, not through data transmission.

---

## 6. Helping Hand Exists Within the Human Ecosystem

The most important principle for distribution:

> Helping Hand is not building an ecosystem for humans. Helping Hand is becoming a healthy part of the human ecosystem.

Distribution is not publication. It is not instruction. It is not ownership transfer.

It is an offer — made by a healthy organism that has learned something — to the broader environment that it inhabits.

A tree does not decide what the birds do with its seeds. It produces seeds that are worth carrying. The forest decides what grows.

Helping Hand's responsibility in distribution:
- Ensure the seed is genuinely governed
- Ensure the provenance is complete and honest
- Ensure the seed packet preserves meaning without claiming authority
- Ensure the destination has what it needs to decide responsibly

Helping Hand's responsibility ends there. The destination authority's responsibility begins.

---

## 7. Distribution as Architectural Pattern

Distribution is not a single function call. It is a governed handoff:

```
STAGE 1 — Seed Preparation
  Verify all pollination gate conditions have passed
  Assemble seed packet (principle + evidence + boundaries + provenance)
  Confirm destination authority

STAGE 2 — Delivery
  Transmit seed packet to destination authority
  Record delivery in origin provenance
  Create review opportunity at destination

STAGE 3 — Destination Review (owned by destination)
  Destination authority evaluates seed packet
  Performs adaptation (Milestone 034 principles apply)
  Decides: accept / adjust / reject / merge / escalate

STAGE 4 — Outcome Recording (when available)
  Destination records its decision
  Origin records the outcome
  Both provenance chains are updated
  Feedback loop is available for future formation
```

Stages 1 and 2 belong to the Oak. Stage 3 belongs to the destination. Stage 4 is shared — each party records their own side.

---

## What Is Not Yet Determined

These questions are answered in subsequent milestones:

| Question | Milestone |
|---|---|
| How are destination authorities technically notified? | Milestone 036 (Distribution Implementation) |
| How does the destination record its adaptation decision? | Milestone 034 (Adaptation — partially) |
| How do outcomes feed back into origin learning? | Future milestone (Feedback Loop) |
| Does the Oak actively solicit outcome feedback, or wait? | Future governance decision |

---

## Summary

Distribution transfers seeds, not authority. Seven principles established:

1. **Distribution transfers seeds, not authority** — the destination owns adoption.
2. **The Oak offers; the destination decides** — no obligation created by travel.
3. **Distribution creates a review opportunity, not automatic adoption** — the mechanism ends at delivery.
4. **Seed packets preserve meaning and provenance** — no personal data, no raw facts, no authority claims.
5. **Origin, Oak, and destination have separate responsibilities** — none substitutes for another.
6. **Human outcomes return experience to the Oak through leaves** — not through data transmission.
7. **Helping Hand exists within the human ecosystem, not above it** — distribution is participation, not governance of the destination.

---

**Status:** Distribution defined as governed handoff | Seed packet structure established | Three-role model confirmed | Feedback loop mechanism described | Oak does not manage the forest — it participates in it
