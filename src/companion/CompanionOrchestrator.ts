import { AuthorityEngine } from "./AuthorityEngine";
import { ContextEnvelopeBuilder } from "./ContextEnvelope";
import { DecisionEngine } from "./DecisionEngine";
import { EvidenceEngine } from "./EvidenceEngine";
import { ReflectionEngine } from "./ReflectionEngine";
import { validateRuntimeContracts } from "./RuntimeContracts";
import type {
    ActionRecord,
    CompanionActionExecutionResult,
    CompanionRuntimeRequest,
    CompanionRuntimeResult,
    RuntimeTrace,
} from "./types";

export class CompanionOrchestrator {
  constructor(
    private readonly contextBuilder = new ContextEnvelopeBuilder(),
    private readonly decisionEngine = new DecisionEngine(),
    private readonly authorityEngine = new AuthorityEngine(),
    private readonly evidenceEngine = new EvidenceEngine(),
    private readonly reflectionEngine = new ReflectionEngine(),
  ) {}

  run(request: CompanionRuntimeRequest): CompanionRuntimeResult {
    const context = this.contextBuilder.build(request);
    const decision = this.decisionEngine.decide(context, request);
    const authority = this.authorityEngine.authorise(context, decision);
    const action = this.execute(request.requestId, authority.disposition);

    const evidence = this.evidenceEngine.createPacket({
      context,
      decision,
      authority,
      action,
      artifacts: request.artifacts,
    });

    const reflection = this.reflectionEngine.reflect(evidence);

    const trace: RuntimeTrace = {
      context,
      decision,
      authority,
      action,
      evidence,
      reflection,
    };

    const contractViolations = validateRuntimeContracts(trace);
    const accepted = authority.disposition === "allow" || authority.disposition === "allow-with-caution";
    const csaConformant = contractViolations.length === 0;

    return {
      accepted,
      trace,
      contractViolations,
      csaConformant,
    };
  }

  async runAroundAction(
    request: CompanionRuntimeRequest,
    executeAction: () => Promise<CompanionActionExecutionResult>,
  ): Promise<CompanionRuntimeResult> {
    const context = this.contextBuilder.build(request);
    const decision = this.decisionEngine.decide(context, request);
    const authority = this.authorityEngine.authorise(context, decision);

    const action =
      authority.disposition === "allow" ||
      authority.disposition === "allow-with-caution"
        ? this.buildActionRecordFromExecution(
            request.requestId,
            await executeAction(),
          )
        : this.execute(request.requestId, authority.disposition);

    const evidence = this.evidenceEngine.createPacket({
      context,
      decision,
      authority,
      action,
      artifacts: [...(request.artifacts ?? [])],
    });

    const reflection = this.reflectionEngine.reflect(evidence);

    const trace: RuntimeTrace = {
      context,
      decision,
      authority,
      action,
      evidence,
      reflection,
    };

    const contractViolations = validateRuntimeContracts(trace);
    const accepted =
      authority.disposition === "allow" ||
      authority.disposition === "allow-with-caution";
    const csaConformant = contractViolations.length === 0;

    return {
      accepted,
      trace,
      contractViolations,
      csaConformant,
    };
  }

  private buildActionRecordFromExecution(
    requestId: string,
    execution: CompanionActionExecutionResult,
  ): ActionRecord {
    const now = new Date().toISOString();

    return {
      actionId: `act-${requestId}`,
      requestId,
      attempted: execution.attempted,
      outcome: execution.outcome,
      summary: execution.summary,
      sideEffects: execution.sideEffects ?? [],
      createdAt: now,
      completedAt: execution.attempted ? now : undefined,
    };
  }

  private execute(
    requestId: string,
    disposition: "allow" | "allow-with-caution" | "require-human" | "deny",
  ): ActionRecord {
    const now = new Date().toISOString();

    if (disposition === "deny") {
      return {
        actionId: `act-${requestId}`,
        requestId,
        attempted: false,
        outcome: "not-attempted",
        summary: "Action denied by authority engine.",
        sideEffects: [],
        createdAt: now,
      };
    }

    if (disposition === "require-human") {
      return {
        actionId: `act-${requestId}`,
        requestId,
        attempted: false,
        outcome: "not-attempted",
        summary: "Awaiting human handoff before execution.",
        sideEffects: ["human-handoff"],
        createdAt: now,
      };
    }

    return {
      actionId: `act-${requestId}`,
      requestId,
      attempted: true,
      outcome: "succeeded",
      summary:
        disposition === "allow-with-caution"
          ? "Action completed with caution boundary controls."
          : "Action completed within normal authority boundaries.",
      sideEffects:
        disposition === "allow-with-caution"
          ? ["confirmation-required", "evidence-priority"]
          : ["evidence-priority"],
      createdAt: now,
      completedAt: now,
    };
  }
}
