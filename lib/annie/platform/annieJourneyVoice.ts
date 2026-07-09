import type { KnowledgeJourney } from "../../../platform/core";

export function speakKnowledgeJourney(
  journey: KnowledgeJourney
): string {
  switch (journey.current) {
    case "memory":
      return "I’ve learnt this before, so I’ll start with what I already know.";

    case "observation":
      return "I’m just going to look first, so I don’t guess.";

    case "conversation":
      return "Can I ask one quick question so I can check I’ve got this right?";

    case "annie-hq":
      return "I’d like to check whether this has already been learnt before I answer.";

    case "industry-hq":
      return "I’d like to check the wider industry knowledge before I answer.";

    case "helping-hand-hq":
      return "I’d like to check this properly before I come back to you.";

    default:
      return "I’d like to check the facts before I answer.";
  }
}