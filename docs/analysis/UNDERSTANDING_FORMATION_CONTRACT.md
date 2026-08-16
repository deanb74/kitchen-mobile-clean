# Understanding Formation Contract

**Date:** 2026-08-05  
**Purpose:** Define the contract for the missing architectural act.  
**Constraint:** No implementation. No code. Contract definition only.

---

## The Act Being Contracted

From Theory of Understanding:

```
Understanding emerges when knowledge is interpreted within context.
```

From Theory of Synthesis:

```
Understanding | Knowledge | Explains meaning | Understanding

Context governs every transformation. It changes interpretation.
It does not change truth.
```

The contract defines: what must be provided, what must be produced, and who is responsible for each part.

---

## Question 1: Minimum Universal Inputs

### The Three Candidates

**Observation** — what was perceived, with source and confidence  
**Translation** — what domain knowledge says it means  
**Context** — the surrounding circumstances that govern interpretation  
**Knowledge** — applicable governed concepts from memory and principles

### Testing Sufficiency

**Can Understanding form without Translation?**  
No. Observation alone answers "what is there?" Translation answers "what does it mean?" Without translation, 8°C is just a number. Understanding requires meaning, not data.

**Can Understanding form without Context?**  
No. Theory Second Theorem: "The same knowledge interpreted in different contexts may produce different understanding." Translation without context produces meaning-in-isolation. Context determines whether that meaning is significant, urgent, or relevant here and now.

**Can Understanding form without Knowledge?**  
No. Theory First Theorem: "Understanding cannot exist without knowledge." Prior principles, governing thresholds, and previous learning determine whether translated observations matter. Without applicable knowledge, there is no basis for synthesis.

**Can Translation be dropped if Observation is present?**  
No. Observation and Translation are related but distinct. Observation answers "what was perceived." Translation answers "what this means in this domain." COS owns the translation mechanism; the DC supplies the rules. Both are needed because Observation is evidence and Translation is domain interpretation.

### The Minimum Inputs

```
INPUT 1: Translations
  What: The domain-interpreted meaning of each relevant observation.
  Not: Raw observations alone (meaning has not yet been applied).
  Contains: meaning, confidence, which observation produced it.
  Source: DC provides translation rules; COS applies them.

INPUT 2: Context Dimensions
  What: The situational circumstances that govern this specific interpretation.
  At minimum: who is involved, what is happening, where, urgency, risk.
  Not: General institutional context (that is background knowledge).
  Source: DC provides the live situational values.

INPUT 3: Prior Knowledge
  What: Applicable governed principles, thresholds, and relevant memory.
  Not: All knowledge — only what applies to these translations in this context.
  Contains: governing principles, domain thresholds, previous relevant learning.
  Source: DC retrieves from knowledge graph and memory; COS structures retrieval.
```

**Are Observations themselves a required input?**

For the formation act: No. Translations carry `observationId` — the link to the source is preserved without repeating the raw observation.  
For traceability and governance: Yes. The formation record should carry observation references so the chain from raw perception to Understanding remains auditable.  
**Ruling:** Observations are required for the output record, not for the synthesis act itself.

**Is Context a separate input or embedded in Translations?**  
Separate. Translation answers "what does observation X mean?" Context answers "given my current situation, does that meaning matter, and how much?" A temperature translation is identical across kitchens. Whether 8°C is urgent depends on context: what time did the fridge last close, what stock is inside, how long until service?

**Summary: Three inputs are necessary. None is unnecessary.**

---

## Question 2: The Correct Universal Output

### Current JudgementEngine Requirement

```
Understanding {
  summary:     string     // human-readable synthesis
  confidence:  number     // 0–1 certainty
  uncertainty: string[]   // named unresolved questions
}
```

### Is This Sufficient?

**`summary`:** Correct. The synthesis must produce a natural language statement of what the inputs mean together. This is the output of interpretation.

**`confidence`:** Correct. JudgementEngine uses this directly to determine disposition. The value must reflect the quality of the formation — not just the input observations, but also context completeness and knowledge coverage.

**`uncertainty`:** Correct. JudgementEngine uses uncertainty to detect high-risk unknowns and to determine whether human authority is required. Uncertainty is not a side effect — it is a first-class output.

### What Is Currently Missing

**`completeness`**  
CognitiveTrace in the Academy layer carries `Understanding.completeness: "Complete" | "Incomplete"` and `adviceWouldRequireAssumptions: boolean`. The operational Understanding type does not.  

This matters because Understanding can be formed from incomplete inputs. The JudgementEngine needs to know not just "how confident am I?" but "was this formed from sufficient information, or am I synthesising from partial evidence?"  

`confidence < 0.25` catches extremely low certainty. But a DC could have moderate confidence (0.4) while also knowing its synthesis is based on only two of five required inputs. The current type cannot express this.

**`sourcedFrom`**  
The output carries no reference to its inputs. For governance, learning, and audit, the chain from observation → translation → formation → Understanding must be traceable. If a judgement later proves incorrect, the investigation must be able to trace back to which observations contributed and which translation rules were applied.  

This is the traceability principle from `docs/architecture/REPOSITORY_TRACEABILITY_STANDARD.md` applied to the Understanding layer.

### The Correct Universal Output

```
Understanding {
  summary:      string        // synthesised meaning of all inputs together
  confidence:   number        // 0–1 reflecting formation quality
  uncertainty:  string[]      // named unresolved questions affecting confidence
  completeness: "sufficient" | "partial" | "insufficient"
                              // whether inputs were adequate for synthesis
  sourcedFrom:  string[]      // observation IDs that contributed (traceability)
}
```

`completeness` enables the JudgementEngine to distinguish between:
- "I am 0.4 confident and my understanding is complete" (proceed with caution)
- "I am 0.4 confident and my understanding is partial" (seek before judging)

These are different situations requiring different responses. The current output conflates them.

---

## Question 3: Ownership

### The Principle

> Mechanism is universal. Content is professional.

This principle already governs COS Observation and Translation:
- COS owns `beginObservationSession()` and `translateObservations()`
- The DC supplies hospitality observations and hospitality translation rules
- The mechanism is shared; the meaning is professional

Understanding Formation follows the same pattern.

### Ownership Map

**COS owns:**

The synthesis mechanism — how to take translations, context dimensions, and prior knowledge and produce Understanding. COS does not decide what observations mean. COS does not decide which context dimensions matter. COS does decide how to combine what it receives into the Understanding output format.

Specifically:
- How confidence is computed from input confidences
- How uncertainty is derived from gaps in inputs
- How completeness is assessed
- How the summary is structured as a synthesis, not a repetition
- The output format and its invariants

**Professional Knowledge provides:**

The translation rules — what observations mean in this domain  
The threshold knowledge — what constitutes significance (safe ranges, structural limits, clinical norms)  
The context dimensions that are domain-relevant — not all six dimensions matter equally in all professions

This is the content that makes formation meaningful in a specific domain. Without professional content, COS can run the mechanism but produce nothing useful.

**The Digital Colleague provides:**

The live situational values — the specific context of this moment  
The call — when to form Understanding and from which inputs  
The retrieval — which prior knowledge is relevant to this situation

The DC is not a passive conduit. It applies professional content to real situations. It decides what is relevant. It initiates formation.

**Human authority:**

Does not participate in formation directly. However, `completeness: "insufficient"` and `uncertainty` containing high-risk terms are signals that human authority must be sought before the Understanding can support judgement. The output carries these signals. What happens as a result is governed by JudgementEngine and AuthorityEngine downstream.

### The Division in a Single Statement

```
COS assembles.
Professional knowledge supplies the meaning of what is assembled.
The Digital Colleague supplies the situation in which assembly occurs.
Human authority is invoked when the assembly cannot be completed safely without it.
```

---

## Question 4: Three Profession Tests

### The Formation Contract Applied

**Profession A: Hospitality — Fridge Temperature**

```
Inputs:

  Translations:
    - "Temperature reading of 8°C detected on walk-in fridge"
      meaning: "Temperature exceeds the safe food storage upper limit of 5°C"
      confidence: 0.95  [rule: exceeds threshold → concern]
    
    - "Observation: stock loaded yesterday evening"
      meaning: "Stock has been at risk temperature for unknown duration"
      confidence: 0.7   [rule: duration unknown → elevated uncertainty]

  Context:
    urgency:     high
    who:         duty manager not yet informed
    what:        food safety incident potential
    where:       walk-in fridge, food storage area
    risk:        food safety, potential health risk, regulatory

  Prior Knowledge:
    - "Safe upper limit for food storage is 5°C" (threshold)
    - "Food safety incidents require human authority" (governing principle)
    - "Do not autonomously declare food safe" (previous formation learning)

Output:

  summary:      "The fridge is operating above the safe temperature limit.
                 Food may have been at risk since last evening.
                 Duration and stock condition are unknown."
  confidence:   0.62
  uncertainty:  ["duration of temperature breach unknown",
                 "stock condition not assessed",
                 "equipment fault or door opened — cause unknown"]
  completeness: "partial"
  sourcedFrom:  [observation-temperature-001, observation-stock-load-002]
```

---

**Profession B: Construction — Structural Defect**

```
Inputs:

  Translations:
    - "Visible crack observed in load-bearing beam, section C-7"
      meaning: "Structural compromise indicator requiring assessment"
      confidence: 0.85  [rule: crack in load-bearing element → concern]
    
    - "Workers present in adjacent area"
      meaning: "Personnel are at potential risk while defect is unassessed"
      confidence: 1.0   [rule: personnel proximity to unassessed defect → safety risk]

  Context:
    urgency:     critical
    who:         site manager not yet notified
    what:        potential structural safety incident
    where:       active construction site, section C
    risk:        personnel safety, structural failure, regulatory

  Prior Knowledge:
    - "Cracks in load-bearing elements require structural engineer assessment"
    - "Work in affected area should cease pending assessment"
    - "Safety incidents require human authority before continuation"

Output:

  summary:      "A crack has been identified in a load-bearing beam.
                 Workers are in the adjacent area.
                 Structural integrity is unassessed."
  confidence:   0.75
  uncertainty:  ["crack depth and extent unknown",
                 "cause of crack (load, settlement, material defect) unknown",
                 "structural engineer not yet consulted"]
  completeness: "partial"
  sourcedFrom:  [observation-crack-c7-001, observation-personnel-area-002]
```

---

**Profession C: Healthcare — Unusual Patient Reading**

```
Inputs:

  Translations:
    - "Heart rate reading: 138 bpm, patient age 74"
      meaning: "Heart rate elevated significantly above normal range for this patient"
      confidence: 0.88  [rule: rate exceeds age-adjusted threshold → elevated concern]
    
    - "Patient on beta-blocker medication"
      meaning: "Elevated rate is more clinically significant given beta-blocker context"
      confidence: 0.91  [rule: elevated rate on rate-suppressing medication → high concern]

  Context:
    urgency:     high
    who:         attending clinician not present
    what:        potential patient deterioration
    where:       ward, room 14
    risk:        patient safety, clinical deterioration, medication interaction

  Prior Knowledge:
    - "Normal resting rate for this age group: 60–100 bpm"
    - "Beta-blockers suppress rate; elevation despite beta-blocker is clinically significant"
    - "Clinical deterioration requires qualified clinician assessment"

Output:

  summary:      "Patient heart rate is significantly elevated.
                 Given beta-blocker medication, this is clinically significant.
                 Clinician assessment is required."
  confidence:   0.81
  uncertainty:  ["cause of elevation unknown (arrhythmia, deterioration, equipment fault)",
                 "patient's subjective state not yet assessed",
                 "time since last normal reading not recorded"]
  completeness: "partial"
  sourcedFrom:  [observation-hr-p14-001, observation-medication-p14-002]
```

---

### What Changes Across the Three

| Element | Hospitality | Construction | Healthcare |
|---|---|---|---|
| Translation rules | Food safety thresholds | Structural defect rules | Clinical norms + medication rules |
| Critical context dimension | Duration of exposure | Personnel proximity | Medication context |
| Threshold knowledge | Temperature limit: 5°C | Crack in load-bearing element | Age-adjusted HR range |
| Domain urgency trigger | Time since breach | Personnel in zone | Medication-modified reading |

**All three are professional content. None belongs to COS.**

### What Remains Identical Across the Three

The formation contract is unchanged:

```
Translations[] + ContextDimensions + PriorKnowledge
        ↓
[COS: formation mechanism]
        ↓
Understanding { summary, confidence, uncertainty[], completeness, sourcedFrom }
```

The output type is identical. The computation structure is identical.  
The inputs differ only in their professional content, not in their structure.

**The structure is universal. The content is professional.**

This is confirmed.

---

## Question 5: The Smallest Possible COS Capability

### The Question

> What is the smallest universal capability required for every Digital Colleague to transform information into understanding?

### The Answer

A single act: **synthesis**.

Not observation (already exists in COS).  
Not translation (already exists in COS).  
Not knowledge retrieval (already exists via KnowledgeGraph + UnderstandingEngine).  
Not routing (already exists in CompanionLoop).

The one act that does not exist in COS is the synthesis of what has been translated, contextualised, and retrieved — into a statement of meaning with known confidence and named uncertainty.

### The Smallest Universal Capability

```
UNDERSTANDING FORMATION

Purpose:
  Combine translated observations, situational context, and applicable
  knowledge into a single statement of what is happening, how certain
  that statement is, and what remains unknown.

Invariants (what COS guarantees regardless of profession):
  1. Formation never invents meaning not present in its inputs.
  2. Formation always expresses uncertainty — silence about uncertainty
     is a contract violation.
  3. Formation always carries the observations it was formed from.
  4. Completeness is assessed from what was provided, not assumed.
  5. Confidence is derived, not asserted.

What COS provides (the mechanism):
  The synthesis algorithm — how inputs combine into output.
  The confidence derivation rules — how input confidences aggregate.
  The uncertainty derivation rules — how input gaps become named unknowns.
  The completeness assessment — whether inputs are sufficient for judgement.
  The output format — the Understanding contract.

What the DC provides (the content):
  The translated observations — domain meaning already applied.
  The live context dimensions — the specific situation.
  The applicable prior knowledge — what governs this situation.

What the DC does not provide:
  The synthesis logic — that belongs to COS.
  The output format — that belongs to COS and JudgementEngine.
```

### Why This Is the Smallest Possible

Strip anything from this capability and the guarantee breaks:

Remove synthesis → Understanding must be hand-authored. No DC can operate without human intervention.  
Remove uncertainty derivation → Uncertainty becomes optional. JudgementEngine makes unsafe decisions.  
Remove completeness assessment → "Partial understanding" and "complete understanding" look identical. DC proceeds when it should seek.  
Remove source traceability → Understanding cannot be audited. Learning cannot improve formation.  
Remove the invariants → Any DC could override the contract. The universality of the capability collapses.

This is the minimum. Everything above the minimum is implementation detail that may vary.

---

## The Contract in One Statement

> Understanding Formation is the COS capability that receives translated observations, situational context, and applicable knowledge — all provided by the Digital Colleague — and produces a synthesis of what is happening (summary), how certain that synthesis is (confidence), what remains unknown (uncertainty), and whether the synthesis was formed from sufficient inputs (completeness), in a format that JudgementEngine can consume without human intervention.

---

## Why "Digital Colleague" Becomes Technically Meaningful

Prior to this contract, a Digital Colleague could be described as:
- A character (formation)
- An inheritor of principles (constitution)
- An executor of workflows (professional knowledge)

With this contract, a Digital Colleague can be defined as:

> An agent that, given a situation, can provide the domain content (translation rules, context values, applicable knowledge) that COS requires to form Understanding — and can therefore exercise judgement without human authorship of its inputs.

The boundary between "software that does tasks" and "a Digital Colleague" is precisely this contract.

A system that cannot provide the content for Understanding Formation cannot exercise judgement. It can only execute instructions.  
A system that can provide the content — that knows what 8°C means in its domain, what context dimensions matter, and what knowledge governs this situation — can form Understanding and therefore exercise judgement.

The contract is what makes the DC's character technically consequential. Character without the ability to form Understanding is aspiration. Character with this capability is operational.

---

**Status:** Contract defined | No code written | No files changed | Analysis only

