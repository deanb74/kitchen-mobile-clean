# Formation Inheritance Audit

## Scope

This audit examines the formation sequence from 000 through 011 and the related understanding-journey documents to answer whether Andy currently inherits them as a deliberate curriculum rather than merely as searchable repository content.

## Evidence basis

- Repository inventory of the formation directory under [docs/formation/00-formation](docs/formation/00-formation)
- Generated knowledge index in [knowledge_index.md](knowledge_index.md)
- Runtime retrieval implementation in [lib/academy/repositoryKnowledgeService.ts](lib/academy/repositoryKnowledgeService.ts)
- Runtime execution path in [lib/academy/AndyDigitalColleague.ts](lib/academy/AndyDigitalColleague.ts)
- Fresh runtime verification with tsx against prompts such as "Why do you exist?", "What is understanding?", "What is a person?", and "Who am I?"

## Executive conclusion

No. Andy does not currently know the full formation sequence from 000 through 011 as an inherited curriculum.

The documents are present in the repository and are indexed by the generated knowledge index, but they are not part of the runtime retrieval path that Andy uses for constitutional or formation-style questions. The repository service explicitly excludes documents under the formation subtree, and the runtime retrieval runs did not surface any formation conversation documents.

## Answers to the audit questions

### 1. Does Andy know every Conversation/Understanding Journey from 000 through 011?

Not in the current runtime sense.

- The formation documents are present and indexed.
- The runtime retrieval service does not return them.
- The runtime did not retrieve them for prompts that should have engaged them.
- There is therefore no evidence that Andy is currently inheriting that curriculum as a deliberate formation sequence.

### 2. Are there duplicate IDs or filenames that affect retrieval?

Yes, there are duplicate numeric prefixes that create ambiguity for human and future automated curriculum ingestion.

Examples:
- Formation folder contains both [docs/formation/00-formation/001-CONVERSATION-WHO-AM-I.md](docs/formation/00-formation/001-CONVERSATION-WHO-AM-I.md) and [docs/formation/00-formation/001-YOUR-FIRST-DAY.md](docs/formation/00-formation/001-YOUR-FIRST-DAY.md)
- Understanding journeys contain multiple 001-based documents, including [docs/understanding-journeys/001-WHY-DIGITAL-COLLEAGUES.md](docs/understanding-journeys/001-WHY-DIGITAL-COLLEAGUES.md), [docs/understanding-journeys/humanity/001-THE-FIRST-CONVERSATION.md](docs/understanding-journeys/humanity/001-THE-FIRST-CONVERSATION.md), and several validation files under [docs/understanding-journeys/validation](docs/understanding-journeys/validation)

Those duplicates do not currently break retrieval because the runtime filter excludes formation documents before any ranking occurs, but they would create ambiguity if a future curriculum import assumed a single canonical document per number.

### 3. Which formation documents are present, indexed, retrievable, retrieved in runtime, and inherited?

| Formation Doc | Present | Indexed | Retrievable by runtime | Retrieved in runtime | Inherited |
| --- | ---: | ---: | ---: | ---: | ---: |
| 000 | ✓ | ✓ | ✗ | ✗ | ✗ |
| 001 (Conversation) | ✓ | ✓ | ✗ | ✗ | ✗ |
| 001 (Other) | ✓ | ✓ | ✗ | ✗ | ✗ |
| 002 | ✓ | ✓ | ✗ | ✗ | ✗ |
| 003 | ✓ | ✓ | ✗ | ✗ | ✗ |
| 004 | ✓ | ✓ | ✗ | ✗ | ✗ |
| 005 | ✓ | ✓ | ✗ | ✗ | ✗ |
| 006 | ✓ | ✓ | ✗ | ✗ | ✗ |
| 007 | ✓ | ✓ | ✗ | ✗ | ✗ |
| 008 | ✓ | ✓ | ✗ | ✗ | ✗ |
| 009 | ✓ | ✓ | ✗ | ✗ | ✗ |
| 010 | ✓ | ✓ | ✗ | ✗ | ✗ |
| 011 | ✓ | ✓ | ✗ | ✗ | ✗ |

### 4. Does the retrieval/ranking system favour later architecture documents over the original formation conversations?

Yes.

The current ranking path is biased toward constitution and architecture material.

Evidence:
- The retrieval service explicitly excludes documents whose path contains "formation".
- The scoring logic adds strong weight for constitution and architecture-related sources.
- The live runtime retrieval returned constitution, operating-model, and theory-library documents for formation-related prompts rather than the formation conversations.

### 5. Does Andy's runtime deliberately study the formation conversations, or are they just available as searchable documents?

They are currently available as searchable repository content and as entries in the generated knowledge index, but they are not deliberately studied by Andy's runtime.

The current runtime path does not include a curriculum step that loads the formation conversations as a structured sequence, and the repository retrieval filter prevents them from participating in ordinary runtime retrieval.

## Understanding journeys

The understanding-journey documents from 000 through 010 are also present and indexed, but they are not being used by the runtime retrieval path in the way the formation sequence would require. They appear to be available as documentation and index entries rather than as an inherited curriculum.

## Bottom line

The repository contains the formation curriculum and the generated index knows about it, but Andy's current runtime does not inherit it as a live formation sequence. The current architecture is therefore more accurately described as "repository-available" than "formation-inherited".
