# HH-0000 Check 5 Post-POLICY-4 Namespace Import Binding Ownership and Linkage Derivation Completion Review

**Status:** OUTCOME 2 - EXACT NAMESPACE IMPORTED-NAME REPRESENTATION REMAINS UNGOVERNED
**Review date:** 2026-08-15
**Review type:** Documentation-only bounded formation review
**Controlling policy schema:** `HH-CHECK-5-CLOSED-MEASUREMENT-POLICY-4`
**Controlling policy canonical identity:** `422479` bytes / `e39d39e1e510d5ffa79abcdc81dfef865fbe4d02bdacfd7e99e434c254295f7d`
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
**Theory:** A lexical binding fact is owned by the most-specific AST node that introduces the local lexical binding, but an owner does not determine an otherwise ungoverned semantic field value.
**Architecture:** Closed POLICY-4 namespace declaration recognition, Identifier-level lexical-binding ownership analysis, deterministic candidate record identity, closed `IMPORTED_BINDING` fields, and fail-closed exact-value selection.
**Engineering:** Ordered first-unresolved-value analysis, three-owner falsifier, namespace imported-identity candidate comparison, free-string insufficiency test, and mandatory stop before type-only, linkage, child-ledger, overlap, omission, or later-row derivation.
**Milestone:** Not Applicable.
**Evidence:** The six controlling formation reviews and the exact closed POLICY-4 identity. This review produces no policy, implementation, instrument, Check 5, Check 6, freeze, or acceptance Evidence.

## 1. Sole Question and Decision

> Is the existing closed POLICY-4 structure, together with the settled lexical-binding-owner principle, sufficient to settle every remaining namespace-import binding fact?

**No. Outcome 2 is selected at the first ungoverned binding payload value: `IMPORTED_BINDING.importedName`.**

For:

```ts
import * as ns from "module";
```

the settled owner principle mechanically points to local `Identifier("ns")` as the most-specific node that introduces the lexical binding. The corresponding candidate record identity and exact module value are mechanically available. However, no controlling documentation selects an exact namespace imported-identity string.

The existing field can hold a string, so the structure is not proven incapable of representing the meaning. But syntactic capacity does not govern whether the exact value is `"*"`, `"namespace"`, or another string. Selecting one would create policy rather than derive it.

The review stops at item 4. Because the complete row is not internally deterministic, the owner hypothesis and candidate record identity are not promoted into a complete canonical namespace-import rule.

## 2. Strict Boundary

This review used only:

1. the Namespace Import Binding Ownership and Linkage Derivation Completion Review;
2. the Namespace Import Declaration Structural Completion Review;
3. the Namespace Import Canonical Policy Correction Authority Review;
4. the Namespace Import Corrected Canonical Policy Closure Review;
5. the Default Import Binding Ownership and Linkage Derivation Completion Review; and
6. the Named Import Binding Ownership and Linkage Derivation Completion Review.

It did not:

1. reopen, reread, reconstruct, modify, regenerate, revalidate, or reserialize POLICY-4;
2. inspect, open, read, hash, parse, or otherwise access governed implementation source;
3. inspect, construct, modify, readiness-test, validate, or execute an instrument;
4. run Check 5, Check 6, tests, typecheck, ESLint, implementation validation, freeze, or acceptance;
5. alter D4, D5, D6, predicates, terminal objects, terminal IDs, or terminal ordering;
6. add or alter a schema field, enum value, record kind, NodeKind, NodeLedger reason, dependency kind, or policy rule;
7. infer an `importedName` merely because its schema type is `string`;
8. settle namespace `typeOnly`, declaration linkage, child NodeLedger treatment, overlap, or omission after the first blocker;
9. proceed to exports, re-exports, imported-use, dependency-edge ownership, or any later derivation row; or
10. alter any controlling or historical governance record.

Exactly this formation record is created.

## 3. Inherited Canonical Policy and Declaration Result

The currently controlling corrected canonical Check 5 policy is inherited exactly as:

```text
schema=HH-CHECK-5-CLOSED-MEASUREMENT-POLICY-4
canonicalByteLength=422479
canonicalSha256=e39d39e1e510d5ffa79abcdc81dfef865fbe4d02bdacfd7e99e434c254295f7d
CORRECTED_CANONICAL_POLICY_CLOSURE=ACHIEVED
```

The declaration-level result is already settled and is not reconsidered:

```text
ImportDeclaration:
  NodeKind=IMPORT
  RecordKind=IMPORT_DECLARATION
  module="module"
  importKind=NAMESPACE
  nonGovernedReason=NONE
```

POLICY-4 corrected only the declaration-level namespace distinction and its directly necessary consistency representation. Its construction and closure Evidence expressly records:

```text
NO_NAMESPACE_BINDING_RULE_ADDED=true
NAMESPACE_BINDING_OWNERSHIP=NOT_RESUMED
```

The applicable binding schema remains:

```text
IMPORTED_BINDING {
  module:string,
  importedName:string,
  localName:string,
  typeOnly:boolean
}
```

The applicable identity and traversal rules remain:

```text
recordId=<ROLE>:<NODE_ID>:<RECORD_KIND>:<ORDINAL>
nodeId order=CONTIGUOUS_PREORDER
every governed fact exactly one record=true
```

The declaration correction removes the former declaration-schema blocker. It does not supply a namespace imported-name convention.

## 4. Ordered First-Unresolved-Value Analysis

The required analysis order is applied without skipping a value.

| Order | Required value | Result | Status |
| --- | --- | --- | --- |
| 1 | Namespace binding owner | The settled lexical-binding-owner principle selects local `Identifier("ns")` as the mechanically applicable owner hypothesis | `MECHANICALLY_DETERMINED_BUT_NOT_PROMOTED` |
| 2 | `IMPORTED_BINDING.recordId` | `<ROLE>:<IDENTIFIER_NS_NODE_ID>:IMPORTED_BINDING:0` follows from that owner hypothesis | `MECHANICALLY_DERIVED_CANDIDATE_NOT_PROMOTED` |
| 3 | Exact `module` | `"module"`, inherited from the declaration's module identity | `DETERMINED` |
| 4 | Exact `importedName` | No controlling rule selects `"*"`, `"namespace"`, or another exact string | `UNRESOLVED_FIRST_BLOCKER` |
| 5 | Exact `localName` | Not reached | `NOT_REACHED` |
| 6 | Exact `typeOnly` | Not reached | `NOT_REACHED` |
| 7 | Exact `IMPORT_DECLARATION.bindingRecordIds` | Not reached | `NOT_REACHED` |
| 8 | `ImportClause` NodeLedger treatment | Not reached | `NOT_REACHED` |
| 9 | `NamespaceImport` NodeLedger treatment | Not reached | `NOT_REACHED` |
| 10 | Local Identifier `ns` NodeLedger treatment | Not reached | `NOT_REACHED` |
| 11 | Module-specifier NodeLedger treatment | Not reached | `NOT_REACHED` |
| 12 | Overlap closure | Not reached | `NOT_REACHED` |
| 13 | Omission closure | Not reached | `NOT_REACHED` |

The first genuine unresolved value is exactly:

```text
FIRST_GENUINE_BLOCKER=IMPORTED_BINDING.importedName
FIRST_GENUINE_BLOCKER_ORDER=4
```

No later value is reviewed.

## 5. Lexical-Binding-Owner Hypothesis Test

The relevant namespace-import AST shape is:

```text
ImportDeclaration
  importClause: ImportClause
    namedBindings: NamespaceImport
      name: Identifier("ns")
  moduleSpecifier: StringLiteral("module")
```

Apply the settled principle:

> A lexical binding fact is owned by the most-specific AST node that introduces the local lexical binding.

The candidate owners are:

| Candidate owner | Test result | Reason |
| --- | --- | --- |
| `ImportDeclaration` | Rejected | Owns declaration-level facts and is less specific than the binding Identifier |
| `ImportClause` | Rejected | Groups import syntax and does not itself introduce the local lexical binding |
| `NamespaceImport` | Rejected | Groups namespace-binding syntax but its child `Identifier("ns")` is the more-specific binding-introducing node |
| Local `Identifier("ns")` | Mechanically selected hypothesis | It is the most-specific AST node that introduces local lexical binding `ns` |

Thus the structural hypothesis is:

```text
NAMESPACE_IMPORT_BINDING_OWNER_HYPOTHESIS=LOCAL_BINDING_IDENTIFIER
NAMESPACE_IMPORT_BINDING_OWNER_HYPOTHESIS_TEST=PASS
```

If a complete namespace binding record were governed, its candidate identity would be:

```text
<ROLE>:<IDENTIFIER_NS_NODE_ID>:IMPORTED_BINDING:0
```

The ordinal is `0` because the Identifier would own exactly one record of kind `IMPORTED_BINDING`.

However, the request requires that this hypothesis not be promoted unless the complete row remains internally representable and deterministic. The later `importedName` blocker prevents that condition:

```text
NAMESPACE_IMPORT_BINDING_OWNER_PROMOTED=false
NAMESPACE_IMPORT_BINDING_RECORD_ID_PROMOTED=false
```

This does not reopen the owner principle. It preserves the distinction between a mechanically applicable ownership hypothesis and a complete emit-ready namespace binding rule.

## 6. Exact Module Value

The declaration's settled module identity is:

```text
module="module"
```

The binding schema uses the same `module:string` field, and the default and named import reviews already apply the enclosing import declaration's exact module identity to each binding record. That mechanically applicable rule yields:

```text
NAMESPACE_IMPORT_BINDING_MODULE_CANDIDATE="module"
NAMESPACE_IMPORT_BINDING_MODULE_TEST=PASS
```

This value does not resolve the independent imported-identity field.

## 7. Namespace Imported-Identity Candidate Test

The existing field is:

```text
importedName:string
```

A free string permits serialization but supplies no semantic selection rule. Each required candidate is tested independently.

### 7.1 Candidate A - `importedName="*"`

Not selected. The source contains a namespace-import `*` token, and `"*"` could be encoded as a string, but no controlling record establishes that token spelling as the canonical `IMPORTED_BINDING.importedName` for namespace imports.

The default-import review governs `"default"` from default exported identity. The named-import review governs the source imported Identifier spelling. Neither rule mechanically maps a namespace object binding to `"*"`.

### 7.2 Candidate B - `importedName="namespace"`

Not selected. `"namespace"` is descriptive prose, not an imported Identifier in the tested source, and no controlling schema, enum, derivation, or prior binding rule selects it as a canonical field value.

Using it would invent a convention.

### 7.3 Candidate C - another exact representation already governed

Not selected. The controlling documentation supplies no third exact namespace imported-name representation. `ImportForm=NAMESPACE` and `IMPORT_DECLARATION.importKind=NAMESPACE` govern declaration classification, not the payload of `IMPORTED_BINDING.importedName`.

Copying `"NAMESPACE"`, local name `"ns"`, module name `"module"`, an empty string, `"default"`, or another token would conflate distinct fields or invent an ungoverned mapping.

### 7.4 Candidate D - no faithful exact value yet governed

**Selected.** Existing structure can encode strings, but existing governance does not determine which exact string faithfully represents namespace imported identity.

```text
NAMESPACE_IMPORTED_NAME_CANDIDATE_A_STAR=NOT_GOVERNED
NAMESPACE_IMPORTED_NAME_CANDIDATE_B_NAMESPACE=NOT_GOVERNED
NAMESPACE_IMPORTED_NAME_CANDIDATE_C_OTHER_GOVERNED_VALUE=NONE_FOUND
NAMESPACE_IMPORTED_NAME_RESULT=UNRESOLVED
SELECTED_IMPORTED_IDENTITY_CANDIDATE=D
```

This is an exact-value governance gap within structurally available storage, not proof that the binding schema can never represent namespace identity.

## 8. Imported and Local Identity Non-Conflation Falsifier

The following identities are distinct:

```text
module identity="module"
local lexical identity="ns"
namespace imported identity=<UNRESOLVED>
```

The known local name cannot be copied into `importedName` merely to complete the record. Compare:

```ts
import * as first from "module";
import * as second from "module";
```

The local lexical names differ while the imported namespace identity, whatever its future governed representation, must remain the same. Therefore:

```text
importedName=localName
```

is not a mechanically valid namespace rule.

Likewise, the module string identifies the source module and cannot substitute for imported identity. This falsifier rules out conflation but does not choose a positive exact representation.

## 9. Distinct Import-Form Falsifier

The declaration-level distinctions remain inherited and unchanged:

```ts
import value from "module";
import { value } from "module";
import "module";
import * as ns from "module";
```

```text
default:     importKind=DEFAULT_VALUE
named:       importKind=NAMED_VALUE
side-effect: importKind=SIDE_EFFECT
namespace:   importKind=NAMESPACE
```

POLICY-4 therefore preserves namespace declaration identity without coercion to default, named, or side-effect import. This positive declaration result does not supply the missing binding-level `importedName` value.

The complete namespace binding row cannot yet prove imported/local non-conflation through an emitted `IMPORTED_BINDING`, because its imported identity remains unresolved.

## 10. Child Ownership and Linkage Not Reached

The review must stop at the first genuine blocker. It therefore does not assume child treatment by analogy and does not settle any of these values:

```text
NAMESPACE_IMPORT_LOCAL_NAME=NOT_REACHED
NAMESPACE_IMPORT_TYPE_ONLY=NOT_REACHED
NAMESPACE_IMPORT_DECLARATION_BINDING_RECORD_IDS=NOT_REACHED
IMPORT_CLAUSE_LEDGER_REASON=NOT_REACHED
NAMESPACE_IMPORT_LEDGER_REASON=NOT_REACHED
LOCAL_NAMESPACE_IDENTIFIER_LEDGER_REASON=NOT_REACHED
MODULE_SPECIFIER_LEDGER_REASON=NOT_REACHED
```

In particular, this review does not promote the plausible treatments that `ImportClause` and `NamespaceImport` are structural containers, that `Identifier("ns")` owns a record, or that the module specifier is declaration-internal. Those are later ordered values and require a complete deterministic binding record before promotion under this review's boundary.

No declaration linkage is emitted or settled. The candidate record ID is not placed into `IMPORT_DECLARATION.bindingRecordIds`.

## 11. Overlap, Omission, and Positive Record Tests Not Reached

A complete overlap and omission proof requires one fully governed `IMPORTED_BINDING` payload. Because `importedName` is unresolved, the following cannot be closed:

```text
NAMESPACE_IMPORT_BINDING_REQUIRED_RECORD_COUNT=1
NAMESPACE_IMPORT_BINDING_COMPLETE_RECORD_COUNT=0
NAMESPACE_IMPORT_BINDING_OVERLAP=NOT_CLOSED
NAMESPACE_IMPORT_BINDING_OMISSION=NOT_CLOSED
NAMESPACE_IMPORT_DECLARATION_LINKAGE=NOT_REACHED
```

This does not authorize duplication or omission. It records that the positive emit-ready record, exact-once declaration linkage, no-duplicate falsifier, and no-omission falsifier cannot all pass until the exact imported identity is governed.

The following otherwise-identical cases remain insufficient to choose the missing value:

```ts
import * as ns from "module";
import * as ns from "other-module";
import * as otherLocal from "module";
```

They prove that module identity and local identity vary independently. They do not establish the canonical namespace imported-identity string.

## 12. Minimum Missing Decision

Exactly one first missing decision is identified:

> What exact string must `IMPORTED_BINDING.importedName` contain for a namespace import binding?

A later separately governed decision must select an exact representation from existing semantic evidence or determine that the schema requires a stronger structural distinction. It must not infer a value solely from the field's `string` type.

This review does not choose, rank, or authorize `"*"`, `"namespace"`, or another representation. It does not determine any value after item 4.

```text
MINIMUM_MISSING_DECISION=NAMESPACE_IMPORTED_BINDING_IMPORTED_NAME_EXACT_REPRESENTATION
EXISTING_STRING_STORAGE_AVAILABLE=true
EXACT_SEMANTIC_VALUE_GOVERNED=false
STRUCTURAL_INSUFFICIENCY_PROVEN=false
```

## 13. Sequence Consequence

The post-POLICY-4 derivation resumed exactly at:

```text
NAMESPACE IMPORT BINDING OWNERSHIP AND LINKAGE
```

It stops within that same row at `IMPORTED_BINDING.importedName`. The namespace-import row is not fully settled, so no next documentation-level resume point is established.

```text
NAMESPACE_IMPORT_ROW=INCOMPLETE
STOPPED_AT=IMPORTED_BINDING.importedName
NEXT_SEQUENCE_ROW=NOT_REACHED
```

No export, re-export, imported-use, dependency-edge ownership, or later precedence row is reviewed or named.

## 14. Outcome Decision

### Outcome 1 - complete namespace-import derivation settled

Not selected. The exact namespace `IMPORTED_BINDING.importedName` representation is not governed, so the complete record, declaration linkage, child-ledger treatment, overlap closure, and omission closure cannot be promoted.

### Outcome 2 - one exact value remains ungoverned within available structure

**Selected.** The lexical-binding-owner principle mechanically selects local `Identifier("ns")` as the owner hypothesis, its candidate record ID follows deterministically, and `module="module"` is exact. The existing `string` field can store an imported identity, but no controlling rule selects `"*"`, `"namespace"`, or another exact value. The review stops at that first exact-value blocker.

### Outcome 3 - existing structure cannot faithfully encode namespace binding

Not selected. The current Evidence demonstrates missing semantic selection, not structural impossibility. The `IMPORTED_BINDING` schema contains an `importedName:string` field capable of storing an eventual exact representation. Whether stronger structure is required remains a possible later conclusion, not an earned result here.

## 15. Authority Boundary and Stop

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

No Authority is granted or implied to choose a namespace imported-name representation; promote the owner or record-ID hypotheses into a complete namespace rule; settle type-only, linkage, child-ledger, overlap, or omission treatment; proceed to exports or later rows; inspect governed implementation source; inspect, construct, modify, validate, or execute an instrument; edit POLICY-4; alter D4, D5, D6, predicates, terminal objects, IDs, or ordering; run Check 5 or Check 6; freeze policy; or accept implementation.

This one-record review stops here.
