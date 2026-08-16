# HH-0000 Check 5 Canonical Policy Unresolved Decisions Review

**Status:** OUTCOME 1 - ALL NINE POLICY DECISIONS SETTLED - NO CORRECTION, IMPLEMENTATION, OR EXECUTION AUTHORITY
**Review date:** 2026-08-14
**Review type:** Strictly documentation-only prospective governance decision
**Controlling defect review:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_CANDIDATE_POLICY_DEFECT_RESPONSIBILITY_AND_CORRECTION_AUTHORITY_REVIEW.md`
**Historical candidate canonical byte length:** `6350`
**Historical candidate canonical SHA-256:** `ff71059e5fbad04831bf8cbc6d408b44b265d8657446a1fe8c2b0c8e8d972186`
**Historical candidate state:** `HISTORICAL CANDIDATE POLICY EVIDENCE` - not frozen, corrected, or final
**Governed implementation-source access:** None
**Candidate effect:** None - no existing specification or payload was edited
**Instrument effect:** None - no instrument was built, inspected, modified, executed, or readiness-tested
**Check 5:** Not run; governed quantity remains `UNMEASURED`
**Check 6:** `NOT RUN`
**Implementation:** `UNACCEPTED`
**Authority effect:** No candidate-correction, instrument-implementation, Check 5 execution, Check 6, or acceptance Authority granted

# Repository Traceability

**Principle:** Truth before certainty; evidence before claims; human Authority; minimum necessary capability.
**Theory:** The measuring policy defines correctness before observing the measured implementation. Prospective governance choices are not implementation observations.
**Architecture:** Self-contained canonical data, exact two-source identity, minimal public capability, declarative total AST classification, verified transport, portable launch binding, one-use execution, and mandatory stop.
**Engineering:** Nine explicit policy decisions, exact machine forms, direct falsifiers, cross-decision consistency, and separated correction/execution gates.
**Milestone:** Not Applicable.
**Evidence:** Documentation-only prospective policy decision. No corrected payload, implementation observation, instrument, Check 5, Check 6, or acceptance Evidence is produced.

## 1. Sole Governance Question

> Can all nine unresolved policy areas receive one exact, smallest, machine-encodable prospective answer without observing the governed implementation or creating a hidden prose dependency?

Yes. Each decision below fixes one normative answer and its direct falsifiers. The combined model remains deterministic data rather than executable policy code.

**Selected outcome: Outcome 1 - all nine decisions settled.**

This outcome does not correct the historical candidate and grants no correction or execution Authority. It establishes only that a fresh Candidate Policy Correction Authority Review may now be considered.

## 2. Strict Review Boundary

This review used only architecture, governance, and preserved documentation/Evidence. It did not:

1. inspect, open, read, hash, parse, or otherwise access either governed implementation source;
2. infer a rule from what the current implementation may do;
3. amend, replace, relabel, freeze, or correct the historical 6,350-byte candidate;
4. create a corrected candidate or canonical payload;
5. build, modify, inspect, execute, or readiness-test a measurement instrument;
6. reuse or modify the readiness-only instrument;
7. run Check 5 or Check 6;
8. perform implementation acceptance;
9. grant instrument implementation or execution Authority.

Only this review record is created.

## 3. Historical Candidate Preservation

The exact historical candidate identity remains:

```text
canonicalByteLength=6350
canonicalSha256=ff71059e5fbad04831bf8cbc6d408b44b265d8657446a1fe8c2b0c8e8d972186
classification=HISTORICAL_CANDIDATE_POLICY_EVIDENCE
frozen=false
corrected=false
final=false
```

No decision below changes that identity. Every future corrected candidate must use a new schema and a new canonical identity.

## 4. Decision CPD-D1 - Public API Policy

### 4.1 Decision Method

| Required field | Decision |
| --- | --- |
| Decision ID | `CPD-D1` |
| Governed quantity | Exact minimum public declaration/member/type capability permitted for response Evidence capture |
| Existing settled constraints | Five public names; two disposition literals; two statuses; ordinary mutable option properties; immutable outcomes/reference; success exposes only status plus opaque reference; failure exposes only status plus attempt identity; fresh-copy read only; no path/root/descriptor/mutation/lifecycle/delivery/semantic/retry capability |
| Genuine choice | Exact member names, normalized types, declaration mutability, and branch shapes |
| Options considered | Candidate's all-readonly declarations; minimal mutable options with readonly result/reference; adding path/receipt/lifecycle members |
| Selected policy | Required mutable option declarations; required readonly result/reference declarations; exact closed members below; no additional public member |
| Why selected | Preserves mutable-property Evidence, separates TypeScript declaration mutability from runtime pre-authorisation, and exposes only the mechanical identity/read capability needed by a checker |
| Permits | One complete immutable-at-call-boundary request; one verified mechanical reference; one minimal failure identity |
| Prohibits | Defaults, optional public inputs, extra members, path/root/descriptor, receipt exposure, retained mutable bytes, lifecycle, delivery, semantic finding, permission, retry |
| Future payload effect | Replaces unauthorised/contradicted public shapes with one exact normalized allowlist |
| Prospective statement | This is prospective policy, not an observation of the governed implementation |

### 4.2 Exact Machine-Encodable Form

```json
{
  "options": {
    "declarationKind": "interface",
    "additionalMembers": false,
    "members": [
      { "name": "response", "type": { "kind": "keyword", "name": "string" }, "required": true, "readonly": false },
      { "name": "attemptId", "type": { "kind": "keyword", "name": "string" }, "required": true, "readonly": false },
      { "name": "authorityDocumentId", "type": { "kind": "keyword", "name": "string" }, "required": true, "readonly": false },
      { "name": "externalCaptureRoot", "type": { "kind": "keyword", "name": "string" }, "required": true, "readonly": false },
      { "name": "accessOwner", "type": { "kind": "keyword", "name": "string" }, "required": true, "readonly": false },
      { "name": "reviewPurpose", "type": { "kind": "keyword", "name": "string" }, "required": true, "readonly": false },
      { "name": "retainUntil", "type": { "kind": "keyword", "name": "string" }, "required": true, "readonly": false },
      { "name": "dispositionRule", "type": { "kind": "named", "name": "ResponseCaptureDispositionRule" }, "required": true, "readonly": false },
      { "name": "now", "type": { "kind": "function", "parameters": [], "returns": { "kind": "named", "name": "Date" } }, "required": true, "readonly": false }
    ]
  },
  "reference": {
    "declarationKind": "interface",
    "additionalMembers": false,
    "members": [
      { "name": "attemptId", "type": { "kind": "keyword", "name": "string" }, "required": true, "readonly": true },
      { "name": "byteLength", "type": { "kind": "keyword", "name": "number" }, "required": true, "readonly": true },
      { "name": "sha256", "type": { "kind": "keyword", "name": "string" }, "required": true, "readonly": true },
      { "name": "readBytes", "type": { "kind": "function", "parameters": [], "returns": { "kind": "named", "name": "Uint8Array" } }, "required": true, "readonly": true }
    ]
  },
  "outcome": {
    "declarationKind": "typeAlias",
    "unionOrder": ["PRESERVATION_VERIFIED", "PRESERVATION_INCOMPLETE"],
    "variants": [
      {
        "status": "PRESERVATION_VERIFIED",
        "additionalMembers": false,
        "members": [
          { "name": "status", "type": { "kind": "stringLiteral", "value": "PRESERVATION_VERIFIED" }, "required": true, "readonly": true },
          { "name": "reference", "type": { "kind": "named", "name": "VerifiedResponseCaptureReference" }, "required": true, "readonly": true }
        ]
      },
      {
        "status": "PRESERVATION_INCOMPLETE",
        "additionalMembers": false,
        "members": [
          { "name": "status", "type": { "kind": "stringLiteral", "value": "PRESERVATION_INCOMPLETE" }, "required": true, "readonly": true },
          { "name": "attemptId", "type": { "kind": "keyword", "name": "string" }, "required": true, "readonly": true }
        ]
      }
    ]
  }
}
```

`ResponseCaptureDispositionRule` remains exactly the two settled string literals. Index, call, construct, getter, setter, and additional signatures are prohibited on all three public data types. Runtime values for both outcome variants and the reference must be deeply frozen; option declaration mutability does not authorise mutation after capture begins.

### 4.3 Direct Falsifiers

1. Remove, add, rename, reorder, optionalize, or change the normalized type of any member: FAIL.
2. Set any option member `readonly=true`: FAIL against preserved mutable-property policy.
3. Set any outcome/reference member `readonly=false` or expose a non-fresh byte value: FAIL.
4. Add path, root, descriptor, receipt, write, delete, delivery, semantic, permission, or retry member: FAIL.
5. Return the same mutable byte object from two `readBytes` calls: FAIL.

## 5. Decision CPD-D2 - Public Function and Private Test Seam

### 5.1 Decision Method

| Required field | Decision |
| --- | --- |
| Decision ID | `CPD-D2` |
| Governed quantity | Exact declaration cardinality and reachability of `preserveResponseEvidence` and its synthetic mechanical seam |
| Existing settled constraints | One public function name; Check 4 recorded two exported function declarations; external API is one capture request; focused falsifiers require a narrow injected mechanical boundary; seam must not be exported, retained, or returned |
| Genuine choice | Option A, no seam, or Option B, one hidden optional seam |
| Options considered | A; B with optional parameter; B with defaulted parameter; public dependency object |
| Selected policy | **B:** one externally callable one-parameter overload and one implementation declaration with exactly one optional private `operations` parameter |
| Why selected | Preserves the settled direct failure-injection requirement without adding public capability; optional is simpler than a default expression and leaves production adapter selection private |
| Permits | One non-exported mechanical adapter implementing only the closed operation IDs in Decision 4 |
| Prohibits | Public two-argument call, exported seam type, arbitrary callbacks, semantic services, retention, return, reference attachment, third parameter, third declaration |
| Future payload effect | Encodes overload and implementation declarations separately instead of one ambiguous function shape |
| Prospective statement | This is prospective policy, not an observation of the governed implementation |

### 5.2 Exact Machine-Encodable Form

```json
{
  "name": "preserveResponseEvidence",
  "exportedDeclarationCount": 2,
  "uniquePublicNameCount": 1,
  "declarations": [
    {
      "role": "PUBLIC_OVERLOAD",
      "parameters": [
        { "name": "options", "type": { "kind": "named", "name": "CaptureResponseEvidenceOptions" }, "required": true }
      ],
      "returnType": { "kind": "named", "name": "ResponseCaptureOutcome" },
      "body": false
    },
    {
      "role": "IMPLEMENTATION",
      "parameters": [
        { "name": "options", "type": { "kind": "named", "name": "CaptureResponseEvidenceOptions" }, "required": true },
        { "name": "operations", "type": { "kind": "named", "name": "ResponseCaptureMechanicalOperations" }, "required": false, "defaulted": false }
      ],
      "returnType": { "kind": "named", "name": "ResponseCaptureOutcome" },
      "body": true
    }
  ],
  "privateSeam": {
    "typeName": "ResponseCaptureMechanicalOperations",
    "exported": false,
    "reachableFromPublicOverload": false,
    "retained": false,
    "returned": false,
    "attachedToOutcomeOrReference": false,
    "operationIds": [
      "SHA256", "REPOSITORY_ROOT", "REALPATH", "LSTAT", "STAT", "EXISTS",
      "MKDIR", "OPEN", "WRITE", "FSYNC", "CLOSE", "RENAME", "READ_FILE", "REMOVE"
    ]
  }
}
```

The private seam's complete member set is one member per listed operation ID, with lower-camel names derived deterministically from the ID (`sha256`, `repositoryRoot`, `realpath`, and so on). Its normalized function types are fixed by Decision 4's operation signatures. No generic, index signature, nested capability object, or additional member is permitted.

### 5.3 Direct Falsifiers

1. Public overload accepts two arguments or exposes the seam type: FAIL.
2. Missing/extra declaration, parameter, operation ID, or seam member: FAIL.
3. Defaulted rather than optional `operations`, arbitrary callback, generic, or index signature: FAIL.
4. Seam value stored outside the call, returned, captured by a surviving closure, or attached to public data: FAIL.
5. Any seam operation not classified by Decision 4: FAIL.

## 6. Decision CPD-D3 - Structural Policy Language

### 6.1 Decision Method

| Required field | Decision |
| --- | --- |
| Decision ID | `CPD-D3` |
| Governed quantity | Deterministic data language for matching one normalized AST record to policy rules |
| Existing settled constraints | Structural rather than textual classification; role/provenance/ancestry preserved; unknown and overlap fail; policy must remain data |
| Genuine choice | Arbitrary code, regex/token rules, query language, or small declarative predicate algebra |
| Options considered | JavaScript predicate code; regex selectors; JSON logic; closed conjunction-only JSON predicates |
| Selected policy | Versioned conjunction-only JSON predicate records with exact enums, exact strings, finite set membership, and explicit provenance/data-flow labels |
| Why selected | Smallest semantics, deterministic evaluation, no executable policy, no regex ambiguity, and direct schema validation |
| Permits | Exact equality, finite `oneOf`, required ancestry, forbidden ancestry, exact argument/destination/data-flow constraints |
| Prohibits | Regex, glob, arbitrary expression, negated open world, user code, dynamic property resolution, implicit defaults, unknown keys/operators |
| Future payload effect | Adds complete rule schema and evaluation semantics inside the canonical payload |
| Prospective statement | This is prospective policy, not an observation of the governed implementation |

### 6.2 Exact Predicate Form

Every rule is exactly:

```json
{
  "id": "UNIQUE_ASCII_RULE_ID",
  "phase": "PROHIBITED_OR_TERMINAL",
  "sourceRoles": ["PRODUCTION_OR_FOCUSED_TEST"],
  "nodeKinds": ["CALL_OR_NEW_OR_PROPERTY_READ_OR_PROPERTY_WRITE_OR_IMPORT_OR_PUBLIC_OR_LITERAL"],
  "subject": {
    "provenanceKinds": ["IMPORT_BINDING_OR_LOCAL_DECLARATION_OR_PARAMETER_OR_BUILTIN_OR_PUBLIC_VALUE_OR_SYNTHETIC_FIXTURE"],
    "root": "EXACT_NORMALIZED_ROOT_OR_NULL",
    "operation": "EXACT_NORMALIZED_OPERATION_OR_NULL"
  },
  "arguments": [
    { "index": 0, "provenanceKinds": ["FINITE_ENUM"], "dataLabels": ["FINITE_ENUM"] }
  ],
  "destinationLabels": ["FINITE_ENUM"],
  "dataFlows": ["FINITE_ENUM"],
  "ancestry": {
    "all": ["FINITE_ANCESTRY_RELATION"],
    "none": ["FINITE_ANCESTRY_RELATION"]
  },
  "classification": "EXACT_TERMINAL_OR_PROHIBITED_CLASS"
}
```

Evaluation semantics:

1. absent optional arrays mean no constraint; empty arrays are invalid policy;
2. every present field is conjunctive;
3. array values are exact finite alternatives;
4. strings are case-sensitive NFC JSON strings;
5. rule and enum order has no matching significance;
6. all prohibited rules and all terminal rules are evaluated;
7. unknown field/operator/value invalidates the policy before source access;
8. no first-match semantics exist.

### 6.3 Direct Falsifiers

1. Add regex, executable code, unknown key/operator, empty selector, or implicit default: policy validation FAIL.
2. Reorder object keys or rule arrays: canonical serialization changes only where array order is normative; evaluation result remains equal.
3. Remove role, node kind, provenance, or classification from a rule: schema FAIL.
4. Supply unresolved receiver/callee/constructor provenance: record becomes unknown and Check 5 FAIL.

## 7. Decision CPD-D4 - Permitted Operational Edges

### 7.1 Decision Method

| Required field | Decision |
| --- | --- |
| Decision ID | `CPD-D4` |
| Governed quantity | Closed ordinary executable capability needed for mechanical preservation and focused falsification |
| Existing settled constraints | Node crypto/fs/path/root resolver only; external preservation boundary; exact bytes/hash; deterministic receipt; no semantic/cognitive/output/delivery edge |
| Genuine choice | Exact operation identities and provenance/purpose restrictions |
| Options considered | Method-name allowlist; broad imported-module permission; closed operation IDs with receiver, argument, destination, and purpose labels |
| Selected policy | Closed operation-ID catalogue below, each represented by Decision 3 predicates and constrained by provenance and data labels |
| Why selected | Grants only operations necessary for the settled mechanical sequence; a matching name without provenance/purpose cannot pass |
| Permits | Hashing, path/root confinement, exact external publication, local deterministic data, validation, private helpers, Jest/synthetic fixtures |
| Prohibits | Unknown operation, broad module capability, arbitrary write/read/delete, response transformation, semantic callback, unbounded collection/code execution |
| Future payload effect | Replaces class labels with complete rule records and operation signatures |
| Prospective statement | This is prospective policy, not an observation of the governed implementation |

### 7.2 Closed Operation Catalogue

| Class | Exact operations | Required provenance and purpose |
| --- | --- | --- |
| `CRYPTO_IDENTITY` | `createHash:sha256`, hash `update`, hash `digest:hex` | Root is `node:crypto/createHash`; input label is source, persisted, receipt, policy, instrument, or capture bytes; output is mechanical identity only |
| `FILESYSTEM_IDENTITY` | `realpathSync`, `lstatSync`, `statSync`, `existsSync` | Root is private seam or `node:fs`; path label is repository precondition, external root, attempt path, or suite-owned test root; no content egress |
| `FILESYSTEM_PUBLICATION` | `mkdirSync`, `openSync`, `writeSync`, `fsyncSync`, `closeSync`, `renameSync`, `readFileSync` | Destination is `ATTEMPT_TEMP_RESPONSE`, `ATTEMPT_FINAL_RESPONSE`, `ATTEMPT_TEMP_RECEIPT`, or `ATTEMPT_FINAL_RECEIPT`; open creation uses exclusive owner-only mode; rename is same-directory temp-to-corresponding-final; read is independent final reread |
| `FILESYSTEM_BOUNDED_REMOVE` | `rmSync` | Only same-call unverified temporary/empty attempt path after failure, or focused-test suite root during final cleanup; never final response/receipt, token, repository, or governed source |
| `PATH_CONFINEMENT` | `resolve`, `join`, `relative`, `dirname`, `basename`, `isAbsolute`, `sep` read | Root is `node:path`; operands are path labels; result only validates containment/sibling publication and never enters public output |
| `REPOSITORY_ROOT_EXCLUSION` | `resolveRepositoryRootFromDirectory` | Exact allowlisted imported binding; used only to derive repository root for exclusion/launch checks |
| `BYTE_IDENTITY` | `Buffer.from:utf8`, `Buffer.compare`, `Buffer.isBuffer`, `Uint8Array.from`, byte `slice`, `byteLength` read | Response conversion occurs exactly once; copies/comparison only; no normalization, alternate encoding, or content output |
| `DETERMINISTIC_DATA` | `JSON.stringify`, `JSON.parse`, `Object.freeze`, `Object.keys`, `Object.values`, `Object.entries`, `Array.isArray`, array `map/every/some/includes/join/slice/push/sort`, set `add/has`, map `get/set/has` | Local policy/receipt/manifest/test data only; response bytes may not become JSON/string/collection content except hash/length identities |
| `INPUT_VALIDATION` | `RegExp.test`, `Number.isFinite`, `Number.isInteger`, `Date.parse`, date `toISOString`, string `startsWith/endsWith/includes/split/trim/toLowerCase/toUpperCase` | Inputs are governance fields/path segments/timestamps, never response transformation |
| `LOCAL_CONSTRUCTION` | `Date`, `Error`, `Set`, `Map`, `Uint8Array` | Local mechanical validation/storage only; `Error` message cannot carry response/path/semantic content |
| `LOCAL_PRIVATE_HELPER` | statically resolved same-file call | Target is non-exported, acyclic, not returned as capability, and every transitive executable edge independently passes |
| `JEST_ASSERTION_OR_MOCK` | imported `describe`, `it`, `expect`, `jest.fn`, `jest.spyOn`, matcher chain rooted in `expect` | `FOCUSED_TEST` only; fictional data; assertion/mock purpose; no production capability or output |
| `SYNTHETIC_FIXTURE_FILESYSTEM` | same filesystem/path/hash operations above plus `os.tmpdir` | `FOCUSED_TEST` only; destination confined to suite-owned external root; cleanup only that root; no repository Evidence |

Decision 2 seam operation IDs map one-to-one to the relevant rows. Their normalized signatures are:

```text
SHA256(bytes: Uint8Array) -> string
REPOSITORY_ROOT(startDirectory: string) -> string
REALPATH(path: string) -> string
LSTAT(path: string) -> MechanicalStat
STAT(path: string) -> MechanicalStat
EXISTS(path: string) -> boolean
MKDIR(path: string, mode: number) -> void
OPEN(path: string, flags: string, mode: number) -> number
WRITE(descriptor: number, bytes: Uint8Array, offset: number, length: number, position: number) -> number
FSYNC(descriptor: number) -> void
CLOSE(descriptor: number) -> void
RENAME(from: string, to: string) -> void
READ_FILE(path: string) -> Uint8Array
REMOVE(path: string, recursive: boolean) -> void
```

`MechanicalStat` has exactly `isFile`, `isDirectory`, and `isSymbolicLink`, each `() => boolean`, and is private/non-exported.

Unknown ordinary operations fail.

### 7.3 Direct Falsifiers

1. Same method name from unresolved/different receiver: FAIL.
2. Write/rename/read/remove with wrong destination/data label: FAIL.
3. Response bytes flow to JSON, string normalization, output, error, or callback: FAIL.
4. Private helper recursion, export, capability return, or failing transitive edge: FAIL.
5. Jest/mock operation outside focused test or synthetic root: FAIL.
6. Any operation absent from the catalogue: unknown and FAIL.

## 8. Decision CPD-D5 - Prohibited Structural Matching

### 8.1 Decision Method

| Required field | Decision |
| --- | --- |
| Decision ID | `CPD-D5` |
| Governed quantity | Structural detection of every settled prohibited capability or data/control edge |
| Existing settled constraints | All listed semantic families prohibited; no raw-word proof; any prohibited finding fails; zero/multiple terminal classes fail; no precedence rescue |
| Genuine choice | Exact match dimensions and overlap algorithm |
| Options considered | Denied tokens; import-only rules; first-match categories; all-applicable structural rules |
| Selected policy | All-applicable Decision 3 prohibited predicates over import provenance, normalized operations, public shape, destination, and data flow; any prohibited match fails before terminal acceptance |
| Why selected | Detects actual structure rather than words and cannot hide a prohibited edge behind a permitted name/probe |
| Permits | Only records with zero prohibited matches and exactly one compatible terminal class |
| Prohibits | Every settled family, unknown executable provenance, overlap rescue, token-only conclusions |
| Future payload effect | Encodes full prohibited predicates and exact evaluation state machine |
| Prospective statement | This is prospective policy, not an observation of the governed implementation |

### 8.2 Closed Prohibited Rule Families

Each family is represented by one or more Decision 3 rules:

1. `PROHIBITED_IMPORT_OR_DYNAMIC_LOAD` - import outside exact role allowlist; any require/import expression/dynamic load.
2. `COGNITIVE_SEMANTIC_ANDY_PROVIDER` - imported/resolved/called provenance in Andy, provider, Memory, Learning, Reflection, Knowledge, retrieval, prompt, judgement, prior state, or semantic classifier.
3. `CASE001_REPOSITORY_SERVICE_OR_EVIDENCE` - Case 001 or repository service/storage/generated-index provenance, or repository-labelled write destination.
4. `NETWORK_TELEMETRY_ANALYTICS` - network/HTTP/socket/telemetry/analytics/tracing/remote-client provenance.
5. `UI_CLIPBOARD_SHARE_DISPLAY` - UI/preview/clipboard/share/print/open/display/notification provenance or destination.
6. `LOGGING_STDOUT_STDERR` - console/logger/process stdout/stderr call or response/path content flowing to diagnostic/error output.
7. `CONTRIBUTION_DELIVERY_TRANSFER` - contribution/publication/delivery/transfer/message operation or permission result.
8. `RETRY_FEEDBACK_SECOND_TURN_ACTION` - second capture/invocation, retry loop, feedback, correction turn, queue/schedule, or Action edge.
9. `PUBLIC_PATH_ROOT_DESCRIPTOR` - public member/type/return carrying path/root/directory/filename/URL/descriptor/handle.
10. `PUBLIC_MUTATION_LIFECYCLE` - public member/type/return carrying retained mutable bytes, write/append/rename/remove/delete/unlink/truncate/chmod/move/cleanup/dispose/close.
11. `PUBLIC_SEMANTIC_PERMISSION_RESULT` - public approved/accepted/compliant/deliverable/retryable/contribution/permission/semantic/checker result.
12. `RESPONSE_TRANSFORMATION_EGRESS` - response bytes/string flow through normalization, prefix/suffix/newline/BOM/alternate encoding/excerpt/preview/JSON/base64/hex/error/output/receipt-content/non-reference callback.
13. `UNAUTHORISED_WRITE_OR_REMOVE` - filesystem mutation whose destination/purpose fails Decision 4.
14. `DYNAMIC_EXECUTION_PROCESS_CONTROL` - eval/Function/child process/worker/VM/shell/process control/daemon.
15. `ENVIRONMENT_COMPILER_FALLBACK` - environment variable, `NODE_PATH`, global/alternate compiler, inferred username/IP/root, or fallback branch.
16. `UNAUTHORISED_TEST_PROBE` - test executable structure close to a denied capability but not exactly matching Decision 6.
17. `UNKNOWN_EXECUTABLE_EDGE` - unresolved/dynamic callee, receiver, constructor, computed member, argument provenance, destination, or data flow.

### 8.3 Evaluation Algorithm

```text
record facts
  -> evaluate every prohibited predicate
  -> if prohibitedMatchCount > 0: FAIL with every matched category
  -> evaluate every terminal permitted/probe/literal predicate
  -> if terminalMatchCount == 0: FAIL UNKNOWN
  -> if terminalMatchCount > 1: FAIL AMBIGUOUS
  -> otherwise accept exactly one terminal classification
```

Public/import/enumeration facts are non-terminal facts, not precedence winners. No first-match order exists. Multiple prohibited categories may be reported together; they do not create ambiguity because any one is already FAIL.

### 8.4 Direct Falsifiers

1. A record matching both permitted and prohibited rules: FAIL prohibited.
2. Zero terminal matches: FAIL unknown.
3. Two terminal matches and zero prohibited matches: FAIL ambiguous.
4. Reorder rules: identical result.
5. Denied word in ordinary literal with no executable flow: no prohibited match.
6. Actual prohibited provenance under an innocuous identifier: prohibited match and FAIL.

## 9. Decision CPD-D6 - Authorised Test Probes

### 9.1 Decision Method

| Required field | Decision |
| --- | --- |
| Decision ID | `CPD-D6` |
| Governed quantity | Exact executable test structures permitted solely to falsify denied capabilities or preservation claims |
| Existing settled constraints | Focused test only; structural ancestry; fictional data; no escape; required assertions; test location/title alone insufficient |
| Genuine choice | Which probes remain, denied vocabulary, exact ancestry and data-flow restrictions |
| Options considered | No executable probes; title/token allowlist; six closed structural probes |
| Selected policy | Retain exactly six probe classes below, each represented by Decision 3 predicates and post-dominating assertion requirements |
| Why selected | Each directly falsifies a settled risk; no probe grants operational capability or escapes its assertion |
| Permits | Bounded lookup, copy mutation, frozen mutation, corruption, injected failure, and post-verification checker exception |
| Prohibits | Probe in production, unasserted use, invocation/return/storage/escape of denied member, mutation of retained Evidence, real response/programme data |
| Future payload effect | Adds complete probe rule records, denied vocabulary, and flow constraints |
| Prospective statement | This is prospective policy, not an observation of the governed implementation |

### 9.2 Common Probe Constraints

Every probe requires:

1. `sourceRole=FOCUSED_TEST`;
2. ancestry inside a callback passed directly to imported Jest `it` or `it.each`;
3. fictional response and suite-owned fixture provenance;
4. no return from the test callback except Jest/Promise completion;
5. no module-scope, closure-surviving, public, repository, network, output, or production data flow;
6. required assertion in the same test callback and no intervening escape;
7. zero retry, contribution, delivery, feedback, or semantic consequence.

### 9.3 Exact Probe Classes

| Probe ID | Structural grammar and permitted behavior | Required assertion and forbidden behavior |
| --- | --- | --- |
| `DENIED_PUBLIC_MEMBER_LOOKUP` | `Reflect.get(target, deniedLiteral)`, `deniedLiteral in target`, or `Object.keys(target)` where target provenance is verified reference/outcome | Value flows only to `expect(...).toBeUndefined`, `toBe(false)`, or `.not.toContain`; never call, return, store, or pass to production |
| `FRESH_COPY_MUTATION` | call `reference.readBytes` twice; mutate indices only on first returned synthetic copy | Assert second copy and independent persisted baseline retain original byte length/hash/content; never mutate filesystem or retained internal state |
| `FROZEN_OBJECT_MUTATION` | `Object.isFrozen` plus assignment/deletion inside zero-argument function passed to `expect` | Assert frozen true and mutation throws; target is outcome/reference only; no lifecycle method invocation |
| `SYNTHETIC_CORRUPTION` | fixture transforms reread fictional bytes by exact transform enum below | Corrupted bytes flow only to injected reread and `PRESERVATION_INCOMPLETE` assertion; no persistence outside suite root |
| `INJECTED_MECHANICAL_FAILURE` | exactly one Decision 2 seam operation throws or returns short/zero progress in one scenario | Assert incomplete outcome, exact first-failure event, checker count zero, retry count zero; no second injected failure |
| `CHECKER_EXCEPTION_AFTER_VERIFIED_CAPTURE` | fictional checker receives only verified reference after verified outcome and throws fixed content-free `Error` | Independently reread response/receipt and assert identity unchanged; exception creates no retry/feedback/delivery edge |

Exact corruption transform enum:

```text
PREFIX_ONE_BYTE
SUFFIX_ONE_BYTE
TRUNCATE_ONE_BYTE
APPEND_NEWLINE_0A
PREFIX_UTF8_BOM_EFBBBF
ALTER_ONE_MIDDLE_BYTE
SUBSTITUTE_FIXED_FICTIONAL_BYTES
NORMALIZE_FICTIONAL_UTF8_TO_NFC
```

Exact denied-member vocabulary:

```text
path root directory filename url fd descriptor handle
write append rename remove delete unlink truncate chmod move cleanup dispose close
transfer print preview display deliver delivery retry feedback
approved accepted compliant deliverable retryable contribution permission
```

The vocabulary is exact, lowercase, and data-only. Any other denied member used in an executable lookup is an unauthorised probe and FAIL.

### 9.4 Direct Falsifiers

1. Move any probe to production, module scope, non-Jest callback, or real data: FAIL.
2. Remove/postpone required assertion or allow value to escape/call/store/return: FAIL.
3. Mutate second copy, filesystem, final Evidence, or retained object: FAIL.
4. Add transform, denied name, failure operation, or checker capability: FAIL.
5. Two failures/retries in one scenario: FAIL.

## 10. Decision CPD-D7 - Normalisation, Enumeration, and Schemas

### 10.1 Decision Method

| Required field | Decision |
| --- | --- |
| Decision ID | `CPD-D7` |
| Governed quantity | Deterministic complete representation of AST facts, classifications, capture identities, and bounded result |
| Existing settled constraints | One parse/traversal; complete imports/exports/calls/new/property/public/dependency unit; preorder IDs; canonical off-terminal capture; independent verification; bounded manifest |
| Genuine choice | Normalized identity/type algebra, record schema, completeness accounting, and exact file/manifest schemas |
| Options considered | Source text/positions; compiler node dumps; normalized versioned JSON records |
| Selected policy | Versioned JSON schemas with recursive closed type/provenance algebra, preorder node ledger, record IDs, exact counts, and three captures plus one bounded manifest |
| Why selected | Independent of formatting/line positions, stable across one compiler identity, complete, recomputable, and machine-decidable |
| Permits | Structural identities and facts needed by Decisions 1-6 |
| Prohibits | Raw source excerpts, line-number identity, compiler object serialization, omitted subtree, duplicate record, unversioned/free-form field |
| Future payload effect | Embeds complete schemas and normalization enums inside the canonical payload |
| Prospective statement | This is prospective policy, not an observation of the governed implementation |

### 10.2 Normalization Algebra

Normalized operation identity:

```json
{
  "form": "IMPORT_BINDING_OR_LOCAL_DECLARATION_OR_BUILTIN_GLOBAL_OR_PROPERTY",
  "root": "EXACT_MODULE_BINDING_GLOBAL_OR_DECLARATION_ID",
  "path": ["EXACT_MEMBER_SEGMENTS"],
  "operationKind": "CALL_OR_NEW_OR_READ_OR_WRITE"
}
```

Normalized provenance:

```json
{
  "kind": "IMPORT_BINDING_OR_LOCAL_DECLARATION_OR_PARAMETER_OR_BUILTIN_OR_PUBLIC_VALUE_OR_LITERAL_OR_SYNTHETIC_FIXTURE_OR_UNKNOWN",
  "role": "PRODUCTION_OR_FOCUSED_TEST",
  "identity": "EXACT_BINDING_DECLARATION_PARAMETER_OR_FIXTURE_ID",
  "dataLabels": ["SORTED_CLOSED_ENUM_VALUES"]
}
```

Normalized type algebra permits only:

1. `{ "kind": "keyword", "name": "string|number|boolean|void|unknown|never" }`;
2. `{ "kind": "stringLiteral", "value": "..." }`;
3. `{ "kind": "named", "name": "ExactName", "typeArguments": [...] }`;
4. `{ "kind": "array", "readonly": true|false, "element": {...} }`;
5. `{ "kind": "function", "parameters": [...], "returns": {...} }`;
6. `{ "kind": "object", "members": [...] }`;
7. `{ "kind": "union", "members": [...] }`.

Object members sort by name then kind. Union members sort by their stable serialization. Parameter order remains declaration order. Optional and readonly are explicit booleans. Aliases used by the public policy remain named rather than expanded; anonymous outcome objects are normalized structurally.

### 10.3 Enumeration Accounting

1. AST preorder node IDs begin at `0` and increase by one for every visited node.
2. Every visited node produces one `nodeLedger` entry with node ID, parent ID/null, TypeScript `SyntaxKind` name, child count observed during the same traversal, and either governed record IDs or one closed `nonGovernedReason`.
3. `nonGovernedReason` enum is exactly `STRUCTURAL_CONTAINER`, `TOKEN_OR_TRIVIA_EXCLUDED`, `TYPE_NODE_RECORDED_BY_OWNER`, or `DECLARATION_INTERNAL_RECORDED_BY_OWNER`.
4. Record ID is `<ROLE>:<NODE_ID>:<RECORD_KIND>:<ORDINAL>`, with ordinal starting `0` per node/kind.
5. Each governed import, binding, export, name, call, new, executable property access, public declaration/member, dependency edge, literal/data, probe, prohibited finding, and unknown finding has exactly one record.
6. No node may have both governed record IDs and `nonGovernedReason` unless its reason is `STRUCTURAL_CONTAINER` and all governed records refer to the container itself; this exception is explicit in the ledger.
7. Every child entered by TypeScript traversal appears once with the current node as parent; skipped/duplicate IDs fail.
8. Counts are recomputed from records after independent reread.

### 10.4 Exact Capture Schemas

`production.enumeration.json` and `focused-test.enumeration.json` use `HH-CHECK-5-ENUMERATION-2`:

```json
{
  "schema": "HH-CHECK-5-ENUMERATION-2",
  "policy": { "schema": "STRING", "bytes": 0, "sha256": "HEX64" },
  "role": "PRODUCTION_OR_FOCUSED_TEST",
  "source": { "path": "RELATIVE_PATH", "bytes": 0, "sha256": "HEX64", "readCount": 1, "parseCount": 1, "traversalCount": 1 },
  "compiler": { "name": "typescript", "version": "5.9.3", "entryRelativePath": "node_modules/typescript/lib/typescript.js" },
  "parserDiagnostics": [],
  "nodeLedger": [],
  "records": [],
  "counts": {},
  "allowlistComparisons": [],
  "prohibitedCounts": {},
  "terminalClassificationCounts": {},
  "decision": "PASS_OR_FAIL",
  "failureCodes": []
}
```

Every placeholder above has an exact schema type: counts are non-negative integers; hashes are lowercase 64-hex strings; paths are repository-relative slash-separated strings; diagnostic/ledger/record/comparison/failure arrays use closed record schemas embedded in the future payload. No additional field is allowed.

`combined.decision.json` uses `HH-CHECK-5-COMBINED-DECISION-2`:

```json
{
  "schema": "HH-CHECK-5-COMBINED-DECISION-2",
  "policy": { "schema": "STRING", "bytes": 0, "sha256": "HEX64" },
  "instrument": { "bytes": 0, "sha256": "HEX64" },
  "repository": { "identitySchema": "HH-CHECK-5-REPOSITORY-IDENTITY-1", "result": "PASS_OR_FAIL" },
  "captures": [
    { "role": "PRODUCTION", "file": "production.enumeration.json", "bytes": 0, "sha256": "HEX64", "rereadBytes": 0, "rereadSha256": "HEX64" },
    { "role": "FOCUSED_TEST", "file": "focused-test.enumeration.json", "bytes": 0, "sha256": "HEX64", "rereadBytes": 0, "rereadSha256": "HEX64" }
  ],
  "aggregateCounts": {},
  "decision": "PASS_OR_FAIL",
  "failureCodes": []
}
```

### 10.5 Exact Bounded Manifest Schema

One stable-serialized `HH-CHECK-5-BOUNDED-MANIFEST-2` object, maximum 4,096 UTF-8 bytes plus one terminal newline, contains exactly:

```text
schema
policy {schema, bytes, sha256}
instrument {bytes, sha256, identityGate}
repository {identitySchema, packageName, compilerVersion, result}
authority {tokenId, acquired, consumed, finalState}
roles[2] {role, sourceBytes, sourceSha256, parserDiagnosticCount,
          visitedNodeCount, recordCount, captureBytes, captureSha256,
          rereadBytes, rereadSha256, importCount, importedBindingCount,
          exportCount, exportedNameCount, callCount, newCount,
          propertyAccessCount, publicDeclarationCount, publicMemberCount,
          dependencyEdgeCount, literalDataCount, authorisedProbeCount,
          prohibitedCounts, unknownCount, ambiguousCount,
          publicAllowlistEqual, decision}
combined {aggregateCounts, stderrBytes, decision, failureCodes}
```

Every object has `additionalProperties=false`; arrays have fixed order/cardinality; numeric fields are non-negative integers; decisions are `PASS|FAIL`; complete enumerations and machine-local paths are prohibited.

### 10.6 Direct Falsifiers

1. Raw source text/position, unknown schema field/type/enum, extra property, or missing field: FAIL.
2. Duplicate/skipped node or record ID, parent/child mismatch, second traversal, or count mismatch: FAIL.
3. Reorder object keys before stable serialization: canonical bytes remain dictated by sorted keys.
4. Corrupt/truncate capture or change count/hash/decision: independent verification FAIL.
5. Manifest cannot be recomputed exactly from verified captures/state: FAIL.
6. Manifest exceeds 4,096 bytes or contains enumeration/path/source/response content: FAIL.

## 11. Decision CPD-D8 - Repository and Launch Identity

### 11.1 Decision Method

| Required field | Decision |
| --- | --- |
| Decision ID | `CPD-D8` |
| Governed quantity | Portable pre-source proof that the launch root is the intended Helping Hand repository context |
| Existing settled constraints | Repository package anchor; CommonJS `createRequire`; TypeScript `5.9.3`; no cwd-only, username, absolute committed path, network/Git remote, environment, or fallback |
| Genuine choice | Minimum portable marker tuple and exact comparison rule |
| Options considered | Absolute root; cwd only; package name only; content hashes of extra files; package name plus fixed structural markers/compiler/source containment |
| Selected policy | Canonical package-root identity with prospective package name `kitchen-mobile-clean`, three fixed regular non-symlink marker paths, exact compiler relative resolution, and exact governed-path containment |
| Why selected | Portable, no network/environment, no extra marker-content baseline, and strong enough to distinguish launch context while avoiding another governed content measurement |
| Permits | One package-root read/parse and marker metadata checks before governed source read |
| Prohibits | Alternate package name/root/compiler, symlink marker/root escape, cwd inference, absolute committed path, Git/network/environment fallback |
| Future payload effect | Adds complete `HH-CHECK-5-REPOSITORY-IDENTITY-1` object and pre-source checks |
| Prospective statement | `kitchen-mobile-clean` and this marker tuple are prospective policy choices, not observations of current package/source content |

### 11.2 Exact Machine-Encodable Form

```json
{
  "schema": "HH-CHECK-5-REPOSITORY-IDENTITY-1",
  "rootDerivation": "REALPATH_DIRNAME_PACKAGE_ANCHOR",
  "packageAnchorRelativePath": "package.json",
  "packageName": "kitchen-mobile-clean",
  "requiredRegularNonSymlinkMarkers": [
    "constitution/02-CONSTITUTION.md",
    "docs/engineering/VALIDATION_PHILOSOPHY.md",
    "scripts/support/repositoryRoot.ts"
  ],
  "governedPaths": [
    "scripts/academy/support/responseEvidenceCapture.ts",
    "scripts/academy/support/__tests__/responseEvidenceCapture.test.ts"
  ],
  "compiler": {
    "moduleFormat": "COMMONJS",
    "loader": "MODULE_CREATE_REQUIRE_PACKAGE_ANCHOR",
    "package": "typescript",
    "version": "5.9.3",
    "resolvedEntryRelativePath": "node_modules/typescript/lib/typescript.js",
    "fallbacks": []
  }
}
```

Launch contract:

1. caller supplies one package-anchor path; no default from cwd;
2. anchor and parent are canonicalized; anchor must be a regular non-symlink file named `package.json` directly under root;
3. parsed `name` must equal the prospective policy value;
4. each marker must resolve under root and be regular/non-symlink; marker content is not read;
5. both governed paths must resolve lexically under root before their existence/read operations, without opening them during launch binding;
6. repository-anchored `createRequire` must resolve exactly the compiler relative entry/version;
7. any mismatch stops before token acquisition or source read.

### 11.3 Direct Falsifiers

1. Wrong package name, anchor basename/parent, marker missing/symlink/non-file, or governed path escape: FAIL before source read.
2. Cwd-only launch, environment variable, username, absolute committed root, Git remote, or fallback: policy/instrument conformance FAIL.
3. Compiler outside root, wrong entry/version/module mechanism, global/`NODE_PATH` resolution: FAIL.
4. Marker content read or governed source opened during launch binding: FAIL.

## 12. Decision CPD-D9 - One-Use Token and Execution State

### 12.1 Decision Method

| Required field | Decision |
| --- | --- |
| Decision ID | `CPD-D9` |
| Governed quantity | Machine-local rejection of every second launch under one exact Check 5 Authority |
| Existing settled constraints | Token immediately before first source read; first complete source read consumes; no failure permits retry; no repository/programme/cognitive persistence |
| Genuine choice | Stable token identity/root, acquisition primitive, event/state lifecycle, crash behavior, removal |
| Options considered | In-memory flag; removable temp lock; pre-created token; exclusive append-only state file in Authority-bound external root |
| Selected policy | Authority supplies one existing private machine-local state root outside repository; instrument exclusively creates one deterministic append-only NDJSON state file with `wx`, never removes it, and rejects existence |
| Why selected | Atomic, simple, survives process crash/restart, no retry, no repository state, and no distributed/programme dependency |
| Permits | One acquisition and append-only lifecycle events for the one attempt |
| Prohibits | Removal, truncation, overwrite, second create, alternate token path, fallback root, retry after any failure |
| Future payload effect | Adds exact token derivation, state schema, transitions, and second-launch behavior |
| Prospective statement | This is prospective policy, not an observation of any current instrument or machine state |

### 12.2 Exact Token Identity and Location

The later execution Authority must supply:

1. `authorityId`: non-empty ASCII governance record identity;
2. `stateRoot`: existing canonical private directory outside repository, not a symlink, mode owner-only where supported;
3. exact policy bytes/SHA-256;
4. exact instrument bytes/SHA-256.

Token ID is lowercase SHA-256 of the UTF-8 stable serialization of:

```json
{
  "schema": "HH-CHECK-5-ONE-USE-TOKEN-1",
  "authorityId": "EXACT_AUTHORITY_ID",
  "policySha256": "HEX64",
  "instrumentSha256": "HEX64",
  "productionSourceSha256": "f986633d8dd0984b385320f61a2d4a38f593284690db3d03ff4d3f10614aacfe",
  "focusedTestSourceSha256": "6b56cae73f1dcf8db64bb9a41137b16d46897bc656802a6530a3fe45843eb53f"
}
```

State path is `<stateRoot>/hh-check5-<tokenId>.ndjson`.

### 12.3 Acquisition and State Machine

1. Complete launch/readiness/identity preconditions run before token acquisition and open no governed source.
2. Immediately before first source read, create state file with `openSync(path, "wx", 0o600)`.
3. Existing path or exclusive-create failure yields `AUTHORITY_ALREADY_USED_OR_STATE_UNAVAILABLE`, stops before source read, and grants no alternate path/retry.
4. Write/fsync/close exactly one canonical `ACQUIRED_UNCONSUMED` event before source read.
5. Invoke the production complete-byte read once.
6. If read returns complete bytes, Authority is consumed at that return; append/fsync `CONSUMED` before identity comparison or any second source read.
7. If read fails before completion, append `CLOSED_PRE_CONSUMPTION_FAILURE` where possible and stop. The existing token still closes Authority; no retry follows.
8. Every later failure appends `CLOSED_POST_CONSUMPTION_FAILURE` where possible and stops.
9. Complete PASS/FAIL appends `CLOSED_PASS` or `CLOSED_FAIL` and stops.
10. Append failure cannot permit retry; token existence remains the fail-closed control.
11. Token/state is never removed, renamed, truncated, overwritten, committed, published, imported into programme state, or treated as cognitive/governance Evidence.
12. Crash/restart leaves the token present; every later launch rejects before source read regardless of last event.

Each NDJSON event has exactly `schema`, `tokenId`, `sequence`, `state`, and `timestamp`. Sequence starts `0` and increments. Timestamp is execution chronology only and does not affect identity or decisions.

### 12.4 Direct Falsifiers

1. Existing token, wrong token ID/path/root, symlink root, nonexclusive create, or alternate path: FAIL before source read.
2. Source read before durable `ACQUIRED_UNCONSUMED`: FAIL.
3. Complete read without immediate `CONSUMED` append attempt: FAIL.
4. Any token remove/truncate/overwrite/rename or retry branch: FAIL.
5. Crash after any event followed by second launch: second launch rejects.
6. Token under repository or flow into programme/cognitive state: FAIL.

## 13. Cross-Decision Consistency Review

| Required consistency check | Direct result |
| --- | --- |
| 1. Public shapes represented by type-normalisation grammar | **PASS** - Decision 1 uses only Decision 7 keyword, literal, named, function, object, and union forms with explicit required/readonly fields. |
| 2. Test probes cannot become ordinary permitted edges | **PASS** - Decision 6 requires focused-test/Jest ancestry and exact flow; Decision 5 evaluates prohibited rules first and Decision 4 excludes probe mutations/lookups from ordinary operations. |
| 3. Prohibited matches override permission | **PASS** - every prohibited predicate is evaluated; any hit fails before terminal acceptance. |
| 4. Permitted model is closed and unknown fails | **PASS** - Decision 4 closes operation IDs/provenance/purpose; absent operations and unresolved provenance become prohibited unknown. |
| 5. Repository identity is implementation-independent | **PASS** - package anchor/name, fixed marker metadata, compiler location, and lexical governed paths are checked before source access; no source content sets policy. |
| 6. One-use mechanics avoid repository/programme persistence | **PASS** - Authority-supplied private external state root, append-only local file, no repository path or programme/cognitive flow. |
| 7. Capture schemas represent every enumeration record | **PASS** - Decision 7 includes node ledger and all governed record/finding classes with closed schemas. |
| 8. Manifest recomputable from verified captures | **PASS** - every role/combined field derives from verified capture identities, records, counts, policy/instrument/repository/token state. |
| 9. No future machine decision requires external prose | **PASS BY POLICY DESIGN** - a corrected payload must embed Decisions 1-9, schemas, enums, predicates, and state machines; prose may explain but not add normative rules. |
| 10. No policy value came from governed source inspection | **PASS** - neither governed implementation source was accessed; every choice is settled governance or explicit prospective policy. |

Additional consistency findings:

1. Mutable option declarations do not weaken pre-authorisation or permit mutation after capture begins.
2. The private seam is unreachable through the public overload and contains no semantic capability.
3. Exact-one terminal classification and all-prohibited evaluation remove precedence ambiguity.
4. Repository launch failure occurs before token acquisition; any failure after acquisition remains non-retryable.
5. Policy identity, instrument identity, repository identity, source identity, Authority state, measurement Evidence, Check 5 result, Check 6, and acceptance remain distinct units.

## 14. Outcome Decision

### Outcome 1 - All nine decisions settled

**Selected.** CPD-D1 through CPD-D9 each has one exact prospective governance answer, machine-encodable form, direct falsifiers, and coherent interaction with the other decisions.

### Outcome 2 - One or more decisions unresolved

Not selected. No listed decision requires implementation observation or another semantic owner. Future schema authoring is deterministic encoding of these decisions, subject to a separate correction Authority and terminal closure review.

### Outcome 3 - Canonical policy architecture insufficient

Not selected. The selected closed data algebra represents public shapes, predicates, operational/prohibited/probe rules, normalization, schemas, launch identity, and one-use state without executable policy or hidden interpretation.

## 15. Authority and Next Gate

**Decisions settled:** `9/9`.

**Decisions remaining unresolved:** `0`.

**All nine have exact machine-encodable answers:** **Yes.**

**Candidate Policy Correction Authority Review may now be considered:** **Yes.**

This review does **not** grant correction Authority. A fresh documentation-only Candidate Policy Correction Authority Review must decide whether one new candidate schema/payload may be authored. If granted later, that Authority must:

1. preserve the historical 6,350-byte candidate identity unchanged;
2. create a new schema and new document/payload;
3. encode every normative rule from Decisions 1-9 inside the canonical payload;
4. leave no normative machine rule solely in prose;
5. compute a new deterministic byte length/SHA-256;
6. leave the corrected result `CANDIDATE`;
7. stop without instrument implementation or Check 5 execution;
8. require a separate terminal policy-closure review deciding `SELF_CONTAINED`, `INTERNALLY_CONSISTENT`, `TOTAL`, `DETERMINISTIC`, `MACHINE_DECIDABLE`, and `GOVERNANCE_FAITHFUL`.

Only a later terminal decision may freeze a corrected policy identity.

## 16. Explicit Non-Consequences

This review grants no Authority to:

1. edit the historical candidate;
2. create a corrected candidate or canonical payload;
3. inspect governed implementation source;
4. implement, generate, inspect, test, readiness-check, or accept an instrument;
5. modify or reuse the readiness-only instrument;
6. run Check 5 or Check 6;
7. accept the implementation;
8. perform harness, contribution, delivery, Memory, Learning, Reflection, feedback, Action, or semantic work.

## 17. Final State

```text
OUTCOME 1 - ALL NINE CHECK 5 CANONICAL POLICY DECISIONS SETTLED AS PROSPECTIVE GOVERNANCE WITHOUT GOVERNED SOURCE OBSERVATION - HISTORICAL CANDIDATE 6350 BYTES SHA256 FF71059E5FBAD04831BF8CBC6D408B44B265D8657446A1FE8C2B0C8E8D972186 PRESERVED UNCHANGED AS HISTORICAL CANDIDATE POLICY EVIDENCE NOT FROZEN CORRECTED OR FINAL - D1 MINIMUM PUBLIC API FIXED WITH MUTABLE REQUIRED OPTIONS READONLY MINIMUM OUTCOMES AND FOUR-MEMBER FRESH-COPY REFERENCE - D2 ONE PUBLIC OVERLOAD PLUS ONE IMPLEMENTATION DECLARATION WITH PRIVATE OPTIONAL MECHANICAL OPERATIONS SEAM - D3 CLOSED CONJUNCTION-ONLY JSON PREDICATE LANGUAGE - D4 CLOSED PROVENANCE PURPOSE AND DESTINATION-CONSTRAINED OPERATION CATALOGUE - D5 ALL PROHIBITED RULES EVALUATED ANY HIT FAILS ZERO TERMINALS UNKNOWN MULTIPLE TERMINALS AMBIGUOUS NO PRECEDENCE RESCUE - D6 SIX EXACT FOCUSED-TEST PROBE GRAMMARS - D7 VERSIONED NORMALIZATION NODE LEDGER ENUMERATION CAPTURE COMBINED DECISION AND 4096-BYTE-MAXIMUM MANIFEST SCHEMAS - D8 PORTABLE PACKAGE-ROOT NAME MARKER COMPILER AND PATH-CONTAINMENT LAUNCH IDENTITY - D9 EXCLUSIVE APPEND-ONLY EXTERNAL MACHINE-LOCAL ONE-USE STATE FILE NEVER REMOVED SECOND LAUNCH REJECTED - CROSS-DECISION CONSISTENCY PASS 10 OF 10 - DECISIONS SETTLED 9 OF 9 - DECISIONS UNRESOLVED ZERO - FRESH CANDIDATE POLICY CORRECTION AUTHORITY REVIEW MAY NOW BE CONSIDERED BUT NO CORRECTION AUTHORITY GRANTED - NO CORRECTED PAYLOAD - NO INSTRUMENT AUTHORITY - CHECK 5 UNMEASURED - CHECK 6 NOT RUN - IMPLEMENTATION UNACCEPTED - STOP
```

Canonical policy unresolved decisions review stops here.