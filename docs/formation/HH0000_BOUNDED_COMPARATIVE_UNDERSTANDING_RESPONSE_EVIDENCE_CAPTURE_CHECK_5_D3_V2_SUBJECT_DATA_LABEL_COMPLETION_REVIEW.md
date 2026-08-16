# HH-0000 Check 5 D3-V2 Subject-Data-Label Completion Review

**Status:** OUTCOME 1 - MINIMUM D3-V2 SUBJECT-DATA-LABEL COMPLETION SETTLED - NO D5 OR CANDIDATE AUTHORING AUTHORITY
**Review date:** 2026-08-14
**Review type:** Strictly documentation-only prospective D3-V2 subject-data-label completion review
**Controlling dependency review:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_D5_PROHIBITED_PREDICATE_COMPLETION_REVIEW_SECOND_ATTEMPT.md`
**Inherited D3-V2 governance:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_D3_STRUCTURAL_FACT_MODEL_COMPLETION_REVIEW.md`
**Historical candidate canonical identity:** `6350` bytes / `ff71059e5fbad04831bf8cbc6d408b44b265d8657446a1fe8c2b0c8e8d972186`
**Historical candidate classification:** `HISTORICAL_CANDIDATE_POLICY_EVIDENCE`
**Governed implementation-source access:** None
**Candidate effect:** None - no candidate specification or payload was created, edited, corrected, relabelled, frozen, or adopted
**D3/D5 effect:** Prospective D3-V2 governance only - no historical D3/D5 record was edited and no D5 predicate was authored
**Instrument effect:** None - no instrument was built, inspected, modified, readiness-tested, validated, or executed
**Check 5:** Not run; governed quantity remains `UNMEASURED`
**Check 6:** `NOT RUN`
**Implementation:** `UNACCEPTED`
**Authority effect:** No D5 predicate, candidate authoring, source inspection, implementation, execution, freeze, or acceptance Authority granted

# Repository Traceability

**Principle:** Truth before certainty; evidence before claims; human Authority; smallest justified change.
**Theory:** A known subject/value data distinction must be preserved as a normalized fact before a structural predicate can select it.
**Architecture:** One self-contained canonical payload, declarative total structural classification, complete enumeration, verified transport, one-use execution, and mandatory stop.
**Engineering:** Necessity and sufficiency tests, exact field/cardinality decision, sentinel audit, subject/argument separation, eight-surface compatibility audit, and direct falsifiers.
**Milestone:** Not Applicable.
**Evidence:** This documentation-only prospective D3-V2 decision. No D5 predicate, candidate payload, implementation observation, instrument, Check 5, Check 6, or acceptance Evidence is produced.

## 1. Sole Question

> What is the smallest exact prospective extension to D3-V2 that makes the already-governed subject/public-value data label directly observable and predicate-selectable, without altering any existing D5 meaning, introducing a new prohibited family, broadening classification, or adding operational capability?

The minimum exact extension is:

```text
DataLabelV2:
  add exactly NONE

NormalizedStructuralFactV2:
  subjectDataLabels: nonempty sorted unique array<DataLabelV2>

PredicateV2:
  subjectDataLabels: Selector<DataLabelV2>
```

The two proposed fields are necessary and sufficient. Adding `NONE` is also necessary because D3-V2 requires every fact field and every fact array to be present and non-empty, while the inherited `DataLabelV2` has no non-applicable value. `UNKNOWN` cannot serve as non-applicable because it means an applicable fact could not be resolved.

No new path, root, descriptor, relation, capability, operation, provenance, probe, or terminal value is required.

**Exactly one outcome is selected: Outcome 1 - Minimum D3-V2 subject-data-label completion settled.**

## 2. Strict Boundary

This review used only the controlling documentation records. It did not inspect either governed implementation source; author D5 predicates; edit historical D3-V2, D5, candidate-policy, or prior review records; create a candidate payload; inspect or build an instrument; run Check 5, Check 6, tests, typecheck, ESLint, Git validation, implementation validation, harness work, or acceptance; freeze policy; or claim CPD closure.

Only this review record is created.

## 3. Independent Minimum Test

### 3.1 Necessity

Current D3-V2 exposes data labels only in `argumentFacts[*].dataLabels`. It has no top-level fact for the subject/value represented by the record. Current `PredicateV2` can therefore select an indexed argument's label but cannot select the subject's label.

Neither `publicNameCapabilities` nor `publicTypeCapabilities` is a substitute: the governed positive case explicitly permits an innocuous public name and type. Neither `destinationLabels=PUBLIC_RETURN` nor `dataFlows=PUBLIC_MEMBER_VALUE` is sufficient because the otherwise identical negative fact shares both. A relation is unnecessary if the missing subject label itself becomes selectable.

Therefore one top-level fact and one matching selector are necessary.

### 3.2 Sufficiency

With `subjectDataLabels`, the decisive facts differ in one selectable dimension:

```text
positive.subjectDataLabels = [PATH_SEGMENT]
negative.subjectDataLabels = [GOVERNANCE_FIELD]
```

A future `PUBLIC_PATH_ROOT_DESCRIPTOR` predicate can use one existing `ONE_OF` selector over the already-governed path/root/descriptor labels. It matches the positive fact and not the negative fact while every other selector remains identical. No relation, inference, or `UNKNOWN` substitution is needed.

### 3.3 Correct scope

`subjectDataLabels` describes only the data value directly represented or carried by the normalized record. It does not describe:

1. any argument value;
2. a receiver, callback input, return destination, or nested value unless that value is itself the record's subject;
3. every value reachable from the subject;
4. a name/type capability;
5. a semantic conclusion or prohibition.

This scope is exactly the missing public-flow value and cannot itself broaden D5.

### 3.4 Non-duplication with argument facts

`argumentFacts[index].dataLabels` labels only the value at that call/new operation argument index. `subjectDataLabels` labels only the record's subject/value. No automatic copying or propagation exists in either direction.

If a path label appears only on argument `0`, the subject selector does not match it. If it appears only on the subject, an argument constraint does not match it. If both independently carry the label, both facts record it independently.

## 4. Exact Prospective Schema Extension

### 4.1 DataLabelV2 addition

Add exactly one value:

```text
NONE
```

`NONE` means the record has no subject/value to label, or a subject/value exists but no governed `DataLabelV2` applies. It is not uncertainty and does not match `UNKNOWN`.

The existing path/root/descriptor distinctions are already sufficient:

```text
PATH_SEGMENT REPOSITORY_PRECONDITION_PATH EXTERNAL_ROOT_PATH ATTEMPT_PATH
SUITE_ROOT_PATH FILE_DESCRIPTOR TOKEN_PATH REPOSITORY_PATH
GOVERNED_SOURCE_PATH FINAL_RESPONSE_PATH FINAL_RECEIPT_PATH
```

No additional `DataLabelV2` value is authorised.

### 4.2 NormalizedStructuralFactV2 addition

Add exactly one required field:

```text
subjectDataLabels: nonempty sorted unique array<DataLabelV2>
```

Semantics are:

1. one or more concrete labels are present when the subject/value's normalized provenance, operation, flow, destination, or existing deterministic data classification establishes them;
2. multiple concrete labels are permitted only when each independently applies to the same subject/value;
3. `NONE` is used when the dimension is non-applicable or no governed label applies;
4. `UNKNOWN` is used when the dimension applies but normalized structural facts are insufficient to resolve any concrete label;
5. `NONE` and `UNKNOWN` are each mutually exclusive with every other label;
6. an empty, duplicate, unsorted, unknown-valued, absent, or `null` array invalidates the fact;
7. concrete labels are inherited only from the existing closed `DataLabelV2` derivations; this review creates no new derivation meaning.

### 4.3 PredicateV2 addition

Add exactly one required field:

```text
subjectDataLabels: Selector<DataLabelV2>
```

Existing selector semantics apply unchanged:

1. `ANY` matches without inspecting labels and prohibits `values`;
2. `ONE_OF` matches when its non-empty closed value set intersects `subjectDataLabels`;
3. `NONE_OF` matches when its non-empty closed value set has no intersection with `subjectDataLabels`;
4. values are unique and sorted;
5. an absent field, empty values, unknown value, extra property, or malformed selector invalidates policy before source access.

All existing predicates must carry `subjectDataLabels={"mode":"ANY"}` unless their already-governed meaning expressly depends on subject/value labels. Adding the field does not make a label prohibited.

## 5. Structural Derivation Boundary

Concrete `subjectDataLabels` derive only from normalized structural/data-flow facts already allowed by D3-V2:

1. resolved provenance of the subject/value;
2. its normalized operation result or literal-data classification;
3. the exact flow by which that same value is carried;
4. its exact destination classification;
5. an existing deterministic relation that identifies that same value.

Derivation must not use raw source text, identifier substring matching alone, comments, test titles, runtime execution, implementation observation during this review, free-form family strings, or semantic inference.

A label derived for an argument, receiver, destination, nested member, or related value is not a subject label unless a separate normalized record makes that value the subject.

## 6. Decisive Positive/Negative Test

All inherited dimensions are identical for both facts:

```text
sourceRole=PRODUCTION
nodeKind=PUBLIC_MEMBER
provenanceKind=PUBLIC_VALUE
publicNameCapabilities=[NONE]
publicTypeCapabilities=[NONE]
destinationLabels includes PUBLIC_RETURN
dataFlows includes PUBLIC_MEMBER_VALUE
```

The completed distinction is:

| Fact | `subjectDataLabels` | Future path-branch selector result |
| --- | --- | --- |
| Positive governed public path value | `[PATH_SEGMENT]` | `ONE_OF` governed path/root/descriptor labels: **MATCH** |
| Negative non-path mechanical public value | `[GOVERNANCE_FIELD]` | Same selector: **NO MATCH** |

The new field fully resolves the prior indistinguishability proof. No deeper structural relation is required.

## 7. Required Compatibility Audit

| Surface | Compatibility finding |
| --- | --- |
| `PUBLIC_PATH_ROOT_DESCRIPTOR` | **NARROWLY COMPLETED.** Future predicates may select existing path/root/descriptor subject labels; name/type capability branches remain unchanged |
| `PUBLIC_MUTATION_LIFECYCLE` | **UNCHANGED.** Existing public name/type capability selectors remain controlling; subject labels do not imply mutation/lifecycle prohibition |
| `PUBLIC_SEMANTIC_PERMISSION_RESULT` | **UNCHANGED.** Existing public name/type capability selectors remain controlling; subject labels do not imply semantic/permission prohibition |
| `RESPONSE_TRANSFORMATION_EGRESS` | **UNCHANGED.** `ResponseFlowRelation` remains controlling; subject labels neither replace nor broaden it |
| `UNAUTHORISED_WRITE_OR_REMOVE` | **UNCHANGED.** `FilesystemMutationRelation` remains controlling; subject labels do not decide filesystem authority |
| `UNKNOWN_EXECUTABLE_EDGE` | **COMPATIBLE.** Applicable unresolved subject labels use `[UNKNOWN]` and may be selected fail-closed; known labels are never converted to `UNKNOWN` |
| Authorised D6 probes | **UNCHANGED.** Existing probe family/validity and D6 selectors remain controlling; arguments and subjects remain separately labelled |
| Ordinary mechanical public values | **PRESERVED.** Concrete non-path labels or `[NONE]` do not match a path/root/descriptor selector and do not become prohibited merely because the field exists |

No already-distinguishable family broadens. A future predicate must explicitly select `subjectDataLabels`; presence alone has no classification effect.

## 8. Direct Falsifiers

| Falsifier | Required result |
| --- | --- |
| Positive public path-labelled value | Subject path selector matches |
| Otherwise identical non-path public value | Subject path selector does not match |
| Path label on argument but not subject | Subject path selector does not match |
| Subject path label with innocuous public name/type | Subject path selector still matches |
| Public name/type path capability with no subject path label | Existing public-capability predicate remains sufficient; subject path branch does not match |
| Unresolved applicable subject provenance | `subjectDataLabels=[UNKNOWN]`; fail-closed handling remains available |
| Duplicate, unsorted, empty, unknown-enum, absent, or null subject label array | Fact or policy validation fails before classification |
| New selector used in an unrelated D5 predicate | No automatic prohibition; only the complete predicate's explicit conjunction can match |
| `NONE` used with a concrete label or `UNKNOWN` | Fact validation fails |
| Argument label copied implicitly to subject | Fact normalization fails |

## 9. Exact-One and Capability Test

The extension does not change prohibited-first evaluation, terminal predicate definitions, zero/multiple terminal behavior, or `TerminalCandidateStatus`. It adds one fact dimension available to all predicates. Existing predicates constrain it with `ANY`; therefore their match sets and exact-one outcomes are unchanged.

A future prohibited match still fails before terminal classification. A terminal match cannot rescue it. With zero prohibited matches, ordinary D4/D6 exact-one classification proceeds unchanged.

The field and selector are data only. They cannot read, write, invoke, import, deliver, retry, mutate, or expose a capability. No D5 prohibition follows from a label unless a separately governed complete D5 predicate explicitly selects it.

## 10. CPD Boundary

`CPD-002` remains open because complete D5 predicate records have not been authored. `CPD-015` remains open through CPD-002. This review establishes only that D3-V2 is now expressive enough for the third D5 completion attempt.

No CPD defect is declared closed here.

## 11. Outcome Decision

### Outcome 1 - Minimum D3-V2 subject-data-label completion settled

**Selected.** One required subject-data-label field, one required selector, and the necessary `NONE` sentinel fully resolve the governed positive/negative distinction without changing D5 meaning or adding capability.

### Outcome 2 - Subject-data-label completion remains unresolved

Not selected. Field name, scope, cardinality, derivation, non-applicable, unknown, multiple-label, and selector semantics are exact.

### Outcome 3 - A deeper D3 structural relation is required

Not selected. Direct subject/value labels distinguish the facts; no additional relation is necessary.

## 12. Authority Boundary and Exact Next Gate

Even Outcome 1 grants no Authority to author D5 predicates; edit prior D3/D5 records; create or correct a candidate payload; inspect governed source; implement, readiness-test, or run an instrument; run Check 5 or Check 6; freeze policy; or accept implementation.

The exact next gate is:

```text
HH-0000 CHECK 5 D5 PROHIBITED-PREDICATE COMPLETION REVIEW - THIRD ATTEMPT
```

That later review may use this prospective D3-V2 completion but receives no candidate-authoring Authority.

## 13. Final State

```text
OUTCOME 1 - HH-0000 CHECK 5 D3-V2 SUBJECT-DATA-LABEL COMPLETION SETTLED - REQUIRED SUBJECTDATALABELS NONEMPTY SORTED UNIQUE DATALABELV2 ARRAY AND REQUIRED MATCHING SELECTOR FIXED - NONE ADDED AS THE SOLE NECESSARY NONAPPLICABLE DATALABELV2 VALUE - NO NEW PATH OR CAPABILITY VALUE - SUBJECT AND ARGUMENT LABELS STRICTLY SEPARATE - POSITIVE PUBLIC PATH VALUE AND IDENTICAL NON-PATH VALUE NOW STRUCTURALLY DISTINGUISHABLE - EXISTING D5 MEANING EXACT-ONE TERMINAL CLASSIFICATION PROBES RELATIONS AND ORDINARY MECHANICAL VALUES PRESERVED - NO OPERATIONAL CAPABILITY - CPD-002 OPEN - CPD-015 OPEN THROUGH CPD-002 - NO D5 PREDICATE OR CANDIDATE AUTHORITY - HISTORICAL CANDIDATE 6350 BYTES SHA256 FF71059E5FBAD04831BF8CBC6D408B44B265D8657446A1FE8C2B0C8E8D972186 PRESERVED UNCHANGED - NO GOVERNED SOURCE OBSERVATION - NO INSTRUMENT AUTHORITY - CHECK 5 UNMEASURED - CHECK 6 NOT RUN - IMPLEMENTATION UNACCEPTED - EXACT NEXT GATE HH-0000 CHECK 5 D5 PROHIBITED-PREDICATE COMPLETION REVIEW THIRD ATTEMPT - STOP
```

D3-V2 subject-data-label completion review stops here.