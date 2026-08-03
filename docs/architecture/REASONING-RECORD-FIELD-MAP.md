# Reasoning Record Field Map

> This document maps current runtime objects into the proposed canonical reasoning record.
> The purpose is architectural clarity, not implementation change.

## Classification Key

- Retain: keep as a first-class field in the canonical record.
- Reference: preserve a pointer to an existing artifact rather than duplicate its content.
- Merge: fold the field into a broader canonical section.
- Derive: compute the field from another field rather than store it independently.
- Remove: no longer necessary in the canonical model.
- Unresolved: the current architecture does not yet define a stable home for the field.

## Object Mapping

| Current object | Field or concern | Classification | Notes |
| --- | --- | --- | --- |
| InvestigationResult | investigation plan | Retain | Keep as the initial plan within the record. |
| InvestigationResult | questions investigated | Retain | Preserve the investigation scope clearly. |
| InvestigationResult | evidence accepted | Retain | Keep as accepted evidence in the canonical record. |
| InvestigationResult | evidence rejected | Retain | Keep as a separate evidence section. |
| InvestigationResult | findings | Retain | Preserve the established understanding. |
| InvestigationResult | unknowns and contradictions | Retain | Keep explicit uncertainty visible. |
| InvestigationCompletion | completion status | Retain | This should become a lifecycle transition marker. |
| InvestigationCompletion | gating status | Retain | Preserve as the gate that allows progression. |
| DeliberationRecord | alternatives | Retain | Keep as a canonical alternatives section. |
| DeliberationRecord | trade-offs | Retain | Keep in the canonical trade-offs section. |
| DeliberationRecord | assumptions | Retain | Preserve as a distinct assumptions section. |
| DeliberationRecord | risks | Retain | Move into the canonical risks section. |
| DeliberationRecord | benefits | Retain | Move into the canonical benefits section. |
| DeliberationRecord | recommendation | Merge | Merge into the judgement section rather than preserving as a second recommendation object. |
| JudgementUnderstanding | explanation text | Retain | Preserve as explanation views over the same judgement. |
| JudgementUnderstanding | audience-specific phrasing | Retain | Keep as a view concern rather than a new reasoning object. |
| ReflectionRecord | changed understanding | Retain | Preserve within reflection outcome. |
| ReflectionRecord | reusable lesson | Retain | Preserve as a memory candidate input. |
| ReflectionRecord | uncertainty or revision note | Retain | Keep as part of the reflection outcome. |
| MemoryRecord | approved learning | Retain | Preserve as the memory candidate after approval. |
| MemoryRecord | durable significance | Retain | Keep as part of the memory discipline boundary. |
| MemoryRecord | full recommendation copy | Remove | Do not duplicate the recommendation text in memory. |
| Compass advisory | compass result | Retain | Keep within the governance envelope. |
| Compass advisory | rationale | Retain | Preserve with provenance under the compass subsection. |
| Authority decision | authority outcome | Retain | Keep separate under the authority subsection. |
| Authority decision | permission conditions | Retain | Preserve as part of the authority decision record. |
| Moral Compass outcome | moral acceptability | Retain | Keep separate under the moral compass subsection. |
| Moral Compass outcome | ethical rationale | Retain | Keep with provenance and distinct meaning. |

## Mapping Principle

A current object may still exist as a view, but the canonical record should be the single place where the reasoning lifecycle is preserved. The later objects should reference the canonical record rather than re-create its contents.
