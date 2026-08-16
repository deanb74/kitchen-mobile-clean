# HH-0000 Check 5 Post-POLICY-5 Namespace Import Binding Ownership and Linkage Derivation Completion Review

**Status:** OUTCOME 2 - EXACT NAMESPACE TYPE-ONLY AST DISTINCTION REMAINS UNGOVERNED
**Review date:** 2026-08-15
**Review type:** Documentation-only bounded formation derivation completion review
**Controlling policy schema:** `HH-CHECK-5-CLOSED-MEASUREMENT-POLICY-5`
**Controlling policy canonical identity:** `423284` bytes / `78a8ece526551eaf4a00c5addbf72d71b7a17a8cfc4bb809bfc687c76a3f03cf`
**Corrected canonical-policy closure:** `ACHIEVED`
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
**Theory:** A namespace binding row may inherit settled lexical-binding ownership and closed imported identity, but it must stop when the exact AST distinction governing a mandatory field remains undocumented.
**Architecture:** Closed POLICY-5 namespace declaration and imported-identity structure, Identifier-level lexical-binding ownership, deterministic record identity, source-local name derivation, and fail-closed type-status selection.
**Engineering:** Ordered thirteen-value analysis, owner and record-ID retest, module and imported-identity retest, local-name alias-independence falsifier, namespace type-only governance search, and immediate stop at the first unresolved value.
**Milestone:** Not Applicable.
**Evidence:** The seven controlling formation reviews and the fixed closed POLICY-5 identity. This review produces no policy, implementation, instrument, Check 5, Check 6, freeze, or acceptance Evidence.

## 1. Sole Question and Decision

> With the imported-identity blocker now structurally resolved and canonically closed in POLICY-5, can the remaining namespace-import binding row be derived deterministically from existing AST structure and settled formation rules?

**No. Outcome 2 is selected at the first newly unresolved value: `IMPORTED_BINDING.typeOnly`.**

For:

```ts
import * as ns from "module";
```

POLICY-5 closure removes the former imported-identity blocker. Retesting in the required order settles the local binding owner, deterministic record ID, module, imported identity, and local name. The existing formation chain does not, however, govern the exact namespace-specific AST distinction needed to determine `typeOnly` across the namespace import form.

The named-import review governs clause-level named `import type` only and expressly does not author a rule for an untested type-import form. Earlier namespace reviews explicitly record namespace type-only syntax and its effect as unsettled. Applying the named-only rule to namespace syntax would invent a new convention.

The review therefore stops at item 6. Items 7 through 13 are not analysed.

## 2. Strict Boundary

This review uses only existing formation governance and the fixed closed POLICY-5 identity. It does not:

1. inspect, read, reconstruct, regenerate, revalidate, reserialize, modify, or otherwise reopen POLICY-5;
2. inspect governed implementation source;
3. inspect, construct, modify, validate, or execute an instrument;
4. run Check 5 or Check 6;
5. alter D4, D5, D6, predicates, terminal objects, IDs, or ordering;
6. reopen settled default-import or named-import decisions;
7. introduce an imported-name sentinel string;
8. invent a namespace type-only semantic or AST convention;
9. analyse declaration linkage, child-ledger treatment, overlap, omission, or later rows after the first blocker; or
10. modify any existing policy, review, or formation record.

Exactly this one Markdown review is created.

## 3. Controlling Evidence

| Controlling review | Derivation-relevant result |
| --- | --- |
| `HH-0000 CHECK 5 POST-POLICY-4 NAMESPACE IMPORT BINDING OWNERSHIP AND LINKAGE DERIVATION COMPLETION REVIEW` | Establishes the ordered thirteen-value method; mechanically supports local-Identifier ownership, candidate record ID, and module; stops at the former string imported-name blocker without promoting a complete row |
| `HH-0000 CHECK 5 NAMESPACE IMPORTED BINDING IMPORTED-NAME SEMANTIC COMPLETION REVIEW` | Establishes that namespace imported identity is the module namespace object and cannot faithfully be represented by any sentinel string |
| `HH-0000 CHECK 5 MODULE NAMESPACE IMPORTED BINDING IDENTITY STRUCTURAL COMPLETION REVIEW` | Fixes one closed exact-one `ImportedIdentity` union and the namespace mapping `{kind:"MODULE_NAMESPACE_OBJECT"}` while leaving namespace `localName` and `typeOnly` unsettled |
| `HH-0000 CHECK 5 IMPORTED IDENTITY CANONICAL POLICY CORRECTION AUTHORITY REVIEW` | Fixes the imported-identity correction and expressly excludes namespace `localName`, `typeOnly`, linkage, ledger, overlap, and omission from the correction boundary |
| `HH-0000 CHECK 5 IMPORTED IDENTITY CORRECTED CANONICAL POLICY CLOSURE REVIEW` | Closes the exact POLICY-5 identity and permits documentation-level derivation to resume after the imported-identity blocker without settling any later namespace value |
| `HH-0000 CHECK 5 DEFAULT IMPORT BINDING OWNERSHIP AND LINKAGE DERIVATION COMPLETION REVIEW` | Settles the most-specific lexical-binding-Identifier owner rule, deterministic record identity, source-local name meaning, declaration-level module source, and value-form `typeOnly=false` for the tested default form |
| `HH-0000 CHECK 5 NAMED IMPORT BINDING OWNERSHIP AND LINKAGE DERIVATION COMPLETION REVIEW` | Applies the Identifier-owner rule to `ImportSpecifier.name`, preserves imported/local identity independence, and derives `typeOnly` only for its specifically tested named value and clause-level named type-only forms |

No controlling review supplies a namespace-specific type-only AST rule. No controlling review contradicts the settled results for ordered items 1 through 5.

## 4. Controlling Closed Policy and Inherited Facts

The controlling canonical policy is fixed as:

```text
schema=HH-CHECK-5-CLOSED-MEASUREMENT-POLICY-5
canonicalByteLength=423284
canonicalSha256=78a8ece526551eaf4a00c5addbf72d71b7a17a8cfc4bb809bfc687c76a3f03cf
CORRECTED_CANONICAL_POLICY_CLOSURE=ACHIEVED
```

The declaration form and corrected identity structure are inherited without reopening:

```text
IMPORT_DECLARATION.importKind=NAMESPACE

ImportedIdentity = exactly one closed tagged variant:
  {kind:"IMPORTED_OR_EXPORTED_NAME",name:string}
  {kind:"MODULE_NAMESPACE_OBJECT"}

namespace importedIdentity={kind:"MODULE_NAMESPACE_OBJECT"}
```

No imported-name sentinel is used. Namespace imported identity is not encoded as an asterisk token, descriptive namespace text, the declaration kind, the local binding name, the module name, or the default identity.

The corrected binding shape is inherited as:

```text
IMPORTED_BINDING {
  module:string,
  importedIdentity:ImportedIdentity,
  localName:string,
  typeOnly:boolean
}
```

## 5. Ordered First-Unresolved-Value Analysis

The required order is applied without skipping a value:

| Order | Required value | Result | Status |
| ---: | --- | --- | --- |
| 1 | Binding owner | Local `Identifier("ns")`, the most-specific AST node introducing the local lexical binding | `SETTLED` |
| 2 | Binding `recordId` | `<ROLE>:<IDENTIFIER_NS_NODE_ID>:IMPORTED_BINDING:0` | `SETTLED` |
| 3 | `module` | `"module"`, independently inherited from the enclosing declaration's module identity | `SETTLED` |
| 4 | `importedIdentity` | `{kind:"MODULE_NAMESPACE_OBJECT"}` | `SETTLED` |
| 5 | `localName` | `"ns"`, derived from `NamespaceImport.name` / local binding `Identifier("ns")` | `SETTLED` |
| 6 | `typeOnly` | Exact namespace-specific AST distinction is not governed by existing formation documentation | `UNRESOLVED_FIRST_BLOCKER` |
| 7 | `IMPORT_DECLARATION.bindingRecordIds` | Not reached | `NOT_REACHED` |
| 8 | `ImportClause` NodeLedger treatment | Not reached | `NOT_REACHED` |
| 9 | `NamespaceImport` NodeLedger treatment | Not reached | `NOT_REACHED` |
| 10 | Local `Identifier("ns")` NodeLedger treatment | Not reached | `NOT_REACHED` |
| 11 | Module-specifier NodeLedger treatment | Not reached | `NOT_REACHED` |
| 12 | Overlap closure | Not reached | `NOT_REACHED` |
| 13 | Omission closure | Not reached | `NOT_REACHED` |

```text
LAST_SETTLED_VALUE=IMPORTED_BINDING.localName
LAST_SETTLED_VALUE_ORDER=5
FIRST_UNRESOLVED_VALUE=IMPORTED_BINDING.typeOnly
FIRST_UNRESOLVED_VALUE_ORDER=6
NAMESPACE_IMPORT_ROW_FULLY_CLOSED=false
```

No value after item 6 is reviewed.

## 6. Binding Owner Retest

The relevant governed AST structure is inherited from the prior namespace review:

```text
ImportDeclaration
  importClause: ImportClause
    namedBindings: NamespaceImport
      name: Identifier("ns")
  moduleSpecifier: StringLiteral("module")
```

Apply the settled rule:

> A lexical binding fact is owned by the most-specific AST node that introduces the local lexical binding.

`ImportDeclaration` owns declaration facts. `ImportClause` groups import syntax. `NamespaceImport` groups namespace-binding syntax. Its child `Identifier("ns")` is the most-specific node introducing the local lexical binding.

POLICY-5 now faithfully represents that binding's imported identity, so the former downstream structural blocker no longer defeats the owner test.

```text
NAMESPACE_IMPORT_BINDING_OWNER=LOCAL_BINDING_IDENTIFIER
NAMESPACE_IMPORT_BINDING_OWNER_TEST=PASS
```

No competing node owns the same lexical binding fact.

## 7. Binding Record-ID Retest

The local binding Identifier owns exactly one record of kind `IMPORTED_BINDING`. Under the settled record-ID rule:

```text
recordId=<ROLE>:<NODE_ID>:<RECORD_KIND>:<ORDINAL>
```

the deterministic record identity is:

```text
NAMESPACE_IMPORT_BINDING_RECORD_ID=<ROLE>:<IDENTIFIER_NS_NODE_ID>:IMPORTED_BINDING:0
```

The ordinal is `0` because this Identifier owns exactly one `IMPORTED_BINDING` record. This settles the record identity only; declaration linkage remains item 7 and is not reached after the item 6 blocker.

## 8. Module Retest

The enclosing import declaration supplies the independent module identity:

```text
NAMESPACE_IMPORT_BINDING_MODULE="module"
```

Changing only the local alias does not change the module source. The module value is neither derived from nor encoded by `localName` or `importedIdentity`.

## 9. Imported-Identity Retest

The exact POLICY-5 namespace mapping is:

```text
NAMESPACE_IMPORT_BINDING_IMPORTED_IDENTITY={kind:"MODULE_NAMESPACE_OBJECT"}
```

The closed variant contains no name payload. It represents the selected module namespace object directly and requires no external sentinel convention.

The retest therefore passes:

```text
NAMESPACE_IMPORT_BINDING_IMPORTED_IDENTITY_TEST=PASS
IMPORTED_NAME_SENTINEL_USED=false
```

## 10. Local-Name Test

For the tested source form, `NamespaceImport.name` is local `Identifier("ns")`. Under the already-settled lexical-binding rule, that Identifier introduces the source-local lexical binding and owns the binding fact. The existing meaning of `localName` is the source-local lexical identifier introduced by the binding node.

Therefore:

```text
NAMESPACE_IMPORT_BINDING_LOCAL_NAME="ns"
NAMESPACE_IMPORT_BINDING_LOCAL_NAME_SOURCE=NamespaceImport.name
NAMESPACE_IMPORT_BINDING_LOCAL_NAME_TEST=PASS
```

### 10.1 Alias-independence falsifier

Compare:

```ts
import * as first from "module";
import * as second from "module";
```

The two forms select the same source module and the same semantic imported identity. Only the local binding Identifier changes.

```text
first.localName="first"
second.localName="second"

first.module=second.module="module"
first.importedIdentity=second.importedIdentity={kind:"MODULE_NAMESPACE_OBJECT"}
```

The falsifier passes because local alias variation changes only `localName`; it does not alter module or imported identity.

```text
NAMESPACE_LOCAL_NAME_ALIAS_INDEPENDENCE=PASS
```

## 11. First Unresolved Value - `typeOnly`

The binding schema requires:

```text
typeOnly:boolean
```

Existing formation governance establishes:

1. the tested default value-import form has `typeOnly=false`;
2. tested named value-import forms have `typeOnly=false`;
3. the exact clause-level named form `import type { A } from "module";` has `typeOnly=true`; and
4. the named-import review limits that result to its exact tested form and does not author a rule for an untested type-import form.

The namespace reviews explicitly leave namespace `typeOnly` unsettled. Existing formation documentation does not govern whether a distinct type-only namespace-import syntax exists, what exact AST field distinguishes it, or how that distinction maps to `IMPORTED_BINDING.typeOnly`.

Although the reviewed source text contains no written `type` modifier, assigning `false` solely by analogy would bypass the required namespace-specific AST-form test. The field can technically store a boolean, but storage capacity does not settle the governing derivation rule.

Therefore exactly one first value remains unresolved:

```text
FIRST_UNRESOLVED_VALUE=IMPORTED_BINDING.typeOnly
FIRST_UNRESOLVED_REASON=NAMESPACE_SPECIFIC_TYPE_ONLY_AST_DISTINCTION_NOT_GOVERNED
NAMESPACE_IMPORT_TESTED_FORM_TYPE_ONLY=UNRESOLVED
TYPE_ONLY_NAMESPACE_IMPORT_SYNTAX=UNGOVERNED
OUTCOME=2
```

The review stops here. It does not infer a value, design a rule, inspect implementation, or analyse items 7 through 13.

## 12. Complete-Row Status

The settled prefix of the row is:

```text
owner=LOCAL_BINDING_IDENTIFIER
recordId=<ROLE>:<IDENTIFIER_NS_NODE_ID>:IMPORTED_BINDING:0
module="module"
importedIdentity={kind:"MODULE_NAMESPACE_OBJECT"}
localName="ns"
typeOnly=UNRESOLVED
```

Because `typeOnly` is mandatory, no complete namespace `IMPORTED_BINDING` record is yet deterministic.

```text
NAMESPACE_IMPORT_ROW_FULLY_CLOSED=false
NAMESPACE_IMPORT_COMPLETE_RECORD=NOT_AVAILABLE
NAMESPACE_IMPORT_DECLARATION_LINKAGE=NOT_REACHED
NAMESPACE_IMPORT_CHILD_LEDGER_TREATMENT=NOT_REACHED
NAMESPACE_IMPORT_OVERLAP_CLOSURE=NOT_REACHED
NAMESPACE_IMPORT_OMISSION_CLOSURE=NOT_REACHED
NEXT_DOCUMENTATION_LEVEL_ROW=NOT_ESTABLISHED
```

No next-row resume point is established because Outcome 1 is not earned.

## 13. Outcome Decision

### Outcome 1 - all thirteen values deterministically settled

Not selected. The mandatory `typeOnly` field remains unresolved at ordered item 6, so the complete namespace-import row does not close.

### Outcome 2 - one exact existing-structure value remains ungoverned

**Selected.** POLICY-5 faithfully represents namespace imported identity and permits ordered items 1 through 5 to settle, but existing formation documentation does not govern the exact namespace-specific AST distinction required to derive `IMPORTED_BINDING.typeOnly`. The review stops at that first unresolved value.

### Outcome 3 - closed POLICY-5 cannot faithfully represent an already-governed fact

Not selected. Every settled value through `localName` is faithfully representable by POLICY-5. The blocker is an ungoverned mandatory boolean derivation, not a missing structural representation for an already-governed namespace fact.

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

No outcome from this review grants policy-edit, predicate, instrument, implementation-inspection, Check 5, Check 6, freeze, or acceptance Authority. No Authority is granted or implied to choose `typeOnly`, settle declaration linkage or child-ledger treatment, close overlap or omission, establish a next-row resume point, edit POLICY-5, or inspect implementation.

This one-record derivation completion review stops at the first unresolved value.