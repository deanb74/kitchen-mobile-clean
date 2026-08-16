# HH-0000 Check 5 Namespace Imported Binding Imported-Name Semantic Completion Review

**Status:** OUTCOME 3 - STRING IMPORTED NAME CANNOT FAITHFULLY REPRESENT MODULE NAMESPACE IDENTITY
**Review date:** 2026-08-15
**Review type:** Documentation-only bounded semantic completion review
**Controlling review:** `HH-0000 CHECK 5 POST-POLICY-4 NAMESPACE IMPORT BINDING OWNERSHIP AND LINKAGE DERIVATION COMPLETION REVIEW`
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

**Principle:** Truth before certainty; evidence before claims; smallest justified change; human Authority.
**Theory:** `IMPORTED_BINDING.importedName` records a source imported or exported identity; a module namespace object is a distinct semantic category and must not be represented by an invented string sentinel.
**Architecture:** Existing default/named imported-identity semantics, namespace-object selection, independent module and local identities, exact candidate falsifiers, and one minimum missing structural distinction.
**Engineering:** Eight-candidate semantic comparison, source-token role test, local/module independence tests, default/named distinction tests, round-trip sufficiency test, and mandatory stop before every later namespace-binding field.
**Milestone:** Not Applicable.
**Evidence:** The controlling review, the settled default/named imported-name meanings, the settled namespace declaration semantics, and the exact closed POLICY-4 identity. This review produces no policy edit, implementation observation, instrument, Check 5, Check 6, freeze, or acceptance Evidence.

## 1. Sole Question and Decision

> What exact string must `IMPORTED_BINDING.importedName` contain for `import * as ns from "module";`?

**No string can faithfully carry that field's already-settled meaning. Outcome 3 is selected.**

The settled default and named reviews define `importedName` as the imported or exported identity selected from the source module:

```text
default import:
  importedName="default"
  localName=<source local identifier>

named import:
  importedName=<source imported/exported identity>
  localName=<source local binding identifier>
```

Namespace-import syntax does not select one source exported identity. It binds the module namespace object. The `*` token denotes that namespace-selection form; it is not an exported-name Identifier. Therefore `"*"` is not a faithful imported name. `"namespace"`, `"NAMESPACE"`, the local name, and the module name are likewise not source imported/exported identities.

The minimum missing structural distinction is a closed semantic variant for **module namespace object identity**, distinct from string-valued imported/exported-name identity. This review identifies only that distinction. It does not design, name, add, or encode it.

## 2. Strict Boundary

This review resolves only the semantic meaning of `IMPORTED_BINDING.importedName` for:

```ts
import * as ns from "module";
```

It did not:

1. reopen, reread, reconstruct, modify, regenerate, revalidate, or reserialize POLICY-4;
2. inspect, open, read, hash, parse, or otherwise access governed implementation source;
3. inspect, construct, modify, readiness-test, validate, or execute an instrument;
4. run Check 5, Check 6, tests, typecheck, ESLint, implementation validation, freeze, or acceptance;
5. alter D4, D5, D6, predicates, terminal objects, terminal IDs, or terminal ordering;
6. edit any schema, enum, record kind, NodeKind, NodeLedger reason, dependency kind, or policy rule;
7. settle namespace `localName`, `typeOnly`, `bindingRecordIds`, child NodeLedger treatment, overlap, omission, dependency edges, exports, or later rows;
8. promote the namespace binding-owner hypothesis or candidate record identity into a complete canonical rule;
9. choose an exact representation for the missing structural distinction; or
10. create or alter any other formation record.

Exactly this formation record is created.

## 3. Fixed Inputs Not Reopened

The controlling canonical policy remains closed and unchanged at:

```text
schema=HH-CHECK-5-CLOSED-MEASUREMENT-POLICY-4
canonicalByteLength=422479
canonicalSha256=e39d39e1e510d5ffa79abcdc81dfef865fbe4d02bdacfd7e99e434c254295f7d
```

The following are fixed hypotheses or inherited results and are not reconsidered:

```text
IMPORT_DECLARATION.importKind=NAMESPACE
NAMESPACE_IMPORT_BINDING_OWNER_HYPOTHESIS=LOCAL_BINDING_IDENTIFIER
NAMESPACE_IMPORT_BINDING_RECORD_ID_CANDIDATE=<ROLE>:<IDENTIFIER_NS_NODE_ID>:IMPORTED_BINDING:0
NAMESPACE_IMPORT_BINDING_MODULE_CANDIDATE="module"
POLICY_4_CHANGED=false
NAMESPACE_BINDING_RULE_CANONICAL=false
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

The field's `string` type establishes storage syntax only. It does not establish semantic fitness or select a value.

## 4. Settled Semantic Role of `importedName`

The default review states:

> `importedName` records the imported or exported identity. `localName` records the source-local lexical identifier introduced by the binding node.

Its exact result is:

```text
import value from "module";

importedName="default"
localName="value"
```

The named review preserves source and local identity independently:

```text
import { a as b } from "module";

importedName="a"
localName="b"
```

Its settled rule is:

```text
NAMED_IMPORT_IMPORTED_NAME=SOURCE_IMPORTED_IDENTIFIER
NAMED_IMPORT_LOCAL_NAME=SOURCE_LOCAL_BINDING_IDENTIFIER
```

These results establish the semantic invariant:

> `importedName` identifies what is selected from the source module; `localName` identifies the lexical binding introduced in the importing module.

The value is not a description of syntax, a copy of the local name, or a copy of the module specifier.

## 5. Namespace Selection Semantics

For:

```ts
import * as ns from "module";
```

the settled namespace declaration review establishes:

```text
namespace syntax binds the module namespace object
namespace syntax does not select the module's default export
namespace syntax does not contain a NamedImports specifier list
IMPORT_DECLARATION.importKind=NAMESPACE
```

The source syntax has these distinct roles:

```text
"module" = source module identity
*        = namespace-selection syntax
ns       = source-local lexical binding identity
```

There is no source exported-name Identifier corresponding to the namespace object. The selected semantic object is the module namespace object as a whole, not one export named `*`, `namespace`, `NAMESPACE`, `ns`, or `module`.

Therefore:

```text
NAMESPACE_SELECTED_SOURCE_SEMANTIC_OBJECT=MODULE_NAMESPACE_OBJECT
NAMESPACE_SELECTED_SOURCE_EXPORTED_NAME=NONE
STAR_TOKEN_ROLE=NAMESPACE_SELECTION_SYNTAX
STAR_TOKEN_IS_SOURCE_EXPORTED_IDENTITY=false
```

## 6. Independent Candidate Evaluation

### 6.1 Candidate A - `importedName="*"`

Rejected. `*` is the source token that denotes namespace selection, but the settled field semantics require an imported or exported identity. The syntax does not select an export whose name is `*`.

Encoding `"*"` would turn an operation/form token into a name sentinel. A consumer would need an external convention saying that this otherwise string-valued name means the module namespace object only when `importKind=NAMESPACE`. That convention is not the existing semantic meaning of `importedName`.

```text
CANDIDATE_A_STAR=REJECTED_OPERATION_OR_FORM_TOKEN_NOT_IMPORTED_IDENTITY
```

### 6.2 Candidate B - `importedName="namespace"`

Rejected. `"namespace"` is descriptive prose for the selected semantic category. It is not a source exported identity and does not appear as the imported Identifier in the statement.

```text
CANDIDATE_B_NAMESPACE=REJECTED_DESCRIPTIVE_PROSE
```

### 6.3 Candidate C - `importedName="ns"`

Rejected. `ns` is the local lexical binding identity. Using it as `importedName` would conflate the two fields and would vary the imported identity when only the local alias changes.

```text
CANDIDATE_C_LOCAL_NS=REJECTED_LOCAL_IDENTITY_CONFLATION
```

### 6.4 Candidate D - `importedName="module"`

Rejected. `module` is the source module identity already carried by the separate `module` field. It is not an identity selected from within that module.

```text
CANDIDATE_D_MODULE=REJECTED_MODULE_IDENTITY_CONFLATION
```

### 6.5 Candidate E - `importedName="NAMESPACE"`

Rejected. `NAMESPACE` is the governed declaration-form value for `IMPORT_DECLARATION.importKind`. Copying it into `importedName` would conflate declaration classification with source imported identity.

```text
CANDIDATE_E_NAMESPACE_ENUM=REJECTED_DECLARATION_KIND_CONFLATION
```

### 6.6 Candidate F - another already-governed exact representation

Rejected. Existing formation documentation governs `"default"` for default exported identity and source imported Identifier spelling for named imports. It supplies no string representation for a module namespace object as an imported/exported name.

`ImportForm=NAMESPACE` and `importKind=NAMESPACE` classify import form. They do not supply a string-valued imported identity.

```text
CANDIDATE_F_OTHER_GOVERNED_STRING=NONE
```

### 6.7 Candidate G - stronger structural distinction required

**Selected.** The selected source semantic object is a module namespace object, which is categorically distinct from an imported/exported name. Faithful representation requires a closed semantic distinction between:

```text
STRING_VALUED_IMPORTED_OR_EXPORTED_IDENTITY
MODULE_NAMESPACE_OBJECT_IDENTITY
```

This is the minimum missing structural distinction. This review does not determine whether it should be represented by a tagged union, separate field, enum, record kind, or another schema design.

```text
CANDIDATE_G_STRONGER_STRUCTURAL_DISTINCTION_REQUIRED=SELECTED
```

### 6.8 Candidate H - exact semantic representation remains unresolved

Not selected. The unresolved point is no longer which string to choose. The semantic evidence establishes that the namespace object is not a string-valued imported/exported name. Choosing among more string sentinels cannot satisfy the settled field meaning.

The future representation remains undesigned, but the required semantic distinction is exact.

```text
CANDIDATE_H_EXACT_STRING_REMAINS_UNRESOLVED=NOT_SELECTED
```

## 7. Local-Name Independence Falsifier

Compare:

```ts
import * as first from "module";
import * as second from "module";
```

Only the local lexical binding changes:

```text
first statement localName="first"
second statement localName="second"
```

The selected source semantic object remains the same module namespace object. Therefore any faithful imported-identity representation must remain invariant.

Candidate C fails because:

```text
importedName="first" != importedName="second"
```

would make imported identity depend on local alias spelling.

```text
LOCAL_NAME_INDEPENDENCE=PASS
LOCAL_NAME_AS_IMPORTED_IDENTITY=REJECTED
```

## 8. Module Independence Falsifier

Compare:

```ts
import * as ns from "module-a";
import * as ns from "module-b";
```

The module identities differ, but each statement selects the same semantic category: its source module's namespace object. That category must not be encoded by duplicating the module field.

Candidate D fails because `importedName="module-a"` and `importedName="module-b"` would record source module identity rather than what kind of source entity is bound.

```text
MODULE_INDEPENDENCE=PASS
MODULE_NAME_AS_IMPORTED_IDENTITY=REJECTED
```

## 9. Default-Import Distinction Falsifier

Compare:

```ts
import value from "module";
import * as value from "module";
```

The local spelling and source module are identical. The selected source semantics differ:

```text
default form selects imported/exported identity "default"
namespace form selects the module namespace object
```

Therefore the namespace binding cannot use:

```text
importedName="default"
```

and cannot derive imported identity from local spelling `value`.

```text
DEFAULT_IMPORT_DISTINCTION=PASS
NAMESPACE_IDENTITY_IS_DEFAULT=false
```

## 10. Named-Import Distinction Falsifier

Compare:

```ts
import { thing as ns } from "module";
import * as ns from "module";
```

The local binding and source module are identical. The selected source semantics differ:

```text
named form selects source exported identity "thing"
namespace form selects the module namespace object
```

The namespace form contains no source imported Identifier corresponding to `thing` or any other single export name. Therefore localName cannot determine importedName, and namespace selection cannot be coerced into named-import identity semantics.

```text
NAMED_IMPORT_DISTINCTION=PASS
NAMESPACE_IDENTITY_IS_NAMED_EXPORT=false
```

## 11. Round-Trip Semantic Sufficiency Test

The required round-trip inputs are:

```text
module
importedName
localName
typeOnly
IMPORT_DECLARATION.importKind=NAMESPACE
```

Test Candidate A:

```text
importedName="*"
```

A consumer can recover namespace form from `importKind=NAMESPACE`, but it cannot interpret `"*"` as an imported identity under the settled `importedName` semantics. It must apply an extra sentinel convention:

```text
if importKind=NAMESPACE and importedName="*"
then ignore ordinary imported-name meaning and interpret as MODULE_NAMESPACE_OBJECT
```

That convention is implementation-specific judgement unless separately governed. The same defect applies to `"namespace"`, `"NAMESPACE"`, or any other sentinel string. The declaration kind supplies form, but it does not transform a non-name token into an imported/exported name.

The faithful semantic reconstruction is instead:

```text
source module=<module field>
selected source entity category=MODULE_NAMESPACE_OBJECT
local lexical identity=<localName field>
type status=<typeOnly field>
```

The existing record has no closed structural place for `selected source entity category=MODULE_NAMESPACE_OBJECT` distinct from `importedName:string`.

```text
ROUND_TRIP_WITH_EXISTING_STRING_IMPORTED_NAME=FAIL
ROUND_TRIP_REQUIRES_PROSE_OR_SENTINEL_CONVENTION=true
ROUND_TRIP_WITH_CLOSED_MODULE_NAMESPACE_IDENTITY_VARIANT=SEMANTICALLY_SUFFICIENT_IN_PRINCIPLE
```

The last result identifies required semantic capacity only; it does not design or validate a schema.

## 12. Minimum Missing Structural Distinction

The minimum missing distinction is exactly:

> `IMPORTED_BINDING` must distinguish a binding to the module namespace object from a binding to a string-valued imported or exported identity.

Machine-oriented result:

```text
MINIMUM_MISSING_STRUCTURAL_DISTINCTION=MODULE_NAMESPACE_OBJECT_IDENTITY_DISTINCT_FROM_STRING_IMPORTED_OR_EXPORTED_IDENTITY
CURRENT_IMPORTED_NAME_STRING_SEMANTIC_CAPACITY=INSUFFICIENT_FOR_NAMESPACE_OBJECT
NEW_FIELD_DESIGN=NOT_PERFORMED
NEW_ENUM_DESIGN=NOT_PERFORMED
NEW_UNION_DESIGN=NOT_PERFORMED
NEW_RECORD_KIND_DESIGN=NOT_PERFORMED
POLICY_4_CHANGED=false
```

No larger change is established. The review does not decide where, how, or under what identifier the distinction must be encoded.

## 13. Exact Semantic Result

No `NAMESPACE_IMPORTED_BINDING_IMPORTED_NAME=<string>` result is recorded because Outcome 1 is not justified.

The bounded result is:

```text
NAMESPACE_IMPORTED_BINDING_IMPORTED_NAME=NO_FAITHFUL_STRING_VALUE
NAMESPACE_IMPORTED_BINDING_SELECTED_SEMANTIC_IDENTITY=MODULE_NAMESPACE_OBJECT
NAMESPACE_IMPORTED_BINDING_IMPORTED_NAME_SCHEMA_STATUS=STRUCTURALLY_INSUFFICIENT
SELECTED_CANDIDATE=G
OUTCOME=3
```

This result settles only why no existing string is semantically valid. It does not create a canonical namespace binding rule or a replacement schema.

## 14. Later Namespace Values Not Reached

This review does not settle or resume:

```text
NAMESPACE_IMPORT_LOCAL_NAME=NOT_REACHED
NAMESPACE_IMPORT_TYPE_ONLY=NOT_REACHED
NAMESPACE_IMPORT_DECLARATION_BINDING_RECORD_IDS=NOT_REACHED
IMPORT_CLAUSE_LEDGER_REASON=NOT_REACHED
NAMESPACE_IMPORT_LEDGER_REASON=NOT_REACHED
LOCAL_NAMESPACE_IDENTIFIER_LEDGER_REASON=NOT_REACHED
MODULE_SPECIFIER_LEDGER_REASON=NOT_REACHED
NAMESPACE_IMPORT_BINDING_OVERLAP=NOT_REACHED
NAMESPACE_IMPORT_BINDING_OMISSION=NOT_REACHED
DEPENDENCY_EDGE_OWNERSHIP=NOT_REACHED
EXPORT_ROWS=NOT_REACHED
```

The owner and record-ID hypotheses remain unpromoted:

```text
NAMESPACE_IMPORT_BINDING_OWNER_PROMOTED=false
NAMESPACE_IMPORT_BINDING_RECORD_ID_PROMOTED=false
NAMESPACE_BINDING_RULE_CANONICAL=false
```

Because Outcome 1 is not selected, the sentence authorizing resume at `localName` is not stated and no documentation-level resume point is established.

## 15. Outcome Decision

### Outcome 1 - one exact existing string representation justified

Not selected. No candidate string denotes a source imported/exported identity for the module namespace object. In particular, `*` denotes namespace-selection syntax rather than an export name.

### Outcome 2 - string storage sufficient but exact string ungoverned

Not selected. The semantic category is now determined and exposes a structural mismatch: a module namespace object is not a string-valued imported/exported name. The problem is not merely failure to choose among otherwise faithful strings.

### Outcome 3 - stronger structural distinction required

**Selected.** Namespace syntax selects the module namespace object, while `importedName` is settled as a source imported/exported identity. Faithful representation therefore requires the minimum closed distinction identified in Section 12. No schema design or policy edit is performed.

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

No Authority is granted or implied to design or add the missing structural distinction; edit POLICY-4; promote namespace owner or record-ID hypotheses; settle localName, typeOnly, declaration linkage, child-ledger treatment, overlap, omission, dependency edges, exports, or later rows; inspect governed implementation source; inspect, construct, modify, validate, or execute an instrument; alter D4, D5, D6, predicates, terminal objects, IDs, or ordering; run Check 5 or Check 6; freeze policy; or accept implementation.

This one-record semantic review stops here.
