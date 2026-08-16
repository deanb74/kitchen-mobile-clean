# HH-0000 Check 5 ARRAY_SORT COUNT_1 Callable Tuple Completion Review

**Status:** OUTCOME 1 - EXACT ARRAY_SORT COUNT_1 CALLABLE TUPLE FULLY SETTLED
**Review type:** Documentation-only bounded normative completion review
**Scope:** `D4:ARRAY_SORT:COUNT_1.callableConstraints[0]` only
**Predicate objects authored:** None
**Governed implementation-source access:** None
**Instrument access:** None
**Authority effect:** None

# Repository Traceability

**Principle:** Truth before certainty; evidence before claims; smallest justified change; human Authority.
**Theory:** A closed machine policy must encode the complete governed meaning of a local independently classified comparator without narrowing or broadening that meaning by analogy.
**Architecture:** The existing D3-V2 callable structure, canonical `ARRAY_SORT` row, two settled count branches, prohibited-first evaluation, exact-one terminal classification, and post-match derivation.
**Engineering:** Compare the two finite scope candidates, derive every tuple constituent from its governing fact semantics, record one exact tuple, and stop before predicate construction.
**Milestone:** Not Applicable.
**Evidence:** The four named governing formation records and this record-local decision. No predicate, candidate, implementation observation, instrument, Check 5, Check 6, freeze, or acceptance Evidence is produced.

## 1. Sole Question

> What is the exact complete `callableConstraints[0]` tuple for `D4:ARRAY_SORT:COUNT_1`?

This review settles only `position`, `resolutions`, `scopes`, `cycles`, `capabilityReturns`, `terminalStatuses`, and `escapes`. It does not reopen any other predicate field or policy layer.

## 2. Governing Evidence

The canonical machine-schema review governs `ARRAY_SORT` in both `FOCUSED_TEST` and `PRODUCTION` roles and requires a comparator that is `statically resolved local and independently classified`.

The D3-V2 structural completion review establishes:

```text
COUNT_0: callableConstraints=[]
COUNT_1: one callable fact at ARGUMENT_0
```

It also defines the relevant meanings: unique resolution uses TypeScript lexical binding identity; scope derives from declaration and export ancestry; cycle derives from the complete reachable call graph; capability return derives from complete return-expression traversal; terminal status uses prohibited-first and exact-one classification; escape records surviving capture.

The 17-decision review supplies complete tuples for other named operations but not `ARRAY_SORT`. Those rows are consistency evidence, not authority to copy by analogy. No separate repository callable-tuple audit exists.

## 3. Scope Candidate Test

Both candidates share:

```text
position=ARGUMENT_0
resolutions=ONE_OF[UNIQUE_LOCAL_DECLARATION]
cycles=ONE_OF[ACYCLIC]
capabilityReturns=ONE_OF[NO_CAPABILITY_RETURN]
terminalStatuses=ONE_OF[EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL]
escapes=ONE_OF[NO_SURVIVING_CAPTURE]
```

### 3.1 Candidate A

```text
scopes=ONE_OF[SAME_FILE_PRIVATE]
```

**Positive case:** A uniquely declared same-file private comparator outside a nested test callback matches when all other constituents are favourable.

**Otherwise-identical negative case:** Moving only that declaration beneath an imported Jest test callback changes its scope to `NESTED_TEST_CALLBACK`; Candidate A rejects it.

**Meaning and coverage:** Candidate A represents one local form but narrows the dual-role canonical row without an `ARRAY_SORT`-specific exclusion.

**Decision:** Rejected.

### 3.2 Candidate B

```text
scopes=ONE_OF[NESTED_TEST_CALLBACK,SAME_FILE_PRIVATE]
```

**Positive case:** A valid uniquely declared comparator in either applicable local declaration context matches.

**Otherwise-identical negative case:** Changing only declaration ancestry to `EXPORTED`, `OTHER`, or `UNKNOWN` prevents a match.

**Meaning and coverage:** Candidate B admits exactly the two applicable non-exported local declaration scopes and neither broadens nor narrows the canonical row.

**Decision:** Selected.

## 4. Complete Constituent Decision

| Field | Exact value | Governing reason |
| --- | --- | --- |
| `position` | `ARGUMENT_0` | Settled count-1 comparator position |
| `resolutions` | `ONE_OF[UNIQUE_LOCAL_DECLARATION]` | Exactly one governed-file function or arrow binding |
| `scopes` | `ONE_OF[NESTED_TEST_CALLBACK,SAME_FILE_PRIVATE]` | Complete applicable local declaration ancestry |
| `cycles` | `ONE_OF[ACYCLIC]` | Complete reachable classification cannot contain a cycle |
| `capabilityReturns` | `ONE_OF[NO_CAPABILITY_RETURN]` | No capability may leave the comparator boundary |
| `terminalStatuses` | `ONE_OF[EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL]` | Prohibited-first, exact-one classification of every reachable executable |
| `escapes` | `ONE_OF[NO_SURVIVING_CAPTURE]` | No comparator capture survives the classified invocation boundary |

These values follow from governed semantics, not operation analogy.

## 5. Exact Literal Tuple

```json
{
  "position": "ARGUMENT_0",
  "resolutions": { "mode": "ONE_OF", "values": ["UNIQUE_LOCAL_DECLARATION"] },
  "scopes": { "mode": "ONE_OF", "values": ["NESTED_TEST_CALLBACK", "SAME_FILE_PRIVATE"] },
  "cycles": { "mode": "ONE_OF", "values": ["ACYCLIC"] },
  "capabilityReturns": { "mode": "ONE_OF", "values": ["NO_CAPABILITY_RETURN"] },
  "terminalStatuses": { "mode": "ONE_OF", "values": ["EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL"] },
  "escapes": { "mode": "ONE_OF", "values": ["NO_SURVIVING_CAPTURE"] }
}
```

This is callable-tuple policy data only, not a D4 predicate object.

## 6. Outcome Decision

### Outcome 1 - Exact tuple fully settled

**Selected.** Candidate B is exact and no structural extension is required.

### Outcome 2 - Values remain unresolved

Not selected.

### Outcome 3 - Structure insufficient

Not selected.

```text
OUTCOME=1
CALLABLE_TUPLE=FULLY_SETTLED
SELECTED_SCOPE_CANDIDATE=B
PREDICATE_OBJECTS_AUTHORED=0
STRUCTURAL_CHANGE=NONE
```

## 7. Preserved State

```text
D4_REQUIRED=95
D6_REQUIRED=22
TOTAL_REQUIRED=117
D4_AUTHORED=0
D6_AUTHORED=0
TOTAL_AUTHORED=0
F4_02=CLOSED
D5_PREDICATES=37/37 UNCHANGED
D5_PROHIBITED_FAMILIES=17/17 UNCHANGED
HISTORICAL_CANDIDATE=UNCHANGED
CANDIDATE_V2=NOT_CREATED
CHECK_5=UNMEASURED
CHECK_6=NOT_RUN
IMPLEMENTATION=UNACCEPTED
```

The separately governed terminal-policy closure re-review may now resume literal construction from D4. This review does not resume it automatically.

## 8. Authority Boundary and Stop

```text
predicate Authority=NONE
candidate Authority=NONE
instrument Authority=NONE
Check 5 Authority=NONE
Check 6 Authority=NONE
implementation Authority=NONE
freeze Authority=NONE
acceptance Authority=NONE
```

No predicate has been authored and no D4 or D6 construction has resumed. This bounded review stops here.