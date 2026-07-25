import type { Concept } from "../knowledge";
import type { Understanding } from "../understanding";

/**
 * The different ways a Digital Colleague may responsibly
 * respond to formed understanding.
 */
export type JudgementResponseKind =
  | "speak"
  | "ask"
  | "listen"
  | "advise"
  | "act"
  | "wait"
  | "escalate"
  | "seek-consent"
  | "admit-uncertainty"
  | "remain-silent";

/**
 * The operational status of a judgement.
 */
export type JudgementDisposition =
  | "proceed"
  | "caution"
  | "human-required"
  | "insufficient";

/**
 * A possible response considered during judgement.
 */
export interface JudgementCandidateResponse {
  /**
   * The form the response would take.
   */
  kind: JudgementResponseKind;

  /**
   * A human-readable description of the response.
   */
  description: string;
}

/**
 * Core judgement produced from formed understanding.
 *
 * Judgement considers the available responses, chooses the most
 * responsible one and records why it was selected.
 */
export interface Judgement {
  /**
   * The formed understanding being judged.
   */
  understanding: Understanding;

  /**
   * Responses considered before reaching the judgement.
   */
  candidates: JudgementCandidateResponse[];

  /**
   * The response selected as most appropriate.
   */
  selected: JudgementCandidateResponse;

  /**
   * Whether the selected response may proceed, requires caution,
   * requires a human or lacks enough understanding.
   */
  disposition: JudgementDisposition;

  /**
   * Human-readable explanation of why the response was selected.
   */
  reason: string;

  /**
   * Confidence in the judgement from 0 to 1.
   */
  confidence: number;

  /**
   * Uncertainty that remains unresolved.
   */
  uncertainty: string[];

  /**
   * Helping Hand principles that governed the judgement.
   */
  governingPrinciples: Concept[];

  /**
   * Whether human involvement is required before progression.
   */
  requiresHuman: boolean;

  /**
   * When the judgement was created.
   */
  createdAt: string;

  /**
   * When the judgement was last updated.
   */
  updatedAt: string;
}