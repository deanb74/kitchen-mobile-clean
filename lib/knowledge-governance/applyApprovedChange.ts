import type { Concept } from "../knowledge/Concept";
import type { ConceptProvenanceInput } from "../knowledge/ConceptProvenanceRecord";
import { KnowledgeGraph } from "../knowledge/KnowledgeGraph";
import type { MutationResult } from "../knowledge/KnowledgeGraphMutation";
import type { ApprovedKnowledgeGovernanceRecord } from "./KnowledgeGovernance";
import { evaluateGuard, type GuardInput } from "./writeGuard";

/**
 * applyApprovedChange — Milestone 043
 *
 * The sap in the trunk.
 *
 * Connects three proven chains into one:
 *   ApprovedKnowledgeGovernanceRecord (governance chain)
 *   → evaluateGuard() (guard chain)
 *   → KnowledgeGraph mutation (mutation chain)
 *
 * Does not govern. Does not judge. Does not modify boundaries.
 * Converts, evaluates, and applies — nothing else.
 *
 * The caller constructs proposedConcept from the approval's proposedContent.
 * Governance approved the intent. The caller implements it. The guard validates.
 */
export function applyApprovedChange(
  record: ApprovedKnowledgeGovernanceRecord,
  proposedConcept: Concept,
  graph: KnowledgeGraph,
): MutationResult {
  const { approvedChange, context, review } = record;
  const targetId = "targetKnowledgeId" in approvedChange
    ? approvedChange.targetKnowledgeId
    : undefined;

  // Build GuardInput — pure mapping, no inference.
  const guardInput: GuardInput = {
    changeId:          record.id,
    changeIntent:      approvedChange.intent,
    sourceLearningId:  approvedChange.sourceLearningId,
    sourceReflectionId: context.reflectionId,
    sourceExecutionId:  context.executionId,
    reviewedBy:        review.reviewedBy,
    reviewedAt:        review.reviewedAt,
    confidence:        approvedChange.confidence,
    targetConcept:     targetId ? graph.getConcept(targetId) : undefined,
    proposedConcept:   {
      status:       proposedConcept.status,
      evidenceLevel: proposedConcept.evidenceLevel,
      scope:        proposedConcept.scope,
      inheritsTo:   proposedConcept.inheritsTo,
    },
    originatesFromPollination: false,
  };

  const guardResult = evaluateGuard(guardInput);

  const provenance: ConceptProvenanceInput = {
    governanceId: record.id,
    changeIntent: approvedChange.intent,
    approvedBy:   approvedChange.approvedBy,
    provenance:   approvedChange.provenance,
  };

  // Route to the correct mutation method by intent.
  switch (approvedChange.intent) {
    case "create":
    case "merge":
      return graph.addConcept(proposedConcept, guardResult, provenance);

    case "update":
    case "reinforce":
    case "supersede":
      if (!targetId) {
        return {
          applied: false,
          action: "rejected",
          conceptId: proposedConcept.id,
          governanceId: record.id,
          reason: `changeIntent "${approvedChange.intent}" requires a targetKnowledgeId.`,
        };
      }
      return graph.updateConcept(targetId, proposedConcept, guardResult, provenance);

    case "retire":
      if (!targetId) {
        return {
          applied: false,
          action: "rejected",
          conceptId: proposedConcept.id,
          governanceId: record.id,
          reason: `changeIntent "retire" requires a targetKnowledgeId.`,
        };
      }
      return graph.retireConcept(targetId, guardResult, provenance);
  }
}
