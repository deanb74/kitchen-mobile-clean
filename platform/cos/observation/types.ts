export type ObservationSource =
  | "vision"
  | "conversation"
  | "document"
  | "sensor"
  | "system"
  | "human";

export type ObservationPriority = "low" | "medium" | "high";

export interface Observation {
  id: string;
  category: string;
  description: string;
  confidence: number;
  source: ObservationSource;
}

export interface ObservationQuestion {
  observationId: string;
  question: string;
  reason: string;
  priority: ObservationPriority;
}

export interface ObservationSession {
  observations: Observation[];
  questions: ObservationQuestion[];
}