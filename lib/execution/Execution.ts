import type {
    ActionDisposition,
    ActionState,
} from "../action/Action";
import type { AuthorityBoundary } from "../authority";
import type { JudgementResponseKind } from "../judgement";

/**
 * Observed result of trying to carry out a permitted action.
 *
 * This is factual runtime evidence, not a re-evaluation step.
 */
export type ExecutionOutcome =
  | "not-attempted"
  | "succeeded"
  | "failed"
  | "cancelled";

export type ExecutionEffect =
  | "none"
  | "internal"
  | "external";

/**
 * Minimal governed action snapshot carried into execution records.
 */
export interface ExecutionActionSnapshot {
  id: string;
  kind: JudgementResponseKind;
  disposition: ActionDisposition;
  state: ActionState;
  instruction: string;
  boundaries: AuthorityBoundary[];
}

/**
 * Atomic piece of factual evidence produced during execution.
 */
export interface ExecutionEvidence {
  type: "log" | "metric" | "event" | "note";
  detail: string;
  at: string;
}

/**
 * Factual record of what happened after an action was governed.
 *
 * Execution does not reconsider judgement or authority.
 * It records only whether the action was attempted and what happened.
 */
export interface Execution {
  /**
   * Stable identifier for this execution record.
   */
  id: string;

  /**
   * Action snapshot that was presented to execution.
   */
  action: ExecutionActionSnapshot;

  /**
   * Whether execution was permitted by the action disposition/state.
   */
  permitted: boolean;

  /**
   * Whether a real attempt to carry out the action occurred.
   */
  attempted: boolean;

  /**
    * Observed outcome of the attempt lifecycle.
    *
    * Terminal outcomes are: succeeded, failed, cancelled.
   */
  outcome: ExecutionOutcome;

  /**
   * Human-readable factual summary of what happened.
   */
  summary: string;

  /**
   * Observed effect scope produced by execution.
   */
  effect: ExecutionEffect;

  /**
   * Optional error detail when outcome is failed.
   */
  error?: string;

  /**
   * Optional cancellation reason when outcome is cancelled.
   */
  cancellationReason?: string;

  /**
   * Evidence items observed during execution.
   */
  evidence: ExecutionEvidence[];

  /**
   * When execution was first attempted.
   */
  attemptedAt?: string;

  /**
    * When execution reached a terminal attempted outcome:
    * succeeded, failed or cancelled.
   */
  completedAt?: string;

  /**
   * When this execution record was created.
   */
  createdAt: string;

  /**
   * When this execution record was last updated.
   */
  updatedAt: string;
}
