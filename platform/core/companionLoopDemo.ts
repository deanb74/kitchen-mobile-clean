import { runCompanionLoop } from "./companionLoop";
import type { CompanionContext } from "./companionContext";

const demoContext: CompanionContext = {
  user: {
    id: "user-001",
    name: "Dean",
    role: "owner",
  },
  venue: {
    id: "venue-001",
    name: "Anne Arms",
    industry: "hospitality",
  },
  digitalColleague: {
    id: "hh-0001",
    name: "Annie",
    industry: "hospitality",
    assignedVenueId: "venue-001",
  },
  stimulus: "Annie, can you help me understand my GP?",
};

export const companionLoopDemo = runCompanionLoop(demoContext);