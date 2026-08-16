import type { Judgement } from "../../judgement/Judgement";
import type {
    JudgementResult,
    SituationIntensity,
} from "../../os/context";

export interface ConversationContext {
  personName?: string;
  role?: string;
  age?: number;
  relationship?: "new" | "familiar" | "trusted";
  situationIntensity?: SituationIntensity;
}

export interface SpokenResponse {
  shouldSpeak: boolean;
  message?: string;
  reason: string;
}

const addPersonName = (
  message: string,
  personName?: string,
): string => {
  if (!personName) {
    return message;
  }

  return `${personName}, ${message.charAt(0).toLowerCase()}${message.slice(1)}`;
};

const softenQuestion = (
  question: string,
  context: ConversationContext,
): string => {
  const relationship = context.relationship ?? "new";

  if (relationship === "trusted") {
    return question;
  }

  if (relationship === "familiar") {
    return `When you've got a moment, ${question.charAt(0).toLowerCase()}${question.slice(1)}`;
  }

  return `Would you mind if I ask something? ${question}`;
};

/**
 * @deprecated Pre-governed prototype — wired to lib/os/context, not the governed JudgementEngine.
 * Use judgementToConversationInstruction() with the governed Judgement type instead.
 */
export const speakJudgement = (
  judgement: JudgementResult,
  context: ConversationContext = {},
): SpokenResponse => {
  switch (judgement.decision) {
    case "nothing-to-ask":
      return {
        shouldSpeak: false,
        reason: judgement.reason,
      };

    case "defer":
      return {
        shouldSpeak: false,
        reason: judgement.reason,
      };

    case "interrupt": {
      const question =
        judgement.prompt?.prompt ??
        "I need to check something important with you now.";

      return {
        shouldSpeak: true,
        message: addPersonName(question, context.personName),
        reason: judgement.reason,
      };
    }

    case "ask-now": {
      if (!judgement.prompt) {
        return {
          shouldSpeak: false,
          reason: "Judgement allowed a question, but no prompt was supplied.",
        };
      }

      const message = softenQuestion(
        judgement.prompt.prompt,
        context,
      );

      return {
        shouldSpeak: true,
        message: addPersonName(message, context.personName),
        reason: judgement.reason,
      };
    }
  }
};

/**
 * Converts a governed Judgement into an instruction string for ActionEngine.
 * Response kind is already selected by JudgementEngine — this constructs what to say.
 * Does not generate text autonomously; derives instruction from Understanding.summary.
 */
export function judgementToConversationInstruction(
  judgement: Judgement,
  context: ConversationContext = {},
): string {
  const summary = judgement.understanding.summary;
  const kind = judgement.selected.kind;

  switch (kind) {
    case "ask":
      return softenQuestion(
        `I'd like to understand this a little better. ${summary} Can you tell me more?`,
        context,
      );

    case "speak":
    case "advise":
      return addPersonName(
        `Based on what I'm seeing, ${summary.charAt(0).toLowerCase()}${summary.slice(1)}`,
        context.personName,
      );

    case "act":
      return addPersonName(
        "I can support this next step, but I need the right authority before taking action.",
        context.personName,
      );

    case "listen":
      return addPersonName(
        "I'm listening — please tell me more when you're ready.",
        context.personName,
      );

    case "escalate":
      return addPersonName(
        "This needs someone with the right authority to decide. I'll make sure the right person is aware.",
        context.personName,
      );

    case "seek-consent":
      return addPersonName(
        "Before I go further, I want to make sure you're comfortable with me looking into this.",
        context.personName,
      );

    case "admit-uncertainty":
      return addPersonName(
        "I want to be honest — I don't have enough context to be confident here. I'd rather ask than assume.",
        context.personName,
      );

    case "wait":
      return "";

    case "remain-silent":
      return "";
  }
}