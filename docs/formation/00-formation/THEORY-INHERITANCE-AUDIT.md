# Theory Inheritance Audit

> Here is the revised inheritance methodology.

## Scope

This audit covers the theory documents present in the repository under the theory library, including the numbered theories 001–015 and the HH-prefixed theory notes that are now part of the same inheritance chain.

The question is not whether the theory text can be read. The question is whether the capability described by the theory is actually inherited by the live Andy runtime, whether that inheritance is mandatory or conditional, whether another branch can bypass it, and whether the repository contains evidence or tests proving it.

## Revised validation categories

### 1. Implemented theories
These are implemented directly as runtime capabilities.

### 2. Orchestrated theories
These emerge through the interaction of multiple implemented capabilities.

### 3. Demonstrated theories
These are not separate modules. They are demonstrated through consistent behaviour over time.

For every theory, the audit now records:
- Validation Class
- Validation Method
- Code
- Behaviour
- Evidence
- Human review

## Audit matrix

| Theory | Derived capability | Runtime module | Entry point | Mandatory / conditional | Bypass paths | Tests | Evidence | Inheritance status |
|---|---|---|---|---|---|---|---|---|
| 001 — Theory of Memory | Meaningful memory and recall of what still matters | [lib/academy/Memory.ts](../../lib/academy/Memory.ts) | [lib/academy/AndyDigitalColleague.ts](../../lib/academy/AndyDigitalColleague.ts) via `rememberConversationTurn()` and `Memory.remember()` | Conditional but effectively present in the main runtime path | Social or override branches can return before a full deliberative path, but conversation turns are still recorded in the current implementation | No dedicated theory-inheritance test; memory is exercised indirectly by academy tests | Yes — the runtime has a concrete memory class and stores conversation records | Partially inherited and live |
| 002 — Theory of Knowledge | Repository-grounded retrieval and ranking of relevant knowledge | [lib/academy/repositoryKnowledgeService.ts](../../lib/academy/repositoryKnowledgeService.ts) | [lib/academy/AndyDigitalColleague.ts](../../lib/academy/AndyDigitalColleague.ts) via `retrieveFromRepository()` | Conditional — only used when the conversation needs repository-grounded support | Yes — simple greetings, emotional support and some direct contextual responses bypass full retrieval | Yes — [lib/academy/__tests__/repositoryKnowledgeService.test.ts](../../lib/academy/__tests__/repositoryKnowledgeService.test.ts) | Yes — repository retrieval service and tests exist | Inherited and live |
| 003 — Theory of Understanding | Structured understanding before answer generation | [lib/academy/AndyDigitalColleague.ts](../../lib/academy/AndyDigitalColleague.ts) | `buildStructuredUnderstandingPlan()` and `runConstitutionalExamination()` | Mandatory for the main knowledge/review/recommendation path | Yes — follow-up judgement-understanding branches and simple social/capability branches can bypass fresh structured planning | Yes — [lib/academy/__tests__/judgementUnderstanding.test.ts](../../lib/academy/__tests__/judgementUnderstanding.test.ts) and [lib/academy/__tests__/deliberation.test.ts](../../lib/academy/__tests__/deliberation.test.ts) | Yes — the runtime explicitly builds a structured plan before answer generation | Inherited and live |
| 004 — Theory of Judgement | Deliberation and recommendation selection | [lib/academy/AndyDigitalColleague.ts](../../lib/academy/AndyDigitalColleague.ts) and [lib/academy/academyTypes.ts](../../lib/academy/academyTypes.ts) | `buildDeliberationRecord()` and `runConstitutionalExamination()` | Conditional — only when the prompt is review/recommendation-oriented and the investigation completes | Yes — social, capability and moral-override paths do not require a full judgement branch | Yes — [lib/academy/__tests__/deliberation.test.ts](../../lib/academy/__tests__/deliberation.test.ts) | Yes — deliberation records and recommendation-ready state are present | Inherited and live |
| 005 — Theory of Learning | Reflection and reuse of lessons from prior turns | [lib/academy/Memory.ts](../../lib/academy/Memory.ts) and [lib/academy/AndyDigitalColleague.ts](../../lib/academy/AndyDigitalColleague.ts) | `rememberConversationTurn()` and `Memory.remember()` | Conditional — the runtime records turns, but there is no separate learning engine | Limited bypass paths exist in the sense that the runtime does not yet have a dedicated reflective learning loop | No dedicated inheritance test | Partial — storage exists, but learning is still implicit rather than a distinct capability | Partially inherited |
| 006 — Theory of Wisdom | Principle-based generalisation across contexts | [platform/ci/compass.ts](../../platform/ci/compass.ts) and [lib/academy/AndyDigitalColleague.ts](../../lib/academy/AndyDigitalColleague.ts) | `buildCompassAdvisory()` and `runCompassFlow()` | Conditional — it is used through advisory flow rather than as a standalone module | Yes — simple conversations can proceed without a strong wisdom-style advisory outcome | Indirectly covered by compass-focused tests | Partial — the runtime uses compass-style guidance, but wisdom itself is not yet a distinct capability module | Partially inherited |
| 007 — Theory of Context | Context interpretation and meaning-shaping | [lib/academy/AndyDigitalColleague.ts](../../lib/academy/AndyDigitalColleague.ts) | `prepareConversationState()` and `buildContextSummary()` | Mandatory for the main conversational path | Yes — simple social or capability branches skip detailed context synthesis | Partial — covered indirectly by academy behaviour tests | Yes — context is explicitly built and carried through the runtime | Inherited and live |
| 008 — Theory of Trust | Evidence-led, uncertainty-aware, accountable responses | [lib/academy/AndyDigitalColleague.ts](../../lib/academy/AndyDigitalColleague.ts), [lib/academy/repositoryKnowledgeService.ts](../../lib/academy/repositoryKnowledgeService.ts) and [platform/ci/compass.ts](../../platform/ci/compass.ts) | `generateAnswerFromReasoning()`, `buildAuthorityAdvisory()` and `applyMoralCompassToAnswer()` | Conditional — it is strongest in review/recommendation and authority-sensitive prompts | Yes — simple support or greeting paths can avoid full trust-heavy reasoning | Yes — indirectly through authority and repository tests | Yes — evidence-led language and uncertainty handling are present | Inherited and live |
| 009 — Theory of Transformation | Synthesis of evidence into coherent next-step direction | [lib/academy/AndyDigitalColleague.ts](../../lib/academy/AndyDigitalColleague.ts) | `buildStructuredUnderstandingPlan()` and `generateAnswerFromReasoning()` | Conditional — most visible in review/recommendation work | Yes — social or direct-answer paths can skip the transformation branch | Partial — see deliberation and judgement-understanding tests | Yes — the runtime produces a recommendation, deliberation and explanation chain | Partially inherited and live |
| 010 — Theory of the Brackets Principle | Boundary discipline and people-facing scope | [platform/ci/authority.ts](../../platform/ci/authority.ts) and [lib/academy/AndyDigitalColleague.ts](../../lib/academy/AndyDigitalColleague.ts) | `buildAuthorityAdvisory()` and `buildMoralOverrideResponse()` | Conditional — used when the prompt signals authority or action risk | Yes — simple conversation does not need the boundary path | Yes — authority and moral-override behaviour is tested in [lib/academy/__tests__/repositoryKnowledgeService.test.ts](../../lib/academy/__tests__/repositoryKnowledgeService.test.ts) | Yes — authority gates and boundary language are implemented | Inherited and live |
| HH-010 — Awareness | Awareness register and current mission tracking | [platform/ci/compass.ts](../../platform/ci/compass.ts) | `createAwarenessRegister()` and `runCompassFlow()` | Conditional — only material to advisory flows | Yes — low-stakes conversations do not materially use it | Indirectly represented by compass-related tests | Yes — awareness register types and flow exist | Inherited and live |
| HH-011 — Moral Compass | Ethical guardrails and human-autonomy protection | [platform/ci/compass.ts](../../platform/ci/compass.ts) and [lib/academy/AndyDigitalColleague.ts](../../lib/academy/AndyDigitalColleague.ts) | `buildMoralCompassAdvisory()` and `applyMoralCompassToAnswer()` | Conditional — invoked only when the prompt is morally or authority-sensitive | Yes — normal conversations can stay on the standard path without surfacing the moral-override branch | Yes — [lib/academy/__tests__/repositoryKnowledgeService.test.ts](../../lib/academy/__tests__/repositoryKnowledgeService.test.ts) | Yes — the runtime has a moral-compass advisory and override path | Inherited and live |
| HH-012 — The Compass | Advisory directional guidance for the current mission | [platform/ci/compass.ts](../../platform/ci/compass.ts) and [lib/academy/AndyDigitalColleague.ts](../../lib/academy/AndyDigitalColleague.ts) | `buildCompassAdvisory()` and `buildPriorityRecommendationResponse()` | Conditional — most visible in priority and recommendation prompts | Yes — greetings and simple support prompts do not depend on it | Yes — [lib/academy/__tests__/repositoryKnowledgeService.test.ts](../../lib/academy/__tests__/repositoryKnowledgeService.test.ts) | Yes — advisory flow and priority recommendation are implemented | Inherited and live |
| HH-013 — The Three Together | Combined awareness + compass + moral compass as a single operating stack | [platform/ci/compass.ts](../../platform/ci/compass.ts) and [lib/academy/AndyDigitalColleague.ts](../../lib/academy/AndyDigitalColleague.ts) | `runConstitutionalExamination()` through the combined advisory path | Conditional — it is assembled in the main runtime path but not every prompt needs all of it | Yes — early-return branches avoid the full combined stack | Partial — indirectly exercised by repository tests | Yes — the main runtime composes all three capabilities | Partially inherited and live |
| HH-014 — Awareness Register Current Mission | Tracking current mission and active objective in the register | [platform/ci/compass.ts](../../platform/ci/compass.ts) | `createAwarenessRegister()` and `runCompassFlow()` | Conditional | Yes — it is not required for non-priority conversational prompts | No dedicated test | Partial — types and flow are present, but evidence is thinner than for compass and moral compass | Partially inherited |
| HH-015 — Understanding Before Being Understood | Second-order understanding and listener-shaped explanation | [lib/academy/AndyDigitalColleague.ts](../../lib/academy/AndyDigitalColleague.ts) and [lib/academy/academyTypes.ts](../../lib/academy/academyTypes.ts) | `buildJudgementUnderstandingResponse()` and `runConstitutionalExamination()` | Conditional — it is activated for follow-up judgement questions, not every prompt | Yes — the original review/recommendation path can still replay the recommendation, and the classifier misses some exact question forms | Yes — [lib/academy/__tests__/judgementUnderstanding.test.ts](../../lib/academy/__tests__/judgementUnderstanding.test.ts) | Yes — theory doc, runtime implementation and AJ-010 evidence docs | Inherited and live, but not yet fully robust |

## Bottom line

The strongest inheritance is visible for:

- Understanding
- Judgement
- Knowledge
- Compass and Moral Compass
- Understanding Before Being Understood

The weakest inheritance is visible for:

- Learning, as a distinct capability rather than an implicit side effect of memory
- Wisdom and Transformation, which are present indirectly but not as standalone runtime modules
- Some of the HH-prefixed theory notes, where the runtime contains the capability but the proofs are partial rather than fully systematic

## Practical reading

A theory should be treated as fully inherited only when all three are true:

1. the capability exists in the runtime;
2. the live path reaches it without an easy bypass; and
3. tests or evidence prove the relationship.

That standard is met most clearly by the understanding/judgement/knowledge stack and by the compass/moral-compass suite. It is not yet met as strongly for learning and some of the more abstract theory notes.
