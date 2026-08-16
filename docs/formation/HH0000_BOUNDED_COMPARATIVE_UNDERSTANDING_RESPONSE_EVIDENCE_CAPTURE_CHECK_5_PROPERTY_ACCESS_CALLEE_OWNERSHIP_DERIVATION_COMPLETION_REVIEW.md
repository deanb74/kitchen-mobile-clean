# HH-0000 Check 5 Property-Access Callee Ownership Derivation Completion Review

**Status:** OUTCOME 1 - PROPERTY-ACCESS CALLEE OWNERSHIP FULLY SETTLED
**Review date:** 2026-08-15
**Review type:** Documentation-only bounded formation review
**Controlling review:** `HH-0000 CHECK 5 NODEKIND AND GOVERNED-NODE RECOGNITION DERIVATION COMPLETION REVIEW`
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

**Principle:** Truth before certainty; one executable semantic effect has one most-specific governed owner; human Authority; smallest justified change.
**Theory:** A child AST form does not emit an independent governed executable record when its complete executable semantic effect is owned by a more-specific governed parent operation.
**Architecture:** Parent/child structural context selects one executable owner while complete preorder traversal preserves every child in the NodeLedger.
**Engineering:** Exact callee-position predicate, standalone/call/computed falsifiers, duplicate-ownership test, omission test, and closed-reason sufficiency test.
**Milestone:** Not Applicable.
**Evidence:** This documentation-only derivation decision. It produces no implementation, instrument, Check 5, Check 6, freeze, or acceptance Evidence.

## 1. Sole Question and Decision

> When a property-access form is exactly the `expression` child of a `CallExpression`, does it independently emit `PROPERTY_READ` / `EXECUTABLE_PROPERTY_ACCESS`, or does the parent `CALL` / `CALL_EXPRESSION` own the complete executable operation?

**Outcome 1 is selected.**

The parent `CallExpression` owns the complete executable operation. A direct property-access callee child does not independently emit `PROPERTY_READ` or `EXECUTABLE_PROPERTY_ACCESS`. It remains visited and ledger-accounted with:

```text
recordIds=[]
nonGovernedReason=STRUCTURAL_CONTAINER
```

The same property-access form outside that exact callee-child position remains an independently governed executable read and emits:

```text
NodeKind=PROPERTY_READ
RecordKind=EXECUTABLE_PROPERTY_ACCESS
nonGovernedReason=NONE
```

No NodeKind, RecordKind, NodeLedger reason, syntax vocabulary, D4/D5/D6 value, or predicate value is added or changed.

## 2. Strict Boundary

This review used only existing Check 5 formation documentation and the closed fields already present in its schemas. It did not:

1. inspect, open, read, hash, parse, or otherwise access either governed implementation source;
2. inspect, construct, modify, validate, or execute an instrument;
3. reopen, edit, reinterpret, or replace Candidate V2 or terminal canonical policy closure;
4. reopen or alter D4, D5, D6, any predicate, or any predicate value;
5. alter the controlling review or any other existing record;
6. run Check 5, Check 6, implementation inspection, tests, typecheck, ESLint, freeze, or acceptance work;
7. resume the controlling NodeKind review beyond the ownership choice settled here.

Exactly this review record is created.

## 3. Inherited Closed Structure

The decision uses only these existing meanings:

1. `NodeKind` already contains `CALL` and `PROPERTY_READ`.
2. `RecordKind` already contains `CALL_EXPRESSION` and `EXECUTABLE_PROPERTY_ACCESS`.
3. `EXECUTABLE_PROPERTY_ACCESS.computed:boolean` already distinguishes direct and computed property-access representations without a new NodeKind or RecordKind.
4. Every visited AST node has one NodeLedger entry with parent, `SyntaxKind`, child count, record IDs, and one closed `nonGovernedReason` value.
5. `STRUCTURAL_CONTAINER` already accounts for a visited node needed to reconstruct or descend the AST when that node has no independently governed semantic fact.
6. `NONE` is the ledger reason for a node that owns its governed records.
7. Every governed executable fact requires exactly one record and every executable record incurs prohibited-first and terminal-classification accounting.
8. Parent and child roles are available structural context and already distinguish a standalone property access from the `expression` child of a call.

The controlling review established that this pair is structurally distinguishable. This review selects the ownership direction and exact existing ledger reason.

## 4. Governing Architectural Principle

Apply this rule before ordinary property-read recognition:

> If a visited property-access form is exactly `parent.expression` for a parent `CallExpression`, the parent call is the more-specific governed executable operation. The child contributes callee receiver/member structure to the parent's normalized callee and operation but is not a second executable fact.

The exact recognition predicate is:

```text
DIRECT_CALL_CALLEE_PROPERTY_ACCESS =
  node is a non-computed or computed property-access form
  AND parent is CallExpression
  AND parent.expression is node
```

When this predicate is true:

```text
parent:
  NodeKind=CALL
  RecordKind=CALL_EXPRESSION
  nonGovernedReason=NONE

child:
  NodeKind=<none>
  RecordKind=<none>
  recordIds=[]
  nonGovernedReason=STRUCTURAL_CONTAINER
```

When this predicate is false, this review adds no general suppression. The property-access form proceeds to ordinary read/write recognition. In the value-producing examples governed here, it emits `PROPERTY_READ` / `EXECUTABLE_PROPERTY_ACCESS`.

Parentheses, wrappers, optional-call forms, tagged templates, constructors, property writes, or other AST relationships not satisfying exact identity `parent.expression is node` are outside this decision. They are not silently treated as equivalent.

## 5. Precedence Effect

This one choice inserts the following row immediately before ordinary property-read recognition in the controlling table:

| Precedence condition | Parent emission | Child emission | Child ledger reason | Traverse child descendants | Unresolved treatment |
| --- | --- | --- | --- | --- | --- |
| Property-access form is exactly the `expression` child of `CallExpression` | `CALL` / `CALL_EXPRESSION` | None | `STRUCTURAL_CONTAINER` | Yes | Unresolved callee provenance/root/operation belongs to the call record and fails through existing closed `UNKNOWN`/finding semantics; it does not create a child read |
| Same property-access form is not exactly the `expression` child of `CallExpression` and is value-producing | None from this rule | `PROPERTY_READ` / `EXECUTABLE_PROPERTY_ACCESS` | `NONE` | Yes | Unresolved read facts remain on the property-access record and fail through existing closed semantics |

The first row is more specific and therefore wins before the second. No node independently satisfies both emission rows.

## 6. Required Tests

### 6.1 Positive standalone read

```ts
const x = subject.member;
```

The property-access node is not `CallExpression.expression`.

```text
CALL_EXPRESSION count contribution=0
EXECUTABLE_PROPERTY_ACCESS count contribution=1
NodeKind=PROPERTY_READ
nonGovernedReason=NONE
```

The read result is independently value-producing and therefore has its own executable owner.

### 6.2 Positive direct method call

```ts
subject.member();
```

The property-access node is exactly `CallExpression.expression`.

```text
CALL_EXPRESSION count contribution=1
EXECUTABLE_PROPERTY_ACCESS count contribution from callee child=0
parent NodeKind=CALL
parent nonGovernedReason=NONE
child recordIds=[]
child nonGovernedReason=STRUCTURAL_CONTAINER
```

The child remains in preorder traversal. Its receiver/member structure contributes to the parent call's normalized callee and operation.

### 6.3 Otherwise-identical separated read and call

```ts
const f = subject.member;
f();
```

The first expression is not a call callee child, so it emits one `PROPERTY_READ` / `EXECUTABLE_PROPERTY_ACCESS`. The later identifier call emits one `CALL` / `CALL_EXPRESSION`.

```text
CALL_EXPRESSION count contribution=1
EXECUTABLE_PROPERTY_ACCESS count contribution=1
```

This differs from `subject.member()` because the read produces an independently held value before the separate call. Parent/child identity, not spelling, determines ownership.

### 6.4 Computed equivalents

```ts
subject[key]
subject[key]()
```

The existing `computed:boolean` field is sufficient:

| Form | Exact structural context | Result |
| --- | --- | --- |
| `subject[key]` | Computed property-access form, not `CallExpression.expression` | One `PROPERTY_READ` / `EXECUTABLE_PROPERTY_ACCESS` with `computed=true` |
| `subject[key]()` | Same computed form exactly equals `CallExpression.expression` | One parent `CALL` / `CALL_EXPRESSION`; child has no record and uses `STRUCTURAL_CONTAINER` |

No computed-specific NodeKind, RecordKind, or ledger reason is needed.

## 7. Duplicate Executable Ownership Test

Suppose `subject.member()` emitted both:

```text
parent: CALL / CALL_EXPRESSION
child: PROPERTY_READ / EXECUTABLE_PROPERTY_ACCESS
```

That interpretation creates two governed executable records for the one direct method invocation even though the call record already owns the callee provenance, normalized operation, receiver relationship, arguments, destinations, flows, and terminal class. The child read does not produce a separately retained or separately consumed value.

Because every executable record must receive complete prohibited and terminal accounting, dual emission also creates an additional classification obligation. The child would require its own prohibited evaluation and exactly one terminal result independently of the parent call. That is not neutral ledger detail; it changes governed executable counts and can introduce zero-match, multiple-match, or prohibited findings for an operation already represented by its more-specific parent.

Therefore:

```text
DIRECT_METHOD_CALL_DUAL_EMISSION=PROHIBITED_DUPLICATE_EXECUTABLE_OWNERSHIP
```

This conclusion applies only to the exact direct-callee relationship defined in Section 4.

## 8. Standalone Omission Test

Suppose property-read emission were suppressed whenever the same receiver/member syntax appeared, regardless of parent role. Then:

```ts
const x = subject.member;
```

would produce no `EXECUTABLE_PROPERTY_ACCESS` even though the expression independently reads and returns the member value. No parent `CallExpression` exists to own that effect. The read would disappear from executable counts, dependency accounting, data-flow normalization, and terminal classification.

Therefore suppression is valid only when the property-access node is exactly the call's `expression` child. Suppression outside that position is a governed omission.

```text
STANDALONE_PROPERTY_READ_SUPPRESSION=RECORD_MISSING
```

## 9. `STRUCTURAL_CONTAINER` Sufficiency

`STRUCTURAL_CONTAINER` is semantically sufficient for the direct callee child.

The controlling review defines structural-container traversal as visiting a node required to reconstruct or descend the AST when the node has no independently governed semantic fact. After applying the parent-ownership principle, the callee property-access child has exactly that status:

1. it must remain visited so the AST tree, parent ID, and child count remain complete;
2. its receiver/member structure is consumed in normalizing the parent call;
3. it emits no independent executable record;
4. it is not token/trivia;
5. it is not a type node owned by a declaration/member;
6. it is not a declaration internal;
7. it is not unresolved merely because ownership belongs to the parent.

`STRUCTURAL_CONTAINER` records structural participation without asserting an independent fact. The word `CONTAINER` does not require list-like syntax; the existing meaning is functional: a traversed AST constituent that carries structure but no independently governed semantic fact.

### 9.1 Sufficiency falsifier

Compare:

```ts
subject.member();
const x = subject.member;
```

Both contain the same property-access shape. In the first, exact parent role transfers complete executable ownership to the call, so `STRUCTURAL_CONTAINER` is faithful. In the second, no owning call exists and the member value is independently produced, so assigning `STRUCTURAL_CONTAINER` would erase a governed read and fail `RECORD_MISSING`.

The existing parent/child context distinguishes the pair and the existing reasons encode both outcomes. No minimum missing ledger distinction is proven.

## 10. Overlap, Omission, and Recomputability

| Check | Result | Mechanical rule |
| --- | --- | --- |
| Direct-call overlap | `CLOSED` | Exact callee child is tested before ordinary property read and emits no child record |
| Standalone-read omission | `CLOSED` | Property access outside exact callee-child position is not suppressed by this rule |
| Computed parity | `CLOSED` | Existing `computed:boolean` preserves direct/computed representation under the same parent rule |
| Child traversal | `CLOSED` | Suppressed child remains in NodeLedger with `STRUCTURAL_CONTAINER` and traversal continues |
| Ledger reason | `CLOSED` | Existing `STRUCTURAL_CONTAINER` exactly records parent-owned structural participation |
| Implementation judgement | `NOT REQUIRED FOR THIS CHOICE` | Parent kind and exact child identity mechanically select the row |

The following result is now recomputable without implementation-specific judgement:

```text
PROPERTY_ACCESS_CALLEE_OWNERSHIP=CALL_PARENT
PROPERTY_ACCESS_CALLEE_CHILD_RECORD_COUNT=0
PROPERTY_ACCESS_CALLEE_CHILD_NON_GOVERNED_REASON=STRUCTURAL_CONTAINER
STANDALONE_PROPERTY_READ_OWNERSHIP=PROPERTY_ACCESS_NODE
DIRECT_METHOD_CALL_DUAL_EMISSION=PROHIBITED
COMPUTED_EQUIVALENCE=SETTLED_BY_EXISTING_COMPUTED_BOOLEAN
```

## 11. Outcome Decision

### Outcome 1 - ownership fully settled

**Selected.** Existing NodeKind, RecordKind, AST parent context, and NodeLedger reason vocabulary are sufficient. The parent call owns a direct property-access callee; the child is a traversed `STRUCTURAL_CONTAINER`; standalone direct or computed reads retain independent ownership.

The prior NodeKind derivation review may now resume from its next precedence row.

This review does not resume it.

### Outcome 2 - direction settled but reason unresolved

Not selected. `STRUCTURAL_CONTAINER` already expresses a traversed structural constituent with no independently governed semantic fact and is exact after parent ownership is selected.

### Outcome 3 - ledger vocabulary structurally insufficient

Not selected. Parent/child context distinguishes direct callee use from standalone read, and `STRUCTURAL_CONTAINER` versus `NONE` faithfully records the resulting ownership difference. No new distinction is required.

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

No Authority is granted or implied to inspect governed implementation source; inspect, construct, modify, validate, or execute an instrument; reopen Candidate V2, terminal canonical policy closure, D4, D5, D6, or predicates; run Check 5 or Check 6; freeze policy; inspect or accept implementation; or resume the downstream NodeKind derivation review.

This one-record review stops here.