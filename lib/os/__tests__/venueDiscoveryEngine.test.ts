import {
    createVenueDiscoveryObservation,
    runVenueDiscovery,
} from "../context";

describe("Venue Discovery Engine", () => {
  it("turns a commercial kitchen observation into an equipment prompt", () => {
    const observation = createVenueDiscoveryObservation({
      dimension: "area",
      value: "Commercial Kitchen",
      status: "observed",
      source: "walkaround",
      observedAt: "2026-07-20T12:00:00.000Z",
    });

    const result = runVenueDiscovery([observation]);

    expect(observation.id).toBe("area:commercial-kitchen");
    expect(observation.value).toBe("commercial-kitchen");

    expect(result.prompts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "commercial-kitchen-equipment",
          priority: "now",
          completed: false,
          triggeredBy: {
            dimension: "area",
            value: "commercial-kitchen",
          },
          expectedDimensions: ["equipment"],
        }),
      ]),
    );
  });

  it("prompts Annie to investigate draught beer equipment", () => {
    const observation = createVenueDiscoveryObservation({
      dimension: "capability",
      value: "Draught Beer Service",
      status: "confirmed",
      source: "conversation",
      observedAt: "2026-07-20T12:05:00.000Z",
    });

    const result = runVenueDiscovery([observation]);

    expect(result.prompts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "draught-beer-equipment",
          priority: "now",
          expectedDimensions: ["area", "equipment"],
        }),
      ]),
    );
  });

  it("turns a cellar observation into a cooling and dispense prompt", () => {
    const observation = createVenueDiscoveryObservation({
      dimension: "area",
      value: "cellar",
      status: "observed",
      source: "walkaround",
      observedAt: "2026-07-20T12:10:00.000Z",
    });

    const result = runVenueDiscovery([observation]);

    expect(result.prompts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "cellar-equipment",
          expectedDimensions: ["equipment"],
        }),
      ]),
    );
  });

  it("does not generate a prompt for an observation without a discovery rule", () => {
    const observation = createVenueDiscoveryObservation({
      dimension: "equipment",
      value: "glasswasher",
      status: "observed",
      source: "walkaround",
      observedAt: "2026-07-20T12:15:00.000Z",
    });

    const result = runVenueDiscovery([observation]);

    expect(result.prompts).toHaveLength(0);
  });

  it("does not duplicate the same prompt when an observation is repeated", () => {
    const firstObservation = createVenueDiscoveryObservation({
      dimension: "area",
      value: "commercial-kitchen",
      status: "observed",
      source: "walkaround",
      observedAt: "2026-07-20T12:00:00.000Z",
    });

    const secondObservation = createVenueDiscoveryObservation({
      dimension: "area",
      value: "Commercial Kitchen",
      status: "confirmed",
      source: "manager",
      observedAt: "2026-07-20T12:20:00.000Z",
    });

    const result = runVenueDiscovery([
      firstObservation,
      secondObservation,
    ]);

    expect(
      result.prompts.filter(
        (prompt) => prompt.id === "commercial-kitchen-equipment",
      ),
    ).toHaveLength(1);
  });

  it("creates an accommodation follow-up prompt", () => {
    const observation = createVenueDiscoveryObservation({
      dimension: "capability",
      value: "accommodation",
      status: "reported",
      source: "conversation",
      observedAt: "2026-07-20T12:25:00.000Z",
    });

    const result = runVenueDiscovery([observation]);

    expect(result.prompts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "accommodation-details",
          priority: "soon",
          expectedDimensions: [
            "area",
            "department",
            "equipment",
          ],
        }),
      ]),
    );
  });
});