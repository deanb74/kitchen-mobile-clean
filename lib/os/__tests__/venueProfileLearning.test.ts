import {
  addVenueProfileFact,
  confirmVenueProfileFact,
  createEmptyVenueKnowledgeProfile,
  isKnowledgeApplicable,
  removeVenueProfileFact,
  type TaggedKnowledgePackage,
} from "../index";

const beerLineCleaning: TaggedKnowledgePackage = {
  id: "hospitality-cellar-beer-line-cleaning",
  version: "1.0.0",
  title: "Cleaning draught beer lines",
  summary: "Governed procedure for cleaning draught beer lines.",
  content: {},
  status: "approved",
  priority: "important",
  approvedBy: "Hospitality HQ",
  approvedAt: "2026-07-19T00:00:00.000Z",
  tags: {
    professions: ["hospitality"],
    regions: ["uk"],
    venueTypes: ["pub", "bar"],
    departments: ["cellar"],
    equipment: ["beer-lines"],
    topics: ["hygiene", "cellar"],
  },
};

describe("Annie builds the venue knowledge profile", () => {
  it("builds the profile one discovery at a time", () => {
    let profile = createEmptyVenueKnowledgeProfile(
      "anne-arms",
      "2026-07-19T10:00:00.000Z",
    );

    profile = addVenueProfileFact(profile, {
      dimension: "profession",
      value: "Hospitality",
      source: "annie-conversation",
      confidence: "confirmed",
      observedAt: "2026-07-19T10:01:00.000Z",
      confirmedAt: "2026-07-19T10:01:00.000Z",
    });

    profile = addVenueProfileFact(profile, {
      dimension: "region",
      value: "UK-England-Yorkshire",
      source: "system-import",
      confidence: "confirmed",
      observedAt: "2026-07-19T10:02:00.000Z",
      confirmedAt: "2026-07-19T10:02:00.000Z",
    });

    profile = addVenueProfileFact(profile, {
      dimension: "venue-type",
      value: "Pub",
      source: "annie-observation",
      confidence: "observed",
      observedAt: "2026-07-19T10:03:00.000Z",
    });

    profile = addVenueProfileFact(profile, {
      dimension: "department",
      value: "Cellar",
      source: "annie-observation",
      confidence: "observed",
      observedAt: "2026-07-19T10:04:00.000Z",
    });

    expect(profile.venueTypes).toEqual(["pub"]);
    expect(profile.departments).toEqual(["cellar"]);
    expect(profile.facts).toHaveLength(4);
  });

  it("unlocks relevant knowledge when Annie discovers equipment", () => {
    let profile = createEmptyVenueKnowledgeProfile("anne-arms");

    const facts = [
      ["profession", "hospitality"],
      ["region", "uk-england-yorkshire"],
      ["venue-type", "pub"],
      ["department", "cellar"],
    ] as const;

    for (const [dimension, value] of facts) {
      profile = addVenueProfileFact(profile, {
        dimension,
        value,
        source: "annie-conversation",
        confidence: "confirmed",
        observedAt: "2026-07-19T10:00:00.000Z",
      });
    }

    expect(isKnowledgeApplicable(beerLineCleaning, profile)).toBe(false);

    profile = addVenueProfileFact(profile, {
      dimension: "equipment",
      value: "Beer Lines",
      source: "annie-observation",
      confidence: "observed",
      observedAt: "2026-07-19T10:10:00.000Z",
    });

    expect(isKnowledgeApplicable(beerLineCleaning, profile)).toBe(true);
  });

  it("allows Annie to ask for confirmation", () => {
    let profile = createEmptyVenueKnowledgeProfile("anne-arms");

    profile = addVenueProfileFact(profile, {
      dimension: "equipment",
      value: "walk-in-chiller",
      source: "annie-observation",
      confidence: "observed",
      observedAt: "2026-07-19T10:00:00.000Z",
    });

    const fact = profile.facts[0];

    profile = confirmVenueProfileFact(
      profile,
      fact.id,
      "2026-07-19T10:05:00.000Z",
    );

    expect(profile.facts[0].confidence).toBe("confirmed");
    expect(profile.facts[0].confirmedAt).toBe(
      "2026-07-19T10:05:00.000Z",
    );
  });

  it("removes knowledge relevance when equipment leaves the venue", () => {
    let profile = createEmptyVenueKnowledgeProfile("anne-arms");

    const facts = [
      ["profession", "hospitality"],
      ["region", "uk-england"],
      ["venue-type", "pub"],
      ["department", "cellar"],
      ["equipment", "beer-lines"],
    ] as const;

    for (const [dimension, value] of facts) {
      profile = addVenueProfileFact(profile, {
        dimension,
        value,
        source: "manager-confirmation",
        confidence: "confirmed",
        observedAt: "2026-07-19T10:00:00.000Z",
      });
    }

    expect(isKnowledgeApplicable(beerLineCleaning, profile)).toBe(true);

    const beerLineFact = profile.facts.find(
      (fact) =>
        fact.dimension === "equipment" &&
        fact.value === "beer-lines",
    );

    expect(beerLineFact).toBeDefined();

    profile = removeVenueProfileFact(
      profile,
      beerLineFact!.id,
      "2026-07-19T11:00:00.000Z",
    );

    expect(profile.equipment).not.toContain("beer-lines");
    expect(isKnowledgeApplicable(beerLineCleaning, profile)).toBe(false);
  });

  it("lets the setup wizard use the same profile process", () => {
    let profile = createEmptyVenueKnowledgeProfile("venue-001");

    profile = addVenueProfileFact(profile, {
      dimension: "venue-type",
      value: "chip-shop",
      source: "setup-wizard",
      confidence: "confirmed",
      observedAt: "2026-07-19T10:00:00.000Z",
    });

    expect(profile.venueTypes).toEqual(["chip-shop"]);
    expect(profile.facts[0].source).toBe("setup-wizard");
  });
});
