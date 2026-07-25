import type { Learning } from "../learning/Learning";
import type {
    ApprovedKnowledgeChange,
    ApprovedKnowledgeChangeIntent,
    ApprovedKnowledgeGovernanceRecord,
    KnowledgeChangeIntent,
    KnowledgeGovernance,
    KnowledgeGovernanceContext,
    KnowledgeGovernanceDecision,
    KnowledgeGovernanceEvidence,
    NonApprovedKnowledgeGovernanceRecord,
} from "./KnowledgeGovernance";

export interface BuildKnowledgeGovernanceInput {
  learning: Learning;
  decision: KnowledgeGovernanceDecision;
  changeIntent: KnowledgeChangeIntent;
  rationale: string;
  reviewedBy?: string;
  reviewedAt?: string;
  conditions?: ReadonlyArray<string>;
  governanceId?: string;
  now?: string;
}

export class KnowledgeGovernanceEngine {
  build(input: BuildKnowledgeGovernanceInput): KnowledgeGovernance {
    const now = input.now ?? new Date().toISOString();

    const decision = input.decision;
    const changeIntent = input.changeIntent;

    if (!decision) {
      throw new Error(
        'Knowledge governance decision is required and must be explicit.',
      );
    }

    const rationale = this.normalizeRationale(input.rationale);
    const conditions = this.copyConditions(input.conditions);

    this.assertReviewerMetadataRules(input);

    const learning = this.copyLearning(input.learning);
    const context = this.buildContext(learning);

    const learningEvidence = this.copyLearningAuditEvidence(learning);
    const proposalEvidence = this.copyProposalSupportingEvidence(learning);

    const evidence = [...learningEvidence, ...proposalEvidence];

    const reviewerComplete = this.hasCompleteReviewerMetadata(input);

    if (decision === "approve") {
      this.assertApprovalRules(learning, input);

      const approvedChange = this.buildApprovedKnowledgeChange(
        learning,
        input,
      );

      const review: ApprovedKnowledgeGovernanceRecord["review"] = {
        decision: "approve",
        changeIntent: approvedChange.intent,
        rationale:
          `${rationale} ` +
          `(decision=approve; changeIntent=${approvedChange.intent})`,
        conditions: conditions.map((item) => item),
        confidence: approvedChange.confidence,
        reviewedBy: input.reviewedBy as string,
        reviewedAt: input.reviewedAt as string,
      };

      const record: ApprovedKnowledgeGovernanceRecord = {
        id:
          input.governanceId ??
          this.buildGovernanceId(learning.id, decision, now),
        context,
        review,
        approvedChange,
        evidence,
        requiresHuman:
          learning.requiresHuman ||
          !reviewerComplete,
        createdAt: now,
        updatedAt: now,
      };

      return record;
    }

    const reviewBase = {
      decision,
      changeIntent,
      rationale:
        `${rationale} ` +
        `(decision=${decision}; changeIntent=${changeIntent})`,
      conditions: conditions.map((item) => item),
      confidence: this.clampConfidence(learning.confidence),
    };

    const review: NonApprovedKnowledgeGovernanceRecord["review"] =
      input.reviewedBy && input.reviewedAt
        ? {
            ...reviewBase,
            reviewedBy: input.reviewedBy,
            reviewedAt: input.reviewedAt,
          }
        : {
            ...reviewBase,
            reviewedBy: undefined,
            reviewedAt: undefined,
          };

    const record: NonApprovedKnowledgeGovernanceRecord = {
      id:
        input.governanceId ??
        this.buildGovernanceId(learning.id, decision, now),
      context,
      review,
      evidence,
      requiresHuman:
        learning.requiresHuman ||
        decision === "defer" ||
        !reviewerComplete,
      createdAt: now,
      updatedAt: now,
    };

    return record;
  }

  private normalizeRationale(rationale: string): string {
    const value = rationale.trim();

    if (!value) {
      throw new Error(
        "Knowledge governance rationale is required.",
      );
    }

    return value;
  }

  private copyConditions(
    conditions: ReadonlyArray<string> | undefined,
  ): ReadonlyArray<string> {
    if (!conditions) {
      return [];
    }

    return conditions.map((condition) => condition);
  }

  private copyLearning(learning: Learning): Learning {
    return {
      ...learning,
      context: {
        ...learning.context,
      },
      proposal: learning.proposal
        ? {
            ...learning.proposal,
            supportingEvidence:
              learning.proposal.supportingEvidence.map(
                (item) => ({ ...item }),
              ),
          }
        : undefined,
      validation: {
        ...learning.validation,
      },
      evidence: learning.evidence.map((item) => ({ ...item })),
    };
  }

  private buildContext(
    learning: Learning,
  ): KnowledgeGovernanceContext {
    return {
      learningId: learning.id,
      learningDisposition: learning.disposition,
      learningConfidence: this.clampConfidence(
        learning.confidence,
      ),
      learningRequiresHuman: learning.requiresHuman,
      reflectionId: learning.context.reflectionId,
      actionId: learning.context.actionId,
      executionId: learning.context.executionId,
      knowledgeTargetId:
        learning.proposal?.knowledgeTargetId,
    };
  }

  private copyLearningAuditEvidence(
    learning: Learning,
  ): KnowledgeGovernanceEvidence[] {
    return learning.evidence.map((item, index) => ({
      source: "learning-evidence",
      sourceLearningId: learning.id,
      sourceEvidenceId:
        item.sourceId ?? `${learning.id}:learning-evidence:${index}`,
      sourceLearningEvidenceType: item.sourceType,
      detail: item.detail,
      severity: item.severity,
      observedAt: item.observedAt,
    }));
  }

  private copyProposalSupportingEvidence(
    learning: Learning,
  ): KnowledgeGovernanceEvidence[] {
    if (!learning.proposal) {
      return [];
    }

    return learning.proposal.supportingEvidence.map(
      (item, index) => ({
        source: "learning-proposal-supporting-evidence",
        sourceLearningId: learning.id,
        sourceEvidenceId:
          item.sourceId ??
          `${learning.id}:proposal-supporting-evidence:${index}`,
        sourceLearningEvidenceType: item.sourceType,
        detail: item.detail,
        severity: item.severity,
        observedAt: item.observedAt,
      }),
    );
  }

  private hasAnyReviewerMetadata(
    input: BuildKnowledgeGovernanceInput,
  ): boolean {
    return Boolean(input.reviewedBy || input.reviewedAt);
  }

  private hasCompleteReviewerMetadata(
    input: BuildKnowledgeGovernanceInput,
  ): boolean {
    return Boolean(input.reviewedBy && input.reviewedAt);
  }

  private assertReviewerMetadataRules(
    input: BuildKnowledgeGovernanceInput,
  ): void {
    const complete = this.hasCompleteReviewerMetadata(input);
    const any = this.hasAnyReviewerMetadata(input);

    if (
      input.decision === "approve" ||
      input.decision === "reject" ||
      input.decision === "supersede"
    ) {
      if (!complete) {
        throw new Error(
          `Decision "${input.decision}" requires reviewedBy and reviewedAt.`,
        );
      }

      return;
    }

    // defer may omit review metadata only when no human decision has occurred yet.
    if (input.decision === "defer" && any && !complete) {
      throw new Error(
        'Decision "defer" requires both reviewedBy and reviewedAt when either is provided.',
      );
    }
  }

  private assertApprovalRules(
    learning: Learning,
    input: BuildKnowledgeGovernanceInput,
  ): void {
    if (learning.disposition === "reject" || learning.disposition === "observe") {
      throw new Error(
        `Learning disposition "${learning.disposition}" cannot be approved.`,
      );
    }

    if (!learning.proposal) {
      throw new Error(
        'Approval requires Learning.proposal to exist.',
      );
    }

    if (input.changeIntent === "none") {
      throw new Error(
        'Approval requires changeIntent to be a concrete change, not "none".',
      );
    }

    if (
      (learning.requiresHuman || this.hasCriticalLearningSignal(learning)) &&
      !this.hasCompleteReviewerMetadata(input)
    ) {
      throw new Error(
        'Critical or human-required learning cannot be approved without reviewedBy and reviewedAt.',
      );
    }

    this.assertTargetRequirement(
      input.changeIntent,
      learning.proposal.knowledgeTargetId,
    );
  }

  private assertTargetRequirement(
    intent: KnowledgeChangeIntent,
    targetKnowledgeId: string | undefined,
  ): void {
    if (
      intent === "update" ||
      intent === "reinforce" ||
      intent === "supersede" ||
      intent === "retire"
    ) {
      if (!targetKnowledgeId) {
        throw new Error(
          `Change intent "${intent}" requires proposal.knowledgeTargetId.`,
        );
      }
    }
  }

  private buildApprovedKnowledgeChange(
    learning: Learning,
    input: BuildKnowledgeGovernanceInput,
  ): ApprovedKnowledgeChange {
    const proposal = learning.proposal;

    if (!proposal) {
      throw new Error(
        'Cannot create ApprovedKnowledgeChange without Learning.proposal.',
      );
    }

    const intent = input.changeIntent as ApprovedKnowledgeChangeIntent;
    const confidence = this.clampConfidence(
      Math.min(
        learning.confidence,
        proposal.confidence,
      ),
    );

    const base = {
      proposedContent: proposal.whatShouldChange,
      expectedBenefit: proposal.expectedBenefit,
      sourceLearningId: learning.id,
      provenance: [
        `learning:${learning.id}`,
        `reflection:${learning.context.reflectionId}`,
        `action:${learning.context.actionId}`,
        `execution:${learning.context.executionId}`,
      ],
      approvedBy: input.reviewedBy as string,
      approvedAt: input.reviewedAt as string,
      confidence,
      status: "approved-not-applied" as const,
    };

    if (intent === "create") {
      return {
        ...base,
        intent,
        targetKnowledgeId: proposal.knowledgeTargetId,
      };
    }

    if (intent === "merge") {
      return {
        ...base,
        intent,
        targetKnowledgeId: proposal.knowledgeTargetId,
      };
    }

    return {
      ...base,
      intent,
      targetKnowledgeId: proposal.knowledgeTargetId as string,
    };
  }

  private hasCriticalLearningSignal(
    learning: Learning,
  ): boolean {
    return learning.evidence.some(
      (item) => item.severity === "critical",
    );
  }

  private buildGovernanceId(
    learningId: string,
    decision: KnowledgeGovernanceDecision,
    now: string,
  ): string {
    const timestampKey = now
      .replace(/[^0-9]/g, "")
      .slice(0, 17);

    return [
      "knowledge-governance",
      learningId,
      decision,
      timestampKey,
    ].join("-");
  }

  private clampConfidence(value: number): number {
    return Number(
      Math.max(0, Math.min(1, value)).toFixed(2),
    );
  }
}
