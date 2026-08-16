# HH-0000 Check 5 Side-Effect Import Declaration Structural Completion Review

**Status:** OUTCOME 1 - MINIMUM SIDE-EFFECT IMPORT RECORD CORRECTION FULLY DETERMINED AT SCHEMA-DESIGN LEVEL
**Review date:** 2026-08-15
**Review type:** Documentation-only bounded formation review
**Controlling record:** `HH-0000 CHECK 5 IMPORT, EXPORT, AND DEPENDENCY OWNERSHIP DERIVATION COMPLETION REVIEW`
**Governed implementation-source access:** None
**Candidate V2 effect:** None - existing bytes, schema identity, and status unchanged
**Closed canonical policy effect:** Structurally incomplete for the corrected derivation; no correction incorporated
**D4/D5/D6 effect:** None
**Predicate effect:** None
**Instrument access or effect:** None
**Check 5:** `UNMEASURED`
**Check 6:** `NOT RUN`
**Implementation:** `UNACCEPTED`
**Authority effect:** None

# Repository Traceability

**Principle:** Truth before certainty; smallest justified change; evidence before claims; human Authority.
**Theory:** A required closed record field must preserve every already-governed form directly, without coercion, optionality, or unrelated widening.
**Architecture:** Add one record-local import-kind distinction while preserving the wider `ImportForm`, record identity, NodeKind, NodeLedger, predicate, and canonical-incorporation boundaries.
**Engineering:** Five-candidate comparison, zero-binding falsifier, existing-form regression matrix, closed-schema consequence, and separate-correction gate.
**Milestone:** Not Applicable.
**Evidence:** This documentation-only schema-design decision. It produces no corrected canonical payload, implementation, instrument, Check 5, Check 6, freeze, or acceptance Evidence.

## 1. Sole Question and Decision

> What is the minimum structural correction required so that `import "module";` can emit its mandatory `IMPORT_DECLARATION` record faithfully without changing any existing meaning?

**Outcome 1 is selected. Candidate A is the minimum correction.**

Extend only the closed value set of the existing required field:

```text
IMPORT_DECLARATION.importKind =
  DEFAULT_VALUE
  | NAMED_VALUE
  | NAMED_TYPE
  | NAMED_MIXED
  | SIDE_EFFECT
```

The new record-local value has exactly one meaning:

```text
SIDE_EFFECT = ImportDeclaration with no ImportClause and no imported bindings,
              whose module specifier is owned by that declaration
```

The exact side-effect record shape becomes:

```text
IMPORT_DECLARATION {
  module:<resolved module string>,
  importKind:SIDE_EFFECT,
  bindingRecordIds:[]
}
```

No other field, value, enum, schema, record kind, NodeKind, NodeLedger reason, predicate, or derivation meaning is changed by this design decision.

## 2. Strict Boundary

This review used only the controlling record, the inherited record schema, and the existing terminal canonical-policy closure identity/boundary. It did not:

1. inspect, open, read, hash, parse, or otherwise access either governed implementation source;
2. inspect, construct, modify, validate, or execute an instrument;
3. edit, reconstruct, reserialize, revalidate, replace, or relabel Candidate V2;
4. edit or reopen the closed canonical payload;
5. alter D4, D5, D6, any predicate, or any predicate value;
6. modify the controlling review or any other existing formation record;
7. choose a future canonical payload identity, schema identifier, byte length, hash, or correction Authority;
8. resume the import/export/dependency ownership review.

Exactly this review record is created.

## 3. Fixed Inputs

The following are fixed:

1. `ImportForm` already contains `SIDE_EFFECT`.
2. A side-effect import is recognised from `ImportDeclaration` with no import clause.
3. Ownership belongs to the `ImportDeclaration` node.
4. Its module-specifier child is declaration-owned structure and does not emit independent `LITERAL_DATA`.
5. It has no imported bindings.
6. It must emit exactly one `IMPORT_DECLARATION` record.
7. `IMPORT_DECLARATION.importKind` is required and currently permits only `DEFAULT_VALUE`, `NAMED_VALUE`, `NAMED_TYPE`, and `NAMED_MIXED`.
8. Omission, coercion, `NONE`, and `UNKNOWN` do not faithfully encode the already-known side-effect form.

The sole missing distinction is record-local.

## 4. Candidate Evaluation

| Candidate | Decision | Exact reason |
| --- | --- | --- |
| A: add exactly `SIDE_EFFECT` to `IMPORT_DECLARATION.importKind` | **Selected** | Adds the one missing record-level distinction; preserves every existing value and required-field rule; widens no unrelated form |
| B: replace/broaden `importKind` to use all `ImportForm` values | Rejected | Imports `NOT_IMPORT`, dynamic-load, re-export, namespace, and unresolved meanings that are not all `ImportDeclaration.importKind` cases; changes existing record vocabulary from `DEFAULT_VALUE`/`NAMED_VALUE` names to wider fact semantics |
| C: make `importKind` optional or add `NONE`/`UNKNOWN` | Rejected | Erases a known distinction, weakens closed validation, and uses absence/uncertainty for a known AST form |
| D: use another existing record or structure | Rejected | `IMPORT_DECLARATION` remains mandatory; a fact, finding, literal, binding, or dependency record cannot replace its required field |
| E: another existing-vocabulary solution | Not selected | No existing `importKind` value means side-effect-only import, and no independent existing field supplies that required record meaning |

Candidate A is smaller than changing the field type, importing the full `ImportForm` enum, making the field optional, adding a fallback, or creating another record kind.

## 5. Why Candidate A Does Not Duplicate `ImportForm` Unnecessarily

`ImportForm` and `IMPORT_DECLARATION.importKind` are already distinct governed surfaces:

1. `ImportForm` is a normalized fact vocabulary covering static imports, dynamic load forms, re-export, non-import, and unresolved cases;
2. `IMPORT_DECLARATION.importKind` is a required field on one enumeration record kind and already repeats only the declaration forms representable by that record;
3. the present defect exists because that record-local subset omits one declaration form already known to `ImportForm`.

Adding `SIDE_EFFECT` restores agreement for exactly that form. Replacing the field with the entire `ImportForm` would duplicate and admit unrelated meanings. Candidate A therefore introduces no unnecessary second semantic system; it completes the existing record-local subset by one value.

## 6. Exact Structural Consequences

### 6.1 Corrected record schema at design level

```text
IMPORT_DECLARATION {
  module:string,
  importKind:DEFAULT_VALUE|NAMED_VALUE|NAMED_TYPE|NAMED_MIXED|SIDE_EFFECT,
  bindingRecordIds:array<recordId>
}
```

Every object field remains required. The object remains closed. Existing record ID, ownership, count, ordering, and capture rules remain unchanged.

### 6.2 Side-effect import

```ts
import "module";
```

```text
ImportDeclaration owner:
  NodeKind=IMPORT
  RecordKind=IMPORT_DECLARATION
  importKind=SIDE_EFFECT
  bindingRecordIds=[]
  nonGovernedReason=NONE

StringLiteral module-specifier child:
  RecordKind=<none>
  recordIds=[]
  nonGovernedReason=DECLARATION_INTERNAL_RECORDED_BY_OWNER
```

Traversal continues through the module-specifier child. This review changes only the parent record's available `importKind` value.

### 6.3 Explicit non-consequences

```text
ImportForm=UNCHANGED
RecordKind=UNCHANGED
NodeKind=UNCHANGED
NodeLedger reasons=UNCHANGED
NormalizedProvenance=UNCHANGED
ProvenanceKind=UNCHANGED
RootV2=UNCHANGED
ImportAllowlistStatus=UNCHANGED
ImportBindingStatus=UNCHANGED
dependency vocabulary=UNCHANGED
D4/D5/D6 predicates=UNCHANGED
predicate values=UNCHANGED
```

No `UNKNOWN` or `NONE` value is added to `IMPORT_DECLARATION.importKind`.

## 7. Decisive Zero-Binding Falsifier

```ts
import "module";
import {} from "module";
```

With Candidate A, their required records remain distinct:

```text
side-effect import:
  module="module"
  importKind=SIDE_EFFECT
  bindingRecordIds=[]

empty named import:
  module="module"
  importKind=NAMED_VALUE
  bindingRecordIds=[]
```

The module and binding cardinality are otherwise identical. `importKind` now preserves the already-governed `SIDE_EFFECT` versus `STATIC_NAMED_VALUE` AST distinction directly in the emitted declaration record.

Coercing the first record to `NAMED_VALUE`, making the field absent, or assigning `NONE`/`UNKNOWN` would fail this falsifier.

## 8. Existing-Form Preservation Tests

| Source form | Existing `importKind` | Corrected `importKind` | Result |
| --- | --- | --- | --- |
| `import value from "module";` | `DEFAULT_VALUE` | `DEFAULT_VALUE` | Unchanged |
| `import { value } from "module";` | `NAMED_VALUE` | `NAMED_VALUE` | Unchanged |
| `import type { Value } from "module";` | `NAMED_TYPE` | `NAMED_TYPE` | Unchanged |
| Existing mixed value/type form | `NAMED_MIXED` | `NAMED_MIXED` | Unchanged |
| `import "module";` | Not representable | `SIDE_EFFECT` | Exactly the missing form added |

No existing valid record changes bytes, value meaning, binding cardinality, ownership, or validation outcome solely because the allowed value set gains `SIDE_EFFECT`.

## 9. Determinism and Closed Validation

The corrected derivation is mechanical:

```text
node is ImportDeclaration
AND node.importClause is absent
=> importKind=SIDE_EFFECT
AND bindingRecordIds=[]
```

No spelling, allowlist outcome, source role, module root, imported binding, predicate result, fallback, or runtime behavior participates in this record-kind decision.

Invalid combinations fail closed:

1. `SIDE_EFFECT` with a nonempty `bindingRecordIds` array is invalid;
2. `SIDE_EFFECT` with a present import clause is invalid;
3. another import kind with an absent import clause is invalid for this derivation;
4. omission or an unknown value is invalid;
5. a side-effect module specifier independently emitted as `LITERAL_DATA` violates parent ownership.

The correction preserves deterministic capture and schema validation.

## 10. Canonical Policy Consequence

The terminal closure review binds canonical policy closure exclusively to:

```text
schema=HH-CHECK-5-CLOSED-MEASUREMENT-POLICY-2
canonicalByteLength=422230
canonicalSha256=68a54af89e7433d2da4a1d5fd8833b2f849b0276b62c7b8eba529348f8680c94
```

It states that any payload with different canonical bytes or SHA-256 is not closed by that review.

The `IMPORT_DECLARATION` record schema is contained in the closed V2 policy. Adding `SIDE_EFFECT` changes that schema and therefore changes canonical payload bytes and identity. This documentation-only review does not and cannot incorporate the correction into the closed payload.

Accordingly:

```text
CURRENT_CLOSED_V2_IDENTITY=UNCHANGED
CURRENT_CLOSED_V2_STRUCTURALLY_COMPLETE_FOR_SIDE_EFFECT_IMPORT=false
STRUCTURAL_CORRECTION_INCORPORATED_IN_CLOSED_V2=false
CLOSED_CANONICAL_POLICY_CORRECTION_REQUIRED=true
```

The existing closure decision remains attached to its exact recorded bytes as historical governed Evidence. It is not silently edited, retroactively rehashed, or treated as containing this correction. Before the corrected derivation can become executable policy, a separately governed policy-correction review must authorise exact schema/version treatment, corrected canonical payload construction, validation, identity, and closure.

This review does not choose the future schema identifier, payload identity, byte length, SHA-256, supersession treatment, or correction Authority. Those are incorporation decisions for that separate gate, not unresolved parts of the minimum schema-design answer.

## 11. Derivation Blocker Result

At schema-design level, the exact blocker is resolved:

```text
DERIVATION_BLOCKER=RESOLVED_AT_SCHEMA_DESIGN_LEVEL
CLOSED_CANONICAL_POLICY_CORRECTION_REQUIRED=true
IMPORT_EXPORT_DEPENDENCY_REVIEW_RESUMABLE_AT_DESIGN_LEVEL=true
IMPORT_EXPORT_DEPENDENCY_DERIVATION_EXECUTABLE_UNDER_CURRENT_CLOSED_V2=false
```

The controlling import/export/dependency review may resume only as a documentation-level derivation review under separate Authority. No instrument or Check 5 execution may use the corrected shape until canonical policy correction and closure are separately governed.

This review does not resume the controlling review.

## 12. Outcome Decision

### Outcome 1 - minimum correction fully determined

**Selected.** Exactly one record-local value, `SIDE_EFFECT`, is necessary and sufficient. It preserves all existing valid meanings and closes the zero-binding record distinction without widening unrelated import forms.

### Outcome 2 - direction clear but schema/version/incorporation unresolved

Not selected. The minimum record-schema correction and incorporation consequence are exact. A future schema identifier and canonical identity are deliberately outside this review and require a separately governed correction gate; they do not make the schema-design decision ambiguous.

### Outcome 3 - larger structural change required

Not selected. No field replacement, optionality, new record kind, NodeKind, ledger reason, dependency value, or predicate change is required.

## 13. Authority and Stop

```text
predicate Authority=NONE
candidate Authority=NONE
instrument Authority=NONE
implementation-inspection Authority=NONE
Check 5 Authority=NONE
Check 6 Authority=NONE
freeze Authority=NONE
acceptance Authority=NONE
```

No Authority is granted or implied to inspect governed implementation source; inspect, construct, modify, validate, or execute an instrument; edit Candidate V2 or the closed canonical payload; alter D4, D5, D6, or predicates; modify the controlling review; author a corrected schema or payload; choose a future schema version or canonical identity; run Check 5 or Check 6; freeze policy; accept implementation; or resume the import/export/dependency review.

This one-record review stops here.