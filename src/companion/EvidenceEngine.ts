import type {
    ActionRecord,
    AuthorityRecord,
    ContextEnvelope,
    DecisionRecord,
    EvidenceArtifact,
    EvidencePacket,
} from "./types";

export class EvidenceEngine {
  createPacket(input: {
    context: ContextEnvelope;
    decision: DecisionRecord;
    authority: AuthorityRecord;
    action: ActionRecord;
    artifacts?: EvidenceArtifact[];
  }): EvidencePacket {
    const now = new Date().toISOString();

    return {
      evidenceId: `ev-${input.context.requestId}`,
      requestId: input.context.requestId,
      context: input.context,
      decision: input.decision,
      authority: input.authority,
      action: input.action,
      artifacts: [...(input.artifacts ?? [])],
      provenance: {
        source: "companion-runtime",
        runtimeVersion: "0.1.0",
      },
      createdAt: now,
    };
  }
}
