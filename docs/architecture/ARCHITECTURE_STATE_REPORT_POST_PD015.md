# Architecture State Report — Post PD-017

**Date:** 2026-08-06 (refreshed after Milestone 054 and PD-016/017)
**Purpose:** One accurate map of the architecture before further development.
**Scope:** Milestones 043–054; PD-001 through PD-017; all architectural boundary documents.
**Test baseline:** 282 tests, 25 suites, all passing.
**Last change:** Milestone 054 — `ContextCategory` `"memory"` removed (zero callers confirmed).

---

## How to Use This Document

This document is the single reference for the state of the Helping Hand architecture
after the current session. Before starting any new milestone:

1. Check Section 1 — confirm the capability you need is proven, or identify what needs proving first.
2. Check Section 3 — confirm the enforcement boundary you need exists, or identify what needs building.
3. Check Section 5 — confirm no open governance question blocks your milestone.
4. Check Section 6 — confirm your milestone is in the correct dependency order.

---

## 1. Current Proven Capabilities

Capabilities with automated test coverage. A test failure means the capability has broken.

### Formation and Understanding

| Capability | Test | What it proves |
|---|---|---|
| Human speech → Observation → Translation → form() | `milestone-045-conversation-boundary.test.ts` PC1 | Human enters through observation pipeline |
| Governed memory reaches form() | `milestone-044-learning-loop.test.ts` | KnowledgeGraph concept informs future Understanding |
| Source authority survives into Understanding.contextSources | `milestone-047-context-source-authority.test.ts` PC3–PC4 | Origin of context is traceable |
| `completeness: "partial"` → JudgementEngine produces `"caution"` | `milestone-048` (within existing suites) | Formation's own verdict informs judgement |
| Relationship context → `informedByPersonContext: true` | `milestone-047-context-source-authority.test.ts` PC5–PC7 | Relational source triggers de-identification gate |

### Judgement and Authority

| Capability | Test | What it proves |
|---|---|---|
| JudgementEngine → AuthorityEngine → ActionEngine for conversational responses | `milestone-045-conversation-boundary.test.ts` PC3 | Responses pass authority boundary |
| `judgementToMinimumRiskLevel()` — disposition → risk floor | `authorityFromJudgement.test.ts` PC1–PC4 | Judgement quality translates to risk level |
| `applyRiskFloor()` — floor cannot be understated by caller | `authorityFromJudgement.test.ts` PC5–PC7 | Caller cannot silently understate risk |

### Governance Chain

| Capability | Test | What it proves |
|---|---|---|
| `applyApprovedChange()` — record → guard → mutation | `applyApprovedChange.test.ts` | Three proven chains connect |
| Provenance chain links concept back to execution | `milestone-043` | Full audit trail exists |
| `evaluateGuard()` — 8 constitutional invariants | `writeGuard.test.ts` | Guard blocks all 8 failure modes |
| `evaluateGuard()` Invariant 1 — constitutional immutability | `writeGuard.test.ts` | Constitutional concepts cannot be modified |
| `evaluateGuard()` Invariant 6 — single-source inheritance gate | `writeGuard.test.ts` | Single-source cannot inherit profession-wide |

### Memory

| Capability | Test | What it proves |
|---|---|---|
| `PersonContextStore` — consent required for persistence | `PersonContextStore.test.ts` PC2 | No entry without `consentedAt` |
| `PersonContextStore` — session clearance | `PersonContextStore.test.ts` PC1 | Session context is released |
| `PersonContextStore` — person can inspect and remove | `PersonContextStore.test.ts` PC3–PC4 | Person has visibility and control |
| `PersonContextStore` ≠ `KnowledgeGraph` — structural separation | `PersonContextStore.test.ts` PC5 | Two stores share no write path |

### Learning and Causation

| Capability | Test | What it proves |
|---|---|---|
| Four failure cases distinguishable | `milestone-050-causation.test.ts` | Case A/B/C/D produce different proposals |
| Case D: high-confidence failure → `"observe"`, not `"propose"` | `milestone-050-causation.test.ts` PC5 | High-confidence failure does not auto-propose |
| `causationCategory` set on proposal | `milestone-050-causation.test.ts` PC6–PC7 | Causation hypothesis is recorded |
| `deriveProposedInheritanceScope()` — evidence-proportional scope | `inheritanceScopeFromLearning.test.ts` PC1–PC6 | Situational → session; knowledge-gap/multi-source → profession |
| Prior context survives Reflection → Learning | `milestone-050-causation.test.ts` PC4 | Causation chain is traceable |

### Knowledge Trust

| Capability | Test | What it proves |
|---|---|---|
| `lastReinforcedAt` set only on `"reinforce"` intent | `milestone-053-trust-renewal.test.ts` PC1–PC3 | Edit ≠ confirmation |
| Challenge relationship recorded in `challengedBy` | `milestone-053-trust-renewal.test.ts` PC4 | Contradiction is structural, not textual |
| `getTrustSummary()` — evidence window, no score | `milestone-053-trust-renewal.test.ts` PC5–PC8 | Trust is evidenced |
| `"validated"` with zero reinforcements → `requiresReview: true` | `milestone-053-trust-renewal.test.ts` PC7 | Ungoverned promotion is visible |

---

## 2. Current Governance-Only Principles

Principles documented in PDs but not currently enforced by code. A developer who does not
read these documents is not stopped by the codebase.

| Principle | PD | Gap | Risk |
|---|---|---|---|
| LLM output must enter as Observation | PD-005 | No LLM integration exists; boundary unenforced | First LLM wiring point |
| Responses are Actions (full chain) | PD-006 | `judgementToConversationInstruction()` returns string; no forced AuthorityEngine pass | New conversation features |
| `applyRiskFloor()` adoption | PD-010 | Only called in its own test; never called in main pipeline | Every new action chain |
| `causationCategory` surfaced to reviewer | PD-011 | `KnowledgeGovernanceEngine` does not read it | Governance UI/reviewer workflow |
| `proposedInheritanceScope` surfaced to reviewer | PD-012 | `KnowledgeGovernanceEngine` does not read it | Governance UI/reviewer workflow |
| `"candidate"` → `"validated"` governed promotion | PD-013 | Caller can freely set `status: "validated"` | Any knowledge promotion feature |
| Relationship depth is earned, not stored | PD-015 | No relational feature exists; boundary unenforced | Any feature varying DC behaviour by relationship history |
| Independent reinforcement definition | PD-016 | Principled but configuration decisions remain | Promotion path implementation |
| Governance reviewer authority model | PD-017 | Principled but authority class implementation remains | Reviewer workflow implementation |

---

## 3. Runtime Enforcement Boundaries

What the codebase structurally enforces — these cannot be violated without a failing test.

```
Constitutional immutability
  evaluateGuard() Invariant 1
  KnowledgeGraphMutation.updateConcept() check
  → Two independent layers. Both must be defeated.

Single-source inheritance gate
  evaluateGuard() Invariant 6
  → Blocks "single-source" or "candidate" from CROSS_VENUE_INHERITANCE targets.

Formation cannot invent meaning
  form() Invariant 1 — no invented summary
  → Every summary sentence originates from translations or knowledge principles.

Consent required for relationship memory
  PersonContextStore.addEntry() throws without consentedAt
  → Personal disclosure cannot persist without explicit consent.

Edit ≠ confirmation
  KnowledgeGraphMutation.updateConcept() — lastReinforcedAt only on "reinforce" intent
  → Editing a concept does not count as independent confirmation.

Relationship source requires de-identification
  LearningProposal.informedByPersonContext → governance requires reviewedBy
  → Proposals informed by relationship context require named reviewer.

Inheritance scope from evidence
  deriveProposedInheritanceScope() — deterministic table
  → Situational failure → session; formation-gap → venue; knowledge-gap/single-source → venue; multi-source → profession.
  Note: This is a proposal function. evaluateGuard() Invariant 6 is the structural gate.
```

Added in Milestone 054:
```
ContextCategory does not include "memory"
  lib/onboarding/contextStore.ts — value removed
  → The wrong path (personal data in ContextStore without consent) is now structurally absent.
  Confirmed: zero callers, zero data, zero migration required.
```

---

## 4. Deferred Implementation Boundaries

Explicitly deferred with documented requirements. These must not be implemented
until the governance questions in Section 5 are answered.

| Deferred item | Deferred in | Reason | Blocks |
|---|---|---|---|
| `"candidate"` → `"validated"` governed promotion | Milestone 053 Step 4 | Threshold is governance configuration — GDQ-001/002 | M055 |
| Source independence tracking (venue/DC) | PD-016 / CANDIDATE_INDEPENDENT_REINFORCEMENT_BOUNDARY | Requires provenance carrying DC identity and venue ID | Full independence verification |
| Governance reviewer authority implementation | PD-017 / CANDIDATE_GOVERNANCE_REVIEWER_BOUNDARY | Authority class model defined; specific roles undefined | M056 |
| Relationship memory entering formation | Milestone 046 analysis | `relationshipEntriesToFormation()` adapter not yet built — GDQ-004 | M057 |
| Context breadth tracking in provenance | PD-016 | Operational context not carried through learning chain | Full independence verification |
| Outcome history per concept | Milestone 053 analysis | Concept → formation → execution trace not connected | Outcome-based trust evidence |
| Helping Hand trust tracking | PD-014 / GDQ-005 | Lives in relationship layer; not KnowledgeGraph | HH trust layer |
| LLM `"llm"` ObservationSource | GOVERNANCE_ADOPTION_BOUNDARY_CANDIDATE | No LLM integration exists | First LLM integration point |

---

## 5. Open Governance Questions

See `GOVERNANCE_DECISION_QUEUE_2026_08_06.md` for the authoritative queue.
Status key: ✅ Resolved | 🟡 Principled (PD exists; configuration decisions remain) | ⏳ Open

| ID | Question | Status | PD |
|---|---|---|---|
| GDQ-001 | What constitutes independent reinforcement? | 🟡 Principled | PD-016 |
| GDQ-002 | What is the minimum reinforcement threshold per scope? | ⏳ Open | PD-016 (configuration) |
| GDQ-003 | Who qualifies as a governance reviewer? | 🟡 Principled | PD-017 |
| GDQ-004 | What signals indicate DC relationship depth? | ⏳ Open | PD-015 |
| GDQ-005 | How is Helping Hand trust measured? | ⏳ Open | PD-014, PD-015 |
| — | Is `ContextStore.category === "memory"` used? | ✅ Resolved | Milestone 054 |

---

## 6. Dependency Order for Future Milestones

Milestones must be sequenced to respect governance gates. A milestone that requires
an unanswered governance question cannot proceed.

```
Already proven (all have test evidence):
  M043 Governance → Guard → KnowledgeGraph
  M044 Memory → Future Understanding
  M045 Human Conversation Boundary
  M046 Relationship Memory
  M047 Source Authority
  M048 Understanding Trustworthiness
  M049 Authority Context
  M050 Causation in Learning
  M051 Inheritance Scope
  M053 Trust Evidence
  M054 ContextStore Memory Boundary Cleanup  ← completed this session

Candidate (boundary defined, not implemented):
  M052 Concept Trust Lifecycle (partial — read layer done in M053)

Governance-gated (cannot start until GDQ answered):
  M055 Candidate → Validated Promotion
    ← GDQ-001 (independence definition) — 🟡 Principled via PD-016
    ← GDQ-002 (minimum threshold) — ⏳ Open
    ← GDQ-003 (reviewer authority) — 🟡 Principled via PD-017

  M056 Governance Reviewer Workflow
    ← GDQ-003 (reviewer authority) — 🟡 Principled via PD-017
    ← M055 must be designed first

  M057 Relationship Memory → Formation
    ← GDQ-004 (relationship depth signals) — ⏳ Open
    ← PersonContextStore adapter design

  M058 HH Trust Layer
    ← GDQ-005 (HH trust evidence) — ⏳ Open
    ← M057 prerequisite

Future (requires infrastructure not yet designed):
  Source independence tracking (venue/DC in provenance)
  Context breadth tracking
  Outcome history per concept
  Helping Hand trust measurement
```

---

## 7. The Architecture in One View

```
OBSERVATION LAYER
  Sensors, conversation, documents, vision, human speech
  All enter as Observation { source: "..." }
          ↓
TRANSLATION LAYER
  Professional rules applied by DC
  Translation { observationId, meaning, confidence }
          ↓
FORMATION LAYER
  form() — COS mechanism; DC provides content
  Understanding {
    summary, confidence, uncertainty, completeness,
    evidenceChain, contextSources    ← Milestone 047
  }
          ↓
JUDGEMENT LAYER
  JudgementEngine reads completeness + contextSources  ← Milestone 048
  Judgement { disposition, confidence, requiresHuman }
          ↓
AUTHORITY LAYER
  applyRiskFloor(judgement)          ← Milestone 049 (voluntary)
  AuthorityEngine { decision, authorityScore }
          ↓
ACTION LAYER
  ActionEngine — merges Judgement + Authority
  Action { disposition, kind, state }
          ↓
EXECUTION LAYER
  ExecutionEngine { outcome, evidence }
          ↓
REFLECTION LAYER
  Carries prior context:             ← Milestone 050
    priorJudgementDisposition
    priorUnderstandingConfidence
    priorUnderstandingCompleteness
  Reflection { disposition, findings, confidence }
          ↓
LEARNING LAYER
  Four cases distinguishable:        ← Milestone 050
    Case A: proceed + succeeded → reinforce
    Case B: proceed + failed → knowledge-gap proposal
    Case C: caution/partial + failed → formation-gap proposal
    Case D: confident + proceed + failed → observe (human review)
  LearningProposal {
    causationCategory,               ← Milestone 050
    proposedInheritanceScope,        ← Milestone 051
    informedByPersonContext          ← Milestone 047
  }
          ↓
GOVERNANCE LAYER
  evaluateGuard() — 8 invariants
  KnowledgeGovernanceEngine — human reviewer required
  applyApprovedChange() — sequenced: guard → mutation
          ↓
KNOWLEDGE LAYER
  KnowledgeGraph {
    Concept { lastReinforcedAt, challengedBy }  ← Milestone 053
    ConceptProvenanceStore (full history)
    getTrustSummary() — evidence window          ← Milestone 053
  }
          ↓
FORMATION INPUT (loop closes)
  governedConceptsToFormation()       ← Milestone 044
  → FormationKnowledge[]
  → form() — better future Understanding

RELATIONSHIP LAYER (parallel, separate from Knowledge)
  PersonContextStore {
    Consent-gated, session-scoped by default
    Person can inspect and remove
    Structurally separate from KnowledgeGraph
  }                                   ← Milestone 046
```

---

## 8. Principle Coverage Summary

| PD | Title | Code enforcement | Status |
|---|---|---|---|
| PD-001 | Organisational Model of CI | No direct code | Candidate |
| PD-002 | HH Must Be Orientable | No direct code | Candidate |
| PD-003 | Andy — Navigator | No direct code | Candidate |
| PD-004 | Talk.Get OS / Senses | No direct code | Preserved principle |
| PD-005 | LLM as Capability | form() Invariant 1 (partial); full boundary at LLM integration | Preserved principle |
| PD-006 | Conversation as Experience | humanSpeechToObservation(); Milestone 045 chain tests | Preserved principle |
| PD-007 | Human Memory Boundary | PersonContextStore consent gate; `clearSession()`; `"memory"` removed from ContextCategory (M054) | Preserved principle |
| PD-008 | Human Trust Boundary | PersonContextStore inspect/remove | Preserved principle |
| PD-009 | Context Has Authority | FormationInstitutionalContext.source; contextSources; informedByPersonContext | Preserved principle |
| PD-010 | Authority Requires Context | applyRiskFloor() exists; **adoption gap — not called in pipeline** | Preserved principle |
| PD-011 | Learning Requires Causation | causationCategory populated; **not surfaced to governance reviewer** | Preserved principle |
| PD-012 | Inheritance Boundary | deriveProposedInheritanceScope(); Invariant 6 structural gate | Preserved principle |
| PD-013 | Trust Requires Renewal | lastReinforcedAt; challengedBy; getTrustSummary(); **promotion path unenforced** | Preserved principle |
| PD-014 | Trust Is Evidenced, Not Scored | ConceptTrustSummary has no score field | Preserved principle |
| PD-015 | Relationship Development | PersonContextStore (consent/session/inspect/remove); **relational behaviour variation unenforced** | Preserved principle |
| PD-016 | Independent Reinforcement | Principled — no code yet; PD establishes creator ≠ source, validation never automatic | Preserved principle |
| PD-017 | Governance Reviewer Authority | Principled — no code yet; PD establishes class-based authority, creator ≠ approver | Preserved principle |

---

## 9. Single Most Important Action Before Next Milestone

**Answer Q5 — Audit `ContextStore.category === "memory"` usage.**

This is the only action that:
1. Can be done without new governance decisions
2. Unblocks a runtime enforcement gap (PD-007)
3. Does not require any source code changes to complete
4. Produces information needed for multiple future decisions

Run the audit in CANDIDATE_CONTEXTSTORE_MEMORY_BOUNDARY_AUDIT.md.
Report the results.
Then governance can decide Option A, B, or C.

All other open questions require governance decisions first.
This one requires only an honest look at the existing code.
