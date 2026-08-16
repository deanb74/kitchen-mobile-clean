# HH-0000 Check 5 Namespace Import Declaration Structural Completion Review

**Status:** OUTCOME 1 - MINIMUM NAMESPACE IMPORT DECLARATION CORRECTION FULLY DETERMINED AT SCHEMA-DESIGN LEVEL
**Review date:** 2026-08-15
**Review type:** Documentation-only bounded formation review
**Controlling input 1:** `HH-0000 CHECK 5 NAMESPACE IMPORT BINDING OWNERSHIP AND LINKAGE DERIVATION COMPLETION REVIEW`
**Controlling input 2:** `HH-0000 CHECK 5 SIDE-EFFECT IMPORT DECLARATION STRUCTURAL COMPLETION REVIEW`
**Controlling input 3:** Closed `HH-CHECK-5-CLOSED-MEASUREMENT-POLICY-3` schema vocabulary and identity
**Controlling input 4:** Existing governed `ImportForm` and `IMPORT_DECLARATION` definitions
**Controlling policy canonical identity:** `422369` bytes / `049ec7e81f8fea886648ac9f0691f04ff5be2e2f254dd8f01ad939d249eff99d`
**Governed implementation-source access:** None
**Candidate or policy effect:** None
**D4/D5/D6 effect:** None
**Predicate effect:** None
**Instrument access or effect:** None
**Check 5:** `UNMEASURED`
**Check 6:** `NOT RUN`
**Implementation:** `UNACCEPTED`
**Authority effect:** None

# Repository Traceability

**Principle:** Truth before certainty; evidence before claims; smallest justified change; human Authority.
**Theory:** A closed declaration record must distinguish every governed `ImportDeclaration` form without admitting unrelated non-declaration meanings.
**Architecture:** One declaration-record-local `NAMESPACE` value, preservation of the existing `importKind` subset, unchanged mandatory fields, and separate canonical-policy correction governance.
**Engineering:** Five-candidate comparison, four-form distinction test, false-coercion falsifiers, existing-meaning preservation test, structural-scope test, and exact POLICY-3 non-mutation result.
**Milestone:** Not Applicable.
**Evidence:** This documentation-only schema-design resolution using only the four controlling inputs. It produces no corrected policy payload, implementation, instrument, Check 5, Check 6, freeze, or acceptance Evidence.

## 1. Sole Question and Decision

> What is the minimum structural correction required so that `import * as ns from "module";` can emit its mandatory `IMPORT_DECLARATION` record faithfully without changing any existing meaning?

**Add exactly `NAMESPACE` to the closed value set of `IMPORT_DECLARATION.importKind`. Outcome 1 is selected.**

The corrected record schema at design level is:

```text
IMPORT_DECLARATION {
  module:string,
  importKind:DEFAULT_VALUE|NAMED_VALUE|NAMED_TYPE|NAMED_MIXED|SIDE_EFFECT|NAMESPACE,
  bindingRecordIds:array<recordId>
}
```

The exact declaration-form derivation is:

```text
import * as ns from "module";
=> importKind=NAMESPACE
```

This adds one declaration-record-local distinction already present in the governed `ImportForm` vocabulary. It changes no existing value meaning, field requirement, record kind, or downstream binding treatment.

This review does not edit POLICY-3, choose a successor schema, construct a corrected candidate, resume namespace binding ownership, or proceed to any later row.

## 2. Strict Boundary

This review used only:

1. the namespace import binding ownership and linkage review;
2. the side-effect import declaration structural completion review;
3. the already-governed closed POLICY-3 schema vocabulary and identity; and
4. the already-governed `ImportForm` and `IMPORT_DECLARATION` definitions.

It did not:

1. inspect, open, read, hash, parse, or otherwise access governed implementation source;
2. inspect, construct, modify, readiness-test, validate, or execute an instrument;
3. edit, reconstruct, rewrite, reread, revalidate, regenerate, or reserialize POLICY-3;
4. choose `POLICY-4` or any successor schema identifier, byte length, SHA-256, status, or closure result;
5. construct, modify, or validate a corrected policy candidate;
6. reopen or alter D4, D5, D6, any predicate, or any predicate value;
7. settle namespace `IMPORTED_BINDING` ownership, imported name, local name, `typeOnly`, exact linkage, or child ledger treatment;
8. settle namespace dependency-edge treatment;
9. resume namespace binding ownership; or
10. proceed to exports, re-exports, dependency edges, or any later derivation row.

Exactly this review record is created.

## 3. Fixed Inputs

The following facts are fixed:

1. `ImportForm` already contains `NAMESPACE`.
2. `import * as ns from "module";` is an `ImportDeclaration` with a `NamespaceImport` binding.
3. Every governed import declaration must emit exactly one `IMPORT_DECLARATION` record.
4. `IMPORT_DECLARATION.importKind` is mandatory.
5. POLICY-3 currently permits only `DEFAULT_VALUE`, `NAMED_VALUE`, `NAMED_TYPE`, `NAMED_MIXED`, and `SIDE_EFFECT` in that field.
6. None of those values means namespace import.
7. The declaration's `module` field can already represent `"module"`.
8. The declaration's `bindingRecordIds` field remains structurally suitable but its exact namespace value is downstream and not reached.
9. The prior namespace review identified the absent declaration-kind value as the first exact blocker.
10. The side-effect structural completion review established the minimum-correction pattern for an already-recognized `ImportDeclaration` form omitted from this record-local subset.

The sole correction considered here is declaration-record-local.

## 4. Candidate Evaluation

| Candidate | Decision | Exact reason |
| --- | --- | --- |
| A: add exactly `NAMESPACE` to `IMPORT_DECLARATION.importKind` | **Selected** | Adds the one missing declaration-record distinction already governed by `ImportForm`; preserves every existing value and mandatory field; admits no unrelated form |
| B: replace or broaden `importKind` to use the wider `ImportForm` vocabulary | Rejected | Admits `NOT_IMPORT`, dynamic-load, import-expression, re-export, and unresolved meanings that are not all `IMPORT_DECLARATION` forms; replaces the established record-local naming subset unnecessarily |
| C: make `importKind` optional or add `NONE` / `UNKNOWN` | Rejected | Uses absence or uncertainty for a known AST form, weakens closed validation, and fails to record namespace identity |
| D: represent namespace form through another existing field or record | Rejected | No other field can populate the mandatory `importKind`; a binding, finding, literal, or dependency record cannot replace `IMPORT_DECLARATION` |
| E: use a smaller already-governed existing-vocabulary treatment | Not selected | No existing allowed `importKind` means namespace import, and no omission or coercion is faithful |

Candidate A is both necessary and sufficient. No smaller faithful treatment exists, and every broader treatment changes more structure or meaning than required.

## 5. Why Candidate A Is the Minimum Correction

`ImportForm` and `IMPORT_DECLARATION.importKind` are distinct governed surfaces:

1. `ImportForm` classifies a wider set that includes static declarations, namespace import, dynamic load, re-export, non-import, and unresolved cases;
2. `IMPORT_DECLARATION.importKind` is a mandatory field on one declaration record kind and intentionally contains only meanings emitted by that record;
3. the declaration-local subset already repeats the applicable default, named, mixed, and side-effect meanings; and
4. the namespace defect exists only because that subset omits one real `ImportDeclaration` form already distinguished by `ImportForm`.

Adding `NAMESPACE` repairs agreement for exactly that form. Replacing the field with all of `ImportForm` would admit meanings that cannot truthfully describe an `IMPORT_DECLARATION` record.

No new field, optionality rule, record kind, binding field, ledger reason, or fallback is required to solve the declaration blocker.

## 6. Exact Structural Consequence

### 6.1 Corrected declaration schema at design level

```text
IMPORT_DECLARATION.importKind =
  DEFAULT_VALUE
  | NAMED_VALUE
  | NAMED_TYPE
  | NAMED_MIXED
  | SIDE_EFFECT
  | NAMESPACE
```

The complete record remains:

```text
IMPORT_DECLARATION {
  module:string,
  importKind:DEFAULT_VALUE|NAMED_VALUE|NAMED_TYPE|NAMED_MIXED|SIDE_EFFECT|NAMESPACE,
  bindingRecordIds:array<recordId>
}
```

Every field remains mandatory. The object remains closed. Existing record identity, ownership, count, ordering, serialization, and capture rules remain unchanged.

### 6.2 Namespace declaration derivation

```ts
import * as ns from "module";
```

```text
ImportDeclaration:
  NodeKind=IMPORT
  RecordKind=IMPORT_DECLARATION
  module="module"
  importKind=NAMESPACE
  bindingRecordIds=<DOWNSTREAM_NOT_SETTLED>
  nonGovernedReason=NONE
```

Only the parent declaration record's available `importKind` value is settled. The placeholder above is an explicit boundary marker, not a schema value or proposed capture encoding.

## 7. Four-Form Decisive Falsifier

Compare:

```ts
import value from "module";
import { value } from "module";
import "module";
import * as ns from "module";
```

Candidate A preserves four distinct declaration records:

| Source form | Corrected `importKind` | Existing meaning changed? |
| --- | --- | --- |
| `import value from "module";` | `DEFAULT_VALUE` | No |
| `import { value } from "module";` | `NAMED_VALUE` | No |
| `import "module";` | `SIDE_EFFECT` | No |
| `import * as ns from "module";` | `NAMESPACE` | New missing distinction only |

All four forms may share the same module string, and some may have similar binding cardinality after downstream linkage is settled. The declaration kind preserves their distinct AST meanings directly.

## 8. False-Coercion Falsifiers

### 8.1 Coercion to `NAMED_VALUE`

False. Namespace syntax binds the module namespace object and does not contain a `NamedImports` specifier list. Treating it as `NAMED_VALUE` collapses two distinct AST forms.

### 8.2 Coercion to `DEFAULT_VALUE`

False. Namespace syntax does not select the module's default export. A local binding and one linked binding record cannot make these meanings equivalent.

### 8.3 Coercion to `SIDE_EFFECT`

False. Namespace syntax has an `ImportClause` and introduces a local binding. A side-effect import has no import clause and no imported binding.

### 8.4 Cardinality is not declaration identity

Even if a later namespace derivation produces one linked binding record, binding cardinality cannot justify coercion to default or named import. `importKind` records declaration form, not merely the count of local bindings.

## 9. Existing-Meaning Preservation

The corrected allowed set is the old allowed set plus one member:

```text
before=DEFAULT_VALUE|NAMED_VALUE|NAMED_TYPE|NAMED_MIXED|SIDE_EFFECT
after=DEFAULT_VALUE|NAMED_VALUE|NAMED_TYPE|NAMED_MIXED|SIDE_EFFECT|NAMESPACE
```

The following remain unchanged:

```text
DEFAULT_VALUE=UNCHANGED
NAMED_VALUE=UNCHANGED
NAMED_TYPE=UNCHANGED
NAMED_MIXED=UNCHANGED
SIDE_EFFECT=UNCHANGED
IMPORT_DECLARATION.module=UNCHANGED
IMPORT_DECLARATION.bindingRecordIds=UNCHANGED
IMPORT_DECLARATION field requiredness=UNCHANGED
```

No existing valid declaration record changes meaning or becomes invalid solely because the closed set gains `NAMESPACE`.

## 10. Explicit Non-Consequences

```text
ImportForm=UNCHANGED
RecordKind=UNCHANGED
NodeKind=UNCHANGED
NodeLedger reasons=UNCHANGED
IMPORTED_BINDING schema=UNCHANGED
NormalizedProvenance=UNCHANGED
ProvenanceKind=UNCHANGED
ImportAllowlistStatus=UNCHANGED
ImportBindingStatus=UNCHANGED
dependency vocabulary=UNCHANGED
D4/D5/D6 predicates=UNCHANGED
predicate values=UNCHANGED
```

No `NONE` or `UNKNOWN` value is added to `IMPORT_DECLARATION.importKind`.

## 11. Downstream Namespace Questions Not Settled

This review does not settle:

1. namespace `IMPORTED_BINDING` owner;
2. namespace `importedName`;
3. namespace `localName`;
4. namespace `typeOnly`;
5. namespace `bindingRecordIds` exact value;
6. `NamespaceImport` child ledger reason;
7. `ImportClause` or local Identifier namespace-specific ledger treatment;
8. module-specifier namespace-specific ledger treatment;
9. dependency-edge treatment; or
10. any export, re-export, imported-use, or later derivation row.

Those questions remain downstream. The design-level `NAMESPACE` declaration value neither answers nor authorizes them.

## 12. Current POLICY-3 Consequence

Current POLICY-3 is closed only for its exact governed identity:

```text
schema=HH-CHECK-5-CLOSED-MEASUREMENT-POLICY-3
canonicalByteLength=422369
canonicalSha256=049ec7e81f8fea886648ac9f0691f04ff5be2e2f254dd8f01ad939d249eff99d
```

That exact payload lacks `NAMESPACE` in `IMPORT_DECLARATION.importKind`. Adding the design-level correction would change the closed schema and canonical bytes. This review does not silently amend, rehash, supersede, or reconstruct POLICY-3.

Accordingly:

```text
DERIVATION_BLOCKER=RESOLVED_AT_SCHEMA_DESIGN_LEVEL
CURRENT_POLICY_3_CHANGED=false
CLOSED_CANONICAL_POLICY_CORRECTION_REQUIRED=true
```

The current POLICY-3 identity remains governed historical Evidence for its exact bytes. Before the corrected declaration shape can become executable policy, a separately governed canonical-policy correction must authorize schema/version treatment, candidate construction, complete validation, canonical identity, and closure.

This review does not choose `POLICY-4` or another successor identifier. It does not construct a corrected candidate and does not grant correction Authority.

## 13. Structural Sufficiency Result

At schema-design level, exactly one addition resolves the demonstrated blocker:

```text
SELECTED_CANDIDATE=A
MINIMUM_STRUCTURAL_CORRECTION=ADD_NAMESPACE_TO_IMPORT_DECLARATION_IMPORT_KIND
DERIVATION_BLOCKER=RESOLVED_AT_SCHEMA_DESIGN_LEVEL
CURRENT_POLICY_3_CHANGED=false
CLOSED_CANONICAL_POLICY_CORRECTION_REQUIRED=true
```

No larger structural change is required by the declaration-level evidence. No downstream namespace binding question is promoted to settled status.

## 14. Outcome Decision

### Outcome 1 - minimum correction fully determined at schema-design level

**Selected.** Candidate A adds exactly `NAMESPACE` to the declaration-record-local `importKind` set. It faithfully represents namespace declaration form, preserves every existing meaning, and requires a separately governed canonical-policy correction because current closed POLICY-3 does not contain it.

### Outcome 2 - one exact structural value or treatment unresolved

Not selected. The missing value, exact field, corrected allowed set, derivation rule, preservation boundary, and policy-incorporation consequence are all determined. A future schema identifier and canonical identity are deliberately outside this review and do not make the design decision ambiguous.

### Outcome 3 - larger structural change required

Not selected. No field replacement, optionality, new record kind, binding schema change, ledger reason, dependency value, or predicate change is required to resolve the declaration blocker.

## 15. Authority Boundary and Stop

```text
candidate-construction Authority=NONE
canonical-policy-edit Authority=NONE
predicate Authority=NONE
instrument Authority=NONE
implementation-inspection Authority=NONE
Check 5 Authority=NONE
Check 6 Authority=NONE
freeze Authority=NONE
acceptance Authority=NONE
```

No Authority is granted or implied to edit POLICY-3; choose a successor policy identifier or identity; construct or validate a corrected candidate; resume namespace binding ownership; author export or later rules; inspect governed implementation source; inspect, construct, modify, validate, or execute an instrument; alter D4, D5, D6, or predicates; run Check 5 or Check 6; freeze policy; or accept implementation.

This one-record review stops here.