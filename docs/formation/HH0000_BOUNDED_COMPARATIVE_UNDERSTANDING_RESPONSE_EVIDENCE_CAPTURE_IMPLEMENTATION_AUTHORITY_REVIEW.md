# HH-0000 Bounded Comparative Understanding Response Evidence-Capture Implementation Authority Review

**Status:** OUTCOME 1 - TWO-FILE HARNESS-SUPPORT IMPLEMENTATION AUTHORISED - FUTURE HARNESS INTEGRATION WITHHELD - AUTHORITY UNCONSUMED
**Review date:** 2026-08-13
**Review type:** Strictly documentation-only implementation Authority review
**Controlling architecture:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_POST_EXPERIMENT_EVIDENCE_CAPTURE_ARCHITECTURE_REVIEW.md`
**Mechanical precedent inspected:** Case 001 C23 `TRANSPORT` and C24 `INTEGRITY` preservation implementation and focused synthetic tests
**Implementation effect:** One bounded future support-module and synthetic-test implementation may begin only under Sections 16-22
**Integration effect:** None - no current experimental harness file is authorised; one future insertion requires exact-path continuation Authority
**Execution effect:** None - Andy, a provider, a response, a contribution, and the capture path were not invoked
**Historical-attempt effect:** None - the closed attempt remains consumed, expired, non-retryable, and without exact response bytes or a response-consequence finding
**Authority state:** Granted and unconsumed; this review does not consume it

# Repository Traceability

**Constitution:** `constitution/02-CONSTITUTION.md`; `constitution/05-AUTHORITY-AND-STEWARDSHIP.md`.
**Theory:** `docs/theory/002-THEORY-OF-KNOWLEDGE.md`; retained information is not automatically Memory, Knowledge, Learning, Understanding, Judgement, Authority, or Action.
**Architecture:** The controlling bounded response Evidence-capture architecture; accepted Case 001 `TRANSPORT`/`INTEGRITY` pattern as mechanical precedent only.
**Engineering:** `docs/engineering/VALIDATION_PHILOSOPHY.md`; exact raw UTF-8 identity, external atomic capture, independent verification, sealed receipt, capability closure, fail-closed sequencing, and focused synthetic falsification.
**Milestone:** Not Applicable.
**Candidate:** Not Applicable.
**Evidence Type:** Documentation-only implementation Authority decision; no source, test, runtime, response, storage, or implementation-conformance Evidence is created.

## 1. Sole Authority Question

> May one narrowly bounded harness-support implementation preserve exactly one complete raw UTF-8 response byte sequence in pre-authorised external human-controlled storage, prove that behavior with one focused synthetic suite, and leave Andy, providers, repository Evidence, cognitive persistence, delivery, contribution, retry, and future experimental execution unchanged?

Yes, within two exact new files and the fail-closed limits in this record.

The future experiment-harness insertion cannot yet be authorised because no eligible bounded comparative experiment harness exists in the repository. `scripts/academy/run-academy.ts` is not eligible: it runs an ordinary Formation journey, emits console output, and exposes cognitive trace, Learning, and Memory. A placeholder filename is not an exact implementation surface.

That absence does not block implementation and synthetic falsification of the capture boundary itself. It blocks integration and every future experiment. A later documentation-only continuation Authority must bind one existing exact harness file and permit only one import plus one immediate post-invocation capture call before any assertion, checker, logger, or output operation.

This review grants implementation Authority only. It does not implement, integrate, execute, accept, deliver, retain real response Evidence, or grant contribution Authority.

## 2. Permitted Outcomes

Exactly one outcome is selected:

1. **Outcome 1:** one bounded harness-only implementation may be authorised;
2. **Outcome 2:** an existing accepted helper can be reused directly with no new implementation;
3. **Outcome 3:** a specific implementation dependency remains.

Outcome 2 requires an existing helper whose governed unit, storage destination, receipt, ownership, and API already match this response contract. Mechanical similarity is insufficient.

Outcome 3 applies only if a missing dependency prevents the support boundary itself from being implemented and directly falsified. A missing future execution harness blocks integration and execution, but does not force a semantic, storage, package, or production dependency into the helper.

## 3. “10 What?” Review Discipline

Before granting Authority for any behavior, this review identifies:

1. the governed quantity;
2. the exact unit;
3. the baseline;
4. the direct validation instrument.

Passing typecheck, a successful write call, a returned JavaScript string, a response count, stdout, a console marker, a process exit code, or a file's existence does not establish exact response preservation.

Each implementation conclusion below is limited to the quantity its direct instrument can observe. Design compliance will remain unproven until the authorised source and synthetic Evidence exist and pass independent acceptance.

## 4. Central Preserved Quantity

### 4.1 Measurement Statement

| “10 what?” field | Direct statement |
| --- | --- |
| Governed quantity | Exact generated response bytes presented to the helper after one separately authorised invocation |
| Exact unit | One complete raw UTF-8 response byte sequence created once by `Buffer.from(result.answer, "utf8")` |
| Baseline | The final persisted response bytes equal that source sequence exactly, with no BOM, normalisation, newline, marker, JSON encoding, logger formatting, prefix, suffix, truncation, substitution, or content modification |
| Direct validation instrument | Source byte count and SHA-256 calculated before persistence, independent final-file re-read, and exact byte/length/SHA-256 equality against the retained source bytes |

The implementation must create source bytes exactly once through:

```ts
const sourceBytes = Buffer.from(response, "utf8");
```

`sourceBytes.byteLength` is the authoritative source byte count. Character count, string length, terminal width, JSON length, and persisted file metadata are not substitutes.

The raw response file contains only `sourceBytes`. The receipt is a separate file and cannot wrap, quote, escape, or delimit the response.

**Authority finding:** The exact governed unit is determinate and directly falsifiable.

## 5. Input and Pre-Authorisation Contract

### 5.1 Measurement Statement

| “10 what?” field | Direct statement |
| --- | --- |
| Governed quantity | Completeness and prior binding of capture Authority inputs |
| Exact unit | One immutable capture request supplied before response persistence begins |
| Baseline | Non-empty attempt identity, Authority identity, existing external capture root, explicit human access owner, fixed review purpose, exact future UTC `retainUntil`, and closed disposition rule are all present before source bytes are created or any path is written |
| Direct validation instrument | Focused table-driven refusal tests for each missing, empty, malformed, expired, mutable, or unsupported field, plus event-order evidence that no byte encoding or file operation precedes validation |

The helper may accept only:

1. the exact response string;
2. a closed attempt identity safe for one path segment;
3. the controlling contribution/capture Authority document identity;
4. an existing human-controlled external capture root supplied at runtime;
5. a non-empty human access-owner identity or authorised reviewer role;
6. a non-empty bounded review purpose;
7. an exact valid UTC `retainUntil` later than the supplied capture time;
8. one closed disposition rule: `DELETE_WHEN_DUE` or `SEPARATE_AUTHORITY_REQUIRED_FOR_TRANSFER_OR_DELIVERY`;
9. a clock dependency for deterministic synthetic chronology;
10. internal filesystem and hash operations only through a narrow injectable mechanical boundary used by focused tests.

No field may receive a default inferred from environment, username, current working directory, response content, repository status, or programme state. The module may use the existing anchored repository-root resolver only to reject repository-contained destinations. It may not modify that resolver.

**Authority finding:** Required human ownership, purpose, retention, and disposition can be bound without semantic processing.

## 6. External Root and Attempt Destination

### 6.1 Measurement Statement

| “10 what?” field | Direct statement |
| --- | --- |
| Governed quantity | Storage confinement to one pre-authorised external attempt destination |
| Exact unit | One newly created attempt directory beneath the canonical external root and outside the canonical repository root |
| Baseline | Root exists before capture; canonical root is outside and not equal to the repository; attempt identity is one safe segment; no existing response, receipt, temporary file, or attempt destination is overwritten; no traversal or symlink can redirect an operation |
| Direct validation instrument | Realpath/common-path checks, component-wise `lstat` checks, no-follow/exclusive creation where supported, and synthetic refusal tests for repository root, repository descendants, `..`, separators, absolute attempt IDs, existing destinations, and symlinked root/ancestor/attempt paths |

The implementation must:

1. derive the repository root from module location through the existing anchored repository-root strategy;
2. canonicalise the existing external root and repository root before comparison;
3. reject an external root equal to or nested inside the repository root;
4. reject an external root whose canonical identity cannot be established;
5. reject symlinked path components that could redirect the attempt destination;
6. accept only a conservative attempt-ID character set and one path segment;
7. resolve the attempt directory beneath the canonical external root and verify containment before every publication operation;
8. create the new attempt directory exclusively with owner-only access where the platform permits;
9. refuse every pre-existing final or temporary destination;
10. retain absolute machine-local paths only inside the human-controlled external capture context, never in committed source or repository Evidence.

The fixed final identities within the attempt directory may be:

```text
response.raw.utf8
response-capture-receipt.json
```

Temporary files must be siblings of their final destination so publication uses one filesystem.

**Authority finding:** External, no-overwrite, traversal-resistant capture is implementable without repository Evidence storage.

## 7. Response Publication Sequence

### 7.1 Measurement Statement

| “10 what?” field | Direct statement |
| --- | --- |
| Governed quantity | Completeness, durability ordering, and no-retry behavior of response publication |
| Exact unit | One response temporary file promoted once to one final response file |
| Baseline | Exclusive temporary creation, complete write, flush, close, atomic same-directory rename, directory flush where supported, then independent final re-read; each operation occurs once in order and any failure stops |
| Direct validation instrument | Injected ordered filesystem-operation recorder with one failure at each boundary, explicit short-write and zero-progress cases, operation counts, and final-state inspection |

The required sequence is:

```text
validate all pre-authorised inputs and destination
  -> Buffer.from(response, "utf8")
  -> source byteLength
  -> source SHA-256
  -> exclusive response temporary open with owner-only mode
  -> write until every source byte is written
  -> reject zero progress and incomplete total write
  -> flush response file
  -> close response file
  -> atomic same-directory rename to non-existing final response path
  -> flush containing directory where supported
  -> independently open and read final response bytes
  -> persisted byteLength and SHA-256
  -> exact source/persisted byte, length, and SHA-256 comparison
```

An unsupported required durability primitive returns `PRESERVATION_INCOMPLETE`; the implementation must not silently weaken the success claim. Close or cleanup errors cannot turn the first failure into success. Cleanup may remove only an unverified temporary file created by the same call. It must never delete or overwrite a final response.

No automatic or manual retry exists inside the helper.

**Authority finding:** The transport sequence is fixed, mechanical, and directly failure-injectable.

## 8. Mechanical Receipt

### 8.1 Measurement Statement

| “10 what?” field | Direct statement |
| --- | --- |
| Governed quantity | Mechanical provenance and verification state without response-content retention in metadata |
| Exact unit | One separately serialised, published, re-read, hash-verified, and sealed capture receipt for the same attempt |
| Baseline | Receipt contains every required mechanical field, contains no response bytes/excerpt/encoding of content, and reaches final verified identity only after response verification |
| Direct validation instrument | Exact receipt-field allowlist, recursive forbidden-field/content scan, response-substring and encoded-content checks using distinctive synthetic values, receipt publication failure injection, independent receipt re-read, and receipt byte/hash equality |

The receipt may contain only:

1. receipt schema identity and version;
2. attempt identity;
3. Authority document identity;
4. storage-contract identity;
5. encoding identity `UTF-8-NO-BOM-NO-NORMALISATION-NO-TERMINAL-NEWLINE-1`;
6. source and persisted byte lengths;
7. source and persisted SHA-256 values;
8. `verification: "EXACT_BYTE_MATCH"`;
9. capture-started, response-write-confirmed, response-re-read, response-verified, receipt-created, and receipt-sealed UTC timestamps;
10. human access owner/reviewer role;
11. bounded review purpose;
12. exact `retainUntil`;
13. closed disposition rule and `WITHHELD_PENDING_GOVERNANCE` state;
14. `delivered: false`;
15. `semanticInspectionOrTransformation: false`;
16. `repositoryPublished: false`;
17. `memoryWritten: false`;
18. `learningWritten: false`;
19. `contributionAccepted: false`.

The receipt must not contain the response, excerpt, preview, string representation, base64, hex bytes, code points, token list, semantic label, checker result, programme finding, or delivery decision. Hash and length are permitted mechanical identities, not response content.

Receipt serialization must be deterministic under one versioned fixed-field serializer. The receipt must follow its own exclusive-write, complete-write, flush, close, atomic publication, directory-flush, independent re-read, and exact byte/hash verification sequence. Receipt failure returns `PRESERVATION_INCOMPLETE`; response verification alone cannot return success.

**Authority finding:** A separately sealed content-free receipt is implementable without semantic inspection.

## 9. Success and Failure Results

### 9.1 Measurement Statement

| “10 what?” field | Direct statement |
| --- | --- |
| Governed quantity | Information and Authority carried by the helper result |
| Exact unit | One immutable success result or one immutable failure result from one capture call |
| Baseline | Failure exposes only `PRESERVATION_INCOMPLETE` plus attempt identity; success exposes only `PRESERVATION_VERIFIED` plus an opaque read-only capture reference; neither result carries response content or permission |
| Direct validation instrument | Exact public-export/type inspection, runtime own-key inspection, deep immutability tests, denied method/property checks, and callback/event-count tests |

The only statuses are:

```text
PRESERVATION_VERIFIED
PRESERVATION_INCOMPLETE
```

On failure, the helper returns an immutable value containing only:

1. `status: "PRESERVATION_INCOMPLETE"`;
2. attempt identity.

It must not throw response content through an error, include a machine path, return source/persisted bytes, expose a partial receipt, or identify semantic failure.

On success, the helper returns an immutable value containing only:

1. `status: "PRESERVATION_VERIFIED"`;
2. an opaque capture reference.

The reference may expose immutable mechanical identity and a read-only operation that returns a fresh byte copy for separately authorised checkers. It must expose no root/path, file descriptor, mutable byte buffer, write, append, rename, remove, unlink, truncate, chmod, transfer, print, preview, delivery, retry, or feedback operation.

Status and reference must not include `approved`, `accepted`, `compliant`, `deliverable`, `retryable`, `contribution`, or another permission-bearing result.

**Authority finding:** Capture status can remain opaque and non-authorising.

## 10. Checker Capability Boundary

### 10.1 Measurement Statement

| “10 what?” field | Direct statement |
| --- | --- |
| Governed quantity | Whether a subsequent checker can mutate or destroy captured response Evidence through the supplied capability |
| Exact unit | One opaque verified-capture reference handed to one synthetic checker |
| Baseline | Checker can obtain only a fresh read-only byte copy; it receives no path/root/descriptor or mutating operation, and mutating its copy leaves independently re-read final bytes unchanged |
| Direct validation instrument | Public-key/method allowlist, TypeScript denied-use checks, runtime mutation attempts, object-freeze checks, independent post-checker file re-read, and SHA-256 comparison |

The support module must not export its filesystem operations, destination builder, internal paths, publication methods, or receipt writer. Test injection seams must be callable only through the capture operation and must not be present on the returned reference.

The focused test must attempt to:

1. mutate returned bytes;
2. obtain a second read and compare it with the original persisted identity;
3. locate write, rename, delete, truncate, path, root, and descriptor capabilities on the reference;
4. alter the frozen reference and result;
5. induce a checker exception after verification and independently confirm the final response remains exact.

This implementation can prove capability closure of the supplied reference. It cannot prove static filesystem closure of a future checker that does not yet exist. Exact future checker dependencies therefore remain a mandatory integration-acceptance gate.

**Authority finding:** The helper can deny mutation capability; future checker closure remains unclaimed until integration review.

## 11. No Leakage, Delivery, or Repository Publication

### 11.1 Measurement Statement

| “10 what?” field | Direct statement |
| --- | --- |
| Governed quantity | Response-content egress outside the pre-authorised external response file |
| Exact unit | One distinctive synthetic response and every observable helper output, callback argument, receipt byte, repository change, stdout/stderr call, and UI/clipboard/delivery surface |
| Baseline | Response content appears only in the external final response bytes and ephemeral source/persisted comparison buffers; zero occurrences elsewhere |
| Direct validation instrument | Console/stdout/stderr spies, receipt scan, returned-value/error scan, repository before/after changed-file check, static denied-import/API scan, and distinctive raw/base64/hex/JSON-escaped content probes |

The implementation must contain no:

1. `console` call;
2. `process.stdout` or `process.stderr` write;
3. logger parameter or event carrying content;
4. UI, preview, clipboard, sharing, messaging, network, telemetry, analytics, or delivery import;
5. repository Evidence destination or write;
6. automatic file open/display;
7. response-content error or diagnostic;
8. callback carrying response bytes except the read-only opaque reference operation after verified capture.

The test may spy on prohibited output APIs but may not print the synthetic response itself.

**Authority finding:** Response capture can be mechanically observable without becoming output or delivery.

## 12. No Cognitive, Retrieval, Feedback, or Contribution Edge

### 12.1 Measurement Statement

| “10 what?” field | Direct statement |
| --- | --- |
| Governed quantity | Absence of a data or control edge from capture to cognitive, semantic, contribution, or retry responsibilities |
| Exact unit | Complete static import/export/callback closure of the support module and one success/failure synthetic call graph |
| Baseline | Zero edge to Andy, provider, Memory, Learning, Reflection, Knowledge, retrieval, prompt, cache, prior state, feedback, second turn, contribution acceptance, delivery, retry, or Action |
| Direct validation instrument | Static source/import/export scan, dependency inspection, exact callback counts, denied-token/API checks, and synthetic success/failure event graphs |

The module may depend only on:

1. Node filesystem, path, crypto, and platform primitives needed for mechanical preservation;
2. the existing anchored repository-root resolver for repository exclusion;
3. local private types and functions inside the same authorised support module.

It must not import or call `AndyDigitalColleague`, Academy barrels, providers, repository services, Memory, Learning, Reflection, Knowledge, retrieval, prompts, network clients, UI libraries, delivery services, or contribution governance.

No status, receipt, hash, reference, failure, or checker result may flow back to Andy or a provider. No branch may request a second response or create retry, correction-turn, feedback, contribution, delivery, or Action permission.

**Authority finding:** Mechanical capture requires no cognitive or semantic owner.

## 13. Post-Invocation Ordering

### 13.1 Measurement Statement

| “10 what?” field | Direct statement |
| --- | --- |
| Governed quantity | Whether post-response work can begin before preservation is verified |
| Exact unit | One future harness transition from the single invocation return to one verified capture result and then to the first checker |
| Baseline | The capture call is the first operation after obtaining `result`; no response assertion, provenance checker, consequence checker, logger, marker, stdout, preview, output, or process-exit assertion runs before `PRESERVATION_VERIFIED`; failure stops all later operations |
| Direct validation instrument | Synthetic ordered-event test now; later exact harness source inspection and focused harness-order test before any experiment Authority can be considered |

The focused test must model:

```text
synthetic invocation returns fictional response
  -> capture begins
  -> response and receipt verification complete
  -> PRESERVATION_VERIFIED reference exists
  -> synthetic checker begins
```

For every injected capture failure, checker call count must remain zero. For success, the first checker event must occur strictly after receipt verification and result creation.

The synthetic model proves the required sequence is implementable and that the helper does not return success early. It does not prove a future harness insertion that does not yet exist.

The existing `scripts/academy/run-academy.ts` is explicitly prohibited as the integration file. No current file is authorised for integration by this record.

**Authority finding:** Ordering is directly falsifiable now and remains a future execution blocker until an exact harness insertion is separately accepted.

## 14. Authority and Stop Semantics

### 14.1 Measurement Statement

| “10 what?” field | Direct statement |
| --- | --- |
| Governed quantity | Whether capture status changes implementation, contribution, delivery, retry, or execution Authority |
| Exact unit | One implementation task and one synthetic capture outcome |
| Baseline | Implementation Authority is consumed once on first authorised code edit; capture success/failure grants no other Authority; no retry occurs; future execution remains blocked |
| Direct validation instrument | Changed-file chronology in later implementation Evidence, result/API inspection, synthetic call counts, and independent acceptance review |

This implementation Authority is consumed by the first edit or creation of either authorised code file in Section 16. Pre-edit read-only inspection does not consume it. This documentation-only review does not consume it.

After consumption:

1. it cannot widen to another source, test, harness, package, dependency, or configuration file;
2. it cannot be reset by test failure, capture failure, missing harness, or implementation difficulty;
3. it grants no Andy invocation, provider construction, response generation, contribution, delivery, disposition, retry, second turn, feedback, or Action;
4. it does not revive or alter the consumed historical contribution Authority;
5. it authorises no future experiment until helper acceptance and exact harness-integration Authority both exist.

A synthetic `PRESERVATION_INCOMPLETE` result stops that synthetic scenario with zero checker, retry, second-turn, feedback, or delivery calls. A future real capture failure must leave the future contribution Authority consumed and expired under that contribution Authority's own consumption rule; this implementation record cannot define or alter that future event.

**Authority finding:** Implementation and capture outcomes remain non-transitive and non-renewing.

## 15. Existing Helper and Dependency Decision

### 15.1 Measurement Statement

| “10 what?” field | Direct statement |
| --- | --- |
| Governed quantity | Direct semantic and mechanical suitability of an existing accepted helper |
| Exact unit | Existing Case 001 preservation contract compared with this raw-response contract |
| Baseline | Same input unit, encoding, identities, destination class, receipt, access/retention fields, result/reference capability, and pre-checker integration role |
| Direct validation instrument | Direct source and focused-test contract inspection, not shared terminology or similar filesystem calls |

The Case 001 implementation does provide a proven mechanical pattern for exclusive temporary creation, write-all behavior, flush, close, same-directory rename, directory flush, re-read, hashes, receipt verification, no overwrite, symlink refusal, and fail-closed status.

It cannot be reused directly because it accepts and canonically JSON-serialises `Case001CampaignEvidence`, publishes under a Case 001 governed repository path, carries Case 001 campaign/Authority/receipt identities, and returns a Case 001 status rather than a response-specific opaque reference with human owner, purpose, retention, and disposition boundaries.

Modifying or generalising Case 001 would widen its accepted contract and affect a settled evidence path. Duplication of the small mechanical pattern inside an experimental support module is smaller and semantically correct here because destination governance, raw-byte identity, receipt fields, and public capability differ.

No package, schema, service, production component, provider, or semantic dependency is required. The absent future harness prevents integration and execution, not support implementation.

**Outcome finding:** Outcome 2 is rejected. Outcome 3 is rejected for the bounded support implementation, while exact-path harness integration remains separately blocked.

## 16. Exact Allowed Files

### 16.1 Measurement Statement

| “10 what?” field | Direct statement |
| --- | --- |
| Governed quantity | Filesystem scope of implementation Authority |
| Exact unit | Two exact new TypeScript files |
| Baseline | Only the two named files may be created or edited; every existing source/test file and every unnamed path remains unchanged |
| Direct validation instrument | Pre-edit and post-edit file existence, hashes, `git status --short`, exact path allowlist comparison, and focused diff review |

Authority permits only:

1. add `scripts/academy/support/responseEvidenceCapture.ts`;
2. add `scripts/academy/support/__tests__/responseEvidenceCapture.test.ts`.

Both files are absent at this review. If either path exists or has an unreviewed change before implementation begins, stop and return to Authority review.

No future harness file is named as allowed because no eligible exact file exists. A provisional or invented path would not satisfy exact-file Authority. The later integration review may permit only:

1. one import from the accepted support module;
2. one capture call immediately after the sole Andy invocation returns;
3. one fail-closed status gate before every assertion, checker, logger, marker, stdout, preview, or output operation.

It may not permit harness creation, request/provider changes, extra invocation logic, response reconstruction, delivery, retry, or checker correction without separate exact Authority.

**Authority finding:** The current implementation surface is exactly two new files; future harness integration is withheld.

## 17. Exact Prohibited Surfaces

No Authority is granted to create, edit, delete, rename, format, regenerate, or generalise:

1. `lib/academy/AndyDigitalColleague.ts` or any Andy file;
2. any provider, repository service, retrieval, prompt, Memory, Learning, Reflection, Knowledge, Judgement, Authority, Action, UI, clipboard, sharing, logging, network, or delivery file;
3. `scripts/academy/run-academy.ts` or any existing Academy runner;
4. any future experiment harness;
5. Case 001 source, tests, receipts, evidence, contracts, paths, or generated artefacts;
6. repository-root support code;
7. `package.json`, lockfiles, TypeScript/Jest/ESLint configuration, dependencies, schemas, environment files, generated indexes, or repository Evidence paths;
8. existing tests;
9. any response, request, provider, real input unit, contribution, programme record, frozen Evidence, or historical record;
10. a deletion/disposition implementation.

No implementation may occur outside the harness-support/test boundary. No dependency may be added. If any prohibited surface appears necessary, implementation stops before that edit.

## 18. Minimum Focused Synthetic Falsifiers

### 18.1 Measurement Statement

| “10 what?” field | Direct statement |
| --- | --- |
| Governed quantity | Direct falsification coverage of the complete capture architecture |
| Exact unit | One focused synthetic Jest suite using fictional response strings and a temporary external test root outside the repository |
| Baseline | Every listed counterexample produces the exact required success/refusal, operation order, capability closure, or absence finding without Andy/provider invocation or repository publication |
| Direct validation instrument | Named focused tests with injected operations, exact event arrays/call counts, byte/hash assertions, static source checks, and after-each external test cleanup |

The focused suite must directly falsify at least:

1. exact `Buffer.from(response, "utf8")` bytes and `byteLength` are retained;
2. altered byte, prefix, suffix, substitution, truncation, appended newline, BOM, and normalisation are refused;
3. decomposed and composed Unicode remain byte-distinct and neither is normalised;
4. source SHA-256 occurs before the first persistence operation;
5. write, flush, close, rename, directory-flush, re-read, persisted-hash, receipt-create, receipt-serialize, receipt-write, receipt-flush, receipt-close, receipt-rename, receipt-re-read, receipt-hash, and receipt-seal failures return `PRESERVATION_INCOMPLETE`;
6. short write and zero-progress write stop without retry;
7. operation order is exact and each failing boundary is attempted once, except bounded cleanup close where necessary;
8. existing attempt, final response, response temporary, final receipt, and receipt temporary destinations are refused without modification;
9. repository root and repository-descendant capture roots are refused;
10. traversal, separator-bearing/absolute attempt identity, symlinked root, symlinked ancestor, symlinked attempt path, and escape after resolution are refused;
11. response and receipt are independently re-read and require exact byte, length, and SHA-256 equality;
12. receipt has the exact allowlisted fields and no response content, excerpt, raw/base64/hex/JSON-escaped representation, semantic finding, or checker result;
13. success returns only `PRESERVATION_VERIFIED` plus an immutable opaque reference;
14. failure returns only `PRESERVATION_INCOMPLETE` plus attempt identity;
15. reference/result objects are immutable and byte reads return fresh copies;
16. checker mutation of a returned byte copy leaves final response bytes and hash unchanged;
17. reference exposes no path/root/descriptor/write/append/rename/delete/unlink/truncate/chmod/transfer/preview/delivery/retry capability;
18. checker exception after verification leaves response and receipt available and exact;
19. distinctive response content reaches no stdout, stderr, console, logger, receipt, error/result, repository file, UI, clipboard, network, telemetry, or delivery surface;
20. support source has no import or edge to Andy, provider, Memory, Learning, Reflection, Knowledge, retrieval, prompt, feedback, contribution, retry, second-turn, or delivery code;
21. missing/empty access owner and review purpose are refused before byte encoding or I/O;
22. missing, invalid, non-future, or malformed `retainUntil` is refused before byte encoding or I/O;
23. missing/unsupported disposition rule, attempt identity, Authority identity, or external root is refused before byte encoding or I/O;
24. a synthetic checker runs only after response verification, receipt verification, sealing, and `PRESERVATION_VERIFIED` result creation;
25. every synthetic capture failure leaves checker call count zero;
26. success and failure both leave retry, second-turn, feedback, contribution, and delivery call counts zero;
27. no test invokes Andy, constructs a provider, reads real programme input, reconstructs a response, or writes repository Evidence;
28. Case 001 code is imported by neither implementation nor test.

Test cleanup may delete only the suite's own synthetic external temporary root after assertions. That test-only cleanup is not a response disposition capability and must never be exported by the support module.

No assertion may be weakened, skipped, snapshot-updated, or rewritten merely to bless observed behavior.

**Authority finding:** Every requested architecture risk has a direct synthetic falsifier or static closure instrument.

## 19. Required Validation Order

### 19.1 Measurement Statement

| “10 what?” field | Direct statement |
| --- | --- |
| Governed quantity | Implementation conformance Evidence produced without execution widening |
| Exact unit | One ordered validation sequence over the two authorised files and unchanged Case 001 precedent |
| Baseline | Focused falsifiers pass before broader static checks; no Andy/provider/contribution path runs; exact file boundary remains closed |
| Direct validation instrument | Exact commands, exit statuses, output, diagnostics, hashes, and changed-file comparison recorded by the later implementation task |

After the complete test boundary and support implementation are authored, run in this order:

```text
npm test -- --runInBand scripts/academy/support/__tests__/responseEvidenceCapture.test.ts
```

If and only if focused tests pass, run the unchanged mechanical-precedent regression:

```text
npm test -- --runInBand platform/cos/understanding-formation/__tests__/multi-evidence-case-001-preservation.test.ts
```

Then:

```text
npm run typecheck
npx eslint scripts/academy/support/responseEvidenceCapture.ts scripts/academy/support/__tests__/responseEvidenceCapture.test.ts
```

Then perform:

1. editor diagnostics on both authorised files;
2. `git diff --check` limited to both authorised files;
3. exact changed-file allowlist comparison against the pre-edit worktree;
4. static import/export and denied-capability inspection;
5. focused diff review against Sections 4-18;
6. confirmation that no Andy/provider/contribution command was run and no repository Evidence file was created.

The Case 001 regression may execute only its existing synthetic suite. Case 001 source/tests may not be edited, generalised, imported, or used as response implementation.

Passing validation proves only the exercised implementation behavior. It does not prove future harness ordering, checker dependency closure, real response capture, delivery safety, secure deletion, or execution readiness.

## 20. Failure, Correction, and Stop Rules

### 20.1 Measurement Statement

| “10 what?” field | Direct statement |
| --- | --- |
| Governed quantity | Bounded implementation response to a failed validation or discovered dependency |
| Exact unit | One first focused validation result and at most one directly evidenced local correction within the two authorised files |
| Baseline | Historical failure preserved; no scope/test weakening; one local correction and one exact focused rerun maximum; second failure or widened dependency stops |
| Direct validation instrument | Command transcript, pre/post diff, correction mapping to the exact failed assertion, rerun count, and changed-file boundary check |

The first focused result must be preserved accurately. If it fails:

1. one correction may be made only in the two authorised files;
2. the correction must address only the directly evidenced local defect;
3. no test may be deleted, weakened, skipped, inverted, broadened into a non-diagnostic assertion, or changed to bless the defect;
4. the exact focused command may be rerun once;
5. a second focused failure stops implementation;
6. no adjacent regression, typecheck, lint, integration, or broader test runs after a stopping failure.

Implementation stops immediately on:

1. need for a third code/test/configuration file;
2. need to edit an existing file;
3. need for a package, dependency, schema, environment variable, service, daemon, or repository Evidence path;
4. inability to prove external-root confinement, same-filesystem atomic publication, exact re-read identity, content-free receipt, or checker capability closure;
5. need to weaken required durability, failure, or no-retry behavior;
6. response content appearing outside the external response file and ephemeral comparison buffers;
7. a Memory, Learning, Reflection, Knowledge, retrieval, feedback, contribution, delivery, retry, second-turn, or Andy/provider edge;
8. ambiguity about retention, access ownership, purpose, disposition, receipt content, or public API;
9. any attempt to integrate a harness under this Authority;
10. any mismatch between this review and the controlling architecture.

A stop leaves implementation Authority consumed and exhausted for further correction. It grants no rollback of historical Evidence and no future execution permission.

## 21. Independent Acceptance and Future Integration Gates

### 21.1 Measurement Statement

| “10 what?” field | Direct statement |
| --- | --- |
| Governed quantity | Whether implemented source conforms and may later enter one experimental harness |
| Exact unit | One complete two-file implementation Evidence set, followed by one independent read-only acceptance and one separate exact-path integration Authority |
| Baseline | All authorised falsifiers and boundaries pass; implementation does not accept itself; no integration or experiment occurs automatically |
| Direct validation instrument | Independent source/test inspection, reproduced focused validation, exact changed-file proof, then later exact harness diff and ordering test |

After implementation validation, a separate read-only implementation acceptance review must verify:

1. exact Authority-consumption chronology;
2. two-file boundary conformity;
3. every Section 18 falsifier;
4. raw byte and receipt contracts;
5. external-root and path safety;
6. failure injection and no retry;
7. opaque reference capability closure;
8. no leakage, cognitive edge, repository publication, or permission creation;
9. unchanged Case 001 implementation and tests;
10. limitations and unproven future integration facts.

Only after that acceptance may a separate documentation-only continuation review inspect an existing future experimental harness and decide whether one exact insertion can be authorised. That review must bind:

1. exact harness path and pre-integration SHA-256;
2. exactly one Andy invocation and its controlling future contribution Authority;
3. the precise return line and first post-response operation;
4. the capture call as the immediate next operation;
5. all later assertions, checkers, loggers, markers, stdout, previews, and outputs;
6. fail-closed stop on `PRESERVATION_INCOMPLETE`;
7. checker static dependency/capability closure;
8. no provider/request/response/delivery/retry change;
9. focused synthetic harness-order Evidence before any real invocation;
10. its own consumption and stop rule.

Neither implementation acceptance nor integration acceptance grants experiment or contribution Authority.

**Authority finding:** Implementation, acceptance, integration, and execution remain separate governed decisions.

## 22. Combined Outcome and Exact Authority

### 22.1 Measurement Statement

| “10 what?” field | Direct statement |
| --- | --- |
| Governed quantity | Final implementation Authority disposition |
| Exact unit | One bounded two-file harness-support implementation and its focused synthetic Evidence |
| Baseline | Outcome 1 only if all responsibilities are mechanically owned, every risk is directly falsifiable, no existing helper matches, and no dependency blocks the two-file implementation |
| Direct validation instrument | Combined findings from Sections 4-21 and exact source-contract comparison with Case 001 |

Outcome 2 is rejected because no existing accepted helper preserves the same raw response unit under the same external storage, receipt, retention, access, and opaque-reference contract.

Outcome 3 is rejected for support implementation because no unresolved semantic, package, storage, provider, or production dependency is required. The absent exact future harness remains a later integration and execution blocker, not a reason to invent a file or withhold the independently testable mechanical boundary.

**Selected outcome: Outcome 1 - one bounded two-file harness-support implementation may be authorised.**

**Authority granted, currently unconsumed:**

1. create only the two files in Section 16;
2. implement only the contracts in Sections 4-14;
3. create only the focused synthetic falsifiers in Section 18;
4. run only the validation sequence in Section 19;
5. use at most the single correction cycle in Section 20.

**Authority explicitly withheld:**

1. every file and behavior in Section 17;
2. all current and future harness integration;
3. Andy/provider/request/response/contribution invocation;
4. real response capture or storage;
5. implementation acceptance, future integration, experiment execution, contribution, delivery, disposition, retry, correction turn, feedback, or Action;
6. any conclusion that successful capture means compliant, accepted, deliverable, reusable, or learned.

Authority is consumed on the first creation or edit of either exact Section 16 file. No code edit occurs in this review.

## 23. Explicit Non-Consequences

This review does not:

1. create or edit implementation, test, harness, configuration, package, storage, Evidence, or generated-index files;
2. invoke Andy, create a provider, reconstruct a response, rerun a contribution, or access real governed input;
3. alter `snippetsRetained=false`, the historical response-unavailable finding, or any consumed/expired Authority;
4. implement or authorise repository Evidence storage;
5. create Memory, Learning, Reflection, Knowledge, retrieval, feedback, contribution acceptance, programme truth, delivery, retry, second turn, or Action;
6. accept a future implementation or prove any runtime behavior;
7. authorise `scripts/academy/run-academy.ts` or invent a future harness path;
8. modify, generalise, import, or adopt Case 001 code;
9. authorise real retention, transfer, deletion, secure erasure, or delivery;
10. grant execution, experiment, contribution, capture, review-access, or deployment Authority.

## 24. Stop State

```text
OUTCOME 1 - TWO-FILE RESPONSE EVIDENCE-CAPTURE HARNESS-SUPPORT IMPLEMENTATION AUTHORISED AND UNCONSUMED - EXACT UNIT IS ONE COMPLETE RAW UTF-8 RESPONSE BYTE SEQUENCE FROM Buffer.from(result.answer, "utf8") - EXTERNAL HUMAN-CONTROLLED NON-REPOSITORY CAPTURE ONLY - SOURCE HASH BEFORE PERSISTENCE - EXCLUSIVE ATOMIC NO-OVERWRITE PUBLICATION - INDEPENDENT BYTE LENGTH AND HASH VERIFICATION - CONTENT-FREE SEALED RECEIPT - OPAQUE READ-ONLY CHECKER REFERENCE - NO CHECKER MUTATION CAPABILITY - NO STDOUT PREVIEW UI CLIPBOARD REPOSITORY DELIVERY MEMORY LEARNING REFLECTION KNOWLEDGE RETRIEVAL FEEDBACK CONTRIBUTION OR RETRY EDGE - FUTURE HARNESS INTEGRATION WITHHELD PENDING EXACT-PATH CONTINUATION AUTHORITY - HISTORICAL ATTEMPT UNCHANGED - NO IMPLEMENTATION PERFORMED - NO AUTHORITY CONSUMED - NO EXECUTION AUTHORISED
```

Implementation Authority review stops here.