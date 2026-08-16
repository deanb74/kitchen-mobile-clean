# HH-0000 Check 5 Closed Machine-Encodable Measurement Policy Specification

**Status:** AUTHORED GOVERNANCE SPECIFICATION - POLICY CLOSED - NO IMPLEMENTATION OR EXECUTION AUTHORITY
**Specification date:** 2026-08-14
**Schema:** `HH-CHECK-5-CLOSED-MEASUREMENT-POLICY-1`
**Specification type:** Prospective normative Check 5 measurement policy
**Controlling architecture decision:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_GOVERNED_MEASUREMENT_INSTRUMENT_ARCHITECTURE_AND_IMPLEMENTATION_AUTHORITY_REVIEW.md`
**Controlling measurement design:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_MEASUREMENT_CAPTURE_FAILURE_RESPONSIBILITY_REVIEW.md`
**Controlling implementation contract:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_IMPLEMENTATION_AUTHORITY_REVIEW.md`
**Governed implementation-source access:** None
**Readiness-only artefact effect:** None - the exact 7,843-byte artefact remains unchanged readiness-only Evidence
**Check 5:** Not run; `UNMEASURED`
**Check 6:** `NOT RUN`
**Implementation:** `UNACCEPTED`
**Authority effect:** None - this specification grants no instrument implementation, readiness, Check 5 execution, Check 6, or acceptance Authority

# Repository Traceability

**Principle:** Truth before certainty; evidence before claims; human Authority; one responsibility per capability.
**Theory:** A measuring instrument may enforce a settled policy but may not infer policy from the unit it measures.
**Architecture:** One exact two-source Check 5 measurement; complete AST enumeration; closed public/prohibited classifications; deterministic verified off-terminal transport; one bounded result; mandatory stop.
**Engineering:** Exact source identities, exact TypeScript loading, total classification, canonical policy encoding, direct falsifiers, one-use execution, and non-transitive outcomes.
**Milestone:** Not Applicable.
**Evidence:** This is authored policy, not implementation observation or execution Evidence.

## 1. Purpose and Normative Boundary

This record closes the machine-encodable policy dependency identified by the controlling architecture review. It defines what any future Check 5 measurement instrument must compare against.

The public names, member names, type shapes, edge classes, and test-probe signatures below are **prospective governance requirements**. They are not observations of either governed implementation file. If a later separately authorised measurement finds a difference, that difference is a Check 5 finding; this specification must not be rewritten to bless it.

This record does not:

1. inspect, open, read, hash, parse, or otherwise access either governed implementation source;
2. inspect, execute, modify, generalise, or convert the exact readiness-only artefact;
3. implement, generate, test, readiness-check, or execute a measurement instrument;
4. run Check 5 or Check 6;
5. accept the implementation;
6. grant any implementation or execution Authority.

## 2. “10 What?” - Policy Itself

| Field | Normative statement |
| --- | --- |
| Governed quantity | Closure and determinism of the policy used to classify the complete Check 5 measurement |
| Exact unit | The canonical payload between the markers in Section 16, parsed once and stable-serialized under Section 15 |
| Trustworthy baseline | Every policy set is explicit; classification precedence is total; unknown and overlap fail; no implementation observation supplies or changes a policy value |
| Direct instrument | Parse the payload, validate its schema/cardinalities/enums, stable-serialize it, and bind its byte length/SHA-256 before any future instrument implementation is considered |

## 3. Fixed Governed Sources

Exactly these two roles and paths exist:

| Role | Repository-relative path | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| `PRODUCTION` | `scripts/academy/support/responseEvidenceCapture.ts` | 16125 | `f986633d8dd0984b385320f61a2d4a38f593284690db3d03ff4d3f10614aacfe` |
| `FOCUSED_TEST` | `scripts/academy/support/__tests__/responseEvidenceCapture.test.ts` | 25324 | `6b56cae73f1dcf8db64bb9a41137b16d46897bc656802a6530a3fe45843eb53f` |

No third role, path, alternate identity, inferred current identity, or baseline adoption exists. Both complete byte identities must pass before either byte unit is decoded or supplied to TypeScript.

## 4. Closed Public API Policy

### 4.1 Public declarations

The production module's complete unique exported-name set is exactly:

1. type alias `ResponseCaptureDispositionRule`;
2. interface `CaptureResponseEvidenceOptions`;
3. interface `VerifiedResponseCaptureReference`;
4. type alias `ResponseCaptureOutcome`;
5. function `preserveResponseEvidence`.

No default export, export assignment, re-export, wildcard export, namespace export, class, enum, variable export, or sixth public name is permitted.

### 4.2 Disposition rule

`ResponseCaptureDispositionRule` is exactly this closed string-literal union:

```ts
type ResponseCaptureDispositionRule =
  | "DELETE_WHEN_DUE"
  | "SEPARATE_AUTHORITY_REQUIRED_FOR_TRANSFER_OR_DELIVERY";
```

### 4.3 Capture options

`CaptureResponseEvidenceOptions` has exactly nine required, non-optional, readonly members and no index signature, call signature, construct signature, method, or additional member:

```ts
interface CaptureResponseEvidenceOptions {
  readonly response: string;
  readonly attemptId: string;
  readonly authorityDocumentId: string;
  readonly externalCaptureRoot: string;
  readonly accessOwner: string;
  readonly reviewPurpose: string;
  readonly retainUntil: string;
  readonly dispositionRule: ResponseCaptureDispositionRule;
  readonly now: () => Date;
}
```

### 4.4 Verified reference

`VerifiedResponseCaptureReference` has exactly four required readonly members and no index signature, construct signature, setter, or additional member:

```ts
interface VerifiedResponseCaptureReference {
  readonly attemptId: string;
  readonly byteLength: number;
  readonly sha256: string;
  readonly readBytes: () => Uint8Array;
}
```

`readBytes` is the sole public operation. Each call returns a fresh byte copy. It carries no path, root, descriptor, mutable retained buffer, write, append, rename, remove, unlink, truncate, chmod, transfer, print, preview, display, delivery, retry, feedback, permission, or semantic operation.

### 4.5 Outcomes

`ResponseCaptureOutcome` is exactly this discriminated union:

```ts
type ResponseCaptureOutcome =
  | Readonly<{
      status: "PRESERVATION_VERIFIED";
      reference: VerifiedResponseCaptureReference;
    }>
  | Readonly<{
      status: "PRESERVATION_INCOMPLETE";
      attemptId: string;
    }>;
```

The exact closed status set is:

1. `PRESERVATION_VERIFIED`;
2. `PRESERVATION_INCOMPLETE`.

No outcome may carry response content, bytes, path, root, descriptor, receipt, error object, semantic reason, approval, acceptance, compliance, deliverability, retryability, contribution, or permission.

### 4.6 Function boundary

The externally callable signature is exactly:

```ts
function preserveResponseEvidence(
  options: CaptureResponseEvidenceOptions,
): ResponseCaptureOutcome;
```

One exported overload declaration plus its exported implementation declaration is permitted because completed Check 4 recorded two exported function AST declarations for one unique public name. The implementation declaration may contain one second parameter only when all of these hold:

1. it is optional or has a default;
2. its type is non-exported and mechanically limited to filesystem/hash operations required by the implementation Authority;
3. it is used only by the focused synthetic suite;
4. it is absent from the externally callable overload;
5. it is never retained, returned, attached to an outcome/reference, or reachable after the call.

Any other parameter, overload, generic, callback, public method, or return branch fails.

## 5. Closed Import Policy

### 5.1 Production imports

The complete production import set is exactly:

| Module | Import kind | Binding |
| --- | --- | --- |
| `node:crypto` | named value | `createHash` |
| `node:fs` | default value | `fs` |
| `node:path` | default value | `path` |
| `../../support/repositoryRoot` | named value | `resolveRepositoryRootFromDirectory` |

### 5.2 Focused-test imports

The complete focused-test import set is exactly:

| Module | Import kind | Bindings |
| --- | --- | --- |
| `node:crypto` | named value | `createHash` |
| `node:fs` | default value | `fs` |
| `node:os` | default value | `os` |
| `node:path` | default value | `path` |
| `@jest/globals` | named values | `describe`, `expect`, `it`, `jest` |
| `../../../support/repositoryRoot` | named value | `resolveRepositoryRootFromDirectory` |
| `../responseEvidenceCapture` | named types and value | types `CaptureResponseEvidenceOptions`, `ResponseCaptureOutcome`; value `preserveResponseEvidence` |

Any dynamic import, `require`, import expression, extra module, extra binding, alias, namespace import, side-effect import, or re-export fails.

## 6. Total Structural Classification

Every governed record must receive exactly one terminal classification after the structural facts are recorded. Classification order is:

1. `PARSER_DIAGNOSTIC`;
2. `PUBLIC_API`;
3. `IMPORT_EDGE`;
4. `PROHIBITED_EXECUTABLE_EDGE`;
5. `AUTHORISED_TEST_PROBE`;
6. `TEST_LITERAL_OR_FALSIFIER_DATA`;
7. `PERMITTED_MECHANICAL_EDGE`;
8. `ORDINARY_LITERAL`;
9. `UNKNOWN_OR_AMBIGUOUS`.

Rules:

1. parser diagnostics always fail and stop use of closure findings;
2. an edge matching a prohibited class cannot be rescued by a later class;
3. a test probe is authorised only by the complete grammar in Section 9;
4. a literal classification requires a non-executable AST position;
5. a record matching zero or more than one terminal class is `UNKNOWN_OR_AMBIGUOUS` and fails;
6. raw text, token occurrence, line number, test title, and identifier spelling alone never establish executable identity;
7. every call, new expression, property access, import, export, public member, and dependency edge must appear exactly once in the canonical enumeration.

## 7. Closed Permitted Mechanical Edge Model

### 7.1 Same-file private edges

Calls to a declaration in the same source file are `PERMITTED_LOCAL_PRIVATE` only when the target is statically resolved, not exported, not returned as capability, and every executable node in its transitive body independently classifies under this policy. Recursion and mutually recursive call cycles fail.

### 7.2 Production platform edges

The following exact platform operations are permitted when receiver provenance matches the allowlisted import or built-in and all callbacks are themselves classified:

1. crypto: `createHash`, hash `update`, hash `digest`;
2. filesystem: `realpathSync`, `lstatSync`, `statSync`, `existsSync`, `mkdirSync`, `openSync`, `writeSync`, `fsyncSync`, `closeSync`, `renameSync`, `readFileSync`, `rmSync`;
3. path: `resolve`, `join`, `relative`, `dirname`, `basename`, `isAbsolute`, `sep` read;
4. repository root: `resolveRepositoryRootFromDirectory`;
5. bytes: `Buffer.from`, `Buffer.compare`, `Buffer.isBuffer`, `Uint8Array.from`, `Uint8Array.prototype.slice`, `Uint8Array.prototype.byteLength` read;
6. deterministic data: `JSON.stringify`, `JSON.parse`, `Object.freeze`, `Object.keys`, `Object.values`, `Object.entries`, `Array.isArray`;
7. local collection operations: array `map`, `every`, `some`, `includes`, `join`, `slice`, `push`, `sort`; set `add`, `has`; map `get`, `set`, `has`;
8. validation: `RegExp.prototype.test`, `Number.isFinite`, `Number.isInteger`, `Date.parse`, date `toISOString`, string `startsWith`, `endsWith`, `includes`, `split`, `trim`, `toLowerCase`, `toUpperCase`;
9. local construction: `Date`, `Error`, `Set`, `Map`, `Uint8Array`.

Constraints:

1. `rmSync` may target only an unverified temporary file or empty attempt directory created by the same failed call; it may never target a final response/receipt or repository path;
2. filesystem writes may target only the canonical external attempt directory established by the implementation Authority;
3. `readFileSync` may read only the independently verified final response/receipt or focused-test fixtures under the test's own temporary root;
4. string/JSON/collection operations may not transform response bytes for persistence or emit response content;
5. `Date` operations may validate supplied governance timestamps only;
6. an operation satisfying the name list but failing receiver, argument-provenance, destination, or purpose constraints is prohibited or unknown.

### 7.3 Focused-test mechanical edges

The focused test may additionally use:

1. imported Jest functions `describe`, `it`, `expect`, and `jest`;
2. matcher-chain properties and calls rooted directly in the result of `expect`;
3. `jest.fn`, `jest.spyOn`, and mock functions for synthetic operation recording/failure injection;
4. `os.tmpdir` for the suite-owned external synthetic root;
5. production `preserveResponseEvidence` calls with fictional response data;
6. same-file private test helpers under Section 7.1;
7. filesystem operations only within the suite-owned external temporary root, except read-only repository-root resolution used to prove exclusion;
8. after-test deletion only of the suite-owned synthetic root.

No focused-test operation may invoke Andy, construct a provider, access real programme input, write repository Evidence, or create a semantic consequence.

## 8. Closed Prohibited Category Model

Every prohibited hit records one of these exact categories:

1. `PROHIBITED_IMPORT_OR_DYNAMIC_LOAD` - any import/load outside Section 5;
2. `COGNITIVE_OR_SEMANTIC_EDGE` - Andy, provider, Memory, Learning, Reflection, Knowledge, retrieval, prompt, judgement, semantic classification, or prior-state edge;
3. `CASE_001_OR_REPOSITORY_SERVICE_EDGE` - Case 001, repository service/storage, repository Evidence publication, or generated-index edge;
4. `NETWORK_TELEMETRY_OR_ANALYTICS_EDGE` - network, HTTP, socket, telemetry, analytics, tracing, or remote-service edge;
5. `UI_CLIPBOARD_SHARE_OR_DISPLAY_EDGE` - UI, preview, clipboard, share, print, open, display, or user-notification edge;
6. `LOGGING_OR_TERMINAL_OUTPUT_EDGE` - console, logger, stdout, stderr, terminal marker, or response-content diagnostic edge;
7. `DELIVERY_TRANSFER_OR_CONTRIBUTION_EDGE` - delivery, transfer, messaging, contribution acceptance, publication, or programme-finding edge;
8. `RETRY_FEEDBACK_SECOND_TURN_OR_ACTION_EDGE` - retry, repeat invocation, correction turn, feedback, second turn, scheduling, queueing, or Action edge;
9. `PUBLIC_PATH_ROOT_OR_DESCRIPTOR_CAPABILITY` - public path/root/directory/filename/URL/file-descriptor/handle capability;
10. `PUBLIC_MUTATION_OR_LIFECYCLE_CAPABILITY` - public write, append, rename, remove, delete, unlink, truncate, chmod, move, cleanup, dispose, close, or mutable retained-buffer capability;
11. `PUBLIC_PERMISSION_OR_SEMANTIC_RESULT` - approved, accepted, compliant, deliverable, retryable, contribution, permission, semantic finding, or checker result in public output;
12. `RESPONSE_TRANSFORMATION_OR_EGRESS` - response normalization, prefix/suffix/newline/BOM/encoding substitution, excerpt, preview, base64/hex/escaped copy, logger/error/result/receipt content, or non-authorised callback egress;
13. `REPOSITORY_OR_UNAUTHORISED_WRITE` - write outside the canonical external attempt destination, including repository and source/configuration paths;
14. `DYNAMIC_EXECUTION_OR_PROCESS_CONTROL` - eval, Function construction, child process, worker, VM, process exit/control, shell, daemon, or dynamic code execution;
15. `ENVIRONMENT_OR_COMPILER_FALLBACK` - environment-variable configuration, `NODE_PATH`, global package, alternate compiler, inferred root, username, private IP, or machine-specific committed path;
16. `UNAUTHORISED_TEST_PROBE` - executable denied-capability probe outside Section 9;
17. `UNKNOWN_OR_AMBIGUOUS_EXECUTABLE_EDGE` - unresolved callee/receiver/provenance, overlap, dynamic property, computed unknown, or unclassified executable structure.

The required count for every prohibited category is zero. Category 17 makes the model fail closed.

## 9. Exact Authorised Test-Only Probe Grammar

A focused-test executable probe is authorised only when all applicable conditions below are structurally established. Test title or denied-token text is insufficient.

### 9.1 Denied public-member lookup

Permitted grammar:

```text
expect(Reflect.get(referenceOrOutcome, deniedName)).toBeUndefined()
expect(deniedName in referenceOrOutcome).toBe(false)
expect(Object.keys(referenceOrOutcome)).not.toContain(deniedName)
```

`deniedName` must be a string literal from:

```text
path root directory filename url fd descriptor handle
write append rename remove delete unlink truncate chmod move cleanup dispose close
transfer print preview display deliver delivery retry feedback
approved accepted compliant deliverable retryable contribution permission
```

The looked-up value may flow only into the same assertion. It may not be called, returned, stored outside the test callback, or passed to production.

### 9.2 Fresh-copy mutation probe

Permitted grammar:

```text
first = reference.readBytes()
mutate one or more indices of first
second = reference.readBytes()
expect second identity/content to equal the independently persisted baseline
```

Only the returned synthetic copy may be mutated. No filesystem or retained internal buffer mutation is authorised.

### 9.3 Frozen-object mutation probe

Permitted grammar:

```text
expect(Object.isFrozen(referenceOrOutcome)).toBe(true)
expect(attempted assignment/deletion on referenceOrOutcome).toThrow()
```

The attempted mutation must remain inside the assertion callback and must not invoke a public lifecycle operation.

### 9.4 Synthetic corruption transform

Permitted only as test data supplied through the private injected filesystem boundary after a synthetic reread:

1. prefix one byte;
2. suffix one byte;
3. truncate one byte;
4. append newline `0x0a`;
5. prefix UTF-8 BOM `ef bb bf`;
6. alter one byte;
7. substitute fixed fictional bytes;
8. normalize a fictional UTF-8 fixture to NFC.

The transformed bytes may flow only to the synthetic reread result and refusal assertion.

### 9.5 Injected mechanical failure

One injected operation may throw or return a short/zero-progress result for each authorised response/receipt write, flush, close, rename, directory-flush, reread, hash, serialize, parse, verify, and seal boundary. The failure is authorised only inside the private test fixture and must end in `PRESERVATION_INCOMPLETE`, zero checker calls, and zero retry.

### 9.6 Checker exception probe

A fictional checker callback may throw one fixed synthetic `Error` only after `PRESERVATION_VERIFIED`. The test must then independently confirm final response/receipt identity. The checker receives only the verified reference.

Any probe not matching Sections 9.1-9.6 exactly is `UNAUTHORISED_TEST_PROBE`.

## 10. Literal and Data Separation

The following are non-executable data only when their AST ancestry proves they are string/template/property-name literals and no value flows to a callee, constructor, dynamic property invocation, import, output, or returned capability:

1. denied member names in Section 9.1;
2. prohibited-category words used in source scans or assertions;
3. fictional response content and its raw/base64/hex/JSON-escaped sentinels used only for leakage assertions;
4. synthetic event labels and operation names;
5. test titles and assertion messages;
6. receipt-field names used for exact allowlist checks.

A value leaving these data-only positions is reclassified by its actual executable use. Production string occurrence never proves a capability edge, and test location never automatically excuses one.

## 11. Enumeration and Completeness Policy

For each source role, one complete canonical enumeration must include:

1. source identity and parser diagnostics;
2. every import declaration and imported binding;
3. every export declaration and exported name;
4. every call expression with normalized callee and resolved provenance;
5. every new expression with normalized constructor and provenance;
6. every executable property access with receiver provenance and read/call/write role;
7. every public declaration and member with declaration kind, required/optional, readonly/mutable, and normalized type shape;
8. every static dependency edge;
9. every prohibited-category finding;
10. every authorised test probe;
11. every test literal/falsifier-data record;
12. every ordinary literal relevant to a public status or edge classification;
13. every unknown, overlap, or ambiguity.

Completeness requires:

1. exactly one parse and one governed traversal per role;
2. a monotonically assigned preorder node ID for every visited AST node;
3. unique record IDs composed from role, node ID, and record kind;
4. every governed AST node produces the required record or an explicit non-governed-node reason;
5. record counts equal counts recomputed from the independently reread capture;
6. no parser diagnostic, skipped subtree, unresolved executable provenance, duplicate record, missing classification, or second traversal.

## 12. Canonical Evidence Capture Policy

The measurement produces exactly three complete artefacts in one newly created machine-local directory outside the repository:

1. `production.enumeration.json`;
2. `focused-test.enumeration.json`;
3. `combined.decision.json`.

Each artefact:

1. uses UTF-8 with no BOM and no terminal newline;
2. is stable-serialized recursively with object keys in ascending Unicode code-point order and arrays in governed enumeration order;
3. is created exclusively with owner-only permissions;
4. is written completely, flushed, closed, and never overwritten;
5. is independently reopened and reread;
6. has captured/reread byte lengths and SHA-256 identities compared;
7. is parsed and schema-validated after reread;
8. has every array count and decision recomputed and compared with in-memory measurement;
9. fails permanently on any write, close, reread, parse, schema, count, length, hash, or equality difference.

Complete artefacts are measurement transport only. They are not repository Evidence, implementation output, acceptance, or permission.

## 13. Bounded Manifest Policy

Only after all three complete artefacts pass Section 12 may one terminal manifest be emitted. Its UTF-8 byte length must not exceed `4096`, and it contains only:

1. schema `HH-CHECK-5-BOUNDED-MANIFEST-1`;
2. policy schema and canonical payload identity;
3. exact instrument byte length/SHA-256 supplied by the external Authority gate;
4. repository package anchor identity and TypeScript version `5.9.3`;
5. per-role source/capture/reread byte lengths and SHA-256 values;
6. parser diagnostic and complete enumeration counts;
7. counts for imports, bindings, exports, calls, new expressions, executable property accesses, public declarations/members, dependency edges, literals/data, authorised probes, ambiguities, denied public capabilities, and each prohibited category;
8. exact observed public declaration/status/result/reference member names;
9. per-allowlist equality booleans;
10. stderr byte count;
11. per-role decisions and one combined `PASS` or `FAIL`.

No complete enumeration, source content, response content, machine-local capture path, stack trace, or later governance decision may be printed.

## 14. One-Use and Stop Policy

1. An external Authority gate must verify exact instrument byte length/SHA-256 before launch.
2. The instrument must bind the repository root/package anchor and TypeScript `5.9.3` through repository-anchored CommonJS `createRequire` with no fallback.
3. One exclusive machine-local one-use token must be acquired immediately before the first governed source-byte read.
4. The first governed source-byte read consumes Check 5 Authority.
5. Each source may be read once, parsed once, and traversed once.
6. Any missing path, identity mismatch, parser diagnostic, unknown/overlap, prohibited finding, capture failure, second operation, alternate mode, or scope-widening need stops permanently.
7. No repair, retry, alternate launch, substitute instrument, second traversal, fallback, or terminal reconstruction exists.
8. PASS and FAIL both stop after Check 5.
9. No Check 6, source edit, implementation acceptance, harness, contribution, delivery, Memory, Learning, Reflection, feedback, Action, or semantic consequence follows.

## 15. Canonical Payload Encoding

The normative machine payload is the JSON object in Section 16, excluding the fence and marker lines. Its canonical bytes are produced by:

1. parsing that JSON exactly once;
2. serializing null/boolean/number/string with JSON primitives;
3. serializing arrays in stated order without whitespace;
4. serializing objects with keys sorted in ascending Unicode code-point order without whitespace;
5. UTF-8 encoding with no BOM and no terminal newline.

The canonical payload identity is recorded after direct validation of this new specification:

```text
canonicalByteLength=6350
canonicalSha256=ff71059e5fbad04831bf8cbc6d408b44b265d8657446a1fe8c2b0c8e8d972186
```

## 16. Normative Machine Payload

<!-- HH_CHECK_5_POLICY_PAYLOAD_BEGIN -->
```json
{
  "schema": "HH-CHECK-5-CLOSED-MEASUREMENT-POLICY-1",
  "decisionSemantics": {
    "ambiguity": "FAIL",
    "check6": "NOT_RUN",
    "implementationAcceptance": "UNACCEPTED",
    "prohibitedCategoryRequiredCount": 0,
    "unknown": "FAIL"
  },
  "sourceRoles": [
    {
      "role": "PRODUCTION",
      "path": "scripts/academy/support/responseEvidenceCapture.ts",
      "bytes": 16125,
      "sha256": "f986633d8dd0984b385320f61a2d4a38f593284690db3d03ff4d3f10614aacfe"
    },
    {
      "role": "FOCUSED_TEST",
      "path": "scripts/academy/support/__tests__/responseEvidenceCapture.test.ts",
      "bytes": 25324,
      "sha256": "6b56cae73f1dcf8db64bb9a41137b16d46897bc656802a6530a3fe45843eb53f"
    }
  ],
  "publicApi": {
    "declarations": [
      { "kind": "typeAlias", "name": "ResponseCaptureDispositionRule" },
      { "kind": "interface", "name": "CaptureResponseEvidenceOptions" },
      { "kind": "interface", "name": "VerifiedResponseCaptureReference" },
      { "kind": "typeAlias", "name": "ResponseCaptureOutcome" },
      { "kind": "function", "name": "preserveResponseEvidence" }
    ],
    "dispositionLiterals": [
      "DELETE_WHEN_DUE",
      "SEPARATE_AUTHORITY_REQUIRED_FOR_TRANSFER_OR_DELIVERY"
    ],
    "optionsMembers": [
      { "name": "response", "required": true, "readonly": true, "type": "string" },
      { "name": "attemptId", "required": true, "readonly": true, "type": "string" },
      { "name": "authorityDocumentId", "required": true, "readonly": true, "type": "string" },
      { "name": "externalCaptureRoot", "required": true, "readonly": true, "type": "string" },
      { "name": "accessOwner", "required": true, "readonly": true, "type": "string" },
      { "name": "reviewPurpose", "required": true, "readonly": true, "type": "string" },
      { "name": "retainUntil", "required": true, "readonly": true, "type": "string" },
      { "name": "dispositionRule", "required": true, "readonly": true, "type": "ResponseCaptureDispositionRule" },
      { "name": "now", "required": true, "readonly": true, "type": "() => Date" }
    ],
    "referenceMembers": [
      { "name": "attemptId", "required": true, "readonly": true, "type": "string" },
      { "name": "byteLength", "required": true, "readonly": true, "type": "number" },
      { "name": "sha256", "required": true, "readonly": true, "type": "string" },
      { "name": "readBytes", "required": true, "readonly": true, "type": "() => Uint8Array" }
    ],
    "outcomes": [
      {
        "status": "PRESERVATION_VERIFIED",
        "members": [
          { "name": "status", "required": true, "readonly": true, "type": "PRESERVATION_VERIFIED" },
          { "name": "reference", "required": true, "readonly": true, "type": "VerifiedResponseCaptureReference" }
        ]
      },
      {
        "status": "PRESERVATION_INCOMPLETE",
        "members": [
          { "name": "status", "required": true, "readonly": true, "type": "PRESERVATION_INCOMPLETE" },
          { "name": "attemptId", "required": true, "readonly": true, "type": "string" }
        ]
      }
    ],
    "function": {
      "name": "preserveResponseEvidence",
      "parameters": [
        { "name": "options", "required": true, "type": "CaptureResponseEvidenceOptions" }
      ],
      "returnType": "ResponseCaptureOutcome"
    }
  },
  "imports": {
    "PRODUCTION": [
      { "module": "node:crypto", "kind": "namedValue", "bindings": ["createHash"] },
      { "module": "node:fs", "kind": "defaultValue", "bindings": ["fs"] },
      { "module": "node:path", "kind": "defaultValue", "bindings": ["path"] },
      { "module": "../../support/repositoryRoot", "kind": "namedValue", "bindings": ["resolveRepositoryRootFromDirectory"] }
    ],
    "FOCUSED_TEST": [
      { "module": "node:crypto", "kind": "namedValue", "bindings": ["createHash"] },
      { "module": "node:fs", "kind": "defaultValue", "bindings": ["fs"] },
      { "module": "node:os", "kind": "defaultValue", "bindings": ["os"] },
      { "module": "node:path", "kind": "defaultValue", "bindings": ["path"] },
      { "module": "@jest/globals", "kind": "namedValue", "bindings": ["describe", "expect", "it", "jest"] },
      { "module": "../../../support/repositoryRoot", "kind": "namedValue", "bindings": ["resolveRepositoryRootFromDirectory"] },
      { "module": "../responseEvidenceCapture", "kind": "namedMixed", "typeBindings": ["CaptureResponseEvidenceOptions", "ResponseCaptureOutcome"], "valueBindings": ["preserveResponseEvidence"] }
    ]
  },
  "classificationPrecedence": [
    "PARSER_DIAGNOSTIC",
    "PUBLIC_API",
    "IMPORT_EDGE",
    "PROHIBITED_EXECUTABLE_EDGE",
    "AUTHORISED_TEST_PROBE",
    "TEST_LITERAL_OR_FALSIFIER_DATA",
    "PERMITTED_MECHANICAL_EDGE",
    "ORDINARY_LITERAL",
    "UNKNOWN_OR_AMBIGUOUS"
  ],
  "permittedEdgeClasses": [
    "PERMITTED_LOCAL_PRIVATE",
    "PERMITTED_CRYPTO_IDENTITY",
    "PERMITTED_EXTERNAL_FILESYSTEM_PRESERVATION",
    "PERMITTED_PATH_CONFINEMENT",
    "PERMITTED_REPOSITORY_ROOT_EXCLUSION",
    "PERMITTED_LOCAL_BYTE_OPERATION",
    "PERMITTED_DETERMINISTIC_DATA_OPERATION",
    "PERMITTED_INPUT_VALIDATION",
    "PERMITTED_JEST_ASSERTION_OR_MOCK",
    "PERMITTED_SYNTHETIC_TEST_FIXTURE"
  ],
  "prohibitedCategories": [
    "PROHIBITED_IMPORT_OR_DYNAMIC_LOAD",
    "COGNITIVE_OR_SEMANTIC_EDGE",
    "CASE_001_OR_REPOSITORY_SERVICE_EDGE",
    "NETWORK_TELEMETRY_OR_ANALYTICS_EDGE",
    "UI_CLIPBOARD_SHARE_OR_DISPLAY_EDGE",
    "LOGGING_OR_TERMINAL_OUTPUT_EDGE",
    "DELIVERY_TRANSFER_OR_CONTRIBUTION_EDGE",
    "RETRY_FEEDBACK_SECOND_TURN_OR_ACTION_EDGE",
    "PUBLIC_PATH_ROOT_OR_DESCRIPTOR_CAPABILITY",
    "PUBLIC_MUTATION_OR_LIFECYCLE_CAPABILITY",
    "PUBLIC_PERMISSION_OR_SEMANTIC_RESULT",
    "RESPONSE_TRANSFORMATION_OR_EGRESS",
    "REPOSITORY_OR_UNAUTHORISED_WRITE",
    "DYNAMIC_EXECUTION_OR_PROCESS_CONTROL",
    "ENVIRONMENT_OR_COMPILER_FALLBACK",
    "UNAUTHORISED_TEST_PROBE",
    "UNKNOWN_OR_AMBIGUOUS_EXECUTABLE_EDGE"
  ],
  "authorisedProbeClasses": [
    "DENIED_PUBLIC_MEMBER_LOOKUP_ASSERTION",
    "FRESH_COPY_MUTATION_ASSERTION",
    "FROZEN_OBJECT_MUTATION_ASSERTION",
    "SYNTHETIC_CORRUPTION_TRANSFORM",
    "INJECTED_MECHANICAL_FAILURE",
    "CHECKER_EXCEPTION_AFTER_VERIFICATION"
  ],
  "enumerationKinds": [
    "SOURCE_IDENTITY",
    "PARSER_DIAGNOSTIC",
    "IMPORT_DECLARATION",
    "IMPORTED_BINDING",
    "EXPORT_DECLARATION",
    "EXPORTED_NAME",
    "CALL_EXPRESSION",
    "NEW_EXPRESSION",
    "EXECUTABLE_PROPERTY_ACCESS",
    "PUBLIC_DECLARATION",
    "PUBLIC_MEMBER",
    "DEPENDENCY_EDGE",
    "PROHIBITED_FINDING",
    "AUTHORISED_TEST_PROBE",
    "TEST_LITERAL_OR_FALSIFIER_DATA",
    "ORDINARY_LITERAL",
    "UNKNOWN_OR_AMBIGUOUS"
  ],
  "capture": {
    "schema": "HH-CHECK-5-COMPLETE-CAPTURE-1",
    "files": [
      "production.enumeration.json",
      "focused-test.enumeration.json",
      "combined.decision.json"
    ],
    "encoding": "UTF-8-NO-BOM-NO-TERMINAL-NEWLINE",
    "objectKeyOrder": "ASCENDING_UNICODE_CODE_POINT",
    "arrayOrder": "GOVERNED_ENUMERATION_ORDER",
    "independentVerification": [
      "CLOSE",
      "REOPEN",
      "REREAD",
      "PARSE",
      "SCHEMA",
      "COUNT",
      "BYTE_LENGTH",
      "SHA256",
      "IN_MEMORY_EQUALITY"
    ]
  },
  "manifest": {
    "schema": "HH-CHECK-5-BOUNDED-MANIFEST-1",
    "maxBytes": 4096,
    "completeEnumerationTerminalOutput": false,
    "decisions": ["PASS", "FAIL"]
  },
  "cardinality": {
    "governedSourceReadsPerRole": 1,
    "parsesPerRole": 1,
    "traversalsPerRole": 1,
    "manifestCount": 1,
    "retryCount": 0,
    "fallbackCount": 0,
    "check6Count": 0
  },
  "consumption": {
    "event": "FIRST_COMPLETE_GOVERNED_SOURCE_BYTE_READ",
    "oneUseToken": "EXCLUSIVE_MACHINE_LOCAL_TOKEN_BEFORE_SOURCE_READ",
    "passAction": "STOP",
    "failAction": "STOP"
  }
}
```
<!-- HH_CHECK_5_POLICY_PAYLOAD_END -->

## 17. Closure Decision

The policy dependency is now closed prospectively at the governance layer:

1. exact public declarations, member names, statuses, and type shapes are fixed;
2. production and test imports are fixed;
3. permitted mechanical classes and their provenance/purpose constraints are fixed;
4. prohibited categories are closed and require zero findings;
5. authorised probes have a closed structural grammar;
6. unknown, overlap, unresolved provenance, and unlisted probes fail;
7. enumeration, capture, manifest, cardinality, consumption, and stop semantics are fixed.

Closure does not establish that the uninspected implementation conforms. It only provides the trustworthy baseline a later instrument could enforce.

## 18. Authority and Stop State

**Authority granted:** None.

**Authority withheld:**

1. measurement-instrument implementation, generation, static acceptance, testing, or readiness execution;
2. Check 5 or Check 6 execution;
3. governed implementation-source access;
4. modification or reuse of the exact readiness-only artefact;
5. source, test, repository support, package, configuration, dependency, or generated-index edit;
6. implementation acceptance;
7. harness, contribution, delivery, Memory, Learning, Reflection, feedback, Action, or semantic consequence.

```text
HH-0000 CHECK 5 CLOSED MACHINE-ENCODABLE MEASUREMENT POLICY SPECIFICATION AUTHORED - CANONICAL PAYLOAD 6350 BYTES SHA256 FF71059E5FBAD04831BF8CBC6D408B44B265D8657446A1FE8C2B0C8E8D972186 - POLICY VALUES ARE PROSPECTIVE GOVERNANCE REQUIREMENTS NOT IMPLEMENTATION OBSERVATIONS - EXACT TWO SOURCE IDENTITIES FIXED - FIVE PUBLIC DECLARATIONS TWO DISPOSITION LITERALS NINE OPTION MEMBERS FOUR VERIFIED-REFERENCE MEMBERS TWO OUTCOME VARIANTS AND ONE PUBLIC FUNCTION BOUNDARY FIXED - IMPORTS FIXED - TOTAL CLASSIFICATION PRECEDENCE CLOSED - PERMITTED MECHANICAL CLASSES CLOSED BY RECEIVER PROVENANCE DESTINATION AND PURPOSE - SEVENTEEN PROHIBITED CATEGORIES REQUIRE ZERO - SIX AUTHORISED TEST-PROBE GRAMMARS CLOSED - UNKNOWN OVERLAP DYNAMIC OR UNRESOLVED CLASSIFICATION FAILS - COMPLETE ENUMERATION THREE CANONICAL OFF-TERMINAL ARTEFACTS INDEPENDENT REREAD VERIFICATION ONE 4096-BYTE-MAXIMUM MANIFEST ONE SOURCE READ PARSE AND TRAVERSAL PER ROLE ZERO RETRY FALLBACK OR CHECK 6 - FIRST COMPLETE GOVERNED SOURCE READ CONSUMES - PASS OR FAIL STOPS - NO IMPLEMENTATION OR EXECUTION AUTHORITY - CHECK 5 UNMEASURED - CHECK 6 NOT RUN - IMPLEMENTATION UNACCEPTED - STOP
```

Closed Check 5 policy specification stops here.