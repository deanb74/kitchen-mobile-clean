# HH-0000 Check 5 Dependency Relationship Candidate Subject Discovery Review

**Status:** OUTCOME 1 - `DEPENDENCY_RELATIONSHIP` CANDIDATE DISCOVERY DEFINED; NO SUBJECTS SELECTED
**Review date:** 2026-08-15
**Review type:** Documentation-only bounded candidate subject discovery review
**Controlling input 1:** `HH-0000 CHECK 5 DEPENDENCY RELATIONSHIP CANDIDATE SUBJECT EVALUATION FRAMEWORK REVIEW`
**Controlling input 2:** `HH-0000 CHECK 5 DEPENDENCY RELATIONSHIP CONCRETE COMPATIBILITY RULE AUTHORING REVIEW`
**Controlling input 3:** `HH-0000 CHECK 5 DEPENDENCY RELATIONSHIP ROLE DOMAIN AUTHORING REVIEW`
**Candidate discovery defined:** Yes
**Candidate subjects created:** None
**Participants selected:** None
**Compatibility results produced:** None
**Relationships created:** None
**Edges created:** None
**Graphs constructed:** None
**`IMPORT_DECLARATION` analysed as dependency:** No
**Implementation inspected:** No
**POLICY-5 accessed or modified:** No
**Check 5:** `UNMEASURED`
**Check 6:** `NOT RUN`
**Authority effect:** Candidate discovery framework only

# Repository Traceability

**Principle:** Truth before certainty; discovery identifies prospective semantic subjects without implying participation, compatibility, or relationship truth; human Authority; smallest justified change.
**Theory:** Candidate discovery is the governed process for identifying possible semantic subjects that could later satisfy a role-domain and compatibility rule, without selecting any one subject for participation.
**Architecture:** Discovery defines authorised sources, bounded methods, creation criteria, duplicates, completeness boundaries, and Evidence requirements; no relationship or participant is created.
**Engineering:** Source and method requirements, candidate creation criteria, duplicate handling, completeness bound, evidence requirements, preserved states, and Authority denial.
**Milestone:** Not Applicable.
**Evidence:** The candidate-evaluation, concrete-compatibility, role-domain, and Evidence-model reviews plus this authoring review. No participant, compatibility result, relationship instance, edge, graph, implementation, Check 5, Check 6, freeze, or acceptance Evidence.

## 1. Purpose and Strict Boundary

This review defines only the rules for discovering candidate semantic subjects that may later be evaluated against the `DEPENDENCY_RELATIONSHIP` role-domain and compatibility rules.

It does not:

- select participants;
- evaluate compatibility;
- assign roles;
- create relationships;
- create edges;
- construct graphs;
- analyse `IMPORT_DECLARATION` as dependency evidence.

Discovery is limited to identifying plausible candidate subjects and recording their provenance boundaries.

Exactly this one Markdown file is created.

## 2. Required Distinctions

```text
CANDIDATE_DISCOVERY != PARTICIPANT_SELECTION
CANDIDATE_DISCOVERY != ROLE_ASSIGNMENT
CANDIDATE_DISCOVERY != COMPATIBILITY_RESULT
CANDIDATE_DISCOVERY != RELATIONSHIP_INSTANCE
CANDIDATE_DISCOVERY != EDGE
CANDIDATE_DISCOVERY != GRAPH
```

Discovery creates a candidate record only when a source is authorised and the candidate is a plausible semantic subject. It does not establish that the subject participates, is compatible, or depends on anything.

## 3. Authorised Discovery Sources

Candidate discovery is limited to sources that are independent, reproducible, and semantically meaningful for dependency analysis, including:

```text
AUTHORISED_DISCOVERY_SOURCES=GOVERNED_DECLARATIONS_AND_FACTS_AND_SEMANTIC_OBJECTS_AND_ROLE_DOMAIN_RELEVANT_EVIDENCE
```

Authorised sources include:

```text
DISCOVERY_SOURCE_SEMANTIC_SUBJECTS=true
DISCOVERY_SOURCE_GOVERNED_DECLARATIONS=true
DISCOVERY_SOURCE_GOVERNED_FACTS=true
DISCOVERY_SOURCE_ROLE_DOMAIN_RELEVANT_EVIDENCE=true
DISCOVERY_SOURCE_REPRODUCIBLE_SEMANTIC_ASSERTIONS=true
```

Authorised sources exclude:

```text
DISCOVERY_SOURCE_RAW_SYNTAX_ONLY=false
DISCOVERY_SOURCE_REFERENCE_ONLY=false
DISCOVERY_SOURCE_LINKAGE_ONLY=false
DISCOVERY_SOURCE_GRAPH_POSITION_ONLY=false
DISCOVERY_SOURCE_RUNTIME_OUTPUT_ONLY=false
DISCOVERY_SOURCE_IMPLEMENTATION_ORDER_ONLY=false
DISCOVERY_SOURCE_IMPORT_DECLARATION_AS_DEPENDENCY=false
```

## 4. Discovery Methods

Discovery methods may include:

- controlled semantic-subject identification;
- governed declaration/fact traceability;
- role-domain-relevant semantic classification;
- reproducible evidence review.

They may not include:

```text
DISCOVERY_METHOD_EDGE_INFERENCE=false
DISCOVERY_METHOD_GRAPH_CONSTRUCTION=false
DISCOVERY_METHOD_STATIC_MATCH_ON_REACHABILITY_ONLY=false
DISCOVERY_METHOD_NAME_MATCH_ONLY=false
DISCOVERY_METHOD_IMPORT_DECLARATION_DEPENDENCY_INFERENCE=false
DISCOVERY_METHOD_RUNTIME_OBSERVATION_ALONE=false
```

## 5. Candidate Creation Criteria

A subject may enter candidate state only when all of the following hold:

1. the source is authorised and reproducible;
2. the subject is plausibly a governed semantic subject;
3. the subject is relevant to the dependency purpose under the role-domain contract;
4. the subject is not merely a representation, reference, field, owner, or graph position;
5. the subject has a clear identity boundary distinct from any relation or edge;
6. duplicate handling can distinguish independent candidates from repeated observations.

```text
DEPENDENCY_RELATIONSHIP_CANDIDATE_CREATION_CRITERIA=AUTHORISED_SOURCE_AND_PLAUSIBLE_GOVERNED_SEMANTIC_SUBJECT_AND_DEPENDENCY_RELEVANCE_AND_NO_REPRESENTATION_SUBSTITUTION_AND_CLEAR_IDENTITY_BOUNDARY_AND_DUPLICATE_DISTINCTION
DEPENDENCY_RELATIONSHIP_CANDIDATE_CREATION_REQUIRES_AUTHORISED_SOURCE=true
DEPENDENCY_RELATIONSHIP_CANDIDATE_CREATION_REQUIRES_GOVERNED_SEMANTIC_SUBJECT=true
DEPENDENCY_RELATIONSHIP_CANDIDATE_CREATION_REQUIRES_DEPENDENCY_RELEVANCE=true
DEPENDENCY_RELATIONSHIP_CANDIDATE_CREATION_REQUIRES_CLEAR_IDENTITY=true
DEPENDENCY_RELATIONSHIP_CANDIDATE_CREATION_REQUIRES_DUPLICATE_HANDLING=true
```

## 6. Duplicate Handling

A discovered subject is a duplicate if it represents the same governed semantic subject under the same identity boundary, regardless of where the evidence was found. Duplicate handling must preserve one candidate identity per semantic subject within the discovery scope.

```text
CANDIDATE_DUPLICATE_RULE=MERGE_OR_DEDUPLICATE_SAME_GOVERNED_SEMANTIC_SUBJECT_WITHIN_DISCOVERY_SCOPE
CANDIDATE_DUPLICATE_HANDLING_IS_NOT_PARTICIPANT_SELECTION=true
CANDIDATE_DUPLICATE_HANDLING_IS_NOT_COMPATIBILITY_RESULT=true
CANDIDATE_DUPLICATE_HANDLING_IS_NOT_RELATIONSHIP_CREATION=true
```

## 7. Discovery Completeness Boundaries

Discovery is bounded by the governed discovery scope. It does not claim complete semantic coverage of all possible dependency subjects in all systems. It only identifies candidates within the authorising discovery boundary.

```text
DISCOVERY_COMPLETENESS_BOUNDARY=WITHIN_AUTHORISED_DISCOVERY_SCOPE_AND_RELEVANT_GOVERNED_SUBJECTS_ONLY
DISCOVERY_COMPLETENESS_IS_NOT_UNIVERSAL=true
DISCOVERY_COMPLETENESS_IS_NOT_RELATIONSHIP_TRUTH=true
DISCOVERY_COMPLETENESS_IS_NOT_PARTICIPANT_SELECTION=true
```

## 8. Discovery Evidence Requirements

Discovery evidence must establish:

- the source was authorised;
- the subject is plausibly a governed semantic subject;
- the subject is distinct from syntax-only or reference-only items;
- the candidate identity is stable and deduplicated;
- the discovery boundary has been respected.

```text
DEPENDENCY_RELATIONSHIP_CANDIDATE_DISCOVERY_EVIDENCE=AUTHORISED_SOURCE_AND_PLAUSIBLE_SEMANTIC_SUBJECT_AND_IDENTITY_BOUNDARY_AND_DEDUPLICATION_AND_SCOPE_BOUNDARY
DEPENDENCY_RELATIONSHIP_CANDIDATE_DISCOVERY_REQUIRES_EVIDENCE=true
DEPENDENCY_RELATIONSHIP_CANDIDATE_DISCOVERY_EVIDENCE_CANNOT_BE_EDGE_ONLY=true
DEPENDENCY_RELATIONSHIP_CANDIDATE_DISCOVERY_EVIDENCE_CANNOT_BE_GRAPH_ONLY=true
DEPENDENCY_RELATIONSHIP_CANDIDATE_DISCOVERY_EVIDENCE_CANNOT_BE_RUNTIME_OUTPUT_ONLY=true
DEPENDENCY_RELATIONSHIP_CANDIDATE_DISCOVERY_EVIDENCE_CANNOT_BE_IMPORT_DECLARATION_AS_DEPENDENCY=true
```

## 9. Candidate States and Boundaries

The framework may define candidate state transitions, but not participant or relationship outcomes.

```text
DISCOVERY_STATE_POTENTIAL=IDENTIFIED_AS_POSSIBLE_SUBJECT
DISCOVERY_STATE_CANDIDATE=AUTHORISED_AND_RELEVANT_WITH_CLEAR_IDENTITY
DISCOVERY_STATE_DUPLICATE=MERGED_WITH_EXISTING_CANDIDATE
DISCOVERY_STATE_EXCLUDED=OUTSIDE_AUTHORISED_DISCOVERY_SCOPE_OR_RELEVANCE_BOUNDARY
DISCOVERY_STATE_UNKNOWN=INSUFFICIENT_REPRODUCIBLE_EVIDENCE
```

These states remain discovery-layer states only.

## 10. Status and Outcome

The discovery framework is defined. No subjects are selected and no compatibility or relation is produced.

```text
DEPENDENCY_RELATIONSHIP_CANDIDATE_DISCOVERY_STATUS=DEFINED
DEPENDENCY_RELATIONSHIP_CANDIDATE_DISCOVERY_AUTHORED=true
DEPENDENCY_RELATIONSHIP_CANDIDATE_DISCOVERY_PERFORMED=false
```

### Outcome 1 - `DEPENDENCY_RELATIONSHIP_CANDIDATE_DISCOVERY_DEFINED`

**Selected.** The authorised discovery sources, candidate creation criteria, duplicate handling, completeness boundary, and evidence requirements are defined without selecting a participant or creating a dependency relationship.

### Outcome 2 - `DEPENDENCY_RELATIONSHIP_CANDIDATE_DISCOVERY_BLOCKED`

Not selected. Discovery is sufficiently determinate to define the candidate boundary without subject evaluation.

### Outcome 3 - `DEPENDENCY_RELATIONSHIP_CANDIDATE_DISCOVERY_UNKNOWN`

Not selected. The discovery framework itself is determinate even though specific candidate selection remains unperformed.

```text
SELECTED_OUTCOME=OUTCOME_1
DEPENDENCY_RELATIONSHIP_CANDIDATE_DISCOVERY_DEFINED=true
```

## 11. Preserved States

```text
DEPENDENCY_RELATIONSHIP_KIND_CREATED=false
DEPENDENCY_RELATIONSHIP_DIRECTION_DEFINED=true
DEPENDENCY_RELATIONSHIP_ROLES_DEFINED=true
DEPENDENCY_RELATIONSHIP_ROLE_DOMAINS_DEFINED=true
DEPENDENCY_RELATIONSHIP_COMPATIBILITY_RULES_DEFINED=true
DEPENDENCY_RELATIONSHIP_COMPATIBILITY_DEFINED=false
DEPENDENCY_RELATIONSHIP_EVIDENCE_MODEL_DEFINED=true
DEPENDENCY_RELATIONSHIP_PARTICIPANTS_DEFINED=false
IMPORT_DECLARATION_ANALYSIS=NOT_REACHED
```

Discovery remains a pre-participation boundary only. No participant, compatibility result, or dependency structure is created.

## 12. Authority Boundary

```text
candidate-discovery-framework=THIS_REVIEW_ONLY
candidate-subject-creation=NONE
compatibility-evaluation=NONE
participant-selection=NONE
relationship-instance-analysis=NONE
edge-analysis=NONE
graph-analysis=NONE
IMPORT_DECLARATION-analysis=NONE
implementation-inspection=NONE
Check 5=NONE
Check 6=NONE
freeze=NONE
acceptance=NONE
```

This temporary Authority applies only to authoring the candidate-discovery framework. It grants no Authority to select participants, evaluate compatibility, assign roles, create relationships, create edges, construct graphs, analyse `IMPORT_DECLARATION` as dependency, inspect implementation, or run Check 5 or Check 6.

The review stops after candidate discovery is authored. No next step is performed.
