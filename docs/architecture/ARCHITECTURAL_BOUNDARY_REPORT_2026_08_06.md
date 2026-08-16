# Architectural Boundary Report — Post-Milestones 043–053

**Date:** 2026-08-06
**Purpose:** Identify structural boundaries, gaps between documentation and enforcement, and drift risks after ten implementation milestones.
**Scope:** PD-001 through PD-014; Milestones 043–053.
**Constraint:** No implementation plans. Analysis only.

---

## 1. Capabilities Now Proven (Test Evidence)

These claims are backed by automated tests that will fail if the behaviour changes.

| Capability | Test location | What it proves |
|---|---|---|
| Governance chain: `applyApprovedChange()` | `lib/knowledge-governance/__tests__/applyApprovedChange.test.ts` | Record → Guard → Graph |
| Governed memory reaches formation | `lib/annie/formation/__tests__/milestone-044-learning-loop.test.ts` | KnowledgeGraph concept → `form()` |
| Human speech enters as Observation | `lib/annie/conversation/__tests__/listen.test.ts` | Source: "human" is the entry point |
| Responses pass through JudgementEngine and AuthorityEngine | `lib/annie/formation/__tests__/milestone-045-conversation-boundary.test.ts` | PC3 |
| Consent required for relationship memory | `lib/annie/relationship/__tests__/PersonContextStore.test.ts` | No entry without `consentedAt` |
| Source authority survives formation | `lib/annie/formation/__tests__/milestone-047-context-source-authority.test.ts` | `contextSources` in Understanding |
| `"relationship"` source triggers de-identification requirement | `lib/annie/formation/__tests__/milestone-047-context-source-authority.test.ts` | PC5–PC7 |
| High-confidence failure → observe, not propose | `lib/learning/__tests__/milestone-050-causation.test.ts` | PC5 — Case D |
| Knowledge-gap → venue scope (not profession) | `lib/knowledge-governance/__tests__/inheritanceScopeFromLearning.test.ts` | PC4 |
| `lastReinforcedAt` set only on reinforce | `lib/knowledge/__tests__/milestone-053-trust-renewal.test.ts` | PC1–PC3 |
| Constitutional concepts remain immutable | `lib/knowledge-governance/__tests__/writeGuard.test.ts` | Invariant 1 |
| Single-source cannot inherit profession-wide | `lib/knowledge-governance/__tests__/writeGuard.test.ts` | Invariant 6 |

---

## 2. Principles Now Enforced in Code

These PD principles have structural code enforcement — a developer cannot violate them without a test failing.

### Structurally enforced (test will fail on violation)

| Principle | Enforcement | Location |
|---|---|---|
| PD-005: LLM cannot bypass formation | `form()` Invariant 1 — no invented meaning | `platform/cos/understanding-formation/formation.ts` |
| PD-007: Personal disclosure cannot persist without consent | `PersonContextStore.addEntry()` throws without `consentedAt` | `lib/annie/relationship/PersonContextStore.ts` |
| PD-007: Session context is released | `PersonContextStore.clearSession()` removes all session entries | Tested in PC1 |
| PD-009: Source authority survives formation | `FormationInstitutionalContext.source?` carried through adapters | Tested in PC1–PC4 |
| PD-009: Relationship context requires de-identification review | `LearningProposal.informedByPersonContext` → governance requires reviewer | Tested in PC6–PC7 |
| PD-012: Single-source cannot inherit profession-wide | `evaluateGuard()` Invariant 6 | Rejects `"single-source"` + `"hospitality"` |
| PD-013: Constitutional concepts immutable | `evaluateGuard()` Invariant 1 + `KnowledgeGraphMutation` check | Both layers enforced |
| PD-013: Edit ≠ confirmation | `lastReinforcedAt` set only on `"reinforce"` intent | Tested in PC2–PC3 |
| PD-014: No trust score | `ConceptTrustSummary` has no numeric trust field | Type constraint |

---

## 3. Principles That Exist Only as Governance Documentation

These PD principles are stated, reasoned, and recorded — but no code currently enforces them.
A developer who does not read the PDs cannot be stopped by the codebase.

### PD-005: LLM boundary at runtime

The principle that an LLM's output must enter as an `Observation`, not bypass formation, is documented.

**Gap:** No LLM integration exists in the codebase. When it arrives, nothing in the type system or tests will enforce the boundary. A developer could wire an LLM response directly into the response text without going through `Observation → Translation → form()`.

**Risk:** First LLM integration point.

---

### PD-006: Responses are Actions (partial enforcement)

The Milestone 045 boundary tests prove that `JudgementEngine → AuthorityEngine → ActionEngine` handles conversational responses. This chain exists and is tested.

**Gap:** `judgementToConversationInstruction()` also exists and returns a string directly — no `AuthorityEngine` pass-through required by the function's type signature. A caller using this helper bypasses the authority boundary that PD-006 requires.

**Specific risk:** A developer building a conversation feature may use `judgementToConversationInstruction()` as a simpler path. The function's `@deprecated` predecessor (`speakJudgement()`) is already marked. But `judgementToConversationInstruction()` itself is not constrained to require an `ActionEngine` step.

---

### PD-010: `applyRiskFloor()` adoption is voluntary

The governed translation from `Judgement.disposition` to minimum `riskLevel` exists and is tested.

**Gap:** `applyRiskFloor()` is only called in its own test file. No code in `lib/annie/`, `lib/os/`, or any conversation boundary requires its use. The Milestone 045 conversation boundary tests still call `AuthorityEngine.assess()` with `riskLevel: "low"` directly, without the floor applied.

**Specific risk:** Every new action chain added in future milestones may silently understate authority risk by supplying a low risk level without considering `Judgement.disposition`. The function exists; its adoption is not enforced.

---

### PD-011: `causationCategory` is optional

`LearningProposal.causationCategory?` exists. `deriveCausationCategory()` is called in `LearningEngine.buildProposal()`.

**Gap:** `causationCategory` is optional. `KnowledgeGovernanceEngine` does not check for it before approving a change. A governance reviewer never sees it in the current approval flow — it exists on the `Learning` object but is not surfaced in `BuildKnowledgeGovernanceInput`. A proposal without a causation category is fully approvable.

---

### PD-012: `proposedInheritanceScope` is optional

`LearningProposal.proposedInheritanceScope?` exists. `deriveProposedInheritanceScope()` is called.

**Gap:** Identical to PD-011. `proposedInheritanceScope` is optional. The governance engine does not read it. A reviewer approving a concept with `inheritsTo: ["hospitality"]` receives no signal from the proposal that the DC assessed the appropriate scope as `"venue"`.

---

### PD-013: `"candidate"` → `"validated"` promotion is ungoverned

`Concept.status === "validated"` can be caller-assigned in `addConcept()` (with explicit override) and in `updateConcept()` (via the `proposed` concept object). No reinforcement threshold, no independent source check, no named authority for promotion.

**Gap:** The most significant ungoverned transition in the current system. A concept can be `"validated"` after a single governance approval from a single reviewer with no reinforcement. `getTrustSummary()` surfaces this via `requiresReview: true` for zero-reinforcement validated concepts — but no code prevents the assignment.

**Specific risk:** Any caller constructing a `proposedConcept` before calling `applyApprovedChange()` can set `status: "validated"`.

---

### PD-007/PD-008: `ContextStore.category === "memory"` is undefined

`ContextStore` accepts entries with `category: "memory"` via `addEntry()` without any consent mechanism, governance requirement, or defined scope. The category exists in the type; its boundaries do not.

**Gap:** A developer wiring `OnboardingEngine.addObservation()` can add person-level context (staffing concerns, personal disclosures) under `category: "team"` or `category: "memory"` with `source: "conversation"` — and it persists indefinitely with no deletion mechanism.

---

## 4. Where Future Implementation Risks Turning Governance Decisions into Developer Assumptions

### Risk A — First LLM integration point (PD-005)

When an LLM is introduced, the developer must choose how its output enters the pipeline.

The correct path (per PD-005) is:
```
LLM output → Observation { source: "llm" } → Translation → form() → Understanding
```

The easy path is:
```
LLM output → Understanding.summary (direct assignment)
```

Nothing in the type system prevents the easy path. The principle exists in PD-005; the type constraint does not.

**The governance decision that must not become a developer assumption:** "LLM output is an observation, not a conclusion."

---

### Risk B — Conversation response chains (PD-006, PD-010)

Every new conversation feature built on top of Milestone 045 will need to decide whether to route responses through `ActionEngine → ExecutionEngine` (the governed path) or use `judgementToConversationInstruction()` directly.

The governed path is tested. The direct path is easier. The principle says responses are Actions.

**The governance decision that must not become a developer assumption:** "Producing a response string is not the same as taking an authorised action."

---

### Risk C — New action chains and `applyRiskFloor()` (PD-010)

Every new capability that calls `AuthorityEngine.assess()` independently of `JudgementEngine` will produce an authority record without the judgement-quality risk floor.

The function exists. No test outside `authorityFromJudgement.test.ts` uses it. The session completion summary describes it as part of the chain, but the chain tests don't enforce its use.

**The governance decision that must not become a developer assumption:** "The `riskLevel` in `AuthorityContext` reflects the quality of the DC's understanding, not just the action's nominal risk."

---

### Risk D — `causationCategory` and governance reviewer workflow (PD-011, PD-012)

`LearningProposal.causationCategory` and `proposedInheritanceScope` carry the DC's assessment of why learning occurred and how broadly it should travel.

Neither field is currently surfaced to the governance reviewer. The reviewer approves based on `rationale`, `changeIntent`, and `proposedContent` — not on the structured causation and inheritance proposals.

**The governance decision that must not become a developer assumption:** "The governance reviewer has seen the causation category and proposed scope, not just the proposal text."

If a future governance UI is built without surfacing these fields, the governance decisions made in PD-011 and PD-012 quietly become no-ops.

---

### Risk E — Knowledge promotion without governed criteria (PD-013)

When a developer needs to mark a concept as `"validated"`, the path of least resistance is to set `status: "validated"` in the `proposedConcept` object passed to `applyApprovedChange()`. No threshold check exists.

The Milestone 053 Implementation Plan Step 4 explicitly deferred the governed promotion path and documented the questions that need answering:
- Minimum reinforcement count
- Independent source requirement
- Named authority for promotion

**The governance decision that must not become a developer assumption:** "Minimum reinforcement count is a governance policy, not a developer choice."

---

## 5. Contradictions and Missing Links Between PD-001 and PD-014

### Missing link: PD-007 and PD-009

**PD-007** requires personal disclosures to default to session scope — not persisted.
**PD-009** requires context authority to survive into Understanding.

The missing link: when relationship memory is used in formation (the `relationshipEntriesToFormation()` adapter that does not yet exist), the data flows through `FormationInstitutionalContext` with `source: "relationship"`. The source authority is preserved (PD-009 ✓). But the data itself is only session-scoped if `PersonContextStore.clearSession()` is called — there is no architectural mechanism that auto-clears `FormationInstitutionalContext` entries at session end.

The two principles are compatible only if the caller manages session scope. This is a documentation assumption, not a structural guarantee.

---

### Missing link: PD-010 and PD-049

**PD-010** establishes that authority is contextual — risk level must reflect the DC's understanding quality.
**Milestone 049** implemented `applyRiskFloor()` as the mechanism.

The missing link: `applyRiskFloor()` is never called in the main pipeline. It is the mechanism without a home. The principle is stated; the mechanism exists; the connection between them is absent from every production path.

---

### Tension: PD-011 (hypothesis) and the governance approval flow

**PD-011** says a learning proposal is a governed hypothesis, not a conclusion.

The governance approval flow (`KnowledgeGovernanceEngine`) reads `Learning.proposal` to build `ApprovedKnowledgeChange`. It uses `proposal.whatShouldChange` as `proposedContent`. It does not read `proposal.causationCategory` or `proposal.proposedInheritanceScope`.

The tension: governance approves the proposal text without seeing the DC's structured assessment of why and how broadly it should travel. The hypothesis is partially blind to its own structure.

---

### Tension: PD-013 (`"validated"` status) and PD-014 (no trust score)

**PD-013** says trust requires renewal. The evidence surface (`getTrustSummary()`) flags `requiresReview: true` for unearned `"validated"` status.

**PD-014** says trust is evidenced, not scored.

The tension: `"validated"` is a binary label that functions like a score — it signals trustworthy without expressing the evidence behind it. A concept with `status: "validated"`, `reinforcementCount: 0`, and `challengedBy: []` looks trustworthy in the status field but `requiresReview: true` in the trust summary. The status and the evidence picture are inconsistent — and the status is what most callers read.

The resolution per PD-014 is that `getTrustSummary()` is the authoritative trust view. But the `status` field remains as an easily accessible misleading shortcut.

---

### Absent PD: The Conversation-Person Relationship

PD-004 through PD-006 cover hardware senses and conversation as experience.
PD-007 through PD-008 cover human memory and trust.

There is no PD governing the longer-term relationship between a DC and a specific person. PD-007 governs individual session memory. PD-008 governs consent. But neither covers:

- How a DC relationship develops over time
- What signals indicate a relationship has deepened (increased willingness to share context)
- How Helping Hand trust (per PD-014) is measured and tracked

The relationship layer exists in `PersonContextStore` but has no governing principle beyond "do not persist without consent." The positive principles — how trust grows, what signals it, how it is acknowledged — are missing from the PD register.

---

## Summary Assessment

**Structurally sound:** The core governance chain from governance approval through write guard to mutation is well-protected with layered tests. Constitutional immutability is doubly enforced.

**Well-documented but not enforced:** PD-010's `applyRiskFloor()` adoption, PD-011's `causationCategory`, PD-012's `proposedInheritanceScope` — all exist as optional fields with no pipeline enforcement.

**Single most important ungoverned transition:** `"candidate"` → `"validated"` status promotion. This is the clearest place where a developer assumption could quietly replace a governance decision.

**Single most important missing connection:** `applyRiskFloor()` has no caller in the main pipeline. It proves the principle; it does not yet protect the practice.

**Single most important missing principle:** The positive relationship development model — how does a DC relationship deepen, and what signals Helping Hand trust in PD-014's sense B?

The architecture is internally consistent. The risk is not contradiction — it is **adoption gap**: principles proven in isolation tests but not enforced where developers will actually build.
