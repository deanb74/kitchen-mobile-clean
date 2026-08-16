# PD-014 — Trust Is Evidenced, Not Scored

**ID:** PD-014
**Date:** 2026-08-06
**Topic:** How Trust Is Held and Expressed in Governed Knowledge
**Status:** Preserved Architectural Principle — Protects against collapsing trust into a number that hides the reasons behind it

---

## Where This Fits

| Principle | Protects |
|---|---|
| PD-009 — Context Has Authority | Understanding must carry its origin |
| PD-010 — Authority Requires Context | Authority must be grounded in understanding |
| PD-011 — Learning Requires Causation | Learning must carry why it changed |
| PD-012 — Knowledge Inheritance Boundary | Inheritance must be proportional to evidence breadth |
| PD-013 — Knowledge Trust Requires Renewal | Trust must be renewed through continued evidence |
| **PD-014 — Trust Is Evidenced, Not Scored** | **Trust must be remembered through its reasons, not collapsed into a number** |

---

## Core Principle

> A concept is not trusted because it was approved once.
>
> A concept remains trusted because it continues to demonstrate reliability
> when tested by new experience.
>
> The system must remember why trust exists — not just that it does.

---

## Why Not a Trust Score

The natural impulse is to create a number:

> `trustScore: 0.87`

This appears useful. It is dangerous.

A trust score hides the evidence behind a single value. It cannot answer:

- Was this score earned through five independent venue confirmations or five confirmations from the same venue?
- Was this score ever challenged — and if so, did it survive?
- Does this score reflect current conditions, or conditions from six months ago?
- What would need to happen to cause this score to fall?

A trust score optimises for simplicity. Trust requires transparency.

The system should carry the evidence that gives rise to trust — not the number that summarises it.

---

## The Four Sources of Trust Evidence

Trust in a governed concept is not a single thing. It is a composition of four distinct signals.

### 1. Reinforcement History

> "How many times, by whom, and from where, has this been independently confirmed?"

Each `"reinforce"` governance record is one ring. The rings record:

- *Who* approved the reinforcement (the named reviewer)
- *When* it was reinforced (the timestamp)
- *What learning cycle* produced it (the provenance chain)

**What reinforcement cannot prove alone:** Whether the reinforcements came from independent
sources. The same venue confirming five times is not the same as five venues each confirming once.
Source independence requires context — venue, DC identity, operational situation — that is
not yet carried in provenance records.

### 2. Challenge Survival

> "Has this concept been challenged by contradicting evidence — and did it hold?"

A concept that has never been challenged has never been proven.

Challenge survival requires:
- Recording that a challenge existed (`challengedBy`)
- Recording how the challenge was resolved (reinforced, updated, superseded, or retired)
- The resolution being traceable to a governed decision, not silence

A concept with an unresolved challenge is not the same as a concept that has survived challenge.
Both are different from a concept that has never been challenged.

The system must carry this distinction. A score cannot.

### 3. Context Breadth

> "Under what conditions was this validated — and how varied were those conditions?"

A concept validated exclusively under busy service conditions at large urban venues
may not apply during quiet periods at rural venues.

Context breadth is not currently tracked. `ConceptProvenanceRecord` carries the
learning chain but not the operational conditions under which each reinforcement occurred.

This is a future concern — but the principle must be stated: context breadth is part
of trust evidence, and it cannot be recovered from a score.

### 4. Outcome History

> "When this concept influenced a DC's understanding, did good outcomes follow?"

The connection from `KnowledgeGraph` concept → `form()` → `Understanding` → `Action` →
`Execution` outcome exists architecturally. But it is not currently traced back
to the specific concept that contributed to the formation.

A concept can influence hundreds of DC decisions. Whether those decisions produced
good outcomes, required correction, or escalated to human involvement is not surfaced
back to the concept.

This, too, is a future concern — but it belongs in the trust evidence, not a score.

---

## The Two Trust Questions

These must be kept separate.

### A — Concept Trust

> "Should this knowledge be trusted today?"

Evidence:
- Reinforcement history (how many times, by whom, how recently)
- Challenge survival (has it been tested and held)
- Context breadth (how many different situations validated it)
- Outcome history (when used, did it lead to good outcomes)

This is trust in a specific governed concept.

### B — Helping Hand Trust

> "Should people trust Helping Hand?"

Evidence:
- Continued usage (people return)
- Willingness to share context (people open up)
- Appropriate uncertainty (the DC admits when it does not know)
- Successful outcomes (situations improved by DC involvement)
- Avoided harm (situations that could have gone wrong did not)
- Transparency (the DC can explain why it understands what it does)

**These are not the same question.**

Concept trust is about a specific piece of knowledge.

Helping Hand trust is about the relationship between the DC and the people it serves.

A system with high concept trust but low HH trust has good knowledge and poor behaviour.

A system with high HH trust but low concept trust is being trusted despite having uncertain knowledge.

Neither is acceptable. The two questions must be tracked separately.

---

## The Information → Wisdom Ladder

| Level | What it means | What it requires |
|---|---|---|
| **Information** | This concept exists | One governance approval |
| **Knowledge** | This concept has evidence | Provenance chain, evidenceLevel |
| **Understanding** | This concept explains something | Contributed to formation; DC used it |
| **Wisdom** | This concept has survived challenge and remains appropriate | Challenge history, reinforcement breadth, outcome evidence |

The question for Helping Hand is not "how do we make concepts smarter?"

It is: "how does a concept move from information to wisdom — and how does the system know where on that ladder a concept stands?"

Currently, every approved concept is either `"candidate"` or `"validated"`.
The system cannot distinguish a `"validated"` concept at the Knowledge level
from one at the Wisdom level.

---

## What the Architecture Must Carry

To answer "why should I trust this understanding today?" without collapsing to a score,
the system must retain — not compute on demand, but retain:

| Evidence | Field | Currently present |
|---|---|---|
| When was this last independently confirmed | `lastReinforcedAt` | ✗ |
| How many times was this reinforced | Computable from provenance | Partial |
| Has this been challenged | `challengedBy` | ✗ |
| How was each challenge resolved | In provenance records | Partial |
| What operational contexts produced the evidence | Not tracked | ✗ |
| What outcomes followed its use | Not connected back | ✗ |

The first two rows are achievable now. The last two are future capability.

The principle governs all of them: retain the reasons, not the score.

---

## Preserved Insight

> A concept should be able to answer:
> "I have been confirmed N times, most recently on this date.
> I have been challenged M times; each challenge was resolved by [governance decision].
> I have not been reinforced in the last N governance cycles — I may require review."

A trust score cannot say any of that.

Trust, like character, is not a number.

It is a record of how something has behaved under pressure.
