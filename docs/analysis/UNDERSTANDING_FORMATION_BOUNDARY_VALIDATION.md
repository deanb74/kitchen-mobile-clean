# Understanding Formation Boundary Validation

**Date:** 2026-08-05  
**Status:** Pre-implementation validation  
**Principle applied:** Understand first. Then act.  
**Constraint:** No code changes. No refactoring. No architecture changes.

---

## Validated Hypothesis

> Understanding Formation is a universal COS capability.  
> COS owns the mechanism.  
> Digital Colleagues provide professional information and context.  
> Knowledge provides governed information.

**Finding: Validated.** With one refinement — see Task 2.

---

## Task 1: Boundary Audit

### Components Under Review

| Component | Location | Current Role |
|---|---|---|
| `CognitiveTrace` | `lib/academy/academyTypes.ts` | Full pipeline as a data type (formation prototype) |
| `AnnieThought` | `lib/annie/thinking.ts` | Contextual interrogation before synthesis (bridge candidate) |
| `UnderstandingEngine` | `lib/understanding/UnderstandingEngine.ts` | Knowledge-graph concept retrieval |
| `JudgementEngine` | `lib/judgement/JudgementEngine.ts` | Downstream consumer of Understanding |
| `CompanionUnderstanding` | `platform/core/companion/types.ts` | Routing signal — not content |
| `ContextStore` | `lib/onboarding/contextStore.ts` | Situational knowledge storage (onboarding-scoped) |
| Translation layer | `platform/cos/translation/` | Observation → domain meaning (already in COS) |
| `KnowledgeGraph` | `lib/knowledge/KnowledgeGraph.ts` | Governed concept store |
| Feedback / Learning | `lib/reflection/`, `lib/learning/` | Downstream consumers of Execution |

---

### Finding 1: Understanding Formation Is Already Partially Implemented

It exists in three separate layers, none connected to the others.

**Prototype A — `CognitiveTrace` (Academy)**

```typescript
CognitiveTrace = {
  observation,      // what was perceived
  context,          // AcademyContext: relationship, environment, urgency, risk, purpose
  memoryRecall,     // applicable principles + previous learning
  understanding,    // {summary, completeness, adviceWouldRequireAssumptions}
  uncertainty,      // {material, unknowns[]}
  judgement,
}
```

This is the complete pipeline expressed as a data type. Every formation journey traverses this structure. It is the most complete evidence that the pipeline works.  
**Status:** Working prototype. Formation-scoped only. Not in COS.

---

**Prototype B — `AnnieThought` (Annie professional layer)**

```typescript
AnnieThought = {
  stimulus,
  who, what, where, when, why,    // contextual interrogation
  whoElseMightBeAffected,
  whatElseMightBeAffected,        // domain dimension scanning
  confidence,
  needsClarification,
  suggestedNextStep,
}
```

This is the interrogation step — the structured questioning that sits between receiving a stimulus and forming a summary. It applies context dimensions to the incoming information before synthesis.  
**Status:** Implemented as Annie-specific thinking. Not universal. Not in COS.

---

**Partial C — `seekFirstToUnderstand` (platform/core/companion)**

```typescript
function seekFirstToUnderstand(input: CompanionInput): CompanionUnderstanding {
  // Routes to observe / remember / ask / research / reflect
  // based on pre-assessed boolean flags
}
```

This is a routing signal. It decides whether understanding is sufficient to proceed. It is not formation — it does not produce a summary or derive confidence from inputs. It consumes a pre-assessed `confidence: number` rather than computing one.  
**Status:** Routing layer only. Not formation.

---

### Finding 2: These Are Stages of One Process, Not Separate Concepts

| Stage | What it does | Component that implements it |
|---|---|---|
| Interrogation | Ask: who, what, where, urgency, risk | `AnnieThought` (Annie only) |
| Knowledge retrieval | Retrieve applicable governed concepts | `UnderstandingEngine` + `KnowledgeGraph` |
| Synthesis | Combine translations + context + knowledge into meaning | **Not yet implemented** |
| Readiness routing | Is the synthesis sufficient to proceed? | `seekFirstToUnderstand` |
| Output format | Typed container for JudgementEngine | `Understanding` struct |

Every stage exists. The synthesis stage — the act of combining — does not exist as code.

---

### Finding 3: Component Roles After Formation Exists

| Component | Becomes |
|---|---|
| `CognitiveTrace` | Reference prototype (do not replace; use as evidence) |
| `AnnieThought` | Interrogation layer that feeds context into formation |
| `UnderstandingEngine` | Knowledge retrieval that feeds governed concepts into formation |
| `JudgementEngine` | Unchanged downstream consumer |
| `CompanionUnderstanding` | Routing signal after formation — unchanged |
| `ContextStore` | Context provider to formation — must move to COS |
| Translation layer | Already correct in COS — unchanged |
| `KnowledgeGraph` | Already correct — unchanged |
| Feedback / Learning | Already correct downstream — unchanged |

**No components become duplicates.** Each has a distinct role. Formation is the missing assembler.

---

## Task 2: Ownership Validation

### The Principle Under Test

> Mechanism is universal. Content is professional.

### Evidence from Existing Pattern

From `lib/annie/observation/index.ts`:

```
COS provides: the universal observation session, the curiosity mechanism
Annie provides: hospitality observations, hospitality curiosity rules
```

From `platform/cos/translation/`:

```
COS provides: translateObservations() — the mechanism
Annie provides: TranslationRule[] — the domain rules
```

The pattern is already proven at two points in the pipeline. Formation must follow the same pattern.

### Ownership Ruling

**COS owns the formation mechanism:**
- How translated meanings combine
- How confidence is derived from input confidences
- How uncertainty is derived from input gaps
- How completeness is assessed
- The output format (the Understanding contract)
- The invariants (never invent, always express uncertainty, always trace sources)

**The Digital Colleague provides the formation content:**
- Translation rules — what observations mean in this domain
- Live context dimensions — the specific situational values
- Knowledge retrieval — which prior knowledge applies here

**Professional Knowledge contributes through the DC:**
- Domain thresholds (what 8°C means for food safety)
- Domain context dimensions (which dimensions matter most in this profession)
- Domain uncertainty sources (what is typically unknown in this situation)

Professional Knowledge does not own formation. It supplies the content through the DC's translation rules and knowledge retrieval. The DC is the bridge.

**Human authority participates after formation:**
- `completeness: "insufficient"` → JudgementEngine → `disposition: "human-required"` → AuthorityEngine
- Human authority is a downstream consumer, not a formation participant

### Ownership Map

```
┌─────────────────────────────────────────────────┐
│                     COS                          │
│                                                  │
│  Translation mechanism    ← already in COS       │
│  Observation mechanism    ← already in COS       │
│  ContextStore             ← must move to COS     │
│  Understanding Formation  ← the missing piece    │
│                                                  │
└─────────────────────────────────────────────────┘
           ↑                       ↑
     DC provides               DC provides
    domain rules           situational context
           ↑                       ↑
┌──────────────────┐   ┌──────────────────────────┐
│ Professional     │   │  Digital Colleague        │
│ Knowledge        │   │                           │
│                  │   │  - translation rules      │
│ - domain rules   │   │  - live context values    │
│ - thresholds     │   │  - knowledge retrieval    │
│ - norms          │   │  - initiates formation    │
└──────────────────┘   └──────────────────────────┘
```

**Confirmed: Option D — Shared protocol. COS owns the mechanism. DC and Professional Knowledge supply the content. Human authority is downstream.**

---

## Task 3: The Canonical Contract

### Input Validation

**Hypothesis under test:**

```
Translations + Context + Prior Knowledge
```

**Testing each input:**

---

**Translations**

Current type:
```typescript
Translation {
  observationId: string   // links back to source
  meaning:       string   // domain interpretation
  confidence:    number   // certainty in this interpretation
}
```

**Required?** Yes. Translations carry the domain-applied meaning of what was observed. Without them, formation has no semantics to synthesise.

**Sufficient alone?** No. Theory Second Understanding Theorem: "The same knowledge interpreted in different contexts may produce different understanding." Translations in isolation have no situational context.

**Refinement required?** Yes, one addition: the `source` domain should be carried alongside `meaning` to enable formation to weight translations by source type. A `"vision"` observation should be weighted differently from a `"human"` statement. This is already present on the parent `Observation` — recoverable via `observationId`.

**Verdict: Required. No structural change needed.**

---

**Context**

Current type (closest equivalent):
```typescript
AcademyContext {
  relationship: string
  environment:  string
  urgency:      string
  risk:         string
  purpose:      string
}
```

**Required?** Yes. Context determines interpretation. Formation without context can only produce domain-general Understanding. The same temperature reading means different things in different contexts.

**Sufficient alone?** No. Context without translated meanings has no content to contextualise.

**Does `ContextStore` serve this purpose?** Partially. `ContextStore` has 7 categories (business, venue, team, systems, communication, knowledge, memory) — this is institutional context. Formation needs situational context (urgency, risk, who, what, purpose) which is more granular. Both are needed, but they serve different purposes:
- `ContextStore` = background institutional knowledge
- Situational context = live circumstances of this specific moment

**Verdict: Required. Two context types are needed — institutional (from ContextStore) and situational (live dimensions).**

---

**Prior Knowledge**

Current type (closest equivalent):
```typescript
MemoryRecall {
  principles:       string[]     // governing principles
  previousLearning: MemoryRecord[]
}
```

**Required?** Yes. Theory First Understanding Theorem: "Understanding cannot exist without knowledge." Prior knowledge determines whether translated observations are significant, risky, or routine.

**Sufficient to use `MemoryRecall` directly?** For formation validation, yes. For production, `MemoryRecall` carries text principles. Formation will need typed concepts, not strings. But the structural role is confirmed.

**Does this replace `KnowledgeGraph`?** No. `KnowledgeGraph` is the source. `MemoryRecall` / concept retrieval is the result of querying it. Formation receives the retrieved concepts, not the graph itself.

**Verdict: Required. KnowledgeGraph is the source; formation receives retrieved concepts.**

---

**Are all three necessary?**

A test: can formation work with only two?

- Translations + Context (no Knowledge): Formation can describe what was observed in situational context, but cannot assess significance. 8°C in a cold room is meaningless without knowing the safe range. **Insufficient.**
- Translations + Knowledge (no Context): Formation can apply domain knowledge to observations but cannot determine urgency or whether this situation differs from the standard case. **Insufficient.**
- Context + Knowledge (no Translations): Formation has situation and knowledge but nothing to interpret. No domain meaning has been applied to observations. **Insufficient.**

**All three are necessary. None is sufficient alone. The three together are sufficient.**

---

### Output Validation

**Hypothesis under test:**

```
Understanding {
  summary
  confidence
  uncertainty
  completeness
  sourcedFrom
}
```

**Validating each field:**

---

**`summary: string`**

The synthesis statement. What does all of this mean together?

**Required?** Yes. JudgementEngine requires it. It is the human-readable expression of Understanding. It cannot be omitted or replaced with structured fields — it encodes meaning that spans translations, context, and knowledge simultaneously.

**Verdict: Confirmed required.**

---

**`confidence: number (0–1)`**

How certain is the synthesis?

**Required?** Yes. JudgementEngine uses this directly to determine disposition. Thresholds: < 0.25 = insufficient, < 0.6 = caution, ≥ 0.6 = proceed.

**How should it be computed?** From input quality: translation confidences, context completeness, knowledge coverage. A synthesis from low-confidence translations should produce low confidence Understanding regardless of how well-written the summary is.

**Verdict: Confirmed required.**

---

**`uncertainty: string[]`**

Named unresolved questions.

**Required?** Yes. JudgementEngine scans uncertainty for high-risk terms. Theory Third Understanding Theorem: "Complete certainty is not evidence of complete understanding." Uncertainty is a first-class output, not an edge case.

**Verdict: Confirmed required.**

---

**`completeness: "sufficient" | "partial" | "insufficient"`**

Was the formation built from enough information?

**Challenge to the hypothesis:** Is this redundant with `confidence`? A low confidence score might already signal incomplete formation.

**Resolution:** No. They measure different things:
- `confidence` = certainty in the synthesis given the inputs received
- `completeness` = whether the inputs themselves were adequate

A DC could have 0.7 confidence that the fridge is malfunctioning, yet only have 2 of 5 required inputs. The confidence reflects what it knows. Completeness reflects whether it had enough to know from. A DC with `confidence: 0.7, completeness: "partial"` should seek before acting. A DC with `confidence: 0.7, completeness: "sufficient"` may proceed with caution. JudgementEngine cannot make this distinction without `completeness`.

**Verdict: Confirmed required. Not redundant with confidence.**

---

**`sourcedFrom: string[]`**

Observation IDs that contributed to this Understanding.

**Challenge to the hypothesis:** Is traceability a formation concern, or a governance concern?

**Resolution:** Both. Formation must carry the evidence trail so that:
- Governance can audit which observations produced which Understanding
- Learning can trace back from poor judgement to its formation inputs
- Trust can be assessed by examining whether Understanding was grounded

Without `sourcedFrom`, the pipeline between Observation and Judgement is opaque. A governed system cannot be opaque.

**Refinement:** The field name `sourcedFrom` is clear. However, the type should carry both observation IDs and translation IDs — the chain of evidence, not just the origin. Rename to `evidenceChain: string[]` to clarify it captures the full derivation.

**Verdict: Confirmed required. Rename `sourcedFrom` → `evidenceChain`.**

---

### The Canonical Contract

```
FORMATION INPUTS

  translations:     Translation[]
                    — domain-applied meaning of observations
                    — provided by DC via professional translation rules

  context:          FormationContext
                    — situational: urgency, risk, who, what, purpose
                    — institutional: relevant entries from ContextStore
                    — provided by DC from current situation + background knowledge

  priorKnowledge:   FormationKnowledge[]
                    — governing principles and applicable concepts
                    — retrieved by DC from KnowledgeGraph and memory

FORMATION OUTPUT

  Understanding {
    summary:        string
                    — synthesised meaning of all inputs together
                    — produced by COS formation mechanism

    confidence:     number (0–1)
                    — derived from input quality
                    — not authored

    uncertainty:    string[]
                    — named unknowns that affect confidence
                    — derived from input gaps

    completeness:   "sufficient" | "partial" | "insufficient"
                    — whether inputs were adequate for synthesis
                    — derived from input coverage

    evidenceChain:  string[]
                    — IDs of observations and translations that contributed
                    — preserved for governance and learning
  }

FORMATION INVARIANTS (COS guarantees these regardless of profession)

  1. Formation never invents meaning absent from its inputs.
  2. Uncertainty is never empty when inputs are incomplete.
  3. evidenceChain is never empty.
  4. completeness is derived, never asserted.
  5. confidence is derived from input confidence, never authored.
```

---

## Task 4: Architecture Diagram

```
╔══════════════════════════════════════════════════════════════════════╗
║                    INFORMATION SOURCES                               ║
║                                                                      ║
║  Sensor  Conversation  Document  Vision  System  Human              ║
╚══════════════╦═══════════════════════════════════════════════════════╝
               ↓
╔══════════════╩═══════════════════════════════════════════════════════╗
║                 COS — OBSERVATION LAYER                    🟢 Active ║
║                                                                      ║
║  Observation { id, category, description, confidence, source }       ║
║  CuriosityRule mechanism (DC supplies rules)                         ║
╚══════════════╦═══════════════════════════════════════════════════════╝
               ↓ Observation[]
╔══════════════╩═══════════════════════════════════════════════════════╗
║               COS — TRANSLATION LAYER                      🟢 Active ║
║                                                                      ║
║  translateObservations(observations, rules[])                        ║
║  Translation { observationId, meaning, confidence }                  ║
║                                                                      ║
║  DC provides TranslationRule[] ←─── Professional Knowledge          ║
╚══════════════╦═══════════════════════════════════════════════════════╝
               ↓ Translation[]
               │                    ╔═════════════════════════════════╗
               │                    ║   COS — CONTEXT STORE  🟡 Move  ║
               │                    ║                                  ║
               │◄───────────────────║  ContextStore (7 categories)    ║
               │  institutional     ║  Currently: lib/onboarding/     ║
               │  context           ║  Should be: platform/cos/       ║
               │                    ╚═════════════════════════════════╝
               │
               │                    ╔═════════════════════════════════╗
               │                    ║   KNOWLEDGE GRAPH      🟢 Active ║
               │                    ║                                  ║
               │◄───────────────────║  KnowledgeGraph + concepts       ║
               │  prior knowledge   ║  UnderstandingEngine             ║
               │                    ║  (DC retrieves applicable nodes) ║
               │                    ╚═════════════════════════════════╝
               ↓
╔══════════════╩═══════════════════════════════════════════════════════╗
║          COS — UNDERSTANDING FORMATION            🔴 Missing         ║
║                                                                      ║
║  form(translations, context, priorKnowledge) → Understanding         ║
║                                                                      ║
║  COS provides: synthesis algorithm, confidence derivation,           ║
║                uncertainty derivation, completeness assessment,      ║
║                output format, invariants                             ║
║                                                                      ║
║  DC provides:  translation rules, situational context,               ║
║                knowledge retrieval (all via inputs above)            ║
╚══════════════╦═══════════════════════════════════════════════════════╝
               ↓ Understanding { summary, confidence, uncertainty,
               │                 completeness, evidenceChain }
               │
               │           ┌── completeness:"insufficient" ─────────┐
               │           │                                         ↓
               │           │           ╔═══════════════════════════════╗
               │           │           ║  SEEK / TALK.GET OS           ║
               │           │           ║  (request missing inputs)     ║
               │           │           ╚═══════════════════════════════╝
               │           │                         │
               │           │    more observations    │
               │           └─────────────────────────┘
               ↓
╔══════════════╩═══════════════════════════════════════════════════════╗
║              JUDGEMENT ENGINE                          🟢 Active     ║
║                                                                      ║
║  JudgementEngine.judge({ understanding }) → Judgement                ║
║  Disposition: proceed / caution / human-required / insufficient      ║
╚══════════════╦══════════════════╦════════════════════════════════════╝
               ↓                  ↓ human-required
╔══════════════╩════╗      ╔══════╩══════════════════════════════════╗
║  ACTION ENGINE    ║      ║  HUMAN AUTHORITY                        ║
║  AuthorityEngine  ║      ║  (decision by person)                   ║
║  ExecutionEngine  ║      ╚═══════════════════════════════════════╦═╝
╚══════════════╦════╝                                              │
               ↓ Execution (outcome, effect)                       │
╔══════════════╩═══════════════════════════════════════════════════╝
║              REFLECTION ENGINE                         🟢 Active     ║
║                                                                      ║
║  ReflectionEngine.reflect({ execution }) → Reflection                ║
╚══════════════╦═══════════════════════════════════════════════════════╝
               ↓ Reflection
╔══════════════╩═══════════════════════════════════════════════════════╗
║              LEARNING ENGINE                           🟢 Active     ║
║                                                                      ║
║  LearningEngine.build({ reflection }) → Learning                     ║
╚══════════════╦═══════════════════════════════════════════════════════╝
               ↓ Learning
╔══════════════╩═══════════════════════════════════════════════════════╗
║          KNOWLEDGE GOVERNANCE ENGINE                   🟡 Partial    ║
║                                                                      ║
║  KnowledgeGovernanceEngine.review({ learning }) → ApprovedChange     ║
║                                                                      ║
║  ApprovedChange → KnowledgeGraph update        🔴 Not yet wired      ║
║  KnowledgeGraph update → better future Understanding                 ║
╚══════════════════════════════════════════════════════════════════════╝
```

**Legend:**

```
🟢 Active    — implemented and connected in code
🟡 Partial   — implemented but connection incomplete or scoped incorrectly
🔴 Missing   — not implemented; documented only
```

---

## Task 5: Implementation Preconditions

What must be true before any implementation begins. These are conditions, not recommendations.

---

### Precondition 1: ContextStore must be in COS

**Current state:** `lib/onboarding/contextStore.ts`  
**Required state:** `platform/cos/context/contextStore.ts` (or equivalent COS path)

**Why:** Formation is a universal COS capability. It depends on context. If ContextStore remains in onboarding, formation cannot be universal — it would only work during onboarding. Every DC that uses formation must be able to supply context through the same mechanism.

**Risk:** Moving ContextStore will break the OnboardingEngine's import. The onboarding flow must be re-wired to import from the new COS location. Low risk — ContextStore has no logic; it is a data structure.

**Not a blocker if:** Formation is built with context as an inline input (not ContextStore-dependent) initially, with the ContextStore migration following.

---

### Precondition 2: Canonical Understanding type must be agreed

**Current state:** Three Understanding types exist with no canonical designation:
- `lib/understanding/Understanding.ts` — operational base (`summary, confidence, uncertainty`)
- `lib/academy/academyTypes.ts` — formation variant (`completeness, adviceWouldRequireAssumptions`)
- `platform/core/companion/types.ts` — routing signal (`understood, nextStep`)

**Required state:** One canonical Understanding type that serves as the output of formation and the input to JudgementEngine.

**Ruling required:** Which file is canonical? The `lib/understanding/Understanding.ts` file is the best candidate — it is already imported by JudgementEngine. The two missing fields (`completeness`, `evidenceChain`) should be added to this type, not defined in a fourth place.

**Risk:** Adding fields to `Understanding` is additive. JudgementEngine will need to read `completeness` for the new routing logic. Existing tests use manually constructed Understanding objects — they will need to provide the new fields (can use defaults: `"sufficient"` and `[]`).

---

### Precondition 3: CognitiveTrace is a prototype, not the implementation

**Current state:** Formation journeys use `CognitiveTrace` and work. This may create pressure to make `CognitiveTrace` the canonical implementation.

**Required state:** `CognitiveTrace` remains in `lib/academy/` as a formation trace record. The new Understanding Formation capability does not replace it — it extracts the universal synthesis step from it.

**Why:** `CognitiveTrace` carries Academy-specific fields (speaker, candidateResponses, judgement). These are correct for formation journeys. The formation contract should not carry them. If `CognitiveTrace` is used as the production type, formation becomes Academy-scoped rather than universal.

**Agreement needed:** The Academy's CognitiveTrace and the COS formation contract serve different purposes. Both are correct. Neither replaces the other.

---

### Precondition 4: Three parallel architectures must be resolved

**Current state:** Three pipelines exist and do not connect:
1. `platform/core/companion/` — behavioural loop with pre-assessed flags
2. `lib/` engines — governed lower pipeline from Understanding to Learning
3. `lib/annie/brain/index.ts` — Annie's demonstration pipeline

**Required state:** One canonical pipeline that Understanding Formation enters. Formation must know which pipeline receives its output.

**Minimum resolution needed:** A decision on whether `lib/` engines are canonical for operational DCs. The evidence suggests yes — they are the most complete governed pipeline. `platform/core/companion/` and `lib/annie/brain/` are precursors or demonstrations.

**Not required before Formation exists:** Formation can be defined and tested against `lib/` engines without resolving whether `platform/core/` is superseded. But this question must be answered before Formation is deployed in production.

---

### Precondition 5: The Learning feedback loop must be closed

**Current state:** `KnowledgeGovernanceEngine` produces `ApprovedKnowledgeChange`. Nothing applies it to `KnowledgeGraph`.

**Why this affects Formation:** Formation depends on `KnowledgeGraph` (via knowledge retrieval). If approved changes never enter the graph, formation cannot improve from experience. The learning feedback loop exists structurally but the final connection is missing.

**Not a blocker for Formation itself.** Formation works with the current KnowledgeGraph. But the full cycle — Understanding → Judgement → Action → Learning → better future Understanding — cannot close until this wire is added.

**Timing:** This should be closed shortly after Formation is implemented, not before.

---

### Precondition 6: The test scenario exists

**Current state:** `scripts/test-companion-intelligence-cycle.ts` contains `buildFridgeSafetyUnderstanding()` — a manually constructed Understanding for a fridge temperature scenario. The full pipeline from Understanding → Judgement → Action → Execution → Reflection → Learning is tested and passes.

**Required state:** This test is the reference scenario for Formation. When Formation is implemented, this test should be extended so that the Understanding is produced by the Formation mechanism rather than hand-authored.

The test scenario already exists. The implementation must prove it produces the same Understanding that the hand-authored version currently provides.

---

### Precondition 7: Invariants must be agreed before synthesis logic is written

**The five invariants (from the contract):**

```
1. Formation never invents meaning absent from its inputs.
2. Uncertainty is never empty when inputs are incomplete.
3. evidenceChain is never empty.
4. completeness is derived, never asserted.
5. confidence is derived from input confidence, never authored.
```

These are correctness guarantees. If they are not agreed before implementation, the synthesis logic may pass tests while violating the contract's intent. The invariants must be test criteria, not post-hoc observations.

---

### Summary of Preconditions

| Precondition | Blocking? | Timing |
|---|---|---|
| ContextStore in COS | Not blocking initially | Before full DC deployment |
| Canonical Understanding type agreed | **Blocking** | Before writing Formation |
| CognitiveTrace remains Academy-only | **Blocking** | Before writing Formation |
| Three architectures resolved | Not blocking initially | Before production deployment |
| Learning feedback loop closed | Not blocking | Shortly after Formation |
| Test scenario extended | Not blocking | After Formation implemented |
| Invariants agreed as test criteria | **Blocking** | Before writing Formation |

---

## Validated Conclusion

The hypothesis is confirmed with one refinement.

**Confirmed:**  
Understanding Formation is a universal COS capability. COS owns the synthesis mechanism. Digital Colleagues supply domain content through translation rules, situational context, and knowledge retrieval. Human authority is downstream.

**Refinement:**  
"Professional Knowledge" does not participate in formation directly. It participates through the DC. The DC is the bridge between professional domain knowledge and the universal COS mechanism. This is consistent with the existing Observation and Translation pattern.

**The canonical contract is:**

```
form(Translation[], FormationContext, FormationKnowledge[]) →
  Understanding {
    summary, confidence, uncertainty[],
    completeness, evidenceChain[]
  }
```

**The missing act is synthesis** — the combination of domain-applied meaning, situational context, and applicable knowledge into a statement of what is happening. Everything required for synthesis already exists in the repository. The synthesis step does not.

---

**Status:** Boundary validated | Contract confirmed | Preconditions identified | No code written

