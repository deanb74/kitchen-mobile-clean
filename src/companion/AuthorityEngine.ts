import type {
    AuthorityDisposition,
    AuthorityRecord,
    ContextEnvelope,
    DecisionRecord,
} from "./types";

const DENY_ACTION_TERMS = ["override", "bypass", "disable safety"]; 

const ROLE_ALLOWLIST: Record<string, string[]> = {
  manager: ["*"],
  staff: ["temperature.log", "task.complete", "checklist.step", "cleaning.complete"],
  trainee: ["checklist.step"],
};

export class AuthorityEngine {
  authorise(
    context: ContextEnvelope,
    decision: DecisionRecord,
  ): AuthorityRecord {
    const now = new Date().toISOString();

    const prohibitedTermHit = DENY_ACTION_TERMS.find((term) =>
      decision.recommendedAction.toLowerCase().includes(term),
    );

    if (prohibitedTermHit) {
      return this.buildRecord(context.requestId, "deny", now, {
        reason: `Prohibited action pattern detected: ${prohibitedTermHit}.`,
        boundaryConditions: ["Safety boundaries cannot be bypassed."],
        escalationRequired: true,
      });
    }

    if (decision.requiresHuman) {
      return this.buildRecord(context.requestId, "require-human", now, {
        reason: "Decision requires human review under runtime policy.",
        boundaryConditions: ["Do not execute autonomous action."],
        escalationRequired: true,
      });
    }

    const allowedCapabilities = ROLE_ALLOWLIST[context.role] ?? [];
    const capabilityAllowed =
      allowedCapabilities.includes("*") ||
      allowedCapabilities.includes(context.capabilityId);

    if (!capabilityAllowed) {
      return this.buildRecord(context.requestId, "deny", now, {
        reason: `Role ${context.role} is not permitted for ${context.capabilityId}.`,
        boundaryConditions: ["Escalate to an authorised role."],
        escalationRequired: true,
      });
    }

    const disposition: AuthorityDisposition =
      decision.disposition === "caution" ? "allow-with-caution" : "allow";

    return this.buildRecord(context.requestId, disposition, now, {
      reason:
        disposition === "allow"
          ? "Capability and role are within approved authority boundaries."
          : "Action is allowed with caution and explicit operator confirmation.",
      boundaryConditions:
        disposition === "allow"
          ? ["Record evidence for action outcome."]
          : ["Require confirmation before final action commit."],
      escalationRequired: false,
    });
  }

  private buildRecord(
    requestId: string,
    disposition: AuthorityDisposition,
    createdAt: string,
    options: {
      reason: string;
      boundaryConditions: string[];
      escalationRequired: boolean;
    },
  ): AuthorityRecord {
    return {
      authorityId: `auth-${requestId}`,
      requestId,
      disposition,
      reason: options.reason,
      boundaryConditions: options.boundaryConditions,
      escalationRequired: options.escalationRequired,
      createdAt,
    };
  }
}
