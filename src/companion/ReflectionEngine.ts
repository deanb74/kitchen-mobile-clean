import type { EvidencePacket, ReflectionRecord } from "./types";

export class ReflectionEngine {
  reflect(evidence: EvidencePacket): ReflectionRecord {
    const findings: string[] = [];
    const recommendations: string[] = [];

    if (evidence.action.outcome === "failed") {
      findings.push("Action failed during execution.");
      recommendations.push("Escalate failure pattern for operational review.");
    }

    if (!evidence.context.networkAvailable) {
      findings.push("Action was performed while offline mode was active.");
      recommendations.push("Verify deferred sync integrity after reconnection.");
    }

    if (evidence.artifacts.length === 0) {
      findings.push("No additional artifacts were attached to evidence packet.");
      recommendations.push("Capture at least one supporting artifact for similar actions.");
    }

    if (findings.length === 0) {
      findings.push("Execution was stable and evidence-complete for this request.");
      recommendations.push("Candidate for repeatable companion playbook.");
    }

    const characterCompliant =
      !evidence.decision.rationale.toLowerCase().includes("dismiss");

    const promotionCandidate =
      evidence.action.outcome === "succeeded" &&
      evidence.authority.disposition !== "deny" &&
      characterCompliant;

    const confidence = promotionCandidate ? 0.85 : 0.65;
    const now = new Date().toISOString();

    return {
      reflectionId: `ref-${evidence.requestId}`,
      requestId: evidence.requestId,
      findings,
      recommendations,
      characterCompliant,
      promotionCandidate,
      confidence,
      createdAt: now,
    };
  }
}
