# HH-0000 Check 5 New-Expression Constructor-Child Ownership Derivation Completion Review

**Status:** OUTCOME 1 - NEW-EXPRESSION CONSTRUCTOR-CHILD OWNERSHIP FULLY SETTLED
**Review date:** 2026-08-15
**Review type:** Documentation-only bounded formation review
**Controlling record 1:** `HH-0000 CHECK 5 NODEKIND AND GOVERNED-NODE RECOGNITION DERIVATION COMPLETION REVIEW`
**Controlling record 2:** `HH-0000 CHECK 5 PROPERTY-ACCESS CALLEE OWNERSHIP DERIVATION COMPLETION REVIEW`
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

**Principle:** One executable semantic effect has one most-specific governed owner; truth before certainty; human Authority; smallest justified change.
**Theory:** A constructor-designator child does not emit an independent executable record when its complete designator effect is owned by `NewExpression`; a genuinely executing nested expression retains its own owner.
**Architecture:** Exact TypeScript parent/child role distinguishes constructor designator structure from separately executing nested operations while complete preorder traversal preserves every node.
**Engineering:** Exact `NewExpression.expression` predicate, identifier/property/computed/separated/nested tests, duplicate-ownership test, omission test, and closed NodeLedger-reason test.
**Milestone:** Not Applicable.
**Evidence:** This documentation-only derivation decision and synthetic TypeScript AST-shape determination. No governed implementation, instrument, Check 5, Check 6, freeze, or acceptance Evidence is produced.

## 1. Sole Question and Decision

> When a `NewExpression` contains a constructor-expression child that would otherwise be recognisable, does the new-expression parent alone own construction, or must the constructor child emit an additional executable record?

**Outcome 1 is selected.**

`NewExpression` owns one constructor invocation and emits:

```text
NodeKind=NEW
RecordKind=NEW_EXPRESSION
nonGovernedReason=NONE
```

Its direct identifier, non-computed property-access, or computed property-access constructor-designator child contributes constructor provenance, root, member, and computed structure to the `NEW_EXPRESSION` record. It does not independently emit a property-read or call record. The visited direct child is ledger-accounted with:

```text
recordIds=[]
nonGovernedReason=STRUCTURAL_CONTAINER
```

This suppression does not extend to an executable descendant that genuinely executes to produce a constructor value, nor to an outer operation that executes the result of construction. Those are separate semantic effects and retain separate governed owners.

No NodeKind, RecordKind, NodeLedger reason, syntax vocabulary, D4/D5/D6 value, or predicate value is added or changed.

## 2. Strict Boundary

This review used only the two controlling records, their inherited closed schemas, and a synthetic TypeScript AST-shape determination for the examples in this review. It did not:

1. inspect, open, read, hash, parse, or otherwise access either governed implementation source;
2. inspect, construct, modify, validate, or execute an instrument;
3. reopen, edit, reinterpret, or replace Candidate V2 or terminal canonical policy closure;
4. reopen or alter D4, D5, D6, any predicate, or any predicate value;
5. alter either controlling record or any other existing record;
6. run Check 5, Check 6, implementation inspection, freeze, or acceptance work;
7. resume the NodeKind derivation review beyond the ownership choice settled here.

Exactly this review record is created.

## 3. Fixed Governing Principle

The following principle is fixed:

> One executable semantic effect has one most-specific governed owner. A child AST form does not independently emit a governed executable record when its complete executable semantic effect is owned by a more-specific governed parent operation.

This principle does not mean that every executable descendant of a parent operation is suppressed. The ownership test is exact:

1. identify each operation that actually executes;
2. identify the most-specific AST node that owns each operation;
3. suppress only a child whose complete effect is incorporated into that owner's governed record;
4. retain a child or enclosing node that represents a second operation which genuinely executes.

The call-callee result is therefore not copied by analogy. Constructor forms are tested against the fields and AST roles of `NewExpression` itself.

## 4. Inherited Closed Structure

The decision uses only these existing meanings:

1. `NodeKind` contains `NEW`, `CALL`, and `PROPERTY_READ`.
2. `RecordKind` contains `NEW_EXPRESSION`, `CALL_EXPRESSION`, and `EXECUTABLE_PROPERTY_ACCESS`.
3. `NEW_EXPRESSION` already owns normalized constructor provenance, normalized operation, arguments, destinations, flows, and terminal class.
4. `EXECUTABLE_PROPERTY_ACCESS.computed:boolean` already represents non-computed and computed property forms without separate syntax vocabulary.
5. Every visited AST node receives one NodeLedger entry and traversal continues through parent-owned children.
6. `STRUCTURAL_CONTAINER` functionally means a traversed AST constituent necessary to construct or descend an owning governed operation but having no independently governed semantic fact.
7. `NONE` applies to a node that owns governed records.
8. Every independently emitted executable record adds prohibited and terminal-classification obligations.

## 5. Actual TypeScript AST Shapes

The required forms have these expression-node relationships:

| Source form | Top expression | Relevant `.expression` child | Consequence |
| --- | --- | --- | --- |
| `new Widget()` | `NewExpression` | `Identifier` `Widget` | One construction; identifier is constructor designator structure |
| `new namespace.Widget()` | `NewExpression` | `PropertyAccessExpression` `namespace.Widget` | One construction; property access is direct constructor designator structure |
| `new namespace[key]()` | `NewExpression` | `ElementAccessExpression` `namespace[key]` | One construction; computed access is direct constructor designator structure |
| `new Constructor()` | `NewExpression` | `Identifier` `Constructor` | One construction using a previously obtained value |
| `new getConstructor()()` | `CallExpression` | `NewExpression` `new getConstructor()` | Two operations: construct first, then call the constructed result |

The final form is not a `NewExpression` whose constructor child is `CallExpression(getConstructor())`. It parses as:

```text
CallExpression
  expression: NewExpression
    expression: Identifier(getConstructor)
```

There is no nested `CallExpression(getConstructor())` in that source form. Parentheses would be required to express a call that produces the constructor, for example `new (getConstructor())()`; such a call genuinely executes before construction and therefore is not a parent-owned designator-only property access.

## 6. Exact Ownership and Precedence Rule

Apply this rule after settled `CALL` ownership and before ordinary generic child recognition:

```text
NEW_EXPRESSION_CONSTRUCTOR_CHILD_OWNERSHIP =
  node is NewExpression
  THEN node emits NEW / NEW_EXPRESSION
  AND inspect node.expression by exact AST role
```

The inserted precedence rows are:

| Precedence condition | Governed owner/emission | Direct constructor child | Child ledger reason | Child traversal | Unresolved treatment |
| --- | --- | --- | --- | --- | --- |
| Visited node is `NewExpression` | The node emits `NEW` / `NEW_EXPRESSION` | Inspect exact `node.expression` role | Parent uses `NONE` | Continue | Unresolved constructor/root/operation/provenance remains on the new-expression record and fails through existing closed semantics |
| `NewExpression.expression` is an identifier, non-computed property-access, or computed property-access constructor designator | Parent `NewExpression` remains sole executable owner | No child executable record | `STRUCTURAL_CONTAINER` | Continue through the child | Unresolved designator structure belongs to the parent new-expression record; it does not create a child read |
| A nested executable expression genuinely executes to produce the constructor value | That executable expression owns its own `CALL`, `NEW`, or other existing record; construction remains owned by `NewExpression` | Independent executable record retained | `NONE` on each record-owning node | Continue | Each operation resolves and classifies independently under existing closed semantics |

The direct-constructor-child row is more specific than ordinary property-read recognition. It suppresses no node merely because that node occurs somewhere below a `NewExpression`.

## 7. Required Cases

### 7.1 Identifier constructor

```ts
new Widget();
```

Exact result:

```text
NewExpression:
  NodeKind=NEW
  RecordKind=NEW_EXPRESSION
  nonGovernedReason=NONE

Identifier(Widget) direct constructor child:
  recordIds=[]
  nonGovernedReason=STRUCTURAL_CONTAINER
```

The identifier contributes constructor identity/provenance to the parent. It is not independently executable and no identifier NodeKind exists.

### 7.2 Property-access constructor

```ts
new namespace.Widget();
```

Exact result:

```text
NEW_EXPRESSION count contribution=1
EXECUTABLE_PROPERTY_ACCESS count contribution from constructor child=0
parent NodeKind=NEW
parent nonGovernedReason=NONE
child recordIds=[]
child nonGovernedReason=STRUCTURAL_CONTAINER
```

The `PropertyAccessExpression` is exactly `NewExpression.expression`. Its receiver/member structure resolves the constructor field already owned by `NEW_EXPRESSION`; it does not produce a separately retained value and does not emit `PROPERTY_READ`.

### 7.3 Computed constructor

```ts
new namespace[key]();
```

Exact result:

```text
NEW_EXPRESSION count contribution=1
EXECUTABLE_PROPERTY_ACCESS count contribution from constructor child=0
constructor computed=true in existing representation
child nonGovernedReason=STRUCTURAL_CONTAINER
```

The existing computed representation is sufficient. No `ElementAccessExpression` NodeKind or computed-specific ledger reason is introduced.

### 7.4 Separated constructor read

```ts
const Constructor = namespace.Widget;
new Constructor();
```

The first property access is not `NewExpression.expression`; its value survives independently in `Constructor`. It emits:

```text
NodeKind=PROPERTY_READ
RecordKind=EXECUTABLE_PROPERTY_ACCESS
nonGovernedReason=NONE
```

The later `NewExpression` independently emits:

```text
NodeKind=NEW
RecordKind=NEW_EXPRESSION
nonGovernedReason=NONE
```

Exact count contribution:

```text
EXECUTABLE_PROPERTY_ACCESS=1
NEW_EXPRESSION=1
```

### 7.5 Nested-call source form

```ts
new getConstructor()();
```

The actual AST is an outer `CallExpression` over an inner `NewExpression`. It represents two genuine executable effects:

1. `new getConstructor()` constructs a value;
2. the outer `()` calls that constructed value.

Exact result:

```text
outer CallExpression:
  NodeKind=CALL
  RecordKind=CALL_EXPRESSION
  nonGovernedReason=NONE

inner NewExpression:
  NodeKind=NEW
  RecordKind=NEW_EXPRESSION
  nonGovernedReason=NONE

Identifier(getConstructor):
  recordIds=[]
  nonGovernedReason=STRUCTURAL_CONTAINER
```

```text
CALL_EXPRESSION count contribution=1
NEW_EXPRESSION count contribution=1
```

Suppressing either executable record would omit one operation. Emitting no separate call for the identifier is correct because `getConstructor` is a constructor identifier in this parse, not a `CallExpression`.

## 8. Duplicate Versus Distinct Effects

### 8.1 Duplicate direct constructor-child emission

If `new namespace.Widget()` emitted both:

```text
parent: NEW / NEW_EXPRESSION
child: PROPERTY_READ / EXECUTABLE_PROPERTY_ACCESS
```

the child would duplicate constructor-designator resolution already represented by the new-expression record's constructor provenance and operation. No separate value survives, and no second source-level operation executes independently under this governed ownership model.

Dual emission would also add an independent prohibited and terminal-classification obligation for the child. It would change executable counts and could produce zero-match, multiple-match, or prohibited findings for designator structure already owned by the parent.

```text
DIRECT_PROPERTY_CONSTRUCTOR_DUAL_EMISSION=PROHIBITED_DUPLICATE_EXECUTABLE_OWNERSHIP
```

### 8.2 Correct multiple emission for distinct operations

For `new getConstructor()()`, emitting both `NEW_EXPRESSION` and `CALL_EXPRESSION` is correct because the AST contains two record-owning executable nodes and two effects: construction and invocation of the constructed result.

Likewise, if an independently executing nested expression produces a constructor value before `NewExpression` constructs it, that nested expression retains its own record. The rule suppresses direct designator structure, not genuine execution.

```text
DISTINCT_NESTED_EXECUTABLES=ONE_RECORD_PER_MOST_SPECIFIC_OPERATION_OWNER
```

## 9. Omission Test

Suppressing property access outside exact constructor-designator context would omit a genuine fact:

```ts
const Constructor = namespace.Widget;
new Constructor();
```

The first expression independently produces and stores the constructor value. No `NewExpression` owns that earlier read. Treating it as `STRUCTURAL_CONTAINER` would remove a governed property read from record counts, dependency accounting, data-flow normalization, and terminal classification.

```text
SEPARATED_CONSTRUCTOR_READ_SUPPRESSION=RECORD_MISSING
```

Suppressing a genuinely executing nested call would likewise be an omission. Parent ownership applies only where the child has no independent executable semantic fact.

## 10. NodeLedger Reason Sufficiency

`STRUCTURAL_CONTAINER` is sufficient for direct constructor-designator children.

After `NewExpression` is selected as the most-specific owner, its direct identifier/property/computed constructor child:

1. remains necessary to reconstruct and descend the AST;
2. contributes constructor identity, provenance, root, member, and computed structure to the owner;
3. emits no independent governed fact;
4. is not token/trivia;
5. is not an owner-recorded type node;
6. is not a declaration internal;
7. is not unresolved merely because the parent owns its meaning.

This exactly satisfies the fixed functional meaning of `STRUCTURAL_CONTAINER`. By contrast, a nested executable node with an independent operation owns records and uses `NONE`.

### 10.1 Ledger falsifier

Compare:

```ts
new namespace.Widget();
const Constructor = namespace.Widget;
new Constructor();
```

The same property-access shape is a direct constructor designator in the first case and a separately value-producing read in the second. Exact parent role distinguishes the cases. `STRUCTURAL_CONTAINER` faithfully accounts for the first child; `NONE` plus an `EXECUTABLE_PROPERTY_ACCESS` record faithfully accounts for the second.

No indistinguishable pair or missing ledger distinction remains.

## 11. Overlap, Omission, and Recomputability

| Check | Result | Mechanical rule |
| --- | --- | --- |
| Identifier constructor ownership | `CLOSED` | Parent new expression owns construction; identifier child is structural |
| Direct property constructor overlap | `CLOSED` | Exact `NewExpression.expression` property child emits no independent read |
| Computed constructor parity | `CLOSED` | Existing computed representation follows the same direct-child ownership rule |
| Separated read omission | `CLOSED` | Property access outside direct constructor-child role retains its record |
| Nested executable preservation | `CLOSED` | Every genuinely executing nested/outer AST operation retains one most-specific owner |
| Child traversal | `CLOSED` | Parent-owned direct child remains in NodeLedger and traversal continues |
| Ledger reason | `CLOSED` | Existing `STRUCTURAL_CONTAINER` records direct designator participation |
| Implementation judgement | `NOT REQUIRED FOR THIS CHOICE` | Node kind, exact `.expression` identity, and executable-node presence mechanically select ownership |

The result is now recomputable without implementation-specific judgement:

```text
NEW_EXPRESSION_OWNERSHIP=NEW_PARENT
DIRECT_IDENTIFIER_CONSTRUCTOR_CHILD=STRUCTURAL_CONTAINER
DIRECT_PROPERTY_CONSTRUCTOR_CHILD_RECORD_COUNT=0
DIRECT_PROPERTY_CONSTRUCTOR_CHILD_NON_GOVERNED_REASON=STRUCTURAL_CONTAINER
DIRECT_COMPUTED_CONSTRUCTOR_CHILD_RECORD_COUNT=0
SEPARATED_CONSTRUCTOR_READ_OWNERSHIP=PROPERTY_ACCESS_NODE
NESTED_EXECUTABLE_OWNERSHIP=ONE_RECORD_PER_EXECUTING_AST_OPERATION
```

## 12. Outcome Decision

### Outcome 1 - ownership fully settled

**Selected.** Existing NodeKind, RecordKind, exact AST context, computed representation, and NodeLedger vocabulary are sufficient. `NewExpression` owns direct constructor-designator structure; genuinely executing nested or outer operations retain independent records.

The NodeKind derivation review may resume from the next unresolved precedence row after `NewExpression`.

This review does not resume that row.

### Outcome 2 - ownership settled but exact ledger/precedence choice unresolved

Not selected. `STRUCTURAL_CONTAINER` exactly accounts for a traversed direct constructor-designator child with no independent governed fact, and the precedence position is fixed after `CALL` ownership and before generic child recognition.

### Outcome 3 - structural vocabulary insufficient

Not selected. Exact AST parent/child role distinguishes direct designator structure, separated reads, and genuinely executing nested operations. Existing `STRUCTURAL_CONTAINER` and `NONE` values encode those outcomes without a new dimension.

## 13. Authority and Stop

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

No Authority is granted or implied to inspect governed implementation source; inspect, construct, modify, validate, or execute an instrument; reopen Candidate V2, terminal canonical policy closure, D4, D5, D6, or predicates; run Check 5 or Check 6; freeze policy; inspect or accept implementation; or resume the downstream NodeKind derivation review.

This one-record review stops here.