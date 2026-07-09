import type { UnderstandingDomain } from "./understanding";

export type AnnieInputSource =
  | "conversation"
  | "email"
  | "document"
  | "photo"
  | "system"
  | "sensor";

export interface AnnieInput {
  source: AnnieInputSource;
  content: string;
  receivedAt?: string;
  from?: string;
}

export interface AnnieResponse {
  understood: boolean;
  summary: string;
  belongsTo: UnderstandingDomain;
  suggestedAction?: string;
}

export function receive(input: AnnieInput): AnnieResponse {
  const receivedAt = input.receivedAt ?? new Date().toISOString();

  return {
    understood: true,
    summary: `Received ${input.source} input at ${receivedAt}: ${input.content}`,
    belongsTo: "knowledge",
    suggestedAction: "Decide where this belongs in Annie's understanding.",
  };
}