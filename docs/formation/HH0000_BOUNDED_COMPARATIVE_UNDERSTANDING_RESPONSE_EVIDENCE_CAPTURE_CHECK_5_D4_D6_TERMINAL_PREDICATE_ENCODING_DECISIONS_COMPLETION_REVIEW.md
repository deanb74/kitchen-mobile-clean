# HH-0000 Check 5 D4/D6 Terminal Predicate Encoding Decisions Completion Review

**Status:** OUTCOME 1 - ALL 17 D4/D6 ENCODING DECISIONS SETTLED
**Review date:** 2026-08-14
**Review type:** Documentation-only encoding-decisions completion review
**Immediate controlling record:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_D4_D6_TERMINAL_PREDICATE_MACHINE_ENCODING_COMPLETION_REVIEW_SECOND_ATTEMPT.md`
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
**Theory:** Encoding decisions may expose settled meaning but may neither broaden that meaning nor turn observed structure into permission.
**Architecture:** Existing D3-V2 plus `HH-CHECK-5-D3-D4-D6-STRUCTURAL-EXTENSION-1`, prohibited-first evaluation, complete terminal evaluation, and exact-one acceptance.
**Engineering:** Exact closure of the controlling 11 D4 and six D6 choices, finite selector schemas, direct falsifiers, compatibility checks, and mandatory stop.
**Milestone:** Not Applicable.
**Evidence:** This prospective decision record only. No D4/D6 predicate, candidate, implementation, instrument, Check 5, Check 6, freeze, or acceptance Evidence is produced.

## 1. Sole Question and Result

> Can each of the 17 remaining choices be settled prospectively, exactly and machine-encodably from the existing governed D4/D6 meaning, without implementation observation, architectural extension, capability broadening or invention of new policy meaning?

**Yes. Outcome 1 is selected.**

```text
17/17 SETTLED
remaining=0
D3-V2=UNCHANGED
```

The decisions below define count bounds, present/absent branches, callable selector tuples, nested probe selector schemas, exact collection matching, non-probe enum values, relation endpoint interpretation, and checker ordering. They instantiate no terminal predicate.

## 2. Encoding Rule Used for D4 Counts

The inherited D4 argument column is translated by this closed rule:

```text
ARGUMENT_COUNT_RULE_1

none                         -> RANGE minimum=0 maximum=0
index 0                      -> RANGE minimum=1 maximum=1
indexes 0 through 1          -> RANGE minimum=2 maximum=2
indexes 0 through 2          -> RANGE minimum=3 maximum=3
indexes 0 through 4          -> RANGE minimum=5 maximum=5
explicit count-0 branch      -> RANGE minimum=0 maximum=0
explicit count-1 branch      -> RANGE minimum=1 maximum=1
universal argument condition -> RANGE minimum=<governed minimum> maximum=null
```

No additional positional argument is permitted unless a separate governed branch or the universal condition supplies its count. `maximum=null` is used only for the already-settled universal records `PATH_RESOLVE`, `PATH_JOIN`, `ARRAY_PUSH`, and `EXPECT_MATCHER`. Their minimums are respectively `1`, `1`, `1`, and `0`.

For every indexed argument, the inherited provenance, data-label, governed-literal, destination, flow, receiver, callable, and operation-relation selectors remain conjunctive. This rule supplies arity only.

## 3. Exact 17-Decision Register

Each row independently records the requested ten elements: row number; choice ID; D4/D6 ownership; governed quantity; settled constraint and residual encoding choice; selected machine value/schema; minimality; positive falsifier; negative falsifier; and capability result.

| # | Choice ID / layer | Governed quantity, settled constraint, and prior encoding choice | Exact selected machine value or schema | Why smallest faithful | Positive falsifier | Negative falsifier | Capability or new meaning |
| ---: | --- | --- | --- | --- | --- | --- | --- |
| 01 | `D4-C01` / D4 | `BYTE_SLICE`: numeric arguments at indexes 0 and 1; count bounds were unset | `argumentCount={mode:RANGE,minimum:2,maximum:2}`; constraints at indexes 0 and 1 select `NUMBER`; `receiverClasses=ONE_OF[BYTE_SEQUENCE]` | Encodes exactly the two governed indexes and nothing else | byte receiver plus two numbers matches | count 0, 1, or 3; non-number index; non-byte receiver fails | None; only the inherited slice shape is exposed |
| 02 | `D4-C02` / D4 | `ARRAY_MAP`, `ARRAY_EVERY`, `ARRAY_SOME`: callback at index 0 is statically local and transitively classified; count/additional-argument rule was unset | For each operation: `argumentCount=RANGE(1,1)` and callable tuple `ARGUMENT_0 / UNIQUE_LOCAL_DECLARATION / ONE_OF[SAME_FILE_PRIVATE,NESTED_TEST_CALLBACK] / ACYCLIC / NO_CAPABILITY_RETURN / EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL / NO_SURVIVING_CAPTURE` | One callback is the sole governed argument; broader arity would add ungoverned input | tuple above matches | count 2, unresolved/cyclic/prohibited callback, capability return, or surviving capture fails | None; callback facts do not authorize the call |
| 03 | `D4-C03` / D4 | `ARRAY_INCLUDES`: governed searched value at index 0; count branch was unset | `argumentCount=RANGE(1,1)`; index 0 selects `GOVERNANCE_FIELD` or `PATH_SEGMENT`; `receiverClasses=ONE_OF[ARRAY]` | Restricts encoding to the sole governed index | listed searched value matches | count 0 or 2, unlisted label, or non-array receiver fails | None; no position argument is newly permitted |
| 04 | `D4-C04` / D4 | `ARRAY_JOIN`: CPD-D4 governs separator at index 0; present/absent choice was unset | `argumentCount=RANGE(1,1)`; index 0 selects `GOVERNANCE_FIELD`; `receiverClasses=ONE_OF[ARRAY]` | The inherited row names index 0; a count-0 branch would add meaning absent from that row | one governed separator matches | count 0 or 2, unlisted label, or non-array receiver fails | None; no separator-free branch is introduced |
| 05 | `D4-C05` / D4 | `ARRAY_SLICE`: numeric indexes 0 and 1; count branches were unset | `argumentCount=RANGE(2,2)`; indexes 0 and 1 select `NUMBER`; `receiverClasses=ONE_OF[ARRAY]` | Encodes exactly the two governed indexes | array receiver plus two numbers matches | count 0, 1, or 3; non-number index; non-array receiver fails | None; shorter invocation forms are not added |
| 06 | `D4-C06` / D4 | `STRING_STARTS_WITH`, `STRING_ENDS_WITH`, `STRING_INCLUDES`: governed search value at index 0; count branches were unset | For each operation: `argumentCount=RANGE(1,1)`; index 0 selects `GOVERNANCE_FIELD` or `PATH_SEGMENT`; `receiverClasses=ONE_OF[STRING]` | Encodes the sole governed index without adding a position argument | string receiver plus governed search value matches | count 0 or 2, unlisted label, or non-string receiver fails | None; no extra argument form is introduced |
| 07 | `D4-C07` / D4 | `STRING_SPLIT`: governed separator at index 0; count/limit branch was unset | `argumentCount=RANGE(1,1)`; index 0 selects `GOVERNANCE_FIELD`; `receiverClasses=ONE_OF[STRING]` | Encodes only the governed separator | string receiver plus governed separator matches | count 0 or 2, unlisted label, or non-string receiver fails | None; no limit argument is newly permitted |
| 08 | `D4-C08` / D4 | `JEST_DESCRIBE`, `JEST_IT`: title at index 0 and statically bounded callback at index 1; exact callable tuple was unset | For each operation: `argumentCount=RANGE(2,2)`; callable tuple `ARGUMENT_1 / UNIQUE_LOCAL_DECLARATION / SAME_FILE_PRIVATE / ACYCLIC / NO_CAPABILITY_RETURN / EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL / NO_SURVIVING_CAPTURE`; inherited title selector remains | Every constituent is already required by “statically bounded” and transitive classification | exact title/callback pair matches | changed count, unresolved/exported/cyclic/prohibited callback, capability return, or surviving capture fails | None; describes callback closure only |
| 09 | `D4-C09` / D4 | `JEST_FN`: count-0 branch or count-1 statically resolved callback branch; present-branch tuple was unset | Record A: `argumentCount=RANGE(0,0)`, `callableConstraints=[]`. Record B: `argumentCount=RANGE(1,1)` plus `ARGUMENT_0 / UNIQUE_LOCAL_DECLARATION / ONE_OF[SAME_FILE_PRIVATE,NESTED_TEST_CALLBACK] / ACYCLIC / NO_CAPABILITY_RETURN / EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL / NO_SURVIVING_CAPTURE` | Two records encode the two settled branches without nullable fields | count 0, or count 1 with valid callback matches one record | count 2 or invalid callback matches neither | None; neither branch conveys permission by itself |
| 10 | `D4-C10` / D4 | `EXPECT_MATCHER`: matcher arguments must be fictional/local facts; matcher-specific count encoding was unset | Record A: `argumentCount=RANGE(0,0)`. Record B: `argumentCount=RANGE(1,1)` and `everyArgument` retains the inherited fictional/local provenance and data-label selectors. No record permits count above 1 | All already-governed D6 matcher forms have zero or one matcher argument; two disjoint records avoid matcher-name inference | governed zero-argument matcher or one fictional/local argument matches one record | count 2 or one sensitive/nonlocal argument matches neither | None; no matcher or assertion meaning is added |
| 11 | `D4-C11` / D4 | Fourteen `PRIVATE_SEAM_*` calls use a governed parameter callable and full base-operation selectors; callable tuple was unset | Each seam record uses `CALLEE / UNIQUE_PARAMETER / NONE / ACYCLIC / NO_CAPABILITY_RETURN / EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL / NO_SURVIVING_CAPTURE`, plus the explicit base row's count, literal, arguments, destinations, flows, receiver, and operation relations | `UNIQUE_PARAMETER` is the narrow existing resolution value for an injected seam; `NONE` correctly marks declaration scope as non-applicable | listed parameter seam with complete base shape matches | local/imported non-parameter, cycle, prohibited body, capability return, surviving capture, or changed base shape fails | None; parameter status does not authorize injected behavior |
| 12 | `D6-S01` / D6 | Complete nested `ProbeStructureSelector` schemas were absent | Adopt the closed schemas in Section 4.1 for root, operation, assertion, relation, counter, and escape selectors; every field required; additional properties false | Mirrors each existing fact constituent and adds no observation field | schema-valid selector matches eligible facts | missing/extra field or unknown enum invalidates policy | None; selectors compare facts only |
| 13 | `D6-S02` / D6 | Child-array matching mode was unset | Adopt `RecordSetSelector={mode:ANY}` or `{mode:KEY_EQUAL,records:[...]}`; `KEY_EQUAL` requires exact fact-key equality and field-selector match for every keyed record | Two modes are sufficient: irrelevant or complete closed set | identical key set and matching fields passes | missing key, extra key, or mismatched field fails | None; no first-match, priority, or rescue behavior |
| 14 | `D6-S03` / D6 | Role-key completeness and duplicate/cardinality handling were unset | Use the exact composite keys in Section 4.2; keys unique; arrays sorted by key; every role used by a probe has one keyed record; zero counts and zero escape channels are explicit; duplicate, omitted, or unresolved key fails | Exact keys distinguish proved zero from absent Evidence | complete unique keyed records pass | duplicate, omission, extra role, or `UNKNOWN` fails | None; completeness cannot grant authorization |
| 15 | `D6-S04` / D6 | Probe-local non-applicable enum values were unnamed | `DeniedMemberId` adds `NONE,UNKNOWN`; `CorruptionTransformId` adds `NONE,UNKNOWN`; `ProbeFailureOperation` is the complete enum in Section 4.1 | Adds only non-applicable and unresolved sentinels required by closed records | non-probe uses `NONE/NONE/NOT_PROBE`; applicable probe uses governed ID | non-probe using a governed ID or applicable probe using `NONE/NOT_PROBE/UNKNOWN` fails | None; sentinels carry no permission |
| 16 | `D6-S05` / D6 | Existing relation fields lacked fixed typed interpretation for order and flow | Adopt the per-kind endpoint rules in Section 4.3. No field is added. `operationRole` identifies producer/current/later operation according to relation kind; value endpoints identify its statically unique input/output lineage | Reuses the settled three endpoint fields and avoids a new D3 relation | unique governed endpoint mapping passes | zero/multiple lineage, reversed order, or changed endpoint role yields `UNKNOWN` or mismatch | None; relation presence remains an observation |
| 17 | `D6-S06` / D6 | Verified-capture-before-checker mapping was unset | Require `OPERATION_PRECEDES_OPERATION / leftRole=VERIFIED_REFERENCE / rightRole=CHECKER_INPUT / operationRole=CHECKER`, plus `CHECKER_INPUT_ONLY_VERIFIED_REFERENCE` with the identical endpoint tuple, `CHECKER_INVOCATION=1`, and checker failure effect `THROWS_CONTENT_FREE_ERROR` | The verified reference uniquely identifies the prior producer; checker identifies the later consumer | verified producer dominates checker and is sole checker input | checker precedes capture, receives another value, count differs, or throw is not content-free fails | None; checker chronology and input identity do not authorize execution |

Decision-row validation target:

```text
decisionRows=17
D4Rows=11
D6Rows=6
settled=17
remaining=0
```

## 4. Closed D6 Selector Encoding

### 4.1 Required selector records

```text
BooleanSelector = Selector<false|true>

RecordSetSelector<T> = exactly one of:
  {mode:ANY}
  {mode:KEY_EQUAL,records:array<T>}

ProbeOperationConstraint = {
  role:ProbeOperationRole,
  operations:Selector<OperationIdV2>,
  argumentCount:CountRangeSelector,
  countWithinScope:CountRangeSelector,
  inputRoles:SetSelector<ProbeValueRole>,
  outputRoles:SetSelector<ProbeValueRole>,
  failureEffects:Selector<FailureEffect>
}

ProbeAssertionConstraint = {
  matcher:AssertionMatcher,
  expected:AssertionExpected,
  subjectRole:ProbeValueRole,
  operationRole:ProbeOperationRole,
  sameTestCallback:BooleanSelector,
  postDominates:BooleanSelector
}

ProbeRelationConstraint = {
  kind:ProbeRelationKind,
  leftRole:ProbeValueRole,
  rightRole:ProbeValueRole,
  operationRole:ProbeOperationRole
}

ProbeCounterConstraint = {
  counter:ProbeCounter,
  count:CountRangeSelector
}

ProbeEscapeConstraint = {
  valueRole:ProbeValueRole,
  channels:SetSelector<EscapeChannel>
}

ProbeStructureSelector = {
  scope:Selector<ProbeScope>,
  deniedMemberIds:Selector<DeniedMemberId>,
  corruptionTransformIds:Selector<CorruptionTransformId>,
  failureOperations:Selector<ProbeFailureOperation>,
  operations:RecordSetSelector<ProbeOperationConstraint>,
  assertions:RecordSetSelector<ProbeAssertionConstraint>,
  relations:RecordSetSelector<ProbeRelationConstraint>,
  counters:RecordSetSelector<ProbeCounterConstraint>,
  escapes:RecordSetSelector<ProbeEscapeConstraint>
}
```

```text
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

`SetSelector<T>` is exactly:

```text
{mode:ANY}
{mode:EQUALS,values:sorted unique array<T>}
{mode:CONTAINS,values:nonempty sorted unique array<T>}
{mode:DISJOINT,values:nonempty sorted unique array<T>}
```

`EQUALS` permits `values=[]` and is the sole encoding for proved no escape channels. `CONTAINS` requires every selected value in the fact set. `DISJOINT` requires no selected value in the fact set. No mode executes user code or accepts free-form conditions.

### 4.2 Exact keys and collection semantics

```text
operations key  = role
assertions key  = matcher + expected + subjectRole + operationRole
relations key   = kind + leftRole + rightRole + operationRole
counters key    = counter
escapes key     = valueRole
```

For `KEY_EQUAL`:

1. fact and predicate key sets must be equal;
2. each key occurs exactly once in each set;
3. records sort lexicographically by their stable-serialized key;
4. every non-key predicate field matches its fact field;
5. an extra, missing, duplicate, malformed, or `UNKNOWN` key fails;
6. a required zero is an explicit count range `0..0` or `channels=EQUALS[]`;
7. absence never proves zero.

`ANY` is permitted only when that whole child collection is irrelevant to the predicate. Every authorised D6 predicate uses `KEY_EQUAL` for every constituent collection required by its governed probe record.

### 4.3 Existing relation endpoint semantics

| Relation kind | `leftRole` | `rightRole` | `operationRole` | Exact derivation |
| --- | --- | --- | --- | --- |
| `SAME_TEST_CALLBACK` | source value | consumed value | consuming operation | both value lineages and operation have one identical enclosing test-callback binding |
| `ASSERTION_SUBJECT` | produced value | assertion subject value | producing operation | assertion subject has the produced value's unique def-use lineage |
| `ASSERTION_POSTDOMINATES_OPERATION` | produced value | assertion subject value | governed operation | assertion fact names the operation and every control-flow path from operation to callback exit crosses the assertion |
| `VALUE_IDENTITY_EQUAL`, `VALUE_CONTENT_EQUAL`, `VALUE_BYTE_LENGTH_EQUAL`, `VALUE_SHA256_EQUAL` | first value | second value | operation producing the second value | settled identity or required assertion establishes the named equality without retaining content |
| `MUTATES_ONLY` | mutated value | `NONE` | mutation operation | exactly one mutation target has the left value's lineage and no other mutation target exists in scope |
| `VALUE_FLOWS_ONLY_TO` | produced value | sole non-assertion consumer value | producing operation | every non-assertion outgoing def-use edge terminates in the right value's lineage; assertion use is represented separately |
| `OPERATION_PRECEDES_OPERATION` | output of earlier operation | input of later operation | later operation | unique producer of left value dominates the operation consuming right value in the same scenario scope |
| `CHECKER_INPUT_ONLY_VERIFIED_REFERENCE` | `VERIFIED_REFERENCE` | `CHECKER_INPUT` | `CHECKER` | every checker argument def-use edge originates at the verified-reference lineage |
| `FAILURE_IS_FIRST_FAILURE` | `FIRST_FAILURE_IDENTITY` | `OUTCOME_STATUS` | `INJECTED_FAILURE` | selected failure dominates every later failure-capable operation and the outcome's failure identity equals it |
| `PROGRESS_LESS_THAN_EXPECTED_LENGTH` | `RETURNED_PROGRESS` | `EXPECTED_BYTE_LENGTH` | `INJECTED_FAILURE` | both are statically identified number facts and the governed zero/short effect selects the relation |

Zero or multiple endpoint resolutions yield the existing `UNKNOWN` relation constituent and cannot match an authorised selector.

### 4.4 Nine-probe completeness mapping

| Probe | Exact required operation/counter facts | Exact assertion/relation facts | Exact prohibited escape proof |
| --- | --- | --- | --- |
| `DENIED_PUBLIC_MEMBER_REFLECT_GET` | `DENIED_LOOKUP` count 1, argument count 2, governed denied-member ID | same-callback post-dominating `TO_BE_UNDEFINED`; assertion-subject relation | `LOOKUP_RESULT` has `EQUALS[]` channels |
| `DENIED_PUBLIC_MEMBER_IN` | `DENIED_LOOKUP` count 1, argument count 2, governed denied-member ID | same-callback post-dominating `TO_BE_FALSE`; assertion-subject relation | `LOOKUP_RESULT` has `EQUALS[]` channels |
| `DENIED_PUBLIC_MEMBER_KEYS` | `DENIED_KEYS_ENUMERATION` count 1, argument count 1, governed denied-member ID | same-callback post-dominating `NOT_TO_CONTAIN` with `DENIED_MEMBER_VALUE` | keys result has `EQUALS[]` channels |
| `FRESH_COPY_MUTATION` | `READ_BYTES_INVOCATION=2`, `MUTATION=1` | first-copy-only mutation; second-copy/baseline content, length, and SHA-256 equality assertions and relations | first and second copy roles have `EQUALS[]` channels |
| `FROZEN_OBJECT_MUTATION` | frozen check count 1; frozen mutation count 1 and argument count 0 | target identity equality; post-dominating true and throw assertions | frozen target and mutation result have `EQUALS[]` channels |
| `SYNTHETIC_CORRUPTION` | `TRANSFORM=1`, one governed transform ID, injected read count 1, checker/retry counts 0 | transformed bytes flow only to injected-read result outside assertion use; incomplete assertion | transformed and injected-read roles have `EQUALS[]` channels |
| `INJECTED_MECHANICAL_FAILURE_THROW` | `INJECTED_FAILURE=1`, one of 14 failure operation IDs, content-free throw; checker/retry/semantic counts 0 | first-failure and incomplete assertions; first-failure relation | failure/outcome roles have `EQUALS[]` channels |
| `INJECTED_MECHANICAL_FAILURE_PROGRESS` | `INJECTED_FAILURE=1`, failure operation `PRIVATE_SEAM_WRITE`, zero/short effect; checker/retry/semantic counts 0 | progress-below-length, first-failure, and incomplete assertions/relations | progress/outcome roles have `EQUALS[]` channels |
| `CHECKER_EXCEPTION_AFTER_VERIFIED_CAPTURE` | checker count 1, content-free throw, retry/delivery counts 0 | both C17 relations; response/receipt reread identity-unchanged assertions | verified reference, checker input, and reread roles have `EQUALS[]` channels |

Every probe uses `scope=ONE_TEST_CALLBACK`. Every listed assertion requires `sameTestCallback=ONE_OF[true]` and `postDominates=ONE_OF[true]`. Each probe's `KEY_EQUAL` records contain only its listed role keys; exact counts are represented by `RANGE(n,n)`.

## 5. ProbeValidity Recalculation

`ProbeValidity` remains a derived relation:

```text
1. Validate the complete ordinary D3-V2 and extension fact.
2. Validate ProbeStructure and all unique role keys.
3. If probeFamily=NOT_PROBE and the exact non-probe structure is present:
     ProbeValidity=NOT_PROBE.
4. If a required applicable constituent is UNKNOWN or structurally invalid:
     ProbeValidity=UNKNOWN.
5. Otherwise evaluate every complete D6 predicate using KEY_EQUAL semantics.
6. If exactly one D6 predicate matches:
     ProbeValidity=AUTHORISED.
7. If zero or multiple D6 predicates match:
     ProbeValidity=UNAUTHORISED.
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

An observed or supplied `ProbeValidity=AUTHORISED` never bypasses steps 1 through 7. A mismatch between supplied capture value and recomputation invalidates the capture and fails; it cannot grant permission.

## 6. No Structural Extension Test

All 17 choices use existing prospective fields and selectors. No positive/negative pair remains identical after applying these decisions:

```text
new D3 fact fields=0
new D3 selectors=0
new D3 relations=0
D3-V2 changed=false
```

The D6 nested selector records complete the already-declared `ProbeStructureSelector`; they do not add observation facts. The relation endpoint rules interpret already-declared fields and add no endpoint.

## 7. Compatibility and Preserved State

| Area | Result |
| --- | --- |
| Historical candidate | Unchanged at 6,350 canonical bytes and the recorded SHA-256 |
| Failed V2 authoring record | Unchanged |
| Candidate V2 | Not created; no candidate payload authored or corrected |
| D3-V2 structural decisions | Unchanged |
| D5 | Exactly 37 predicates / 17 families unchanged |
| D5 prohibited-first evaluation | Unchanged |
| Exact-one terminal classification | Unchanged |
| Public API, source identities, imports, repository/launch identity | Unchanged |
| One-use Authority, capture/manifest, consumption point, mandatory stop | Unchanged |
| Check 5 | `UNMEASURED` |
| Check 6 | `NOT RUN` |
| Implementation | `UNACCEPTED` |
| Candidate-authoring and execution Authority | None |

No decision grants capability or changes D4/D6 meaning. The selected counts conservatively encode only governed indexes and explicit branches. The D6 schemas compare independently normalized facts and cannot execute callbacks or source-derived conditions.

## 8. Outcome Decision

### Outcome 1 - All 17 D4/D6 encoding decisions settled

**Selected.** Every registered choice has an exact finite machine value or schema, a direct positive/negative falsifier, and no remaining author judgement.

```text
17/17 SETTLED
remaining=0
D3-V2 remains unchanged
```

### Outcome 2 - One or more encoding decisions remain unresolved

Not selected. The decision register contains no unresolved value or schema.

### Outcome 3 - D3-V2 structural insufficiency discovered

Not selected. No governed positive/negative pair remains indistinguishable under the unchanged prospective structural model.

## 9. Authority Boundary and Next Gate

```text
D4 predicate-authoring Authority=NONE
D6 predicate-authoring Authority=NONE
candidate-authoring Authority=NONE
instrument Authority=NONE
Check 5 Authority=NONE
Check 6 Authority=NONE
```

No Authority is granted to author D4/D6 predicates; modify D3-V2, D4, D5, D6, prior reviews, the historical candidate, failed V2 record, or implementation; create or correct a candidate; inspect governed source; build, inspect, modify, readiness-test, or execute an instrument; run Check 5, Check 6, tests, typecheck, ESLint, Git validation, implementation validation, acceptance, harness work, or experiment execution.

The only next gate that may now be considered is:

```text
HH-0000 CHECK 5 D4/D6 TERMINAL PREDICATE MACHINE-ENCODING COMPLETION REVIEW - THIRD ATTEMPT
```

It is not candidate authoring and is not performed automatically.

## 10. Final State

```text
OUTCOME 1 - HH-0000 CHECK 5 D4 D6 TERMINAL PREDICATE ENCODING DECISIONS COMPLETION REVIEW SETTLES ALL SEVENTEEN REGISTERED CHOICES - ELEVEN D4 AND SIX D6 DECISIONS CLOSED - 17 OF 17 SETTLED - REMAINING ZERO - EXACT COUNTS BRANCHES CALLABLE TUPLES NESTED PROBE SELECTORS KEY EQUALITY COMPLETENESS NON-PROBE VALUES RELATION ENDPOINT SEMANTICS CHECKER ORDERING AND PROBEVALIDITY RECOMPUTATION FIXED - D3-V2 UNCHANGED - NO PREDICATES AUTHORED - D5 THIRTY-SEVEN PREDICATES SEVENTEEN FAMILIES UNCHANGED - HISTORICAL CANDIDATE 6350 BYTES SHA256 FF71059E5FBAD04831BF8CBC6D408B44B265D8657446A1FE8C2B0C8E8D972186 UNCHANGED - FAILED V2 AUTHORING RECORD UNCHANGED - CANDIDATE V2 NOT CREATED - CHECK 5 UNMEASURED - CHECK 6 NOT RUN - IMPLEMENTATION UNACCEPTED - NO LIVE CANDIDATE OR EXECUTION AUTHORITY - THIRD-ATTEMPT COMPLETION REVIEW MAY BE CONSIDERED - STOP
```

D4/D6 terminal predicate encoding decisions completion review stops here.