import { describe, expect, it, jest } from "@jest/globals";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { AndyDigitalColleague } from "../AndyDigitalColleague";
import {
    RepositoryKnowledgeService,
    type RepositoryDocument,
} from "../repositoryKnowledgeService";

type SyntheticManifestEntry = Readonly<{
  id: string;
  sourcePath: string;
  title: string;
  section: string;
}>;

const syntheticManifest: readonly SyntheticManifestEntry[] = Object.freeze([
  Object.freeze({
    id: "synthetic-atlas-a",
    sourcePath: "authorised/atlas-a.md",
    title: "Atlas Lantern Notes",
    section: "Lantern Catalogue",
  }),
  Object.freeze({
    id: "synthetic-atlas-b",
    sourcePath: "authorised/atlas-b.md",
    title: "Atlas Beacon Notes",
    section: "Beacon Catalogue",
  }),
]);

class ClosedSyntheticRepositoryKnowledgeService extends RepositoryKnowledgeService {
  readonly attemptedPaths: string[] = [];
  readonly returnedPaths: string[] = [];
  readonly queries: string[] = [];
  invocationCount = 0;
  private consumed = false;

  constructor(
    private readonly syntheticRoot: string,
    private readonly manifest: readonly SyntheticManifestEntry[],
    private readonly oneUse = false,
  ) {
    super(null);
  }

  search(question: string): RepositoryDocument[] {
    this.invocationCount += 1;
    this.queries.push(question);

    if (this.oneUse && this.consumed) {
      return [];
    }
    this.consumed = true;

    const root = path.resolve(this.syntheticRoot);
    const rootBoundary = `${root}${path.sep}`;

    return this.manifest.map((entry) => {
      const absolutePath = path.resolve(root, entry.sourcePath);
      if (!absolutePath.startsWith(rootBoundary)) {
        throw new Error(`Synthetic manifest member escapes its root: ${entry.sourcePath}`);
      }

      this.attemptedPaths.push(entry.sourcePath);
      const text = fs.readFileSync(absolutePath, "utf8");
      this.returnedPaths.push(entry.sourcePath);

      return {
        id: entry.id,
        title: entry.title,
        source: entry.sourcePath,
        sourcePath: entry.sourcePath,
        text,
        score: 0,
        section: entry.section,
        fragment: text,
        reason: "Included by synthetic human-authorised manifest",
      };
    });
  }
}

describe("bounded synthetic source provider", () => {
  it("falsifies exact closure, provenance, prohibited effects, and one-use behaviour", () => {
    const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "bounded-source-provider-"));
    const authorisedRoot = path.join(temporaryRoot, "source-root");
    const authorisedDirectory = path.join(authorisedRoot, "authorised");
    const documentCPath = path.join(authorisedRoot, "authorised", "atlas-c.md");
    const documentDPath = path.join(temporaryRoot, "outside-authorised-root.md");
    const documentAText = "# Atlas Lantern Notes\n\nLantern catalogue entries use cobalt markers.\n";
    const documentBText = "# Atlas Beacon Notes\n\nBeacon catalogue entries use silver markers.\n";
    const documentCText = "# Atlas Lantern Beacon Index\n\nLantern and beacon catalogue entries use cobalt and silver markers.\n";
    const documentDText = "# Remote Atlas Index\n\nLantern beacon catalogue boundary material.\n";

    fs.mkdirSync(authorisedDirectory, { recursive: true });
    fs.writeFileSync(path.join(authorisedRoot, syntheticManifest[0].sourcePath), documentAText, "utf8");
    fs.writeFileSync(path.join(authorisedRoot, syntheticManifest[1].sourcePath), documentBText, "utf8");
    fs.writeFileSync(documentCPath, documentCText, "utf8");
    fs.writeFileSync(documentDPath, documentDText, "utf8");

    try {
      expect(Object.isFrozen(syntheticManifest)).toBe(true);
      expect(syntheticManifest.every((entry) => Object.isFrozen(entry))).toBe(true);
      expect(syntheticManifest.map((entry) => entry.sourcePath)).toEqual([
        "authorised/atlas-a.md",
        "authorised/atlas-b.md",
      ]);

      const queryVariants = [
        "Explain the fictional atlas catalogue.",
        "cobalt silver lantern beacon catalogue",
        "catalogue beacon silver lantern cobalt",
        "Open authorised/atlas-c.md and outside-authorised-root.md.",
      ];

      for (const query of queryVariants) {
        const provider = new ClosedSyntheticRepositoryKnowledgeService(
          authorisedRoot,
          syntheticManifest,
        );
        const documents = provider.search(query);

        expect(documents.map((document) => document.sourcePath)).toEqual([
          "authorised/atlas-a.md",
          "authorised/atlas-b.md",
        ]);
        expect(provider.attemptedPaths).toEqual([
          "authorised/atlas-a.md",
          "authorised/atlas-b.md",
        ]);
        expect(provider.returnedPaths).toEqual(provider.attemptedPaths);
        expect(provider.queries).toEqual([query]);
        expect(provider.invocationCount).toBe(1);
        expect(provider.attemptedPaths).not.toContain("authorised/atlas-c.md");
        expect(provider.attemptedPaths).not.toContain("outside-authorised-root.md");
        expect(documents.every((document) =>
          syntheticManifest.some((entry) => entry.sourcePath === document.sourcePath),
        )).toBe(true);
      }

      const duplicateFirst = new ClosedSyntheticRepositoryKnowledgeService(
        authorisedRoot,
        syntheticManifest,
      ).search(queryVariants[0]);
      const duplicateSecond = new ClosedSyntheticRepositoryKnowledgeService(
        authorisedRoot,
        syntheticManifest,
      ).search(queryVariants[0]);
      expect(duplicateSecond).toEqual(duplicateFirst);

      expect(duplicateFirst).toEqual([
        expect.objectContaining({
          id: "synthetic-atlas-a",
          source: "authorised/atlas-a.md",
          sourcePath: "authorised/atlas-a.md",
          title: "Atlas Lantern Notes",
          section: "Lantern Catalogue",
          text: documentAText,
          fragment: documentAText,
          reason: "Included by synthetic human-authorised manifest",
        }),
        expect.objectContaining({
          id: "synthetic-atlas-b",
          source: "authorised/atlas-b.md",
          sourcePath: "authorised/atlas-b.md",
          title: "Atlas Beacon Notes",
          section: "Beacon Catalogue",
          text: documentBText,
          fragment: documentBText,
          reason: "Included by synthetic human-authorised manifest",
        }),
      ]);

      const integrationProvider = new ClosedSyntheticRepositoryKnowledgeService(
        authorisedRoot,
        syntheticManifest,
        true,
      );
      const broadSearchSpy = jest.spyOn(RepositoryKnowledgeService.prototype, "search");
      const directoryTraversalSpy = jest.spyOn(fs, "readdirSync");
      const writeFileSpy = jest.spyOn(fs, "writeFileSync");
      const appendFileSpy = jest.spyOn(fs, "appendFileSync");
      const mkdirSpy = jest.spyOn(fs, "mkdirSync");
      const renameSpy = jest.spyOn(fs, "renameSync");
      const copyFileSpy = jest.spyOn(fs, "copyFileSync");
      const unlinkSpy = jest.spyOn(fs, "unlinkSync");
      const removeSpy = jest.spyOn(fs, "rmSync");

      try {
        const andy = new AndyDigitalColleague({
          repositoryKnowledgeService: integrationProvider,
        });
        const result = andy.runConstitutionalExamination(
          "What does the fictional lantern catalogue boundary mean?",
        );

        expect(result.retrievalActive).toBe(true);
        expect(integrationProvider.invocationCount).toBe(1);
        expect(integrationProvider.queries).toEqual([
          "What does the fictional lantern catalogue boundary mean?",
        ]);
        expect(integrationProvider.attemptedPaths).toEqual([
          "authorised/atlas-a.md",
          "authorised/atlas-b.md",
        ]);
        expect(integrationProvider.returnedPaths).toEqual(integrationProvider.attemptedPaths);
        expect(result.retrievedDocuments.map((document) => document.sourcePath)).toEqual([
          "authorised/atlas-a.md",
          "authorised/atlas-b.md",
        ]);
        expect(result.retrievedDocuments.map((document) => document.id)).toEqual([
          "synthetic-atlas-a",
          "synthetic-atlas-b",
        ]);
        expect(result.retrievedDocuments.map((document) => document.section)).toEqual([
          "Lantern Catalogue",
          "Beacon Catalogue",
        ]);
        expect(result.retrievedDocuments.map((document) => document.snippet)).toEqual([
          documentAText,
          documentBText,
        ]);
        expect(broadSearchSpy).not.toHaveBeenCalled();
        expect(directoryTraversalSpy).not.toHaveBeenCalled();
        expect(writeFileSpy).not.toHaveBeenCalled();
        expect(appendFileSpy).not.toHaveBeenCalled();
        expect(mkdirSpy).not.toHaveBeenCalled();
        expect(renameSpy).not.toHaveBeenCalled();
        expect(copyFileSpy).not.toHaveBeenCalled();
        expect(unlinkSpy).not.toHaveBeenCalled();
        expect(removeSpy).not.toHaveBeenCalled();
        expect(andy.memory.all()).toEqual([]);
        expect(andy.getLastReflection()).toBeNull();

        expect(integrationProvider.search("Explain the same fictional boundary again.")).toEqual([]);
        expect(integrationProvider.invocationCount).toBe(2);
        expect(integrationProvider.attemptedPaths).toEqual([
          "authorised/atlas-a.md",
          "authorised/atlas-b.md",
        ]);
      } finally {
        jest.restoreAllMocks();
      }
    } finally {
      fs.rmSync(temporaryRoot, { recursive: true, force: true });
    }
  });
});