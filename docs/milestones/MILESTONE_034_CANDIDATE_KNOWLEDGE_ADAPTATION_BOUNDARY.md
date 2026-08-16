# Milestone 034 Candidate — Knowledge Adaptation Boundary

**Date:** 2026-08-06  
**Status:** Candidate — Analysis  
**Depends on:** Milestone 033 — Pollination Inheritance Boundary Analysis  
**Constraint:** No code. No types. No implementation. Analysis only.

---

## The Question

> When a seed of governed understanding reaches another branch, how does it adapt without losing its original meaning?

---

## The Corrected Model

```
                    HUMAN FOREST 🌍
              (Helping Hand grows within it)
                          │
                          │ experience, feedback,
                          │ outcomes, environment
                          ▼

                  HELPING HAND OAK 🌳

          Roots        Constitution, Principles, Trust
          Trunk        COS, Governance, KnowledgeGraph
          Branches     Hospitality, Healthcare, Construction...
          Leaves       Annie, Harry, Kev, Andy...
          Fruit        Better human outcomes
          Seeds        Governed understanding via pollination

Helping Hand is not building an ecosystem for humans.
Helping Hand is becoming a healthy part of the human ecosystem.
```

A leaf converts an encounter with the human world into something the whole organism can learn from. The seeds that travel carry what was learned — not the leaf itself, not fragments of data, but governed understanding.

---

## Seven Principles of Adaptation

### 1. Seeds carry potential, not authority.

A seed leaving one branch of the Oak does not carry the authority of its origin. It carries the understanding that was earned.

The food safety principle learned at one hospitality venue does not carry the authority of "Hospitality HQ said this." It carries the understanding: "across multiple contexts, this practice improved safety outcomes."

Authority is claimed at the destination. The destination's professional experts evaluate the seed and decide whether — and how — to adopt it.

**What this means:** pollination cannot transfer governance approval. It can transfer understanding. The destination must re-evaluate for its own context.

---

### 2. Arrival does not equal adoption.

A seed arriving at Professional HQ is an offer, not an instruction.

```
Seed arrives
        ↓
Destination authority reviews
        ↓
Evaluates: relevance, evidence maturity, conflict with existing knowledge
        ↓
Accept / Adjust / Reject / Merge / Escalate
```

Adoption requires the destination's active decision. The pollination mechanism presents; the destination decides. No automated adoption.

**What this means:** the system must surface the seed to the appropriate destination authority and await a decision. It must not assume acceptance.

---

### 3. Destination authority owns adaptation.

When a seed is adopted, the destination authority decides how it takes root in their domain.

The originating DC has no role in this decision. The originating branch of the Oak has no authority over other branches.

```
Originating branch (Hospitality):
  "Shorter clarifying questions improve accuracy."

Destination review (Healthcare):
  "Does this apply to clinical consultations?"
  Human expert: "Yes — within this boundary."
  Adaptation: "One clarifying question before diagnosis improves accuracy."
```

The destination expert adapted the meaning for their context. The originating DC did not decide this. The destination authority owned it.

**What this means:** the adaptation step belongs architecturally to the receiving HQ, not to the pollination mechanism or the originating DC.

---

### 4. Meaning is preserved; expression changes.

The travelling seed preserves the underlying understanding. The professional expression adapts to the destination domain.

```
The seed:   "Listen before responding."

Expression at Hospitality:  "Listen before taking the order."
Expression at Healthcare:   "Listen before forming a diagnosis."
Expression at Construction: "Listen before changing the plan."
```

The principle is the same. The professional vocabulary, risk threshold, and application context differ. Adaptation is not corruption — it is translation into professional meaning.

**What must not change:**
- The core principle that the seed represents
- The confidence and evidence claims attached to it
- The provenance chain linking it to the experience that produced it

**What may change:**
- The professional vocabulary used to express it
- The specific application context described
- The domain-specific thresholds associated with it

---

### 5. Provenance is never altered.

The provenance chain attached to a seed is immutable. It records:
- Where the understanding originated
- What experience produced it
- What reflection identified
- What governance approved the travel
- What evidence supported it

When a destination adapts a seed, the adaptation creates a new provenance record. It does not overwrite the original.

```
Original provenance:
  execution:exec-001 → reflection:refl-001 → learning:learn-001
  → governance:gov-001 → pollination → Hospitality HQ received

Adaptation provenance (new record):
  originSeed: pollination-seed-001
  adaptedBy: Healthcare HQ
  adaptedAt: 2026-08-06
  adaptationNote: "Applied to clinical consultation context"
  → Healthcare KnowledgeGraph
```

The original understanding can always be traced. The adaptation can always be traced. Neither overwrites the other.

**Why this matters:** if an adaptation later proves incorrect, the chain allows the error to be isolated. Was the original understanding wrong? Or was the adaptation wrong? Provenance answers this.

---

### 6. Cross-profession translation requires professional expertise.

The most dangerous assumption in pollination: "if it works here, it works everywhere."

A seed crossing professional branches requires a domain expert at the destination to confirm the translation is valid. This is one of the five permanently human decisions identified in Milestone 033.

**Why this cannot be automated:**

Safety thresholds differ by profession. A hospitality practice with low safety risk may have significant safety risk in a healthcare or construction context. No algorithm can evaluate this without professional knowledge of the destination domain.

**The required process:**

```
Seed arrives at destination branch
        ↓
Destination identifies: is this cross-profession or within-profession?
        ↓
If cross-profession:
  Professional expert at destination evaluates meaning in their domain
  Human confirms: "This meaning survives translation" / "It does not"
        ↓
If within-profession:
  Standard destination review applies
```

**What professional expertise confirms:**
- Whether the principle applies in the destination domain
- What the correct professional vocabulary is
- What safety boundaries govern the application
- Whether existing knowledge already covers this, or whether this is genuinely new

---

### 7. Pollination transfers understanding, not knowledge fragments.

This is the most fundamental principle.

Pollination does not transfer:
- Sentences from documents
- Data points from executions
- Fragments of reflection records
- Quotes from governance decisions

Pollination transfers understanding: the interpreted meaning of an experience, expressed as a principle that can contribute to future growth.

The difference:

```
Knowledge fragment (not this):
  "Temperature reading was 8°C at 14:32 on 2026-07-15."

Understanding (this):
  "Maintaining cold storage below 5°C consistently reduces food safety incidents.
   Confidence: 0.92 across 14 independent observations."
```

The first is a fact about one event. The second is governed understanding that can inform future judgement across contexts.

**What this means for the pollination type:** `PollinationCandidate.description` must express a principle, not a raw fact. The governance gate should verify this. A candidate whose description is a data point rather than a principle should not pass `contextValidated: true`.

---

## The Adaptation Lifecycle

```
Seed produced at origin
  (governed understanding, with provenance)
        ↓
Pollination gate evaluation
  (eight conditions + human sign-offs)
        ↓
Seed departs toward destination
        ↓
Seed arrives at destination authority
        ↓
Destination evaluates:
  - Is this relevant?
  - Does it conflict with existing knowledge?
  - If cross-profession: does the meaning survive translation?
  - What is the correct expression in this domain?
        ↓
Decision:
  Accept    → adapt expression → new growth at destination
  Adjust    → refine both → negotiated growth
  Reject    → seed remains archived (not deleted)
  Merge     → integrates with existing knowledge
  Escalate  → conflict or complexity requires higher authority
        ↓
If accepted:
  New provenance record created at destination
  Original provenance preserved unchanged
  Adapted concept enters destination KnowledgeGraph
  Destination DCs inherit improved understanding
```

---

## What Adaptation Produces

A successfully adapted seed produces a new concept at the destination with:

```
Concept at destination {
  id:             new — created at destination
  definition:     adapted expression in destination vocabulary
  evidenceLevel:  inherited from seed (multi-source minimum)
  scope:          destination domain
  owner:          destination authority
  inheritsTo:     destination profession / profession branch
  sources:        includes reference to original seed + adaptation record
}
```

The adapted concept is distinct from the original. It is the destination's own governed understanding, informed by the seed that arrived. It is not a copy of the origin concept.

---

## What This Milestone Does Not Include

- Implementation of the adaptation mechanism
- Changes to `PollinationCandidate` type
- Connection of `distributeKnowledge()` to receiving HQs
- KnowledgeGraph changes at receiving branches

These belong to Milestone 035 (pollination distribution implementation).

---

## Summary: Seven Principles

| Principle | Statement |
|---|---|
| 1 | Seeds carry potential, not authority |
| 2 | Arrival does not equal adoption |
| 3 | Destination authority owns adaptation |
| 4 | Meaning is preserved; expression changes |
| 5 | Provenance is never altered |
| 6 | Cross-profession translation requires professional expertise |
| 7 | Pollination transfers understanding, not knowledge fragments |

---

## The Next Step

**Milestone 035 — Pollination Distribution Implementation**

> Connect the governed seed to the destination. Build the mechanism through which the Oak contributes to the forest.

Governance protects the roots.  
Mutation grows the tree.  
Pollination shares the seeds.  
Adaptation allows the forest to flourish.

**Status:** Seven adaptation principles defined | Lifecycle complete | Provenance protection recorded | Cross-profession translation boundary established | Destination authority ownership confirmed | Milestone 035 scope established
