# HH-0000 Check 5 D3-V2 D4/D6 Structural Fact Completion Review

**Status:** OUTCOME 1 - MINIMUM D3-V2 D4/D6 STRUCTURAL COMPLETION SETTLED PROSPECTIVELY
**Review date:** 2026-08-14
**Review type:** Documentation-only structural fact completion review
**Immediate controlling record:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_D4_D6_TERMINAL_PREDICATE_MACHINE_ENCODING_COMPLETION_REVIEW.md`
**Inherited D3-V2 record:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_D3_STRUCTURAL_FACT_MODEL_COMPLETION_REVIEW.md`
**Inherited D4/D6 semantics:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_CANONICAL_POLICY_MACHINE_SCHEMA_AND_PREDICATE_COMPLETION_REVIEW.md`
**Historical candidate:** `6350` canonical bytes / SHA-256 `ff71059e5fbad04831bf8cbc6d408b44b265d8657446a1fe8c2b0c8e8d972186` / `HISTORICAL_CANDIDATE_POLICY_EVIDENCE`
**Candidate V2:** Not created; identity none; partial payload none
**Candidate-authoring Authority:** Exhausted before this review
**D5:** Exactly 37 predicates across exactly 17 prohibited families, prospectively settled and unchanged
**Governed implementation-source access:** None
**Check 5:** `UNMEASURED`
**Check 6:** `NOT RUN`
**Implementation:** `UNACCEPTED`
**Authority effect:** None

# Repository Traceability

**Principle:** Truth before certainty; evidence before claims; human Authority; smallest justified change.
**Theory:** A terminal classification is machine-decidable only when every acceptance-affecting distinction is independently present as closed normalized structure.
**Architecture:** D3-V2 normalization, prohibited-first evaluation, complete terminal evaluation, zero-match failure, multiple-match ambiguity, exact-one acceptance, and Check 5/Check 6 separation.
**Engineering:** Positive/negative indistinguishability tests, minimum fact and selector extension, finite relation endpoints, complete D4/D6 coverage, compatibility audit, and fail-closed derivation rules.
**Milestone:** Not Applicable.
**Evidence:** This prospective documentation-only structural model. No implementation, candidate, instrument, Check 5, Check 6, freeze, or acceptance Evidence is produced.

## 1. Sole Question and Decision

> What is the smallest exact extension to D3-V2 required to represent every already-governed D4 permitted-operation distinction and every D6 authorised-probe condition directly as closed structural data?

**Outcome 1 is selected.** Seven additions are necessary and jointly sufficient:

1. `argumentCount` and its closed range selector;
2. one `governedLiteralId` on every argument fact;
3. `receiverFact` and its selectors;
4. `callableFacts` and their selectors;
5. `operationRelations` and their selector;
6. one universal-argument selector evaluated over complete indexed argument facts;
7. `probeStructure` and its closed constituent selectors.

These additions expose only structure that D4/D6 already require. They do not add a D4 operation, a D6 probe, a permission, a prohibition, or executable matching logic.

The prospective extension schema is:

```text
HH-CHECK-5-D3-D4-D6-STRUCTURAL-EXTENSION-1
```

It extends D3-V2; it does not replace or edit the settled D3-V2 record in this review.

## 2. Decisive Literal Falsifier

The two calls below have identical existing D3-V2 facts:

```text
createHash("sha256")
createHash("sha512")
```

Both normalize as a production `CALL`, imported root `node:crypto/createHash`, operation `CRYPTO_CREATE_HASH_SHA256`, argument 0 with `provenanceKind=LITERAL` and `dataLabels=[GOVERNANCE_FIELD]`, destination `HASH_STATE`, and flow `ARGUMENT_TO_CALL`. Existing selectors therefore return the same result.

The minimum coherent addition is not unrestricted literal text. It is one finite policy identity on each argument:

```text
governedLiteralId: GovernedLiteralId
```

```text
GovernedLiteralId =
  NONE |
  HASH_ALGORITHM_SHA256 |
  HASH_DIGEST_HEX |
  TEXT_ENCODING_UTF8 |
  FILE_OPEN_EXCLUSIVE_WX |
  FILE_MODE_OWNER_ONLY_384 |
  UNKNOWN
```

Normalization compares a literal node only against the finite canonical values attached to those six IDs. The policy carries the ID-to-value table; the Evidence carries only the ID. `HASH_ALGORITHM_SHA256` maps to the UTF-8 string `sha256`; no ID maps to `sha512`.

| Case | New argument fact | Result |
| --- | --- | --- |
| Governed positive | `{index:0, ..., governedLiteralId:HASH_ALGORITHM_SHA256}` | Can match the D4 hash predicate |
| Otherwise-identical negative | `{index:0, ..., governedLiteralId:UNKNOWN}` | Cannot match; fails closed |

No raw source text, regular expression, glob, arbitrary literal matcher, executable predicate, or implementation-derived policy is used.

## 3. Literal Retention Boundary

| Literal class | Normalized value | Evidence retention |
| --- | --- | --- |
| Governed exact literal whose value is policy | One listed `GovernedLiteralId` | ID only; raw content prohibited |
| Ordinary literal not used by an exact-value selector | `NONE` | Raw content prohibited; existing provenance and data labels remain available |
| Literal at a governed exact-literal position that matches no listed identity | `UNKNOWN` | Raw content prohibited; terminal matching fails closed |
| Sensitive, source, response, path, username, private-IP, token, or machine-local content | `NONE` or `UNKNOWN` as required by the prior labels | Raw content prohibited; only existing non-content labels may remain |

Denied-member values and corruption transforms do not enlarge `GovernedLiteralId`. They already have closed D6 enums and are represented inside `probeStructure` as `DeniedMemberId` and `CorruptionTransformId`.

## 4. Closed Extension Schema

Every displayed field is required. Every object rejects additional properties. Every enum is case-sensitive and closed. Every array is sorted by the displayed key, contains unique keys, and uses `[]` only where explicitly permitted. `uint` is a JSON safe non-negative integer. Invalid shape or unknown enum spelling invalidates policy before source access.

### 4.1 Count selector

```text
CountRangeSelector = exactly one of:
  {mode:ANY}
  {mode:RANGE,minimum:uint,maximum:uint|null}
```

For `RANGE`, `maximum=null` means no finite upper bound; otherwise `maximum >= minimum`. This is declarative comparison of one normalized integer, not executable policy.

```text
NormalizedStructuralFactV2 addition:
  argumentCount:uint

PredicateV2 addition:
  argumentCount:CountRangeSelector
```

`argumentCount` is the number of syntactically present arguments at that call or constructor node. It does not count defaults, parameters, spread expansion, callback invocations, or scenario-level calls.

`requiredArgumentCount` is not a second fact. It is `minimum` in the predicate. `optionalArgumentPresence` is derived by comparing `argumentCount` with an index: index `i` is present exactly when `argumentCount > i`. A predicate requiring a present optional argument supplies an indexed constraint and a minimum greater than `i`; a predicate permitting absence uses separate finite predicate records for the absent and present branches. `callCountWithinGovernedScope` is a D6 scenario count and is never inferred from `argumentCount`.

### 4.2 Extended argument fact

```text
ArgumentFactD4D6 = {
  index:uint,
  provenanceKind:ProvenanceKind,
  dataLabels:nonempty sorted unique array<DataLabelV2>,
  governedLiteralId:GovernedLiteralId
}

ArgumentConstraintD4D6 = {
  index:uint,
  provenanceKinds:Selector<ProvenanceKind>,
  dataLabels:Selector<DataLabelV2>,
  governedLiteralIds:Selector<GovernedLiteralId>
}
```

The fact array must contain exactly one entry for every integer index from zero through `argumentCount - 1`. No gap, duplicate, omitted present argument, or extra index is valid.

### 4.3 Universal argument selector

No duplicate universal fact is needed because argument facts are complete.

```text
PredicateV2 addition:
  everyArgument: {
    provenanceKinds:Selector<ProvenanceKind>,
    dataLabels:Selector<DataLabelV2>,
    governedLiteralIds:Selector<GovernedLiteralId>
  }
```

`{mode:ANY}` in all three child selectors makes the field irrelevant. Otherwise every argument fact must satisfy every child selector. For zero arguments the condition is true; a D4 row that requires one or more arguments also supplies `argumentCount.minimum=1`. This adds quantification over existing complete facts, not a new relation.

### 4.4 Receiver fact

```text
ReceiverClass = NONE | ARRAY | BYTE_SEQUENCE | DATE | MAP | REGEXP |
  SET | STRING | SYNTHETIC_FIXTURE | UNKNOWN

ReceiverFact = {
  receiverClass:ReceiverClass,
  provenanceKind:ProvenanceKind,
  dataLabels:nonempty sorted unique array<DataLabelV2>
}

NormalizedStructuralFactV2 addition:
  receiverFact:ReceiverFact

PredicateV2 additions:
  receiverClasses:Selector<ReceiverClass>
  receiverProvenanceKinds:Selector<ProvenanceKind>
  receiverDataLabels:Selector<DataLabelV2>
```

`NONE` means the operation has no receiver. `UNKNOWN` means a receiver exists but static binding/type/data-flow resolution cannot select one class. A class derives from the closed built-in constructor identity or from complete local allocation/data-flow lineage. Identifier spelling alone cannot derive it.

### 4.5 Callable facts

```text
CallablePosition = CALLEE | ARGUMENT_0 | ARGUMENT_1 | ARGUMENT_2 |
  ARGUMENT_3 | ARGUMENT_4 | UNKNOWN
CallableResolution = NONE | UNIQUE_LOCAL_DECLARATION | UNIQUE_PARAMETER |
  NONLOCAL_OR_MULTIPLE | UNKNOWN
CallableScope = NONE | SAME_FILE_PRIVATE | NESTED_TEST_CALLBACK |
  EXPORTED | OTHER | UNKNOWN
CallableCycle = NONE | ACYCLIC | CYCLIC | UNKNOWN
CallableCapabilityReturn = NONE | NO_CAPABILITY_RETURN | CAPABILITY_RETURN |
  UNKNOWN
CallableTerminalStatus = NONE | EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL |
  ZERO_TERMINAL | MULTIPLE_TERMINAL | PROHIBITED | UNKNOWN
CallableEscape = NONE | NO_SURVIVING_CAPTURE | SURVIVING_CAPTURE | UNKNOWN

CallableFact = {
  position:CallablePosition,
  resolution:CallableResolution,
  scope:CallableScope,
  cycle:CallableCycle,
  capabilityReturn:CallableCapabilityReturn,
  terminalStatus:CallableTerminalStatus,
  escape:CallableEscape
}

NormalizedStructuralFactV2 addition:
  callableFacts:array<CallableFact>

PredicateV2 addition:
  callableConstraints:array<{
    position:CallablePosition,
    resolutions:Selector<CallableResolution>,
    scopes:Selector<CallableScope>,
    cycles:Selector<CallableCycle>,
    capabilityReturns:Selector<CallableCapabilityReturn>,
    terminalStatuses:Selector<CallableTerminalStatus>,
    escapes:Selector<CallableEscape>
  }>
```

There is at most one fact per position. `[]` means no callable is structurally relevant. `UNKNOWN` means a callable exists at that position but the constituent cannot be resolved. `NONE` means the constituent does not apply to that callable.

Resolution uses TypeScript lexical binding identity. `UNIQUE_LOCAL_DECLARATION` requires exactly one function or arrow declaration in the governed file. `UNIQUE_PARAMETER` requires exactly one governed private-seam parameter binding. Scope uses declaration/export ancestry. Cycle uses the complete static call graph reachable from the callable. Capability return uses complete return-expression traversal and the settled public capability facts. Terminal status is recomputed over every reachable executable fact using prohibited-first and exact-one classification. A cycle, unresolved edge, D5 match, zero terminal match, or multiple terminal match cannot yield `EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL`.

No callback executes during normalization. No callback name or source text enters Evidence.

### 4.6 Operation relations

```text
OperationRelation =
  NONE |
  ROLE_ROOT_PRODUCTION_IMPORT |
  ROLE_ROOT_TEST_IMPORT |
  RENAME_RESPONSE_TEMP_FINAL_SAME_DIRECTORY |
  RENAME_RECEIPT_TEMP_FINAL_SAME_DIRECTORY |
  READ_FINAL_RESPONSE |
  READ_FINAL_RECEIPT |
  READ_SUITE_FIXTURE |
  REMOVE_ATTEMPT_TEMP_RESPONSE |
  REMOVE_ATTEMPT_TEMP_RECEIPT |
  REMOVE_SUITE_FIXTURE |
  SYNTHETIC_FIXTURE_MEMBER_TARGET |
  OPTIONS_OBJECT_CONTAINS_FICTIONAL_RESPONSE |
  UNKNOWN

NormalizedStructuralFactV2 addition:
  operationRelations:nonempty sorted unique array<OperationRelation>

PredicateV2 addition:
  operationRelations:Selector<OperationRelation>
```

`NONE` is the sole value when no listed relation applies. `UNKNOWN` means a listed relation is relevant but at least one endpoint cannot be statically resolved. The rename values require argument 0 and argument 1 to resolve to the named attempt/final pair and to normalize to equal directory identities. The read/remove values derive from existing path labels and destination identity. Role-root values derive from exact source role plus settled import tuple. The synthetic target value requires a `SYNTHETIC_FIXTURE` target and a literal member argument. The options value requires argument 0 to be an object whose governed response field carries `FICTIONAL_RESPONSE` and whose required settled option fields are present.

These are operand/destination shape relations. They do not say `AUTHORISED` and cannot grant terminal classification.

### 4.7 Probe structure

```text
ProbeScope = NOT_PROBE | ONE_TEST_CALLBACK | MULTIPLE_OR_NO_TEST_CALLBACK | UNKNOWN

ProbeOperationRole =
  DENIED_LOOKUP | DENIED_KEYS_ENUMERATION | READ_BYTES | FIRST_COPY_MUTATION |
  FROZEN_CHECK | FROZEN_MUTATION | CORRUPTION_TRANSFORM | INJECTED_READ |
  INJECTED_FAILURE | CHECKER | RESPONSE_REREAD | RECEIPT_REREAD | UNKNOWN

ProbeValueRole =
  NONE | PUBLIC_SUBJECT | DENIED_MEMBER | LOOKUP_RESULT | FIRST_COPY |
  SECOND_COPY | FICTIONAL_BASELINE | FROZEN_TARGET | TRANSFORMED_BYTES |
  INJECTED_READ_RESULT | EXPECTED_BYTE_LENGTH | RETURNED_PROGRESS |
  VERIFIED_REFERENCE | CHECKER_INPUT | RESPONSE_REREAD_VALUE |
  RECEIPT_REREAD_VALUE | OUTCOME_STATUS | FIRST_FAILURE_IDENTITY | UNKNOWN

AssertionMatcher =
  TO_BE_UNDEFINED | TO_BE_FALSE | NOT_TO_CONTAIN | TO_BE_TRUE | TO_THROW |
  TO_EQUAL_CONTENT | TO_EQUAL_BYTE_LENGTH | TO_EQUAL_HASH |
  TO_BE_PRESERVATION_INCOMPLETE | TO_BE_ZERO | TO_BE_FIRST_FAILURE |
  TO_BE_IDENTITY_UNCHANGED | UNKNOWN

AssertionExpected =
  NONE | UNDEFINED_VALUE | FALSE_VALUE | TRUE_VALUE | DENIED_MEMBER_VALUE |
  ORIGINAL_FICTIONAL_CONTENT | ORIGINAL_BYTE_LENGTH | ORIGINAL_SHA256 |
  PRESERVATION_INCOMPLETE | ZERO_COUNT | FIRST_FAILURE_OPERATION |
  PRIOR_REREAD_IDENTITY | UNKNOWN

ProbeCounter =
  LOOKUP_INVOCATION | KEYS_INVOCATION | READ_BYTES_INVOCATION |
  MUTATION | TRANSFORM | INJECTED_FAILURE | CHECKER_INVOCATION |
  RETRY | DELIVERY | SEMANTIC_CONSEQUENCE | UNKNOWN

FailureEffect = NONE | THROWS_CONTENT_FREE_ERROR | RETURNS_ZERO_PROGRESS |
  RETURNS_SHORT_PROGRESS | UNKNOWN

ProbeRelationKind =
  SAME_TEST_CALLBACK | ASSERTION_SUBJECT | ASSERTION_POSTDOMINATES_OPERATION |
  VALUE_IDENTITY_EQUAL | VALUE_CONTENT_EQUAL | VALUE_BYTE_LENGTH_EQUAL |
  VALUE_SHA256_EQUAL | MUTATES_ONLY | VALUE_FLOWS_ONLY_TO |
  OPERATION_PRECEDES_OPERATION | CHECKER_INPUT_ONLY_VERIFIED_REFERENCE |
  FAILURE_IS_FIRST_FAILURE | PROGRESS_LESS_THAN_EXPECTED_LENGTH |
  UNKNOWN

EscapeChannel =
  MODULE_SCOPE_STORE | SURVIVING_CLOSURE_CAPTURE | RETURN_OR_PRODUCTION_FLOW |
  TEST_CALLBACK_ESCAPE | FILESYSTEM_OUTSIDE_SUITE | RETRY_FLOW |
  FEEDBACK_FLOW | DELIVERY_FLOW | UNKNOWN

ProbeOperationFact = {
  role:ProbeOperationRole,
  operation:OperationIdV2,
  argumentCount:uint,
  countWithinScope:uint,
  inputRoles:sorted unique array<ProbeValueRole>,
  outputRoles:sorted unique array<ProbeValueRole>,
  failureEffect:FailureEffect
}

ProbeAssertionFact = {
  matcher:AssertionMatcher,
  expected:AssertionExpected,
  subjectRole:ProbeValueRole,
  operationRole:ProbeOperationRole,
  sameTestCallback:boolean,
  postDominates:boolean
}

ProbeRelationFact = {
  kind:ProbeRelationKind,
  leftRole:ProbeValueRole,
  rightRole:ProbeValueRole,
  operationRole:ProbeOperationRole
}

ProbeCounterFact = {counter:ProbeCounter,count:uint}
ProbeEscapeFact = {valueRole:ProbeValueRole,channels:sorted unique array<EscapeChannel>}

ProbeStructure = {
  scope:ProbeScope,
  deniedMemberId:DeniedMemberId,
  corruptionTransformId:CorruptionTransformId,
  failureOperation:OperationIdV2,
  operations:array<ProbeOperationFact>,
  assertions:array<ProbeAssertionFact>,
  relations:array<ProbeRelationFact>,
  counters:array<ProbeCounterFact>,
  escapes:array<ProbeEscapeFact>
}

NormalizedStructuralFactV2 addition:
  probeStructure:ProbeStructure

PredicateV2 addition:
  probeStructure:ProbeStructureSelector
```

`DeniedMemberId` is exactly the already-governed closed denied-member enum. `CorruptionTransformId` is exactly the already-governed eight-value transform enum. `ProbeStructureSelector` has the same fields; scalar enums use the existing `Selector<T>`, counts use `CountRangeSelector`, required arrays use set inclusion by full closed record equality, and irrelevant child dimensions use `ANY` or `[]` as fixed by the child schema.

For non-probes: `scope=NOT_PROBE`, scalar D6 identities use their existing non-applicable value where one exists or `NONE` added only to that enum, `failureOperation=UNKNOWN` is prohibited; therefore this extension adds `NOT_PROBE` to the probe-local failure-operation enum instead of using `OperationIdV2.UNKNOWN`, and all five arrays are `[]`. For a recognized probe, `UNKNOWN` means a structurally required constituent could not be resolved and fails every authorised D6 selector.

All relation endpoints are finite semantic roles, never source lines, source text, local names, or arbitrary record IDs. Role assignment is unique only when complete AST binding, data flow, and control-flow derivation identifies exactly one candidate; zero or multiple candidates yield `UNKNOWN`.

## 5. Structural Derivation Rules

1. Normalize one complete AST and one complete control-flow graph per governed role. Source text matching is prohibited.
2. Derive lexical bindings from AST symbol identity and operation IDs from the settled root/member mapping.
3. Derive data labels and value-role lineage from complete static def-use edges. An unresolved, merged, or multiple role assignment yields `UNKNOWN`.
4. Derive post-dominance from the control-flow graph: every path from the governed operation to the callback exit passes through the assertion. Syntactic order alone is insufficient.
5. Derive `SAME_TEST_CALLBACK` from one identical enclosing imported Jest callback binding.
6. Derive scenario counts by counting records assigned to one unique `ONE_TEST_CALLBACK` scope. This is `callCountWithinGovernedScope`; it never uses runtime invocation counts.
7. Derive no-escape from complete outgoing def-use edges. An empty `channels` array proves no listed escape; any listed edge records its exact channel; unresolved edges record `UNKNOWN`.
8. Derive order from control-flow dominance. `OPERATION_PRECEDES_OPERATION` requires the left operation to dominate the right operation in the same test callback.
9. Derive identity equality from one static value lineage; derive content/length/hash equality only from the exact required assertion facts, not by reading response content.
10. Derive `ProbeValidity` only after all ordinary D3-V2 and extension facts exist. It is a recomputable relation, never an input oracle.

## 6. Required Proofs for Each Addition

| Addition | Governed distinction | Positive fact | Otherwise-identical negative | Why D3-V2 fails | Why extension distinguishes | No capability grant | `NONE` / `UNKNOWN` | Direct falsifier |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `argumentCount` | Exact, bounded, optional, and variadic arity | `FS_FSYNC`, count 1 | count 2 | Indexed constraint 0 matches both | range `1..1` rejects 2 | Count describes AST shape only | Not Applicable / count always known for valid AST | count 2 matches count-1 predicate |
| `governedLiteralId` | Six D4 exact policy values | argument 0 `HASH_ALGORITHM_SHA256` | argument 0 `UNKNOWN` for `sha512` | Both are literal/governance-labelled | finite ID selector accepts only SHA-256 ID | ID is not a terminal class | `NONE` ordinary; `UNKNOWN` governed position unresolved/unlisted | `sha512` normalizes as SHA-256 ID |
| `everyArgument` | Every variadic argument has an allowed label | all resolve arguments path-labelled | one argument governance-only | Existing indexed selectors cannot quantify all indexes | evaluates complete index set | Selector only narrows a terminal predicate | all child selectors `ANY`; unresolved argument label remains existing `UNKNOWN` | one disallowed argument passes |
| `receiverFact` | Local receiver is byte/array/map/set/string/date/regexp | `SET_HAS` receiver class `SET` | receiver class `STRING` | Existing root is `LOCAL_PRIVATE` in both | receiver selector separates classes | Receiver class is descriptive | `NONE` no receiver; `UNKNOWN` unresolved receiver | string receiver matches Set predicate |
| `callableFacts` | Local callback/helper resolution and transitive validity | unique local, private/nested, acyclic, no capability return, all reachable executable facts exact-one | same except cyclic or prohibited | Existing argument labels do not expose callable graph | constituent selectors reject the changed value | No constituent says permitted | `NONE` non-applicable; `UNKNOWN` unresolved constituent | cyclic callback yields valid status |
| `operationRelations` | Root-role, rename pair, bounded read/remove, synthetic target, complete options shape | response temp and final in one directory | receipt temp paired with response final | Independent path labels do not prove pair identity | one finite pair relation differs | Relation describes operands only | `NONE` non-relational; `UNKNOWN` unresolved endpoint | mixed pair receives response-pair value |
| `probeStructure` | D6 assertion, count, order, equality, failure, transform, and escape conditions | denied lookup with same-callback post-dominating `TO_BE_UNDEFINED` | same except `TO_BE_TRUE` | Existing ancestry omits matcher/value identity | assertion record differs | Structure must still match a D6 terminal predicate | `NOT_PROBE` non-probe; `UNKNOWN` unresolved constituent | wrong matcher derives `AUTHORISED` |

Every extension field is required. Existing D5 predicates use `ANY`, `[]`, or the non-probe structure for every new selector as specified in Section 10; omission is never a wildcard.

## 7. Complete D4 Expressiveness Audit

Legend: `C`=`argumentCount`; `L`=`governedLiteralId`; `U`=`everyArgument`; `R`=`receiverFact`; `F`=`callableFacts`; `O`=`operationRelations`; `E`=existing D3-V2 facts only. Every listed need is a scalar fact (`C`, `R`), per-argument fact (`L`), finite relation (`F`, `O`), derived selector over complete per-argument facts (`U`), or already represented (`E`).

| D4 operation or branch | Required extension dimensions | Result after extension |
| --- | --- | --- |
| `CRYPTO_CREATE_HASH_SHA256` | `C,L` | Representable |
| `HASH_UPDATE` | `C` | Representable |
| `HASH_DIGEST_HEX` | `C,L` | Representable |
| `FS_REALPATH`, `FS_LSTAT`, `FS_STAT`, `FS_EXISTS` | `C`; `E` root/provenance separates platform and seam | Representable |
| `FS_MKDIR` | `C,L` (`FILE_MODE_OWNER_ONLY_384`) | Representable |
| `FS_OPEN_EXCLUSIVE` | `C,L` (`FILE_OPEN_EXCLUSIVE_WX`, `FILE_MODE_OWNER_ONLY_384`) | Representable |
| `FS_WRITE` | `C` | Representable |
| `FS_FSYNC`, `FS_CLOSE` | `C` | Representable |
| `FS_RENAME` | `C,O` (one of the two temp/final same-directory relations) | Representable |
| `FS_READ_FILE` | `C,O` (one of the three read-purpose relations) | Representable |
| `FS_REMOVE_BOUNDED` | `C,O` (one of the three bounded-target relations) | Representable |
| `PATH_RESOLVE`, `PATH_JOIN` | `C,U` with minimum 1 | Representable |
| `PATH_RELATIVE` | `C`; closed path labels expanded in predicate data | Representable |
| `PATH_DIRNAME`, `PATH_BASENAME`, `PATH_IS_ABSOLUTE` | `C`; closed path labels expanded in predicate data | Representable |
| `PATH_SEP_READ` | `E` | Representable |
| `REPOSITORY_ROOT_RESOLVE` | `C,O` role-root relation | Representable |
| `BUFFER_FROM_UTF8` | `C,L` (`TEXT_ENCODING_UTF8`) | Representable |
| `BUFFER_COMPARE`, `BUFFER_IS_BUFFER`, `UINT8ARRAY_FROM` | `C`; closed byte labels expanded in predicate data | Representable |
| `BYTE_SLICE` | `C,R` (`BYTE_SEQUENCE`) | Representable |
| `BYTE_LENGTH_READ` | `R` (`BYTE_SEQUENCE`) | Representable |
| `JSON_STRINGIFY`, `JSON_PARSE` | `C`; existing response-flow relation excludes governed response content from local JSON | Representable |
| `OBJECT_FREEZE`, `OBJECT_KEYS`, `OBJECT_VALUES`, `OBJECT_ENTRIES`, `ARRAY_IS_ARRAY` | `C`; existing argument, destination, and flow facts | Representable |
| `ARRAY_MAP`, `ARRAY_EVERY`, `ARRAY_SOME` | `C,R,F` callback at argument 0 | Representable |
| `ARRAY_INCLUDES`, `ARRAY_JOIN`, `ARRAY_SLICE` | `C,R` | Representable |
| `ARRAY_PUSH` | `C,R,U` with minimum 1 | Representable |
| `ARRAY_SORT` | absent branch `C=0,R`; comparator branch `C=1,R,F` at argument 0 | Representable as two records |
| `SET_ADD`, `SET_HAS`, `MAP_GET`, `MAP_SET`, `MAP_HAS` | `C,R` | Representable |
| `REGEXP_TEST` | `C,R` | Representable |
| `NUMBER_IS_FINITE`, `NUMBER_IS_INTEGER`, `DATE_PARSE` | `C` | Representable |
| `DATE_TO_ISO_STRING` | `C,R` (`DATE`) | Representable |
| `STRING_STARTS_WITH`, `STRING_ENDS_WITH`, `STRING_INCLUDES`, `STRING_SPLIT` | `C,R`; optional standard arguments use separate bounded count records | Representable |
| `STRING_TRIM`, `STRING_TO_LOWER`, `STRING_TO_UPPER` | `C,R` (`STRING`) | Representable |
| `NEW_DATE`, `NEW_SET`, `NEW_MAP` | absent branch `C=0`; present branch `C=1` plus existing index-0 constraint | Representable as two records each |
| `NEW_ERROR_CONTENT_FREE`, `NEW_UINT8ARRAY` | `C` | Representable |
| `LOCAL_PRIVATE_CALL` | `F` at `CALLEE` | Representable |
| `JEST_DESCRIBE`, `JEST_IT` | `C,F` at argument 1 | Representable |
| `JEST_EXPECT` | `C`; existing fictional/local data labels | Representable |
| `JEST_FN` | absent branch `C=0`; present branch `C=1,F` at argument 0 | Representable as two records |
| `JEST_SPY_ON` | `C,O` synthetic fixture/member relation; existing literal provenance proves member is syntactic literal | Representable |
| `EXPECT_MATCHER` | `C`; matcher is closed `OperationIdV2`; existing fictional/local labels | Representable |
| `OS_TMPDIR` | `C=0` | Representable |
| `PRESERVE_RESPONSE_EVIDENCE_TEST_CALL` | `C,O` complete options relation | Representable |
| `PRIVATE_SEAM_SHA256` | `C,L,F` at `CALLEE`, inherited explicit selectors copied into its record | Representable |
| `PRIVATE_SEAM_REPOSITORY_ROOT`, `PRIVATE_SEAM_REALPATH`, `PRIVATE_SEAM_LSTAT`, `PRIVATE_SEAM_STAT`, `PRIVATE_SEAM_EXISTS` | `C,F` at `CALLEE`, inherited explicit selectors copied | Representable |
| `PRIVATE_SEAM_MKDIR` | `C,L,F` at `CALLEE` | Representable |
| `PRIVATE_SEAM_OPEN` | `C,L,F` at `CALLEE` | Representable |
| `PRIVATE_SEAM_WRITE`, `PRIVATE_SEAM_FSYNC`, `PRIVATE_SEAM_CLOSE` | `C,F` at `CALLEE` | Representable |
| `PRIVATE_SEAM_RENAME` | `C,F,O` | Representable |
| `PRIVATE_SEAM_READ_FILE`, `PRIVATE_SEAM_REMOVE` | `C,F,O` | Representable |

Audit totals remain exactly 75 base operation rows plus 14 private-seam branches. All 89 are representable. No inherited reference phrase is required in machine data: each future predicate record must carry its full selectors.

## 8. Complete D6 Expressiveness Audit

Every row also requires existing focused-test role, imported Jest callback ancestry, fictional/suite-owned provenance, no loop/schedule/module/return ancestry, and existing destination/flow selectors. The table lists the new independently observable constituents.

| D6 probe | Required closed `probeStructure` constituents | Result |
| --- | --- | --- |
| `DENIED_PUBLIC_MEMBER_REFLECT_GET` | one `DENIED_LOOKUP` operation with `Reflect.get`, argument count 2, one denied-member ID, public subject input, lookup result output; one same-callback post-dominating `TO_BE_UNDEFINED`; result has no escape channels | Representable |
| `DENIED_PUBLIC_MEMBER_IN` | one `DENIED_LOOKUP` operation with the closed `in` operation ID, argument count 2, denied-member ID and public subject; one same-callback post-dominating `TO_BE_FALSE`; result has no escape channels | Representable |
| `DENIED_PUBLIC_MEMBER_KEYS` | one `DENIED_KEYS_ENUMERATION` operation with `OBJECT_KEYS`, argument count 1 and count 1; one same-callback post-dominating `NOT_TO_CONTAIN` using the denied-member value; keys have no escape channels | Representable |
| `FRESH_COPY_MUTATION` | `READ_BYTES_INVOCATION=2`, `MUTATION=1`; first/second/baseline roles; `MUTATES_ONLY` first copy; second and baseline content/length/hash relations and assertions; no store, return, callback, filesystem, or surviving-capture escape | Representable |
| `FROZEN_OBJECT_MUTATION` | one frozen check and one frozen mutation; mutation operation argument count 0 inside one expect callback; same target identity; post-dominating true and throw assertions; no mutation-result escape | Representable |
| `SYNTHETIC_CORRUPTION` | one transform counter and one selected transform ID; transformed bytes flow only to injected read and assertion; incomplete assertion; checker and retry counts 0; no unlisted escape | Representable |
| `INJECTED_MECHANICAL_FAILURE_THROW` | `INJECTED_FAILURE=1`; selected one of 14 inherited private-seam operation IDs; `THROWS_CONTENT_FREE_ERROR`; first-failure relation/assertion; incomplete assertion; checker/retry/semantic-consequence counts 0 | Representable |
| `INJECTED_MECHANICAL_FAILURE_PROGRESS` | `INJECTED_FAILURE=1`; operation `PRIVATE_SEAM_WRITE`; zero-progress or short-progress effect; progress-less-than-length relation; first-failure and incomplete assertions; checker/retry/semantic-consequence counts 0 | Representable |
| `CHECKER_EXCEPTION_AFTER_VERIFIED_CAPTURE` | checker count 1, retry/delivery counts 0; verified-capture operation dominates checker; checker input only verified-reference role; one content-free throw; response and receipt reread identity-unchanged relations/assertions; no return/store/closure/feedback/delivery escape | Representable |

### 8.1 ProbeValidity derivation

```text
if probeFamily=NOT_PROBE and probeStructure.scope=NOT_PROBE:
  ProbeValidity=NOT_PROBE
else if any required structural constituent is UNKNOWN:
  ProbeValidity=UNKNOWN
else if exactly one complete D6 predicate matches all ordinary and probeStructure facts:
  ProbeValidity=AUTHORISED
else:
  ProbeValidity=UNAUTHORISED
```

**Yes, `ProbeValidity` is derivable entirely from closed normalized facts after this extension.** It is retained as a recomputable finite relation for D5 compatibility. The capture must include the constituent `probeStructure`; a standalone `ProbeValidity=AUTHORISED` is invalid Evidence.

## 9. Necessity and Sufficiency

| Candidate addition tested | Decision | Reason |
| --- | --- | --- |
| Unrestricted `argumentLiteralFacts` containing raw values | Rejected | Broader than policy, retains arbitrary content, and is unnecessary |
| Finite per-argument `governedLiteralId` | Adopted | Smallest value representation that separates all six governed D4 literals |
| Separate `requiredArgumentCount` fact | Rejected | Predicate minimum over one AST `argumentCount` is sufficient |
| Separate `optionalArgumentPresence` fact | Rejected | Complete indexes plus `argumentCount` derive presence |
| Scenario call count on each ordinary operation fact | Rejected | Conflates AST arity with D6 scope counts |
| Universal argument relation fact | Rejected | Complete indexed argument facts plus one universal selector suffice |
| Arbitrary argument-to-argument relation language | Rejected | Closed `operationRelations` covers the only D4 operand relationships |
| Raw callback/local declaration name | Rejected | Constituent `callableFacts` use binding structure without retaining names |
| Opaque callback-valid boolean | Rejected | Would hide resolution, scope, cycle, return, transitive classification, and escape |
| Arbitrary cross-record IDs in D6 predicates | Rejected | Finite `ProbeValueRole` and `ProbeOperationRole` endpoints suffice |
| Opaque `ProbeValidity` input | Rejected | Complete `probeStructure` makes it derived |

The seven adopted additions are necessary because removing any one recreates at least one Section 6 indistinguishability pair or leaves a Section 7/8 row unselectable. They are sufficient because every inherited D4 row and D6 record maps to only existing facts plus these additions, with no residual prose condition.

## 10. Compatibility Audit

| Preserved area | Compatibility result |
| --- | --- |
| 37 D5 predicates / 17 prohibited families | Unchanged. Each existing D5 predicate sets `argumentCount`, literal, receiver, callable, operation-relation, universal-argument, and probe-structure selectors to `ANY` or `[]`, except the already-governed unauthorised-probe predicate may select derived `ProbeValidity` exactly as before |
| D5 prohibited-first semantics | Unchanged; every D5 predicate is still evaluated and all matches are reported |
| Exact-one terminal classification | Unchanged; extension fields only make D4/D6 matching complete |
| Public API policy | Unchanged |
| Governed source identities | Unchanged |
| Import policy | Unchanged |
| Repository and launch identity | Unchanged |
| One-use Authority semantics | Unchanged |
| Capture and bounded-manifest policy | Unchanged except a future separately authorised payload must version schemas before carrying the new structural fields |
| Check 5 consumption point | Unchanged |
| Mandatory STOP | Unchanged |
| Check 6 separation | Unchanged; this review does not run or authorise Check 6 |

No old predicate may omit a new required selector. `ANY` is explicit. D4/D6 predicates may constrain a new dimension only where the inherited D4/D6 meaning requires it.

## 11. Design-Rule Validation

| Rule | Result |
| --- | --- |
| Finite and closed | Pass: enums and object fields are enumerated; counts are schema-bounded safe integers |
| Declarative and non-executable | Pass: only enum, count, set, equality, range, AST binding, def-use, dominance, and graph-cycle facts |
| Deterministic | Pass: zero or multiple structural resolutions yield `UNKNOWN` |
| Versioned and schema-validatable | Pass: extension schema identity is fixed and all objects reject extras |
| Structural and implementation-independent | Pass: policy comes only from inherited D4/D6; no governed source was observed |
| Fail-closed | Pass: invalid schema, `UNKNOWN`, missing constituent, zero terminal matches, and multiple terminal matches fail |
| Rule-order-independent | Pass: all prohibited predicates and all terminal predicates remain set evaluations |
| No arbitrary text matcher | Pass: raw literal/source text is prohibited from Evidence |
| No free-form condition string | Pass: relation types and endpoints are closed enums |
| No operational capability | Pass: facts and selectors only classify a separately observed structure |

## 12. Required Direct Answers

```text
Can createHash("sha256") and createHash("sha512") now be distinguished structurally? YES

Can every D4 argument-count/literal/callback/relationship condition be represented without prose? YES

Can every D6 authorisation condition be represented from independently observable normalized facts? YES

Is ProbeValidity now fully derivable rather than asserted? YES

Does any already-governed D4 or D6 distinction remain unrepresentable? NO

Does any new field introduce operational capability? NO
```

## 13. Outcome Decision

### Outcome 1 - Minimum D3-V2 D4/D6 structural completion settled

**Selected.** The seven-field/selector extension is finite, closed, necessary, and sufficient for all 89 D4 operation/branch records and all nine D6 probe records. `ProbeValidity` is wholly derived from independently recorded constituents.

### Outcome 2 - Structural completion remains unresolved

Not selected. No representation choice remains necessary to expose an inherited D4/D6 distinction.

### Outcome 3 - Existing D3/D4/D6 architecture requires deeper redesign

Not selected. Versioned normalized facts and finite relations represent every inherited distinction without executable policy.

## 14. Authority Boundary and Stop

```text
D4 authoring Authority=NONE
D6 authoring Authority=NONE
candidate-authoring Authority=NONE
instrument Authority=NONE
Check 5 Authority=NONE
Check 6 Authority=NONE
```

No Authority is granted to edit D3-V2, D4, D5, D6, the historical candidate, any prior review, or implementation; create Candidate V2; reopen the exhausted candidate-authoring attempt; inspect governed source; author D4/D6 records; build or inspect an instrument; run Check 5, Check 6, tests, typecheck, ESLint, Git validation, repository validation, experiments, freeze, or acceptance.

Because Outcome 1 is selected, the only available next gate is:

```text
HH-0000 CHECK 5 D4/D6 TERMINAL PREDICATE MACHINE-ENCODING COMPLETION REVIEW - SECOND ATTEMPT
```

That gate is not performed automatically and inherits no Authority from this review.

## 15. Final State

```text
OUTCOME 1 - HH-0000 CHECK 5 D3-V2 D4 D6 STRUCTURAL FACT COMPLETION SETTLED PROSPECTIVELY - SEVEN CLOSED ADDITIONS COVER ARGUMENT COUNT GOVERNED LITERAL ID UNIVERSAL ARGUMENT SELECTION RECEIVER STRUCTURE CALLABLE STRUCTURE OPERATION RELATIONS AND PROBE STRUCTURE - CREATEHASH SHA256 AND SHA512 NOW STRUCTURALLY DISTINGUISHABLE WITHOUT RAW LITERAL EVIDENCE - ALL SEVENTY-FIVE D4 OPERATION ROWS FOURTEEN PRIVATE-SEAM BRANCHES AND NINE D6 PROBES REPRESENTABLE - PROBEVALIDITY FULLY DERIVABLE FROM CLOSED CONSTITUENTS - NO NEW D4 OPERATION D6 PROBE PERMISSION PROHIBITION OR OPERATIONAL CAPABILITY - D5 THIRTY-SEVEN PREDICATES SEVENTEEN FAMILIES UNCHANGED - PROHIBITED-FIRST EXACT-ONE TERMINAL AND CHECK SEPARATION UNCHANGED - HISTORICAL CANDIDATE 6350 BYTES SHA256 FF71059E5FBAD04831BF8CBC6D408B44B265D8657446A1FE8C2B0C8E8D972186 PRESERVED - CANDIDATE V2 NOT CREATED - CANDIDATE-AUTHORING AUTHORITY EXHAUSTED - CHECK 5 UNMEASURED - CHECK 6 NOT RUN - IMPLEMENTATION UNACCEPTED - D4 D6 CANDIDATE INSTRUMENT CHECK 5 CHECK 6 AUTHORITY NONE - STOP
```

D3-V2 D4/D6 structural fact completion review stops here.