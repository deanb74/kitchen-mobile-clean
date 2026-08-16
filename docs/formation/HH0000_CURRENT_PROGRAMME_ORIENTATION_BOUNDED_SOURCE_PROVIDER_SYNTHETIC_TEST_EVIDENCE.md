# HH-0000 Current Programme Orientation Bounded Source-Provider Synthetic Test Evidence

**Status:** EVIDENCE ACQUIRED - FRESH INDEPENDENT ACCEPTANCE REQUIRED
**Evidence date:** 2026-08-12
**Classification:** B. SYNTHETIC SOURCE CLOSURE NOT DEMONSTRATED
**Self-acceptance:** Prohibited and not performed
**Production effect:** None
**Contribution effect:** None

## 1. Controlling Authority

This Evidence was acquired under:

`docs/formation/HH0000_CURRENT_PROGRAMME_ORIENTATION_BOUNDED_SOURCE_PROVIDER_SYNTHETIC_TEST_AUTHORITY_REVIEW.md`

The controlling outcome was:

`OUTCOME 1 - BOUNDED SYNTHETIC SOURCE-CLOSURE TEST AUTHORISED`

The Authority was consumed only to create and execute the focused synthetic test and to create this Evidence record. No independent acceptance is attempted here.

## 2. Pre-Implementation Authority Check

The mechanical precondition check passed before editing:

1. the controlling Authority existed;
2. its exact Outcome 1 status was present;
3. the authorised test path was exact;
4. the authorised Evidence path was exact;
5. neither future file existed;
6. `lib/academy/AndyDigitalColleague.ts`, `lib/academy/repositoryKnowledgeService.ts`, and `lib/academy/Memory.ts` had no working-tree change;
7. the Authority confirmed that neutral synthetic material was sufficient and no real programme record or manifest was required.

## 3. Files Created

Exactly these files were created for this implementation and Evidence acquisition:

1. `lib/academy/__tests__/boundedSourceProvider.test.ts`;
2. `docs/formation/HH0000_CURRENT_PROGRAMME_ORIENTATION_BOUNDED_SOURCE_PROVIDER_SYNTHETIC_TEST_EVIDENCE.md`.

No production file was changed. No existing test was changed. The controlling Authority record pre-existed this implementation task.

## 4. Neutral Synthetic Material

The test created one operating-system temporary directory and removed it in a `finally` block.

| Identity | Location | Manifest status | Neutral content identity |
|---|---|---|---|
| Document A | `authorised/atlas-a.md` | Included | Fictional atlas lantern catalogue notes |
| Document B | `authorised/atlas-b.md` | Included | Fictional atlas beacon catalogue notes |
| Document C | `authorised/atlas-c.md` | Excluded | Deliberately similar lantern and beacon catalogue wording |
| Document D | `outside-authorised-root.md` | Excluded and outside the synthetic source root | Fictional remote atlas index wording |

The deeply frozen manifest contained only Documents A and B. Static checks found no real programme path, real programme-orientation request, Case 001 material, C18 material, Evidence package, or historical content in the test.

## 5. Provider Structure and Instrumentation

The test file defines one inline subclass of `RepositoryKnowledgeService`. It:

1. receives the synthetic root, immutable manifest, and optional one-use setting;
2. resolves and reads only exact manifest paths;
3. rejects a manifest path that resolves outside the synthetic root before reading;
4. constructs deterministic `RepositoryDocument` values without ranking or query-based discovery;
5. preserves exact `id`, `sourcePath`, title, section, UTF-8 text, fragment, and factual inclusion reason;
6. records attempted paths, returned paths, queries, invocation count, and local consumed state.

The provider contains no `super.search`, directory enumeration, reference following, repository write, Memory mutation, or Learning mutation.

## 6. Direct Provider Falsifiers

The focused test reached the later Andy integration assertion. Therefore all earlier direct-provider assertions completed successfully.

| No. | Falsifier | Observed result |
|---:|---|---|
| 1 | A is available | Passed: A was returned. |
| 2 | B is available | Passed: B was returned. |
| 3 | C is unavailable | Passed: C was neither attempted nor returned. |
| 4 | Strong similarity cannot expose C | Passed under the authorised keyword-similar query. |
| 5 | D is never accessed | Passed: D was neither attempted nor returned. |
| 6 | No traversal outside the manifest | Passed for this provider: attempted paths were exactly A and B; static inspection found no enumeration call. |
| 7 | Every result belongs to the manifest | Passed for every direct query variant. |
| 8 | `sourcePath` remains exact | Passed for A and B. |
| 9 | `id` remains deterministic | Passed as `synthetic-atlas-a` and `synthetic-atlas-b`. |
| 10 | Section identity survives | Passed as `Lantern Catalogue` and `Beacon Catalogue`. |
| 11 | Authored UTF-8 text remains exact | Passed for text and fragment. |
| 12 | Query wording cannot enlarge the set | Passed across the authorised variants. |
| 13 | Duplicate queries cannot enlarge the set | Passed using fresh provider instances. |
| 14 | Reordered or adversarial terms cannot enlarge the set | Passed. |
| 15 | Explicitly asking for excluded sources cannot expose them | Passed for the synthetic C and D paths. |

Six fresh direct-provider invocations completed before the integration probe: four query variants and two duplicate-query instances. Every completed direct invocation returned exactly A and B.

## 7. Andy Integration Probe

The test constructed one fresh `AndyDigitalColleague`, injected one fresh one-use provider, and called `runConstitutionalExamination` exactly once with:

`Explain the fictional lantern catalogue boundary.`

The query contained none of the prohibited recommendation or real-contribution wording.

### Direct Observation

The first integration assertion failed:

```text
Expected: true
Received: false
expect(result.retrievalActive).toBe(true)
```

Andy returned an examination result with `retrievalActive` equal to `false`. The test stopped at that assertion. It did not execute the subsequent integration assertions.

### Inference

The integration provider invocation count was not directly asserted or emitted before the failure. Because this provider deterministically returns A and B on its first search and has no unavailable reason, `retrievalActive: false` indicates that this neutral input did not reach repository retrieval. On that basis, an integration-provider invocation count of zero is inferred, not directly recorded.

The cause of the early non-retrieval path was not investigated because this Authority permits Evidence acquisition, not repair or a replacement test mechanism.

## 8. Integration Falsifiers

| No. | Falsifier | Observed result |
|---:|---|---|
| 16 | Andy uses the injected provider | Failed to demonstrate: the result reported retrieval inactive. |
| 17 | No fallback broad service is called | Not observed: assertion did not execute. |
| 18 | Andy adds no later source | Not observed: assertion did not execute. |
| 19 | Only A/B appear in retrieved material | Not observed: assertion did not execute. |
| 20 | Public or durable Memory remains empty | Not observed: assertion did not execute. |
| 21 | Last Reflection remains `null` | Not observed: assertion did not execute. |
| 22 | No Learning is promoted | Not observed: dependent Memory and Reflection assertions did not execute. |
| 23 | No follow-up or second turn occurs | One public call site was statically confirmed, but the runtime assertion sequence did not establish the full claim. |
| 24 | No repository or external write occurs | Not observed at runtime: write-spy assertions did not execute. Static checks found only four fixture writes under the test-created temporary directory. |
| 25 | The same integration provider refuses second use | Not observed: the second-use assertion did not execute. |

The Andy invocation count was exactly one. The integration provider's attempted and returned paths were not directly emitted before failure and remain unconfirmed. Memory, Reflection, Learning, follow-up, and one-use expiry results remain unknown rather than passing by assumption.

## 9. Validation Results

### Focused Test

Command:

```text
npm test -- --runInBand lib/academy/__tests__/boundedSourceProvider.test.ts
```

Exact result summary:

```text
FAIL lib/academy/__tests__/boundedSourceProvider.test.ts
Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Expected: true
Received: false
at expect(result.retrievalActive).toBe(true)
```

Exit code: `1`.

### Typecheck

Command:

```text
npm run typecheck
```

Result: passed with exit code `0` and no reported TypeScript errors.

### ESLint

Command:

```text
npx eslint lib/academy/__tests__/boundedSourceProvider.test.ts
```

Result: passed with exit code `0` and no output.

### Editor Diagnostics

The test file and this Evidence record had no editor diagnostics after creation and validation.

## 10. Static Boundary Checks

Focused checks passed and established:

1. real programme content and the actual request are absent from the test;
2. covered production files remain unchanged;
3. `super.search` is absent;
4. Memory and Learning mutation calls are absent;
5. exactly one `runConstitutionalExamination` call site exists;
6. fixture creation uses four `writeFileSync` calls and one `mkdirSync` call, all rooted under the operating-system temporary directory;
7. cleanup targets only the test-created temporary directory;
8. `git diff --check` reported no whitespace error before this Evidence file was created.

## 11. Limitations and Unknowns

1. Direct provider closure is demonstrated only for the authorised neutral synthetic cases.
2. The Andy integration boundary is not demonstrated because the neutral call did not activate retrieval.
3. No alternative query, second test mechanism, or production repair was attempted.
4. The exact early-return classification used by Andy was not investigated.
5. Runtime fallback absence, source non-expansion, Memory, Reflection, Learning, follow-up, write absence, and one-use refusal remain unresolved for the integration probe.
6. This Evidence does not establish behavior for any future provider, the default broad repository service, or a real source package.

## 12. Claims Withheld

This Evidence does not claim:

1. accepted synthetic source closure;
2. closure through the Andy integration boundary;
3. real programme-manifest correctness or sufficiency;
4. programme-orientation contribution readiness or Authority;
5. Context Door or natural-input readiness;
6. Memory, Learning, formation, relational, or judgement capability;
7. production defect, production repair Authority, production readiness, milestone completion, certification, or deployment readiness;
8. independent acceptance.

## 13. Final Classification and Stop

**B. SYNTHETIC SOURCE CLOSURE NOT DEMONSTRATED**

The direct test-only provider demonstrated closed synthetic reads and exact provenance before the integration probe. The complete authorised claim was not demonstrated because Andy's single neutral invocation returned with repository retrieval inactive and the remaining integration assertions did not execute.

This record is Evidence only and does not accept itself.

The only legitimate next question is:

> Does fresh independent review accept that the synthetic Evidence proves exact manifest closure, provenance retention, no wider access, no prohibited persistent effects, and one-use behavior through the existing AndyDigitalColleague injection boundary?

Implementation and Evidence acquisition stop here.