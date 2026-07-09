/**
 * Helping Hand Knowledge
 *
 * Knowledge moves through stages.
 *
 * Digital Colleagues do not simply store data.
 * They observe, understand, reflect and help
 * turn experience into transferable wisdom.
 */

export type KnowledgeStage =
  | "observation"
  | "information"
  | "understanding"
  | "experience"
  | "principle"
  | "transferable-wisdom";

export interface KnowledgeItem {
  id: string;
  stage: KnowledgeStage;
  title: string;
  summary: string;
  source: string;
  confidence: number;
  createdAt: string;
}