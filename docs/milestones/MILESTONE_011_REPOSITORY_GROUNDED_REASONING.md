# MILESTONE_011_REPOSITORY_GROUNDED_REASONING.md
**Document ID:** HH-MILESTONE-011-001
**Status:** Approved for Implementation
**Date:** 31 July 2026

---

# Purpose
The baseline evidence capture has established that Candidate 0 (Andy) operates successfully as an executable Digital Colleague within the MARC Academy Runtime.

The evidence also confirms that Candidate 0 currently answers using runtime-defined journey logic rather than reasoning from the Helping Hand constitutional repository.

The purpose of Milestone 011 is to implement repository-grounded reasoning while preserving the existing mentoring and journey capabilities.

---

# Baseline Summary
The baseline execution demonstrated:

- Candidate 0 is executable.
- MARC Academy Runtime functions correctly.
- Journey execution functions correctly.
- Evidence capture functions correctly.
- Runtime behaviour is reproducible.
The baseline also demonstrated:

- The runtime currently entered a predefined journey.
- The Milestone 010 examination question was not injected into the runtime.
- Repository-grounded reasoning is not yet active.
These observations are accepted as engineering evidence and define the next implementation stage.

---

# Objective
Enable Candidate 0 to construct answers from inherited organisational understanding rather than predefined executable behaviour.

The objective is not to replace the existing journey system.

The objective is to add a constitutional reasoning capability alongside it.

Implementation dependency chain:

Examination Mode
-> Repository Retrieval
-> Context Formation
-> Constitutional Reasoning
-> Evidence Capture
-> Baseline Comparison

---

# Required Capabilities

## 1. Repository Access
Candidate 0 shall be capable of accessing approved Helping Hand repository artefacts at runtime.

Initially this may consist of:

- Constitution
- Theory Library
- Operating Model
- Knowledge Index
- Formation documents
- Approved engineering documentation
The implementation mechanism is left to engineering judgement.

---

## 2. Retrieval Layer
Implement repository retrieval capable of selecting relevant constitutional knowledge for a given question.

The retrieval process should provide Candidate 0 with contextual information rather than predetermined answers.

---

## 3. Context Formation
Candidate 0 shall construct an internal working context from retrieved material before generating a response.

The runtime should distinguish between:

- retrieved information
- connected understanding
- generated answer
This distinction should remain observable during debugging where practical.

---

## 4. Constitutional Reasoning
Candidate 0 shall reason from the formed context before response generation.

This stage must explicitly connect:

- retrieved knowledge
- formed understanding
- judgement path
- response intent

Retrieval alone is not sufficient.

Reasoning must be observable during development.

---

## 5. Examination Mode
Introduce a dedicated runtime mode for constitutional examinations.

Examination Mode should:

- bypass scripted learning journeys
- accept examiner-defined questions
- preserve immutable evidence
- avoid altering Candidate 0's learned state during execution
Learning mode and examination mode must remain distinct.

---

## 6. Evidence Continuity
The existing baseline evidence shall remain unchanged.

Future constitutional validation will compare repository-grounded reasoning against the frozen baseline.

The baseline is not replaced.

It becomes the reference point.

---

# Success Criteria
Milestone 011 is complete when Candidate 0 can:

- receive the question:

> Andy, why do you exist?
- retrieve relevant constitutional knowledge
- construct contextual understanding
- apply constitutional reasoning from the formed context
- generate an answer derived from repository understanding rather than predefined dialogue
- produce evidence suitable for HH-EVID-001 constitutional validation

Additionally, each stage in the runtime pipeline must be independently observable during development:

- Question Received
- Retrieved Documents
- Context Built
- Reasoning Trace
- Generated Response

---

# Engineering Principle
Do not optimise Andy's answers.

Improve Andy's understanding.

Better understanding should naturally produce better answers.

---

# Deliverables
Engineering should produce:

- Repository retrieval capability
- Repository-grounded reasoning pipeline
- Examination Mode
- Runtime support for constitutional evidence capture
- Repeatable execution path for Milestone 010

---

# Exit Criteria
Milestone 011 is complete only when Candidate 0's answer can be traced to inherited organisational understanding rather than scripted runtime behaviour.

Definition of done:

Milestone 011 is complete when Andy can answer a constitutional question by reasoning from retrieved repository knowledge, and each stage of that reasoning pipeline can be independently observed and verified during development.

At that point, the baseline protocol is retired for Candidate 0 and the first true constitutional validation (HH-EVID-001) may begin.

## What I think the next steps are
From here, I'd keep the work tightly focused:

1. **Implement Examination Mode** (so journeys and examinations are separate).
2. **Implement repository retrieval** (the bridge from repository to runtime).
3. **Implement context formation** (connecting retrieved knowledge before answering).
4. **Repeat the exact same question**: *"Andy, why do you exist?"*
5. **Compare the new evidence with `CANDIDATE_0_RUNTIME_BASELINE_001.md`.**
6. **Only then begin `HH-EVID-001`.**
One thing I would change from our earlier thinking is this: I no longer see the baseline as a detour. I see it as an essential reference point. Years from now, you'll be able to look back and see exactly how Andy evolved—from a journey-driven Digital Colleague into one that reasons from Helping Hand's organisational understanding.
