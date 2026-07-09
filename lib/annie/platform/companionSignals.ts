export interface AnnieCompanionSignals {
  confidence: number;
  hasObservation: boolean;
  hasMemory: boolean;
  requiresClarification: boolean;
}

export function buildCompanionSignals(
  stimulus: string
): AnnieCompanionSignals {
  const text = stimulus.trim().toLowerCase();

  return {
    confidence: text.length > 0 ? 0.6 : 0,
    hasObservation:
      text.includes("look") ||
      text.includes("see") ||
      text.includes("show"),
    hasMemory:
      text.includes("remember") ||
      text.includes("before") ||
      text.includes("last time"),
    requiresClarification:
      text.includes("thing") ||
      text.includes("stuff") ||
      text.length < 8,
  };
}