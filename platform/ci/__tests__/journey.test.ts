import { describe, expect, it } from "@jest/globals";

import {
    beginCompanionJourney,
    continueCompanionJourney,
} from "../index";

describe("Companion Intelligence journey", () => {
  it("begins with the most helpful route", () => {
    const journey = beginCompanionJourney({
      hasObservations: false,
      hasTranslations: false,
      needsReflection: false,
      needsClarification: false,
    });

    expect(journey.current.next).toBe("observe");
    expect(journey.history).toHaveLength(1);
    expect(journey.complete).toBe(false);
  });

  it("continues after understanding changes", () => {
    const started = beginCompanionJourney({
      hasObservations: false,
      hasTranslations: false,
      needsReflection: false,
      needsClarification: false,
    });

    const continued = continueCompanionJourney(started, {
      hasObservations: true,
      hasTranslations: false,
      needsReflection: false,
      needsClarification: false,
    });

    expect(continued.current.next).toBe("translate");
    expect(continued.history.map((step) => step.route)).toEqual([
      "observe",
      "translate",
    ]);
  });

  it("records different roads towards the same destination", () => {
    const started = beginCompanionJourney({
      hasObservations: true,
      hasTranslations: true,
      needsReflection: false,
      needsClarification: true,
    });

    const continued = continueCompanionJourney(started, {
      hasObservations: true,
      hasTranslations: true,
      needsReflection: true,
      needsClarification: false,
    });

    const completed = continueCompanionJourney(continued, {
      hasObservations: true,
      hasTranslations: true,
      needsReflection: false,
      needsClarification: false,
    });

    expect(completed.history.map((step) => step.route)).toEqual([
      "conversation",
      "reflect",
      "complete",
    ]);
    expect(completed.complete).toBe(true);
  });
});