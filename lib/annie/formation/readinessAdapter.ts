import { seekFirstToUnderstand } from "../../../platform/core/companion/understanding";
import type { FormationInput } from "../../../platform/cos/understanding-formation";
import {
    validateFormationInputs,
    type StructuralReadinessReport,
} from "../../../platform/cos/understanding-formation/readiness";
import type { AnnieThought } from "../thinking";

export type ReadinessNextStep =
  | "form"
  | "observe"
  | "ask"
  | "research"
  | "remember"
  | "wait";

/**
 * ReadinessDecision — DC-owned output of the Pre-Formation Readiness Gate.
 *
 * ready:       whether form() should be called now
 * nextStep:    what the DC should do if not ready (or "form" if ready)
 * gaps:        evidence of what is missing — structural + professional combined
 * explanation: human-readable description of the routing choice (not hidden reasoning)
 */
export interface ReadinessDecision {
  ready: boolean;
  nextStep: ReadinessNextStep;
  gaps: string[];
  explanation?: string;
}

/**
 * assessReadiness — DC Pre-Formation Readiness Gate
 *
 * Combines:
 *   AnnieThought          (DC's self-assessed professional state)
 *   validateFormationInputs() (COS structural check)
 *   professionalGaps      (DC-identified domain content gaps)
 *
 * Routes through seekFirstToUnderstand() when structurally ready.
 *
 * The gate recommends. The DC decides. form() remains unconditional.
 */
export function assessReadiness(
  thought: AnnieThought,
  candidateInput: Partial<FormationInput>,
  professionalGaps: string[] = [],
): ReadinessDecision {
  const structuralReport = validateFormationInputs(candidateInput);
  const allGaps = [...structuralReport.structuralGaps, ...professionalGaps];

  if (allGaps.length > 0) {
    const nextStep = routeFromGaps(thought, structuralReport);
    return {
      ready: false,
      nextStep,
      gaps: allGaps,
      explanation: buildExplanation(nextStep, allGaps),
    };
  }

  // Structurally complete. Check DC professional state via seekFirstToUnderstand.
  const seeking = seekFirstToUnderstand({
    stimulus: thought.stimulus,
    confidence: thought.confidence,
    // translations are present when we reach here, so hasObservation is false
    hasObservation: false,
    hasMemory: (candidateInput.context?.institutional?.length ?? 0) > 0,
    requiresClarification: thought.needsClarification,
  });

  if (seeking.nextStep === "reflect") {
    return {
      ready: true,
      nextStep: "form",
      gaps: [],
      explanation: "Formation inputs are present and DC confidence is sufficient.",
    };
  }

  return {
    ready: false,
    nextStep: seeking.nextStep,
    gaps: [],
    explanation: seeking.reason,
  };
}

// Routes to the seeking action that most directly addresses the highest-priority gap.
function routeFromGaps(
  thought: AnnieThought,
  report: StructuralReadinessReport,
): ReadinessNextStep {
  if (report.structuralGaps.some((g) => g.includes("translated"))) {
    return "observe";
  }
  if (report.structuralGaps.some((g) => g.includes("knowledge"))) {
    return "research";
  }
  if (report.structuralGaps.some((g) => g.includes("context"))) {
    return "ask";
  }
  if (thought.needsClarification) {
    return "ask";
  }
  return "research";
}

function buildExplanation(nextStep: ReadinessNextStep, gaps: string[]): string {
  const gapList = gaps.join(" ");
  switch (nextStep) {
    case "observe":
      return `${gapList} Observations must be translated before formation can proceed.`;
    case "ask":
      return `${gapList} Clarification is required before formation can proceed.`;
    case "research":
      return `${gapList} Additional knowledge must be retrieved before formation can proceed.`;
    case "remember":
      return `${gapList} Prior context should be recalled before formation can proceed.`;
    case "wait":
      return "Nothing to process yet.";
    default:
      return gapList;
  }
}
