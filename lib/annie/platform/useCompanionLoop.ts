import { runCompanionLoop } from "../../../platform/core";
import { beginCompanionship } from "../../../platform/core/companion";
import { buildCompanionSignals } from "./companionSignals";

export function askAnnie(stimulus: string) {
  return runCompanionLoop({
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
    stimulus,
  });
}

export function askAnnieWithCompanionRoot(stimulus: string) {
  const signals = buildCompanionSignals(stimulus);

  return beginCompanionship({
    stimulus,
    ...signals,
  });
}