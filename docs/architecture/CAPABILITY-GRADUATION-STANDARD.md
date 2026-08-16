# Capability Graduation Standard

**Status:** Architectural Standard

---

> Helping Hand grows by promoting capability only after it has been exercised, reviewed and shown to have enduring value.
>
> A capability is not shared because it was designed.
>
> It is shared because it has been proven.

---

# Purpose

This document defines how a capability moves from a local or profession-specific context into shared Helping Hand architecture.

It answers four questions:

- When should a capability graduate?
- When should it remain local?
- What proves enduring value?
- What role does Knowledge Governance play?

This standard exists to protect Helping Hand from promoting ideas before they have been exercised in real operation.

---

# Scope

This standard applies to any capability that may move from:

- a Digital Colleague implementation
- a profession-specific workflow
- a local operating context

into shared architecture such as the Companion Operating System or another governed universal layer.

It applies to behaviour, reasoning, learning methods, memory patterns and other reusable capabilities.

It does not apply to a knowledge store.

It does not apply to runtime mutation.

It does not apply to direct application of changes without governance.

---

# Core Principle

Capability graduates through evidence, not enthusiasm.

Helping Hand prefers delaying promotion over promoting understanding too early.

The existence of a capability is not enough.

The usefulness of a capability in one context is not enough.

To graduate, a capability must demonstrate that it is:

- enduring
- explainable
- reusable
- governable
- profession-independent or clearly universal
- valuable beyond the context in which it first appeared

---

# Graduation Meaning

Graduation means a capability has passed from local discovery into governed shared architecture.

Graduation does not mean:

- immediate implementation everywhere
- automatic inheritance by every Digital Colleague
- removal from its original context
- loss of provenance
- loss of professional nuance

Graduation means the capability has earned a place in the shared architecture for review, implementation and future inheritance.

---

# What Must Be Proven

Before a capability graduates, Helping Hand should be able to show that it:

- works in a real Digital Colleague
- continues to provide value over time
- remains understandable by humans
- can be explained clearly
- behaves consistently under governance
- does not depend on one-off local assumptions
- improves more than one situation or more than one colleague type

A capability that only helps one narrow scenario may still be valuable.
It is not yet necessarily universal.

---

# Graduation Criteria

A capability should normally graduate only when the following are true:

1. It has been exercised in real operation.
2. It has produced repeated value, not isolated success.
3. Its behaviour can be described clearly enough to govern.
4. It can be separated from local implementation detail.
5. It does not break the constitutional principles of Helping Hand.
6. It can be expressed as a shared capability without losing meaning.
7. Knowledge Governance can review it explicitly.

8. A complete capability stewardship contract is recorded.

If these conditions are not met, the capability should remain local.

---

# Capability Stewardship Contract Gate (Mandatory)

No capability may graduate to shared architecture without an explicit stewardship contract.

Minimum contract fields required before promotion approval:

1. capability identity and name
2. bounded purpose
3. technical steward
4. capability steward
5. what it can do
6. what it cannot do
7. input assumptions and data prerequisites
8. known failure modes
9. evaluation method
10. confidence and uncertainty disclosure expectation
11. decision criticality class
12. permitted uses
13. prohibited uses
14. escalation conditions
15. relevant profession and context meaning owners
16. authority envelope
17. version and change history
18. retirement and deprecation path

Governance promotion must be rejected if any required stewardship field is missing.

Each required stewardship field must also carry an explicit evidence-strength classification:

1. Directly evidenced
2. Governed derivation
3. Evidence gap

No field may be silently inferred to make a contract appear complete.

## Ownership Source Requirements

Stewardship evidence may come from different accountable boundaries.
Graduation review must confirm the source boundary for each field:

1. Technical integrity fields: Digital or technical stewardship
2. Capability-specific boundaries: capability stewardship
3. Professional meaning fields: relevant Profession HQ
4. Profession-sensitive escalation thresholds: relevant Profession HQ
5. Authority envelope fields: authority and governance evidence
6. Lifecycle and deprecation fields: capability governance evidence

If the required accountable boundary has not provided evidence, classify the field as an evidence gap.

## Professional Meaning Ownership Requirement

Where professional interpretation is required, the stewardship contract must name the profession or context meaning owner explicitly.

Runtime actor evidence (for example role values observed in interaction records) is not sufficient on its own to establish professional meaning ownership.

## Prohibited Uses Requirement

Every capability contract must include capability-specific prohibited uses.

Generic authority constraints are necessary but not sufficient.

## Escalation Responsibility Separation

Stewardship records must distinguish:

1. Capability detection of an escalation condition
2. Professional definition of profession-sensitive escalation thresholds
3. Governance or authority handling after escalation

Collapsing these into one undifferentiated escalation statement is not acceptable for graduation.

## Lifecycle and Evidence Continuity

Retirement and deprecation path is a universal capability-governance requirement.

Where applicable, stewardship records must state successor mapping and evidence continuity expectations across versions.

## Confidence and Uncertainty Disclosure

Confidence and uncertainty disclosure is a governed evidence expectation.

This requirement does not imply immediate new runtime functionality. Runtime changes are required only if a later audit proves the existing runtime cannot provide the needed evidence.

---

# Responsibility Separation (Non-Negotiable)

Every stewardship contract must preserve the following separation:

1. Technical steward owns capability integrity.
2. Professional or context owner owns meaning.
3. Judgement owns appropriateness.
4. Authority owns permission.
5. Execution owns state-change evidence.

No graduation record is valid if these responsibilities collapse into a single "the model decided" outcome.

---

# Non-Graduation Cases

A capability should remain local when it is:

- profession-specific
- venue-specific
- organisation-specific
- temporary
- experimental
- too dependent on a single implementation
- not yet validated through repeated use
- not yet explainable as a shared rule
- missing a complete stewardship contract
- unable to show who owns meaning outside the capability
- unable to show authority-envelope limits for consequential use

Local capability is not a failure.
It is often the correct place for early understanding to remain.

---

# The Graduation Path

The standard path is:

```text
Local Experience
      ↓
Evidence
      ↓
Reflection
      ↓
Understanding
      ↓
Learning Proposal
      ↓
Knowledge Governance
      ↓
Approved Shared Capability
      ↓
Shared Architecture
      ↓
Inheritance
```

This path preserves provenance and accountability.

No step may be silently skipped.

---

# Role of Knowledge Governance

Knowledge Governance determines whether a proposed shared capability should be approved for the shared architecture.

It does not invent the capability.

It does not apply the capability.

It does not rewrite the source learning.

It reviews whether the capability deserves to graduate, and if so, in what form.

Knowledge Governance protects Helping Hand from promoting capabilities that are only locally useful or insufficiently proven.

---

# Relation to Annie

Annie is the first Digital Colleague whose practical experience demonstrates this standard.

Her behaviour helps show the difference between:

- capability that is merely present
- capability that is proven useful
- capability that should be inherited by all

Annie validates architecture through practice.
This standard ensures that future capabilities follow the same discipline.

---

# Architectural Consequences

When a capability graduates, Helping Hand should record:

- what the capability is
- why it matters
- where it was first observed
- what evidence supports its value
- whether it is universal or profession-independent
- which layer owns it after graduation
- how it will be inherited
- who stewards technical integrity
- who stewards capability boundary
- which professions or contexts own output meaning
- what authority envelope governs its use
- how it escalates when confidence, consequence, or uncertainty thresholds are crossed
- how and when it may be deprecated or retired

This keeps the architecture understandable and auditable.

---

# Repository Rule

Graduation standards belong in the Architecture Library because they define how Helping Hand evolves.

They sit alongside the core architectural reference and the knowledge architecture, not inside runtime code.

---

# Closing Principle

Helping Hand does not promote ideas before they are proven.

It grows by allowing experience to become evidence, evidence to become learning, and learning to become governed shared capability.

Governed shared capability requires governed stewardship before inheritance.
