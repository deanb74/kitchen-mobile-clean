# HH-0000 Knowledge Generation Pipeline Review

**Status:** OUTCOME 1 - KNOWLEDGE GENERATION PIPELINE REVIEWED CONCEPTUALLY; NO PIPELINE CHANGE MADE
**Review date:** 2026-08-15
**Review type:** Documentation-only pipeline review
**Scope:** `package.json`, `scripts/knowledge/build-knowledge.mjs`, generator-owned output declarations, output timestamps, repository paths, and execution assumptions
**Code changed:** No
**Generated outputs changed:** No
**Source documents changed:** No
**New concepts created:** No
**Implementation created:** No
**Capability claim created:** No
**Acceptance performed:** No

# Repository Traceability

**Principle:** Truth before certainty; preserve `UNKNOWN`; smallest justified change.
**Theory:** The knowledge generator is intended to scan repository Markdown files, derive titles, headings, and concept associations, and write four root-level generated records. The observed output state does not fully match that intended behaviour, so the cause remains unresolved.
**Architecture:** Not Applicable. This review does not redesign the pipeline or create a knowledge architecture.
**Engineering:** Read-only inspection of the existing package script, generator source, output ownership statements, paths, and timestamps.
**Milestone:** Not Applicable.
**Evidence:** The inspected source files and observed output contents/timestamps. No fix or successful refresh is claimed.

## 1. Purpose and Strict Boundary

This review examines why the current knowledge outputs did not visibly refresh after the HH0000 register reconciliation.

It does not:

- modify code;
- modify generated outputs;
- modify source documents;
- fix the generator;
- redesign the pipeline;
- add metadata;
- create a knowledge model;
- create implementation;
- create capability claims;
- create acceptance.

```text
TRUTH_BEFORE_CERTAINTY
UNKNOWN_REMAINS_UNKNOWN
SMALLEST_JUSTIFIED_CHANGE
```

## 2. Confirmed Findings

### 2.1 Knowledge script entry point

`package.json` defines both:

```text
knowledge = node scripts/knowledge/build-knowledge.mjs
docs = node scripts/knowledge/build-knowledge.mjs
```

The knowledge script is therefore intended to invoke the existing generator at `scripts/knowledge/build-knowledge.mjs`.

### 2.2 Intended repository root

The generator derives its project root from its own module location:

```text
scriptDirectory = directory of build-knowledge.mjs
projectRoot = path.resolve(scriptDirectory, "../..")
scanRoot = projectRoot
```

For the repository layout inspected, this resolves to the workspace root:

```text
/Users/helpinghand/Projects/kitchen-mobile-clean
```

The generator does not use the invoking working directory to discover the repository root.

### 2.3 Intended input files

The generator’s `walk()` function recursively scans `scanRoot` for files whose names end in `.md`, case-insensitively.

It excludes these directories:

```text
.git
.expo
.next
.turbo
.vercel
node_modules
dist
build
coverage
android
ios
repo-sweep
```

It excludes this filename:

```text
UNDERSTANDING-JOURNEYS-COMPLETE-BUNDLE.md
```

It also filters `knowledge_index.md` out of the Markdown document list after scanning.

Therefore the intended input set is:

```text
ALL_REPOSITORY_MARKDOWN_FILES_UNDER_PROJECT_ROOT
MINUS_EXCLUDED_DIRECTORIES
MINUS_EXCLUDED_FILENAME
MINUS_KNOWLEDGE_INDEX_OUTPUT
```

### 2.4 Actual read behaviour stated by the code

For every selected Markdown file, the generator reads the complete UTF-8 content with `fs.readFile`.

It derives:

- the repository-relative path;
- the first level-one heading as the title, or a humanised filename when no level-one heading exists;
- Markdown headings and their source lines;
- concept matches from the title, humanised filename, relative path, headings, and complete document content.

The concept vocabulary is a fixed list in the generator source. It includes terms such as Formation, Understanding, Learning, Reflection, Mentoring, MARC, and Digital Colleague.

### 2.5 Generated output paths

The generator declares four root-level output files:

```text
md_inventory.txt
md_headers.txt
hh_headers.txt
knowledge_index.md
```

They are written using `path.join(projectRoot, ...)`, so their intended locations are:

```text
/Users/helpinghand/Projects/kitchen-mobile-clean/md_inventory.txt
/Users/helpinghand/Projects/kitchen-mobile-clean/md_headers.txt
/Users/helpinghand/Projects/kitchen-mobile-clean/hh_headers.txt
/Users/helpinghand/Projects/kitchen-mobile-clean/knowledge_index.md
```

### 2.6 Output ownership

`knowledge_index.md` states:

```text
This index must not be edited manually. Regenerate it with:
npm run knowledge
```

The generator source writes all four output files directly. The outputs are therefore generator-owned records, not canonical source documents.

### 2.7 Intended output contents

The generator builds:

- `md_inventory.txt`: repository-relative paths, extracted titles, and heading counts;
- `md_headers.txt`: repository-relative paths and extracted headings with line numbers;
- `hh_headers.txt`: concept-matching headings only;
- `knowledge_index.md`: fixed concept sections linking matched document titles and paths, plus unmatched documents.

No output builder in the inspected code copies document status, register classification, controlling-input relationships, evidence state, or `UNKNOWN` boundaries into the generated records.

## 3. Observed Gaps

### 3.1 Output timestamps are inconsistent

The inspected output headers showed:

```text
md_inventory.txt: Generated 2026-08-10T15:07:11.592Z
md_headers.txt: Generated 2026-08-10T15:07:11.593Z
hh_headers.txt: Generated 2026-08-10T15:07:11.596Z
knowledge_index.md: Generated 2026-08-10T15:07:11.749Z
```

After the later generator attempts, `hh_headers.txt` showed a newer 2026-08-15 timestamp while the other three inspected outputs still showed the 2026-08-10 snapshot.

This proves that the observed output state is not uniformly refreshed.

### 3.2 New HH0000 documents are absent from the inspected stale outputs

The seven completed HH0000 review records were not found in the inspected `knowledge_index.md`, `md_inventory.txt`, or `md_headers.txt` snapshots.

This is consistent with those outputs being generated before the documents were created, but the inspected evidence does not establish why later generator attempts failed to update all outputs.

### 3.3 Generator completion was not established

The attempted `npm run knowledge` and direct generator invocations did not produce a reliable, captured completion result in the inspected session context.

The output files also did not uniformly change afterward.

Therefore a successful complete generation run is not established.

### 3.4 No failure cause is established

The generator source contains a catch block that would print `Knowledge pipeline failed.` and set a nonzero exit code on failure. The observed session did not provide a reliable captured error message identifying a failure cause.

Possible causes remain unverified. This review does not choose among them.

## 4. Unknowns

```text
UNKNOWN_EXECUTION_EXIT_STATUS_FOR_THE_RELEVANT_RUN
UNKNOWN_TERMINAL_WORKING_DIRECTORY_FOR_THE_RELEVANT_RUN
UNKNOWN_WHY_ONLY_SOME_OUTPUTS_SHOW_A_NEWER_TIMESTAMP
UNKNOWN_WHETHER_ALL_OUTPUT_WRITES_COMPLETED
UNKNOWN_WHETHER_OUTPUTS_WERE_REPLACED_OR_RETAINED_BY_EXTERNAL_STATE
UNKNOWN_WHY_NEW_HH0000_DOCUMENTS_WERE_NOT_OBSERVED_IN_THE_INDEX
UNKNOWN_WHO_OR_WHAT_LAST_WROTE_EACH_OUTPUT
UNKNOWN_GENERATOR_RUNTIME_ENVIRONMENT
```

The generator source alone cannot resolve these runtime unknowns.

## 5. Is Stale Output an Execution Issue or Expected Behaviour?

The intended code behaviour is to rescan the repository and rewrite the generated outputs on each successful invocation. The outputs are not described as append-only or intentionally delayed.

Therefore, based on the source code:

```text
STALE_OUTPUT_AFTER_SUCCESSFUL_COMPLETE_RUN = NOT_EXPECTED
```

However, the repository evidence does not establish that a successful complete run occurred after the HH0000 documents and register entries were added.

The most accurate current conclusion is:

```text
STALE_OUTPUT = OBSERVED
EXPECTED_BEHAVIOUR_AFTER_SUCCESS = REWRITE_OUTPUTS
SUCCESSFUL_COMPLETE_RUN = UNKNOWN
ROOT_CAUSE = UNKNOWN
```

This leaves the issue at the boundary between an execution problem and an unverified run, rather than proving a generator defect.

## 6. Execution Assumptions Visible in the Generator

The generator assumes:

- the script is located at `scripts/knowledge/build-knowledge.mjs`;
- two parent traversals from that script directory reach the repository root;
- the repository root is readable;
- all selected Markdown files are readable as UTF-8;
- output files at the repository root are writable;
- excluded directories and filename are sufficient for the intended scan scope;
- the fixed concept vocabulary is sufficient for concept matching;
- extracted first-level headings are adequate titles where present;
- generated output writes complete successfully through `Promise.all`.

These are source-level assumptions observed in the code, not verified runtime facts for the failed refresh attempts.

## 7. Recommended Future Attention

- Establish a captured exit status and complete stdout/stderr transcript for the canonical generator command.
- Confirm the actual workspace path used by the execution that is considered authoritative.
- Compare all four output timestamps after one verified complete run.
- Confirm that the output files contain the current HH0000 documents after such a run.
- Preserve the distinction between generator-owned discovery records and canonical source documents.
- Do not treat stale output as evidence that source documents are absent or that their meaning is unresolved.

These are areas requiring attention, not fixes or redesign proposals.

## 8. Preserved Boundaries

```text
NO_CODE_CHANGES=true
NO_SOURCE_DOCUMENT_CHANGES=true
NO_NEW_CONCEPTS=true
NO_IMPLEMENTATION=true
NO_CAPABILITY_CLAIMS=true
NO_ACCEPTANCE=true
UNKNOWN_REMAINS_UNKNOWN=true
```

```text
TRUTH_BEFORE_CERTAINTY
SMALLEST_JUSTIFIED_CHANGE
GENERATOR_OUTPUTS != CANONICAL_SOURCE_DOCUMENTS
STALE_OUTPUT != PROVEN_SOURCE_ABSENCE
```

## 9. Outcome and Stop

The generator is intended to scan repository Markdown files from a module-derived project root and write four generator-owned records at the repository root. The source code supports that reading.

The observed generated outputs are stale or inconsistently refreshed after the HH0000 reconciliation. A successful complete generation run and the cause of the stale state remain unverified.

```text
OUTCOME: KNOWLEDGE_GENERATION_PIPELINE_REVIEWED_CONCEPTUALLY
ROOT_CAUSE: UNKNOWN
NO_CODE_CHANGES=true
NO_SOURCE_DOCUMENT_CHANGES=true
NO_NEW_CONCEPTS=true
NO_IMPLEMENTATION=true
NO_CAPABILITY_CLAIMS=true
NO_ACCEPTANCE=true
UNKNOWN_REMAINS_UNKNOWN=true
```

The review stops here.
