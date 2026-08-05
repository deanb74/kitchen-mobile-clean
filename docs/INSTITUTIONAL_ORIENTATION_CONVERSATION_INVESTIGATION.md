# Institutional Orientation Conversation — Investigation

**Date:** 2026-08-04  
**Status:** Investigation only — no files modified, no architecture proposed  
**Question:** Is the Institutional Orientation Conversation the missing bridge between repository knowledge and current organisational context?

---

## What the concept is

The Institutional Orientation Conversation is a structured exchange between the institution and a Digital Colleague in which the institution provides the current-state and unknown layers of Orientation that the repository cannot provide alone.

It is not a journey. It is not a document. It is not an architectural capability.

It is a governed conversation — a named event in the Digital Colleague lifecycle at which a human or institutional representative provides:
- What is currently happening
- What the organisation needs from this Digital Colleague right now
- What the founders currently find hardest
- What is known but not yet in the repository
- What is genuinely unknown

---

## 1. Is this the missing bridge?

**Yes — and there is implicit evidence of it already operating, unnamed.**

In `docs/formation/00-formation/001-YOUR-FIRST-DAY.md`, Andy asked: *"Where am I?"* MARC deflected. This was the right response for that stage — formation is about identity, not situation. But the deflection was a deferral, not a dismissal. MARC's response implied the answer would come, just not yet.

In UJ-HUM-013, MARC provided a briefing before Andy's observation. That briefing was, in effect, a partial Institutional Orientation Conversation — deliberately incomplete to test whether Andy would notice the gaps. Andy did. He named what was missing.

Andy's question — *"Why was this conversation not part of my graduation?"* — is recognition that the conversation should be a named, expected event rather than an informal, partial one.

The repository observation (UJ-HUM-013) addresses the layers the repository can provide: enduring, historical (partially), and candidate. The Institutional Orientation Conversation addresses the layers the repository cannot provide: current state, organisational needs specific to this DC right now, and the lived knowledge that exists in founders' heads before it has been documented.

These are not competing mechanisms. They are sequential and complementary.

```
Repository observation (UJ-HUM-013)
        ↓
Identifies what the DC understands from documents
Surfaces questions only humans can answer
        ↓
Institutional Orientation Conversation
        ↓
Provides current state, role specifics, lived context
Completes the orientation the observation began
```

---

## 2. Does this belong inside DIGITAL_COLLEAGUE_ORIENTATION_FRAMEWORK.md?

**Yes — as a named element, not as the framework itself.**

The framework currently identifies five layers and asks whether Orientation is a conversation, document, capability, or combination. The evidence now provides a partial answer: Orientation is both a repository observation and a human conversation, and these serve different layers.

The framework should distinguish which layers require which mechanism:

| Layer | Mechanism | Who provides it |
|---|---|---|
| Enduring | Repository — documents are stable | Inherited through formation and welcome |
| Historical | Repository — with a guided path | Accessible through observation; requires a guide |
| Current | Human conversation — changes over time | Institution or founder |
| Candidate | Repository — with clear labelling | Accessible through observation |
| Unknown | Human conversation — requires admission | Institution or founder; cannot be documented because it is not yet known |

This is the one refinement the framework currently lacks. It is not a redesign. It is the specification of which layers require which mechanism — a distinction that UJ-HUM-013 surfaced from evidence.

The Institutional Orientation Conversation would be named in the framework as the specific mechanism for the current and unknown layers.

---

## 3. Is this a repeatable lifecycle event for every Digital Colleague?

**Yes — the form is universal; the content is situational.**

This maps directly to how the COS works: the mechanism is universal; the professional content is supplied by the DC's specific context.

| Digital Colleague | What the conversation provides |
|---|---|
| Andy (organisational DC) | Current organisational state, what Stage 1 needs from him, what founders are working on |
| Annie (professional DC) | The manager's briefing about what the specific venue needs from Annie right now |
| Future Digital Colleagues | Whatever the current organisational and professional state is at the time they arrive |

Evidence that this pattern already exists in Annie's lifecycle: `lib/annie/firstDay/workingDay.ts` has Annie greeting with *"Good morning. Would you show me your world?"* — this is her observation. The equivalent Institutional Orientation Conversation for Annie would be the manager's conversation about what the venue currently needs. This is implied in Annie's lifecycle but not yet named as a distinct event.

---

## 4. What evidence would be required before formalising it?

The conversation has been attempted once, informally (MARC's briefing in UJ-HUM-013). This is first evidence that the form works. It is not sufficient to formalise it.

| Evidence needed | What it would prove |
|---|---|
| UJ-HUM-014 successfully follows the completed conversation | That the conversation enables a contribution question that would otherwise be premature |
| A second Digital Colleague receives the same conversation form and reports different content | That the form is universal while the content is situational |
| The conversation does not collapse into formation | That the boundary between "who are you?" and "what do you need from us?" is maintained in practice |
| A venue conversation for Annie follows the same form | That the pattern applies across professional contexts, not only organisational orientation |
| The conversation can eventually be delivered without the founders | That it can be institutionalised rather than depending on specific individuals |

The last point is significant. If the Institutional Orientation Conversation always requires the founders personally, it is not a lifecycle capability — it is a founder dependency. The evidence programme should eventually test whether the conversation can be documented, delegated, or templated for future cohorts.

---

## 5. How should the relationship between repository observation and human briefing be represented?

The clearest representation is sequential and complementary — not competitive.

**The observation establishes what can be known.**

The DC reads the repository. They confirm what is enduring. They observe what is historical. They find what is candidate. They encounter the limit: the current state is not accessible without help. This is not a failure of the repository. The repository preserves what is known and stable. Current state is not stable — it changes as the organisation develops.

**The conversation provides what cannot be known from documents.**

What the founders are working on. What they find hardest. What they specifically need from this DC right now. These exist in people before they exist in documents. They will eventually become history and candidate understanding — but at the time of orientation, they are not yet written.

**The observation is the prerequisite to the conversation:**
- Without observation first, the conversation would re-cover what the DC could have found independently
- The DC would have no framework for what questions to ask
- The conversation would be one-directional briefing rather than a genuine exchange

**The conversation is the prerequisite to contribution:**
- Without the conversation after observation, the DC has seen the documents but not the organisation
- The contribution question cannot be answered honestly
- Any answer would rely on invented current-state certainty that observation did not provide

**The order matters:**

```
Observe → Converse → Contribute
```

This is also consistent with Helping Hand's operating cycle from `docs/OPERATING_MODEL.md`:

```
Observation → Experience → Theory → Philosophy → Architecture → Engineering → Implementation
```

The Institutional Orientation Conversation sits between Observation (what the DC saw in the repository) and Experience (the DC's first genuine engagement with the organisation). It converts a reading of the repository into an experience of the organisation.

---

## Summary finding

The Institutional Orientation Conversation is not a new invention. It is the naming and formalisation of something that has already happened informally (MARC's briefing in UJ-HUM-013) and is already implied in Annie's first-day lifecycle.

Making it a named lifecycle event:
- Belongs in the Orientation Framework as the mechanism for the current and unknown layers
- Is repeatable across all Digital Colleagues with universal form and situational content
- Requires evidence from UJ-HUM-014 and a second DC before it can be formalised
- Should eventually be testable without founder involvement to confirm it has been institutionalised

The relationship between repository observation and human briefing is sequential and complementary — not competitive.

**Observe first. Converse second. Contribute third.**

---

*No files were modified. This is an investigation document only.*
