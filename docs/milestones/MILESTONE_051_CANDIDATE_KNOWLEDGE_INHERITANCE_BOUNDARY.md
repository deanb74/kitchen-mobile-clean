# MILESTONE_051_CANDIDATE — Knowledge Inheritance Boundary

**Date:** 2026-08-06
**Status:** Candidate — Boundary Analysis
**Depends on:**
- PD-012 — Knowledge Inheritance Boundary ✓
- PD-011 — Learning Requires Causation ✓
- Milestone 050 — Causation context proven ✓
- Milestone 043 — Governance chain proven ✓

**The Question:**
> How does Helping Hand decide when learning from one Digital Colleague, venue,
> or person becomes knowledge that another Digital Colleague may inherit?

---

## What Is Already Protected

`evaluateGuard()` Invariant 6 blocks the clearest violation:

```
single-source evidence + inheritsTo: ["all" | "hospitality" | ...] → rejected
```

This is the negative gate. It prevents the worst case — single-source learning
inheriting to an entire profession.

**What it does not do:**
- It does not enforce positive conditions for inheritance
- It does not derive an appropriate scope from the evidence quality
- It does not require a specific reviewer for inheritance decisions
- It does not connect `LearningProposal.causationCategory` to inheritance scope

---

## Where Inheritance Scope Is Currently Decided

The caller of `applyApprovedChange()` constructs the `proposedConcept` with whatever
`inheritsTo` and `scope` values they choose. Nothing in the governed chain between
`LearningEngine` and `applyApprovedChange()` produces or validates a proposed
inheritance scope.

**The gap:** The `LearningProposal` carries no inheritance hypothesis. The governance
reviewer receives a proposal text but no structured guidance on how broadly the concept
should be shared. The `ApprovedKnowledgeChange` that results contains `inheritsTo` set
by the caller — who may not have a principled basis for the choice.

---

## The Inheritance Ladder and Its Evidence Requirements

| Scope | `inheritsTo` values | Evidence required | Who reviews |
|---|---|---|---|
| Session | (none — not persisted) | None — ephemeral | Not applicable |
| Venue | Custom venue ID or local string | Confirmed operational observation | DC + venue manager |
| Profession | `"hospitality"` / `"healthcare"` / `"construction"` | Multi-source validation across venues | Profession HQ |
| Universal | `"all"` / `"helping-hand"` | Constitutional review | Helping Hand HQ |

**Currently enforced:** Venue → Profession requires at minimum multi-source evidence
(Invariant 6 blocks single-source from profession-level inheritance).

**Not currently enforced:** The caller decides whether to claim multi-source.
`evaluateGuard()` checks `evidenceLevel === "multi-source"` but does not verify
how many independent sources contributed.

---

## The Missing Component: `proposedInheritanceScope`

`LearningProposal` currently has no inheritance guidance. Adding one field creates
the structured handoff to the governance reviewer:

```typescript
// lib/learning/Learning.ts
type ProposedInheritanceScope =
  | "session"      // ephemeral — do not persist
  | "venue"        // this venue only
  | "profession"   // this profession — requires multi-source evidence
  | "universal";   // all DCs — requires constitutional review

interface LearningProposal {
  // ... existing fields ...
  causationCategory?: ProposalCausationCategory;     // Milestone 050
  proposedInheritanceScope?: ProposedInheritanceScope; // Milestone 051
}
```

This is a proposal, not a decision. The governance reviewer decides actual inheritance
in `ApprovedKnowledgeChange.targetKnowledgeId` and the `proposedConcept.inheritsTo`.

---

## The Derivation Function

A pure function derives the appropriate minimum scope from what the system knows:

```typescript
// lib/knowledge-governance/inheritanceScopeFromLearning.ts
function deriveProposedInheritanceScope(
  causationCategory: ProposalCausationCategory | undefined,
  evidenceLevel: EvidenceLevel,
  isHighConfidenceFailure: boolean,
): ProposedInheritanceScope
```

**Derivation rules:**

| Causation | Evidence | Scope |
|---|---|---|
| `"situational"` | any | `"session"` — exceptional case, do not inherit |
| `"unknown"` | any | `"session"` — insufficient basis |
| `"formation-gap"` | any | `"venue"` — formation quality is context-specific |
| `"knowledge-gap"` | `"single-source"` | `"venue"` — not yet validated broadly |
| `"knowledge-gap"` | `"multi-source"` | `"profession"` — validated across sources |
| `"knowledge-gap"` | `"constitutional"` | `"universal"` — highest authority |
| `isHighConfidenceFailure` | any | `"session"` — circumstances may have changed |

The function is deterministic, pure, and testable. It does not replace governance.
It informs the reviewer.

---

## The Relationship to `evaluateGuard()` Invariant 6

Invariant 6 currently blocks:
```
evidenceLevel: "single-source" + inheritsTo: CROSS_VENUE_INHERITANCE → reject
```

After Milestone 051, the derivation function ensures:
```
causationCategory: "situational" → proposedInheritanceScope: "session"
```

Even with `evidenceLevel: "multi-source"`, a situational failure should not inherit
to the profession — the derivation function enforces this as a proposal constraint.

Invariant 6 remains as the structural safety net.
The derivation function is the positive guidance for reviewers.

Both serve complementary roles.

---

## What This Milestone Does Not Do

This milestone does **not**:
- Change `evaluateGuard()` or its invariants
- Prevent the caller from choosing any `inheritsTo` on the proposed concept
- Automate inheritance decisions
- Reduce governance reviewer authority

It **does**:
- Add `proposedInheritanceScope` to `LearningProposal` — a structured proposal
- Add `deriveProposedInheritanceScope()` — a governed derivation function
- Ensure the governance reviewer has a principled starting point
- Make `LearningProposal.causationCategory` (Milestone 050) inform the inheritance hypothesis

---

## Frozen Boundaries

**Boundary 1 — A lesson remains local until the evidence warrants broader reach.**

The default inheritance scope for a new learning proposal is `"venue"`.
Broader scopes require evidence quality that justifies them.

**Boundary 2 — Situational and unknown causation never inherit beyond the session.**

A high-confidence failure (`causationCategory: "situational"`) is a signal that
circumstances were exceptional. Inheriting it profession-wide would spread a response
to an exceptional situation as if it were a general rule.

**Boundary 3 — Formation-gap causation inherits at most to venue scope.**

A formation-gap learning tells us "the DC's observation coverage was insufficient."
This is a signal about the specific venue's context, not a signal about what the
profession needs to know. It inherits to the venue; the profession HQ decides
whether to promote it further after independent validation.

**Boundary 4 — The governance reviewer decides actual scope; the proposal is a hypothesis.**

Per PD-012, the DC proposes. The governance reviewer decides.
`proposedInheritanceScope` does not constrain `Concept.inheritsTo` directly —
it informs the reviewer who applies their professional judgement.

---

## Proof Conditions

| Condition | What it proves |
|---|---|
| PC1 — `deriveProposedInheritanceScope("situational", any, false)` → `"session"` | Situational learning does not propagate |
| PC2 — `deriveProposedInheritanceScope("unknown", any, false)` → `"session"` | Unknown causation is cautious |
| PC3 — `deriveProposedInheritanceScope("formation-gap", any, false)` → `"venue"` | Formation gaps stay local |
| PC4 — `deriveProposedInheritanceScope("knowledge-gap", "single-source", false)` → `"venue"` | Single-source stays venue |
| PC5 — `deriveProposedInheritanceScope("knowledge-gap", "multi-source", false)` → `"profession"` | Multi-source earns profession |
| PC6 — `deriveProposedInheritanceScope("knowledge-gap", any, true)` → `"session"` | High-confidence failure is cautious |
| PC7 — `LearningProposal.proposedInheritanceScope` is populated by `LearningEngine` | Proposal carries the hypothesis |
| PC8 — `evaluateGuard()` Invariant 6 still blocks single-source + profession | Existing safety net unchanged |
| PC9 — All existing tests pass | No regressions |

---

## The Sequence

```
Milestone 043 — Knowledge enters safely
Milestone 044 — Knowledge improves future understanding
Milestone 045 — The DC can listen
Milestone 046 — The DC remembers people respectfully
Milestone 047 — The DC carries why it knows something
Milestone 048 — Understanding is self-aware
Milestone 049 — Authority is grounded in judgement
Milestone 050 — Learning carries why it changed
Milestone 051 — Learning proposes where it should travel
```

After Milestone 051, the full chain answers:

> "What did the DC learn, why did it happen, and how broadly should that learning apply?"

The roots are protected.

The rings are preserved.

Now the branches decide where to grow.
