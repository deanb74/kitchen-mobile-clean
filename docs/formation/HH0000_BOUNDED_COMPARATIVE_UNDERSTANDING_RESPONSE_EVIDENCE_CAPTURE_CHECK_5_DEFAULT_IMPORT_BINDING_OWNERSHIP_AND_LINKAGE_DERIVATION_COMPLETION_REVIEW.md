# HH-0000 Check 5 Default Import Binding Ownership and Linkage Derivation Completion Review

**Status:** OUTCOME 1 - DEFAULT-IMPORT BINDING OWNERSHIP, IMPORTED-NAME TREATMENT, DECLARATION LINKAGE, AND CHILD NODELEDGER TREATMENT SETTLED
**Review date:** 2026-08-15
**Review type:** Documentation-only bounded formation review
**Controlling review:** `HH-0000 CHECK 5 POST-POLICY-3 IMPORT, EXPORT, AND DEPENDENCY OWNERSHIP DERIVATION COMPLETION REVIEW`
**Controlling policy schema:** `HH-CHECK-5-CLOSED-MEASUREMENT-POLICY-3`
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
**Theory:** A lexical binding fact is owned by the most-specific AST node that introduces the local lexical binding; an enclosing declaration owns declaration-level facts, while a grouping container does not displace a more-specific binding owner.
**Architecture:** Identifier-owned `IMPORTED_BINDING`, declaration-owned `IMPORT_DECLARATION`, exact cross-record linkage, structural `ImportClause`, declaration-internal module specifier, and complete preorder NodeLedger accounting.
**Engineering:** One positive default-import case, three-owner falsifier, default-versus-named imported-identity falsifier, exact record-ID linkage test, overlap test, omission test, and mandatory stop before named import.
**Milestone:** Not Applicable.
**Evidence:** This documentation-only resolution of the controlling review's sole Outcome 2 question against the closed POLICY-3 record and NodeLedger schemas. It produces no implementation, instrument, Check 5, Check 6, freeze, or acceptance Evidence.

## 1. Sole Question and Decision

> Which AST node owns the default import's single `IMPORTED_BINDING` record, and consequently which deterministic record ID must appear in `IMPORT_DECLARATION.bindingRecordIds`?

**The local binding `Identifier` owns the record. Outcome 1 is selected.**

For:

```ts
import value from "module";
```

the fixed ownership rule is:

> A lexical binding fact is owned by the most-specific AST node that introduces the local lexical binding.

The `Identifier("value")` introduces the local lexical binding. The `ImportDeclaration` owns declaration-level import facts. The `ImportClause` merely groups binding syntax and does not own the binding when the more-specific binding `Identifier` exists.

Therefore:

```text
DEFAULT_IMPORT_BINDING_OWNER=LOCAL_BINDING_IDENTIFIER
```

The declaration's `bindingRecordIds` array contains the deterministic record ID of that Identifier-owned `IMPORTED_BINDING` exactly once.

This review settles only default import. It does not resume named imports or any later import, export, or dependency row.

## 2. Strict Boundary

This review resolves only the controlling post-POLICY-3 review's Outcome 2 question. It did not:

1. inspect, open, read, hash, parse, or otherwise access either governed implementation source;
2. inspect, construct, modify, validate, or execute an instrument;
3. reconstruct, modify, reread, revalidate, or reserialize POLICY-3;
4. reopen, edit, reinterpret, or replace POLICY-2 or POLICY-3;
5. reopen or alter D4, D5, D6, any predicate, or any predicate value;
6. alter the controlling review or any other existing formation record;
7. run Check 5, Check 6, tests, typecheck, ESLint, implementation validation, freeze, or acceptance work;
8. add a schema field, enum value, record kind, NodeKind, dependency kind, NodeLedger reason, or structural distinction;
9. author a named-import, alias, type-only, mixed-import, export, re-export, imported-use, or dependency-edge rule; or
10. begin the next derivation row.

Exactly this review record is created.

## 3. Inherited Structure

The controlling closed POLICY-3 identity is:

```text
schema=HH-CHECK-5-CLOSED-MEASUREMENT-POLICY-3
canonicalByteLength=422369
canonicalSha256=049ec7e81f8fea886648ac9f0691f04ff5be2e2f254dd8f01ad939d249eff99d
```

Its applicable record schemas are:

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

The inherited ledger and identity rules provide:

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
every governed fact exactly one record=true
```

Every required value in the fixed decision is representable by this existing structure. No schema change is required.

## 4. Architectural Ownership Rule

The rule settled by this review has three parts:

1. a lexical binding fact is owned by the most-specific AST node that introduces the local lexical binding;
2. the enclosing declaration owns declaration-level facts; and
3. a syntactic container that merely groups binding syntax does not own the lexical binding when a more-specific binding `Identifier` exists.

For the default import AST:

```text
ImportDeclaration
  importClause: ImportClause
    name: Identifier("value")
  moduleSpecifier: StringLiteral("module")
```

the ownership partition is exact:

| AST node | Governed ownership | Ledger treatment |
| --- | --- | --- |
| `ImportDeclaration` | One `IMPORT_DECLARATION` | `nonGovernedReason=NONE` |
| `ImportClause` | No governed record | `nonGovernedReason=STRUCTURAL_CONTAINER` |
| `Identifier("value")` | One `IMPORTED_BINDING` | `nonGovernedReason=NONE` |
| `StringLiteral("module")` | No independent `LITERAL_DATA` | `nonGovernedReason=DECLARATION_INTERNAL_RECORDED_BY_OWNER` |

No node owns both the declaration fact and the lexical binding fact. No governed fact is duplicated or omitted.

## 5. Exact Positive Derivation

For:

```ts
import value from "module";
```

the `ImportDeclaration` owns exactly one declaration record:

```text
nodeId=<IMPORT_DECLARATION_NODE_ID>
recordId=<ROLE>:<IMPORT_DECLARATION_NODE_ID>:IMPORT_DECLARATION:0
NodeKind=IMPORT
RecordKind=IMPORT_DECLARATION
module="module"
importKind=DEFAULT_VALUE
bindingRecordIds=[<ROLE>:<IDENTIFIER_NODE_ID>:IMPORTED_BINDING:0]
nonGovernedReason=NONE
```

The `ImportClause` owns no governed record:

```text
recordIds=[]
nonGovernedReason=STRUCTURAL_CONTAINER
```

The local binding `Identifier("value")` owns exactly one binding record:

```text
nodeId=<IDENTIFIER_NODE_ID>
recordId=<ROLE>:<IDENTIFIER_NODE_ID>:IMPORTED_BINDING:0
RecordKind=IMPORTED_BINDING
module="module"
importedName="default"
localName="value"
typeOnly=false
nonGovernedReason=NONE
```

The module-specifier `StringLiteral("module")` owns no independent literal record:

```text
recordIds=[]
nonGovernedReason=DECLARATION_INTERNAL_RECORDED_BY_OWNER
```

The declaration linkage contains the Identifier-owned record ID exactly once. The `0` ordinal is deterministic because the Identifier owns exactly one record of kind `IMPORTED_BINDING`.

## 6. Imported-Name Meaning

The default-import binding record is:

```text
module="module"
importedName="default"
localName="value"
typeOnly=false
```

`importedName` records the imported or exported identity. `localName` records the source-local lexical identifier introduced by the binding node. The fields are not interchangeable.

The conceptual comparison is:

```ts
import value from "module";
import { value } from "module";
```

The default import retains:

```text
importedName="default"
localName="value"
```

The named import must not be forced to use `importedName="default"` merely because its local spelling is also `value`. This comparison establishes that default imported identity is distinct from local lexical spelling.

No named-import record, owner, alias treatment, linkage rule, or ledger treatment is authored here. The named form is used only as a falsifier of an incorrect default-import field interpretation.

## 7. Three-Owner Falsifier

The controlling review identified three candidate owners:

| Candidate | Treatment | Result |
| --- | --- | --- |
| A | `ImportDeclaration` owns `IMPORTED_BINDING` | Rejected |
| B | `ImportClause` owns `IMPORTED_BINDING` | Rejected |
| C | Local binding `Identifier` owns `IMPORTED_BINDING` | Selected |

### 7.1 Candidate A - ImportDeclaration

Rejected. Declaration ownership would place the declaration-level import fact and the local lexical binding fact on the enclosing declaration even though a more-specific AST node introduces the binding. That collapses two distinct ownership responsibilities unnecessarily.

### 7.2 Candidate B - ImportClause

Rejected. The `ImportClause` groups binding syntax but is not itself the local lexical binding. Assigning the record to this container would displace the more-specific `Identifier` owner.

### 7.3 Candidate C - local binding Identifier

Selected because:

1. the `Identifier` is the most-specific AST node introducing the local lexical binding;
2. declaration and binding ownership remain distinct;
3. the `ImportClause` remains a structural grouping container;
4. preorder traversal gives the `Identifier` a deterministic `nodeId`;
5. the record identity follows mechanically as `<ROLE>:<IDENTIFIER_NODE_ID>:IMPORTED_BINDING:0`; and
6. declaration linkage is mechanically recomputable from that exact record identity.

The principle is structurally consistent with later named and aliased binding forms because those forms also contain local binding identifiers. That observation is only a consistency falsifier. It does not settle any later form or author a named-import rule.

## 8. Exact Linkage Test

Let the preorder node ID of `Identifier("value")` be `I`. The only valid default binding record ID under this decision is:

```text
<ROLE>:I:IMPORTED_BINDING:0
```

The declaration record must therefore contain:

```text
bindingRecordIds=[<ROLE>:I:IMPORTED_BINDING:0]
```

The following fail the decision:

1. an empty `bindingRecordIds` array;
2. more than one binding record ID;
3. a declaration-owned `IMPORTED_BINDING` record ID;
4. an `ImportClause`-owned `IMPORTED_BINDING` record ID;
5. an Identifier-owned record ID appearing more than once;
6. a record ID with a nonzero `IMPORTED_BINDING` ordinal for this Identifier;
7. a linked record whose `nodeId` differs from the local binding Identifier's node ID; or
8. an orphan Identifier-owned binding record absent from the declaration linkage.

This makes owner, record identity, cardinality, and cross-record linkage independently recomputable from the AST and emitted records.

## 9. Positive Test Result

The required positive case is satisfied:

| Requirement | Result |
| --- | --- |
| One `IMPORT_DECLARATION` | `PASS` |
| One `IMPORTED_BINDING` | `PASS` |
| Binding owner is `Identifier("value")` | `PASS` |
| `importedName="default"` | `PASS` |
| `localName="value"` | `PASS` |
| `typeOnly=false` | `PASS` |
| `ImportClause=STRUCTURAL_CONTAINER` | `PASS` |
| Module specifier is declaration-internal | `PASS` |
| Declaration links exactly once to Identifier-owned binding record | `PASS` |

The test is documentation-only. It records the deterministic expected derivation and does not claim an instrument execution or implementation observation.

## 10. Overlap and Omission Closure

### 10.1 Overlap

The ownership rule assigns the single declaration fact to `ImportDeclaration` and the single lexical binding fact to `Identifier("value")`. The `ImportClause` and module specifier own no competing record. Candidate A and Candidate B are rejected, so no second node may emit the same binding fact.

```text
DEFAULT_IMPORT_BINDING_REQUIRED_RECORD_COUNT=1
DEFAULT_IMPORT_BINDING_ACTUAL_OWNER_COUNT=1
DEFAULT_IMPORT_BINDING_OVERLAP=CLOSED
```

### 10.2 Omission

The local binding Identifier must emit exactly one `IMPORTED_BINDING`, and the declaration must reference that exact record ID once. Missing either the record or its declaration linkage fails the exact positive derivation.

```text
DEFAULT_IMPORT_BINDING_REQUIRED_RECORD_COUNT=1
IMPORT_DECLARATION_BINDING_LINK_COUNT=1
DEFAULT_IMPORT_BINDING_OMISSION=CLOSED
```

## 11. Settled Default-Import Result

The complete bounded result is:

```text
DEFAULT_IMPORT_BINDING_OWNER=LOCAL_BINDING_IDENTIFIER
DEFAULT_IMPORT_IMPORTED_NAME=default
DEFAULT_IMPORT_LOCAL_NAME=SOURCE_LOCAL_IDENTIFIER
DEFAULT_IMPORT_TYPE_ONLY=false
IMPORT_CLAUSE_LEDGER_REASON=STRUCTURAL_CONTAINER
IMPORT_DECLARATION_BINDING_LINKAGE=EXACT_IDENTIFIER_OWNED_RECORD_ID
DEFAULT_IMPORT_BINDING_OVERLAP=CLOSED
DEFAULT_IMPORT_BINDING_OMISSION=CLOSED
```

The module specifier remains declaration-internal:

```text
DEFAULT_IMPORT_MODULE_SPECIFIER_RECORD_IDS=[]
DEFAULT_IMPORT_MODULE_SPECIFIER_LEDGER_REASON=DECLARATION_INTERNAL_RECORDED_BY_OWNER
```

No new structural distinction is required.

## 12. Later Rows Not Reached

This review does not decide:

1. named-import binding ownership application;
2. named-import `importedName` or `localName` derivation;
3. aliases;
4. namespace imports;
5. type-only or mixed imports;
6. export-from or local export;
7. exported declaration or exported-name linkage;
8. imported binding use;
9. dependency-edge source ownership or cardinality; or
10. any later precedence or fallback row.

The conceptual named-import comparison in Section 6 and the scalability observation in Section 7 are falsifiers only. They grant no settled named-import result.

## 13. Outcome Decision

### Outcome 1 - default-import ownership and linkage settled

**Selected.** The most-specific local binding `Identifier` owns the single `IMPORTED_BINDING`; its payload is `module="module"`, `importedName="default"`, `localName="value"`, and `typeOnly=false`; the declaration links exactly once to that Identifier-owned record; the `ImportClause` is a structural container; and the module specifier remains declaration-internal.

### Outcome 2 - existing closed schema cannot represent an exact value

Not selected. Every required record field, string value, boolean value, record reference, record kind, and NodeLedger reason is representable by the existing closed POLICY-3 structure.

### Outcome 3 - new structural distinction required

Not selected. The existing schema and ledger vocabulary are sufficient once the most-specific lexical binding owner is selected.

## 14. Resume Point and Mandatory Stop

The post-POLICY-3 import/export/dependency derivation may resume at NAMED IMPORT.

This review does not resume it.

## 15. Authority Boundary

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

No Authority is granted or implied to author named-import or later ownership rules; inspect governed implementation source; inspect, construct, modify, validate, or execute an instrument; edit either canonical policy; alter D4, D5, D6, or predicates; run Check 5 or Check 6; freeze policy; or accept implementation.

This one-record review stops here.