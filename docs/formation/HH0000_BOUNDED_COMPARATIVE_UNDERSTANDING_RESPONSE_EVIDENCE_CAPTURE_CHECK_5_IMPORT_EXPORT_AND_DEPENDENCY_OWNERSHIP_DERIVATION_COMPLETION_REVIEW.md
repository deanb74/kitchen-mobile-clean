# HH-0000 Check 5 Import, Export, and Dependency Ownership Derivation Completion Review

**Status:** OUTCOME 3 - FIRST IMPORT RECORD FORM IS NOT REPRESENTABLE BY THE EXISTING RECORD SCHEMA
**Review date:** 2026-08-15
**Review type:** Documentation-only bounded formation review
**Controlling record 1:** `HH-0000 CHECK 5 NODEKIND AND GOVERNED-NODE RECOGNITION DERIVATION COMPLETION REVIEW`
**Controlling record 2:** `HH-0000 CHECK 5 PROPERTY-ACCESS CALLEE OWNERSHIP DERIVATION COMPLETION REVIEW`
**Controlling record 3:** `HH-0000 CHECK 5 NEW-EXPRESSION CONSTRUCTOR-CHILD OWNERSHIP DERIVATION COMPLETION REVIEW`
**Controlling record 4:** `HH-0000 CHECK 5 PROPERTY-READ-AND-WRITE OWNERSHIP DERIVATION COMPLETION REVIEW`
**Governed implementation-source access:** None
**Candidate V2 effect:** None
**Terminal canonical policy closure effect:** None
**D4/D5/D6 effect:** None
**Predicate effect:** None
**Instrument access or effect:** None
**Check 5:** `UNMEASURED`
**Check 6:** `NOT RUN`
**Implementation:** `UNACCEPTED`
**Authority effect:** None

# Repository Traceability

**Principle:** Truth before certainty; evidence before claims; one semantic effect has one most-specific governed owner; smallest justified change; human Authority.
**Theory:** AST recognition is complete only when every governed form can be emitted in its required record schema without coercing it to a different form.
**Architecture:** Import-form normalization, complete governed-record enumeration, NodeLedger ownership, and fail-closed unsupported structure must agree on one representable distinction.
**Engineering:** Closed-enum membership test, first-form record-construction test, otherwise-identical zero-binding falsifier, omission test, and minimum-distinction identification.
**Milestone:** Not Applicable.
**Evidence:** This documentation-only structural sufficiency decision. It produces no governed implementation, instrument, Check 5, Check 6, freeze, or acceptance Evidence.

## 1. Sole Question and Decision

> Can import declarations, imported bindings, export declarations/names, and dependency records be deterministically derived from TypeScript AST form and lexical binding identity using only the existing closed structure?

**No. Outcome 3 is selected at the first required form.**

The first required case is:

```ts
import "module";
```

The existing normalized import vocabulary recognises this as:

```text
NodeKind=IMPORT
ImportForm=SIDE_EFFECT
ImportBindingStatus=NO_BINDING
```

The existing enumeration rules also require every governed import declaration to emit exactly one `IMPORT_DECLARATION` record. That record requires:

```text
importKind = DEFAULT_VALUE | NAMED_VALUE | NAMED_TYPE | NAMED_MIXED
```

It has no `SIDE_EFFECT` value and no `UNKNOWN` value. Therefore no schema-valid `IMPORT_DECLARATION` record can faithfully represent the first required AST form.

The review stops at this first structural insufficiency. It does not settle namespace, named, aliased, type-only, mixed, export, re-export, default-export, imported-use, dependency-edge, ordinal, or later precedence ownership.

## 2. Strict Boundary

This review used only the four controlling records and inherited closed schemas. It did not:

1. inspect, open, read, hash, parse, or otherwise access either governed implementation source;
2. inspect, construct, modify, validate, or execute an instrument;
3. reopen, edit, reinterpret, or replace Candidate V2 or terminal canonical policy closure;
4. reopen or alter D4, D5, D6, any predicate, or any predicate value;
5. alter a controlling record or any other existing formation record;
6. run Check 5, Check 6, implementation inspection, freeze, or acceptance work;
7. add a syntax value, enum member, schema field, record kind, NodeKind, dependency kind, or NodeLedger reason;
8. continue after the first genuine missing structural distinction.

Exactly this review record is created.

## 3. Fixed Prior Ownership Rules

The previously settled executable rules remain fixed and are not reconsidered:

1. one executable semantic effect has one most-specific governed owner;
2. direct call-callee property access is parent-owned and uses `STRUCTURAL_CONTAINER`;
3. direct new-expression constructor-designator property access is parent-owned and uses `STRUCTURAL_CONTAINER`;
4. ordinary property reads/writes and read-modify-write cases retain their settled records and precedence;
5. genuinely independent executable effects retain their own records.

The present failure occurs before those use-site rules could be combined with import binding identity.

## 4. Closed Vocabulary Inventory at the Failure Point

### 4.1 Import-form facts

The existing `ImportForm` vocabulary includes:

```text
NOT_IMPORT
STATIC_DEFAULT_VALUE
STATIC_NAMED_VALUE
STATIC_NAMED_TYPE
STATIC_NAMED_MIXED
SIDE_EFFECT
NAMESPACE
RE_EXPORT
DYNAMIC_REQUIRE
IMPORT_EXPRESSION
UNKNOWN
```

Import-form values derive from AST form, exact role-specific import-tuple equality, and lexical binding identity. `SIDE_EFFECT` is therefore an already-governed fact, not a proposed value.

### 4.2 Required import-declaration record

The existing record schema is:

```text
IMPORT_DECLARATION {
  module:string,
  importKind:DEFAULT_VALUE|NAMED_VALUE|NAMED_TYPE|NAMED_MIXED,
  bindingRecordIds:array<recordId>
}
```

The record is closed. Its `importKind` field is required. No existing rule permits omission, `null`, free text, fallback, or substitution. `UNKNOWN` exists in `ImportForm` but not in `IMPORT_DECLARATION.importKind`.

### 4.3 Completeness requirement

The existing enumeration accounting requires:

1. every visited AST node to have one NodeLedger entry;
2. every governed import to have exactly one record;
3. every record to validate against its closed schema;
4. unsupported syntax to fail rather than receive a favourable substitute;
5. records and counts to be recomputable from the emitted record set.

Recognising `ImportForm=SIDE_EFFECT` without a valid `IMPORT_DECLARATION` record does not satisfy complete enumeration.

## 5. First Required Recognition Attempt

The ownership direction itself is deterministic:

```ts
import "module";
```

The most-specific owner would be the `ImportDeclaration` AST node. The module-specifier string is declaration-owned module identity rather than an ordinary standalone literal, so the structurally coherent attempted ownership would be:

```text
ImportDeclaration:
  NodeKind=IMPORT
  RecordKind=IMPORT_DECLARATION
  bindingRecordIds=[]
  nonGovernedReason=NONE

StringLiteral("module") child:
  recordIds=[]
  nonGovernedReason=DECLARATION_INTERNAL_RECORDED_BY_OWNER
```

Traversal could continue and the child reason uses existing vocabulary. The failure is not AST recognition, parent ownership, literal ownership, traversal, or NodeLedger accounting. The failure is construction of the required parent record:

```text
IMPORT_DECLARATION.importKind=<NO FAITHFUL EXISTING VALUE>
```

No precedence row may be declared complete while its required governed record is impossible to instantiate faithfully.

## 6. Critical Module-Literal Test

### 6.1 Side-effect import

```ts
import "module";
```

The module string is owned by `ImportDeclaration`. It must not independently emit `LITERAL_DATA`, because its complete meaning is the declaration's module identity. The child would use `DECLARATION_INTERNAL_RECORDED_BY_OWNER` if the parent record were representable.

### 6.2 Standalone string literal

```ts
const x = "module";
```

This string is not a module-specifier child. Subject to the later general-literal recognition row, it is independently eligible for `LITERAL` / `LITERAL_DATA`; it cannot borrow import-declaration ownership.

### 6.3 Ownership conclusion

The most-specific-owner principle successfully distinguishes module-specifier ownership from standalone literal ownership. It does not repair the absent side-effect value in the parent record schema.

## 7. Decisive Structural Falsifier

Compare two imports of the same module with zero imported bindings:

```ts
import "module";
import {} from "module";
```

Their governed forms differ:

```text
first:  ImportForm=SIDE_EFFECT
second: ImportForm=STATIC_NAMED_VALUE
```

The second form has a schema-valid declaration record:

```text
module="module"
importKind=NAMED_VALUE
bindingRecordIds=[]
```

The first has no schema-valid `importKind`. If it is coerced to the nearest existing `NAMED_VALUE`, the two `IMPORT_DECLARATION` records become identical:

```text
module="module"
importKind=NAMED_VALUE
bindingRecordIds=[]
```

That coercion loses the materially governed distinction between execution for module side effects and a syntactic named-import form with an empty binding list. It also contradicts the already-closed `ImportForm=SIDE_EFFECT` observation.

The NodeLedger trees can still expose different child shapes, and the D3 fact can still say `SIDE_EFFECT`; neither cures the required record's false `importKind`. A complete capture cannot contain mutually contradictory form identities and remain recomputable from its records.

Therefore the first case is not merely unresolved ownership. The existing required record structure cannot faithfully encode it.

## 8. Rejected Encodings

| Attempt | Result | Reason |
| --- | --- | --- |
| Omit `IMPORT_DECLARATION` | Invalid | Every governed import declaration requires exactly one record |
| Omit `importKind` | Invalid | The field is required by the closed record schema |
| Use `null`, empty string, or free text | Invalid | None is an allowed schema value |
| Use `UNKNOWN` | Invalid | `UNKNOWN` is absent from `IMPORT_DECLARATION.importKind` |
| Use `DEFAULT_VALUE` | False | A side-effect import has no default binding |
| Use `NAMED_VALUE` | False and collapsing | It misstates the form and collapses the zero-binding falsifier |
| Use `NAMED_TYPE` | False | The import is not type-only and has no type binding |
| Use `NAMED_MIXED` | False | The import has no mixed binding set |
| Emit only `UNKNOWN_FINDING` | Incomplete | A finding does not replace the required import-declaration record |
| Treat module string as `LITERAL_DATA` | False ownership | It duplicates or displaces declaration-owned module identity and still does not supply `importKind` |

No ordering, record ordinal, dependency edge, provenance value, root, binding status, NodeLedger reason, or failure record can populate the missing required field.

## 9. Precedence Construction Result

Only the inherited executable prefix remains settled:

1. previously settled `CALL` ownership;
2. previously settled `NEW` ownership;
3. previously settled property-read/write ownership.

The proposed import block stops at its first row:

| Proposed next row | AST recognition | Ownership | Required record | Result |
| --- | --- | --- | --- | --- |
| Side-effect `ImportDeclaration` | Deterministic | `ImportDeclaration` parent; module string declaration-internal | `IMPORT_DECLARATION` with `importKind=SIDE_EFFECT` meaning | **NOT REPRESENTABLE** |

No precedence is asserted for default import, namespace import, named import, aliases, type-only/mixed imports, export-from, local export, exported declarations, imported binding use, dependency edges, ordinary literal fallback, or later structural fallback. Those rows were not reached.

## 10. Multi-Binding, Re-Export, and Dependency Tests

The critical multi-binding, re-export, imported-use, and dependency-edge ownership tests are **NOT REACHED**.

This is a deliberate Outcome 3 stop, not an omission presented as closure. Deciding record owners, binding ordinals, `EXPORTED_NAME.declarationRecordId`, `DEPENDENCY_EDGE.fromRecordId`, or declaration/use-site edge cardinality would open later choices after the first schema insufficiency and could create a misleading partially closed block.

No result is asserted for:

```text
import { a, b as c } from "module";
export { a } from "module";
export { value };
```

No imported local binding is invented for re-export syntax.

## 11. Overlap and Omission Tests

### 11.1 Overlap

The module-literal ownership rule would prevent duplicate `LITERAL_DATA`: the parent import declaration owns module identity and the child is declaration-internal.

Full import/export/dependency overlap cannot be proven closed because the first import record cannot be emitted faithfully. Later declaration/child/use-site dependency cardinalities are not decided.

```text
MODULE_LITERAL_OVERLAP=CLOSED_BY_PARENT_OWNERSHIP
IMPORT_EXPORT_DEPENDENCY_OVERLAP=NOT_AVAILABLE
```

### 11.2 Omission

Every attempted encoding of the side-effect import either omits the required `IMPORT_DECLARATION` record or supplies a false required field. Therefore complete omission closure fails at the first import form.

```text
SIDE_EFFECT_IMPORT_RECORD=UNREPRESENTABLE
IMPORT_EXPORT_DEPENDENCY_OMISSION=NOT_CLOSED
```

## 12. Minimum Missing Structural Distinction

Exactly one minimum missing distinction is identified:

> `IMPORT_DECLARATION.importKind` requires one closed value whose meaning is a side-effect-only import declaration with no import clause or imported bindings.

This review does not add that value, name a replacement schema, extend another enum, or identify later missing values. `ImportForm.SIDE_EFFECT` demonstrates the required meaning but does not automatically amend the distinct `IMPORT_DECLARATION.importKind` field.

No new NodeKind, RecordKind, dependency edge kind, provenance kind, root, binding status, NodeLedger reason, operation, flow, destination, or predicate value is implicated by this first failure.

## 13. Outcome Decision

### Outcome 1 - deterministic ownership and precedence

Not selected. The first required import form cannot emit its mandatory declaration record faithfully.

### Outcome 2 - exact AST-form/ownership choice unresolved

Not selected. AST recognition and owner selection for the first form are deterministic. The failure is representational, not a choice between two existing ownership treatments.

### Outcome 3 - existing structure insufficient

**Selected.** Side-effect import is an already-distinguished AST/D3 form but has no valid `IMPORT_DECLARATION.importKind`. Coercion to `NAMED_VALUE` makes its required declaration record indistinguishable from the otherwise-identical zero-binding named-import falsifier while contradicting the governed import fact.

The NodeKind derivation review may not resume beyond import/export/dependency ownership from this result.

## 14. Authority and Stop

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

No Authority is granted or implied to inspect governed implementation source; inspect, construct, modify, validate, or execute an instrument; reopen Candidate V2, terminal canonical policy closure, D4, D5, D6, or predicates; alter an existing formation record; run Check 5 or Check 6; freeze policy; inspect or accept implementation; add the missing structural distinction; or resume downstream NodeKind derivation.

This one-record review stops here.