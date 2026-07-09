import type { CompanionDecision } from "../../../platform/core";
import type { CompanionRootDecision, CompanionUnderstanding } from "../../../platform/core/companion";
import type { WisdomDecision } from "../wisdom";

export function speakPlatformDecision(
  decision: CompanionDecision
): string {
  switch (decision.action) {
    case "reflect":
      return "I’d like to make sure I’ve understood this properly before I answer.";

    case "ask":
      return "Can I ask one quick question so I can help properly?";

    case "observe":
      return "I’m just going to look first, so I don’t guess.";

    case "wait":
      return "I’ll wait until there’s something useful for me to do.";

    case "answer":
      return "I think I can help with that.";

    case "remember":
      return "I’ll remember that.";

    case "escalate":
      return "I’d like to check this properly before I come back to you.";
  }
}

export function speakWisdomDecision(
  decision: WisdomDecision
): string {
  switch (decision.source) {
    case "memory":
      return "I’ve learnt this before, and I’m confident I’ve understood it.";

    case "observation":
      return "I’m just going to look first, so I don’t guess.";

    case "conversation":
      return "Can I ask one quick question so I can check I’ve got this right?";

    case "annie-hq":
      return "I’d like to check whether this has already been learnt before I answer.";

    default:
      return "I’d like to check the facts before I answer.";
  }
}

export function speakCompanionUnderstanding(
  understanding: CompanionUnderstanding
): string {
  switch (understanding.nextStep) {
    case "wait":
      return "I'm here when you need me.";

    case "remember":
      return "I've seen this before. Let me start with what I already know.";

    case "observe":
      return "I'm just going to look first, so I don't guess.";

    case "ask":
      return "Can I ask one quick question so I can understand properly?";

    case "research":
      return "I don't know yet, but I'll find out.";

    case "reflect":
      return "I think I understand. Let me think this through before I answer.";
  }
}

export function speakCompanionDecision(
  decision: CompanionRootDecision
): string {
  switch (decision.action) {
    case "wait":
      return "I'm here when you need me.";

    case "ask":
      return "Can I ask one quick question so I can understand properly?";

    case "research":
      return "I don't know yet, but I'll find out.";

    case "reflect":
      return "I think I understand. Let me think this through before I answer.";

    case "answer":
      return "I understand enough to help.";
  }
}