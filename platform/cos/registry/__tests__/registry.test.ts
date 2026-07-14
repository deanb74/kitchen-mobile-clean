import { describe, expect, it } from "@jest/globals";

import {
    getCapabilities,
    getCapability,
} from "../index";

describe("Capability Registry", () => {
  it("contains observation", () => {
    expect(getCapability("observation")?.classification)
      .toBe("universal+professional");
  });

  it("contains reflection", () => {
    expect(getCapability("reflection")?.classification)
      .toBe("universal");
  });

  it("contains translation", () => {
    expect(getCapability("translation")?.classification).toBe(
      "universal+professional"
    );
  });

  it("returns every capability", () => {
    expect(getCapabilities().length).toBeGreaterThanOrEqual(4);
  });
});