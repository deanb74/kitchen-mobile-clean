# HH-0000 Check 5 D5 Prohibited-Predicate Completion Review

**Status:** OUTCOME 3 - D3 IS INSUFFICIENT TO ENCODE THE COMPLETE GOVERNED D5 PROHIBITED MODEL
**Review date:** 2026-08-14
**Review type:** Strictly documentation-only D5 prohibited-predicate completion review
**Controlling review:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_POST_MACHINE_SCHEMA_AND_PREDICATE_COMPLETION_CANDIDATE_POLICY_CORRECTION_AUTHORITY_REVIEW.md`
**D3 and D5 source record:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_CANONICAL_POLICY_MACHINE_SCHEMA_AND_PREDICATE_COMPLETION_REVIEW.md`
**Historical candidate:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_RESPONSE_EVIDENCE_CAPTURE_CHECK_5_CLOSED_MACHINE_ENCODABLE_MEASUREMENT_POLICY_SPECIFICATION.md`
**Historical candidate canonical byte length:** `6350`
**Historical candidate canonical SHA-256:** `ff71059e5fbad04831bf8cbc6d408b44b265d8657446a1fe8c2b0c8e8d972186`
**Historical candidate classification:** `HISTORICAL_CANDIDATE_POLICY_EVIDENCE`
**Governed implementation-source access:** None
**Candidate effect:** None - no historical or new candidate specification or canonical payload was created, edited, overwritten, corrected, relabelled, frozen, or adopted
**Instrument effect:** None - no instrument was built, inspected, modified, validated, or executed
**Check 5:** Not run; governed quantity remains `UNMEASURED`
**Check 6:** `NOT RUN`
**Implementation:** `UNACCEPTED`
**Authority effect:** No D3 amendment, candidate-authoring, source-inspection, instrument, Check 5, Check 6, freeze, or acceptance Authority granted

# Repository Traceability

**Principle:** Truth before certainty; evidence before claims; human Authority; smallest justified change.
**Theory:** A prohibited policy category is machine-decidable only when normalized facts preserve the distinction and the predicate language can select it without prose interpretation.
**Architecture:** One self-contained canonical payload, total structural classification, complete enumeration, verified transport, one-use execution, and mandatory stop.
**Engineering:** D3-schema conformance attempt, closed-enum membership test, seventeen-family representability audit, predicate-set closure test, CPD-002 test, and dependent CPD-015 test.
**Milestone:** Not Applicable.
**Evidence:** This documentation-only representability decision. No candidate payload, implementation observation, instrument, Check 5, Check 6, or acceptance Evidence is produced.

## 1. Sole Question

> Can the complete D5 prohibited-family model now be represented as a closed finite set of exact D3 predicate objects, using only already-governed D3 schema fields and closed enum values, so that every prohibited rule is machine-decidable without prose interpretation?

**No.** The current D3 predicate language cannot select several structural facts required by the governed D5 families. The failure occurs before predicate population: no valid choice of existing D3 fields and enum values can preserve every required distinction.

**Exactly one outcome is selected: Outcome 3 - D3 itself is insufficient to encode a required prohibited rule.**

No purported complete D5 predicate set is authored. Doing so would require an unresolved value, reinterpret `UNKNOWN` as a family identity, omit a governed branch, or add a fact not present in D3. Each would violate this review's constraints.

## 2. Strict Boundary

This review used only the controlling review and the documented D3/D5 governance model. It did not:

1. inspect, open, read, hash, parse, or otherwise access either governed implementation source;
2. edit any historical candidate or previous governance record;
3. create a corrected candidate specification or canonical payload;
4. build, inspect, modify, validate, or execute an instrument;
5. run Check 5, Check 6, tests, typecheck, ESLint, Git validation, implementation validation, harness work, or experiment execution;
6. perform implementation acceptance or policy freeze;
7. grant or consume candidate-authoring Authority;
8. modify or supplement D3.

Only this review record is created.

## 3. Controlling D3 Boundary

Every D3 predicate must contain exactly these fields:

```text
id
phase
sourceRoles
nodeKinds
provenanceKinds
roots
operations
argumentConstraints
destinationLabels
dataFlows
ancestryAll
ancestryNone
classification
```

All selectors must use `ANY`, `ONE_OF`, or `NONE_OF` over existing closed enum values. The existing selectable facts are limited to:

1. source role;
2. node kind;
3. broad provenance kind;
4. the closed root enum;
5. the closed D4/D6 operation-ID enum;
6. indexed argument provenance kinds and data labels;
7. destination labels;
8. flow labels;
9. ancestry relations;
10. a terminal or prohibited classification.

D3 has no predicate selector for:

1. `NormalizedProvenance.identity` or a closed prohibited provenance-family identity;
2. normalized public member name or normalized public type capability;
3. a closed prohibited operation identity outside the D4/D6 operation enum;
4. import-tuple membership, import form, alias, re-export, or dynamic-load form;
5. a relation between two arguments, such as corresponding same-directory temp-to-final rename;
6. branch existence, fallback existence, invocation cardinality, or “fails another complete predicate” as a first-class normalized fact;
7. private-IP, username, absolute-machine-path, token-path, governed-source-path, final-path, or semantic-result labels required by D5.

The D3 root enum contains only permitted/platform roots plus `UNKNOWN`. It does not contain the governed cognitive, repository-service, UI, logging, process-control, environment, or other prohibited provenance identities. The D3 operation enum is exactly the D4 and D6 IDs and does not contain the prohibited operation families named by D5.

## 4. Decisive Structural Falsifier

Consider a normalized executable fact whose statically resolved provenance is a governed cognitive provider family. D5 requires classification as `COGNITIVE_SEMANTIC_ANDY_PROVIDER`.

Under current D3:

1. `provenanceKinds` can establish only a broad kind such as `IMPORT_BINDING`;
2. `roots` cannot select the cognitive family because no such closed root value exists;
3. `operations` cannot select a cognitive operation because no such closed operation ID exists;
4. the predicate cannot select `NormalizedProvenance.identity`;
5. mapping the fact to root or operation `UNKNOWN` loses the distinction between cognitive, repository, UI, logging, process-control, environment, and every other unrepresented prohibited family.

A predicate over `UNKNOWN` can preserve generic fail-closed behavior through `UNKNOWN_EXECUTABLE_EDGE`. It cannot establish the governed family-specific prohibited finding. Creating identical `UNKNOWN` predicates for several categories would cause every unknown fact to match every such category, which is deterministic but governance-unfaithful. Assigning only one category would silently erase the others.

This one counterexample is sufficient for Outcome 3. The complete family audit below confirms that it is not isolated.

## 5. Complete D5 Family Representability Audit

| Prohibited family | Existing D3 facts that can encode part of the rule | Exact required structural fact D3 cannot encode | Complete valid D3 predicate set possible? |
| --- | --- | --- | --- |
| `PROHIBITED_IMPORT_OR_DYNAMIC_LOAD` | `nodeKinds=IMPORT`; broad provenance; `roots=UNKNOWN` | Exact role import-tuple absence; dynamic `require`; import expression; side-effect import; namespace import; alias; re-export as distinct normalized facts | **No** |
| `COGNITIVE_SEMANTIC_ANDY_PROVIDER` | Broad `IMPORT_BINDING`, `LOCAL_DECLARATION`, or `UNKNOWN`; `destinationLabels=CALLBACK` | Closed normalized identity for Andy, Provider, Memory, Learning, Reflection, Knowledge, retrieval, prompt, judgement, semantic classifier, prior state, or semantic-result destination | **No** |
| `CASE001_REPOSITORY_SERVICE_OR_EVIDENCE` | `destinationLabels=REPOSITORY` | Closed normalized identity for Case 001, repository service, repository storage, generated index, or Evidence provenance | **No** |
| `NETWORK_TELEMETRY_ANALYTICS` | `destinationLabels=NETWORK` | Closed normalized identity for network, HTTP, HTTPS, socket, net, DNS, TLS, telemetry, analytics, tracing, or remote client | **No** |
| `UI_CLIPBOARD_SHARE_DISPLAY` | Broad executable node/provenance kinds | Closed normalized identity or destination for UI, preview, clipboard, share, print, open, display, or notification | **No** |
| `LOGGING_STDOUT_STDERR` | `destinationLabels=OUTPUT`; `dataFlows=OUTPUT_CONTENT` | Closed normalized identity for console, logger, process stdout, or process stderr | **No** |
| `CONTRIBUTION_DELIVERY_TRANSFER` | Broad executable node/provenance kinds | Closed operation identity for contribution, publication, delivery, transfer, message, or permission-result operation | **No** |
| `RETRY_FEEDBACK_SECOND_TURN_ACTION` | `ancestryAll=IN_LOOP_OR_RETRY` or `IN_ASYNC_SCHEDULE` | Closed operation identity and invocation fact for retry, repeat, feedback, correction turn, queue, schedule, second capture/invocation, or Action | **No** |
| `PUBLIC_PATH_ROOT_DESCRIPTOR` | `nodeKinds=PUBLIC_MEMBER`; `dataFlows=PUBLIC_MEMBER_VALUE`; existing path-related data labels | Selector over normalized public member name/type/return capability carrying path, root, directory, filename, URL, descriptor, or handle | **No** |
| `PUBLIC_MUTATION_LIFECYCLE` | `nodeKinds=PUBLIC_MEMBER`; `destinationLabels=RETAINED_STATE`; `dataFlows=PUBLIC_MEMBER_VALUE` | Selector over normalized public member name/type/return capability carrying retained bytes, write, append, rename, remove, delete, unlink, truncate, chmod, move, cleanup, dispose, or close | **No** |
| `PUBLIC_SEMANTIC_PERMISSION_RESULT` | `nodeKinds=PUBLIC_MEMBER`; `dataFlows=PUBLIC_MEMBER_VALUE` | Selector over normalized public member name/type/return capability carrying approved, accepted, compliant, deliverable, retryable, contribution, permission, semantic, or checker result | **No** |
| `RESPONSE_TRANSFORMATION_EGRESS` | Source data labels; `JSON_CONTENT`, `ERROR_MESSAGE`, `OUTPUT_CONTENT`, `CALLBACK`, `PUBLIC_RETURN`; some D4 transformation operation IDs | Closed representation of all governed transformation identities and the exception relation “other than exact permitted hash, length, persistence, and fresh-copy paths” | **No** |
| `UNAUTHORISED_WRITE_OR_REMOVE` | D4 filesystem operation IDs; permitted and prohibited destination selectors | Closed token, repository-source, governed-source, and final-path labels; relation between rename arguments; same-directory corresponding temp-to-final validity | **No** |
| `DYNAMIC_EXECUTION_PROCESS_CONTROL` | Broad executable node/provenance kinds; `roots=UNKNOWN` | Closed normalized identity or operation for eval, Function, child process, worker threads, VM, shell, process control, or daemon | **No** |
| `ENVIRONMENT_COMPILER_FALLBACK` | Broad executable and literal facts; `roots=UNKNOWN` | Closed identity for `process.env`, `NODE_PATH`, global or alternate compiler; labels for username, private IP, absolute machine path; fallback-branch existence | **No** |
| `UNAUTHORISED_TEST_PROBE` | `sourceRoles=FOCUSED_TEST`; D6 operation IDs; ancestry, flow, and destination selectors | A normalized probe-family membership fact plus a representable complement of complete D6 record validity, including cardinality and required assertion relationships | **No** |
| `UNKNOWN_EXECUTABLE_EDGE` | `UNKNOWN` exists in provenance, root, data-label, destination, flow, and ancestry enums | `UNKNOWN` operation is required by D3 prose but is absent from the closed D4/D6 operation-ID enum; no-terminal-match is an evaluation result rather than a predicate-selectable fact | **No**, for the complete governed rule |

Every governed family has at least one unrepresentable branch. Partial predicates would not satisfy D5 exhaustiveness and would create an unearned closure claim.

## 6. Predicate-Object Authoring Result

The required complete actual predicate objects cannot be produced under the current D3 contract.

For each unrepresentable family, every possible object fails at least one mandatory condition:

1. using `UNKNOWN` substitutes generic uncertainty for the governed family identity;
2. using a family token violates the closed root or operation enum;
3. using free text violates the selector schema;
4. omitting the family-specific branch makes the D5 rule incomplete;
5. adding a selector or normalized fact modifies D3, which this review may not do;
6. encoding a relational or complement condition as prose violates machine decidability.

No invalid, placeholder-bearing, or governance-unfaithful object is presented as a completed predicate.

## 7. Documentation-Only Structural Closure Check

| Closure requirement | Result | Reason |
| --- | --- | --- |
| Every prohibited predicate validates against D3 | **NOT ACHIEVED** | A complete set cannot be instantiated with current fields and enums |
| Every enum value used exists in closed D3 enums | **NOT ACHIEVED** | Required family roots, prohibited operations, capability facts, and path/environment labels are absent |
| Every predicate ID is unique | **NOT APPLICABLE** | No complete valid predicate set exists |
| Every prohibited family has at least one predicate | **NOT ACHIEVED** | No complete valid predicate exists for any family with an unrepresentable governed branch |
| No predicate contains unresolved/meta value | **NOT ACHIEVED AS A SET** | Avoiding meta-values leaves required facts unexpressed |
| Rule ordering has no semantic effect | **PRESERVED BY D3** | All prohibited predicates would be evaluated without first-match semantics |
| Any prohibited match causes FAIL | **PRESERVED BY D3** | The existing evaluation algorithm fails on any prohibited match |
| Multiple prohibited matches remain one FAIL with multiple findings | **PRESERVED BY D3** | Existing D3 evaluation records all prohibited matches and fails |
| Zero prohibited matches proceeds to terminal classification | **PRESERVED BY D3** | Existing D3 evaluation proceeds only after zero prohibited matches |
| Unknown executable provenance remains fail-closed | **PARTIALLY PRESERVED** | Generic `UNKNOWN` facts fail closed, but the complete `UNKNOWN_EXECUTABLE_EDGE` predicate cannot select an `UNKNOWN` operation under the current closed operation enum |

The ordering and fail-first algorithm are adequate. The normalized fact vocabulary and predicate selectors are not.

## 8. Direct CPD Tests

### CPD-002

> Are the prohibited structural rules now completely machine-encodable from the D5 predicate objects alone?

**No. CPD-002 remains open.** No complete valid D5 predicate-object set exists under current D3. Family-specific prohibited facts would still require prose interpretation or an unauthorised D3 extension.

### CPD-015

> If all other previously closed policy data is combined with this D5 set, does any normative Check 5 rule still require prose interpretation?

**Yes. CPD-015 remains open only through CPD-002.** The controlling review already closed every other CPD dependency. This review does not disturb those closures. D5 family identity, operation, public-capability, relational, and complement meanings still require prose because D3 cannot represent them.

CPD-015 is not declared globally closed.

## 9. Outcome Decision

### Outcome 1 - D5 prohibited-predicate completion achieved

Not selected. Complete valid D3 predicate objects cannot be authored for all governed prohibited rules, so CPD-002 is not closed.

### Outcome 2 - D5 remains incomplete

Not selected. The problem is not merely a missing D5 record that can be authored with the current language. Required normalized structural facts are absent from D3's selectable vocabulary.

### Outcome 3 - D3 itself is insufficient to encode a required prohibited rule

**Selected.** The decisive missing structural fact is:

> A predicate-selectable, closed normalized prohibited provenance or operation identity that distinguishes the governed D5 family from every other represented and unrepresented executable family.

Additional required but unavailable structural facts are normalized public member/type capability, import form and allowlist membership, relational path/argument validity, fallback and cardinality state, probe validity complement, and an `UNKNOWN` operation value.

This review identifies those insufficiencies but does not modify D3 or choose their future representation.

## 10. Authority Boundary and Next Gate

**Candidate-authoring Authority granted:** **No.**

No Authority is granted to:

1. modify D3, D5, any historical candidate, or any previous governance record;
2. create a corrected candidate specification, payload, schema, byte length, or hash;
3. inspect either governed implementation source;
4. build, inspect, modify, validate, or execute an instrument;
5. run Check 5, Check 6, tests, typecheck, ESLint, Git validation, implementation validation, harness work, or experiment execution;
6. perform policy freeze or implementation acceptance;
7. infer candidate-authoring Authority from this Outcome 3.

Because Outcome 1 is not selected and CPD-002/CPD-015 remain open, `HH-0000 CHECK 5 FINAL CANDIDATE POLICY CORRECTION AUTHORITY REVIEW` is not available.

The smallest next governed question is a separate documentation-only D3 representational sufficiency review. It must decide whether and how the missing structural facts may be added without implementation observation. This review neither performs nor authorises that work.

## 11. Final State

```text
OUTCOME 3 - HH-0000 CHECK 5 D5 PROHIBITED-PREDICATE COMPLETION NOT ACHIEVED BECAUSE CURRENT D3 CANNOT SELECT CLOSED PROHIBITED PROVENANCE OR OPERATION FAMILY IDENTITY NORMALIZED PUBLIC MEMBER OR TYPE CAPABILITY IMPORT FORM OR ALLOWLIST MEMBERSHIP RELATIONAL PATH OR ARGUMENT VALIDITY FALLBACK OR CARDINALITY STATE PROBE VALIDITY COMPLEMENT OR UNKNOWN OPERATION - ALL SEVENTEEN D5 FAMILIES AUDITED - GENERIC UNKNOWN REMAINS FAIL-CLOSED BUT CANNOT SUBSTITUTE FOR GOVERNED FAMILY-SPECIFIC FINDINGS - NO INVALID OR PLACEHOLDER PREDICATE SET AUTHORED - CPD-002 REMAINS OPEN - CPD-015 REMAINS OPEN ONLY THROUGH CPD-002 - ALL OTHER CPD CLOSURES PRESERVED - HISTORICAL CANDIDATE 6350 CANONICAL BYTES SHA256 FF71059E5FBAD04831BF8CBC6D408B44B265D8657446A1FE8C2B0C8E8D972186 PRESERVED UNCHANGED AS HISTORICAL_CANDIDATE_POLICY_EVIDENCE - NO D3 AMENDMENT - NO CANDIDATE-AUTHORING AUTHORITY - NO GOVERNED SOURCE OBSERVATION - NO INSTRUMENT AUTHORITY - CHECK 5 UNMEASURED - CHECK 6 NOT RUN - IMPLEMENTATION UNACCEPTED - STOP
```

D5 prohibited-predicate completion review stops here.