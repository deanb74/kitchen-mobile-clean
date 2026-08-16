import { deriveProposedInheritanceScope } from "../knowledge-governance/inheritanceScopeFromLearning";
import type {
    Reflection,
    ReflectionFinding,
} from "../reflection/Reflection";
import type {
    Learning,
    LearningDisposition,
    LearningEvidence,
    LearningProposal,
    ProposalCausationCategory,
} from "./Learning";

export interface BuildLearningInput {
  reflection: Reflection;
  learningId?: string;
  now?: string;
}

export class LearningEngine {
  build(input: BuildLearningInput): Learning {
    const now = input.now ?? new Date().toISOString();
    const reflection = input.reflection;

    const context = this.copyContext(reflection);
    const evidence = this.buildAuditEvidence(reflection);

    const disposition = this.selectDisposition(reflection);
    const confidence = this.scoreLearningConfidence(
      reflection,
      disposition,
    );

    const requiresHuman = this.requiresHuman(
      reflection,
      disposition,
    );

    const proposal = this.buildProposal(
      reflection,
      disposition,
      confidence,
      evidence,
    );

    this.assertProposalInvariant(disposition, proposal);

    return {
      id:
        input.learningId ??
        this.buildLearningId(reflection.id, now),
      context,
      disposition,
      proposal,
      validation: {
        state: "pending",
      },
      evidence,
      rationale: this.buildRationale(
        reflection,
        disposition,
      ),
      confidence,
      requiresHuman,
      createdAt: now,
      updatedAt: now,
    };
  }

  private copyContext(
    reflection: Reflection,
  ): Learning["context"] {
    return {
      reflectionId: reflection.id,
      reflectionDisposition: reflection.disposition,
      reflectionConfidence: this.clampConfidence(
        reflection.confidence,
      ),
      reflectionRequiresHuman: reflection.requiresHuman,

      actionId: reflection.context.actionId,
      executionId: reflection.context.executionId,
      executionCreatedAt: reflection.context.executionCreatedAt,
      executionCompletedAt: reflection.context.executionCompletedAt,
      executionOutcome: reflection.context.executionOutcome,
      executionEffect: reflection.context.executionEffect,
      priorJudgementDisposition: reflection.context.priorJudgementDisposition,
      priorUnderstandingConfidence: reflection.context.priorUnderstandingConfidence,
      priorUnderstandingCompleteness: reflection.context.priorUnderstandingCompleteness,
    };
  }

  private buildAuditEvidence(
    reflection: Reflection,
  ): LearningEvidence[] {
    const evidence: LearningEvidence[] = [
      {
        sourceType: "reflection-summary",
        sourceId: reflection.id,
        detail: reflection.summary,
      },
    ];

    for (let index = 0; index < reflection.findings.length; index += 1) {
      const finding = reflection.findings[index];

      evidence.push({
        sourceType: "reflection-finding",
        sourceId: `${reflection.id}:finding:${index}`,
        detail: finding.detail,
        severity: finding.severity,
      });
    }

    for (let index = 0; index < reflection.evidence.length; index += 1) {
      const item = reflection.evidence[index];

      evidence.push({
        sourceType: "reflection-evidence",
        sourceId: `${reflection.id}:evidence:${index}`,
        detail: item.detail,
        observedAt: item.at,
      });
    }

    for (let index = 0; index < reflection.uncertainty.length; index += 1) {
      const uncertainty = reflection.uncertainty[index];

      evidence.push({
        sourceType: "reflection-uncertainty",
        sourceId: `${reflection.id}:uncertainty:${index}`,
        detail: uncertainty,
      });
    }

    return evidence;
  }

  private selectDisposition(
    reflection: Reflection,
  ): LearningDisposition {
    if (this.isEmptySignal(reflection)) {
      return "reject";
    }

    if (this.hasCriticalOrHighGovernance(reflection.findings)) {
      return "observe";
    }

    if (reflection.disposition === "escalate") {
      return "observe";
    }

    if (reflection.disposition === "defer") {
      return "observe";
    }

    if (reflection.disposition === "adjust") {
      // Case D: high-confidence failure — require human review before proposing.
      if (this.isHighConfidenceFailure(reflection)) {
        return "observe";
      }
      return this.canProposeFromAdjust(reflection)
        ? "propose"
        : "observe";
    }

    if (reflection.disposition === "affirm") {
      return this.canReinforceFromAffirm(reflection)
        ? "reinforce"
        : "observe";
    }

    return "observe";
  }

  private isEmptySignal(reflection: Reflection): boolean {
    return (
      reflection.evidence.length === 0 &&
      reflection.findings.length === 0 &&
      reflection.recommendations.length === 0 &&
      reflection.uncertainty.length === 0
    );
  }

  private hasCriticalOrHighGovernance(
    findings: ReflectionFinding[],
  ): boolean {
    return findings.some((finding) => {
      if (finding.severity === "critical") {
        return true;
      }

      return (
        finding.category === "governance" &&
        finding.severity === "high"
      );
    });
  }

  private canProposeFromAdjust(
    reflection: Reflection,
  ): boolean {
    const hasEvidence = reflection.evidence.length > 0;
    const hasDirection =
      reflection.findings.length > 0 ||
      reflection.recommendations.length > 0;

    return (
      this.clampConfidence(reflection.confidence) >= 0.6 &&
      hasEvidence &&
      hasDirection
    );
  }

  private canReinforceFromAffirm(
    reflection: Reflection,
  ): boolean {
    const hasStrongEvidence = reflection.evidence.length > 0;
    const lowUncertainty = reflection.uncertainty.length === 0;

    return (
      this.clampConfidence(reflection.confidence) >= 0.75 &&
      hasStrongEvidence &&
      lowUncertainty
    );
  }

  private buildProposal(
    reflection: Reflection,
    disposition: LearningDisposition,
    confidence: number,
    auditEvidence: LearningEvidence[],
  ): LearningProposal | undefined {
    if (disposition === "reject" || disposition === "observe") {
      return undefined;
    }

    if (disposition === "propose") {
      return {
        whatShouldChange:
          this.pickWhatShouldChange(reflection) ??
          "Introduce a targeted process adjustment based on reflection findings.",
        why: this.buildProposalWhy(reflection),
        expectedBenefit:
          "Reduce recurrence of the observed issue while improving outcome consistency.",
        confidence: this.clampConfidence(confidence),
        supportingEvidence: this.copySupportingEvidence(
          auditEvidence,
          [
            "reflection-summary",
            "reflection-finding",
            "reflection-evidence",
            "reflection-uncertainty",
          ],
        ),
        informedByPersonContext:
          reflection.context.understandingContextSources?.includes("relationship") || undefined,
        causationCategory: this.deriveCausationCategory(reflection),
        proposedInheritanceScope: deriveProposedInheritanceScope(
          this.deriveCausationCategory(reflection),
          "single-source",
          this.isHighConfidenceFailure(reflection),
        ),
      };
    }

    return {
      whatShouldChange:
        "Strengthen support for the existing governed approach using new evidence.",
      why:
        "Reflection affirms the current governed approach and indicates evidence should strengthen confidence and provenance, without duplicating knowledge.",
      expectedBenefit:
        "Increase trust in existing governed knowledge through stronger supporting evidence and traceability.",
      confidence: this.clampConfidence(confidence),
      supportingEvidence: this.copySupportingEvidence(
        auditEvidence,
        [
          "reflection-summary",
          "reflection-finding",
          "reflection-evidence",
        ],
      ),
      informedByPersonContext:
        reflection.context.understandingContextSources?.includes("relationship") || undefined,
      causationCategory: this.deriveCausationCategory(reflection),
      proposedInheritanceScope: deriveProposedInheritanceScope(
        this.deriveCausationCategory(reflection),
        "single-source",
        this.isHighConfidenceFailure(reflection),
      ),
    };
  }

  // Case D: DC was confident and proceeding, yet outcome failed — require human review.
  private isHighConfidenceFailure(reflection: Reflection): boolean {
    return (
      reflection.context.priorJudgementDisposition === "proceed" &&
      (reflection.context.priorUnderstandingConfidence ?? 0) >= 0.75 &&
      reflection.context.executionOutcome === "failed"
    );
  }

  private deriveCausationCategory(reflection: Reflection): ProposalCausationCategory {
    const priorDisposition   = reflection.context.priorJudgementDisposition;
    const priorConfidence    = reflection.context.priorUnderstandingConfidence;
    const priorCompleteness  = reflection.context.priorUnderstandingCompleteness;
    const outcome            = reflection.context.executionOutcome;

    if (!priorDisposition) return "unknown";

    if (
      priorDisposition === "proceed" &&
      (priorConfidence ?? 0) >= 0.75 &&
      outcome === "failed"
    ) return "situational";

    if (priorDisposition === "caution" || priorCompleteness === "partial") {
      return "formation-gap";
    }

    return "knowledge-gap";
  }

  private pickWhatShouldChange(
    reflection: Reflection,
  ): string | undefined {
    if (reflection.recommendations.length > 0) {
      return reflection.recommendations[0];
    }

    if (reflection.findings.length > 0) {
      return `Address finding: ${reflection.findings[0].detail}`;
    }

    return undefined;
  }

  private buildProposalWhy(reflection: Reflection): string {
    const firstFinding = reflection.findings[0]?.detail;

    if (firstFinding) {
      return (
        `Reflection identified: ${firstFinding}. ` +
        "A governed proposal is required before any future change."
      );
    }

    return (
      "Reflection indicates improvement is advisable, and the proposal preserves governance before any knowledge change."
    );
  }

  private copySupportingEvidence(
    evidence: LearningEvidence[],
    sourceTypes: LearningEvidence["sourceType"][],
  ): ReadonlyArray<LearningEvidence> {
    return evidence
      .filter((item) => sourceTypes.includes(item.sourceType))
      .map((item) => ({ ...item }));
  }

  private assertProposalInvariant(
    disposition: LearningDisposition,
    proposal: LearningProposal | undefined,
  ): void {
    if (
      (disposition === "reject" || disposition === "observe") &&
      proposal
    ) {
      throw new Error(
        `Disposition "${disposition}" must not include a proposal.`,
      );
    }

    if (
      (disposition === "propose" || disposition === "reinforce") &&
      !proposal
    ) {
      throw new Error(
        `Disposition "${disposition}" requires a proposal.`,
      );
    }
  }

  private scoreLearningConfidence(
    reflection: Reflection,
    disposition: LearningDisposition,
  ): number {
    let score = this.clampConfidence(reflection.confidence);

    if (reflection.evidence.length === 0) {
      score -= 0.2;
    }

    score -= Math.min(0.2, reflection.uncertainty.length * 0.05);

    if (disposition === "reject") {
      score = Math.min(score, 0.2);
    }

    if (disposition === "observe") {
      score = Math.min(score, 0.7);
    }

    return this.clampConfidence(score);
  }

  private requiresHuman(
    reflection: Reflection,
    disposition: LearningDisposition,
  ): boolean {
    if (this.hasCriticalOrHighGovernance(reflection.findings)) {
      return true;
    }

    if (reflection.disposition === "escalate") {
      return true;
    }

    if (disposition === "propose") {
      return true;
    }

    return reflection.requiresHuman;
  }

  private buildRationale(
    reflection: Reflection,
    disposition: LearningDisposition,
  ): string {
    if (disposition === "reject") {
      return (
        "Learning signal is insufficient: no meaningful evidence, findings, recommendations, or uncertainty were recorded."
      );
    }

    if (this.hasCriticalOrHighGovernance(reflection.findings)) {
      return (
        "Critical safety or high-severity governance findings require human-governed observation before any proposal."
      );
    }

    if (reflection.disposition === "escalate") {
      return (
        "Reflection requires human attention first; learning remains in observe mode until human review occurs."
      );
    }

    if (reflection.disposition === "defer") {
      return (
        "Reflection is deferred; evidence is retained for future pattern detection without proposing change yet."
      );
    }

    if (disposition === "propose") {
      return (
        "Reflection indicates an advisable adjustment with sufficient confidence and evidence, so a governed proposal is created for review."
      );
    }

    if (disposition === "reinforce") {
      return (
        "Reflection affirms the current governed approach with strong support, so learning reinforces existing knowledge support without duplication."
      );
    }

    return (
      "Reflection does not yet meet proposal thresholds; retain observation under governance."
    );
  }

  private buildLearningId(
    reflectionId: string,
    now: string,
  ): string {
    const timestampKey = now
      .replace(/[^0-9]/g, "")
      .slice(0, 17);

    return ["learning", reflectionId, timestampKey].join("-");
  }

  private clampConfidence(value: number): number {
    return Number(
      Math.max(0, Math.min(1, value)).toFixed(2),
    );
  }
}
