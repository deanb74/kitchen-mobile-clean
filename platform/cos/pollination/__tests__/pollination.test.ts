import { describe, expect, test } from "@jest/globals";

import { pollinate } from "../pollinationEngine";
import type { PollinationCandidate } from "../types";

const baseCandidate: PollinationCandidate = {
  source: "annie-hh-0001",
  title: "Clarifying questions reduce mistakes",
  description:
    "Asking one clarifying question before making a recommendation reduced avoidable errors.",
  category: "communication",

  confidence: 0.95,

  reusable: true,
  professionSpecific: false,
  safetyCritical: false,

  evidenceProvided: true,
  reflectionComplete: true,
  privacyChecked: true,
  safetyChecked: true,
  contextValidated: true,
  current: true,
};

describe("Forest Pollination", () => {
  test("rejects learning that has insufficient evidence", () => {
    const candidate: PollinationCandidate = {
      ...baseCandidate,
      confidence: 0.62,
      evidenceProvided: false,
      reflectionComplete: false,
    };

    const result = pollinate(candidate);

    expect(result.approved).toBe(false);
    expect(result.message).toBe("Knowledge remains local.");
    expect(result.governance.reasons).toContain(
      "Confidence is below the required threshold."
    );
    expect(result.governance.reasons).toContain(
      "Supporting evidence has not been provided."
    );
    expect(result.governance.reasons).toContain(
      "The learning has not completed reflection."
    );
  });

  test("shares profession-specific learning with the profession", () => {
    const candidate: PollinationCandidate = {
      ...baseCandidate,
      title: "Plain-language allergen explanations",
      description:
        "Explaining allergen information in plain language improved customer understanding.",
      category: "hospitality",
      professionSpecific: true,
    };

    const result = pollinate(candidate);

    expect(result.approved).toBe(true);
    expect(result.decision?.destination).toBe("profession");
    expect(result.distribution).toBe("Share within the profession.");
  });

  test("shares transferable learning with the whole forest", () => {
    const candidate: PollinationCandidate = {
      ...baseCandidate,
      title: "Natural pauses reduce interruption",
      description:
        "Waiting for a natural pause before sharing non-urgent information reduced disruption.",
      category: "human-communication",
      professionSpecific: false,
    };

    const result = pollinate(candidate);

    expect(result.approved).toBe(true);
    expect(result.decision?.destination).toBe("forest");
    expect(result.distribution).toBe(
      "Share with the entire Helping Hand Forest."
    );
  });

  test("holds safety-critical learning for human review", () => {
    const candidate: PollinationCandidate = {
      ...baseCandidate,
      title: "Revised emergency shutdown sequence",
      description:
        "A revised shutdown sequence reduced risk during an equipment failure.",
      category: "safety",
      professionSpecific: true,
      safetyCritical: true,
    };

    const result = pollinate(candidate);

    expect(result.approved).toBe(false);
    expect(result.governance.approved).toBe(true);
    expect(result.governance.reviewRequired).toBe(true);
    expect(result.governance.warnings).toContain(
      "Safety-critical learning requires human review."
    );
    expect(result.message).toBe(
      "Knowledge requires human review before wider distribution."
    );
  });
});