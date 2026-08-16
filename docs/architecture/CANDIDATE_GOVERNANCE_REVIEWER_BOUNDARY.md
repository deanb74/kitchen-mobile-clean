# CANDIDATE — Governance Reviewer Boundary

**Date:** 2026-08-06
**Status:** Candidate — Governance Analysis
**Depends on:** PD-011 — Learning Requires Causation; PD-012 — Knowledge Inheritance Boundary

---

## The Question Being Governed

> Who is a governance reviewer, and how do they receive and act on proposals?

`KnowledgeGovernanceEngine.build()` accepts `reviewedBy: string` and `reviewedAt: string`.
These are the only structural identifiers of a human reviewer in the current system.

The reviewer's experience — what they see, what they are asked to decide, what context
they receive — is entirely outside the system. It exists only in the calling code
that constructs `BuildKnowledgeGovernanceInput`.

---

## Why This Matters

`LearningProposal.causationCategory` and `proposedInheritanceScope` were added in
Milestones 050 and 051 to carry the DC's structured assessment of why learning occurred
and how broadly it should travel.

Neither field currently reaches the governance reviewer. The reviewer approves based on:
- `rationale: string` — free text
- `changeIntent` — the type of change
- `proposedContent` — the proposal text

They do not see:
- `causationCategory` — was this a knowledge gap, formation gap, situational, or unknown?
- `proposedInheritanceScope` — did the DC assess this as venue-only or profession-wide?
- `informedByPersonContext` — was this informed by relationship memory requiring de-identification?
- `conflictsWithConceptId` — does the DC believe this conflicts with an existing concept?

This is the governance reviewer workflow gap: the system carries structured evidence
that the reviewer never receives.

---

## Existing Architecture Affected

| Field | Lives on | Reaches reviewer? |
|---|---|---|
| `causationCategory` | `LearningProposal` | ✗ |
| `proposedInheritanceScope` | `LearningProposal` | ✗ |
| `informedByPersonContext` | `LearningProposal` | ✗ — triggers `requiresHuman` but not surfaced |
| `conflictsWithConceptId` | `ConceptProvenanceInput` | ✗ — caller sets directly |
| `reinforcementCount` | `ConceptTrustSummary` (read-only query) | ✗ |
| `challengedBy` | `Concept` | ✗ |
| `requiresReview` | `ConceptTrustSummary` | ✗ |

---

## The Three Reviewer Questions That Must Be Answerable

Before any governance review interaction is built, these three questions must be answerable
from the data the reviewer receives:

**1. Why did the DC propose this?**
Requires: `causationCategory` surfaced to the reviewer.
Without it: the reviewer sees proposal text but not the DC's assessment of its cause.

**2. How broadly should this travel?**
Requires: `proposedInheritanceScope` surfaced to the reviewer.
Without it: the reviewer decides `inheritsTo` without the DC's evidence-based hypothesis.

**3. Is there anything the reviewer should know before deciding?**
Requires: `informedByPersonContext`, `conflictsWithConceptId`, `requiresReview`,
and `challengedBy` surfaced when present.
Without these: the reviewer cannot know whether de-identification is required, whether
a conflict exists, or whether the target concept is already under challenge.

---

## Who Is a Governance Reviewer?

The current architecture has no formal definition of a governance reviewer role.
`reviewedBy: string` accepts any string. There is no validator, no authority level check,
no confirmation that the named reviewer has the appropriate authority for the change intent.

**The governance questions that must be answered:**

**Q1 — Is any named person a valid reviewer?**
Or must reviewers belong to a defined authority (Profession HQ, Helping Hand HQ, venue manager)?

Current assessment: The `evaluateGuard()` Invariant 2 checks that professional-scope changes
require a named reviewer, but does not verify that the reviewer has appropriate authority.
The name is a declaration, not a verification.

**Q2 — Can the original DC creator be the reviewer?**
The `createdBy` ≠ `approvedBy` ≠ `reviewedBy` chain is partially documented in principles.
It is not enforced in code (except for the `"reinforce"` independent source recommendation above).

**Q3 — What does "reviewing" mean?**
Currently: providing `reviewedBy`, `reviewedAt`, and `rationale`.
This is a record of a decision, not an interactive review process.
A future reviewer workflow may involve a conversation, a UI, or a governance record
review session — none of which is currently designed.

---

## Decisions That Must Not Become Developer Assumptions

| Decision | Belongs to |
|---|---|
| Who qualifies as a governance reviewer | Governance — before reviewer workflow implementation |
| Whether reviewer authority is verified | Governance — recommendation: minimum named authority per scope |
| What structured information a reviewer receives | Governance — before any reviewer-facing UI or conversation |
| Whether the original creator can be the reviewer | Governance — recommendation: no, for most change intents |
| What constitutes a complete review | Governance — before any review completion flow |

---

## What Should Remain Human Judgement

**The review decision itself.** The system surfaces evidence. The reviewer decides.

Even with full structured information (causation category, proposed scope, conflict flags,
trust summary), the reviewer exercises judgement:
- Is this causation category assessment correct?
- Is the proposed scope appropriate given the evidence?
- Does the conflict warrant supersession or coexistence?
- Should this be approved, deferred, or rejected?

These are not automatable. Surfacing the evidence does not reduce the need for human judgement.
It enables better human judgement.

---

## Future Implementation Boundaries

When a governance reviewer workflow is built:

1. The workflow must surface `causationCategory`, `proposedInheritanceScope`, and `informedByPersonContext` when present
2. The workflow must surface `conflictsWithConceptId` and `challengedBy` when present
3. The workflow must check `getTrustSummary()` for the target concept (for `"update"`, `"reinforce"`, `"supersede"`, `"retire"` intents)
4. The workflow must present the reviewer with explicit confirmation prompts for:
   - De-identification when `informedByPersonContext` is `true`
   - Conflict resolution when `conflictsWithConceptId` is present
   - Promotion criteria when intent is to produce a `"validated"` concept
5. `reviewedBy` should eventually carry a reference to a governed reviewer identity — not just a string

**Must not be built until governance defines:**
- The reviewer authority model (who can review what)
- The minimum information a reviewer must confirm before approval
- The structured confirmation items for de-identification, conflict, and promotion
