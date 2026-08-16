# Governance Decision Queue — 2026-08-06

**Purpose:** A single place recording every open governance question that blocks future milestones.
Questions here must be answered by governance before implementation begins.

**Maintained by:** Updated whenever a new open question is identified or an existing one is resolved.

---

## Queue

### GDQ-001 — Independent Reinforcement Boundary

| Field | Value |
|---|---|
| **Status** | 🟡 Principled — awaiting governance configuration |
| **PD dependency** | PD-013; **PD-016 created** ✓ |
| **Candidate document** | `docs/architecture/CANDIDATE_INDEPENDENT_REINFORCEMENT_BOUNDARY.md` |
| **Blocks** | Candidate → Validated governed promotion path (M055) |
| **Decision owner** | Helping Hand HQ + Profession HQs |

**PD-016 establishes:**
- The original creator does not count as an independent source
- The original governance reviewer does not count as independent
- Reviewer independence is the minimum viable check (venue/DC independence requires future provenance extension)
- Thresholds differ by scope and are governance-configurable, not hardcoded
- Validation is never automatic — evidence opens the door; a human authority decides

**Remaining configuration decisions:**
- Specific threshold values per scope (N reinforcements for venue, profession, universal)
- Whether a single Profession HQ reviewer constitutes sufficient independence for professional scope
- The transition path for concepts already marked `"validated"` without reinforcement history

---

### GDQ-002 — Reinforcement Threshold Per Scope

| Field | Value |
|---|---|
| **Status** | ⏳ Open |
| **PD dependency** | PD-013; PD-016 (to be created); GDQ-001 must be resolved first |
| **Blocks** | Candidate → Validated governed promotion path |
| **Decision owner** | Helping Hand HQ + Profession HQs |

**The question:**
> How many independent reinforcements are required to promote a concept to `"validated"` at each inheritance scope?

**Options identified:**
- Same threshold for all scopes (simpler; may be too lenient for profession-wide inheritance)
- Different thresholds per scope: venue (N=3), profession (N=5), universal (N=10)
- Profession-defined: each Profession HQ sets its own threshold

**Dependency:** GDQ-001 must define what "independent" means before a count makes sense.

---

### GDQ-003 — Governance Reviewer Authority

| Field | Value |
|---|---|
| **Status** | 🟡 Principled — awaiting governance configuration |
| **PD dependency** | PD-010; **PD-017 created** ✓ |
| **Candidate document** | `docs/architecture/CANDIDATE_GOVERNANCE_REVIEWER_BOUNDARY.md` |
| **Blocks** | Governance reviewer workflow (M056); reviewer-facing UI or conversation |
| **Decision owner** | Helping Hand HQ |

**PD-017 establishes:**
- `reviewedBy: string` is a declaration, not verified authority — this must change
- Creator ≠ Approver is a hard boundary (consistent with Milestone 043 principle)
- Authority is class-based: Constitutional / Professional / Venue / Operational
- The appropriate authority for each class is different and must be matched to the change scope
- The direction of travel is from declared authority to verified authority

**Remaining configuration decisions:**
- The specific governance roles or identities that constitute Class 1–4 authority
- Whether authority verification is role-based, institution-based, or cryptographically assured
- The transition path from `reviewedBy: string` to a governed reviewer identity type

---

### GDQ-004 — Relationship Depth Signals

| Field | Value |
|---|---|
| **Status** | ⏳ Open |
| **PD dependency** | PD-015 — Digital Colleague Relationship Development |
| **Blocks** | Any feature that varies DC behaviour based on relationship history |
| **Decision owner** | Helping Hand HQ + DC design team |

**The question:**
> What observable signals indicate that a DC relationship has deepened?

**Current architectural state:**
`PersonContextStore` holds consented context with `consentedAt`. Entry count is not a relationship signal (PD-015). No positive measurement of relationship depth exists.

**Decisions required:**
1. What does "relationship depth" mean in observable terms?
2. What does the DC do differently with a trusted person versus a first conversation?
3. What is the minimum evidence before behaviour variation is permitted?
4. How does the person signal that a relationship has ended?

---

### GDQ-005 — Helping Hand Trust Evidence

| Field | Value |
|---|---|
| **Status** | ⏳ Open |
| **PD dependency** | PD-014 — Trust Is Evidenced, Not Scored; PD-015; GDQ-004 |
| **Blocks** | HH trust measurement; outcome history per concept |
| **Decision owner** | Helping Hand HQ |

**The question:**
> How does Helping Hand measure and track the trust people place in it as an organisation?

**Current architectural state:**
PD-014 distinguishes concept trust (in KnowledgeGraph) from HH trust (in the relationship layer). No data model or measurement exists for HH trust. `PersonContextStore` holds person-scoped facts but not relationship trust signals.

**Decisions required:**
1. What signals constitute HH trust evidence? (continued usage, willingness to share, outcomes)
2. Where does this evidence live? (relationship layer — NOT KnowledgeGraph)
3. How is it expressed to the DC without creating a trust score?
4. How does it influence DC behaviour without bypassing authority boundaries?

---

## Resolved Questions

| Question | Status | Resolution | Date |
|---|---|---|---|
| `ContextStore.category === "memory"` — is it used? | ✅ Resolved | Zero callers found. Removed from `ContextCategory`. No migration required. | 2026-08-06 |

---

## Principled Foundations (not fully resolved, but governed)

These questions have PD documents that establish the governing principles.
Implementation still awaits governance configuration decisions, but the boundaries are understood.

| Question | PD | What is established |
|---|---|---|
| What constitutes independent reinforcement? | PD-016 | Creator ≠ independent; reviewer independence as minimum; validation never automatic |
| Who has authority to approve inheritance? | PD-017 | Class-based authority; creator ≠ approver; direction toward verified identity |

---

## Emerging Principle: Evidence Does Not Grant Authority (Candidate PD-018)

**Not yet formalised.** Observed pattern from PD-016 and PD-017.

PD-016 answers: "Is this knowledge sufficiently supported?"
PD-017 answers: "Who can accept responsibility for allowing it forward?"

These are related but not the same question. The emerging principle:

> Evidence may justify consideration.
> Evidence may inform judgement.
> Evidence does not grant permission to act.
> Authority determines who may decide what happens with evidence.

This prevents a common failure mode: "The model is confident, therefore it is authorised."

Helping Hand builds the opposite:
```
Understanding → Judgement → Authority → Action
```
Not:
```
Confidence → Action
```

**Decision:** Observe whether this pattern recurs in future governance questions before formalising as PD-018. It may be the meta-principle underlying all governance work from PD-010 onwards. If so, it deserves careful wording — not a first draft.

---

## Dependency Order

Questions must be resolved in this sequence before implementation begins:

```
GDQ-001 (independent reinforcement definition)
    ↓
GDQ-002 (reinforcement threshold)
    ↓
GDQ-003 (reviewer authority)
    ↓
  M055: Candidate → Validated governed promotion path
  M056: Governance reviewer workflow
    ↓
GDQ-004 (relationship depth signals)
    ↓
GDQ-005 (HH trust evidence)
    ↓
  M057: Relationship memory → Formation
  M058: HH trust layer
```

---

*This queue is the repository's institutional memory for open governance questions. Add to it when new questions emerge. Mark questions resolved when decisions are made. Never delete resolved questions — they are part of the governance record.*
