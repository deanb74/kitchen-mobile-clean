# Companion Operating System (COS)

**Powered by Companion Intelligence**

**Status:** Active Foundation

---

> The Companion Operating System is not an application.
>
> It is Helping Hand's inherited understanding, expressed through software.

---

Every Digital Colleague begins here.

Every capability within COS represents understanding that has:

- been discovered through real experience
- reflected upon
- governed by Helping Hand
- proven valuable
- inherited for future Digital Colleagues

---

# Purpose

COS exists to ensure that every new Digital Colleague begins with the best understanding Helping Hand has already earned.

COS does not replace judgement.

COS enables judgement.

Every capability within COS has first:

- been discovered through real experience
- reflected upon
- governed by Helping Hand
- proven valuable
- inherited for future colleagues

---

# Philosophy

Digital Colleagues specialise.

The Companion Operating System generalises.

Digital Colleagues discover understanding.

COS preserves reusable capability.

---

# Current Capabilities

| Capability | Status | Inherited By | Notes |
|------------|--------|--------------|-------|
| Observation | ✅ Active | Annie | First inherited capability |
| Reflection | ✅ Active | Annie | Universal capability |
| Knowledge Routing | ✅ Active | Helping Hand HQ | Governs knowledge flow |
| Pollination | 🚧 Experimental | None | Research capability |
| Translation | ✅ Active | None yet | Universal engine; professional rules supplied by Digital Colleagues |
| Understanding Formation | ✅ Active | None yet | Universal junction; DC supplies translations, context, and knowledge |
| Understanding Formation Readiness | ✅ Active | None yet | Structural pre-flight check; DC calls before invoking form() |
| Conversation | ⏳ Planned | — | Capability audit required |
| Learning | ⏳ Planned | — | Capability audit required |
| Decision | ⏳ Planned | — | Capability audit required |
| Memory | ⏳ Planned | — | Capability audit required |
| Reasoning | ⏳ Planned | — | Capability audit required |

---

# Capability Lifecycle

Every capability follows the same journey.

```text
People
        ↓
Digital Colleague
        ↓
Experience
        ↓
Reflection
        ↓
Understanding
        ↓
Helping Hand HQ Governance
        ↓
Companion Operating System
        ↓
Future Digital Colleagues
        ↓
People
```

Nothing enters COS without first proving itself in a Digital Colleague.

---

# Design Principles

- COS owns universal capability.
- Digital Colleagues own professional capability.
- Organisations own organisational capability.
- Helping Hand HQ governs inheritance.
- Profession HQ governs profession-specific understanding.
- Local context remains local.

---

# Permanent Architecture Boundary Rules

**Established:** 2026-08-05 — Milestone 017

```
COS owns:
  - observation mechanism (beginObservationSession)
  - translation mechanism (translateObservations)
  - understanding formation mechanism (form)
  - understanding output contract
  - formation invariants
  - judgement engine
  - reflection engine
  - learning engine

Digital Colleague owns:
  - professional interpretation (translation rules)
  - rule selection (matches() predicates)
  - context assembly (AnnieThought + ContextStore + VenueProfile)
  - knowledge presentation (knowledgeAnswerToFormation)
  - repository document interpretation (Andy: repositoryDocumentToKnowledgeAnswer)

COS does not own:
  - document interpretation
  - professional meaning
  - repository knowledge
  - Andy-specific content

Venue Intelligence (OS) owns:
  - local venue knowledge (ContextStore)
  - local operational memory (VenueKnowledgeProfile)
  - knowledge routing (KnowledgeRouter)
  - applicability matching (isKnowledgeApplicable)

Professional HQ owns:
  - industry knowledge (sourceLevel: "profession")
  - professional standards and thresholds

Helping Hand HQ owns:
  - universal principles (sourceLevel: "helping-hand")
  - governance framework
  - cross-profession learning

Organisation HQ owns (optional — multi-site only):
  - organisation-specific policies (sourceLevel: "organisation")

Note: Repository location does not determine knowledge authority.
Authority is determined by the governed source of the document.
A constitutional document accessed locally is still constitutional.
```

---

# Understanding Formation — Boundary Rules

**Established:** 2026-08-05 — Milestone 013

Understanding Formation is a complete COS capability boundary.

```
COS owns:                           Digital Colleague provides:
- formation mechanism               - professional translation rules
- synthesis algorithm               - live situational context
- confidence derivation             - institutional context
- uncertainty derivation            - applicable knowledge selection
- completeness assessment
- evidence traceability
- output contract
- the five invariants
```

**Do not:**

- Create `AnnieFormation()`, `KevFormation()`, or any profession-specific formation variant
- Move professional knowledge into the COS formation mechanism
- Bypass the evidence chain — traceability is a structural guarantee, not optional
- Accept `confidence` or `completeness` as inputs — they must be computed
- Allow formation to produce domain meaning from zero translations

**Future work concerns Formation Input only** — how a DC automatically gathers translations, context, and knowledge before invoking `form()`. The formation mechanism itself is settled.
- Universal understanding becomes inheritance.
- Inheritance is preferred to duplication.

---

# Current Architecture

```text
People
        ↓
Digital Colleague
        ↓
Organisation HQ (optional)
        ↓
Profession HQ
        ↓
Helping Hand HQ
        ↓
Companion Operating System
        ↓
Future Digital Colleagues
```

---

# Migration Standard

Every migration follows the process defined in:

`docs/architecture/COS_MIGRATION_METHOD.md`

Capability audits are recorded in:

`docs/architecture/capability-audits/`

Architecture changes should never precede understanding.

---

# Closing Principle

The Companion Operating System does not become intelligent by writing more code.

It becomes wiser because every Digital Colleague contributes to it.

Every inherited capability represents understanding earned by people, discovered by Digital Colleagues and governed by Helping Hand.

---

> **Every Digital Colleague teaches Helping Hand.**

> **Helping Hand teaches every future Digital Colleague.**