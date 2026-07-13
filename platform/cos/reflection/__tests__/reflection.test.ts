import { describe, expect, it } from "@jest/globals";

import { reflect } from "../index";

describe("COS reflection", () => {
  it("captures learning from experience", () => {
    const reflection = reflect(
      "Busy lunch service",
      "Preparation reduced waiting times.",
      "Prepare the dessert station earlier."
    );

    expect(reflection).toEqual({
      situation: "Busy lunch service",
      lesson: "Preparation reduced waiting times.",
      improveTomorrow: "Prepare the dessert station earlier.",
    });
  });
});