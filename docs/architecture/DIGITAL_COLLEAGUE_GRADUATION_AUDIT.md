# Digital Colleague Graduation Audit

**Document ID:** HH-ARCH-003

**Status:** Draft

---

> This is not an audit of code.
>
> It is a standard for auditing understanding across Digital Colleagues.

---

# Purpose

This document defines the universal audit standard for Helping Hand graduation review.

It exists to answer one question:

- What understanding should remain local, what should graduate, and what should be inherited by future Digital Colleagues?

This audit standard is intentionally conservative.

Helping Hand should delay promotion rather than promote understanding too early.

---

# Scope

This standard applies to any Digital Colleague whose capabilities may influence shared Helping Hand architecture.

It does not ask where code should move.

It asks what understanding should be governed.

The audit uses the following practical questions for every capability:

1. What problem does this solve?
2. Is it profession-specific or universal?
3. Has the Digital Colleague demonstrated enduring value?
4. Does it already exist in the Companion Operating System?
5. If not, should it remain local or become a Capability Graduation proposal?

---

# Workflow

This audit standard follows the project workflow already established for Helping Hand:

```text
Documentation
      ↓
Architecture
      ↓
Types
      ↓
Behaviour
      ↓
Governance
      ↓
Implementation
      ↓
Demonstration
      ↓
Regression Tests
      ↓
ADRs
```

The documentation and architectural standards are in place.

This standard governs how those standards are applied to any Digital Colleague contribution map.

---

# Audit Outcomes

Every row in a graduation audit must resolve to one of four outcomes:

- **Remain Local** - the capability should stay with the relevant Digital Colleague or profession
- **Already Graduated** - the capability already belongs in shared architecture
- **Candidate for Graduation** - the capability has evidence, but needs governance review before it moves
- **Archive** - the capability should be retained for historical reference, not inherited forward

---

# Graduation Table

| Capability | Current Owner | Universal? | Evidence | Decision | Action | Graduation Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| Capability under review | Current owner | Yes / Likely / No | Proven / Partial / Emerging | Remain Local / Already Graduated / Candidate for Graduation / Archive | Complete / Review / Audit | Concise rationale for the outcome. |

This table is intentionally a working map.

It should evolve as evidence, architecture and governance mature.

The Graduation Evidence column captures the concise rationale for each outcome so Knowledge Governance can review the table without rereading the full audit every time.

---

# Reading the Table

## Current Owner

The current owner is where the capability most naturally lives today.

A capability may be present in a Digital Colleague while still being universal in principle.

## Universal?

This column asks whether the capability should be inherited by every Digital Colleague.

## Evidence

This column records the strength of support currently available.

- Proven means there is already enough practical evidence to trust the capability's role.
- Partial means the capability is visible, but not yet fully proven as a shared standard.
- Emerging means the capability is visible but still needs stronger operational evidence.

## Evidence and Governance

### Graduation Evidence

An **Already Graduated** decision requires explicit evidence of:

- a clearly identified universal mechanism;
- a clearly defined local implementation boundary;
- sufficient operational evidence demonstrating that the capability is not dependent upon a single professional implementation.

Cross-colleague validation strengthens confidence where available but is not mandatory for the first graduating capability.

### Rejected Approach

Rigid mapping between evidence class and decision outcome is rejected.

- **Partial** does not automatically mean **Candidate for Graduation**.
- **Proven** does not automatically mean **Already Graduated**.

Governance decisions should be based on sufficient operational evidence plus cross-colleague validation where available, alongside boundary clarity and architectural judgement.

## Decision

This column records the current architectural outcome.

The four permitted outcomes are:

- Remain Local
- Already Graduated
- Candidate for Graduation
- Archive

## Action

This column records the next practical step.

- Complete means no further structural movement is required right now.
- Review means Knowledge Governance should assess the capability.
- Audit means the capability needs a deeper understanding pass before governance.

---

# Interpretation

The table is not searching for code to move.

It is searching for understanding to govern.

That distinction matters.

If a capability is already shared, the audit should confirm it.

If a capability is still local, the audit should leave it there until the evidence says otherwise.

If a capability is promising but not yet proven, the audit should treat it as a candidate for graduation rather than forcing a conclusion.

---

# Governance Use

Knowledge Governance should use this standard to review candidate capabilities, preserve provenance, and record why a capability was promoted, retained or archived.

The standard exists to make graduation decisions traceable without forcing every reader back through the full audit narrative.

---

# Review Frequency

Graduation audits should be living documents.

They should be reviewed whenever:

- a capability changes significantly,
- new operational evidence emerges,
- Knowledge Governance requests reassessment,
- a capability is proposed for graduation,
- a capability is inherited by another Digital Colleague.

Helping Hand should prefer updating an existing audit over creating duplicate reviews.

The audit therefore becomes the enduring record of a capability's architectural journey.

---

# Common Graduation Patterns

These are not rules.

They are guidance derived from recurring audit distinctions.

Future reviewers should use them to recognise patterns without forcing every capability into the same mould.

Common distinctions include:

- Capability vs Expression
- Capability vs Content
- Universal vs Local
- Governed vs Professional

If future audits reveal different patterns, that is also valuable evidence.

It means Helping Hand is learning from the architecture instead of assuming the answer in advance.

Either outcome strengthens the architecture because graduation is being discovered through evidence.

---

# Closing Principle

Helping Hand does not move capability because it is present.

It moves capability because understanding has been governed, evidence has been retained and wisdom is ready to be inherited.