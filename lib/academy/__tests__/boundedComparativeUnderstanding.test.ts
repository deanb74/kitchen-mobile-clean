import { describe, expect, it } from "@jest/globals";
import { AndyDigitalColleague } from "../AndyDigitalColleague";
import type { RetrievedDocument } from "../academyTypes";
import {
    RepositoryKnowledgeService,
    type RepositoryDocument,
} from "../repositoryKnowledgeService";

type ObservationView = {
  id: string;
  sourceId: string;
  sourcePath: string;
  title: string;
  section: string;
  kind: string;
  exactText: string;
  blockOrdinal: number;
  startLine: number;
  endLine: number;
  headingLineage: string[];
  label?: string;
  value?: string;
  metadataCategory?: string;
  structurallyValid: boolean;
  unknownReason?: string;
  explicitRelationship?: {
    verb: string;
    subject: string;
    object: string;
  };
};

type ExtractionView = {
  observations: ObservationView[];
  metadata: Record<"status" | "date" | "scope" | "state", {
    status: "known" | "unknown";
    observationIds: string[];
    value?: string;
    reason?: string;
  }>;
  exactTextAvailable: boolean;
};

type ComparativeView = {
  observations: ObservationView[];
  relationships: Array<{
    id: string;
    kind: string;
    statement: string;
    observationIds: string[];
    direct: boolean;
    inferenceBasis?: string;
    uncertainty?: string;
  }>;
  inferences: Array<{
    id: string;
    statement: string;
    supportingObservationIds: string[];
    basis: string;
    uncertainty: string;
  }>;
  uncertainty: string[];
  humanDecisionQuestions: Array<{
    id: string;
    unresolvedRelationshipId: string;
    question: string;
    reason: string;
  }>;
};

type PrivateAndy = {
  extractStructuralObservations(document: RetrievedDocument): ExtractionView;
  formComparativeUnderstanding(documents: RetrievedDocument[]): ComparativeView;
  isComparativeUnderstandingRequest(statement: string): boolean;
};

function makeRetrievedDocument(
  id: string,
  text: string,
  overrides: Partial<RetrievedDocument> = {},
): RetrievedDocument {
  return {
    id,
    title: `Synthetic Manual ${id.toUpperCase()}`,
    source: `synthetic/manual-${id}.md`,
    sourcePath: `synthetic/manual-${id}.md`,
    score: 0,
    rank: 1,
    section: "Operating Notes",
    fragment: text,
    reason: "Included by a closed synthetic fixture",
    snippet: text,
    ...overrides,
  };
}

function asPrivate(andy = new AndyDigitalColleague()): PrivateAndy {
  return andy as unknown as PrivateAndy;
}

class ClosedNeutralRepositoryService extends RepositoryKnowledgeService {
  invocationCount = 0;
  readonly queries: string[] = [];

  constructor(private readonly documents: RepositoryDocument[]) {
    super(null);
  }

  search(question: string): RepositoryDocument[] {
    this.invocationCount += 1;
    this.queries.push(question);
    return this.documents.map((document) => ({ ...document }));
  }
}

function makeRepositoryDocument(
  id: string,
  text: string,
  overrides: Partial<RepositoryDocument> = {},
): RepositoryDocument {
  return {
    id,
    title: `Synthetic Manual ${id.toUpperCase()}`,
    source: `synthetic/manual-${id}.md`,
    sourcePath: `synthetic/manual-${id}.md`,
    text,
    score: 0,
    section: "Operating Notes",
    fragment: text,
    reason: "Included by a closed synthetic fixture",
    ...overrides,
  };
}

function relationshipKinds(comparison: ComparativeView): string[] {
  return comparison.relationships.map((relationship) => relationship.kind);
}

describe("bounded comparative Understanding", () => {
  it("falsifiers 1-6 preserve exact metadata, heading lineage, paragraph, and list provenance", () => {
    const text = [
      "# Prism Laboratory",
      "",
      "## Calibration",
      "**Status:** LUMINOUS",
      "Date: 2031-04-07",
      "Scope: East bench",
      "",
      "The prism uses a silver reference mark.",
      "",
      "- Verify the cobalt dial.",
    ].join("\n");
    const extraction = asPrivate().extractStructuralObservations(makeRetrievedDocument("a", text));

    expect(extraction.metadata.status).toMatchObject({ status: "known", value: "LUMINOUS" });
    expect(extraction.metadata.date).toMatchObject({ status: "known", value: "2031-04-07" });
    expect(extraction.metadata.scope).toMatchObject({ status: "known", value: "East bench" });
    expect(extraction.observations.find((item) => item.value === "LUMINOUS")?.exactText).toBe("**Status:** LUMINOUS");
    expect(extraction.observations.find((item) => item.value === "East bench")?.headingLineage).toEqual(["Prism Laboratory", "Calibration"]);
    expect(extraction.observations.find((item) => item.kind === "paragraph")).toMatchObject({
      exactText: "The prism uses a silver reference mark.",
      startLine: 8,
      endLine: 8,
      sourceId: "a",
      sourcePath: "synthetic/manual-a.md",
      section: "Operating Notes",
    });
    expect(extraction.observations.find((item) => item.kind === "list-item")).toMatchObject({
      exactText: "- Verify the cobalt dial.",
      startLine: 10,
      endLine: 10,
      headingLineage: ["Prism Laboratory", "Calibration"],
    });
    expect(extraction.observations.map((item) => item.blockOrdinal)).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
  });

  it("falsifiers 7-12 preserve missing, empty, duplicate, malformed, and ambiguous metadata as unknown", () => {
    const privateAndy = asPrivate();
    const missing = privateAndy.extractStructuralObservations(makeRetrievedDocument("missing", "# Empty Catalogue\n\nNo labelled metadata is supplied."));
    const empty = privateAndy.extractStructuralObservations(makeRetrievedDocument("empty", "Status:\nDate:"));
    const duplicateIdentical = privateAndy.extractStructuralObservations(makeRetrievedDocument("same", "Status: LUMINOUS\nStatus: LUMINOUS"));
    const duplicateConflicting = privateAndy.extractStructuralObservations(makeRetrievedDocument("different", "Status: LUMINOUS\nStatus: QUIET"));
    const malformedDate = privateAndy.extractStructuralObservations(makeRetrievedDocument("bad-date", "Date: 2031-02-30"));
    const ambiguousDate = privateAndy.extractStructuralObservations(makeRetrievedDocument("word-date", "Date: April 7, 2031"));

    expect(missing.metadata.status).toEqual({ status: "unknown", observationIds: [], reason: "missing" });
    expect(empty.metadata.status).toMatchObject({ status: "unknown", reason: "invalid" });
    expect(empty.observations.find((item) => item.label === "Status")).toMatchObject({ exactText: "Status:", structurallyValid: false });
    expect(duplicateIdentical.metadata.status).toMatchObject({ status: "unknown", reason: "duplicate-identical" });
    expect(duplicateIdentical.metadata.status.observationIds).toHaveLength(2);
    expect(duplicateConflicting.metadata.status).toMatchObject({ status: "unknown", reason: "duplicate-conflicting" });
    expect(malformedDate.metadata.date).toMatchObject({ status: "unknown", reason: "invalid" });
    expect(ambiguousDate.metadata.date).toMatchObject({ status: "unknown", reason: "invalid" });
    expect(malformedDate.observations.find((item) => item.label === "Date")?.exactText).toBe("Date: 2031-02-30");
    expect(ambiguousDate.observations.find((item) => item.label === "Date")?.value).toBe("April 7, 2031");
  });

  it("falsifiers 13-20 do not promote dates, prose state, implied relationships, malformed Markdown, labels, order, or rank", () => {
    const privateAndy = asPrivate();
    const proseState = privateAndy.extractStructuralObservations(makeRetrievedDocument("prose", "The calibration work stops here."));
    const explicitState = privateAndy.extractStructuralObservations(makeRetrievedDocument("state", "State: PAUSED-BY-OPERATOR"));
    const explicitRelationship = privateAndy.extractStructuralObservations(makeRetrievedDocument("relation", "Manual Azure supersedes Manual Verdant."));
    const impliedRelationship = privateAndy.extractStructuralObservations(makeRetrievedDocument("implied", "Manual Azure is newer than Manual Verdant."));
    const malformedMarkdown = privateAndy.extractStructuralObservations(makeRetrievedDocument("malformed", "```text\nStatus: HIDDEN"));
    const unrecognisedLabel = privateAndy.extractStructuralObservations(makeRetrievedDocument("generic", "Temperature band: COBALT"));
    const older = makeRetrievedDocument("older", "Status: LUMINOUS\nDate: 2031-01-01", { rank: 9, score: 0.1 });
    const newer = makeRetrievedDocument("newer", "Status: QUIET\nDate: 2032-01-01", { rank: 1, score: 99 });
    const forward = privateAndy.formComparativeUnderstanding([older, newer]);
    const reverse = privateAndy.formComparativeUnderstanding([newer, older]);

    expect(proseState.metadata.state).toMatchObject({ status: "unknown", reason: "missing" });
    expect(explicitState.metadata.state).toMatchObject({ status: "known", value: "PAUSED-BY-OPERATOR" });
    expect(explicitRelationship.observations.find((item) => item.explicitRelationship)).toMatchObject({
      exactText: "Manual Azure supersedes Manual Verdant.",
      explicitRelationship: { subject: "Manual Azure", verb: "supersedes", object: "Manual Verdant" },
    });
    expect(impliedRelationship.observations.some((item) => item.explicitRelationship)).toBe(false);
    expect(malformedMarkdown.observations.find((item) => item.kind === "opaque")).toMatchObject({ structurallyValid: false, unknownReason: "unclosed fenced content" });
    expect(malformedMarkdown.metadata.status).toMatchObject({ status: "unknown", reason: "missing" });
    expect(unrecognisedLabel.observations.find((item) => item.label === "Temperature band")?.metadataCategory).toBe("generic");
    expect(unrecognisedLabel.metadata.status).toMatchObject({ status: "unknown", reason: "missing" });
    expect(relationshipKinds(forward)).toContain("unresolved-relationship");
    expect(relationshipKinds(reverse)).toContain("unresolved-relationship");
    expect(relationshipKinds(forward)).toEqual(relationshipKinds(reverse));
    expect(forward.humanDecisionQuestions).toHaveLength(1);
    expect(reverse.humanDecisionQuestions).toHaveLength(1);
    expect(forward.relationships.some((item) => item.statement.includes("governs"))).toBe(false);
  });

  it("falsifiers 21-24 form agreement, apparent disagreement, and bounded date/scope qualification", () => {
    const privateAndy = asPrivate();
    const agreement = privateAndy.formComparativeUnderstanding([
      makeRetrievedDocument("a", "Status: LUMINOUS"),
      makeRetrievedDocument("b", "Status: LUMINOUS"),
    ]);
    const disagreement = privateAndy.formComparativeUnderstanding([
      makeRetrievedDocument("c", "Status: LUMINOUS\nDate: 2031-01-01\nScope: East bench"),
      makeRetrievedDocument("d", "Status: QUIET\nDate: 2032-01-01\nScope: West bench"),
    ]);

    expect(relationshipKinds(agreement)).toContain("agreement");
    expect(relationshipKinds(disagreement)).toEqual(expect.arrayContaining([
      "apparent-disagreement",
      "qualification",
      "possible-supersession",
      "unresolved-relationship",
    ]));
    expect(disagreement.relationships.find((item) => item.kind === "qualification")?.uncertainty).toContain("do not establish substantive scope");
    expect(disagreement.relationships.find((item) => item.kind === "possible-supersession")?.uncertainty).toContain("later date does not establish supersession");
    expect(disagreement.humanDecisionQuestions).toHaveLength(1);
  });

  it("falsifiers 25-31 attribute explicit supersession, label unsupported inference, and expose only unresolved human decisions", () => {
    const privateAndy = asPrivate();
    const explicit = privateAndy.formComparativeUnderstanding([
      makeRetrievedDocument("blue", "Manual Blue supersedes Manual Green."),
      makeRetrievedDocument("green", "The green manual uses a narrow aperture."),
    ]);
    const unsupported = privateAndy.formComparativeUnderstanding([
      makeRetrievedDocument("first", "Status: LUMINOUS\nDate: 2031-01-01"),
      makeRetrievedDocument("second", "Status: QUIET\nDate: 2032-01-01"),
    ]);

    const authoredRelationship = explicit.relationships.find((item) => item.kind === "explicit-authored-relationship");
    expect(authoredRelationship).toMatchObject({ direct: true, observationIds: [expect.stringContaining("observation-blue-")] });
    expect(authoredRelationship?.statement).toContain("synthetic/manual-blue.md explicitly states");
    expect(explicit.humanDecisionQuestions).toEqual([]);
    expect(relationshipKinds(unsupported)).toEqual(expect.arrayContaining(["possible-supersession", "unresolved-relationship"]));
    expect(unsupported.relationships.find((item) => item.kind === "possible-supersession")?.direct).toBe(false);
    expect(unsupported.inferences.length).toBeGreaterThan(0);
    expect(unsupported.inferences.every((inference) => inference.supportingObservationIds.length > 0)).toBe(true);
    expect(unsupported.inferences.every((inference) => inference.basis.length > 0 && inference.uncertainty.length > 0)).toBe(true);
    expect(unsupported.humanDecisionQuestions[0]).toMatchObject({
      question: expect.stringContaining("A human needs to decide this"),
      reason: expect.stringContaining("Authority absent from the supplied records"),
    });
  });

  it("keeps unrelated relationships local while relevant relationships resolve the participating records", () => {
    const privateAndy = asPrivate();
    const unrelated = privateAndy.formComparativeUnderstanding([
      makeRetrievedDocument("status-a", "Status: ACTIVE\nDate: 2031-01-01", { title: "Status Record A" }),
      makeRetrievedDocument("status-b", "Status: STOPPED\nDate: 2032-01-01", { title: "Status Record B" }),
      makeRetrievedDocument("unrelated", "Record X supersedes Record Y.", { title: "Relationship Note" }),
    ]);
    const relevant = privateAndy.formComparativeUnderstanding([
      makeRetrievedDocument("record-x", "Status: ACTIVE\nDate: 2031-01-01", { title: "Record X" }),
      makeRetrievedDocument("record-y", "Status: STOPPED\nDate: 2032-01-01", { title: "Record Y" }),
      makeRetrievedDocument("relationship", "Record X supersedes Record Y.", { title: "Relationship Note" }),
    ]);

    expect(relationshipKinds(unrelated)).toEqual(expect.arrayContaining([
      "explicit-authored-relationship",
      "apparent-disagreement",
      "qualification",
      "possible-supersession",
      "unresolved-relationship",
    ]));
    expect(unrelated.uncertainty.length).toBeGreaterThan(0);
    expect(unrelated.humanDecisionQuestions).toHaveLength(1);

    expect(relationshipKinds(relevant)).toEqual(expect.arrayContaining([
      "explicit-authored-relationship",
      "apparent-disagreement",
      "qualification",
    ]));
    expect(relationshipKinds(relevant)).not.toContain("possible-supersession");
    expect(relationshipKinds(relevant)).not.toContain("unresolved-relationship");
    expect(relevant.humanDecisionQuestions).toEqual([]);
    expect(relevant.relationships.find((item) => item.kind === "explicit-authored-relationship")?.statement).toContain("Record X supersedes Record Y.");
  });

  it("requires one exact relationship to cover every participant before suppressing unresolved consequences", () => {
    const privateAndy = asPrivate();
    const sourceSetFor = (comparison: ComparativeView, relationship: ComparativeView["relationships"][number]) =>
      [...new Set(relationship.observationIds.flatMap((observationId) =>
        comparison.observations
          .filter((observation) => observation.id === observationId)
          .map((observation) => observation.sourceId),
      ))].sort();
    const unresolvedFor = (comparison: ComparativeView) =>
      comparison.relationships.find((relationship) => relationship.kind === "unresolved-relationship");
    const makeParticipants = () => [
      makeRetrievedDocument("record-a", "Status: ACTIVE\nDate: 2031-01-01", {
        title: "Record A",
        sourcePath: "synthetic/first-status.md",
        rank: 9,
        score: 0.1,
      }),
      makeRetrievedDocument("record-b", "Status: STOPPED\nDate: 2031-01-01", {
        title: "Record B",
        sourcePath: "synthetic/second-status.md",
        rank: 1,
        score: 99,
      }),
      makeRetrievedDocument("record-c", "Status: PAUSED\nDate: 2031-01-01", {
        title: "Record C",
        sourcePath: "synthetic/third-status.md",
        rank: 5,
        score: 50,
      }),
    ];

    const properSubsetDocuments = [
      ...makeParticipants(),
      makeRetrievedDocument("relationship-ab", "Record A supersedes Record B.", { title: "Relationship AB" }),
      makeRetrievedDocument("unrelated-extra", "A separate calibration note.", { title: "Unrelated Extra" }),
    ];
    const properSubset = privateAndy.formComparativeUnderstanding(properSubsetDocuments);
    const properSubsetReverse = privateAndy.formComparativeUnderstanding([...properSubsetDocuments].reverse());
    for (const comparison of [properSubset, properSubsetReverse]) {
      const unresolved = unresolvedFor(comparison);
      expect(comparison.relationships.filter((item) => item.kind === "apparent-disagreement")).toHaveLength(1);
      expect(comparison.relationships.filter((item) => item.kind === "explicit-authored-relationship")).toHaveLength(1);
      expect(comparison.relationships.filter((item) => item.kind === "qualification")).toHaveLength(1);
      expect(comparison.relationships.filter((item) => item.kind === "possible-supersession")).toHaveLength(1);
      expect(unresolved).toBeDefined();
      expect(sourceSetFor(comparison, unresolved!)).toEqual(["record-a", "record-b", "record-c"]);
      expect(comparison.uncertainty).toHaveLength(1);
      expect(comparison.humanDecisionQuestions).toHaveLength(1);
      expect(comparison.humanDecisionQuestions[0].unresolvedRelationshipId).toBe(unresolved?.id);
      expect(comparison.relationships.some((item) =>
        item.kind === "unresolved-relationship" && sourceSetFor(comparison, item).length === 1,
      )).toBe(false);
    }

    const collectiveDocuments = [
      ...makeParticipants(),
      makeRetrievedDocument("relationship-ab", "Record A supersedes Record B.", { title: "Relationship AB" }),
      makeRetrievedDocument("relationship-ac", "Record A supersedes Record C.", { title: "Relationship AC" }),
    ];
    const collective = privateAndy.formComparativeUnderstanding(collectiveDocuments);
    const collectiveReverse = privateAndy.formComparativeUnderstanding([...collectiveDocuments].reverse());
    for (const comparison of [collective, collectiveReverse]) {
      const unresolved = unresolvedFor(comparison);
      expect(comparison.relationships.filter((item) => item.kind === "explicit-authored-relationship")).toHaveLength(2);
      expect(comparison.relationships.filter((item) => item.kind === "apparent-disagreement")).toHaveLength(1);
      expect(unresolved).toBeDefined();
      expect(sourceSetFor(comparison, unresolved!)).toEqual(["record-a", "record-b", "record-c"]);
      expect(comparison.humanDecisionQuestions).toHaveLength(1);
      expect(comparison.relationships.filter((item) => !item.direct)
        .some((item) => /supersedes|governs/i.test(item.statement))).toBe(false);
    }

    const acceptedPair = privateAndy.formComparativeUnderstanding([
      makeRetrievedDocument("record-a", "Status: ACTIVE", { title: "Record A" }),
      makeRetrievedDocument("record-b", "Status: STOPPED", { title: "Record B" }),
      makeRetrievedDocument("relationship-ab", "Record A supersedes Record B.", { title: "Relationship AB" }),
    ]);
    expect(acceptedPair.relationships.filter((item) => item.kind === "explicit-authored-relationship")).toHaveLength(1);
    expect(acceptedPair.relationships.filter((item) => item.kind === "apparent-disagreement")).toHaveLength(1);
    expect(relationshipKinds(acceptedPair)).not.toContain("possible-supersession");
    expect(relationshipKinds(acceptedPair)).not.toContain("unresolved-relationship");
    expect(acceptedPair.humanDecisionQuestions).toEqual([]);

    const unrelated = privateAndy.formComparativeUnderstanding([
      makeRetrievedDocument("record-a", "Status: ACTIVE", { title: "Record A" }),
      makeRetrievedDocument("record-b", "Status: STOPPED", { title: "Record B" }),
      makeRetrievedDocument("relationship-xy", "Record X supersedes Record Y.", { title: "Relationship XY" }),
    ]);
    expect(unrelated.relationships.filter((item) => item.kind === "explicit-authored-relationship")).toHaveLength(1);
    expect(unrelatedFor(unrelated)).toBeUndefined();
    expect(relationshipKinds(unrelated)).toContain("unresolved-relationship");
    expect(unrelated.uncertainty).toHaveLength(1);
    expect(unrelated.humanDecisionQuestions).toHaveLength(1);

    function unrelatedFor(comparison: ComparativeView) {
      return comparison.relationships.find((item) =>
        item.kind === "unresolved-relationship" &&
        item.observationIds.some((observationId) => observationId.includes("relationship-xy")),
      );
    }
  });

  it("requires all complete authored relationships to share one exact structural identity", () => {
    const privateAndy = asPrivate();
    const relationshipKindsFor = (comparison: ComparativeView) => comparison.relationships.map((item) => item.kind);
    const expectResolved = (comparison: ComparativeView, explicitRelationshipCount: number) => {
      expect(comparison.relationships.filter((item) => item.kind === "explicit-authored-relationship")).toHaveLength(explicitRelationshipCount);
      expect(comparison.relationships.filter((item) => item.kind === "apparent-disagreement")).toHaveLength(1);
      expect(relationshipKindsFor(comparison)).not.toContain("possible-supersession");
      expect(relationshipKindsFor(comparison)).not.toContain("unresolved-relationship");
      expect(comparison.uncertainty).toEqual([]);
      expect(comparison.humanDecisionQuestions).toEqual([]);
    };
    const expectUnresolved = (comparison: ComparativeView, explicitRelationshipCount: number) => {
      expect(comparison.relationships.filter((item) => item.kind === "explicit-authored-relationship")).toHaveLength(explicitRelationshipCount);
      expect(comparison.relationships.filter((item) => item.kind === "apparent-disagreement")).toHaveLength(1);
      expect(relationshipKindsFor(comparison)).toContain("unresolved-relationship");
      expect(comparison.uncertainty).toHaveLength(1);
      expect(comparison.humanDecisionQuestions).toHaveLength(1);
    };
    const makePair = () => [
      makeRetrievedDocument("record-a", "Status: ACTIVE\nDate: 2031-01-01", {
        title: "Record A",
        sourcePath: "synthetic/first-position.md",
        rank: 9,
        score: 0.1,
      }),
      makeRetrievedDocument("record-b", "Status: STOPPED\nDate: 2031-01-01", {
        title: "Record B",
        sourcePath: "synthetic/second-position.md",
        rank: 1,
        score: 99,
      }),
    ];
    const comparePair = (...relationships: RetrievedDocument[]) =>
      privateAndy.formComparativeUnderstanding([...makePair(), ...relationships]);
    const relationship = (id: string, statement: string) =>
      makeRetrievedDocument(id, statement, { title: `Relationship ${id.toUpperCase()}` });

    expectResolved(comparePair(relationship("single", "Record A supersedes Record B.")), 1);
    expectResolved(comparePair(
      relationship("duplicate-one", "Record A supersedes Record B."),
      relationship("duplicate-two", "Record A supersedes Record B."),
    ), 2);

    const equivalentPairs = [
      ["Record A supersedes Record B.", "Record B is superseded by Record A."],
      ["Record A replaces Record B.", "Record B is replaced by Record A."],
      ["Record A amends Record B.", "Record B is amended by Record A."],
    ];
    for (const [active, passive] of equivalentPairs) {
      expectResolved(comparePair(
        relationship("active", active),
        relationship("passive", passive),
      ), 2);
    }

    const opposingDocuments = [
      ...makePair(),
      relationship("forward", "Record A supersedes Record B."),
      relationship("opposing", "Record B supersedes Record A."),
      makeRetrievedDocument("unrelated-extra", "A separate calibration note.", { title: "Unrelated Extra" }),
    ];
    expectUnresolved(privateAndy.formComparativeUnderstanding(opposingDocuments), 2);
    expectUnresolved(privateAndy.formComparativeUnderstanding([...opposingDocuments].reverse()), 2);

    const crossFamilyDocuments = [
      ...makePair(),
      relationship("supersedes", "Record A supersedes Record B."),
      relationship("replaces", "Record A replaces Record B."),
    ];
    expectUnresolved(privateAndy.formComparativeUnderstanding(crossFamilyDocuments), 2);
    expectUnresolved(privateAndy.formComparativeUnderstanding([...crossFamilyDocuments].reverse()), 2);

    expectUnresolved(comparePair(relationship("unrelated", "Record X supersedes Record Y.")), 1);

    const makeThreeParticipants = () => [
      ...makePair(),
      makeRetrievedDocument("record-c", "Status: PAUSED\nDate: 2031-01-01", {
        title: "Record C",
        sourcePath: "synthetic/third-position.md",
        rank: 5,
        score: 50,
      }),
    ];
    const properSubsetDocuments = [
      ...makeThreeParticipants(),
      relationship("subset", "Record A supersedes Record B."),
    ];
    const unionDocuments = [
      ...makeThreeParticipants(),
      relationship("union-ab", "Record A supersedes Record B."),
      relationship("union-ac", "Record A supersedes Record C."),
    ];
    expectUnresolved(privateAndy.formComparativeUnderstanding(properSubsetDocuments), 1);
    expectUnresolved(privateAndy.formComparativeUnderstanding([...properSubsetDocuments].reverse()), 1);
    expectUnresolved(privateAndy.formComparativeUnderstanding(unionDocuments), 2);
    expectUnresolved(privateAndy.formComparativeUnderstanding([...unionDocuments].reverse()), 2);

    const independent = privateAndy.formComparativeUnderstanding([
      ...makePair(),
      relationship("pair-resolution", "Record A supersedes Record B."),
      makeRetrievedDocument("state-c", "State: OPEN", { title: "State C" }),
      makeRetrievedDocument("state-d", "State: CLOSED", { title: "State D" }),
    ]);
    expect(independent.relationships.filter((item) => item.kind === "apparent-disagreement")).toHaveLength(2);
    expect(independent.relationships.filter((item) => item.kind === "unresolved-relationship")).toHaveLength(1);
    expect(independent.uncertainty).toHaveLength(1);
    expect(independent.humanDecisionQuestions).toHaveLength(1);
  });

  it("evaluates mixed, independently unresolved, and independently resolved disagreements separately", () => {
    const privateAndy = asPrivate();
    const disagreementFor = (comparison: ComparativeView, category: string) =>
      comparison.relationships.find((relationship) =>
        relationship.kind === "apparent-disagreement" &&
        relationship.observationIds.some((observationId) =>
          comparison.observations.some((observation) =>
            observation.id === observationId && observation.metadataCategory === category,
          ),
        ),
      );
    const consequenceFor = (comparison: ComparativeView, kind: string, disagreementId: string) =>
      comparison.relationships.find((relationship) =>
        relationship.kind === kind && relationship.observationIds.includes(disagreementId),
      );
    const sourceSetFor = (comparison: ComparativeView, relationship: ComparativeView["relationships"][number]) =>
      [...new Set(relationship.observationIds.flatMap((observationId) =>
        comparison.observations
          .filter((observation) => observation.id === observationId)
          .map((observation) => observation.sourceId),
      ))].sort();

    const sameSourceSet = privateAndy.formComparativeUnderstanding([
      makeRetrievedDocument("same-a", "Status: ACTIVE\nDate: 2031-01-01\nScope: East bench", { title: "Same A" }),
      makeRetrievedDocument("same-b", "Status: STOPPED\nDate: 2032-01-01\nScope: West bench", { title: "Same B" }),
    ]);
    const sameApparentDisagreements = sameSourceSet.relationships.filter((item) => item.kind === "apparent-disagreement");
    const sameUnresolvedRelationships = sameSourceSet.relationships.filter((item) => item.kind === "unresolved-relationship");
    expect(sameApparentDisagreements).toHaveLength(3);
    expect(sameUnresolvedRelationships).toHaveLength(3);
    expect(sameSourceSet.relationships.filter((item) => item.kind === "qualification")).toHaveLength(3);
    expect(sameSourceSet.relationships.filter((item) => item.kind === "possible-supersession")).toHaveLength(3);
    expect(sameSourceSet.inferences).toHaveLength(12);
    expect(sameSourceSet.uncertainty).toHaveLength(3);
    expect(sameUnresolvedRelationships.map((relationship) => sourceSetFor(sameSourceSet, relationship)))
      .toEqual([["same-a", "same-b"], ["same-a", "same-b"], ["same-a", "same-b"]]);
    expect(sameSourceSet.humanDecisionQuestions).toHaveLength(1);
    expect(sameUnresolvedRelationships.map((relationship) => relationship.id))
      .toContain(sameSourceSet.humanDecisionQuestions[0].unresolvedRelationshipId);

    const mixed = privateAndy.formComparativeUnderstanding([
      makeRetrievedDocument("record-x", "Status: ACTIVE", { title: "Record X" }),
      makeRetrievedDocument("record-y", "Status: STOPPED", { title: "Record Y" }),
      makeRetrievedDocument("status-relationship", "Record X supersedes Record Y.", { title: "Status Relationship" }),
      makeRetrievedDocument("state-a", "State: OPEN\nDate: 2031-01-01\nScope: Shared bench", { title: "State A" }),
      makeRetrievedDocument("state-b", "State: CLOSED\nDate: 2032-01-01\nScope: Shared bench", { title: "State B" }),
    ]);
    const mixedStatus = disagreementFor(mixed, "status");
    const mixedState = disagreementFor(mixed, "state");
    expect(mixedStatus).toBeDefined();
    expect(mixedState).toBeDefined();
    expect(mixed.relationships.filter((item) => item.kind === "apparent-disagreement")).toHaveLength(3);
    expect(consequenceFor(mixed, "unresolved-relationship", mixedStatus!.observationIds[0])).toBeUndefined();
    const mixedStateUnresolved = consequenceFor(mixed, "unresolved-relationship", mixedState!.observationIds[0]);
    expect(mixedStateUnresolved).toBeDefined();
    expect(consequenceFor(mixed, "qualification", mixedState!.observationIds[0])).toBeDefined();
    expect(consequenceFor(mixed, "possible-supersession", mixedState!.observationIds[0])).toMatchObject({ direct: false });
    const mixedUnresolvedRelationships = mixed.relationships.filter((item) => item.kind === "unresolved-relationship");
    expect(mixedUnresolvedRelationships).toHaveLength(2);
    expect(mixed.relationships.filter((item) => item.kind === "qualification")).toHaveLength(2);
    expect(mixed.relationships.filter((item) => item.kind === "possible-supersession")).toHaveLength(2);
    expect(mixed.inferences).toHaveLength(10);
    expect(mixed.uncertainty).toHaveLength(2);
    expect(mixedUnresolvedRelationships.map((relationship) => sourceSetFor(mixed, relationship)))
      .toEqual([["state-a", "state-b"], ["state-a", "state-b"]]);
    expect(mixed.humanDecisionQuestions).toHaveLength(1);
    expect(mixed.humanDecisionQuestions.some((question) =>
      question.unresolvedRelationshipId === mixedStateUnresolved?.id,
    )).toBe(true);
    expect(mixed.relationships.find((item) => item.kind === "explicit-authored-relationship")?.statement).toContain("Record X supersedes Record Y.");

    const unresolved = privateAndy.formComparativeUnderstanding([
      makeRetrievedDocument("status-a", "Status: ACTIVE\nDate: 2031-01-01", { title: "Status A" }),
      makeRetrievedDocument("status-b", "Status: STOPPED\nDate: 2032-01-01", { title: "Status B" }),
      makeRetrievedDocument("state-c", "State: OPEN\nDate: 2033-01-01", { title: "State C" }),
      makeRetrievedDocument("state-d", "State: CLOSED\nDate: 2034-01-01", { title: "State D" }),
    ]);
    const unresolvedStatus = disagreementFor(unresolved, "status");
    const unresolvedState = disagreementFor(unresolved, "state");
    const unresolvedStatusRelationship = consequenceFor(unresolved, "unresolved-relationship", unresolvedStatus!.observationIds[0]);
    const unresolvedStateRelationship = consequenceFor(unresolved, "unresolved-relationship", unresolvedState!.observationIds[0]);
    expect(unresolvedStatusRelationship).toBeDefined();
    expect(unresolvedStateRelationship).toBeDefined();
    const unresolvedRelationships = unresolved.relationships.filter((item) => item.kind === "unresolved-relationship");
    const unresolvedSourceSets = unresolvedRelationships.map((relationship) => sourceSetFor(unresolved, relationship));
    expect(unresolvedRelationships).toHaveLength(3);
    expect(unresolvedSourceSets).toEqual(expect.arrayContaining([
      ["status-a", "status-b"],
      ["state-c", "state-d"],
      ["state-c", "state-d", "status-a", "status-b"],
    ]));
    expect(unresolved.relationships.filter((item) => item.kind === "apparent-disagreement")).toHaveLength(3);
    expect(unresolved.relationships.filter((item) => item.kind === "qualification")).toHaveLength(3);
    expect(unresolved.relationships.filter((item) => item.kind === "possible-supersession")).toHaveLength(3);
    expect(unresolved.inferences).toHaveLength(12);
    expect(unresolved.uncertainty).toHaveLength(3);
    expect(unresolved.humanDecisionQuestions).toHaveLength(3);
    expect(consequenceFor(unresolved, "possible-supersession", unresolvedStatus!.observationIds[0])).toMatchObject({ direct: false });
    expect(consequenceFor(unresolved, "possible-supersession", unresolvedState!.observationIds[0])).toMatchObject({ direct: false });
    expect(unresolvedStatusRelationship?.uncertainty).toBeTruthy();
    expect(unresolvedStateRelationship?.uncertainty).toBeTruthy();
    expect(unresolved.humanDecisionQuestions).toEqual(expect.arrayContaining([
      expect.objectContaining({ unresolvedRelationshipId: unresolvedStatusRelationship?.id }),
      expect.objectContaining({ unresolvedRelationshipId: unresolvedStateRelationship?.id }),
    ]));
    expect(new Set(unresolved.humanDecisionQuestions.map((question) => question.unresolvedRelationshipId)).size)
      .toBe(unresolved.humanDecisionQuestions.length);

    const resolvedForwardDocuments = [
      makeRetrievedDocument("status-x", "Status: ACTIVE", { title: "Status X" }),
      makeRetrievedDocument("status-y", "Status: STOPPED", { title: "Status Y" }),
      makeRetrievedDocument("status-link", "Status X supersedes Status Y.", { title: "Status Link" }),
      makeRetrievedDocument("state-x", "State: OPEN", { title: "State X" }),
      makeRetrievedDocument("state-y", "State: CLOSED", { title: "State Y" }),
      makeRetrievedDocument("state-link", "State X supersedes State Y.", { title: "State Link" }),
    ];
    const resolvedForward = privateAndy.formComparativeUnderstanding(resolvedForwardDocuments);
    const resolvedReverse = privateAndy.formComparativeUnderstanding([...resolvedForwardDocuments].reverse());
    for (const resolved of [resolvedForward, resolvedReverse]) {
      expect(resolved.relationships.filter((item) => item.kind === "apparent-disagreement")).toHaveLength(2);
      expect(resolved.relationships.filter((item) => item.kind === "explicit-authored-relationship")).toHaveLength(2);
      expect(relationshipKinds(resolved)).not.toContain("possible-supersession");
      expect(relationshipKinds(resolved)).not.toContain("unresolved-relationship");
      expect(resolved.humanDecisionQuestions).toEqual([]);
    }
  });

  it("falsifiers 32-34 do not use manifest order, retrieval score, or document count as truth or confidence", () => {
    const privateAndy = asPrivate();
    const first = makeRetrievedDocument("first", "Status: LUMINOUS", { rank: 2, score: 1 });
    const second = makeRetrievedDocument("second", "Status: QUIET", { rank: 1, score: 100 });
    const third = makeRetrievedDocument("third", "A unique unlabelled note.", { rank: 3, score: 500 });
    const forward = privateAndy.formComparativeUnderstanding([first, second]);
    const reverse = privateAndy.formComparativeUnderstanding([second, first]);
    const expanded = privateAndy.formComparativeUnderstanding([first, second, third]);

    expect(relationshipKinds(forward)).toEqual(relationshipKinds(reverse));
    expect(relationshipKinds(expanded)).toEqual(relationshipKinds(forward));
    expect(forward.humanDecisionQuestions).toHaveLength(1);
    expect(reverse.humanDecisionQuestions).toHaveLength(1);
    expect(expanded.humanDecisionQuestions).toHaveLength(1);
    expect(Object.prototype.hasOwnProperty.call(forward, "confidence")).toBe(false);
    expect(JSON.stringify(forward)).not.toContain("score");
    expect(JSON.stringify(forward)).not.toContain("rank");
  });

  it("falsifiers 35-42 render formed observations, labelled inference, unresolved relationships, and no course or template", () => {
    const service = new ClosedNeutralRepositoryService([
      makeRepositoryDocument("north", "# Lens Notes\n\nStatus: LUMINOUS\nDate: 2031-01-01"),
      makeRepositoryDocument("south", "# Lens Notes\n\nStatus: QUIET\nDate: 2032-01-01"),
    ]);
    const andy = new AndyDigitalColleague({ repositoryKnowledgeService: service });
    const result = andy.runConstitutionalExamination("Compare the supplied laboratory records.");

    expect(result.answer).toContain("Source observations:");
    expect(result.answer).toContain("Observation observation-north-");
    expect(result.answer).toContain("APPARENT DISAGREEMENT");
    expect(result.answer).toContain("POSSIBLE SUPERSESSION");
    expect(result.answer).toContain("Inferences:");
    expect(result.answer).toContain("Supporting observations:");
    expect(result.answer).toContain("UNRESOLVED RELATIONSHIP");
    expect(result.answer).toContain("Human-decision questions:");
    expect(result.answer).not.toMatch(/record (north|south) should govern/i);
    expect(result.answer).not.toMatch(/you should|I recommend|take action|implement/i);
    expect(result.answer).not.toMatch(/Helping Hand|HH-0000|programme orientation|Case 001|C18/i);
    expect(result.answer).not.toContain("supersedes Manual");
  });

  it("falsifiers 43-49 preserve the non-deliberative, non-persistent, one-search, one-turn boundary", () => {
    const service = new ClosedNeutralRepositoryService([
      makeRepositoryDocument("one", "Status: LUMINOUS"),
      makeRepositoryDocument("two", "Status: QUIET"),
    ]);
    const andy = new AndyDigitalColleague({ repositoryKnowledgeService: service });
    const result = andy.runConstitutionalExamination("How do these records differ?");

    expect(result.deliberation).toBeUndefined();
    expect(andy.getLastReflection()).toBeNull();
    expect(andy.memory.all()).toEqual([]);
    expect(service.invocationCount).toBe(1);
    expect(service.queries).toEqual(["How do these records differ?"]);
    expect(result.reasoningTrace.some((line) => line.includes("Deliberation created"))).toBe(false);
    expect(result).not.toHaveProperty("confirmedLearning");
    expect(result).not.toHaveProperty("feedback");
    expect(result).not.toHaveProperty("action");
  });

  it("falsifier 50 preserves ordinary non-comparative explain and requires two retrieved records", () => {
    const oneDocumentService = new ClosedNeutralRepositoryService([
      makeRepositoryDocument("single", "The prism uses a silver reference mark."),
    ]);
    const ordinaryService = new ClosedNeutralRepositoryService([
      makeRepositoryDocument("left", "The prism uses a silver reference mark."),
      makeRepositoryDocument("right", "The lens uses a cobalt reference mark."),
    ]);
    const oneDocumentAndy = new AndyDigitalColleague({ repositoryKnowledgeService: oneDocumentService });
    const ordinaryAndy = new AndyDigitalColleague({ repositoryKnowledgeService: ordinaryService });

    const oneDocumentCompare = oneDocumentAndy.runConstitutionalExamination("Compare the supplied records.");
    const ordinaryExplain = ordinaryAndy.runConstitutionalExamination("What does a prism mean?");

    expect(asPrivate().isComparativeUnderstandingRequest("Compare the supplied records.")).toBe(true);
    expect(asPrivate().isComparativeUnderstandingRequest("Explain what these documents collectively say.")).toBe(true);
    expect(asPrivate().isComparativeUnderstandingRequest("What does a prism mean?")).toBe(false);
    expect(oneDocumentCompare.answer).not.toContain("Source observations:");
    expect(ordinaryExplain.answer).not.toContain("Source observations:");
    expect(ordinaryExplain.answer).toContain("A Digital Colleague is");
    expect(ordinaryService.invocationCount).toBe(1);
  });

  it("falsifiers 51-52 preserve genuine review recommendation, Reflection, and Memory behavior", () => {
    const service = new ClosedNeutralRepositoryService([
      makeRepositoryDocument("governance", "Governance decisions require evidence and named responsibility."),
      makeRepositoryDocument("purpose", "People and evidence guide careful decisions."),
    ]);
    const andy = new AndyDigitalColleague({ repositoryKnowledgeService: service });
    const result = andy.runConstitutionalExamination("Review the repository and recommend what needs next.");

    expect(result.deliberation?.recommendationReady).toBe(true);
    expect(andy.getLastReflection()).not.toBeNull();
    expect(andy.memory.all().length).toBeGreaterThan(0);
  });

  it("falsifier 53 preserves closed synthetic provider provenance and one invocation", () => {
    const documents = [
      makeRepositoryDocument("closed-a", "Status: LUMINOUS"),
      makeRepositoryDocument("closed-b", "Status: LUMINOUS"),
    ];
    const service = new ClosedNeutralRepositoryService(documents);
    const andy = new AndyDigitalColleague({ repositoryKnowledgeService: service });
    const result = andy.runConstitutionalExamination("Compare the supplied records.");

    expect(service.invocationCount).toBe(1);
    expect(result.retrievedDocuments.map((document) => document.id)).toEqual(["closed-a", "closed-b"]);
    expect(result.retrievedDocuments.map((document) => document.sourcePath)).toEqual([
      "synthetic/manual-closed-a.md",
      "synthetic/manual-closed-b.md",
    ]);
    expect(result.retrievedDocuments.map((document) => document.snippet)).toEqual([
      "Status: LUMINOUS",
      "Status: LUMINOUS",
    ]);
  });
});
