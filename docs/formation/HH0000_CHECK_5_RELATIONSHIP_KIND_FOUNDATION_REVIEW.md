# HH-0000 Check 5 Relationship Kind Foundation Review

**Status:** OUTCOME 1 - RELATIONSHIP-KIND FOUNDATION DEFINED; NO CONCRETE KIND CREATED
**Review date:** 2026-08-15
**Review type:** Documentation-only theory and governance review
**Review scope:** Minimum governed structure required for any relationship kind
**Concrete relationship kind created:** No
**`IMPORT_DECLARATION` participants selected:** None
**Roles assigned:** None
**Relationships created:** None
**Edges created:** None
**Graphs constructed:** None
**Implementation inspected:** No
**POLICY-5 accessed or modified:** No
**Check 5:** `UNMEASURED`
**Check 6:** `NOT RUN`
**Authority effect:** None

# Repository Traceability

**Principle:** Truth before certainty; a relationship kind must be governed before relationship instances or participant eligibility can be evaluated; no downstream promotion; smallest justified change; human Authority.
**Theory:** A relationship kind is an authoritative semantic rule defining what relationship instances mean, which participant role domains are admissible, how compatibility and direction work, and what Evidence is required for instance analysis.
**Architecture:** One generic kind foundation with semantic meaning, optional direction, role domains, compatibility, instance separation, evidence requirements, failure treatment, and no concrete kind selection.
**Engineering:** Six ordered foundation conditions, minimum closure conjunction, three-state foundation result, preserved unknowns, mandatory stops, and explicit Authority denial.
**Milestone:** Not Applicable.
**Evidence:** Existing relationship and dependency governance reviews only. This review creates generic relationship-kind foundation Evidence. It creates no concrete relationship kind, participant, role, relationship instance, edge, owner, identity, cardinality, enumeration, graph, export, re-export, implementation, Check 5, Check 6, freeze, or acceptance Evidence.

## 1. Purpose and Strict Boundary

This review asks:

> What must be true before a relationship kind can be considered governed?

It may define required relationship-kind components, semantic boundaries, permitted role-domain requirements, compatibility rules, and governance Evidence. It may not create a dependency relationship kind, select `IMPORT_DECLARATION` participants, assign roles, create relationships or edges, assign ownership or cardinality, construct graphs, analyse dependencies or exports, inspect implementation, or run Check 5 or Check 6.

Exactly this one Markdown file is created.

## 2. Foundation States

```text
RELATIONSHIP_KIND_FOUNDATION_DEFINED
RELATIONSHIP_KIND_FOUNDATION_INCOMPLETE
UNKNOWN
```

`RELATIONSHIP_KIND_FOUNDATION_DEFINED` means the minimum generic structure is closed. `RELATIONSHIP_KIND_FOUNDATION_INCOMPLETE` means positive Evidence shows a required foundation component is absent from the proposed generic model. `UNKNOWN` means the Evidence cannot distinguish those results.

```text
RELATIONSHIP_KIND_FOUNDATION_STATES=RELATIONSHIP_KIND_FOUNDATION_DEFINED_RELATIONSHIP_KIND_FOUNDATION_INCOMPLETE_UNKNOWN
UNKNOWN_IS_NOT_RELATIONSHIP_KIND_FOUNDATION_INCOMPLETE=true
```

## 3. Condition 1 - Relationship Meaning Definition

A governed relationship kind must define the semantic condition that makes a relationship instance of that kind true or false. The definition must identify what the relationship means as a relation between participants and must not be inferred from terminology, storage, linkage, containment, shared values, or an edge-shaped representation.

```text
RELATIONSHIP_KIND_REQUIRES_SEMANTIC_MEANING=true
RELATIONSHIP_KIND_MEANING_MUST_PRECEDE_INSTANCE_OBSERVATION=true
RELATIONSHIP_KIND_MEANING_IS_STORAGE=false
RELATIONSHIP_KIND_MEANING_IS_LINKAGE=false
RELATIONSHIP_KIND_MEANING_IS_EDGE_REPRESENTATION=false
```

## 4. Condition 2 - Direction, When Applicable

If direction is part of the relationship semantics, the kind must define direction and identify the meaning of each direction. If direction is not part of the kind, the kind must explicitly state that it is non-directional. Direction must not be inferred from field order, record order, ownership, or traversal order.

```text
RELATIONSHIP_KIND_DIRECTIONALITY_MUST_BE_EXPLICIT_WHEN_APPLICABLE=true
RELATIONSHIP_KIND_NON_DIRECTIONALITY_MUST_BE_EXPLICIT_WHEN_APPLICABLE=false
RELATIONSHIP_DIRECTION_FROM_FIELD_ORDER=false
RELATIONSHIP_DIRECTION_FROM_OWNERSHIP=false
RELATIONSHIP_DIRECTION_FROM_TRAVERSAL_ORDER=false
```

No directional choice is made here.

## 5. Condition 3 - Permitted Participant Role Domains

A relationship kind must define the permitted semantic role domains for every role it makes available. The domains must describe what kinds of independently established governed semantic subjects may occupy each role without assigning any specific candidate to a role.

Conceptual labels such as `DEPENDENT` and `DEPENDED_UPON` are not sufficient without their permitted role domains and role semantics.

```text
RELATIONSHIP_KIND_REQUIRES_EXPLICIT_PERMITTED_ROLE_DOMAINS=true
ROLE_DOMAIN_MUST_BE_DEFINED_PER_ROLE=true
ROLE_DOMAIN_DEFINITION_ASSIGNES_NO_SPECIFIC_PARTICIPANT=true
GENERIC_ROLE_LABEL_ALONE_DEFINES_ROLE_DOMAIN=false
```

No concrete role domain is defined here.

## 6. Condition 4 - Role Compatibility Rules

The kind must define how a governed semantic subject is compatible or incompatible with each permitted role domain. Compatibility must be evaluated from semantic subject status and governed kind rules, not from ownership, linkage, reachability, containment, syntax, field location, or conceivable participation.

```text
RELATIONSHIP_KIND_REQUIRES_ROLE_COMPATIBILITY_RULES=true
ROLE_COMPATIBILITY_IS_SEPARATE_FROM_ROLE_ASSIGNMENT=true
ROLE_COMPATIBILITY_IS_SEPARATE_FROM_ACTUAL_PARTICIPATION=true
OWNERSHIP_ALONE_ESTABLISHES_ROLE_COMPATIBILITY=false
LINKAGE_ALONE_ESTABLISHES_ROLE_COMPATIBILITY=false
CONCEIVABILITY_ALONE_ESTABLISHES_ROLE_COMPATIBILITY=false
```

## 7. Condition 5 - Kind Versus Instance Boundary

The relationship kind defines the general semantics and admissible roles. A relationship instance supplies the specific participants, direction where applicable, Evidence, representation, and closure result.

```text
RELATIONSHIP_KIND_DEFINITION != RELATIONSHIP_INSTANCE
RELATIONSHIP_KIND_DEFINITION_GOVERNS_INSTANCE_INTERPRETATION=true
RELATIONSHIP_KIND_DEFINITION_ESTABLISHES_SPECIFIC_RELATIONSHIP=false
RELATIONSHIP_INSTANCE_REQUIRES_KIND_DEFINITION=true
RELATIONSHIP_INSTANCE_VALUES_MAY_VARY_WITHIN_ONE_KIND=true
```

One kind cannot silently contain unrelated instance meanings without an explicit governed discriminator and interpretation rule.

## 8. Condition 6 - Evidence Before Instance Analysis

Before specific relationship instances may be analysed, governance must supply Evidence for:

1. the exact relationship kind and semantic meaning;
2. each participant’s independent governed identity;
3. each participant’s permitted role compatibility;
4. direction and role interpretation when applicable;
5. the authorised Evidence source and reproducible derivation method;
6. linkage and referential-integrity rules;
7. relationship representation and independent ownership accounting;
8. cardinality and completeness boundary;
9. overlap, omission, contradiction, and failure treatment; and
10. the distinction between relationship meaning and edge representation.

```text
RELATIONSHIP_INSTANCE_ANALYSIS_REQUIRES_PREDEFINED_KIND=true
RELATIONSHIP_INSTANCE_ANALYSIS_REQUIRES_PARTICIPANT_EVIDENCE=true
RELATIONSHIP_INSTANCE_ANALYSIS_REQUIRES_ROLE_COMPATIBILITY_EVIDENCE=true
RELATIONSHIP_INSTANCE_ANALYSIS_REQUIRES_REPRODUCIBLE_DERIVATION=true
RELATIONSHIP_INSTANCE_ANALYSIS_REQUIRES_COMPLETENESS_BOUNDARY=true
RELATIONSHIP_INSTANCE_ANALYSIS_REQUIRES_FAILURE_TREATMENT=true
INTERNAL_REPRESENTATION_COMPLETION_ALONE_ESTABLISHES_RELATIONSHIP=false
```

## 9. Minimum Governed Relationship-Kind Conjunction

A relationship kind may be considered governed only when all of the following pass:

A. semantic relationship meaning is defined;
B. directionality is explicitly defined when applicable, or non-directionality is explicit;
C. every permitted participant role domain is defined;
D. compatibility rules for each role domain are defined;
E. kind semantics are distinguished from relationship-instance values;
F. authorised Evidence and reproducible pre-observation derivation are defined;
G. representation, linkage, referential integrity, and independent ownership accounting are defined;
H. cardinality and completeness rules are defined;
I. overlap, omission, contradiction, and failure treatment are defined; and
J. relationship meaning is distinguished from edge representation and graph membership.

```text
RELATIONSHIP_KIND_FOUNDATION_TEST=SEMANTIC_MEANING_AND_EXPLICIT_DIRECTIONALITY_WHEN_APPLICABLE_AND_PERMITTED_ROLE_DOMAINS_AND_ROLE_COMPATIBILITY_AND_KIND_INSTANCE_BOUNDARY_AND_AUTHORISED_REPRODUCIBLE_EVIDENCE_AND_REPRESENTATION_LINKAGE_OWNERSHIP_RULES_AND_CARDINALITY_COMPLETENESS_RULES_AND_OVERLAP_OMISSION_CONTRADICTION_FAILURE_TREATMENT_AND_RELATIONSHIP_EDGE_GRAPH_DISTINCTION
RELATIONSHIP_KIND_FOUNDATION_REQUIRES_ALL_COMPONENTS=true
```

## 10. Non-Promotions

The foundation itself establishes no specific relationship conclusion:

```text
RELATIONSHIP_KIND_FOUNDATION_ESTABLISHES_CONCRETE_RELATIONSHIP_KIND=false
RELATIONSHIP_KIND_FOUNDATION_SELECTS_PARTICIPANT=false
RELATIONSHIP_KIND_FOUNDATION_ASSIGNES_ROLE=false
RELATIONSHIP_KIND_FOUNDATION_ESTABLISHES_RELATIONSHIP_INSTANCE=false
RELATIONSHIP_KIND_FOUNDATION_CREATES_EDGE=false
RELATIONSHIP_KIND_FOUNDATION_ASSIGNES_EDGE_OWNER=false
RELATIONSHIP_KIND_FOUNDATION_ASSIGNES_EDGE_IDENTITY=false
RELATIONSHIP_KIND_FOUNDATION_ESTABLISHES_CARDINALITY=false
RELATIONSHIP_KIND_FOUNDATION_ESTABLISHES_GRAPH_MEMBERSHIP=false
```

## 11. Existing States Preserved

```text
IMPORT_DECLARATION_SEMANTIC_SUBJECT_STATUS=SEMANTIC_SUBJECT
IMPORT_DECLARATION_PARTICIPANT_ELIGIBILITY=UNKNOWN
SPECIFIC_DEPENDENCY_RELATIONSHIP_PRESENCE=UNKNOWN
SPECIFIC_DEPENDENCY_PARTICIPANTS=UNKNOWN
SPECIFIC_DEPENDENCY_KIND=UNKNOWN
SPECIFIC_DEPENDENCY_DIRECTION=UNKNOWN
DEPENDENCY_EDGE_OWNER=UNKNOWN
DEPENDENCY_EDGE_ID=UNKNOWN
DEPENDENCY_EDGE_CARDINALITY=UNKNOWN
DEPENDENCY_GRAPH=UNKNOWN
EXPORT_RELATIONSHIPS=UNKNOWN
RE_EXPORT_RELATIONSHIPS=UNKNOWN
```

No participant, relationship instance, edge, or graph state is changed by this foundation review.

## 12. Outcome Decision

### Outcome 1 - `RELATIONSHIP_KIND_FOUNDATION_DEFINED`

**Selected.** The six required foundation questions are closed generically: meaning, direction where applicable, role domains, compatibility, kind-instance boundary, and Evidence prerequisites are defined without creating a concrete kind or analysing an instance.

### Outcome 2 - `RELATIONSHIP_KIND_FOUNDATION_INCOMPLETE`

Not selected. No required generic component remains missing from this foundation.

### Outcome 3 - `UNKNOWN`

Not selected. Existing relationship governance and the generic distinctions are sufficient to define the minimum foundation.

```text
SELECTED_OUTCOME=OUTCOME_1
RELATIONSHIP_KIND_FOUNDATION_STATUS=RELATIONSHIP_KIND_FOUNDATION_DEFINED
CONCRETE_RELATIONSHIP_KIND_CREATED=false
IMPORT_DECLARATION_PARTICIPANT_ANALYSIS=NOT_STARTED
```

## 13. Required Stop

```text
concrete relationship-kind creation=NOT_REACHED
IMPORT_DECLARATION participant eligibility=NOT_REACHED
participant assignment=NOT_REACHED
role assignment=NOT_REACHED
relationship instance analysis=NOT_REACHED
relationship creation=NOT_REACHED
dependency edge creation=NOT_REACHED
edge owner assignment=NOT_REACHED
edge identity assignment=NOT_REACHED
edge cardinality=NOT_REACHED
dependency enumeration=NOT_REACHED
boundary completeness=NOT_REACHED
graph construction=NOT_REACHED
export analysis=NOT_REACHED
re-export analysis=NOT_REACHED
later rows=NOT_REACHED
```

The foundation ends before any concrete relationship kind or participant analysis.

## 14. Authority Boundary

```text
relationship-kind-foundation Authority=THIS_REVIEW_ONLY
concrete-relationship-kind-creation Authority=NONE
IMPORT_DECLARATION-participant-eligibility Authority=NONE
participant-assignment Authority=NONE
role-assignment Authority=NONE
relationship-instance-analysis Authority=NONE
relationship-creation Authority=NONE
dependency-edge-creation Authority=NONE
edge-owner-assignment Authority=NONE
edge-identity-assignment Authority=NONE
edge-cardinality Authority=NONE
dependency-enumeration Authority=NONE
boundary-completeness Authority=NONE
graph-construction Authority=NONE
export-analysis Authority=NONE
re-export-analysis Authority=NONE
implementation-inspection Authority=NONE
Check 5 Authority=NONE
Check 6 Authority=NONE
freeze Authority=NONE
acceptance Authority=NONE
```

This temporary Authority defines only the minimum generic relationship-kind foundation. It creates no concrete kind, selects no participant, assigns no role, establishes no relationship, creates no edge, and performs no downstream analysis.

The review stops at the foundation boundary. No next step is performed.