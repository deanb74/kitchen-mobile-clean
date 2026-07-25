import type {
    AuthorityAssessment,
    AuthorityBoundary,
    AuthorityContext,
    AuthorityDecision,
    AuthorityLevel,
    AuthorityProfile,
} from "./Authority";

export interface BuildAuthorityAssessmentInput {
  context: AuthorityContext;
}

const PROFILE_TO_LEVEL: Record<
  AuthorityProfile,
  AuthorityLevel
> = {
  observer: "none",
  contributor: "limited",
  responsible: "standard",
  accountable: "elevated",
};

const RISK_WEIGHT: Record<
  NonNullable<AuthorityContext["riskLevel"]>,
  number
> = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
};

const LEVEL_WEIGHT: Record<AuthorityLevel, number> = {
  none: 0,
  limited: 1,
  standard: 2,
  elevated: 3,
};

export class AuthorityEngine {
  assess(
    input: BuildAuthorityAssessmentInput,
  ): AuthorityAssessment {
    const context = this.copyContext(input.context);
    const level = this.resolveLevel(
      context.authorityProfile,
    );
    const riskLevel = context.riskLevel ?? "medium";

    const decision = this.resolveDecision(level, riskLevel);
    const boundaries = this.buildBoundaries(
      context,
      decision,
    );
    const reason = this.buildReason(
      context,
      level,
      decision,
      riskLevel,
    );
    const authorityScore = this.scoreAuthority(
      level,
      riskLevel,
      decision,
    );

    const now = new Date().toISOString();

    return {
      context,
      decision,
      level,
      authorityScore,
      reason,
      boundaries: [...boundaries],
      requiresHuman:
        decision === "require-human" ||
        decision === "deny",
      createdAt: now,
      updatedAt: now,
    };
  }

  private resolveLevel(
    profile: AuthorityProfile,
  ): AuthorityLevel {
    return PROFILE_TO_LEVEL[profile];
  }

  private resolveDecision(
    level: AuthorityLevel,
    riskLevel: NonNullable<AuthorityContext["riskLevel"]>,
  ): AuthorityDecision {
    const riskWeight = RISK_WEIGHT[riskLevel];
    const levelWeight = LEVEL_WEIGHT[level];

    if (level === "none") {
      return "deny";
    }

    if (riskLevel === "critical") {
      return "require-human";
    }

    if (riskWeight > levelWeight + 1) {
      return "require-human";
    }

    if (riskWeight > levelWeight) {
      return "allow-with-caution";
    }

    return "allow";
  }

  private buildReason(
    context: AuthorityContext,
    level: AuthorityLevel,
    decision: AuthorityDecision,
    riskLevel: NonNullable<AuthorityContext["riskLevel"]>,
  ): string {
    if (decision === "deny") {
      return (
        `Authority profile "${context.authorityProfile}" resolves to authority level "${level}", ` +
        "which is not authorised for this action."
      );
    }

    if (decision === "require-human") {
      return (
        `Action "${context.action}" is assessed at ${riskLevel} risk, ` +
        `which exceeds autonomous authority for level "${level}".`
      );
    }

    if (decision === "allow-with-caution") {
      return (
        `Actor level "${level}" may proceed with action "${context.action}" ` +
        `at ${riskLevel} risk only under explicit caution boundaries.`
      );
    }

    return (
      `Actor level "${level}" is sufficient for action "${context.action}" ` +
      `at ${riskLevel} risk.`
    );
  }

  private scoreAuthority(
    level: AuthorityLevel,
    riskLevel: NonNullable<AuthorityContext["riskLevel"]>,
    decision: AuthorityDecision,
  ): number {
    const levelScore: Record<AuthorityLevel, number> = {
      none: 0,
      limited: 0.4,
      standard: 0.7,
      elevated: 1,
    };

    const riskPenalty: Record<
      NonNullable<AuthorityContext["riskLevel"]>,
      number
    > = {
      low: 0,
      medium: 0.1,
      high: 0.2,
      critical: 0.35,
    };

    const decisionPenalty: Record<AuthorityDecision, number> = {
      allow: 0,
      "allow-with-caution": 0.1,
      "require-human": 0.25,
      deny: 0.5,
    };

    const rawScore =
      levelScore[level] -
      riskPenalty[riskLevel] -
      decisionPenalty[decision];

    return Number(Math.max(0, Math.min(1, rawScore)).toFixed(2));
  }

  private buildBoundaries(
    context: AuthorityContext,
    decision: AuthorityDecision,
  ): AuthorityBoundary[] {
    const boundaries: AuthorityBoundary[] = [
      {
        scope: "action-scope",
        description:
          `Operate only within the requested action: ${context.action}.`,
      },
      {
        scope: "audit",
        description:
          "Record the decision and rationale for traceability.",
      },
    ];

    if (decision === "allow-with-caution") {
      boundaries.push(
        {
          scope: "caution",
          description:
            "Proceed with minimal impact and stop if context changes.",
        },
        {
          scope: "safeguard",
          description:
            "Do not override explicit human instructions.",
        },
      );
    }

    if (decision === "require-human") {
      boundaries.push(
        {
          scope: "escalation",
          description:
            "Escalate to an authorised human decision-maker before action.",
        },
        {
          scope: "hold",
          description:
            "Do not execute this action autonomously.",
        },
      );
    }

    if (decision === "deny") {
      boundaries.push({
        scope: "denial",
        description:
          "Decline the action and request a properly authorised actor.",
      });
    }

    return boundaries;
  }

  private copyContext(
    context: AuthorityContext,
  ): AuthorityContext {
    return {
      actorId: context.actorId,
      authorityProfile: context.authorityProfile,
      action: context.action,
      subject: context.subject,
      riskLevel: context.riskLevel,
    };
  }
}
