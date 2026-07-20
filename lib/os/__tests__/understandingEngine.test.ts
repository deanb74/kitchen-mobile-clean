import {
    chooseNextUnderstanding,
    type VenueDiscoveryPrompt,
} from "../context";

describe("Understanding Engine", () => {
  const prompts: VenueDiscoveryPrompt[] = [
    {
      id: "later",
      triggeredBy: {
        dimension: "equipment",
        value: "glasswasher",
      },
      prompt: "Later question",
      priority: "later",
      expectedDimensions: [],
      completed: false,
    },
    {
      id: "now",
      triggeredBy: {
        dimension: "area",
        value: "commercial-kitchen",
      },
      prompt: "Now question",
      priority: "now",
      expectedDimensions: [],
      completed: false,
    },
    {
      id: "soon",
      triggeredBy: {
        dimension: "capability",
        value: "food-service",
      },
      prompt: "Soon question",
      priority: "soon",
      expectedDimensions: [],
      completed: false,
    },
  ];

  it("chooses the highest-priority understanding first", () => {
    const result = chooseNextUnderstanding({
      prompts,
    });

    expect(result.nextPrompt?.id).toBe("now");
  });

  it("ignores prompts already completed", () => {
    const result = chooseNextUnderstanding({
      prompts,
      completedPromptIds: ["now"],
    });

    expect(result.nextPrompt?.id).toBe("soon");
  });

  it("returns undefined when nothing remains", () => {
    const result = chooseNextUnderstanding({
      prompts: [],
    });

    expect(result.nextPrompt).toBeUndefined();
  });
});