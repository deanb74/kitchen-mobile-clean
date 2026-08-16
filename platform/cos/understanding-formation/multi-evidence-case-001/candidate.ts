import type {
    EvidenceInventory,
    EvidenceRelationship,
    MultiEvidenceRuntimeFixture,
    MultiEvidenceUnderstandingAccount,
} from "./contracts";

export function formMultiEvidenceUnderstanding(
  fixture: MultiEvidenceRuntimeFixture,
): MultiEvidenceUnderstandingAccount {
  const inventory = inventoryOf(fixture);
  const relationships = formRelationships(fixture);
  const findings = formFindings(relationships);
  const unknowns = formUnknowns(relationships, findings.length > 0);
  const knowledgeApplicability = assessKnowledgeApplicability(
    fixture,
    unknowns,
  );
  const status = formationStatus(findings.length, unknowns.length);
  const acceptedEvidence = [
    ...fixture.observations.map((item) => ({
      evidenceIds: [item.observationId],
      treatment: "accepted" as const,
      reason: "The attributable Observation is available for current formation.",
    })),
    ...fixture.translations.map((item) => ({
      evidenceIds: [item.translationId],
      treatment: "accepted" as const,
      reason: "The bounded Translation remains linked to its Observation.",
    })),
    ...fixture.context.map((item) => ({
      evidenceIds: [item.contextId],
      treatment: "accepted" as const,
      reason: "The attributable Context supplies current purpose and use scope.",
    })),
  ];
  const contextIds = fixture.context.map((item) => item.contextId);
  const findingIds = findings.map((item) => item.findingId);

  return {
    accountId: `understanding:${fixture.fixtureId}:${fixture.fixtureVersion}`,
    lifecycleStatus: "current",
    formationOwner: "Understanding",
    status,
    purposeReference: fixture.context[0]?.contextId ?? "Not Applicable",
    contextReferences: contextIds,
    availableEvidenceInventory: inventory,
    acceptedEvidence,
    excludedOrRejectedEvidence: [],
    sourceClaims: fixture.observations.map((item) => ({
      observationId: item.observationId,
      sourceId: item.sourceId,
    })),
    translationInterpretations: fixture.translations.map((item) => ({
      translationId: item.translationId,
      observationId: item.observationId,
    })),
    evidenceRelationships: relationships,
    knowledgeApplicability,
    supportedFindings: findings,
    contextSpecificSignificance: {
      evidenceIds: relationships.flatMap(
        (item) => item.participatingEvidenceIds,
      ),
      statement: findings.length > 0
        ? "The supported relationships affect the bounded current account, while unresolved meaning remains outside what the evidence establishes."
        : "The supplied evidence does not establish a material cross-evidence account for the bounded purpose.",
    },
    contradictions: relationships.some(
      (item) => item.relationshipType === "contradiction",
    )
      ? ["A material contradiction remains visible in the account."]
      : ["Not Applicable - no material contradiction is established."],
    credibleAlternatives: unknowns.length > 0
      ? [
          "An unobserved difference in Context may explain the relationship.",
          "The relationship may not persist beyond the bounded evidence period.",
        ]
      : [],
    assumptionsAndInferenceBases: relationships.map(
      (item) => item.inferenceBasis,
    ),
    unknownsAndEvidenceNeeds: unknowns,
    confidence: confidenceFor(fixture, relationships),
    completeness: completenessFor(status, unknowns),
    priorAccountAndCorrectionLinks: "Not Applicable",
    synthesis: {
      statement: synthesisFor(status, findings, unknowns),
      findingIds,
    },
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

function formRelationships(
  fixture: MultiEvidenceRuntimeFixture,
): EvidenceRelationship[] {
  const relationships: EvidenceRelationship[] = [];
  const observationById = new Map(
    fixture.observations.map((item) => [item.observationId, item]),
  );

  for (let leftIndex = 0; leftIndex < fixture.translations.length; leftIndex += 1) {
    const left = fixture.translations[leftIndex];
    const leftObservation = observationById.get(left.observationId);
    if (isDirectClaim(left.meaning, leftObservation?.content ?? "")) {
      relationships.push({
        relationshipId: `relationship:direct:${left.translationId}`,
        relationshipType: "attributed-direct-claim",
        participatingEvidenceIds: [left.observationId, left.translationId],
        support: "The Translation preserves a directly attributed source claim.",
        inferenceBasis: "Attribution is preserved without treating the claim as independently verified state.",
        sourceIds: leftObservation ? [leftObservation.sourceId] : [],
      });
    }

    for (
      let rightIndex = leftIndex + 1;
      rightIndex < fixture.translations.length;
      rightIndex += 1
    ) {
      const right = fixture.translations[rightIndex];
      const rightObservation = observationById.get(right.observationId);
      const overlap = semanticOverlap(left.meaning, right.meaning);
      if (overlap < 2 || hasNegation(left.meaning) === hasNegation(right.meaning)) {
        continue;
      }
      const sourceIds = [
        leftObservation?.sourceId,
        rightObservation?.sourceId,
      ].filter((item): item is string => Boolean(item));
      relationships.push({
        relationshipId: `relationship:contrast:${left.translationId}:${right.translationId}`,
        relationshipType: "qualified-contrast",
        participatingEvidenceIds: [left.translationId, right.translationId],
        support: "The bounded Translations share material subjects while reporting differing states.",
        inferenceBasis: new Set(sourceIds).size < sourceIds.length
          ? "The contrast is attributable to a shared source and is not independent corroboration."
          : "The contrast is attributable to distinct sources; independence is not assumed beyond supplied provenance.",
        sourceIds,
      });
    }
  }

  const relatedTranslations = new Set(
    relationships.flatMap((item) => item.participatingEvidenceIds),
  );
  const contrastEvidence = relationships
    .filter((item) => item.relationshipType === "qualified-contrast")
    .flatMap((item) => item.participatingEvidenceIds);
  for (const translation of fixture.translations) {
    if (relatedTranslations.has(translation.translationId) || contrastEvidence.length === 0) {
      continue;
    }
    relationships.push({
      relationshipId: `relationship:unresolved:${translation.translationId}`,
      relationshipType: "unresolved-independence",
      participatingEvidenceIds: [translation.translationId, ...contrastEvidence],
      support: "The supplied evidence does not establish a semantic connection.",
      inferenceBasis: "Co-occurrence or temporal proximity alone is not treated as causation or explanation.",
      sourceIds: [observationById.get(translation.observationId)?.sourceId].filter(
        (item): item is string => Boolean(item),
      ),
    });
  }

  return relationships;
}

function formFindings(relationships: EvidenceRelationship[]) {
  return relationships
    .filter((item) => item.relationshipType === "qualified-contrast")
    .map((item, index) => ({
      findingId: `finding:${index + 1}`,
      evidenceIds: [...item.participatingEvidenceIds],
      statement: "The participating Translations support a bounded qualified contrast without establishing its cause.",
    }));
}

function assessKnowledgeApplicability(
  fixture: MultiEvidenceRuntimeFixture,
  unknowns: string[],
) {
  return fixture.knowledgeCandidates.map((item) => {
    const conditionText = item.applicabilityConditions.join(" ").toLowerCase();
    const applicable =
      (conditionText.includes("incomplete") && unknowns.length > 0) ||
      conditionText.includes("understanding is being formed") ||
      (conditionText.includes("context is used") && fixture.context.length > 0);
    return {
      knowledgeId: item.knowledgeId,
      applicability: applicable ? "applicable" as const : "unresolved" as const,
      reason: applicable
        ? "The stated applicability condition is evidenced within the bounded formation account."
        : "The supplied evidence does not establish the stated applicability condition.",
      sourceStatus: item.sourceStatus,
      scope: item.scope,
    };
  });
}

function formUnknowns(
  relationships: EvidenceRelationship[],
  hasFinding: boolean,
): string[] {
  if (!hasFinding) {
    return ["Additional attributable evidence is needed to form a material cross-evidence account."];
  }
  const unknowns = [
    "The cause and persistence of the supported contrast remain unknown.",
    "Attributable Context is needed to distinguish materially plausible explanations.",
  ];
  if (relationships.some((item) => item.relationshipType === "unresolved-independence")) {
    unknowns.push("Whether unresolved evidence is related remains unknown.");
  }
  return unknowns;
}

function formationStatus(
  findingCount: number,
  unknownCount: number,
): MultiEvidenceUnderstandingAccount["status"] {
  if (findingCount === 0) return "MULTI_EVIDENCE_UNDERSTANDING_INSUFFICIENT";
  if (unknownCount > 0) return "MULTI_EVIDENCE_UNDERSTANDING_PARTIAL";
  return "MULTI_EVIDENCE_UNDERSTANDING_FORMED";
}

function confidenceFor(
  fixture: MultiEvidenceRuntimeFixture,
  relationships: EvidenceRelationship[],
): MultiEvidenceUnderstandingAccount["confidence"] {
  const highTranslations = fixture.translations.filter(
    (item) => item.translationConfidence.toLowerCase() === "high",
  ).length;
  const sharedSource = relationships.some(
    (item) => new Set(item.sourceIds).size < item.sourceIds.length,
  );
  return {
    level: relationships.length === 0 ? "low" : "moderate",
    basis: `Confidence is bounded by ${highTranslations} attributable Translation confidence record(s)` +
      (sharedSource ? " and does not treat repeated shared-source evidence as independent support." : "."),
  };
}

function completenessFor(
  status: MultiEvidenceUnderstandingAccount["status"],
  unknowns: string[],
): MultiEvidenceUnderstandingAccount["completeness"] {
  return {
    level: status === "MULTI_EVIDENCE_UNDERSTANDING_FORMED"
      ? "complete"
      : status === "MULTI_EVIDENCE_UNDERSTANDING_PARTIAL"
        ? "partial"
        : "insufficient",
    basis: unknowns.length === 0
      ? "No material evidence need remains within the bounded purpose."
      : `${unknowns.length} material unknown or evidence need(s) remain.`,
  };
}

function synthesisFor(
  status: MultiEvidenceUnderstandingAccount["status"],
  findings: Array<{ statement: string }>,
  unknowns: string[],
): string {
  if (status === "MULTI_EVIDENCE_UNDERSTANDING_INSUFFICIENT") {
    return "The evidence is preserved, but no material cross-evidence finding is currently supported."
  }
  return `${findings.map((item) => item.statement).join(" ")} ${unknowns.join(" ")}`.trim();
}

function semanticOverlap(left: string, right: string): number {
  const leftTokens = new Set(meaningTokens(left));
  return meaningTokens(right).filter((token) => leftTokens.has(token)).length;
}

function meaningTokens(value: string): string[] {
  const ignored = new Set([
    "a", "an", "and", "as", "at", "being", "during", "for", "in", "is",
    "of", "on", "or", "reported", "reports", "source", "stated", "the", "to",
  ]);
  return value.toLowerCase().replace(/[^a-z0-9-]+/g, " ").split(/\s+/)
    .filter((token) => token.length > 2 && !ignored.has(token));
}

function hasNegation(value: string): boolean {
  return /\b(no|none|not|never|absent|without|zero)\b/i.test(value);
}

function isDirectClaim(meaning: string, content: string): boolean {
  return /\bdirectly (reported|stated|said)\b/i.test(meaning) || /['"][^'"]+['"]/.test(content);
}