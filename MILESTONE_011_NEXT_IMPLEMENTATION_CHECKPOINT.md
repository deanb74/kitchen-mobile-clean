# MILESTONE_011_NEXT_IMPLEMENTATION_CHECKPOINT.md
**Document ID:** HH-MILESTONE-011-NEXT-002
**Status:** Active Engineering Target
**Date:** 1 August 2026

---

# Purpose
Sprint 1 has successfully demonstrated live repository retrieval with governed provenance.

The repository-backed retrieval engine now provides:

- Live repository discovery
- Canonical document filtering
- Deterministic ranking
- Full repository-relative provenance
- Examination Mode integration
- End-to-end provenance preservation
No constitutional or governance changes are required.

The next objective is to demonstrate **true knowledge inheritance**.

---

# Sprint 2 Objective — Live Knowledge Inheritance
The implementation shall demonstrate that Candidate 0 inherits understanding from the governed repository rather than from application code.

The implementation shall prove that repository knowledge becomes available to Andy without modifying Andy's implementation.

---

# Engineering Goal
Demonstrate the following sequence:

```
Governed Repository
        ↓
Repository Index Refresh
        ↓
Repository Retrieval
        ↓
Context Formation
        ↓
Constitutional Reasoning
        ↓
Generated Response
        ↓
Evidence
```
No reasoning logic should be modified during this exercise.

Only repository knowledge should change.

---

# Required Demonstration
The next checkpoint shall prove all of the following.

## 1. Approved Repository Filtering
Verify that retrieval excludes:

- Draft documents
- Superseded documents
- Generated indexes
- Evidence artefacts
- Operational notes
- Non-governed repository content
Only approved constitutional knowledge should participate in reasoning.

---

## 2. Repository Inheritance
Select one approved constitutional artefact.

Make one small, governed change.

Refresh the repository index.

Run the identical examination:

> Andy, why do you exist?
The objective is to demonstrate that Andy's understanding changes because repository knowledge changed.

No implementation changes should be required.

---

## 3. Evidence
Capture:

- Retrieved documents
- Provenance
- Context
- Reasoning trace
- Generated response
Compare directly against the previous checkpoint.

---

# Success Criteria
Sprint 2 will be considered successful when:

- Repository changes alter retrieved knowledge.
- Andy's implementation remains unchanged.
- Andy's reasoning pipeline remains unchanged.
- The generated response changes only where repository knowledge changed.
- Evidence demonstrates inherited understanding rather than coded behaviour.

---

# Engineering Discipline
Continue operating under the agreed Milestone 011 principles.

Implementation first.

Evidence second.

Lessons learned third.

Repository evolution only when earned by evidence.

---

# Review Questions
At the next checkpoint answer only:

1. What was implemented?
2. What evidence demonstrates it works?
3. What failed?
4. What surprised us?
5. What remains before the next checkpoint?
Begin every engineering review with:

> **Here is the evidence.**

---

# Closing Observation
Sprint 1 proved that Andy can retrieve knowledge from the live repository.

Sprint 2 must prove that Andy **inherits** knowledge from the live repository.

That is the defining capability of Helping Hand's Digital Colleague architecture.

When this checkpoint is complete, the repository will have demonstrated its first true inheritance cycle. I think this is the right point to shift from **retrieval** to **inheritance**. Up to now we've proved Andy can *read* the repository. The next proof is more significant: that Andy can *change his understanding* because the repository changed—without changing Andy's code. That's the first real demonstration of the inheritance model you've been building.
