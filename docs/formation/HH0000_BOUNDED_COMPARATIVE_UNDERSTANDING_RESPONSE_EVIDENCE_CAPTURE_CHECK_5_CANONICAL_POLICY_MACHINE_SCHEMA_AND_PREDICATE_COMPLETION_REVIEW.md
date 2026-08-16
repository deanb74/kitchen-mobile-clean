# HH-0000 Check 5 Canonical Policy Machine-Schema and Predicate Completion Review

**Status:** OUTCOME 1 - SIX MACHINE-POLICY AREAS COMPLETED - NO CANDIDATE, INSTRUMENT, OR EXECUTION AUTHORITY
**Review date:** 2026-08-14
**Review type:** Strictly documentation-only prospective machine-policy completion review
**Controlling review:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_CANDIDATE_POLICY_CORRECTION_AUTHORITY_REVIEW.md`
**Historical candidate:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_CLOSED_MACHINE_ENCODABLE_MEASUREMENT_POLICY_SPECIFICATION.md`
**Historical candidate canonical byte length:** `6350`
**Historical candidate canonical SHA-256:** `ff71059e5fbad04831bf8cbc6d408b44b265d8657446a1fe8c2b0c8e8d972186`
**Historical candidate classification:** `HISTORICAL_CANDIDATE_POLICY_EVIDENCE`
**Governed implementation-source access:** None
**Candidate effect:** None - no candidate specification or canonical payload was created, edited, overwritten, corrected, relabelled, frozen, or adopted
**Instrument effect:** None - no instrument was built, modified, inspected, validated, or executed
**Check 5:** Not run; governed quantity remains `UNMEASURED`
**Check 6:** `NOT RUN`
**Implementation:** `UNACCEPTED`
**Authority effect:** No candidate-correction, instrument-implementation, Check 5 execution, Check 6, or acceptance Authority granted

# Repository Traceability

**Principle:** Truth before certainty; evidence before claims; human Authority; smallest justified change.
**Theory:** Prospective measuring policy must be complete independently of the implementation it will later measure.
**Architecture:** One self-contained canonical payload, total structural classification, complete enumeration, verified transport, one-use execution, and mandatory stop.
**Engineering:** Closed selector algebra, finite enums, exact operation and prohibition predicates, exact probe-flow records, closed capture schemas, and canonical one-use events.
**Milestone:** Not Applicable.
**Evidence:** This documentation-only policy decision. No candidate payload, implementation observation, instrument, Check 5, Check 6, or acceptance Evidence is produced.

## 1. Sole Governance Question

> Can the six machine-policy gaps identified by the controlling Candidate Policy Correction Authority Review be settled exactly, prospectively, and without governed-source observation, candidate authoring, instrument work, or execution?

**Yes.** Sections 4 through 9 provide closed machine meanings for CPD-D3, CPD-D4, CPD-D5, CPD-D6, CPD-D7, and CPD-D9. Every enum is finite, every object is closed, every matcher has explicit selectors, every capture field has a type and derivation, and every one-use event has canonical validation rules.

**Selected outcome: Outcome 1 - all six machine-policy areas completed.**

Completion means that a later candidate author could encode these decisions without choosing matcher scope, enum membership, field meaning, validation behavior, timestamp format, or lifecycle semantics. It does not mean that a candidate exists or that correction Authority is live.

## 2. Strict Review Boundary

This review used only:

1. the Candidate Policy Correction Authority Review;
2. the Canonical Policy Unresolved Decisions Review;
3. the Candidate Policy Defect Responsibility and Correction-Authority Review;
4. the historical candidate specification for preserved identity and terminology;
5. the Formation Authoring Standard as the governing authoring standard.

This review did not:

1. inspect, open, read, hash, parse, or otherwise access either governed implementation source;
2. inspect or use implementation shape to select any policy value;
3. edit the historical candidate or create a corrected candidate or canonical payload;
4. inspect, build, modify, run, or validate an instrument;
5. run Check 5, Check 6, tests, typecheck, ESLint, or any instrument;
6. perform implementation acceptance;
7. grant correction or execution Authority.

Only this review record is created.

## 3. Historical Candidate and Stop-State Preservation

```text
canonicalByteLength=6350
canonicalSha256=ff71059e5fbad04831bf8cbc6d408b44b265d8657446a1fe8c2b0c8e8d972186
classification=HISTORICAL_CANDIDATE_POLICY_EVIDENCE
edited=false
overwritten=false
correctedInPlace=false
relabelled=false
frozen=false
adoptedAsFinal=false
check5=UNMEASURED
check6=NOT_RUN
implementation=UNACCEPTED
```

The historical identity establishes only what prior reviews assessed. Nothing in this review changes its bytes, status, correctness, closure, or Authority effect.

## 4. CPD-D3 - Closed Structural Predicate Schema and Enums

### 4.1 Closed selector algebra

Every selector is exactly one of:

```json
{ "mode": "ANY" }
{ "mode": "ONE_OF", "values": ["ONE_OR_MORE_UNIQUE_CLOSED_ENUM_VALUES"] }
{ "mode": "NONE_OF", "values": ["ONE_OR_MORE_UNIQUE_CLOSED_ENUM_VALUES"] }
```

Rules are:

1. `values` is prohibited for `ANY` and required for `ONE_OF` or `NONE_OF`;
2. values are unique and sorted by ascending Unicode code point;
3. selectors are conjunctive across fields and disjunctive within `values`;
4. absent fields, `null`, empty arrays, regex, glob, executable expressions, coercion, and implicit defaults are invalid;
5. `UNKNOWN` is an ordinary enum fact and never acts as a wildcard;
6. all object schemas in Sections 4 through 9 have `additionalProperties=false`.

### 4.2 Closed fact enums

```text
SourceRole = PRODUCTION | FOCUSED_TEST
NodeKind = CALL | NEW | PROPERTY_READ | PROPERTY_WRITE | IMPORT | PUBLIC_DECLARATION | PUBLIC_MEMBER | LITERAL | DEPENDENCY
ProvenanceKind = IMPORT_BINDING | LOCAL_DECLARATION | PARAMETER | BUILTIN_GLOBAL | PUBLIC_VALUE | LITERAL | SYNTHETIC_FIXTURE | UNKNOWN
OperationKind = CALL | NEW | READ | WRITE | IMPORT | DECLARE | FLOW
Phase = PROHIBITED | TERMINAL
TerminalClass = PUBLIC_API | IMPORT_EDGE | AUTHORISED_TEST_PROBE | TEST_LITERAL_OR_FALSIFIER_DATA | PERMITTED_MECHANICAL_EDGE | ORDINARY_LITERAL
Classification = one TerminalClass value or one ProhibitedCategory value
```

Closed roots:

```text
node:crypto/createHash node:fs node:path node:os @jest/globals
../../support/repositoryRoot ../../../support/repositoryRoot ../responseEvidenceCapture
Buffer Uint8Array JSON Object Array Number Date RegExp Error Set Map Reflect
LOCAL_PRIVATE PRIVATE_SEAM EXPECT_CHAIN SYNTHETIC_FIXTURE PUBLIC_VALUE UNKNOWN
```

Closed data labels:

```text
SOURCE_STRING SOURCE_BYTES PERSISTED_RESPONSE_BYTES RECEIPT_BYTES POLICY_BYTES
INSTRUMENT_BYTES HASH_HEX BYTE_LENGTH GOVERNANCE_FIELD TIMESTAMP PATH_SEGMENT
REPOSITORY_PRECONDITION_PATH EXTERNAL_ROOT_PATH ATTEMPT_PATH SUITE_ROOT_PATH
FILE_DESCRIPTOR BOOLEAN NUMBER JSON_LOCAL LOCAL_COLLECTION PUBLIC_OUTCOME
PUBLIC_REFERENCE DENIED_MEMBER_LITERAL FICTIONAL_RESPONSE FICTIONAL_BYTES
CORRUPTED_FICTIONAL_BYTES ERROR_CONTENT_FREE UNKNOWN
```

Closed destination labels:

```text
NONE LOCAL_ONLY HASH_STATE ATTEMPT_TEMP_RESPONSE ATTEMPT_FINAL_RESPONSE
ATTEMPT_TEMP_RECEIPT ATTEMPT_FINAL_RECEIPT SUITE_OWNED_TEST_ROOT
EXPECT_ASSERTION PUBLIC_RETURN ERROR_VALUE OUTPUT REPOSITORY NETWORK
CALLBACK RETAINED_STATE UNKNOWN
```

Closed flow labels:

```text
NONE ARGUMENT_TO_CALL RECEIVER_OF_CALL CONSTRUCTOR_INPUT PROPERTY_READ_RESULT
PROPERTY_WRITE_VALUE RETURN_VALUE CALLBACK_ARGUMENT CLOSURE_CAPTURE
MODULE_SCOPE_STORE COLLECTION_STORE JSON_CONTENT HASH_INPUT HASH_OUTPUT
FILESYSTEM_PATH FILESYSTEM_CONTENT PUBLIC_MEMBER_VALUE ASSERTION_INPUT
ERROR_MESSAGE OUTPUT_CONTENT UNKNOWN
```

Closed ancestry relations:

```text
IN_PRODUCTION_MODULE IN_FOCUSED_TEST_MODULE IN_IMPORTED_JEST_IT_CALLBACK
IN_IMPORTED_JEST_IT_EACH_CALLBACK IN_EXPECT_ASSERTION_CALLBACK
IN_SAME_CALL_PRIVATE_HELPER IN_MODULE_SCOPE IN_RETURN_EXPRESSION
IN_LOOP_OR_RETRY IN_ASYNC_SCHEDULE IN_PUBLIC_DECLARATION
POSTDOMINATED_BY_REQUIRED_ASSERTION ESCAPES_TEST_CALLBACK UNKNOWN
```

### 4.3 Closed predicate record

Every predicate record has exactly:

```json
{
  "id": "UNIQUE_ASCII_ID",
  "phase": "PROHIBITED_OR_TERMINAL",
  "sourceRoles": { "mode": "ONE_OF", "values": ["CLOSED_SOURCE_ROLE"] },
  "nodeKinds": { "mode": "ONE_OF", "values": ["CLOSED_NODE_KIND"] },
  "provenanceKinds": { "mode": "ONE_OF", "values": ["CLOSED_PROVENANCE_KIND"] },
  "roots": { "mode": "ONE_OF", "values": ["CLOSED_ROOT"] },
  "operations": { "mode": "ONE_OF", "values": ["CLOSED_OPERATION_ID"] },
  "argumentConstraints": [
    {
      "index": 0,
      "provenanceKinds": { "mode": "ANY" },
      "dataLabels": { "mode": "ONE_OF", "values": ["CLOSED_DATA_LABEL"] }
    }
  ],
  "destinationLabels": { "mode": "ONE_OF", "values": ["CLOSED_DESTINATION_LABEL"] },
  "dataFlows": { "mode": "ONE_OF", "values": ["CLOSED_FLOW_LABEL"] },
  "ancestryAll": { "mode": "ANY" },
  "ancestryNone": { "mode": "ANY" },
  "classification": "CLOSED_CLASSIFICATION"
}
```

`argumentConstraints` is sorted by unique non-negative `index`; use `[]` when arguments are irrelevant. A fact matches only when every selector and every indexed argument constraint matches. Static resolution must produce one root and one operation or the fact uses `UNKNOWN`. All prohibited predicates are evaluated first; any match fails. With zero prohibited matches, all terminal predicates are evaluated; zero terminal matches fails `UNKNOWN`, and more than one fails `AMBIGUOUS`. No order or precedence rescues a match.

## 5. CPD-D4 - Complete Permitted-Operation Predicate Records

### 5.1 Closed operation IDs

The closed operation enum is exactly the IDs in this section plus the probe-only IDs in Section 7. No operation may be inferred from spelling alone.

Each row below is one complete D3 predicate record after applying these fixed columns:

```text
phase=TERMINAL
classification=PERMITTED_MECHANICAL_EDGE
nodeKinds=CALL except entries ending _READ, which use PROPERTY_READ, and constructors, which use NEW
provenanceKinds=IMPORT_BINDING or BUILTIN_GLOBAL, except LOCAL_PRIVATE_CALL=LOCAL_DECLARATION and PRIVATE_SEAM_*=PARAMETER
ancestryNone=IN_LOOP_OR_RETRY,IN_ASYNC_SCHEDULE
```

`ANY` in a table cell means the exact `{ "mode": "ANY" }` selector. Comma-separated values mean one exact `ONE_OF` selector. No omitted column exists.

| Operation ID | Roles | Root | Arguments/data labels | Destinations | Flows |
| --- | --- | --- | --- | --- | --- |
| `CRYPTO_CREATE_HASH_SHA256` | both | `node:crypto/createHash` | 0=`GOVERNANCE_FIELD` exact literal `sha256` | `HASH_STATE` | `ARGUMENT_TO_CALL` |
| `HASH_UPDATE` | both | `LOCAL_PRIVATE` | 0=`SOURCE_BYTES,PERSISTED_RESPONSE_BYTES,RECEIPT_BYTES,POLICY_BYTES,INSTRUMENT_BYTES,FICTIONAL_BYTES` | `HASH_STATE` | `HASH_INPUT` |
| `HASH_DIGEST_HEX` | both | `LOCAL_PRIVATE` | 0=`GOVERNANCE_FIELD` exact literal `hex` | `LOCAL_ONLY` | `HASH_OUTPUT` |
| `FS_REALPATH` | both | `node:fs,PRIVATE_SEAM` | 0=`REPOSITORY_PRECONDITION_PATH,EXTERNAL_ROOT_PATH,ATTEMPT_PATH,SUITE_ROOT_PATH` | `LOCAL_ONLY` | `FILESYSTEM_PATH` |
| `FS_LSTAT` | both | `node:fs,PRIVATE_SEAM` | same as `FS_REALPATH` | `LOCAL_ONLY` | `FILESYSTEM_PATH` |
| `FS_STAT` | both | `node:fs,PRIVATE_SEAM` | same as `FS_REALPATH` | `LOCAL_ONLY` | `FILESYSTEM_PATH` |
| `FS_EXISTS` | both | `node:fs,PRIVATE_SEAM` | same as `FS_REALPATH` | `LOCAL_ONLY` | `FILESYSTEM_PATH` |
| `FS_MKDIR` | both | `node:fs,PRIVATE_SEAM` | 0=`ATTEMPT_PATH,SUITE_ROOT_PATH`; 1=`NUMBER` owner-only | `ATTEMPT_TEMP_RESPONSE,ATTEMPT_TEMP_RECEIPT,SUITE_OWNED_TEST_ROOT` | `FILESYSTEM_PATH` |
| `FS_OPEN_EXCLUSIVE` | both | `node:fs,PRIVATE_SEAM` | 0=`ATTEMPT_PATH`; 1=`GOVERNANCE_FIELD` exact `wx`; 2=`NUMBER` exact `384` | `ATTEMPT_TEMP_RESPONSE,ATTEMPT_TEMP_RECEIPT` | `FILESYSTEM_PATH` |
| `FS_WRITE` | both | `node:fs,PRIVATE_SEAM` | 0=`FILE_DESCRIPTOR`; 1=`SOURCE_BYTES,RECEIPT_BYTES,FICTIONAL_BYTES`; 2-4=`NUMBER` | `ATTEMPT_TEMP_RESPONSE,ATTEMPT_TEMP_RECEIPT` | `FILESYSTEM_CONTENT` |
| `FS_FSYNC` | both | `node:fs,PRIVATE_SEAM` | 0=`FILE_DESCRIPTOR` | `ATTEMPT_TEMP_RESPONSE,ATTEMPT_TEMP_RECEIPT` | `ARGUMENT_TO_CALL` |
| `FS_CLOSE` | both | `node:fs,PRIVATE_SEAM` | 0=`FILE_DESCRIPTOR` | `ATTEMPT_TEMP_RESPONSE,ATTEMPT_TEMP_RECEIPT` | `ARGUMENT_TO_CALL` |
| `FS_RENAME` | both | `node:fs,PRIVATE_SEAM` | 0-1=`ATTEMPT_PATH`; same-directory corresponding temp-to-final only | `ATTEMPT_FINAL_RESPONSE,ATTEMPT_FINAL_RECEIPT` | `FILESYSTEM_PATH` |
| `FS_READ_FILE` | both | `node:fs,PRIVATE_SEAM` | 0=`ATTEMPT_PATH,SUITE_ROOT_PATH` | `LOCAL_ONLY` | `FILESYSTEM_CONTENT` |
| `FS_REMOVE_BOUNDED` | both | `node:fs,PRIVATE_SEAM` | 0=`ATTEMPT_PATH,SUITE_ROOT_PATH`; 1=`BOOLEAN` | `ATTEMPT_TEMP_RESPONSE,ATTEMPT_TEMP_RECEIPT,SUITE_OWNED_TEST_ROOT` | `FILESYSTEM_PATH` |
| `PATH_RESOLVE` | both | `node:path` | all=`PATH_SEGMENT,REPOSITORY_PRECONDITION_PATH,EXTERNAL_ROOT_PATH,ATTEMPT_PATH,SUITE_ROOT_PATH` | `LOCAL_ONLY` | `ARGUMENT_TO_CALL` |
| `PATH_JOIN` | both | `node:path` | same as `PATH_RESOLVE` | `LOCAL_ONLY` | `ARGUMENT_TO_CALL` |
| `PATH_RELATIVE` | both | `node:path` | 0-1=path labels | `LOCAL_ONLY` | `ARGUMENT_TO_CALL` |
| `PATH_DIRNAME` | both | `node:path` | 0=path labels | `LOCAL_ONLY` | `ARGUMENT_TO_CALL` |
| `PATH_BASENAME` | both | `node:path` | 0=path labels | `LOCAL_ONLY` | `ARGUMENT_TO_CALL` |
| `PATH_IS_ABSOLUTE` | both | `node:path` | 0=path labels | `LOCAL_ONLY` | `ARGUMENT_TO_CALL` |
| `PATH_SEP_READ` | both | `node:path` | none | `LOCAL_ONLY` | `PROPERTY_READ_RESULT` |
| `REPOSITORY_ROOT_RESOLVE` | both | role-specific repository-root import | 0=`REPOSITORY_PRECONDITION_PATH` | `LOCAL_ONLY` | `ARGUMENT_TO_CALL` |
| `BUFFER_FROM_UTF8` | both | `Buffer` | 0=`SOURCE_STRING,FICTIONAL_RESPONSE`; 1 exact literal `utf8` | `LOCAL_ONLY` | `ARGUMENT_TO_CALL` |
| `BUFFER_COMPARE` | both | `Buffer` | 0-1=byte labels | `LOCAL_ONLY` | `ARGUMENT_TO_CALL` |
| `BUFFER_IS_BUFFER` | both | `Buffer` | 0=byte labels | `LOCAL_ONLY` | `ARGUMENT_TO_CALL` |
| `UINT8ARRAY_FROM` | both | `Uint8Array` | 0=byte labels | `LOCAL_ONLY` | `ARGUMENT_TO_CALL` |
| `BYTE_SLICE` | both | `LOCAL_PRIVATE` | 0-1=`NUMBER` | `LOCAL_ONLY` | `RECEIVER_OF_CALL` |
| `BYTE_LENGTH_READ` | both | `LOCAL_PRIVATE` | none | `LOCAL_ONLY` | `PROPERTY_READ_RESULT` |
| `JSON_STRINGIFY` | both | `JSON` | 0=`JSON_LOCAL` | `LOCAL_ONLY` | `JSON_CONTENT` |
| `JSON_PARSE` | both | `JSON` | 0=`JSON_LOCAL` | `LOCAL_ONLY` | `JSON_CONTENT` |
| `OBJECT_FREEZE` | both | `Object` | 0=`PUBLIC_OUTCOME,PUBLIC_REFERENCE,JSON_LOCAL` | `LOCAL_ONLY` | `ARGUMENT_TO_CALL` |
| `OBJECT_KEYS` | both | `Object` | 0=`PUBLIC_OUTCOME,PUBLIC_REFERENCE,JSON_LOCAL` | `LOCAL_ONLY,EXPECT_ASSERTION` | `ARGUMENT_TO_CALL` |
| `OBJECT_VALUES` | both | `Object` | 0=`JSON_LOCAL` | `LOCAL_ONLY` | `ARGUMENT_TO_CALL` |
| `OBJECT_ENTRIES` | both | `Object` | 0=`JSON_LOCAL` | `LOCAL_ONLY` | `ARGUMENT_TO_CALL` |
| `ARRAY_IS_ARRAY` | both | `Array` | 0=`JSON_LOCAL,LOCAL_COLLECTION` | `LOCAL_ONLY` | `ARGUMENT_TO_CALL` |
| `ARRAY_MAP` | both | `LOCAL_PRIVATE` | callbacks statically resolved local and independently classified | `LOCAL_ONLY` | `RECEIVER_OF_CALL` |
| `ARRAY_EVERY` | both | `LOCAL_PRIVATE` | same as `ARRAY_MAP` | `LOCAL_ONLY` | `RECEIVER_OF_CALL` |
| `ARRAY_SOME` | both | `LOCAL_PRIVATE` | same as `ARRAY_MAP` | `LOCAL_ONLY` | `RECEIVER_OF_CALL` |
| `ARRAY_INCLUDES` | both | `LOCAL_PRIVATE` | 0=`GOVERNANCE_FIELD,PATH_SEGMENT` | `LOCAL_ONLY` | `RECEIVER_OF_CALL` |
| `ARRAY_JOIN` | both | `LOCAL_PRIVATE` | 0=`GOVERNANCE_FIELD` | `LOCAL_ONLY` | `RECEIVER_OF_CALL` |
| `ARRAY_SLICE` | both | `LOCAL_PRIVATE` | 0-1=`NUMBER` | `LOCAL_ONLY` | `RECEIVER_OF_CALL` |
| `ARRAY_PUSH` | both | `LOCAL_PRIVATE` | all=`JSON_LOCAL,GOVERNANCE_FIELD` | `LOCAL_ONLY` | `COLLECTION_STORE` |
| `ARRAY_SORT` | both | `LOCAL_PRIVATE` | comparator statically resolved local and independently classified | `LOCAL_ONLY` | `RECEIVER_OF_CALL` |
| `SET_ADD` | both | `LOCAL_PRIVATE` | 0=`GOVERNANCE_FIELD,PATH_SEGMENT` | `LOCAL_ONLY` | `COLLECTION_STORE` |
| `SET_HAS` | both | `LOCAL_PRIVATE` | 0=`GOVERNANCE_FIELD,PATH_SEGMENT` | `LOCAL_ONLY` | `RECEIVER_OF_CALL` |
| `MAP_GET` | both | `LOCAL_PRIVATE` | 0=`GOVERNANCE_FIELD` | `LOCAL_ONLY` | `RECEIVER_OF_CALL` |
| `MAP_SET` | both | `LOCAL_PRIVATE` | 0=`GOVERNANCE_FIELD`; 1=`JSON_LOCAL,GOVERNANCE_FIELD` | `LOCAL_ONLY` | `COLLECTION_STORE` |
| `MAP_HAS` | both | `LOCAL_PRIVATE` | 0=`GOVERNANCE_FIELD` | `LOCAL_ONLY` | `RECEIVER_OF_CALL` |
| `REGEXP_TEST` | both | `RegExp` | 0=`GOVERNANCE_FIELD,PATH_SEGMENT,TIMESTAMP` | `LOCAL_ONLY` | `ARGUMENT_TO_CALL` |
| `NUMBER_IS_FINITE` | both | `Number` | 0=`NUMBER` | `LOCAL_ONLY` | `ARGUMENT_TO_CALL` |
| `NUMBER_IS_INTEGER` | both | `Number` | 0=`NUMBER` | `LOCAL_ONLY` | `ARGUMENT_TO_CALL` |
| `DATE_PARSE` | both | `Date` | 0=`TIMESTAMP,GOVERNANCE_FIELD` | `LOCAL_ONLY` | `ARGUMENT_TO_CALL` |
| `DATE_TO_ISO_STRING` | both | `LOCAL_PRIVATE` | none | `LOCAL_ONLY` | `RECEIVER_OF_CALL` |
| `STRING_STARTS_WITH` | both | `LOCAL_PRIVATE` | 0=`GOVERNANCE_FIELD,PATH_SEGMENT` | `LOCAL_ONLY` | `RECEIVER_OF_CALL` |
| `STRING_ENDS_WITH` | both | `LOCAL_PRIVATE` | same as `STRING_STARTS_WITH` | `LOCAL_ONLY` | `RECEIVER_OF_CALL` |
| `STRING_INCLUDES` | both | `LOCAL_PRIVATE` | same as `STRING_STARTS_WITH` | `LOCAL_ONLY` | `RECEIVER_OF_CALL` |
| `STRING_SPLIT` | both | `LOCAL_PRIVATE` | 0=`GOVERNANCE_FIELD` | `LOCAL_ONLY` | `RECEIVER_OF_CALL` |
| `STRING_TRIM` | both | `LOCAL_PRIVATE` | none | `LOCAL_ONLY` | `RECEIVER_OF_CALL` |
| `STRING_TO_LOWER` | both | `LOCAL_PRIVATE` | none | `LOCAL_ONLY` | `RECEIVER_OF_CALL` |
| `STRING_TO_UPPER` | both | `LOCAL_PRIVATE` | none | `LOCAL_ONLY` | `RECEIVER_OF_CALL` |
| `NEW_DATE` | both | `Date` | 0=`TIMESTAMP,GOVERNANCE_FIELD` or no argument | `LOCAL_ONLY` | `CONSTRUCTOR_INPUT` |
| `NEW_ERROR_CONTENT_FREE` | both | `Error` | 0=`ERROR_CONTENT_FREE` | `LOCAL_ONLY` | `CONSTRUCTOR_INPUT` |
| `NEW_SET` | both | `Set` | 0=`LOCAL_COLLECTION` or no argument | `LOCAL_ONLY` | `CONSTRUCTOR_INPUT` |
| `NEW_MAP` | both | `Map` | 0=`LOCAL_COLLECTION` or no argument | `LOCAL_ONLY` | `CONSTRUCTOR_INPUT` |
| `NEW_UINT8ARRAY` | both | `Uint8Array` | 0=`NUMBER,FICTIONAL_BYTES` | `LOCAL_ONLY` | `CONSTRUCTOR_INPUT` |
| `LOCAL_PRIVATE_CALL` | both | `LOCAL_PRIVATE` | ANY | `LOCAL_ONLY` | `ARGUMENT_TO_CALL` |
| `JEST_DESCRIBE` | test | `@jest/globals` | 0=`GOVERNANCE_FIELD`; 1 statically bounded callback | `LOCAL_ONLY` | `ARGUMENT_TO_CALL` |
| `JEST_IT` | test | `@jest/globals` | 0=`GOVERNANCE_FIELD`; 1 statically bounded callback | `LOCAL_ONLY` | `ARGUMENT_TO_CALL` |
| `JEST_EXPECT` | test | `@jest/globals` | 0=fictional/local mechanical fact | `EXPECT_ASSERTION` | `ASSERTION_INPUT` |
| `JEST_FN` | test | `@jest/globals` | optional statically resolved callback | `LOCAL_ONLY` | `ARGUMENT_TO_CALL` |
| `JEST_SPY_ON` | test | `@jest/globals` | target synthetic fixture; member exact literal | `LOCAL_ONLY` | `ARGUMENT_TO_CALL` |
| `EXPECT_MATCHER` | test | `EXPECT_CHAIN` | matcher arguments fictional/local facts | `EXPECT_ASSERTION` | `ASSERTION_INPUT` |
| `OS_TMPDIR` | test | `node:os` | none | `SUITE_OWNED_TEST_ROOT` | `ARGUMENT_TO_CALL` |
| `PRESERVE_RESPONSE_EVIDENCE_TEST_CALL` | test | `../responseEvidenceCapture` | 0=`FICTIONAL_RESPONSE` inside complete options object | `LOCAL_ONLY` | `ARGUMENT_TO_CALL` |

`PRIVATE_SEAM_SHA256`, `PRIVATE_SEAM_REPOSITORY_ROOT`, `PRIVATE_SEAM_REALPATH`, `PRIVATE_SEAM_LSTAT`, `PRIVATE_SEAM_STAT`, `PRIVATE_SEAM_EXISTS`, `PRIVATE_SEAM_MKDIR`, `PRIVATE_SEAM_OPEN`, `PRIVATE_SEAM_WRITE`, `PRIVATE_SEAM_FSYNC`, `PRIVATE_SEAM_CLOSE`, `PRIVATE_SEAM_RENAME`, `PRIVATE_SEAM_READ_FILE`, and `PRIVATE_SEAM_REMOVE` use the exact argument and destination rows above for their corresponding operation and require `root=PRIVATE_SEAM`, `provenanceKinds=PARAMETER`, and `sourceRole=FOCUSED_TEST` when injected. The production adapter uses the corresponding platform row. Unknown operations, roots, arguments, destinations, or flows fail.

## 6. CPD-D5 - Complete Prohibited-Family Predicate Records

The exact `ProhibitedCategory` enum and its complete records are:

| Category | Matching D3 facts |
| --- | --- |
| `PROHIBITED_IMPORT_OR_DYNAMIC_LOAD` | `nodeKind=IMPORT` and exact role import tuple is absent from CPD-D1/D2 settled import policy; or operation is dynamic `require`, import expression, eval load, side-effect import, namespace import, alias, or re-export |
| `COGNITIVE_SEMANTIC_ANDY_PROVIDER` | root resolves to module/binding family `Andy|Provider|Memory|Learning|Reflection|Knowledge|retrieval|prompt|judgement|semantic-classifier|prior-state`; or flow destination is semantic result/callback |
| `CASE001_REPOSITORY_SERVICE_OR_EVIDENCE` | root resolves to `Case001|repository-service|repository-storage|generated-index`; or destination is `REPOSITORY` |
| `NETWORK_TELEMETRY_ANALYTICS` | root resolves to Node or imported network/HTTP/HTTPS/socket/net/dns/tls/telemetry/analytics/tracing/remote-client family; or destination is `NETWORK` |
| `UI_CLIPBOARD_SHARE_DISPLAY` | root resolves to UI/preview/clipboard/share/print/open/display/notification family |
| `LOGGING_STDOUT_STDERR` | root resolves to console/logger/process stdout/process stderr; or flow is `OUTPUT_CONTENT`; or destination is `OUTPUT` |
| `CONTRIBUTION_DELIVERY_TRANSFER` | operation resolves to contribution/publication/delivery/transfer/message/permission-result family |
| `RETRY_FEEDBACK_SECOND_TURN_ACTION` | ancestry has `IN_LOOP_OR_RETRY` or `IN_ASYNC_SCHEDULE`; or operation resolves to retry/repeat/feedback/correction-turn/queue/schedule/Action family |
| `PUBLIC_PATH_ROOT_DESCRIPTOR` | public member normalized name or type carries path/root/directory/filename/url/fd/descriptor/handle, or public flow carries a path label |
| `PUBLIC_MUTATION_LIFECYCLE` | public member normalized name/type carries retained bytes/write/append/rename/remove/delete/unlink/truncate/chmod/move/cleanup/dispose/close |
| `PUBLIC_SEMANTIC_PERMISSION_RESULT` | public member normalized name/type carries approved/accepted/compliant/deliverable/retryable/contribution/permission/semantic/checker result |
| `RESPONSE_TRANSFORMATION_EGRESS` | `SOURCE_STRING` or `SOURCE_BYTES` flows to JSON/string normalization/base64/hex/error/output/receipt content/callback/return other than the exact permitted hash, byte-length, persistence, and fresh-copy paths |
| `UNAUTHORISED_WRITE_OR_REMOVE` | filesystem mutation destination is not one of the exact D4 destinations, remove targets a final/token/repository/governed-source path, or rename is not corresponding same-directory temp-to-final |
| `DYNAMIC_EXECUTION_PROCESS_CONTROL` | root or operation resolves to eval/Function/child_process/worker_threads/vm/shell/process control/daemon |
| `ENVIRONMENT_COMPILER_FALLBACK` | root is process.env/NODE_PATH/global or alternate compiler; a username/private-IP/absolute-machine-path literal flows to launch; or any fallback branch exists |
| `UNAUTHORISED_TEST_PROBE` | a fact is in one of the six probe operation families but fails any Section 7 record selector |
| `UNKNOWN_EXECUTABLE_EDGE` | executable root, operation, argument provenance, destination, or data flow is `UNKNOWN`; dynamic/computed resolution is non-literal; or no exact D4/D6 terminal record matches |

The family tokens above are closed, case-sensitive normalized provenance families, not raw source-word searches. A family fact exists only when static import/binding/member resolution produces that exact normalized family. An unlisted imported root already fails the exact import allowlist and matches `PROHIBITED_IMPORT_OR_DYNAMIC_LOAD`; unresolved local provenance matches `UNKNOWN_EXECUTABLE_EDGE`. Every family is evaluated; multiple prohibited matches are all recorded and remain FAIL.

## 7. CPD-D6 - Complete Authorised-Probe Predicate, Flow, and Assertion Records

All probe records require `phase=TERMINAL`, `classification=AUTHORISED_TEST_PROBE`, `sourceRole=FOCUSED_TEST`, ancestry `IN_IMPORTED_JEST_IT_CALLBACK` or `IN_IMPORTED_JEST_IT_EACH_CALLBACK`, fictional/suite-owned provenance, `POSTDOMINATED_BY_REQUIRED_ASSERTION`, and ancestry-none `IN_MODULE_SCOPE,IN_RETURN_EXPRESSION,IN_LOOP_OR_RETRY,IN_ASYNC_SCHEDULE,ESCAPES_TEST_CALLBACK`. Exactly these records exist:

| Probe ID | Exact operation record | Exact permitted flow | Required post-dominating assertion |
| --- | --- | --- | --- |
| `DENIED_PUBLIC_MEMBER_REFLECT_GET` | `Reflect.get(PUBLIC_REFERENCE|PUBLIC_OUTCOME,DENIED_MEMBER_LITERAL)` | result only to `ASSERTION_INPUT` | `toBeUndefined` |
| `DENIED_PUBLIC_MEMBER_IN` | literal denied member `in` public reference/outcome | boolean only to `ASSERTION_INPUT` | `toBe(false)` |
| `DENIED_PUBLIC_MEMBER_KEYS` | `Object.keys(PUBLIC_REFERENCE|PUBLIC_OUTCOME)` | keys only to `ASSERTION_INPUT` | `not.toContain(deniedLiteral)` |
| `FRESH_COPY_MUTATION` | exactly two `readBytes` calls; index write only to first `FICTIONAL_BYTES` result | no store/return/callback/filesystem flow | second copy and persisted fictional baseline match original content, byte length, and SHA-256 |
| `FROZEN_OBJECT_MUTATION` | `Object.isFrozen` plus one assignment or deletion inside zero-argument expect callback | mutation result cannot escape callback | frozen is true and mutation `toThrow` |
| `SYNTHETIC_CORRUPTION` | exactly one transform from the closed transform enum below | transformed bytes only to injected `PRIVATE_SEAM_READ_FILE` result and assertion | outcome status `PRESERVATION_INCOMPLETE`; checker count and retry count zero |
| `INJECTED_MECHANICAL_FAILURE_THROW` | exactly one private seam operation throws content-free Error | event/count facts only to assertions | incomplete outcome, exact first-failure operation, checker count zero, retry count zero |
| `INJECTED_MECHANICAL_FAILURE_PROGRESS` | exactly one `WRITE` returns zero or short progress | same as preceding row | same as preceding row |
| `CHECKER_EXCEPTION_AFTER_VERIFIED_CAPTURE` | fictional checker receives only `PUBLIC_REFERENCE` after verified outcome and throws fixed content-free Error | no return/store/retry/feedback/delivery | independent response and receipt reread identities unchanged; retry/delivery counts zero |

Closed corruption transform enum:

```text
PREFIX_ONE_BYTE SUFFIX_ONE_BYTE TRUNCATE_ONE_BYTE APPEND_NEWLINE_0A
PREFIX_UTF8_BOM_EFBBBF ALTER_ONE_MIDDLE_BYTE SUBSTITUTE_FIXED_FICTIONAL_BYTES
NORMALIZE_FICTIONAL_UTF8_TO_NFC
```

Closed denied-member enum:

```text
path root directory filename url fd descriptor handle write append rename remove
delete unlink truncate chmod move cleanup dispose close transfer print preview
display deliver delivery retry feedback approved accepted compliant deliverable
retryable contribution permission
```

Allowed failure-operation enum is exactly the fourteen private seam IDs listed at the end of Section 5. Two failures, an unlisted transform/member/operation, real response data, production ancestry, absent assertion, assertion outside the same test callback, value escape, module-scope storage, surviving closure capture, filesystem mutation outside the suite root, or any retry/consequence matches `UNAUTHORISED_TEST_PROBE`.

## 8. CPD-D7 - Closed Normalisation, Ledger, Record, Capture, Count, Failure, and Manifest Schemas

### 8.1 Closed schema notation

In this section, `string`, `boolean`, `uint`, and `hex64` mean JSON string, JSON boolean, non-negative safe integer, and lowercase 64-hex string. `enum(...)` is a closed string enum. `array<T>` is ordered and contains only `T`. `map<E,uint>` has exactly one key for every member of closed enum `E`, sorted by key, and no other key. Every object is required, closed, and has every displayed field. No field is nullable unless its type explicitly includes `null`.

`relativePath` is a non-empty slash-separated repository-relative path with no `.` or `..` segment. `recordId` is `<ROLE>:<NODE_ID>:<RECORD_KIND>:<ORDINAL>`. `nodeId` is `uint`. Stable serialization sorts object keys by ascending Unicode code point and preserves governed array order.

### 8.2 Closed normalization records

```text
NormalizedOperation = {kind:enum(CALL,NEW,READ,WRITE,IMPORT,DECLARE,FLOW), root:enum(all Section 4 roots), path:array<string>, operationId:enum(all Section 5 and 7 IDs)}
NormalizedProvenance = {kind:ProvenanceKind, role:SourceRole, identity:string, dataLabels:array<DataLabel>}
NormalizedType = exactly one tagged variant:
  {kind:"keyword",name:enum(string,number,boolean,void,unknown,never)}
  {kind:"stringLiteral",value:string}
  {kind:"named",name:string,typeArguments:array<NormalizedType>}
  {kind:"array",readonly:boolean,element:NormalizedType}
  {kind:"function",parameters:array<{name:string,required:boolean,type:NormalizedType}>,returns:NormalizedType}
  {kind:"object",members:array<{kind:enum(PROPERTY,METHOD,CALL,CONSTRUCT,GET,SET,INDEX),name:string,required:boolean,readonly:boolean,type:NormalizedType}>}
  {kind:"union",members:array<NormalizedType>}
```

Object members sort by name then kind. Union members sort by stable serialization. Parameter order is declaration order. Public aliases remain named; anonymous objects are structural. Unknown or unsupported type syntax produces a `TYPE_NORMALIZATION_UNKNOWN` failure and no substitute representation.

### 8.3 Closed node ledger and governed records

```text
NodeLedgerEntry = {nodeId:uint,parentNodeId:uint|null,syntaxKind:string,childCount:uint,recordIds:array<recordId>,nonGovernedReason:enum(NONE,STRUCTURAL_CONTAINER,TOKEN_OR_TRIVIA_EXCLUDED,TYPE_NODE_RECORDED_BY_OWNER,DECLARATION_INTERNAL_RECORDED_BY_OWNER)}
BaseRecord = {recordId:recordId,nodeId:uint,kind:RecordKind,role:SourceRole}
RecordKind = SOURCE_IDENTITY|PARSER_DIAGNOSTIC|IMPORT_DECLARATION|IMPORTED_BINDING|EXPORT_DECLARATION|EXPORTED_NAME|CALL_EXPRESSION|NEW_EXPRESSION|EXECUTABLE_PROPERTY_ACCESS|PUBLIC_DECLARATION|PUBLIC_MEMBER|DEPENDENCY_EDGE|LITERAL_DATA|AUTHORISED_TEST_PROBE|PROHIBITED_FINDING|UNKNOWN_FINDING
```

Each record kind adds exactly these fields to `BaseRecord`:

```text
SOURCE_IDENTITY {path:relativePath,bytes:uint,sha256:hex64}
PARSER_DIAGNOSTIC {code:uint,category:enum(WARNING,ERROR,SUGGESTION,MESSAGE),start:uint,length:uint,messageSha256:hex64}
IMPORT_DECLARATION {module:string,importKind:enum(DEFAULT_VALUE,NAMED_VALUE,NAMED_TYPE,NAMED_MIXED),bindingRecordIds:array<recordId>}
IMPORTED_BINDING {module:string,importedName:string,localName:string,typeOnly:boolean}
EXPORT_DECLARATION {declarationKind:string,nameRecordIds:array<recordId>,default:boolean,reExport:boolean}
EXPORTED_NAME {name:string,declarationRecordId:recordId}
CALL_EXPRESSION {operation:NormalizedOperation,callee:NormalizedProvenance,arguments:array<NormalizedProvenance>,destinationLabels:array<DestinationLabel>,dataFlows:array<FlowLabel>,terminalClass:TerminalClass|null}
NEW_EXPRESSION {operation:NormalizedOperation,constructor:NormalizedProvenance,arguments:array<NormalizedProvenance>,destinationLabels:array<DestinationLabel>,dataFlows:array<FlowLabel>,terminalClass:TerminalClass|null}
EXECUTABLE_PROPERTY_ACCESS {operation:NormalizedOperation,receiver:NormalizedProvenance,computed:boolean,destinationLabels:array<DestinationLabel>,dataFlows:array<FlowLabel>,terminalClass:TerminalClass|null}
PUBLIC_DECLARATION {declarationKind:enum(INTERFACE,TYPE_ALIAS,FUNCTION),name:string,exported:boolean,normalizedType:NormalizedType}
PUBLIC_MEMBER {ownerName:string,memberKind:enum(PROPERTY,METHOD,CALL,CONSTRUCT,GET,SET,INDEX),name:string,required:boolean,readonly:boolean,normalizedType:NormalizedType}
DEPENDENCY_EDGE {fromRecordId:recordId,toIdentity:string,edgeKind:enum(IMPORT,CALL,NEW,READ,WRITE,TYPE_REFERENCE)}
LITERAL_DATA {literalKind:enum(STRING,NUMBER,BOOLEAN,NULL,TEMPLATE),valueSha256:hex64,dataLabels:array<DataLabel>,terminalClass:TerminalClass}
AUTHORISED_TEST_PROBE {probeId:enum(all Section 7 probe IDs),operationRecordIds:array<recordId>,assertionRecordIds:array<recordId>,escapeCount:uint,terminalClass:TerminalClass}
PROHIBITED_FINDING {category:ProhibitedCategory,predicateIds:array<string>,subjectRecordId:recordId}
UNKNOWN_FINDING {reason:FailureCode,subjectRecordId:recordId}
```

Every visited node has one ledger entry. Node IDs are contiguous preorder integers beginning at zero. Parent and child counts must reconstruct one tree. Every governed fact has exactly one record. A ledger entry may have both records and `STRUCTURAL_CONTAINER`; no other non-`NONE` reason may coexist with records. Duplicate/skipped IDs, orphan records, unsupported syntax, or a second parse/traversal fails.

### 8.4 Closed counts, comparisons, and failures

```text
CountMap = map<RecordKind,uint>
ProhibitedCountMap = map<ProhibitedCategory,uint>
TerminalCountMap = map<TerminalClass,uint>
ComparisonId = SOURCE_IDENTITY|IMPORT_ALLOWLIST|PUBLIC_API_ALLOWLIST|NODE_LEDGER_COMPLETE|RECORDS_COMPLETE|COUNTS_EQUAL|PROHIBITED_ZERO|TERMINAL_TOTAL|CAPTURE_IDENTITY|MANIFEST_RECOMPUTABLE
Comparison = {id:ComparisonId,expectedSha256:hex64|null,observedSha256:hex64|null,equal:boolean}
FailureCode = PARSER_DIAGNOSTIC|SOURCE_IDENTITY_MISMATCH|IMPORT_ALLOWLIST_MISMATCH|PUBLIC_API_MISMATCH|UNKNOWN_EXECUTABLE_EDGE|AMBIGUOUS_TERMINAL_CLASS|PROHIBITED_FINDING|NODE_LEDGER_INCOMPLETE|RECORD_DUPLICATE|RECORD_MISSING|COUNT_MISMATCH|TYPE_NORMALIZATION_UNKNOWN|CAPTURE_WRITE_FAILURE|CAPTURE_REREAD_FAILURE|CAPTURE_SCHEMA_FAILURE|CAPTURE_IDENTITY_MISMATCH|MANIFEST_TOO_LARGE|MANIFEST_RECOMPUTATION_MISMATCH|AUTHORITY_ALREADY_USED_OR_STATE_UNAVAILABLE|AUTHORITY_STATE_APPEND_FAILURE|INSTRUMENT_IDENTITY_MISMATCH|REPOSITORY_IDENTITY_MISMATCH
Failure = {code:FailureCode,role:SourceRole|null,nodeId:uint|null,recordId:recordId|null,detailSha256:hex64}
```

`detailSha256` hashes a stable-serialized content-free detail object; source text, response content, absolute paths, stack traces, and machine identifiers are prohibited.

### 8.5 Closed enumeration capture

Each role capture is exactly:

```text
EnumerationCapture = {
  schema: exact "HH-CHECK-5-ENUMERATION-2",
  policy:{schema:string,bytes:uint,sha256:hex64},
  role:SourceRole,
  source:{path:relativePath,bytes:uint,sha256:hex64,readCount:exact 1,parseCount:exact 1,traversalCount:exact 1},
  compiler:{name:exact "typescript",version:exact "5.9.3",entryRelativePath:exact "node_modules/typescript/lib/typescript.js"},
  parserDiagnostics:array<PARSER_DIAGNOSTIC record>,
  nodeLedger:array<NodeLedgerEntry>,
  records:array<all non-PARSER_DIAGNOSTIC Record variants>,
  counts:CountMap,
  allowlistComparisons:array<Comparison> in ComparisonId enum order,
  prohibitedCounts:ProhibitedCountMap,
  terminalClassificationCounts:TerminalCountMap,
  decision:enum(PASS,FAIL),
  failures:array<Failure>
}
```

`counts` is recomputed by record kind. Prohibited and terminal maps are recomputed from records. `PASS` requires no diagnostics/failures, every comparison equal, every prohibited count zero, every executable record exactly one terminal class, and all identities/counts equal.

### 8.6 Closed combined decision and bounded manifest

```text
CaptureIdentity = {role:SourceRole,file:enum(production.enumeration.json,focused-test.enumeration.json),bytes:uint,sha256:hex64,rereadBytes:uint,rereadSha256:hex64}
CombinedDecision = {
  schema:exact "HH-CHECK-5-COMBINED-DECISION-2",
  policy:{schema:string,bytes:uint,sha256:hex64},
  instrument:{bytes:uint,sha256:hex64},
  repository:{identitySchema:exact "HH-CHECK-5-REPOSITORY-IDENTITY-1",result:enum(PASS,FAIL)},
  captures:array<CaptureIdentity> with exact order PRODUCTION,FOCUSED_TEST and cardinality 2,
  aggregateCounts:CountMap,
  aggregateProhibitedCounts:ProhibitedCountMap,
  aggregateTerminalCounts:TerminalCountMap,
  decision:enum(PASS,FAIL),
  failures:array<Failure>
}
```

The manifest is exactly:

```text
RoleManifest = {role:SourceRole,sourceBytes:uint,sourceSha256:hex64,parserDiagnosticCount:uint,visitedNodeCount:uint,recordCount:uint,captureBytes:uint,captureSha256:hex64,rereadBytes:uint,rereadSha256:hex64,counts:CountMap,prohibitedCounts:ProhibitedCountMap,terminalCounts:TerminalCountMap,unknownCount:uint,ambiguousCount:uint,publicAllowlistEqual:boolean,decision:enum(PASS,FAIL)}
BoundedManifest = {
  schema:exact "HH-CHECK-5-BOUNDED-MANIFEST-2",
  policy:{schema:string,bytes:uint,sha256:hex64},
  instrument:{bytes:uint,sha256:hex64,identityGate:enum(PASS,FAIL)},
  repository:{identitySchema:exact "HH-CHECK-5-REPOSITORY-IDENTITY-1",packageName:exact "kitchen-mobile-clean",compilerVersion:exact "5.9.3",result:enum(PASS,FAIL)},
  authority:{tokenId:hex64,acquired:boolean,consumed:boolean,finalState:OneUseState},
  roles:array<RoleManifest> exact order PRODUCTION,FOCUSED_TEST and cardinality 2,
  combined:{aggregateCounts:CountMap,aggregateProhibitedCounts:ProhibitedCountMap,aggregateTerminalCounts:TerminalCountMap,stderrBytes:uint,decision:enum(PASS,FAIL),failures:array<Failure>}
}
```

The stable-serialized manifest is at most 4,096 UTF-8 bytes plus exactly one terminal `0x0a`. Every field is recomputed from independently reread captures and Authority state. Complete records, source/response content, absolute paths, stack traces, and unenumerated fields are prohibited.

## 9. CPD-D9 - Closed One-Use Timestamp, Event, Validation, and Append-Failure Policy

### 9.1 Timestamp and event schema

`timestamp` is an RFC 3339 UTC instant in exact form `YYYY-MM-DDTHH:mm:ss.sssZ`, exactly 24 ASCII bytes, produced by `Date.prototype.toISOString()`. It records chronology only and is excluded from token identity and every measurement decision.

```text
OneUseState = ACQUIRED_UNCONSUMED|CONSUMED|CLOSED_PRE_CONSUMPTION_FAILURE|CLOSED_POST_CONSUMPTION_FAILURE|CLOSED_PASS|CLOSED_FAIL
OneUseEvent = {schema:exact "HH-CHECK-5-ONE-USE-EVENT-1",tokenId:hex64,sequence:uint,state:OneUseState,timestamp:exact RFC3339 form,failureCode:FailureCode|null}
```

Event validation requires:

1. first event sequence `0`, state `ACQUIRED_UNCONSUMED`, and `failureCode=null`;
2. each next sequence equals prior sequence plus one and has the same token ID;
3. `CONSUMED` may follow only `ACQUIRED_UNCONSUMED`, with `failureCode=null`;
4. `CLOSED_PRE_CONSUMPTION_FAILURE` may follow only `ACQUIRED_UNCONSUMED`, with non-null failure code;
5. `CLOSED_POST_CONSUMPTION_FAILURE` may follow only `CONSUMED`, with non-null failure code;
6. `CLOSED_PASS` or `CLOSED_FAIL` may follow only `CONSUMED`; PASS has null failure code and FAIL has non-null failure code;
7. every `CLOSED_*` state is terminal; no event follows it;
8. timestamps must be valid and non-decreasing, but timestamp difference never permits or rejects a transition;
9. unknown fields, malformed UTF-8, blank lines, duplicate sequence, invalid transition, invalid JSON, invalid final newline, or token mismatch invalidates the state log and stops before source access on a later launch.

### 9.2 Canonical NDJSON and durable append

Each event is stable-serialized with sorted keys, UTF-8, no BOM or internal newline, followed by exactly one `0x0a`. The state file is the byte concatenation of complete event lines. Acquisition uses exclusive `wx` creation with owner-only mode, writes one complete line, fsyncs, and closes before source read. Later events open append-only without truncation, append one complete line, fsync, and close. No rewrite, repair, truncation, rename, removal, alternate file, or retry exists.

Before any later launch, token-file existence alone yields `AUTHORITY_ALREADY_USED_OR_STATE_UNAVAILABLE` and stops. Parsing existing content may diagnose state corruption but can never restore Authority or permit source access.

### 9.3 Append-failure record

An event append attempt is represented in the off-terminal combined decision, when available, by exactly:

```text
StateAppendFailure = {schema:exact "HH-CHECK-5-STATE-APPEND-FAILURE-1",tokenId:hex64,attemptedSequence:uint,attemptedState:OneUseState,failureCode:exact "AUTHORITY_STATE_APPEND_FAILURE",eventCanonicalSha256:hex64}
```

The record contains no error object, message, stack, descriptor, or path. Failure to create, write fully, fsync, or close the acquisition event stops before source read. Failure to append any later event stops immediately; token existence remains the durable fail-closed control, and no retry follows. If the combined capture cannot itself be durably written, this record may exist only in memory and makes no Evidence claim.

## 10. Six-Area Completion Test

| Required completion area | Exact result | Material author choice remaining? |
| --- | --- | --- |
| Closed CPD-D3 JSON schemas and enums | Selector algebra, facts, enums, predicate record, and exact evaluation fixed in Section 4 | **No** |
| Complete CPD-D4 permitted-operation predicates | Every operation, role, root, argument label, destination, flow, and shared ancestry constraint fixed in Section 5 | **No** |
| Complete CPD-D5 prohibited-family predicates | All seventeen families have exact structural match dimensions and fail-first behavior in Section 6 | **No** |
| Complete CPD-D6 probe predicates/flows/assertions | Every authorised operation, flow, assertion, enum, escape rule, and failure condition fixed in Section 7 | **No** |
| Closed CPD-D7 schemas | Normalization, ledger, record, count, comparison, failure, capture, combined, and manifest schemas fixed in Section 8 | **No** |
| Exact CPD-D9 events | Timestamp, event schema, NDJSON canonicalization, transition validation, durable append, and append-failure representation fixed in Section 9 | **No** |

Direct falsifiers are now available for every area: unknown enum or field; changed operation selector; missing or broadened prohibited predicate; probe without exact assertion/non-escape; missing capture field or count derivation; malformed timestamp/event/transition; and any append retry or token removal all fail.

No claim is made here that these decisions have been encoded into one canonical payload. That question belongs to later candidate authoring and terminal closure gates.

## 11. Outcome Decision

### Outcome 1 - All six machine-policy areas completed

**Selected.** The controlling review's six gaps are settled prospectively and without source observation. A future author no longer needs to choose match predicates, closed enums, record schemas, count semantics, failure representation, timestamp form, NDJSON validation, or append-failure behavior.

### Outcome 2 - One or more machine-policy areas remain incomplete

Not selected. The completion matrix in Section 10 identifies no unresolved field or matcher decision within the authorised six-area scope.

### Outcome 3 - Canonical policy architecture is insufficient

Not selected. One versioned canonical JSON payload can carry these closed records and schemas by reference or direct nesting without executable policy or external normative prose.

## 12. Authority and Exact Next Gate

**Candidate Policy Correction Authority granted:** **No.**

This review completes prospective policy only. It grants no Authority to:

1. modify the historical candidate;
2. create a new corrected candidate or canonical payload;
3. inspect governed implementation source;
4. modify implementation;
5. build, modify, inspect, validate, or run an instrument;
6. run Check 5 or Check 6;
7. accept or freeze implementation or policy;
8. produce semantic or programme consequences.

The exact mandatory next gate is:

```text
HH-0000 CHECK 5 CANDIDATE POLICY CORRECTION AUTHORITY REVIEW
```

That must be a fresh documentation-only review of all CPD-001 through CPD-015 defects against the now-completed CPD-D1 through CPD-D9 policy. Only if that later review grants one-candidate Authority may a new candidate schema/payload be authored. The historical 6,350-byte identity must remain unchanged. `CHECK 5 TERMINAL CANONICAL POLICY CLOSURE REVIEW` remains unavailable until a separately authorised candidate is actually authored.

## 13. Final State

```text
OUTCOME 1 - HH-0000 CHECK 5 CANONICAL POLICY MACHINE-SCHEMA AND PREDICATE COMPLETION REVIEW COMPLETES EXACTLY SIX MACHINE-POLICY AREAS - CPD-D3 CLOSED SELECTOR ALGEBRA FACT ENUMS PREDICATE RECORD AND FAIL-FIRST EXACT-ONE EVALUATION FIXED - CPD-D4 COMPLETE PERMITTED OPERATION ROLE ROOT ARGUMENT DESTINATION FLOW AND ANCESTRY RECORDS FIXED - CPD-D5 ALL SEVENTEEN PROHIBITED FAMILY STRUCTURAL MATCH RECORDS FIXED - CPD-D6 ALL AUTHORISED PROBE OPERATION FLOW ASSERTION NON-ESCAPE TRANSFORM DENIED-MEMBER AND FAILURE RECORDS FIXED - CPD-D7 NORMALIZATION NODE LEDGER GOVERNED RECORD COUNT COMPARISON FAILURE ENUMERATION CAPTURE COMBINED DECISION AND BOUNDED MANIFEST SCHEMAS FIXED - CPD-D9 RFC3339 MILLISECOND UTC TIMESTAMP CANONICAL NDJSON EVENT TRANSITION DURABLE APPEND AND APPEND-FAILURE RECORD FIXED - NO GOVERNED SOURCE OBSERVATION - HISTORICAL CANDIDATE 6350 CANONICAL BYTES SHA256 FF71059E5FBAD04831BF8CBC6D408B44B265D8657446A1FE8C2B0C8E8D972186 PRESERVED UNCHANGED AS HISTORICAL_CANDIDATE_POLICY_EVIDENCE NOT FROZEN ACCEPTED FINAL MEASURED OR CHECK_5_PASS - NO CORRECTION AUTHORITY - NO NEW CANDIDATE OR PAYLOAD - NO INSTRUMENT AUTHORITY - CHECK 5 UNMEASURED - CHECK 6 NOT RUN - IMPLEMENTATION UNACCEPTED - EXACT NEXT GATE HH-0000 CHECK 5 CANDIDATE POLICY CORRECTION AUTHORITY REVIEW - STOP
```

Canonical policy machine-schema and predicate completion review stops here.