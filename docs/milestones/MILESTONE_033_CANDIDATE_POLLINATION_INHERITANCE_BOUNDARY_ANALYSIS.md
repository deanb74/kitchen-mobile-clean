# Milestone 033 Candidate — Pollination Inheritance Boundary Analysis

**Date:** 2026-08-06  
**Status:** Candidate — Analysis  
**Depends on:**
- Milestone 026 — Learning Governance Constitution
- Milestone 027 — KnowledgeGraph Write Architecture
- Milestone 028 — KnowledgeGraph Write Boundary Analysis
- Milestone 031 — Learning Path Consolidation Boundary
- Milestone 032 — Pollination Governance Boundary Analysis

**Constraint:** No code. Governance and architecture only.

---

## The Question

> How does Helping Hand allow valuable learning to travel beyond the Oak without allowing unhealthy seeds to damage the forest?

---

## The Principle

### Pollination does not spread knowledge.

> Pollination allows beneficial understanding to contribute beyond its origin while protecting the ecosystem it enters.

A seed leaving the Oak carries potential. It does not carry authority. Authority is earned again at the destination.

---

## 1. Pollination Is a Separate Decision

Confirmed from Milestone 032:

```
                 Learning
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
Knowledge Governance       Pollination
"Can this exist here?"     "Should this travel?"
          │                     │
          ▼                     ▼
     HH Oak growth        Wider contribution
```

Neither replaces the other.

A learning can:
- remain local
- improve the Oak
- travel outward
- do both
- do neither

---

## 2. The Seed Lifecycle

```
Experience
    ↓
Reflection
    ↓
Learning
    ↓
Governance
    ↓
Seed Candidate
    ↓
Pollination Gate
    ↓
Destination Review
    ↓
Adaptation
    ↓
New Growth
```

The key addition: **the seed does not become a tree at the destination.** It must be planted into the destination's context. Arrival is not adoption. Adoption requires destination authority.

---

## 3. The Eight Pollination Conditions

Existing conditions:

| Condition | Question |
|---|---|
| `confidence ≥ 0.9` | Is there enough confidence? |
| `reusable` | Does this apply beyond the original case? |
| `evidenceProvided` | Is there supporting evidence? |
| `reflectionComplete` | Has the outcome been understood? |
| `privacyChecked` | Is it safe for people? |
| `safetyChecked` | Is it safe to apply? |
| `contextValidated` | Does it fit elsewhere? |
| `current` | Is it still relevant? |

Additional rule:

> Passing the pollination gate permits travel. It does not guarantee adoption.

---

## 4. Evidence Maturity

**Current gap:** Pollination knows "Can this travel?" It does not know "Has this earned enough evidence to become inherited knowledge?"

A future pollination candidate requires an evidence maturity assessment:

```
Observation
     ↓
Single experience
     ↓
Repeated experience
     ↓
Multi-source evidence
     ↓
Inherited knowledge
```

A single acorn cannot become a forest.

From Invariant 6 of the Learning Governance Constitution: single-source evidence cannot become inherited knowledge. The current `PollinationCandidate` type has no `evidenceLevel` field — it cannot enforce this minimum. This is the gap identified in Milestone 032.

---

## 5. Destination Authority

### Local

**Destination:** Digital Colleague  
**Question:** "Does this help this environment?"  
**Authority:** DC

---

### Profession

**Destination:** Professional HQ  
**Question:** "Does this improve the profession?"  
**Authority:** Professional experts

---

### Forest

**Destination:** Helping Hand HQ  
**Question:** "Does this benefit humanity across professions?"  
**Authority:** HH governance

---

The destination determines who earns the right to adopt. The originating DC does not determine adoption at the destination. The seed is offered; the destination decides.

---

## 6. Conflict Resolution

This is the biggest missing governance capability.

A seed arrives. The destination already has knowledge. Possible outcomes:

```
Existing knowledge
        +
New learning
        ↓
Accept    — new learning strengthens existing
Adjust    — existing knowledge is refined
Reject    — new learning contradicts without sufficient evidence
Merge     — both contribute distinct truths
Escalate  — contradiction requires higher authority
```

**The system must not decide automatically.** Conflict is not always contradiction.

Example:

```
Hospitality: "Shorter meetings improve efficiency."
Healthcare:  "Longer conversations improve patient trust."
```

Both may be true. Context determines meaning. Resolution requires a person who understands the destination context — not a confidence threshold.

**Finding:** Conflict resolution is permanently human at the destination. The pollination system surfaces the conflict; the destination authority decides the outcome.

---

## 7. Cross-Profession Travel

**The most dangerous assumption:** "Useful here means useful everywhere."

It does not. A seed crossing branches must undergo translation.

Example of a travelling principle:

```
The principle: "Listen before responding."

Hospitality: "Listen before serving."
Healthcare:  "Listen before diagnosis."
Construction: "Listen before changing the plan."
```

The principle travels. The professional meaning adapts. The adaptation must be performed by someone with professional expertise in the destination domain — not by the originating DC and not by the pollination mechanism.

**Finding:** Cross-profession travel requires a translation step at the destination. This is why Milestone 034 (Knowledge Adaptation Boundary) follows this milestone.

---

## 8. Permanent Human Decisions

Five decisions confirmed as permanently requiring human judgment:

### Privacy
Can this learning respect the people involved? Data about individuals must be abstracted before travel. The abstraction boundary cannot be drawn automatically.

### Safety
Could applying this cause harm? Safety thresholds differ by profession. A safe practice in hospitality may be dangerous in healthcare.

### Context
Does this apply beyond its origin? The originating DC understands their context. They cannot fully assess another context.

### Conflict Resolution
Does it contradict existing knowledge at the destination? Contradictions require judgment about which evidence is stronger and what the domain consequences are.

### Cross-Profession Travel
Can this meaning survive translation? When learning crosses profession boundaries, a domain expert at the destination must confirm the translated meaning is valid.

These are not failures of automation. They are deliberate stewardship points. The architecture is designed to surface these decisions to the right humans at the right time.

---

## 9. The Forest Principle

The Oak does not own the forest. It contributes to it.

> Helping Hand does not seek to make all knowledge Helping Hand knowledge.  
> It seeks to contribute understanding that improves the human world.

This principle protects against the accumulation bias: the tendency of any learning system to expand its knowledge domain indefinitely. Pollination is not collection. It is contribution. The destination retains authority over what it accepts.

---

## What This Milestone Establishes

| Question | Answer |
|---|---|
| What is the seed lifecycle? | Experience → Reflection → Learning → Governance → Candidate → Gate → Destination Review → Adaptation → New Growth |
| Does arrival = adoption? | No. Arrival is an offer. Adoption requires destination authority. |
| Who decides adoption? | Destination authority (DC, Professional HQ, or HH HQ) |
| What is missing from the current pollination type? | Evidence maturity (`evidenceLevel` equivalent), conflict resolution protocol, adaptation mechanism |
| Are the five permanent human decisions confirmed? | Yes — privacy, safety, context, conflict resolution, cross-profession translation |
| What is the forest principle? | The originating DC contributes. The destination decides. |

---

## The Next Question

**Milestone 034 — Knowledge Adaptation Boundary**

> When a seed reaches another branch, how does it adapt without losing its original meaning?

Governance protects the roots.  
Mutation grows the tree.  
Pollination shares the seeds.  
Adaptation allows the forest to flourish.

The architecture is no longer designing a system that knows everything. It is designing a living system that knows how to grow responsibly.

---

**Status:** Lifecycle defined | Destination authority mapped | Conflict resolution confirmed as permanently human | Cross-profession translation gap identified | Evidence maturity gap confirmed | Five permanent human decisions recorded | Milestone 034 scope established
