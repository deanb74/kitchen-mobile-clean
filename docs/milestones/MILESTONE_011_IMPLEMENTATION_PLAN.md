# MILESTONE_011_IMPLEMENTATION_PLAN

**Document ID:** HH-MILESTONE-011-PLAN-001
**Status:** Active Implementation Plan
**Date:** 31 July 2026

---

# Purpose
The first Repository-Grounded Reasoning checkpoint has demonstrated that the existing reasoning pipeline can execute successfully within its declared scope.

The next implementation objective is to replace the curated constitutional corpus with a live repository inheritance engine.

This is the next correct step because the reasoning pipeline is already proven in principle. What remains is to replace the source of knowledge from an in-runtime curated corpus to the governed Helping Hand repository.

---

# Engineering Direction
The next work should begin exactly at the point indicated by the evidence:

- not with another feature,
- not with UI work,
- not with hospitality or product polish,
- but with the inheritance engine.

Everything else depends on this foundation.

---

# Implementation Sprints

## Sprint 1 — Live Repository Retrieval
**Priority:** Highest

### Objective
Replace the curated constitutional corpus with live repository retrieval.

### Target state
From:

```text
Question
        ↓
Hardcoded documents
```

To:

```text
Question
        ↓
Repository Index
        ↓
Retrieved Documents
```

### Deliverable
Andy can retrieve constitutional documents without changing his code.

### Scope
Implement:

- approved document discovery
- repository indexing
- search
- retrieval
- caching (optional later)

### Success criterion
The reasoning pipeline continues to execute, but the source of retrieved documents becomes the live repository rather than the curated in-runtime corpus.

---

## Sprint 2 — Provenance
### Objective
Make every statement traceable to its repository origin.

### Target state
For each generated statement, the system should eventually be able to show:

```text
Sentence
        ↓
Repository document
        ↓
Section
        ↓
Paragraph
```

### Success criterion
The system can attribute output to specific repository content with observable provenance.

---

## Sprint 3 — Context Engine
### Objective
Expand context formation from a small fixed retrieval set to a richer working understanding.

### Target state
From:

```text
Question
        ↓
4 documents
```

To:

```text
Question
        ↓
20 documents
        ↓
Relevant concepts
        ↓
Working understanding
```

### Success criterion
The context engine produces a richer, more structured understanding before reasoning begins.

---

## Sprint 4 — Constitutional Validation
### Objective
Validate that inherited repository understanding changes the reasoning outcome appropriately.

### Target state
Ask again:

```text
Andy, why do you exist?
```

Then compare the result against the current checkpoint.

### Success criterion
If the answer changes because repository understanding changed, inheritance has been proven.

---

# Engineering Discipline
The next work should focus on:

```text
Repository
      ↓
Index
      ↓
Retrieval
      ↓
Context
      ↓
Reasoning
      ↓
Evidence
```

Not on UI.

Not on features.

Not on hospitality.

On the engine.

---

# Why This Order Is Correct
The operating philosophy remains:

> Learning is generic. Information is specific.

The inheritance engine is the generic capability that later powers multiple domains.

Hospitality, healthcare, construction, and retail all inherit the same underlying mechanism.

---

# First Engineering Task
If only one task is given, it should be:

> Replace the curated constitutional corpus with a live repository index and retrieval service while preserving the existing reasoning pipeline unchanged.

That is the most isolated and highest-value implementation step.

If that works, the biggest technical hurdle in Helping Hand has been crossed.

Everything after that is inheritance.
