# HH-0000 Check 5 D4 Operation Relations Universal Treatment Completion Review

**Status:** OUTCOME 1 - UNIVERSAL D4 OPERATION-RELATION TREATMENT SETTLED
**Review type:** Documentation-only bounded normative completion review
**Scope:** D4 `operationRelations` treatment only
**D4 predicates authored:** None
**D6 predicates authored:** None
**Governed implementation-source access:** None
**Instrument access:** None
**Authority effect:** None

# Repository Traceability

**Principle:** Truth before certainty; evidence before claims; smallest justified change; human Authority.
**Theory:** A terminal predicate must select the exact normalized observation for every acceptance-relevant structural fact. Absence of a listed operation relation is represented by `NONE`, not by ignoring the dimension.
**Architecture:** The existing D3-V2 `OperationRelation` enum and `Selector<OperationRelation>`, the D4 expressiveness mapping, and the separately governed D6 Model C wrapper.
**Engineering:** Apply one universal D4 rule according to whether the settled structural mapping includes `O`; preserve all operation-specific relation values and leave D6 unchanged.
**Milestone:** Not Applicable.
**Evidence:** The settled structural definitions, D4 expressiveness audit, and this documentation-only completion decision. No predicate, candidate, implementation, instrument, Check 5, Check 6, freeze, or acceptance Evidence is produced.

## 1. Sole Question

> What exact `operationRelations` selector must every D4 terminal predicate use?

## 2. Existing Structural Meaning

The existing schema already provides:

```text
NormalizedStructuralFactV2.operationRelations:
  nonempty sorted unique array<OperationRelation>

PredicateV2.operationRelations:
  Selector<OperationRelation>
```

The settled value meanings are:

```text
NONE = no listed operation relation applies
UNKNOWN = a listed relation is relevant but at least one endpoint cannot be resolved
ANY = the predicate deliberately ignores the relation dimension
```

The D4 expressiveness legend uses `O` for an operation whose terminal distinction requires `operationRelations`. It omits `O` for non-relational operations. The existing closed relation values cover the only D4 operand relationships.

## 3. Universal D4 Rule

### 3.1 D4 mapping includes `O`

If an operation's settled structural mapping includes `O`, its D4 terminal predicate must select the exact governed `OperationRelation` value or values already settled for that operation.

Examples of already-governed relational categories include role-root identity, rename pairing, bounded read/remove purpose, synthetic fixture member targeting, and complete fictional-response options shape. This review does not reopen or alter any of those operation-specific sets.

### 3.2 D4 mapping omits `O`

If an operation's settled structural mapping does not include `O`, its D4 terminal predicate must use exactly:

```json
{
  "mode": "ONE_OF",
  "values": [
    "NONE"
  ]
}
```

It must not use `{ "mode": "ANY" }`. `ANY` would admit concrete relational values and `UNKNOWN`, contradicting the normalized fact that no listed relation applies.

This rule applies mechanically to every D4 operation or branch whose settled structural mapping omits `O`. It introduces no new operation-specific relation.

## 4. ARRAY_EVERY Resolution

The settled D4 expressiveness mapping for `ARRAY_EVERY` is `C,R,F`, not `O`. Therefore:

```text
D4:ARRAY_EVERY:ONLY.operationRelations=
```

```json
{
  "mode": "ONE_OF",
  "values": [
    "NONE"
  ]
}
```

This closes the first failure recorded by the terminal-policy literal-construction re-review. It does not author or resume construction of `D4:ARRAY_EVERY:ONLY` or any other predicate.

## 5. Falsifiers

### 5.1 Non-relational D4 predicate

**Positive:** An otherwise matching `ARRAY_EVERY` normalized fact carries `operationRelations=[NONE]`. The selector `ONE_OF[NONE]` matches.

**Otherwise-identical negative:** Change only the normalized relation to a concrete listed relation. The selector fails because that fact is relational while `ARRAY_EVERY` has no settled `O` requirement.

**Unresolved negative:** Change only the normalized relation to `UNKNOWN`. The selector fails closed because `UNKNOWN` means a relevant relation has an unresolved endpoint, not that no relation applies.

**Over-broad alternative:** Replace `ONE_OF[NONE]` with `ANY`. Both negative facts would match, proving that `ANY` erases a normalized structural distinction and broadens D4 coverage.

### 5.2 Relational D4 predicate

**Positive:** An otherwise matching operation whose mapping includes `O` carries its exact settled relation value, such as the governed rename-pair relation. Its operation-specific selector matches.

**Otherwise-identical negative:** Change only that relation to `NONE`, `UNKNOWN`, or another concrete relation. The exact operation-specific selector fails.

These pairs demonstrate that the existing schema distinguishes non-relational, unresolved-relational, and exact-relational observations without extension.

## 6. D6 Model C Boundary

This rule is D4-only. It does not alter D6 Model C.

For D6 scenario predicates, outer:

```json
{
  "operationRelations": {
    "mode": "ANY"
  }
}
```

remains separately governed because `ProbeStructure` exclusively owns D6 scenario relation semantics. That ownership rationale does not apply to operation-level D4 predicates and is not transferred between layers.

## 7. Outcome Decision

### Outcome 1 - Universal D4 treatment fully settled

**Selected.** The existing `OperationRelation` enum and selector algebra represent the complete rule. D4 mappings with `O` retain their exact settled relation selectors; D4 mappings without `O` use exactly `ONE_OF[NONE]`.

### Outcome 2 - Exact value remains unresolved

Not selected. Both structural cases now have one deterministic treatment.

### Outcome 3 - Existing schema is insufficient

Not selected. No field, enum value, selector mode, or structural dimension is missing.

```text
OUTCOME=1
D4_OPERATION_RELATIONS_RULE=FULLY_SETTLED
D4_WITH_O=EXACT_SETTLED_OPERATION_RELATION_VALUES
D4_WITHOUT_O=ONE_OF[NONE]
D6_MODEL_C_CHANGE=NONE
D3_V2_CHANGE=NONE
D4_PREDICATES_AUTHORED=0
D6_PREDICATES_AUTHORED=0
```

## 8. Preserved State

```text
D5_PREDICATES=37/37 UNCHANGED
D5_PROHIBITED_FAMILIES=17/17 UNCHANGED
HISTORICAL_CANDIDATE_CANONICAL_BYTES=6350
HISTORICAL_CANDIDATE_SHA256=ff71059e5fbad04831bf8cbc6d408b44b265d8657446a1fe8c2b0c8e8d972186
HISTORICAL_CANDIDATE=UNCHANGED
CANDIDATE_V2=NOT_CREATED
CHECK_5=UNMEASURED
CHECK_6=NOT_RUN
IMPLEMENTATION=UNACCEPTED
```

No predicate construction is resumed in this review.

## 9. Authority Boundary and Stop

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

No Authority is granted to author predicates; create Candidate V2; inspect implementation or instrument code; create or execute an instrument; run tests, typecheck, ESLint, Git validation, implementation validation, harness work, Check 5, Check 6, freeze, acceptance, or experiment execution.

This bounded universal D4 operation-relations completion review stops here.