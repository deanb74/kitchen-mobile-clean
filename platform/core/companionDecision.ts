export type CompanionAction =
  | "answer"
  | "observe"
  | "remember"
  | "reflect"
  | "ask"
  | "wait"
  | "escalate";

export interface CompanionDecision {
  action: CompanionAction;
  reason: string;
}