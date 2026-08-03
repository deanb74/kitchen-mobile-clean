# Reasoning Lifecycle

> This document defines the lifecycle states for the canonical reasoning record.

## Lifecycle States

```text
observed
→ understood
→ investigating
→ investigation-complete
→ deliberating
→ deliberation-complete
→ judged
→ explained
→ reflected
→ memory-reviewed
→ closed
```

## Stage Responsibilities

### Observed

The request or situation has been recognised and entered into the reasoning lifecycle.

### Understood

The human need and the relevant context have been interpreted sufficiently to proceed.

### Investigating

The runtime gathers, classifies and tests the evidence. It determines what the evidence establishes.

### Investigation-complete

The investigation has reached a stable point where findings and unknowns are explicit enough to support deliberation.

### Deliberating

The runtime compares credible options, consequences and trade-offs.

### Deliberation-complete

The deliberation has produced a stable basis for a judgement.

### Judged

A direction has been selected from the completed deliberation.

### Explained

Explanation views are created for the existing judgement. These views do not create another recommendation object.

### Reflected

The runtime assesses whether understanding changed and whether a reusable lesson exists.

### Memory-reviewed

The memory candidate has been considered for durable preservation. Only approved significance or confirmed learning should be retained.

### Closed

The reasoning lifecycle has been completed and the record is stable unless a new correction is recorded.

## Transition Rules

- A later stage may not silently rewrite an earlier stage.
- Corrections must be appended with provenance.
- The lifecycle should preserve continuity rather than replace earlier content.
- The lifecycle status should always reflect the newest accepted transition.
