import type { Judgement, JudgementDisposition } from "../judgement/Judgement";
import type { AuthorityContext } from "./Authority";

type RiskLevel = NonNullable<AuthorityContext["riskLevel"]>;

const RISK_SEVERITY: Record<RiskLevel, number> = {
  low:      1,
  medium:   2,
  high:     3,
  critical: 4,
};

const DISPOSITION_TO_MINIMUM_RISK: Record<JudgementDisposition, RiskLevel> = {
  proceed:          "low",
  caution:          "medium",
  "human-required": "high",
  insufficient:     "critical",
};

/**
 * Returns the minimum risk level appropriate to the quality of understanding
 * that produced this Judgement. Per PD-010, risk is not only a property of
 * the action — it is partially a property of the understanding.
 */
export function judgementToMinimumRiskLevel(judgement: Judgement): RiskLevel {
  return DISPOSITION_TO_MINIMUM_RISK[judgement.disposition];
}

/**
 * Returns the higher severity of the caller-supplied risk level and the
 * judgement-derived minimum. The caller may escalate; may not understate.
 * When callerRiskLevel is absent, the judgement minimum applies.
 */
export function applyRiskFloor(
  callerRiskLevel: RiskLevel | undefined,
  judgement: Judgement,
): RiskLevel {
  const floor = judgementToMinimumRiskLevel(judgement);
  if (!callerRiskLevel) return floor;
  return RISK_SEVERITY[callerRiskLevel] >= RISK_SEVERITY[floor]
    ? callerRiskLevel
    : floor;
}
