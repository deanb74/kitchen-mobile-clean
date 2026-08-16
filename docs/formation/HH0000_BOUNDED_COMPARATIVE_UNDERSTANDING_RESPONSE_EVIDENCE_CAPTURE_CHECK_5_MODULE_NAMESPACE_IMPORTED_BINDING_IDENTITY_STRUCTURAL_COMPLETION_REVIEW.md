# HH-0000 Check 5 Module Namespace Imported Binding Identity Structural Completion Review

**Status:** OUTCOME 1 - MINIMUM IMPORTED-IDENTITY STRUCTURE FULLY DETERMINED AT SCHEMA-DESIGN LEVEL
**Review date:** 2026-08-15
**Review type:** Documentation-only bounded structural-design completion review
**Controlling review:** `HH-0000 CHECK 5 NAMESPACE IMPORTED BINDING IMPORTED-NAME SEMANTIC COMPLETION REVIEW`
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
**Theory:** Imported identity is one closed semantic choice: either a string-valued imported/exported name or the module namespace object, never both and never an untyped sentinel.
**Architecture:** One schema-local replacement of `importedName:string` with an exact-one tagged `ImportedIdentity` variant, preserving module, local name, type-only status, record kind, and all unrelated structures.
**Engineering:** Eight-candidate comparison, closed-shape validation, seven invalid-combination falsifiers, default/named preservation tests, namespace round-trip test, schema-locality test, and exact POLICY-4 non-mutation boundary.
**Milestone:** Not Applicable.
**Evidence:** The controlling semantic completion review, settled default/named binding meanings, established closed tagged-variant schema convention, and the exact closed POLICY-4 identity. This review produces no corrected policy payload, implementation observation, instrument, Check 5, Check 6, freeze, or acceptance Evidence.

## 1. Sole Question and Decision

> What is the minimum closed structural representation that allows `IMPORTED_BINDING` to represent either a string-valued imported/exported identity or the module namespace object without sentinel strings, ambiguity, duplicated meaning, or unnecessary widening?

**Replace `importedName:string` with one closed exact-one tagged `importedIdentity` field. Outcome 1 is selected.**

The exact semantic shape at schema-design level is:

```text
ImportedIdentity = exactly one tagged variant:
  {kind:"IMPORTED_OR_EXPORTED_NAME",name:string}
  {kind:"MODULE_NAMESPACE_OBJECT"}

IMPORTED_BINDING {
  module:string,
  importedIdentity:ImportedIdentity,
  localName:string,
  typeOnly:boolean
}
```

Every object is closed and every displayed field is required. The `IMPORTED_OR_EXPORTED_NAME` variant therefore requires `name`; the `MODULE_NAMESPACE_OBJECT` variant has no `name` field and rejects one as an additional property.

This is one identity channel, not a retained string plus a parallel discriminator. It directly represents the two settled semantic categories and makes coexistence mechanically invalid.

## 2. Strict Boundary

This review resolves only the minimum structural design for imported identity. It did not:

1. reopen, reread, reconstruct, modify, regenerate, revalidate, or reserialize POLICY-4;
2. inspect, open, read, hash, parse, or otherwise access governed implementation source;
3. inspect, construct, modify, readiness-test, validate, or execute an instrument;
4. run Check 5, Check 6, tests, typecheck, ESLint, implementation validation, freeze, or acceptance;
5. alter D4, D5, D6, predicates, terminal objects, terminal IDs, or terminal ordering;
6. add a RecordKind, NodeKind, NodeLedger reason, predicate, operation, dependency kind, terminal value, or unrelated enum;
7. settle namespace `localName`, `typeOnly`, declaration linkage, child NodeLedger treatment, overlap, omission, dependency edges, exports, or later rows;
8. promote the namespace binding-owner hypothesis or candidate record identity into a complete canonical binding rule;
9. author a corrected canonical payload or choose POLICY-5 or another successor identifier; or
10. alter any existing formation or governance record.

Exactly this formation record is created.

## 3. Fixed Semantic Inputs

The controlling review settles:

```text
MINIMUM_MISSING_STRUCTURAL_DISTINCTION=MODULE_NAMESPACE_OBJECT_IDENTITY_DISTINCT_FROM_STRING_IMPORTED_OR_EXPORTED_IDENTITY
CURRENT_IMPORTED_NAME_STRING_SEMANTIC_CAPACITY=INSUFFICIENT_FOR_NAMESPACE_OBJECT
```

The two semantic categories are fixed:

```text
named/default imported identity=STRING_VALUED_IMPORTED_OR_EXPORTED_IDENTITY
namespace imported identity=MODULE_NAMESPACE_OBJECT_IDENTITY
```

The namespace object is not represented by:

```text
importedName="*"
importedName="namespace"
importedName="NAMESPACE"
importedName=<localName>
importedName=<module>
importedName="default"
```

This review does not reopen those findings. It asks only how the existing binding record can carry the two categories faithfully.

## 4. Existing and Corrected Record Shapes

### 4.1 Existing closed POLICY-4 shape

```text
IMPORTED_BINDING {
  module:string,
  importedName:string,
  localName:string,
  typeOnly:boolean
}
```

The existing `importedName` field is sufficient for default and named imports but cannot represent module namespace identity without a sentinel convention.

### 4.2 Minimum corrected shape at design level

```text
ImportedIdentity = exactly one tagged variant:
  {kind:"IMPORTED_OR_EXPORTED_NAME",name:string}
  {kind:"MODULE_NAMESPACE_OBJECT"}

IMPORTED_BINDING {
  module:string,
  importedIdentity:ImportedIdentity,
  localName:string,
  typeOnly:boolean
}
```

The exact field change is:

```text
remove importedName:string
add importedIdentity:ImportedIdentity
```

Unchanged fields are:

```text
module:string
localName:string
typeOnly:boolean
```

The record remains `RecordKind=IMPORTED_BINDING`. No separate namespace record, optional field, nullable field, boolean, sentinel, or open extension point is introduced.

## 5. Why These Names Are Derived

The field name `importedIdentity` follows the already-settled semantic role: the field represents the selected source identity, not necessarily a name. The tagged variants follow the two fixed semantic categories:

```text
IMPORTED_OR_EXPORTED_NAME
MODULE_NAMESPACE_OBJECT
```

`NAMED` is not used because default import also carries the string-valued identity `"default"`; calling that variant `NAMED` could incorrectly imply named-import syntax only.

`NAMESPACE` alone is not used because it could denote declaration form rather than the selected module namespace object. `MODULE_NAMESPACE_OBJECT` names the settled semantic object directly.

These names are derived from the governing semantic findings, not adopted from the candidate examples.

## 6. Closed Validation Semantics

The repository's established schema notation defines exact-one tagged variants and closed objects with all displayed fields required. Applying that convention gives:

```text
kind="IMPORTED_OR_EXPORTED_NAME"
=> name is required and is a string
=> no unlisted field is permitted

kind="MODULE_NAMESPACE_OBJECT"
=> name is absent
=> supplying name is invalid
=> no unlisted field is permitted

kind=<any other value>
=> invalid
```

The two variants are disjoint. A record cannot claim both categories because `importedIdentity` contains exactly one closed tagged object.

```text
IMPORTED_IDENTITY_VARIANT_CARDINALITY=EXACTLY_ONE
IMPORTED_IDENTITY_OBJECTS_CLOSED=true
IMPORTED_IDENTITY_UNKNOWN_KIND_ALLOWED=false
IMPORTED_IDENTITY_DUPLICATE_CHANNEL_ALLOWED=false
```

## 7. Candidate Evaluation

| Candidate | Decision | Exact reason |
| --- | --- | --- |
| A. Replace the string with one closed tagged identity union | **Selected** | One field directly represents exactly one of the two semantic categories; invalid combinations fail by closed shape; no sentinel or parallel channel exists |
| B. Retain the string and add a discriminator | Rejected | Duplicates identity across two fields, requires conditional requiredness/prohibition, and admits more cross-field invalid combinations than one exact-one union |
| C. Retain the string and add a namespace boolean | Rejected | A boolean does not name the positive non-namespace category, leaves the string semantically present for namespace identity, and creates contradictory field combinations |
| D. Retain a reserved string sentinel | Rejected | Reopens the settled prohibition on sentinel strings and requires external interpretation |
| E. Add a namespace-specific binding RecordKind | Rejected | The existing `IMPORTED_BINDING` abstraction correctly owns common module, local, and type-only binding facts; only its imported-identity field lacks one variant |
| F. Split named/default and namespace binding schemas | Rejected | Duplicates the common binding shape and widens record-model branching when one local identity union is sufficient |
| G. Another smaller already-governed treatment | Not selected | No smaller governed treatment directly represents both semantic categories and mechanically excludes sentinels and mixed claims |
| H. Existing schema is adequate | Rejected | The controlling semantic review proves `importedName:string` insufficient for module namespace object identity |

Candidate A is necessary and sufficient. It changes one field at the exact location of the semantic mismatch and preserves the containing record abstraction.

## 8. Existing Default and Named Import Preservation

### 8.1 Default import

For:

```ts
import value from "module";
```

the settled meaning remains:

```text
module="module"
importedIdentity={kind:"IMPORTED_OR_EXPORTED_NAME",name:"default"}
localName="value"
typeOnly=false
```

The identity string `"default"` is preserved exactly; only its semantic category becomes explicit.

### 8.2 Unaliased named import

For:

```ts
import { a } from "module";
```

the settled meaning remains:

```text
module="module"
importedIdentity={kind:"IMPORTED_OR_EXPORTED_NAME",name:"a"}
localName="a"
typeOnly=false
```

### 8.3 Aliased named import

For:

```ts
import { a as b } from "module";
```

the settled meaning remains:

```text
module="module"
importedIdentity={kind:"IMPORTED_OR_EXPORTED_NAME",name:"a"}
localName="b"
typeOnly=false
```

The imported identity remains `"a"`; the independent local identity remains `"b"`. No existing default or named meaning is weakened, conflated, or discarded.

```text
DEFAULT_IMPORT_MEANING_PRESERVED=true
NAMED_IMPORT_MEANING_PRESERVED=true
ALIASED_NAMED_IMPORT_IMPORTED_LOCAL_DISTINCTION_PRESERVED=true
```

## 9. Namespace Representation

For the source form:

```ts
import * as ns from "module";
```

the imported-identity portion is represented exactly as:

```text
module="module"
importedIdentity={kind:"MODULE_NAMESPACE_OBJECT"}
```

The existing `localName` field remains an independent place for local lexical identity. This review does not settle its namespace value:

```text
localName=<NOT_SETTLED_BY_THIS_REVIEW>
typeOnly=<NOT_SETTLED_BY_THIS_REVIEW>
```

No source exported name is invented. The identity object carries no `name` field.

```text
NAMESPACE_IMPORTED_IDENTITY=MODULE_NAMESPACE_OBJECT
NAMESPACE_IMPORTED_NAME_FIELD_PRESENT=false
NAMESPACE_SENTINEL_STRING_USED=false
```

## 10. Round-Trip Sufficiency

Given a binding record containing:

```text
module="module"
importedIdentity={kind:"MODULE_NAMESPACE_OBJECT"}
localName=<existing independent local identity field>
typeOnly=<existing independent type-status field>
```

and its declaration record containing:

```text
importKind=NAMESPACE
```

a consumer can reconstruct without prose or implementation-specific judgement:

```text
source module identity="module"
selected source entity=MODULE_NAMESPACE_OBJECT
binding form=NAMESPACE
local lexical identity=<localName>
type status=<typeOnly>
```

No string sentinel table or conditional reinterpretation of a name is required. The binding and declaration agree directly on namespace semantics.

```text
NAMESPACE_ROUND_TRIP_REQUIRES_EXTERNAL_CONVENTION=false
NAMESPACE_ROUND_TRIP_SEMANTIC_SUFFICIENCY=PASS
```

This test proves structural sufficiency only. It does not settle the later namespace `localName` or `typeOnly` values.

## 11. Invalid-Combination Falsifiers

### 11.1 Named identity with missing name

```text
{kind:"IMPORTED_OR_EXPORTED_NAME"}
```

Invalid because the closed variant requires `name:string`.

### 11.2 Module namespace identity with ordinary imported name

```text
{kind:"MODULE_NAMESPACE_OBJECT",name:"thing"}
```

Invalid because the closed namespace variant has no `name` field and rejects additional properties.

### 11.3 Unknown or open identity kind

```text
{kind:"UNKNOWN"}
{kind:"OTHER",name:"thing"}
```

Invalid because the tag set is closed to exactly two values.

### 11.4 Duplicate identity channels

A record containing both `importedIdentity` and legacy `importedName` is invalid under the corrected closed `IMPORTED_BINDING` field set. The old field is replaced, not retained.

### 11.5 Default import represented as module namespace

```text
importKind=DEFAULT_VALUE
importedIdentity={kind:"MODULE_NAMESPACE_OBJECT"}
```

Invalid under the directly dependent declaration/binding consistency rule: default declaration form requires the imported/exported-name variant with `name="default"`.

### 11.6 Namespace import represented as named identity

```text
importKind=NAMESPACE
importedIdentity={kind:"IMPORTED_OR_EXPORTED_NAME",name:"thing"}
```

Invalid under the directly dependent declaration/binding consistency rule: namespace declaration form requires the module-namespace-object variant.

### 11.7 Named alias losing imported/local distinction

For `import { a as b } from "module";`:

```text
importedIdentity={kind:"IMPORTED_OR_EXPORTED_NAME",name:"a"}
localName="b"
```

is required. Replacing `name` with `"b"` loses source imported identity; replacing `localName` with `"a"` loses local lexical identity. The corrected structure preserves both independent channels.

```text
INVALID_COMBINATION_FALSIFIERS=7/7 PASS
```

## 12. Compatibility With `localName`

The correction does not modify or reinterpret `localName:string`:

```text
importedIdentity=<selected source identity category and payload>
localName=<source-local lexical identity>
```

The fields remain independent. The new structure prevents namespace imported identity from being forced into `localName`, but it does not settle the namespace local-name derivation itself.

```text
LOCAL_NAME_FIELD_CHANGED=false
NAMESPACE_LOCAL_NAME_DERIVATION=NOT_RESUMED
```

## 13. Minimality

The selected correction changes exactly one field in one existing record schema:

```text
IMPORTED_BINDING.importedName:string
=> IMPORTED_BINDING.importedIdentity:ImportedIdentity
```

It does not require:

```text
new RecordKind
new NodeKind
new NodeLedger reason
new predicate
new operation
new dependency kind
new terminal value
new binding record
new declaration field
parallel identity discriminator
namespace boolean
sentinel string
```

A smaller change would have to retain `importedName:string`, but the controlling semantic review proves that field semantically insufficient for the module namespace object. A larger change would duplicate or widen structure already shared correctly by all imported bindings.

```text
SELECTED_CANDIDATE=A
MINIMUM_STRUCTURAL_CHANGE=REPLACE_IMPORTED_NAME_WITH_CLOSED_IMPORTED_IDENTITY_TAGGED_UNION
IMPORTED_BINDING_ABSTRACTION_RETAINED=true
LARGER_RECORD_MODEL_CHANGE_REQUIRED=false
```

## 14. Schema Locality and Direct Consistency Consequences

The minimum correction remains local to `IMPORTED_BINDING` record payload structure. No other record kind or field must change to store the distinction.

Directly dependent consistency representations are limited to rules or schema descriptions that:

1. repeat the exact `IMPORTED_BINDING` field inventory;
2. require default or named declaration forms to use `IMPORTED_OR_EXPORTED_NAME` identity;
3. require namespace declaration form to use `MODULE_NAMESPACE_OBJECT` identity; or
4. describe `importedName` as the imported/exported identity field.

Those representations must be updated consistently in any future corrected candidate because otherwise closed validation or declaration/binding agreement would contradict the corrected shape.

No unrelated schema, enum, derivation, capture, manifest, one-use, failure, PASS, predicate, or terminal representation is implicated.

```text
SCHEMA_CORRECTION_LOCALITY=IMPORTED_BINDING
DIRECTLY_DEPENDENT_CONSISTENCY_REPRESENTATION_REQUIRED=true
OTHER_RECORD_SCHEMA_CHANGE_REQUIRED=false
```

This review identifies the consistency consequence only. It does not author or enumerate changed canonical payload paths.

## 15. Current POLICY-4 Consequence

POLICY-4 remains closed and unchanged at:

```text
schema=HH-CHECK-5-CLOSED-MEASUREMENT-POLICY-4
canonicalByteLength=422479
canonicalSha256=e39d39e1e510d5ffa79abcdc81dfef865fbe4d02bdacfd7e99e434c254295f7d
```

Its exact `IMPORTED_BINDING` schema still contains `importedName:string`. The selected design changes that closed schema and therefore cannot be treated as an interpretation of the existing bytes.

```text
DERIVATION_BLOCKER=RESOLVED_AT_SCHEMA_DESIGN_LEVEL
CURRENT_POLICY_4_CHANGED=false
CLOSED_CANONICAL_POLICY_CORRECTION_REQUIRED=true
```

This review does not choose POLICY-5 or another successor identifier, construct a candidate, calculate canonical bytes, grant closure, or authorize a correction action.

## 16. Later Derivation Questions Not Reached

This review does not resume or settle:

```text
NAMESPACE_IMPORT_BINDING_OWNER_PROMOTION=NOT_REACHED
NAMESPACE_IMPORT_BINDING_RECORD_ID_PROMOTION=NOT_REACHED
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

No documentation-level derivation resume point is established until a separately governed canonical-policy correction closes the required structural distinction.

## 17. Outcome Decision

### Outcome 1 - one minimum structural representation fully determined

**Selected.** One closed exact-one tagged identity field within `IMPORTED_BINDING` represents both settled semantic categories, rejects invalid combinations mechanically, preserves default and named imports, provides namespace round-trip sufficiency, and requires no larger record-model change.

### Outcome 2 - direction clear but exact structural choice unresolved

Not selected. The established closed tagged-variant convention supplies one exact field-local shape, and every competing locally sufficient treatment is strictly larger or less closed.

### Outcome 3 - `IMPORTED_BINDING` is the wrong abstraction

Not selected. The record's module, local identity, and type-status responsibilities remain common to default, named, and namespace bindings. Only imported identity requires a closed semantic variant.

## 18. Authority Boundary and Stop

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

No Authority is granted or implied to edit POLICY-4; choose a successor policy identifier; construct or validate a corrected candidate; author the directly dependent consistency representations; resume namespace binding derivation; settle localName, typeOnly, linkage, child-ledger, overlap, omission, dependency edges, exports, or later rows; inspect governed implementation source; inspect, construct, modify, validate, or execute an instrument; alter D4, D5, D6, predicates, terminal objects, IDs, or ordering; run Check 5 or Check 6; freeze policy; or accept implementation.

This one-record structural-design review stops here.
