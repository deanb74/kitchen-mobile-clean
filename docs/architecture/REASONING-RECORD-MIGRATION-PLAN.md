# Reasoning Record Migration Plan

> This is an architectural migration plan only.
> No implementation change is required for this task.

## Objective

Move the runtime from multiple overlapping reasoning objects toward one canonical reasoning record while preserving the current behavioural contracts.

## Phase 1 — Define the canonical structure

- adopt the canonical record sections defined in this architecture set
- establish the lifecycle states and transition rules
- define the governance envelope as a distinct structure inside the same record

## Phase 2 — Introduce compatibility views

- keep existing runtime objects as views over the canonical record
- preserve their current outward behaviour while redirecting their content to the canonical record
- prevent duplicate recommendation bodies from being stored in multiple places

## Phase 3 — Map current objects

- map InvestigationResult, InvestigationCompletion, DeliberationRecord, JudgementUnderstanding, ReflectionRecord, MemoryRecord, Compass advisory, Authority decision and Moral Compass outcome into the canonical record
- classify each field as retain, reference, merge, derive, remove or unresolved

## Phase 4 — Preserve behaviour

- keep investigation completion gating intact
- keep unknowns explicit
- keep alternative comparison intact
- preserve confidence, explanation and reflection expectations
- preserve memory discipline and human authority boundaries

## Phase 5 — Freeze and audit

- review the migrated structure for duplication
- ensure that explanation remains an explanation layer, not a second recommendation engine
- ensure that reflection remains a learning assessment, not a parallel memory store

## Migration Principle

The canonical record should become the authoritative source of reasoning history, while existing objects become compatibility views or derived presentations.
