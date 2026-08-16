# MILESTONE_046_CANDIDATE — Human Relationship Memory Boundary

**Date:** 2026-08-06
**Status:** Candidate — Boundary Analysis
**Depends on:**
- MILESTONE_046_REPOSITORY_ANALYSIS.md — audit complete ✓
- PD-007 — Human Memory Boundary ✓
- PD-008 — Human Trust Boundary ✓
- Milestone 045 — Conversation Boundary (listening proven) ✓

**Constraint:** No implementation. Define the lifecycle, boundaries, consent
model, forgetting model, and separation from KnowledgeGraph.

---

## The Question

> What is the smallest architecture that allows a Digital Colleague to remember
> a person appropriately without ever treating that person as knowledge?

---

## What This Milestone Must Prove

- Milestone 043 proved the trunk.
- Milestone 044 proved growth.
- Milestone 045 proved listening.
- **Milestone 046 must prove respect.**

A colleague who listens but does not know when to forget is not a colleague.

It is a witness.

People do not need witnesses. They need trusted colleagues.

---

## Frozen Boundaries

These are not implementation choices. They are permanent constraints.

**Boundary 1 — Human relationship memory never enters KnowledgeGraph.**

`KnowledgeGraph` contains professional understanding earned through governed experience.
A person's disclosed context — their preferences, their working patterns, their difficult moments —
is not a professional concept. It must never be stored as a `Concept`.

**Boundary 2 — Personal disclosures default to forgetting.**

Anything a person shares that does not meet the operational test (PD-007 Category 1)
is session-scoped by default. When the session ends, it is released.
The default is forgetting. Persistence is the exception that requires consent.

**Boundary 3 — Persistence requires consent.**

A person's context does not persist beyond the session without their explicit
acknowledgement. Consent is not inferred. It is not implied by continued use.
It is asked for, in plain language, at the point the DC would benefit from remembering.

**Boundary 4 — The person can inspect their remembered context.**

If Annie remembers something about a person across sessions, that person must be
able to ask: "What do you remember about me?" and receive a complete, honest answer.

**Boundary 5 — The person can request removal.**

Any persisted relationship memory entry must be removable on request, immediately
and completely. "Please forget that" is a valid instruction. It must be honoured.

**Boundary 6 — Relationship memory cannot become professional knowledge automatically.**

A pattern observed across many people cannot graduate from relationship memory into
`KnowledgeGraph` without passing through the full governance chain — and even then,
the governed concept must be de-identified. It cannot carry a person's name or identity.

---

## The Observation/Understanding Distinction — Applied to People

The LLM is capable of pattern recognition. That is exactly where the risk appears.

A model might produce:

> "Dean sounds stressed."

Helping Hand must treat this as:

> An observation — one signal, in this moment, requiring context before it carries meaning.

Not as:

> A fact about Dean.

The distinction between `Observation` and `Understanding` that protects professional knowledge
applies equally to people. An observation requires translation. A translation requires context.
Understanding requires formation. None of these steps may be skipped.

A person's disclosed state is always an observation until the person themselves gives it meaning.

Annie does not decide what it means that Dean is having a bad day.

Dean decides — if he chooses to share that meaning at all.

---

## The Required Lifecycle

```
Human interaction
    │
    ▼
Session Context (in-memory only)
    │
    ├── moment acknowledged and released (most interactions)
    │
    └── "Would it help if I remembered this for next time?"
                │
                ▼
          Consent decision
                │
                ├── No → released at session end
                │
                └── Yes → RelationshipMemoryEntry created
                                │
                                ▼
                    PersonContextStore (person-scoped)
                                │
                                ├── visible on request ("what do you remember?")
                                │
                                ├── removable on request ("please forget that")
                                │
                                └── available in future sessions (operational only)
```

---

## The `RelationshipMemoryEntry` Type

What a persisted relationship memory entry must contain:

```typescript
interface RelationshipMemoryEntry {
  id: string;
  personId: string;           // scoped to a person, not a venue

  category: "operational";    // only operational — never personal disclosure

  key: string;                // what is being remembered
  value: string;              // the operational fact

  source: "conversation" | "confirmed";
  confidence: "reported" | "confirmed";

  sessionId: string;          // which session produced this
  consentedAt: string;        // when the person agreed to this being kept
  consentedBy: string;        // "person" — explicit, not inferred

  createdAt: string;
  expiresAt?: string;         // optional TTL — some memory has a natural end

  active: boolean;            // soft delete — person can deactivate
}
```

**What is deliberately absent:**

- No `category: "personal-disclosure"` — personal disclosures are never persisted
- No automatic graduation to `KnowledgeGraph`
- No inference fields — the DC does not store what it guessed about the person
- No `personId` anywhere near `KnowledgeGraph`

---

## The `PersonContextStore` Interface

```typescript
interface PersonContextStore {
  // Write — requires explicit consent signal
  addEntry(entry: Omit<RelationshipMemoryEntry, "id" | "createdAt">): RelationshipMemoryEntry;

  // Read — person can always see what is stored about them
  getEntriesForPerson(personId: string): RelationshipMemoryEntry[];

  // Delete — person can remove any entry, immediately and completely
  deleteEntry(personId: string, entryId: string): void;

  // Session release — clears all session-scoped context when session ends
  clearSession(sessionId: string): void;

  // Inspection — plain-language summary for "what do you remember about me?"
  summariseForPerson(personId: string): string;
}
```

---

## What `ContextStore` Becomes

The audit found that `ContextStore` is venue-level operational context — correctly scoped.

It should be clarified, not replaced:

- The `"memory"` category should be removed — undefined scope, no governed purpose
- The `"team"` category should contain operational team structure only (departments, rota patterns)
  — not individual person facts
- Rename to `VenueContextStore` in a future refactor to make scope explicit
- `source: "conversation"` remains valid for venue facts discovered through conversation

`ContextStore` is not the human relationship memory store. It never was.

The audit confirmed it has drifted towards that role through category ambiguity.

That drift must be named and reversed.

---

## Separation Test

Any implementation must pass this structural test:

```
Can a personId appear in KnowledgeGraph?             → NO
Can a RelationshipMemoryEntry appear in KnowledgeGraph?  → NO
Can a Concept appear in PersonContextStore?          → NO
Can PersonContextStore.addEntry() be called without consent? → NO
Can clearSession() leave entries behind?             → NO
```

These five questions are the boundary test. All five answers must be NO.

---

## Proof Conditions for Milestone 046

| Condition | Test |
|---|---|
| PC1 — Session context is released | After `clearSession()`, entries are gone |
| PC2 — Persistence requires consent | `addEntry()` without `consentedAt` throws |
| PC3 — Person can inspect | `getEntriesForPerson()` returns complete, honest list |
| PC4 — Person can remove | `deleteEntry()` removes immediately — verified by subsequent `getEntriesForPerson()` |
| PC5 — Separation is structural | `PersonContextStore` and `KnowledgeGraph` are different types with no shared write path |
| PC6 — Observation ≠ understanding about a person | LLM inference stored as `Observation`, not as `RelationshipMemoryEntry` |

---

## Implementation Boundary

When implementation begins:

**Create only:**
- `lib/annie/relationship/PersonContextStore.ts` — the store and its interface
- `lib/annie/relationship/__tests__/PersonContextStore.test.ts` — six proof conditions

**Do not modify:**
- `KnowledgeGraph` — no change
- `ContextStore` — no change in this milestone (clarification is a future refactor)
- Any governance chain component
- Any formation, judgement, or authority component

**The scope:**
One new directory. One new file. One test file. Six proof conditions.

The conversation branch can listen.

The relationship branch must know when to forget.
