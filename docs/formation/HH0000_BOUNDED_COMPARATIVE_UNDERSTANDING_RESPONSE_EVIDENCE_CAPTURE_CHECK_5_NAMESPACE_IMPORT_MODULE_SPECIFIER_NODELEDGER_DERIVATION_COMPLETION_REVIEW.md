# HH-0000 Check 5 Namespace Import Module-Specifier NodeLedger Derivation Completion Review

**Status:** OUTCOME 1 - MODULE SPECIFIER IS RECORDLESS AND RECORDED BY ITS OWNERS
**Review date:** 2026-08-15
**Review type:** Documentation-only bounded derivation completion review
**Controlling policy schema:** `HH-CHECK-5-CLOSED-MEASUREMENT-POLICY-5`
**Controlling policy canonical identity:** `423284` bytes / `78a8ece526551eaf4a00c5addbf72d71b7a17a8cfc4bb809bfc687c76a3f03cf`
**Corrected canonical-policy closure:** `ACHIEVED`
**Governed implementation-source access:** None
**Instrument access or effect:** None
**Policy effect:** None
**Predicate effect:** None
**Terminal-object effect:** None
**Check 5:** `UNMEASURED`
**Check 6:** `NOT RUN`
**Implementation:** `UNACCEPTED`
**Authority effect:** None

# Repository Traceability

**Principle:** Truth before certainty; evidence before claims; every governed fact has exactly one most-specific owner; declaration-internal syntax does not create duplicate facts; smallest justified change; human Authority.
**Theory:** A visited declaration-internal constituent whose complete governed meaning is recorded by existing owners has no independent record and uses `DECLARATION_INTERNAL_RECORDED_BY_OWNER`.
**Architecture:** `ImportDeclaration` owns `IMPORT_DECLARATION`; local `Identifier("ns")` owns `IMPORTED_BINDING`; both records represent module identity; module-specifier `StringLiteral("module")` owns no independent governed record.
**Engineering:** Seven ordered questions, module-identity representation test, structural-container falsifier, ordinary/type-only parity, explicit rejection of every alternative treatment, and mandatory stop before all later closure and sequence work.
**Milestone:** Not Applicable.
**Evidence:** The closed namespace declaration, binding, linkage, `ImportClause`, `NamespaceImport`, and Identifier formation reviews, plus the default and named module-specifier precedents. This review produces no policy, predicate, terminal-object, implementation, instrument, Check 5, Check 6, freeze, or acceptance Evidence.

## 1. Sole Question and Decision

> What exact NodeLedger treatment applies to module-specifier `StringLiteral("module")`?

**Outcome 1 is selected. The module specifier owns no governed record and uses `nonGovernedReason=DECLARATION_INTERNAL_RECORDED_BY_OWNER`.**

For both ordinary and type-only namespace imports:

```text
moduleSpecifier StringLiteral("module"):
  recordIds=[]
  nonGovernedReason=DECLARATION_INTERNAL_RECORDED_BY_OWNER
```

The node is structurally present, but it is not a `STRUCTURAL_CONTAINER` in the NodeLedger reason vocabulary. It is a declaration-internal leaf whose complete module identity is represented by existing declaration and binding records.

```text
NAMESPACE_IMPORT_MODULE_SPECIFIER_RECORD_IDS=[]
NAMESPACE_IMPORT_MODULE_SPECIFIER_LEDGER_REASON=DECLARATION_INTERNAL_RECORDED_BY_OWNER
NAMESPACE_IMPORT_MODULE_SPECIFIER_OWNS_IMPORT_DECLARATION=false
NAMESPACE_IMPORT_MODULE_SPECIFIER_OWNS_IMPORTED_BINDING=false
NAMESPACE_IMPORT_MODULE_SPECIFIER_INDEPENDENT_GOVERNED_FACT=false
NAMESPACE_IMPORT_MODULE_VALUE_ALREADY_REPRESENTED=true
NAMESPACE_IMPORT_MODULE_SPECIFIER_TYPE_ONLY_PARITY=PASS
NEW_STRUCTURAL_DISTINCTION_REQUIRED=false
```

## 2. Strict Boundary

This review resolves exactly:

```text
module-specifier NodeLedger treatment
```

It does not:

1. open, inspect, reconstruct, regenerate, reserialize, modify, or revalidate POLICY-5;
2. inspect governed implementation source;
3. inspect, construct, modify, validate, or execute an instrument;
4. run Check 5 or Check 6;
5. modify predicates or terminal objects;
6. reopen `IMPORT_DECLARATION` ownership;
7. reopen `IMPORTED_BINDING` ownership, record identity, payload, or declaration linkage;
8. reopen `ImportClause`, `NamespaceImport`, or `Identifier("ns")` NodeLedger treatment;
9. perform namespace overlap or omission closure;
10. analyse dependency edges;
11. analyse exports or re-exports;
12. analyse later sequence rows; or
13. modify any existing policy or formation review.

Exactly this one Markdown review is created.

## 3. Fixed Inputs

The controlling policy identity is fixed and is not opened or revalidated:

```text
schema=HH-CHECK-5-CLOSED-MEASUREMENT-POLICY-5
canonicalByteLength=423284
canonicalSha256=78a8ece526551eaf4a00c5addbf72d71b7a17a8cfc4bb809bfc687c76a3f03cf
CORRECTED_CANONICAL_POLICY_CLOSURE=ACHIEVED
```

The complete namespace ownership and ledger prefix is fixed:

```text
ImportDeclaration:
  owns IMPORT_DECLARATION
  module="module"

ImportClause:
  recordIds=[]
  nonGovernedReason=STRUCTURAL_CONTAINER

NamespaceImport:
  recordIds=[]
  nonGovernedReason=STRUCTURAL_CONTAINER

Identifier("ns"):
  owns IMPORTED_BINDING
  recordIds=[<ROLE>:<IDENTIFIER_NS_NODE_ID>:IMPORTED_BINDING:0]
  nonGovernedReason=NONE
  module="module"
```

The ordinary binding has `typeOnly=false`; the type-only binding has `typeOnly=true`. No fixed input is reopened.

## 4. Required Analysis

### 4.1 Does module specifier own `IMPORT_DECLARATION`?

No. `ImportDeclaration` is the fixed owner of the declaration fact. The child string supplies the declaration's module value but does not acquire the declaration record.

```text
QUESTION_1=NO
NAMESPACE_IMPORT_MODULE_SPECIFIER_OWNS_IMPORT_DECLARATION=false
```

### 4.2 Does module specifier own `IMPORTED_BINDING`?

No. Local `Identifier("ns")` is the fixed owner of the binding fact. The shared module value does not transfer binding ownership to the string literal.

```text
QUESTION_2=NO
NAMESPACE_IMPORT_MODULE_SPECIFIER_OWNS_IMPORTED_BINDING=false
```

### 4.3 Independent governed fact

The module specifier does not own an independent `LITERAL_DATA` fact or any other governed record. Its string value serves declaration and binding representation rather than an independently governed literal operation or datum.

```text
QUESTION_3=NO
NAMESPACE_IMPORT_MODULE_SPECIFIER_INDEPENDENT_GOVERNED_FACT=false
NAMESPACE_IMPORT_MODULE_SPECIFIER_OWNS_LITERAL_DATA=false
```

### 4.4 Existing module-value representation

The module value is already represented as `module="module"` in the `ImportDeclaration`-owned `IMPORT_DECLARATION` and the Identifier-owned `IMPORTED_BINDING`. Assigning a further module-identity or literal record to the module specifier would duplicate already governed meaning.

```text
QUESTION_4=YES
IMPORT_DECLARATION_MODULE_VALUE="module"
IMPORTED_BINDING_MODULE_VALUE="module"
NAMESPACE_IMPORT_MODULE_VALUE_ALREADY_REPRESENTED=true
NAMESPACE_IMPORT_MODULE_VALUE_DUPLICATE_RECORD_REQUIRED=false
```

### 4.5 Exact non-governed reason

`DECLARATION_INTERNAL_RECORDED_BY_OWNER` applies because the visited module-specifier leaf is internal to the import declaration and its complete governed meaning is recorded by the declaration and binding owners.

Unlike `ImportClause` and `NamespaceImport`, the string literal is not a grouping path through which traversal reaches an independently governed descendant. Therefore `STRUCTURAL_CONTAINER` is not the exact reason.

```text
QUESTION_5=DECLARATION_INTERNAL_RECORDED_BY_OWNER
NAMESPACE_IMPORT_MODULE_SPECIFIER_RECORD_IDS=[]
NAMESPACE_IMPORT_MODULE_SPECIFIER_LEDGER_REASON=DECLARATION_INTERNAL_RECORDED_BY_OWNER
```

### 4.6 Ordinary/type-only parity

Compare:

```ts
import * as ns from "module";
import type * as ns from "module";
```

Both forms retain the same module-specifier `StringLiteral("module")`. The type-only distinction lives on `ImportClause` and changes only the binding record's `typeOnly` payload. It does not change module identity, ownership, or module-specifier ledger treatment.

```text
QUESTION_6=PARITY_PASS
ORDINARY_NAMESPACE_IMPORT_MODULE_SPECIFIER_RECORD_IDS=[]
ORDINARY_NAMESPACE_IMPORT_MODULE_SPECIFIER_LEDGER_REASON=DECLARATION_INTERNAL_RECORDED_BY_OWNER
TYPE_ONLY_NAMESPACE_IMPORT_MODULE_SPECIFIER_RECORD_IDS=[]
TYPE_ONLY_NAMESPACE_IMPORT_MODULE_SPECIFIER_LEDGER_REASON=DECLARATION_INTERNAL_RECORDED_BY_OWNER
NAMESPACE_IMPORT_MODULE_SPECIFIER_TYPE_ONLY_PARITY=PASS
```

### 4.7 Alternative-treatment resolution

Every alternative is tested in section 7. Exactly one is supported.

```text
QUESTION_7=EXACTLY_ONE_SUPPORTED
```

The review stops after question 7.

## 5. Module-Identity Representation Test

The same source module identity participates in two already governed facts:

```text
IMPORT_DECLARATION.module="module"
IMPORTED_BINDING.module="module"
```

Those appearances do not create two owners for one record. They are fields on two different governed facts: the declaration and its local binding. The module-specifier syntax supplies the value used by both, but owns neither record and introduces no third fact.

```text
MODULE_SPECIFIER_SUPPLIES_EXISTING_FIELDS=true
MODULE_SPECIFIER_ACQUIRES_EXISTING_RECORD_OWNERSHIP=false
MODULE_SPECIFIER_THIRD_GOVERNED_FACT=false
MODULE_IDENTITY_REPRESENTATION_TEST=PASS
```

## 6. Reason Falsifiers

### 6.1 `STRUCTURAL_CONTAINER`

The module specifier is structurally present, but it does not group child syntax or provide a traversal path to an independently governed descendant. Its complete governed meaning is consumed by existing record owners.

```text
MODULE_SPECIFIER_STRUCTURAL_CONTAINER_REASON_APPLICABLE=false
```

### 6.2 `TYPE_NODE_RECORDED_BY_OWNER`

The module-specifier string literal is not a type node.

```text
MODULE_SPECIFIER_TYPE_NODE_REASON_APPLICABLE=false
```

### 6.3 `TOKEN_OR_TRIVIA_EXCLUDED`

The module specifier is a visited `StringLiteral` AST node, not token or trivia.

```text
MODULE_SPECIFIER_TOKEN_OR_TRIVIA_REASON_APPLICABLE=false
```

### 6.4 `NONE`

The node owns no record, so `NONE` would fail to explain its recordless treatment. Its exact non-governed reason is available and required.

```text
MODULE_SPECIFIER_NONE_REASON_APPLICABLE=false
```

```text
MODULE_SPECIFIER_REASON_FALSIFIERS=4/4 PASS
```

## 7. Alternative Treatments

| Candidate | Treatment | Result |
| --- | --- | --- |
| A | Module specifier owns `IMPORT_DECLARATION` | `REJECTED` - declaration ownership is fixed on `ImportDeclaration` |
| B | Module specifier owns `IMPORTED_BINDING` | `REJECTED` - binding ownership is fixed on local `Identifier("ns")` |
| C | Module specifier owns `LITERAL_DATA` | `REJECTED` - no independent literal fact exists for this declaration-internal value |
| D | Module specifier owns another governed record | `REJECTED` - no additional independently governed fact is established |
| E | `recordIds=[]`, `nonGovernedReason=DECLARATION_INTERNAL_RECORDED_BY_OWNER` | `SELECTED` - complete module meaning is represented by existing owners |
| F | `recordIds=[]`, `nonGovernedReason=STRUCTURAL_CONTAINER` | `REJECTED` - the leaf is not a grouping or descent path to a governed descendant |
| G | `recordIds=[]`, `nonGovernedReason=TYPE_NODE_RECORDED_BY_OWNER` | `REJECTED` - the string literal is not a type node |
| H | `recordIds=[]`, `nonGovernedReason=TOKEN_OR_TRIVIA_EXCLUDED` | `REJECTED` - the string literal is neither token nor trivia |
| I | `recordIds=[]`, `nonGovernedReason=NONE` | `REJECTED` - a recordless visited node requires its faithful existing reason |
| J | Another already-governed treatment | `REJECTED` - no existing treatment is more exact than declaration-internal meaning recorded by owners |

Exactly one treatment is supported:

```text
SELECTED_NAMESPACE_IMPORT_MODULE_SPECIFIER_TREATMENT=E
NAMESPACE_IMPORT_MODULE_SPECIFIER_CANDIDATE_TREATMENTS=10/10 RESOLVED
```

## 8. Default and Named Consistency

Default and named import reviews independently apply the same exact treatment to module-specifier `StringLiteral("module")`:

```text
recordIds=[]
nonGovernedReason=DECLARATION_INTERNAL_RECORDED_BY_OWNER
```

Namespace import is not resolved by analogy alone. The ownership, module-representation, independent-fact, and reason tests above establish the treatment independently; default and named results confirm consistency.

```text
DEFAULT_MODULE_SPECIFIER_PARITY=PASS
NAMED_MODULE_SPECIFIER_PARITY=PASS
PARITY_ASSUMED_WITHOUT_NAMESPACE_TEST=false
```

## 9. Outcome Decision

### Outcome 1 - module specifier is recordless with the correct existing reason

**Selected.** Module-specifier `StringLiteral("module")` owns no governed record and uses `nonGovernedReason=DECLARATION_INTERNAL_RECORDED_BY_OWNER` in both ordinary and type-only namespace imports. Existing structure represents module identity faithfully.

### Outcome 2 - module representation exists but exact ledger treatment is unresolved

Not selected. Existing reason semantics and independently consistent import precedents determine the exact treatment.

### Outcome 3 - existing structure cannot faithfully represent module identity

Not selected. The declaration and binding records represent module identity, while the module-specifier ledger entry faithfully accounts for the recordless syntax node.

## 10. Later Values Strictly Not Reached

```text
general namespace overlap closure=NOT_REACHED
general namespace omission closure=NOT_REACHED
dependency-edge ownership=NOT_REACHED
dependency-edge cardinality=NOT_REACHED
exports=NOT_REACHED
re-exports=NOT_REACHED
later sequence rows=NOT_REACHED
```

No overlap, omission, dependency, export, re-export, or later-row value is proposed, tested, or inferred. This review establishes no downstream resume point.

## 11. Authority Boundary and Stop

```text
candidate-construction Authority=NONE
canonical-policy-edit Authority=NONE
predicate Authority=NONE
terminal-object Authority=NONE
instrument Authority=NONE
implementation-inspection Authority=NONE
Check 5 Authority=NONE
Check 6 Authority=NONE
freeze Authority=NONE
acceptance Authority=NONE
```

No outcome from this review grants policy-edit, predicate, terminal-object, instrument, implementation-inspection, Check 5, Check 6, freeze, or acceptance Authority. No Authority is granted or implied to perform overlap, omission, dependency, export, re-export, or later sequence work.

This one-value review stops after resolving module-specifier NodeLedger treatment.