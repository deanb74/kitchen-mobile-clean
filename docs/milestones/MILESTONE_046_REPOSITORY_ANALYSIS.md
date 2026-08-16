# MILESTONE_046_REPOSITORY_ANALYSIS — Human Relationship Memory

**Date:** 2026-08-06
**Status:** Analysis — No Implementation
**Milestone:** 046 — Human Relationship Memory Boundary
**Questions:**
1. Where does human relationship memory currently live?
2. What prevents it from becoming KnowledgeGraph?
3. Where should it live?

---

## Objective

Establish a governed separation between two kinds of memory that must never
be conflated:

```
Knowledge Memory                    Human Relationship Memory
━━━━━━━━━━━━━━━━━━━━━━              ━━━━━━━━━━━━━━━━━━━━━━━━━
Earned professional understanding   Context to serve this person
Governed through full chain         Governed through consent
Persists indefinitely if true       Time-bound and releasable
In KnowledgeGraph                   In a separate person-scoped store
Traceable to execution/learning     Traceable to consent and session
```

---

## Part 1 — Existing Memory Structures

### 1.1 `LivingMemory` — `lib/annie/memory/livingMemory.ts`

**Type:**
```typescript
interface LivingMemory {
  id: string;
  fact: string;         // could be knowledge OR person context — ambiguous
  source: string;
  learntOn: Date;
  reason: string;
  reviewTriggers: string[];
}
```

**Status:** Prototype — not wired to anything.
- `createLivingMemory()` returns the object. Nothing stores it.
- No persistent store. No retrieval. No connection to `KnowledgeGraph` or `ContextStore`.
- `shouldReviewMemory()` detects review triggers but nothing acts on them.
- The type conflates professional knowledge and person context in a single `fact: string`.

**Finding:** `LivingMemory` has the correct intent — memory that stays alive and reviews itself.
Its implementation is a prototype. Its type does not separate knowledge from person context.
It is not a risk. It is an unrealised signal.

---

### 1.2 `ContextStore` — `lib/onboarding/contextStore.ts`

**Type:**
```typescript
interface ContextEntry {
  id: string;
  category: "business" | "venue" | "team" | "systems" | "communication" | "knowledge" | "memory";
  key: string;
  value: string;
  source: "conversation" | "photo" | "document" | "system" | "manual";
  createdAt: string;
  updatedAt: string;
}
```

**Status:** Active. Used by `OnboardingEngine` and `assembleFormationContext()`.

**Critical findings:**

**Finding A — `ContextStore` has no forgetting mechanism.**
`addEntry()` writes. `updateEntry()` modifies. `getEntries()` and `getByCategory()` read.
There is no `deleteEntry()`, no `removeEntry()`, no TTL, no session scope.
Everything written to `ContextStore` persists indefinitely.

**Finding B — Conversations can write directly to `ContextStore` without governance.**
`OnboardingEngine.addObservation()` maps conversation observations to `ContextStore.addEntry()`
with `source: "conversation"`. No guard. No approval. No governance chain.
A conversation is a valid write source.

**Finding C — `"team"` and `"memory"` categories have no person-level boundary.**
`ContextEntry.category === "team"` could contain: a manager's name, a person's working preferences,
a team member's communication style. These are person facts, not venue facts.
`ContextEntry.category === "memory"` has no defined scope at all — its content is entirely unspecified.

**Finding D — `ContextStore` is venue-scoped by association with `OnboardingEngine`,
but the type itself has no `venueId`, no `personId`, no scope field.**
Nothing in the type prevents `ContextStore` from becoming person relationship memory
without any architectural signal that it has crossed that boundary.

---

### 1.3 `VenueKnowledgeProfile` — `lib/os/knowledge/applicability/venueKnowledgeProfile.ts`

**Type:**
```typescript
interface VenueKnowledgeProfile {
  venueId: string;
  facts: VenueProfileFact[];   // can have source: "annie-conversation"
  ...
}

interface VenueProfileFact {
  dimension: "profession" | "region" | "venue-type" | "department" | "equipment" | "capability";
  source: "annie-observation" | "annie-conversation" | "manager-confirmation" | "setup-wizard" | "system-import";
  confidence: "observed" | "reported" | "confirmed";
  active: boolean;
  ...
}
```

**Status:** Active. Used by `KnowledgeRouter` for knowledge applicability matching.

**Findings:**
- Venue-scoped (`venueId` is present) — correct scope for venue facts
- `source: "annie-conversation"` means a conversation can add facts to the venue profile
  without a governance approval step. Confidence starts as `"observed"`.
- `active: boolean` provides soft delete — a fact can be deactivated
- **Dimension list contains no person-level dimensions.** `"department"` and `"capability"` are
  the closest — these are operational, not personal

**Assessment:** `VenueKnowledgeProfile` is correctly scoped to venue characteristics.
It is the closest thing to a governed operational memory in the current system.
Its risk is the `"annie-conversation"` source bypassing approval — but the
dimensions it captures are operational, not personal.

---

### 1.4 `KnowledgeGraph` — `lib/knowledge/KnowledgeGraph.ts`

**Status:** Fully governed. The only write path is `applyApprovedChange()` via the
full governance chain. No shortcut exists.

**Assessment:** `KnowledgeGraph` is the correct store for professional knowledge.
It currently contains no person-level facts. The governance chain prevents
person context from entering accidentally — provided nobody adds a
`Concept` with personal content and calls it professional knowledge.

**Risk:** The governance chain proves the write path. It does not inspect
concept content for personal information. A future implementer could
theoretically govern a concept like `"Manager Dean prefers written summaries"`
through the chain and store it in `KnowledgeGraph`. Nothing prevents this today
other than PD-007 and PD-008.

---

### 1.5 `SecureStore` — `lib/storage.ts`

**Status:** Raw key/value persistence via `expo-secure-store`.
No structure. No categories. No governance. Available to any caller.

**Risk:** An unstructured write path with no boundaries. Could become
person relationship memory without any visibility.

---

## Part 2 — Write Paths: Can Conversation Currently Write Anywhere?

| Store | Can conversation write? | Governance required? | Forgetting possible? |
|---|---|---|---|
| `ContextStore` | **Yes** — `source: "conversation"` | **No** | **No** — no delete method |
| `VenueKnowledgeProfile` | **Yes** — `source: "annie-conversation"` | **No** | Partial — soft delete only |
| `KnowledgeGraph` | **No** — `applyApprovedChange()` required | **Yes** — full chain | Partial — retire/deprecate |
| `LivingMemory` | No — no persistent store exists | N/A | N/A |
| `SecureStore` | **Yes** — any caller | **No** | **Yes** — `deleteStoredItem()` |

**Critical finding:**
`ContextStore` is the live unguarded write path.
A conversation can write to it today with no governance.
It has no forgetting mechanism.
Its `"memory"` and `"team"` categories have no defined person boundary.

---

## Part 3 — Current Separation

### Is professional knowledge separated from person context?

**Yes, structurally.** `KnowledgeGraph` and `ContextStore` are different objects.
A governed concept and a context entry are different types.

**No, in practice.** Nothing prevents a context entry with `category: "memory"`
from containing personal disclosures. Nothing expires it. Nothing scopes it
to a session. Nothing requires consent before writing it.

### Is there a person-scoped store?

**No.** There is a venue-scoped profile (`VenueKnowledgeProfile`). There is a
session-scoped formed understanding (`Understanding`). There is no
person-relationship-scoped store anywhere in the codebase.

The closest thing is `ContextStore.category === "team"` — but this is
venue-team-level, not individual-person-level, and has no consent mechanism.

### Does `ContextStore.category === "memory"` have a definition?

**No.** The category exists in the type. No code uses it. No tests exercise it.
It is an undefined scope waiting to be filled — in either direction.

---

## Part 4 — The Immediate Risk

The path from conversation to unscoped persistent memory is currently:

```
Human speech
    ↓
OnboardingEngine.addObservation()
    ↓
ContextStore.addEntry({ category: "memory", source: "conversation" })
    ↓
Persists indefinitely — no TTL, no governance, no consent
```

This path exists. It is not intentional. It has not been used for person
relationship memory yet — but nothing structural prevents it.

---

## Part 5 — Where Should Human Relationship Memory Live?

### The Required Architecture

```
                Digital Colleague

                       │
          ─────────────────────────────
          │                           │
   Knowledge Memory            Relationship Memory
          │                           │
   KnowledgeGraph               PersonContextStore (new)
          │                           │
   Governed chain              Consent-gated write
   applyApprovedChange()        Session-scoped by default
          │                           │
   Oak inheritance             Person-scoped (personId)
   Professional wisdom         Human connection
          │                           │
   Retires/deprecates          Forgettable on request
```

### `PersonContextStore` — What It Needs

A `PersonContextStore` must have:

1. **`personId` scope** — every entry is scoped to a specific person, not a venue
2. **Session scope by default** — entries do not persist beyond the session unless explicitly promoted
3. **Consent flag** — entries promoted beyond the session require `consented: true`
4. **Category constraint** — only operational categories allowed; personal disclosure category must not persist
5. **`deleteEntry(personId, key)`** — the forgetting mechanism is first-class, not optional
6. **`clearSession(sessionId)`** — session-scoped entries are released at session end
7. **Provenance** — every persisted entry records when it was consented and by what authority

### What `ContextStore` Should Become

`ContextStore` is correctly scoped for venue-level operational context.
It should be renamed or clarified as `VenueContextStore` to make its scope explicit.
The `"memory"` category should be removed — it has no defined scope and should not exist
as an open bucket.
The `"team"` category should contain operational team facts (department structure, rota patterns)
— not individual person facts.

---

## Part 6 — Proposed Tests for Milestone 046

When implementation begins, tests must prove:

| Test | Boundary |
|---|---|
| Session-scoped person context is not present after session ends | Forgetting is active |
| Persisting a person entry requires `consented: true` | Consent is required |
| `deleteEntry(personId, key)` removes the entry completely | Person can remove their data |
| A personal disclosure observation does not persist by default | PC5 from Milestone 045 |
| `PersonContextStore` and `KnowledgeGraph` are different objects | Separation is structural |
| `ContextStore` (venue) does not accept `personId`-scoped entries | Scope boundary enforced |
| A governed concept cannot contain a `personId` field | KnowledgeGraph stays clean |

---

## Part 7 — What Must Not Be Changed

| Component | Reason |
|---|---|
| `KnowledgeGraph` | Governed. No change needed. |
| `ContextStore` | Clarify scope only — do not add person memory to it |
| `VenueKnowledgeProfile` | Venue-scoped. Correct as-is for venue facts. |
| `LivingMemory` | Prototype with correct intent. Superseded by `PersonContextStore`. |
| Any governance chain component | No change. The chain already protects KnowledgeGraph. |

---

## Summary

### Where does human relationship memory currently live?

Nowhere with a defined boundary. The closest candidates are:

- `ContextStore.category === "memory"` — undefined, ungoverned, unforgettable
- `LivingMemory` — correct intent, no implementation, no store

### What prevents it from becoming KnowledgeGraph?

Nothing structural. PD-007 and PD-008 state the principle.
The governance chain protects `KnowledgeGraph` from accidental writes.
But the chain does not inspect content — a concept with personal information
could pass through governance if someone chose to govern it.

### Where should it live?

In a new `PersonContextStore`:
- Person-scoped
- Session-scoped by default
- Consent-gated for persistence
- Forgettable by design — `deleteEntry()` is first-class
- Structurally separate from `KnowledgeGraph`

### The smallest missing component

```typescript
// New file: lib/annie/relationship/PersonContextStore.ts
// Three capabilities: write with consent gate, read by person, delete by person
// Session scope: entries clear at session end unless explicitly promoted
```

The roots still protect knowledge.

The new branch protects people.
