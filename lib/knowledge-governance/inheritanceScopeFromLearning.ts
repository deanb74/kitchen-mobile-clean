import type { EvidenceLevel } from "../knowledge/Concept";
import type { ProposalCausationCategory, ProposedInheritanceScope } from "../learning/Learning";

/**
 * Derives the appropriate minimum inheritance scope for a learning proposal.
 *
 * Per PD-012: inheritance must be proportional to evidence breadth.
 * This is a hypothesis for the governance reviewer — not a governance decision.
 *
 * A newly proposed learning has not yet been validated across sources.
 * The default for knowledge-gap is "venue" — the reviewer promotes it
 * when multi-source evidence has accumulated.
 */
export function deriveProposedInheritanceScope(
  causationCategory: ProposalCausationCategory | undefined,
  evidenceLevel: EvidenceLevel,
  isHighConfidenceFailure: boolean,
): ProposedInheritanceScope {
  // High-confidence failure — circumstances may have changed; do not propagate.
  if (isHighConfidenceFailure) return "session";

  if (!causationCategory) return "session";

  // Exceptional or unknown causation — cautious by default.
  if (causationCategory === "situational") return "session";
  if (causationCategory === "unknown") return "session";

  // Formation gaps are venue-specific — the fix is in observation/translation quality.
  if (causationCategory === "formation-gap") return "venue";

  // Knowledge gaps: scope scales with evidence breadth.
  if (causationCategory === "knowledge-gap") {
    if (evidenceLevel === "constitutional") return "universal";
    if (evidenceLevel === "multi-source") return "profession";
    return "venue"; // single-source or candidate — stay local
  }

  return "venue";
}
