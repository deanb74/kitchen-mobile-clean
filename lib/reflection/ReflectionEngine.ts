import type {
    Execution,
    ExecutionEvidence
} from "../execution/Execution";
import type { JudgementDisposition } from "../judgement/Judgement";
import type { UnderstandingCompleteness } from "../understanding/Understanding";
import type {
    Reflection,
    ReflectionContext,
    ReflectionDisposition,
    ReflectionFinding,
} from "./Reflection";

export interface BuildReflectionInput {
  execution: Execution;
  reflectionId?: string;
  now?: string;
  /** From Understanding.contextSources — carries source authority into the reflection chain. */
  understandingContextSources?: string[];
  /** From Judgement.disposition — carries prior judgement quality into reflection. */
  priorJudgementDisposition?: JudgementDisposition;
  /** From Understanding.confidence — carries prior understanding quality into reflection. */
  priorUnderstandingConfidence?: number;
  /** From Understanding.completeness — carries prior input adequacy into reflection. */
  priorUnderstandingCompleteness?: UnderstandingCompleteness;
}

export class ReflectionEngine {
  reflect(input: BuildReflectionInput): Reflection {
    const now = input.now ?? new Date().toISOString();
    const context = this.copyContext(input.execution, input);
    const evidence = this.copyEvidence(input.execution.evidence);

    const findings = this.deriveFindings(
      input.execution,
      evidence,
    );
    const uncertainty = this.deriveUncertainty(
      input.execution,
      evidence,
      findings,
    );

    const confidence = this.scoreConfidence(
      input.execution,
      evidence,
      uncertainty,
    );

    const disposition = this.selectDisposition(
      input.execution,
      evidence,
      findings,
      uncertainty,
      confidence,
    );

    const requiresHuman = this.requiresHumanReview(
      disposition,
      findings,
      confidence,
      uncertainty,
    );

    return {
      id:
        input.reflectionId ??
        this.buildReflectionId(input.execution.id, now),
      context,
      summary: this.buildSummary(
        input.execution,
        disposition,
      ),
      findings,
      evidence,
      disposition,
      requiresHuman,
      recommendations: this.buildRecommendations(
        disposition,
        requiresHuman,
      ),
      uncertainty,
      confidence,
      createdAt: now,
      updatedAt: now,
    };
  }

  private copyContext(execution: Execution, input: BuildReflectionInput): ReflectionContext {
    return {
      actionId: execution.action.id,
      executionId: execution.id,
      executionCreatedAt: execution.createdAt,
      executionCompletedAt: execution.completedAt,
      actionState: execution.action.state,
      actionDisposition: execution.action.disposition,
      executionOutcome: execution.outcome,
      executionEffect: execution.effect,
      understandingContextSources: input.understandingContextSources,
      priorJudgementDisposition: input.priorJudgementDisposition,
      priorUnderstandingConfidence: input.priorUnderstandingConfidence,
      priorUnderstandingCompleteness: input.priorUnderstandingCompleteness,
    };
  }

  private copyEvidence(
    evidence: ExecutionEvidence[],
  ): ExecutionEvidence[] {
    return evidence.map((item) => ({
      ...item,
    }));
  }

  private deriveFindings(
    execution: Execution,
    evidence: ExecutionEvidence[],
  ): ReflectionFinding[] {
    const findings: ReflectionFinding[] = [];

    if (
      execution.outcome === "not-attempted" &&
      !execution.permitted
    ) {
      findings.push({
        category: "governance",
        detail:
          "Action was not attempted because governance did not permit execution.",
        severity: "low",
      });
    }

    if (execution.outcome === "failed") {
      findings.push({
        category: "quality",
        detail:
          execution.error
            ? `Execution failed: ${execution.error}`
            : "Execution failed without explicit error detail.",
        severity: execution.error ? "high" : "medium",
      });
    }

    if (execution.outcome === "cancelled") {
      findings.push({
        category: "communication",
        detail:
          execution.cancellationReason
            ? `Execution was cancelled: ${execution.cancellationReason}`
            : "Execution was cancelled without recorded reason.",
        severity:
          execution.cancellationReason ? "low" : "medium",
      });
    }

    if (
      execution.attempted &&
      ["succeeded", "failed", "cancelled"].includes(
        execution.outcome,
      ) &&
      !execution.completedAt
    ) {
      findings.push({
        category: "timing",
        detail:
          "Terminal attempted outcome is missing completion timestamp evidence.",
        severity: "high",
      });
    }

    const signalFindings = this.findSignalFindings(
      execution,
      evidence,
    );

    return [...findings, ...signalFindings];
  }

  private findSignalFindings(
    execution: Execution,
    evidence: ExecutionEvidence[],
  ): ReflectionFinding[] {
    const findings: ReflectionFinding[] = [];

    const corpus = [
      execution.summary,
      execution.error,
      execution.cancellationReason,
      ...evidence.map((item) => item.detail),
    ]
      .filter((item): item is string =>
        typeof item === "string",
      )
      .join(" ")
      .toLowerCase();

    const safetyCriticalTerms = [
      "critical",
      "safety-critical",
      "emergency",
      "harm",
      "unsafe",
    ];

    if (
      safetyCriticalTerms.some((term) =>
        this.containsTerm(corpus, term),
      )
    ) {
      findings.push({
        category: "safety",
        detail:
          "Safety-critical evidence was detected in execution records.",
        severity: "critical",
      });
    }

    const governanceHighTerms = [
      "policy breach",
      "governance breach",
      "unauthorised",
      "unauthorized",
      "compliance breach",
      "regulatory breach",
    ];

    if (
      governanceHighTerms.some((term) =>
        this.containsTerm(corpus, term),
      )
    ) {
      findings.push({
        category: "governance",
        detail:
          "High-severity governance risk was detected in execution records.",
        severity: "high",
      });
    }

    return findings;
  }

  private containsTerm(
    corpus: string,
    term: string,
  ): boolean {
    const escaped = term.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&",
    );

    return new RegExp(
      `\\b${escaped.replace(/\\s+/g, "\\\\s+")}\\b`,
      "i",
    ).test(corpus);
  }

  private deriveUncertainty(
    execution: Execution,
    evidence: ExecutionEvidence[],
    findings: ReflectionFinding[],
  ): string[] {
    const uncertainty: string[] = [];

    if (evidence.length === 0) {
      uncertainty.push(
        "No execution evidence entries were recorded.",
      );
    }

    if (execution.outcome === "cancelled" && !execution.cancellationReason) {
      uncertainty.push(
        "Cancellation reason is missing from execution records.",
      );
    }

    if (
      execution.outcome === "not-attempted" &&
      execution.permitted
    ) {
      uncertainty.push(
        "Permitted action was not attempted; rationale is not fully evidenced.",
      );
    }

    if (
      findings.some(
        (finding) =>
          finding.category === "timing" &&
          finding.severity === "high",
      )
    ) {
      uncertainty.push(
        "Timing evidence is incomplete for a terminal attempted outcome.",
      );
    }

    return uncertainty;
  }

  private scoreConfidence(
    execution: Execution,
    evidence: ExecutionEvidence[],
    uncertainty: string[],
  ): number {
    let score = 0.85;

    if (execution.outcome === "failed") {
      score -= 0.2;
    }

    if (execution.outcome === "cancelled") {
      score -= 0.12;
    }

    if (execution.outcome === "not-attempted") {
      score -= 0.18;
    }

    if (evidence.length === 0) {
      score -= 0.25;
    }

    score -= Math.min(0.25, uncertainty.length * 0.07);

    return Number(Math.max(0, Math.min(1, score)).toFixed(2));
  }

  private selectDisposition(
    execution: Execution,
    evidence: ExecutionEvidence[],
    findings: ReflectionFinding[],
    uncertainty: string[],
    confidence: number,
  ): ReflectionDisposition {
    if (this.hasEscalationFinding(findings)) {
      return "escalate";
    }

    if (confidence < 0.45 || uncertainty.length > 1) {
      return "defer";
    }

    if (execution.outcome === "failed") {
      return "adjust";
    }

    if (execution.outcome === "cancelled") {
      return evidence.length > 0 ? "adjust" : "defer";
    }

    if (execution.outcome === "not-attempted") {
      // Governance non-attempt is not a failure state.
      return "defer";
    }

    if (execution.outcome === "succeeded") {
      const adequateEvidence = evidence.length > 0;

      return adequateEvidence && confidence >= 0.65
        ? "affirm"
        : "defer";
    }

    return "defer";
  }

  private hasEscalationFinding(
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

  private requiresHumanReview(
    disposition: ReflectionDisposition,
    findings: ReflectionFinding[],
    confidence: number,
    uncertainty: string[],
  ): boolean {
    if (disposition === "escalate") {
      return true;
    }

    if (
      findings.some((finding) => finding.severity === "critical")
    ) {
      return true;
    }

    if (
      findings.some(
        (finding) =>
          finding.category === "governance" &&
          finding.severity === "high",
      )
    ) {
      return true;
    }

    if (confidence < 0.45) {
      return true;
    }

    return uncertainty.length > 1;
  }

  private buildSummary(
    execution: Execution,
    disposition: ReflectionDisposition,
  ): string {
    return (
      `Execution "${execution.id}" recorded outcome "${execution.outcome}" ` +
      `with effect "${execution.effect}"; reflection disposition is "${disposition}".`
    );
  }

  private buildRecommendations(
    disposition: ReflectionDisposition,
    requiresHuman: boolean,
  ): string[] {
    const recommendations: string[] = [];

    if (disposition === "affirm") {
      recommendations.push(
        "Maintain current approach and continue routine evidence collection.",
      );
    }

    if (disposition === "adjust") {
      recommendations.push(
        "Propose a targeted adjustment through learning governance review.",
      );
    }

    if (disposition === "defer") {
      recommendations.push(
        "Collect additional evidence before drawing a reliable conclusion.",
      );
    }

    if (disposition === "escalate" || requiresHuman) {
      recommendations.push(
        "Escalate to an authorised human reviewer before any learning change.",
      );
    }

    recommendations.push(
      "Reflection may recommend change but must not directly create or alter knowledge.",
    );

    return recommendations;
  }

  private buildReflectionId(
    executionId: string,
    now: string,
  ): string {
    const timestampKey = now
      .replace(/[^0-9]/g, "")
      .slice(0, 17);

    return ["reflection", executionId, timestampKey].join("-");
  }
}
