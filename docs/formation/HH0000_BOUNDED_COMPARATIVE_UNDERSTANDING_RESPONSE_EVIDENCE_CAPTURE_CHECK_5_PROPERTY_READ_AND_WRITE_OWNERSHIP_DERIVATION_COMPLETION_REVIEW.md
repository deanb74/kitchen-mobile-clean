# HH-0000 Check 5 Property-Read-and-Write Ownership Derivation Completion Review

**Status:** OUTCOME 1 - PROPERTY-READ/WRITE OWNERSHIP AND PRECEDENCE FULLY SETTLED
**Review date:** 2026-08-15
**Review type:** Documentation-only bounded formation review
**Controlling record 1:** `HH-0000 CHECK 5 NODEKIND AND GOVERNED-NODE RECOGNITION DERIVATION COMPLETION REVIEW`
**Controlling record 2:** `HH-0000 CHECK 5 PROPERTY-ACCESS CALLEE OWNERSHIP DERIVATION COMPLETION REVIEW`
**Controlling record 3:** `HH-0000 CHECK 5 NEW-EXPRESSION CONSTRUCTOR-CHILD OWNERSHIP DERIVATION COMPLETION REVIEW`
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
**Theory:** Property-read and property-write facts derive from exact property-access AST form, assignment/update context, and parent/child role; read-modify-write has two effects owned by one property-access node.
**Architecture:** Parent-owned call/new designators precede write recognition, write recognition precedes ordinary read recognition, and same-node record ordinals preserve multiple genuine effects without duplicate ownership.
**Engineering:** Exact direct/computed/read/write/update/destructuring rules, two-record read-modify-write encoding, chain ownership, precedence, overlap/omission proofs, and falsifiers.
**Milestone:** Not Applicable.
**Evidence:** This documentation-only derivation decision and synthetic TypeScript AST-shape determination. No governed implementation, instrument, Check 5, Check 6, freeze, or acceptance Evidence is produced.

## 1. Sole Question and Decision

> Can ordinary executable property access be deterministically classified as `PROPERTY_READ` or `PROPERTY_WRITE` from TypeScript AST form and parent/child role using only existing closed vocabularies?

**Outcome 1 is selected.**

The existing structure is sufficient:

1. a value-producing property access emits one read fact;
2. a simple property assignment target emits one write fact and no property-value read;
3. a compound assignment or increment/decrement target emits two facts in semantic order: read, then write;
4. both facts in a read-modify-write case are owned by the same property-access ledger node as two `EXECUTABLE_PROPERTY_ACCESS` records with ordinals `0` and `1`;
5. direct call-callee and direct new-constructor property accesses remain parent-owned and emit no independent read;
6. each access in a value-producing chain independently owns the property read it performs;
7. computed access uses the existing `computed:boolean` representation.

No NodeKind, RecordKind, operation kind, flow relation, destination, NodeLedger reason, syntax vocabulary, D4/D5/D6 value, or predicate value is added or changed.

## 2. Strict Boundary

This review used only the three controlling records, inherited closed schemas, and synthetic TypeScript AST-shape determination for the examples in this review. It did not:

1. inspect, open, read, hash, parse, or otherwise access either governed implementation source;
2. inspect, construct, modify, validate, or execute an instrument;
3. reopen, edit, reinterpret, or replace Candidate V2 or terminal canonical policy closure;
4. reopen or alter D4, D5, D6, any predicate, or any predicate value;
5. alter a controlling record or any other existing record;
6. run Check 5, Check 6, implementation inspection, freeze, or acceptance work;
7. resume the NodeKind derivation review beyond the property-read/write choice settled here.

Exactly this review record is created.

## 3. Fixed Ownership Rules

The following rules are fixed:

1. one executable semantic effect has one most-specific governed owner;
2. a direct property-access `CallExpression.expression` is owned by the call parent, emits no property-read record, and uses `STRUCTURAL_CONTAINER`;
3. a direct property-access `NewExpression.expression` is owned by the new-expression parent, emits no property-read record, and uses `STRUCTURAL_CONTAINER`;
4. genuinely independent executable effects retain independent records;
5. parent-owned children remain traversed and ledger-accounted.

This review applies those rules before ordinary property read/write recognition.

## 4. Existing Representational Capacity

### 4.1 Closed facts and records

The existing model contains:

```text
NodeKind=PROPERTY_READ | PROPERTY_WRITE
OperationKind=READ | WRITE
RecordKind=EXECUTABLE_PROPERTY_ACCESS
FlowLabel=PROPERTY_READ_RESULT | PROPERTY_WRITE_VALUE
```

`EXECUTABLE_PROPERTY_ACCESS` already carries one normalized operation, receiver provenance, `computed:boolean`, existing destination labels, existing data flows, and terminal class.

### 4.2 Same-node multiple records

Record IDs are:

```text
<ROLE>:<NODE_ID>:<RECORD_KIND>:<ORDINAL>
```

The ordinal begins at zero per node and record kind. A NodeLedger entry contains `recordIds:array<recordId>`, and every governed fact has exactly one record. Therefore one property-access node may own two records of the same `EXECUTABLE_PROPERTY_ACCESS` kind when it has two materially distinct governed effects.

For every read-modify-write property node, ordering is fixed to semantic order:

```text
ordinal=0 => NodeKind=PROPERTY_READ, OperationKind=READ,
             dataFlows includes PROPERTY_READ_RESULT

ordinal=1 => NodeKind=PROPERTY_WRITE, OperationKind=WRITE,
             dataFlows includes PROPERTY_WRITE_VALUE
```

Both records use the same property-access `nodeId`. The ledger entry uses `nonGovernedReason=NONE` because the node owns governed records. Existing context-derived destination labels and any additional existing flow labels remain independently derived for each fact. Applicable unresolved values use existing `UNKNOWN`; this review adds no destination or flow value.

## 5. Exact Recognition Precedence

For every visited non-computed `PropertyAccessExpression` or computed `ElementAccessExpression`, apply the first matching row:

| Priority | Exact structural condition | Emission | Owner | NodeLedger treatment | Traversal |
| --- | --- | --- | --- | --- | --- |
| 1 | Node is exactly `CallExpression.expression` | No independent property record; parent owns `CALL` / `CALL_EXPRESSION` | `CallExpression` | Child `recordIds=[]`, `STRUCTURAL_CONTAINER` | Continue |
| 2 | Node is exactly `NewExpression.expression` | No independent property record; parent owns `NEW` / `NEW_EXPRESSION` | `NewExpression` | Child `recordIds=[]`, `STRUCTURAL_CONTAINER` | Continue |
| 3A | Node is a simple property assignment target under `=` | One `PROPERTY_WRITE` / `EXECUTABLE_PROPERTY_ACCESS` | Property-access node | One record, `NONE`; assignment wrapper is `STRUCTURAL_CONTAINER` | Continue |
| 3B | Node is a compound-assignment target under an assignment operator other than `=` | Ordered read record then write record | Property-access node | Two same-kind record IDs, ordinals `0` then `1`, `NONE`; assignment wrapper is `STRUCTURAL_CONTAINER` | Continue |
| 3C | Node is the operand of property `++` or `--` in `PrefixUnaryExpression` or `PostfixUnaryExpression` | Ordered read record then write record | Property-access node | Two same-kind record IDs, ordinals `0` then `1`, `NONE`; update wrapper is `STRUCTURAL_CONTAINER` | Continue |
| 3D | Node occupies an explicit property assignment-target position inside an object/array assignment pattern rooted at the left side of `=` | One `PROPERTY_WRITE` / `EXECUTABLE_PROPERTY_ACCESS` | Property-access node | One record, `NONE`; intervening pattern wrappers are `STRUCTURAL_CONTAINER` unless independently governed | Continue |
| 4 | Node is value-producing and no earlier row matches | One `PROPERTY_READ` / `EXECUTABLE_PROPERTY_ACCESS` | Property-access node | One record, `NONE` | Continue |
| 5 | Recognised property syntax has no supported executable role | No favourable inference | None until resolved | Fail through existing unsupported/unknown semantics; do not silently assign a read or write | Continue where structurally available |

Rows 3A through 3D are collectively the property-write precedence class. Parent assignment/update wrappers do not receive a property NodeKind or `EXECUTABLE_PROPERTY_ACCESS` record; they provide structural context to the property node and use `STRUCTURAL_CONTAINER` unless another independently governed rule applies.

### 5.1 Assignment-target test

Simple/compound write recognition requires the property-access node to occupy the assignment target, not merely occur somewhere beneath an assignment expression. For direct assignment it is exactly `BinaryExpression.left`. For an explicit object/array assignment pattern, every intervening object/array/property wrapper must lie on the target path rooted at `BinaryExpression.left`, and the property-access node must occupy a target slot rather than a computed key, default-value expression, or source expression.

### 5.2 Independent executable descendants

Receiver expressions, computed-key expressions, right-hand values, and nested property accesses continue traversal. Any child that independently calls, constructs, reads, or writes retains its own record. Parent context suppresses only the property effect fully owned by the selected row.

## 6. Read Cases

### 6.1 Value-producing direct read

```ts
const x = subject.member;
```

```text
NodeKind=PROPERTY_READ
RecordKind=EXECUTABLE_PROPERTY_ACCESS
OperationKind=READ
dataFlows includes PROPERTY_READ_RESULT
owner=PropertyAccessExpression(subject.member)
nonGovernedReason=NONE
record count=1
```

The variable-declaration wrapper is structural; traversal continues through receiver and member children.

### 6.2 Computed read

```ts
const x = subject[key];
```

The result is the same as Section 6.1 with:

```text
computed=true
owner=ElementAccessExpression(subject[key])
```

The key expression is traversed. If the key itself contains an independently executable operation, that operation retains its own record.

### 6.3 Read as ordinary call argument

```ts
use(subject.member);
```

The property node is a call argument, not `CallExpression.expression`. Two effects exist:

```text
PropertyAccessExpression:
  PROPERTY_READ / EXECUTABLE_PROPERTY_ACCESS
  OperationKind=READ
  dataFlows includes PROPERTY_READ_RESULT and ARGUMENT_TO_CALL
  nonGovernedReason=NONE

CallExpression:
  CALL / CALL_EXPRESSION
  nonGovernedReason=NONE
```

The property-read destination uses the existing context-derived destination label. If destination resolution is applicable but unresolved, it uses existing `UNKNOWN` and fails closed.

### 6.4 Read inside an expression

```ts
const x = subject.member + 1;
```

The property node is `BinaryExpression.left` under non-assignment `+`, so no write row matches. It emits one read record. The `+` wrapper is `STRUCTURAL_CONTAINER` unless independently governed by another existing rule.

### 6.5 Chained reads

```ts
const x = subject.member.child;
```

The AST contains inner and outer property-access nodes:

```text
outer PropertyAccessExpression(subject.member.child)
  expression = inner PropertyAccessExpression(subject.member)
```

Two independent reads execute:

1. the inner access reads `subject.member` to produce the receiver for the outer access;
2. the outer access reads `.child` from that receiver.

Each node emits one `PROPERTY_READ` / `EXECUTABLE_PROPERTY_ACCESS` record and uses `nonGovernedReason=NONE`.

```text
EXECUTABLE_PROPERTY_ACCESS count contribution=2
```

The inner access is not `STRUCTURAL_CONTAINER`: it produces a value consumed by a second property operation. If the outer access were instead a direct call callee or new constructor designator, the fixed parent-owned row would suppress only that outer access; independently executing inner accesses would still traverse and classify under this precedence.

## 7. Write Cases

### 7.1 Simple assignment

```ts
subject.member = value;
```

The property node is exactly `BinaryExpression.left` under `=`. Assignment evaluates receiver structure and writes the right-hand value but does not read the prior property value.

```text
NodeKind=PROPERTY_WRITE
RecordKind=EXECUTABLE_PROPERTY_ACCESS
OperationKind=WRITE
dataFlows includes PROPERTY_WRITE_VALUE
owner=PropertyAccessExpression(subject.member)
nonGovernedReason=NONE
record count=1
```

The assignment `BinaryExpression` is structural. The right-hand side is traversed and retains any independent executable records.

### 7.2 Computed assignment

```ts
subject[key] = value;
```

The result is one write record with `computed=true`. The key is evaluated to select the target but the prior property value is not read. Any independently executable operation inside the key retains its own record.

### 7.3 Compound assignment

```ts
subject.member += value;
```

The property node is exactly `BinaryExpression.left` under a compound assignment operator. The operation reads the prior property value, combines it with the right-hand value, then writes the result.

The one property node owns exactly two records:

```text
<ROLE>:<NODE_ID>:EXECUTABLE_PROPERTY_ACCESS:0
  NodeKind=PROPERTY_READ
  OperationKind=READ
  dataFlows includes PROPERTY_READ_RESULT

<ROLE>:<NODE_ID>:EXECUTABLE_PROPERTY_ACCESS:1
  NodeKind=PROPERTY_WRITE
  OperationKind=WRITE
  dataFlows includes PROPERTY_WRITE_VALUE

NodeLedgerEntry.nonGovernedReason=NONE
```

No new read-modify-write NodeKind, operation, or flow is needed. The two records represent two distinct effects and do not double-count either one.

### 7.4 Increment and decrement

```ts
subject.member++;
++subject.member;
subject.member--;
--subject.member;
```

For both prefix and postfix forms, the property node is the update expression's `.operand`. Each form reads the old property value and writes an updated value. The difference between returned old/new expression value is carried by existing AST context and downstream flow/destination derivation where relevant; it does not change property-effect cardinality.

Each property node owns the same ordered two-record shape as compound assignment:

```text
ordinal 0 = PROPERTY_READ / READ / PROPERTY_READ_RESULT
ordinal 1 = PROPERTY_WRITE / WRITE / PROPERTY_WRITE_VALUE
nonGovernedReason=NONE
```

The `PrefixUnaryExpression` or `PostfixUnaryExpression` wrapper uses `STRUCTURAL_CONTAINER`. Traversal continues.

### 7.5 Explicit destructuring/property assignment targets

```ts
({ x: subject.member } = source);
[subject[key]] = source;
```

In the object case the property node is `PropertyAssignment.initializer`; the `PropertyAssignment` lies within the object-literal target rooted at `BinaryExpression.left`. In the array case the property node occupies an array target slot rooted at the same assignment left side.

Each explicit property target emits one `PROPERTY_WRITE` / `EXECUTABLE_PROPERTY_ACCESS` record. Pattern wrappers are structural; source/default/computed-key expressions continue traversal and retain independent effects.

Implicit binding destructuring is distinct:

```ts
const { x } = subject;
```

TypeScript represents this with `ObjectBindingPattern` and `BindingElement`; it does not synthesize a `PropertyAccessExpression` for the implicit source-member extraction. This property-access review therefore emits no synthetic `EXECUTABLE_PROPERTY_ACCESS` record for that absent node. Whether another governed fact model owns implicit destructuring extraction is outside this review; no favourable property-read fact is invented.

## 8. UNKNOWN and Failure Treatment

Recognition precedes semantic resolution:

1. a syntactically recognised read still emits its read record when receiver/root/member/destination resolution is applicable but unresolved;
2. a syntactically recognised simple write still emits its write record under the same condition;
3. a syntactically recognised compound/update case still emits ordered read and write records;
4. each applicable unresolved field uses its existing closed `UNKNOWN` value;
5. `UNKNOWN_FINDING` refers to the affected record where required by existing failure semantics;
6. zero terminal matches, multiple terminal matches, unsupported syntax, or unresolvable required structure fails through existing closed failure codes;
7. uncertainty never changes a read into a write, a write into a read, or a read-modify-write into one record.

No unresolved case is assigned a favourable destination, flow, operation, or terminal class.

## 9. Critical Read-Modify-Write Test

### 9.1 Simple write versus compound assignment

```ts
subject.member = value;
subject.member += value;
```

The property-access shape is otherwise identical, but the parent `BinaryExpression.operatorToken.kind` differs. Existing AST context therefore distinguishes the cases:

| Case | Read records | Write records | Result |
| --- | --- | --- | --- |
| `=` | 0 | 1 | Simple write |
| compound assignment token | 1 | 1 | Read-modify-write |

### 9.2 Simple write versus increment/decrement

```ts
subject.member = value;
subject.member++;
```

The first property node is `BinaryExpression.left`; the second is `PostfixUnaryExpression.operand`. Existing parent kind and role distinguish them. The first emits one write; the second emits ordered read and write records.

### 9.3 Representational conclusion

The model does not need a `READ_MODIFY_WRITE` NodeKind, operation, or flow. It represents the actual effects compositionally:

```text
read-modify-write = one PROPERTY_READ fact + one PROPERTY_WRITE fact
```

Both facts share the same AST owner but have unique same-kind record ordinals. This is not duplicate ownership because each record represents a different operation kind and flow. Omitting either record would lose one genuine effect; merging both into one record would lose exact NodeKind/operation identity.

## 10. Required Falsifiers

| Pair | Positive rule | Otherwise-identical negative | Distinguishing structure |
| --- | --- | --- | --- |
| Standalone read vs call callee | `const x = subject.member` emits one read | `subject.member()` emits no callee-child read | Exact identity as `CallExpression.expression` |
| Standalone read vs constructor designator | `const x = subject.member` emits one read | `new subject.member()` emits no constructor-child read | Exact identity as `NewExpression.expression` |
| Read vs simple write | `const x = subject.member` emits one read | `subject.member = value` emits one write | Value position versus `BinaryExpression.left` under `=` |
| Direct vs computed | `subject.member` uses `computed=false` | `subject[key]` uses `computed=true` | Existing computed representation; ownership cardinality otherwise unchanged |
| Simple vs compound assignment | `=` emits write only | `+=` emits read then write | Assignment operator token |
| Simple assignment vs update | `=` emits write only | `++`/`--` emits read then write | `BinaryExpression.left` versus prefix/postfix `.operand` |
| Chained access ownership | `subject.member` emits one read | `subject.member.child` emits inner and outer reads | Second `PropertyAccessExpression` whose `.expression` is the inner access |

Every pair is distinguishable using existing AST form or parent/child role. No pair requires a new structural dimension.

## 11. Overlap and Omission Closure

### 11.1 Overlap

The precedence table is mutually deterministic:

1. exact call-callee and new-constructor roles suppress ordinary read recognition first;
2. write/update target contexts classify before value-producing read;
3. simple write emits no read;
4. compound/update intentionally emits two different facts on one owner;
5. ordinary read applies only when no earlier row matches;
6. fallback never emits a favourable fact.

The two read-modify-write records are an explicit same-node multi-record case permitted by record ordinals, not an accidental overlap.

### 11.2 Omission

Every supported property-access node reaches exactly one ownership result:

1. parent-owned structural child;
2. one write record;
3. ordered read plus write records;
4. one read record; or
5. fail-closed unsupported/unresolved treatment.

Traversal always continues. Independently executable receiver, key, right-hand, nested, and chained children are not hidden by their parent's classification.

```text
PROPERTY_ACCESS_OVERLAP=CLOSED
PROPERTY_ACCESS_OMISSION=CLOSED
PROPERTY_ACCESS_TRAVERSAL=COMPLETE
```

## 12. Recomputability Result

The following decisions are now mechanical from `SyntaxKind`, exact parent/child role, assignment/update operator, and assignment-target ancestry:

```text
DIRECT_CALL_CALLEE_PROPERTY_ACCESS=PARENT_OWNED_STRUCTURAL_CONTAINER
DIRECT_NEW_CONSTRUCTOR_PROPERTY_ACCESS=PARENT_OWNED_STRUCTURAL_CONTAINER
SIMPLE_PROPERTY_ASSIGNMENT=WRITE_ONLY
COMPOUND_PROPERTY_ASSIGNMENT=READ_THEN_WRITE
PROPERTY_INCREMENT_DECREMENT=READ_THEN_WRITE
ORDINARY_VALUE_PROPERTY_ACCESS=READ_ONLY
CHAINED_VALUE_PROPERTY_ACCESS=ONE_READ_PER_ACCESS_NODE
COMPUTED_PROPERTY_ACCESS=EXISTING_COMPUTED_BOOLEAN
EXPLICIT_DESTRUCTURING_PROPERTY_TARGET=WRITE_ONLY
READ_MODIFY_WRITE_RECORD_ORDINALS=READ_0_WRITE_1
```

No implementation-specific judgement is required for property-read/write ownership or precedence.

## 13. Outcome Decision

### Outcome 1 - deterministic ownership and precedence

**Selected.** Existing NodeKind, RecordKind, operation, flow, destination, AST context, record ordinal, and NodeLedger vocabularies faithfully represent ordinary reads, simple writes, and read-modify-write cases.

The NodeKind derivation review may resume from the next unresolved precedence row after property reads/writes.

This review does not resume that row.

### Outcome 2 - exact AST-form/ownership choice unresolved

Not selected. Supported read/write forms, record ownership, record order, wrapper treatment, and precedence are exact.

### Outcome 3 - structural vocabulary insufficient

Not selected. Simple write, compound assignment, and increment/decrement are distinguishable by existing AST parent/operator structure. Existing same-node record ordinals represent read and write as separate facts without adding a kind, operation, or flow.

## 14. Authority and Stop

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