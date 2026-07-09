import type { ObservationSession } from "./observation";
import type { Opportunity } from "./opportunity";

/**
 * Turns what Annie has observed into possible ways she can help.
 */
export function discoverOpportunitiesFromObservation(
  session: ObservationSession
): Opportunity[] {
  const opportunities: Opportunity[] = [];

  const sawTables = session.observations.some((item) => item.id === "tables");
  const sawBar = session.observations.some((item) => item.id === "bar");

  if (sawTables) {
    opportunities.push({
      id: "table-plan",
      title: "Build Table Plan",
      description:
        "I’ve seen enough to start building your first table plan and seating capacity.",
      reason:
        "This can help with bookings, large parties, service planning and future layout changes.",
      priority: "high",
    });
  }

  if (sawBar) {
    opportunities.push({
      id: "bar-profile",
      title: "Create Bar Profile",
      description:
        "I’ve seen your bar and can start learning what you serve.",
      reason:
        "This can help with stock, menus, ordering and future drink changes.",
      priority: "medium",
    });
  }

  return opportunities;
}