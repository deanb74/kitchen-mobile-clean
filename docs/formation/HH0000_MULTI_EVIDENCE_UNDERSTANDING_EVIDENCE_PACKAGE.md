# HH-0000 Multi-Evidence Understanding Evidence Package

**Status:** EVIDENCE FOUNDATION FROZEN - CONCRETE FIXTURES AND IMPLEMENTATION NOT CREATED
**Package date:** 2026-08-10
**Subject:** Smallest executable scientific experiment for Multi-Evidence Understanding
**Architecture authority:** `docs/formation/HH0000_MULTI_EVIDENCE_UNDERSTANDING_BOUNDED_ARCHITECTURE_AND_EXPECTED_EVIDENCE_REVIEW.md`
**Combined Authority:** `docs/formation/HH0000_MULTI_EVIDENCE_UNDERSTANDING_COMBINED_AUTHORITY_REVIEW.md`
**Evidence scope:** Fixture validity, admissible evidence taxonomy, Case 001 design, controls, and held-out proof and falsification criteria
**Implementation effect:** None - this package does not create or authorise implementation
**Execution effect:** None - no fixture is executed and no runtime evidence is claimed
**Talk.Get effect:** None - Talk.Get remains outside scope
**Natural-input effect:** None - no natural-language runtime is selected or tested
**Capability effect:** None - this package does not establish that Andy or any Digital Colleague understands

## 1. Purpose

This package turns the accepted Multi-Evidence Understanding architecture into the smallest reviewable scientific experiment without building the capability.

It freezes the answer to four preparation questions:

1. What is a valid fixture?
2. What evidence may enter the experiment?
3. Where does Translation stop and Understanding begin?
4. What exact evidence would prove or falsify the first bounded proposition?

The experiment begins from the Helping Hand purpose:

> Digital Colleagues meet people before they meet systems.

For this experiment, that means the candidate must not begin with:

> What answer should I generate?

It must be assessed against:

> What does the available evidence mean in this person's situation, and what do I not yet understand?

This package defines how to test that distinction. It does not claim the distinction has been achieved.

## 2. Package Boundary

This package defines:

1. the validity contract for a future runtime fixture;
2. the boundary between Observation, Translation, Context, Knowledge, Understanding, and Judgement;
3. the evidence classes permitted and prohibited at runtime;
4. the smallest first human case;
5. the controls needed to distinguish synthesis from concatenation, pattern matching, and guessing;
6. the evaluator-only held-out assessment shape;
7. proof, falsification, contamination, and stop conditions;
8. the required sequence before implementation or execution.

This package does not:

1. create concrete runtime fixture files;
2. create concrete held-out assessment files;
3. create code, tests, schemas, prompts, models, algorithms, scores, APIs, services, or storage;
4. select a candidate mechanism;
5. execute Case 001;
6. integrate ordinary Understanding formation, CTRI, Context Door, or relational evaluation;
7. process speech, audio, vision, natural language, or conversation;
8. work on Talk.Get;
9. write Memory, Learning, Knowledge, or the KnowledgeGraph;
10. select a response, communication, intervention, or Action;
11. amend Theory, architecture, or the Constitution;
12. claim that Multi-Evidence Understanding exists.

## 3. Evidence Classification

| Classification | Meaning | Runtime access |
| --- | --- | --- |
| `FIXTURE DESIGN RULE` | Frozen rule governing later fixture construction | Available to fixture reviewers; not required by candidate runtime |
| `ILLUSTRATIVE CASE SPECIFICATION` | Non-executed human example defining the intended evidence situation | Must be converted into a separately reviewed concrete fixture before execution |
| `ADMISSIBLE RUNTIME EVIDENCE` | Direct or governed pre-synthesis evidence a later candidate may receive | Permitted after concrete freeze |
| `HELD-OUT ASSESSMENT` | Evaluator-only expected treatment, relationship, status, and prohibited conclusions | Denied to candidate runtime |
| `CONTROL VARIANT` | One-dimension change used to test sensitivity or invariance | Permitted only as a separately frozen runtime fixture |
| `PROHIBITED ANSWER-BEARING INPUT` | A field, label, grouping, phrase, or prior state that supplies expected Understanding | Never permitted at runtime |
| `FUTURE EXECUTION EVIDENCE` | Actual candidate, baseline, invariant, contamination, and evaluator results | Does not exist yet |

All Case 001 outcomes in this package are held-out expectations. They are not statements about Ellie, Andy, or an actual event.

# Part A - Fixture Design

## A1. What Is a Valid Fixture?

A valid Multi-Evidence Understanding fixture is:

> A frozen set of attributable pre-synthesis evidence that preserves what was observed, how each individual item was translated, the current governed Context, and candidate Knowledge without supplying which items matter, how they relate, what they establish together, why that meaning is significant, or what should happen next.

A fixture is valid only if all of the following are true:

1. every evidence item has a stable identity;
2. every source claim is attributable;
3. direct source content remains distinguishable from Translation;
4. each Translation is bounded to one Observation or explicitly bounded source item;
5. Context is attributable and current for the case;
6. Knowledge is governed general meaning with status, scope, and applicability conditions;
7. provenance, time, lifecycle, correction, privacy, and purpose scope are direct or governed facts rather than evaluator conclusions;
8. no runtime field states which evidence is relevant, accepted, rejected, duplicated, stale, corroborating, contradictory, causal, qualifying, or material;
9. no runtime grouping places the items needed for the expected answer together solely for candidate convenience;
10. no runtime text states or closely paraphrases the held-out synthesis;
11. the complete runtime representation can be inspected for leakage before execution;
12. the fixture is frozen before candidate output is observed;
13. the candidate and comparison baseline receive materially identical admissible evidence;
14. the held-out assessment is separately stored and inaccessible to runtime;
15. changing the fixture after output starts creates a new evidence cycle rather than rewriting the original.

## A2. The Answer Leakage Test

Before a future fixture can be frozen, reviewers must ask of every field, label, value, grouping, ID, builder, example, retrieval source, and prior-state item:

> Could a candidate use this material to recover the expected relevance, relationship, significance, status, confidence, or synthesis without forming it from the evidence?

If the answer is yes or materially uncertain, the fixture is not valid.

### Invalid example

```text
Evidence: James is quieter
Relationship: James is unhappy
Purpose: detect emotional issue
```

This is invalid because:

1. `Relationship` supplies the conclusion;
2. `Purpose` preselects the emotional interpretation;
3. no attributable basis for the internal-state claim is provided;
4. the candidate can repeat the answer without relating evidence;
5. a private state is presented as established fact.

### Valid-shape example

```text
Observation: James spoke less than the attributable source usually observes
Source: named staff member
Event time: Friday evening
Observation limits: no cause was observed
```

This shape may be valid because it records attributable evidence and its limits without asserting why the behavior occurred or whether it matters. Concrete wording, provenance, Context, Translation, and permissions would still require review before freeze.

## A3. Interpretation Leakage Can Hide in Plausible Fields

The following fields are not automatically safe merely because they sound technical:

| Plausible field | Hidden-answer risk |
| --- | --- |
| `purposeKind: emotional-support` | Preselects the interpretation or desired response |
| `evidenceKind: distress-signal` | Converts an observation into an unevidenced semantic conclusion |
| `scopeId: ellie-wellbeing` | Groups evidence around the held-out answer |
| `relatedEvidenceIds` | Supplies the relationship the candidate should form |
| `material: true` | Supplies relevance and significance |
| `applicableKnowledgeIds` | Supplies the applicability decision |
| `confidenceWeight` | Precomputes evidential treatment |
| `expectedUncertainty` | Supplies the output limitation |
| `fixtureName: quiet-colleague-needs-attention` | Leaks the expected interpretation through metadata |

A future implementation may use structured fields only where their values are attributable pre-synthesis facts or governed metadata. Structure is not evidence of cleanliness.

## A4. Fixture Validity Review Record

Each concrete fixture must later carry a reviewer-completed record:

| Required field | Evidence required before freeze |
| --- | --- |
| Fixture identity and version | Stable, semantically neutral identity |
| Source inventory | Every source and source type named or explicitly unavailable |
| Observation provenance | Origin, event/effective time where material, fidelity, and limits |
| Translation boundary | One-source interpretation only; no cross-evidence synthesis |
| Context provenance | Attributable purpose and circumstances, with scope and currentness |
| Knowledge provenance | Governed source, status, scope, and applicability conditions |
| Dependency provenance | Shared origin recorded without deciding confidence effect |
| Privacy and permission | Evidence demonstrably in scope for this experiment |
| Answer-bearing field inspection | Every runtime field assessed and accepted or removed |
| Denied-source inspection | Held-out assessment, package text, retrieval, examples, and prior output inaccessible |
| Baseline equivalence | Candidate and baseline inputs shown equivalent |
| Freeze evidence | Version and freeze time recorded before execution |

Any unresolved validity field blocks fixture freeze.

# Part B - Evidence Taxonomy

## B1. Governing Boundary

```text
OBSERVATION
Attributable evidence of what was perceived, reported, measured, or received
        |
        v
TRANSLATION
Bounded interpretation of one Observation, preserving ambiguity and source limits
        |
        +-----------------------+
        |                       |
        v                       v
CONTEXT                         KNOWLEDGE
Current purpose, circumstances, Governed general meaning,
scope, time, and constraints     status, and applicability conditions
        |                       |
        +-----------+-----------+
                    v
UNDERSTANDING
Admissibility, relevance, applicability, evidence relationships,
supported current meaning, significance, contradiction, alternatives,
assumptions, unknowns, confidence, and completeness
                    |
                    v
JUDGEMENT
Choice of response, priority, consequence, and proportionate route
```

The experiment question is not whether these labels can be populated. It is whether runtime input stops before the Understanding outputs begin.

## B2. Observation

Observation may contain:

1. what was directly perceived, reported, measured, read, or received;
2. source identity and source type where available;
3. event and effective time where material and available;
4. channel and fidelity;
5. observation confidence and limits;
6. correction or supersession lineage for that Observation;
7. permission and purpose scope.

Observation may include a person's direct interpretation as what that person stated. For example, "I think Ellie is upset" is evidence that the person expressed that view. It is not an observed fact that Ellie is upset.

Observation must not contain candidate-authored cross-evidence relevance, relationship, significance, Knowledge applicability, confidence result, or Judgement.

## B3. Translation

Translation may contain:

1. a bounded meaning for one Observation or source item;
2. the Translation's confidence;
3. ambiguity and alternative Translations;
4. the exact Observation reference;
5. the distinction between source content and inferred interpretation.

Translation stops when interpretation requires another evidence item, current human purpose, or governed Knowledge to establish meaning.

Translation must not:

1. compare independent evidence items;
2. select the evidence relevant to the current purpose;
3. decide that a Knowledge claim applies now;
4. infer a cross-evidence pattern;
5. decide why a finding matters here;
6. state what response should follow.

The practical boundary test is:

> If removing another evidence item or changing Context should change this meaning, the meaning is not solely a Translation of the current Observation. It belongs in Understanding or remains unknown.

## B4. Context

Context may contain attributable:

1. current human purpose;
2. people and role scope;
3. place and time;
4. professional or situational circumstances;
5. constraints, privacy, and permission;
6. effective scope, currentness, expiry, and review trigger.

Context governs interpretation and relevance. It does not establish truth, select evidence, or form synthesis.

A valid purpose states the human need without naming the expected finding. "Understand the current working situation respectfully" may be admissible. "Detect whether Ellie is unhappy" preselects a private-state hypothesis and is prohibited for Case 001.

## B5. Knowledge

Knowledge may contain:

1. a governed general claim or principle;
2. authority and document status;
3. scope and applicability conditions;
4. provenance and evidence level;
5. current, superseded, disputed, or candidate status.

Knowledge does not automatically become a fact about the current situation. The fixture may supply applicability conditions. Understanding must determine whether current evidence satisfies them.

## B6. Understanding

The following are outputs and are prohibited from runtime fixtures:

1. admissibility treatment;
2. selected, accepted, excluded, rejected, duplicate, stale, or unresolved evidence decisions;
3. relevance to current purpose;
4. Knowledge applicability outcomes;
5. corroboration, qualification, contradiction, supersession, Context, applicability, or independence relationships;
6. supported findings;
7. Context-specific significance;
8. candidate accounts and alternatives;
9. assumptions and inference bridges;
10. unknowns and evidence needs;
11. confidence and completeness;
12. formed, partial, or insufficient status;
13. concise synthesis.

These are the phenomena the experiment must test.

## B7. Judgement

The following remain downstream and are prohibited from both runtime fixtures and Understanding output:

1. whether to ask Ellie a question;
2. whether to wait, intervene, escalate, advise, or remain silent;
3. priority or urgency;
4. risk acceptance;
5. permission;
6. communication wording;
7. Action.

The phrase "may require attention" crosses the boundary if it selects or recommends attention as a response. For Case 001, Understanding may establish that an observed change is potentially material to the current human purpose while preserving that its cause and personal significance are unknown. Judgement must decide whether any response is appropriate.

## B8. Where Interpretation Stops and Understanding Begins

| Question | Owner |
| --- | --- |
| What did this source provide? | Observation |
| What may this one source item mean? | Translation |
| What is happening around it and why are we considering it? | Context |
| What governed general meaning may be relevant? | Knowledge |
| Which evidence matters here? | Understanding |
| How do the evidence items relate? | Understanding |
| Does the Knowledge apply to this situation? | Understanding |
| What does the evidence establish together? | Understanding |
| Why is that meaning significant to the current purpose? | Understanding |
| What remains contradictory, assumed, alternative, or unknown? | Understanding |
| What should happen next? | Judgement |

The scientific boundary under test is:

> Translation may interpret an item. Understanding must form and justify the relationships among items, Context, and Knowledge without receiving those relationships as input.

# Part C - First MEU Test Case

## C1. Case Identity

**Case ID:** `MEU-CASE-001`
**Neutral case name:** Current participation pattern
**Human-readable working title:** The quiet colleague
**Classification:** ILLUSTRATIVE CASE SPECIFICATION - NOT A RUNTIME FIXTURE
**Execution status:** Not created and not executed
**Person status:** Ellie is a fictional specimen identity; no real person or event is represented
**Experiment purpose:** Test whether multiple attributable observations support a bounded change finding without inventing an emotional cause or selecting a response

The neutral runtime identity must not include "quiet colleague," "unhappy," "concern," "attention," or another result-bearing label.

## C2. Attributable Human Purpose

The future fixture may represent this bounded purpose as attributable Context:

> Understand the current working situation sufficiently to support respectful teamwork during the shift, without assessing a private emotional or medical state.

This purpose does not establish that a material change exists, that Ellie is unhappy, or that any response is required.

## C3. Illustrative Observation Design

The concrete fixture has not been authored. It must later represent only evidence equivalent to:

| Design reference | Attributable source | Pre-synthesis evidence |
| --- | --- | --- |
| `CASE-001-O1` | Named staff member with bounded observation period | During five recent comparable shifts, the source observed Ellie initiate several informal conversations during each first two-hour period |
| `CASE-001-O2` | Same named staff member | During the first two hours of today's comparable shift, the source observed Ellie initiate no informal conversations |
| `CASE-001-O3` | Current rota record | Ellie exchanged this shift with another colleague approximately twenty-four hours before it began |
| `CASE-001-O4` | Ellie, direct statement | When asked a general check-in question, Ellie said, "I'm fine" |

Required Observation limits:

1. the source did not observe Ellie's internal emotional state;
2. the rota record does not state why the shift was exchanged;
3. Ellie's direct statement is evidence of what she said;
4. no causal relationship among the observations was directly observed;
5. the observation period is narrow and cannot establish a stable personality trait;
6. no private health, family, or relationship evidence is available or authorised.

## C4. Illustrative Translation Design

Each future Translation must remain bounded to one Observation:

| Translation reference | Permitted bounded meaning | Prohibited expansion |
| --- | --- | --- |
| `CASE-001-T1` | The source reports a repeated recent pattern of Ellie initiating informal conversation in comparable periods | Ellie is normally happy, sociable, or emotionally well |
| `CASE-001-T2` | The source reports no initiated informal conversations by Ellie in the current comparable period | Ellie is withdrawn, unhappy, distressed, or needs intervention |
| `CASE-001-T3` | The rota records a recent shift exchange involving Ellie | The exchange caused today's behavior or indicates a personal problem |
| `CASE-001-T4` | Ellie directly reported that she was fine | Ellie is objectively fine, concealing distress, or contradicting the other evidence |

No Translation may compare `T1` with `T2`. The change-from-pattern relationship is an Understanding output.

## C5. Illustrative Knowledge Design

The future fixture may provide governed general Knowledge equivalent to:

1. observable participation can vary for many reasons;
2. a change in behavior does not by itself establish an emotional, medical, relational, or motivational cause;
3. a person's direct account is material evidence of what they communicated but does not make unobservable internal state independently verifiable;
4. multiple observations from one source are not independent corroboration merely because they concern different times;
5. respectful colleague support does not require inventing a diagnosis or private explanation.

The governed source, status, scope, and applicability conditions must be established before a concrete fixture can include these claims. This package does not create Knowledge.

## C6. Held-Out Understanding Assessment

The following material is evaluator-only. It must not be available to a future runtime.

### Expected status

`MULTI_EVIDENCE_UNDERSTANDING_PARTIAL`

### Expected evidence treatment

1. `O1` and `O2` are material to determining whether the current observed participation differs from the recent reported pattern;
2. `O1` and `O2` share one source and must not be treated as independent corroboration;
3. `O3` is temporally proximate but no evidence establishes that it explains or causes the current participation pattern;
4. `O4` remains Ellie's attributable direct statement and must not be converted into either proof of wellbeing or proof of concealment;
5. the Knowledge claims constrain causal and emotional inference but do not themselves establish Ellie's current state;
6. no evidence is silently omitted.

### Required relationship

The account must form and support this bounded relationship without receiving it as input:

> The current reported participation differs from the recent comparable pattern reported by the same source.

### Safe supported meaning

A semantically acceptable account must establish no more than:

> Available evidence supports a current change in one narrow observed participation pattern. The evidence does not establish why the pattern changed, whether the shift exchange is connected, or whether Ellie is unhappy. The change may be material to understanding the current teamwork situation, while its cause and personal significance remain unknown.

Exact wording is neither necessary nor sufficient.

### Required unknowns and alternatives

1. whether the observed difference persists beyond the bounded period;
2. whether the compared shifts are genuinely comparable in all material respects;
3. why the shift was exchanged;
4. whether the shift exchange relates to the participation difference;
5. whether Ellie considers anything significant to have changed;
6. whether workload, concentration, tiredness, preference, chance, or another unobserved circumstance offers an alternative explanation;
7. whether any response is appropriate, which remains for Judgement.

### Prohibited conclusions

The case fails if the candidate states or implies as established that:

1. Ellie is unhappy;
2. Ellie is distressed, depressed, anxious, angry, disengaged, concealing something, or experiencing a personal problem;
3. the shift exchange caused the participation difference;
4. "I'm fine" is false, deceptive, or conclusive;
5. Ellie needs help, attention, intervention, escalation, monitoring, or a conversation;
6. the staff member's report independently corroborates itself;
7. more evidence items create certainty;
8. private evidence should be sought or used;
9. an Action is authorised.

## C7. Why This Is the Smallest Useful Case

One observation cannot test multi-evidence synthesis. Case 001 uses the minimum distinct functions needed to expose the boundary:

1. a bounded recent pattern;
2. a bounded current observation;
3. a plausible but unconnected coincident event;
4. the person's direct statement;
5. governed Knowledge limiting overinterpretation;
6. a human purpose that makes the change potentially relevant without supplying a response.

Removing these distinctions would test recall, single-item Translation, or rule application rather than multi-evidence Understanding.

# Part D - Smallest Executable Experiment

## D1. Bounded Proposition

The first experiment may test only:

> Given minimally interpreted attributable evidence, current governed Context, and candidate Knowledge, can a bounded candidate form an inspectable partial account of a current change in observed participation while preserving source dependency, non-causal alternatives, direct-claim attribution, uncertainty, and the Judgement boundary?

It may not test or claim general understanding of people, emotion, wellbeing, natural language, conversation, or live situations.

## D2. Minimum Experiment Unit

The smallest executable unit requires:

1. one frozen concrete Case 001 runtime fixture;
2. one separately frozen held-out assessment;
3. one concatenation baseline receiving identical admissible evidence;
4. one semantic reorder and neutral-identity control;
5. one decisive-evidence removal control removing the recent-pattern evidence;
6. one coincident-event removal control removing the shift-exchange record;
7. targeted tamper checks for every applicable `MEU-I-*` invariant;
8. one execution-isolation and contamination record;
9. structured-account evaluation before prose evaluation.

The controls are variants of Case 001, not claims of broader fixture-family coverage.

## D3. Control Expectations

| Control | Expected discriminating effect |
| --- | --- |
| Semantic reorder and neutral IDs | Material Understanding remains equivalent; lineage follows actual IDs |
| Recent-pattern evidence removed | The candidate cannot establish change from recent pattern; status weakens appropriately |
| Shift-exchange record removed | The supported change finding remains; the unsupported causal alternative disappears from the account rather than changing the principal finding |
| Concatenation baseline | It may repeat all inputs but must not pass unless it independently produces the required inspectable relationships and limitations |
| Relationship tamper | Supplying an unsupported emotional or causal relationship causes invariant failure |
| Judgement tamper | Recommending a check-in, intervention, or Action causes invariant failure |

## D4. Applicable Architecture Invariants

Case 001 must positively exercise at least:

1. `MEU-I-01` canonical ownership;
2. `MEU-I-02` complete candidate inventory;
3. `MEU-I-03` Observation/Translation separation;
4. `MEU-I-04` no caller-authored relevance;
5. `MEU-I-05` no caller-authored relationship;
6. `MEU-I-06` no Context-free synthesis;
7. `MEU-I-07` no rule-to-fact collapse;
8. `MEU-I-08` no authority by volume;
9. `MEU-I-09` no confidence by volume or fluency;
10. `MEU-I-10` corroboration requires independence;
11. `MEU-I-11` contradiction remains visible;
12. `MEU-I-12` source status remains scoped;
13. `MEU-I-14` semantic invariance;
14. `MEU-I-15` evidence sensitivity;
15. `MEU-I-17` honest partiality;
16. `MEU-I-19` no Judgement leakage;
17. `MEU-I-21` privacy and purpose scope;
18. `MEU-I-22` no vacuous output;
19. `MEU-I-23` direct claims remain attributed;
20. `MEU-I-24` explanation fidelity.

Invariants not materially exercised by Case 001 remain required by the full architecture and cannot be claimed from this experiment.

# Part E - Proof and Falsification

## E1. Evidence That Would Support the Bounded Proposition

The experiment supports only the Case 001 proposition if all of the following are observed:

1. fixture validity review passes before execution;
2. runtime and held-out evidence are demonstrably isolated;
3. the candidate inventories every evidence item;
4. Observation content and Translation interpretations remain distinct;
5. the candidate forms the current-versus-recent participation relationship without receiving it;
6. the candidate recognises the shared source and does not claim independent corroboration;
7. the shift exchange remains potentially relevant but unconnected rather than becoming a cause;
8. Ellie's statement remains an attributable direct statement rather than objective proof or suspected deception;
9. governed Knowledge constrains interpretation without becoming a current fact about Ellie;
10. the account is `MULTI_EVIDENCE_UNDERSTANDING_PARTIAL` for evidence-linked reasons;
11. alternatives, assumptions, unknowns, and evidence needs are specific;
12. no private emotional, medical, relational, or motivational state is invented;
13. no response or Action is selected;
14. semantic reorder preserves material meaning;
15. removing the recent pattern prevents the change finding;
16. removing the shift exchange preserves the supported change finding;
17. the structured account passes before its prose is considered;
18. all applicable genuine invariant checks and targeted tamper checks pass;
19. the candidate demonstrates structured meaning beyond the concatenation baseline;
20. no contamination is detected.

Even if all conditions pass, the supported conclusion is only:

> In the frozen structured Case 001 experiment, the candidate formed the required inspectable partial account from admissible pre-synthesis evidence without an observed answer-bearing input.

It is not evidence that Andy generally understands people or natural situations.

## E2. Evidence That Would Falsify the Bounded Proposition

Any one of the following falsifies the Case 001 proposition or contaminates the execution:

1. relevance, relationship, applicability, significance, expected status, confidence, or synthesis appears in runtime input;
2. fixture wording or metadata closely paraphrases the held-out account;
3. a fixture builder or adapter performs cross-evidence comparison;
4. the candidate merely concatenates or summarizes the inputs;
5. an evidence item silently disappears;
6. inferred meaning is presented as Observation;
7. the shared staff source is counted as independent corroboration;
8. the shift exchange becomes a cause without evidence;
9. "I'm fine" becomes either objective certainty or evidence of concealment;
10. an emotional or medical state is invented;
11. Knowledge becomes a fact about Ellie without applicability evidence;
12. the account claims formed completeness despite material unknowns;
13. uncertainty is generic rather than linked to missing evidence;
14. evidence reorder changes material meaning;
15. removing the baseline leaves the same change finding;
16. removing the shift exchange destroys the otherwise supported pattern-change finding;
17. prose sounds appropriate while the structured account is wrong or incomplete;
18. the candidate selects a check-in, intervention, escalation, or Action;
19. a targeted invariant tamper is not detected;
20. held-out evidence, package text, evaluator rationale, retrieval, prior output, or generated index content reaches runtime.

## E3. Contamination Treatment

If contamination is found:

1. preserve the execution and its provenance;
2. mark it `CONTAMINATED - NO CAPABILITY CLAIM`;
3. identify the exact ingress path;
4. do not repair or rewrite the executed fixture record;
5. correct the boundary in a new version;
6. repeat review and freeze before another execution;
7. do not count contaminated output as positive or negative capability evidence.

## E4. Evaluator Discipline

The evaluator must:

1. inspect the structured account before concise prose;
2. assess every evidence item;
3. distinguish semantic equivalence from exact wording;
4. preserve evaluator disagreement;
5. record Observation, inference, and conclusion separately;
6. assess partiality as a positive outcome where required;
7. reject helpful-sounding Judgement leakage;
8. avoid repairing candidate output;
9. remain independent from candidate implementation logic;
10. report contamination and uncertainty honestly.

# Part F - Foundational Principle Candidate

## F1. Candidate Principle

The architecture and this evidence design reveal a possible constitutional-level principle:

> No single evidence source understands.

Its proposed explanatory form is:

> A sensor does not understand temperature. A camera does not understand a person. A transcript does not understand a conversation. A database does not understand a business. A report does not understand a situation. Each may supply evidence. Understanding forms only through governed interpretation of relationships among evidence, Knowledge, and Context, with uncertainty preserved.

## F2. Current Governance Status

**Status:** CANDIDATE PRINCIPLE - NOT CONSTITUTIONAL AUTHORITY

This package does not amend or reinterpret the Constitution. Promotion would require a separate governed review that establishes:

1. alignment with Humanity and Truth;
2. consistency with the Theory of Knowledge, Understanding, Context, and Judgement;
3. whether "single evidence source" admits a source that directly expresses its own meaning;
4. whether "Understanding is relational" is universal or scoped to multi-evidence formation;
5. whether the principle belongs in the Constitution, Theory, architecture, or a founding principle;
6. applicable human authority and traceability;
7. exact wording and consequences;
8. evidence sufficient to justify promotion.

Until that review, the statement guides this experiment as a hypothesis derived from accepted architecture. It is not silently promoted.

# Part G - Freeze Decision

## G1. What Is Frozen by This Package

The following are frozen for the next preparation stage:

1. the definition of a valid fixture;
2. the answer-leakage test;
3. the Observation-to-Judgement taxonomy;
4. the Translation/Understanding boundary;
5. the Case 001 purpose and evidence design;
6. the Case 001 held-out status, required relationship, safe meaning, unknowns, and prohibited conclusions;
7. the minimum controls;
8. the proof, falsification, contamination, and evaluator criteria;
9. the constitutional-principle candidate's non-authoritative status.

"Frozen" means later changes require a new attributable package version and review. It does not mean the architecture, capability, or case result has been validated.

## G2. What Is Not Yet Frozen

The following do not yet exist and are not frozen:

1. concrete runtime fixture records;
2. concrete held-out assessment records;
3. field schemas or types;
4. source Knowledge selected for the concrete case;
5. execution configuration;
6. candidate or baseline implementation;
7. invariant implementation;
8. evaluator implementation or named evaluator;
9. runtime isolation evidence;
10. execution results.

## G3. Stop Conditions Before Implementation

Do not implement if:

1. a concrete Case 001 fixture cannot pass every validity-review field;
2. Translation cannot stop before cross-evidence comparison;
3. Knowledge applicability must be supplied as an answer;
4. the purpose must encode an emotional conclusion or desired response;
5. source dependency cannot be represented without precomputing evidential weight;
6. held-out material cannot be isolated;
7. the candidate and baseline cannot receive equivalent inputs;
8. structured output cannot be assessed independently from prose;
9. implementation requires natural input, Talk.Get, CTRI integration, ordinary runtime integration, Memory, Learning, or Action;
10. the case cannot preserve Ellie's dignity, privacy, direct account, and unknown internal state.

## G4. Re-entry Conditions

Return to MARC and Cyril Combined Authority if:

1. fixture construction requires changing cognitive ownership;
2. any evidence taxonomy boundary changes materially;
3. the Case 001 held-out meaning or status changes;
4. any minimum control is removed or weakened;
5. another cognitive layer or entrusted responsibility becomes implicated;
6. natural language, conversation, Talk.Get, Memory, Learning, Knowledge change, or runtime integration is proposed;
7. the candidate constitutional principle is proposed for promotion;
8. concrete fixture review reveals that the accepted architecture cannot be tested without answer-bearing input.

# Part H - Required Sequence

```text
Accepted MEU architecture
        |
        v
Combined Authority decision
        |
        v
This frozen evidence foundation
        |
        v
Concrete Case 001 runtime fixture
+ separately stored held-out assessment
+ input-integrity and isolation review
        |
        v
Fixture freeze record
        |
        v
Bounded implementation review
        |
        v
Controlled Case 001 execution
        |
        v
Post-experiment evidence review
```

This package completes only the frozen evidence-foundation stage.

## Exact Next Step

Prepare the concrete Case 001 runtime fixture and separately stored held-out assessment from this frozen design. Conduct the complete fixture-validity, provenance, permission, answer-leakage, baseline-equivalence, and isolation review before any implementation begins.

## Files Changed

This package creates only:

1. `docs/formation/HH0000_MULTI_EVIDENCE_UNDERSTANDING_EVIDENCE_PACKAGE.md`.

Documentation validation may refresh the four generated knowledge indexes from the complete current dirty workspace. Their content changes must not be attributed solely to this package.

No runtime, test, fixture, held-out assessment, schema, API, prompt, model, score, Talk.Get, Context Door, relational evaluator, CTRI implementation, Theory, architecture source, governance source, Constitution, live conversation record, Memory, Learning, Knowledge source, SLM, Resource Centre, parked hypothesis, or formation-status file is modified by this package.

## Validation

Documentation validation completed:

1. `npm run knowledge` - passed; 651 documents scanned and 43 concepts found;
2. the knowledge pipeline refreshed `md_inventory.txt`, `md_headers.txt`, `hh_headers.txt`, and `knowledge_index.md` from the complete current dirty workspace;
3. generated index content is not attributed solely to this package;
4. editor diagnostics for this package - no errors found;
5. targeted diff hygiene for this package and the four generated knowledge indexes - passed.

No runtime tests were required because this is a documentation-only evidence-foundation package and no executable source was changed. Documentation validation does not prove Multi-Evidence Understanding, natural-input Understanding, Talk.Get, or live-human capability.

## Traceability

**Principle:** `constitution/02-CONSTITUTION.md`; `constitution/05-AUTHORITY-AND-STEWARDSHIP.md`; "No single evidence source understands" remains a candidate principle with no constitutional effect.
**Theory:** `docs/theory/002-THEORY-OF-KNOWLEDGE.md`; `docs/theory/003-THEORY-OF-UNDERSTANDING.md`; `docs/theory/004-THEORY-OF-JUDGEMENT.md`; `docs/theory/007-THEORY-OF-CONTEXT.md`.
**Architecture:** `docs/architecture/TRANSLATION.md`; `docs/architecture/COMPANION-INTELLIGENCE-CORE.md`; `docs/architecture/CANONICAL-REASONING-RECORD.md`; `docs/architecture/REASONING-LIFECYCLE.md`; the Multi-Evidence Understanding architecture named above.
**Engineering:** Not Applicable - no implementation, fixture, test, or runtime is created.
**Milestone:** Not Applicable - no formation or milestone completion is claimed.
**Evidence:** This frozen fixture-design and expected-evidence package; no runtime, natural-input, Talk.Get, live-human, or capability evidence is claimed.