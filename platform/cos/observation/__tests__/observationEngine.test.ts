import { describe, expect, it } from "@jest/globals";

import {
    beginObservationSession,
    type CuriosityRule,
    type Observation,
} from "../index";

const observations: Observation[] = [
  {
    id: "observation-1",
    category: "environment",
    description: "I can see something that may require understanding.",
    confidence: 0.91,
    source: "vision",
  },
];

describe("COS observation engine", () => {
  it("creates a session without inventing curiosity", () => {
    const session = beginObservationSession(observations);

    expect(session.observations).toEqual(observations);
    expect(session.questions).toEqual([]);
  });

  it("applies supplied curiosity rules", () => {
    const rule: CuriosityRule = (observation) => ({
      observationId: observation.id,
      question: "What do I need to understand about this?",
      reason: "Understanding should come before action.",
      priority: "medium",
    });

    const session = beginObservationSession(observations, [rule]);

    expect(session.questions).toEqual([
      {
        observationId: "observation-1",
        question: "What do I need to understand about this?",
        reason: "Understanding should come before action.",
        priority: "medium",
      },
    ]);
  });

  it("ignores curiosity rules that do not apply", () => {
    const rule: CuriosityRule = () => null;

    const session = beginObservationSession(observations, [rule]);

    expect(session.questions).toEqual([]);
  });

  it("accepts observations from different sources", () => {
    const session = beginObservationSession([
      ...observations,
      {
        id: "observation-2",
        category: "communication",
        description: "A colleague mentioned a concern.",
        confidence: 1,
        source: "conversation",
      },
    ]);

    expect(session.observations.map((item) => item.source)).toEqual([
      "vision",
      "conversation",
    ]);
  });
});