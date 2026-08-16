# HH-0000 Multi-Evidence Understanding Case 001 Execution Evidence Preservation Architecture Combined Authority Review

**Status:** EVIDENCE PRESERVATION ARCHITECTURE ACCEPTED - BOUNDED IMPLEMENTATION MAY BEGIN
**Decision date:** 2026-08-10
**Case:** `MEU-CASE-001`
**Review type:** Documentation-only MARC and Cyril Combined Authority assessment
**Architecture reviewed:** `docs/formation/HH0000_MULTI_EVIDENCE_UNDERSTANDING_CASE_001_EXECUTION_EVIDENCE_PRESERVATION_ARCHITECTURE_AND_AUTHORITY_REVIEW.md`
**Controlling evidence:** `docs/formation/HH0000_MULTI_EVIDENCE_UNDERSTANDING_CASE_001_EXECUTION_EVIDENCE_REVIEW.md`
**Historical authority:** `docs/formation/HH0000_MULTI_EVIDENCE_UNDERSTANDING_CASE_001_GATE_4_EXECUTION_AUTHORITY_REVIEW_V2.md`
**Assessment lenses:** MARC - Humanity / Formation; Cyril - Digital / Technology / Platform
**Implementation effect:** Permission is limited to the accepted post-package preservation components and focused synthetic/non-execution evidence
**Test effect:** Permission is limited to focused synthetic/non-execution evidence for preservation conformance and failure behavior
**Execution effect:** None - no Case 001 campaign, control, candidate, baseline, or evaluator execution is authorised
**Recovery effect:** None - no recovery of the first attempt and no automatic future persistence retry is authorised
**Artefact effect:** None - all six frozen artefacts and hashes remain unchanged
**Capability effect:** None - no semantic, Understanding, Learning, or capability claim is made

# Repository Traceability

**Constitution:** `constitution/02-CONSTITUTION.md`; `constitution/05-AUTHORITY-AND-STEWARDSHIP.md`.
**Theory:** `docs/theory/002-THEORY-OF-KNOWLEDGE.md`; `docs/theory/003-THEORY-OF-UNDERSTANDING.md`; `docs/theory/004-THEORY-OF-JUDGEMENT.md`; `docs/theory/007-THEORY-OF-CONTEXT.md`.
**Architecture:** Reviewed preservation architecture; accepted Case 001 `C01-C22` boundary; `docs/architecture/REPOSITORY_TRACEABILITY_STANDARD.md`.
**Engineering:** `docs/engineering/VALIDATION_PHILOSOPHY.md`; bounded preservation implementation now permitted but not performed.
**Milestone:** Not Applicable.
**Candidate:** Not Applicable.
**Evidence Type:** Combined Authority design acceptance based on incomplete first-attempt preservation evidence; no semantic execution evidence reviewed.

## 1. Decision Question

> Does the proposed preservation architecture protect Humanity / Formation and Digital / Technology / Platform boundaries sufficiently to permit the smallest post-package durable-capture implementation and focused synthetic/non-execution evidence?

## 2. Permitted Decisions

Exactly one decision must be recorded:

1. `EVIDENCE PRESERVATION ARCHITECTURE BLOCKED`;
2. `EVIDENCE PRESERVATION ARCHITECTURE CORRECTION REQUIRED`;
3. `EVIDENCE PRESERVATION ARCHITECTURE ACCEPTED - BOUNDED IMPLEMENTATION MAY BEGIN`.

## 3. Decision

**Decision:** `EVIDENCE PRESERVATION ARCHITECTURE ACCEPTED - BOUNDED IMPLEMENTATION MAY BEGIN`.

MARC and Cyril accept the architecture with the explicit component and dependency assignment recorded in this review.

Acceptance is limited to implementation and focused synthetic/non-execution evidence. It does not authorise another campaign, recover the consumed first attempt, make its partial stdout authoritative, or permit interpretation of its semantic fragments.

## 4. Review Boundary and Method

MARC and Cyril are applied independently as entrusted assessment lenses. This record does not invent dialogue, testimony, personal statements, or semantic evidence.

This review assessed only:

1. the documentation-level preservation architecture;
2. the controlling execution evidence review;
3. the consumed Gate 4 V2 authority boundary;
4. accepted Case 001 ownership and coordination classifications;
5. truth, attribution, privacy, uncertainty, stewardship, portability, and traceability requirements;
6. whether all required post-package operations can be named without semantic ownership;
7. what implementation and non-execution evidence would be required before another Gate 4 question.

This review did not:

1. inspect partial first-attempt semantic fragments;
2. modify or execute implementation or tests;
3. invoke campaign, candidate, baseline, evaluator, recorder, serializer, writer, reader, or receipt paths;
4. read, modify, hash, or rehash frozen source/control artefacts;
5. recover or repeat the consumed attempt;
6. create an evidence destination, package, receipt, or failure record;
7. grant execution authority.

# Part A - MARC Assessment: Humanity / Formation

## A1. Truth and Honest Uncertainty

The architecture correctly separates:

1. campaign completion or fail-closed state;
2. evidence-preservation completion or failure;
3. later semantic evidence review;
4. later Judgement or Authority.

It prohibits process exit, campaign status, stdout, logs, partial bytes, or implementation expectation from substituting for verified preserved evidence.

The first attempt remains historically recorded as one consumed invocation whose semantic and campaign outcomes are unknown. The architecture does not rewrite that record, reconstruct it, infer from fragments, or use preservation work as permission to inspect it.

**MARC finding:** Truth and honest uncertainty are preserved.

## A2. Attribution and Human Evidence

The required preservation receipt links one exact package to:

1. one attempt identity;
2. one campaign identity;
3. one Gate 4 authority identity;
4. one serializer and package-contract identity;
5. one authoritative destination;
6. one source and persisted byte identity;
7. one bounded preservation chronology.

The package bytes remain unchanged. Direct accounts, source relationships, uncertainty, and all evidence inside the package therefore retain the attribution created by the campaign.

No persistence component may select, summarize, classify, redact, normalize, repair, or interpret package content. The receipt carries integrity and provenance facts only.

**MARC finding:** Preservation strengthens attribution without creating a new human-meaning owner.

## A3. Privacy, Access, and Retention

The accepted storage contract is bounded as follows:

1. future authoritative evidence uses a repository-relative governed identity under `docs/formation/execution-evidence/MEU-CASE-001/<attempt-id>/`;
2. the final package and receipt are classified as immutable governed execution evidence, regardless of their directory;
3. access is limited to repository-authorised reviewers acting for the Case 001 evidence purpose;
4. stdout, logs, telemetry, errors, and temporary files are non-authoritative and must not widen access;
5. temporary files must be removed after verified publication or bounded failure recording, subject to implementation evidence;
6. authoritative package and receipt retention continues until a separate governed closure or deletion decision;
7. no automatic deletion, retention extension, publication, or external transfer is authorised;
8. one attempt cannot overwrite or share a destination with another.

The future implementation may use a machine-local staging file only as a non-authoritative intermediate under the same access boundary. Machine-local staging paths must not enter committed source or receipt provenance.

**MARC finding:** The architecture has a sufficient bounded privacy, access, and retention policy for implementation evidence; any widening triggers re-entry.

## A4. Separation from Memory, Learning, and Judgement

Durable execution evidence is not relationship Memory, candidate prior state, retrieval material, or Learning.

The architecture prohibits package, receipt, persistence status, stdout, and failure records from entering:

1. candidate or baseline input;
2. configuration, cache, Memory, or prior state;
3. retrieval, prompt, or generated context;
4. another campaign or cycle;
5. Learning, Knowledge promotion, Judgement, Authority, Action, communication, or intervention.

The candidate proposition that unpreservable evidence cannot responsibly become learning remains a candidate principle only. This review neither adopts nor promotes it.

**MARC finding:** Evidence preservation remains distinct from cognitive and entrusted responsibilities.

## A5. MARC Conclusion

**Finding:** `HUMANITY / FORMATION PRESERVATION ARCHITECTURE ACCEPTED`.

MARC accepts bounded implementation because the architecture protects truth, attribution, privacy, dignity, and uncertainty while prohibiting semantic inspection and downstream cognitive use.

Implementation evidence must prove those boundaries. Design acceptance does not prove them operationally.

# Part B - Cyril Assessment: Digital / Technology / Platform

## B1. Explicit Post-Package Component Map

The accepted Case 001 component map is extended only after the immutable campaign package exists:

| Component | Name | Classification | Sole responsibility |
| --- | --- | --- | --- |
| `C23` | Evidence Preservation Transport | `TRANSPORT` | Deterministically serialize the whole immutable package and perform opaque temporary write, publication, and re-read byte I/O |
| `C24` | Evidence Preservation Integrity | `INTEGRITY` | Establish source/persisted identity, record preservation chronology, verify write/re-read equality, create and seal the immutable preservation receipt |

No new semantic component or classification is introduced.

### `C23` may

1. receive the whole immutable campaign package from C22;
2. apply the accepted deterministic serializer to the whole package;
3. receive a pre-authorised attempt-specific destination identity;
4. write exact bytes to a temporary destination;
5. flush, close, and atomically publish through the accepted storage contract;
6. re-read exact bytes from the final destination when requested;
7. return bytes and opaque mechanical I/O statuses.

### `C23` must not

1. inspect fields to choose content or destination;
2. omit, filter, summarize, classify, redact, normalize, repair, or reinterpret data;
3. calculate semantic status;
4. import candidate, baseline, evaluator, held-out, Memory, Learning, or external semantic services;
5. feed bytes or statuses to campaign formation or evaluation;
6. treat stdout or temporary bytes as authoritative evidence.

### `C24` may

1. activate a separate append-only preservation record before C23 serialization;
2. compute source byte length and SHA-256;
3. record C23 write, confirmation, publication, and re-read facts;
4. compute re-read length and SHA-256;
5. compare source and re-read length, hash, and bytes;
6. record fixed preservation contamination rules;
7. create, deterministically serialize, hash, and seal the preservation receipt;
8. return only `PRESERVATION_VERIFIED` or `PRESERVATION_INCOMPLETE` to C22.

### `C24` must not

1. parse or inspect semantic package fields;
2. decide campaign, invariant, held-out, or hypothesis success;
3. repair bytes or request candidate/evaluator rerun;
4. overwrite or merge attempt identities;
5. classify preservation as verified before re-read comparison and receipt seal;
6. feed package, receipt, or status into campaign formation or evaluation.

**Cyril finding:** The architecture now names every new responsibility without mixed or semantic ownership.

## B2. Post-Package Dependency and Control Map

The accepted dependency order is:

```text
campaign C21 finding
  -> immutable Case001CampaignEvidence package
  -> C22 routes package and fixed attempt identity
  -> C23 deterministic serialization
  -> C24 source length and SHA-256
  -> C23 temporary write, durability confirmation, and atomic publication
  -> C23 independent final re-read
  -> C24 length, SHA-256, and byte equality verification
  -> C24 receipt creation, hash, and seal
  -> C22 receives one opaque preservation status
  -> evidential completion or fail-closed preservation-incomplete state
```

`C22` remains `TRANSPORT`. Its extension is limited to fixed post-package sequencing and opaque status routing. It cannot inspect package bytes, package fields, hashes, receipt fields, or failure rationale.

The existing campaign C20 record remains sealed and unchanged. `C24` owns a separate preservation record and receipt. Neither is inserted into or used to rewrite the campaign package.

There is no edge from `C23`, `C24`, the authoritative package, receipt, or status to `C01-C21` execution responsibilities.

**Cyril finding:** The post-package graph is explicit, acyclic, and non-feedback.

## B3. Deterministic Byte Contract

The bounded implementation must use canonical JSON version `MEU-CASE-001-CANONICAL-JSON-1`:

1. encoding is UTF-8 without BOM;
2. object keys are ordered lexicographically by Unicode code point at every depth;
3. array order is preserved exactly;
4. strings, booleans, null, and finite numbers use ECMAScript JSON scalar representation;
5. no insignificant whitespace or terminal newline is emitted;
6. strings are not Unicode-normalized or semantically altered;
7. `undefined`, functions, symbols, bigint, non-finite numbers, cyclic structures, unsupported prototypes, and lossy values are rejected before authoritative publication;
8. one package value produces one byte sequence;
9. receipt serialization uses the same canonical rules under its own receipt schema version.

The package contract identity and serializer version are fixed inputs to the future preservation wrapper and receipt. A serializer or contract change requires architecture re-entry and fresh evidence.

**Cyril finding:** Byte identity is sufficiently determinate for bounded implementation.

## B4. Durable Publication Contract

The accepted minimum publication sequence is:

1. preselect the attempt identity and repository-relative final destination before campaign invocation;
2. create the separate C24 preservation record;
3. serialize the returned immutable package once into source authoritative bytes;
4. compute and record source byte length and SHA-256;
5. create a new attempt-specific temporary file in the final destination directory;
6. write all source bytes and reject short writes;
7. flush the file through the platform durability primitive, close it successfully, and record confirmation;
8. atomically rename the temporary file to the non-existing final package path;
9. flush the containing directory where the platform provides that primitive;
10. independently reopen and read the final file;
11. verify exact length, SHA-256, and byte equality;
12. create and atomically publish the canonical receipt;
13. independently re-read and verify the receipt bytes and hash;
14. seal the C24 preservation record;
15. return `PRESERVATION_VERIFIED` only after all prior steps pass.

Implementation evidence must name the exact platform primitives and prove their behavior on the supported environment. Unsupported durability guarantees must produce `PRESERVATION_INCOMPLETE`, not a weaker success claim.

**Cyril finding:** Write ordering and evidential completion are explicit and fail-closed.

## B5. Destination and Provenance Contract

The future final identities are:

```text
docs/formation/execution-evidence/MEU-CASE-001/<attempt-id>/campaign-package.canonical.json
docs/formation/execution-evidence/MEU-CASE-001/<attempt-id>/preservation-receipt.canonical.json
```

Rules:

1. `<attempt-id>` is created mechanically before campaign invocation and contains no semantic result;
2. both final paths are repository-relative and precomputed before output exists;
3. repository root is derived from module location through the existing anchored strategy;
4. path traversal, symlinks escaping the governed root, existing destinations, machine usernames, absolute committed paths, and private addresses are rejected;
5. final package and receipt are immutable governed execution evidence;
6. receipt provenance records repository-relative paths only;
7. absolute paths may appear only in machine-local non-publishable diagnostics and cannot become authoritative receipt data;
8. neither final file is automatically added to Knowledge, Memory, Learning, indexes, prompts, or retrieval.

**Cyril finding:** Destination identity is portable, attributable, and content-independent.

## B6. Failure and Recovery Decision

No automatic or manual persistence retry is accepted for the bounded first implementation.

On any serialization, write, flush, close, rename, directory flush, re-read, length, hash, byte, receipt, or seal failure:

1. return `PRESERVATION_INCOMPLETE` once;
2. leave execution authority consumed;
3. publish no package or receipt as authoritative unless both pass the complete verification sequence;
4. do not invoke campaign, candidate, baseline, or evaluator again;
5. do not reuse the attempt identity for another campaign;
6. preserve only bounded non-semantic failure facts through a separately verified mechanism where possible;
7. remove temporary files where bounded cleanup is mechanically safe;
8. stop before evidence review or semantic interpretation;
9. require a separate authority decision for any future attempt.

Idempotent recovery from an in-memory package is not included in bounded implementation permission. Adding it requires architecture re-entry and separate Combined Authority review.

**Cyril finding:** Recovery ambiguity is closed by prohibition; failure behavior is deterministic.

## B7. Stdout Decision

Stdout is optional and permanently non-authoritative.

The bounded implementation may emit only:

1. the attempt identity;
2. the opaque preservation status;
3. after verified preservation, the repository-relative package and receipt identities and hashes.

It must not emit the semantic package. Truncation, terminal loss, or tool overflow must not affect authoritative preservation or evidential completion.

**Cyril finding:** Stdout is removed from the evidence path.

## B8. Required Focused Implementation Evidence

Before any new Gate 4 review, focused synthetic/non-execution evidence must prove:

1. canonical serializer repeatability and fixture-independent behavior;
2. rejection of every unsupported or lossy value class;
3. recursive key ordering and exact array preservation;
4. exact UTF-8, BOM, whitespace, newline, and Unicode behavior;
5. source and re-read byte-length equality;
6. source and re-read SHA-256 equality;
7. byte-for-byte equality;
8. detection of prefix, truncation, append, mutation, substitution, and wrong-attempt bytes;
9. fixed write/flush/close/rename/directory-flush/re-read/verify/receipt/seal order;
10. refusal to overwrite package, receipt, temporary, or attempt identities;
11. path traversal and symlink-escape refusal;
12. separate immutable campaign package, preservation record, and receipt;
13. receipt determinism, hash identity, re-read verification, and seal-before-success;
14. no successful status before all verification steps;
15. failure injection at every publication boundary;
16. no campaign, candidate, baseline, held-out, or evaluator invocation in preservation tests;
17. C23 imports no semantic implementation and performs no field selection;
18. C24 imports no semantic implementation and inspects no package fields;
19. C22 receives only opaque preservation statuses;
20. package, receipt, status, and paths cannot feed `C01-C21`, configuration, cache, Memory, prior state, retrieval, prompt, generated context, Learning, or another campaign;
21. stdout emits no package content and cannot become authoritative;
22. all six frozen paths, bytes, and hashes remain unchanged;
23. typecheck and the focused existing Case 001 non-execution suite remain passing;
24. no generated index or unrelated file changes are required.

Synthetic package values may be used. Real source/control campaign output and partial first-attempt fragments are prohibited.

## B9. Cyril Conclusion

**Finding:** `DIGITAL / TECHNOLOGY / PLATFORM PRESERVATION ARCHITECTURE ACCEPTED`.

Cyril accepts the explicit C23/C24 extension and post-package dependency map for bounded implementation. Operational claims remain unproven until the required source and focused fault-injection evidence passes.

# Part C - Combined Authority Finding

## C1. Assessment Matrix

| Requirement | MARC finding | Cyril finding | Combined Authority finding |
| --- | --- | --- | --- |
| Separate execution and preservation states | Protects honest uncertainty | Separate closed statuses and transitions | ACCEPTED |
| Preserve first attempt historically | No inference or rewriting | No recovery or package reconstruction | ACCEPTED |
| Define minimum durable capture | Exact attributable package required | Canonical bytes, atomic publication, re-read, receipt | ACCEPTED |
| Assign responsibility | No semantic owner introduced | C23 `TRANSPORT`; C24 `INTEGRITY`; C22 opaque routing | ACCEPTED |
| Prevent semantic inspection | Protects dignity and truth | Source/import and behavior prohibitions | ACCEPTED WITH IMPLEMENTATION EVIDENCE |
| Prove byte identity | Attribution remains exact | Length, SHA-256, byte equality, receipt | ACCEPTED WITH IMPLEMENTATION EVIDENCE |
| Fail closed after execution | Unknown result remains unknown | One incomplete status; no retry or recovery | ACCEPTED |
| Keep stdout non-authoritative | No convenience copy gains authority | Package omitted from stdout | ACCEPTED |
| Prevent ingress or feedback | No Memory, Learning, or Judgement | No edge to C01-C21 or future campaign | ACCEPTED WITH IMPLEMENTATION EVIDENCE |
| Preserve frozen/candidate/evaluator boundaries | Human evidence unchanged | All six artefacts and semantic closures unchanged | ACCEPTED |
| Define MARC evidence | Truth, attribution, privacy, uncertainty named | Falsifiable implementation conditions | ACCEPTED |
| Define Cyril evidence | Human boundary remains inspectable | Byte, order, isolation, fault evidence named | ACCEPTED |
| Govern any future campaign | Fresh authority required | Acceptance -> implementation -> evidence -> Gate 4 | ACCEPTED |
| Withhold current execution authority | No repeated formation | No execution or recovery permission | ACCEPTED |

## C2. Agreement and Reservations

**Agreement:** MARC and Cyril independently accept the preservation architecture and explicit component assignment for bounded implementation and focused synthetic/non-execution evidence.

**Material disagreement:** None.

**Reservations:**

1. documentation cannot prove canonical serialization, durable publication, re-read identity, or receipt sealing;
2. documentation cannot prove C23/C24 semantic closure or C22 opaque routing;
3. documentation cannot prove platform durability primitives or interruption behavior;
4. documentation cannot establish that a future package is preserved;
5. documentation cannot revive, recover, or interpret the first consumed attempt;
6. documentation cannot justify another execution.

These are mandatory implementation-evidence conditions, not permission to weaken the accepted architecture.

## C3. Bounded Implementation Permission

This review permits only:

1. adding `C23` Evidence Preservation Transport exactly as classified;
2. adding `C24` Evidence Preservation Integrity exactly as classified;
3. extending C22 only for fixed post-package routing and opaque preservation status;
4. implementing canonical JSON version `MEU-CASE-001-CANONICAL-JSON-1`;
5. implementing the fixed repository-relative destination and atomic publication contract;
6. implementing the separate preservation record and sealed receipt;
7. implementing fail-closed `PRESERVATION_VERIFIED` / `PRESERVATION_INCOMPLETE` outcomes;
8. adding only focused synthetic/non-execution conformance and fault-injection tests;
9. conducting a separate preservation implementation evidence review after those checks pass.

Every helper, type, or adapter must map wholly to C23 or C24, or to C22's accepted mechanical extension. Any unmatched responsibility triggers re-entry.

## C4. Prohibited Effects

This review does not permit:

1. another Case 001 campaign or control execution;
2. recovery, reconstruction, parsing, or semantic inspection of first-attempt fragments;
3. candidate, baseline, held-out, invariant, cross-cycle, or campaign invocation with governed fixtures;
4. changing candidate, baseline, evaluator, recorder, campaign, fixture, or held-out semantics;
5. changing or rehashing any frozen artefact;
6. automatic or manual persistence retry;
7. external storage, telemetry, publication, or service transfer;
8. using package or receipt as Memory, prior state, retrieval, prompt, configuration, cache, generated context, Learning, or another campaign input;
9. semantic summaries, interpretation, Judgement, Authority, Action, communication, intervention, or capability claims;
10. promotion of the candidate preservation principle;
11. Gate 4 review before preservation implementation evidence is separately accepted.

## C5. Re-entry Conditions

Stop and return to Combined Authority if:

1. C23 or C24 requires semantic field inspection;
2. a responsibility cannot map wholly to C23, C24, or C22's accepted mechanical extension;
3. another component or classification is required;
4. campaign C20/C21 must be reopened, rewritten, or merged with preservation evidence;
5. C22 must inspect bytes, hashes, receipt fields, or failure rationale;
6. persistence status must feed `C01-C21` or another campaign;
7. canonical serialization cannot preserve the full package value losslessly;
8. platform durability cannot satisfy the accepted publication contract;
9. destination, access, retention, cleanup, or provenance must widen;
10. recovery or retry is proposed;
11. any frozen artefact, candidate input, evaluator boundary, campaign meaning, or Gate 4 consumption rule changes;
12. first-attempt semantic fragments are proposed for inspection;
13. another campaign is proposed before a fresh Gate 4 decision.

## C6. Required Authority Sequence

Another campaign may be considered only after:

1. the bounded C23/C24 preservation mechanism is implemented;
2. focused synthetic/non-execution evidence satisfies Section B8;
3. a separate implementation evidence review accepts the mechanism;
4. a fresh Gate 4 review assesses whether one new attempt is justified;
5. Gate 4 explicitly authorises that one attempt.

The first Gate 4 V2 authority remains consumed. This design acceptance cannot substitute for fresh execution authority.

## C7. Exact Next Step

Implement only the accepted C23/C24 preservation boundary and focused synthetic/non-execution evidence. Then conduct a separate preservation implementation evidence review.

Do not execute or recover Case 001. Do not inspect the first attempt. Do not return to Gate 4 yet.

## C8. Validation Boundary

Documentation validation may establish only:

1. both entrusted lenses are assessed independently;
2. one Combined Authority decision is selected;
3. C23/C24 ownership and post-package dependencies are explicit;
4. permission, prohibition, re-entry, and future authority boundaries are present;
5. repository references resolve;
6. no implementation, test, frozen artefact, generated index, execution, or recovery is performed.

No runtime, typecheck, test, serializer, writer, reader, receipt, campaign, candidate, baseline, evaluator, fixture, control, or recovery command is required or authorised by this review.

## Traceability Summary

**Principle:** Humanity, Truth, uncertainty, bounded authority, evidence before claims, and stewardship.
**Theory:** Knowledge requires attributable preserved evidence; Understanding and Judgement cannot be inferred from incomplete records.
**Architecture:** Accepted C23 `TRANSPORT`, C24 `INTEGRITY`, C22 post-package opaque routing, canonical bytes, durable publication, re-read verification, and sealed receipt.
**Engineering:** Bounded preservation implementation and synthetic/non-execution evidence are permitted; conformance remains unproven.
**Milestone:** Not Applicable.
**Evidence:** Preservation architecture and incomplete first-attempt evidence review; no semantic fragment, complete first package, implementation proof, recovery, or new execution evidence is reviewed.