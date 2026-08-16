import type {
  AccumulationBaselineRecord,
  EvidenceInventory,
  MultiEvidenceRuntimeFixture,
} from "./contracts";

export function accumulateWithoutUnderstanding(
  fixture: MultiEvidenceRuntimeFixture,
): AccumulationBaselineRecord {
  const inventory = inventoryOf(fixture);
  const preservedContent = [
    ...fixture.observations.map((item) => ({
      evidenceId: item.observationId,
      content: item.content,
    })),
    ...fixture.translations.map((item) => ({
      evidenceId: item.translationId,
      content: item.meaning,
    })),
    ...fixture.context.map((item) => ({
      evidenceId: item.contextId,
      content: item.purpose,
    })),
    ...fixture.knowledgeCandidates.map((item) => ({
      evidenceId: item.knowledgeId,
      content: item.claim,
    })),
  ];

  return {
    recordId: `baseline:${fixture.fixtureId}:${fixture.fixtureVersion}`,
    fixtureId: fixture.fixtureId,
    inventory,
    stableOrder: preservedContent.map((item) => item.evidenceId),
    preservedContent,
  };
}

function inventoryOf(fixture: MultiEvidenceRuntimeFixture): EvidenceInventory {
  return {
    entityIds: fixture.entities.map((item) => item.entityId),
    sourceIds: fixture.sources.map((item) => item.sourceId),
    observationIds: fixture.observations.map((item) => item.observationId),
    translationIds: fixture.translations.map((item) => item.translationId),
    contextIds: fixture.context.map((item) => item.contextId),
    knowledgeCandidateIds: fixture.knowledgeCandidates.map(
      (item) => item.knowledgeId,
    ),
  };
}