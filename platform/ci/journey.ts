import { chooseNextRoute } from "./navigator";
import type {
  CapabilityRoute,
  CompanionContext,
  CompanionRouteDecision,
} from "./types";

export interface NavigationStep {
  sequence: number;
  route: CapabilityRoute;
  reason: string;
}

export interface CompanionJourney {
  context: CompanionContext;
  history: NavigationStep[];
  current: CompanionRouteDecision;
  complete: boolean;
}

export function beginCompanionJourney(
  context: CompanionContext
): CompanionJourney {
  const current = chooseNextRoute(context);

  return {
    context,
    history: [
      {
        sequence: 1,
        route: current.next,
        reason: current.reason,
      },
    ],
    current,
    complete: current.next === "complete",
  };
}

export function continueCompanionJourney(
  journey: CompanionJourney,
  context: CompanionContext
): CompanionJourney {
  const current = chooseNextRoute(context);
  const sequence = journey.history.length + 1;

  return {
    context,
    history: [
      ...journey.history,
      {
        sequence,
        route: current.next,
        reason: current.reason,
      },
    ],
    current,
    complete: current.next === "complete",
  };
}