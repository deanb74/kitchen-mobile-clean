import type {
    MaterialRelationalGapEvidence,
    RelationalEvidenceEnvelope,
    RelationalEvidenceReference,
    RelationshipProposedEvidence,
} from "../../../lib/understanding/Understanding";
import type {
    FormationRelationalInquiry,
    RelationalAlternative,
    RelationalCorrection,
    RelationalFact,
    RelationalFeedback,
    RelationalRule,
    Translation,
} from "./types";

export function formRelationalEvidence(
  inquiry: FormationRelationalInquiry,
  translations: Translation[],
): RelationalEvidenceEnvelope | undefined {
  const corrections = inquiry.propositions.filter(
    (item): item is RelationalCorrection => item.kind === "correction",
  );
  const facts = inquiry.propositions.filter(
    (item): item is RelationalFact => item.kind === "fact",
  );
  const rules = inquiry.propositions.filter(
    (item): item is RelationalRule => item.kind === "rule",
  );
  const feedback = inquiry.propositions.filter(
    (item): item is RelationalFeedback => item.kind === "feedback",
  );
  const alternatives = inquiry.propositions.filter(
    (item): item is RelationalAlternative => item.kind === "alternative",
  );

  const correction = corrections.at(-1);
  if (correction) {
    return relationshipFromCorrection(inquiry, correction, translations);
  }

  const matchedRules = rules.filter((rule) => ruleMatches(rule, facts));
  if (matchedRules.length === 1) {
    return relationshipFromRule(
      inquiry,
      matchedRules[0],
      facts,
      alternatives,
      translations,
    );
  }

  const relationalFeedback = feedback.at(-1);
  if (relationalFeedback) {
    return gapFromFeedback(
      inquiry,
      relationalFeedback,
      alternatives,
      translations,
    );
  }

  if (matchedRules.length > 1 || alternatives.length > 1) {
    return gapFromAlternatives(
      inquiry,
      matchedRules,
      alternatives,
      translations,
    );
  }

  const derivedGap = gapFromFacts(inquiry, facts, alternatives, translations);
  if (derivedGap) return derivedGap;

  return undefined;
}

function relationshipFromCorrection(
  inquiry: FormationRelationalInquiry,
  correction: RelationalCorrection,
  translations: Translation[],
): RelationshipProposedEvidence {
  return {
    ...baseEvidence(inquiry, [correction.evidenceId], translations),
    kind: "RELATIONSHIP_PROPOSED",
    claim: correction.claim,
    significance: correction.significance,
    alternatives: [],
    intendedRecipientId: inquiry.intendedRecipientId,
    priorResultId: correction.correctsResultId,
    correctionId: correction.id,
  };
}

function relationshipFromRule(
  inquiry: FormationRelationalInquiry,
  rule: RelationalRule,
  facts: RelationalFact[],
  alternatives: RelationalAlternative[],
  translations: Translation[],
): RelationshipProposedEvidence {
  const supportingFacts = facts.filter((fact) =>
    rule.conditions.some(
      (condition) =>
        condition.attribute === fact.attribute &&
        condition.equals === fact.value,
    ),
  );
  const evidenceIds = [
    rule.evidenceId,
    ...supportingFacts.map((fact) => fact.evidenceId),
  ];

  return {
    ...baseEvidence(inquiry, evidenceIds, translations),
    kind: "RELATIONSHIP_PROPOSED",
    claim: rule.claim,
    significance: rule.significance,
    inferenceBasis: rule.inferenceBasis,
    alternatives: alternatives.map((item) => item.claim),
    intendedRecipientId: inquiry.intendedRecipientId,
  };
}

function gapFromFeedback(
  inquiry: FormationRelationalInquiry,
  feedback: RelationalFeedback,
  alternatives: RelationalAlternative[],
  translations: Translation[],
): MaterialRelationalGapEvidence {
  const uncertainty = alternatives.map(
    (alternative) => `Plausible but unconfirmed: ${alternative.claim}`,
  );

  return {
    ...baseEvidence(inquiry, [feedback.evidenceId], translations, uncertainty),
    kind: "MATERIAL_RELATIONAL_GAP",
    gap:
      `why ${feedback.providerId} supplied the participating meanings together ` +
      "and what relationship makes them significant",
    materiality:
      `${feedback.providerId} cannot assess alignment of intended meaning ` +
      "from accurate preservation alone.",
    safeCurrentMeaning:
      "The participating meanings and the bounded purpose remain preserved.",
    neededContext:
      `${feedback.providerId}'s attributable explanation of the intended relationship.`,
    sourceRationale:
      `${feedback.providerId} supplied and assessed the intended meaning ` +
      "without gaining broader decision authority.",
    discoveryNeed: buildDiscoveryNeed(
      feedback.providerId,
      `why ${feedback.providerId} supplied the participating meanings together ` +
        "and what relationship makes them significant",
    ),
  };
}

function gapFromFacts(
  inquiry: FormationRelationalInquiry,
  facts: RelationalFact[],
  alternatives: RelationalAlternative[],
  translations: Translation[],
): MaterialRelationalGapEvidence | undefined {
  const absentAttributes = facts
    .filter((fact) => fact.value === "absent")
    .map((fact) => fact.attribute);

  if (absentAttributes.length > 0 && /assessment|proceed/i.test(inquiry.purpose)) {
    const fields = humanList(absentAttributes.map(readableAttribute));
    const gap = `whether the absent ${fields} are mandatory for final assessment`;
    return {
      ...baseEvidence(
        inquiry,
        facts.filter((fact) => fact.value === "absent").map((fact) => fact.evidenceId),
        translations,
      ),
      kind: "MATERIAL_RELATIONAL_GAP",
      gap,
      materiality:
        "Without the governing requirement, the observed absence cannot responsibly be connected to progression.",
      safeCurrentMeaning: `${fields} are observed absent.`,
      neededContext: "The applicable gate or authority record.",
      sourceRationale:
        "The governing record can establish materiality without turning an observation into a decision.",
      discoveryNeed: buildDiscoveryNeed("applicable gate authority", gap),
    };
  }

  const requester = factValue(facts, "requester");
  const request = factValue(facts, "request");
  const unexplainedConcernOwner = factValue(facts, "unexplained-concern-owner");
  if (requester && request && unexplainedConcernOwner === requester) {
    const gap = `why ${requester}'s unexplained concern leads to ${request}`;
    return {
      ...baseEvidence(
        inquiry,
        facts
          .filter((fact) =>
            ["requester", "request", "unexplained-concern-owner"].includes(
              fact.attribute,
            ),
          )
          .map((fact) => fact.evidenceId),
        translations,
        alternatives.map(
          (alternative) => `Plausible but unconfirmed: ${alternative.claim}`,
        ),
      ),
      kind: "MATERIAL_RELATIONAL_GAP",
      gap,
      materiality:
        "The request cannot be understood from surrounding Context alone.",
      safeCurrentMeaning: `${requester} made ${request}; the reason remains unresolved.`,
      neededContext: `${requester}'s attributable explanation of the concern.`,
      sourceRationale:
        `${requester} supplied the unexplained concern and owns alignment of its intended meaning.`,
      discoveryNeed: buildDiscoveryNeed(requester, gap),
    };
  }

  return undefined;
}

function gapFromAlternatives(
  inquiry: FormationRelationalInquiry,
  rules: RelationalRule[],
  alternatives: RelationalAlternative[],
  translations: Translation[],
): MaterialRelationalGapEvidence {
  const claims = [
    ...rules.map((rule) => rule.claim),
    ...alternatives.map((alternative) => alternative.claim),
  ];
  const evidenceIds = [
    ...rules.map((rule) => rule.evidenceId),
    ...alternatives.map((alternative) => alternative.evidenceId),
  ];
  const gap = "Which plausible relationship is supported by the current evidence";

  return {
    ...baseEvidence(
      inquiry,
      evidenceIds,
      translations,
      claims.map((claim) => `Plausible but unconfirmed: ${claim}`),
    ),
    kind: "MATERIAL_RELATIONAL_GAP",
    gap,
    materiality: `The alternatives cannot be responsibly distinguished for: ${inquiry.purpose}`,
    safeCurrentMeaning: "Multiple relationships remain plausible and none is established.",
    neededContext: "Attributable context that distinguishes the plausible relationships.",
    sourceRationale:
      "The intended recipient or attributable provider can clarify the meaning within their scope.",
    discoveryNeed: buildDiscoveryNeed(
      inquiry.intendedRecipientId,
      gap,
    ),
  };
}

function ruleMatches(rule: RelationalRule, facts: RelationalFact[]): boolean {
  return rule.conditions.every((condition) =>
    facts.some(
      (fact) =>
        fact.attribute === condition.attribute &&
        fact.value === condition.equals,
    ),
  );
}

function baseEvidence(
  inquiry: FormationRelationalInquiry,
  evidenceIds: string[],
  translations: Translation[],
  uncertainty: string[] = [],
) {
  return {
    id: inquiry.id,
    purpose: inquiry.purpose,
    participatingMeaningIds: [...inquiry.participatingMeaningIds],
    contextReferences: [...inquiry.contextReferences],
    evidence: uniqueEvidence(evidenceIds),
    confidence: evidenceConfidence(evidenceIds, translations),
    uncertainty,
    priorResultId: inquiry.priorResultId,
  };
}

function uniqueEvidence(evidenceIds: string[]): RelationalEvidenceReference[] {
  return [...new Set(evidenceIds)].map((evidenceId) => ({
    evidenceId,
    status: "directly-supported" as const,
  }));
}

function evidenceConfidence(
  evidenceIds: string[],
  translations: Translation[],
): number {
  const relevant = translations.filter((translation) =>
    evidenceIds.includes(translation.observationId),
  );
  const considered = relevant.length > 0 ? relevant : translations;
  if (considered.length === 0) return 0;

  const average = considered.reduce(
    (total, translation) => total + translation.confidence,
    0,
  ) / considered.length;

  return Math.min(Math.max(Number(average.toFixed(2)), 0), 1);
}

function buildDiscoveryNeed(sourceId: string | undefined, gap: string): string {
  const source = sourceId ? `Ask ${sourceId}` : "Seek attributable context";
  return `${source}: what would clarify ${lowercaseFirst(gap)}?`;
}

function lowercaseFirst(value: string): string {
  if (value.length === 0) return value;
  return value[0].toLowerCase() + value.slice(1).replace(/\?$/, "");
}

function factValue(facts: RelationalFact[], attribute: string): string | undefined {
  return facts.find((fact) => fact.attribute === attribute)?.value;
}

function readableAttribute(attribute: string): string {
  return attribute.replace(/-/g, " ");
}

function humanList(values: string[]): string {
  if (values.length < 2) return values[0] ?? "fields";
  return `${values.slice(0, -1).join(", ")} and ${values.at(-1)}`;
}