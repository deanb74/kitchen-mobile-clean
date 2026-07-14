import { describe, expect, it } from "@jest/globals";

import {
    translateObservations,
    type Observation,
    type TranslationRule,
} from "../index";

const observations: Observation[] = [
  {
    id: "menus",
    category: "environment",
    description: "Menus are stored beside the bar.",
    confidence: 0.95,
    source: "vision",
  },
];

describe("COS translation", () => {
  it("translates matching observations into meaning", () => {
    const rule: TranslationRule = {
      matches: (observation) => observation.id === "menus",
      translate: (observation) => ({
        observationId: observation.id,
        meaning:
          "The bar is likely to be a customer information point.",
        confidence: 0.9,
      }),
    };

    const translations = translateObservations(
      observations,
      [rule]
    );

    expect(translations).toEqual([
      {
        observationId: "menus",
        meaning:
          "The bar is likely to be a customer information point.",
        confidence: 0.9,
      },
    ]);
  });

  it("ignores rules that do not match", () => {
    const rule: TranslationRule = {
      matches: () => false,
      translate: (observation) => ({
        observationId: observation.id,
        meaning: "This should not be returned.",
        confidence: 0,
      }),
    };

    expect(
      translateObservations(observations, [rule])
    ).toEqual([]);
  });

  it("allows more than one meaning from one observation", () => {
    const informationPointRule: TranslationRule = {
      matches: (observation) => observation.id === "menus",
      translate: (observation) => ({
        observationId: observation.id,
        meaning:
          "The bar is likely to be a customer information point.",
        confidence: 0.9,
      }),
    };

    const replenishmentRule: TranslationRule = {
      matches: (observation) => observation.id === "menus",
      translate: (observation) => ({
        observationId: observation.id,
        meaning:
          "Menu availability beside the bar may need regular checking.",
        confidence: 0.82,
      }),
    };

    const translations = translateObservations(
      observations,
      [informationPointRule, replenishmentRule]
    );

    expect(translations).toHaveLength(2);
  });
});