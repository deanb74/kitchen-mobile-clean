# Companion System Architecture (CSA)

**Status:** Canonical Architecture Specification

---

> This document defines the canonical architecture for every Helping Hand Digital Colleague.
>
> It specifies who the companion is, what capabilities it must have, how those capabilities connect, and how behavior is governed over time.

---

# Purpose

This standard ensures every Digital Colleague is:

- recognisably Helping Hand in character
- operationally useful in the human world
- safe and accountable in action
- evidence-producing by default
- governable through promotion and inheritance

This is the primary architecture specification for companion behavior across professions.

---

# Canonical Vocabulary

Use these names consistently across the runtime, Interaction Record, validation, proof, and governance surfaces.

Runtime may still emit a trace internally, but the governance artefact is the Interaction Record.

| Runtime | Interaction Record | Validation | Proof | Governance |
| --- | --- | --- | --- | --- |
| Context Envelope | Context | Context | Context | Context |
| Decision Record | Decision | Decision | Decision | Decision |
| Authority Record | Authority | Authority | Authority | Authority |
| Action Record | Action | Action | Action | Action |
| Evidence Packet | Evidence | Evidence | Evidence | Evidence |
| Reflection Record | Reflection | Reflection | Reflection | Reflection |
| Review Outcome | Review Outcome | Review Outcome | Review Outcome | Review Outcome |

The canonical governance structure is:

- Interaction Record
	- Context
	- Decision
	- Authority
	- Action
	- Evidence
	- Reflection
	- Review Outcome

---

# The First Law of Companion Systems

Every capability exists to improve outcomes for people.

If a capability cannot demonstrate benefit to people through evidence, it does not belong in the Companion System.

---

# Scope

CSA defines the full companion system stack:

1. Character
2. Perception
3. Expression
4. Cognition
5. Action
6. Memory and Evidence
7. Governance and Inheritance

All profession-specific implementations must inherit this stack before adding local capability.

---

# Constitutional Anchors

Character and behavior are inherited from:

- Constitution
- Oath
- Formation
- Academy

No capability may be implemented in a way that bypasses these anchors.

---

# Core Identity Requirement

A Digital Colleague is not defined only by what it can do.

It is defined first by who it is while doing it.

Character is therefore an architectural layer, not a style preference.

---

# Companion Capability Architecture

## 0. Character Capabilities (Who The Companion Is)

**Purpose:** Ensure behavior remains recognisably Helping Hand regardless of profession.

Capabilities include:

- Respect
- Honesty
- Curiosity
- Humility
- Compassion
- Responsibility
- Dignity

Required implementation:

- character policy profile
- behavioral guardrails
- response tone constraints
- drift detection during reflection
- correction pathways when character breaches are detected

Required outputs:

- character compliance signal on each meaningful interaction
- character breach event when boundaries are crossed

---

## 1. Perception Capabilities (Sensing The World)

**Purpose:** Reliably interpret human and environmental signals.

Capabilities include:

- Vision (camera as eyes)
- Hearing (microphone as ears)
- Environment awareness (time, location, role, shift, network, equipment context)

Required implementation:

- camera capture and quality checks
- speech-to-text with confidence
- context envelope attached to each action request

Required outputs:

- normalized perception record
- confidence and uncertainty markers

---

## 2. Expression Capabilities (Communicating Clearly)

**Purpose:** Communicate guidance, risk, and intent in a respectful, useful form.

Capabilities include:

- Speech (speaker as voice)
- Structured conversational explanation (what, why, boundaries, next step)
- Multimodal response (voice, text, visual markup, actions)

Required implementation:

- response templates with policy-grounded explanations
- text-to-speech style controls by role and severity
- interruption and clarification handling

Required outputs:

- explanation record
- user acknowledgement or clarification request

---

## 3. Cognitive Capabilities (Thinking As A Companion)

**Purpose:** Turn signals into safe decisions under authority boundaries.

Capabilities include:

- Understanding
- Judgement and prioritization
- Authority and boundary enforcement

Required implementation:

- intent and entity extraction
- rules plus assisted ranking with explicit reasons
- role and permission checks with escalation triggers

Required outputs:

- decision record (recommended action, reason, confidence)
- authority record (allow, caution, require-human, deny)

---

## 4. Action Capabilities (Doing Work Reliably)

**Purpose:** Execute or guide work in a dependable, auditable way.

Capabilities include:

- guided execution for human workflows
- autonomous micro-actions for low-risk approved tasks
- exception handling and safe handoff

Required implementation:

- deterministic action orchestration
- idempotent execution paths
- retries with backoff and conflict-safe sync

Required outputs:

- action outcome record
- handoff record for unresolved or high-risk cases

---

## 5. Memory and Evidence Capabilities (Learning Safely)

**Purpose:** Preserve operational reality as traceable evidence.

Capabilities include:

- operational memory
- automatic evidence generation
- reflection-ready summaries

Required implementation:

- event logging schema with provenance
- evidence attachments (image, transcript, notes, system trace)
- retention and correction policies

Required outputs:

- evidence packet per significant action
- retrievable operational timeline

---

## 6. Governance and Inheritance Capabilities (Evolving Safely)

**Purpose:** Convert local success into shared capability only when proven.

Capabilities include:

- capability registry management
- promotion dossier generation
- inheritance review and decision capture
- continuous validation after inheritance

Required implementation:

- promotion workflow
- cross-profession impact assessment
- governance decision logging
- drift monitoring and retirement criteria

Required outputs:

- promotion candidate record
- inheritance review decision
- post-inheritance validation status

---

# Runtime Contracts

Every Digital Colleague implementation must support these records:

1. Context Envelope
- who requested
- role and authority scope
- location and shift context
- current operational conditions

2. Decision Record
- perceived situation
- recommended action
- rationale and confidence
- unresolved uncertainty

3. Authority Record
- permission outcome
- boundary conditions
- escalation requirement

4. Action Record
- execution attempt
- observed outcome
- side effects

5. Evidence Packet
- linked records
- media and notes
- provenance metadata

6. Governance Packet
- promotion proposition
- cross-profession assessment
- decision and owner

---

# Operational Modes

All companions must behave correctly in:

1. Online mode
- full services available
- real-time sync

2. Offline mode
- local execution where safe
- deferred sync with evidence integrity

3. Degraded mode
- uncertain sensing or partial service outage
- explicit fallback and human handoff

---

# Safety And Humanity Constraints

## Key Principle

Companion Intelligence should reduce effort, not create it.

A companion must never:

- hide uncertainty
- simulate confidence it does not have
- bypass authority boundaries
- perform prohibited actions for convenience
- change shared capability without governance

A companion must always:

- explain reasoning in human terms
- preserve dignity in tone and behavior
- keep auditable evidence of meaningful actions
- escalate when safety or authority requires it

---

# CSA-0001 Temperature Workflow Integration (V1)

This implementation path wraps the existing Kitchen Daily Checks temperature workflow with governance runtime records.

The existing save action remains intact.

The runtime adds context, decision, authority, evidence and reflection around that action.

## Operational Flow

Staff
-> Temperature Entry
-> Companion Orchestrator
-> Context Envelope
-> Decision Engine
-> Authority Engine
-> Existing Temperature Save
-> Evidence Engine
-> Reflection Engine
-> Temperature Stored

Plus:

- CSA Interaction Record Stored
- Governance Evidence Available

## Stage 1: Intercept Before Save

Intercept `recordTemperature(...)` (or equivalent submission boundary).

Before the save executes, create a Context Envelope.

## Stage 2: Decision Engine Interpretation

Ask the Decision Engine what is happening.

Example interpretation shape:

- Reading type: Temperature
- Equipment: Walk-in fridge
- Expected range: 0-5C
- Observed: 9.2C
- Confidence: 99%
- Reason: Temperature exceeds permitted range

## Stage 3: Authority Assessment

Authority answers two different questions:

- Can this staff member record this event? (yes/no)
- Can the companion close this issue autonomously? (yes/no)

Example V1 outcome:

- Record allowed: Yes
- Auto-close allowed: No
- Human corrective action required

## Stage 4: Existing Save Executes

Existing persistence and endpoint logic execute unchanged.

This is additive governance wrapping, not a workflow replacement.

### Stage 5 - Interaction Record Created

The Companion Runtime assembles the complete Interaction Record containing:

- Context
- Decision
- Authority
- Action
- Evidence
- Reflection
- Review Outcome

The Interaction Record becomes the canonical governance artefact for operational review, validation and organisational learning.

## Implementation Status

**CSA-0001 — Companion Runtime**

Status: ✓ Validated

Validation completed:

- ✓ Runtime contracts implemented
- ✓ Positive validation harness passed
- ✓ Negative validation harness passed
- ✓ Interaction Record generated
- ✓ Governance review workflow operational
- ✓ Proof and validation artefacts generated

This architecture has been validated through CSA-0001 and is approved as the foundation for operational workflow integration.

**Next milestone**

CSA-0002 — Live Workflow Integration

Objective: Govern an existing Kitchen Daily Checks temperature recording workflow using the Companion Runtime without changing the user experience.

---

# Implementation Order

1. Character baseline
2. Perception and expression baseline
3. Cognitive and authority guardrails
4. Evidence-first action execution
5. Reflection, promotion, and inheritance loop

---

# Conformance Requirement

A Digital Colleague is considered CSA-conformant only when:

- all layers are implemented
- required records are emitted
- governance loop is active
- character remains stable across contexts

Local capability may extend this architecture, but may not replace or bypass it.

---

# Closing Principle

Helping Hand does not scale by adding features first.

Helping Hand scales by preserving character, governing action, and inheriting only what evidence has proven.