import { describe, expect, it } from "@jest/globals";
import { translateObservations } from "../../../../platform/cos/translation";
import { humanSpeechToObservation } from "../../conversation/listen";
import { hospitalityConversationRules } from "../hospitalityConversationRules";

function translateSpeech(utterance: string, confidence = 0.8) {
  const obs = humanSpeechToObservation(utterance, "utt-test", confidence);
  return translateObservations([obs], hospitalityConversationRules);
}

describe("hospitalityConversationRules — Proof Condition 1", () => {
  it("shift handover utterance produces a translation", () => {
    const result = translateSpeech("Our handovers have been really difficult lately.");
    expect(result).toHaveLength(1);
    expect(result[0]?.meaning).toContain("shift transition");
  });

  it("equipment fault utterance produces a translation", () => {
    const result = translateSpeech("The dishwasher broke again today.");
    expect(result).toHaveLength(1);
    expect(result[0]?.meaning).toContain("equipment");
  });

  it("staffing utterance produces a translation", () => {
    const result = translateSpeech("We're short-staffed this evening.");
    expect(result).toHaveLength(1);
    expect(result[0]?.meaning).toContain("staffing");
  });

  it("stock utterance produces a translation", () => {
    const result = translateSpeech("We've run out of the house wine.");
    expect(result).toHaveLength(1);
    expect(result[0]?.meaning).toContain("stock");
  });

  it("service pressure utterance produces a translation", () => {
    const result = translateSpeech("It's really busy and we're falling behind.");
    expect(result).toHaveLength(1);
    expect(result[0]?.meaning).toContain("pressure");
  });

  it("translation confidence reflects observation confidence", () => {
    const result = translateSpeech("The handover was unclear.", 0.65);
    expect(result[0]?.confidence).toBe(0.65);
  });

  it("translation meaning is professional — not the raw utterance", () => {
    const utterance = "Our handovers have been difficult.";
    const result = translateSpeech(utterance);
    expect(result[0]?.meaning).not.toBe(utterance);
    expect(result[0]?.meaning.length).toBeGreaterThan(utterance.length);
  });
});

describe("hospitalityConversationRules — Proof Conditions 1 and 4", () => {
  it("unrecognised utterance produces no translation — the DC does not pretend", () => {
    const result = translateSpeech("I'm having a bad day.");
    expect(result).toHaveLength(0);
  });

  it("non-human observation source is not matched", () => {
    const sensorObs = {
      id: "sensor-001",
      category: "equipment",
      description: "handover data",
      confidence: 0.9,
      source: "sensor" as const,
    };
    const result = translateObservations([sensorObs], hospitalityConversationRules);
    expect(result).toHaveLength(0);
  });
});
