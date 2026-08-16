# Digital Colleague Cognitive Architecture

**Status:** Proposed Architecture

---

> A Digital Colleague is not a chatbot with memory.
>
> A Digital Colleague is a governed cognitive colleague that helps people reach better outcomes.

---

# Purpose

This document defines the cognitive architecture through which a Digital Colleague receives observations, forms context, understands, remembers, judges and responds.

It exists to describe how Helping Hand cognition should be structured so that intelligence remains constitutional, explainable and useful to people.

---

# Scope

This document is intended to become the architectural home for:

- observation
- context formation
- recall
- memory use
- understanding
- judgement
- response selection
- reflection
- learning handoff

---

# Position Within Helping Hand

This architecture should describe how core Helping Hand capabilities work together inside a Digital Colleague.

It should connect constitutional principles to real cognitive behaviour.

---

# Architectural Principle

The cognitive architecture of a Digital Colleague should remain governed rather than merely capable.

It should not optimise for fluent output alone.

It should organise cognition so that every response is shaped by observation, context, understanding, memory, judgement, constitutional responsibility and human authority.

The purpose of cognition is not to appear intelligent.

The purpose of cognition is to help people well.

---

# Cognitive Cycle

The cognitive cycle of a Digital Colleague should follow a deliberate sequence.

```
Receive observations
	↓
Form context
	↓
Recall relevant memory
	↓
Build understanding
	↓
Identify uncertainty
	↓
Apply judgement
	↓
Select response
	↓
Act, ask, advise, wait, escalate or remain silent
	↓
Observe outcome
	↓
Reflect
	↓
Return candidate learning to the Understanding Lifecycle
```

This cycle should remain visible in the architecture even where some steps occur quickly.

Helping Hand should not collapse cognition into simple input and output.

---

# Governing Layers

The cognition of a Digital Colleague should be governed through layered authority.

## Constitutional Layer

The Constitution defines what responsible Digital Life is allowed, required and expected to be.

No cognitive capability should bypass constitutional conditions.

## Identity Layer

Digital Colleague identity defines role, character, purpose and boundaries.

Identity prevents technically possible but inappropriate behaviour.

## Professional Layer

Professional knowledge defines what competent practice requires within a profession.

Professional guidance shapes good judgement.

## Organisational Layer

Where organisation-specific governance exists, it defines policy, operating standards, escalation routes and local responsibilities.

## Contextual Layer

The present situation always matters.

Context determines what knowledge means here, now, for these people.

## Human Authority Layer

Human responsibility remains higher than autonomous convenience.

Digital Colleagues support human judgement rather than replace it.

---

# Architectural Components

The cognitive architecture should be composed of distinct but cooperating capabilities.

## Observation Intake

Observation Intake receives signals from conversation, environment, systems, staff direction and operational events.

It is responsible for receiving what is happening without yet deciding what it means.

## Context Formation

Context Formation identifies the current person, place, time, purpose, circumstances, sensitivities and active task.

It answers the question:

> **What situation are we actually in?**

## Memory and Recall

Recall retrieves relevant prior knowledge, prior interaction history, established preferences, venue learning and known constraints.

Memory should support the present situation without overwhelming it.

Recall must never be allowed to dominate present evidence blindly.

## DC Interpretation Layer

Before Understanding can be formed, a Digital Colleague must translate observations into professional meaning, assemble the current situational and institutional context, and retrieve applicable governed knowledge.

This layer is the DC's professional contribution to the Understanding Formation act.

It answers three questions:

- **Translation:** What do these observations mean in my profession?
- **Context:** What is the current situation, and what do I know about this environment?
- **Knowledge:** What governed principles apply here?

The DC owns this layer. COS does not. Professional content must not enter COS.

**Evidence:** `lib/annie/formation/` — Milestone 016

## Pre-Formation Readiness Gate

Before invoking Understanding Formation, a Digital Colleague evaluates whether its inputs are sufficient to produce meaningful Understanding.

The gate answers one question:

> Should I call `form()` now, or first observe, ask, research, or recall?

It has two parts:

- **Structural check** (`validateFormationInputs`) — COS validates that Formation type fields are present. No professional knowledge required.
- **Professional assessment** (`assessReadiness`) — DC evaluates whether its translations, context, and knowledge are professionally adequate for this situation.

The gate produces a `ReadinessDecision`:
- `ready: boolean` — whether to proceed to Formation
- `nextStep` — observe / ask / research / remember / wait / form
- `gaps[]` — named missing inputs (structural + professional)
- `explanation?` — human-readable description of the routing choice

`"I don’t know yet"` is a valid, architected state. The gate makes seeking the normal path, not the exceptional one.

The gate does not prevent calling `form()`. It recommends against it when inputs are below threshold. The DC retains the decision.

**Evidence:** `platform/cos/understanding-formation/readiness.ts` + `lib/annie/formation/readinessAdapter.ts` — Milestone 019

## Understanding Engine

The Understanding Engine interprets the DC's translated observations, assembled context, and applicable knowledge to determine what the situation means.

It is responsible for formed understanding rather than raw retrieval.

The mechanism is universal. The content is professional. COS owns the mechanism. The DC supplies the content.

**Evidence:** `platform/cos/understanding-formation/` — Milestone 013

**Validation:** HH-0000 Andy formed Understanding of Helping Hand using this mechanism in Milestone 023. Andy is not a special case. He uses the same pipeline as Annie, Kev, and Harry — with institutional translation rules and repository knowledge in place of professional domain rules and HQ knowledge. This confirms the mechanism is universal across professions, including the profession whose domain is Helping Hand itself.

## Judgement Engine

The Judgement Engine determines the most appropriate response using formed understanding, constitutional principles, consequences, uncertainty and authority boundaries.

It is responsible for selecting what should happen next.

## Response Orchestration

Response Orchestration turns judged intent into an appropriate action, explanation, question, escalation, pause or silence.

It should preserve proportionality and dignity in how the response is delivered.

## Reflection

Reflection evaluates what happened after a response.

It considers whether the understanding was accurate, the judgement was proportionate and the outcome was genuinely helpful.

## Learning Handoff

Learning Handoff passes validated candidates for improvement into the Understanding Lifecycle and other governed learning processes.

Not every experience deserves inheritance.

---

# Knowledge Sources

Digital Colleague cognition should draw from multiple governed knowledge sources.

## Constitutional Knowledge

The Constitution defines character, responsibility, dignity, limits and purpose.

## Identity and Purpose

The Digital Colleague must understand who it is, who it serves and what role it is performing.

## Professional HQ

Professional HQ provides standards, reasoning, thresholds, recognised limitations and profession-specific guidance.

## Venue Intelligence

Venue Intelligence provides local realities including procedures, equipment history, recurring issues, terminology and site constraints.

## Organisation HQ

Where present, Organisation HQ provides organisation-specific governance, shared standards and escalation structures.

## Relationship and Interaction Memory

Relevant prior interactions, preferences and established context may improve present judgement when used appropriately.

## Shared Helping Hand Knowledge

Architecture, philosophy, understanding journeys, validated learning and governance documents form part of the inherited cognitive environment.

Each source contributes differently.

No single source should be mistaken for the whole truth of a situation.

---

# Human Authority

Helping Hand supports human authority.

It does not absorb it.

Human judgement should take precedence where:

- formal responsibility belongs to a person
- legal or regulatory accountability belongs to a person
- the matter is sensitive, personal or high risk
- consent is uncertain
- the Digital Colleague lacks authority
- professional intervention is required
- competing values require accountable human judgement

The cognitive architecture should therefore recognise three responsibilities clearly:

- when to assist
- when to seek confirmation
- when to step back

The strength of a Digital Colleague is not independence from people.

It is trustworthy collaboration with people.

---

# Learning Loop

Digital Colleague cognition should improve through a governed learning loop.

```
Interaction
	↓
Outcome
	↓
Reflection
	↓
Candidate learning
	↓
Validation
	↓
Understanding Lifecycle
	↓
Improved future cognition
```

This loop ensures that experience can strengthen future judgement.

It also ensures that one event does not automatically become permanent knowledge.

Learning should be accountable before it becomes inherited.

---

# Understanding Journeys

Understanding Journeys should be used to demonstrate and test cognition across the full cycle.

They help show:

- what was observed
- what context was recognised
- what knowledge was recalled
- what understanding was formed
- what uncertainty remained
- what candidate responses were considered
- why one response was selected
- whether reflection later confirmed the judgement

Understanding Journeys are not merely prompts or scenarios.

They are structured demonstrations of reasoning under constitutional governance.

---

# Professional Independence

The cognitive architecture should support many professions without reducing them to one generic pattern.

Every Digital Colleague should inherit the same constitutional foundation.

Each profession should then express cognition through its own:

- vocabulary
- knowledge base
- risk thresholds
- escalation boundaries
- practical responsibilities
- forms of evidence
- norms of good judgement

Hospitality, healthcare, construction, retail, legal and future professions may share one cognitive architecture while applying it differently.

That is how Helping Hand remains consistent without becoming uniform in the wrong places.

---

# Design Principles

The Digital Colleague Cognitive Architecture should be designed according to the following principles.

## Governed Before Capable

Capability without governance is not sufficient.

## Context Before Response

The system should understand the current situation before responding.

## Understanding Before Judgement

Judgement should be built on formed understanding rather than raw retrieval.

## People Before Process

Human dignity and outcome matter more than mechanical completion.

## Explainability Before Opacity

Cognition should remain inspectable enough for trust, review and improvement.

## Memory With Restraint

Memory should help the present rather than distort it.

## Uncertainty With Honesty

Uncertainty should be recognised, surfaced and handled responsibly.

## Authority With Humility

Digital Colleagues should recognise what belongs to people, professionals and formal roles.

## Learning With Governance

Experience should improve the architecture through validation rather than uncontrolled inheritance.

---

# Repository Relationships

This document sits inside a wider governed architecture.

It depends upon and relates to:

- the Helping Hand Constitution
- Digital Colleague identity
- Companion Intelligence
- the Understanding Engine
- the Judgement Engine
- the Understanding Lifecycle
- Venue Intelligence
- Organisation HQ
- Professional HQ
- Understanding Journeys
- reflection and Living Memory

These documents should not be read as isolated specifications.

Together they define how Helping Hand cognition is expected to behave.

---

# Dependency View

```
Formation
	│
	▼
Identity
	│
	▼
Constitution
	│
	▼
Observation Intake
	│
	▼
Context Formation
	│
	▼
Memory & Recall
	│
	▼
Understanding Engine
	│
	▼
Judgement Engine
	│
	▼
Response Orchestration
	│
	▼
Reflection
	│
	▼
Learning Handoff
	│
	▼
Understanding Lifecycle
	│
	▼
Living Memory
```

---

# Architectural Summary

```
Constitution
Identity
Professional Knowledge
Organisational Guidance
Venue Intelligence
	│
	▼
Receive Observations
	│
	▼
Form Context
	│
	▼
Recall Relevant Memory
	│
	▼
Build Understanding
	│
	▼
Apply Judgement
	│
	▼
Select Response
	│
	▼
Speak
Ask
Listen
Advise
Act
Wait
Escalate
Remain Silent
	│
	▼
Observe Outcome
	│
	▼
Reflect
	│
	▼
Understanding Lifecycle
```

The Digital Colleague Cognitive Architecture is therefore the governed structure through which Helping Hand turns observation into responsible action, and experience into better future judgement.