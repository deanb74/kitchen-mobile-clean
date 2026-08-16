# HH-0000 Context Door Evidence Specimen Companion Intelligence Boundary Review

**Status:** Pre-implementation boundary review  
**Date:** 2026-08-09  
**Subject:** `docs/formation/HH0000_CONTEXT_DOOR_EVIDENCE_SPECIMEN.md`  
**Purpose:** Determine whether the specimen defines the Context Door evidence boundary sufficiently before implementation.

---

## Scope

This review compares the specimen with existing Companion Intelligence, understanding, authority, evidence, context, memory, and retention boundaries.

It does not:

- implement the Context Door;
- authorise implementation;
- redesign Companion Intelligence;
- create new doctrine;
- rewrite the specimen;
- declare Andy formed or the Context Door proven.

The review distinguishes:

1. boundaries already represented;
2. boundaries missing from the expected evidence;
3. evidence that must exist before implementation.

---

## Sources Reviewed

Primary specimen and preparation:

1. `docs/formation/HH0000_CONTEXT_DOOR_EVIDENCE_SPECIMEN.md`
2. `docs/formation/HH0000_ANDY_FIRST_LIVE_FORMATION_CONVERSATION.md`
3. `docs/formation/HH0000_ANDY_FIRST_LIVE_FORMATION_CONVERSATION_RUNTIME_CAPABILITY_MAPPING.md`
4. `docs/formation/HH0000_ANDY_FIRST_LIVE_FORMATION_CONVERSATION_MINIMUM_RUNTIME_ADDITION.md`
5. `docs/formation/HH0000_ANDY_FIRST_LIVE_FORMATION_CONVERSATION_TECHNICAL_EXECUTION_PLAN.md`

Companion Intelligence and governance:

1. `constitution/02-CONSTITUTION.md`
2. `constitution/05-AUTHORITY-AND-STEWARDSHIP.md`
3. `constitution/COMPANION_INTELLIGENCE.md` — Draft constitutional principle
4. `docs/architecture/COMPANION_INTELLIGENCE.md`
5. `docs/architecture/COMPANION-INTELLIGENCE-CORE.md`
6. `docs/architecture/ARCHITECTURE_STATE_REPORT_POST_PD015.md`
7. `docs/architecture/ARCHITECTURAL_BOUNDARY_REPORT_2026_08_06.md`
8. `docs/architecture/GOVERNANCE_DECISION_QUEUE_2026_08_06.md`

Understanding, evidence, context, and memory:

1. `docs/architecture/CANONICAL-REASONING-RECORD.md`
2. `docs/architecture/REASONING-LIFECYCLE.md`
3. `docs/architecture/OBSERVATION_RETENTION.md`
4. `docs/architecture/UNDERSTANDING_ENGINE.md`
5. `docs/theory/001-THEORY-OF-MEMORY.md`
6. `docs/theory/007-THEORY-OF-CONTEXT.md`
7. `docs/philosophy/UNDERSTANDING_LIFECYCLE.md`
8. `lib/annie/relationship/PersonContextStore.ts`
9. `lib/annie/formation/__tests__/milestone-045-conversation-boundary.test.ts`
10. `lib/annie/formation/__tests__/milestone-047-context-source-authority.test.ts`

---

## Review Conclusion

The specimen defines the purpose and human meaning of the Context Door well enough to continue pre-implementation work.

It does not yet define every evidence boundary required for implementation.

Seven boundaries remain open:

1. field-level Observation-to-Understanding lineage;
2. governance of Andy's emitted questions and restatement as conversational Actions;
3. human identity, source authority, and conflicting human context;
4. temporal validity and staleness of current context;
5. correction and supersession history;
6. consent, retention, inspection, removal, and de-identification;
7. separation of contextual memory from enduring learning or shared knowledge.

Implementation should not begin until these boundaries are either represented in the specimen or explicitly excluded from the first implementation by a human-governed scope decision.

---

## Boundaries Already Represented

### 1. Observation is not treated as complete understanding

The specimen separates repository evidence, runtime interpretation, human context, and unresolved material.

This aligns with the Companion Intelligence sequence:

```text
Observation -> Translation -> Context -> Understanding
```

### 2. Human context is not inferred

The specimen repeatedly states that human context is supplied directly and that absent context remains unknown.

### 3. Understanding remains distinct from alignment

The specimen records updated Understanding as partial while allowing a human to mark the restatement aligned. This correctly avoids treating alignment as proof that all knowledge is complete.

### 4. Alignment remains human-owned

The alignment decision has a named human owner and explicit reasons. Andy does not assess his own alignment.

### 5. Authority does not expand

The specimen states that updated understanding and alignment do not authorise implementation, contribution, or action.

### 6. Uncertainty remains visible

Unresolved items survive clarification, restatement, alignment, and the expected memory outcome.

### 7. Capability claims remain bounded

The specimen is clearly marked illustrative, non-executed, and insufficient to prove runtime capability or completed formation.

These boundaries should be preserved unchanged.

---

## Missing Boundary 1: Observation-to-Understanding Lineage

**Status:** Required before implementation

### Existing principle

Human speech enters Companion Intelligence as an Observation. Translation precedes Understanding. Every material meaning must remain linked to evidence.

### What the specimen currently contains

The specimen provides prose provenance labels and named source sections.

### What is missing

The expected record does not show:

1. a stable Observation ID for each human statement;
2. whether the source is repository, human, or runtime;
3. the Translation derived from each Observation;
4. the exact evidence IDs contributing to initial and updated Understanding;
5. which parts of the restatement trace to which formed Understanding and human clarification;
6. which human inputs were unresolved and therefore did not become asserted meaning.

### Required evidence boundary

The specimen must demonstrate a traceable chain such as:

```text
Human statement
  -> human Observation ID
  -> provenance-preserving Translation
  -> updated FormationInput
  -> updated Understanding evidence chain
  -> bounded restatement reference
```

The chain must preserve the original human wording without silently promoting it to universal truth.

---

## Missing Boundary 2: Andy's Responses Are Governed Actions

**Status:** Required before implementation

### Existing principle

Companion Intelligence Core separates Understanding, Judgement, Authority, and Action. Existing conversation evidence establishes that responses pass through Judgement and Authority before becoming Actions.

### What the specimen currently contains

The specimen includes Andy's context questions and closing restatement as expected output.

### What is missing

The expected evidence does not show:

1. the Judgement that selected asking or restating as the appropriate response;
2. the Authority result governing that response;
3. the Action or communication record actually presented to the human;
4. preservation of `human-required` or insufficient-understanding signals;
5. evidence that a generated response did not bypass the governed conversation boundary.

### Required evidence boundary

Before implementation, the expected record must state how each Andy utterance is evidenced as a governed conversational Action.

This does not require a recommendation workflow. It requires preserving the existing rule that a response does not bypass Judgement and Authority merely because the flow is formation-specific.

---

## Missing Boundary 3: Human Identity, Source Authority, and Conflict

**Status:** Required before implementation

### Existing principle

Context depends upon who is speaking. Authority is entrusted, not assumed. Conflicting material must not be silently combined.

### What the specimen currently contains

The specimen names MARC as an illustrative provider and alignment owner.

### What is missing

The expected evidence does not define:

1. how the real human participant is identified;
2. why that participant is authorised to supply role, ownership, priority, and alignment context;
3. whether the same person may both supply context and confirm alignment;
4. what happens if two humans provide conflicting current context;
5. how a human interpretation differs from an institutionally settled fact;
6. whether "confirmed human context" means confirmed as genuinely supplied or confirmed as objectively true.

### Required evidence boundary

The record must preserve human identity and authority scope and must treat supplied statements as attributable human context, not truth merely because a human supplied them.

Conflict must remain visible until an authorised human resolves it.

This review does not decide which person or role has that authority.

---

## Missing Boundary 4: Temporal Validity and Staleness

**Status:** Required before implementation

### Existing principle

Context may change while information remains unchanged. Current context governs current interpretation. Memory should retain only what still matters.

### What the specimen currently contains

The specimen includes provider and illustrative timing labels, but no validity lifecycle.

### What is missing

The expected evidence does not show:

1. when each current-context statement became effective;
2. whether it is valid only for this conversation, this formation stage, or a longer period;
3. when it expires or must be reviewed;
4. how Andy recognises that remembered context may now be stale;
5. whether a later conversation must reconfirm the context before reuse.

### Required evidence boundary

Every retained current-context item needs an explicit scope and review or expiry rule. Absent a human decision to retain it beyond the session, it must not silently become durable current truth.

---

## Missing Boundary 5: Correction and Supersession History

**Status:** Required before implementation

### Existing principle

A later reasoning stage may not silently rewrite an earlier stage. Corrections must be appended with provenance, and lifecycle continuity must be preserved.

### What the specimen currently contains

The specimen records one correction and explains its effect.

### What is missing

The expected record does not show:

1. a stable reference from the correction to the inference being corrected;
2. whether the prior inference remains visible;
3. who supplied the correction and when;
4. whether the correction replaces, qualifies, or contradicts the prior item;
5. the transition history from initial interpretation to corrected understanding;
6. how a later correction would be appended after the record is closed.

### Required evidence boundary

The evidence specimen must model correction as an attributable lifecycle event, not as replacement text.

---

## Missing Boundary 6: Consent, Retention, Inspection, Removal, and De-identification

**Status:** Governance blocker before persistent implementation

### Existing principle

Conversation does not automatically become memory. Relationship memory requires explicit consent. People must be able to inspect and remove their context. Session context is released. Retained observations should be minimal, and relationship-informed learning requires de-identification review.

### What the specimen currently contains

The specimen proposes retention of:

1. human wording;
2. provider identity;
3. a feedback route;
4. relationship understanding;
5. unresolved questions;
6. a memory outcome.

It also leaves transcript retention as an unresolved item.

### What is missing

The expected evidence does not show:

1. whether the human consented to persistence;
2. what exact content is session-only;
3. what exact content may become relationship memory;
4. a retention period or expiry;
5. inspection and removal rights;
6. whether raw human wording is retained after Understanding is formed;
7. whether any personal or sensitive material requires redaction;
8. how relationship-informed material is marked for de-identification review;
9. whether an incomplete or rejected alignment record is retained.

### Existing governance dependency

`docs/architecture/ARCHITECTURE_STATE_REPORT_POST_PD015.md` records relationship memory entering formation as deferred. `docs/architecture/GOVERNANCE_DECISION_QUEUE_2026_08_06.md` retains open relationship-governance questions under GDQ-004.

### Required evidence boundary

Before persistent implementation, humans must decide whether the first Context Door is:

1. session-only with no relationship-memory write; or
2. consented persistent context with explicit retention, inspection, removal, expiry, and de-identification boundaries.

This review does not settle that governance decision.

---

## Missing Boundary 7: Contextual Memory Must Not Become Shared Learning Automatically

**Status:** Required before implementation

### Existing principle

Understanding may produce a memory candidate, but growth is not automatic. Reflection is advisory. Learning is proposal-only. Shared knowledge requires validation and governance.

### What the specimen currently contains

The expected memory outcome contains a lesson, principles, relationship understanding, mentor feedback, formation status, unresolved questions, and provenance.

### What is missing

The evidence does not explicitly state:

1. whether the lesson is session memory, relationship memory, candidate memory, or governed knowledge;
2. that the listed principles are references to governing principles rather than newly learned universal doctrine;
3. that one aligned conversation cannot reinforce or validate a shared concept automatically;
4. that no KnowledgeGraph or universal formation write follows from the memory outcome;
5. what human review would be required before any learning proposal is created.

### Required evidence boundary

The specimen must classify the memory outcome and state its permitted destinations.

For this first flow, contextual alignment evidence must remain separate from shared knowledge and universal learning unless a later governed lifecycle explicitly approves promotion.

---

## Additional Required Evidence Case: Non-Aligned Closure

**Status:** Required before implementation, but not a new architectural boundary

The specimen shows an aligned example. The technical plan names partly aligned and not yet aligned states, but no expected evidence specimen demonstrates them.

At least one pre-implementation example should show:

1. a human marking the restatement partly aligned or not yet aligned;
2. corrections remaining open;
3. no aligned completion;
4. no durable memory write unless explicitly permitted;
5. no progression to action or contribution.

This evidence is needed to prove that failure or incompleteness is a valid outcome rather than a path the runtime will force closed.

---

## Smallest Pre-Implementation Closure Set

Before coding, the following evidence is sufficient to close this review:

1. add field-level Observation, Translation, Understanding, and restatement references to the specimen;
2. add the governed response chain expected for Andy's questions and restatement;
3. define real human identity, context-supply authority, alignment authority, and conflict handling;
4. define effective scope, review time, and expiry behavior for current context;
5. model corrections as append-only, attributable lifecycle events;
6. record the human decision between session-only handling and consented persistent memory;
7. classify the memory outcome and prohibit automatic shared-learning promotion;
8. add one partly aligned or not yet aligned evidence example;
9. record human answers to the specimen acceptance questions.

No broader Companion Intelligence design is required to answer these questions.

---

## Readiness Answer

### Have we defined the thing correctly?

**Partly.**

The specimen correctly defines the human purpose of the doorway:

1. inherited evidence remains distinct from human context;
2. Understanding is formed rather than retrieved;
3. uncertainty remains visible;
4. Andy restates rather than decides;
5. humans own alignment and authority.

The evidence custody and runtime-governance boundary is not yet complete.

Implementation is therefore **not yet justified**.

The next work should remain pre-implementation evidence definition, limited to the smallest closure set above.

---

## Traceability

**Principle:** `constitution/02-CONSTITUTION.md`; `constitution/05-AUTHORITY-AND-STEWARDSHIP.md`; Draft Companion Intelligence principle used as supporting, not superseding, guidance.  
**Theory:** `docs/theory/001-THEORY-OF-MEMORY.md`; `docs/theory/007-THEORY-OF-CONTEXT.md`.  
**Architecture:** Companion Intelligence Core, Observation Retention, canonical reasoning record, existing person-context boundaries.  
**Engineering:** Existing conversation-boundary, context-source, consent, and de-identification tests.  
**Milestone:** Not Applicable — implementation remains unauthorised.  
**Evidence:** Context Door specimen and the missing boundary evidence identified in this review.

---

## Status

Companion Intelligence evidence-boundary review recorded.  
Seven missing boundaries identified.  
Implementation not yet justified.  
No code changed.  
No architecture or governance decision settled.  
No capability claim made.