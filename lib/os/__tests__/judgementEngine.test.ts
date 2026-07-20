import {
    exerciseJudgement,
    type VenueDiscoveryPrompt,
} from "../context";

describe("Judgement Engine", () => {
  const nowPrompt: VenueDiscoveryPrompt = {
    id: "commercial-kitchen-equipment",
    triggeredBy: {
      dimension: "area",
      value: "commercial-kitchen",
    },
    prompt:
      "Can you show me what equipment you have in the kitchen, please?",
    priority: "now",
    expectedDimensions: ["equipment"],
    completed: false,
  };

  const soonPrompt: VenueDiscoveryPrompt = {
    id: "commercial-fryer-details",
    triggeredBy: {
      dimension: "equipment",
      value: "commercial-fryer",
    },
    prompt:
      "Can you tell me the make and model of this fryer?",
    priority: "soon",
    expectedDimensions: ["equipment"],
    completed: false,
  };

  it("allows an appropriate question when the situation is calm", () => {
    const result = exerciseJudgement({
      prompt: nowPrompt,
      situationIntensity: "calm",
      personAvailable: true,
    });

    expect(result.decision).toBe("ask-now");
    expect(result.prompt?.id).toBe(
      "commercial-kitchen-equipment",
    );
  });

  it("defers a non-urgent question when the venue is busy", () => {
    const result = exerciseJudgement({
      prompt: soonPrompt,
      situationIntensity: "busy",
      personAvailable: true,
    });

    expect(result.decision).toBe("defer");
    expect(result.reason).toContain("busy");
  });

  it("does not automatically defer a now-priority prompt when busy", () => {
    const result = exerciseJudgement({
      prompt: nowPrompt,
      situationIntensity: "busy",
      personAvailable: true,
    });

    expect(result.decision).toBe("ask-now");
  });

  it("defers when the person is unavailable", () => {
    const result = exerciseJudgement({
      prompt: nowPrompt,
      personAvailable: false,
      deferUntil: "manager-available",
    });

    expect(result.decision).toBe("defer");
    expect(result.deferUntil).toBe("manager-available");
  });

  it("defers ordinary discovery during an active incident", () => {
    const result = exerciseJudgement({
      prompt: nowPrompt,
      activeIncident: true,
    });

    expect(result.decision).toBe("defer");
  });

  it("interrupts when the matter is safety-critical", () => {
    const result = exerciseJudgement({
      prompt: soonPrompt,
      situationIntensity: "busy",
      safetyCritical: true,
    });

    expect(result.decision).toBe("interrupt");
    expect(result.reason).toContain("safety-critical");
  });

  it("returns nothing-to-ask when no prompt is supplied", () => {
    const result = exerciseJudgement({});

    expect(result.decision).toBe("nothing-to-ask");
    expect(result.prompt).toBeUndefined();
  });
});