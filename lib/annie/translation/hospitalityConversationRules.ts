import type { TranslationRule } from "../../../platform/cos/translation";

/**
 * Annie's Hospitality Conversation Translation Rules
 *
 * COS owns the translation mechanism.
 * Annie supplies hospitality meaning for human speech.
 *
 * Rules match source === "human" observations.
 * Unrecognised speech produces no translation — the DC does not pretend.
 */
export const hospitalityConversationRules: TranslationRule[] = [
  {
    matches: (o) =>
      o.source === "human" &&
      /shift|handover|hand.?over|transition|incoming|outgoing/i.test(o.description),
    translate: (o) => ({
      observationId: o.id,
      meaning:
        "A shift transition concern has been raised. Context continuity between shifts may be affecting operational clarity.",
      confidence: o.confidence,
    }),
  },
  {
    matches: (o) =>
      o.source === "human" &&
      /staff|team|colleague|rota|cover|short.?staff/i.test(o.description),
    translate: (o) => ({
      observationId: o.id,
      meaning:
        "A staffing or team concern has been raised. Resourcing or team dynamics may be affecting service delivery.",
      confidence: o.confidence * 0.9,
    }),
  },
  {
    matches: (o) =>
      o.source === "human" &&
      /equipment|machine|broke|not working|fault|repair/i.test(o.description),
    translate: (o) => ({
      observationId: o.id,
      meaning:
        "An equipment or facility issue has been reported. Operational capability may be reduced.",
      confidence: o.confidence,
    }),
  },
  {
    matches: (o) =>
      o.source === "human" &&
      /stock|supply|order|delivery|run.?out|out.?of/i.test(o.description),
    translate: (o) => ({
      observationId: o.id,
      meaning:
        "A stock or supply concern has been raised. Service continuity may require attention.",
      confidence: o.confidence * 0.9,
    }),
  },
  {
    matches: (o) =>
      o.source === "human" &&
      /busy|rush|pressure|overwhelm|behind|service/i.test(o.description),
    translate: (o) => ({
      observationId: o.id,
      meaning:
        "Service pressure has been reported. Operational demand may be exceeding current capacity.",
      confidence: o.confidence,
    }),
  },
];
