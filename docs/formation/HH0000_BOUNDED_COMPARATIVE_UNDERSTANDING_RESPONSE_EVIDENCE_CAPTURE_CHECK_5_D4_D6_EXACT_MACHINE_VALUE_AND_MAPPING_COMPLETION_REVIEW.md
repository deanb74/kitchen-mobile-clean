# HH-0000 Check 5 D4/D6 Exact Machine Value and Mapping Completion Review

**Status:** OUTCOME 1 - EXACT D4/D6 MACHINE VALUES AND MAPPINGS FULLY SETTLED
**Review date:** 2026-08-14
**Review type:** Documentation-only exact-value and canonical-mapping completion review
**Immediate controlling record:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_D4_D6_TERMINAL_PREDICATE_MACHINE_ENCODING_COMPLETION_REVIEW_THIRD_ATTEMPT.md`
**Encoding-decisions record:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_D4_D6_TERMINAL_PREDICATE_ENCODING_DECISIONS_COMPLETION_REVIEW.md`
**Structural completion record:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_D3_V2_D4_D6_STRUCTURAL_FACT_COMPLETION_REVIEW.md`
**Inherited D4/D6 semantics:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_CANONICAL_POLICY_MACHINE_SCHEMA_AND_PREDICATE_COMPLETION_REVIEW.md`
**Historical candidate:** `6350` canonical bytes / SHA-256 `ff71059e5fbad04831bf8cbc6d408b44b265d8657446a1fe8c2b0c8e8d972186` / `HISTORICAL_CANDIDATE_POLICY_EVIDENCE`
**Failed Candidate V2 authoring record:** Preserved unchanged
**Candidate V2:** Not created; identity none; partial payload none
**D3-V2:** Unchanged
**D5:** Exactly 37 predicates / 17 prohibited families, unchanged
**Governed implementation-source access:** None
**Instrument access:** None
**Check 5:** `UNMEASURED`
**Check 6:** `NOT RUN`
**Implementation:** `UNACCEPTED`
**Live candidate-authoring or execution Authority:** None

# Repository Traceability

**Principle:** Truth before certainty; evidence before claims; human Authority; smallest justified change.
**Theory:** Closed machine mapping may expose settled meaning but may not derive policy from implementation or turn a structural fact into permission.
**Architecture:** Existing D3-V2 plus its prospectively settled D4/D6 structural extension, prohibited-first evaluation, complete terminal evaluation, and exact-one acceptance.
**Engineering:** Three D4 closure records, nine canonical D6 mappings, one failure-operation type reconciliation, direct falsifiers, closed-key validation, and derived `ProbeValidity`.
**Milestone:** Not Applicable.
**Evidence:** This prospective documentation-only decision record. No terminal predicates, candidate, instrument, Check 5, Check 6, freeze, or acceptance Evidence is produced.

## 1. Sole Question and Outcome

> Can the exact machine values exposed as `T3-D4-01` through `T3-D4-03` and `T3-D6-01` through `T3-D6-07` be settled from existing governed meaning without implementation observation, architectural extension, capability broadening, or invention of policy meaning?

**Yes. Outcome 1 is selected.**

```text
D4_CLOSURES=3/3
D6_MAPPING=9/9
D6_SCHEMA_RECONCILIATION=1/1
T3_D6_08=DERIVED
T3_BLOCKERS_CLOSED=11/11
REMAINING=0
D3_V2_CHANGE=NONE
```

## 2. Rebound Blocker Inventory

The third-attempt inventory is confirmed exactly:

```text
T3-D4-01 T3-D4-02 T3-D4-03
T3-D6-01 T3-D6-02 T3-D6-03 T3-D6-04
T3-D6-05 T3-D6-06 T3-D6-07 T3-D6-08
```

`T3-D6-08` is not an independent policy decision. It is recomputed after the other D6 records are complete.

## 3. D4 Exact Closure Table

| Closure | Exact selected machine data | Positive falsifier | Otherwise-identical negative falsifier | Capability result |
| --- | --- | --- | --- | --- |
| `T3-D4-01` | Base `FS_REALPATH`, `FS_LSTAT`, `FS_STAT`, `FS_EXISTS`, `FS_MKDIR`, `FS_OPEN_EXCLUSIVE`, `FS_WRITE`, `FS_FSYNC`, `FS_CLOSE`, `FS_RENAME`, `FS_READ_FILE`, `FS_REMOVE_BOUNDED`: `roots=ONE_OF[node:fs]`, `provenanceKinds=ONE_OF[IMPORT_BINDING]`, `sourceRoles=ONE_OF[FOCUSED_TEST,PRODUCTION]`. The 14 `PRIVATE_SEAM_*` IDs alone encode injected branches with `roots=ONE_OF[PRIVATE_SEAM]`, `provenanceKinds=ONE_OF[PARAMETER]`, `sourceRoles=ONE_OF[FOCUSED_TEST]`. No base `FS_*` predicate contains `PRIVATE_SEAM`. | imported `node:fs` write matches one base branch; injected parameter write matches one `PRIVATE_SEAM_WRITE` branch | imported write cannot match a seam ID; parameter seam cannot match a base `FS_WRITE` branch | No operation is added; duplicate identity is removed prospectively |
| `T3-D4-02` | `BYTE_LABEL_SET=[CORRUPTED_FICTIONAL_BYTES,FICTIONAL_BYTES,INSTRUMENT_BYTES,PERSISTED_RESPONSE_BYTES,POLICY_BYTES,RECEIPT_BYTES,SOURCE_BYTES]`. `BUFFER_COMPARE` indexes 0 and 1, `BUFFER_IS_BUFFER` index 0, and `UINT8ARRAY_FROM` index 0 use `dataLabels=ONE_OF[BYTE_LABEL_SET]`. | `FICTIONAL_BYTES` at the governed index matches | `SOURCE_STRING`, `JSON_LOCAL`, `NUMBER`, or `UNKNOWN` at that index fails | Set membership comes from settled byte-value meanings, not token spelling |
| `T3-D4-03` | `ASSERTABLE_PROVENANCE_SET=[LITERAL,LOCAL_DECLARATION,PARAMETER,PUBLIC_VALUE,SYNTHETIC_FIXTURE]`; `ASSERTABLE_DATA_LABEL_SET=[BOOLEAN,BYTE_LENGTH,CORRUPTED_FICTIONAL_BYTES,DENIED_MEMBER_LITERAL,ERROR_CONTENT_FREE,FICTIONAL_BYTES,FICTIONAL_RESPONSE,GOVERNANCE_FIELD,HASH_HEX,JSON_LOCAL,LOCAL_COLLECTION,NUMBER,PUBLIC_OUTCOME,PUBLIC_REFERENCE,TIMESTAMP]`. `JEST_EXPECT` index 0 and count-1 `EXPECT_MATCHER` index 0 use both `ONE_OF` selectors. Count-0 `EXPECT_MATCHER` keeps no argument constraint. | fictional outcome, denied-member, local number, local boolean, or fictional bytes matches | any source/response label, path label, machine-sensitive label, semantic label, repository/token label, `NONE`, or `UNKNOWN` fails | Selector permits only fictional/local mechanical Evidence and creates no test capability |

The closed negative categories for `T3-D4-03` are:

```text
source/response = SOURCE_BYTES SOURCE_STRING PERSISTED_RESPONSE_BYTES RECEIPT_BYTES
machine-sensitive = ABSOLUTE_MACHINE_PATH_LITERAL PRIVATE_IP_LITERAL USERNAME_LITERAL
path = ATTEMPT_PATH EXTERNAL_ROOT_PATH FINAL_RECEIPT_PATH FINAL_RESPONSE_PATH
       GOVERNED_SOURCE_PATH PATH_SEGMENT REPOSITORY_PATH
       REPOSITORY_PRECONDITION_PATH SUITE_ROOT_PATH TOKEN_PATH
semantic = SEMANTIC_RESULT
other excluded = FILE_DESCRIPTOR INSTRUMENT_BYTES POLICY_BYTES NONE UNKNOWN
```

## 4. Canonical D6 Mapping Notation

The mapping below is normative closed data using these fixed tuple schemas:

```text
O = [role,operationSelector,argumentCount,countWithinScope,inputRoles,outputRoles,failureEffect]
A = [matcher,expected,subjectRole,operationRole,true,true]
R = [kind,leftRole,rightRole,operationRole]
C = [counter,count]
E = [valueRole,[]]
```

`operationSelector` is either one exact `OperationIdV2` or a sorted closed `ONE_OF` array. `inputRoles` and `outputRoles` are exact sorted sets. Every mapping uses `scope=ONE_TEST_CALLBACK`. Every child collection uses `KEY_EQUAL`; therefore missing, extra, duplicate, malformed, or `UNKNOWN` keys fail. Every `E` tuple means `channels=EQUALS[]`.

The exact denied-member selector is:

```text
DENIED_MEMBER_SET=[
  accepted,append,approved,chmod,cleanup,close,compliant,contribution,
  delete,deliver,deliverable,delivery,descriptor,directory,display,dispose,
   fd,feedback,filename,handle,move,path,permission,preview,print,remove,
  rename,retry,retryable,root,transfer,truncate,unlink,url,write
]
```

The exact transform selector is:

```text
TRANSFORM_SET=[
  ALTER_ONE_MIDDLE_BYTE,APPEND_NEWLINE_0A,NORMALIZE_FICTIONAL_UTF8_TO_NFC,
  PREFIX_ONE_BYTE,PREFIX_UTF8_BOM_EFBBBF,SUBSTITUTE_FIXED_FICTIONAL_BYTES,
  SUFFIX_ONE_BYTE,TRUNCATE_ONE_BYTE
]
```

## 5. Nine-Probe Canonical Machine Mapping

### 5.1 `DENIED_PUBLIC_MEMBER_REFLECT_GET`

```text
deniedMemberId=ONE_OF[DENIED_MEMBER_SET]
corruptionTransformId=NONE
failureOperation=NOT_PROBE
O=[DENIED_LOOKUP,DENIED_PUBLIC_MEMBER_REFLECT_GET,2,1,
   [DENIED_MEMBER,PUBLIC_SUBJECT],[LOOKUP_RESULT],NONE]
A=[TO_BE_UNDEFINED,UNDEFINED_VALUE,LOOKUP_RESULT,DENIED_LOOKUP,true,true]
R=[ASSERTION_SUBJECT,LOOKUP_RESULT,LOOKUP_RESULT,DENIED_LOOKUP]
R=[ASSERTION_POSTDOMINATES_OPERATION,LOOKUP_RESULT,LOOKUP_RESULT,DENIED_LOOKUP]
C=[LOOKUP_INVOCATION,1]
E=[DENIED_MEMBER,[]]
E=[LOOKUP_RESULT,[]]
E=[PUBLIC_SUBJECT,[]]
```

Positive: the exact lookup and undefined assertion match. Negative: changing the matcher to `TO_BE_TRUE`, count to 2, endpoint, member ID, or any escape channel fails.

### 5.2 `DENIED_PUBLIC_MEMBER_IN`

```text
deniedMemberId=ONE_OF[DENIED_MEMBER_SET]
corruptionTransformId=NONE
failureOperation=NOT_PROBE
O=[DENIED_LOOKUP,DENIED_PUBLIC_MEMBER_IN,2,1,
   [DENIED_MEMBER,PUBLIC_SUBJECT],[LOOKUP_RESULT],NONE]
A=[TO_BE_FALSE,FALSE_VALUE,LOOKUP_RESULT,DENIED_LOOKUP,true,true]
R=[ASSERTION_SUBJECT,LOOKUP_RESULT,LOOKUP_RESULT,DENIED_LOOKUP]
R=[ASSERTION_POSTDOMINATES_OPERATION,LOOKUP_RESULT,LOOKUP_RESULT,DENIED_LOOKUP]
C=[LOOKUP_INVOCATION,1]
E=[DENIED_MEMBER,[]]
E=[LOOKUP_RESULT,[]]
E=[PUBLIC_SUBJECT,[]]
```

Positive: the exact membership lookup and false assertion match. Negative: true, absent post-dominance, count 2, changed subject, or any escape channel fails.

### 5.3 `DENIED_PUBLIC_MEMBER_KEYS`

```text
deniedMemberId=ONE_OF[DENIED_MEMBER_SET]
corruptionTransformId=NONE
failureOperation=NOT_PROBE
O=[DENIED_KEYS_ENUMERATION,OBJECT_KEYS,1,1,[PUBLIC_SUBJECT],[LOOKUP_RESULT],NONE]
A=[NOT_TO_CONTAIN,DENIED_MEMBER_VALUE,LOOKUP_RESULT,DENIED_KEYS_ENUMERATION,true,true]
R=[ASSERTION_SUBJECT,LOOKUP_RESULT,LOOKUP_RESULT,DENIED_KEYS_ENUMERATION]
R=[ASSERTION_POSTDOMINATES_OPERATION,LOOKUP_RESULT,LOOKUP_RESULT,DENIED_KEYS_ENUMERATION]
C=[KEYS_INVOCATION,1]
E=[DENIED_MEMBER,[]]
E=[LOOKUP_RESULT,[]]
E=[PUBLIC_SUBJECT,[]]
```

Positive: one keys enumeration excludes the governed member. Negative: another subject, count, expected value, or escape fails.

### 5.4 `FRESH_COPY_MUTATION`

```text
deniedMemberId=NONE
corruptionTransformId=NONE
failureOperation=NOT_PROBE
O=[READ_BYTES,FRESH_COPY_MUTATION,0,2,[PUBLIC_SUBJECT],[FIRST_COPY,SECOND_COPY],NONE]
O=[FIRST_COPY_MUTATION,FRESH_COPY_MUTATION,0,1,[FIRST_COPY],[FIRST_COPY],NONE]
A=[TO_EQUAL_CONTENT,ORIGINAL_FICTIONAL_CONTENT,SECOND_COPY,READ_BYTES,true,true]
A=[TO_EQUAL_BYTE_LENGTH,ORIGINAL_BYTE_LENGTH,SECOND_COPY,READ_BYTES,true,true]
A=[TO_EQUAL_HASH,ORIGINAL_SHA256,SECOND_COPY,READ_BYTES,true,true]
R=[MUTATES_ONLY,FIRST_COPY,NONE,FIRST_COPY_MUTATION]
R=[VALUE_CONTENT_EQUAL,SECOND_COPY,FICTIONAL_BASELINE,READ_BYTES]
R=[VALUE_BYTE_LENGTH_EQUAL,SECOND_COPY,FICTIONAL_BASELINE,READ_BYTES]
R=[VALUE_SHA256_EQUAL,SECOND_COPY,FICTIONAL_BASELINE,READ_BYTES]
R=[ASSERTION_SUBJECT,SECOND_COPY,SECOND_COPY,READ_BYTES]
R=[ASSERTION_POSTDOMINATES_OPERATION,SECOND_COPY,SECOND_COPY,READ_BYTES]
C=[MUTATION,1]
C=[READ_BYTES_INVOCATION,2]
E=[FICTIONAL_BASELINE,[]]
E=[FIRST_COPY,[]]
E=[PUBLIC_SUBJECT,[]]
E=[SECOND_COPY,[]]
```

Positive: two reads, one first-copy mutation, three equalities, and zero escape match. Negative: read count 1/3, mutation of `SECOND_COPY`, one absent equality, or any escape fails.

### 5.5 `FROZEN_OBJECT_MUTATION`

```text
deniedMemberId=NONE
corruptionTransformId=NONE
failureOperation=NOT_PROBE
O=[FROZEN_CHECK,FROZEN_OBJECT_MUTATION,1,1,[FROZEN_TARGET],[OUTCOME_STATUS],NONE]
O=[FROZEN_MUTATION,FROZEN_OBJECT_MUTATION,0,1,[FROZEN_TARGET],[],NONE]
A=[TO_BE_TRUE,TRUE_VALUE,OUTCOME_STATUS,FROZEN_CHECK,true,true]
A=[TO_THROW,NONE,FROZEN_TARGET,FROZEN_MUTATION,true,true]
R=[VALUE_IDENTITY_EQUAL,FROZEN_TARGET,FROZEN_TARGET,FROZEN_MUTATION]
R=[ASSERTION_SUBJECT,OUTCOME_STATUS,OUTCOME_STATUS,FROZEN_CHECK]
R=[ASSERTION_SUBJECT,FROZEN_TARGET,FROZEN_TARGET,FROZEN_MUTATION]
R=[ASSERTION_POSTDOMINATES_OPERATION,OUTCOME_STATUS,OUTCOME_STATUS,FROZEN_CHECK]
R=[ASSERTION_POSTDOMINATES_OPERATION,FROZEN_TARGET,FROZEN_TARGET,FROZEN_MUTATION]
C=[MUTATION,1]
E=[FROZEN_TARGET,[]]
E=[OUTCOME_STATUS,[]]
```

`OUTCOME_STATUS` is the closed role for the boolean frozen-check result in this probe; it does not carry production outcome semantics. Positive: one frozen check and one zero-argument throwing mutation of the identical target match. Negative: changed target, false assertion, non-throw, nonzero argument count, or escape fails.

### 5.6 `SYNTHETIC_CORRUPTION`

```text
deniedMemberId=NONE
corruptionTransformId=ONE_OF[TRANSFORM_SET]
failureOperation=NOT_PROBE
O=[CORRUPTION_TRANSFORM,SYNTHETIC_CORRUPTION,1,1,
   [FICTIONAL_BASELINE],[TRANSFORMED_BYTES],NONE]
O=[INJECTED_READ,PRIVATE_SEAM_READ_FILE,1,1,
   [TRANSFORMED_BYTES],[INJECTED_READ_RESULT,OUTCOME_STATUS],NONE]
A=[TO_BE_PRESERVATION_INCOMPLETE,PRESERVATION_INCOMPLETE,
   OUTCOME_STATUS,INJECTED_READ,true,true]
R=[VALUE_FLOWS_ONLY_TO,TRANSFORMED_BYTES,INJECTED_READ_RESULT,CORRUPTION_TRANSFORM]
R=[ASSERTION_SUBJECT,OUTCOME_STATUS,OUTCOME_STATUS,INJECTED_READ]
R=[ASSERTION_POSTDOMINATES_OPERATION,OUTCOME_STATUS,OUTCOME_STATUS,INJECTED_READ]
C=[CHECKER_INVOCATION,0]
C=[RETRY,0]
C=[TRANSFORM,1]
E=[FICTIONAL_BASELINE,[]]
E=[INJECTED_READ_RESULT,[]]
E=[OUTCOME_STATUS,[]]
E=[TRANSFORMED_BYTES,[]]
```

Positive: one governed transform flows only to one injected read and the incomplete assertion. Negative: unlisted transform, transform count 2, checker/retry count 1, changed consumer, or escape fails.

### 5.7 `INJECTED_MECHANICAL_FAILURE_THROW`

This probe has 14 `KEY_EQUAL` variants. A variant record contains its table row's `failureOperation` and `O` tuple plus every fixed record below. The join key is `variantId`; a missing, extra, or duplicate variant ID invalidates the mapping.

```text
deniedMemberId=NONE
corruptionTransformId=NONE
A=[TO_BE_FIRST_FAILURE,FIRST_FAILURE_OPERATION,
   FIRST_FAILURE_IDENTITY,INJECTED_FAILURE,true,true]
A=[TO_BE_PRESERVATION_INCOMPLETE,PRESERVATION_INCOMPLETE,
   OUTCOME_STATUS,INJECTED_FAILURE,true,true]
R=[FAILURE_IS_FIRST_FAILURE,FIRST_FAILURE_IDENTITY,OUTCOME_STATUS,INJECTED_FAILURE]
R=[ASSERTION_SUBJECT,FIRST_FAILURE_IDENTITY,FIRST_FAILURE_IDENTITY,INJECTED_FAILURE]
R=[ASSERTION_SUBJECT,OUTCOME_STATUS,OUTCOME_STATUS,INJECTED_FAILURE]
R=[ASSERTION_POSTDOMINATES_OPERATION,FIRST_FAILURE_IDENTITY,
   FIRST_FAILURE_IDENTITY,INJECTED_FAILURE]
R=[ASSERTION_POSTDOMINATES_OPERATION,OUTCOME_STATUS,OUTCOME_STATUS,INJECTED_FAILURE]
C=[CHECKER_INVOCATION,0]
C=[INJECTED_FAILURE,1]
C=[RETRY,0]
C=[SEMANTIC_CONSEQUENCE,0]
E=[FIRST_FAILURE_IDENTITY,[]]
E=[OUTCOME_STATUS,[]]
```

| `variantId` | `failureOperation` | Exact `O` tuple |
| --- | --- | --- |
| `THROW_CLOSE` | `PRIVATE_SEAM_CLOSE` | `[INJECTED_FAILURE,PRIVATE_SEAM_CLOSE,1,1,[],[FIRST_FAILURE_IDENTITY,OUTCOME_STATUS],THROWS_CONTENT_FREE_ERROR]` |
| `THROW_EXISTS` | `PRIVATE_SEAM_EXISTS` | `[INJECTED_FAILURE,PRIVATE_SEAM_EXISTS,1,1,[],[FIRST_FAILURE_IDENTITY,OUTCOME_STATUS],THROWS_CONTENT_FREE_ERROR]` |
| `THROW_FSYNC` | `PRIVATE_SEAM_FSYNC` | `[INJECTED_FAILURE,PRIVATE_SEAM_FSYNC,1,1,[],[FIRST_FAILURE_IDENTITY,OUTCOME_STATUS],THROWS_CONTENT_FREE_ERROR]` |
| `THROW_LSTAT` | `PRIVATE_SEAM_LSTAT` | `[INJECTED_FAILURE,PRIVATE_SEAM_LSTAT,1,1,[],[FIRST_FAILURE_IDENTITY,OUTCOME_STATUS],THROWS_CONTENT_FREE_ERROR]` |
| `THROW_MKDIR` | `PRIVATE_SEAM_MKDIR` | `[INJECTED_FAILURE,PRIVATE_SEAM_MKDIR,2,1,[],[FIRST_FAILURE_IDENTITY,OUTCOME_STATUS],THROWS_CONTENT_FREE_ERROR]` |
| `THROW_OPEN` | `PRIVATE_SEAM_OPEN` | `[INJECTED_FAILURE,PRIVATE_SEAM_OPEN,3,1,[],[FIRST_FAILURE_IDENTITY,OUTCOME_STATUS],THROWS_CONTENT_FREE_ERROR]` |
| `THROW_READ_FILE` | `PRIVATE_SEAM_READ_FILE` | `[INJECTED_FAILURE,PRIVATE_SEAM_READ_FILE,1,1,[],[FIRST_FAILURE_IDENTITY,OUTCOME_STATUS],THROWS_CONTENT_FREE_ERROR]` |
| `THROW_REALPATH` | `PRIVATE_SEAM_REALPATH` | `[INJECTED_FAILURE,PRIVATE_SEAM_REALPATH,1,1,[],[FIRST_FAILURE_IDENTITY,OUTCOME_STATUS],THROWS_CONTENT_FREE_ERROR]` |
| `THROW_REMOVE` | `PRIVATE_SEAM_REMOVE` | `[INJECTED_FAILURE,PRIVATE_SEAM_REMOVE,2,1,[],[FIRST_FAILURE_IDENTITY,OUTCOME_STATUS],THROWS_CONTENT_FREE_ERROR]` |
| `THROW_RENAME` | `PRIVATE_SEAM_RENAME` | `[INJECTED_FAILURE,PRIVATE_SEAM_RENAME,2,1,[],[FIRST_FAILURE_IDENTITY,OUTCOME_STATUS],THROWS_CONTENT_FREE_ERROR]` |
| `THROW_REPOSITORY_ROOT` | `PRIVATE_SEAM_REPOSITORY_ROOT` | `[INJECTED_FAILURE,PRIVATE_SEAM_REPOSITORY_ROOT,1,1,[],[FIRST_FAILURE_IDENTITY,OUTCOME_STATUS],THROWS_CONTENT_FREE_ERROR]` |
| `THROW_SHA256` | `PRIVATE_SEAM_SHA256` | `[INJECTED_FAILURE,PRIVATE_SEAM_SHA256,1,1,[],[FIRST_FAILURE_IDENTITY,OUTCOME_STATUS],THROWS_CONTENT_FREE_ERROR]` |
| `THROW_STAT` | `PRIVATE_SEAM_STAT` | `[INJECTED_FAILURE,PRIVATE_SEAM_STAT,1,1,[],[FIRST_FAILURE_IDENTITY,OUTCOME_STATUS],THROWS_CONTENT_FREE_ERROR]` |
| `THROW_WRITE` | `PRIVATE_SEAM_WRITE` | `[INJECTED_FAILURE,PRIVATE_SEAM_WRITE,5,1,[],[FIRST_FAILURE_IDENTITY,OUTCOME_STATUS],THROWS_CONTENT_FREE_ERROR]` |

Positive: exactly one listed seam throws a content-free error and is first. Negative: a changed operation/count, two failures, checker/retry/semantic count 1, content-bearing throw, or escape fails.

### 5.8 `INJECTED_MECHANICAL_FAILURE_PROGRESS`

```text
deniedMemberId=NONE
corruptionTransformId=NONE
failureOperation=PRIVATE_SEAM_WRITE
O=[INJECTED_FAILURE,PRIVATE_SEAM_WRITE,5,1,
   [EXPECTED_BYTE_LENGTH],[FIRST_FAILURE_IDENTITY,OUTCOME_STATUS,RETURNED_PROGRESS],
   ONE_OF[RETURNS_SHORT_PROGRESS,RETURNS_ZERO_PROGRESS]]
A=[TO_BE_FIRST_FAILURE,FIRST_FAILURE_OPERATION,
   FIRST_FAILURE_IDENTITY,INJECTED_FAILURE,true,true]
A=[TO_BE_PRESERVATION_INCOMPLETE,PRESERVATION_INCOMPLETE,
   OUTCOME_STATUS,INJECTED_FAILURE,true,true]
R=[FAILURE_IS_FIRST_FAILURE,FIRST_FAILURE_IDENTITY,OUTCOME_STATUS,INJECTED_FAILURE]
R=[PROGRESS_LESS_THAN_EXPECTED_LENGTH,RETURNED_PROGRESS,
   EXPECTED_BYTE_LENGTH,INJECTED_FAILURE]
R=[ASSERTION_SUBJECT,FIRST_FAILURE_IDENTITY,FIRST_FAILURE_IDENTITY,INJECTED_FAILURE]
R=[ASSERTION_SUBJECT,OUTCOME_STATUS,OUTCOME_STATUS,INJECTED_FAILURE]
R=[ASSERTION_POSTDOMINATES_OPERATION,FIRST_FAILURE_IDENTITY,
   FIRST_FAILURE_IDENTITY,INJECTED_FAILURE]
R=[ASSERTION_POSTDOMINATES_OPERATION,OUTCOME_STATUS,OUTCOME_STATUS,INJECTED_FAILURE]
C=[CHECKER_INVOCATION,0]
C=[INJECTED_FAILURE,1]
C=[RETRY,0]
C=[SEMANTIC_CONSEQUENCE,0]
E=[EXPECTED_BYTE_LENGTH,[]]
E=[FIRST_FAILURE_IDENTITY,[]]
E=[OUTCOME_STATUS,[]]
E=[RETURNED_PROGRESS,[]]
```

Positive: one five-argument private-seam write returns zero/short progress below expected length. Negative: full progress, another seam, count 2, changed first-failure identity, or escape fails.

### 5.9 `CHECKER_EXCEPTION_AFTER_VERIFIED_CAPTURE`

```text
deniedMemberId=NONE
corruptionTransformId=NONE
failureOperation=NOT_PROBE
O=[CHECKER,CHECKER_EXCEPTION_AFTER_VERIFIED_CAPTURE,1,1,
   [CHECKER_INPUT],[FIRST_FAILURE_IDENTITY],THROWS_CONTENT_FREE_ERROR]
O=[RECEIPT_REREAD,CHECKER_EXCEPTION_AFTER_VERIFIED_CAPTURE,0,1,
   [VERIFIED_REFERENCE],[RECEIPT_REREAD_VALUE],NONE]
O=[RESPONSE_REREAD,CHECKER_EXCEPTION_AFTER_VERIFIED_CAPTURE,0,1,
   [VERIFIED_REFERENCE],[RESPONSE_REREAD_VALUE],NONE]
A=[TO_BE_IDENTITY_UNCHANGED,PRIOR_REREAD_IDENTITY,
   RECEIPT_REREAD_VALUE,RECEIPT_REREAD,true,true]
A=[TO_BE_IDENTITY_UNCHANGED,PRIOR_REREAD_IDENTITY,
   RESPONSE_REREAD_VALUE,RESPONSE_REREAD,true,true]
R=[OPERATION_PRECEDES_OPERATION,VERIFIED_REFERENCE,CHECKER_INPUT,CHECKER]
R=[CHECKER_INPUT_ONLY_VERIFIED_REFERENCE,VERIFIED_REFERENCE,CHECKER_INPUT,CHECKER]
R=[VALUE_IDENTITY_EQUAL,RECEIPT_REREAD_VALUE,VERIFIED_REFERENCE,RECEIPT_REREAD]
R=[VALUE_IDENTITY_EQUAL,RESPONSE_REREAD_VALUE,VERIFIED_REFERENCE,RESPONSE_REREAD]
R=[ASSERTION_SUBJECT,RECEIPT_REREAD_VALUE,RECEIPT_REREAD_VALUE,RECEIPT_REREAD]
R=[ASSERTION_SUBJECT,RESPONSE_REREAD_VALUE,RESPONSE_REREAD_VALUE,RESPONSE_REREAD]
R=[ASSERTION_POSTDOMINATES_OPERATION,
   RECEIPT_REREAD_VALUE,RECEIPT_REREAD_VALUE,RECEIPT_REREAD]
R=[ASSERTION_POSTDOMINATES_OPERATION,
   RESPONSE_REREAD_VALUE,RESPONSE_REREAD_VALUE,RESPONSE_REREAD]
C=[CHECKER_INVOCATION,1]
C=[DELIVERY,0]
C=[RETRY,0]
E=[CHECKER_INPUT,[]]
E=[FIRST_FAILURE_IDENTITY,[]]
E=[RECEIPT_REREAD_VALUE,[]]
E=[RESPONSE_REREAD_VALUE,[]]
E=[VERIFIED_REFERENCE,[]]
```

Positive: verified reference dominates one checker, is its sole input, checker throws content-free, and both reread identities remain unchanged. Negative: checker precedes capture, another input exists, count differs, identity changes, delivery/retry count 1, or escape fails.

## 6. D6-07 Failure-Operation Schema Reconciliation

The prospective correction is exactly:

```text
ProbeStructure.failureOperation:ProbeFailureOperation
ProbeStructureSelector.failureOperations:Selector<ProbeFailureOperation>

ProbeFailureOperation =
  NOT_PROBE |
  PRIVATE_SEAM_SHA256 |
  PRIVATE_SEAM_REPOSITORY_ROOT |
  PRIVATE_SEAM_REALPATH |
  PRIVATE_SEAM_LSTAT |
  PRIVATE_SEAM_STAT |
  PRIVATE_SEAM_EXISTS |
  PRIVATE_SEAM_MKDIR |
  PRIVATE_SEAM_OPEN |
  PRIVATE_SEAM_WRITE |
  PRIVATE_SEAM_FSYNC |
  PRIVATE_SEAM_CLOSE |
  PRIVATE_SEAM_RENAME |
  PRIVATE_SEAM_READ_FILE |
  PRIVATE_SEAM_REMOVE |
  UNKNOWN
```

`NOT_PROBE` means no private-seam injected-failure operation applies. It is used by the exact non-probe structure and by authorised probe families that are not injected-private-seam failure probes. No second sentinel is introduced. `OperationIdV2.UNKNOWN` is not overloaded.

Positive: a throw/progress probe carries its selected private-seam ID; another probe carries `NOT_PROBE`. Negative: a throw/progress probe carrying `NOT_PROBE`, a non-failure probe carrying a private-seam ID, or any authorised probe carrying `UNKNOWN` fails.

This changes only the prospective probe-local extension field type. Base D3-V2 remains unchanged.

## 7. D6-08 Derived ProbeValidity

`ProbeValidity` is recomputed and never accepted as a permission input:

```text
probeFamily=NOT_PROBE plus exact non-probe structure -> NOT_PROBE
required invalid or UNKNOWN constituent -> UNKNOWN
exactly one complete D6 predicate match -> AUTHORISED
zero complete D6 predicate matches -> UNAUTHORISED
multiple complete D6 predicate matches -> UNAUTHORISED
```

The exact non-probe structure is:

```text
scope=NOT_PROBE
deniedMemberId=NONE
corruptionTransformId=NONE
failureOperation=NOT_PROBE
operations=[]
assertions=[]
relations=[]
counters=[]
escapes=[]
```

A supplied `ProbeValidity=AUTHORISED` that differs from recomputation invalidates the capture and fails. It cannot authorize a probe.

## 8. Positive/Negative Closure Test

| Closure family | Positive | Otherwise-identical negative | Distinguishable |
| --- | --- | --- | --- |
| Filesystem identity | imported `node:fs` base ID | parameter `PRIVATE_SEAM` under base ID | Yes |
| Private seam identity | focused-test parameter under seam ID | imported platform root under seam ID | Yes |
| Byte labels | one of seven closed labels | `SOURCE_STRING`, `JSON_LOCAL`, `NUMBER`, `UNKNOWN` | Yes |
| Assertion values | one of 15 closed labels and five provenance kinds | source/response/path/sensitive/semantic/excluded label or import/global provenance | Yes |
| Probe operation | exact role/operation/count tuple | changed operation or count | Yes |
| Probe key sets | exact `KEY_EQUAL` set | missing, extra, duplicate, malformed, or unknown key | Yes |
| Assertions | exact six-field assertion key | changed matcher, expected, subject, operation, callback, or dominance | Yes |
| Relations | exact four-field relation key | changed kind or endpoint | Yes |
| Counters | exact key/count | changed or omitted count | Yes |
| Escapes | exact role with `EQUALS[]` | any escape channel or missing role | Yes |
| Failure operation | exact private-seam ID or `NOT_PROBE` | wrong ID, non-applicable mismatch, or `UNKNOWN` | Yes |
| Probe validity | recomputed exact-one match | asserted value without matching constituents | Yes |

No new structural dimension is required.

## 9. Machine-Closure Validation

| Validation | Result |
| --- | --- |
| Three D4 closure rows | Pass |
| Nine probe mappings | Pass |
| Fourteen throw variants | Pass |
| D6-07 coherent fact/selector type | Pass |
| `ProbeValidity` independently recomputable | Pass |
| Closed enums and selector sets | Pass |
| Exact operation/count/input/output/failure records | Pass |
| Exact assertion/relation/counter/escape keys | Pass |
| `KEY_EQUAL` missing/extra/duplicate failure | Pass |
| Raw source-derived values absent | Pass |
| Arbitrary record IDs/local names absent | Pass |
| Normative shorthand absent from Sections 3, 5, 6, and 7 | Pass |
| D3-V2 field/selector/relation/capability addition | None |
| Rule-order dependency | None |

All third-attempt blockers are closed:

```text
T3-D4-01=CLOSED
T3-D4-02=CLOSED
T3-D4-03=CLOSED
T3-D6-01=CLOSED
T3-D6-02=CLOSED
T3-D6-03=CLOSED
T3-D6-04=CLOSED
T3-D6-05=CLOSED
T3-D6-06=CLOSED
T3-D6-07=CLOSED
T3-D6-08=RECOMPUTED
```

## 10. Preserved State

| Area | Result |
| --- | --- |
| Historical candidate | Unchanged at 6,350 canonical bytes and the recorded SHA-256 |
| Failed V2 authoring record | Unchanged |
| Candidate V2 | Not created; no candidate payload authored or corrected |
| Prior governance records | Unchanged |
| D3-V2 | Unchanged |
| D5 | Exactly 37 predicates / 17 families unchanged |
| Check 5 | `UNMEASURED` |
| Check 6 | `NOT RUN` |
| Implementation | `UNACCEPTED` |
| Semantic/programme consequence | None |

## 11. Outcome Decision

### Outcome 1 - Exact D4/D6 machine values and mappings fully settled

**Selected.** All three D4 closures and `T3-D6-01` through `T3-D6-07` now have exact machine data. `T3-D6-08` recomputes successfully. No base D3-V2 extension is required.

### Outcome 2 - One or more exact machine choices remain unresolved

Not selected. No exact value, endpoint, key set, operation mapping, assertion, relation, counter, escape record, or failure type remains open.

### Outcome 3 - Existing structural model is still insufficient

Not selected. Every governed positive/negative pair remains distinguishable.

## 12. Authority Boundary and Next Gate

```text
D4/D6 predicate-authoring Authority=NONE
candidate-authoring Authority=NONE
instrument Authority=NONE
Check 5 Authority=NONE
Check 6 Authority=NONE
acceptance Authority=NONE
```

No Authority is granted to author predicates; edit D3-V2, D4, D5, D6, prior records, the historical candidate, failed V2 record, or implementation; create or correct Candidate V2; inspect governed source; build, inspect, modify, readiness-test, or execute an instrument; run Check 5, Check 6, tests, typecheck, ESLint, Git validation, implementation validation, freeze, acceptance, harness work, or experiment execution.

The only next gate that may now be considered is:

```text
HH-0000 CHECK 5 D4/D6 TERMINAL PREDICATE MACHINE-ENCODING COMPLETION REVIEW - FOURTH ATTEMPT
```

It is not candidate authoring and is not performed automatically.

## 13. Final State

```text
OUTCOME 1 - HH-0000 CHECK 5 D4 D6 EXACT MACHINE VALUE AND MAPPING COMPLETION REVIEW CLOSES ALL THIRD-ATTEMPT BLOCKERS - THREE D4 CLOSURES COMPLETE - NINE D6 PROBE MAPPINGS COMPLETE - FOURTEEN THROW VARIANTS COMPLETE - FAILURE-OPERATION TYPE RECONCILED - PROBEVALIDITY RECOMPUTABLE AND NOT PERMISSION-BEARING - REMAINING ZERO - D3-V2 UNCHANGED - D5 THIRTY-SEVEN PREDICATES SEVENTEEN FAMILIES UNCHANGED - HISTORICAL CANDIDATE 6350 BYTES SHA256 FF71059E5FBAD04831BF8CBC6D408B44B265D8657446A1FE8C2B0C8E8D972186 UNCHANGED - FAILED V2 AUTHORING RECORD UNCHANGED - CANDIDATE V2 NOT CREATED - CHECK 5 UNMEASURED - CHECK 6 NOT RUN - IMPLEMENTATION UNACCEPTED - NO PREDICATE CANDIDATE INSTRUMENT CHECK 5 CHECK 6 OR ACCEPTANCE AUTHORITY - FOURTH-ATTEMPT COMPLETION REVIEW MAY BE CONSIDERED - STOP
```

D4/D6 exact machine value and mapping completion review stops here.