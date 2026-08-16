# HH-0000 Check 5 Import Declaration Fact Kind Semantic Definition Authority Review

**Status:** OUTCOME 1 - NEW BOUNDED SEMANTIC DEFINITION AUTHORISED BY THIS REVIEW
**Review date:** 2026-08-15
**Review type:** Documentation-only bounded semantic-definition Authority review
**Controlling input 1:** `HH-0000 CHECK 5 IMPORT DECLARATION FACT KIND SEMANTIC DEFINITION COMPLETION REVIEW`
**Controlling input 2:** `HH-0000 CHECK 5 GOVERNED FACT KIND SEMANTIC DEFINITION FRAMEWORK REVIEW`
**Controlling input 3:** `HH-0000 CHECK 5 GOVERNED FACT SEMANTIC MEANING FRAMEWORK REVIEW`
**Controlling input 4:** `HH-0000 CHECK 5 DEPENDENCY RELATIONSHIP SEMANTIC SUBJECT FRAMEWORK REVIEW`
**Controlling input 5:** `HH-0000 CHECK 5 NAMESPACE IMPORT COMPLETION SYNTHESIS REVIEW`
**Controlling input 6:** `HH-0000 CHECK 5 NAMESPACE IMPORT UNDERSTANDING BOUNDARY REVIEW`
**Authority scope:** `IMPORT_DECLARATION` fact-kind semantic-definition authoring only
**Previous definition status:** Missing; not previously governed
**New semantic definition authored:** Yes
**Instance semantic meaning resumed:** No
**Semantic-subject analysis resumed:** No
**Participant eligibility resumed:** No
**Dependency relationship kind defined:** None
**Participant role domains defined:** None
**Examination unit selected:** None
**Candidate pairs constructed:** None
**Relationship roles assigned:** None
**Dependency relationship established:** None
**Dependency edge created:** None
**Edge owner assigned:** None
**Edge identity assigned:** None
**Dependency enumeration performed:** None
**Cardinality assigned:** None
**Boundary completeness claimed:** No
**Graph constructed:** None
**Exports or re-exports analysed:** None
**Governed implementation-source access:** None
**POLICY-5 access or effect:** None
**Check 5:** `UNMEASURED`
**Check 6:** `NOT RUN`
**Authority effect:** Temporary authoring Authority used only within this review for this fact kind

# Repository Traceability

**Principle:** Truth before certainty; new governance must be identified as new; representation, semantic meaning, subject, participation, relationship, and edge remain distinct; human Authority.
**Theory:** A fact-kind semantic definition may be authored when closed representation responsibilities and architecture boundaries support one precise meaning without pretending that meaning was historically governed.
**Architecture:** One declaration-level `IMPORT_DECLARATION` fact, one independently owned binding fact, explicit declaration-to-binding linkage, closed internal representation, and an unstarted relationship boundary support one bounded declaration fact definition.
**Engineering:** Candidate-purpose comparison, seven falsifiers, field contributions, assertion class, assertion domain, representation equivalence, failure treatment, new-governance markers, non-promotions, mandatory stops, and explicit Authority boundary.
**Milestone:** Not Applicable.
**Evidence:** The six controlling reviews only. This review creates new fact-kind semantic-definition Evidence for `IMPORT_DECLARATION`. It creates no instance semantic meaning, semantic-subject status, participant eligibility, relationship kind, role domain, examination unit, pair, participant, role, relationship, edge, owner, edge identity, enumeration, cardinality, boundary-completeness, graph, export, re-export, policy, implementation, Check 5, Check 6, freeze, or acceptance Evidence.

## 1. Purpose and Authority Question

The previous completion review correctly recorded:

```text
IMPORT_DECLARATION_EXACT_FACT_KIND_IDENTITY=PASS
IMPORT_DECLARATION_AUTHORITATIVE_SEMANTIC_PURPOSE_OR_ASSERTION_CLASS=UNKNOWN
FIRST_UNRESOLVED_IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_CONDITION=AUTHORITATIVE_SEMANTIC_PURPOSE_OR_ASSERTION_CLASS
```

This review is not another attempt to discover an old definition. It asks whether bounded formation Authority may author a new definition from already-closed representation responsibilities and architecture boundaries.

The fixed representation Evidence is treated as representation Evidence only:

```text
IMPORT_DECLARATION:
  module="module"
  importKind=NAMESPACE
  bindingRecordIds=[
    <ROLE>:<IDENTIFIER_NS_NODE_ID>:IMPORTED_BINDING:0
  ]
ImportDeclaration owns IMPORT_DECLARATION
Identifier("ns") owns IMPORTED_BINDING
bindingRecordIds references the Identifier-owned binding record
bindingRecordIds does not transfer ownership
NAMESPACE_IMPORT_INTERNAL_REPRESENTATION=COMPLETE
NAMESPACE_IMPORT_OWNERSHIP=CLOSED
NAMESPACE_IMPORT_OVERLAP=CLOSED
NAMESPACE_IMPORT_OMISSION=CLOSED
NAMESPACE_IMPORT_NODELEDGER_ACCOUNTING=CLOSED
NAMESPACE_IMPORT_RELATIONSHIP_ANALYSIS=NOT_STARTED
```

These facts constrain a new definition; they do not claim that the definition previously existed.

## 2. Outcome Test

### Outcome 1 - bounded semantic-definition authoring is authorised

**Selected.** The closed Evidence establishes one declaration-owned governed fact, separately represents the binding fact, preserves the declaration-to-binding association as linkage, and explicitly leaves dependency and export relationship surfaces unstarted. Candidate A can be authored without assigning the declaration the identity of another fact, a syntax node, a relationship, or an edge.

### Outcome 2 - one semantic boundary remains unresolved before authoring

Not selected. The representation boundaries required to author a bounded declaration-level fact are closed. The definition itself will state what it does not assert.

### Outcome 3 - Evidence is insufficient without unsupported semantics or a new distinction

Not selected. The bounded definition below is a new governance decision grounded in the closed representation responsibilities, not an inference that an old definition existed.

```text
SELECTED_OUTCOME=OUTCOME_1
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_AUTHORING=AUTHORISED
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_PREVIOUSLY_GOVERNED=false
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_AUTHORED_NOW=true
```

## 3. Candidate Semantic-Purpose Analysis

### Candidate A - declaration-level governed fact

**Selected.** `IMPORT_DECLARATION` represents the governed fact that one source-level import declaration exists, identifying its direct source-module identity, its governed import form, and the governed local binding records belonging to that declaration.

This definition treats the declaration as a declaration-level semantic occurrence. It does not treat its fields as a field bag, and it does not make the declaration identical to any carried identity or linkage.

### Candidate B - the source module itself

Rejected. The source-module identity is represented within the declaration payload but remains distinct from the declaration fact.

### Candidate C - the imported binding or binding set itself

Rejected. `IMPORTED_BINDING` is separately governed and owned by `Identifier("ns")`; declaration linkage does not transfer that fact’s identity or ownership.

### Candidate D - a dependency relationship

Rejected. Relationship analysis is explicitly `NOT_STARTED`; this fact-kind definition establishes no dependency semantics.

### Candidate E - an AST `ImportDeclaration` node as syntax

Rejected. The semantic fact is represented through governed records and payload; syntax is not the fact-kind semantic definition.

### Candidate F - merely a storage or container record

Rejected. The closed representation assigns declaration-level governed responsibility to the `IMPORT_DECLARATION` record. The new definition gives that responsibility a bounded semantic meaning without collapsing contained identities into it.

### Candidate G - another meaning supported by controlling Evidence

No other exact meaning is supported by the controlling Evidence.

### Candidate H - semantic purpose remains unresolved

Not selected. This Authority review deliberately resolves the missing general purpose as new governance within the closed representation boundary.

```text
IMPORT_DECLARATION_SEMANTIC_PURPOSE=GOVERNED_DECLARATION_LEVEL_FACT_THAT_ONE_SOURCE_LEVEL_IMPORT_DECLARATION_EXISTS_AND_IDENTIFIES_DIRECT_SOURCE_MODULE_IDENTITY_GOVERNED_IMPORT_FORM_AND_GOVERNED_LOCAL_BINDING_RECORDS
IMPORT_DECLARATION_ASSERTION_CLASS=DECLARATION_FACT
IMPORT_DECLARATION_REFERENT_OR_ASSERTION_DOMAIN=GOVERNED_SOURCE_LEVEL_IMPORT_DECLARATION_AS_DECLARATION_LEVEL_SEMANTIC_OCCURRENCE
```

`DECLARATION_FACT` is semantic classification only; no new enum, schema value, or structural requirement is created.

## 4. Exact New Semantic Definition

```text
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION=AN_IMPORT_DECLARATION_IS_THE_GOVERNED_DECLARATION_LEVEL_FACT_THAT_ONE_SOURCE_LEVEL_IMPORT_DECLARATION_EXISTS_IDENTIFYING_ITS_DIRECT_SOURCE_MODULE_IDENTITY_ITS_GOVERNED_IMPORT_FORM_AND_THE_GOVERNED_LOCAL_BINDING_RECORDS_BELONGING_TO_THAT_DECLARATION
```

Prose form:

> An `IMPORT_DECLARATION` is the governed declaration-level fact that one source-level import declaration exists, identifying its direct source-module identity, its governed import form, and the governed local binding records belonging to that declaration.

This is **new governance established by this Authority review**. It is not recovered history, implementation behaviour, schema inference, or a claim that the previous reviews had already governed the definition.

## 5. Mandatory Field Contributions

The field contributions are part of the newly authored fact-kind definition, while each field remains distinct from the whole fact meaning:

```text
IMPORT_DECLARATION_MODULE_CONTRIBUTION=IDENTIFIES_THE_DIRECT_SOURCE_MODULE_IDENTITY_REFERENCED_BY_THIS_DECLARATION_FACT
IMPORT_DECLARATION_IMPORTKIND_CONTRIBUTION=CLASSIFIES_THE_GOVERNED_IMPORT_FORM_OF_THIS_DECLARATION
IMPORT_DECLARATION_BINDINGRECORDIDS_CONTRIBUTION=IDENTIFIES_THE_GOVERNED_LOCAL_BINDING_RECORDS_BELONGING_TO_THIS_DECLARATION_WITHOUT_TRANSFERRING_OWNERSHIP_OF_THOSE_BINDING_FACTS
IMPORT_DECLARATION_FIELD_CONTRIBUTIONS_ARE_WHOLE_FACT_MEANING=false
IMPORT_DECLARATION_SEMANTIC_DEFINITION_IS_FIELD_INVENTORY=false
```

The contribution of `bindingRecordIds` is association and membership-in-the-declaration representation; it is not itself a dependency relationship.

## 6. Exact Semantic Boundary

The newly authored definition asserts declaration-level existence and the bounded identities and form required to represent that declaration. It does not assert:

1. that the source module exists at runtime;
2. that any dependency semantics hold;
3. that graph adjacency exists;
4. that the declaration is the imported binding itself;
5. that the declaration is the source module itself;
6. that the declaration is the local lexical identity itself;
7. that the declaration is the module namespace object identity itself;
8. that binding ownership transfers to the declaration;
9. that exports or re-exports exist; or
10. any implementation behaviour.

```text
IMPORT_DECLARATION_ASSERTS_SOURCE_MODULE_RUNTIME_EXISTENCE=false
IMPORT_DECLARATION_ASSERTS_DEPENDENCY_SEMANTICS=false
IMPORT_DECLARATION_ASSERTS_GRAPH_ADJACENCY=false
IMPORT_DECLARATION_ASSERTS_IMPORTED_BINDING_IDENTITY=false
IMPORT_DECLARATION_ASSERTS_SOURCE_MODULE_IDENTITY=false
IMPORT_DECLARATION_ASSERTS_LOCAL_LEXICAL_IDENTITY=false
IMPORT_DECLARATION_ASSERTS_MODULE_NAMESPACE_OBJECT_IDENTITY=false
IMPORT_DECLARATION_TRANSFERS_BINDING_OWNERSHIP=false
IMPORT_DECLARATION_ASSERTS_EXPORT_OR_REEXPORT=false
IMPORT_DECLARATION_ASSERTS_IMPLEMENTATION_BEHAVIOUR=false
```

## 7. Falsifier Results

```text
IMPORT_DECLARATION_IS_SOURCE_MODULE_IDENTITY=false
IMPORT_DECLARATION_IS_IMPORTED_BINDING=false
IMPORT_DECLARATION_IS_DECLARATION_TO_BINDING_LINKAGE=false
IMPORT_DECLARATION_IS_AST_SYNTAX_NODE=false
IMPORT_DECLARATION_IS_DEPENDENCY_RELATIONSHIP=false
IMPORT_DECLARATION_IS_DEPENDENCY_EDGE=false
IMPORT_DECLARATION_SEMANTIC_MEANING_DERIVED_FROM_OWNERSHIP=false
IMPORT_DECLARATION_SEMANTIC_DEFINITION_IS_FIELD_INVENTORY=false
```

These results are why Candidate A remains bounded rather than becoming a source identity, binding, linkage, syntax object, relationship, edge, ownership statement, or field bag.

## 8. Representation Equivalence

Two valid `IMPORT_DECLARATION` representations express the same declaration fact meaning only when governed Evidence establishes that they represent the same declaration-level occurrence and preserve the same semantic declaration identity and boundary.

This review defines no new persistent semantic ID and does not infer equivalence from equal field values alone.

```text
IMPORT_DECLARATION_EQUIVALENT_REPRESENTATION_REQUIRES_SAME_GOVERNED_DECLARATION_LEVEL_OCCURRENCE_AND_PRESERVED_SEMANTIC_BOUNDARY=true
EQUAL_FIELDS_ALONE_ESTABLISH_SAME_IMPORT_DECLARATION_FACT=false
IMPORT_DECLARATION_NEW_PERSISTENT_IDENTITY_SCHEME=false
IMPORT_DECLARATION_STORAGE_LOCATION_IS_SEMANTIC_MEANING=false
IMPORT_DECLARATION_FIELD_ORDER_IS_SEMANTIC_MEANING=false
IMPORT_DECLARATION_SERIALIZATION_FORM_IS_SEMANTIC_MEANING=false
IMPORT_DECLARATION_ACCESS_PATH_IS_SEMANTIC_MEANING=false
```

## 9. Failure Treatment and Authoring Result

A structurally valid representation is semantically unresolved if required Evidence cannot establish its declaration-level meaning under this authored definition. Conflicting mandatory field interpretation must not be silently repaired by semantic inference.

```text
STRUCTURAL_VALIDITY_ALONE_ESTABLISHES_IMPORT_DECLARATION_SEMANTIC_VALIDITY=false
MISSING_REQUIRED_SEMANTIC_EVIDENCE_RESULT=UNKNOWN
CONFLICTING_MANDATORY_FIELD_INTERPRETATION_RESULT=UNKNOWN
UNSUPPORTED_SEMANTIC_REPAIR=false
SEMANTIC_OVERLOADING_WITHOUT_GOVERNED_DISCRIMINATOR_RESULT=UNKNOWN
```

The definition is reproducible before observing any dependency relationship or implementation result because it is authored as a closed fact-kind rule from the representation and architecture boundaries.

```text
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_PREOBSERVATION_REPRODUCIBLE=true
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_CONTRADICTED_BY_CONTROLLING_EVIDENCE=false
```

## 10. New-Governance Provenance

```text
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION=DEFINED_BY_THIS_AUTHORITY_REVIEW
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_PREVIOUSLY_GOVERNED=false
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_RETROACTIVELY_INFERRED=false
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_AUTHORED_NOW=true
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_SOURCE=NEW_GOVERNANCE_FROM_CLOSED_REPRESENTATION_RESPONSIBILITIES_AND_ARCHITECTURE_BOUNDARIES
```

This provenance explicitly distinguishes deliberate new governance from discovery of a pre-existing rule.

## 11. No Automatic Downstream Promotion

```text
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_ESTABLISHES_INSTANCE_SEMANTIC_MEANING=false
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_ESTABLISHES_SEMANTIC_SUBJECT=false
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_ESTABLISHES_PARTICIPANT_ELIGIBILITY=false
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_ESTABLISHES_ACTUAL_PARTICIPATION=false
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_ASSIGNS_DEPENDENT_ROLE=false
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_ASSIGNS_DEPENDED_UPON_ROLE=false
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_ESTABLISHES_RELATIONSHIP=false
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_CREATES_EDGE=false
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_ESTABLISHES_ENUMERATION=false
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_ESTABLISHES_CARDINALITY=false
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_ESTABLISHES_GRAPH_MEMBERSHIP=false
```

## 12. Current States Preserved

```text
IMPORT_DECLARATION_SEMANTIC_MEANING_STATUS=UNKNOWN
IMPORT_DECLARATION_SEMANTIC_SUBJECT_STATUS=UNKNOWN
IMPORTED_BINDING_SEMANTIC_SUBJECT_STATUS=UNKNOWN
SOURCE_MODULE_IDENTITY_SEMANTIC_SUBJECT_STATUS=UNKNOWN
MODULE_NAMESPACE_OBJECT_IDENTITY_SEMANTIC_SUBJECT_STATUS=UNKNOWN
LOCAL_LEXICAL_IDENTITY_SEMANTIC_SUBJECT_STATUS=UNKNOWN
DECLARATION_TO_BINDING_LINKAGE_SEMANTIC_SUBJECT_STATUS=UNKNOWN
```

These statuses belong to later application reviews and are not changed by this Authority review.

## 13. Required Stop

```text
IMPORT_DECLARATION instance semantic-meaning application=NOT_REACHED
IMPORT_DECLARATION semantic-subject resumption=NOT_REACHED
other fact-kind semantic-definition authoring=NOT_REACHED
other namespace semantic-subject classifications=NOT_REACHED
namespace participant-eligibility resumption=NOT_REACHED
relationship-kind selection=NOT_REACHED
participant-role-domain definition=NOT_REACHED
examination-unit selection=NOT_REACHED
candidate-pair construction=NOT_REACHED
dependency relationship instance analysis=NOT_REACHED
actual participant assignment=NOT_REACHED
dependency participant role assignment=NOT_REACHED
dependency edge creation=NOT_REACHED
edge owner assignment=NOT_REACHED
edge identity assignment=NOT_REACHED
dependency enumeration=NOT_REACHED
edge cardinality=NOT_REACHED
boundary completeness=NOT_REACHED
graph construction=NOT_REACHED
exports=NOT_REACHED
re-exports=NOT_REACHED
later rows=NOT_REACHED
```

## 14. Authority Boundary

```text
import-declaration-fact-kind-semantic-definition-authoring Authority=THIS_REVIEW_ONLY
import-declaration-instance-semantic-meaning Authority=NONE
import-declaration-semantic-subject Authority=NONE
other-fact-kind-semantic-definition Authority=NONE
namespace-participant-classification Authority=NONE
relationship-kind-selection Authority=NONE
participant-role-domain-definition Authority=NONE
examination-unit-selection Authority=NONE
candidate-pair-construction Authority=NONE
specific-dependency-analysis Authority=NONE
actual-participant-assignment Authority=NONE
dependency-participant-assignment Authority=NONE
dependency-edge-creation Authority=NONE
edge-owner-assignment Authority=NONE
edge-identity-assignment Authority=NONE
dependency-enumeration Authority=NONE
edge-cardinality Authority=NONE
boundary-completeness Authority=NONE
graph-construction Authority=NONE
export-analysis Authority=NONE
re-export-analysis Authority=NONE
later-row-analysis Authority=NONE
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

The temporary semantic-definition authoring Authority exists only within this review and only for `IMPORT_DECLARATION`. It grants no implementation or downstream Authority.

The review stops after recording new bounded governance. No instance application and no next step are performed.