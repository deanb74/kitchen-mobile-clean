# HH-0000 Check 5 D4/D6 Terminal Predicate Machine-Encoding Completion Review - Third Attempt

**Status:** OUTCOME 2 - ENCODING INCOMPLETE DESPITE SUFFICIENT D3-V2
**Review date:** 2026-08-14
**Review type:** Documentation-only mechanical instantiation and validation review
**Immediate controlling record:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_D4_D6_TERMINAL_PREDICATE_ENCODING_DECISIONS_COMPLETION_REVIEW.md`
**Second-attempt review:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_D4_D6_TERMINAL_PREDICATE_MACHINE_ENCODING_COMPLETION_REVIEW_SECOND_ATTEMPT.md`
**Structural completion record:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_D3_V2_D4_D6_STRUCTURAL_FACT_COMPLETION_REVIEW.md`
**Inherited D3-V2 record:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_D3_STRUCTURAL_FACT_MODEL_COMPLETION_REVIEW.md`
**Inherited D4/D6 semantics:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_CANONICAL_POLICY_MACHINE_SCHEMA_AND_PREDICATE_COMPLETION_REVIEW.md`
**Inherited D5 data:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_D5_PROHIBITED_PREDICATE_COMPLETION_REVIEW_THIRD_ATTEMPT.md`
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
**Theory:** A settled encoding decision is not complete machine policy until every required field contains one closed machine value and every relation has exact endpoints.
**Architecture:** Existing D3-V2 plus the prospectively settled structural extension, prohibited-first evaluation, complete terminal evaluation, and exact-one acceptance.
**Engineering:** Attempted closed-data instantiation over all 75 base D4 operation IDs, 14 private-seam IDs, and nine D6 probe IDs; required-field, enum, selector, key-set, identity, and falsifier checks; fail-closed stop before partial payload.
**Milestone:** Not Applicable.
**Evidence:** This documentation-only incompleteness decision. No D4/D6 predicate set, candidate, implementation, instrument, Check 5, Check 6, freeze, or acceptance Evidence is produced.

## 1. Sole Question and Result

> Can the complete governed D4 and D6 terminal policy now be represented as closed, exact, schema-valid machine data using the existing D3-V2 fact model plus the 17 settled encoding decisions, with zero remaining author judgement, prose shorthand, hidden matcher logic, or implementation-derived values?

**No. Outcome 2 is selected.**

The controlling result remains true:

```text
17/17 SETTLED
remaining=0 within the controlling register
D3-V2 unchanged
```

The third-attempt instantiation exposed exact machine values and schema mappings that were not entries in that register. They cannot be inferred from implementation, guessed from API conventions, or filled by generic `UNKNOWN`. No partial predicate payload is preserved.

## 2. Mechanical Instantiation Boundary

The attempted representation required:

1. one closed required-field schema for every D4 and D6 terminal record;
2. an explicit value for every selector;
3. an exact closed argument-label set at every indexed or universal argument constraint;
4. one unambiguous root/provenance/operation identity per branch;
5. exact `KEY_EQUAL` role sets for every D6 child collection;
6. one existing enum value for every operation, value, assertion, relation, counter, escape, transform, and failure field; and
7. complete recomputation of `ProbeValidity` from those records.

Instantiation stopped before authoring data when the first unresolved value was encountered. Continuing would have created normative choices in a review authorised only to translate settled choices.

## 3. Complete Coverage Attempt

### 3.1 D4 base operation inventory

All 75 governed base operation IDs were checked:

```text
CRYPTO_CREATE_HASH_SHA256 HASH_UPDATE HASH_DIGEST_HEX
FS_REALPATH FS_LSTAT FS_STAT FS_EXISTS FS_MKDIR FS_OPEN_EXCLUSIVE FS_WRITE
FS_FSYNC FS_CLOSE FS_RENAME FS_READ_FILE FS_REMOVE_BOUNDED
PATH_RESOLVE PATH_JOIN PATH_RELATIVE PATH_DIRNAME PATH_BASENAME
PATH_IS_ABSOLUTE PATH_SEP_READ REPOSITORY_ROOT_RESOLVE
BUFFER_FROM_UTF8 BUFFER_COMPARE BUFFER_IS_BUFFER UINT8ARRAY_FROM
BYTE_SLICE BYTE_LENGTH_READ JSON_STRINGIFY JSON_PARSE OBJECT_FREEZE
OBJECT_KEYS OBJECT_VALUES OBJECT_ENTRIES ARRAY_IS_ARRAY ARRAY_MAP ARRAY_EVERY
ARRAY_SOME ARRAY_INCLUDES ARRAY_JOIN ARRAY_SLICE ARRAY_PUSH ARRAY_SORT
SET_ADD SET_HAS MAP_GET MAP_SET MAP_HAS REGEXP_TEST NUMBER_IS_FINITE
NUMBER_IS_INTEGER DATE_PARSE DATE_TO_ISO_STRING STRING_STARTS_WITH
STRING_ENDS_WITH STRING_INCLUDES STRING_SPLIT STRING_TRIM STRING_TO_LOWER
STRING_TO_UPPER NEW_DATE NEW_ERROR_CONTENT_FREE NEW_SET NEW_MAP
NEW_UINT8ARRAY LOCAL_PRIVATE_CALL JEST_DESCRIBE JEST_IT JEST_EXPECT JEST_FN
JEST_SPY_ON EXPECT_MATCHER OS_TMPDIR PRESERVE_RESPONSE_EVIDENCE_TEST_CALL
```

The settled cardinalities, governed literal IDs, receiver classes, callable tuples, role-root relations, rename pairs, read/remove relations, destination labels, and flow labels are representable. Exact instantiation fails for the D4 machine values in Section 4.

### 3.2 Private-seam inventory

All 14 governed private-seam IDs were checked:

```text
PRIVATE_SEAM_SHA256 PRIVATE_SEAM_REPOSITORY_ROOT PRIVATE_SEAM_REALPATH
PRIVATE_SEAM_LSTAT PRIVATE_SEAM_STAT PRIVATE_SEAM_EXISTS PRIVATE_SEAM_MKDIR
PRIVATE_SEAM_OPEN PRIVATE_SEAM_WRITE PRIVATE_SEAM_FSYNC PRIVATE_SEAM_CLOSE
PRIVATE_SEAM_RENAME PRIVATE_SEAM_READ_FILE PRIVATE_SEAM_REMOVE
```

Their settled callable tuple is representable. Exact branch identity remains blocked by the base-filesystem/private-seam overlap in `T3-D4-01`.

### 3.3 D6 inventory

All nine governed probe IDs were checked:

```text
DENIED_PUBLIC_MEMBER_REFLECT_GET
DENIED_PUBLIC_MEMBER_IN
DENIED_PUBLIC_MEMBER_KEYS
FRESH_COPY_MUTATION
FROZEN_OBJECT_MUTATION
SYNTHETIC_CORRUPTION
INJECTED_MECHANICAL_FAILURE_THROW
INJECTED_MECHANICAL_FAILURE_PROGRESS
CHECKER_EXCEPTION_AFTER_VERIFIED_CAPTURE
```

Scenario scope, finite endpoint roles, count facts, assertion facts, dominance booleans, equality relation kinds, transform identities, failure identities, and escape channels are structurally available. Exact predicate records remain blocked by Section 4.

## 4. Exact Missing Machine Values and Schema Fields

| ID | Area | Exact missing value or schema field | Positive falsifier | Negative falsifier | Why this review cannot fill it |
| --- | --- | --- | --- | --- | --- |
| `T3-D4-01` | D4 filesystem/private seam | The base `FS_REALPATH` through `FS_REMOVE_BOUNDED` rows list roots `node:fs,PRIVATE_SEAM` under base provenance `IMPORT_BINDING or BUILTIN_GLOBAL`, while the 14 explicit `PRIVATE_SEAM_*` rows use root `PRIVATE_SEAM` and provenance `PARAMETER`. Machine data must choose whether each base `FS_*` predicate retains a `PRIVATE_SEAM` root branch, drops it as duplicate/dead, or creates a second base-operation parameter branch. | platform `FS_WRITE` with imported fs root and the explicit parameter `PRIVATE_SEAM_WRITE` branch each classify once | a parameter-root call matches both identities, or a governed root is silently removed | No controlling decision selects one of the three materially different branch sets |
| `T3-D4-02` | D4 byte arguments | `BUFFER_COMPARE`, `BUFFER_IS_BUFFER`, and `UINT8ARRAY_FROM` require the exact sorted `DataLabelV2` values denoted by “byte labels”. No controlling machine record enumerates that selector set. | a governed fictional/source byte argument matches | a non-byte local value fails | Inferring labels from names ending in `BYTES` is hidden token logic; copying an ad hoc list would be new policy data |
| `T3-D4-03` | D4 Jest arguments | `JEST_EXPECT` and the count-1 `EXPECT_MATCHER` branch require an exact `provenanceKinds` selector and exact `dataLabels` selector for “fictional/local mechanical fact(s)”. The controlling decision fixed count 0/1 but retained these selectors without enumerating their values. | a fictional response-derived assertion value matches | source, response, machine-local, or semantic content fails | The enum contains multiple local, public, fictional, path, byte, and governance labels; choosing the permitted subset changes terminal coverage |
| `T3-D6-01` | D6 operation facts | Every `ProbeOperationFact.operation` requires `OperationIdV2`, but no record maps each `ProbeOperationRole` in each of the nine probes to one exact operation ID or closed `ONE_OF` set. Roles such as `READ_BYTES`, `FROZEN_CHECK`, `FROZEN_MUTATION`, `CHECKER`, `RESPONSE_REREAD`, and `RECEIPT_REREAD` have no recorded operation-field value. | each role carries its governed operation identity | a changed sub-operation fails | Substituting the enclosing probe ID, a D4 operation ID, or `UNKNOWN` are different encodings; none is selected |
| `T3-D6-02` | D6 role-key completeness | `KEY_EQUAL` requires exact operation, assertion, relation, counter, and escape key sets. The nine-probe mapping names required concepts but does not enumerate each complete composite key set using `ProbeOperationRole`, `AssertionMatcher + AssertionExpected + ProbeValueRole + ProbeOperationRole`, `ProbeRelationKind + leftRole + rightRole + operationRole`, `ProbeCounter`, and `ProbeValueRole`. | every required key appears exactly once and no extra key exists | one key is missing, duplicated, changed, or extra | Building the sets requires choosing role assignments not fixed by the mapping prose |
| `T3-D6-03` | D6 input/output role sets | Each `ProbeOperationConstraint` requires exact `inputRoles` and `outputRoles` `SetSelector` values. The nine-probe mapping does not provide those sets for every operation role. | lookup consumes `PUBLIC_SUBJECT,DENIED_MEMBER` and produces its selected result role | lookup consumes or produces a different role | Deriving complete def-use sets from narrative meaning would be predicate authorship, not mechanical transcription |
| `T3-D6-04` | D6 value-role identity | The nine-probe mapping uses concepts including keys result, mutation result, failure value, outcome role, and reread role without selecting exact existing `ProbeValueRole` members for every occurrence. Some named concepts have no identically named enum member. | each concept maps to one closed role | the same concept maps to another role or `UNKNOWN` | Alias selection would be hidden matcher logic unless governed explicitly |
| `T3-D6-05` | D6 assertion records | Every required assertion needs one complete key: matcher, expected value, subject role, operation role, `sameTestCallback=true`, and `postDominates=true`. The mappings do not enumerate all six values for the fresh-copy equalities, frozen assertions, incomplete outcomes, first-failure assertions, and reread identity assertions. | the full governed assertion key matches | matcher is unchanged but subject, producer, expected value, or dominance differs | Filling absent key fields requires choosing endpoints beyond the settled generic relation type |
| `T3-D6-06` | D6 escape records | `KEY_EQUAL` and `channels=EQUALS[]` require the exact complete `ProbeValueRole` key set for each probe. The mapping lists selected role descriptions but does not state whether every operation output, assertion subject, baseline, expected value, outcome, and failure identity must have an escape record. | every governed value role has one explicit zero-channel record | an omitted role escapes through module storage, closure, return, filesystem, retry, feedback, or delivery | Omission cannot prove zero, while adding keys changes exact equality; the complete set is not selected |
| `T3-D6-07` | D6 failure-operation field type | `ProbeStructure` declares `failureOperation:OperationIdV2`; the encoding-decisions review defines and selects `ProbeFailureOperation`, including `NOT_PROBE`. No settled schema states whether the fact field type changes, whether only the selector uses the new enum, or how `NOT_PROBE` inhabits `OperationIdV2`. | non-probe structure carries one schema-valid non-applicable value; failure probe carries a listed seam ID | non-probe uses `UNKNOWN`, or applicable probe uses a non-applicable value | The two closed types are not substitutable without a schema decision |
| `T3-D6-08` | D6 derived validity | Exact `ProbeValidity` recomputation requires the complete nine D6 predicate set. Because `T3-D6-01` through `T3-D6-07` prevent those predicates from existing, the exact-one match input set is absent. | exactly one fully instantiated D6 predicate matches | zero, multiple, malformed, or unknown constituent records do not authorize | Recording `AUTHORISED` now would make the derived value an unexplained permission-bearing oracle |

Missing register totals:

```text
D4 exact missing items=3
D6 exact missing items=8
total exact missing items=11
```

These items do not reopen or negate the 17 settled decisions. They are defects exposed only when the review attempted to instantiate every required machine field.

## 5. Mechanical Validation Results

| Required validation | Result | Finding |
| --- | --- | --- |
| Exact required field sets | Fail | D6 failure-operation type and complete child records unresolved |
| No additional properties | Not reached | No partial payload created |
| Closed enum membership | Fail | D6 role-to-operation values and failure-operation type unresolved |
| Valid selector modes | Pass prospectively | Existing selector modes and settled nested modes are closed |
| Sorted unique selector values | Not reached | Missing sets were not invented |
| Unique deterministic predicate IDs | Not reached | Predicate records were not authored |
| Exact D4 operation/branch coverage | Fail | Base filesystem/private-seam branch identity unresolved |
| Exactly 14 private-seam IDs | Pass inventory | All 14 IDs are enumerated in Section 3.2 |
| Exactly nine D6 probe IDs | Pass inventory | All nine IDs are enumerated in Section 3.3 |
| Settled arity/count constraints | Pass prospectively | All 11 controlling D4 decisions remain settled |
| Governed literal identities | Pass prospectively | SHA-256, hex, UTF-8, `wx`, and owner-only mode IDs remain closed |
| D6 constituents independently represented | Fail | Exact operation, key, role-set, assertion, and escape values missing |
| `ProbeValidity` recomputable | Fail | Complete D6 predicate match set absent |
| No unresolved shorthand | Fail for source inputs | The inherited byte-label and fictional/local categories are not machine value sets |
| No implementation-derived value | Pass | No implementation source inspected |
| No new D3 field/selector/enum/relation/capability | Pass | D3-V2 unchanged; no repair attempted |
| Rule-order independence | Pass prospectively | Prohibited-first/all-terminal evaluation unchanged |
| Positive/negative falsifiers distinguishable | Pass structurally | No pair proves Outcome 3; exact predicate endpoints remain unset |

## 6. D3 Sufficiency and Outcome 3 Test

No pair requiring different governed outcomes was found to have identical prospective normalized facts. Each missing item is an unselected machine value, key set, field type, or branch mapping within available structural dimensions.

```text
D3_V2_CHANGE=NONE
structural indistinguishability found=false
```

Outcome 3 does not control. This review does not add a fact, selector, enum, relation, or capability.

## 7. Preserved State and Compatibility

| Area | Result |
| --- | --- |
| Historical candidate | Unchanged at 6,350 canonical bytes and the recorded SHA-256 |
| Failed V2 authoring record | Unchanged |
| Candidate V2 | Not created; no candidate payload authored or corrected |
| Prior 17-decision review | Unchanged; `17/17 SETTLED` remains its result |
| D3-V2 structural decisions | Unchanged |
| D5 | Exactly 37 predicates / 17 families unchanged |
| D5 prohibited-first evaluation | Unchanged |
| Exact-one terminal classification | Unchanged |
| Public API, source identities, imports, repository/launch identity | Unchanged |
| One-use Authority, capture/manifest, consumption point, mandatory stop | Unchanged |
| Check 5 | `UNMEASURED` |
| Check 6 | `NOT RUN` |
| Implementation | `UNACCEPTED` |
| Semantic/programme consequence | None |

## 8. Outcome Decision

### Outcome 1 - D4/D6 terminal predicate machine encoding complete

Not selected. Eleven exact machine values or schema mappings remain absent, so the required normative predicate data cannot be produced mechanically.

### Outcome 2 - Encoding incomplete despite sufficient D3-V2

**Selected.** The 11 items in Section 4 are the complete observed blockers. This review does not fill them.

```text
D4/D6_MACHINE_ENCODING=INCOMPLETE
REMAINING_ENCODING_CHOICES=11
D3_V2_CHANGE=NONE
```

The D4/D6 dependency that caused the failed V2 candidate authoring is not yet closed prospectively.

### Outcome 3 - Structural insufficiency remains

Not selected. No structurally indistinguishable positive/negative pair was found.

## 9. Authority Boundary and Stop

```text
D4 predicate-authoring Authority=NONE
D6 predicate-authoring Authority=NONE
candidate-authoring Authority=NONE
instrument Authority=NONE
Check 5 Authority=NONE
Check 6 Authority=NONE
```

No Authority is granted to decide or fill the 11 missing items; edit D3-V2, D4, D5, D6, prior records, the historical candidate, failed V2 record, or implementation; create or correct Candidate V2; inspect governed source; build, inspect, modify, readiness-test, or execute an instrument; run Check 5, Check 6, tests, typecheck, ESLint, Git validation, implementation validation, freeze, acceptance, harness work, or experiment execution.

Outcome 1 was not reached. `HH-0000 CHECK 5 POST-D4/D6 COMPLETION CANDIDATE POLICY CORRECTION AUTHORITY REVIEW` is not available from this record.

## 10. Final State

```text
OUTCOME 2 - HH-0000 CHECK 5 D4 D6 TERMINAL PREDICATE MACHINE ENCODING COMPLETION REVIEW THIRD ATTEMPT FINDS ELEVEN EXACT MACHINE VALUES OR SCHEMA MAPPINGS ABSENT DESPITE SUFFICIENT D3-V2 - THREE D4 AND EIGHT D6 ITEMS IDENTIFIED - ALL SEVENTY-FIVE BASE D4 OPERATION IDS FOURTEEN PRIVATE-SEAM IDS AND NINE D6 PROBE IDS AUDITED - PRIOR SEVENTEEN DECISIONS REMAIN SETTLED - NO PARTIAL PREDICATE PAYLOAD - PROBEVALIDITY NOT YET RECOMPUTABLE - D3-V2 UNCHANGED - D5 THIRTY-SEVEN PREDICATES SEVENTEEN FAMILIES UNCHANGED - HISTORICAL CANDIDATE 6350 BYTES SHA256 FF71059E5FBAD04831BF8CBC6D408B44B265D8657446A1FE8C2B0C8E8D972186 UNCHANGED - FAILED V2 AUTHORING RECORD UNCHANGED - CANDIDATE V2 NOT CREATED - CHECK 5 UNMEASURED - CHECK 6 NOT RUN - IMPLEMENTATION UNACCEPTED - NO LIVE CANDIDATE OR EXECUTION AUTHORITY - STOP
```

D4/D6 terminal predicate machine-encoding completion review third attempt stops here.