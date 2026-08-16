# HH-0000 Check 5 Import Declaration Fact Kind Semantic Definition Completion Review

**Status:** OUTCOME 3 - `IMPORT_DECLARATION` FACT-KIND SEMANTIC DEFINITION UNKNOWN; ANALYSIS STOPS AT CONDITION 2
**Review date:** 2026-08-15
**Review type:** Documentation-only bounded formation completion review
**Controlling input 1:** `HH-0000 CHECK 5 GOVERNED FACT KIND SEMANTIC DEFINITION FRAMEWORK REVIEW`
**Controlling input 2:** `HH-0000 CHECK 5 NAMESPACE IMPORT IMPORT DECLARATION SEMANTIC MEANING COMPLETION REVIEW`
**Controlling input 3:** `HH-0000 CHECK 5 NAMESPACE IMPORT COMPLETION SYNTHESIS REVIEW`
**Fact kind analysed:** Exactly `IMPORT_DECLARATION`
**Other fact kinds analysed:** None
**Other namespace candidates analysed:** None
**Fact-instance semantic-meaning review resumed:** No
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
**Theory:** A fact-kind semantic definition must be authoritative before instance interpretation and must explain the whole fact, its assertion or referent domain, field contributions, semantic boundary, valid representation equivalence, failure treatment, and reproducible interpretation.
**Architecture:** Exactly one fact kind is tested in the fixed A-J order. Exact identity passes; absence of an authoritative semantic purpose or assertion class causes the first `UNKNOWN` and a fail-closed stop.
**Engineering:** Ordered condition analysis, no inference from labels or representation, required falsifiers, exact three-state classification, non-promotions, preserved namespace states, mandatory stops, and explicit Authority denial.
**Milestone:** Not Applicable.
**Evidence:** The three controlling reviews only. This review creates one incomplete fact-kind semantic-definition classification; it creates no instance semantic meaning, semantic subject, participant eligibility, relationship kind, role domain, examination unit, pair, participant, role, relationship, edge, owner, edge identity, enumeration, cardinality, boundary-completeness, graph, export, re-export, policy, implementation, Check 5, Check 6, freeze, or acceptance Evidence.

## 1. Purpose and Strict Boundary

This review applies the closed general fact-kind semantic-definition framework to exactly one fact kind:

```text
IMPORT_DECLARATION
```

It resolves only whether `RecordKind=IMPORT_DECLARATION` has a sufficiently governed semantic definition. It does not resume the specific fact-instance semantic-meaning review, semantic-subject analysis, or any downstream relationship analysis.

The controlling blocker remains:

```text
IMPORT_DECLARATION_STABLE_IDENTITY=PASS
IMPORT_DECLARATION_SEMANTIC_MEANING_STATUS=UNKNOWN
FIRST_UNRESOLVED_IMPORT_DECLARATION_SEMANTIC_MEANING_CONDITION=GOVERNED_FACT_KIND_MEANING
```

Exactly this one Markdown file is created.

## 2. Fixed States and Ordered Conditions

```text
SEMANTIC_DEFINITION_DEFINED
SEMANTIC_DEFINITION_NOT_INDEPENDENTLY_GOVERNED
UNKNOWN
```

The conditions are evaluated in this order:

```text
1. EXACT_FACT_KIND_IDENTITY_AND_RECORDKIND
2. AUTHORITATIVE_SEMANTIC_PURPOSE_OR_ASSERTION_CLASS
3. REFERENT_OR_ASSERTION_DOMAIN
4. WHOLE_FACT_INTERPRETATION
5. MANDATORY_FIELD_CONTRIBUTIONS
6. CARRIED_INFORMATION_DISTINCTION
7. SEMANTIC_BOUNDARY
8. REPRESENTATION_EQUIVALENCE
9. CONTRADICTION_AND_FAILURE_TREATMENT
10. PREOBSERVATION_REPRODUCIBILITY
11. NONCONTRADICTION
```

The first genuinely `UNKNOWN` or unsupported condition stops analysis. Later conditions cannot manufacture closure for an earlier condition.

```text
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_STATES=SEMANTIC_DEFINITION_DEFINED_SEMANTIC_DEFINITION_NOT_INDEPENDENTLY_GOVERNED_UNKNOWN
FIRST_UNKNOWN_STOPS_ANALYSIS=true
UNKNOWN_IS_NOT_SEMANTIC_DEFINITION_NOT_INDEPENDENTLY_GOVERNED=true
```

## 3. Condition 1 - Exact Fact-Kind Identity and RecordKind

The candidate fact kind is exactly identifiable as:

```text
RecordKind=IMPORT_DECLARATION
```

This establishes the category under review only. It does not infer semantic meaning from the words `IMPORT` or `DECLARATION`.

```text
IMPORT_DECLARATION_EXACT_FACT_KIND_IDENTITY=PASS
IMPORT_DECLARATION_RECORDKIND=IMPORT_DECLARATION
IMPORT_DECLARATION_RECORDKIND_NAME_ESTABLISHES_SEMANTIC_DEFINITION=false
```

Condition 1 passes. Analysis proceeds to condition 2.

## 4. Condition 2 - Authoritative Semantic Purpose or Assertion Class

The controlling reviews state that no specific fact-kind semantic definition has been created for `IMPORT_DECLARATION`. They establish that the representation carries information represented by fields such as `module`, `importKind`, and `bindingRecordIds`, but they do not define what semantic assertion, condition, classification, description, state, event, or other governed meaning an `IMPORT_DECLARATION` fact itself represents.

No authoritative definition is supplied by the controlling Evidence through:

```text
the words "IMPORT" or "DECLARATION"
schema shape
field names
field values
ownership
linkage
usage examples
RecordKind naming
AST syntax
implementation behaviour
programming-language intuition
```

The fact kind therefore has observed representational information but no closed authoritative semantic purpose or assertion class.

```text
IMPORT_DECLARATION_REPRESENTATIONAL_INFORMATION=PASS
IMPORT_DECLARATION_AUTHORITATIVE_SEMANTIC_PURPOSE_OR_ASSERTION_CLASS=UNKNOWN
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION=UNKNOWN
```

This is the first genuinely `UNKNOWN` condition. The review stops immediately. Conditions 3-11 are not analysed.

## 5. First Unresolved Condition and Missing Evidence

```text
FIRST_UNRESOLVED_IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_CONDITION=AUTHORITATIVE_SEMANTIC_PURPOSE_OR_ASSERTION_CLASS
FIRST_UNRESOLVED_IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_CONDITION_ORDER=2
FIRST_MISSING_IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_EVIDENCE=AUTHORITATIVE_PREOBSERVATION_DEFINITION_OF_WHAT_RECORDKIND_IMPORT_DECLARATION_AS_A_FACT_ITSELF_ASSERTS_DESCRIBES_CLASSIFIES_OR_CONDITIONS_DISTINCT_FROM_ITS_SCHEMA_FIELDS_FIELD_VALUES_IDENTITIES_LINKAGE_OWNER_REACHABILITY_SYNTAX_AND_REPRESENTATION
```

The missing Evidence is not reconstructed from `module`, `importKind`, `bindingRecordIds`, the `RecordKind` label, schema structure, the completed namespace row, or programming-language semantics. No new discriminator or fact-kind meaning is invented.

## 6. Conditions 3-11 Not Reached

```text
IMPORT_DECLARATION_REFERENT_OR_ASSERTION_DOMAIN=NOT_REACHED
IMPORT_DECLARATION_WHOLE_FACT_INTERPRETATION=NOT_REACHED
IMPORT_DECLARATION_MANDATORY_FIELD_CONTRIBUTIONS=NOT_REACHED
IMPORT_DECLARATION_CARRIED_INFORMATION_DISTINCTION=NOT_REACHED
IMPORT_DECLARATION_SEMANTIC_BOUNDARY=NOT_REACHED
IMPORT_DECLARATION_REPRESENTATION_EQUIVALENCE=NOT_REACHED
IMPORT_DECLARATION_CONTRADICTION_AND_FAILURE_TREATMENT=NOT_REACHED
IMPORT_DECLARATION_PREOBSERVATION_REPRODUCIBILITY=NOT_REACHED
IMPORT_DECLARATION_NONCONTRADICTION=NOT_REACHED
```

These values record the first-unknown stop only. They do not assert that any later condition fails.

## 7. Required Falsifiers

```text
RECORDKIND_NAME_ALONE_ESTABLISHES_IMPORT_DECLARATION_SEMANTIC_DEFINITION=false
SCHEMA_SHAPE_ALONE_ESTABLISHES_IMPORT_DECLARATION_SEMANTIC_DEFINITION=false
FIELD_NAMES_ALONE_ESTABLISH_IMPORT_DECLARATION_SEMANTIC_DEFINITION=false
FIELD_VALUES_ALONE_ESTABLISH_IMPORT_DECLARATION_SEMANTIC_DEFINITION=false
IMPLEMENTATION_BEHAVIOUR_ALONE_ESTABLISHES_IMPORT_DECLARATION_SEMANTIC_DEFINITION=false
ONE_EXAMPLE_INSTANCE_ALONE_ESTABLISHES_IMPORT_DECLARATION_SEMANTIC_DEFINITION=false
DOWNSTREAM_CONSUMER_INTERPRETATION_ALONE_ESTABLISHES_IMPORT_DECLARATION_SEMANTIC_DEFINITION=false
OWNERSHIP_ALONE_ESTABLISHES_IMPORT_DECLARATION_SEMANTIC_DEFINITION=false
REACHABILITY_ALONE_ESTABLISHES_IMPORT_DECLARATION_SEMANTIC_DEFINITION=false
STORAGE_DOCUMENTATION_ALONE_ESTABLISHES_IMPORT_DECLARATION_SEMANTIC_DEFINITION=false
```

## 8. Required Non-Promotions

```text
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_ESTABLISHES_INSTANCE_SEMANTIC_MEANING=false
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_ESTABLISHES_SEMANTIC_SUBJECT=false
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_ESTABLISHES_PARTICIPANT_ELIGIBILITY=false
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_ESTABLISHES_ACTUAL_PARTICIPATION=false
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_ASSIGNS_DEPENDENT_ROLE=false
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_ASSIGNS_DEPENDED_UPON_ROLE=false
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_ESTABLISHES_RELATIONSHIP=false
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_CREATES_EDGE=false
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_ASSIGNS_EDGE_OWNER=false
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_ASSIGNS_EDGE_IDENTITY=false
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_ESTABLISHES_ENUMERATION=false
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_ESTABLISHES_CARDINALITY=false
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_ESTABLISHES_GRAPH_MEMBERSHIP=false
```

## 9. Namespace States Preserved

```text
IMPORT_DECLARATION_SEMANTIC_MEANING_STATUS=UNKNOWN
IMPORT_DECLARATION_SEMANTIC_SUBJECT_STATUS=UNKNOWN
IMPORTED_BINDING_SEMANTIC_SUBJECT_STATUS=UNKNOWN
SOURCE_MODULE_IDENTITY_SEMANTIC_SUBJECT_STATUS=UNKNOWN
MODULE_NAMESPACE_OBJECT_IDENTITY_SEMANTIC_SUBJECT_STATUS=UNKNOWN
LOCAL_LEXICAL_IDENTITY_SEMANTIC_SUBJECT_STATUS=UNKNOWN
DECLARATION_TO_BINDING_LINKAGE_SEMANTIC_SUBJECT_STATUS=UNKNOWN
```

No namespace fact or identity is classified by this review.

## 10. Outcome Decision

### Outcome 1 - complete independently governed fact-kind semantic definition

Not selected. Condition 2 is not closed.

### Outcome 2 - positive Evidence proves no independently governed definition exists

Not selected. The controlling Evidence shows absence of a definition, not positive Evidence that no definition exists.

### Outcome 3 - one required condition remains `UNKNOWN`

**Selected.** Exact fact-kind identity passes, but no authoritative semantic purpose or assertion class for `RecordKind=IMPORT_DECLARATION` is present in the controlling Evidence. The review stops before referent domain, field contributions, boundary, equivalence, failure treatment, reproducibility, or non-contradiction analysis.

```text
SELECTED_OUTCOME=OUTCOME_3
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_ANALYSIS=INCOMPLETE
IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_STATUS=UNKNOWN
FIRST_UNRESOLVED_IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_CONDITION=AUTHORITATIVE_SEMANTIC_PURPOSE_OR_ASSERTION_CLASS
FIRST_UNRESOLVED_IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_CONDITION_ORDER=2
FIRST_MISSING_IMPORT_DECLARATION_FACT_KIND_SEMANTIC_DEFINITION_EVIDENCE=AUTHORITATIVE_PREOBSERVATION_DEFINITION_OF_WHAT_RECORDKIND_IMPORT_DECLARATION_AS_A_FACT_ITSELF_ASSERTS_DESCRIBES_CLASSIFIES_OR_CONDITIONS_DISTINCT_FROM_ITS_SCHEMA_FIELDS_FIELD_VALUES_IDENTITIES_LINKAGE_OWNER_REACHABILITY_SYNTAX_AND_REPRESENTATION
IMPORT_DECLARATION_EXACT_FACT_KIND_IDENTITY=PASS
IMPORT_DECLARATION_AUTHORITATIVE_SEMANTIC_PURPOSE_OR_ASSERTION_CLASS=UNKNOWN
IMPORT_DECLARATION_REFERENT_OR_ASSERTION_DOMAIN=NOT_REACHED
IMPORT_DECLARATION_WHOLE_FACT_INTERPRETATION=NOT_REACHED
IMPORT_DECLARATION_MANDATORY_FIELD_CONTRIBUTIONS=NOT_REACHED
IMPORT_DECLARATION_CARRIED_INFORMATION_DISTINCTION=NOT_REACHED
IMPORT_DECLARATION_SEMANTIC_BOUNDARY=NOT_REACHED
IMPORT_DECLARATION_REPRESENTATION_EQUIVALENCE=NOT_REACHED
IMPORT_DECLARATION_CONTRADICTION_AND_FAILURE_TREATMENT=NOT_REACHED
IMPORT_DECLARATION_PREOBSERVATION_REPRODUCIBILITY=NOT_REACHED
IMPORT_DECLARATION_NONCONTRADICTION=NOT_REACHED
```

## 11. Required Stop

```text
IMPORT_DECLARATION semantic-meaning application resumption=NOT_REACHED
IMPORT_DECLARATION semantic-subject resumption=NOT_REACHED
other namespace fact-kind semantic-definition applications=NOT_REACHED
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

## 12. Authority Boundary

```text
import-declaration-fact-kind-semantic-definition-application Authority=NONE
import-declaration-semantic-meaning-application Authority=NONE
namespace-import-declaration-semantic-subject-classification Authority=NONE
other-fact-kind-semantic-definition-application Authority=NONE
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

This review grants no Authority to resume fact-instance semantic meaning, semantic-subject analysis, classify another fact kind or namespace candidate, resume participant eligibility, define relationship kinds or role domains, select an examination unit, construct pairs, assign roles, analyse dependency instances, create an edge, assign an owner or identity, enumerate dependencies, assign cardinality, claim boundary completeness, construct a graph, analyse exports or re-exports, inspect implementation or POLICY-5, run Check 5 or Check 6, freeze, or accept.

The review stops at the first `UNKNOWN` fact-kind semantic-definition condition for `IMPORT_DECLARATION`. No next step is performed.