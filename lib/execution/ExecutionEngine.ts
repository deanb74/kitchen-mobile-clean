import type { Action } from "../action/Action";
import type {
    Execution,
    ExecutionActionSnapshot,
    ExecutionEffect,
    ExecutionEvidence,
    ExecutionOutcome,
} from "./Execution";

export interface BuildExecutionInput {
  action: Action;
  executionId?: string;
  now?: string;
  attempted?: boolean;
  outcome?: Exclude<ExecutionOutcome, "not-attempted">;
  summary?: string;
  effect?: ExecutionEffect;
  evidence?: ExecutionEvidence[];
  error?: string;
  cancellationReason?: string;
  attemptedAt?: string;
  completedAt?: string;
}

export class ExecutionEngine {
  build(input: BuildExecutionInput): Execution {
    const now = input.now ?? new Date().toISOString();
    const action = this.copyActionSnapshot(input.action);

    const permitted = this.isPermitted(action);

    if (!permitted) {
      return {
        id: input.executionId ?? this.buildExecutionId(action, now),
        action,
        permitted: false,
        attempted: false,
        outcome: "not-attempted",
        summary: this.buildNotPermittedSummary(action),
        effect: "none",
        evidence: this.copyEvidence(input.evidence),
        createdAt: now,
        updatedAt: now,
      };
    }

    if (!input.attempted) {
      return {
        id: input.executionId ?? this.buildExecutionId(action, now),
        action,
        permitted: true,
        attempted: false,
        outcome: "not-attempted",
        summary:
          input.summary ??
          "Action is permitted and ready for execution.",
        effect: "none",
        evidence: this.copyEvidence(input.evidence),
        createdAt: now,
        updatedAt: now,
      };
    }

    if (!input.outcome) {
      throw new Error(
        "Attempted execution requires a terminal outcome.",
      );
    }

    return {
      id: input.executionId ?? this.buildExecutionId(action, now),
      action,
      permitted: true,
      attempted: true,
      outcome: input.outcome,
      summary:
        input.summary ??
        this.buildAttemptSummary(input.outcome),
      effect: input.effect ?? "external",
      error: input.error,
      cancellationReason: input.cancellationReason,
      evidence: this.copyEvidence(input.evidence),
      attemptedAt: input.attemptedAt ?? now,
      completedAt: input.completedAt ?? now,
      createdAt: now,
      updatedAt: now,
    };
  }

  private isPermitted(
    action: ExecutionActionSnapshot,
  ): boolean {
    return (
      action.state === "ready" &&
      (
        action.disposition === "execute" ||
        action.disposition === "execute-with-caution"
      )
    );
  }

  private buildNotPermittedSummary(
    action: ExecutionActionSnapshot,
  ): string {
    if (action.state === "planned") {
      return (
        `Action "${action.id}" was not attempted because it remains planned ` +
        "and is not ready for execution."
      );
    }

    if (action.disposition === "await-human") {
      return (
        `Action "${action.id}" was not attempted because authorised human ` +
        "involvement is required."
      );
    }

    if (action.disposition === "do-not-execute") {
      return (
        `Action "${action.id}" was not attempted because execution is prohibited.`
      );
    }

    return (
      `Action "${action.id}" was not attempted because its state ` +
      `is "${action.state}".`
    );
  }

  private buildAttemptSummary(
    outcome: Exclude<ExecutionOutcome, "not-attempted">,
  ): string {
    if (outcome === "succeeded") {
      return "Execution attempt completed successfully.";
    }

    if (outcome === "failed") {
      return "Execution attempt did not complete successfully.";
    }

    return "Execution attempt was cancelled.";
  }

  private buildExecutionId(
    action: ExecutionActionSnapshot,
    now: string,
  ): string {
    const timestampKey = now
      .replace(/[^0-9]/g, "")
      .slice(0, 17);

    return [
      "execution",
      action.id,
      timestampKey,
    ].join("-");
  }

  private copyActionSnapshot(action: Action): ExecutionActionSnapshot {
    return {
      id: action.id,
      kind: action.kind,
      disposition: action.disposition,
      state: action.state,
      instruction: action.instruction,
      boundaries: action.boundaries.map((boundary) => ({
        ...boundary,
      })),
    };
  }

  private copyEvidence(
    evidence: ExecutionEvidence[] | undefined,
  ): ExecutionEvidence[] {
    if (!evidence) {
      return [];
    }

    return evidence.map((item) => ({ ...item }));
  }
}
