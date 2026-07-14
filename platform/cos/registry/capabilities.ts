import type { Capability } from "./types";

export const capabilities: Capability[] = [
  {
    id: "observation",
    name: "Observation",
    classification: "universal+professional",
    status: "active",
    description:
      "Transforms observations into structured understanding.",
    inheritedBy: ["annie"],
  },
  {
    id: "reflection",
    name: "Reflection",
    classification: "universal",
    status: "active",
    description:
      "Turns experience into learning.",
    inheritedBy: ["annie"],
  },
  {
    id: "knowledge-routing",
    name: "Knowledge Routing",
    classification: "universal",
    status: "active",
    description:
      "Routes governed understanding through Helping Hand.",
    inheritedBy: ["helping-hand-hq"],
  },
  {
    id: "pollination",
    name: "Pollination",
    classification: "universal",
    status: "experimental",
    description:
      "Explores governed sharing of understanding.",
    inheritedBy: [],
  },
  {
    id: "translation",
    name: "Translation",
    classification: "universal+professional",
    status: "active",
    description:
      "Turns observations into explainable meaning using contextual rules.",
    inheritedBy: [],
  },
];