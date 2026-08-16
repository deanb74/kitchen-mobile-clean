# HH-0000 Check 5 Post-POLICY-3 Import, Export, and Dependency Ownership Derivation Completion Review

**Status:** OUTCOME 2 - DEFAULT-IMPORT BINDING RECORD OWNERSHIP AND DECLARATION LINKAGE REMAIN UNRESOLVED
**Review date:** 2026-08-15
**Review type:** Documentation-only bounded formation review
**Controlling policy schema:** `HH-CHECK-5-CLOSED-MEASUREMENT-POLICY-3`
**Controlling policy canonical identity:** `422369` bytes / `049ec7e81f8fea886648ac9f0691f04ff5be2e2f254dd8f01ad939d249eff99d`
**Historical policy preserved:** `HH-CHECK-5-CLOSED-MEASUREMENT-POLICY-2` at `422230` bytes / `68a54af89e7433d2da4a1d5fd8833b2f849b0276b62c7b8eba529348f8680c94`
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

**Principle:** Truth before certainty; evidence before claims; one semantic effect has one most-specific governed owner; smallest justified change; human Authority.
**Theory:** Complete AST enumeration requires each governed fact to have one deterministic AST owner and each cross-record reference to resolve to that owner's deterministic record identity.
**Architecture:** POLICY-3 import records, complete preorder NodeLedger traversal, one-record-per-governed-fact accounting, declaration-internal module identity, and fail-closed unresolved ownership.
**Engineering:** First-unresolved-row analysis, candidate-owner comparison, record-ID and linkage falsifier, overlap test, omission test, and mandatory stop before the next import form.
**Milestone:** Not Applicable.
**Evidence:** The closed POLICY-3 identity, the prior import/export/dependency review's explicit stop, the side-effect structural completion and canonical closure reviews, and the closed record and NodeLedger schemas. This review creates no implementation, instrument, Check 5, Check 6, freeze, or acceptance Evidence.

## 1. Sole Question and Decision

> After POLICY-3 resolved the side-effect import representation, can the next import row be assigned one deterministic governed-record owner and declaration linkage using only settled documentation?

**No. Outcome 2 is selected at the default-import row.**

The next form is:

```ts
import value from "module";
```

Its declaration-level recognition is representable:

```text
ImportDeclaration:
  NodeKind=IMPORT
  RecordKind=IMPORT_DECLARATION
  module="module"
  importKind=DEFAULT_VALUE
```

The schema also permits one binding fact:

```text
IMPORTED_BINDING {
  module:string,
  importedName:string,
  localName:string,
  typeOnly:boolean
}
```

However, no controlling documentation selects whether that `IMPORTED_BINDING` record is owned by the `ImportDeclaration`, the `ImportClause`, or the default-binding `Identifier`. Those treatments produce different `nodeId`, `recordId`, NodeLedger entries, and therefore different required values in `IMPORT_DECLARATION.bindingRecordIds`.

The review stops at that first ownership and linkage choice. It does not continue to namespace import, named import, alias, type-only or mixed import, export, re-export, imported-use, dependency-edge, or later precedence rows.

## 2. Strict Boundary

This review used only existing formation documentation and the closed POLICY-3 schema identity. It did not:

1. inspect, open, read, hash, parse, or otherwise access either governed implementation source;
2. inspect, construct, modify, validate, or execute an instrument;
3. reconstruct, modify, reread, revalidate, or reserialize POLICY-3;
4. reopen, edit, reinterpret, or replace POLICY-2 or POLICY-3;
5. reopen or alter D4, D5, D6, any predicate, or any predicate value;
6. alter a controlling record or any other existing formation record;
7. run Check 5, Check 6, tests, typecheck, ESLint, implementation validation, freeze, or acceptance work;
8. add a schema field, enum value, record kind, NodeKind, dependency kind, NodeLedger reason, or derivation rule; or
9. continue after the first genuine unsettled ownership choice.

Exactly this review record is created.

## 3. Inherited Closure and Resume Point

POLICY-3 is the currently controlling corrected canonical policy at exactly:

```text
schema=HH-CHECK-5-CLOSED-MEASUREMENT-POLICY-3
canonicalByteLength=422369
canonicalSha256=049ec7e81f8fea886648ac9f0691f04ff5be2e2f254dd8f01ad939d249eff99d
CORRECTED_CANONICAL_POLICY_CLOSURE=ACHIEVED
```

Its settled side-effect rule is inherited without reopening:

```text
ImportDeclaration with no ImportClause:
  importKind=SIDE_EFFECT
  bindingRecordIds=[]

module-specifier child:
  recordIds=[]
  nonGovernedReason=DECLARATION_INTERNAL_RECORDED_BY_OWNER
```

The earlier import/export/dependency review expressly did not reach default import or any later row. POLICY-3 repairs only the side-effect declaration schema gap. It does not retroactively decide default-binding ownership, binding-record linkage, dependency-edge source ownership, or any later row.

The first unresolved row after the repaired side-effect case is therefore the default import.

## 4. Closed Structure Available at the Default-Import Row

### 4.1 Declaration record

POLICY-3 provides:

```text
IMPORT_DECLARATION {
  module:string,
  importKind:DEFAULT_VALUE|NAMED_VALUE|NAMED_TYPE|NAMED_MIXED|SIDE_EFFECT,
  bindingRecordIds:array<recordId>
}
```

For the present form, `module="module"` and `importKind=DEFAULT_VALUE` are distinguishable directly from AST form. The module-specifier string remains declaration-internal under the settled side-effect ownership treatment; reopening that child is not required to expose the present blocker.

### 4.2 Binding record

POLICY-3 provides:

```text
IMPORTED_BINDING {
  module:string,
  importedName:string,
  localName:string,
  typeOnly:boolean
}
```

The fields can structurally hold the default-binding fact. The AST supplies the local identifier `value`, the import is a value import, and the module identity is `module`. The closed documents do not, however, fix the exact `importedName` representation for the default export. More importantly for the first ownership row, they do not select the AST node whose `nodeId` must anchor this record.

### 4.3 Record and ledger identity

The inherited identity rule is:

```text
recordId=<ROLE>:<NODE_ID>:<RECORD_KIND>:<ORDINAL>
```

Every governed binding requires exactly one record. Every visited node requires one NodeLedger entry. `IMPORT_DECLARATION.bindingRecordIds` is an ordered array of record IDs. Because the candidate owners have different preorder node IDs, owner selection is observable in the canonical capture and cannot be treated as an editorial detail.

## 5. First Required AST and Record Attempt

The relevant AST path is:

```text
ImportDeclaration
  importClause: ImportClause
    name: Identifier("value")
  moduleSpecifier: StringLiteral("module")
```

At minimum, complete enumeration requires:

1. one `IMPORT_DECLARATION` record for the `ImportDeclaration`;
2. one `IMPORTED_BINDING` record for the default binding;
3. the binding record's ID in the declaration's `bindingRecordIds` array exactly once;
4. one NodeLedger entry for every visited node; and
5. no duplicate binding fact on another candidate owner.

The declaration owner is settled for the declaration record. The binding owner is not.

## 6. Unresolved Candidate Treatments

### 6.1 Treatment A - declaration-owned ancillary binding record

```text
ImportDeclaration ledger entry:
  recordIds=[IMPORT_DECLARATION record ID, IMPORTED_BINDING record ID]

ImportClause ledger entry:
  recordIds=[]
  nonGovernedReason=DECLARATION_INTERNAL_RECORDED_BY_OWNER

Identifier("value") ledger entry:
  recordIds=[]
  nonGovernedReason=DECLARATION_INTERNAL_RECORDED_BY_OWNER
```

This treatment makes the parent own both declaration and binding facts. It requires an `IMPORTED_BINDING` ordinal on the declaration node and treats both binding-bearing children as declaration internals.

### 6.2 Treatment B - ImportClause-owned binding record

```text
ImportDeclaration ledger entry:
  recordIds=[IMPORT_DECLARATION record ID]

ImportClause ledger entry:
  recordIds=[IMPORTED_BINDING record ID]
  nonGovernedReason=NONE

Identifier("value") ledger entry:
  recordIds=[]
  nonGovernedReason=DECLARATION_INTERNAL_RECORDED_BY_OWNER
```

This treatment makes the syntactic binding container own the binding fact while the declaration links across nodes to its record ID.

### 6.3 Treatment C - default-binding Identifier-owned record

```text
ImportDeclaration ledger entry:
  recordIds=[IMPORT_DECLARATION record ID]

ImportClause ledger entry:
  recordIds=[]
  nonGovernedReason=STRUCTURAL_CONTAINER

Identifier("value") ledger entry:
  recordIds=[IMPORTED_BINDING record ID]
  nonGovernedReason=NONE
```

This treatment makes the most-specific lexical binding node own the binding fact while the declaration links to that child's record ID.

All three treatments use existing record kinds and can avoid duplicate binding records. They are not canonically equivalent because their binding `nodeId`, `recordId`, declaration linkage, and child-ledger reasons differ. No closed rule selects one treatment.

## 7. Decisive Ownership and Linkage Falsifier

Apply each candidate treatment to the same fixed AST:

```ts
import value from "module";
```

The preorder node IDs of `ImportDeclaration`, `ImportClause`, and `Identifier("value")` are distinct. Therefore the candidate `IMPORTED_BINDING.recordId` values are distinct even if every payload field is otherwise identical.

That difference propagates into:

```text
IMPORT_DECLARATION.bindingRecordIds=[<candidate-owner binding record ID>]
```

It also changes which child ledger entry has `recordIds`, which child uses `DECLARATION_INTERNAL_RECORDED_BY_OWNER`, and whether `ImportClause` is a `STRUCTURAL_CONTAINER`. Stable serialization preserves these governed arrays and identities. Two instruments choosing different candidate owners would produce different canonical enumerations from the same AST while each could claim compliance with the bare schemas.

The existing structure is capable of representing a result, but existing documentation does not determine which result is governed. Selecting one here would create policy rather than derive it.

## 8. What Is Settled and What Is Not

The following narrow facts are settled for this row:

```text
ImportDeclaration owner of IMPORT_DECLARATION=true
IMPORT_DECLARATION.module="module"
IMPORT_DECLARATION.importKind=DEFAULT_VALUE
required imported-binding count=1
module-specifier standalone LITERAL_DATA=false
module-specifier reason=DECLARATION_INTERNAL_RECORDED_BY_OWNER
```

The following are not settled:

```text
IMPORTED_BINDING owner=UNRESOLVED
IMPORTED_BINDING.nodeId=UNRESOLVED
IMPORTED_BINDING.recordId=UNRESOLVED
IMPORTED_BINDING.importedName exact representation=UNRESOLVED
IMPORT_DECLARATION.bindingRecordIds exact value=UNRESOLVED
ImportClause ledger treatment=UNRESOLVED
default-binding Identifier ledger treatment=UNRESOLVED
```

The unsettled `bindingRecordIds` value is a direct consequence of unresolved binding ownership. Its array cardinality for this simple default import is one; the linked identity is not determined.

## 9. Precedence Construction Result

The inherited executable prefix and repaired first import row remain fixed:

1. previously settled `CALL` ownership;
2. previously settled `NEW` ownership;
3. previously settled property-read/write ownership;
4. side-effect import declaration ownership under POLICY-3.

The resumed block stops at its next row:

| Proposed next row | Declaration recognition | Binding recognition | Binding owner and declaration linkage | Result |
| --- | --- | --- | --- | --- |
| Default import `import value from "module";` | Deterministic | One binding required | Three distinct existing treatments; no selection rule | **UNRESOLVED** |

No precedence is asserted for namespace import, named import, aliases, type-only or mixed imports, export-from, local export, exported declarations, imported binding use, dependency edges, ordinary literal fallback, or later structural fallback. Those rows are not reached.

## 10. Dependency Edge and Later Tests

`DEPENDENCY_EDGE` remains structurally available:

```text
DEPENDENCY_EDGE {
  fromRecordId:recordId,
  toIdentity:string,
  edgeKind:IMPORT|CALL|NEW|READ|WRITE|TYPE_REFERENCE
}
```

This review does not decide whether the default import's import edge is sourced from the `IMPORT_DECLARATION`, the `IMPORTED_BINDING`, or another later-settled record. It also does not decide whether one declaration with multiple bindings produces one declaration edge, one edge per binding, or another cardinality. Those are later choices and cannot repair the earlier missing binding-owner selection.

Multi-binding, alias, re-export, imported-use, and dependency-edge falsifiers are therefore **NOT REACHED**.

No result is asserted for:

```text
import { a, b as c } from "module";
export { a } from "module";
export { value };
```

## 11. Overlap and Omission Tests

### 11.1 Overlap

Each candidate treatment can emit exactly one `IMPORTED_BINDING`, but no settled rule prevents two independently implemented treatments from assigning the same governed binding fact to different nodes. The one-owner principle states the invariant; it does not select the owner.

```text
DEFAULT_IMPORT_BINDING_REQUIRED_RECORD_COUNT=1
DEFAULT_IMPORT_BINDING_OWNER=UNRESOLVED
DEFAULT_IMPORT_BINDING_OVERLAP=CANNOT_BE_CANONICALLY_CLOSED
```

### 11.2 Omission

Omitting the binding record is invalid because the default import contains one governed binding and the declaration requires linkage to its binding records. Emitting the record without linking its exact ID from `bindingRecordIds` is also incomplete. Yet the exact ID cannot be derived until the owner node is selected.

```text
DEFAULT_IMPORT_BINDING_OMISSION=PROHIBITED
DEFAULT_IMPORT_BINDING_LINKAGE=UNRESOLVED
IMPORT_EXPORT_DEPENDENCY_OMISSION=NOT_CLOSED
```

## 12. Minimum Missing Decision

Exactly one first missing decision is identified:

> Which AST node owns the default import's single `IMPORTED_BINDING` record, and consequently which deterministic record ID must appear in `IMPORT_DECLARATION.bindingRecordIds`?

A later authorised decision must select exactly one of the candidate ownership treatments or another schema-valid treatment, then fix the associated child NodeLedger reasons and exact default `importedName` representation. This review does not select, rank, or author that rule.

No new NodeKind, RecordKind, dependency edge kind, provenance kind, root, binding status, NodeLedger reason, operation, flow, destination, predicate, or schema value is shown necessary by this first unresolved choice.

## 13. Outcome Decision

### Outcome 1 - deterministic ownership and precedence

Not selected. The default import is recognisable and representable, but its binding owner and declaration linkage are not determined by the controlling documentation.

### Outcome 2 - exact AST-form/ownership choice unresolved

**Selected.** The existing schema supports a default declaration and one imported-binding record, but three distinct AST owners remain locally schema-valid and produce different canonical record identities, declaration links, and NodeLedger treatments. Existing documentation supplies no rule that chooses among them.

### Outcome 3 - existing structure insufficient

Not selected. Unlike the former side-effect gap, this row has applicable declaration and binding record structures. The first demonstrated failure is missing ownership selection, not inability to encode a binding record.

The derivation may not proceed to named import or any later row from this result.

## 14. Authority Boundary and Stop

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

No Authority is granted or implied to choose the binding owner; define default `importedName`; settle dependency-edge source or cardinality; inspect governed implementation source; inspect, construct, modify, validate, or execute an instrument; edit either canonical policy; alter D4, D5, D6, or predicates; run Check 5 or Check 6; freeze policy; accept implementation; or continue to named import or any later row.

This one-record review stops here.