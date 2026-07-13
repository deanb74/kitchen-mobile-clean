import { describe, expect, it } from "@jest/globals";

import {
  determineKnowledgeRoute,
  type CandidateUnderstanding,
} from "../index";

function createCandidate(
  overrides: Partial<CandidateUnderstanding> = {}
): CandidateUnderstanding {
  return {
    id: "candidate-1",
    summary: "A reflected piece of understanding.",
    kind: "local",
    origin: {
      digitalColleagueId: "HH-0001",
      profession: "hospitality",
      workplaceId: "venue-1",
    },
    containsSensitiveLocalContext: false,
    ...overrides,
  };
}

describe("Helping Hand knowledge flow", () => {
  it("keeps local understanding with the Digital Colleague", () => {
    const result = determineKnowledgeRoute(createCandidate());

    expect(result.allowed).toBe(true);
    expect(result.route).toEqual(["digital-colleague"]);
    expect(result.destination).toBe("digital-colleague");
  });

  it("routes organisational understanding to Organisation HQ", () => {
    const result = determineKnowledgeRoute(
      createCandidate({
        kind: "organisational",
        origin: {
          digitalColleagueId: "HH-0001",
          profession: "hospitality",
          organisationId: "organisation-1",
          workplaceId: "venue-1",
        },
      })
    );

    expect(result.route).toEqual([
      "digital-colleague",
      "organisation-hq",
    ]);
  });

  it("routes independent professional understanding through Profession HQ", () => {
    const result = determineKnowledgeRoute(
      createCandidate({
        kind: "professional",
      })
    );

    expect(result.route).toEqual([
      "digital-colleague",
      "profession-hq",
    ]);
  });

  it("prevents a Digital Colleague from bypassing Profession HQ", () => {
    const result = determineKnowledgeRoute(
      createCandidate({
        kind: "cross-profession",
      })
    );

    expect(result.route).toEqual([
      "digital-colleague",
      "profession-hq",
      "helping-hand-hq",
    ]);
  });

  it("holds sensitive local context at its source", () => {
    const result = determineKnowledgeRoute(
      createCandidate({
        kind: "cross-profession",
        containsSensitiveLocalContext: true,
      })
    );

    expect(result.allowed).toBe(false);
    expect(result.route).toEqual(["digital-colleague"]);
    expect(result.destination).toBe("digital-colleague");
  });
});