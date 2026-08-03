# Literal evidence

Here is the literal evidence. No constitutional, architectural, or reasoning change is justified. This remains a narrow evidence or file-discovery issue.

Literal runtime output:

```json
[
  {
    "repositoryRoot": "/Users/dean2/Projects/kitchen-mobile-clean",
    "absoluteFilePath": "/Users/dean2/Projects/kitchen-mobile-clean/constitution/README.md",
    "relativePath": "constitution/README.md",
    "retrievalSourcePath": "constitution/README.md",
    "examinationSourcePath": "constitution/README.md",
    "documentId": "constitution-README.md"
  },
  {
    "repositoryRoot": "/Users/dean2/Projects/kitchen-mobile-clean",
    "absoluteFilePath": "/Users/dean2/Projects/kitchen-mobile-clean/docs/architecture/CONSTITUTION.md",
    "relativePath": "docs/architecture/CONSTITUTION.md",
    "retrievalSourcePath": "docs/architecture/CONSTITUTION.md",
    "examinationSourcePath": "docs/architecture/CONSTITUTION.md",
    "documentId": "docs-architecture-CONSTITUTION.md"
  },
  {
    "repositoryRoot": "/Users/dean2/Projects/kitchen-mobile-clean",
    "absoluteFilePath": "/Users/dean2/Projects/kitchen-mobile-clean/docs/INSTITUTIONAL_OPERATING_MODEL.md",
    "relativePath": "docs/INSTITUTIONAL_OPERATING_MODEL.md",
    "retrievalSourcePath": "docs/INSTITUTIONAL_OPERATING_MODEL.md",
    "examinationSourcePath": "docs/INSTITUTIONAL_OPERATING_MODEL.md",
    "documentId": "docs-INSTITUTIONAL_OPERATING_MODEL.md"
  },
  {
    "repositoryRoot": "/Users/dean2/Projects/kitchen-mobile-clean",
    "absoluteFilePath": "/Users/dean2/Projects/kitchen-mobile-clean/docs/OPERATING_MODEL.md",
    "relativePath": "docs/OPERATING_MODEL.md",
    "retrievalSourcePath": "docs/OPERATING_MODEL.md",
    "examinationSourcePath": "docs/OPERATING_MODEL.md",
    "documentId": "docs-OPERATING_MODEL.md"
  },
  {
    "repositoryRoot": "/Users/dean2/Projects/kitchen-mobile-clean",
    "absoluteFilePath": "/Users/dean2/Projects/kitchen-mobile-clean/docs/theory/README.md",
    "relativePath": "docs/theory/README.md",
    "retrievalSourcePath": "docs/theory/README.md",
    "examinationSourcePath": "docs/theory/README.md",
    "documentId": "docs-theory-README.md"
  },
  {
    "repositoryRoot": "/Users/dean2/Projects/kitchen-mobile-clean",
    "absoluteFilePath": "/Users/dean2/Projects/kitchen-mobile-clean/constitution/01-THE-ACORN-EDITION.md",
    "relativePath": "constitution/01-THE-ACORN-EDITION.md",
    "retrievalSourcePath": "constitution/01-THE-ACORN-EDITION.md",
    "examinationSourcePath": "constitution/01-THE-ACORN-EDITION.md",
    "documentId": "constitution-01-THE-ACORN-EDITION.md"
  }
]
```

Exact integration-test assertions:

```ts
expect(results.length).toBeGreaterThan(0);
expect(results.some((doc) => doc.sourcePath.includes("/"))).toBe(true);

const duplicateReadmes = results.filter((doc) => doc.sourcePath.endsWith("/README.md") || doc.sourcePath.endsWith("/readme.md") || doc.sourcePath.endsWith("README.md") || doc.sourcePath.endsWith("readme.md"));
expect(duplicateReadmes.length).toBeGreaterThan(1);
expect(new Set(duplicateReadmes.map((doc) => doc.sourcePath)).size).toBe(duplicateReadmes.length);

const realPaths = results.map((doc) => doc.sourcePath);
expect(realPaths.some((sourcePath) => sourcePath === "constitution/README.md")).toBe(true);
expect(realPaths.some((sourcePath) => sourcePath === "docs/architecture/CONSTITUTION.md")).toBe(true);
expect(realPaths.some((sourcePath) => sourcePath === "docs/INSTITUTIONAL_OPERATING_MODEL.md")).toBe(true);
expect(realPaths.some((sourcePath) => sourcePath === "docs/OPERATING_MODEL.md")).toBe(true);
expect(realPaths.some((sourcePath) => sourcePath === "docs/theory/README.md")).toBe(true);
expect(realPaths.some((sourcePath) => sourcePath === "constitution/01-THE-ACORN-EDITION.md")).toBe(true);

const colleague = new AndyDigitalColleague();
const examination = colleague.runConstitutionalExamination("Andy, why do you exist?");
const examinationPaths = examination.retrievedDocuments.map((doc) => doc.sourcePath);

expect(examinationPaths.length).toBe(results.length);
expect(examinationPaths.every((sourcePath) => sourcePath.includes("/"))).toBe(true);
expect(examinationPaths.some((sourcePath) => sourcePath === "constitution/README.md")).toBe(true);
```

Exact test output:

```text
PASS  lib/academy/__tests__/repositoryKnowledgeService.test.ts
  RepositoryKnowledgeService
    ✓ filters to canonical constitutional artefacts and returns deterministic provenance (139 ms)
    ✓ propagates full provenance metadata through examination output and preserves duplicate basename paths (57 ms)
    ✓ uses the real repository root for provenance on the actual workspace scan (100 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        1.143 s
```
