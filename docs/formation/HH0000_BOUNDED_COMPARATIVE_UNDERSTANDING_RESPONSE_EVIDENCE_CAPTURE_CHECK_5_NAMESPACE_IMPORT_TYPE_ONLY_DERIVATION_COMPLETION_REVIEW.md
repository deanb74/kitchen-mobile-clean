# HH-0000 Check 5 Namespace Import Type-Only Derivation Completion Review

**Status:** OUTCOME 1 - NAMESPACE IMPORT TYPE-ONLY DERIVATION DETERMINISTIC
**Review date:** 2026-08-15
**Review type:** Documentation-only bounded semantic and derivation completion review
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

**Principle:** Truth before certainty; evidence before claims; derive semantic values from exact structure rather than source-spelling analogy; smallest justified change; human Authority.
**Theory:** A binding's type-only status is deterministic when an existing compiler AST exposes one exact boolean distinction whose meaning matches the existing governed `typeOnly:boolean` field.
**Architecture:** Fixed POLICY-5 namespace binding prefix, shared `ImportClause.isTypeOnly` distinction, unchanged `NamespaceImport` binding structure, and no new policy structure.
**Engineering:** Five controlling formation reviews, two isolated synthetic TypeScript 5.9.3 parses, parse-diagnostic checks, exact SyntaxKind and field comparison, named-import non-transfer test, seven ordered questions, and mandatory stop before declaration linkage.
**Milestone:** Not Applicable.
**Evidence:** Existing formation governance plus one synthetic AST-form determination limited to the two supplied source snippets. No governed source, repository implementation, instrument, Check 5, Check 6, policy payload, freeze, or acceptance Evidence is inspected or produced.

## 1. Sole Question and Decision

> Can `IMPORTED_BINDING.typeOnly` for namespace imports be deterministically derived from existing TypeScript AST form and existing governed formation semantics using the already-existing boolean field?

**Yes. Outcome 1 is selected.**

Both ordinary and type-only namespace imports are valid TypeScript 5.9.3 syntax and have the same binding structure. The exact structural distinction is the existing boolean `ImportClause.isTypeOnly`:

```text
import * as ns from "module";
=> ImportClause.isTypeOnly=false
=> IMPORTED_BINDING.typeOnly=false

import type * as ns from "module";
=> ImportClause.isTypeOnly=true
=> IMPORTED_BINDING.typeOnly=true
```

The derivation rule is therefore:

```text
NAMESPACE_IMPORT_TYPE_ONLY_DERIVATION=IMPORTED_BINDING.typeOnly := ImportClause.isTypeOnly
ORDINARY_NAMESPACE_IMPORT_TYPE_ONLY=false
TYPE_ONLY_NAMESPACE_IMPORT_TYPE_ONLY=true
NEW_STRUCTURAL_DISTINCTION_REQUIRED=false
```

## 2. Strict Boundary

This review resolves exactly the first unresolved value from the post-POLICY-5 namespace derivation:

```text
IMPORTED_BINDING.typeOnly
```

It does not:

1. open, inspect, reconstruct, regenerate, reserialize, modify, or revalidate POLICY-5;
2. inspect either governed implementation source;
3. inspect, construct, modify, validate, or execute an instrument;
4. run repository implementation, Check 5, or Check 6;
5. reopen the settled namespace binding owner, record ID, module, imported identity, or local name;
6. settle or analyse `IMPORT_DECLARATION.bindingRecordIds`;
7. settle or analyse `ImportClause`, `NamespaceImport`, local-Identifier, or module-specifier NodeLedger treatment;
8. perform overlap or omission closure;
9. proceed to dependency edges, exports, re-exports, or later rows;
10. alter D4, D5, D6, predicates, terminal objects, IDs, or ordering; or
11. modify any existing policy or formation review.

Exactly this one Markdown review is created.

## 3. Controlling Evidence

| Controlling review | Type-only-relevant result |
| --- | --- |
| `HH-0000 CHECK 5 POST-POLICY-5 NAMESPACE IMPORT BINDING OWNERSHIP AND LINKAGE DERIVATION COMPLETION REVIEW` | Settles the namespace binding prefix through `localName="ns"` and identifies `IMPORTED_BINDING.typeOnly` as the sole first unresolved mandatory value |
| `HH-0000 CHECK 5 NAMED IMPORT BINDING OWNERSHIP AND LINKAGE DERIVATION COMPLETION REVIEW` | Establishes that the exact import AST form, not imported/local spelling, determines `typeOnly`; named value form maps to `false` and clause-level named `import type` maps to `true` |
| `HH-0000 CHECK 5 DEFAULT IMPORT BINDING OWNERSHIP AND LINKAGE DERIVATION COMPLETION REVIEW` | Establishes `typeOnly=false` for its tested ordinary default value-import form while preserving `typeOnly` as independent from module and local identity |
| `HH-0000 CHECK 5 MODULE NAMESPACE IMPORTED BINDING IDENTITY STRUCTURAL COMPLETION REVIEW` | Establishes that the existing independent `typeOnly:boolean` field is structurally part of namespace binding round-trip semantics but deliberately leaves its namespace derivation unsettled |
| `HH-0000 CHECK 5 IMPORTED IDENTITY CORRECTED CANONICAL POLICY CLOSURE REVIEW` | Closes the exact POLICY-5 identity without settling namespace `typeOnly` or any later linkage and ledger values |

The named-import result is used as a semantic precedent and falsifier only. It is not transferred to namespace imports until the synthetic AST check proves that the same `ImportClause.isTypeOnly` distinction applies to `NamespaceImport`.

## 4. Fixed Namespace Prefix

The following values are inherited without reopening:

```text
source form=import * as ns from "module";
binding owner=LOCAL_BINDING_IDENTIFIER
binding recordId=<ROLE>:<IDENTIFIER_NS_NODE_ID>:IMPORTED_BINDING:0
module="module"
importedIdentity={kind:"MODULE_NAMESPACE_OBJECT"}
localName="ns"
typeOnly=<SOLE_UNRESOLVED_VALUE_BEFORE_THIS_REVIEW>
```

The controlling policy identity is fixed as:

```text
schema=HH-CHECK-5-CLOSED-MEASUREMENT-POLICY-5
canonicalByteLength=423284
canonicalSha256=78a8ece526551eaf4a00c5addbf72d71b7a17a8cfc4bb809bfc687c76a3f03cf
CORRECTED_CANONICAL_POLICY_CLOSURE=ACHIEVED
```

## 5. Bounded Synthetic AST-Form Evidence

Existing formation Evidence determines the semantic meaning of `typeOnly` but does not itself record the namespace-specific TypeScript AST field relationship. The review therefore uses the expressly permitted synthetic determination.

The check:

1. used the installed TypeScript compiler API version `5.9.3`;
2. parsed only the two literal synthetic snippets in this review;
3. used `ts.createSourceFile` with TypeScript syntax;
4. recorded parse diagnostics, SyntaxKinds, `ImportClause.isTypeOnly`, namespace binding name, and module text;
5. touched no governed source;
6. executed no repository implementation or Check 5 instrument; and
7. was removed after its result was captured.

The earned observations were:

| Observation | Ordinary namespace import | Type-only namespace import |
| --- | --- | --- |
| Source | `import * as ns from "module";` | `import type * as ns from "module";` |
| Parse diagnostics | None | None |
| Statement SyntaxKind | `ImportDeclaration` | `ImportDeclaration` |
| Clause SyntaxKind | `ImportClause` | `ImportClause` |
| `ImportClause.isTypeOnly` | `false` | `true` |
| Named-bindings SyntaxKind | `NamespaceImport` | `NamespaceImport` |
| Namespace-name SyntaxKind | `Identifier` | `Identifier` |
| Namespace-name text | `ns` | `ns` |
| Module-specifier SyntaxKind | `StringLiteral` | `StringLiteral` |
| Module-specifier text | `module` | `module` |

The absence of parse diagnostics establishes that both tested forms are valid under TypeScript 5.9.3. The same AST node kinds, local name, and module are preserved. The exact differing field is `ImportClause.isTypeOnly`.

## 6. Seven Ordered Questions

### 6.1 Ordinary namespace value form

For:

```ts
import * as ns from "module";
```

the AST is an `ImportDeclaration` containing an `ImportClause` whose `namedBindings` is `NamespaceImport`. The exact clause property is:

```text
ImportClause.isTypeOnly=false
```

Therefore the ordinary namespace import is structurally distinguishable as a value namespace import.

```text
QUESTION_1=YES
```

### 6.2 Type-only namespace form validity

For:

```ts
import type * as ns from "module";
```

TypeScript 5.9.3 reports no parse diagnostics. Its binding remains a `NamespaceImport` with local `Identifier("ns")`, while its containing `ImportClause` records:

```text
ImportClause.isTypeOnly=true
```

The syntax is valid and structurally distinguishable.

```text
QUESTION_2=YES
```

### 6.3 Exact AST distinction

The exact distinguishing property is:

```text
ImportDeclaration.importClause.isTypeOnly
```

The ordinary form has `false`; the type-only form has `true`. No distinction in `NamespaceImport`, its local Identifier, imported identity, or module source is required.

```text
QUESTION_3=ImportClause.isTypeOnly
```

### 6.4 Mechanical semantic mapping

Formation governance already defines `IMPORTED_BINDING.typeOnly` as the binding's independent type status and establishes for named imports that the exact clause-level AST type-only form determines that boolean. The synthetic check proves that namespace imports use the same containing `ImportClause.isTypeOnly` field.

The shared rule is:

```text
For an IMPORTED_BINDING introduced by an ImportClause:
  IMPORTED_BINDING.typeOnly = ImportClause.isTypeOnly
```

This is a direct boolean-to-boolean mapping. It does not infer from spelling, semantic use, local name, module, or imported identity.

```text
QUESTION_4=YES
DERIVATION_RULE_IS_GOVERNED=true
```

### 6.5 Ordinary namespace result

The tested ordinary form has `ImportClause.isTypeOnly=false`. Therefore:

```text
ORDINARY_NAMESPACE_IMPORT_TYPE_ONLY=false
QUESTION_5=YES
```

### 6.6 Type-only namespace result

The valid tested type-only form has `ImportClause.isTypeOnly=true`. Therefore:

```text
TYPE_ONLY_NAMESPACE_IMPORT_TYPE_ONLY=true
QUESTION_6=YES
```

### 6.7 Structural sufficiency

The existing field is already exactly:

```text
typeOnly:boolean
```

The compiler AST supplies exactly one boolean property with the same distinction. No new schema, enum, `RecordKind`, `NodeKind`, NodeLedger reason, predicate, operation, terminal value, or additional structural dimension is needed.

```text
SCHEMA_CAN_STORE_BOOLEAN=true
DERIVATION_RULE_IS_GOVERNED=true
NEW_STRUCTURAL_DISTINCTION_REQUIRED=false
QUESTION_7=NO_NEW_STRUCTURE_REQUIRED
```

The review stops after question 7.

## 7. Critical Two-Form Falsifier

Hold constant:

```text
module="module"
importedIdentity={kind:"MODULE_NAMESPACE_OBJECT"}
localName="ns"
binding owner=LOCAL_BINDING_IDENTIFIER
binding recordId=<ROLE>:<IDENTIFIER_NS_NODE_ID>:IMPORTED_BINDING:0
```

Vary only the clause-level type-only distinction:

```text
ordinary form:
  ImportClause.isTypeOnly=false
  IMPORTED_BINDING.typeOnly=false

type-only form:
  ImportClause.isTypeOnly=true
  IMPORTED_BINDING.typeOnly=true
```

The falsifier passes. Module, namespace imported-identity category, local binding identity, and owner remain structurally equivalent. Only `ImportClause.isTypeOnly`, and therefore the binding's `typeOnly`, changes.

```text
NAMESPACE_TYPE_ONLY_TWO_FORM_FALSIFIER=PASS
```

## 8. Named-Import Non-Transfer Test

The named review's results are:

```text
import { A } from "module";
=> typeOnly=false

import type { A } from "module";
=> typeOnly=true
```

Those booleans are not copied by analogy. The namespace test independently establishes:

1. both namespace forms are valid;
2. both contain `ImportClause`;
3. both contain `NamespaceImport`;
4. their exact `ImportClause.isTypeOnly` values differ; and
5. the existing semantic meaning of `typeOnly` matches that exact distinction.

Only after those independent observations is the shared rule accepted:

```text
IMPORTED_BINDING.typeOnly = containing ImportClause.isTypeOnly
```

```text
NAMED_IMPORT_RULE_ASSUMED_TRANSFERABLE=false
SHARED_IMPORT_CLAUSE_RULE_INDEPENDENTLY_CONFIRMED=true
```

## 9. Settled Result

The fixed namespace binding prefix now has its final mandatory field:

```text
ordinary namespace import:
  owner=LOCAL_BINDING_IDENTIFIER
  recordId=<ROLE>:<IDENTIFIER_NS_NODE_ID>:IMPORTED_BINDING:0
  module="module"
  importedIdentity={kind:"MODULE_NAMESPACE_OBJECT"}
  localName="ns"
  typeOnly=false

type-only namespace import:
  owner=LOCAL_BINDING_IDENTIFIER
  recordId=<ROLE>:<IDENTIFIER_NS_NODE_ID>:IMPORTED_BINDING:0
  module="module"
  importedIdentity={kind:"MODULE_NAMESPACE_OBJECT"}
  localName="ns"
  typeOnly=true
```

This review settles only the `typeOnly` derivation. It does not emit, link, or otherwise settle either record beyond that field.

```text
NAMESPACE_IMPORT_TYPE_ONLY_DERIVATION=IMPORTED_BINDING.typeOnly := ImportClause.isTypeOnly
ORDINARY_NAMESPACE_IMPORT_TYPE_ONLY=false
TYPE_ONLY_NAMESPACE_IMPORT_TYPE_ONLY=true
NEW_STRUCTURAL_DISTINCTION_REQUIRED=false
```

## 10. Later Values Strictly Not Reached

The following remain outside this review regardless of apparent applicability:

```text
IMPORT_DECLARATION.bindingRecordIds=NOT_REACHED
ImportClause NodeLedger reason=NOT_REACHED
NamespaceImport NodeLedger reason=NOT_REACHED
Identifier("ns") NodeLedger treatment=NOT_REACHED
module-specifier NodeLedger treatment=NOT_REACHED
overlap closure=NOT_REACHED
omission closure=NOT_REACHED
dependency-edge ownership=NOT_REACHED
exports=NOT_REACHED
re-exports=NOT_REACHED
later sequence rows=NOT_REACHED
```

No statement in this review determines any value above.

## 11. Documentation-Level Resume Point

Because Outcome 1 is selected:

The post-POLICY-5 namespace binding derivation may resume at IMPORT_DECLARATION.bindingRecordIds.

This review does not resume it.

The sentence identifies only the next documentation-level position. It does not derive or constrain the linkage value.

## 12. Outcome Decision

### Outcome 1 - exact AST distinction maps faithfully to the existing boolean

**Selected.** Both namespace forms are valid and structurally identical in module, namespace binding, local identity, and binding ownership. `ImportClause.isTypeOnly` is the exact deterministic distinction: `false` for the ordinary form and `true` for the type-only form. The existing `typeOnly:boolean` field represents it without extension.

### Outcome 2 - boolean storage sufficient but mapping remains ungoverned

Not selected. Formation semantics establish the meaning, and the bounded synthetic AST determination supplies the exact namespace form-to-boolean mapping.

### Outcome 3 - existing boolean cannot represent the governed distinction

Not selected. The governed compiler distinction is itself boolean and maps directly without loss or ambiguity.

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

No outcome from this review grants policy-edit, predicate, instrument, implementation-inspection, Check 5, Check 6, freeze, or acceptance Authority. No Authority is granted or implied to settle declaration linkage, child NodeLedger treatment, overlap, omission, dependency edges, exports, re-exports, or later sequence rows.

This one-record review stops after resolving `IMPORTED_BINDING.typeOnly`.