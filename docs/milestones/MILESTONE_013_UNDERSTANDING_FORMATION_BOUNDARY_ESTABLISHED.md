# Milestone 013 — Understanding Formation Boundary Established

**Date:** 2026-08-05

**Status:** Achieved

**Category:** COS Architecture Milestone

**Evidence:**
- `platform/cos/understanding-formation/` — capability implementation
- `platform/cos/understanding-formation/__tests__/formation.test.ts` — 12 tests
- `platform/cos/understanding-formation/__tests__/invariants.test.ts` — 16 tests
- `platform/cos/understanding-formation/__tests__/milestone-universality.test.ts` — 13 tests
- **41 tests passing across 3 test suites**

---

> Understanding Formation is a universal COS capability.
>
> Professional content changes. The mechanism does not.

---

## Achievement

Helping Hand has demonstrated, with evidence, that the missing junction between Translation and Judgement is now implemented and governed.

The same `form()` function produces valid Understanding from:
- hospitality professional content (Annie — fridge temperature)
- construction professional content (Kev — structural beam defect)
- healthcare professional content (Harry — patient observation)

JudgementEngine consumes the output of all three unchanged.

No human-authored Understanding is required.

---

## What Was Built

### New COS Capability

```
platform/cos/understanding-formation/
  types.ts       — FormationInput, FormationContext, FormationKnowledge
  formation.ts   — form(input: FormationInput) → Understanding
  invariants.ts  — five enforceable structural guarantees
  index.ts       — public exports
  __tests__/     — 41 tests across three suites
```

### Extended Understanding Type

`lib/understanding/Understanding.ts` gained two fields:

```typescript
completeness?: "sufficient" | "partial" | "insufficient"
evidenceChain?: string[]
```

Optional on the base type. Always populated by formation. Existing hand-authored Understanding objects are unaffected.

---

## The Contract

```typescript
form(input: FormationInput): Understanding

FormationInput {
  translations:  Translation[]          // DC provides domain-applied meaning
  context:       FormationContext        // DC provides live situation + background
  knowledge:     FormationKnowledge[]   // DC provides applicable governed principles
}

Understanding {
  summary:        string                 // synthesised meaning — assembled from inputs
  confidence:     number                 // derived from input quality — never authored
  uncertainty:    string[]               // derived from input gaps — never hidden
  completeness:   "sufficient" | "partial" | "insufficient"  // derived from coverage
  evidenceChain:  string[]               // observation IDs — never empty when translations exist
}
```

---

## Ownership

**COS owns:**
- Formation mechanism — how translations, context, and knowledge combine
- Synthesis algorithm — how meaning is assembled from inputs
- Confidence derivation — computed from translation quality and context completeness
- Uncertainty derivation — derived from input gaps
- Completeness assessment — assessed from input coverage
- Evidence traceability — observation IDs preserved from input to output
- Output contract — the five-field Understanding struct
- The five invariants — structural guarantees enforced at the boundary

**Digital Colleague provides:**
- Professional translation rules — what observations mean in this domain
- Live situational context — what is happening right now, urgency, risk, who, what, where
- Institutional context — background knowledge from the venue or organisation
- Knowledge selection — which governed principles apply to this situation

**HQ layers provide (through the DC):**
- Professional thresholds and standards (Professional HQ)
- Cross-profession principles (Helping Hand HQ)
- Organisation-specific context (Organisation HQ, where present)

---

## The Five Invariants — All Verified

| # | Invariant | Status |
|---|---|---|
| 1 | Formation never invents meaning absent from evidence | ✓ Verified |
| 2 | Uncertainty cannot be hidden when inputs are incomplete | ✓ Verified |
| 3 | Evidence chain is present whenever translations exist | ✓ Verified |
| 4 | Confidence is computed from input quality, never accepted as a parameter | ✓ Verified |
| 5 | Completeness is assessed from input coverage, never accepted as a parameter | ✓ Verified |

---

## Safe Failure — Verified

When a DC provides no professional translation content, formation produces:

```
completeness: "insufficient"
confidence:   0
summary:      "No observations have been translated. Understanding cannot be formed."
```

JudgementEngine routes this to `disposition: "insufficient"` → `selected.kind: "ask"`.

The system does not guess. It says it does not have enough to understand.

---

## The Lifecycle — Before and After

**Before this milestone:**

```
Translation
     ↓
     ? (human assembles Understanding by hand)
     ↓
Understanding
```

**After this milestone:**

```
Translation
     ↓
Understanding Formation ✓ (COS mechanism)
     ↓
Understanding
```

The junction that was previously missing — described in `docs/analysis/INFORMATION_TO_TRUST_MAP.md` as the critical RED gap — is now GREEN.

---

## Boundary Rules — Preventing Drift

These rules protect the boundary established by this milestone.

**Do not:**

- Create `AnnieFormation()`, `KevFormation()`, or any profession-specific formation variant
- Move professional knowledge into the COS formation mechanism
- Bypass the evidence chain — traceability is a structural guarantee, not optional
- Accept `confidence` or `completeness` as inputs to `form()` — they must be computed
- Allow formation to produce a summary from zero translations — the safe-failure path exists for this

**Do:**

- Extend professional translation rules in the DC layer
- Add new `FormationKnowledge` entries by providing them through the DC
- Write new `TranslationRule` functions in professional knowledge
- Use `checkAllInvariants()` in integration tests to verify formation quality

---

## What This Milestone Does Not Include

Explicitly deferred:

- ContextStore migration from `lib/onboarding/` to `platform/cos/`
- KnowledgeGraph learning loop closure (ApprovedKnowledgeChange → KnowledgeGraph)
- `platform/core/companion/` alignment with `lib/` engine pipeline
- Annie production integration
- HQ pollination changes
- Input acquisition automation (how a DC gathers translations, context, and knowledge)

These are Formation Input problems. They belong to Milestone 014.

---

## Next Question — Earned

The milestone establishes the output contract. The next question is now earned:

> How does a Digital Colleague automatically gather Translation, Context, and Knowledge before invoking Formation?

That investigation covers:

1. **Translation acquisition** — how does a DC know which translation rules apply?
2. **Context acquisition** — how does a DC retrieve situational and institutional context from Venue Intelligence and ContextStore?
3. **Knowledge acquisition** — how does a DC query "what knowledge applies here?" rather than "what knowledge exists?"

These are the roads feeding the roundabout.

---

## Traceability

| Layer | Source |
|---|---|
| Constitutional | `constitution/02-CONSTITUTION.md` — Article II: "Seek first to understand." |
| Theory | `docs/theory/003-THEORY-OF-UNDERSTANDING.md` — "Understanding emerges when knowledge is interpreted within context." |
| Theory | `docs/theory/009-THEORY-OF-TRANSFORMATION.md` — transformation chain: Knowledge → Understanding |
| Architecture | `docs/analysis/INFORMATION_TO_TRUST_MAP.md` — identified the RED gap |
| Architecture | `docs/analysis/UNDERSTANDING_FORMATION_BOUNDARY_VALIDATION.md` — validated the contract |
| Architecture | `docs/analysis/UNDERSTANDING_FORMATION_CONTRACT.md` — defined the canonical contract |
| Architecture | `docs/analysis/UNDERSTANDING_FORMATION_ARCHITECTURE_VALIDATION.md` — confirmed implementation location |
| Implementation | `platform/cos/understanding-formation/` — capability |
| Evidence | `platform/cos/understanding-formation/__tests__/` — 41 passing tests |
