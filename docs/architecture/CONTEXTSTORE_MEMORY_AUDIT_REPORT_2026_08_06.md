# ContextStore Memory Boundary Audit Report

**Date:** 2026-08-06
**Status:** Audit Complete — Recommendation: Option A
**Basis:** CANDIDATE_CONTEXTSTORE_MEMORY_BOUNDARY_AUDIT.md
**Method:** Systematic search of all TypeScript source files for `"memory"` string, ContextCategory usage, and ContextStore write paths.

---

## Audit Scope

Searched:
- `lib/**/*.ts`
- `app/**/*.tsx`
- `components/**/*.ts`
- `src/**/*.ts`

For patterns:
- `"memory"` (exact string)
- `ContextCategory`, `ContextStore`, `contextStore` (all usages)
- `category.*memory`, `addEntry.*memory`
- `WisdomSource`, `LivingMemory`, `createLivingMemory`

---

## Findings: All Occurrences of `"memory"`

### Occurrence 1 — `lib/onboarding/contextStore.ts:8`

```typescript
export type ContextCategory =
  | "business"
  | "venue"
  | "team"
  | "systems"
  | "communication"
  | "knowledge"
  | "memory";
```

**Classification:** Unused type definition.

**Assessment:** This is where `"memory"` lives as a `ContextCategory` value. It is defined. It is never written to. See Occurrence 3 for confirmation.

---

### Occurrence 2 — `lib/annie/wisdom.ts:15,43`

```typescript
export type WisdomSource =
  | "memory"
  | "observation"
  // ...

return {
  source: "memory",
  reason: "I've learnt this before and I'm confident I've understood it.",
};
```

**Classification:** Different type — NOT `ContextCategory`. Not related to `ContextStore`.

**Assessment:** `WisdomSource` is an independent type in the `wisdom.ts` pre-governed prototype. It represents the source Annie should consult when answering a question. It is not a `ContextStore` category. The string `"memory"` here means "consult prior knowledge" — it does not write to `ContextStore`. This is a separate concern.

---

### Occurrence 3 — `lib/annie/platform/anniePlatformVoice.ts:36` and `annieJourneyVoice.ts:7`

```typescript
case "memory":
  return "I've learnt this before, and I'm confident I've understood it.";
```

**Classification:** Switch cases on `WisdomSource` — NOT `ContextCategory`. Not related to `ContextStore`.

**Assessment:** These are voice response templates for the wisdom routing prototype. Same `WisdomSource` type as Occurrence 2. No connection to `ContextStore` or `ContextCategory`.

---

## Production Code Write Paths to `ContextStore`

### `OnboardingEngine` — the only production writer

`lib/onboarding/onboardingEngine.ts` is the only production code that calls `contextStore.addEntry()`.

It maps `VenueDiscoveryDimension` values to `ContextCategory` using this table:

```typescript
const categoryMap: Record<VenueDiscoveryDimension, ContextCategory> = {
  "venue-type":       "venue",
  "operating-model":  "business",
  capability:         "business",
  department:         "team",
  area:               "venue",
  equipment:          "systems",
};
```

**`"memory"` is not in this map.**

`OnboardingEngine` can only write to: `"venue"`, `"business"`, `"team"`, `"systems"`.

It can never produce a `category: "memory"` entry through any current code path.

---

### `LivingMemory` — the pre-governed prototype

`lib/annie/brain/index.ts` calls `createLivingMemory()` from `lib/annie/memory/livingMemory.ts`.

```typescript
const memory = createLivingMemory({
  id: "first-venue-observation",
  fact: "Annie has started learning this venue.",
  source: "observation",
  learntOn: new Date(),
  reason: "Annie began her first working day by observing the venue.",
  reviewTriggers: ["venue-layout-changed", "new-manager", "refurbishment"],
});
```

`LivingMemory` is its own type — it does not write to `ContextStore`. It has a `source` field but this is `string`, not `ContextCategory`. It has no connection to `ContextStore`.

**Note:** `lib/annie/brain/index.ts` is called from `app/annie/brain.tsx` and `app/annie/first-shift.tsx` — these are app routes that use the pre-governed `think()` architecture. This is a prototype path that predates the governed pipeline. `LivingMemory` is already noted in prior analysis as a prototype that should eventually be superseded by `PersonContextStore` and `KnowledgeGraph`.

---

### No other production writers found

No production code in `lib/`, `app/`, `components/`, or `src/` calls:
- `contextStore.addEntry({ category: "memory", ... })`
- Any variant that writes `"memory"` as a `ContextCategory`

---

## Test Code Audit

No test file contains `category: "memory"`.

The `ContextStore` is used in formation tests with `category: "equipment"` and `category: "compliance"` entries. No test exercises the `"memory"` category.

---

## Classification Summary

| Occurrence | File | Type | Connection to ContextStore | Ever written? |
|---|---|---|---|---|
| `ContextCategory` type definition | `contextStore.ts` | Type definition | ✓ Directly — it is the type | Never written to |
| `WisdomSource` type + return value | `wisdom.ts` | Different type | ✗ None | N/A — different type |
| `case "memory"` voice responses | `anniePlatformVoice.ts`, `annieJourneyVoice.ts` | Different type | ✗ None | N/A — different type |

---

## Answers to Audit Questions

### Q1 — Is `category: "memory"` used in any current production path?

**No.** The `OnboardingEngine` (the only ContextStore writer) maps `VenueDiscoveryDimension` values to `ContextCategory`. `"memory"` is not in the dimension map. No production code path produces a `category: "memory"` entry.

### Q2 — What was the intended purpose?

Unknown from the code. The category name suggests it was intended for DC memory — facts Annie has learned and retained. This intent is now correctly served by:
- `PersonContextStore` (Milestone 046) for person-scoped context
- `KnowledgeGraph` (Milestone 043+) for governed professional knowledge

The `"memory"` category in `ContextStore` was never built out. The architecture moved to dedicated stores before this path was exercised.

### Q3 — What entries currently exist at runtime?

**Zero.** No production code path produces `category: "memory"` entries. No migration is required.

### Q4 — Is migration required for deprecation?

**No.** There are no entries to migrate. No callers to update. The category is written nowhere.

---

## Separate Finding: `WisdomSource` and `LivingMemory`

These are pre-governed prototypes from the pre-pipeline era of Annie's architecture.

| Component | Status | Risk |
|---|---|---|
| `lib/annie/wisdom.ts` — `WisdomSource: "memory"` | Pre-governed prototype; not connected to ContextStore or the governed pipeline | Low — isolated prototype |
| `lib/annie/memory/livingMemory.ts` — `LivingMemory` | Pre-governed prototype; has correct intent; superseded by `PersonContextStore` + `KnowledgeGraph` | Low — already noted as prototype in prior analysis |
| `lib/annie/brain/index.ts` — calls both | Pre-governed demo/brain architecture; reached from `app/annie/brain.tsx` | Low — demo path; not governed pipeline |

**Recommendation:** These are outside the scope of this audit (they do not involve `ContextStore.category === "memory"`). They should be addressed in a separate pre-governed prototype cleanup milestone that marks them as deprecated and points to governed equivalents.

---

## Recommendation

**Option A — Deprecate `"memory"` from `ContextCategory` with no migration required.**

Justification:
- Zero production write paths exist
- Zero test paths exercise the category
- Zero runtime data exists to migrate
- `PersonContextStore` and `KnowledgeGraph` serve the intended purpose correctly
- Removing the category name from the type prevents future misuse

**Implementation (when authorised by governance):**

Step 1: Remove `| "memory"` from `ContextCategory` in `lib/onboarding/contextStore.ts`
Step 2: Confirm no TypeScript compiler errors (no callers use this value)
Step 3: Run full test suite — all tests should remain green

**Risk assessment:** Zero. No callers exist. No data exists. No breaking changes.

**The decision that still belongs to governance:** Whether to remove the value now, or leave it with a `@deprecated` JSDoc comment pointing to `PersonContextStore`. Both are acceptable. Removal is cleaner. Deprecation is more conservative.

---

## Conclusion

The `ContextStore.category === "memory"` boundary risk identified in prior analysis documents was real in principle but has never materialised in practice.

The category was defined, never used, and never extended. The architecture moved to dedicated stores (`PersonContextStore`, `KnowledgeGraph`) before anyone built on the `"memory"` placeholder.

The risk is not active. The cleanup is straightforward. The governance question is resolved: **Option A, no migration required.**
