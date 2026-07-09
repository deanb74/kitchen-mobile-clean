export interface CompanionInput {
  stimulus: string;
  confidence: number;
  hasObservation: boolean;
  hasMemory: boolean;
  requiresClarification: boolean;
}

export type CompanionNextStep =
  | "reflect"
  | "observe"
  | "remember"
  | "ask"
  | "research"
  | "wait";

export interface CompanionUnderstanding {
  understood: boolean;
  confidence: number;
  nextStep: CompanionNextStep;
  reason: string;
}

export interface CompanionRootResult {
  understanding: CompanionUnderstanding;
  reflection: import("./reflection").CompanionReflection;
  decision: import("./decision").CompanionRootDecision;
  intent: import("./intent").CompanionIntentResult;
  communication: import("./communication").CompanionCommunication;
}