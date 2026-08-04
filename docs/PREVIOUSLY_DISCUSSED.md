# Previously Discussed

**Document ID:** HH-GOV-PD  
**Status:** Candidate  
**Owner:** Helping Hand Institution  
**Category:** Governance Discipline — Pre-Decision Discovery  
**Version:** 1.0

---

> The repository is the organisational memory of Helping Hand.
> It exists to preserve understanding rather than simply retain information.
>
> — `docs/OPERATING_MODEL.md`

---

## Purpose

Helping Hand learns before it repeats.

This register preserves organisational reasoning, reduces architectural drift, avoids unnecessary reinvention, and ensures that every significant discussion contributes to Helping Hand's long-term understanding.

The existing learning machinery captures and propagates lessons after evidence cycles complete.

This register provides the pre-decision query mechanism: before committing to something new, check what Helping Hand already knows.

---

## The Gap This Fills

| Stage | Existing mechanism |
|---|---|
| Before commitment | **None — this register fills this gap** |
| During validation | Understanding Journeys |
| After evidence cycle | Organisational Learning library |
| After review | Institutional Reviews and Decisions |
| When formalising standards | Ratification Process |

These are complementary stages in one learning cycle, not competitors.

---

## Principles

Nothing is invented twice.  
Everything is inherited.

Do something once.  
Benefit everywhere.

Capture before creating.

Improve before duplicating.

Discover before deciding.

Understand before commitment.

Learning should improve Helping Hand before Helping Hand improves others.

Organisational understanding is more valuable than organisational memory.

---

## Required Workflow

Before accepting any significant proposal:

```text
Has this already been discussed?
        │
        ├── Yes
        │     ▼
        │   Review previous reasoning.
        │   Compare with new evidence.
        │   Determine whether understanding should evolve.
        │   Recommend one of:
        │     Reuse · Improve · Merge · Replace · Retire
        │
        └── No
              ▼
            Capture discussion.
            Review.
            Validate.
            Determine destination.
```

---

## Entry Structure

Each entry contains:

| Field | Purpose |
|---|---|
| ID | Permanent reference (PD-###) |
| Date | Date of discussion |
| Topic | Brief title |
| Background | Why this came up |
| Reasoning | The logic explored — not just conclusions |
| What was learned | What changed or was strengthened |
| Repository references | Canonical documents involved |
| Related documents | Cross-links to other records |
| Outstanding questions | What remains unresolved |
| Recommended destination | Where this should ultimately land |
| Status | Current state |

**Status values:** Candidate · Reviewing · Accepted · Rejected · Merged · Implemented · Superseded · Archived

---

## Register

| ID | Title | Date | Status |
|---|---|---|---|
| [PD-001](previously-discussed/PD-001.md) | Organisational Model of Companion Intelligence | 2026-08-03 | Candidate |

---

## Repository Traceability

Constitution:
- `constitution/02-CONSTITUTION.md` Article VI — Learning: "Every experience teaches."
- `constitution/02-CONSTITUTION.md` Article VII — Living Knowledge: "Knowledge grows."

Theory:
- `docs/theory/001-THEORY-OF-MEMORY.md` — organisational memory
- `docs/theory/THEORY-MAP.md` — knowledge chain: Experience → Memory → Knowledge → Understanding

Architecture:
- `docs/OPERATING_MODEL.md` — organisational memory and Decision Model
- `docs/architecture/HELPING_HAND_RATIFICATION_PROCESS.md` (HH-GOV-003) — governs the later stages this register feeds into
- `docs/architecture/LEARNING_ORGANISATION.md` — learning cycle

Engineering:
- `docs/ENGINEERING_PRINCIPLES.md` (EP-000) — "Nothing is invented twice. Everything is inherited."
- `docs/engineering/ENGINEERING_PRINCIPLE_002_TRACEABLE_DECISIONS.md` (EP-002) — traceable decisions

Milestone:
- Not Applicable

Candidate:
- PD-001 (see register above)

Evidence Type:
- Governance candidate — pending institutional review

---

## Constraint

> "New governance documentation shall not be created unless operational execution exposes a genuine deficiency that cannot reasonably be addressed within the existing framework."
>
> — `docs/handovers/VOLUME_VIII_EXIT_CRITERIA.md`

This register is justified because the Operating Model's Decision Model begins at "Observe" without a prior-reasoning check. No existing mechanism asks "Has this already been discussed?" before commitment. The gap is structural, not speculative.

---

## Integration Recommendations

This register should be consulted at:

1. **Ratification Process** (`docs/architecture/HELPING_HAND_RATIFICATION_PROCESS.md`) — add as step 0 (Prior Reasoning Discovery) before Proposal.
2. **Operating Model Decision Model** (`docs/OPERATING_MODEL.md`) — add a pre-Observe prompt: "Has this been discussed? Consult PREVIOUSLY_DISCUSSED."
3. **Andy's governed responsibilities** — see PD-001 Outstanding Questions and the Andy section below.
4. **Engineering Discipline** — engineering proposals should cite any relevant PD entries before proposing new capability.

These are recommendations for consideration. No existing document has been modified.

---

## Andy Recommendation

The PREVIOUSLY_DISCUSSED review pattern maps directly to Andy's existing governed capabilities:

- Observe (does a relevant entry exist?)
- Reflect (what was the previous reasoning?)
- Judge (does new evidence change the recommendation?)
- Recommend (Reuse / Improve / Merge / Replace / Retire)

This is recommended as a candidate for Andy's first operational governance responsibility.

It should not be implemented until:

1. PD-001 is completed and accepted.
2. Andy's formation evidence supports a governance review role.
3. The review is validated through a real governance interaction.

---

*This document is derived from and subordinate to `docs/OPERATING_MODEL.md` and the existing organisational learning framework. When those documents are updated, this document should be reviewed against them.*
