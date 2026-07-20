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