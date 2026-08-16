# HH-0000 Check 5 Governed Fact Kind Semantic Definition Framework Review

**Status:** OUTCOME 1 - GENERAL FACT-KIND SEMANTIC-DEFINITION FRAMEWORK ESTABLISHED; APPLICATION NOT STARTED
**Review date:** 2026-08-15
**Review type:** Documentation-only theory and governance review
**Sole controlling input:** `HH-0000 CHECK 5 NAMESPACE IMPORT IMPORT DECLARATION SEMANTIC MEANING COMPLETION REVIEW`
**Fact kind defined:** None
**`IMPORT_DECLARATION` semantics defined:** No
**Namespace candidate classified:** None
**Semantic-meaning application resumed:** No
**Semantic-subject analysis resumed:** No
**Participant eligibility resumed:** No
**Dependency relationship kind defined:** None
**Participant role domains defined:** None
**Examination unit selected:** None
**Candidate pairs constructed:** None
**Participant roles assigned:** None
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
**Authority effect:** None

# Repository Traceability

**Principle:** Truth before certainty; fact-kind name, schema, field inventory, and semantic definition remain distinct; unknown is not negative; smallest justified change; human Authority.
**Theory:** A governed fact-kind semantic definition is the authoritative, storage-independent rule that explains what valid instances of a fact kind assert, describe, classify, condition, or otherwise mean as a whole.
**Architecture:** One general definition, one closure conjunction, one minimum closed state set, instance/kind separation, equivalence and overloading rules, Evidence requirements, falsifiers, non-promotions, and no candidate application.
**Engineering:** Twelve ordered conceptual decisions, exact machine-readable closure, namespace preservation, mandatory stops, and explicit Authority denial.
**Milestone:** Not Applicable.
**Evidence:** The sole controlling review only. This review creates general fact-kind semantic-definition framework Evidence. It creates no candidate fact-kind definition, semantic-meaning classification, semantic-subject classification, participant eligibility, relationship kind, role domain, examination unit, pair, participant, role, relationship, edge, owner, edge identity, enumeration, cardinality, boundary-completeness, graph, export, re-export, policy, implementation, Check 5, Check 6, freeze, or acceptance Evidence.

## 1. Purpose and Strict Boundary

This review resolves only what constitutes a governed semantic definition of a fact kind. It does not define `IMPORT_DECLARATION` semantics and does not apply the framework to any namespace fact or identity.

The controlling blocker is preserved:

```text
IMPORT_DECLARATION_STABLE_IDENTITY=PASS
IMPORT_DECLARATION_SEMANTIC_MEANING_STATUS=UNKNOWN
FIRST_UNRESOLVED_IMPORT_DECLARATION_SEMANTIC_MEANING_CONDITION=GOVERNED_FACT_KIND_MEANING
```

Exactly this one Markdown file is created.

## 2. Required Distinction

```text
FACT_KIND_NAME != FACT_KIND_SCHEMA
FACT_KIND_SCHEMA != FACT_KIND_FIELD_INVENTORY
FACT_KIND_FIELD_INVENTORY != FACT_KIND_SEMANTIC_DEFINITION
FACT_KIND_NAME != FACT_KIND_SEMANTIC_DEFINITION
```

Names, schemas, and field inventories describe categories or representable structure. A semantic definition governs the meaning of valid instances as facts.

## 3. Analysis 1 - Fact-Kind Semantic Definition

A fact-kind semantic definition is an independently governed rule that tells an interpreter what kind of governed assertion, condition, classification, description, state, event, relationship, or other governed meaning an instance of that fact kind represents. The list of forms is illustrative, not exhaustive.

It must interpret the instance as a whole, identify the kind of referent or assertion governed by the fact, and define the boundary between the fact’s own meaning and information carried by its representation.

```text
FACT_KIND_SEMANTIC_DEFINITION=GOVERNED_RULE_FOR_INTERPRETING_VALID_FACT_KIND_INSTANCES_AS_WHOLE_FACTS
FACT_KIND_SEMANTIC_DEFINITION_IS_RECORD_LAYOUT=false
FACT_KIND_SEMANTIC_DEFINITION_IS_STORAGE_LOCATION=false
FACT_KIND_SEMANTIC_DEFINITION_IS_ACCESS_PATH=false
```

## 4. Analysis 2 - RecordKind Naming

A `RecordKind` label identifies or classifies a category. A label alone cannot define what instances of that category assert, describe, classify, or condition.

```text
RECORDKIND_NAME_ALONE_ESTABLISHES_SEMANTIC_DEFINITION=false
RECORDKIND_NAME_IDENTIFIES_CATEGORY=true
RECORDKIND_NAME_REQUIRES_GOVERNED_INTERPRETATION=true
```

No specific `RecordKind` is interpreted here.

## 5. Analysis 3 - Schema

Required fields, field types, closed objects, enums, cardinality, and validation constraints define representable structure and admissible forms. They can support semantic interpretation but cannot, by structure alone, establish the fact’s semantic assertion.

```text
SCHEMA_STRUCTURE_IS_SEMANTIC_MEANING=false
SCHEMA_STRUCTURE_ALONE_ESTABLISHES_SEMANTIC_DEFINITION=false
SCHEMA_CONSTRAINTS_SUPPORT_INTERPRETATION=true
SCHEMA_AND_SEMANTIC_DEFINITION_DISTINGUISHED=true
```

## 6. Analysis 4 - Field Inventory

Knowing every mandatory field and value role is not sufficient by itself. Fields may be necessary Evidence for interpreting a fact while remaining identities, classifications, links, context, provenance, or supporting components rather than the fact’s complete semantic assertion.

```text
FIELD_INVENTORY_ALONE_ESTABLISHES_SEMANTIC_DEFINITION=false
FIELD_INTERPRETATION_MAY_BE_REQUIRED=true
FIELD_ROLE_IS_NOT_FACT_MEANING_BY_DEFAULT=true
FACT_WHOLE_INTERPRETATION_REQUIRED=true
```

## 7. Analysis 5 - Minimum Components of a Definition

A complete fact-kind semantic definition requires, at minimum:

1. the semantic purpose or assertion class of instances;
2. the exact subject, referent, or assertion domain governed by the fact kind;
3. interpretation of the fact as a whole;
4. interpretation of mandatory fields and their contribution;
5. distinction between the fact’s own meaning and carried identities, references, linkage, context, provenance, and derivation;
6. the semantic boundary of what is and is not asserted;
7. equivalence treatment across valid representations;
8. contradiction and failure treatment; and
9. reproducible interpretation before relationship-instance observation.

```text
FACT_KIND_DEFINITION_REQUIRES_SEMANTIC_PURPOSE_OR_ASSERTION_CLASS=true
FACT_KIND_DEFINITION_REQUIRES_REFERENT_OR_ASSERTION_DOMAIN=true
FACT_KIND_DEFINITION_REQUIRES_WHOLE_FACT_INTERPRETATION=true
FACT_KIND_DEFINITION_REQUIRES_MANDATORY_FIELD_INTERPRETATION=true
FACT_KIND_DEFINITION_REQUIRES_CARRIED_INFORMATION_DISTINCTION=true
FACT_KIND_DEFINITION_REQUIRES_SEMANTIC_BOUNDARY=true
FACT_KIND_DEFINITION_REQUIRES_REPRESENTATION_EQUIVALENCE=true
FACT_KIND_DEFINITION_REQUIRES_CONTRADICTION_AND_FAILURE_TREATMENT=true
FACT_KIND_DEFINITION_REQUIRES_PREOBSERVATION_REPRODUCIBILITY=true
```

## 8. Analysis 6 - Kind Versus Instance

The fact-kind definition governs how valid instances are interpreted. An instance’s exact meaning additionally depends on its governed field values and any instance-specific Evidence.

```text
FACT_KIND_DEFINITION != FACT_INSTANCE_MEANING
FACT_INSTANCE_MEANING_REQUIRES_FACT_KIND_DEFINITION=true
FACT_KIND_DEFINITION_GOVERNS_INSTANCE_INTERPRETATION=true
INSTANCE_FIELD_VALUES_MAY_COMPLETE_INSTANCE_MEANING=true
```

A field value can vary between instances without changing the fact kind, while the fact-kind definition cannot be reconstructed from one observed instance alone.

## 9. Analysis 7 - Multiple Meanings Under One RecordKind

One `RecordKind` cannot deterministically represent multiple unrelated semantic meanings without a separately governed discriminator and interpretation rule. A name, schema, or field coincidence must not silently select among unrelated meanings.

```text
ONE_RECORDKIND_MULTIPLE_UNRELATED_MEANINGS_BY_DEFAULT=false
SEMANTIC_OVERLOADING_REQUIRES_GOVERNED_DISCRIMINATOR_AND_RULE=true
UNRESOLVED_SEMANTIC_OVERLOADING_PREVENTS_DETERMINISTIC_INTERPRETATION=true
CONCRETE_DISCRIMINATOR_INVENTED=false
```

## 10. Analysis 8 - Shared Semantic Families

Multiple `RecordKind` values may share a general semantic family. Shared family membership does not collapse their distinct fact kinds or imply identical exact meanings, field roles, boundaries, or equivalence rules.

```text
MULTIPLE_RECORDKINDS_MAY_SHARE_GENERAL_SEMANTIC_FAMILY=true
SHARED_FAMILY_COLLAPSES_DISTINCT_RECORDKINDS=false
SHARED_FAMILY_ESTABLISHES_IDENTICAL_EXACT_MEANING=false
```

## 11. Analysis 9 - Independently Governed Definition

“Independently governed” means the definition is authoritative before interpreting a particular instance and is not inferred solely from implementation behaviour, field names, intuition, usage examples, schema shape, record names, co-occurrence, or downstream consumers.

Acceptable governing sources may include an explicit governance definition, an authoritative theory or architecture definition, a closed semantic rule, or a reproducibly derived interpretation whose source rules are already governed.

```text
INDEPENDENT_GOVERNANCE_REQUIRES_AUTHORITATIVE_PREOBSERVATION_RULE=true
IMPLEMENTATION_BEHAVIOUR_ALONE_IS_GOVERNANCE=false
FIELD_NAMES_ALONE_ARE_GOVERNANCE=false
USAGE_EXAMPLES_ALONE_ARE_GOVERNANCE=false
SCHEMA_SHAPE_ALONE_IS_GOVERNANCE=false
RECORD_NAMES_ALONE_ARE_GOVERNANCE=false
COOCCURRENCE_ALONE_IS_GOVERNANCE=false
DOWNSTREAM_CONSUMER_INTERPRETATION_ALONE_IS_GOVERNANCE=false
```

## 12. Analysis 10 - Minimum Closure Evidence

Closure of a specific fact-kind definition requires Evidence that:

1. identifies the fact kind exactly;
2. states its semantic purpose or assertion class;
3. defines the referent or assertion domain;
4. interprets the whole fact and every mandatory field contribution;
5. distinguishes carried identities, references, linkage, context, provenance, and derivation;
6. defines semantic boundaries and valid representation equivalence;
7. defines contradiction or failure treatment; and
8. permits reproducible interpretation before instance observation.

The Evidence must be authoritative or derived solely from already-authoritative semantic rules. Storage or implementation observations cannot substitute for it.

```text
FACT_KIND_DEFINITION_CLOSURE_REQUIRES_EXACT_KIND_IDENTITY=true
FACT_KIND_DEFINITION_CLOSURE_REQUIRES_ASSERTION_CLASS=true
FACT_KIND_DEFINITION_CLOSURE_REQUIRES_REFERENT_OR_ASSERTION_DOMAIN=true
FACT_KIND_DEFINITION_CLOSURE_REQUIRES_WHOLE_FACT_AND_FIELD_INTERPRETATION=true
FACT_KIND_DEFINITION_CLOSURE_REQUIRES_CARRIED_INFORMATION_BOUNDARY=true
FACT_KIND_DEFINITION_CLOSURE_REQUIRES_EQUIVALENCE_RULE=true
FACT_KIND_DEFINITION_CLOSURE_REQUIRES_FAILURE_TREATMENT=true
FACT_KIND_DEFINITION_CLOSURE_REQUIRES_REPRODUCIBILITY=true
FACT_KIND_DEFINITION_CLOSURE_REQUIRES_AUTHORITY=true
```

## 13. Analysis 11 - Definition States

The minimum faithful state set is:

```text
SEMANTIC_DEFINITION_DEFINED
SEMANTIC_DEFINITION_NOT_INDEPENDENTLY_GOVERNED
UNKNOWN
```

`SEMANTIC_DEFINITION_DEFINED` means every closure condition passes. `SEMANTIC_DEFINITION_NOT_INDEPENDENTLY_GOVERNED` means positive Evidence establishes that no independently governed definition exists for the fact kind. `UNKNOWN` means available Evidence establishes neither result.

```text
FACT_KIND_SEMANTIC_DEFINITION_STATES=SEMANTIC_DEFINITION_DEFINED_SEMANTIC_DEFINITION_NOT_INDEPENDENTLY_GOVERNED_UNKNOWN
UNKNOWN_IS_NOT_SEMANTIC_DEFINITION_NOT_INDEPENDENTLY_GOVERNED=true
MISSING_EVIDENCE_IS_NOT_NEGATIVE_EVIDENCE=true
```

## 14. Analysis 12 - Exact Closure Test

A specific fact kind has a governed semantic definition only when all conditions pass:

A. exact fact-kind identity and `RecordKind` are established;
B. an authoritative semantic purpose or assertion class is defined;
C. the referent or assertion domain is defined;
D. whole-fact interpretation and mandatory field contributions are defined;
E. carried identities, references, linkage, context, provenance, and derivation are distinguished from the fact’s own meaning;
F. semantic boundaries and valid representation equivalence are defined;
G. contradiction and failure treatment are defined;
H. interpretation is reproducible before instance observation; and
I. no controlling Evidence contradicts the definition.

```text
FACT_KIND_SEMANTIC_DEFINITION_TEST=EXACT_KIND_IDENTITY_AND_AUTHORITATIVE_ASSERTION_CLASS_AND_REFERENT_OR_ASSERTION_DOMAIN_AND_WHOLE_FACT_AND_FIELD_INTERPRETATION_AND_CARRIED_INFORMATION_DISTINCTION_AND_SEMANTIC_BOUNDARY_AND_REPRESENTATION_EQUIVALENCE_AND_FAILURE_TREATMENT_AND_PREOBSERVATION_REPRODUCIBILITY_AND_NONCONTRADICTION
FACT_KIND_SEMANTIC_DEFINITION_REQUIRES_ALL_CONDITIONS=true
FACT_KIND_SEMANTIC_DEFINITION_FROM_LABEL_OR_SCHEMA_ALONE=false
```

## 15. Required Falsifiers

```text
RECORDKIND_NAME_ALONE_ESTABLISHES_SEMANTIC_DEFINITION=false
SCHEMA_SHAPE_ALONE_ESTABLISHES_SEMANTIC_DEFINITION=false
FIELD_NAMES_ALONE_ESTABLISH_SEMANTIC_DEFINITION=false
FIELD_VALUES_ALONE_ESTABLISH_SEMANTIC_DEFINITION=false
IMPLEMENTATION_BEHAVIOUR_ALONE_ESTABLISHES_SEMANTIC_DEFINITION=false
ONE_EXAMPLE_INSTANCE_ALONE_ESTABLISHES_SEMANTIC_DEFINITION=false
DOWNSTREAM_CONSUMER_INTERPRETATION_ALONE_ESTABLISHES_SEMANTIC_DEFINITION=false
OWNERSHIP_ALONE_ESTABLISHES_SEMANTIC_DEFINITION=false
REACHABILITY_ALONE_ESTABLISHES_SEMANTIC_DEFINITION=false
STORAGE_DOCUMENTATION_ALONE_ESTABLISHES_SEMANTIC_DEFINITION=false
```

## 16. Non-Promotions

A closed fact-kind semantic definition remains a meaning-layer conclusion only:

```text
FACT_KIND_SEMANTIC_DEFINITION_ESTABLISHES_PARTICULAR_INSTANCE_MEANING=false
FACT_KIND_SEMANTIC_DEFINITION_ESTABLISHES_SEMANTIC_SUBJECT=false
FACT_KIND_SEMANTIC_DEFINITION_ESTABLISHES_PARTICIPANT_ELIGIBILITY=false
FACT_KIND_SEMANTIC_DEFINITION_ESTABLISHES_ACTUAL_PARTICIPATION=false
FACT_KIND_SEMANTIC_DEFINITION_ASSIGNES_PARTICIPANT_ROLE=false
FACT_KIND_SEMANTIC_DEFINITION_ESTABLISHES_RELATIONSHIP=false
FACT_KIND_SEMANTIC_DEFINITION_CREATES_EDGE=false
FACT_KIND_SEMANTIC_DEFINITION_ASSIGNES_EDGE_OWNER=false
FACT_KIND_SEMANTIC_DEFINITION_ASSIGNES_EDGE_IDENTITY=false
FACT_KIND_SEMANTIC_DEFINITION_ESTABLISHES_ENUMERATION=false
FACT_KIND_SEMANTIC_DEFINITION_ESTABLISHES_CARDINALITY=false
FACT_KIND_SEMANTIC_DEFINITION_ESTABLISHES_GRAPH_MEMBERSHIP=false
```

## 17. Namespace States Preserved

No namespace application occurs:

```text
IMPORT_DECLARATION_SEMANTIC_MEANING_STATUS=UNKNOWN
IMPORT_DECLARATION_SEMANTIC_SUBJECT_STATUS=UNKNOWN
IMPORTED_BINDING_SEMANTIC_SUBJECT_STATUS=UNKNOWN
SOURCE_MODULE_IDENTITY_SEMANTIC_SUBJECT_STATUS=UNKNOWN
MODULE_NAMESPACE_OBJECT_IDENTITY_SEMANTIC_SUBJECT_STATUS=UNKNOWN
LOCAL_LEXICAL_IDENTITY_SEMANTIC_SUBJECT_STATUS=UNKNOWN
DECLARATION_TO_BINDING_LINKAGE_SEMANTIC_SUBJECT_STATUS=UNKNOWN
```

These are preserved states, not classifications performed by this review.

## 18. Outcome Decision

### Outcome 1 - complete general fact-kind semantic-definition framework

**Selected.** The framework distinguishes name, schema, field inventory, and semantic definition; separates kind semantics from instance meaning; governs overloading and shared families; defines independent authority, closure Evidence, states, exact conjunction, falsifiers, and non-promotions without applying the framework to any candidate.

### Outcome 2 - one general framework question remains unresolved

Not selected. No required general question remains unresolved.

### Outcome 3 - an additional conceptual distinction is required

Not selected. The distinction between fact-kind semantic definition and fact-instance meaning is sufficient for faithful governance.

```text
SELECTED_OUTCOME=OUTCOME_1
GOVERNED_FACT_KIND_SEMANTIC_DEFINITION_FRAMEWORK=ESTABLISHED
FACT_KIND_SEMANTIC_DEFINITION_STATES=SEMANTIC_DEFINITION_DEFINED_SEMANTIC_DEFINITION_NOT_INDEPENDENTLY_GOVERNED_UNKNOWN
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_APPLICATION=NOT_STARTED
```

## 19. Required Stop

```text
IMPORT_DECLARATION fact-kind semantic-definition application=NOT_REACHED
IMPORT_DECLARATION semantic-meaning application resumption=NOT_REACHED
IMPORT_DECLARATION semantic-subject resumption=NOT_REACHED
other namespace semantic-subject classifications=NOT_REACHED
namespace participant-eligibility resumption=NOT_REACHED
relationship-kind selection=NOT_REACHED
participant-role-domain definition=NOT_REACHED
examination-unit selection=NOT_REACHED
candidate-pair construction=NOT_REACHED
pair direction assignment=NOT_REACHED
self-pair treatment=NOT_REACHED
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

## 20. Authority Boundary

```text
fact-kind-semantic-definition-framework Authority=NONE
import-declaration-fact-kind-semantic-definition-application Authority=NONE
import-declaration-semantic-meaning-application Authority=NONE
namespace-import-declaration-semantic-subject-classification Authority=NONE
other-namespace-semantic-subject-classification Authority=NONE
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

This review grants no Authority to apply the framework to `IMPORT_DECLARATION` or another fact kind, resume semantic meaning or semantic-subject analysis, resume participant eligibility, define relationship kinds or role domains, select an examination unit, construct pairs, assign roles, analyse dependency instances, create or identify an edge, enumerate dependencies, assign cardinality, claim boundary completeness, construct a graph, analyse exports or re-exports, inspect implementation or POLICY-5, run Check 5 or Check 6, freeze, or accept.

The general fact-kind semantic-definition framework stops here. No application and no next step are performed.