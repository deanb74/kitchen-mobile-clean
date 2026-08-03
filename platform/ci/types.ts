export type CapabilityRoute =
  | "observe"
  | "translate"
  | "reflect"
  | "conversation"
  | "demonstrate"
  | "instruct"
  | "complete";

export interface CompanionContext {
  hasObservations: boolean;
  hasTranslations: boolean;
  needsReflection: boolean;
  needsClarification: boolean;
  requiresDemonstration?: boolean;
  requiresImmediateInstruction?: boolean;
  requiresComplianceInstruction?: boolean;
}

export interface CompanionRouteDecision {
  next: CapabilityRoute;
  reason: string;
}