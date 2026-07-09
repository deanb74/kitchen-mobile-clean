import type { CompanionIntentResult } from "./intent";

export interface CompanionCommunication {
  message: string;
  tone: "calm" | "helpful" | "reassuring" | "curious" | "thoughtful";
}

/**
 * Communication
 *
 * Communication is not the transfer of information.
 *
 * Communication is the transfer of understanding.
 */
export function communicateIntent(
  intent: CompanionIntentResult
): CompanionCommunication {
  switch (intent.intent) {
    case "wait":
      return {
        tone: "calm",
        message: "I'm here when you need me.",
      };

    case "clarify":
      return {
        tone: "curious",
        message: "Can I ask one quick question so I can understand properly?",
      };

    case "research":
      return {
        tone: "reassuring",
        message: "I don't know yet, however I'll find out.",
      };

    case "reflect":
      return {
        tone: "thoughtful",
        message: "I think I understand. Let me think this through before I answer.",
      };

    case "help":
      return {
        tone: "helpful",
        message: "I understand enough to help.",
      };

    default:
      return {
        tone: "calm",
        message: "I’m here with you.",
      };
  }
}