export interface UnderstandingContext {
  question: string;
  confidence: number;
  observations: string[];
  memories: string[];
  requiresClarification: boolean;
}

export interface UnderstandingResult {
  understood: boolean;
  confidence: number;
  nextStep:
    | "reflect"
    | "observe"
    | "ask"
    | "research"
    | "communicate";
}