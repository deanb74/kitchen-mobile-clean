# Reasoning Record Risk Assessment

> This document evaluates the architectural risks of introducing a canonical reasoning record.

## Risk 1 — Over-normalisation

If the record becomes too rigid, the runtime may lose the flexibility required for different explanation styles or different human contexts.

Mitigation:
- keep the canonical record compact
- allow explanation views to vary without changing the underlying judgement

## Risk 2 — Loss of provenance

If earlier reasoning is collapsed too aggressively, it may become hard to see how the record evolved.

Mitigation:
- preserve provenance at every update
- keep corrections visible and attributable

## Risk 3 — Governance ambiguity

Compass, Authority and Moral Compass may be collapsed together too early, causing their meanings to blur.

Mitigation:
- keep them as distinct subsections inside one governance envelope
- preserve separate questions, outcomes and provenance

## Risk 4 — Duplicate storage in practice

Even with a canonical record, old objects may continue to store parallel copies of the same content.

Mitigation:
- define compatibility views that reference the canonical record
- treat old objects as derived presentations, not independent sources of truth

## Risk 5 — Reflection becoming a memory store

Reflection could expand into a second storage system unless its boundary is kept clear.

Mitigation:
- define reflection as an assessment of understanding change
- define memory as the preservation of only approved significance or confirmed learning

## Risk 6 — Explanation becoming a second reasoning engine

Explanation may start to create new recommendations rather than simply explain the existing judgement.

Mitigation:
- require explanation views to remain attached to the canonical judgement
- prohibit explanation from generating a second recommendation object

## Overall Assessment

The principal risks are procedural rather than conceptual. The canonical record is workable if the architecture preserves the distinction between one authoritative reasoning lifecycle and several derived views of it.
