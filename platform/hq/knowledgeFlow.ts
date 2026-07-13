import type {
  CandidateUnderstanding,
  KnowledgeLevel,
  KnowledgeRoute,
} from "./types";

function routeForCandidate(
  candidate: CandidateUnderstanding
): KnowledgeLevel[] {
  switch (candidate.kind) {
    case "local":
      return ["digital-colleague"];

    case "organisational":
      return candidate.origin.organisationId
        ? ["digital-colleague", "organisation-hq"]
        : ["digital-colleague"];

    case "professional":
      return candidate.origin.organisationId
        ? ["digital-colleague", "organisation-hq", "profession-hq"]
        : ["digital-colleague", "profession-hq"];

    case "cross-profession":
      return candidate.origin.organisationId
        ? [
            "digital-colleague",
            "organisation-hq",
            "profession-hq",
            "helping-hand-hq",
          ]
        : [
            "digital-colleague",
            "profession-hq",
            "helping-hand-hq",
          ];
  }
}

export function determineKnowledgeRoute(
  candidate: CandidateUnderstanding
): KnowledgeRoute {
  const route = routeForCandidate(candidate);
  const destination = route[route.length - 1];

  if (candidate.containsSensitiveLocalContext && route.length > 1) {
    return {
      candidateId: candidate.id,
      route: ["digital-colleague"],
      destination: "digital-colleague",
      allowed: false,
      reason:
        "Sensitive local context must be removed or explicitly governed before understanding can travel upward.",
    };
  }

  return {
    candidateId: candidate.id,
    route,
    destination,
    allowed: true,
    reason: `Understanding belongs at the ${destination} level.`,
  };
}