import { RecallSource } from "./recallSource";

export interface RecallResult {
  source: RecallSource;
  confidence: number;
  summary: string;
}