# MILESTONE_055_CANDIDATE — Trust Boundary Consolidation Review

**Date:** 2026-08-06
**Status:** Candidate — Review Milestone
**Type:** Foundation review — no implementation
**Purpose:** Confirm the trust model is explicit and consistent before any governance promotion path is designed.

---

## Why a Review Milestone

The architectural work from PD-013 through PD-017 has established three distinct kinds of trust.

They are named. They are principled. They are not yet drawn together.

Before defining how many reinforcements are enough (GDQ-002), the architecture must first make explicit:

> Trust in what? Trust by whom? Trust for what purpose?

A threshold without a model is a number without a reason.

---

## 1. PD-001 → PD-017 Dependency Graph

### Constitutional Foundation (no code dependencies)

```
PD-001 Organisational Model of CI
PD-002 HH Must Be Orientable
PD-003 Andy — Navigator of Understanding
  ↓
These are identity principles. No code enforces them.
They govern what HH is, not what it does.
```

### Capability Principles (partially enforced)

```
PD-004 Talk.Get OS and Senses
  → Hardware is a sense, not a DC.
  → Not yet enforced — no hardware integration exists.
  → Enforced when: ObservationSource includes "hardware" or similar.

PD-005 LLM as Capability
  → LLM output must enter as Observation.
  → Partially enforced: form() Invariant 1 prevents invented meaning.
  → Gap: no LLM integration; boundary unenforced at wiring point.

PD-006 Conversation as Experience
  → Human speech enters as Observation. Responses are Actions.
  → Partially enforced: humanSpeechToObservation() + Milestone 045 chain tests.
  → Gap: judgementToConversationInstruction() returns string; AuthorityEngine pass optional.
```

### Human Boundary Principles (enforced in PersonContextStore)

```
PD-007 Human Memory Boundary
  → People are not knowledge objects.
  → Personal disclosures default to forgetting.
  → Enforced: PersonContextStore.addEntry() throws without consentedAt.
  → Enforced: clearSession() releases session-scoped entries.
  → Enforced: "memory" removed from ContextCategory (Milestone 054).
  → Depends on: PD-008 (trust framework for what consent means).

PD-008 Human Trust Boundary
  → Trust is earned through restraint.
  → Enforced: PersonContextStore inspect/remove (person retains control).
  → Gap: HH trust measurement (PD-014 sense B) has no data model.
  → Depends on: PD-007 (memory boundary), PD-014 (trust evidence model).

PD-015 Digital Colleague Relationship Development
  → Relationship depth is earned through behaviour, not accumulated data.
  → Partially enforced: PersonContextStore provides the boundary.
  → Gap: No positive model for relationship depth signals.
  → Depends on: PD-007, PD-008.
```

### Provenance and Source Principles (enforced in formation chain)

```
PD-009 Context Has Authority
  → Understanding must carry its origin.
  → Enforced: FormationInstitutionalContext.source; Understanding.contextSources.
  → Enforced: LearningProposal.informedByPersonContext triggers reviewer requirement.
  → Depends on: PD-007 (why relationship source matters).

PD-011 Learning Requires Causation
  → Learning is a hypothesis, not a conclusion.
  → Enforced: LearningProposal.causationCategory populated by LearningEngine.
  → Gap: KnowledgeGovernanceEngine does not surface causationCategory to reviewer.
  → Depends on: PD-009 (source authority), PD-012 (inheritance).

PD-012 Knowledge Inheritance Boundary
  → Inheritance must be proportional to evidence breadth.
  → Enforced: evaluateGuard() Invariant 6 blocks single-source → profession.
  → Enforced: deriveProposedInheritanceScope() — deterministic proposal function.
  → Gap: proposedInheritanceScope not surfaced to governance reviewer.
  → Depends on: PD-016 (what independence means).
```

### Authority Principles (partially enforced)

```
PD-010 Authority Requires Context
  → Permission without understanding is configuration.
  → Enforced: applyRiskFloor() implemented and tested.
  → Gap: applyRiskFloor() never called in main pipeline — adoption voluntary.
  → Depends on: PD-017 (who has authority).

PD-017 Governance Reviewer Authority
  → reviewedBy must represent earned authority, not a declaration.
  → Principled: authority classes defined (Constitutional/Professional/Venue/Operational).
  → Gap: no implementation of class-based authority checking.
  → Depends on: PD-010, PD-016.
```

### Trust Principles (enforced in KnowledgeGraph)

```
PD-013 Knowledge Trust Requires Renewal
  → Trust must be renewed through continued evidence.
  → Enforced: lastReinforcedAt set only on "reinforce" intent.
  → Enforced: challengedBy records contradiction.
  → Enforced: getTrustSummary() surfaces evidence.
  → Gap: "candidate" → "validated" promotion ungoverned.
  → Depends on: PD-016 (what independence means), PD-017 (who approves promotion).

PD-014 Trust Is Evidenced, Not Scored
  → Trust is remembered through reasons, not numbers.
  → Enforced: ConceptTrustSummary has no numeric trust field.
  → Depends on: PD-013.

PD-016 Independent Reinforcement
  → Evidence must come from sources that could have reached a different conclusion.
  → Principled: creator ≠ independent source; validation never automatic.
  → Gap: threshold values not yet defined (GDQ-002).
  → Depends on: PD-013, PD-014.
```

---

## 2. The Trust Model

Three distinct kinds of trust. They must not be conflated.

```
                              TRUST
                                │
              ┌─────────────────┼─────────────────┐
              ↓                 ↓                  ↓

       KNOWLEDGE TRUST    AUTHORITY TRUST    RELATIONSHIP TRUST
       ─────────────────  ───────────────   ─────────────────
       "Should this        "Should this      "Should people
        knowledge be        DC be trusted     trust this
        trusted today?"     to act here?"     colleague?"

       Evidence:           Evidence:          Evidence:
       ─────────           ─────────          ─────────
       Reinforcement       Judgement          Behaviour
       Independence        quality            over time
       Challenge           Provenance         Restraint
       survival            Authority          Reliability
       Recency             class              Transparency

       Lives in:           Lives in:          Lives in:
       ─────────           ─────────          ─────────
       KnowledgeGraph      AuthorityEngine    PersonContextStore
       ConceptProvenance   applyRiskFloor()   Relationship layer
       getTrustSummary()   AuthorityContext   (future)

       PDs:                PDs:               PDs:
       ─────               ─────              ─────
       PD-013              PD-010             PD-007
       PD-014              PD-017             PD-008
       PD-016                                 PD-015
```

### Why the Separation Matters

**Knowledge trust** answers: "Is this concept reliable?"
It is about evidence that has accumulated independently over time.
It lives in `KnowledgeGraph`. It does not know about people.

**Authority trust** answers: "Is this DC allowed to act on this judgement?"
It is about the relationship between the DC's understanding quality and its scope of action.
It lives in the judgement → authority chain. It does not know about relationship history.

**Relationship trust** answers: "Has this DC earned the right to behave differently with this person?"
It is about the relationship between the DC and a specific person, over time.
It lives in the relationship layer. It must never enter `KnowledgeGraph`.

**The failure modes from conflating them:**
- Knowledge trust → Relationship trust: "The concept is validated, therefore I know you."
- Authority trust → Knowledge trust: "The DC is confident, therefore the knowledge is correct."
- Relationship trust → Authority trust: "I know this person, therefore I can act further than my authority permits."

---

## 3. Why GDQ-002 Requires the Trust Model First

GDQ-002 asks: "What is the minimum reinforcement threshold?"

The threshold is not a single number. It is three numbers — one per trust destination.

**Venue scope threshold:**
How much evidence does a concept need to be trusted at a specific venue?
Answer: relatively low — the venue is the context of origin. Minimal independent confirmation required.

**Profession scope threshold:**
How much evidence does a concept need to be trusted by all DCs in a profession?
Answer: higher — the concept will influence decisions by DCs who were not present when it was learned. Multiple independent confirmations required across different operational contexts.

**Universal scope threshold:**
How much evidence does a concept need to be trusted by all DCs regardless of profession?
Answer: constitutional review. Not a reinforcement count — a different class of decision entirely.

**The insight:** The threshold is not about how many times a concept has been confirmed.
It is about whether the confirmation is broad enough to warrant the reach.

Venue-scoped concepts require venue-breadth evidence.
Profession-scoped concepts require profession-breadth evidence.
Universal concepts require constitutional review — a threshold-based approach does not apply.

---

## 4. Required Outputs from This Review Milestone

Before any implementation of M055's promotion path:

### Output 1 — Confirmed Trust Model

The trust model in Section 2 should be reviewed and accepted by governance.
It becomes the architectural reference for all future trust-related decisions.

### Output 2 — Resolved GDQ-002 configuration

With the trust model explicit, governance can set:
- Venue scope threshold: N reinforcements, reviewer independence as per PD-016
- Profession scope threshold: M reinforcements, minimum P distinct reviewers
- Universal scope: constitutional review only — no threshold-based path

### Output 3 — Explicit scope for "Candidate → Validated"

The promotion path should be designed for venue scope first.
Profession-scope promotion is a separate and more demanding milestone.
Universal scope is a constitutional governance question, not an implementation question.

---

## This Milestone Is Complete When

The following five questions can be answered by the repository — not by a developer's knowledge of PD documents, but by the architecture itself.

---

### Question 1 — What is being trusted?

The architecture must be able to distinguish three trust subjects and demonstrate they are structurally separate:

| Subject | Evidence | Lives in |
|---|---|---|
| Knowledge | Reinforcement, independence, challenge history, recency | `KnowledgeGraph` + `ConceptProvenanceStore` |
| Authority | Judgement quality, provenance, authority class | `AuthorityEngine` + `applyRiskFloor()` + `AuthorityContext` |
| Relationship | Behaviour over time, restraint, reliability, transparency | `PersonContextStore` + relationship layer |

**Acceptance:** No data structure in the codebase conflates two of these three. `KnowledgeGraph` has no `personId`. `PersonContextStore` has no `evidenceLevel`. `AuthorityContext` has no relationship history field.

---

### Question 2 — Who decides?

The architecture must be able to demonstrate that the right authority class is applied to the right scope of decision:

| Decision | Authority required | PD |
|---|---|---|
| Venue-scope concept promotion | Venue authority | PD-016, PD-017 |
| Profession-scope inheritance | Profession HQ | PD-016, PD-017 |
| Universal inheritance | Helping Hand HQ — constitutional review | PD-016, PD-017 |
| Relationship memory persistence | The person — explicit consent | PD-007, PD-008 |

**Acceptance:** Governance reviewer workflow design specifies the authority class required for each decision type before any reviewer-facing code is written.

---

### Question 3 — What evidence is required?

The architecture must have explicit, configured thresholds for each scope:

| Scope | Evidence required |
|---|---|
| Session | None — ephemeral |
| Venue | Confirmed operational observation; reviewer ≠ creator |
| Profession | Minimum N independent confirmations; N defined by Profession HQ; reviewer independence per PD-016 |
| Universal | Constitutional review — not threshold-based |

**Acceptance:** GDQ-002 threshold values are defined for venue scope. Profession-scope threshold is deferred but its governance owner (Profession HQ) is identified. Universal scope is confirmed as constitutional review only.

---

### Question 4 — What happens when evidence is insufficient?

The architecture must have explicit behaviour for each insufficient-evidence case:

| Case | Behaviour |
|---|---|
| Concept below venue-scope threshold | Remains `"candidate"` — `getTrustSummary().requiresReview: false` unless challenged |
| Concept at venue scope but below profession threshold | Inherits only to venue — `deriveProposedInheritanceScope()` returns `"venue"` |
| Concept challenged but not resolved | `getTrustSummary().requiresReview: true` — flagged for human review, not automatically retired |
| High-confidence failure in learning | `LearningDisposition: "observe"` — Case D (Milestone 050) |

**Acceptance:** All four cases produce documented, testable behaviour. No case results in silent acceptance or automatic promotion.

---

### Question 5 — What never happens?

These are the permanent constraints. The architecture must be able to prove each one.

| Never | Proved by |
|---|---|
| Automatic promotion to `"validated"` | `"candidate"` → `"validated"` path does not exist without threshold check |
| Authority through familiarity | `PersonContextStore` entry count is not an authority signal; `applyRiskFloor()` derives floor from judgement, not relationship |
| Trust through a score | `ConceptTrustSummary` has no numeric trust field (type constraint) |
| Self-reinforcement counting as independent | PD-016: creator ≠ independent source; to be enforced in promotion path |
| Relationship data entering `KnowledgeGraph` | Structural separation: `PersonContextStore` ≠ `KnowledgeGraph`; `personId` not on `Concept` |

**Acceptance:** Each row can be pointed to a test or a type constraint. The "never" list is not aspirational — it is proven.

---

### Question 6 — What is the smallest thing allowed to become trusted?

The system must understand not only "is this supported?" but "what is the smallest boundary this evidence justifies?"

A concept may be trustworthy locally without being globally inheritable.

| Concept | Venue-trusted? | Profession-trusted? | Universal? |
|---|---|---|---|
| "Kitchen close-down checklist order at The Anne Arms" | ✅ local evidence | ❓ requires profession-breadth | ❌ not a universal principle |
| "Chefs should verify temperature before service" | ❓ depends on evidence | ✅ with profession-breadth evidence | ❌ still professional, not universal |
| "Verify understanding before acting" | ✓ compatible | ✓ compatible | ✅ constitutional territory |

The third column does not come from reinforcement count. It comes from constitutional review.

**The emerging question this surfaces:** Is `"validated"` one status, or is validation always relative to intended inheritance scope? A concept may be correctly `"validated"` for a venue while remaining `"candidate"` for a profession.

This is consistent with PD-012 (inheritance proportional to evidence) and PD-016 (independence required for the scope claimed). It does not require changing the current type system — it requires the promotion path to validate against the *intended scope*, not against a universal threshold.

**Acceptance:** The promotion path design specifies what `"validated"` means relative to inheritance scope. A concept validated for venue is not thereby validated for profession. The scope of validation is part of the promotion record.

---

## The Question This Milestone Answers

> "How do we make capability grow without losing the reasons it was allowed to grow?"

That is the question Milestone 055 answers before the next implementation begins.

Not: "How many reinforcements are enough?"

But: "What is trust in this system, who holds it, what does the architecture do when it is absent, and what is the smallest boundary the evidence justifies?"

---

## The Sequence That Follows

```
M055 Trust Boundary Consolidation  ← this milestone
        ↓
GDQ-002 Threshold Decisions
(venue-scope threshold defined by governance)
        ↓
M056 Candidate → Validated Promotion Path
(not "adding validation" — implementing a decision the architecture has earned)
        ↓
M057 Governance Reviewer Workflow
(reviewer sees causationCategory, proposedInheritanceScope, validation scope)
```

M056 is not about making concepts smarter.

It is implementing a decision that the architecture has already earned the right to make.

Implementation of M056 may begin only after all six acceptance questions are answered.
