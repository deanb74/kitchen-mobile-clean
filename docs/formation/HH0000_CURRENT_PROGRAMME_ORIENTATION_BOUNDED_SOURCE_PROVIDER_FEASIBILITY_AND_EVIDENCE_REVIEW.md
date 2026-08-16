# HH-0000 Current Programme Orientation Bounded Source-Provider Feasibility and Evidence Review

**Status:** OUTCOME 4 - CURRENT EVIDENCE IS INSUFFICIENT TO DECIDE
**Review date:** 2026-08-12
**Subject:** Closed source delivery through the existing Andy repository-service injection boundary
**Review type:** Engineering-feasibility and non-contribution Evidence review
**Contribution effect:** None - Andy's programme-orientation contribution is not begun or authorised
**Implementation effect:** None
**Production capability effect:** None
**Programme-source effect:** None - no programme record was read for content and no real manifest was created

## 1. Governing Question

> Can the existing `AndyDigitalColleague` repository-service injection boundary receive one closed, provenance-preserving provider that returns exactly a human-authorised programme-status manifest, performs no wider repository traversal, adds no interpretation, and can be evidenced without beginning Andy's contribution?

This review answers only what current source and existing tests establish. It does not construct the provider, add tests, modify broad repository search, ask Andy the programme-orientation question, or reconcile programme status.

## 2. Immediate Authority and Traceability

The immediate controlling record is:

1. `docs/formation/HH0000_CURRENT_PROGRAMME_ORIENTATION_OUTCOME_3_DEPENDENCY_RESOLUTION_REVIEW.md`.

That record identifies one unresolved bounded-information mechanism and asks whether the existing repository-service injection boundary can host a closed one-use provider. It explicitly grants no implementation Authority and prohibits implementing the provider or creating the real manifest package.

**Principle:** Truth before certainty, evidence before claims, proportional access, human Authority over source inclusion, and no contribution before permission.

**Theory:** `docs/theory/004-THEORY-OF-JUDGEMENT.md`.

**Architecture:** Existing `AndyDigitalColleague` and repository-service boundary only.

**Engineering:** Current source and existing tests; no new executable source or test is created.

**Milestone:** Not Applicable.

**Evidence:** Source inspection and existing test evidence listed in Section 3.

## 3. Review Boundary and Sources

Only the following implementation and tests were required:

1. `lib/academy/AndyDigitalColleague.ts`;
2. `lib/academy/repositoryKnowledgeService.ts`;
3. `lib/academy/academyTypes.ts`;
4. `lib/academy/Memory.ts`;
5. `lib/academy/__tests__/repositoryKnowledgeService.test.ts`;
6. `lib/academy/formation/contextDoor.ts`;
7. `lib/academy/formation/__tests__/context-door.test.ts`;
8. `docs/formation/HH0000_ANDY_RUNTIME_EVIDENCE_AUDIT.md`;
9. `docs/formation/HH0000_CURRENT_PROGRAMME_ORIENTATION_OUTCOME_3_DEPENDENCY_RESOLUTION_REVIEW.md`.

Programme-orientation records, historical execution Evidence, bounded Evidence packages, receipts, fixtures, and semantic execution artefacts were not inspected.

## 4. Existing Injection Boundary

`AndyDigitalColleague` accepts constructor options containing:

```ts
repositoryKnowledgeService?: RepositoryKnowledgeService;
```

Construction follows one branch:

1. if a service is supplied, that exact object is returned and retained;
2. otherwise a `RepositoryKnowledgeService` is created from the supplied repository root or the module-anchored default root;
3. if no root is available, an unavailable service is created.

The retained service is stored once in `this.repositoryKnowledgeService`. Repository retrieval calls only:

```ts
this.repositoryKnowledgeService.search(question)
```

No reviewed code constructs a second service after injection, supplements an injected result from another repository, or falls back to broad search when the injected result is empty.

## 5. Structural and Nominal Contract

The search behavior used by Andy is operationally simple:

```ts
search(question: string): RepositoryDocument[]
```

The injection option is not fully structural, however. It is typed as the concrete `RepositoryKnowledgeService` class, which contains private state. A caller-supplied arbitrary object with only `search` is therefore not proven assignable to the constructor option.

A subclass or actual `RepositoryKnowledgeService` instance would satisfy the nominal boundary in principle. Existing tests inject an actual service instance. No existing ordinary-advisory test injects a closed subclass or another exact-manifest implementation.

Context Door separately accepts a structural repository provider, but Context Door denies contribution progression and is outside the permitted route for this work.

## 6. Repository Document Representation

`RepositoryDocument` contains:

1. `id`;
2. `title`;
3. `source`;
4. `sourcePath`;
5. `text`;
6. `score`;
7. `section`;
8. `fragment`;
9. `reason`.

The ordinary advisory path maps each supplied document into `RetrievedDocument` without another repository lookup:

1. `id` remains `id`;
2. `title` remains `title`;
3. `sourcePath` becomes both `source` and `sourcePath`;
4. `section` remains `section`;
5. `fragment` remains `fragment`;
6. `text` becomes `snippet`;
7. `score` remains `score`;
8. result order becomes `rank`;
9. `reason` remains `reason`.

Existing tests prove path, section, fragment, reason, and rank propagation for the ordinary service. They do not prove exact-manifest closure through an injected provider.

## 7. Set Preservation After Injection

After `search` returns, Andy may reorder the supplied documents through `prioritizeDocumentsForUnderstanding` and may select a subset for reasoning presentation. The reviewed code does not:

1. invoke another repository service;
2. add an unreturned document;
3. follow references automatically;
4. retrieve from a path found inside supplied content;
5. replace one returned document with a keyword-similar document;
6. write a source document.

This supports a conceptual closure hypothesis:

> If an injected provider returns only the authorised set, Andy's retrieval stage does not broaden that set.

It does not yet prove the provider itself can enforce that antecedent.

## 8. Broad Default Service Is Not the Provider

The default `RepositoryKnowledgeService` cannot satisfy the bounded consequence because it:

1. recursively traverses Markdown beneath its configured root;
2. discovers documents independently of a manifest;
3. scores content against query keywords;
4. excludes multiple path classes required by the proposed work;
5. truncates results to six ranked fragments;
6. accepts no exact-path allowlist.

No change to that broad service is justified by this review. The feasibility question concerns whether the existing injection seam can isolate a separate one-use provider.

## 9. Minimum One-Use Provider Contract

The smallest provider contract would be limited to one human-authorised manifest.

### Input

1. one immutable list of exact repository-relative paths selected by a human authority;
2. optional exact authorised section identities for listed paths;
3. an explicit one-use scope and expiry condition.

### Output

For each listed and successfully read source only:

1. canonical repository-relative `sourcePath`;
2. stable document `id` derived without semantic classification;
3. authored title and optional authorised section identity;
4. exact authored whole content or exact authorised section content;
5. a factual reason that inclusion came from the human-authorised manifest;
6. no status interpretation, summary, relevance conclusion, or supersession claim.

### Negative behavior

The provider must not:

1. traverse outside the manifest;
2. return an unlisted document;
3. discover documents from keywords;
4. follow references;
5. rank one source as more current or authoritative than another;
6. inspect excluded Evidence unless its exact path is separately authorised;
7. write repository state;
8. create Memory, Learning, feedback, or follow-on work;
9. invoke Andy's actual programme-orientation request;
10. survive beyond the one bounded contribution.

This contract is an Evidence target, not an implementation design or Authority.

## 10. Adapter Versus Capability Classification

The smallest truthful current classification is:

> **A/B candidate - a test or execution harness using the existing injection seam, with a narrow source adapter around exact document reading.**

Current source does not show that `AndyDigitalColleague` or repository architecture must change. A closed provider could in principle remain outside production behavior and be supplied through the existing constructor option.

This is not yet classified as Outcome 1 because no executable Evidence proves that the candidate provider can satisfy exact closure. It is not classified as a new capability merely because a small amount of test or adapter code may be required.

## 11. Human-Authorised Manifest Boundary

The final manifest remains a human access-governance decision. Andy must not choose, discover, or expand the set of records he may inspect.

A later synthetic closure test may use only neutral temporary documents. It must not read actual programme-orientation records.

Manifest membership means only:

1. the human authorised access to that source for the bounded task.

It does not mean:

1. the source is current;
2. the source is authoritative;
3. the source is relevant to the final conclusion;
4. omission means irrelevant or resolved;
5. one source supersedes another.

Those distinctions must remain available for later advisory work and human decision.

## 12. Required Falsifiers

A future authorised synthetic test must attempt to falsify all of the following without using the real programme request:

1. listed neutral document A is returned;
2. listed neutral document B is returned;
3. unlisted neutral document C is not returned;
4. keyword similarity to C cannot cause C to appear;
5. no path outside the manifest is read or traversed;
6. `sourcePath`, `id`, and optional `section` remain attributable;
7. authored content is byte-equivalent or exact-text equivalent under the stated text-decoding contract;
8. duplicate, reordered, or adversarial query terms do not widen the set;
9. requesting an unlisted path returns no outside source;
10. no write operation occurs;
11. no `Memory` record, Learning, feedback event, automatic follow-up, or real contribution output occurs;
12. Andy's actual programme-orientation request is absent from all inputs;
13. one injected provider instance receives every search call;
14. no default or fallback `RepositoryKnowledgeService` is constructed or called;
15. expiry prevents a second contribution use.

Source inspection supports several of these propositions. It is not a substitute for the complete executable falsifier set.

## 13. Provenance Assessment

The existing document and retrieval contracts can carry:

1. canonical source path;
2. document identity;
3. exact text and fragment fields;
4. optional section identity;
5. a factual inclusion reason.

Human selection can remain attributable through the separately governed manifest identity and the provider's factual inclusion reason. No new semantic field is shown to be necessary at feasibility level.

The current path does not itself prove:

1. content identity against the canonical source;
2. that the human manifest was immutable;
3. that every returned source belonged to that manifest;
4. that no unlisted read occurred;
5. provider expiry.

Those are the missing closure Evidence properties.

## 14. State, Memory, and Contribution Boundary

`runConstitutionalExamination` produces a human-facing response and records the turn in bounded in-memory `conversationHistory`. That history is distinct from the public `Memory` store, but it is still runtime state.

The successful repository path may also build deliberation and reflection state. Reflection can write to `Memory` if confirmed Learning is formed.

A feasibility test must therefore avoid the actual programme request and prove no `Memory` or Learning write. If exercising the public advisory method is necessary to prove integration, it must use a neutral synthetic question, treat the returned answer only as non-contribution test output, and assert that no durable or public `Memory` record and no Learning effect occurs.

This review does not decide or execute that test method.

## 15. Current Evidence Sufficiency

Current evidence establishes:

1. caller injection of an actual repository service instance;
2. retention of the injected service as the sole repository dependency;
3. no fallback search after injection;
4. no broadening of the returned document set inside retrieval;
5. propagation of source identity fields into advisory retrieval results;
6. a plausible subclass or adapter route without production search modification.

Current evidence does not establish:

1. a closed exact-manifest provider for the ordinary advisory path;
2. no traversal outside a manifest;
3. no unlisted return under adversarial queries;
4. exact content preservation by that provider;
5. no writes by that provider;
6. provider expiry;
7. integration without prohibited Memory, Learning, or real contribution effects.

Calling the boundary sufficient now would convert a plausible source reading into an unearned executable closure claim.

## 16. MARC Independent Review

**Question:** Would this mechanism give a developing colleague the real records needed for the job without pre-chewing the answer for him or exposing material he was never asked to see?

**Finding:** The proposed contract can do so if it carries exact authored material selected by humans and makes selection visible without summarising status or implying relevance. The injection seam is preferable to broad search because it can protect unnecessary material from exposure.

No test should use the real programme question or programme records. Synthetic closure Evidence is about fair access, not about testing Andy's programme judgement. Human-authored summaries, inferred status labels, or omission presented as irrelevance would pre-chew the answer and must fail.

**MARC conclusion:** The human boundary is coherent, but current executable Evidence does not yet prove it is delivered.

## 17. Cyril Independent Review

**Question:** Does the existing injection boundary technically enforce exact source closure, or are we relying on prompt discipline or convention?

**Finding:** Injection prevents Andy from constructing a fallback service when a service instance is supplied. It does not make an arbitrary injected service closed. Closure belongs to the supplied provider and must be falsified independently.

The existing seam makes a test-only subclass or narrow adapter plausible. The default service is not adequate, and prompt instructions cannot repair it. No production architecture or broad-search change is justified unless a separately authorised focused test disproves the smaller provider route.

**Cyril conclusion:** Conceptual feasibility is strong; technical closure remains unproven.

## 18. Outcome

**OUTCOME 4 - CURRENT EVIDENCE IS INSUFFICIENT TO DECIDE**

The exact existing boundary is the `AndyDigitalColleague` constructor option accepting one `RepositoryKnowledgeService` instance and retaining it as the sole repository search dependency.

Source provenance fields survive into retrieved advisory documents. No fallback or additional repository search is visible after injection. Wider traversal remains possible if the injected service itself performs it, and no current executable Evidence proves a closed provider that does not.

No production code change is presently shown to be required. The smallest possible code surface is a test-only closed provider or narrow adapter plus one focused non-contribution test file. Repository governance requires separate implementation and synthetic-test Authority before that code is created; the controlling dependency review grants none.

This outcome does not select Outcome 2 because no defect in `AndyDigitalColleague` or its injection boundary is established. It does not select Outcome 1 because exact closure has not been executed and falsified.

## 19. Human Ownership and Prohibitions

Humans retain ownership of:

1. the exact real manifest;
2. authority to include each source;
3. acceptance of synthetic closure Evidence;
4. any later contribution Authority;
5. interpretation of omission, currentness, authority, and supersession;
6. all programme decisions.

Still prohibited:

1. creating the real programme manifest or package;
2. asking Andy the programme-orientation question;
3. executing or recording Andy's contribution;
4. inspecting prohibited Evidence;
5. modifying Context Door or broad repository search;
6. creating production capability, Memory, or Learning;
7. treating source inclusion as status interpretation;
8. granting implementation or contribution Authority from this review.

## 20. Smallest Next Authority Question

> May one test-only closed `RepositoryKnowledgeService` provider or subclass and one focused synthetic/non-contribution test be created solely to falsify exact manifest closure, provenance retention, no wider traversal, no writes, no Memory or Learning, no fallback service, and one-use expiry through the existing `AndyDigitalColleague` injection boundary, using neutral temporary documents and never invoking the actual programme-orientation request?

If that narrow Authority is granted, the resulting Evidence must be reviewed independently before Outcome 1 may be claimed or contribution Authority reconsidered.

Do not implement the provider or test, create the real manifest, begin Andy's contribution, or alter production behavior under this review.