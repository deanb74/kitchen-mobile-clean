import {
  createVenueProfileFromSetup,
  isKnowledgeApplicable,
  type TaggedKnowledgePackage,
} from "../index";

describe("Anne Arms reference venue profile", () => {
  it("creates the Anne Arms initial profile from venue setup", () => {
    const profile = createVenueProfileFromSetup("anne-arms", {
      profession: "hospitality",
      region: "uk-england-yorkshire",
      venueType: "pub",
      departments: [
        "kitchen",
        "bar",
        "cellar",
        "front-of-house",
      ],
      equipment: [
        "commercial-fryer",
        "commercial-oven",
        "walk-in-chiller",
        "refrigerated-display",
        "draught-beer-system",
        "beer-lines",
        "glasswasher",
      ],
      capabilities: [
        "food-service",
        "draught-beer-service",
        "table-service",
        "takeaway",
      ],
    });

    expect(profile.venueId).toBe("anne-arms");
    expect(profile.professions).toEqual(["hospitality"]);
    expect(profile.region).toBe("uk-england-yorkshire");
    expect(profile.venueTypes).toEqual(["pub"]);

    expect(profile.departments).toEqual(
      expect.arrayContaining([
        "kitchen",
        "bar",
        "cellar",
        "front-of-house",
      ]),
    );

    expect(profile.equipment).toEqual(
      expect.arrayContaining([
        "commercial-fryer",
        "walk-in-chiller",
        "draught-beer-system",
        "beer-lines",
      ]),
    );

    expect(profile.capabilities).toEqual(
      expect.arrayContaining([
        "food-service",
        "draught-beer-service",
        "table-service",
        "takeaway",
      ]),
    );

    /*
     * 1 profession
     * 1 region
     * 1 venue type
     * 4 departments
     * 7 equipment items
     * 4 capabilities
     */
    expect(profile.facts).toHaveLength(18);

    expect(
      profile.facts.every(
        (fact) =>
          fact.source === "setup-wizard" &&
          fact.confidence === "confirmed" &&
          fact.active,
      ),
    ).toBe(true);
  });

  it("makes pub and cellar knowledge relevant to the Anne Arms", () => {
    const profile = createVenueProfileFromSetup("anne-arms", {
      profession: "hospitality",
      region: "uk-england-yorkshire",
      venueType: "pub",
      departments: ["kitchen", "bar", "cellar", "front-of-house"],
      equipment: [
        "commercial-fryer",
        "walk-in-chiller",
        "draught-beer-system",
        "beer-lines",
      ],
      capabilities: ["food-service", "draught-beer-service"],
    });

    const beerLineCleaning: TaggedKnowledgePackage = {
      id: "hospitality-cellar-beer-line-cleaning",
      version: "1.0.0",
      title: "Cleaning draught beer lines",
      summary:
        "Governed procedure for cleaning draught beer lines.",
      content: {
        procedure: [],
      },
      status: "approved",
      priority: "important",
      approvedBy: "Hospitality HQ",
      approvedAt: "2026-07-20T00:00:00.000Z",
      tags: {
        professions: ["hospitality"],
        regions: ["uk"],
        venueTypes: ["pub", "bar", "hotel-bar", "social-club"],
        departments: ["bar", "cellar"],
        equipment: ["draught-beer-system", "beer-lines"],
        topics: ["cellar", "hygiene", "maintenance"],
      },
    };

    expect(isKnowledgeApplicable(beerLineCleaning, profile)).toBe(
      true,
    );
  });

  it("does not make irrelevant hotel knowledge available", () => {
    const profile = createVenueProfileFromSetup("anne-arms", {
      profession: "hospitality",
      region: "uk-england-yorkshire",
      venueType: "pub",
      departments: ["kitchen", "bar", "cellar", "front-of-house"],
      equipment: [
        "commercial-fryer",
        "walk-in-chiller",
        "draught-beer-system",
        "beer-lines",
      ],
      capabilities: ["food-service", "draught-beer-service"],
    });

    const hotelBedroomKnowledge: TaggedKnowledgePackage = {
      id: "hospitality-hotel-bedroom-turnaround",
      version: "1.0.0",
      title: "Hotel bedroom turnaround",
      summary:
        "Governed procedure for preparing guest bedrooms.",
      content: {},
      status: "approved",
      priority: "routine",
      approvedBy: "Hospitality HQ",
      approvedAt: "2026-07-20T00:00:00.000Z",
      tags: {
        professions: ["hospitality"],
        regions: ["uk"],
        venueTypes: ["hotel"],
        departments: ["housekeeping"],
        topics: ["accommodation", "housekeeping"],
      },
    };

    expect(
      isKnowledgeApplicable(hotelBedroomKnowledge, profile),
    ).toBe(false);
  });
});
