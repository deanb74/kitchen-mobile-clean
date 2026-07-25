import type {
    AuthorityAssessment,
    AuthorityBoundary,
    AuthorityDecision,
} from "../authority";
import type {
    Judgement,
    JudgementDisposition,
    JudgementResponseKind,
} from "../judgement";

/**
 * Operational state of an action produced by the cognitive stack.
 *
 * blocked: governance prevented execution.
 * failed: execution was permitted and attempted, but did not complete.
 */
export type ActionState =
  | "planned"
  | "ready"
  | "blocked"
  | "completed"
  | "failed"
  | "cancelled";

/**
 * How the action may proceed once authority and judgement are applied.
 */
export type ActionDisposition =
  | "execute"
  | "execute-with-caution"
  | "await-human"
  | "do-not-execute";

/**
 * Deterministic baseline mapping from authority decision
 * to action disposition and state.
 */
export const AUTHORITY_DECISION_TO_ACTION = {
  allow: {
    disposition: "execute",
    state: "ready",
  },
  "allow-with-caution": {
    disposition: "execute-with-caution",
    state: "ready",
  },
  "require-human": {
    disposition: "await-human",
    state: "blocked",
  },
  deny: {
    disposition: "do-not-execute",
    state: "blocked",
  },
} satisfies Record<
  AuthorityDecision,
  {
    disposition: ActionDisposition;
    state: Extract<ActionState, "ready" | "blocked">;
  }
>;

/**
 * Judgement disposition may tighten the baseline authority mapping.
 */
export const JUDGEMENT_DISPOSITION_TO_ACTION = {
  proceed: {
    disposition: "execute",
    state: "ready",
  },
  caution: {
    disposition: "execute-with-caution",
    state: "ready",
  },
  "human-required": {
    disposition: "await-human",
    state: "blocked",
  },
  insufficient: {
    disposition: "await-human",
    state: "blocked",
  },
} satisfies Record<
  JudgementDisposition,
  {
    disposition: ActionDisposition;
    state: Extract<ActionState, "ready" | "blocked">;
  }
>;

/**
 * These kinds are valid actions even when they have no external effect yet.
 */
export const NON_EFFECT_ACTION_KINDS: ReadonlyArray<
  JudgementResponseKind
> = ["remain-silent", "wait"];

/**
 * The action output combining judgement and authority constraints.
 */
export interface Action {
  /**
   * Stable identifier for the action instance.
   */
  id: string;

  /**
   * The judgement that selected the response type.
   */
  judgement: Judgement;

  /**
   * The authority assessment governing whether action can proceed.
   */
  authority: AuthorityAssessment;

  /**
    * The concrete response kind selected for execution.
    *
    * "remain-silent" is a valid action kind.
    * "wait" is a valid action kind and may remain planned or ready
    * without an external effect yet.
   */
  kind: JudgementResponseKind;

  /**
   * Execution readiness lifecycle state.
   */
  state: ActionState;

  /**
   * Final execution posture after applying judgement and authority.
   */
  disposition: ActionDisposition;

  /**
   * Human-readable instruction for the next responsible step.
   */
  instruction: string;

  /**
   * Why this action and disposition were selected.
   */
  reason: string;

  /**
   * Boundaries that must be obeyed while carrying out this action.
   */
  boundaries: AuthorityBoundary[];

  /**
   * Whether human involvement is required before proceeding.
   */
  requiresHuman: boolean;

  /**
   * Residual uncertainty that remains relevant to the action.
   */
  uncertainty: string[];

  /**
    * Confidence that this is the appropriate permitted course of action,
    * after applying judgement, authority and remaining uncertainty.
    *
    * This does not indicate that execution will succeed.
   */
  confidence: number;

  /**
   * When the action was created.
   */
  createdAt: string;

  /**
   * When the action was last updated.
   */
  updatedAt: string;
}
