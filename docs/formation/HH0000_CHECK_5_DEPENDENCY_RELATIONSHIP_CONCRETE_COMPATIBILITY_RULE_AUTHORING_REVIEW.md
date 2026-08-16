# HH-0000 Check 5 Dependency Relationship Concrete Compatibility Rule Authoring Review

**Status:** OUTCOME 1 - `DEPENDENCY_RELATIONSHIP` CONCRETE COMPATIBILITY RULES AUTHORED; NO SUBJECTS EVALUATED
**Review date:** 2026-08-15
**Review type:** Documentation-only bounded concrete compatibility-rule authoring review
**Controlling input 1:** `HH-0000 CHECK 5 DEPENDENCY RELATIONSHIP COMPATIBILITY AUTHORING REVIEW`
**Controlling input 2:** `HH-0000 CHECK 5 DEPENDENCY RELATIONSHIP ROLE DOMAIN AUTHORING REVIEW`
**Controlling input 3:** `HH-0000 CHECK 5 DEPENDENCY RELATIONSHIP EVIDENCE MODEL AUTHORING REVIEW`
**Concrete compatibility rules authored:** Yes
**Compatibility evaluation performed:** No
**Participants selected:** None
**`IMPORT_DECLARATION` evaluated:** No
**Relationships created:** None
**Edges created:** None
**Graphs constructed:** None
**Implementation inspected:** No
**POLICY-5 accessed or modified:** No
**Check 5:** `UNMEASURED`
**Check 6:** `NOT RUN`
**Authority effect:** Concrete compatibility-rule authoring only

# Repository Traceability

**Principle:** Truth before certainty; compatibility rules describe admissibility predicates, not participant selection, role assignment, or relationship creation; human Authority; smallest justified change.
**Theory:** A compatibility rule is the governed predicate determining whether a candidate semantic subject satisfies the relevant role-domain boundary for the future `DEPENDENCY_RELATIONSHIP` kind without assigning that subject to a role or establishing a relationship.
**Architecture:** Rule definitions are authored for `DEPENDENT` and `DEPENDED_UPON`; there is no evaluation of any specific participant, subject, or relationship instance.
**Engineering:** Rule predicates, excluded properties, evidence threshold, unknown handling, preserved states, mandatory stops, and Authority denial.
**Milestone:** Not Applicable.
**Evidence:** The abstract compatibility review, abstract role-domain review, and Evidence-model review plus this authoring record. No participant, subject, compatibility evaluation result, relationship instance, edge, graph, implementation, Check 5, Check 6, freeze, or acceptance Evidence.

## 1. Purpose and Strict Boundary

This review defines only the concrete predicates that would determine whether a governed semantic subject is compatible with the role-domain boundary for:

```text
DEPENDENT
DEPENDED_UPON
```

The review does not assign a participant to either role, evaluate `IMPORT_DECLARATION`, create a relationship instance, or construct any graph. It defines what a compatibility rule must test, what properties are relevant, what properties preclude compatibility, and what evidence is required for a compatibility result.

Exactly this one Markdown file is created.

## 2. Required Distinctions

```text
COMPATIBILITY_RULE != PARTICIPANT
COMPATIBILITY_RULE != ROLE_ASSIGNMENT
COMPATIBILITY_RULE != RELATIONSHIP_INSTANCE
COMPATIBILITY_RULE != GRAPH_EDGE
COMPATIBILITY_RULE != SUBJECT_SELECTION
```

A compatibility rule is a predicate over a subject's semantic properties. It does not claim the subject is a participant, does not select the subject, and does not author a relationship.

## 3. Compatibility Rule Contract

A concrete compatibility rule must define the admissible semantic properties, the exclusion properties, the evidence needed to support the rule, and the unresolved state if the subject cannot be classified reproducibly.

```text
DEPENDENCY_RELATIONSHIP_COMPATIBILITY_RULE_CONTRACT=ROLE_DOMAIN_ADMISSIBILITY_PREDICATE_AND_EXCLUSION_PROPERTIES_AND_REQUIRED_SUPPORTING_EVIDENCE_AND_UNKNOWN_TREATMENT
DEPENDENCY_RELATIONSHIP_COMPATIBILITY_RULE_IS_PARTICIPANT=false
DEPENDENCY_RELATIONSHIP_COMPATIBILITY_RULE_SELECTS_SUBJECT=false
DEPENDENCY_RELATIONSHIP_COMPATIBILITY_RULE_ASSIGNS_ROLE=false
DEPENDENCY_RELATIONSHIP_COMPATIBILITY_RULE_ESTABLISHES_RELATIONSHIP=false
DEPENDENCY_RELATIONSHIP_COMPATIBILITY_RULE_CREATES_EDGE=false
DEPENDENCY_RELATIONSHIP_COMPATIBILITY_RULE_CONSTRUCTS_GRAPH=false
```

## 4. Shared Compatibility Requirements

Each role-specific compatibility rule must require all of the following before a `COMPATIBILITY_TRUE` result can be considered:

1. the subject is a governed semantic subject;
2. the subject has a reproducible semantic meaning;
3. the subject satisfies the relevant role-domain category;
4. the subject's dependency-bearing property is independently distinguishable from mere representation, naming, or reference;
5. the subject's classification is not contradicted by governing Evidence;
6. the supporting Evidence is authorised and reproducible; and
7. the compatibility determination is kept separate from role assignment.

```text
DEPENDENCY_RELATIONSHIP_SHARED_COMPATIBILITY_REQUIREMENTS=SEMANTIC_SUBJECT_AND_REPRODUCIBLE_SEMANTIC_MEANING_AND_ROLE_DOMAIN_MATCH_AND_DEPENDENCY_BEARING_PROPERTY_AND_NO_CONTRADICTION_AND_AUTHORISED_REPRODUCIBLE_EVIDENCE_AND_ROLE_ASSIGNMENT_SEPARATION
DEPENDENCY_RELATIONSHIP_COMPATIBILITY_REQUIRES_SEMANTIC_SUBJECT=true
DEPENDENCY_RELATIONSHIP_COMPATIBILITY_REQUIRES_REPRODUCIBLE_MEANING=true
DEPENDENCY_RELATIONSHIP_COMPATIBILITY_REQUIRES_ROLE_DOMAIN_MATCH=true
DEPENDENCY_RELATIONSHIP_COMPATIBILITY_REQUIRES_DEPENDENCY_PROPERTY=true
DEPENDENCY_RELATIONSHIP_COMPATIBILITY_REQUIRES_CONTRADICTION_CHECK=true
DEPENDENCY_RELATIONSHIP_COMPATIBILITY_REQUIRES_AUTHORISED_EVIDENCE=true
DEPENDENCY_RELATIONSHIP_COMPATIBILITY_REQUIRES_ROLE_ASSIGNMENT_SEPARATION=true
```

## 5. `DEPENDENT` Compatibility Rule

A subject is compatible with the `DEPENDENT` role only when it satisfies the `DEPENDENT` admissibility category, has a governed semantic meaning that is dependency-bearing, and its dependency-bearing nature remains distinguishable from representation structure, references, runtime data, ownership, or graph adjacency.

```text
DEPENDENT_COMPATIBILITY_RULE=SUBJECT_IS_GOVERNED_SEMANTIC_SUBJECT_AND_SEMANTIC_MEANING_IS_DEPENDENCY_BEARING_AND_ROLE_DOMAIN_MATCHES_DEPENDENT_AND_SUPPORTING_EVIDENCE_IS_AUTHORISED_AND_REPRODUCIBLE
DEPENDENT_COMPATIBILITY_REQUIRES_ROLE_DOMAIN_MATCH=true
DEPENDENT_COMPATIBILITY_REQUIRES_DEPENDENCY_BEARING_MEANING=true
DEPENDENT_COMPATIBILITY_REQUIRES_SUPPORTING_EVIDENCE=true
DEPENDENT_COMPATIBILITY_REQUIRES_NO_CONTRADICTION=true
```

### `DEPENDENT` Exclusions

The following are not sufficient grounds for `DEPENDENT` compatibility:

```text
DEPENDENT_COMPATIBILITY_EXCLUDES_RAW_SYNTAX_ONLY=true
DEPENDENT_COMPATIBILITY_EXCLUDES_REFERENCE_ONLY=true
DEPENDENT_COMPATIBILITY_EXCLUDES_LINKAGE_ONLY=true
DEPENDENT_COMPATIBILITY_EXCLUDES_OWNERSHIP_ONLY=true
DEPENDENT_COMPATIBILITY_EXCLUDES_GRAPH_POSITION_ONLY=true
DEPENDENT_COMPATIBILITY_EXCLUDES_RUNTIME_OUTPUT_ONLY=true
DEPENDENT_COMPATIBILITY_EXCLUDES_RECORD_EXISTENCE_ONLY=true
DEPENDENT_COMPATIBILITY_EXCLUDES_NAME_MATCH_ONLY=true
DEPENDENT_COMPATIBILITY_EXCLUDES_IMPORT_DECLARATION_BY_NAME_ONLY=true
```

## 6. `DEPENDED_UPON` Compatibility Rule

A subject is compatible with the `DEPENDED_UPON` role only when it satisfies the `DEPENDED_UPON` admissibility category, has a governed semantic meaning that is dependency-target-capable, and its dependency-target capability remains distinguishable from representation structure, references, ownership, or graph placement.

```text
DEPENDED_UPON_COMPATIBILITY_RULE=SUBJECT_IS_GOVERNED_SEMANTIC_SUBJECT_AND_SEMANTIC_MEANING_IS_DEPENDENCY_TARGET_CAPABLE_AND_ROLE_DOMAIN_MATCHES_DEPENDED_UPON_AND_SUPPORTING_EVIDENCE_IS_AUTHORISED_AND_REPRODUCIBLE
DEPENDED_UPON_COMPATIBILITY_REQUIRES_ROLE_DOMAIN_MATCH=true
DEPENDED_UPON_COMPATIBILITY_REQUIRES_DEPENDENCY_TARGET_CAPABILITY=true
DEPENDED_UPON_COMPATIBILITY_REQUIRES_SUPPORTING_EVIDENCE=true
DEPENDED_UPON_COMPATIBILITY_REQUIRES_NO_CONTRADICTION=true
```

### `DEPENDED_UPON` Exclusions

The following are not sufficient grounds for `DEPENDED_UPON` compatibility:

```text
DEPENDED_UPON_COMPATIBILITY_EXCLUDES_RAW_SYNTAX_ONLY=true
DEPENDED_UPON_COMPATIBILITY_EXCLUDES_REFERENCE_ONLY=true
DEPENDED_UPON_COMPATIBILITY_EXCLUDES_LINKAGE_ONLY=true
DEPENDED_UPON_COMPATIBILITY_EXCLUDES_OWNERSHIP_ONLY=true
DEPENDED_UPON_COMPATIBILITY_EXCLUDES_GRAPH_POSITION_ONLY=true
DEPENDED_UPON_COMPATIBILITY_EXCLUDES_RUNTIME_OUTPUT_ONLY=true
DEPENDED_UPON_COMPATIBILITY_EXCLUDES_RECORD_EXISTENCE_ONLY=true
DEPENDED_UPON_COMPATIBILITY_EXCLUDES_NAME_MATCH_ONLY=true
DEPENDED_UPON_COMPATIBILITY_EXCLUDES_IMPORT_DECLARATION_BY_NAME_ONLY=true
```

## 7. Required Evidence for Compatibility

A compatibility result may only be supported by evidence that establishes:

- the subject's semantic-subject status;
- the subject's independent semantic meaning;
- the relevant role-domain match;
- the dependency-bearing or dependency-target-capable property;
- the absence of contradiction;
- the authorised, reproducible provenance of the supporting assertion;
- the distinction between evidence and representation, reference, linkage, graph position, or runtime output.

```text
DEPENDENCY_RELATIONSHIP_COMPATIBILITY_EVIDENCE_REQUIREMENT=SEMANTIC_SUBJECT_STATUS_AND_SEMANTIC_MEANING_AND_ROLE_DOMAIN_MATCH_AND_DEPENDENCY_PROPERTY_AND_NO_CONTRADICTION_AND_AUTHORISED_REPRODUCIBLE_PROVENANCE
DEPENDENCY_RELATIONSHIP_COMPATIBILITY_REQUIRES_EVIDENCE=true
DEPENDENCY_RELATIONSHIP_COMPATIBILITY_EVIDENCE_CANNOT_BE_REPRESENTATION_ONLY=true
DEPENDENCY_RELATIONSHIP_COMPATIBILITY_EVIDENCE_CANNOT_BE_REFERENCE_ONLY=true
DEPENDENCY_RELATIONSHIP_COMPATIBILITY_EVIDENCE_CANNOT_BE_LINKAGE_ONLY=true
DEPENDENCY_RELATIONSHIP_COMPATIBILITY_EVIDENCE_CANNOT_BE_GRAPH_POSITION_ONLY=true
DEPENDENCY_RELATIONSHIP_COMPATIBILITY_EVIDENCE_CANNOT_BE_RUNTIME_OUTPUT_ONLY=true
DEPENDENCY_RELATIONSHIP_COMPATIBILITY_EVIDENCE_CANNOT_BE_ASSUMPTION_ONLY=true
```

## 8. Possible Results

The compatibility rule framework defines the possible states without evaluating any subject.

```text
COMPATIBILITY_TRUE=SUBJECT_SATISFIES_ROLE_DOMAIN_AND_DEPENDENCY_PROPERTY_AND_AUTHORISED_SUPPORTING_EVIDENCE
COMPATIBILITY_FALSE=SUBJECT_DOES_NOT_SATISFY_ROLE_DOMAIN_OR_DEPENDENCY_PROPERTY_OR_EVIDENCE_IS_INSUFFICIENT
COMPATIBILITY_UNKNOWN=SUBJECT_STATUS_OR_MEANING_OR_SUPPORTING_EVIDENCE_UNRESOLVED_OR_CONTRADICTORY_OR_INCOMPLETE
```

This review defines the points at which those states arise. It does not assert any one of them for any subject.

## 9. Status and Outcome

The concrete compatibility rules are authored. Compatibility application remains unperformed.

```text
DEPENDENCY_RELATIONSHIP_COMPATIBILITY_RULES_STATUS=DEFINED
DEPENDENCY_RELATIONSHIP_COMPATIBILITY_RULES_AUTHORED=true
DEPENDENCY_RELATIONSHIP_COMPATIBILITY_EVALUATION_PERFORMED=false
```

### Outcome 1 - `DEPENDENCY_RELATIONSHIP_CONCRETE_COMPATIBILITY_RULES_DEFINED`

**Selected.** The concrete predicates for `DEPENDENT` and `DEPENDED_UPON` compatibility are defined without evaluating any subject or assigning any role.

### Outcome 2 - `DEPENDENCY_RELATIONSHIP_CONCRETE_COMPATIBILITY_RULES_BLOCKED`

Not selected. The compatibility rule contract is sufficiently determinate to define role-domain predicates without participant or relationship evaluation.

### Outcome 3 - `DEPENDENCY_RELATIONSHIP_CONCRETE_COMPATIBILITY_RULES_UNKNOWN`

Not selected. The rule-level admissibility predicates are determinate, while subject-specific evaluation remains unperformed.

```text
SELECTED_OUTCOME=OUTCOME_1
DEPENDENCY_RELATIONSHIP_CONCRETE_COMPATIBILITY_RULES_DEFINED=true
```

## 10. Preserved States

```text
DEPENDENCY_RELATIONSHIP_KIND_CREATED=false
DEPENDENCY_RELATIONSHIP_DIRECTION_DEFINED=true
DEPENDENCY_RELATIONSHIP_ROLES_DEFINED=true
DEPENDENCY_RELATIONSHIP_ROLE_DOMAINS_DEFINED=true
DEPENDENCY_RELATIONSHIP_COMPATIBILITY_DEFINED=false
DEPENDENCY_RELATIONSHIP_PARTICIPANTS_DEFINED=false
DEPENDENCY_RELATIONSHIP_EVIDENCE_MODEL_DEFINED=true
IMPORT_DECLARATION_ANALYSIS=NOT_REACHED
```

The compatibility rules are authored; no compatibility result has been produced and no subject has been selected.

## 11. Authority Boundary

```text
concrete-compatibility-authoring=THIS_REVIEW_ONLY
compatibility-evaluation=NONE
participant-selection=NONE
relationship-instance-analysis=NONE
edge-analysis=NONE
graph-analysis=NONE
relationship-kind-creation=NONE
IMPORT_DECLARATION-analysis=NONE
implementation-inspection=NONE
Check 5=NONE
Check 6=NONE
freeze=NONE
acceptance=NONE
```

This temporary Authority applies only to authoring the concrete compatibility predicates. It grants no Authority to evaluate compatibility for a subject, select a participant, assign a role, create a relationship, create an edge, construct a graph, inspect implementation, or run Check 5 or Check 6.

The review stops after the concrete compatibility rules are authored. No next step is performed.
