import type { AuthorityAssessment } from "../authority";
import type { Judgement, JudgementResponseKind } from "../judgement";
import type {
    Action,
    ActionDisposition,
    ActionState,
} from "./Action";
import {
    AUTHORITY_DECISION_TO_ACTION,
    JUDGEMENT_DISPOSITION_TO_ACTION,
} from "./Action";

export interface BuildActionInput {
  judgement: Judgement;
  authority: AuthorityAssessment;
  actionId?: string;
  now?: string;
}

export class ActionEngine {
  build(input: BuildActionInput): Action {
    const { judgement, authority } = input;

    const judgementCopy: Judgement = {
      ...judgement,
      selected: {
        ...judgement.selected,
      },
      candidates: judgement.candidates.map(
        (candidate) => ({ ...candidate }),
      ),
      uncertainty: [...judgement.uncertainty],
      governingPrinciples: [
        ...judgement.governingPrinciples,
      ],
    };

    const authorityCopy: AuthorityAssessment = {
      ...authority,
      context: {
        ...authority.context,
      },
      boundaries: authority.boundaries.map(
        (boundary) => ({ ...boundary }),
      ),
    };

    const authorityBaseline =
      AUTHORITY_DECISION_TO_ACTION[
        authorityCopy.decision
      ];

    const judgementBaseline =
      JUDGEMENT_DISPOSITION_TO_ACTION[
        judgementCopy.disposition
      ];

    const merged = this.mergeConstraints(
      authorityBaseline,
      judgementBaseline,
    );

    const kind = judgementCopy.selected.kind;
    const state = this.resolveState(kind, merged.state);

    const now = input.now ?? new Date().toISOString();
    const id =
      input.actionId ??
      this.buildActionId(input, now);

    return {
      id,
      judgement: judgementCopy,
      authority: authorityCopy,
      kind,
      state,
      disposition: merged.disposition,
      instruction: this.buildInstruction(
        kind,
        merged.disposition,
      ),
      reason: this.buildReason(
        judgementCopy,
        authorityCopy,
        merged.disposition,
      ),
      boundaries: authorityCopy.boundaries.map(
        (boundary) => ({ ...boundary }),
      ),
      requiresHuman:
        authorityCopy.requiresHuman ||
        judgementCopy.requiresHuman ||
        merged.disposition === "await-human" ||
        merged.state === "blocked",
      uncertainty: [...judgementCopy.uncertainty],
      confidence: this.scoreActionConfidence(
        judgementCopy,
        merged.disposition,
      ),
      createdAt: now,
      updatedAt: now,
    };
  }

  private resolveState(
    kind: JudgementResponseKind,
    baselineState: Extract<ActionState, "ready" | "blocked">,
  ): ActionState {
    if (baselineState === "blocked") {
      return "blocked";
    }

    // Waiting is a valid action and typically sits in planned state
    // until the trigger condition to proceed is satisfied.
    if (kind === "wait") {
      return "planned";
    }

    return "ready";
  }

  private buildInstruction(
    kind: JudgementResponseKind,
    disposition: ActionDisposition,
  ): string {
    if (disposition === "await-human") {
      return "Pause and escalate to an authorised human decision-maker.";
    }

    if (disposition === "do-not-execute") {
      return "Do not execute this action; request an authorised route.";
    }

    if (kind === "remain-silent") {
      return "Remain silent intentionally and continue attentive observation.";
    }

    if (kind === "wait") {
      return "Wait for additional evidence or a readiness trigger before proceeding.";
    }

    if (disposition === "execute-with-caution") {
      return "Proceed with caution and enforce all recorded boundaries.";
    }

    return "Proceed with the selected action within recorded boundaries.";
  }

  private buildReason(
    judgement: Judgement,
    authority: AuthorityAssessment,
    disposition: ActionDisposition,
  ): string {
    return (
      `Merged from judgement (${judgement.disposition}) ` +
      `and authority (${authority.decision}) to produce ` +
      `action disposition "${disposition}".`
    );
  }

  private mergeConstraints(
    authority: {
      disposition: ActionDisposition;
      state: Extract<ActionState, "ready" | "blocked">;
    },
    judgement: {
      disposition: ActionDisposition;
      state: Extract<ActionState, "ready" | "blocked">;
    },
  ): {
    disposition: ActionDisposition;
    state: Extract<ActionState, "ready" | "blocked">;
  } {
    const restrictionWeight: Record<
      ActionDisposition,
      number
    > = {
      execute: 0,
      "execute-with-caution": 1,
      "await-human": 2,
      "do-not-execute": 3,
    };

    const disposition =
      restrictionWeight[authority.disposition] >=
      restrictionWeight[judgement.disposition]
        ? authority.disposition
        : judgement.disposition;

    return {
      disposition,
      state:
        authority.state === "blocked" ||
        judgement.state === "blocked"
          ? "blocked"
          : "ready",
    };
  }

  private scoreActionConfidence(
    judgement: Judgement,
    disposition: ActionDisposition,
  ): number {
    const dispositionWeight: Record<
      ActionDisposition,
      number
    > = {
      execute: 1,
      "execute-with-caution": 0.92,
      "await-human": 0.9,
      "do-not-execute": 0.9,
    };

    const uncertaintyPenalty = Math.min(
      0.25,
      judgement.uncertainty.length * 0.05,
    );

    const rawScore =
      judgement.confidence *
        dispositionWeight[disposition] -
      uncertaintyPenalty;

    return Number(Math.max(0, Math.min(1, rawScore)).toFixed(2));
  }

  private buildActionId(
    input: BuildActionInput,
    now: string,
  ): string {
    const actionKey = input.authority.context.action
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const timestampKey = now
      .replace(/[^0-9]/g, "")
      .slice(0, 17);

    return [
      "action",
      input.authority.context.actorId,
      actionKey || "unknown-action",
      input.judgement.selected.kind,
      timestampKey,
    ].join("-");
  }
}
