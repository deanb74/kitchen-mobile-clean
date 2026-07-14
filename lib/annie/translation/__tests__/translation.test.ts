import { describe, expect, it } from "@jest/globals";

import { think } from "../../brain";
import { translateHospitalityObservations } from "../index";

describe("Annie hospitality translation", () => {
  it("translates hospitality observations using COS", () => {
    const translations = translateHospitalityObservations([
      {
        id: "bar",
        category: "area",
        description: "I can see what looks like a bar.",
        confidence: 0.92,
        source: "vision",
      },
    ]);

    expect(translations).toEqual([
      {
        observationId: "bar",
        meaning:
          "The bar is likely to be both a drinks service point and a customer information point.",
        confidence: 0.92,
      },
    ]);
  });

  it("includes translated meaning in Annie's brain result", () => {
    const result = think();

    expect(result.observations.observations).toHaveLength(2);
    expect(result.translations).toHaveLength(2);
    expect(result.decision).not.toBe("observe");
  });
});