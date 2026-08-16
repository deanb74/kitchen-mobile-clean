# HH-0000 Check 5 Named Import Binding Ownership and Linkage Derivation Completion Review

**Status:** OUTCOME 1 - NAMED-IMPORT OWNERSHIP, IMPORTED/LOCAL IDENTITY, TYPE-ONLY TREATMENT, MULTI-BINDING LINKAGE, ORDERING, AND CHILD NODELEDGER OWNERSHIP SETTLED
**Review date:** 2026-08-15
**Review type:** Documentation-only bounded formation review
**Controlling input 1:** `HH-0000 CHECK 5 POST-POLICY-3 IMPORT, EXPORT, AND DEPENDENCY OWNERSHIP DERIVATION COMPLETION REVIEW`
**Controlling input 2:** `HH-0000 CHECK 5 DEFAULT IMPORT BINDING OWNERSHIP AND LINKAGE DERIVATION COMPLETION REVIEW`
**Controlling input 3:** Closed `HH-CHECK-5-CLOSED-MEASUREMENT-POLICY-3` schemas and identity
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

**Principle:** Truth before certainty; evidence before claims; one semantic effect has one most-specific governed owner; smallest justified change; human Authority.
**Theory:** A lexical binding fact is owned by the most-specific AST node that introduces the local lexical binding; imported identity and local binding identity remain distinct.
**Architecture:** Identifier-owned `IMPORTED_BINDING` records, declaration-owned `IMPORT_DECLARATION`, structural import containers, declaration-internal imported-name and module-specifier children, source/preorder binding order, and exact cross-record linkage.
**Engineering:** Four exact named-import forms, alias identity falsifier, three-owner alias falsifier, type-only derivation test, multi-binding cardinality/order test, overlap test, omission test, and mandatory stop before namespace import.
**Milestone:** Not Applicable.
**Evidence:** This documentation-only application of the settled default-import lexical-binding ownership rule to named imports using only the three controlling inputs. It produces no implementation, instrument, Check 5, Check 6, freeze, or acceptance Evidence.

## 1. Sole Question and Decision

> Can named-import bindings be deterministically owned and linked by applying the already-settled rule that a lexical binding fact is owned by the most-specific AST node that introduces the local lexical binding?

**Yes. Outcome 1 is selected.**

The settled rule applies without contradiction:

> A lexical binding fact is owned by the most-specific AST node that introduces the local lexical binding.

For each named binding, `ImportSpecifier.name` is the local binding `Identifier`. It owns exactly one `IMPORTED_BINDING`. When an alias is present, `ImportSpecifier.propertyName` identifies the imported name but does not introduce the local binding and does not own a second binding record.

The `ImportDeclaration` owns exactly one `IMPORT_DECLARATION`. The `ImportClause`, `NamedImports`, and each `ImportSpecifier` are structural containers. The module specifier remains declaration-internal. The declaration links exactly once to every Identifier-owned binding record in source binding order, which is also ascending preorder local-Identifier node order.

This review settles only the four named-import forms specified here. It does not proceed to namespace imports, exports, re-exports, imported-use, dependency edges, or any later row.

## 2. Strict Boundary

This review used only:

1. the post-POLICY-3 import/export/dependency ownership review;
2. the default-import binding ownership and linkage review; and
3. the already-governed closed POLICY-3 schemas and identity.

It did not:

1. inspect, open, read, hash, parse, or otherwise access governed implementation source;
2. inspect, construct, modify, readiness-test, validate, or execute an instrument;
3. reconstruct, modify, reread, revalidate, or reserialize POLICY-3;
4. reopen, edit, reinterpret, or replace POLICY-2 or POLICY-3;
5. reopen or alter D4, D5, D6, any predicate, or any predicate value;
6. alter either controlling review or any other existing formation record;
7. run Check 5, Check 6, tests, typecheck, ESLint, implementation validation, freeze, or acceptance work;
8. add a schema field, enum value, record kind, NodeKind, dependency kind, NodeLedger reason, or structural distinction;
9. author namespace-import, export, re-export, imported-use, dependency-edge, or later-row rules; or
10. begin the next derivation row.

Exactly this review record is created.

## 3. Inherited Closed Structure

The controlling policy identity remains:

```text
schema=HH-CHECK-5-CLOSED-MEASUREMENT-POLICY-3
canonicalByteLength=422369
canonicalSha256=049ec7e81f8fea886648ac9f0691f04ff5be2e2f254dd8f01ad939d249eff99d
```

The applicable record schemas are:

```text
IMPORT_DECLARATION {
  module:string,
  importKind:DEFAULT_VALUE|NAMED_VALUE|NAMED_TYPE|NAMED_MIXED|SIDE_EFFECT,
  bindingRecordIds:array<recordId>
}

IMPORTED_BINDING {
  module:string,
  importedName:string,
  localName:string,
  typeOnly:boolean
}
```

The applicable ledger and identity rules are:

```text
NodeLedgerEntry {
  nodeId:uint,
  parentNodeId:uint|null,
  syntaxKind:string,
  childCount:uint,
  recordIds:array<recordId>,
  nonGovernedReason:NONE|STRUCTURAL_CONTAINER|TOKEN_OR_TRIVIA_EXCLUDED|TYPE_NODE_RECORDED_BY_OWNER|DECLARATION_INTERNAL_RECORDED_BY_OWNER
}

recordId=<ROLE>:<NODE_ID>:<RECORD_KIND>:<ORDINAL>
nodeId order=CONTIGUOUS_PREORDER
arraysOrdered=true
every governed fact exactly one record=true
```

The default-import review has already settled that the local binding Identifier owns `IMPORTED_BINDING`, declaration-level facts remain on `ImportDeclaration`, grouping containers are structural, and declaration linkage uses the exact Identifier-owned record ID.

Every required named-import fact is representable by this inherited structure.

## 4. Named-Import Ownership Rule

For a named import specifier:

```text
ImportSpecifier
  propertyName?: Identifier(<imported identity>)
  name: Identifier(<local binding identity>)
```

the exact ownership rule is:

1. `ImportSpecifier.name` introduces the local lexical binding and owns one `IMPORTED_BINDING`;
2. `ImportSpecifier.propertyName`, when present, supplies `importedName` but owns no binding record;
3. an absent `propertyName` means the `name` Identifier supplies both imported and local identity while still owning only one binding record;
4. `ImportSpecifier` groups the imported/local syntax and is a `STRUCTURAL_CONTAINER`;
5. `NamedImports` groups specifiers and is a `STRUCTURAL_CONTAINER`;
6. `ImportClause` groups import bindings and is a `STRUCTURAL_CONTAINER`;
7. `ImportDeclaration` owns the one declaration record and links to every local-Identifier-owned binding record; and
8. the module-specifier string is declaration-internal and owns no independent `LITERAL_DATA`.

When `propertyName` is present, its imported identity is fully represented by the local binding Identifier's `IMPORTED_BINDING.importedName` field. Its ledger entry is therefore:

```text
recordIds=[]
nonGovernedReason=DECLARATION_INTERNAL_RECORDED_BY_OWNER
```

No second binding record is emitted for imported identity.

## 5. Common Declaration and Container Treatment

Each tested statement has one `ImportDeclaration` record:

```text
nodeId=<IMPORT_DECLARATION_NODE_ID>
recordId=<ROLE>:<IMPORT_DECLARATION_NODE_ID>:IMPORT_DECLARATION:0
NodeKind=IMPORT
RecordKind=IMPORT_DECLARATION
module="module"
bindingRecordIds=[<Identifier-owned binding record IDs in source binding order>]
nonGovernedReason=NONE
```

For value-only named imports:

```text
importKind=NAMED_VALUE
```

For the exact clause-level type-only form:

```text
import type { A } from "module";
```

the declaration treatment is:

```text
importKind=NAMED_TYPE
```

The common containers are:

```text
ImportClause:
  recordIds=[]
  nonGovernedReason=STRUCTURAL_CONTAINER

NamedImports:
  recordIds=[]
  nonGovernedReason=STRUCTURAL_CONTAINER

each ImportSpecifier:
  recordIds=[]
  nonGovernedReason=STRUCTURAL_CONTAINER

moduleSpecifier StringLiteral("module"):
  recordIds=[]
  nonGovernedReason=DECLARATION_INTERNAL_RECORDED_BY_OWNER
```

## 6. Form 1 - Unaliased Named Value Import

For:

```ts
import { a } from "module";
```

the `ImportSpecifier.name` Identifier `a` is both the source imported identity and the local binding identity. It owns exactly one record:

```text
nodeId=<LOCAL_IDENTIFIER_A_NODE_ID>
recordId=<ROLE>:<LOCAL_IDENTIFIER_A_NODE_ID>:IMPORTED_BINDING:0
RecordKind=IMPORTED_BINDING
module="module"
importedName="a"
localName="a"
typeOnly=false
nonGovernedReason=NONE
```

The declaration linkage is:

```text
bindingRecordIds=[<ROLE>:<LOCAL_IDENTIFIER_A_NODE_ID>:IMPORTED_BINDING:0]
```

There is one declaration record, one binding record, one binding owner, one declaration link, and no duplicate imported-name record.

## 7. Form 2 - Aliased Named Value Import

For:

```ts
import { a as b } from "module";
```

the AST distinction is:

```text
ImportSpecifier
  propertyName: Identifier("a")
  name: Identifier("b")
```

The local binding Identifier `b` owns exactly one record:

```text
nodeId=<LOCAL_IDENTIFIER_B_NODE_ID>
recordId=<ROLE>:<LOCAL_IDENTIFIER_B_NODE_ID>:IMPORTED_BINDING:0
RecordKind=IMPORTED_BINDING
module="module"
importedName="a"
localName="b"
typeOnly=false
nonGovernedReason=NONE
```

The imported-name Identifier `a` owns no governed record:

```text
recordIds=[]
nonGovernedReason=DECLARATION_INTERNAL_RECORDED_BY_OWNER
```

The declaration linkage is:

```text
bindingRecordIds=[<ROLE>:<LOCAL_IDENTIFIER_B_NODE_ID>:IMPORTED_BINDING:0]
```

The imported-name Identifier does not introduce a second lexical binding. Its identity is recorded exactly once in `IMPORTED_BINDING.importedName` on the local-Identifier-owned record.

## 8. Form 3 - Clause-Level Type-Only Named Import

For:

```ts
import type { A } from "module";
```

the exact import form determines both declaration kind and binding type status:

```text
IMPORT_DECLARATION.importKind=NAMED_TYPE
IMPORTED_BINDING.typeOnly=true
```

The local binding Identifier `A` owns exactly one record:

```text
nodeId=<LOCAL_IDENTIFIER_A_TYPE_NODE_ID>
recordId=<ROLE>:<LOCAL_IDENTIFIER_A_TYPE_NODE_ID>:IMPORTED_BINDING:0
RecordKind=IMPORTED_BINDING
module="module"
importedName="A"
localName="A"
typeOnly=true
nonGovernedReason=NONE
```

The declaration linkage is:

```text
bindingRecordIds=[<ROLE>:<LOCAL_IDENTIFIER_A_TYPE_NODE_ID>:IMPORTED_BINDING:0]
```

This result derives from the exact `import type` AST form. It does not author a rule for specifier-level type modifiers, mixed imports, or any untested type-import form.

## 9. Form 4 - Multiple Named Value Bindings

For:

```ts
import { a, b as c } from "module";
```

exactly two local lexical bindings are introduced:

1. local Identifier `a`, with imported identity `a`; and
2. local Identifier `c`, with imported identity `b`.

The first record is:

```text
nodeId=<LOCAL_IDENTIFIER_A_NODE_ID>
recordId=<ROLE>:<LOCAL_IDENTIFIER_A_NODE_ID>:IMPORTED_BINDING:0
module="module"
importedName="a"
localName="a"
typeOnly=false
```

The second record is:

```text
nodeId=<LOCAL_IDENTIFIER_C_NODE_ID>
recordId=<ROLE>:<LOCAL_IDENTIFIER_C_NODE_ID>:IMPORTED_BINDING:0
module="module"
importedName="b"
localName="c"
typeOnly=false
```

The imported-name Identifier `b` owns no governed record and uses:

```text
recordIds=[]
nonGovernedReason=DECLARATION_INTERNAL_RECORDED_BY_OWNER
```

The declaration links to exactly those two records:

```text
bindingRecordIds=[
  <ROLE>:<LOCAL_IDENTIFIER_A_NODE_ID>:IMPORTED_BINDING:0,
  <ROLE>:<LOCAL_IDENTIFIER_C_NODE_ID>:IMPORTED_BINDING:0
]
```

No record is emitted for the `ImportSpecifier` nodes, the imported-name Identifier `b`, the `NamedImports` container, the `ImportClause`, or the module-specifier string.

## 10. Deterministic Binding Link Order

POLICY-3 defines `bindingRecordIds` as an ordered array, preserves governed array order, and assigns contiguous preorder node IDs. The named import syntax provides an ordered specifier list in source order.

The exact linkage order is therefore:

> Sort no binding identities and perform no name-based reordering. Emit each Identifier-owned `IMPORTED_BINDING` record ID in the source order of its containing `ImportSpecifier`, equivalently ascending preorder local-binding Identifier `nodeId` for the tested named-import list.

For:

```ts
import { a, b as c } from "module";
```

the order is `a` then `c`, regardless of imported/local spelling comparison:

```text
NAMED_IMPORT_BINDING_RECORD_ID_ORDER=SOURCE_IMPORT_SPECIFIER_ORDER
NAMED_IMPORT_BINDING_RECORD_ID_ORDER_FALSIFIER=ASCENDING_LOCAL_BINDING_IDENTIFIER_PREORDER_NODE_ID
```

The two expressions are equivalent for this governed AST list. Reversing the IDs, sorting by `importedName`, sorting by `localName`, or deduplicating equal spellings would contradict the settled source/preorder order.

Each local binding Identifier owns one `IMPORTED_BINDING`, so each record uses ordinal `0` on its distinct owner node.

## 11. Critical Alias Identity Falsifier

Compare:

```ts
import { a } from "module";
import { a as b } from "module";
```

The first binding is:

```text
importedName="a"
localName="a"
```

The second binding is:

```text
importedName="a"
localName="b"
```

Collapsing both fields to `b` would lose source imported identity. Assigning both fields as `a` would lose the local lexical binding identity. The alias record must preserve both distinct values on the one record owned by local Identifier `b`.

This falsifier confirms:

```text
NAMED_IMPORT_IMPORTED_NAME=SOURCE_IMPORTED_IDENTIFIER
NAMED_IMPORT_LOCAL_NAME=SOURCE_LOCAL_BINDING_IDENTIFIER
```

## 12. Critical Alias Ownership Falsifier

For:

```ts
import { a as b } from "module";
```

the candidate owners are:

| Candidate | Possible owner | Result |
| --- | --- | --- |
| A | `ImportSpecifier` | Rejected |
| B | Imported-name Identifier `a` | Rejected |
| C | Local binding Identifier `b` | Selected |

### 12.1 Candidate A - ImportSpecifier

Rejected. The `ImportSpecifier` groups imported and local syntax but does not itself introduce the local lexical binding when the more-specific `name` Identifier exists.

### 12.2 Candidate B - imported-name Identifier

Rejected. Identifier `a` identifies the exported member selected from the module. It does not introduce the current file's local lexical binding and therefore cannot own the binding record.

### 12.3 Candidate C - local binding Identifier

Selected. Identifier `b` is the most-specific AST node introducing the local lexical binding. Its preorder `nodeId` makes the binding record ID deterministic, and the declaration linkage follows mechanically.

```text
NAMED_IMPORT_BINDING_OWNER=LOCAL_BINDING_IDENTIFIER
```

## 13. Type-Only Falsifier

Compare the exact forms:

```ts
import { A } from "module";
import type { A } from "module";
```

The same imported and local spellings do not determine `typeOnly`. The exact import AST form does:

```text
first:  importKind=NAMED_VALUE, typeOnly=false
second: importKind=NAMED_TYPE,  typeOnly=true
```

This closes the tested clause-level distinction without inspecting semantic use and without defining any untested mixed or specifier-level type form.

## 14. Positive Test Matrix

| Form | Declaration records | Binding records | Owners | Imported/local identities | `typeOnly` | Link order | Result |
| --- | ---: | ---: | --- | --- | --- | --- | --- |
| `import { a } from "module";` | 1 | 1 | local `a` | `a` / `a` | `false` | `a` | `PASS` |
| `import { a as b } from "module";` | 1 | 1 | local `b` | `a` / `b` | `false` | `b` | `PASS` |
| `import type { A } from "module";` | 1 | 1 | local `A` | `A` / `A` | `true` | `A` | `PASS` |
| `import { a, b as c } from "module";` | 1 | 2 | local `a`, local `c` | `a` / `a`; `b` / `c` | `false`, `false` | `a`, `c` | `PASS` |

For every row:

```text
ImportClause=STRUCTURAL_CONTAINER
NamedImports=STRUCTURAL_CONTAINER
ImportSpecifier=STRUCTURAL_CONTAINER
moduleSpecifier=DECLARATION_INTERNAL_RECORDED_BY_OWNER
```

The matrix records documentation-only expected derivations. It is not instrument execution or implementation Evidence.

## 15. Multi-Binding Overlap and Omission Closure

### 15.1 Overlap

Each local binding Identifier owns exactly one binding record. The declaration, `ImportClause`, `NamedImports`, `ImportSpecifier`, imported-name-only Identifier, and module specifier own no competing binding record. Each record ID appears once in declaration source order.

For the two-binding case:

```text
NAMED_IMPORT_EXPECTED_BINDING_COUNT=2
NAMED_IMPORT_ACTUAL_OWNER_COUNT=2
NAMED_IMPORT_DECLARATION_LINK_COUNT=2
NAMED_IMPORT_BINDING_OVERLAP=CLOSED
```

### 15.2 Omission

Every `ImportSpecifier.name` local binding Identifier must emit one `IMPORTED_BINDING`, and every emitted binding record ID must appear exactly once in the declaration's `bindingRecordIds`. Missing `a`, missing `c`, omitting either link, or replacing either with an imported-name-only Identifier record fails closure.

```text
NAMED_IMPORT_REQUIRED_BINDING_COUNT=SOURCE_IMPORT_SPECIFIER_COUNT
NAMED_IMPORT_DECLARATION_LINK_COUNT=SOURCE_IMPORT_SPECIFIER_COUNT
NAMED_IMPORT_BINDING_OMISSION=CLOSED
```

## 16. Settled Named-Import Result

The complete bounded result is:

```text
NAMED_IMPORT_BINDING_OWNER=LOCAL_BINDING_IDENTIFIER
NAMED_IMPORT_IMPORTED_NAME=SOURCE_IMPORTED_IDENTIFIER
NAMED_IMPORT_LOCAL_NAME=SOURCE_LOCAL_BINDING_IDENTIFIER
NAMED_IMPORT_TYPE_ONLY=DERIVED_FROM_EXACT_IMPORT_TYPE_FORM
IMPORT_CLAUSE_LEDGER_REASON=STRUCTURAL_CONTAINER
NAMED_IMPORTS_CONTAINER_LEDGER_REASON=STRUCTURAL_CONTAINER
IMPORT_DECLARATION_BINDING_LINKAGE=EXACT_IDENTIFIER_OWNED_RECORD_IDS
NAMED_IMPORT_BINDING_OVERLAP=CLOSED
NAMED_IMPORT_BINDING_OMISSION=CLOSED
NAMED_IMPORT_BINDING_RECORD_ID_ORDER=SOURCE_IMPORT_SPECIFIER_ORDER
```

The remaining exact child treatments are:

```text
IMPORT_SPECIFIER_LEDGER_REASON=STRUCTURAL_CONTAINER
ALIASED_IMPORTED_NAME_IDENTIFIER_LEDGER_REASON=DECLARATION_INTERNAL_RECORDED_BY_OWNER
NAMED_IMPORT_MODULE_SPECIFIER_LEDGER_REASON=DECLARATION_INTERNAL_RECORDED_BY_OWNER
```

No new structural distinction is required.

## 17. Later Rows Not Reached

This review does not decide:

1. namespace-import ownership or representation;
2. exports or re-exports;
3. exported-name ownership or declaration linkage;
4. imported binding use;
5. dependency-edge source ownership or cardinality;
6. mixed default/named declaration treatment beyond the four tested forms;
7. specifier-level type modifiers;
8. any later precedence or fallback row.

No result for those forms is inherited or implied by the named-import result.

## 18. Outcome Decision

### Outcome 1 - named-import ownership and linkage settled

**Selected.** Every named binding is owned by its local binding Identifier; imported and local identities remain distinct; clause-level `import type` determines `typeOnly=true`; declaration linkage contains each Identifier-owned record ID exactly once in source/preorder binding order; and all grouping and declaration-internal child ledger treatments use existing vocabulary.

### Outcome 2 - one ownership, linkage, or order choice unresolved

Not selected. The settled lexical-binding-owner rule chooses the owner, the AST distinguishes imported and local identities, the exact type form supplies `typeOnly`, and source/preorder order determines the multi-binding record-ID array.

### Outcome 3 - existing closed structure insufficient

Not selected. POLICY-3 represents every required declaration field, binding field, ordered record reference, record kind, and NodeLedger reason without extension.

## 19. Resume Point and Mandatory Stop

The post-POLICY-3 import/export/dependency derivation may resume at NAMESPACE IMPORT.

This review does not resume it.

## 20. Authority Boundary

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

No Authority is granted or implied to author namespace-import or later ownership rules; inspect governed implementation source; inspect, construct, modify, validate, or execute an instrument; edit either canonical policy; alter D4, D5, D6, or predicates; run Check 5 or Check 6; freeze policy; or accept implementation.

This one-record review stops here.