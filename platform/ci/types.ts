export type CapabilityRoute =
  | "observe"
  | "translate"
  | "reflect"
  | "conversation"
  | "complete";

export interface CompanionContext {
  hasObservations: boolean;
  hasTranslations: boolean;
  needsReflection: boolean;
  needsClarification: boolean;
}

export interface CompanionRouteDecision {
  next: CapabilityRoute;
  reason: string;
}