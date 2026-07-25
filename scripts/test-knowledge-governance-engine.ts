import assert from "node:assert/strict";
import type {
    ApprovedKnowledgeChange,
    ApprovedKnowledgeGovernanceRecord,
    KnowledgeChangeIntent,
    KnowledgeGovernance,
} from "../lib/knowledge-governance/KnowledgeGovernance";
import { KnowledgeGovernanceEngine } from "../lib/knowledge-governance/KnowledgeGovernanceEngine";
import type { Learning, LearningDisposition } from "../lib/learning/Learning";

const divider = "----------------------------------------";

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function buildLearning(
  overrides: Partial<Learning> = {},
): Learning {
  const hasProposalOverride = Object.prototype.hasOwnProperty.call(
    overrides,
    "proposal",
  );

  const base: Learning = {
    id: "learning-001",
    context: {
      reflectionId: "reflection-001",
      reflectionDisposition: "adjust",
      reflectionConfidence: 0.76,
      reflectionRequiresHuman: true,
      actionId: "action-001",
      executionId: "execution-001",
      executionCreatedAt: "2026-07-25T10:00:00.000Z",
      executionCompletedAt: "2026-07-25T10:01:00.000Z",
      executionOutcome: "failed",
      executionEffect: "internal",
    },
    disposition: "propose",
    proposal: {
      knowledgeTargetId: "knowledge-food-safety-001",
      whatShouldChange:
        "Add mandatory qualified check when fridge exceeds safe boundary.",
      why: "Boundary breach increases uncertainty and risk.",
      expectedBenefit:
        "Reduce unsafe assumptions and improve auditability.",
      confidence: 0.71,
      supportingEvidence: [
        {
          sourceType: "reflection-finding",
          sourceId: "reflection-001:finding:0",
          detail: "Boundary exceeded without sufficient validation.",
          severity: "high",
        },
      ],
    },
    validation: {
      state: "pending",
    },
    evidence: [
      {
        sourceType: "reflection-summary",
        sourceId: "reflection-001",
        detail: "Reflection indicates governance-first improvement.",
      },
      {
        sourceType: "reflection-finding",
        sourceId: "reflection-001:finding:0",
        detail: "Potential safety risk requires explicit controls.",
        severity: "critical",
      },
    ],
    rationale: "Base learning rationale.",
    confidence: 0.64,
    requiresHuman: true,
    createdAt: "2026-07-25T10:02:00.000Z",
    updatedAt: "2026-07-25T10:02:00.000Z",
  };

  const merged: Learning = {
    ...base,
    ...overrides,
    context: {
      ...base.context,
      ...(overrides.context ?? {}),
    },
    proposal: (() => {
      if (!hasProposalOverride) {
        return base.proposal
          ? {
              ...base.proposal,
              supportingEvidence: base.proposal.supportingEvidence.map(
                (item) => ({ ...item }),
              ),
            }
          : undefined;
      }

      if (overrides.proposal === undefined) {
        return undefined;
      }

      return {
        ...overrides.proposal,
        supportingEvidence:
          overrides.proposal.supportingEvidence?.map((item) => ({ ...item })) ??
          [],
      };
    })(),
    validation: {
      ...base.validation,
      ...(overrides.validation ?? {}),
    },
    evidence: (overrides.evidence ?? base.evidence).map((item) => ({
      ...item,
    })),
  };

  return merged;
}

function buildInput(
  learning: Learning,
  overrides: Partial<{
    decision: "approve" | "reject" | "defer" | "supersede";
    changeIntent: KnowledgeChangeIntent;
    rationale: string;
    reviewedBy?: string;
    reviewedAt?: string;
    conditions?: ReadonlyArray<string>;
    governanceId?: string;
    now?: string;
  }> = {},
) {
  return {
    learning,
    decision: overrides.decision ?? "approve",
    changeIntent: overrides.changeIntent ?? "create",
    rationale: overrides.rationale ?? "Governance review complete.",
    reviewedBy: overrides.reviewedBy,
    reviewedAt: overrides.reviewedAt,
    conditions: overrides.conditions,
    governanceId: overrides.governanceId,
    now: overrides.now,
  };
}

function assertConfidenceInRange(governance: KnowledgeGovernance): void {
  assert.ok(governance.context.learningConfidence >= 0);
  assert.ok(governance.context.learningConfidence <= 1);
  assert.ok(governance.review.confidence >= 0);
  assert.ok(governance.review.confidence <= 1);

  if (governance.review.decision === "approve") {
    const approvedChange = getApprovedChange(governance);

    assert.ok(approvedChange.confidence >= 0);
    assert.ok(approvedChange.confidence <= 1);
  }
}

function assertApprovedGovernance(
  governance: KnowledgeGovernance,
): asserts governance is ApprovedKnowledgeGovernanceRecord {
  assert.equal(governance.review.decision, "approve");
  assert.ok(governance.approvedChange);
}

function getApprovedChange(
  governance: KnowledgeGovernance,
): ApprovedKnowledgeChange {
  assertApprovedGovernance(governance);

  return governance.approvedChange;
}

function assertThrows(fn: () => unknown, pattern: RegExp): void {
  assert.throws(fn, pattern);
}

function main(): void {
  const engine = new KnowledgeGovernanceEngine();

  console.log("\nHELPING HAND KNOWLEDGE GOVERNANCE ENGINE TEST");
  console.log(divider);

  const approveCreateLearning = buildLearning({
    disposition: "propose",
    proposal: {
      knowledgeTargetId: undefined,
      whatShouldChange: "Create a new governed note about fridge variance handling.",
      why: "Current guidance is missing this pattern.",
      expectedBenefit: "Improve consistency of escalation decisions.",
      confidence: 0.82,
      supportingEvidence: [
        {
          sourceType: "reflection-summary",
          sourceId: "reflection-001",
          detail: "Pattern observed across shifts.",
        },
      ],
    },
    requiresHuman: false,
    confidence: 0.61,
    evidence: [
      {
        sourceType: "reflection-summary",
        sourceId: "reflection-001",
        detail: "Candidate knowledge identified.",
      },
    ],
  });

  const approveCreate = engine.build(
    buildInput(approveCreateLearning, {
      decision: "approve",
      changeIntent: "create",
      reviewedBy: "governance.lead",
      reviewedAt: "2026-07-25T11:00:00.000Z",
      now: "2026-07-25T11:00:00.000Z",
    }),
  );

  const approveCreateChange = getApprovedChange(approveCreate);

  assert.equal(approveCreate.review.decision, "approve");
  assert.equal(approveCreateChange.intent, "create");
  assert.equal(
    approveCreateChange.targetKnowledgeId,
    undefined,
  );
  assert.equal(
    approveCreateChange.status,
    "approved-not-applied",
  );

  const approveUpdateLearning = buildLearning({
    disposition: "propose",
    proposal: {
      knowledgeTargetId: "knowledge-food-safety-777",
      whatShouldChange: "Update safe-boundary handling with mandatory supervisor check.",
      why: "Evidence shows repeated uncertainty.",
      expectedBenefit: "Reduce unsafe variability in decisions.",
      confidence: 0.77,
      supportingEvidence: [
        {
          sourceType: "reflection-finding",
          sourceId: "reflection-001:finding:0",
          detail: "Repeated uncertain outcome in safety cases.",
          severity: "high",
        },
      ],
    },
    confidence: 0.58,
    requiresHuman: false,
  });

  const approveUpdate = engine.build(
    buildInput(approveUpdateLearning, {
      decision: "approve",
      changeIntent: "update",
      reviewedBy: "governance.reviewer",
      reviewedAt: "2026-07-25T11:01:00.000Z",
      now: "2026-07-25T11:01:00.000Z",
    }),
  );

  const approveUpdateChange = getApprovedChange(approveUpdate);

  assert.equal(approveUpdate.review.decision, "approve");
  assert.equal(approveUpdateChange.intent, "update");
  assert.equal(
    approveUpdateChange.targetKnowledgeId,
    "knowledge-food-safety-777",
  );
  assert.equal(
    approveUpdateChange.proposedContent,
    approveUpdateLearning.proposal?.whatShouldChange,
  );
  assert.equal(
    approveUpdateChange.expectedBenefit,
    approveUpdateLearning.proposal?.expectedBenefit,
  );

  const approveReinforceLearning = buildLearning({
    disposition: "reinforce",
    proposal: {
      knowledgeTargetId: "knowledge-food-safety-reinforce-1",
      whatShouldChange: "Reinforce existing control with stronger provenance links.",
      why: "Current control is correct and supported by new evidence.",
      expectedBenefit: "Increase confidence in governed practice.",
      confidence: 0.9,
      supportingEvidence: [
        {
          sourceType: "reflection-evidence",
          sourceId: "reflection-001:evidence:0",
          detail: "Confirmed control success over repeated cases.",
          observedAt: "2026-07-25T10:59:00.000Z",
        },
      ],
    },
    confidence: 0.83,
    requiresHuman: false,
  });

  const approveReinforce = engine.build(
    buildInput(approveReinforceLearning, {
      decision: "approve",
      changeIntent: "reinforce",
      reviewedBy: "governance.reviewer",
      reviewedAt: "2026-07-25T11:02:00.000Z",
      now: "2026-07-25T11:02:00.000Z",
    }),
  );

  const approveReinforceChange = getApprovedChange(approveReinforce);

  assert.equal(approveReinforce.review.decision, "approve");
  assert.equal(approveReinforceChange.intent, "reinforce");
  assert.equal(
    approveReinforceChange.targetKnowledgeId,
    "knowledge-food-safety-reinforce-1",
  );

  const rejectLearning = buildLearning({
    confidence: 0.45,
    requiresHuman: false,
  });

  const reject = engine.build(
    buildInput(rejectLearning, {
      decision: "reject",
      changeIntent: "none",
      reviewedBy: "governance.reviewer",
      reviewedAt: "2026-07-25T11:03:00.000Z",
      now: "2026-07-25T11:03:00.000Z",
    }),
  );

  assert.equal(reject.review.decision, "reject");
  assert.equal("approvedChange" in reject, false);

  const deferReviewed = engine.build(
    buildInput(buildLearning(), {
      decision: "defer",
      changeIntent: "none",
      reviewedBy: "governance.reviewer",
      reviewedAt: "2026-07-25T11:04:00.000Z",
      now: "2026-07-25T11:04:00.000Z",
    }),
  );

  assert.equal(deferReviewed.review.decision, "defer");
  assert.equal("approvedChange" in deferReviewed, false);
  assert.equal(deferReviewed.requiresHuman, true);

  const deferUnreviewedLearning = buildLearning({ requiresHuman: false });
  const deferUnreviewed = engine.build(
    buildInput(deferUnreviewedLearning, {
      decision: "defer",
      changeIntent: "none",
      now: "2026-07-25T11:05:00.000Z",
    }),
  );

  assert.equal(deferUnreviewed.review.decision, "defer");
  assert.equal(deferUnreviewed.review.reviewedBy, undefined);
  assert.equal(deferUnreviewed.review.reviewedAt, undefined);
  assert.equal("approvedChange" in deferUnreviewed, false);
  assert.equal(deferUnreviewed.requiresHuman, true);

  const supersede = engine.build(
    buildInput(buildLearning(), {
      decision: "supersede",
      changeIntent: "supersede",
      reviewedBy: "governance.architect",
      reviewedAt: "2026-07-25T11:06:00.000Z",
      now: "2026-07-25T11:06:00.000Z",
    }),
  );

  assert.equal(supersede.review.decision, "supersede");
  assert.equal("approvedChange" in supersede, false);

  assertThrows(
    () =>
      engine.build(
        buildInput(
          buildLearning({
            disposition: "observe" as LearningDisposition,
            proposal: {
              knowledgeTargetId: "knowledge-observe-1",
              whatShouldChange: "Should not be approvable from observe.",
              why: "Observation only.",
              expectedBenefit: "None",
              confidence: 0.4,
              supportingEvidence: [],
            },
            requiresHuman: false,
            evidence: [],
          }),
          {
            decision: "approve",
            changeIntent: "update",
            reviewedBy: "governance.reviewer",
            reviewedAt: "2026-07-25T11:07:00.000Z",
            now: "2026-07-25T11:07:00.000Z",
          },
        ),
      ),
    /cannot be approved/i,
  );

  assertThrows(
    () =>
      engine.build(
        buildInput(
          buildLearning({
            disposition: "reject" as LearningDisposition,
            proposal: {
              knowledgeTargetId: "knowledge-reject-1",
              whatShouldChange: "Should not be approvable from reject.",
              why: "Rejected disposition.",
              expectedBenefit: "None",
              confidence: 0.4,
              supportingEvidence: [],
            },
            requiresHuman: false,
            evidence: [],
          }),
          {
            decision: "approve",
            changeIntent: "update",
            reviewedBy: "governance.reviewer",
            reviewedAt: "2026-07-25T11:08:00.000Z",
            now: "2026-07-25T11:08:00.000Z",
          },
        ),
      ),
    /cannot be approved/i,
  );

  assertThrows(
    () =>
      engine.build(
        buildInput(buildLearning({ proposal: undefined }), {
          decision: "approve",
          changeIntent: "create",
          reviewedBy: "governance.reviewer",
          reviewedAt: "2026-07-25T11:09:00.000Z",
          now: "2026-07-25T11:09:00.000Z",
        }),
      ),
    /proposal to exist/i,
  );

  assertThrows(
    () =>
      engine.build(
        buildInput(buildLearning({ requiresHuman: false, evidence: [] }), {
          decision: "approve",
          changeIntent: "none",
          reviewedBy: "governance.reviewer",
          reviewedAt: "2026-07-25T11:10:00.000Z",
          now: "2026-07-25T11:10:00.000Z",
        }),
      ),
    /changeIntent.*none/i,
  );

  for (const intent of [
    "update",
    "reinforce",
    "supersede",
    "retire",
  ] as const) {
    assertThrows(
      () =>
        engine.build(
          buildInput(
            buildLearning({
              proposal: {
                knowledgeTargetId: undefined,
                whatShouldChange: `Attempt ${intent} without target.`,
                why: "Target requirement test.",
                expectedBenefit: "Validation correctness.",
                confidence: 0.7,
                supportingEvidence: [],
              },
              requiresHuman: false,
              evidence: [],
            }),
            {
              decision: "approve",
              changeIntent: intent,
              reviewedBy: "governance.reviewer",
              reviewedAt: "2026-07-25T11:11:00.000Z",
              now: "2026-07-25T11:11:00.000Z",
            },
          ),
        ),
      /requires proposal\.knowledgeTargetId/i,
    );
  }

  assertThrows(
    () =>
      engine.build(
        buildInput(buildLearning({ requiresHuman: false, evidence: [] }), {
          decision: "approve",
          changeIntent: "create",
          reviewedAt: "2026-07-25T11:12:00.000Z",
          now: "2026-07-25T11:12:00.000Z",
        }),
      ),
    /requires reviewedBy and reviewedAt/i,
  );

  assertThrows(
    () =>
      engine.build(
        buildInput(buildLearning({ requiresHuman: false, evidence: [] }), {
          decision: "approve",
          changeIntent: "create",
          reviewedBy: "governance.reviewer",
          now: "2026-07-25T11:13:00.000Z",
        }),
      ),
    /requires reviewedBy and reviewedAt/i,
  );

  assertThrows(
    () =>
      engine.build(
        buildInput(buildLearning(), {
          decision: "reject",
          changeIntent: "none",
          reviewedBy: "governance.reviewer",
          now: "2026-07-25T11:14:00.000Z",
        }),
      ),
    /requires reviewedBy and reviewedAt/i,
  );

  assertThrows(
    () =>
      engine.build(
        buildInput(buildLearning(), {
          decision: "supersede",
          changeIntent: "supersede",
          reviewedAt: "2026-07-25T11:15:00.000Z",
          now: "2026-07-25T11:15:00.000Z",
        }),
      ),
    /requires reviewedBy and reviewedAt/i,
  );

  const validationLearning = buildLearning({
    validation: {
      state: "validated",
      reviewedBy: "prior.reviewer",
      reviewedAt: "2026-07-24T12:00:00.000Z",
    },
    requiresHuman: false,
    evidence: [],
  });
  const validationBefore = deepClone(validationLearning.validation);

  engine.build(
    buildInput(validationLearning, {
      decision: "defer",
      changeIntent: "none",
      now: "2026-07-25T11:16:00.000Z",
    }),
  );

  assert.deepEqual(validationLearning.validation, validationBefore);

  const immutableLearning = buildLearning({ requiresHuman: false });
  const immutableBefore = deepClone(immutableLearning);

  const immutableResult = engine.build(
    buildInput(immutableLearning, {
      decision: "approve",
      changeIntent: "update",
      reviewedBy: "governance.reviewer",
      reviewedAt: "2026-07-25T11:17:00.000Z",
      now: "2026-07-25T11:17:00.000Z",
    }),
  );

  assert.deepEqual(immutableLearning, immutableBefore);

  immutableLearning.context.actionId = "mutated-action-id";
  if (immutableLearning.proposal) {
    immutableLearning.proposal.whatShouldChange = "mutated-proposal-content";
    immutableLearning.proposal.supportingEvidence[0].detail = "mutated-supporting-evidence";
  }
  immutableLearning.evidence[0].detail = "mutated-learning-evidence";

  assert.notEqual(
    immutableResult.context.actionId,
    "mutated-action-id",
  );
  assert.ok(
    immutableResult.evidence.every(
      (item) =>
        item.detail !== "mutated-learning-evidence" &&
        item.detail !== "mutated-supporting-evidence",
    ),
  );

  const resultAsMutable = immutableResult as unknown as {
    context: { actionId: string };
    evidence: Array<{ detail: string }>;
  };

  resultAsMutable.context.actionId = "mutated-governance-context";
  resultAsMutable.evidence[0].detail = "mutated-governance-evidence";

  assert.notEqual(
    immutableLearning.context.actionId,
    "mutated-governance-context",
  );
  assert.notEqual(
    immutableLearning.evidence[0].detail,
    "mutated-governance-evidence",
  );

  const confidenceLearning = buildLearning({
    confidence: 0.42,
    proposal: {
      knowledgeTargetId: "knowledge-confidence-1",
      whatShouldChange: "Improve uncertainty tagging.",
      why: "Confidence derivation check.",
      expectedBenefit: "Clearer governance signal.",
      confidence: 0.9,
      supportingEvidence: [],
    },
    requiresHuman: false,
    evidence: [],
  });

  const confidenceApproval = engine.build(
    buildInput(confidenceLearning, {
      decision: "approve",
      changeIntent: "update",
      reviewedBy: "governance.reviewer",
      reviewedAt: "2026-07-25T11:18:00.000Z",
      now: "2026-07-25T11:18:00.000Z",
    }),
  );

  assert.equal(getApprovedChange(confidenceApproval).confidence, 0.42);

  const clampedLearning = buildLearning({
    confidence: 1.6,
    requiresHuman: false,
    evidence: [],
  });

  const clampedReject = engine.build(
    buildInput(clampedLearning, {
      decision: "reject",
      changeIntent: "none",
      reviewedBy: "governance.reviewer",
      reviewedAt: "2026-07-25T11:19:00.000Z",
      now: "2026-07-25T11:19:00.000Z",
    }),
  );

  assert.equal(clampedReject.review.confidence, 1);

  assertConfidenceInRange(approveCreate);
  assertConfidenceInRange(approveUpdate);
  assertConfidenceInRange(approveReinforce);
  assertConfidenceInRange(reject);
  assertConfidenceInRange(deferReviewed);
  assertConfidenceInRange(deferUnreviewed);
  assertConfidenceInRange(supersede);
  assertConfidenceInRange(confidenceApproval);
  assertConfidenceInRange(clampedReject);

  const explicitLearning = buildLearning({ requiresHuman: false, evidence: [] });
  const explicitInput = buildInput(explicitLearning, {
    decision: "defer",
    changeIntent: "none",
    governanceId: "kg-fixed-id-001",
    now: "2026-07-25T11:20:00.000Z",
    rationale: "Deferred pending additional evidence.",
  });

  const explicit = engine.build(explicitInput);

  assert.equal(explicit.id, "kg-fixed-id-001");
  assert.equal(explicit.createdAt, "2026-07-25T11:20:00.000Z");
  assert.equal(explicit.updatedAt, "2026-07-25T11:20:00.000Z");

  const rerunInput = buildInput(buildLearning({ requiresHuman: false, evidence: [] }), {
    decision: "defer",
    changeIntent: "none",
    governanceId: "kg-fixed-id-002",
    now: "2026-07-25T11:21:00.000Z",
    rationale: "Deferred pending additional evidence.",
    conditions: ["await-more-evidence"],
  });

  const rerunA = engine.build(rerunInput);
  const rerunB = engine.build(rerunInput);

  assert.deepEqual(deepClone(rerunA), deepClone(rerunB));

  console.log("All knowledge governance engine checks passed.");
}

main();
