/**
 * Milestone 049 — Authority Context Boundary
 *
 * Proves: Judgement quality → minimum authority risk → explainable AuthorityAssessment
 *
 * Seven proof conditions:
 *   PC1 — "proceed"        → "low"
 *   PC2 — "caution"        → "medium"
 *   PC3 — "human-required" → "high"
 *   PC4 — "insufficient"   → "critical"
 *   PC5 — applyRiskFloor: caller "low" + caution-judgement → "medium" (floor applied)
 *   PC6 — applyRiskFloor: caller "high" + proceed-judgement → "high" (caller escalates)
 *   PC7 — applyRiskFloor: caller absent + caution-judgement → "medium" (floor is default)
 */

import { describe, expect, it } from "@jest/globals";
import type { Judgement } from "../../judgement/Judgement";
import type { Understanding } from "../../understanding/Understanding";
import { applyRiskFloor, judgementToMinimumRiskLevel } from "../authorityFromJudgement";

const NOW = "2026-08-06T14:00:00.000Z";

function makeJudgement(
  disposition: Judgement["disposition"],
  confidence = 0.75,
): Judgement {
  const understanding: Understanding = {
    summary: "Test understanding.",
    confidence,
    uncertainty: [],
    completeness: "sufficient",
    evidenceChain: [],
    contextSources: [],
    createdAt: NOW,
    updatedAt: NOW,
  };

  return {
    understanding,
    candidates: [{ kind: "advise", description: "Advise." }],
    selected: { kind: "advise", description: "Advise." },
    disposition,
    reason: `Disposition: ${disposition}`,
    confidence,
    uncertainty: [],
    governingPrinciples: [],
    requiresHuman: disposition === "human-required" || disposition === "insufficient",
    createdAt: NOW,
    updatedAt: NOW,
  };
}

// ── PC1–PC4: judgementToMinimumRiskLevel() ────────────────────────────────────

describe("Milestone 049 — PC1: proceed → low", () => {
  it("'proceed' disposition maps to minimum risk 'low'", () => {
    expect(judgementToMinimumRiskLevel(makeJudgement("proceed"))).toBe("low");
  });
});

describe("Milestone 049 — PC2: caution → medium", () => {
  it("'caution' disposition maps to minimum risk 'medium'", () => {
    expect(judgementToMinimumRiskLevel(makeJudgement("caution"))).toBe("medium");
  });
});

describe("Milestone 049 — PC3: human-required → high", () => {
  it("'human-required' disposition maps to minimum risk 'high'", () => {
    expect(judgementToMinimumRiskLevel(makeJudgement("human-required"))).toBe("high");
  });
});

describe("Milestone 049 — PC4: insufficient → critical", () => {
  it("'insufficient' disposition maps to minimum risk 'critical'", () => {
    expect(judgementToMinimumRiskLevel(makeJudgement("insufficient"))).toBe("critical");
  });
});

// ── PC5–PC7: applyRiskFloor() ─────────────────────────────────────────────────

describe("Milestone 049 — PC5: floor applied when caller understates", () => {
  it("caller 'low' with caution-judgement → 'medium'", () => {
    expect(applyRiskFloor("low", makeJudgement("caution"))).toBe("medium");
  });

  it("caller 'low' with human-required-judgement → 'high'", () => {
    expect(applyRiskFloor("low", makeJudgement("human-required"))).toBe("high");
  });

  it("caller 'medium' with insufficient-judgement → 'critical'", () => {
    expect(applyRiskFloor("medium", makeJudgement("insufficient"))).toBe("critical");
  });
});

describe("Milestone 049 — PC6: caller may escalate beyond judgement minimum", () => {
  it("caller 'high' with proceed-judgement → 'high'", () => {
    expect(applyRiskFloor("high", makeJudgement("proceed"))).toBe("high");
  });

  it("caller 'critical' with caution-judgement → 'critical'", () => {
    expect(applyRiskFloor("critical", makeJudgement("caution"))).toBe("critical");
  });
});

describe("Milestone 049 — PC7: absent caller risk defaults to judgement floor", () => {
  it("undefined caller + caution-judgement → 'medium'", () => {
    expect(applyRiskFloor(undefined, makeJudgement("caution"))).toBe("medium");
  });

  it("undefined caller + proceed-judgement → 'low'", () => {
    expect(applyRiskFloor(undefined, makeJudgement("proceed"))).toBe("low");
  });
});

// ── Existing safety behaviour is preserved ────────────────────────────────────

describe("Milestone 049 — existing safety behaviour preserved", () => {
  it("equal severity: caller 'medium' with caution-judgement → 'medium' (no change)", () => {
    expect(applyRiskFloor("medium", makeJudgement("caution"))).toBe("medium");
  });

  it("equal severity: caller 'high' with human-required-judgement → 'high'", () => {
    expect(applyRiskFloor("high", makeJudgement("human-required"))).toBe("high");
  });
});
