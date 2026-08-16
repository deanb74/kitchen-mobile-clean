# HH-0000 Check 5 D4/D6 Terminal Predicate Machine-Encoding Completion Review - Second Attempt

**Status:** OUTCOME 2 - D4/D6 ENCODING REMAINS INCOMPLETE DESPITE SUFFICIENT PROSPECTIVE D3-V2 EXPRESSIVENESS
**Review date:** 2026-08-14
**Review type:** Documentation-only translation and completeness test
**Immediate predecessor:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_D3_V2_D4_D6_STRUCTURAL_FACT_COMPLETION_REVIEW.md`
**First-attempt review:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_D4_D6_TERMINAL_PREDICATE_MACHINE_ENCODING_COMPLETION_REVIEW.md`
**Inherited D3-V2 record:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_D3_STRUCTURAL_FACT_MODEL_COMPLETION_REVIEW.md`
**Inherited D4/D6 semantics:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_CANONICAL_POLICY_MACHINE_SCHEMA_AND_PREDICATE_COMPLETION_REVIEW.md`
**Inherited D5 data:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_D5_PROHIBITED_PREDICATE_COMPLETION_REVIEW_THIRD_ATTEMPT.md`
**Historical candidate:** `6350` canonical bytes / SHA-256 `ff71059e5fbad04831bf8cbc6d408b44b265d8657446a1fe8c2b0c8e8d972186` / `HISTORICAL_CANDIDATE_POLICY_EVIDENCE`
**Failed Candidate V2 authoring record:** Preserved unchanged
**Candidate V2:** Not created; identity none; partial payload none
**Governed implementation-source access:** None
**Instrument access:** None
**Check 5:** `UNMEASURED`
**Check 6:** `NOT RUN`
**Implementation:** `UNACCEPTED`
**Live candidate-authoring or execution Authority:** None

# Repository Traceability

**Principle:** Truth before certainty; evidence before claims; human Authority; smallest justified change.
**Theory:** Structural expressiveness is necessary but does not itself settle the exact predicates that determine terminal classification.
**Architecture:** D3-V2 plus the prospective D4/D6 extension, prohibited-first evaluation, complete terminal evaluation, zero-match failure, multiple-match ambiguity, and exact-one acceptance.
**Engineering:** Mechanical translation attempt over all 75 base D4 operations, 14 private-seam branches, and nine D6 probes; positive/negative falsifiers; selector-closure audit; and fail-closed stop.
**Milestone:** Not Applicable.
**Evidence:** This documentation-only completeness decision. No candidate, implementation, instrument, Check 5, Check 6, freeze, or acceptance Evidence is produced.

## 1. Sole Question and Result

> With the prospective D3-V2 D4/D6 structural-fact completion now settled, can every governed D4 terminal branch and every governed D6 authorised probe be expressed as complete, closed, exact machine predicate data with no prose interpretation, invented vocabulary, raw source-derived values, hidden matcher logic, permission encoded as an observation fact, generic `UNKNOWN` substitution for known structure, or further material governance choice?

**No. Outcome 2 is selected.**

The prospective extension can distinguish every already-governed positive/negative structural pair examined. Outcome 3 is therefore not selected. Translation nevertheless stops before complete normative predicate data because exact selector choices remain unset in two bounded areas:

1. several D4 argument-count branches do not have exact minimum/maximum values or exact optional-index branch records; and
2. D6 defines `ProbeStructure` facts but does not define a complete closed `ProbeStructureSelector` schema and matching/completeness rules.

Selecting those values here would be authoring, not translation. No candidate or instrument work follows.

## 2. Translation Inputs and Fixed Selector Rule

Each future D4/D6 terminal predicate must be a complete `PredicateV2` record plus every required selector from `HH-CHECK-5-D3-D4-D6-STRUCTURAL-EXTENSION-1`.

Existing fixed D4 columns remain:

```text
phase=TERMINAL
classification=PERMITTED_MECHANICAL_EDGE
nodeKinds=CALL except governed property reads and constructors
provenanceKinds=IMPORT_BINDING or BUILTIN_GLOBAL except:
  LOCAL_PRIVATE_CALL=LOCAL_DECLARATION
  PRIVATE_SEAM_*=PARAMETER
ancestryNone=IN_LOOP_OR_RETRY,IN_ASYNC_SCHEDULE
```

Existing D6 fixed columns remain:

```text
phase=TERMINAL
classification=AUTHORISED_TEST_PROBE
sourceRole=FOCUSED_TEST
ancestryAny=IN_IMPORTED_JEST_IT_CALLBACK,IN_IMPORTED_JEST_IT_EACH_CALLBACK
ancestryNone=IN_MODULE_SCOPE,IN_RETURN_EXPRESSION,IN_LOOP_OR_RETRY,
  IN_ASYNC_SCHEDULE,ESCAPES_TEST_CALLBACK
fictional-or-suite-owned provenance required
```

Every irrelevant new selector must be explicit `ANY` or `[]` according to its closed schema. No omitted field is a wildcard. Every inherited reference phrase must be expanded into the concrete values of the referenced row before predicate data can be complete.

## 3. Previously Missing Dimensions Re-Tested

| Dimension | Positive falsifier | Negative falsifier | Settled fact/selector | Translation result |
| --- | --- | --- | --- | --- |
| Governed literal identity | `createHash("sha256")` | same facts with `"sha512"` | argument 0 `HASH_ALGORITHM_SHA256` versus `UNKNOWN`; `governedLiteralIds` selector | Distinguishable without raw literal Evidence |
| AST argument cardinality | `FS_FSYNC` count 1 | same facts with count 2 | `argumentCount` plus `CountRangeSelector` | Distinguishable once the row's range is fixed |
| Optional presence | zero-argument `NEW_DATE` | same constructor with one argument | separate count-0 and count-1 records | Distinguishable |
| Variadic all-argument condition | every `PATH_RESOLVE` argument path-labelled | one governance-only argument | complete argument indexes plus `everyArgument` | Distinguishable |
| Callback static resolution | unique local acyclic callback | unresolved or cyclic callback | `callableFacts` constituent selectors | Distinguishable |
| Local/private target | same-file private helper | exported helper | callable scope selector | Distinguishable |
| Receiver identity | Set receiver for `SET_HAS` | String receiver | `receiverClass` | Distinguishable |
| Rename pair | response temp to response final in one directory | response temp to receipt final | `operationRelations` pair enum | Distinguishable |
| Scenario-local count | two read-byte records | one or three | `countWithinScope` and probe counters | Distinguishable |
| Required assertion | same-callback `TO_BE_UNDEFINED` | same-callback `TO_BE_TRUE` | `ProbeAssertionFact` | Distinguishable in facts; selector schema remains incomplete |
| Non-escape | empty closed escape-channel set | module store or surviving capture | `ProbeEscapeFact` | Distinguishable in facts; exact completeness rule remains unset |
| Ordering/post-dominance | verified capture dominates checker and assertion post-dominates lookup | reversed order or non-dominating assertion | probe relation plus assertion booleans | Distinguishable in facts; nested relation matching remains unset |
| Equality | second copy/baseline content, length, and hash equal | one equality absent or false | closed probe relation/assertion facts | Distinguishable in facts; required-set matching remains unset |
| Injected-failure identity | one listed seam operation is first failure | unlisted or second failure | `failureOperation`, effect, counter, and relation | Distinguishable |
| Corruption transform | one governed transform ID | unlisted transform or two transforms | `corruptionTransformId` plus transform counter | Distinguishable |
| `ProbeValidity` | exactly one complete probe predicate match | missing or conflicting constituent | recomputation from ordinary and `probeStructure` facts | Conceptually derivable, but not machine-recomputable until D6 selectors close |

No tested pair requires raw source text, regular expressions, arbitrary executable predicates, permission-valued facts, or implementation observation.

## 4. D4 Translation Audit

In this section, each comma-separated ID is independently audited. The exact governed meaning is the role/root/argument-label/destination/flow row inherited from CPD-D4. `C`, `L`, `U`, `R`, `F`, and `O` denote the settled `argumentCount`, governed-literal, universal-argument, receiver, callable, and operation-relation dimensions. “Positive” is the governed shape; “negative” changes only the stated acceptance-affecting dimension.

| D4 branch or branches | Exact governed meaning and facts/selectors | Positive / negative falsifier | Selectability | Authorial judgement |
| --- | --- | --- | --- | --- |
| `CRYPTO_CREATE_HASH_SHA256` | crypto root; one governance literal; hash state/argument flow; `C=1,L=HASH_ALGORITHM_SHA256` | `sha256` / `sha512` | Full | None |
| `HASH_UPDATE` | local hash receiver; one governed byte argument; hash input; `C=1` | one byte argument / extra argument | Full | None |
| `HASH_DIGEST_HEX` | local hash receiver; one governance literal; hash output; `C=1,L=HASH_DIGEST_HEX` | `hex` / another literal | Full | None |
| `FS_REALPATH`, `FS_LSTAT`, `FS_STAT`, `FS_EXISTS` | listed fs/seam root; one listed path argument; local filesystem-path result; `C=1` | one governed path / extra argument | Full | None |
| `FS_MKDIR` | path plus owner-only mode; listed destinations; `C=2,L[1]=FILE_MODE_OWNER_ONLY_384` | mode 384 / another number | Full | None |
| `FS_OPEN_EXCLUSIVE` | attempt path, `wx`, mode 384; temp destination; `C=3,L[1]=FILE_OPEN_EXCLUSIVE_WX,L[2]=FILE_MODE_OWNER_ONLY_384` | governed tuple / changed flag or mode | Full | None |
| `FS_WRITE` | descriptor, governed bytes, three number arguments; temp content flow; `C=5` | five arguments / missing or extra argument | Full | None |
| `FS_FSYNC`, `FS_CLOSE` | one descriptor; temp destination; `C=1` | one descriptor / extra argument | Full | None |
| `FS_RENAME` | two attempt paths; one response or receipt temp/final same-directory relation; `C=2,O` | one listed pair / mixed or cross-directory pair | Full | None |
| `FS_READ_FILE` | one attempt/final or suite path; content local; `C=1,O` read purpose | one listed read purpose / unresolved or unlisted purpose | Full | None |
| `FS_REMOVE_BOUNDED` | path plus boolean; one bounded remove relation; `C=2,O` | governed temp/suite target / final or source target | Full | None |
| `PATH_RESOLVE`, `PATH_JOIN` | one-or-more arguments; every argument in closed path-label set; `C=1..unbounded,U` | all path-labelled / one disallowed label | Full | None; minimum 1 is explicit in the structural-completion record |
| `PATH_RELATIVE` | two path-labelled arguments; `C=2` | two paths / missing or extra argument | Full | None |
| `PATH_DIRNAME`, `PATH_BASENAME`, `PATH_IS_ABSOLUTE` | one path-labelled argument; `C=1` | one path / extra argument | Full | None |
| `PATH_SEP_READ` | path-root property read; no call arguments | listed property read / changed root or operation | Full | None |
| `REPOSITORY_ROOT_RESOLVE` | one repository-precondition path; role-specific import relation; `C=1,O` | role-matched root / opposite-role root | Full | None |
| `BUFFER_FROM_UTF8` | source/fictional string plus UTF-8 literal; `C=2,L[1]=TEXT_ENCODING_UTF8` | UTF-8 / another encoding literal | Full | None |
| `BUFFER_COMPARE` | two byte-labelled arguments; `C=2` | two bytes / wrong count or label | Full | None |
| `BUFFER_IS_BUFFER`, `UINT8ARRAY_FROM` | one byte-labelled argument; `C=1` | one byte value / extra argument | Full | None |
| `BYTE_SLICE` | byte receiver and numeric start/end arguments; `R=BYTE_SEQUENCE` | listed numeric indexes / changed receiver | Partial | **D4-C01:** exact minimum/maximum count and optional-index branches are not recorded |
| `BYTE_LENGTH_READ` | byte receiver property read; `R=BYTE_SEQUENCE` | byte receiver / string receiver | Full | None |
| `JSON_STRINGIFY`, `JSON_PARSE` | one local-JSON argument; local JSON flow; `C=1` | local JSON / governed response content or extra argument | Full | None |
| `OBJECT_FREEZE`, `OBJECT_VALUES`, `OBJECT_ENTRIES`, `ARRAY_IS_ARRAY` | one argument from each row's closed label set; `C=1` | listed label / unlisted label or extra argument | Full | None |
| `OBJECT_KEYS` | one public/local-JSON argument; local or assertion destination; `C=1` | listed branch / unlisted destination | Full | None |
| `ARRAY_MAP`, `ARRAY_EVERY`, `ARRAY_SOME` | array receiver; local resolved callback at argument 0; `R=ARRAY,F` | valid callback / cyclic or prohibited callback | Partial | **D4-C02:** exact count range and treatment of any additional argument are not recorded |
| `ARRAY_INCLUDES` | array receiver; argument 0 governance/path label; `R=ARRAY` | governed searched value / disallowed searched value | Partial | **D4-C03:** exact count range and optional-index branch are not recorded |
| `ARRAY_JOIN` | array receiver; governance-field separator when present; `R=ARRAY` | governed separator branch / disallowed separator | Partial | **D4-C04:** CPD-D4 lists argument 0 while the first review records an unresolved optional-versus-required distinction; count branches are not fixed |
| `ARRAY_SLICE` | array receiver; numeric arguments; `R=ARRAY` | governed numeric branch / non-number argument | Partial | **D4-C05:** exact zero/one/two-argument branches are not recorded |
| `ARRAY_PUSH` | array receiver; one-or-more local-JSON/governance arguments; `C=1..unbounded,R=ARRAY,U` | all allowed / one disallowed argument | Full | None; minimum 1 is explicit in the structural-completion record |
| `ARRAY_SORT` | array receiver; count-0 branch or count-1 valid comparator branch; `R=ARRAY,F` | absent/valid comparator / unresolved comparator | Full | None |
| `SET_ADD`, `SET_HAS` | Set receiver; one governance/path argument; `C=1,R=SET` | Set receiver / wrong receiver | Full | None |
| `MAP_GET`, `MAP_HAS` | Map receiver; one governance argument; `C=1,R=MAP` | Map receiver / wrong receiver | Full | None |
| `MAP_SET` | Map receiver; governance key and local/governance value; `C=2,R=MAP` | governed pair / wrong count or label | Full | None |
| `REGEXP_TEST` | RegExp receiver; one governed string-like argument; `C=1,R=REGEXP` | RegExp receiver / wrong receiver | Full | None |
| `NUMBER_IS_FINITE`, `NUMBER_IS_INTEGER` | Number root; one number argument; `C=1` | one number / wrong count or label | Full | None |
| `DATE_PARSE` | Date root; one timestamp/governance argument; `C=1` | one governed argument / extra argument | Full | None |
| `DATE_TO_ISO_STRING` | Date receiver; no arguments; `C=0,R=DATE` | Date receiver / string receiver | Full | None |
| `STRING_STARTS_WITH`, `STRING_ENDS_WITH`, `STRING_INCLUDES` | String receiver; governed first argument; `R=STRING` | governed search argument / wrong label | Partial | **D4-C06:** exact count ranges and optional numeric-position branches are not recorded |
| `STRING_SPLIT` | String receiver; governance separator; `R=STRING` | governed separator / wrong label | Partial | **D4-C07:** exact count range and optional limit branch are not recorded |
| `STRING_TRIM`, `STRING_TO_LOWER`, `STRING_TO_UPPER` | String receiver; no arguments; `C=0,R=STRING` | zero arguments / extra argument | Full | None |
| `NEW_DATE` | Date constructor; count-0 branch or count-1 timestamp/governance branch | one listed branch / count 2 | Full | None |
| `NEW_ERROR_CONTENT_FREE` | Error constructor; one content-free argument; `C=1` | content-free / content-bearing or extra argument | Full | None |
| `NEW_SET`, `NEW_MAP` | constructor count-0 branch or count-1 local-collection branch | listed branch / count 2 | Full | None |
| `NEW_UINT8ARRAY` | one number/fictional-byte argument; `C=1` | listed argument / extra argument | Full | None |
| `LOCAL_PRIVATE_CALL` | uniquely resolved same-file private acyclic callee, no capability return, every reachable executable exact-one; `F[CALLEE]` | valid helper / exported, cyclic, prohibited, zero, or ambiguous helper | Full | None |
| `JEST_DESCRIBE`, `JEST_IT` | Jest root; title plus statically bounded callback; `C=2,F[ARGUMENT_1]` | unique bounded callback / unresolved or escaping callback | Partial | **D4-C08:** exact callable selector tuple for “statically bounded” is not recorded, including scope and escape values |
| `JEST_EXPECT` | one fictional/local mechanical argument; `C=1` | fictional/local value / governed response or extra argument | Full | None |
| `JEST_FN` | count-0 branch or count-1 statically resolved callback branch; `F[ARGUMENT_0]` | absent/valid callback / unresolved callback | Partial | **D4-C09:** exact callable scope, cycle, capability-return, terminal-status, and escape selectors for the present branch are not recorded |
| `JEST_SPY_ON` | synthetic fixture target and literal member; `C=2,O=SYNTHETIC_FIXTURE_MEMBER_TARGET` | synthetic/literal pair / non-synthetic or computed member | Full | None |
| `EXPECT_MATCHER` | expect-chain matcher; every matcher argument fictional/local; `U` | all arguments fictional/local / one governed-response argument | Partial | **D4-C10:** exact argument count/range per matcher operation is not recorded; one generic matcher operation cannot infer it |
| `OS_TMPDIR` | OS root; no arguments; suite-root destination; `C=0` | zero arguments / extra argument | Full | None |
| `PRESERVE_RESPONSE_EVIDENCE_TEST_CALL` | one complete options object containing fictional response; `C=1,O` | complete fictional options / incomplete or non-fictional options | Full | None |

### 4.1 Private-seam branches

| Private-seam branch | Exact governed meaning and facts/selectors | Positive / negative falsifier | Selectability | Authorial judgement |
| --- | --- | --- | --- | --- |
| `PRIVATE_SEAM_SHA256` | focused test; parameter root; explicit hash argument/literal/destination/flow selectors; `C,L,F[CALLEE]` | listed injected function / wrong signature or literal | Partial | **D4-C11:** exact `CallableFact` tuple for a governed private-seam parameter is not recorded |
| `PRIVATE_SEAM_REPOSITORY_ROOT`, `PRIVATE_SEAM_REALPATH`, `PRIVATE_SEAM_LSTAT`, `PRIVATE_SEAM_STAT`, `PRIVATE_SEAM_EXISTS` | focused test; parameter root; each full base-row selector copied; `C,F[CALLEE]`, plus root relation for repository-root branch | listed injected function / wrong signature or inherited selector | Partial | **D4-C11** |
| `PRIVATE_SEAM_MKDIR`, `PRIVATE_SEAM_OPEN` | focused test; parameter root; full mode/flag/base selectors; `C,L,F[CALLEE]` | listed signature/literals / changed signature or literal | Partial | **D4-C11** |
| `PRIVATE_SEAM_WRITE`, `PRIVATE_SEAM_FSYNC`, `PRIVATE_SEAM_CLOSE` | focused test; parameter root; full base selectors; `C,F[CALLEE]` | listed signature / changed count or flow | Partial | **D4-C11** |
| `PRIVATE_SEAM_RENAME`, `PRIVATE_SEAM_READ_FILE`, `PRIVATE_SEAM_REMOVE` | focused test; parameter root; full base selectors and operation relation; `C,F[CALLEE],O` | listed relation / unlisted pair or target | Partial | **D4-C11** |

All 75 base operation IDs and all 14 private-seam IDs are present in the audit. The incomplete rows do not lack structural fields; they lack exact selector values or branch records.

## 5. D6 Translation Audit

Each probe has enough prospective fact vocabulary to distinguish its positive and negative case. All nine remain incomplete as normative machine predicates because `ProbeStructureSelector` is specified only by analogy to the fact object, with no closed nested selector records or complete matching rules.

| D6 probe | Exact governed meaning and facts/selectors | Positive / negative falsifier | Structural distinguishability | Authorial judgement |
| --- | --- | --- | --- | --- |
| `DENIED_PUBLIC_MEMBER_REFLECT_GET` | one lookup, argument count 2, public subject, denied-member ID, lookup result, same-callback post-dominating undefined assertion, no escape | required undefined assertion / true or absent assertion | Yes | `D6-S01,S02,S03,S04` |
| `DENIED_PUBLIC_MEMBER_IN` | one closed `in` lookup, argument count 2, public subject, denied-member ID, false assertion, no escape | required false assertion / true assertion | Yes | `D6-S01,S02,S03,S04` |
| `DENIED_PUBLIC_MEMBER_KEYS` | one keys operation, argument count 1, call count 1, public subject, denied-member exclusion assertion, no escape | one exclusion assertion / absent or wrong member assertion | Yes | `D6-S01,S02,S03,S04` |
| `FRESH_COPY_MUTATION` | two read-byte calls; one first-copy mutation; second-copy/baseline content, length, and hash equality; no store/return/callback/filesystem/closure escape | all three equalities and counts / one missing equality or count 1/3 | Yes | `D6-S01,S02,S03,S04,S05` |
| `FROZEN_OBJECT_MUTATION` | one frozen check; one zero-argument mutation in expect callback; same target; true and throw assertions; no escape | same target and both assertions / changed target or missing throw | Yes | `D6-S01,S02,S03,S04,S05` |
| `SYNTHETIC_CORRUPTION` | one governed transform ID; transformed bytes only to injected read and assertion; incomplete assertion; checker/retry counts 0 | one listed transform and zero counts / unlisted or two transforms, checker 1 | Yes | `D6-S01,S02,S03,S04,S05` |
| `INJECTED_MECHANICAL_FAILURE_THROW` | one listed seam failure; content-free throw; first-failure and incomplete assertions; checker/retry/semantic counts 0 | one listed first failure / unlisted or second failure | Yes | `D6-S01,S02,S03,S04,S05` |
| `INJECTED_MECHANICAL_FAILURE_PROGRESS` | one private-seam write failure; zero/short progress; progress below expected length; first-failure/incomplete assertions; zero counts | governed progress failure / full progress or another operation | Yes | `D6-S01,S02,S03,S04,S05` |
| `CHECKER_EXCEPTION_AFTER_VERIFIED_CAPTURE` | checker count 1; verified capture before checker; checker input only verified reference; one content-free throw; reread identities unchanged; retry/delivery 0; no escape | governed order/input/equalities / checker before capture or other input | Yes | `D6-S01,S02,S03,S04,S05,S06` |

### 5.1 Exact unsettled D6 choices

| ID | Choice still required | Why translation cannot choose it |
| --- | --- | --- |
| `D6-S01` | Complete closed `ProbeStructureSelector` object schemas for operation, assertion, relation, counter, and escape children | “Same fields” does not define selector field names, required fields, non-applicable values, or allowed modes |
| `D6-S02` | Array matching semantics for each child collection: exact equality, required-subset, prohibited-subset, or exact-key replacement | The structural-completion record mentions set inclusion by full-record equality but does not fix absence/excess behavior per collection |
| `D6-S03` | Completeness/cardinality rules for role-keyed operation, assertion, relation, and escape records | An omitted relevant role can otherwise be indistinguishable from proved absence; duplicate-role and multi-assertion rules are not fully fixed |
| `D6-S04` | Closed non-applicable values for `DeniedMemberId`, `CorruptionTransformId`, and probe-local failure operation | The inherited enums have no shared non-probe member, while the extension requires one without naming and enumerating each addition |
| `D6-S05` | Exact typed endpoint schema for operation-to-operation order and value-to-assertion/operation flow relations | `ProbeRelationFact` has two value-role endpoints and one operation role; it does not fix the two operation endpoints needed by `OPERATION_PRECEDES_OPERATION` or an assertion endpoint for flow confinement |
| `D6-S06` | Exact fact and selector mapping for verified-capture-before-checker | Existing broad ancestry and the generic relation name do not select both operation roles without the typed endpoint decision in `D6-S05` |

These are bounded schema/predicate choices. The intended D6 meanings are already governed; no new authorised probe is required.

## 6. ProbeValidity Recalculation Test

The intended derivation remains:

```text
NOT_PROBE when family and complete structure are non-probe
UNKNOWN when any required constituent is unresolved
AUTHORISED when exactly one complete D6 predicate matches
UNAUTHORISED otherwise
```

The constituent facts can distinguish all tested outcomes. However, `AUTHORISED` cannot yet be recomputed by a schema-validating matcher because the matcher lacks the exact nested selector and relation rules in `D6-S01` through `D6-S06`.

Therefore:

```text
ProbeValidity is not yet fully machine-derivable.
ProbeValidity must not be accepted as an asserted oracle.
```

No D5 unauthorised-probe decision may rely on an unexplained `ProbeValidity=AUTHORISED` value.

## 7. Complete Remaining-Choice Register

```text
D4-C01 BYTE_SLICE count and optional-index branches
D4-C02 ARRAY_MAP / ARRAY_EVERY / ARRAY_SOME count and additional-argument rule
D4-C03 ARRAY_INCLUDES count and optional-index branch
D4-C04 ARRAY_JOIN required-versus-optional separator and count branches
D4-C05 ARRAY_SLICE zero/one/two-argument branches
D4-C06 STRING_STARTS_WITH / STRING_ENDS_WITH / STRING_INCLUDES count branches
D4-C07 STRING_SPLIT count and optional-limit branch
D4-C08 JEST_DESCRIBE / JEST_IT bounded-callback selector tuple
D4-C09 JEST_FN present-callback selector tuple
D4-C10 EXPECT_MATCHER matcher-specific argument counts
D4-C11 private-seam parameter callable selector tuple
D6-S01 nested ProbeStructureSelector schemas
D6-S02 child-array matching semantics
D6-S03 child completeness and cardinality
D6-S04 probe-local non-applicable enum values
D6-S05 typed relation endpoint schemas
D6-S06 verified-capture/checker ordering mapping
```

Exactly 17 bounded choices remain. None can be filled from governed implementation source, and no implementation source was inspected.

## 8. Compatibility and Preserved State

| Area | Result |
| --- | --- |
| Historical candidate | Preserved unchanged at 6,350 canonical bytes and the recorded SHA-256 |
| Failed V2 authoring record | Preserved unchanged |
| Candidate V2 | Not created; no payload modified |
| D3-V2 and subject-data-label completion | Preserved |
| Prospective D3-V2 D4/D6 structural extension | Preserved; not edited or extended here |
| D5 | Exactly 37 predicates / 17 prohibited families preserved |
| D5 prohibited-first evaluation | Preserved |
| Zero/multiple/exact-one terminal semantics | Preserved |
| Public API, sources, imports, repository/launch identity | Preserved |
| One-use Authority, capture/manifest, consumption point, mandatory stop | Preserved |
| Check 5 | `UNMEASURED` |
| Check 6 | `NOT RUN` and separate |
| Implementation | `UNACCEPTED` |
| Candidate-authoring and execution Authority | None |

No extension field grants capability. Facts remain observations; only a separately governed predicate can classify them. No D4 permission, D6 probe, D5 prohibition, or rescue path is added.

## 9. Outcome Decision

### Outcome 1 - D4/D6 terminal predicate machine encoding is complete

Not selected. Seventeen exact selector/schema choices remain, so no complete normative predicate set or deterministic machine representation can be recorded without new authorship.

### Outcome 2 - D4/D6 encoding remains incomplete despite sufficient D3-V2 expressiveness

**Selected.** Every tested governed distinction can be represented as prospective normalized facts, but the exact D4 count/callable predicate branches and D6 nested selector/relation rules are not settled.

### Outcome 3 - D3-V2 remains structurally insufficient

Not selected. No governed positive/negative pair was shown to have identical prospective extension facts. The D6 typed-endpoint issue is an unset exact relation schema within the already-adopted relation dimension, not evidence that finite structural relations cannot represent the distinction.

## 10. Authority Boundary and Stop

```text
D4 authoring Authority=NONE
D6 authoring Authority=NONE
candidate-authoring Authority=NONE
instrument Authority=NONE
Check 5 Authority=NONE
Check 6 Authority=NONE
```

No Authority is granted to repair the 17 choices; edit D3-V2, D4, D5, D6, any prior review, historical candidate, failed V2 record, or implementation; create or modify a candidate payload; inspect governed source; build, modify, inspect, readiness-test, or execute an instrument; run Check 5, Check 6, tests, typecheck, ESLint, Git validation, implementation validation, acceptance, harness work, or experiment execution.

Outcome 1 was not reached. A fresh Candidate Policy Correction Authority Review is therefore not available from this record.

## 11. Final State

```text
OUTCOME 2 - HH-0000 CHECK 5 D4 D6 TERMINAL PREDICATE MACHINE ENCODING SECOND ATTEMPT FINDS PROSPECTIVE D3-V2 EXPRESSIVENESS SUFFICIENT BUT EXACT PREDICATE DATA INCOMPLETE - COMPLETE AUDIT COVERS SEVENTY-FIVE BASE D4 OPERATIONS FOURTEEN PRIVATE-SEAM BRANCHES AND NINE D6 PROBES - GOVERNED LITERALS ARITY UNIVERSAL ARGUMENTS RECEIVERS CALLABLES ROLE ENDPOINTS RENAME PAIRS SCENARIO COUNTS ASSERTIONS ESCAPE ORDER EQUALITY FAILURE IDENTITY AND TRANSFORM IDENTITY ARE STRUCTURALLY DISTINGUISHABLE - ELEVEN BOUNDED D4 SELECTOR CHOICES AND SIX BOUNDED D6 SELECTOR OR RELATION CHOICES REMAIN - PROBEVALIDITY NOT YET FULLY MACHINE DERIVABLE AND MUST NOT BE AN ASSERTED ORACLE - NO D3 EXTENSION - NO D4 OR D6 AUTHORING - D5 THIRTY-SEVEN PREDICATES SEVENTEEN FAMILIES PRESERVED - HISTORICAL CANDIDATE 6350 BYTES SHA256 FF71059E5FBAD04831BF8CBC6D408B44B265D8657446A1FE8C2B0C8E8D972186 PRESERVED UNCHANGED - FAILED V2 AUTHORING RECORD UNCHANGED - CANDIDATE V2 NOT CREATED - CHECK 5 UNMEASURED - CHECK 6 NOT RUN - IMPLEMENTATION UNACCEPTED - NO LIVE CANDIDATE OR EXECUTION AUTHORITY - STOP
```

D4/D6 terminal predicate machine-encoding completion review second attempt stops here.