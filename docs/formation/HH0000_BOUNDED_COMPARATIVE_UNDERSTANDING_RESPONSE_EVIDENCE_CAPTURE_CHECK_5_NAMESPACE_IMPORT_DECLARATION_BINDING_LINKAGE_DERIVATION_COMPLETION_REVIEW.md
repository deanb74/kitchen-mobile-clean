# HH-0000 Check 5 Namespace Import Declaration Binding Linkage Derivation Completion Review

**Status:** OUTCOME 1 - NAMESPACE DECLARATION BINDING LINKAGE DETERMINISTIC
**Review date:** 2026-08-15
**Review type:** Documentation-only bounded derivation completion review
**Controlling policy schema:** `HH-CHECK-5-CLOSED-MEASUREMENT-POLICY-5`
**Controlling policy canonical identity:** `423284` bytes / `78a8ece526551eaf4a00c5addbf72d71b7a17a8cfc4bb809bfc687c76a3f03cf`
**Corrected canonical-policy closure:** `ACHIEVED`
**Governed implementation-source access:** None
**Instrument access or effect:** None
**Policy effect:** None
**D4/D5/D6 effect:** None
**Predicate effect:** None
**Check 5:** `UNMEASURED`
**Check 6:** `NOT RUN`
**Implementation:** `UNACCEPTED`
**Authority effect:** None

# Repository Traceability

**Principle:** Truth before certainty; evidence before claims; one governed fact has one most-specific owner; references do not transfer ownership; smallest justified change; human Authority.
**Theory:** A declaration links exactly once to every binding record belonging to it while each binding record remains owned by its binding-introducing AST node.
**Architecture:** Declaration-owned `IMPORT_DECLARATION`, Identifier-owned `IMPORTED_BINDING`, exact cross-node record reference, one-element deterministic array order, and unchanged linkage across ordinary and type-only namespace forms.
**Engineering:** Eight ordered questions, positive ordinary and type-only cases, seven cardinality and linkage falsifiers, owner/linkage separation, exact-once checks, and mandatory stop before child NodeLedger treatment.
**Milestone:** Not Applicable.
**Evidence:** The five controlling formation reviews and the fixed closed POLICY-5 identity. This review produces no policy, implementation, instrument, Check 5, Check 6, freeze, or acceptance Evidence.

## 1. Sole Question and Decision

> What exact value must the containing namespace `IMPORT_DECLARATION` record place in `bindingRecordIds:array<recordId>` for a namespace import containing exactly one local namespace binding?

**The declaration must reference the one Identifier-owned binding record exactly once. Outcome 1 is selected.**

For both ordinary and type-only namespace imports, the exact linkage is:

```text
IMPORT_DECLARATION.bindingRecordIds=[
  <ROLE>:<IDENTIFIER_NS_NODE_ID>:IMPORTED_BINDING:0
]
```

The declaration owns the `IMPORT_DECLARATION`; local `Identifier("ns")` owns the `IMPORTED_BINDING`; the declaration's array references that Identifier-owned record without moving or duplicating it.

```text
NAMESPACE_IMPORT_REQUIRED_BINDING_COUNT=1
NAMESPACE_IMPORT_DECLARATION_BINDING_LINK_COUNT=1
NAMESPACE_IMPORT_DECLARATION_BINDING_RECORD_ID=<ROLE>:<IDENTIFIER_NS_NODE_ID>:IMPORTED_BINDING:0
NAMESPACE_IMPORT_BINDING_LINK_ORDER=TRIVIAL_SINGLE_ELEMENT_ORDER
NAMESPACE_IMPORT_BINDING_LINK_DUPLICATE=false
NAMESPACE_IMPORT_BINDING_LINK_ORPHAN=false
NEW_STRUCTURAL_DISTINCTION_REQUIRED=false
```

## 2. Strict Boundary

This review resolves exactly:

```text
IMPORT_DECLARATION.bindingRecordIds
```

It does not:

1. open, inspect, reconstruct, regenerate, reserialize, modify, or revalidate POLICY-5;
2. inspect governed implementation source;
3. inspect, construct, modify, validate, or execute an instrument;
4. run Check 5 or Check 6;
5. reopen binding owner, binding record ID, module, imported identity, local name, `typeOnly`, or `IMPORT_DECLARATION.importKind`;
6. settle or analyse any child NodeLedger treatment;
7. perform general namespace overlap or omission closure;
8. analyse dependency-edge ownership or cardinality;
9. analyse exports, re-exports, or later sequence rows;
10. alter D4, D5, D6, predicates, terminal objects, IDs, or ordering; or
11. modify any existing policy or formation review.

Exactly this one Markdown review is created.

## 3. Controlling Evidence

| Controlling review | Linkage-relevant result |
| --- | --- |
| `HH-0000 CHECK 5 POST-POLICY-5 NAMESPACE IMPORT BINDING OWNERSHIP AND LINKAGE DERIVATION COMPLETION REVIEW` | Settles local `Identifier("ns")` as owner and `<ROLE>:<IDENTIFIER_NS_NODE_ID>:IMPORTED_BINDING:0` as the exact binding record ID |
| `HH-0000 CHECK 5 NAMESPACE IMPORT TYPE-ONLY DERIVATION COMPLETION REVIEW` | Completes the ordinary and type-only namespace binding payloads, establishes that only `typeOnly` changes, and sets `IMPORT_DECLARATION.bindingRecordIds` as the next documentation-level position |
| `HH-0000 CHECK 5 DEFAULT IMPORT BINDING OWNERSHIP AND LINKAGE DERIVATION COMPLETION REVIEW` | Establishes that a declaration with one binding links exactly once to the local-Identifier-owned binding record and rejects empty, duplicate, wrong-owner, wrong-node, and orphan linkage |
| `HH-0000 CHECK 5 NAMED IMPORT BINDING OWNERSHIP AND LINKAGE DERIVATION COMPLETION REVIEW` | Establishes that `bindingRecordIds` contains every Identifier-owned binding record belonging to the declaration in deterministic source/preorder order |
| `HH-0000 CHECK 5 IMPORTED IDENTITY CORRECTED CANONICAL POLICY CLOSURE REVIEW` | Closes the exact POLICY-5 identity while leaving declaration linkage for later derivation |

No controlling Evidence requires namespace-specific linkage structure, a second binding record, or ownership transfer to the declaration.

## 4. Fixed Inputs

The controlling policy identity is fixed:

```text
schema=HH-CHECK-5-CLOSED-MEASUREMENT-POLICY-5
canonicalByteLength=423284
canonicalSha256=78a8ece526551eaf4a00c5addbf72d71b7a17a8cfc4bb809bfc687c76a3f03cf
CORRECTED_CANONICAL_POLICY_CLOSURE=ACHIEVED
```

The ordinary namespace binding is fixed as:

```text
source=import * as ns from "module";
owner=LOCAL_BINDING_IDENTIFIER
recordId=<ROLE>:<IDENTIFIER_NS_NODE_ID>:IMPORTED_BINDING:0
module="module"
importedIdentity={kind:"MODULE_NAMESPACE_OBJECT"}
localName="ns"
typeOnly=false
```

The type-only namespace binding is fixed as:

```text
source=import type * as ns from "module";
owner=LOCAL_BINDING_IDENTIFIER
recordId=<ROLE>:<IDENTIFIER_NS_NODE_ID>:IMPORTED_BINDING:0
module="module"
importedIdentity={kind:"MODULE_NAMESPACE_OBJECT"}
localName="ns"
typeOnly=true
```

The containing declaration facts are fixed:

```text
NodeKind=IMPORT
RecordKind=IMPORT_DECLARATION
importKind=NAMESPACE
```

This review does not reconsider any fixed value.

## 5. Eight Ordered Questions

### 5.1 Governed imported-binding fact count

The tested namespace syntax introduces exactly one local lexical binding, `ns`. The settled ownership review assigns exactly one `IMPORTED_BINDING` fact to that local binding Identifier.

```text
QUESTION_1=ONE_GOVERNED_IMPORTED_BINDING_FACT
```

### 5.2 Binding owner

The owner is fixed as the most-specific binding-introducing node:

```text
QUESTION_2=LOCAL_BINDING_IDENTIFIER
```

The owner is not reopened or re-derived here.

### 5.3 Exact binding record ID

The fixed Identifier-owned record is:

```text
QUESTION_3=<ROLE>:<IDENTIFIER_NS_NODE_ID>:IMPORTED_BINDING:0
```

The ordinal is already settled as `0` because the Identifier owns one record of this kind.

### 5.4 Declaration linkage requirement

Default-import governance establishes the one-binding positive case: the declaration links exactly once to its Identifier-owned binding record. Named-import governance generalises the existing array responsibility: `bindingRecordIds` contains every Identifier-owned binding record belonging to that declaration.

The namespace declaration contains the one settled namespace binding record. Therefore that record is required in its declaration linkage.

```text
QUESTION_4=YES_EVERY_BINDING_RECORD_BELONGING_TO_THE_DECLARATION_IS_LINKED
```

### 5.5 Exact linkage cardinality

One governed binding fact produces one Identifier-owned binding record, and every such record is linked once. Therefore:

```text
QUESTION_5=1
NAMESPACE_IMPORT_REQUIRED_BINDING_COUNT=1
NAMESPACE_IMPORT_DECLARATION_BINDING_LINK_COUNT=1
```

### 5.6 Exact linked record ID

The sole array member is the fixed binding record ID:

```text
QUESTION_6=<ROLE>:<IDENTIFIER_NS_NODE_ID>:IMPORTED_BINDING:0

IMPORT_DECLARATION.bindingRecordIds=[
  <ROLE>:<IDENTIFIER_NS_NODE_ID>:IMPORTED_BINDING:0
]
```

### 5.7 Ordering

The namespace form has one array member. Every valid ordering of that singleton is identical, so no namespace-specific sorting rule or multi-binding precedence is needed.

```text
QUESTION_7=NOT_AMBIGUOUS
NAMESPACE_IMPORT_BINDING_LINK_ORDER=TRIVIAL_SINGLE_ELEMENT_ORDER
```

The named-import source-order rule confirms that arrays preserve deterministic linkage; it does not introduce a multi-binding problem into this one-binding row.

### 5.8 Type-only parity

The type-only namespace form changes only the fixed binding payload field:

```text
typeOnly=true
```

It still introduces one local namespace binding, owned by the same structural Identifier position, with `RecordKind=IMPORTED_BINDING` and ordinal `0`. No controlling Evidence changes existence, owner, record identity form, cardinality, or declaration linkage based on `ImportClause.isTypeOnly`.

Therefore the type-only form has the same exact linkage:

```text
QUESTION_8=LINKAGE_PARITY_PASS

IMPORT_DECLARATION.bindingRecordIds=[
  <ROLE>:<IDENTIFIER_NS_NODE_ID>:IMPORTED_BINDING:0
]
```

The review stops after question 8.

## 6. Critical Positive Cases

### 6.1 Ordinary namespace import

For:

```ts
import * as ns from "module";
```

the required linkage is:

```text
IMPORT_DECLARATION.bindingRecordIds=[
  <ROLE>:<IDENTIFIER_NS_NODE_ID>:IMPORTED_BINDING:0
]
```

```text
ORDINARY_NAMESPACE_IMPORT_LINKAGE=PASS
```

### 6.2 Type-only namespace import

For:

```ts
import type * as ns from "module";
```

the binding payload has `typeOnly=true`, but the required linkage remains:

```text
IMPORT_DECLARATION.bindingRecordIds=[
  <ROLE>:<IDENTIFIER_NS_NODE_ID>:IMPORTED_BINDING:0
]
```

```text
TYPE_ONLY_NAMESPACE_IMPORT_LINKAGE=PASS
ORDINARY_TYPE_ONLY_NAMESPACE_LINKAGE_PARITY=PASS
```

## 7. Seven Cardinality and Linkage Falsifiers

| Candidate | Treatment | Result |
| --- | --- | --- |
| A. `bindingRecordIds=[]` | Omits the one governed binding record | `REJECTED` |
| B. One exact Identifier-owned record ID | Links the one governed binding exactly once | `SELECTED` |
| C. Same Identifier-owned record more than once | Duplicates the declaration reference | `REJECTED` |
| D. ImportDeclaration-owned binding record | Contradicts the fixed local-Identifier owner and references a record that does not exist | `REJECTED` |
| E. ImportClause-owned binding record | Contradicts the fixed local-Identifier owner and references a record that does not exist | `REJECTED` |
| F. NamespaceImport-owned binding record | Contradicts the fixed local-Identifier owner and references a record that does not exist | `REJECTED` |
| G. Another unrelated imported-binding record | Links a fact not belonging to the declaration | `REJECTED` |

Exactly one candidate is selected:

```text
SELECTED_LINKAGE_CANDIDATE=B
LINKAGE_FALSIFIERS=7/7 PASS
```

## 8. Owner and Linkage Separation

The three responsibilities remain distinct:

```text
ImportDeclaration
  owns IMPORT_DECLARATION

Identifier("ns")
  owns IMPORTED_BINDING

ImportDeclaration.bindingRecordIds
  references Identifier-owned IMPORTED_BINDING
```

Holding a record reference does not make the declaration the binding owner. Cross-node linkage is the governed result; no binding record is moved to simplify the reference.

```text
NAMESPACE_IMPORT_DECLARATION_OWNER=ImportDeclaration
NAMESPACE_IMPORT_BINDING_OWNER=Identifier("ns")
NAMESPACE_IMPORT_BINDING_OWNER_TRANSFERRED=false
```

## 9. Exact-Once Test

The bounded linkage result is:

```text
required namespace imported-binding count=1
Identifier-owned imported-binding record count=1
declaration binding link count=1
linked record ID matches exact Identifier-owned record ID=true
duplicate linkage=false
orphan binding record=false
```

```text
NAMESPACE_IMPORT_REQUIRED_BINDING_COUNT=1
NAMESPACE_IMPORT_IDENTIFIER_OWNED_BINDING_RECORD_COUNT=1
NAMESPACE_IMPORT_DECLARATION_BINDING_LINK_COUNT=1
NAMESPACE_IMPORT_DECLARATION_BINDING_RECORD_ID=<ROLE>:<IDENTIFIER_NS_NODE_ID>:IMPORTED_BINDING:0
NAMESPACE_IMPORT_BINDING_LINK_ORDER=TRIVIAL_SINGLE_ELEMENT_ORDER
NAMESPACE_IMPORT_BINDING_LINK_DUPLICATE=false
NAMESPACE_IMPORT_BINDING_LINK_ORPHAN=false
NEW_STRUCTURAL_DISTINCTION_REQUIRED=false
```

This exact-once linkage test does not perform the later general overlap or omission closure for the whole namespace row.

## 10. Later Values Strictly Not Reached

The following are not analysed or settled:

```text
ImportClause NodeLedger treatment=NOT_REACHED
NamespaceImport NodeLedger treatment=NOT_REACHED
Identifier("ns") NodeLedger treatment=NOT_REACHED
module-specifier NodeLedger treatment=NOT_REACHED
general namespace overlap closure=NOT_REACHED
general namespace omission closure=NOT_REACHED
dependency-edge ownership=NOT_REACHED
dependency-edge cardinality=NOT_REACHED
exports=NOT_REACHED
re-exports=NOT_REACHED
later sequence rows=NOT_REACHED
```

No child NodeLedger value or later-row value is proposed, tested, or inferred.

## 11. Documentation-Level Resume Point

Because Outcome 1 is selected:

The post-POLICY-5 namespace binding derivation may resume at ImportClause NodeLedger treatment.

This review does not resume it.

The sentence identifies only the next documentation-level position and does not analyse its value.

## 12. Outcome Decision

### Outcome 1 - exact one-record declaration linkage determined

**Selected.** Existing governance requires the namespace declaration to reference its one Identifier-owned `IMPORTED_BINDING` exactly once. Singleton order is trivial, and ordinary/type-only forms have identical linkage. No new structure is required.

### Outcome 2 - reference storage sufficient but one linkage rule unresolved

Not selected. Ownership, record identity, every-binding linkage, exact-once cardinality, singleton ordering, and type-only parity are all mechanically determined by the controlling chain.

### Outcome 3 - existing reference structure cannot express the relationship

Not selected. The existing ordered `array<recordId>` faithfully contains the exact Identifier-owned binding record reference.

## 13. Authority Boundary and Stop

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

No outcome from this review grants policy-edit, predicate, instrument, implementation-inspection, Check 5, Check 6, freeze, or acceptance Authority. No Authority is granted or implied to settle child NodeLedger treatment, perform general overlap or omission closure, or proceed to dependency edges, exports, re-exports, or later rows.

This one-record review stops after resolving `IMPORT_DECLARATION.bindingRecordIds`.