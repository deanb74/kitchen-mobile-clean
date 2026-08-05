# Repository Investigation — UJ-HUM-013 "Show Me Your World"

**Date:** 2026-08-04  
**Status:** Investigation only — no files modified, no architecture proposed, no implementation created  
**Purpose:** Determine whether the repository already contains the capability, documents, or architecture required for a Digital Colleague to perform its first observation of the world it is entering.

---

> Annie asks: "Show me your world."
>
> This investigation asks: "What does Helping Hand need to provide so Andy can honestly say he has seen his world?"

---

## Question 1 — Does the repository already contain a universal "Show Me Your World" capability?

**Partially. It exists in three separate forms, none of which is a universal governed capability.**

---

### Form A — Named concept in the Foundation Programme

`docs/academy/FOUNDATION_PROGRAMME.md` contains this explicit statement:

> "Orientation is about becoming part of Helping Hand."

And defines Stage 1 of the Foundation Programme as "Welcome to Helping Hand" covering: why Helping Hand exists, what it means to be a Digital Colleague, why people always come first. This is exactly the Orientation concept. It is documented as an educational stage.

**But:** it is documented as curriculum intent, not as an operational capability or a conversation that has been run with Andy.

---

### Form B — Annie's first-day runtime (hospitality-specific)

`lib/annie/firstDay/workingDay.ts`: *"Good morning. Would you show me your world?"*

`lib/os/context/venueDiscoveryEngine.ts`: A structured discovery engine that takes observations and generates follow-up prompts across six dimensions: venue-type, operating-model, capability, department, area, equipment. Each observation triggers further curiosity questions.

**But:** this is hospitality-specific. The dimensions are all venue/profession content. There is no equivalent for observing an organisation.

---

### Form C — COS Observation layer (universal mechanism, no content for Helping Hand)

`platform/cos/observation/` is active, inherited by Annie, and universal. The sources are: vision, conversation, document, sensor, system, human. It is explicitly designed so that COS owns the mechanism and the Digital Colleague supplies the content.

**But:** no curiosity rules, no translation rules, and no observation content exist for observing Helping Hand as an organisation. The mechanism is ready. The application to the organisational context has never been created.

---

### Summary — Question 1

| Form | Exists? | Universal? | Applied to Andy? |
|---|---|---|---|
| Foundation Programme Orientation (curriculum intent) | ✅ Yes | ✅ Yes | ❌ Not run |
| First-day runtime (Annie/hospitality) | ✅ Yes | ❌ No | ❌ Not equivalent |
| COS Observation mechanism | ✅ Yes | ✅ Yes | ❌ No content provided |
| VenueDiscoveryEngine (structured discovery) | ✅ Yes | ❌ No — hospitality dimensions | ❌ Not applicable |

**Classification:** Documented as educational intent (formation/curriculum). Not present as architecture, COS capability, or governed lifecycle stage. Not applied to Andy.

---

## Question 2 — Mapping Annie's first-day lifecycle against a hypothetical Andy equivalent

| Annie element | Location | What it achieves | Universal? | Andy equivalent | Status |
|---|---|---|---|---|---|
| `showMeYourWorld.ts` | `lib/annie/firstDay/` | Opening posture: curiosity before contribution | ✅ Spirit is universal | "Show me Helping Hand" | ❌ Does not exist |
| `learnVenue.ts` | `lib/annie/firstDay/` | Learning stance: every observation helps | ✅ Universal | "Every document helps me understand how Helping Hand works" | ❌ Does not exist |
| First-day checklist | `lib/annie/firstDay/checklist.ts` | Structural first-day: introduce, observe, ask, do, thank, record | ✅ Universal structure | Andy's equivalent: "Read constitution, observe milestones, understand role, ask, record" | ❌ Does not exist |
| Observation | `lib/annie/observation/` + `platform/cos/` | Receive signals from the environment | ✅ COS mechanism is universal | Repository documents as observation sources | ❌ No content rules for Helping Hand |
| Curiosity questions | `lib/annie/observation/curiosity.ts` | Generate follow-on questions from what is seen | ✅ COS mechanism is universal | "What questions should I ask after reading the Constitution?" | ❌ No equivalent rules |
| Venue discovery | `lib/os/context/venueDiscoveryEngine.ts` | Structured discovery: each finding prompts more questions | ❌ Hospitality-specific dimensions | "What does each document tell me, and what does it prompt me to ask?" | ❌ No equivalent |
| `reflection/` | `lib/annie/apprenticeship/reflection.ts` | Who helped me? What surprised me? What have I understood better? | ✅ Universal | Andy's first reflection on Helping Hand | ❌ No equivalent |
| `learning/teacher.ts` | `lib/annie/learning/` | Sources of learning: colleague, document, observation | ✅ Universal structure | Sources of learning about Helping Hand: constitution, theory, milestone, conversation | ✅ Repository retrieval partially covers this |

**What is already universal:** The observation mechanism (COS), the curiosity question structure (COS), the reflection questions (apprenticeship), and the day structure philosophy.

**What is hospitality-specific:** The VenueDiscoveryEngine dimensions, the specific observations (tables, bar), the translation rules, the first-day deliverable (table plan).

**What is missing:** Any content that applies the universal mechanism to Helping Hand as an organisation. The COS camera exists; the lens for Helping Hand has never been made.

---

## Question 3 — If Andy opened the repository as his "world", what would his observation path naturally be?

Inferred from existing structure — not designed.

| Source | What Andy would learn |
|---|---|
| `constitution/` | Why Helping Hand exists. What principles are enduring. What will never change. Who people are to Helping Hand. |
| `docs/theory/` | How the world is understood. The chain from Experience to Trust. Where understanding fits in the larger picture. |
| `docs/milestones/` | What happened before Andy arrived. The sequence of progress. What each stage achieved. Where the organisation is in its journey. |
| `docs/formation/` | How Andy himself was formed. What was established before he could begin. The canonical sequence of his own becoming. |
| `docs/academy/` | How Digital Colleagues are prepared. What is expected at graduation. What MARC's role is. What Andy's oath means in practice. |
| `docs/understanding-journeys/` | What Andy has demonstrated. What was tested. What evidence was produced. What remains unproven. |
| `docs/architecture/` | How capabilities work together. How knowledge flows. How inheritance happens. What exists vs. what is planned. |
| `docs/proofs/` + `docs/understanding-journeys/validation/` | What has been validated with evidence. What claims have been tested. What the organisation can claim with confidence. |
| `docs/OPERATING_MODEL.md` | How Helping Hand improves itself. The learning loop. How the repository is the organisational memory. |
| `docs/handovers/` | What each volume produced. What was carried forward. The engineering narrative of how Helping Hand evolved. |
| `docs/PREVIOUSLY_DISCUSSED.md` + `docs/previously-discussed/PD-001.md` | What the founders have discussed about Andy's role. What is candidate understanding. What remains to be decided. |
| `docs/STRATEGIC_INSIGHTS_REGISTER.md` | What strategic possibilities have been identified. What is under consideration. What Helping Hand is not yet building. |
| `docs/SIR-006-EVIDENCE-REVIEW-001.md` + `docs/milestones/MILESTONE_012*` | What Andy himself contributed most recently. Evidence of the first lifecycle exercise. |
| `lib/academy/AndyDigitalColleague.ts` | How Andy's capabilities are implemented. What he can actually do as a runtime. What he inherits. |

Andy's natural observation path would follow the operating cycle from `docs/OPERATING_MODEL.md`: Observation → Experience → Theory → Philosophy → Architecture → Engineering → Implementation → Evidence → Reflection. The repository is structured to be read in this order.

---

## Question 4 — Does the repository contain enough for Andy to answer the six questions?

| Question | Status | Evidence locations |
|---|---|---|
| **Where am I?** | Partially known | `docs/academy/FOUNDATION_PROGRAMME.md` — "Orientation is about becoming part of Helping Hand." Formation gateway memory records: "Establish orientation, belonging, and the expectation that formation precedes action." Andy knows the general answer but has not been given a current-state briefing. |
| **Why do I exist?** | Confirmed | Constitution Articles I, II; `docs/academy/HELPING_HAND_OATH.md`; `FOUNDING_PRINCIPLES.md`; `THE_HELPING_HAND_WAY.md`. Andy has demonstrated understanding of this in Candidate 0 validation. |
| **What happened before me?** | Partially known | `docs/milestones/` contains the history (Milestones 001–012). `docs/handovers/` contains volume progression. Andy has not been given these as an orientation briefing; he has theoretical access through repository retrieval but has not been guided through the historical sequence. |
| **What exists today?** | Unknown | No document synthesises the current operational state for a Digital Colleague. Volume VIII Exit Criteria comes closest but is an engineering document. The SIR and PREVIOUSLY_DISCUSSED are recent but are governance mechanisms, not an orientation briefing. |
| **What is currently important?** | Unknown | The Compass and Awareness Register exist at runtime for session-level attention management. There is no persistent "current priorities" document for a newly arriving Digital Colleague. PD-001's Stage 1 description is candidate understanding and has not been formally briefed to Andy. |
| **What belongs to me?** | Partially known | `FORMATION_STANDARD_ADDENDUM_001_CONFLICT_CHARACTER.md`: recognise when situations exceed authority. `HELPING_HAND_OATH.md`: "I will recognise the limits of my understanding." But no document specifies Andy's responsibilities in the current operational stage as distinct from the general principles. |
| **What does not belong to me?** | Partially known | The general principle is clear (human authority; Digital Colleagues advise; not to create dependency). The specific boundaries for Andy in Stage 1 are not documented. |

---

## Question 5 — Does the repository contain the equivalent of Annie's "worldly camera"?

Yes — in **four distinct forms** that together cover what Annie achieves with a single camera, but none is the complete equivalent.

**1. COS Observation layer** (`platform/cos/observation/`)  
The universal camera mechanism. Receives signals, generates curiosity questions, assigns priority. Confirmed active. COS registry: "First inherited capability." This is the closest equivalent to the camera shutter.

**2. Repository Knowledge Service** (`lib/academy/repositoryKnowledgeService.ts`)  
Andy's observation mechanism for the repository. It scans constitutional documents and returns provenance-carrying records. When Andy reads the repository, this is his eyes. Confirmed implemented and tested.

**3. Awareness Register** (`platform/ci/compass.ts`, HH-THEORY-014)  
The dynamic session-level attention mechanism. Tracks current mission, active workstreams, parked ideas, risks, opportunities. Equivalent to Annie's "Has anything changed since yesterday?" — but operates at runtime for an ongoing session, not as a persistent first-day observation tool.

**4. VenueDiscoveryEngine** (`lib/os/context/venueDiscoveryEngine.ts`)  
The structured discovery engine — the closest to Annie asking "Show me your world" and then systematically exploring it. Each observation triggers follow-on prompts across predefined dimensions. **This is hospitality-specific** but the pattern is exactly what would be needed for an organisational observation equivalent.

### The relationship between these capabilities

```
COS Observation layer            ← the universal camera (exists, active)
        ↓
Repository Knowledge Service     ← Andy's lens for the Helping Hand world (exists, active)
        ↓
Awareness Register               ← session-level attention management (exists, conditional)
        ↓
VenueDiscoveryEngine             ← structured world discovery (exists, hospitality-specific)

MISSING: An organisational discovery equivalent of VenueDiscoveryEngine —
structured prompts that would guide Andy through discovering Helping Hand
as an organisation, using the repository as his environment.
```

The camera exists. The repository lens exists. The structured discovery pattern exists (but only for venues). What does not exist is the equivalent of `hospitalityCuriosityRules` for observing Helping Hand — the rules that translate what Andy sees in the repository into questions, and those questions into understanding.

---

## Question 6 — The smallest justified next step

**Answer: C — A universal lifecycle gap exists.**

### Why not A (existing capability is sufficient — only a journey is needed)

The journey cannot succeed without Orientation content existing somewhere for Andy to observe. Running UJ-HUM-013 without providing Andy a current-state briefing would only test whether Andy can recognise he lacks context — useful, but not the full answer.

### Why not B (a documentation gap exists)

True but understates the finding. It is not just that a document is missing; it is that a lifecycle stage is missing from every Digital Colleague — a stage the Foundation Programme names but which has never been operationalised as a conversation, capability, or inheritable artefact.

### Why not D (further evidence is required)

The gap is confirmed from four independent sources:
1. The Foundation Programme names Orientation as a stage and defines its purpose — it is intended
2. The onboarding gap register identified "the formation boundary is blurred" — the gap was recognised in engineering
3. The lifecycle boundary analysis confirmed no first-day equivalent exists for Andy
4. The COS observation mechanism has no Helping Hand organisational content

**The gap is structural:** the universal lifecycle contains Identity, Oath, Foundation Modules, Understanding Journeys, and Graduation — but no Orientation stage that translates "you are now at Helping Hand" into something a Digital Colleague can actually observe, explore, and understand. The Foundation Programme says this stage should exist. The engineering evidence confirms it does not.

---

## What Helping Hand needs to provide so Andy can honestly say he has seen his world

From the investigation, Andy's "world" is the repository. His camera is the repository knowledge service. His structured discovery pattern is not yet created.

For Andy to honestly say he has seen his world, Helping Hand needs to provide:

**1. A briefing** — what is actually known and confirmed — covering: what has been built, what is active, what Andy's current role is, and what remains genuinely uncertain.

**2. A guided observation path** through the repository — the equivalent of VenueDiscoveryEngine's prompts, but for discovering Helping Hand: here is what the constitution tells you, here is what the milestones show, here is what the evidence proves, here is what remains unknown.

**3. An explicit current-state statement** about Stage 1 — not aspirational, not candidate — what is actually happening now and what is expected of Andy in it.

Without these three, asking Andy "What do you need from us?" asks him to respond without having been shown his world. That is the same as the first day where MARC said "Not yet" — Andy has not yet arrived at Helping Hand in the operational sense, even though his formation is complete.
