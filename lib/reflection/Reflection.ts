import type { ActionDisposition, ActionState } from "../action/Action";
import type {
    ExecutionEffect,
    ExecutionEvidence,
    ExecutionOutcome,
} from "../execution/Execution";

/**
 * Disposition produced by reflection.
 *
 * Governing interpretation:
 * - affirm: evidence supports the current approach.
 * - adjust: improvement is advisable.
 * - escalate: human attention is required.
 * - defer: evidence is insufficient or the outcome is not yet ready
 *   for a reliable conclusion.
 */
export type ReflectionDisposition =
  | "affirm"
  | "adjust"
  | "escalate"
  | "defer";

/**
 * Snapshot of the governed action and execution result under reflection.
 */
export interface ReflectionContext {
  actionId: string;
  executionId: string;
  executionCreatedAt: string;
  executionCompletedAt?: string;
  actionState: ActionState;
  actionDisposition: ActionDisposition;
  executionOutcome: ExecutionOutcome;
  executionEffect: ExecutionEffect;
}

/**
 * A structured finding identified during reflection.
 */
export interface ReflectionFinding {
  category:
    | "safety"
    | "quality"
    | "communication"
    | "timing"
    | "governance"
    | "evidence";
  detail: string;
  severity: "low" | "medium" | "high" | "critical";
}

/**
 * Factual reflection record derived from execution evidence.
 */
export interface Reflection {
  /**
   * Stable identifier for this reflection record.
   */
  id: string;

  /**
   * Action/execution context being reflected on.
   */
  context: ReflectionContext;

  /**
   * Human-readable summary of what reflection concluded.
   */
  summary: string;

  /**
   * Structured findings identified from observed outcomes.
   */
  findings: ReflectionFinding[];

  /**
   * Execution evidence reviewed during reflection.
   */
  evidence: ExecutionEvidence[];

  /**
    * Recommended disposition for learning follow-up.
    *
    * Reflection may recommend change.
    * Reflection must never perform change.
   */
  disposition: ReflectionDisposition;

  /**
   * Whether the reflection requires human review before learning or change.
    *
    * This should normally be true when:
    * - disposition === "escalate"
    * - a critical finding exists
    * - a high-severity governance finding exists
    * - confidence is low
    * - important uncertainty remains
   */
  requiresHuman: boolean;

  /**
    * Clear next steps for learning or process improvement.
    *
    * Flow safeguard:
    * Execution -> Reflection -> Recommendation -> Learning governance.
   */
  recommendations: string[];

  /**
   * Remaining uncertainty after reflection.
   */
  uncertainty: string[];

  /**
   * Confidence in the reflection quality from 0 to 1.
   */
  confidence: number;

  /**
   * When the reflection was created.
   */
  createdAt: string;

  /**
   * When the reflection was last updated.
   */
  updatedAt: string;
}
