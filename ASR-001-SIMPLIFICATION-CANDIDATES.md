# ASR-001 — Simplification Candidates

> Here is the architecture review.
> Implementation changes are prohibited.

## Principle

This document lists simplification candidates only where behaviour would remain equivalent. No new capability is recommended.

## Candidate 1 — Merge investigation and deliberation into one structured reasoning phase

### Why it is a candidate

The runtime currently performs investigation, then produces a deliberation record that largely re-expresses the same evidence outcome.

### What would remain equivalent

- a recommendation would still be produced;
- unresolved questions would still be preserved;
- evidence and trade-offs would still be represented;
- the user-facing explanation would still be possible.

### Why it is worth considering

It would reduce the number of places that independently carry the same reasoning state.

### Classification

Genuine duplication

## Candidate 2 — Treat judgement-understanding as a presentation layer over the recommendation object

### Why it is a candidate

The current runtime creates a separate judgement-understanding object from the deliberation record.

### What would remain equivalent

- the explanation would still answer why the recommendation was made;
- alternatives and uncertainty would still be discussed;
- the answer would still be human-facing and natural.

### Why it is worth considering

It would make the architecture easier to understand because the explanation becomes a view over one reasoning state rather than a second reasoning artifact.

### Classification

Genuine duplication

## Candidate 3 — Keep reflection, but make it an explicit transition to memory rather than a parallel store

### Why it is a candidate

The runtime creates a reflection record and then also writes a memory record.

### What would remain equivalent

- the system would still reflect after a completed judgement path;
- it would still preserve learning;
- it would still retain unresolved uncertainty;
- it would still allow later memory reuse.

### Why it is worth considering

It would clarify that reflection is a decision about what deserves memory, not a separate memory system.

### Classification

Similar but justified

## Candidate 4 — Reduce the number of governance overlays that are expressed as separate runtime branches

### Why it is a candidate

Compass, authority, and moral compass all participate in the same final decision posture.

### What would remain equivalent

- the runtime would still evaluate direction, authority, and moral acceptability;
- it would still protect the user from unsafe or unjustified action.

### Why it is worth considering

It would reduce friction in the architecture by presenting these guardrails as one governance layer rather than three branches that all converge on the same decision.

### Classification

Similar but justified

## Candidate 5 — Rename judgement-understanding to a less misleading term

### Why it is a candidate

The current name implies a distinct new cognitive stage.

### What would remain equivalent

- the capability would still explain the recommendation to the user.

### Why it is worth considering

It would reduce conceptual confusion and make the stage easier to understand as an explanation layer.

### Classification

Genuine duplication
