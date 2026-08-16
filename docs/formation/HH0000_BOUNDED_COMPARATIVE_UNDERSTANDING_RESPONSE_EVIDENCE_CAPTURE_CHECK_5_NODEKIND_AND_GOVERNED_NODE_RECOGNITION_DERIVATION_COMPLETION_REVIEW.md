# HH-0000 Check 5 NodeKind and Governed-Node Recognition Derivation Completion Review

**Status:** OUTCOME 2 - FIRST EXACT AST-FORM OWNERSHIP CHOICE REMAINS UNRESOLVED
**Review date:** 2026-08-15
**Review type:** Documentation-only bounded formation review
**Governed implementation-source access:** None
**Candidate V2 effect:** None
**Terminal canonical policy closure effect:** None
**D4/D5/D6 effect:** None
**Predicate effect:** None
**Instrument access or effect:** None
**Check 5:** `UNMEASURED`
**Check 6:** `NOT RUN`
**Implementation:** `UNACCEPTED`
**Authority effect:** None

# Repository Traceability

**Principle:** Truth before certainty; evidence before claims; human Authority; smallest justified change.
**Theory:** Complete enumeration requires every visited AST node to have one deterministic governed ownership result or one exact closed non-governed reason.
**Architecture:** One complete TypeScript AST traversal, contiguous preorder NodeLedger accounting, closed governed records, closed NodeKinds, and fail-closed unresolved syntax.
**Engineering:** Closed-vocabulary inventory, governed-statement inventory, precedence-table construction attempt, overlap test, omission test, and positive/negative falsifiers.
**Milestone:** Not Applicable.
**Evidence:** This documentation-only derivation review. It produces no implementation, instrument, Check 5, Check 6, freeze, or acceptance Evidence.

## 1. Sole Question and Decision

> Given a complete TypeScript AST traversal and structural context, do the existing governed records determine one total precedence rule that maps every visited node to governed record/NodeKind ownership or one exact closed non-governed reason?

**No. Outcome 2 is selected.**

The first unresolved choice is exact and local:

> When a `PropertyAccessExpression` is the `expression` child of a `CallExpression`, does that child independently emit `NodeKind=PROPERTY_READ` and `RecordKind=EXECUTABLE_PROPERTY_ACCESS`, or is its property-access meaning emitted only by the owning `CallExpression` as `NodeKind=CALL` and `RecordKind=CALL_EXPRESSION`?

The existing documentation identifies calls and executable property accesses as governed, supplies both record schemas, and requires complete ledger accounting. It does not decide this parent/child ownership case. The AST and parent context can distinguish the cases, so no structural insufficiency or new enum is proven. One exact ownership choice remains absent; this review therefore stops at Outcome 2 and does not invent it.

## 2. Strict Boundary

This review used only existing Check 5 formation documentation and its closed vocabularies. It did not:

1. inspect, open, read, hash, parse, or otherwise access either governed implementation source;
2. inspect, construct, modify, validate, or execute an instrument;
3. reopen, edit, reinterpret, or replace Candidate V2 or terminal canonical policy closure;
4. reopen or alter D4, D5, D6, any predicate, or any predicate value;
5. alter an existing formation, policy, evidence, or closure record;
6. run Check 5, Check 6, implementation inspection, tests, typecheck, ESLint, or acceptance work;
7. create a new enum or extend an existing enum.

Exactly this review record is created.

## 3. Closed Vocabulary Inventory

### 3.1 Existing `NodeKind`

```text
CALL
DEPENDENCY
IMPORT
LITERAL
NEW
PROPERTY_READ
PROPERTY_WRITE
PUBLIC_DECLARATION
PUBLIC_MEMBER
```

### 3.2 Existing `RecordKind`

```text
SOURCE_IDENTITY
PARSER_DIAGNOSTIC
IMPORT_DECLARATION
IMPORTED_BINDING
EXPORT_DECLARATION
EXPORTED_NAME
CALL_EXPRESSION
NEW_EXPRESSION
EXECUTABLE_PROPERTY_ACCESS
PUBLIC_DECLARATION
PUBLIC_MEMBER
DEPENDENCY_EDGE
LITERAL_DATA
AUTHORISED_TEST_PROBE
PROHIBITED_FINDING
UNKNOWN_FINDING
```

`SOURCE_IDENTITY` and `PARSER_DIAGNOSTIC` are source/parse records rather than one of the nine D3-V2 NodeKinds. `AUTHORISED_TEST_PROBE`, `PROHIBITED_FINDING`, and `UNKNOWN_FINDING` are scenario/classification/failure records that refer to governed subjects; they do not add a NodeKind. `IMPORT_DECLARATION`, `IMPORTED_BINDING`, `EXPORT_DECLARATION`, and `EXPORTED_NAME` can contribute import or public/dependency facts, but the existing documentation does not provide a total one-to-one RecordKind-to-NodeKind table.

### 3.3 Existing NodeLedger non-governed reasons

```text
NONE
STRUCTURAL_CONTAINER
TOKEN_OR_TRIVIA_EXCLUDED
TYPE_NODE_RECORDED_BY_OWNER
DECLARATION_INTERNAL_RECORDED_BY_OWNER
```

The ledger schema permits records with `NONE`. It also permits records with `STRUCTURAL_CONTAINER` only when every record on that ledger entry refers to that container. No other non-`NONE` reason may coexist with records.

No vocabulary is added by this review.

## 4. Existing Governed Derivation Statements

The formation chain settles the following observations:

1. Node IDs are contiguous preorder integers beginning at zero.
2. Every node entered by the TypeScript traversal has exactly one NodeLedger entry with parent, `SyntaxKind`, and observed child count.
3. Parent IDs and child counts reconstruct one tree; skipped or duplicate IDs fail.
4. Every governed import, binding, export, exported name, call, new expression, executable property access, public declaration, public member, dependency edge, literal/data fact, probe, prohibited finding, and unknown finding has exactly one record.
5. A ledger node can own multiple record IDs where the governing model calls for multiple records.
6. Unsupported syntax fails. Unsupported public type syntax specifically produces `TYPE_NORMALIZATION_UNKNOWN` with no substitute type representation.
7. Import form derives from AST form, exact role-specific import-tuple equality, and binding identity equality.
8. Public name capability derives from normalized public identifier tokens; public type capability derives from complete traversal of the closed `NormalizedType`.
9. Literal identity and labels derive structurally without retaining prohibited raw content.
10. The documented compiler API surface includes recognition functions for import declarations, export declarations, call expressions, new expressions, and property-access expressions, but the API-availability record explicitly called none of them and establishes no ownership rule.

These statements close traversal accounting, destination schemas, and several fact derivations. They do not close the recognition precedence between a call node and its property-access callee child.

## 5. Required Recognition Distinctions

The following concepts are not interchangeable:

| Concept | Exact meaning in this review |
| --- | --- |
| AST node recognition | Decide from `SyntaxKind` plus parent/child role and structural context which rule row applies |
| Record emission | Create the exact governed `RecordKind` attached to its owning ledger node |
| Record ownership | Identify the one AST ledger node whose `nodeId` appears in the record; ancillary records may share that owner when explicitly derived from the same subject |
| Structural-container traversal | Visit a node needed to reconstruct or descend the AST even when that node has no independently governed semantic fact |
| Token/trivia exclusion | Account for a token or trivia node entered by the traversal without treating it as a governed semantic fact |
| Type-node ownership | Normalize a declaration/member type at its declaration/member owner; visited constituent type nodes do not independently duplicate that type fact |
| Declaration-internal ownership | Account for names, modifiers, parameters, and other declaration constituents whose governed meaning is emitted by the declaration/member owner |
| UNKNOWN/failure | Preserve the recognized governed subject with closed `UNKNOWN` facts where available, emit `UNKNOWN_FINDING` against that subject, and fail with the applicable closed failure code; unsupported public type syntax uses `TYPE_NORMALIZATION_UNKNOWN` |

An unresolved policy choice is not an observed `UNKNOWN`. `UNKNOWN` is a closed value for a structurally applicable observation that cannot be resolved after the recognition/ownership rule has already selected its governed subject.

## 6. Precedence-Ordered Recognition Table Construction Attempt

The table is ordered so that a visited node is tested from the first row downward. `Settled` means the existing documentation supplies enough identity and ownership information. `Blocked` marks the first exact missing choice. Rows after the blocked row are not asserted as completed derivation.

| Priority | TypeScript AST form / structural condition | Governed emission | Exact NodeKind / RecordKind | Owner | Non-governed reason otherwise | Child traversal | Unresolved/failure treatment | State |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Source root and any structural list/container entered by traversal, where no more specific governed row applies | No independent D3-V2 fact; a source-owned `SOURCE_IDENTITY` record may refer to the source container under the existing container exception | No NodeKind / `SOURCE_IDENTITY` when applicable | Source/container node | `STRUCTURAL_CONTAINER` | Continue | Broken tree, skipped/duplicate node, or unsupported structural syntax fails `NODE_LEDGER_INCOMPLETE` or the applicable closed failure | Settled for accounting |
| 2 | Token or trivia node entered by the traversal model and not consumed as an independently governed literal | No | No NodeKind / no record | Owning semantic parent retains any derived meaning | `TOKEN_OR_TRIVIA_EXCLUDED` | Continue if the traversal reports children | If the token is required to resolve a governed owner and cannot be resolved, fail against the owner rather than promoting the token to a NodeKind | Settled for accounting |
| 3 | Type node below a recognized public declaration or public member | No independent type record; contributes to the owner's `normalizedType` | Owner has `PUBLIC_DECLARATION` or `PUBLIC_MEMBER`; child has no NodeKind/record | Recognized declaration/member | `TYPE_NODE_RECORDED_BY_OWNER` | Continue through the complete type subtree | Unsupported type syntax emits no substitute representation and fails `TYPE_NORMALIZATION_UNKNOWN` at the owner | Settled |
| 4 | Name, modifier, parameter, type parameter, question/exclamation token, or other declaration constituent whose complete governed meaning is carried by a recognized declaration/member record | No independent duplicate of the owner record | Owner has `PUBLIC_DECLARATION` or `PUBLIC_MEMBER`; child has no NodeKind/record unless a later independently governed expression row applies | Recognized declaration/member | `DECLARATION_INTERNAL_RECORDED_BY_OWNER` | Continue so independently governed initializers, bodies, decorators, and expressions are not hidden | Unresolved owner normalization fails against the owner; a governed executable child remains independently classifiable | Settled only for declared owner-carried constituents |
| 5 | `CallExpression` | Yes | `CALL` / `CALL_EXPRESSION`; ancillary `DEPENDENCY_EDGE` and finding records may share the call owner when their documented derivation applies | The `CallExpression` ledger node | `NONE` | Continue through callee, type arguments, and arguments | Unresolved callee/root/operation/provenance uses closed `UNKNOWN` values and `UNKNOWN_FINDING`; terminal zero/multiple match fails closed | Settled for the call node itself |
| 6 | `PropertyAccessExpression` or equivalent property-access form used as `CallExpression.expression` | **Unresolved**: either emit an independent executable read or let the owning call exclusively represent callee access | **Unresolved** between `PROPERTY_READ` / `EXECUTABLE_PROPERTY_ACCESS` and no independent child emission | **Unresolved** between child and owning `CallExpression` | **Unresolved**: none of the existing records states whether this is independently governed; no exact non-governed reason is selected | Must continue | Must fail rather than silently choose, omit, or double count | **Blocked - first missing choice** |

### 6.1 Falsifiers for settled rule classes before the stop

| Material rule class | Positive | Otherwise-identical negative | Required distinction |
| --- | --- | --- | --- |
| Structural container | A source/list/container node has no independently governed semantic fact | The same structural position is a recognized `CallExpression` | Only the positive receives `STRUCTURAL_CONTAINER`; the negative proceeds to the call row |
| Token or trivia | A punctuation/keyword/trivia node is entered only for traversal accounting | The same text is represented by a governed string literal AST node | Only the positive receives `TOKEN_OR_TRIVIA_EXCLUDED`; the negative must reach literal recognition when that later row is settled |
| Owner-recorded type node | A keyword/named/array/function/object/union type node is below a recognized public declaration/member | The same type-shaped syntax occurs outside a recognized public declaration/member owner | Only the positive receives `TYPE_NODE_RECORDED_BY_OWNER`; the negative cannot borrow an absent owner and must continue or fail |
| Declaration internal | A declaration name/modifier/parameter contributes only to its recognized declaration/member record | The same child position contains an initializer `CallExpression` | Only the positive receives `DECLARATION_INTERNAL_RECORDED_BY_OWNER`; the executable child remains independently governed |
| Call expression | A `CallExpression` has a statically resolved governed callee | The otherwise identical `CallExpression` has unresolved callee identity | Both emit `CALL` / `CALL_EXPRESSION`; only the negative carries closed `UNKNOWN` facts and `UNKNOWN_FINDING` and fails closed |

These falsifiers test recognition and ownership only. They do not choose a terminal predicate value or reconsider D4, D5, or D6.

### 6.2 Rows not reached after the first missing choice

This Outcome 2 review does not settle later precedence rows for:

1. `NewExpression` and constructor-expression child ownership;
2. standalone and nested executable property reads;
3. assignment, compound-assignment, increment/decrement, destructuring, and other executable property-write contexts;
4. import declarations, clauses, specifiers, module literals, imported bindings, and import dependency edges;
5. export declarations, export specifiers, exported names, and declarations relevant to the public API;
6. public interface/type/function declarations and overload/implementation ownership;
7. public property, method, call, construct, getter, setter, and index members;
8. string, number, boolean, null, template, and other governed literal ownership;
9. dependency edges for import, call, new, read, write, and type reference;
10. unsupported or unresolved governed-looking syntax outside the already settled public-type failure.

Listing these required rows is an omission inventory, not a derivation decision.

## 7. First Missing Choice Falsifiers

### 7.1 Positive case for an independent property read

```ts
const selected = subject.member;
```

The `PropertyAccessExpression` is the value-producing right-hand side. The closed model has `NodeKind=PROPERTY_READ`, `RecordKind=EXECUTABLE_PROPERTY_ACCESS`, `OperationKind=READ`, and `FlowLabel=PROPERTY_READ_RESULT` for this materially distinct class.

### 7.2 Otherwise-identical call-callee case

```ts
subject.member();
```

The child remains a `PropertyAccessExpression` with the same receiver/member shape, but its parent role is `CallExpression.expression`. The parent is independently governed as `NodeKind=CALL` and `RecordKind=CALL_EXPRESSION`.

The existing structure distinguishes these cases by parent and child role. What is absent is the policy choice for the second case:

1. emit both the parent call and child property-read records;
2. emit only the call record and account for the child as parent-owned meaning; or
3. assign another already-closed ownership treatment.

No existing formation statement selects one. Treating both cases as property reads may double-count one executable operation and create an additional terminal-classification obligation. Treating neither as a property read omits the first case. Treating the call-callee child as parent-owned requires an exact existing non-governed reason to be selected, but the chain does not select one.

### 7.3 Outcome test

This is not an Outcome 3 indistinguishable pair. Parent structural context distinguishes the two AST cases. The missing information is an exact ownership rule, not a missing observable dimension. Therefore no new NodeKind, RecordKind, or NodeLedger reason is justified by this review.

## 8. Overlap Test

The call-callee case can currently satisfy two plausible emission interpretations:

1. the `CallExpression` emits `CALL_EXPRESSION`; and
2. its property-access child emits `EXECUTABLE_PROPERTY_ACCESS`.

The existing ledger permits multiple record IDs on one ledger node only where records are explicitly owned there. It does not by itself decide that records on two parent/child nodes represent two governed executable facts rather than one operation represented twice. No governing statement says the call record absorbs the child read, and no governing statement says both independently classify.

**Overlap result:** `NOT CLOSED` at the first missing ownership choice.

## 9. Omission Test

If only the call record is emitted, the property-access child still requires one exact NodeLedger result. The existing reasons are insufficiently selected by the documentation:

1. it is not a token or trivia node;
2. it is not a type node;
3. it is not a declaration internal;
4. calling it a structural container is possible as a schema value but is not an existing governed derivation rule;
5. assigning `NONE` without a record violates the ledger's record-or-reason accounting rule.

If the child independently emits a property-read record, omission is avoided but overlap semantics remain undecided.

**Omission result:** `NOT CLOSED` at the same first missing ownership choice.

## 10. NodeLedger Recomputability Decision

NodeLedger traversal shape can be recomputed: preorder IDs, parent IDs, child counts, and the one-tree invariant are closed.

NodeLedger governed ownership cannot yet be recomputed without implementation-specific judgement. An implementation author would have to choose whether a property-access callee independently emits, which record IDs belong to the child, and which non-governed reason applies if it does not. Either choice would add policy not found in the governed documentation.

Therefore:

```text
NODE_LEDGER_TRAVERSAL_ACCOUNTING=RECOMPUTABLE
NODEKIND_RECOGNITION=PARTIAL
GOVERNED_RECORD_OWNERSHIP=PARTIAL
OVERLAP_TEST=NOT_CLOSED
OMISSION_TEST=NOT_CLOSED
NODE_LEDGER_COMPLETE_RECOMPUTATION=NOT_AVAILABLE
```

## 11. Outcome Decision

### Outcome 1 - total derivation settled

Not selected. The first call/property-access ownership choice is absent, so later NodeKind rows cannot be precedence-ordered without implementation-specific judgement. No downstream partial derivation dimension is reopened or reconsidered.

### Outcome 2 - exact AST-form/ownership choice unresolved

**Selected.** The first exact missing choice is:

```text
PROPERTY_ACCESS_CALLEE_OWNERSHIP =
  INDEPENDENT_PROPERTY_READ_RECORD
  OR
  CALL_PARENT_OWNS_ACCESS_WITH_EXACT_EXISTING_NON_GOVERNED_REASON
```

This notation records the unresolved alternatives only. It is not a new enum, schema, policy value, or candidate field.

The smallest future governed question is whether property access in the callee position is an independent executable read or parent-owned call structure and, if parent-owned, which existing NodeLedger non-governed reason applies. This review neither answers nor authorises that question.

### Outcome 3 - structural insufficiency

Not selected. The positive/negative pair is distinguishable using existing AST parent/child context. No minimum missing structural dimension is proven.

## 12. Authority and Stop

```text
predicate Authority=NONE
candidate Authority=NONE
instrument Authority=NONE
implementation-inspection Authority=NONE
Check 5 Authority=NONE
Check 6 Authority=NONE
freeze Authority=NONE
acceptance Authority=NONE
```

No Authority is granted or implied to inspect governed implementation source; inspect, construct, modify, validate, or execute an instrument; reopen Candidate V2, terminal canonical policy closure, D4, D5, D6, or predicates; run Check 5 or Check 6; freeze policy; inspect or accept implementation; or begin a downstream derivation review.

This one-record review stops here.