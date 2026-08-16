# HH-0000 Multi-Evidence Understanding C18 Claim-Bearing Boundary and Consequence Review

**Status:** CLAIM-BEARING BOUNDARY REQUIRES NARROWING

**Review date:** 2026-08-12

**Review type:** Documentation-only consequence and claim-bearing-boundary review

**Immediate basis:** `docs/formation/HH0000_MULTI_EVIDENCE_UNDERSTANDING_CURRENT_UNDERSTANDING_AND_C18_AUTHORITY_RECONSIDERATION.md`

**Implementation effect:** None - no production implementation or test was modified

**Execution effect:** None - Case 001, the governed campaign, real semantic fixtures, Gate 4, governed publication, historical V3 semantic evidence, and Attempt 1 were not executed, inspected, revived, reused, or reinterpreted

**Acceptance effect:** None - no implementation acceptance or execution readiness is granted

**Authority effect:** None - no correction, execution, preservation, inspection, publication, deployment, or capability authority is granted

# Repository Traceability

**Principle:** Humanity, truth before certainty, evidence before claims, understanding before action, stewardship, and human authority from `constitution/02-CONSTITUTION.md`, `constitution/04-ENGINEERING-OATH.md`, and `constitution/05-AUTHORITY-AND-STEWARDSHIP.md`.

**Theory:** `docs/theory/003-THEORY-OF-UNDERSTANDING.md`; `docs/theory/004-THEORY-OF-JUDGEMENT.md`; `docs/theory/005-THEORY-OF-LEARNING.md`; `docs/theory/007-THEORY-OF-CONTEXT.md`; `docs/theory/008-THEORY-OF-TRUST.md`; `docs/theory/THEORY-GOVERNANCE.md`.

**Architecture:** Accepted Multi-Evidence Understanding architecture; Case 001 coordination architecture; C18 evaluator-evidence design; C20/C21 separation; C22 opaque coordination; C23 transport; C24 integrity; Understanding Lifecycle; Context Door current/superseded Understanding governance.

**Engineering:** Current source call graph, public types, focused synthetic construction paths, C18 campaign-boundary acceptance evidence, and preservation implementation evidence.

**Milestone:** Not Applicable - no milestone claim is made.

**Candidate:** Not Applicable - candidate behavior and meaning were not changed or inspected.

**Evidence Type:** Documentation and source inspection only. No governed execution evidence was produced.

## 1. Governing Question

> For C18's limited consequence of producing reviewable evaluator evidence and an opaque condition status without truth or Action Authority, which exact campaign transition is genuinely claim-bearing, and what minimum owner provenance and fail-closed mechanical integrity must that transition establish so Current Understanding can be used responsibly now while remaining open to future challenge?

This review identifies where the governed claim is made and what that limited claim needs. It does not ask how to make the current implementation pass.

## 2. Review Boundary and Method

This review:

1. treated the immediate-basis reconsideration record as controlling for this task;
2. cross-checked its working theory against the current Theory Library and downstream architecture without modifying canonical Theory;
3. traced the source call graph from C18 record construction through cycle evidence, campaign coordination, opaque status, package freezing, and C23/C24 preservation;
4. traced all source usages of `coordinateCase001CampaignMechanically`;
5. distinguished source behavior from governing Authority;
6. classified each relevant surface by actual role rather than export, naming, type shape, test use, or object compatibility;
7. reconsidered both latest counterexamples against the limited authorised consequence;
8. performed independent MARC and Cyril assessments;
9. did not execute code, tests, fixtures, campaigns, Gate 4, preservation, or historical evidence review.

## 3. Authority and Theory Trace

### 3.1 Current Theory position

The current Theory Library establishes that:

1. Understanding interprets Knowledge within Context and recognises uncertainty;
2. the same Knowledge in different Contexts may produce different Understanding;
3. complete certainty is not evidence of complete Understanding;
4. Context governs Perspective, relevance, interpretation, meaning, and ambiguity without changing truth;
5. Judgement evaluates Understanding, uncertainty, Context, consequence, responsibility, boundaries, and Authority;
6. Learning uses reflection on experience and Judgement to improve future capability;
7. Theory remains challengeable and may be refined through cross-validation.

Downstream architecture and governance further establish that:

1. Understanding is never finished and may be confirmed or updated;
2. formed Multi-Evidence Understanding is sufficient for handoff to Judgement but does not mean certain, correct forever, or authorised for Action;
3. Current Understanding remains linked to prior and superseded Understanding through append-only correction provenance;
4. materially relevant Perspectives, preserved disagreement and uncertainty, sufficiency for the decision class, and a known Authority boundary can support finite closure without consensus.

The working propositions for this review are therefore supported as current interpretive conclusions, not automatically ratified additions to canonical Theory:

> Understanding is stable enough to use and flexible enough to grow.

> Current Understanding is a Context-scoped, evidence-linked, Perspective-aware interpretation sufficiently justified for the consequence presently proposed.

> Understanding remains open to relevant challenge, while Judgement and engineering tasks may reach a finite stopping point.

> Required justification is proportionate to consequence.

> Foresight protects tomorrow; Understanding serves today; Judgement determines what may responsibly be done now.

### 3.2 C18 and campaign authority

The accepted C18 design establishes that:

1. C18 owns an attributable evaluator finding about one comparison;
2. the held-out criterion is comparison Evidence, not truth Authority;
3. the C18 disposition is an evaluator finding, not truth Authority;
4. C18 cannot repair candidate or held-out meaning, feed future execution, or select correction, response, Authority, or Action;
5. C20 owns contemporaneous mechanical invocation and ordering facts;
6. C21 owns contamination assessment over the sealed C20 record;
7. package assembly owns mechanical inclusion, identity correspondence, completeness, and campaign completion;
8. C22 may route only opaque mechanical state;
9. C23/C24 preserve exact package bytes and prove survival, not semantic correctness.

Case 001 execution Authority consistently names `runCase001Campaign` as the sole governed production entry. It does not name direct invocation of `coordinateCase001CampaignMechanically` as governed execution.

Gate 4 V3 further requires, for one separately authorised attempt:

1. an attempt identity and authoritative repository-relative destination fixed before invocation;
2. at most one invocation of `runCase001Campaign`;
3. one-way handoff of its immutable package to the accepted preservation path;
4. exact-byte verification, receipt verification, and final C24 chronology seal before evidence is reviewable;
5. separate later Authority before semantic inspection.

That historical Authority is not revived or consumed by this review. Its wording is used only to identify the governed transition.

## 4. Complete Boundary and Call-Path Map

### 4.1 C18 comparison formation

```text
C12 immutable candidate capture
  + C16 verified held-out identity
  + C20 C18 invocation identity
  -> evaluateHeldOutAssessment
  -> finalizeC18ComparisonRecord
  -> SemanticEvaluationResult
     - evaluatorConditionStatus
     - C18 comparison record outcomes
```

`finalizeC18ComparisonRecord` creates one of:

1. a sealed finalized comparison record;
2. a sealed limited `NOT_EVALUATED` or `COMPARISON_INSUFFICIENT` record;
3. a visibly incomplete record preserving only established facts.

This transition authors a C18 evaluator finding. It does not author campaign completion.

### 4.2 Cycle package formation

```text
runCase001Experiment
  -> coordinateCase001Mechanically
  -> C18 evaluation
  -> C20 sealed access record
  -> C21 contamination assessment
  -> associateEvaluatorEvidence
  -> Case001ExperimentEvidence
```

`coordinateCase001Mechanically` can produce cycle mechanical `COMPLETED` or `STOPPED`.

`runCase001Experiment` converts a mechanically completed cycle to cycle-local `STOPPED` at `associateEvaluatorEvidence` if C18/C20/C21 association cannot be established from the owner-produced values it holds.

The cycle package carries:

1. cycle identity;
2. cycle mechanical state;
3. immutable capture;
4. C18 semantic evaluation and opaque evaluator-condition state;
5. sealed C20 access record;
6. C21 contamination assessment;
7. identity-only evaluator evidence associations.

This is attributable cycle evidence. It does not author campaign completion or preservation success.

### 4.3 Campaign package formation

```text
runCase001Campaign(gate)
  -> derive gateAccepted boolean
  -> coordinateCase001CampaignMechanically(
       gateAccepted,
       owner dependencies,
       campaign C20 recorder)
     -> run MEU-I-14 through runCase001Experiment
     -> run MEU-I-15 through runCase001Experiment
     -> run MEU-CASE-001 through runCase001Experiment
     -> check cycle mechanical completion, capture, and associations
     -> evaluateCapturedCycleControls
     -> seal campaign C20 record
     -> create campaign C21 assessment
     -> freeze Case001CampaignEvidence
```

`coordinateCase001CampaignMechanically` is the function that mechanically writes campaign `COMPLETED` or `STOPPED` into the returned frozen package.

It can return `STOPPED` at:

1. `Gate4`;
2. `MEU-I-14`;
3. `MEU-I-15`;
4. `MEU-CASE-001`;
5. `cross-cycle-evaluation`.

It can return `COMPLETED` only after three supplied cycle outcomes pass its current structural checks and cross-cycle evaluation returns opaque `PASS`.

### 4.4 Synthetic construction path

```text
focused synthetic/non-execution test
  -> caller-supplied Case001CampaignDependencies
  -> coordinateCase001CampaignMechanically
  -> frozen Case001CampaignEvidence
```

The same exported coordinator, dependency interface, outcome interface, package type, and status vocabulary are used by:

1. the sole production caller, `runCase001Campaign`;
2. focused tests with synthetic owner-function outputs;
3. adversarial probes with caller-built plain objects.

No source or Authority marker distinguishes the standalone returned package as synthetic, non-authoritative, or governed.

### 4.5 Opaque post-package preservation and review path

```text
already-produced frozen Case001CampaignEvidence
  + fixed attempt identity
  + fixed authority-relative path
  -> preserveCase001CampaignPackage
  -> preserveCase001Evidence
  -> canonical whole-package bytes
  -> C23 publication and independent re-read
  -> C24 exact-byte/hash verification
  -> receipt publication and verification
  -> final preservation chronology seal
  -> PRESERVATION_VERIFIED | PRESERVATION_INCOMPLETE
```

`preserveCase001CampaignPackage` returns only opaque preservation status. It does not inspect campaign status, C18 disposition, evaluator-condition status, C20/C21 meaning, or owner origin.

`PRESERVATION_VERIFIED` means the exact supplied frozen package is authoritatively preserved and reviewable under the separately supplied attempt and Authority identities. It does not independently establish that the supplied object came from `runCase001Campaign`.

### 4.6 Later human review transition

A human may reasonably rely on the package as governed campaign Evidence only after the complete conjunction:

```text
separately authorised attempt and destination
  -> one authorised runCase001Campaign invocation
  -> frozen campaign package return
  -> one-way handoff of that exact return value
  -> PRESERVATION_VERIFIED and verified receipt
  -> separately authorised evidence review
```

The package first contains a campaign completion claim when the coordinator freezes it. The claim first acquires governed production provenance through `runCase001Campaign` under an accepted gate. It first becomes durable and reviewable after exact-byte verified preservation. These are distinct transitions and must not be collapsed.

## 5. Classification of Relevant Surfaces

| Surface | Produces or carries | Classification | Basis |
| --- | --- | --- | --- |
| `finalizeC18ComparisonRecord` | Attributable C18 outcome and opaque evaluator-condition status | Non-claim-bearing structural constructor | It validates and freezes one record from supplied input; direct construction does not establish governed campaign occurrence |
| `evaluateHeldOutAssessment` within `runCase001Experiment` | Evaluator finding, comparison records, opaque condition status | Authoritative claim-bearing production boundary | It is the accepted C18 semantic owner in the actual cycle path; its claim is limited to the evaluator finding |
| Direct synthetic use of `evaluateHeldOutAssessment` | Structurally valid synthetic evaluator output | Synthetic/non-execution test seam | Test use exercises owner logic but does not establish governed execution |
| `coordinateCase001Mechanically` | Cycle `COMPLETED` or `STOPPED` | Internal mechanical helper | It sequences opaque cycle steps and does not create the complete cycle or campaign Evidence claim by itself |
| `runCase001Experiment` | Attributable cycle package | Internal mechanical helper | It is the owner adapter used by the governed campaign path; it is not the governed public campaign entry |
| `associateEvaluatorEvidence` | Identity-only C18/C20/C21 associations | Internal mechanical helper | It derives correspondence from values held in one cycle and cannot grant campaign or semantic Authority |
| `coordinateCase001CampaignMechanically` | Frozen campaign package with `COMPLETED` or `STOPPED` | Shared surface with ambiguous authority | It authors package status for the production path and synthetic callers, while Authority names only `runCase001Campaign` as governed entry |
| `Case001CampaignDependencies` / `CampaignCycleOutcome` | Caller-supplied cycle and cross-cycle inputs | Synthetic/non-execution test seam | Their demonstrated direct purpose is deterministic synthetic coordination testing; no Authority makes caller implementations production evidence owners |
| `hasTotalOwnerEstablishedAssociations` | Same-package correspondence decision | Internal mechanical helper | It proves internal correspondence among supplied package values, not external owner origin |
| `runCase001Campaign` | Authority-gated frozen campaign package | Authoritative claim-bearing production boundary | It is explicitly named as the sole governed production entry and binds fixed owner dependencies |
| `Case001CampaignEvidence` type | Structural representation of campaign Evidence | Non-claim-bearing structural constructor | Type compatibility alone grants no provenance or Authority |
| `freezeCampaignEvidence` | Deep immutability of supplied package value | Internal mechanical helper | Immutability protects value after construction but does not prove origin |
| `preserveCase001CampaignPackage` | Opaque preservation status for one supplied package | Authoritative claim-bearing production boundary | Within a separately authorised attempt it owns only the claim that the exact supplied package was or was not preserved; it does not own campaign origin or semantics |
| `preserveCase001Evidence` / C23/C24 | Canonical bytes, exact-byte verification, receipt, sealed chronology | Authoritative claim-bearing production boundary | It owns preservation and reviewability claims only |
| Direct synthetic preservation call | Preservation behavior over a synthetic package | Synthetic/non-execution test seam | It demonstrates preservation mechanics without establishing governed campaign output |
| Verified package plus receipt under later inspection Authority | Durable Evidence available to a reviewer | Authoritative claim-bearing production boundary | This is where a person may reasonably treat exact bytes as the governed attempt output, subject to package provenance and separate inspection Authority |

The classification is role-specific. A function used inside production does not make every direct invocation authoritative. A shared return type does not erase the provenance difference.

## 6. Resolution of `coordinateCase001CampaignMechanically`

`coordinateCase001CampaignMechanically` is currently an **unsafe mixture of production package author and synthetic/non-execution test seam**.

Direct observations are:

1. it is the function that assigns campaign `COMPLETED` or `STOPPED` and freezes `Case001CampaignEvidence`;
2. `runCase001Campaign` is its only production source caller;
3. focused tests call it directly through caller-supplied dependencies;
4. its dependencies can return plain structurally compatible cycle objects;
5. it does not receive an attempt identity, Authority record identity, gate record, or production-origin token;
6. its gate input is only a boolean;
7. it re-derives C18/C20/C21 associations from the same caller-supplied cycle package;
8. no current Authority says that a direct standalone invocation is governed production;
9. no current source distinction labels its direct output synthetic or non-authoritative.

Therefore:

1. it is not the sole authoritative governed campaign producer;
2. it is not merely an internal helper because it is exported and directly used as a complete package constructor;
3. it is not merely a synthetic coordinator because it authors the package returned by the governed production entry;
4. it is not evidence of owner origin merely because its output is frozen and internally consistent.

The governed production claim belongs to the transition through `runCase001Campaign` with its fixed owner dependencies. The coordinator owns the mechanics of package status inside that transition, but its standalone invocation currently has ambiguous evidential authority.

This review does not decide whether later narrowing should make it internal, classify its direct outputs as synthetic, split a structural result from a governed package, or use another existing-boundary expression. That is an Authority decision before implementation, not an invitation to invent authenticity infrastructure.

## 7. Exact Meaning of Campaign `COMPLETED`

Within the authoritative `runCase001Campaign` path, campaign `COMPLETED` means only that:

1. the accepted gate allowed campaign mechanics to begin;
2. the three required cycle identities were processed in fixed order;
3. every cycle returned opaque passing outcome status;
4. every cycle's own mechanical record was `COMPLETED`;
5. every required immutable capture existed;
6. each cycle contained attributable C18 record outcomes;
7. same-cycle C18/C20/C21 identity associations were present and total under package assembly's checks;
8. cross-cycle controls were reached and returned opaque passing mechanical status;
9. campaign C20 evidence was sealed;
10. campaign C21 assessment was produced;
11. the resulting campaign package was deeply frozen.

For a later reviewer, those meanings are reasonably claimable only when the exact returned package has also passed the accepted C23/C24 preservation path and is opened under separate review Authority.

The evaluator-condition state inside each C18 result remains one of `SATISFIED`, `NOT_SATISFIED`, `NOT_DETERMINABLE`, or `NOT_EVALUATED`. Campaign assembly carries it unchanged and does not interpret it.

### 7.1 What `COMPLETED` does not mean

`COMPLETED` does not mean:

1. semantic truth is established;
2. Current Understanding is complete, permanent, or immune from challenge;
3. the candidate is correct;
4. the candidate is deficient;
5. the held-out criterion is correct or authoritative truth;
6. the evaluator is correct;
7. every evaluator condition was satisfied;
8. C21 contamination status is necessarily clear unless separately read and interpreted under Authority;
9. the package has been durably preserved;
10. preservation bytes prove owner origin;
11. a human has reviewed or accepted the package;
12. Judgement has selected a response;
13. Authority has permitted Action;
14. execution readiness exists;
15. deployment, publication, certification, capability, Memory, Learning, or Knowledge promotion is justified;
16. future Evidence or Perspective cannot change later Understanding.

Campaign `COMPLETED`, preservation `PRESERVATION_VERIFIED`, semantic evaluator condition, and later Judgement are separate claims owned by separate boundaries.

## 8. Minimum Provenance at the Claim-Bearing Boundary

The minimum is the least evidence needed to support the limited claim that the governed campaign path produced a complete, immutable, reviewable package containing attributable evaluator findings. It is not generalized authenticity.

### 8.1 C18 minimum

For each attributable comparison, C18 must preserve:

1. one unique comparison record identity and cycle identity;
2. exact candidate capture identity and exact immutable candidate reference;
3. exact held-out assessment identity, version, verified hash, and requirement reference;
4. evaluator identity and version;
5. comparison-rule identity and version;
6. selected material dimensions required by that rule;
7. attributable observation class;
8. attributable bounded inference class;
9. semantic disposition separate from evaluator-condition status;
10. disagreement status and attributable alternatives where present;
11. uncertainty status, reason, and limiting references where present;
12. C12, C16, and C20 boundary linkage;
13. finalized, limited, or visibly incomplete state without invented facts.

Package assembly need not reinterpret these semantic fields. It needs identities and finalization/completeness facts sufficient to carry the record truthfully.

### 8.2 C20 minimum

For each cycle, C20 must establish:

1. one access-record identity;
2. a sealed record with a fixed event sequence;
3. one actual event identity referenced by each C18 record;
4. membership of that event in the same sealed record;
5. event component `C18`;
6. event kind `invocation`;
7. event subject `evaluateHeldOut`;
8. chronology sufficient to preserve the accepted post-capture invocation boundary;
9. completion or stopped mechanics without retroactive reconstruction.

For campaign mechanics, C20 must separately preserve the campaign-level control transitions, dependency invocations, assessment handoff, and seal. Cycle and campaign C20 records must not be merged.

### 8.3 C21 minimum

For each cycle and the campaign, C21 must establish:

1. one finding identity;
2. existence of an assessment over the corresponding sealed C20 record;
3. same-record correspondence through the finding identity and sealed-record sequence length;
4. preservation of its own `clear` or `contaminated` finding without package reinterpretation.

Campaign assembly needs finding existence and correspondence. It does not need to decide contamination meaning or convert contamination into semantic failure.

### 8.4 Package-assembly minimum

At the governed package-authoring transition, assembly must establish:

1. exact expected cycle identity and fixed cardinality of three cycles;
2. fixed order and no skipped, duplicate, or surplus cycle;
3. cycle outcome opaque pass and cycle mechanical `COMPLETED`;
4. required immutable capture presence;
5. one attributable C18 outcome set per cycle;
6. exactly one identity-only association per attributable C18 record;
7. no missing, duplicate, partial, surplus, cross-cycle, wrong-record, or wrong-event association;
8. same-cycle C18 comparison identity, C20 record/event identity, and C21 finding identity correspondence;
9. cross-cycle evaluation reached only after total cycle completion;
10. campaign C20 seal and campaign C21 assessment existence;
11. campaign `STOPPED` with retained reached evidence when a required package fact is absent or false;
12. deep immutability before post-package handoff.

Assembly need not establish:

1. cryptographic origin of arbitrary in-memory objects;
2. impossibility of simulation;
3. a universal runtime brand or provenance service;
4. semantic truth or evaluator correctness;
5. every possible future Perspective;
6. execution readiness or Action Authority.

### 8.5 Production and preservation provenance minimum

For a person to treat the package as governed output, the surrounding transition must additionally establish:

1. the applicable Authority and accepted gate decision;
2. one fixed attempt identity and destination before invocation;
3. invocation through `runCase001Campaign`, not merely structural construction of its return type;
4. the exact package returned by that invocation passed once to preservation;
5. canonical serialization and source-byte identity;
6. C23 publication and independent re-read;
7. C24 length, hash, and exact-byte verification;
8. verified receipt linking attempt, campaign, Authority, package contract, and repository-relative paths;
9. final preservation chronology seal;
10. separate Authority before semantic review.

This surrounding provenance, rather than object shape alone, is what makes the package governably reviewable.

## 9. Reassessment of the Remaining Counterexamples

### 9.1 Self-consistent surrogate completion

**Observation:** Caller-built plain cycle packages with self-consistent C18, C20, C21, association, capture, and mechanical values can make direct `coordinateCase001CampaignMechanically` return `COMPLETED`.

**Primary classification:** **E. Authority ambiguity**.

Reasoning:

1. the coordinator is the mechanical package author inside production;
2. it is also an unrestricted synthetic dependency seam;
3. direct invocation is not named by Authority as governed execution;
4. `runCase001Campaign` binds the actual owner path and is the sole governed production entry;
5. preservation proves exact bytes, not owner origin;
6. the same package shape and status are emitted in both contexts without evidential classification.

The surrogate does not by itself create governed output merely because an exported function returned it. Therefore this review does not classify arbitrary in-memory simulation as an automatic material claim-bearing defect.

It is nevertheless not safely dismissible as only a test concern. If a direct coordinator result were admitted to an authoritative preservation path or later presented without its actual construction provenance, a person could be misled that C18, C20, C21, and the governed owner sequence actually ran. At that point it would become **A. Material claim-bearing defect**.

The current repository clearly identifies the governed production entry but does not clearly distinguish the evidential status of the shared coordinator's standalone output. That is the narrowing required by this review.

### 9.2 Absent cycle mechanical evidence

**Observation:** If caller-supplied cycle evidence has no `mechanical` value, the coordinator dereferences `outcome.evidence.mechanical.status` and throws instead of returning campaign `STOPPED` with the reached cycle evidence.

**Primary classification:** **C. Runtime-totality defect**.

Reasoning:

1. the coordinator owns the campaign status decision and accepts caller-supplied outcomes;
2. it retains attributable cycle evidence for other refused cycle conditions;
3. an exception produces neither `COMPLETED` nor attributable `STOPPED` package evidence;
4. the accepted fail-closed model requires actual reached state to remain visible rather than disappear into an exception;
5. this defect does not overstate semantic truth but can make an authorised attempt evidentially incomplete before post-package preservation.

The defect is material at any boundary that must remain total over its admitted runtime inputs. If later Authority makes the coordinator internal and proves its owner adapter supplies a total `Case001ExperimentEvidence`, the exact runtime obligation may be placed at that owner adapter instead. The need for total attributable failure remains; its implementation location is not authorised here.

## 10. Evidence, Perspective, and Current Understanding

### 10.1 What C18 produces

C18 produces **an evaluator finding that is Evidence a later governed reviewer and Judgement may use**.

C18 does not itself produce Current Understanding.

It evaluates a candidate Understanding account against a held-out criterion under one evaluator identity and one comparison rule. Its output may contribute to later Current Understanding about:

1. what the evaluator compared;
2. what it observed;
3. what bounded inference it formed;
4. whether the accepted evaluator condition was satisfied, not satisfied, indeterminate, or not evaluated;
5. what disagreement, alternatives, uncertainty, or incompleteness remained.

That later Understanding must keep the evaluator finding attributable and challengeable. It must not collapse the finding into truth, candidate correctness, held-out correctness, or Action Authority.

### 10.2 Minimum Perspective coverage inside C18

C18 itself requires only the Perspectives necessary to make its bounded evaluator finding inspectable:

1. the candidate's attributable proposition and evidence references;
2. the held-out criterion's attributable reference and permitted latitude;
3. the identified evaluator and governed comparison rule;
4. materially relevant alternatives or disagreement detected within that comparison;
5. explicit uncertainty and insufficiency where the comparison cannot decide.

This is not a requirement that C18 synthesize all human, professional, ethical, legal, organisational, technical, or Cabinet Perspectives.

### 10.3 Perspective responsibilities outside C18

Later Understanding and Judgement own questions such as:

1. whether the held-out criterion itself is justified;
2. whether another evaluator or professional Perspective is needed;
3. whether the C18 finding materially changes Current Understanding;
4. whether disagreement can remain unresolved for the proposed consequence;
5. whether MARC, Cyril, specialist, human, or Cabinet review is required;
6. whether Current Understanding is sufficient for a decision class;
7. what response, if any, is proportionate;
8. which Authority may permit it.

Making C18 carry those responsibilities would turn a bounded evaluator into multi-perspective Judgement and violate the accepted ownership chain.

### 10.4 Relationship to the wider theory chain

| Concept | Relationship to the claim-bearing package |
| --- | --- |
| Evidence | C18, C20, C21, package, and preservation records supply distinct attributable facts and findings |
| Perspective | C18 preserves its bounded evaluator standpoint and detected alternatives; later review supplies other materially relevant Perspectives |
| Context | Governs the experiment purpose, comparison rule, attempt, Authority, consequence, timeframe, and later interpretation |
| Current Understanding | May incorporate the preserved evaluator finding with other Evidence and Perspectives; is not identical to the package |
| Judgement | Decides whether the resulting Current Understanding is sufficient and what response is proportionate |
| Authority | Permits execution, inspection, correction, publication, or Action; evidence and package status do not grant it |
| Memory | May preserve continuing significance only through separately governed retention; package preservation is not Memory promotion |
| Learning | May arise only from later authorised reflection on experience and outcomes; C18/preservation do not perform Learning |

## 11. Stopping-Condition Analysis

The proposed stopping condition is consistent with current Theory and governance:

> The authorised claim is explicit, the claim-bearing boundary is explicit, the Evidence required for that claim is attributable and fail-closed, known defects cannot materially over-authorise that claim, residual uncertainty is recorded, and future challenge remains possible.

Applied to this review:

1. **Authorised claim:** A governed campaign package may claim only fixed mechanical completion and carriage of attributable C18/C20/C21 Evidence; preservation may claim only exact-byte survival and reviewability.
2. **Claim-bearing boundary:** Governed production is the `runCase001Campaign` transition with fixed owner dependencies under accepted gate Authority, followed by exact return-value handoff to C23/C24. The coordinator authors status inside this path but is not independently authoritative.
3. **Attributable Evidence:** Minimum C18/C20/C21 and package correspondence requirements are explicit in Section 8.
4. **Fail-closed integrity:** Missing required cycle/package facts must prevent `COMPLETED`; reached failure must remain attributable at the boundary that admits the input.
5. **Known defects:** The shared coordinator's authority remains mixed and missing mechanics is non-total. A later bounded Authority decision is therefore still needed before implementation acceptance.
6. **Residual uncertainty:** The exact code-surface narrowing is unresolved and intentionally not selected here.
7. **Future challenge:** C18 findings, uncertainty, package lineage, and preservation remain inspectable under separate Authority and open to later Evidence and Perspective.

The stopping condition does not require permanent truth, every possible Perspective, generalized authenticity, immunity from future Evidence, perfect prevention of arbitrary in-memory simulation, or future execution readiness.

It does require the synthetic and governed meanings of package completion not to be confused at the boundary where a human may rely on the package.

This review can therefore stop with sufficient Understanding for a later bounded Authority decision, while the current implementation remains unaccepted.

## 12. MARC Independent Finding

MARC asks:

> At which exact boundary could a human reasonably rely on the package as a governed claim, and what minimum truthfulness, attribution, uncertainty and Perspective are required there?

### MARC observation

A human could reasonably rely on exact package bytes as governed attempt Evidence only after:

1. a separately authorised attempt identified `runCase001Campaign` as the entry;
2. the returned immutable package was handed directly to the accepted preservation path;
3. C23/C24 and receipt verification completed;
4. later review Authority permitted inspection.

The human-review consequence is access to an attributable evaluator and campaign Evidence record. It is not permanent truth, candidate correctness, capability, or Action permission.

### MARC risk finding

The package can mislead a person if:

1. internally consistent synthetic values are presented without their construction provenance as actual owner-produced C18/C20/C21 Evidence;
2. `COMPLETED` is read as semantic truth or evaluator success rather than mechanical package completion;
3. preservation success is read as validation of origin or meaning;
4. missing mechanics escapes without attributable `STOPPED` Evidence;
5. the evaluator Perspective is presented as the whole Current Understanding rather than one bounded finding.

Minimum truthfulness requires exact owner-path provenance, honest `STOPPED`, limited completion language, preserved disagreement and uncertainty, and explicit separation from later Perspectives and Judgement.

Synthetic testability remains legitimate and valuable. It becomes misleading only when synthetic construction is presented as actual governed output.

**MARC independent finding:** `HUMANITY / FORMATION CLAIM PATH IDENTIFIED; SHARED PACKAGE-AUTHORING SURFACE REQUIRES AUTHORITY NARROWING BEFORE RELIABLE HUMAN PRESENTATION`.

MARC does not grant correction, acceptance, inspection, execution, publication, or Action Authority.

## 13. Cyril Independent Finding

Cyril asks:

> Which exact technical boundary owns the claim, and what minimum owner-produced Evidence must it verify without turning testability into production Authority or inventing provenance infrastructure?

### Cyril observation

The technical responsibilities divide as follows:

1. C18 owns evaluator-record content and finalization;
2. C20 owns invocation/event chronology and seal;
3. C21 owns contamination assessment;
4. cycle assembly owns same-cycle association from values actually produced in `runCase001Experiment`;
5. campaign assembly owns fixed order, totality, identity correspondence, package status, campaign C20/C21, and freezing;
6. `runCase001Campaign` owns the governed production adapter by binding the accepted gate to fixed owner dependencies;
7. C23/C24 own exact-byte preservation and receipt integrity.

`coordinateCase001CampaignMechanically` is not technically capable of proving external owner origin when every relevant value comes through injectable dependencies. Rechecking agreement among those values proves structural consistency, not provenance beyond the dependency boundary.

### Cyril minimum

No new registry, signature, brand, token, store, or authenticity service is needed to state the minimum:

1. governed production must enter through `runCase001Campaign`;
2. its fixed owner dependencies must produce cycle Evidence;
3. package assembly must check only required mechanics, identities, membership, cardinality, correspondence, and totality;
4. failure must remain attributable and total at the input-owning boundary;
5. synthetic callers must remain usable without their output silently acquiring production Authority;
6. the exact owner-produced return value, not a reconstructed equivalent, must enter preservation;
7. C23/C24 must remain blind to semantics and must not be asked to authenticate campaign origin.

**Cyril independent finding:** `DIGITAL / TECHNOLOGY / PLATFORM GOVERNED ENTRY AND MINIMUM PROVENANCE IDENTIFIED; COORDINATOR AUTHORITY REMAINS MIXED AND MUST BE NARROWED BEFORE CORRECTION IS SELECTED`.

Cyril does not prescribe how to narrow the source surface and grants no implementation Authority.

## 14. Combined Decision

**Outcome 2 - CLAIM-BEARING BOUNDARY REQUIRES NARROWING**

MARC and Cyril independently agree that:

1. C18's consequence is a bounded evaluator finding, not Current Understanding, truth, Judgement, or Action;
2. campaign `COMPLETED` is a limited mechanical package claim;
3. `runCase001Campaign` is the named governed production entry;
4. `coordinateCase001CampaignMechanically` authors package status inside production but also acts as an unrestricted synthetic constructor;
5. direct synthetic output is not governed merely because it is exported, frozen, or structurally valid;
6. C23/C24 make exact supplied bytes reviewable but do not prove package origin or semantics;
7. a later human may rely on the package only through the complete authorised run-to-preservation-to-review chain;
8. same-cycle C18/C20/C21 identity correspondence and totality remain necessary for that limited claim;
9. generalized authenticity and prevention of arbitrary simulation are unnecessary;
10. missing mechanics remains a runtime-totality defect because attributable stopped Evidence can be lost;
11. the shared coordinator's standalone evidential status remains insufficiently narrowed for implementation acceptance;
12. existing architecture can express the distinction without a new owner or component, so architecture re-entry is not indicated.

This decision narrows the Authority question. It does not narrow code, grant correction Authority, accept implementation, or revive execution.

## 15. Unresolved Questions

1. Which existing code-surface expression should distinguish the synthetic coordinator result from the governed `runCase001Campaign` package without adding authenticity infrastructure?
2. Should `coordinateCase001CampaignMechanically` remain exported as an explicitly non-claim-bearing seam, become internal, or return a structural result that only the production adapter can present as campaign Evidence?
3. At which existing boundary should missing or malformed cycle mechanics be converted into attributable campaign `STOPPED` Evidence if the coordinator's visibility changes?
4. What documentation or type-level wording is sufficient to prevent `Case001CampaignEvidence` structural compatibility from being mistaken for owner origin?
5. How should the exact return-value handoff from `runCase001Campaign` to preservation be evidenced prospectively without signatures, brands, stores, or generalized provenance?
6. Does later Authority require campaign `COMPLETED`, or may a preserved `STOPPED` package remain equally governed and reviewable as an attempt outcome?

The sixth question is strongly suggested by current preservation architecture: reviewability belongs to preserved Evidence, not only successful campaign completion. It remains listed because no implementation or future execution decision is made here.

## 16. Smallest Justified Next Question

> Without adding provenance infrastructure or changing C18 semantics, what smallest Authority clarification should distinguish direct synthetic use of `coordinateCase001CampaignMechanically` from the governed `runCase001Campaign` package path, and place attributable `STOPPED` behavior for absent mechanics at the existing boundary that admits that input?

That question is narrow enough to support a later documentation-only Authority decision. It does not pre-authorise making the coordinator private, changing a type, adding a marker, modifying tests, or implementing totality handling.

No implementation correction, implementation acceptance, execution readiness, Gate 4 use, evidence inspection, governed publication, deployment, certification, or capability follows automatically.

> **Do not authorise the consequence of knowledge that has not yet been obtained.**

C18 claim-bearing boundary and consequence review stops here.