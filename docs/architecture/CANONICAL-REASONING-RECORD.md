# Canonical Reasoning Record

> Architecture definition only.
> No runtime behaviour change is implied by this document.

## Purpose

This document defines the smallest canonical reasoning record that can preserve one continuous reasoning lifecycle while keeping investigation, deliberation, judgement, explanation, reflection and memory distinct.

## Governing Rule

One reasoning lifecycle. Distinct cognitive stages. One source of truth.

## Canonical Record Structure

The canonical record should contain the following sections.

### 1. Identity and provenance

- record identifier
- parent or related record reference
- creator or runtime origin
- creation time
- source prompt or trigger
- provenance chain for corrections and updates

### 2. Prompt and current context

- user prompt or operational request
- current conversation or runtime context
- relevant constraints and boundaries

### 3. Human need

- the human need being addressed
- the intended outcome or decision to support

### 4. Investigation plan

- proposed sub-questions
- evidence strategy
- completion criteria for the investigation stage

### 5. Questions investigated

- the questions that the investigation actually addressed
- references to the evidence or reasoning artifacts that answer them

### 6. Evidence accepted

- the evidence the runtime treats as established
- short digest or references, not repeated full transcripts

### 7. Evidence rejected

- the evidence or claims that were considered but not accepted
- the reason they were rejected

### 8. Findings

- what the evidence establishes
- what is now understood with sufficient confidence

### 9. Unknowns and contradictions

- unresolved uncertainty
- contradictions between evidence sources or interpretations
- explicit gap statements

### 10. Alternatives

- credible options that remain in play
- each option should be linked to the relevant trade-offs and risks

### 11. Trade-offs

- the consequences of choosing one option over another
- the reasons one path is preferred over another

### 12. Assumptions

- assumptions that materially shape the judgement
- provenance for those assumptions

### 13. Risks

- material risks of the proposed direction
- whether those risks are acceptable or unresolved

### 14. Benefits

- benefits expected from the selected direction
- the value the reasoning is trying to achieve

### 15. Judgement

- the selected direction or decision
- a concise statement of why it was chosen
- the judgement should be a single authoritative decision point, not a second full recommendation object

### 16. Confidence

- current confidence in the judgement
- confidence should be tied to the evidence and unresolved gaps

### 17. Authority and governance outcomes

The governance envelope should remain separate from the judgement itself.

- Compass result
- Authority decision
- Moral Compass outcome

Each governance outcome should keep its own question, outcome, rationale and provenance.

### 18. Explanation views

- listener-shaped views of the existing judgement
- explanation should adapt to audience, but it must not create another recommendation object

### 19. Reflection outcome

- whether understanding changed
- whether a reusable lesson exists
- whether the reasoning should be revised or preserved

### 20. Memory candidate

- only approved significance or confirmed learning
- linked back to the reasoning record rather than stored as a parallel reasoning artifact

### 21. Lifecycle status

- one lifecycle state from the canonical lifecycle
- the current stage and its transition history

## Record Rules

- Do not duplicate complete evidence or recommendation text between sections.
- Prefer references over repeated content where possible.
- A later stage may not silently rewrite an earlier stage.
- Corrections must be recorded with provenance.
- The record should preserve continuity without forcing every stage to invent a new representation.

## Final Assessment

This canonical record can remove duplicated state without collapsing distinct cognitive responsibilities if each stage is treated as a stage of one lifecycle rather than as an independent duplicate object.
