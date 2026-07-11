import type {
    GovernanceDecision,
    PollinationCandidate,
} from "./types";

/**
 * Governance
 *
 * Pollination must satisfy Helping Hand principles
 * before learning can travel beyond its local context.
 *
 * Confidence alone is never enough.
 */
export function evaluateGovernance(
  candidate: PollinationCandidate
): GovernanceDecision {
  const reasons: string[] = [];
  const warnings: string[] = [];

  if (candidate.confidence < 0.9) {
    reasons.push("Confidence is below the required threshold.");
  }

  if (!candidate.evidenceProvided) {
    reasons.push("Supporting evidence has not been provided.");
  }

  if (!candidate.reflectionComplete) {
    reasons.push("The learning has not completed reflection.");
  }

  if (!candidate.privacyChecked) {
    reasons.push("Privacy has not been checked.");
  }

  if (!candidate.safetyChecked) {
    reasons.push("Safety has not been checked.");
  }

  if (!candidate.contextValidated) {
    reasons.push("The limits of the original context have not been validated.");
  }

  if (!candidate.current) {
    reasons.push("The learning may no longer be current.");
  }

  if (!candidate.reusable) {
    reasons.push("The learning is not reusable beyond its local context.");
  }

  if (candidate.safetyCritical) {
    warnings.push("Safety-critical learning requires human review.");
  }

  const approved = reasons.length === 0;
  const reviewRequired =
    candidate.safetyCritical || warnings.length > 0;

  return {
    approved,
    reasons,
    warnings,
    reviewRequired,
  };
}