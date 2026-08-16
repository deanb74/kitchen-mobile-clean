import { describe, expect, it } from "@jest/globals";
import { humanSpeechToObservation } from "../listen";

describe("humanSpeechToObservation — Proof Condition 1", () => {
  it("produces an Observation with source 'human'", () => {
    const obs = humanSpeechToObservation("Our handovers have been difficult.", "utt-001", 0.8);
    expect(obs.source).toBe("human");
  });

  it("carries the utterance verbatim as description", () => {
    const obs = humanSpeechToObservation("The dishwasher broke again.", "utt-002", 0.75);
    expect(obs.description).toBe("The dishwasher broke again.");
  });

  it("category is 'conversation'", () => {
    const obs = humanSpeechToObservation("Staff are struggling.", "utt-003", 0.7);
    expect(obs.category).toBe("conversation");
  });

  it("uses caller-supplied confidence without modification", () => {
    const obs = humanSpeechToObservation("Something happened.", "utt-004", 0.62);
    expect(obs.confidence).toBe(0.62);
  });

  it("uses caller-supplied id", () => {
    const obs = humanSpeechToObservation("Anything.", "my-id-99", 0.9);
    expect(obs.id).toBe("my-id-99");
  });
});
