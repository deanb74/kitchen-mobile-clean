# HH-0000 Bounded Comparative Understanding Contradictory Complete Relationship Parser Vocabulary Selection Static Continuation Authority Review

**Status:** OUTCOME 1 - ONE PARSER-VOCABULARY-SELECTION STATIC CONTINUATION AUTHORISED
**Review date:** 2026-08-13
**Review type:** Fresh strictly documentation-only static-instrument responsibility review
**Implementation effect:** None
**Test effect:** None
**Validation effect:** One parser-vocabulary-selection read-only structural assertion and contingent continuation of the withheld static/Evidence validation are authorised but unconsumed
**Acceptance effect:** None - the corrected implementation remains unaccepted
**Contribution effect:** None - contribution Authority is not inspected, reconsidered, modified, consumed, revived, or executed

## 1. Purpose

This review determines whether the latest parser-regex-selection failure is mechanically isolated to an accidental method-wide regex cardinality rule and whether one smaller read-only continuation may be authorised.

Yes.

`parseExplicitRelationship` contains two regex literals with different responsibilities:

1. a punctuation and structural guard;
2. an explicit-relationship vocabulary matcher.

The failed instrument required exactly one regex literal in the entire method. The governed invariant instead requires exactly one relationship-vocabulary candidate whose extracted alternatives equal the independently extracted six-form `StructuralObservation` verb union. Unrelated regex literals are permitted.

The failure is therefore static-instrument Evidence. It is not implementation Evidence and does not convert any previous failure into PASS.

## 2. Traceability

| Layer | Trace |
| --- | --- |
| Principle | Truth before certainty; Evidence before claims; every failed check remains historical Evidence |
| Theory | Not Applicable - no relationship meaning or Understanding responsibility changes |
| Architecture | Not Applicable - no implementation or architecture surface changes |
| Engineering | Read-only AST selection of the relationship parser by exact vocabulary-set equality |
| Milestone | HH-0000 contradictory-complete-relationship correction static-validation dependency |
| Evidence | Declaration-shape continuation Authority, correction Evidence Section 22, human-supplied Terminal Evidence, current type alias, current parser, current canonicalisation block, and this review |

## 3. Exact Review Boundary

This review used only:

1. `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_CONTRADICTORY_COMPLETE_RELATIONSHIP_DECLARATION_SHAPE_STATIC_CONTINUATION_AUTHORITY_REVIEW.md`;
2. Section 22 of `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_CONTRADICTORY_COMPLETE_RELATIONSHIP_CORRECTION_EVIDENCE.md`;
3. the current `StructuralObservation` type alias;
4. the current `parseExplicitRelationship` method;
5. the current `getCompleteRelationshipIdentityForDisagreement` block;
6. the supplied human Terminal Evidence recorded in Section 5.

No production or test file was edited. No Jest, adjacent test, typecheck, ESLint, build, runtime, hash, or executable-validation command ran. Andy was not invoked. No real programme source or manifest was inspected. Contribution Authority was not inspected or altered.

## 4. Historical Failures Preserved

All previous static failures remain historical Evidence exactly as recorded.

### 4.1 Textual-Count Failure

```text
FAIL passive canonicalisation limited to three forms
```

### 4.2 Declaration-Shape Failure

```text
Error: expected one StructuralObservation interface, found 0
```

### 4.3 Parser-Regex-Selection Failure

```text
Error: expected one parser regex, found 2
```

None is deleted, weakened, relabelled, superseded, or converted to PASS. Each mandatory stop remains valid historical Evidence.

## 5. Human-Supplied Terminal Evidence

The human supplied the following direct Terminal Evidence from `parseExplicitRelationship`:

```ts
if (!text || /[.!?].+[.!?]/.test(text)) return undefined;

const match = text.match(
  /^\s*(.+?)\s+(supersedes|is superseded by|replaces|is replaced by|amends|is amended by)\s+(.+?)[.!?]?\s*$/i
);
```

This establishes two regex literals with distinct responsibilities:

1. `/[.!?].+[.!?]/` is a punctuation and structural guard;
2. the anchored matcher contains the explicit-relationship vocabulary alternatives.

The human also supplied the exact current `StructuralObservation` verb union:

```text
supersedes
is superseded by
replaces
is replaced by
amends
is amended by
```

The relevant passive phrases remain located in the canonicalisation block as previously observed. Those occurrences diagnose the earlier textual-count failure but are not a permitted invariant.

## 6. Independent Source Corroboration

### 6.1 Type Domain

Current source declares `StructuralObservation` as one `TypeAliasDeclaration` with a `TypeLiteralNode`. Its optional `explicitRelationship` property contains a nested type literal whose `verb` property is a six-member string-literal union containing exactly:

```text
supersedes
is superseded by
replaces
is replaced by
amends
is amended by
```

### 6.2 Parser Regex Responsibilities

Current `parseExplicitRelationship` source contains both supplied regex literals.

The punctuation guard has no six-form alternatives and is not a relationship-vocabulary candidate.

The anchored relationship matcher contains one parenthesised alternative group whose extracted set equals the independently extracted type union exactly. It is therefore mechanically selectable by vocabulary equality rather than method-wide count or source position.

### 6.3 Bounded Canonicalisation

Current `getCompleteRelationshipIdentityForDisagreement` source directly shows:

1. `passiveRelationship` compares only the three passive forms;
2. actor and target selection depend only on `passiveRelationship`;
3. passive selection maps object to actor and subject to target;
4. active selection maps subject to actor and object to target;
5. canonical outputs are `supersedes`, `replaces`, and `amends`;
6. supersedes and replaces each have explicit active/passive branches;
7. after those four forms are removed from the closed six-form domain, only `amends` and `is amended by` remain for the `amends` fallback;
8. canonical identity components are family, actor source ID, and target source ID.

No cross-family mapping or additional semantic input was observed in the bounded block.

## 7. Default Hypothesis Review

The default hypothesis is:

> The failed AST instrument imposed an accidental method-wide regex cardinality rule. The governed invariant requires exactly one relationship-vocabulary regex whose six alternatives equal the `StructuralObservation` verb union. Other unrelated regexes in the method are permitted.

This hypothesis is supported.

The failed assertion measured:

```text
all regex literals in parseExplicitRelationship = 1
```

The source contains:

```text
all regex literals in parseExplicitRelationship = 2
relationship-vocabulary candidates equal to the proven type union = 1
```

The punctuation guard does not widen, duplicate, or contradict the relationship vocabulary. It serves a separate structural responsibility. Requiring its absence would constrain incidental parser implementation shape without testing the governed relationship domain.

**Failure classification:** `ISOLATED READ-ONLY STATIC-INSTRUMENT METHOD-WIDE REGEX CARDINALITY DEFECT`.

No implementation edit, test edit, parser change, executable rerun, semantic dependency, or architecture change is justified by this failure.

## 8. Required Parser-Vocabulary-Selection Assertion

The future assertion must use TypeScript AST structure and must prove all of the following in one execution.

### 8.1 Type Alias and Closed Union

1. locate exactly one `TypeAliasDeclaration` named `StructuralObservation`;
2. require its body to be a `TypeLiteralNode`;
3. locate exactly one optional `explicitRelationship` property with a nested `TypeLiteralNode`;
4. locate exactly one `verb` property;
5. extract a string-literal union containing exactly the six approved forms and no other member.

### 8.2 Parser Vocabulary Selection

1. locate exactly one `parseExplicitRelationship` method;
2. inspect every regex literal within that method;
3. extract every parenthesised alternative group from each regex using regex syntax structure sufficient to distinguish alternatives from unrelated groups;
4. form relationship-vocabulary candidates from the extracted alternatives themselves;
5. compare each candidate as an exact set with the independently proven six-form type union;
6. require exactly one matching candidate across all method regex literals;
7. select the containing regex as the relationship-vocabulary matcher;
8. prove parser/type vocabulary equality from that selected candidate;
9. permit unrelated regex literals, including the punctuation guard, when none of their extracted alternative sets equals or conflicts with the type union.

The selection must not depend on regex source position, variable position, statement order, or total method regex count.

### 8.3 Existing Governed Canonicalisation Checks

Only after Sections 8.1 and 8.2 pass, the same assertion must prove:

1. `passiveRelationship` is an OR-expression of strict verb comparisons containing exactly:
   - `is superseded by`;
   - `is replaced by`;
   - `is amended by`;
2. `actorSourceId` is conditioned only by `passiveRelationship`, selecting object for passive and subject for active;
3. `targetSourceId` is conditioned only by `passiveRelationship`, selecting subject for passive and object for active;
4. canonical family outputs are exactly `supersedes`, `replaces`, and `amends`;
5. the supersedes branch explicitly tests exactly `supersedes` and `is superseded by`;
6. the replaces branch explicitly tests exactly `replaces` and `is replaced by`;
7. subtracting those four forms from the independently proven equal parser/type domain leaves exactly `amends` and `is amended by` for the `amends` fallback;
8. passive and family conditions contain no form outside the proven domain;
9. canonical identity contains only family, actor source ID, and target source ID;
10. no synonym, fuzzy, graph, chain, transitive, majority, source-count, date, rank, score, order, currentness, Authority, or other semantic input enters the bounded canonicalisation.

The assertion must fail if any declaration, set, candidate count, parser/type equality, branch, endpoint expression, output family, fallback remainder, identity component, or semantic boundary differs.

## 9. Explicit Instrument Prohibitions

The future assertion must not:

1. assert any total regex count for `parseExplicitRelationship`;
2. select the relationship matcher by source position, statement order, or variable assignment alone;
3. use whole-file relationship-phrase counts;
4. search for `StructuralObservation` as an interface;
5. accept interface or alias interchangeably;
6. infer parser closure from the type alone;
7. infer fallback validity before parser/type equality is independently proven;
8. execute application behavior or compile the project;
9. edit production or tests;
10. reinterpret any prior failure as PASS.

## 10. Outcome Options

### Outcome 1

One parser-vocabulary-selection static continuation is authorised.

### Outcome 2

No continuation is authorised because the failure cannot be isolated from implementation Evidence.

### Outcome 3

A semantic or architectural dependency must be resolved before further static continuation.

## 11. Combined Outcome

**OUTCOME 1 - ONE PARSER-VOCABULARY-SELECTION STATIC CONTINUATION AUTHORISED**

Outcome 1 is selected because current source mechanically distinguishes one relationship-vocabulary candidate from one unrelated guard regex by exact extracted-alternative-set equality with the closed type union.

Outcome 2 is not selected because the method-wide count failure occurred before parser/type equality or canonicalisation was evaluated and does not identify an implementation mismatch.

Outcome 3 is not selected because candidate selection and the remaining checks concern exact private syntax-tree structure. No semantic interpretation or architecture decision is required.

## 12. Authority Granted

One fresh parser-vocabulary-selection read-only continuation Authority is granted.

It permits only:

1. read-only confirmation that current production and focused-test SHA-256 values equal:
   - production: `0cc709a1fc2c601aa7b0014e5e970f16f6dd9591fafe44ffbbb7cbbddcbc685c`;
   - focused test: `b55f2e7768bc83c401382c66414b1a1596ee92b3831cecc95ff63e8661822c07`;
2. one execution of the parser-vocabulary-selection structural assertion defined in Section 8;
3. only after complete structural PASS, one execution of each still-withheld Section 19 static check;
4. append-only continuation of `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_CONTRADICTORY_COMPLETE_RELATIONSHIP_CORRECTION_EVIDENCE.md` recording:
   - this review and its consumption point;
   - all three historical static failure results unchanged;
   - the human-supplied parser and type-union Evidence;
   - the exact corrected instrument and every result it establishes;
   - each remaining static result and every withheld stage;
   - the distinction between historical executable Evidence and fresh read-only static Evidence;
   - direct observations, Inferences, limitations, exact claims, and non-consequences;
   - the continuing need for fresh independent acceptance;
5. one document-only diagnostics, trailing-whitespace, final-newline, required-section, required-reference, and preserved-failure validation against the completed correction Evidence.

No new execution Evidence file is authorised. Only the existing correction Evidence may later receive the append-only execution continuation.

## 13. Authority Consumption

This Authority is unconsumed at creation.

Read-only identity confirmation does not consume it.

It is consumed only when the Section 8 parser-vocabulary-selection structural assertion first executes after both exact identity checks pass.

No repair or rerun cycle is granted.

## 14. Exact Execution Sequence

A future execution must proceed exactly:

1. confirm both SHA-256 identities in Section 12;
2. stop without adopting a new baseline if either differs;
3. execute the complete Section 8 assertion once;
4. stop without repair or rerun if it exits non-zero or any property fails;
5. only after complete structural PASS, execute once each still-withheld authorised Section 19 static check;
6. stop without repair or rerun on any failed remaining static check;
7. append all direct results and withheld stages to the existing correction Evidence while preserving all three historical failures exactly;
8. perform the one authorised document-only validation against the completed Evidence;
9. stop.

The recorded focused `15/15`, adjacent `58/58`, typecheck PASS, and ESLint zero-error/seven-warning results remain historical Evidence. They must not be rerun or described as newly obtained results.

## 15. Failure and Stop Rule

Execution must stop without repair or rerun if:

1. either file identity differs;
2. the assertion cannot extract exactly the six-form type union;
3. it cannot inspect every parser-method regex literal;
4. it does not find exactly one vocabulary candidate whose alternatives equal the type union;
5. any Section 8 canonicalisation property cannot be mechanically proven;
6. any still-withheld Section 19 check fails;
7. production or test editing would be required;
8. compilation, executable validation, application behavior, Andy, real programme sources, the real manifest, or contribution Authority would be required;
9. any historical failure would need deletion, relabelling, or reinterpretation;
10. any document other than the existing correction Evidence would require modification during execution.

Any new failure remains Evidence. Fresh human Authority is required for later action.

## 16. MARC Finding

The latest stop was correct. Finding two regexes invalidated the instrument's method-wide cardinality assumption, and the failed run could not silently choose the intended matcher or continue.

The truthful next step is to preserve every failure and select the relationship matcher by the governed property it carries: exact vocabulary equality with the independently proven type domain.

**MARC finding:** `PRESERVE EVERY FAILURE; SELECT THE PARSER BY ITS EXACT VOCABULARY, NOT BY INCIDENTAL METHOD SHAPE`.

## 17. Cyril Finding

The current syntax tree provides a deterministic read-only selection procedure:

```text
StructuralObservation TypeAliasDeclaration
-> six-form verb UnionTypeNode
-> inspect every parseExplicitRelationship regex
-> extract alternative-set candidates
-> require exactly one candidate equal to the type union
-> use that equality as parser closure Evidence
```

The punctuation guard remains permitted because its regex structure does not produce the six-form candidate. No source-position assumption, whole-file count, compilation, or behavior execution is necessary.

**Cyril finding:** `EXACT ALTERNATIVE-SET EQUALITY SELECTS THE VOCABULARY MATCHER WITHOUT CONSTRAINING UNRELATED REGEXES`.

## 18. Strict Non-Consequences

This review does not authorise or perform:

1. any production or test edit;
2. Jest, adjacent-test, typecheck, ESLint, build, runtime, or Andy execution;
3. implementation repair, refactor, formatting, or parser change;
4. source-position parser selection or method-wide regex cardinality;
5. whole-file phrase counts as proof;
6. semantic change or another relationship form;
7. synonym, fuzzy, graph, chain, transitive, majority, source-count, date, rank, score, order, currentness, or Authority semantics;
8. reinterpretation of any historical failure as PASS;
9. refresh or promotion of historical executable results;
10. inspection of real programme sources, the real manifest, or contribution Authority;
11. contribution work;
12. implementation acceptance;
13. capability, programme-correctness, Formation-completion, production-readiness, certification, or contribution-readiness claims.

## 19. Exact Next Authorised Action

The next authorised action is:

> Read-only confirmation of both Section 12 SHA-256 identities, followed only on exact match by one TypeScript AST assertion that selects exactly one parser relationship-vocabulary candidate through extracted-alternative-set equality with the independently proven `StructuralObservation` six-form verb union and then proves every remaining Section 8 property.

No implementation or test edit may precede or follow that action under this Authority.

## 20. Stop State

`DOCUMENTATION-ONLY PARSER-VOCABULARY-SELECTION REVIEW COMPLETE - OUTCOME 1 - CONTINUATION AUTHORITY UNCONSUMED`

Review stops here.
