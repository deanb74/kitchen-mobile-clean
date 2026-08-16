# HH-0000 Authored Record Metadata and Bounded-Claim Extraction Contract Review

**Status:** OUTCOME 1 - INTERNAL STRUCTURAL EXTRACTION CONTRACT APPROVED
**Review date:** 2026-08-12
**Review type:** Fresh documentation-only MARC and Cyril contract review
**Immediate controlling record:** `docs/formation/HH0000_BOUNDED_COMPARATIVE_UNDERSTANDING_IMPLEMENTATION_AUTHORITY_REVIEW.md`
**Implementation effect:** None
**Contribution effect:** None - Andy was not invoked and the approved real programme manifest was not inspected or assembled
**Authority effect:** No implementation Authority is granted; the existing contribution Authority remains unchanged and unconsumed

## 1. Governing Question

> What exact programme-neutral contract may convert supplied authored Markdown into attributable Observations of explicit metadata, bounded authored claims, explicit lifecycle/state language, and structural scope while preserving malformed, missing, conflicting, ambiguous, or interpretive material as unknown; and should extraction belong to the provider, Understanding, or a split responsibility?

The answer is a narrow internal structural-observation contract in the existing non-deliberative Understanding path. It observes only deterministic supplied syntax and exact authored boundaries. It does not interpret organisational meaning or require a provider, repository-interface, schema, package, or architecture change.

## 2. Controlling Dependency

The controlling Outcome 2 is settled:

> `IMPLEMENTATION AUTHORISABLE AFTER ONE NARROW DEPENDENCY IS RESOLVED`.

That dependency is a programme-neutral authored metadata and bounded-claim extraction contract. Current delivery supplies source identity, path, title, section, and text, but does not supply structured status, date, substantive scope, lifecycle state, or claim relationships.

This review resolves only how supplied structure may become attributable Observation. It does not form comparative Understanding, authorise implementation, or decide any real record's meaning.

## 3. Core Responsibility Boundary

The approved responsibility chain is:

```text
AUTHORED TEXT
    ↓
STRUCTURAL OBSERVATION
    ↓
UNDERSTANDING / INTERPRETATION
    ↓
INFERENCE
    ↓
JUDGEMENT
    ↓
HUMAN / AUTHORISED DECISION
```

Structural extraction may answer only:

1. what exact text was supplied;
2. where it appears within the supplied content;
3. which strict Markdown boundary contains it;
4. whether an exact label/value syntax is present;
5. whether an exact ISO date string is syntactically valid;
6. whether an exact relationship verb appears in one bounded claim.

It may not answer whether the text is true, authoritative, current, applicable, controlling, complete, validly superseding, or organisationally consequential.

For `**Status:** COMPLETE`, extraction may observe label `Status` and authored value `COMPLETE`. Understanding must decide what entity and scope the status concerns and whether it remains current. Judgement and human Authority retain every course and programme decision.

## 4. Structural Observation

A structural Observation is an immutable internal record derived without paraphrase from supplied `RetrievedDocument` fields and a strict subset of supplied Markdown syntax.

It must preserve:

1. source `id`;
2. canonical `sourcePath`;
3. supplied document `title`;
4. supplied `section` identity;
5. observation kind;
6. exact authored text;
7. deterministic block ordinal within the supplied text;
8. one-based start and end line within the supplied text;
9. heading lineage formed only from headings present in the supplied text;
10. optional exact label and authored value where strict label/value syntax is present;
11. structural validity or an explicit unknown reason.

Approved deterministic structures are:

1. ATX headings matching one to six leading `#` characters followed by whitespace and non-empty exact heading text;
2. explicit label/value lines using either `Label: value` or `**Label:** value`, with a non-empty label and value on the same line;
3. exact paragraphs bounded by blank lines or recognised block boundaries;
4. exact single-line unordered or ordered list items, preserving marker and text;
5. supplied source path, title, and section fields;
6. fenced code or malformed blocks as opaque authored text, never metadata or claims unless a later contract expressly permits it.

Heading lineage uses a stack of observed ATX heading levels. Missing parent levels do not get invented. Repeated headings remain distinct by ordinal and line location. Structure absent from the supplied text remains unknown even if it may have existed elsewhere in the original document.

## 5. Bounded Claim Contract

An attributable bounded claim is one exact paragraph, one exact single-line list item, or one exact label/value line from supplied authored text. It is not a summary or proposition asserted by Andy.

Each bounded claim requires:

1. structural Observation ID;
2. source ID and canonical path;
3. supplied section;
4. observed heading lineage;
5. exact authored text including meaningful inline Markdown;
6. block kind;
7. deterministic block ordinal;
8. one-based supplied-text line range;
9. optional exact label and authored value;
10. no paraphrase, confidence, truth classification, or inferred consequence.

Byte offsets are not required. Line range plus block ordinal is sufficient for the bounded internal use because the complete supplied text and source identity remain available. If line endings or content are transformed before extraction, exact-claim extraction must refuse rather than synthesise provenance.

Multi-line list items, tables, block quotes with nested structure, HTML blocks, and malformed fenced content are retained as exact opaque blocks or paragraphs. They do not receive a more specific claim kind unless the strict contract can identify the whole boundary without repair.

## 6. Metadata Contract

Metadata handling has four categories:

| Category | Meaning | Extraction consequence |
| --- | --- | --- |
| Structurally explicit | Strict label/value or provider field | Preserve as structured Observation |
| Textually explicit but unlabelled | Exact prose claim | Preserve as bounded claim; no metadata promotion |
| Inferential | Meaning requires interpretation or relationship formation | No metadata; defer to Understanding |
| Unknown | Missing, malformed, duplicate, conflicting, or unavailable | Preserve available raw text and explicit unknown reason |

Approved structured metadata is:

1. `STATUS` only from an exact case-insensitive label `Status`;
2. `DATE` only from exact case-insensitive labels `Date`, `Review date`, `Decision date`, `Execution date`, or `Effective date`;
3. `SCOPE` only from an exact case-insensitive label `Scope` with a non-empty same-line value;
4. `SECTION` from the supplied `section` field and observed heading boundaries;
5. `DOCUMENT TITLE` from the supplied `title` field and an observed first level-one heading when present, retained as separate observations if they differ;
6. `EXPLICIT RELATIONSHIP` only as a bounded relationship claim under Section 11;
7. `LIFECYCLE / STATE` only from exact case-insensitive labels `State` or `Lifecycle`, preserving the authored value without mapping.

Formatting delimiters may identify structure but are not part of label semantics. Exact authored label spelling and value are always retained. Unrecognised labels remain generic label/value Observations and bounded claims; they do not receive a governed metadata category.

## 7. Date Boundary

A structured date Observation requires:

1. an approved date label from Section 6;
2. exactly one non-empty authored value;
3. the complete value to match `YYYY-MM-DD`;
4. a real Gregorian calendar date when checked without timezone conversion.

The exact authored string is retained. No timezone, time-of-day, ordering, currentness, supersession, authority, priority, or control follows.

RFC 3339 timestamps, month names, slashed dates, shortened years, locale-dependent order, date ranges, and prose dates remain bounded authored values with structured date `UNKNOWN` under this contract. They may be perfectly intelligible to a human; the narrow extractor does not normalise them.

Malformed dates, impossible dates, empty values, and multiple plausible date fields remain unknown. Date order never resolves metadata conflict or record authority.

## 8. Status Boundary

An exact `Status` label/value line may produce a metadata Observation containing:

1. exact label;
2. exact authored value;
3. exact bounded claim and provenance;
4. no normalised status enum.

`Status: OUTCOME 2 - ...` remains that complete authored value. Extraction must not reduce it to complete, active, failed, accepted, or another universal category.

The Observation establishes only that the supplied source contains that labelled value at that location. It does not establish the status subject, organisational validity, present currentness, scope, authority, supersession, completion of another entity, or absence of unresolved work.

## 9. Scope Boundary

The supplied `section` field is a structural scope Observation only of the provider-delivered section identity. Observed headings provide structural containment within supplied text. An exact `Scope` label/value is also structurally observable.

Substantive scope usually requires Understanding. Extraction must not infer scope from:

1. filename or directory;
2. document title alone;
3. nearby headings beyond structural containment;
4. topic similarity;
5. retrieval question;
6. provider score or rank;
7. manifest inclusion or order;
8. omitted content.

Human selection means the material may be read. It is not an authored statement about substantive scope, relevance, authority, or truth.

## 10. Lifecycle / State Boundary

The prior contemplated values `complete`, `stopped`, `unresolved`, `active`, and `unknown` are not extraction enums under this contract.

Only exact `State` or `Lifecycle` label/value syntax becomes structured lifecycle metadata, and the authored value remains unnormalised. `State: STOPPED` is observed as label `State`, value `STOPPED`; it does not establish a universal lifecycle state outside the source's eventual interpreted scope.

Natural-language statements such as `This review stops here`, `No immediate dependency remains`, `The current target is X`, `X may now be reconsidered`, and `The programme appears ready for Y` are exact bounded claims only. Extraction must not translate verbs or adjectives into hidden state enums.

Understanding may later classify an explicit claim as evidence concerning completion, stopping, unresolved work, activity, possibility, or readiness while preserving the exact claim and uncertainty. That classification is interpretation, not extraction.

## 11. Explicit Relationship Boundary

A bounded claim may additionally be marked `EXPLICIT_RELATIONSHIP_CLAIM` only when one complete sentence or label value contains an explicit active or passive relationship using the exact verb forms:

1. `supersedes`;
2. `is superseded by`;
3. `replaces`;
4. `is replaced by`;
5. `amends`;
6. `is amended by`.

The extractor preserves the complete exact sentence, verb phrase, and literal subject/object text spans. It does not resolve references, verify identities, validate Authority, or decide applicability. If subject or object is absent, implicit, cross-paragraph, or syntactically ambiguous, the material remains a bounded claim with relationship structure `UNKNOWN`.

`Record A supersedes Record B` therefore supports only: the supplied source explicitly states those exact words. Understanding may report that attributable fact and separately assess scope, qualification, conflict, currentness, and validity. Andy must not collapse it into an owner-independent declaration that A supersedes B.

Implied sequence, later dates, similar titles, replacement-like prose without an approved explicit verb, and omission do not produce an explicit relationship Observation.

## 12. Malformed / Duplicate / Conflicting Material

Extraction is append-only and does not repair source text.

| Condition | Deterministic result |
| --- | --- |
| Missing label | No metadata Observation; requested metadata is `UNKNOWN` |
| Empty label or value | Preserve exact malformed line as bounded text; metadata `UNKNOWN` |
| Duplicate identical Status or other metadata | Preserve every Observation; aggregate value remains `UNKNOWN` with reason `duplicate-identical` |
| Duplicate conflicting values | Preserve every Observation; aggregate value `UNKNOWN` with reason `duplicate-conflicting` |
| Multiple date fields | Preserve each labelled value; no single document date selected |
| Malformed or ambiguous date | Preserve label/value claim; structured date `UNKNOWN` |
| Conflicting claims in one record | Preserve each claim; no extraction-level resolution |
| Malformed Markdown | Preserve recoverable exact lines/opaque blocks; do not repair or infer missing boundaries |
| Nested or repeated headings | Preserve each observed heading and ordinal; do not merge |
| Unrecognised label | Preserve generic label/value Observation; governed metadata category `UNKNOWN` |

Source order, date, filename, rank, score, or repetition never resolves ambiguity. Extraction issues are explicit observations about unavailable structure, not reasons to invent one value.

## 13. Provider vs Understanding Ownership

### Model A - Provider Extraction

Rejected. Providers own access, closure, delivery, and existing provenance. Requiring each provider to interpret Markdown into Observation objects would duplicate extraction, allow provider-specific semantics, widen the accepted provider contract, and risk human pre-interpretation in prepared inputs.

### Model B - Understanding Extraction

Approved. The provider returns verbatim authorised material with existing source identity and section provenance. The non-deliberative Understanding path performs the same deterministic structural observation for every provider. It then separately forms relationships, inference, uncertainty, and questions.

### Model C - Split

Not required. Existing delivery already carries source, path, title, section, and text. Additional provider heading/label boundaries would change the repository contract without improving responsibility. If a provider does not preserve line structure or supplies only a flattened fragment, internal extraction returns structure `UNKNOWN`; it does not demand reconstruction.

Model B cleanly preserves:

```text
provider = authorised access and verbatim delivery
Understanding = structural Observation, interpretation, relationships, and uncertainty
```

Structural Observation remains a pre-interpretive operation within Understanding formation. No new service is justified.

## 14. Human Pre-Interpretation Boundary

Human source selection may determine only:

1. which records and sections Andy may receive;
2. the supplied source identity and section boundary;
3. the one-use access consequence.

It must not inject:

1. normalised metadata not present in authored text;
2. summaries or claim classifications;
3. relationship conclusions;
4. supersession, currentness, authority, or priority;
5. lifecycle mapping;
6. expected interpretation.

The extractor operates on the verbatim material actually supplied. A human-created section bound is provenance about access, not an authored claim that the section governs the matter. Human selection grants access, not truth.

## 15. Genericity

The contract is domain-neutral. Its structures are source identity, Markdown headings, strict label/value lines, paragraphs, list items, exact dates, bounded claims, and explicit relationship verbs.

It applies equally to fictional engineering status notes, restaurant operating procedures, sports programme reviews, construction handovers, healthcare administrative guidance, and governance records.

It contains no HH-specific status, MARC/Cyril term, programme-orientation rule, milestone name, Formation rule, Case 001 concept, real record name, or approved-manifest path. Domain meaning remains in later Understanding.

## 16. Minimum Synthetic Falsifiers

A later neutral synthetic suite must falsify at least:

1. explicit `Status` label/value is preserved exactly;
2. explicit ISO `Date` label/value is preserved exactly and syntactically validated;
3. explicit `Scope` label/value is preserved exactly;
4. supplied section and observed heading identity are preserved;
5. exact paragraph claim and line provenance are preserved;
6. exact single-line list-item claim and marker are preserved;
7. missing Status yields no value and explicit unknown;
8. empty Status preserves raw text and yields unknown;
9. duplicate identical Status preserves both and selects neither;
10. duplicate conflicting Status preserves both and selects neither;
11. malformed or impossible date remains authored text plus unknown date;
12. ambiguous human date remains authored text plus unknown date;
13. multiple date fields remain separate with no selected current date;
14. prose that sounds like status but is not labelled remains a bounded claim only;
15. explicit `A supersedes B` is preserved as an attributable relationship claim without validation;
16. implied but unstated supersession produces no relationship Observation;
17. `work stops here` prose remains a bounded claim and does not become state metadata;
18. explicit `State: STOPPED` preserves the authored label/value without universal enum mapping;
19. conflicting claims inside one document remain separate and unresolved;
20. malformed Markdown is not repaired or promoted;
21. an unrecognised metadata label remains generic and governed metadata unknown;
22. source order does not resolve ambiguity;
23. newer date does not resolve ambiguity, currentness, or authority;
24. provider rank or score does not resolve ambiguity;
25. omitted metadata remains unknown;
26. flattened text without deterministic line/block structure refuses structural metadata extraction;
27. repeated headings remain distinct by ordinal and line location;
28. provider and observed title disagreement preserves both without selecting one;
29. exact text is never paraphrased during extraction;
30. no real programme source is loaded or named by the fixture.

## 17. MARC Finding

Before interpretation, a human colleague may fairly say: `I can see this page contains the label Status with the value X`, `I can see this sentence says the review stops here`, or `I can see this source explicitly says A supersedes B`.

The colleague may not leap from those observations to `X is current organisational truth`, `the whole programme has stopped`, or `A validly supersedes B`. Those require Context, scope, authority, relationship formation, and human decision where unresolved.

The approved contract prefers exact language and visible unknowns over false precision. It avoids burdening the colleague with machine-specific metadata while preventing software from disguising interpretation as page reading.

**MARC finding:** `THE CONTRACT CAPTURES ONLY WHAT A COLLEAGUE CAN LITERALLY POINT TO ON THE SUPPLIED PAGE AND PRESERVES MEANING FOR UNDERSTANDING`.

## 18. Cyril Finding

Current `RepositoryDocument` and `RetrievedDocument` already preserve source ID, path, title, section, and text. The accepted closed provider can preserve verbatim line structure. A strict internal line/block extractor can observe a deliberately small Markdown subset without a general Markdown AST.

This is not an unsafe heuristic because:

1. accepted syntax is exact and finite;
2. output always retains authored text and provenance;
3. unrecognised or ambiguous structure becomes unknown;
4. no prose-to-status or status-to-consequence mapping occurs;
5. extraction never chooses among duplicates or conflicts;
6. providers do not acquire semantic responsibility;
7. flattened or malformed input fails closed rather than being reconstructed.

No repository interface, public type, schema, package dependency, general Markdown infrastructure, provider change, or new service is required. Internal types and functions may remain private to `AndyDigitalColleague.ts` under a later Authority.

**Cyril finding:** `STRICT INTERNAL STRUCTURAL OBSERVATION IS SUFFICIENT; EXISTING DELIVERY RETAINS THE REQUIRED INPUT WITHOUT CONTRACT EXPANSION`.

## 19. Combined Outcome

**OUTCOME 1 - INTERNAL STRUCTURAL EXTRACTION CONTRACT APPROVED**

Model B is selected. Deterministic extraction belongs inside existing non-deliberative Understanding formation. The provider remains responsible only for authorised verbatim delivery and existing provenance. Understanding first creates structural Observations, then separately forms interpretation, Inference, uncertainty, relationships, and human-decision questions.

The single extraction dependency from the controlling implementation Authority review is resolved at documentation level. No implementation Authority follows automatically.

## 20. Exact Contract Approved / Withheld

**Approved contract:**

1. strict internal structural Observation from supplied source fields and preserved Markdown line/block syntax;
2. exact provenance, authored text, block ordinal, and supplied-text line location;
3. approved label categories and strict ISO date validation;
4. bounded paragraph, single-line list-item, and label/value claims;
5. exact explicit relationship-claim verbs without validity inference;
6. append-only duplicate/conflict preservation and fail-closed unknowns;
7. Understanding ownership of all interpretation and relationship consequence.

**Withheld:**

1. general Markdown parsing or AST infrastructure;
2. semantic prose classification during extraction;
3. universal status or lifecycle enums;
4. date normalisation beyond strict valid `YYYY-MM-DD`;
5. provider-created Observation, interpretation, or metadata enrichment;
6. repository or public interface changes;
7. source repair, duplicate resolution, conflict resolution, authority ranking, or currentness selection;
8. implementation, tests, Andy invocation, source access, contribution, or programme decision.

## 21. Implementation Consequence

The previous conditional two-file implementation envelope remains valid:

1. modify `lib/academy/AndyDigitalColleague.ts` only;
2. add `lib/academy/__tests__/boundedComparativeUnderstanding.test.ts` only.

No change is required to repository service, provider contract, public Academy types, generic Understanding types, Memory, Reflection, Authority, schema, dependencies, or architecture.

This record does not activate that envelope. A fresh implementation Authority reconsideration must compare its exact proposed internal extractor and neutral fixtures against this contract before any edit.

## 22. Exact Non-Consequences

This review does not:

1. modify production, tests, contracts, schemas, dependencies, or architecture;
2. grant implementation or test Authority;
3. invoke Andy or execute synthetic or real input;
4. inspect, assemble, or reinterpret the approved real programme manifest;
5. amend, replace, consume, or revive contribution Authority;
6. create a provider, contribution record, Memory, Reflection, Learning, feedback, or follow-on;
7. establish a universal Markdown, metadata, status, lifecycle, or relationship standard;
8. classify any real record, status, date, scope, claim, lifecycle state, or relationship;
9. authorise programme reconciliation, supersession, priority, recommendation, Action, or founder-intent inference;
10. reopen Context Door, Case 001, C18, Formation, or accepted source delivery.

## 23. Smallest Justified Next Question

> With the internal structural extraction contract now approved, may one fresh bounded implementation Authority activate the existing two-file envelope to add strict internal structural Observation, non-deliberative comparative Understanding formation, and bounded rendering under the complete neutral falsifier and no-persistence boundaries already recorded?

This question is identified only. It does not grant implementation, tests, execution, source access, contribution, or amendment of existing Authority.

Extraction contract review stops here.