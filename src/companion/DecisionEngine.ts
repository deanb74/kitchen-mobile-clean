import type {
    CompanionRuntimeRequest,
    ContextEnvelope,
    DecisionDisposition,
    DecisionRecord,
} from "./types";

export class DecisionEngine {
  decide(
    context: ContextEnvelope,
    request: CompanionRuntimeRequest,
  ): DecisionRecord {
    const confidence = this.clamp(
      request.confidenceHint ?? 0.75,
      0,
      1,
    );

    const uncertainty = [...(request.uncertainty ?? [])];
    const disposition = this.pickDisposition(confidence, uncertainty);
    const requiresHuman =
      disposition === "human-required" || disposition === "insufficient";

    const now = new Date().toISOString();

    return {
      decisionId: `dec-${context.requestId}`,
      requestId: context.requestId,
      disposition,
      recommendedAction: this.recommendedAction(disposition, request.prompt),
      rationale: this.buildRationale(context, disposition),
      confidence,
      uncertainty,
      requiresHuman,
      createdAt: now,
    };
  }

  private pickDisposition(
    confidence: number,
    uncertainty: string[],
  ): DecisionDisposition {
    if (confidence < 0.35) return "insufficient";

    const hasSafetyUncertainty = uncertainty.some((item) => {
      const text = item.toLowerCase();
      return (
        text.includes("safety") ||
        text.includes("authority") ||
        text.includes("risk") ||
        text.includes("harm")
      );
    });

    if (hasSafetyUncertainty) return "human-required";
    if (confidence < 0.6 || uncertainty.length > 0) return "caution";

    return "proceed";
  }

  private recommendedAction(
    disposition: DecisionDisposition,
    prompt: string,
  ): string {
    if (disposition === "insufficient") {
      return "Ask a clarifying question before any operational action.";
    }

    if (disposition === "human-required") {
      return "Escalate to an authorised human and provide supporting context.";
    }

    if (disposition === "caution") {
      return `Guide the operator cautiously: ${prompt}`;
    }

    return `Proceed with governed companion action: ${prompt}`;
  }

  private buildRationale(
    context: ContextEnvelope,
    disposition: DecisionDisposition,
  ): string {
    return (
      `Selected ${disposition} for capability ${context.capabilityId} ` +
      `to improve people outcome: ${context.peopleOutcome}.`
    );
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }
}
