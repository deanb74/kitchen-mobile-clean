# HH-0000 Check 5 Namespace Import ImportClause NodeLedger Derivation Completion Review

**Status:** OUTCOME 1 - NAMESPACE IMPORTCLAUSE IS A STRUCTURAL CONTAINER
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
**Theory:** A visited AST constituent is a `STRUCTURAL_CONTAINER` when it is needed to reconstruct or descend governed structure but owns no independent governed semantic fact.
**Architecture:** Declaration-owned `IMPORT_DECLARATION`, Identifier-owned `IMPORTED_BINDING`, traversed `ImportClause`, structural access to `NamespaceImport`, and an `isTypeOnly` input consumed by the Identifier-owned binding record.
**Engineering:** Eight ordered questions, fixed ownership partition, type-only ownership falsifier, six candidate treatments, explicit structural-container conditions, declaration-internal falsifier, default/named consistency check, and mandatory stop before `NamespaceImport` ledger treatment.
**Milestone:** Not Applicable.
**Evidence:** The six controlling formation reviews and the fixed closed POLICY-5 identity. This review produces no policy, implementation, instrument, Check 5, Check 6, freeze, or acceptance Evidence.

## 1. Sole Question and Decision

> What exact NodeLedger treatment applies to the visited `ImportClause` node in ordinary and type-only namespace imports?

**`ImportClause` owns no governed record and uses `nonGovernedReason=STRUCTURAL_CONTAINER`. Outcome 1 is selected.**

For both forms:

```text
ImportClause:
  recordIds=[]
  nonGovernedReason=STRUCTURAL_CONTAINER
```

The node groups import-binding syntax, is required to reach `NamespaceImport` and local `Identifier("ns")`, and carries `isTypeOnly`. Its declaration fact is owned by `ImportDeclaration`; its lexical binding fact is owned by `Identifier("ns")`. Supplying one structural input to the binding payload does not make `ImportClause` a second owner.

```text
NAMESPACE_IMPORT_IMPORT_CLAUSE_RECORD_IDS=[]
NAMESPACE_IMPORT_IMPORT_CLAUSE_LEDGER_REASON=STRUCTURAL_CONTAINER
IMPORT_CLAUSE_OWNS_IMPORT_DECLARATION=false
IMPORT_CLAUSE_OWNS_IMPORTED_BINDING=false
IMPORT_CLAUSE_INDEPENDENT_GOVERNED_FACT=false
IMPORT_CLAUSE_TRAVERSAL_CONTINUES=true
IMPORT_CLAUSE_NODELEDGER_TYPE_ONLY_PARITY=PASS
NEW_STRUCTURAL_DISTINCTION_REQUIRED=false
```

## 2. Strict Boundary

This review resolves exactly:

```text
ImportClause NodeLedger treatment
```

It does not:

1. open, inspect, reconstruct, regenerate, reserialize, modify, or revalidate POLICY-5;
2. inspect governed implementation source;
3. inspect, construct, modify, validate, or execute an instrument;
4. run Check 5 or Check 6;
5. reopen either record owner, binding record ID, module, imported identity, local name, `typeOnly`, declaration kind, or declaration linkage;
6. settle or analyse `NamespaceImport` NodeLedger treatment;
7. settle or analyse local `Identifier("ns")` NodeLedger treatment;
8. settle or analyse module-specifier NodeLedger treatment;
9. perform general namespace overlap or omission closure;
10. analyse dependency-edge ownership or cardinality;
11. analyse exports, re-exports, or later sequence rows;
12. alter D4, D5, D6, predicates, terminal objects, IDs, or ordering; or
13. modify any existing policy or formation review.

Exactly this one Markdown review is created.

## 3. Controlling Evidence

| Controlling review | ImportClause-relevant result |
| --- | --- |
| `HH-0000 CHECK 5 NAMESPACE IMPORT DECLARATION BINDING LINKAGE DERIVATION COMPLETION REVIEW` | Fixes declaration ownership, Identifier binding ownership, exact cross-node linkage, and `ImportClause` NodeLedger treatment as the next documentation-level position |
| `HH-0000 CHECK 5 NAMESPACE IMPORT TYPE-ONLY DERIVATION COMPLETION REVIEW` | Establishes that `ImportClause.isTypeOnly` contributes the exact boolean used by the Identifier-owned `IMPORTED_BINDING` while leaving ledger treatment unresolved |
| `HH-0000 CHECK 5 POST-POLICY-5 NAMESPACE IMPORT BINDING OWNERSHIP AND LINKAGE DERIVATION COMPLETION REVIEW` | Fixes local `Identifier("ns")` as the most-specific lexical-binding owner and rejects ownership by `ImportDeclaration`, `ImportClause`, or `NamespaceImport` |
| `HH-0000 CHECK 5 DEFAULT IMPORT BINDING OWNERSHIP AND LINKAGE DERIVATION COMPLETION REVIEW` | Independently classifies a default-form `ImportClause` as a recordless `STRUCTURAL_CONTAINER` under the same declaration/binding ownership partition |
| `HH-0000 CHECK 5 NAMED IMPORT BINDING OWNERSHIP AND LINKAGE DERIVATION COMPLETION REVIEW` | Independently classifies ordinary and clause-level type-only named-form `ImportClause` nodes as recordless `STRUCTURAL_CONTAINER` nodes |
| `HH-0000 CHECK 5 IMPORTED IDENTITY CORRECTED CANONICAL POLICY CLOSURE REVIEW` | Closes the exact POLICY-5 identity without settling child NodeLedger treatment |

Default and named parity is supporting consistency Evidence only. The namespace `ImportClause` is tested independently against ownership and reason semantics below.

## 4. Fixed Namespace Result

The controlling policy identity is fixed:

```text
schema=HH-CHECK-5-CLOSED-MEASUREMENT-POLICY-5
canonicalByteLength=423284
canonicalSha256=78a8ece526551eaf4a00c5addbf72d71b7a17a8cfc4bb809bfc687c76a3f03cf
CORRECTED_CANONICAL_POLICY_CLOSURE=ACHIEVED
```

For the ordinary form, the fixed governed prefix is:

```text
source=import * as ns from "module";

ImportDeclaration:
  owns IMPORT_DECLARATION
  NodeKind=IMPORT
  RecordKind=IMPORT_DECLARATION
  importKind=NAMESPACE
  bindingRecordIds=[<ROLE>:<IDENTIFIER_NS_NODE_ID>:IMPORTED_BINDING:0]
  nonGovernedReason=NONE

Identifier("ns"):
  owns IMPORTED_BINDING
  recordId=<ROLE>:<IDENTIFIER_NS_NODE_ID>:IMPORTED_BINDING:0
  module="module"
  importedIdentity={kind:"MODULE_NAMESPACE_OBJECT"}
  localName="ns"
  typeOnly=false
```

For the type-only form, ownership and linkage are identical and only the fixed binding payload value changes:

```text
source=import type * as ns from "module";
IMPORTED_BINDING.typeOnly=true
IMPORTED_BINDING.typeOnly := ImportClause.isTypeOnly
```

No fixed value is reopened.

## 5. Eight Ordered Questions

### 5.1 Separate declaration fact

`ImportClause` does not introduce a second import declaration. The enclosing `ImportDeclaration` is the fixed owner of the one `IMPORT_DECLARATION` fact.

```text
QUESTION_1=NO
```

### 5.2 Namespace lexical binding fact

`ImportClause` contains binding syntax but does not itself introduce the local lexical identifier. Its descendant `NamespaceImport.name`, local `Identifier("ns")`, is the fixed most-specific node introducing that binding.

```text
QUESTION_2=NO
```

### 5.3 `IMPORT_DECLARATION` ownership

The fixed owner is `ImportDeclaration`. Containment does not transfer the declaration record to `ImportClause`.

```text
QUESTION_3=NO
IMPORT_CLAUSE_OWNS_IMPORT_DECLARATION=false
```

### 5.4 `IMPORTED_BINDING` ownership

The fixed owner is local `Identifier("ns")`. Grouping its path does not transfer the binding record to `ImportClause`.

```text
QUESTION_4=NO
IMPORT_CLAUSE_OWNS_IMPORTED_BINDING=false
```

### 5.5 Structural contribution

`ImportClause` contributes required structure:

1. it is the containing clause through which traversal reaches `NamespaceImport`;
2. `NamespaceImport` contains local `Identifier("ns")`; and
3. `ImportClause.isTypeOnly` supplies the structural boolean used to derive the Identifier-owned binding's `typeOnly` field.

```text
QUESTION_5=YES
IMPORT_CLAUSE_CONTRIBUTES_IMPORT_STRUCTURE=true
IMPORT_CLAUSE_REQUIRED_TO_REACH_NAMESPACE_IMPORT=true
IMPORT_CLAUSE_CARRIES_TYPE_ONLY_INPUT=true
```

### 5.6 Representation by fixed owners

All semantically governed information contributed through `ImportClause` is already represented without an `ImportClause`-owned record:

1. declaration form and linkage are represented by the `ImportDeclaration`-owned `IMPORT_DECLARATION`; and
2. namespace identity, local identity, module, and type-only status are represented by the Identifier-owned `IMPORTED_BINDING`.

`ImportClause` retains structural participation in the NodeLedger tree, so its traversal role is not omitted.

```text
QUESTION_6=YES
IMPORT_CLAUSE_INDEPENDENT_GOVERNED_FACT=false
```

### 5.7 Existing NodeLedger reason

The governed functional meaning of `STRUCTURAL_CONTAINER` is a traversed AST constituent needed to reconstruct or descend governed structure but having no independently governed semantic fact. `ImportClause` satisfies each part of that meaning.

```text
QUESTION_7=STRUCTURAL_CONTAINER
NAMESPACE_IMPORT_IMPORT_CLAUSE_RECORD_IDS=[]
NAMESPACE_IMPORT_IMPORT_CLAUSE_LEDGER_REASON=STRUCTURAL_CONTAINER
```

### 5.8 Ordinary/type-only parity

Changing `ImportClause.isTypeOnly` changes the `typeOnly` field on the Identifier-owned binding record. It does not create an independent `ImportClause` fact or change either fixed owner.

Both forms therefore retain identical `ImportClause` ledger treatment.

```text
QUESTION_8=PARITY_PASS
IMPORT_CLAUSE_NODELEDGER_TYPE_ONLY_PARITY=PASS
```

The review stops after question 8.

## 6. Critical Ownership Partition

The fixed partition remains:

```text
ImportDeclaration
  owns IMPORT_DECLARATION

Identifier("ns")
  owns IMPORTED_BINDING

ImportClause
  owns neither record
  contributes structural descent and isTypeOnly input
```

A container may contribute structural information to a record owned elsewhere. Ownership follows the governed semantic fact, not every AST node whose fields participate in deriving that fact.

```text
IMPORT_CLAUSE_RECORD_OWNERSHIP_TRANSFER=false
```

## 7. Type-Only Falsifier

Compare:

```ts
import * as ns from "module";
import type * as ns from "module";
```

The settled difference is:

```text
ordinary ImportClause.isTypeOnly=false
ordinary IMPORTED_BINDING.typeOnly=false

type-only ImportClause.isTypeOnly=true
type-only IMPORTED_BINDING.typeOnly=true
```

The local Identifier remains the binding owner in both forms. `isTypeOnly` is one input to its binding payload, not an independently governed `ImportClause` record.

```text
TYPE_ONLY_INPUT_CAUSES_IMPORT_CLAUSE_RECORD_OWNERSHIP=false
TYPE_ONLY_INPUT_PRESERVES_IDENTIFIER_BINDING_OWNERSHIP=true
```

The expected hypothesis is proven.

## 8. Six Candidate NodeLedger Treatments

| Candidate | Treatment | Result |
| --- | --- | --- |
| A | `ImportClause` owns `IMPORT_DECLARATION` | `REJECTED` - contradicts fixed declaration ownership |
| B | `ImportClause` owns `IMPORTED_BINDING` | `REJECTED` - contradicts fixed local-Identifier ownership |
| C | `ImportClause` owns another governed record | `REJECTED` - no independent governed semantic fact or applicable record kind is established |
| D | `recordIds=[]`, `nonGovernedReason=STRUCTURAL_CONTAINER` | `SELECTED` - exact structural participation with no independent fact |
| E | `recordIds=[]`, `nonGovernedReason=DECLARATION_INTERNAL_RECORDED_BY_OWNER` | `REJECTED` - treats a grouping path with an independently governed descendant as a consumed declaration-internal constituent |
| F | Another already-governed NodeLedger treatment | `REJECTED` - no existing reason is more specific or faithful |

Exactly one treatment is supported:

```text
SELECTED_IMPORT_CLAUSE_TREATMENT=D
IMPORT_CLAUSE_CANDIDATE_TREATMENTS=6/6 RESOLVED
```

## 9. Structural-Container Test

Each required condition is tested explicitly:

| Condition | Result |
| --- | --- |
| `visited=true` | `PASS` |
| `contributes import structure=true` | `PASS` |
| `required to reach NamespaceImport=true` | `PASS` |
| `carries isTypeOnly structural information=true` | `PASS` |
| `independently owns IMPORT_DECLARATION=false` | `PASS` |
| `independently owns IMPORTED_BINDING=false` | `PASS` |
| `independently owns another governed fact=false` | `PASS` |
| `traversal must continue=true` | `PASS` |

```text
IMPORT_CLAUSE_STRUCTURAL_CONTAINER_TEST=8/8 PASS
IMPORT_CLAUSE_TRAVERSAL_CONTINUES=true
```

## 10. Declaration-Internal Falsifier

`DECLARATION_INTERNAL_RECORDED_BY_OWNER` applies where a declaration-internal leaf or constituent has its complete governed meaning consumed by its declaration owner. Mere physical containment inside a declaration is insufficient.

`ImportClause` is instead a grouping path containing `NamespaceImport` and ultimately local `Identifier("ns")`, which owns an independent binding record. Traversal must continue through the clause to that governed descendant. Its `isTypeOnly` field also contributes to that descendant-owned record rather than being represented solely by the declaration owner.

Therefore:

```text
IMPORT_CLAUSE_DECLARATION_INTERNAL_REASON_APPLICABLE=false
IMPORT_CLAUSE_STRUCTURAL_CONTAINER_REASON_APPLICABLE=true
DECLARATION_INTERNAL_FALSIFIER=PASS
```

## 11. Default and Named Consistency Test

Default and named reviews classify `ImportClause` as `STRUCTURAL_CONTAINER`, but namespace parity is accepted only after the independent tests above establish:

1. no namespace-specific `ImportClause` record;
2. the same declaration/binding owner partition;
3. continued traversal to an independently governed local binding descendant; and
4. structural `isTypeOnly` contribution without ownership transfer.

No namespace-specific independently governed fact requires a different treatment.

```text
DEFAULT_IMPORT_CLAUSE_PARITY=PASS
NAMED_IMPORT_CLAUSE_PARITY=PASS
PARITY_ASSUMED_WITHOUT_INDEPENDENT_TEST=false
```

## 12. Ordinary and Type-Only Results

```text
ORDINARY_NAMESPACE_IMPORT_IMPORT_CLAUSE_RECORD_IDS=[]
ORDINARY_NAMESPACE_IMPORT_IMPORT_CLAUSE_LEDGER_REASON=STRUCTURAL_CONTAINER

TYPE_ONLY_NAMESPACE_IMPORT_IMPORT_CLAUSE_RECORD_IDS=[]
TYPE_ONLY_NAMESPACE_IMPORT_IMPORT_CLAUSE_LEDGER_REASON=STRUCTURAL_CONTAINER

IMPORT_CLAUSE_NODELEDGER_TYPE_ONLY_PARITY=PASS
```

Changing the structural boolean does not create a second owner or an additional record.

## 13. Later Values Strictly Not Reached

The following are not analysed or settled:

```text
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

No later child treatment or sequence value is proposed, tested, or inferred.

## 14. Documentation-Level Resume Point

Because Outcome 1 is selected:

The post-POLICY-5 namespace binding derivation may resume at NamespaceImport NodeLedger treatment.

This review does not resume it.

The sentence identifies only the next documentation-level position and does not analyse its value.

## 15. Outcome Decision

### Outcome 1 - existing structural-container treatment is exact

**Selected.** `ImportClause` is visited, carries structural import and `isTypeOnly` information, and must be traversed to the independently governed local binding descendant, but owns no independent governed fact. Both ordinary and type-only namespace forms therefore use `recordIds=[]` and `nonGovernedReason=STRUCTURAL_CONTAINER` without new structure.

### Outcome 2 - vocabulary sufficient but exact reason remains ungoverned

Not selected. Existing ownership principles and the functional reason meanings select `STRUCTURAL_CONTAINER` and reject every alternative without ambiguity.

### Outcome 3 - existing reason vocabulary is structurally insufficient

Not selected. `STRUCTURAL_CONTAINER` faithfully represents the clause's traversed grouping role and absence of independent fact.

## 16. Authority Boundary and Stop

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

No outcome from this review grants policy-edit, predicate, instrument, implementation-inspection, Check 5, Check 6, freeze, or acceptance Authority. No Authority is granted or implied to settle `NamespaceImport`, Identifier, or module-specifier NodeLedger treatment; perform general overlap or omission closure; or proceed to dependency edges, exports, re-exports, or later rows.

This one-record review stops after resolving `ImportClause` NodeLedger treatment.