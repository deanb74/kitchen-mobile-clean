# HH-0000 Check 5 Namespace Import NamespaceImport NodeLedger Derivation Completion Review

**Status:** OUTCOME 1 - NAMESPACEIMPORT IS A STRUCTURAL CONTAINER
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

**Principle:** Truth before certainty; evidence before claims; one governed fact has one most-specific owner; structural contribution does not transfer semantic ownership; smallest justified change; human Authority.
**Theory:** A visited AST constituent is a `STRUCTURAL_CONTAINER` when it is required to reconstruct or descend governed structure but owns no independently governed semantic fact.
**Architecture:** Declaration-owned `IMPORT_DECLARATION`, Identifier-owned `IMPORTED_BINDING`, fixed recordless `ImportClause`, traversed `NamespaceImport`, and local binding `Identifier("ns")` as the independently governed descendant.
**Engineering:** Nine ordered questions, fixed ownership partition, semantic-representation and Identifier-owner falsifiers, nine candidate treatments, explicit reason falsifiers, ordinary/type-only parity, and mandatory stop before Identifier ledger treatment.
**Milestone:** Not Applicable.
**Evidence:** The seven controlling formation reviews and the fixed closed POLICY-5 identity. This review produces no policy, implementation, instrument, Check 5, Check 6, freeze, or acceptance Evidence.

## 1. Sole Question and Decision

> What exact NodeLedger treatment applies to the visited `NamespaceImport` node?

**`NamespaceImport` owns no governed record and uses `nonGovernedReason=STRUCTURAL_CONTAINER`. Outcome 1 is selected.**

For both ordinary and type-only namespace imports:

```text
NamespaceImport:
  recordIds=[]
  nonGovernedReason=STRUCTURAL_CONTAINER
```

`NamespaceImport` represents the namespace-binding form structurally and contains local `Identifier("ns")`. The declaration form is already represented by `IMPORT_DECLARATION.importKind=NAMESPACE`, while namespace imported identity is already represented by `importedIdentity={kind:"MODULE_NAMESPACE_OBJECT"}` on the Identifier-owned binding record. Traversal continues through `NamespaceImport`, but no independently governed fact remains for it to own.

```text
NAMESPACE_IMPORT_NAMESPACE_IMPORT_RECORD_IDS=[]
NAMESPACE_IMPORT_NAMESPACE_IMPORT_LEDGER_REASON=STRUCTURAL_CONTAINER
NAMESPACE_IMPORT_NODE_OWNS_IMPORT_DECLARATION=false
NAMESPACE_IMPORT_NODE_OWNS_IMPORTED_BINDING=false
NAMESPACE_IMPORT_NODE_INDEPENDENT_GOVERNED_FACT=false
NAMESPACE_IMPORT_NODE_TRAVERSAL_CONTINUES=true
NAMESPACE_IMPORT_NODE_TYPE_ONLY_PARITY=PASS
NEW_STRUCTURAL_DISTINCTION_REQUIRED=false
```

## 2. Strict Boundary

This review resolves exactly:

```text
NamespaceImport NodeLedger treatment
```

It does not:

1. open, inspect, reconstruct, regenerate, reserialize, modify, or revalidate POLICY-5;
2. inspect governed implementation source;
3. inspect, construct, modify, validate, or execute an instrument;
4. run Check 5 or Check 6;
5. reopen the `IMPORT_DECLARATION` owner;
6. reopen the `IMPORTED_BINDING` owner, binding record ID, module, imported identity, local name, or `typeOnly`;
7. reopen `IMPORT_DECLARATION.importKind` or `IMPORT_DECLARATION.bindingRecordIds`;
8. reopen `ImportClause` NodeLedger treatment;
9. settle or analyse local `Identifier("ns")` NodeLedger treatment;
10. settle or analyse module-specifier NodeLedger treatment;
11. perform general namespace overlap or omission closure;
12. analyse dependency-edge ownership or cardinality;
13. analyse exports, re-exports, or later sequence rows;
14. alter D4, D5, D6, predicates, terminal objects, IDs, or ordering; or
15. modify any existing policy or formation review.

Exactly this one Markdown review is created.

## 3. Controlling Evidence

| Controlling review | NamespaceImport-relevant result |
| --- | --- |
| `HH-0000 CHECK 5 NAMESPACE IMPORT IMPORTCLAUSE NODELEDGER DERIVATION COMPLETION REVIEW` | Fixes `ImportClause` as a recordless `STRUCTURAL_CONTAINER` and establishes `NamespaceImport` NodeLedger treatment as the sole next position |
| `HH-0000 CHECK 5 NAMESPACE IMPORT DECLARATION BINDING LINKAGE DERIVATION COMPLETION REVIEW` | Fixes `ImportDeclaration` ownership, local-Identifier binding ownership, and the exact cross-node binding link |
| `HH-0000 CHECK 5 NAMESPACE IMPORT TYPE-ONLY DERIVATION COMPLETION REVIEW` | Fixes `IMPORTED_BINDING.typeOnly := ImportClause.isTypeOnly` while preserving the same namespace subtree |
| `HH-0000 CHECK 5 POST-POLICY-5 NAMESPACE IMPORT BINDING OWNERSHIP AND LINKAGE DERIVATION COMPLETION REVIEW` | Fixes local `Identifier("ns")` as the most-specific lexical-binding owner and describes `NamespaceImport` as grouping namespace-binding syntax |
| `HH-0000 CHECK 5 DEFAULT IMPORT BINDING OWNERSHIP AND LINKAGE DERIVATION COMPLETION REVIEW` | Establishes that grouping syntax does not displace the most-specific local binding Identifier as owner |
| `HH-0000 CHECK 5 NAMED IMPORT BINDING OWNERSHIP AND LINKAGE DERIVATION COMPLETION REVIEW` | Establishes the same ownership principle and classifies grouping nodes with independently governed descendants as `STRUCTURAL_CONTAINER` |
| `HH-0000 CHECK 5 IMPORTED IDENTITY CORRECTED CANONICAL POLICY CLOSURE REVIEW` | Closes the exact POLICY-5 identity and the namespace imported-identity variant without settling child NodeLedger treatment |

Default and named import results supply an ownership principle, not an assumed node analogy. `NamespaceImport` is tested independently below.

## 4. Fixed Namespace Result

The controlling policy identity is fixed and is not opened or revalidated:

```text
schema=HH-CHECK-5-CLOSED-MEASUREMENT-POLICY-5
canonicalByteLength=423284
canonicalSha256=78a8ece526551eaf4a00c5addbf72d71b7a17a8cfc4bb809bfc687c76a3f03cf
CORRECTED_CANONICAL_POLICY_CLOSURE=ACHIEVED
```

For the ordinary form, the complete governed prefix is fixed:

```text
source=import * as ns from "module";

ImportDeclaration:
  owns IMPORT_DECLARATION
  NodeKind=IMPORT
  RecordKind=IMPORT_DECLARATION
  importKind=NAMESPACE
  bindingRecordIds=[<ROLE>:<IDENTIFIER_NS_NODE_ID>:IMPORTED_BINDING:0]
  nonGovernedReason=NONE

ImportClause:
  recordIds=[]
  nonGovernedReason=STRUCTURAL_CONTAINER

Identifier("ns"):
  owns IMPORTED_BINDING
  recordId=<ROLE>:<IDENTIFIER_NS_NODE_ID>:IMPORTED_BINDING:0
  module="module"
  importedIdentity={kind:"MODULE_NAMESPACE_OBJECT"}
  localName="ns"
  typeOnly=false
```

For the type-only form, ownership, record ID, declaration linkage, and `ImportClause` treatment remain identical:

```text
source=import type * as ns from "module";
IMPORTED_BINDING.typeOnly=true
IMPORTED_BINDING.typeOnly := ImportClause.isTypeOnly
```

No fixed input is reopened.

## 5. Nine Ordered Questions

### 5.1 Declaration fact

`NamespaceImport` does not introduce the import declaration. The enclosing `ImportDeclaration` is the fixed owner of the one `IMPORT_DECLARATION` fact.

```text
QUESTION_1=NO
```

### 5.2 Lexical binding fact

`NamespaceImport` groups namespace-binding syntax and contains its `name`. Its child local `Identifier("ns")` is already fixed as the most-specific AST node introducing the lexical binding fact.

```text
QUESTION_2=IDENTIFIER_NS
```

### 5.3 `IMPORT_DECLARATION` ownership

The fixed owner is `ImportDeclaration`. Namespace syntax does not transfer its declaration record to `NamespaceImport`.

```text
QUESTION_3=NO
NAMESPACE_IMPORT_NODE_OWNS_IMPORT_DECLARATION=false
```

### 5.4 `IMPORTED_BINDING` ownership

The fixed owner is local `Identifier("ns")`. Containing that Identifier does not transfer its binding record to `NamespaceImport`.

```text
QUESTION_4=NO
NAMESPACE_IMPORT_NODE_OWNS_IMPORTED_BINDING=false
```

### 5.5 Structural requirement and descent

`NamespaceImport` is required to represent the namespace-binding structural form and is the traversed parent through which the ledger reaches local `Identifier("ns")`.

```text
QUESTION_5=YES
NAMESPACE_IMPORT_NODE_REPRESENTS_NAMESPACE_BINDING_STRUCTURE=true
NAMESPACE_IMPORT_NODE_REQUIRED_TO_REACH_IDENTIFIER=true
```

### 5.6 Existing semantic representation

The two namespace-specific semantic contributions are already represented by their fixed owners:

```text
IMPORT_DECLARATION.importKind=NAMESPACE
IMPORTED_BINDING.importedIdentity={kind:"MODULE_NAMESPACE_OBJECT"}
```

The first belongs to the `ImportDeclaration`-owned declaration record. The second belongs to the Identifier-owned binding record.

```text
QUESTION_6=YES
NAMESPACE_DECLARATION_FORM_ALREADY_REPRESENTED=true
NAMESPACE_IMPORTED_IDENTITY_ALREADY_REPRESENTED=true
```

### 5.7 Independent governed fact

After declaration form, imported identity, local identity, module, type-only status, and linkage are accounted for by the fixed records, `NamespaceImport` retains no independently governed semantic fact. Its remaining function is structural grouping and descent.

```text
QUESTION_7=NO
NAMESPACE_IMPORT_NODE_INDEPENDENT_GOVERNED_FACT=false
```

### 5.8 Existing NodeLedger reason

The governed meaning of `STRUCTURAL_CONTAINER` is a visited AST constituent required to reconstruct or descend governed structure but having no independently governed semantic fact. `NamespaceImport` satisfies every part of that meaning.

```text
QUESTION_8=STRUCTURAL_CONTAINER
NAMESPACE_IMPORT_NAMESPACE_IMPORT_RECORD_IDS=[]
NAMESPACE_IMPORT_NAMESPACE_IMPORT_LEDGER_REASON=STRUCTURAL_CONTAINER
```

### 5.9 Ordinary/type-only parity

The ordinary and type-only forms retain the same subtree:

```text
NamespaceImport
  name: Identifier("ns")
```

The type-only distinction lives on the containing `ImportClause`. It changes the Identifier-owned binding payload but neither creates a `NamespaceImport` fact nor changes traversal.

```text
QUESTION_9=PARITY_PASS
NAMESPACE_IMPORT_NODE_TYPE_ONLY_PARITY=PASS
```

The review stops after question 9.

## 6. Critical Ownership Partition

The fixed partition remains:

```text
ImportDeclaration
  owns IMPORT_DECLARATION

Identifier("ns")
  owns IMPORTED_BINDING

ImportClause
  recordIds=[]
  nonGovernedReason=STRUCTURAL_CONTAINER

NamespaceImport
  recordIds=[]
  nonGovernedReason=STRUCTURAL_CONTAINER
```

The existence of `NamespaceImport` syntax does not displace the fixed most-specific Identifier owner. A structural node may determine or constrain values owned elsewhere without acquiring a separate record.

```text
NAMESPACE_IMPORT_NODE_RECORD_OWNERSHIP_TRANSFER=false
```

## 7. Namespace Semantic-Representation Test

`NamespaceImport` constrains two governed semantic values:

1. it identifies the declaration form represented by `IMPORT_DECLARATION.importKind=NAMESPACE`; and
2. it identifies the imported semantic object represented by `IMPORTED_BINDING.importedIdentity={kind:"MODULE_NAMESPACE_OBJECT"}`.

Assigning `IMPORT_DECLARATION` to `NamespaceImport` would duplicate declaration-form semantics already owned by `ImportDeclaration`. Assigning `IMPORTED_BINDING` or another namespace-identity record to it would duplicate imported-identity semantics already owned by local `Identifier("ns")`.

```text
NAMESPACE_DECLARATION_SEMANTICS_DUPLICATED=false
NAMESPACE_IMPORTED_IDENTITY_SEMANTICS_DUPLICATED=false
ADDITIONAL_NAMESPACE_IMPORT_RECORD_REQUIRED=false
SEMANTIC_REPRESENTATION_TEST=PASS
```

## 8. Identifier-Owner Falsifier

Candidate interpretation A says `NamespaceImport` owns `IMPORTED_BINDING`. Candidate interpretation B says local `Identifier("ns")` owns `IMPORTED_BINDING`.

Interpretation B is fixed. Interpretation A could survive only if `NamespaceImport` owned an additional, different governed fact. Questions 5 through 7 establish that its remaining role is structural and that no additional fact exists.

```text
IDENTIFIER_OWNER_INTERPRETATION=B
NAMESPACE_IMPORT_ADDITIONAL_DIFFERENT_FACT=false
IDENTIFIER_OWNER_FALSIFIER=PASS
```

Identifier ownership is not reopened, and Identifier NodeLedger treatment is not analysed.

## 9. Structural-Container Test

| Condition | Result |
| --- | --- |
| `visited=true` | `PASS` |
| `represents namespace-binding structural form=true` | `PASS` |
| `contains local binding Identifier=true` | `PASS` |
| `required to reach Identifier("ns")=true` | `PASS` |
| `IMPORT_DECLARATION owner=ImportDeclaration` | `PASS` |
| `IMPORTED_BINDING owner=Identifier("ns")` | `PASS` |
| `namespace declaration form already represented by importKind=NAMESPACE` | `PASS` |
| `namespace imported identity already represented by importedIdentity={kind:"MODULE_NAMESPACE_OBJECT"}` | `PASS` |
| `independent governed fact=false` | `PASS` |
| `traversal continues to Identifier=true` | `PASS` |

```text
NAMESPACE_IMPORT_NODE_STRUCTURAL_CONTAINER_TEST=10/10 PASS
NAMESPACE_IMPORT_NODE_TRAVERSAL_CONTINUES=true
```

The exact treatment follows:

```text
NamespaceImport:
  recordIds=[]
  nonGovernedReason=STRUCTURAL_CONTAINER
```

## 10. Declaration-Internal Falsifier

`DECLARATION_INTERNAL_RECORDED_BY_OWNER` applies to a declaration-internal constituent whose complete governed meaning is consumed by the declaration owner. Mere containment inside `ImportDeclaration` is insufficient.

`NamespaceImport` is instead a grouping node through which traversal reaches local `Identifier("ns")`, an independently governed descendant owning `IMPORTED_BINDING`. Its namespace imported-identity contribution is represented by that descendant-owned record, not consumed completely by the declaration owner.

Therefore:

```text
NAMESPACE_IMPORT_DECLARATION_INTERNAL_REASON_APPLICABLE=false
NAMESPACE_IMPORT_STRUCTURAL_CONTAINER_REASON_APPLICABLE=true
DECLARATION_INTERNAL_FALSIFIER=PASS
```

## 11. Type-Node and Token Falsifiers

`NamespaceImport` is not a type-node constituent. It groups import-binding syntax in both ordinary and type-only imports, while type-only status resides on the containing `ImportClause`.

`NamespaceImport` is also not token or trivia. It is a visited AST grouping node containing local `Identifier("ns")` and required for structural reconstruction and descent.

```text
NAMESPACE_IMPORT_TYPE_NODE_REASON_APPLICABLE=false
NAMESPACE_IMPORT_TOKEN_OR_TRIVIA_REASON_APPLICABLE=false
TYPE_NODE_FALSIFIER=PASS
TOKEN_OR_TRIVIA_FALSIFIER=PASS
```

## 12. `NONE` Falsifier

`NamespaceImport` owns no governed record. For a recordless visited node, `NONE` would fail to account for why the node has no record. It cannot be used as a default in place of the exact non-governed reason.

```text
NAMESPACE_IMPORT_NONE_REASON_APPLICABLE=false
NONE_FALSIFIER=PASS
```

## 13. Default and Named Consistency

No default or named-import node is assumed to be equivalent to `NamespaceImport`. Their controlling principle is applied independently: grouping syntax does not displace the most-specific local binding Identifier as owner.

The namespace-specific tests establish the same result independently. `NamespaceImport` groups syntax, traversal continues to the Identifier owner, and its semantic contributions are represented by records owned elsewhere.

```text
GROUPING_DOES_NOT_DISPLACE_IDENTIFIER_OWNER=true
ANALOGY_FORCED=false
DEFAULT_NAMED_PRINCIPLE_TEST=PASS
```

## 14. Ordinary and Type-Only Results

For:

```ts
import * as ns from "module";
```

and:

```ts
import type * as ns from "module";
```

the `NamespaceImport` subtree is structurally identical. The only fixed difference is `ImportClause.isTypeOnly`, represented in the Identifier-owned binding's `typeOnly` field.

```text
ORDINARY_NAMESPACE_IMPORT_NAMESPACE_IMPORT_RECORD_IDS=[]
ORDINARY_NAMESPACE_IMPORT_NAMESPACE_IMPORT_LEDGER_REASON=STRUCTURAL_CONTAINER

TYPE_ONLY_NAMESPACE_IMPORT_NAMESPACE_IMPORT_RECORD_IDS=[]
TYPE_ONLY_NAMESPACE_IMPORT_NAMESPACE_IMPORT_LEDGER_REASON=STRUCTURAL_CONTAINER

NAMESPACE_IMPORT_NODE_TYPE_ONLY_PARITY=PASS
```

## 15. Nine Candidate NodeLedger Treatments

| Candidate | Treatment | Result |
| --- | --- | --- |
| A | `NamespaceImport` owns `IMPORT_DECLARATION` | `REJECTED` - contradicts fixed declaration ownership and duplicates declaration-form semantics |
| B | `NamespaceImport` owns `IMPORTED_BINDING` | `REJECTED` - contradicts fixed local-Identifier ownership and duplicates imported-identity semantics |
| C | `NamespaceImport` owns another governed record | `REJECTED` - no additional independently governed fact or applicable record kind is established |
| D | `recordIds=[]`, `nonGovernedReason=STRUCTURAL_CONTAINER` | `SELECTED` - exact traversed grouping role with no independent fact |
| E | `recordIds=[]`, `nonGovernedReason=DECLARATION_INTERNAL_RECORDED_BY_OWNER` | `REJECTED` - traversal continues through it to an independently governed descendant |
| F | `recordIds=[]`, `nonGovernedReason=TYPE_NODE_RECORDED_BY_OWNER` | `REJECTED` - `NamespaceImport` is not a type node |
| G | `recordIds=[]`, `nonGovernedReason=TOKEN_OR_TRIVIA_EXCLUDED` | `REJECTED` - `NamespaceImport` is neither token nor trivia |
| H | `recordIds=[]`, `nonGovernedReason=NONE` | `REJECTED` - a recordless visited node requires its faithful non-governed reason |
| I | Another already-governed treatment | `REJECTED` - no existing treatment is more specific or faithful |

Exactly one treatment is supported:

```text
SELECTED_NAMESPACE_IMPORT_NODE_TREATMENT=D
NAMESPACE_IMPORT_NODE_CANDIDATE_TREATMENTS=9/9 RESOLVED
```

## 16. Later Values Strictly Not Reached

The following are not analysed or settled:

```text
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

No Identifier, module-specifier, overlap, omission, dependency, export, re-export, or later-row value is proposed, tested, or inferred.

## 17. Documentation-Level Resume Point

Because Outcome 1 is selected:

The post-POLICY-5 namespace binding derivation may resume at Identifier("ns") NodeLedger treatment.

This review does not resume it.

The sentence identifies only the next documentation-level position and does not analyse its value.

## 18. Outcome Decision

### Outcome 1 - existing structural-container treatment is exact

**Selected.** `NamespaceImport` is visited, represents namespace-binding structure, and must be traversed to local `Identifier("ns")`, but it owns no independent governed fact. Both ordinary and type-only namespace imports therefore use `recordIds=[]` and `nonGovernedReason=STRUCTURAL_CONTAINER` without new structure.

### Outcome 2 - vocabulary sufficient but exact treatment remains ungoverned

Not selected. Existing ownership rules, fixed semantic representations, and functional reason meanings determine `STRUCTURAL_CONTAINER` without an unresolved choice.

### Outcome 3 - existing vocabulary is structurally insufficient

Not selected. `STRUCTURAL_CONTAINER` faithfully represents the node's traversed grouping role and absence of an independent governed fact.

## 19. Authority Boundary and Stop

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

No outcome from this review grants policy-edit, predicate, instrument, implementation-inspection, Check 5, Check 6, freeze, or acceptance Authority. No Authority is granted or implied to settle Identifier or module-specifier NodeLedger treatment; perform general overlap or omission closure; or proceed to dependency edges, exports, re-exports, or later rows.

This one-value review stops after resolving `NamespaceImport` NodeLedger treatment.