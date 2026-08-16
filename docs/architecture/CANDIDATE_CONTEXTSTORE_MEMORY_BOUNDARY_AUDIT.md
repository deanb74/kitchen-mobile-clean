# CANDIDATE — ContextStore Memory Boundary Audit Plan

**Date:** 2026-08-06
**Status:** Candidate — Governance Analysis
**Depends on:** PD-007 — Human Memory Boundary; GOVERNANCE_ADOPTION_BOUNDARY_CANDIDATE_2026_08_06.md

---

## The Question Being Governed

> What is `ContextStore.category === "memory"`, and should it continue to exist?

---

## The Problem

`ContextCategory` in `lib/onboarding/contextStore.ts` includes `"memory"` as a valid
category. The type has existed since before the current session.

`"memory"` has:
- No defined scope
- No governance boundary
- No consent mechanism
- No deletion mechanism
- No person-scoping
- No documented purpose

Any caller can write:
```typescript
contextStore.addEntry({
  category: "memory",
  key: "anything",
  value: "anything",
  source: "conversation",
});
```

This entry persists indefinitely. Nothing limits what `value` may contain.
Nothing enforces that `key` does not identify a person or contain a personal disclosure.

The Milestone 046 audit identified this. The Milestone 047 audit confirmed it.
No action has been taken because the audit required a governance decision, not a code fix.

---

## The Audit Required

Before `"memory"` can be deprecated, scoped, or removed, the following must be determined:

### Audit Question 1 — Is `category: "memory"` used in any current path?

**Required:** Search the entire repository for `category.*memory` and `"memory"` in
`ContextStore` usage. Specifically:

- Is it used in `OnboardingEngine` or `OnboardingEngineDemo`?
- Is it used in any test?
- Is it used in any app component (`app/`, `components/`)?
- Does any existing data migration depend on it?

**Expected result:** The category exists in the type. Its active usage — if any — defines
the migration burden.

**Already found:** `lib/onboarding/contextStore.ts` defines it. `docs/analysis/` references it
in analysis documents. No runtime usage has been confirmed in current tests.

---

### Audit Question 2 — What was the intended purpose?

The category name "memory" suggests it was intended to store DC memory items —
learned facts, retained context, or prior conversation summaries.

If this was the intended purpose, it should be replaced by `PersonContextStore`
(Milestone 046) for person-scoped items, or by `KnowledgeGraph` for governed knowledge.

**The category should not be both of these.** Mixing personal memory with
venue knowledge in a single unscoped store is precisely the conflation that
PD-007 and PD-009 were designed to prevent.

---

### Audit Question 3 — What entries currently exist at runtime?

If Helping Hand has been running in any environment with `ContextStore` in use,
entries with `category: "memory"` may exist in persistent storage.

**Required:** Confirm whether any environment has persisted `"memory"` category entries,
and if so, what they contain.

---

## Decisions That Must Not Become Developer Assumptions

| Decision | Belongs to |
|---|---|
| Whether `"memory"` is removed from `ContextCategory` | Governance — after audit confirms no migration needed |
| What replaces it | Governance — `PersonContextStore` for persons; `KnowledgeGraph` for knowledge |
| Whether existing entries require migration | Governance — after audit of runtime data |
| Whether `category: "memory"` requires deprecation documentation | Governance — before any code removal |

---

## What Should Remain Human Judgement

The decision about whether to remove the category, scope it, or deprecate it belongs
to the governing authority — not to a developer cleaning up the type system.

The risk of treating this as a type cleanup:
- Existing runtime data may depend on the category
- Removing it could break existing `OnboardingEngine` behaviour silently
- The category may have been used intentionally with a meaning that is not visible in the code

The safe path: audit first, then decide, then implement the smallest boundary change
that protects people without breaking existing legitimate usage.

---

## Proposed Outcome Options (for governance consideration)

**Option A — Deprecate `"memory"` with no migration required**

If audit confirms no current usage of `category: "memory"` in production paths or tests:

1. Add `@deprecated` comment to `"memory"` in `ContextCategory`
2. Add a comment pointing to `PersonContextStore` as the correct path for person-scoped memory
3. Do not remove the type value — broken builds in existing code are not acceptable without migration
4. Add a warning to `addEntry()` when `category === "memory"` is supplied

This is the safest, least disruptive path.

---

**Option B — Scope `"memory"` entries with a consent flag**

If audit confirms `"memory"` is used but the usage should be person-scoped:

Replace current open-write path with a checked path that requires explicit
governance that the entry does not contain personal disclosure.

This is more complex and requires a governance decision about what constitutes
personal disclosure in this context.

---

**Option C — Remove `"memory"` after migration**

If audit confirms all `"memory"` usage can be redirected to `PersonContextStore`
or `KnowledgeGraph`:

Replace the category before the removal milestone. This is the cleanest resolution
but requires the most planning.

---

## Audit Execution Steps

When the audit is authorised:

1. Run `grep -r '"memory"' lib/ app/ components/` — identify all usages of the category string
2. Run `grep -r 'category.*memory\|memory.*category' lib/ app/ components/` — identify all category references
3. Check `lib/onboarding/onboardingEngine.ts` — does it ever write `category: "memory"`?
4. Check `lib/onboarding/onboardingEngineDemo.ts` — same question
5. Check all test files for `category: "memory"` entries
6. Confirm whether any runtime database or local storage contains `"memory"` category entries
7. Report findings before any deprecation action

**This audit is a prerequisite for all three options above.**

---

## Future Implementation Boundaries

When the audit is complete and a governance decision is made:

- Deprecation must be communicated to all DC formation paths that use `ContextStore`
- `assembleFormationContext()` must not receive `"memory"` category entries in formation if the category is deprecated
- `PersonContextStore` must be confirmed as the replacement path for any person-scoped entries
- `KnowledgeGraph` must be confirmed as the replacement path for any knowledge-type entries
- The timeline for removal (if any) must be agreed by governance before implementation begins
