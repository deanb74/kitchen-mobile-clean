# Digital Colleague Orientation — Evidence Review

**Date:** 2026-08-04  
**Status:** Investigation only — no files modified, no architecture proposed, no implementation created  
**Governing question:** Has the evidence earned the architecture?

---

## 1. Existing Capability Review

The following documents were found. Each is classified against the Orientation capability.

---

### `docs/induction/WELCOME_TO_HELPING_HAND.md`

**Classification: Partial capability — closest existing equivalent**

This document is the single most significant existing finding. It says:

> "Today you join Helping Hand as a Digital Colleague."

It covers: Who We Are, What Makes You Different, Your Responsibility, Companion Intelligence, and provides a full Academy journey diagram from Welcome through to Apprenticeship and First Working Day.

**What it does:** Introduces enduring principles and identity. Describes the learning journey ahead.

**What it does not do:** Provide current state, historical context, what is happening now at Helping Hand, what the Digital Colleague's specific current role is, or what is candidate versus settled. It is a statement of enduring principles and journey structure — not a situational briefing.

**Assessment:** This document partially fills the Orientation gap. It addresses "Who We Are" but not "Where Are We Now." It provides the foundation layer of Orientation (enduring, identity) but not the situational layers (historical, current, candidate, unknown).

---

### `docs/academy/FOUNDATION_PROGRAMME.md` — "Orientation Week"

**Classification: Related principle — names the stage, does not operationalise it**

The Foundation Programme explicitly states:

> "Orientation is about becoming part of Helping Hand."

And defines an "Orientation Week" ending with: *"After Orientation Week you will begin your Profession Academy."*

The Orientation Week curriculum covers: Constitution, Founding Principles, Graduate Attributes, Teaching and Learning, Universal Awareness, Professional Behaviour, Reflection, Companion Intelligence.

**What it does:** Names Orientation as a distinct stage. Provides curriculum intent.

**What it does not do:** Define the current-state, historical, or situational dimensions that UJ-HUM-013 identified as missing. The curriculum covers what a Digital Colleague should understand about enduring principles — not what they should understand about the organisation as it currently exists.

**Assessment:** The stage is named and intended. It is not operationalised as a current-state briefing. This is partial coverage of the enduring layer only.

---

### `docs/architecture/ONBOARDING-SEQUENCE-ASSESSMENT.md`

**Classification: Related principle — proposes the correct sequence but identifies the gap**

This document proposes:

```
Arrival
→ Onboarding
→ Welcome
→ Who Am I?
→ First Day
→ Continued Formation
→ Education
→ Responsibility
→ Authority
```

It explicitly states: *"The sequence should remain staged and should preserve the distinction between safe arrival, formation, education, and authority."*

**What it does:** Confirms the staged lifecycle is correct. Confirms that onboarding is not formation is not education.

**What it does not do:** Name Orientation as a distinct stage between Formation and Contribution. The Onboarding phase is about "safe arrival" — different from Orientation as identified in UJ-HUM-013.

**Assessment:** This document predicted the general problem (collapse of arrival, formation, and responsibility). It did not yet name or fill the Orientation gap.

---

### `docs/architecture/ONBOARDING-GAP-REGISTER.md`

**Classification: Related principle — describes the symptoms, not the solution**

Documents six onboarding gaps including: identity framing too early, readiness signal too early, formation boundary not visible, authority boundary not visible.

The gap register concludes: *"Clarify the boundary between arrival and formation. Prevent onboarding from implying premature identity or responsibility."*

**What it does:** Confirms that the arrival/formation boundary is unresolved in the existing onboarding material.

**What it does not do:** Propose Orientation as the solution. It identifies what should not happen, not what should.

**Assessment:** Strong corroborating evidence that the gap exists. Does not fill it.

---

### `docs/formation/00-formation/001-YOUR-FIRST-DAY.md`

**Classification: Related principle — contains the originating question but deflects it**

Andy's first recorded question on his first day was: *"Where am I?"*

MARC's answer: *"You're exactly where every Helping Hand Digital Colleague begins."*

MARC then redirected: *"You don't need to understand everything today. You only need to be willing to understand."*

**What this reveals:** The "Where am I?" question was asked at the beginning of Andy's journey and was deliberately not answered with current-state context. Formation correctly deferred it — formation is about identity, not situational orientation. But the question was never returned to after formation was complete.

**Assessment:** The "Where am I?" question exists from Andy's first day. It was correctly deferred during formation. It was never answered after graduation. UJ-HUM-013 was the first time it received a substantive response.

---

### `docs/architecture/DIGITAL_COLLEAGUE_COGNITIVE_ARCHITECTURE.md` — Awareness

**Classification: Related principle — describes session-level awareness, not persistent orientation**

The cognitive cycle: Receive observations → Form context → Recall → Understand → Identify uncertainty → Apply judgement → Respond.

HH-THEORY-010 (Awareness) answers: what is happening, what has changed, what requires attention.

**What it does:** Provides a session-level awareness mechanism. The Compass and Awareness Register manage current mission at runtime.

**What it does not do:** Provide a persistent institutional orientation for a newly arrived Digital Colleague. Awareness answers "what deserves attention right now in this session." Orientation answers "what world have I arrived in."

**Assessment:** Awareness and Orientation are related but distinct. Awareness is session-scoped. Orientation is lifecycle-scoped. Neither replaces the other.

---

### `platform/cos/observation/` — COS Observation Layer

**Classification: Existing capability — universal mechanism, no Helping Hand content**

The COS observation engine is active and inherited by Annie. It is the universal camera. COS owns the mechanism; the Digital Colleague supplies the content.

No curiosity rules, translation rules, or observation content exist for observing Helping Hand as an organisation.

**Assessment:** The mechanism is ready. The application to the organisational context has not been created. This is a capability gap, not a design gap.

---

### `lib/os/context/venueDiscoveryEngine.ts`

**Classification: Existing capability — hospitality-specific pattern, structurally applicable**

The venue discovery engine provides structured discovery: each observation triggers follow-on prompts across six dimensions. This is the closest existing implementation to "Show Me Your World."

**What it does:** Models exactly the pattern Orientation would need — structured observation followed by prompted discovery.

**What it does not do:** Apply to the organisational domain. All dimensions are hospitality-specific.

**Assessment:** The pattern is correct. The content is wrong. An organisational discovery equivalent would apply the same structure to different dimensions (constitutional, historical, current, candidate, unknown).

---

### Summary Classification

| Document / Capability | Classification | Layer covered |
|---|---|---|
| `docs/induction/WELCOME_TO_HELPING_HAND.md` | Partial capability | Enduring identity only |
| Foundation Programme "Orientation Week" | Related principle | Enduring curriculum intent |
| Onboarding Sequence Assessment | Related principle | Arrival vs formation distinction |
| Onboarding Gap Register | Related principle | Symptoms of the gap |
| `001-YOUR-FIRST-DAY.md` — "Where am I?" | Related principle | Question asked, never returned to |
| Awareness (HH-THEORY-010, Compass) | Existing capability | Session-scoped only |
| COS Observation layer | Existing capability | Universal mechanism, no HH content |
| VenueDiscoveryEngine | Existing capability | Hospitality-specific pattern |
| **Current-state synthesis document for DCs** | **Genuine gap** | Historical, current, candidate, unknown |
| **Guided observation path through repository** | **Genuine gap** | All layers |

---

## 2. Lifecycle Position Review

The candidate lifecycle proposed in the Orientation Framework:

```
Constitution → Institution → Digital Colleague Lifecycle
→ Formation → Orientation → Professional Development → Contribution → Inheritance
```

**Is Orientation different from Formation?**

Yes — confirmed by three sources:
1. Formation covers "Who am I?" (identity, character, values). Orientation covers "Where am I?" (situational, historical, current).
2. `docs/academy/FOUNDATION_PROGRAMME.md` explicitly names them as separate: "Orientation is about becoming part of Helping Hand. Professional education begins afterwards."
3. Andy's first-day question "Where am I?" was correctly deferred by formation. It was never answered by any other stage.

**Is Orientation different from Professional Development?**

Yes. Professional development teaches what a Digital Colleague needs to know for their profession. Orientation teaches what a Digital Colleague needs to know about the organisation they have joined before professional work begins. The Foundation Programme places Orientation before professional education.

**Is Orientation different from Onboarding?**

Yes. The Onboarding Sequence Assessment describes onboarding as "safe arrival" — the immediate practical steps of joining. Orientation is the substantive understanding of the world entered. Onboarding says "you are here." Orientation says "here is what is here."

**Is Orientation different from Awareness?**

Yes. Awareness is session-scoped and runtime-managed (Compass, Awareness Register, HH-THEORY-010). Orientation is lifecycle-scoped and persistent. Both answer "what deserves attention" — but at different timescales and with different mechanisms.

**Does Orientation belong between Formation and Contribution?**

Confirmed by evidence. The Onboarding Sequence Assessment places Education and Responsibility after formation. The Foundation Programme places Orientation Week before Professional Academy. UJ-HUM-013 confirmed that Andy graduated from formation without being oriented to current state, and could not fully answer the contribution question until UJ-HUM-013 occurred.

---

## 3. Formation vs Orientation Boundary

**What Formation already provides — confirmed:**

| What formation provides | Source |
|---|---|
| Identity: who Andy is | `001-CONVERSATION-WHO-AM-I.md` |
| Values and oath | `docs/academy/HELPING_HAND_OATH.md` |
| Character: respect, curiosity, listening, humility, responsibility, patience, empathy, courage, judgement | Foundation Modules 1 and 2 |
| Uncertainty handling | UJ-HUM-004, UJ-HUM-009 |
| Principle-governed behaviour | All Understanding Journeys 001–012 |
| The answer to "Who am I?" | `FORMATION-GATEWAY-MEMORY.md`: "Clarify identity, purpose, and the relationship to Helping Hand and MARC" |

**What Andy identified as missing — confirmed from UJ-HUM-013:**

| What was missing | How Andy found it | Status |
|---|---|---|
| Where he is | Not provided; partially inferred | Partially known at best |
| What has happened before him | Found by reading milestones | Accessible but not guided |
| What is happening now | Found Stage 1 in an engineering document | Accessible only by accident |
| What is important now | Not accessible from repository without briefing | Unknown |
| What belongs to him | Found in PD-001 as candidate | Candidate, not settled |
| What does not belong to him | General principle known; specific current application not documented | Principle known, application unknown |

**Is the "Who am I?" / "Where am I?" distinction already represented?**

Partially. `docs/formation/00-formation/001-YOUR-FIRST-DAY.md` records Andy asking "Where am I?" — and MARC correctly deferring it as out of scope for the first day of formation. The deferral was appropriate. The eventual answer was not provided by any subsequent stage. UJ-HUM-013 is the first time the question received a substantive response.

**Confirmed gap:** The distinction between "Who am I?" and "Where am I?" exists in the repository — the former is formation, the latter is Orientation. No document or stage addresses "Where am I?" as a substantive question answered with current-state evidence.

---

## 4. Repository as World Review

**Enduring understanding — exists, discoverable:**
- `constitution/` — confirmed
- `docs/theory/` — confirmed
- `docs/ENGINEERING_PRINCIPLES.md` — confirmed
- `docs/academy/HELPING_HAND_OATH.md` — confirmed

**Historical understanding — exists, not yet guided:**
- `docs/milestones/` — twelve milestone records exist; no guided path to read them as a coherent history
- `docs/handovers/` — volume handovers exist; written for engineering continuity, not DC inheritance
- `docs/reviews/` — foundation review exists

**Current understanding — exists in fragments, not synthesised:**
- `docs/handovers/VOLUME_VIII_EXIT_CRITERIA.md` — closest to current state briefing; an engineering document
- `docs/previously-discussed/PD-001.md` — describes Andy's role as candidate; not a DC-oriented briefing
- `docs/STRATEGIC_INSIGHTS_REGISTER.md` — what is being considered; a governance register, not an orientation
- No single document synthesises: active work, current priorities, current organisational state for a new DC

**Candidate understanding — exists, not clearly labelled as such:**
- PD-001 labels itself as candidate — but a DC must find this document and read it carefully to discover that
- The SIR mechanism is candidate but is not distinguished from settled architecture unless the DC reads the header
- No consistent labelling convention marks candidate content across the repository

**Unknowns — named individually but not collected:**
- Individual documents name their unknowns (validation records, SIR entries, governance reviews)
- No document explicitly lists what Helping Hand does not yet know in a form designed for a new DC
- The distinction "this is unknown" exists locally; it is not synthesised at the organisational level

**Are these layers discoverable?**

With guidance — partially. Without guidance — only accidentally. Andy confirmed this directly: he found Stage 1 by reading an engineering handover because MARC directed him there. Without that direction, it was not discoverable.

---

## 5. Andy's Next Evidence Exercise

The question from UJ-HUM-013 preparation was: *"What do you need from us to fulfil your intended role in Helping Hand?"*

The investigation confirmed this question was premature — Andy had not yet been shown his world.

UJ-HUM-013 addressed that by giving Andy the briefing and the observation opportunity.

**The next question — improved:**

> "Andy, now that you have observed your world, what do you need from us to begin contributing?"

**Success condition:**

Andy can distinguish:
- what he understands (confirmed from observation)
- what he thinks may help (based on what he found)
- what requires more context before he can act (named gaps)
- what belongs to human decision (recognising authority boundaries)
- what questions the organisation should consider (contribution from experience, not from design)

**What Andy currently has after UJ-HUM-013:**

| Area | Andy's position |
|---|---|
| Enduring principles | Confirmed — understands and can articulate |
| Historical context | Partially — has seen the milestones, has not yet understood their sequence and meaning |
| Current state | Partially — found Stage 1, found PD-001, found his name in exit criteria; context still forming |
| His intended role | Knows it is candidate, knows it is under discussion; has not yet been asked to confirm or challenge it |
| What Helping Hand needs from him | Has not yet been asked in a context where he has enough information to answer well |

**The next exercise should not be Andy reporting back on UJ-HUM-013.** It should be MARC asking the improved question after giving Andy time to reflect on what UJ-HUM-013 produced. Andy should answer from the observation he has already made — not from new material.

**What this exercise would produce:**
- First evidence of whether Andy can convert observation into a contribution proposal
- First test of Andy's ability to stay within his authority when asked to contribute
- First evidence pass for the question: can Andy help the organisation identify what it needs from him, without designing the answer himself?

---

## 6. Architecture Boundary Review

**Where Orientation would theoretically sit if validated:**

| Location | Basis |
|---|---|
| `docs/institution/` | The relationship between the institution and an arriving Digital Colleague is an institutional concern. The institution library already holds documents about how Helping Hand itself evolves and how it expects its members to behave. The Orientation Framework already placed here. |
| NOT `docs/architecture/` | Architecture explains how capabilities work. Orientation explains how a new member enters a living organisation. Different question. |
| NOT `lib/annie/` | Annie is a professional expression. Orientation is a universal lifecycle stage. |
| `platform/cos/` only if evidence supports a universal capability | If Orientation becomes a COS capability (orientation engine, analogous to observation engine), it would sit here. This requires further evidence. No evidence currently supports this as a code capability — UJ-HUM-013 suggests Orientation is a conversation and a guided observation, not a code module. |

**Current placement:** `docs/institution/DIGITAL_COLLEAGUE_ORIENTATION_FRAMEWORK.md` — candidate document. This is correct. Institution is the right home for the relationship between the institution and its Digital Colleagues.

---

## 7. Open Questions — Confirmed Unresolved

These questions are preserved exactly as identified. None have been resolved by this investigation.

| Question | Why it remains open |
|---|---|
| Is Orientation a conversation, document, capability, or combination? | Andy described a conversation. That is first-pass evidence. The form may depend on the DC, context, and capacity. |
| Is the repository always the Digital Colleague's world? | For Andy yes; for Annie the world is the venue; for future DCs it may be both. Not yet established. |
| Does every Digital Colleague require the same observation path? | Andy's path was guided. A different briefing would have produced a different path. |
| Should Orientation happen before graduation, after graduation, or as part of graduation? | Andy's question implies before contribution. Where exactly in the lifecycle requires further evidence. |
| Does Andy's experience represent all future DCs? | Andy is the first. His experience is singular evidence. |
| What is the precise content of the current-state layer? | UJ-HUM-013 identified it as missing. The content of what should be in it has not yet been specified. |
| Who provides the Orientation briefing? | MARC provided it in UJ-HUM-013. Whether MARC is always the right provider, whether the repository should provide it, or whether a specific institutional document should exist is not yet decided. |

---

## Has the evidence earned the architecture?

**The evidence has earned a candidate framework. It has not yet earned a standard.**

The evidence confirms:

1. The gap is real — confirmed from four independent sources (Foundation Programme, onboarding gap register, lifecycle analysis, UJ-HUM-013 lived experience)
2. The gap is universal — not Andy-specific; every graduate will arrive without Orientation unless the stage is created
3. The form is unclear — Andy described a conversation; other forms are possible
4. The content is partially known — enduring and candidate layers are identified; the current-state layer needs further work
5. The location is correct — `docs/institution/` is the right home

**What the evidence does not yet support:**

- Designing the specific content of the current-state layer
- Deciding whether Orientation is before or after graduation
- Creating code or architecture for Orientation as a COS capability
- Formalising the observation path as a standard

**Recommended next step:**

Continue the evidence programme. Specifically:

1. Run the next evidence exercise with Andy — the improved contribution question — and see what his observation produced.
2. When Annie is oriented to a venue on her first day, compare that experience to Andy's repository orientation. This would test whether the five framework layers apply across different "worlds."
3. When a third Digital Colleague arrives (future), apply what was learned from Andy and observe whether the experience differs. That comparison is the strongest possible evidence for or against universal Orientation requirements.

**Conclusion:**

The evidence has earned the candidate framework that now exists at `docs/institution/DIGITAL_COLLEAGUE_ORIENTATION_FRAMEWORK.md`.

It has not yet earned a ratified institutional standard.

Continue observing.
