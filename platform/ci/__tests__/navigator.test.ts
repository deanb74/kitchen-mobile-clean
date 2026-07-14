import { describe, expect, it } from "@jest/globals";

import { chooseNextRoute } from "../index";

describe("Companion Intelligence Navigator", () => {

  it("observes first", () => {
    expect(
      chooseNextRoute({
        hasObservations: false,
        hasTranslations: false,
        needsReflection: false,
        needsClarification: false,
      }).next
    ).toBe("observe");
  });

  it("translates after observation", () => {
    expect(
      chooseNextRoute({
        hasObservations: true,
        hasTranslations: false,
        needsReflection: false,
        needsClarification: false,
      }).next
    ).toBe("translate");
  });

  it("asks for clarification when required", () => {
    expect(
      chooseNextRoute({
        hasObservations: true,
        hasTranslations: true,
        needsReflection: false,
        needsClarification: true,
      }).next
    ).toBe("conversation");
  });

  it("reflects when appropriate", () => {
    expect(
      chooseNextRoute({
        hasObservations: true,
        hasTranslations: true,
        needsReflection: true,
        needsClarification: false,
      }).next
    ).toBe("reflect");
  });

  it("completes when no further capability is needed", () => {
    expect(
      chooseNextRoute({
        hasObservations: true,
        hasTranslations: true,
        needsReflection: false,
        needsClarification: false,
      }).next
    ).toBe("complete");
  });

});