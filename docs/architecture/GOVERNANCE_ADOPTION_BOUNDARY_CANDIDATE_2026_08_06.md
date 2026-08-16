# GOVERNANCE_ADOPTION_BOUNDARY_CANDIDATE — Principles Into Practice

**Date:** 2026-08-06
**Status:** Candidate — Governance Analysis
**Basis:** ARCHITECTURAL_BOUNDARY_REPORT_2026_08_06.md
**Purpose:** Determine which principles require runtime enforcement, which should remain
governance-only, and what new governance work is needed before implementation proceeds.

---

## The Central Question

Not every principle should become a type constraint.

Some principles are better enforced by human judgement than by compiler errors.

The risk of over-constraining the type system is a codebase that becomes rigid — where
governance and development become adversarial rather than collaborative.

The risk of under-constraining is drift: principles proven in isolation tests that
quietly fail to protect the practice where developers actually build.

The question for each principle is:

> "Is this best protected by making the wrong thing impossible, or by making the right thing obvious?"

---

## 1. Principles That Require Runtime Enforcement

These principles, if violated, would directly harm a person or corrupt the knowledge system
beyond what governance review can catch. They should be structurally enforced.

### 1a. LLM output must enter as Observation (PD-005)

**Current state:** Documentation only. No LLM integration exists.

**Why this requires enforcement:** When an LLM is integrated, the temptation to wire
its output directly into `Understanding.summary` is high and the damage is invisible.
Formation invariants would not catch it. The understanding would appear valid but would
contain invented content with no provenance.

**Mechanism required:** Add `"llm"` to `ObservationSource`. When LLM integration
is built, the function signature should require `Observation[]`, not raw text.
The wrong path (`Understanding.summary = llmResponse`) should be structurally discouraged
by the type system, not just by documentation.

**PD reference:** PD-005 — LLM as Capability
**Implementation gate:** Before first LLM integration point.

---

### 1b. `ContextStore.category === "memory"` must have a person-boundary

**Current state:** `ContextStore.addEntry({ category: "memory", source: "conversation" })`
is fully valid with no consent mechanism.

**Why this requires enforcement:** This is the most immediate path by which personal
disclosures could enter a persistent store without governance. It is not hypothetical —
`OnboardingEngine` can currently route conversation observations to `ContextStore` with
no person-boundary check.

**Mechanism required:** Either:
a) Remove `"memory"` from `ContextCategory` (breaking) — the category has no defined scope
b) Add a runtime check that rejects `category: "memory"` entries without a mechanism
   confirming no personal information is present
c) Formally document that `category: "memory"` is deprecated with a pointer to `PersonContextStore`

Option (c) is the least disruptive and consistent with the "mark deprecated, not deleted" pattern.

**PD reference:** PD-007 — Human Memory Boundary
**Implementation gate:** Before any feature uses `ContextStore.category === "memory"`.

---

### 1c. `candidat → "validated"` promotion requires a governed path

**Current state:** Any caller can set `status: "validated"` in a `proposedConcept`
passed to `applyApprovedChange()`. No threshold enforced.

**Why this requires enforcement:** This is the clearest place where a developer assumption
could replace a governance decision. A professional concept could be `"validated"` with
one approval, no reinforcement, and no independent source — and then inherited by all
hospitality DCs.

**Mechanism required:** A dedicated `promoteConceptToValidated()` path that checks
minimum reinforcement threshold before accepting the promotion. The threshold itself
is a governance configuration question (Step 4 of Milestone 053 — explicitly deferred).

**The enforcement should wait for the governance decision about the threshold.**
But the path should be explicitly gated — `"validated"` should not be freely settable
via the general update path once the governed promotion path exists.

**PD reference:** PD-013 — Knowledge Trust Requires Renewal
**Implementation gate:** After governance configuration defines the threshold.

---

## 2. Principles That Should Remain Governance-Only

These principles involve human judgement that cannot and should not be automated.

### 2a. `applyRiskFloor()` adoption (PD-010)

`applyRiskFloor()` provides the governed translation from judgement quality to authority
risk level. It is voluntary.

**Why it should remain voluntary:** The risk level in `AuthorityContext` sometimes
legitimately reflects the action's nature (e.g., a known safety-critical venue) rather
than solely the understanding quality. A hard constraint that always requires
`applyRiskFloor()` would prevent a caller from escalating beyond the judgement-derived floor
when they have additional domain knowledge.

**What should change instead:** The function should be documented in the `AuthorityContext`
type as the expected derivation path. Not enforced; but clearly signposted.
A future code review checklist or DC formation curriculum should include:
"When calling `AuthorityEngine.assess()`, have you considered `applyRiskFloor()`?"

**PD reference:** PD-010 — Authority Requires Context

---

### 2b. `causationCategory` and `proposedInheritanceScope` (PD-011, PD-012)

Both fields exist on `LearningProposal`. Both are optional. Neither is surfaced to the
governance reviewer in the current approval flow.

**Why they should remain optional at the type level:** Proposals can legitimately be
produced without prior context (e.g., manually authored by a governance reviewer without
a prior learning cycle). Making them required would break hand-authored proposals.

**What should change:** The governance reviewer workflow (currently only in code via
`KnowledgeGovernanceEngine`) should surface these fields when present. A future governance
UI or review prompt should include:

- "Causation category: [knowledge-gap | formation-gap | situational | unknown]"
- "Proposed inheritance scope: [session | venue | profession | universal]"

This is a reviewer workflow concern, not a type constraint.

**PD reference:** PD-011 — Learning Requires Causation; PD-012 — Knowledge Inheritance Boundary

---

### 2c. Whether a concept deserves trust (PD-013, PD-014)

`getTrustSummary()` surfaces evidence. `requiresReview: true` is a signal.

Neither should trigger automatic action. The human reviewer decides whether to
reinforce, challenge, update, or retire a concept. The system's role is to surface
the evidence without hiding it behind a number — which is exactly what the current
implementation does.

No further enforcement is appropriate here. The principle is correctly implemented as
a read-only evidence window.

**PD reference:** PD-013, PD-014

---

## 3. Optional Fields That Should Become Mandatory Boundaries

These fields are currently optional but should be required in specific contexts
to prevent silent governance failure.

### 3a. `FormationInstitutionalContext.source` should be required for human-originated entries

**Current state:** `source?` is optional. An adapter that omits it silently breaks the
source authority chain (PD-009).

**Proposed boundary:** When `FormationInstitutionalContext` entries originate from
`PersonContextStore` (relationship memory), `source` must be `"relationship"`.
This could be enforced by making the `relationshipEntriesToFormation()` adapter's return
type require `source: "relationship"` — narrowing the type rather than making it required
universally.

This does not require changing the base interface. It requires the adapter function to
return a narrowed type.

---

### 3b. `ConceptProvenanceInput.changeIntent` should gate `lastReinforcedAt` mutation

**Current state:** This is already enforced — `lastReinforcedAt` is only set when
`changeIntent === "reinforce"`. The gate is in code and tested.

**Status: No change required.**

---

### 3c. `BuildReflectionInput.priorJudgementDisposition` should be required when `priorUnderstandingConfidence` is supplied

**Current state:** Both are optional and independent. A caller could provide confidence
without disposition or vice versa.

**Why this matters:** The Case D detection (`isHighConfidenceFailure()`) requires both.
If only `priorUnderstandingConfidence` is supplied without `priorJudgementDisposition`,
the causation category defaults to `"unknown"` even though the caller had disposition
information available.

**Proposed boundary:** If `priorUnderstandingConfidence` is supplied, `priorJudgementDisposition`
should also be supplied. This is a documentation constraint, not necessarily a type constraint —
but a runtime warning or assertion would catch silent misuse.

---

## 4. Governance Questions Requiring PD Documents Before Implementation

The following questions emerged from the architectural analysis as governance decisions
that must not become developer assumptions. A PD document should precede any implementation.

### Q1 — What constitutes independent reinforcement? (PD-013)

Before the `"candidate"` → `"validated"` promotion path can be implemented, this question
must be answered:

> "Is five reinforcements from the same venue equivalent to five from different venues?"

Current assessment: No. But "different venue" is not tracked in provenance.
The answer may be: multiple *named reviewers*, not necessarily multiple venues, is sufficient
for an initial threshold. A more sophisticated independence check is deferred.

**Requires:** A PD or candidate document defining the promotion criteria before code.

---

### Q2 — What is a governance reviewer workflow? (PD-011, PD-012)

`causationCategory` and `proposedInheritanceScope` should be surfaced to governance reviewers.
But the current governance reviewer pathway is code (`KnowledgeGovernanceEngine`) — there
is no UI, conversation, or structured review interaction.

Before building a reviewer workflow that surfaces these fields, the question is:

> "Who is a governance reviewer, and how do they receive proposals?"

**Requires:** A PD or candidate document on the governance reviewer experience
before any reviewer-facing implementation.

---

### Q3 — When does `ContextStore.category === "memory"` expire? (PD-007)

This category exists in the type system with no defined lifecycle. The architectural
report identified it as an ungoverned write path.

Before it can be deprecated or scoped, the question is:

> "Is `ContextStore.category === 'memory'` used anywhere in production or test scenarios
> that would require a migration path?"

**Requires:** An audit of all `category: "memory"` usage before deprecation.

---

## 5. PD-015 — Digital Colleague Relationship Development

The architectural report identified an absent principle: how does a DC relationship develop
over time?

PD-007 governs what must not be retained. PD-008 governs consent. Neither addresses:

- How trust grows between a DC and a person
- What signals indicate a relationship has deepened
- How Helping Hand trust (PD-014 sense B) is earned and expressed
- What the DC does differently with a trusted person versus a first conversation

This is not a data model question. It is a relational principle question.

**The candidate principle (proposed):**

> A Digital Colleague earns relationship depth through demonstrated restraint and reliability,
> not through accumulated data.

A DC that remembers someone's preferences, admits uncertainty when it arises, and acts
within its authority earns trust gradually. The relationship is not stored — it is built
through behaviour.

**What PD-015 would need to address:**

1. The difference between data depth (more stored entries) and relationship depth (earned trust)
2. How a DC signals that it understands the difference
3. What a deepened relationship permits the DC to do differently (earlier question framing,
   less uncertainty hedging — but still no overreach)
4. How the relationship can be ended (PD-008 already addresses removal of stored data;
   PD-015 would address ending the relationship pattern itself)

**Recommendation:** Create PD-015 before implementing any feature that varies DC behaviour
based on relationship history.

---

## Summary

| Question | Recommendation |
|---|---|
| LLM output must enter as Observation | Runtime enforcement — before first LLM integration |
| `ContextStore.category === "memory"` | Deprecation or boundary — before any `"memory"` feature |
| `"candidate"` → `"validated"` promotion | Runtime enforcement — after governance defines threshold |
| `applyRiskFloor()` adoption | Governance-only — document in type; review in formation curriculum |
| `causationCategory` and scope | Governance-only — surface in reviewer workflow |
| Trust evidence | Governance-only — `getTrustSummary()` correctly implemented |
| Independent reinforcement definition | Requires PD before implementation |
| Governance reviewer workflow | Requires PD before implementation |
| `ContextStore.category === "memory"` audit | Requires audit before deprecation |
| DC relationship development | Requires PD-015 before any relational feature |

**The principle guiding these decisions:**

> Make the wrong thing impossible when the harm is immediate and invisible.
> Make the right thing obvious when the decision requires human judgement.
>
> Governance and code are not the same tool.
> Use each where it is strongest.
