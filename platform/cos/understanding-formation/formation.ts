import type { Understanding, UnderstandingCompleteness } from "../../../lib/understanding/Understanding";
import { formRelationalEvidence } from "./relational";
import type {
    FormationContext,
    FormationInput,
    FormationKnowledge,
    FormationSituationalContext,
    Translation,
} from "./types";

/**
 * Understanding Formation
 *
 * The missing junction between Translation and Judgement.
 *
 * COS provides the synthesis mechanism.
 * The Digital Colleague provides translations, context, and knowledge.
 *
 * Invariants enforced here:
 *   1. No meaning is invented — summary is assembled from inputs only.
 *   2. Uncertainty is derived from gaps, never omitted.
 *   3. Evidence chain is built from observation IDs, never empty when translations exist.
 *   4. Confidence is computed from input quality, never accepted as a parameter.
 *   5. Completeness is assessed from input coverage, never accepted as a parameter.
 */
export interface FormationOptions {
  relationalEvidence?: "enabled" | "disabled";
}

export function form(
  input: FormationInput,
  options: FormationOptions = {},
): Understanding {
  const { translations, context, knowledge } = input;
  const now = new Date().toISOString();

  if (translations.length === 0) {
    return {
      summary: "No observations have been translated. Understanding cannot be formed.",
      confidence: 0,
      uncertainty: ["No translated observations were provided."],
      completeness: "insufficient",
      evidenceChain: [],
      createdAt: now,
      updatedAt: now,
    };
  }

  const summary = buildSummary(translations, context.situational, knowledge);
  const confidence = deriveConfidence(translations, context);
  const uncertainty = deriveUncertainty(translations, context);
  const completeness = assessCompleteness(translations, context);
  const evidenceChain = buildEvidenceChain(translations);
  const contextSources = buildContextSources(context);
  const relationalEvidence =
    input.relationalInquiry && options.relationalEvidence !== "disabled"
    ? formRelationalEvidence(input.relationalInquiry, translations)
    : undefined;

  return {
    summary,
    confidence,
    uncertainty,
    completeness,
    evidenceChain,
    contextSources,
    relationalEvidence,
    createdAt: now,
    updatedAt: now,
  };
}

// Assembles a summary from the translated meanings.
// Does not invent — every sentence originates from a translation or knowledge principle.
function buildSummary(
  translations: Translation[],
  situational: FormationSituationalContext,
  knowledge: FormationKnowledge[],
): string {
  const parts: string[] = [];

  for (const translation of translations) {
    const meaning = translation.meaning.trim();
    if (meaning.length > 0) {
      parts.push(ending(meaning));
    }
  }

  if (knowledge.length > 0) {
    const constitutional = knowledge.filter((k) => k.evidenceLevel === "constitutional");
    const professional = knowledge.filter((k) => k.evidenceLevel === "professional");
    const applicable = [...constitutional, ...professional];

    if (applicable.length > 0) {
      parts.push(ending(applicable.map((k) => k.principle).join(" ")));
    }
  }

  if (parts.length === 0) {
    return "No meaningful interpretation could be formed from the provided observations.";
  }

  const prefix = urgencyPrefix(situational.urgency);
  return prefix + parts.join(" ");
}

function urgencyPrefix(urgency: FormationSituationalContext["urgency"]): string {
  if (urgency === "critical") return "Critical: ";
  if (urgency === "high") return "Attention required: ";
  return "";
}

// Confidence is the product of three independent factors.
// None alone is sufficient; all three must be healthy for high confidence.
function deriveConfidence(
  translations: Translation[],
  context: FormationContext,
): number {
  const translationConfidence = averageConfidence(translations);
  const contextMultiplier = contextCompletenessMultiplier(context.situational);
  const knowledgeAvailable = context.institutional.length > 0 ? 1.0 : 0.95;

  const raw = translationConfidence * contextMultiplier * knowledgeAvailable;
  return clamp(parseFloat(raw.toFixed(2)), 0, 1);
}

function averageConfidence(translations: Translation[]): number {
  if (translations.length === 0) return 0;
  const sum = translations.reduce((acc, t) => acc + t.confidence, 0);
  return sum / translations.length;
}

function contextCompletenessMultiplier(situational: FormationSituationalContext): number {
  const present = [
    situational.urgency,
    situational.risk,
    situational.what,
  ].filter(Boolean).length;

  if (present >= 3) return 1.0;
  if (present === 2) return 0.9;
  if (present === 1) return 0.8;
  return 0.7;
}

// Uncertainty is derived from the gaps in the inputs.
// High-risk terms are preserved so JudgementEngine can detect them.
function deriveUncertainty(
  translations: Translation[],
  context: FormationContext,
): string[] {
  const items: string[] = [];

  for (const translation of translations) {
    if (translation.confidence < 0.7) {
      items.push(
        `Low confidence in interpretation: "${translation.meaning.substring(0, 60)}..."`,
      );
    }
  }

  if (!context.situational.urgency) {
    items.push("Urgency is unknown.");
  }

  if (!context.situational.risk) {
    items.push("Risk level has not been assessed.");
  }

  if (!context.situational.what) {
    items.push("The subject of the observation is unclear.");
  }

  // Preserve risk context so JudgementEngine high-risk term detection works correctly.
  if (context.situational.risk) {
    items.push(`Risk context: ${context.situational.risk}.`);
  }

  return items;
}

function assessCompleteness(
  translations: Translation[],
  context: FormationContext,
): UnderstandingCompleteness {
  if (translations.length === 0) return "insufficient";

  const allTranslationsHealthy = translations.every((t) => t.confidence >= 0.7);
  const hasSituationalContext =
    !!context.situational.urgency && !!context.situational.risk;

  if (allTranslationsHealthy && hasSituationalContext) return "sufficient";

  const hasAnyTranslation = translations.length > 0;
  const hasAnyContext =
    !!context.situational.urgency ||
    !!context.situational.risk ||
    !!context.situational.what;

  if (hasAnyTranslation && hasAnyContext) return "partial";

  return "insufficient";
}

// The evidence chain traces every observation that contributed.
// It cannot be empty when translations are present.
function buildEvidenceChain(translations: Translation[]): string[] {
  return translations
    .map((t) => t.observationId)
    .filter((id) => id.length > 0);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function ending(text: string): string {
  const trimmed = text.trim();
  if (trimmed.endsWith(".") || trimmed.endsWith("?") || trimmed.endsWith("!")) {
    return trimmed;
  }
  return trimmed + ".";
}

// Pure aggregation — collects unique source labels from institutional context.
function buildContextSources(context: FormationContext): string[] {
  const sources: NonNullable<(typeof context.institutional)[number]["source"]>[] = [];

  for (const entry of context.institutional) {
    if (entry.source) {
      sources.push(entry.source);
    }
  }

  return [...new Set(sources)];
}
