import type { Observation } from "../../../platform/cos/observation";

export type { Observation } from "../../../platform/cos/observation";

/**
 * Annie's Eyes
 *
 * COS defines what an observation is.
 * Annie supplies hospitality observations from her world.
 *
 * Annie never guesses.
 * She describes what she believes she can see.
 */
export function observe(): Observation[] {
  return [
    {
      id: "bar",
      category: "area",
      description: "I can see what looks like a bar.",
      confidence: 0.92,
      source: "vision",
    },
    {
      id: "tables",
      category: "furniture",
      description: "I can see several tables.",
      confidence: 0.89,
      source: "vision",
    },
  ];
}