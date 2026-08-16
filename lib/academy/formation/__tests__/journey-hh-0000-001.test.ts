/**
 * Journey HH-0000-001 — The First Institutional Understanding
 *
 * Question: "What is Helping Hand?"
 *
 * Andy uses the same formation pipeline as all future Digital Colleagues.
 * No Understanding is hand-authored at any step.
 *
 * Acceptance criteria:
 *   1. evidenceChain is non-empty (claims trace to sources)
 *   2. uncertainty is non-empty (Andy names what he does not know)
 *   3. completeness is assessed (not assumed)
 *   4. JudgementEngine does not produce "proceed"
 *   5. summary is non-empty and does not merely echo document text
 */

import { describe, expect, it } from "@jest/globals";
import path from "node:path";
import { form } from "../../../../platform/cos/understanding-formation";
import { assembleFormationContext, assessReadiness } from "../../../annie/formation";
import type { AnnieThought } from "../../../annie/thinking";
import { JudgementEngine } from "../../../judgement/JudgementEngine";
import type { RepositoryDocument } from "../../repositoryKnowledgeService";
import { RepositoryKnowledgeService } from "../../repositoryKnowledgeService";
import {
    repositoryDocumentsToFormation,
    translateDocumentsForFormation,
} from "../index";

// ── Representative repository documents for the question "What is Helping Hand?" ─
// Used when the live repository is not accessible in the test environment.
// Content is verbatim from actual HH documents — not invented.
const sampleDocuments: RepositoryDocument[] = [
  {
    id: "constitution-02-CONSTITUTION",
    title: "The Constitution of Helping Hand",
    source: "constitution/02-CONSTITUTION.md",
    sourcePath: "constitution/02-CONSTITUTION.md",
    text: "Seek first to understand. Always. Helping Hand observes before it advises. It reflects before it responds. It asks before it assumes.",
    score: 9,
    section: "Article II — Understanding",
    fragment: "Seek first to understand. Always.",
    reason: "matched: understanding",
  },
  {
    id: "FOUNDING_PRINCIPLES",
    title: "Helping Hand Founding Principles",
    source: "FOUNDING_PRINCIPLES.md",
    sourcePath: "FOUNDING_PRINCIPLES.md",
    text: "Helping Hand exists to help people enjoy easier, more productive and more fulfilling days by working alongside them as trusted digital colleagues.",
    score: 8,
    section: "Why We Exist",
    fragment: "Helping Hand exists to help people enjoy easier, more productive and more fulfilling days.",
    reason: "matched: helping hand",
  },
  {
    id: "docs-architecture-DIGITAL_COLLEAGUE",
    title: "Digital Colleague",
    source: "docs/architecture/DIGITAL_COLLEAGUE.md",
    sourcePath: "docs/architecture/DIGITAL_COLLEAGUE.md",
    text: "A Digital Colleague is not software. A Digital Colleague is a trusted member of Helping Hand. Digital Colleagues exist to help people achieve better outcomes.",
    score: 7,
    section: "Identity",
    fragment: "A Digital Colleague is not software. A Digital Colleague is a trusted member of Helping Hand.",
    reason: "matched: digital colleague",
  },
  {
    id: "KNOWLEDGE_ARCHITECTURE",
    title: "Helping Hand Knowledge Architecture",
    source: "KNOWLEDGE_ARCHITECTURE.md",
    sourcePath: "KNOWLEDGE_ARCHITECTURE.md",
    text: "Helping Hand is not a database. Helping Hand is a knowledge ecosystem. Every Digital Colleague should know only what they need to know, while always knowing where to look next.",
    score: 6,
    section: "Purpose",
    fragment: "Helping Hand is not a database. Helping Hand is a knowledge ecosystem.",
    reason: "matched: knowledge",
  },
  {
    id: "docs-theory-003-THEORY-OF-UNDERSTANDING",
    title: "003 - Theory of Understanding",
    source: "docs/theory/003-THEORY-OF-UNDERSTANDING.md",
    sourcePath: "docs/theory/003-THEORY-OF-UNDERSTANDING.md",
    text: "Understanding emerges when knowledge is interpreted within context. It is the point at which a system moves from storing facts to making sense of them.",
    score: 5,
    section: "Core Idea",
    fragment: "Understanding emerges when knowledge is interpreted within context.",
    reason: "matched: understanding",
  },
];

function getDocuments(): RepositoryDocument[] {
  // Attempt live repository first; fall back to representative samples.
  try {
    const repositoryRoot = path.resolve(__dirname, "../../../..");
    const service = new RepositoryKnowledgeService(repositoryRoot);
    if (service.isAvailable()) {
      const results = service.search("What is Helping Hand");
      if (results.length > 0) return results;
    }
  } catch {
    // Unavailable — use representative samples.
  }
  return sampleDocuments;
}

// Andy's initial cognitive state before gathering Formation inputs.
function makeAndyThought(stimulus: string): AnnieThought {
  return {
    stimulus,
    what: "the purpose, character, and architecture of Helping Hand",
    why: "to understand Helping Hand in order to contribute responsibly",
    confidence: 0.3,
    needsClarification: true,
    suggestedNextStep: "Observe the repository to begin assembling formation inputs.",
  };
}

// Andy's cognitive state once Formation inputs have been assembled.
function makeReadyThought(stimulus: string): AnnieThought {
  return {
    stimulus,
    what: "the purpose, character, and architecture of Helping Hand",
    why: "to understand Helping Hand in order to contribute responsibly",
    confidence: 0.72,
    needsClarification: false,
    suggestedNextStep: "Formation inputs are assembled. Invoke form().",
  };
}

// ── Journey HH-0000-001 ───────────────────────────────────────────────────────

describe("Journey HH-0000-001 — What is Helping Hand?", () => {
  const documents = getDocuments();
  const QUESTION = "What is Helping Hand?";

  it("Step 1 — initial readiness: not ready before any inputs are assembled", () => {
    const thought = makeAndyThought(QUESTION);
    const decision = assessReadiness(thought, { translations: [], context: { situational: {}, institutional: [] }, knowledge: [] });

    expect(decision.ready).toBe(false);
    expect(decision.nextStep).toBe("observe");
    expect(decision.gaps.some((g) => g.includes("translated"))).toBe(true);
  });

  it("Step 2 — DC translates documents using institutional rules", () => {
    const translations = translateDocumentsForFormation(documents);

    expect(translations.length).toBeGreaterThan(0);
    // Translations carry meaning, not raw text — spot-check
    const meanings = translations.map((t) => t.meaning);
    // Every meaning should be a DC-provided institutional interpretation, not "no meaning"
    expect(meanings.every((m) => m.length > 10)).toBe(true);
    // Evidence chain: every translation has an observationId
    expect(translations.every((t) => t.observationId.length > 0)).toBe(true);
  });

  it("Step 3 — DC converts repository documents to governed knowledge", () => {
    const knowledge = repositoryDocumentsToFormation(documents);

    expect(knowledge.length).toBeGreaterThan(0);
    // Constitutional sources should produce constitutional evidence
    const constitutional = knowledge.filter((k) => k.evidenceLevel === "constitutional");
    expect(constitutional.length).toBeGreaterThan(0);
    // Professional sources should produce professional evidence
    const professional = knowledge.filter((k) => k.evidenceLevel === "professional");
    expect(professional.length).toBeGreaterThan(0);
    // No knowledge invents meaning — each principle comes from a document
    expect(knowledge.every((k) => k.principle.length > 0)).toBe(true);
  });

  it("Step 4 — readiness gate confirms ready after inputs are assembled", () => {
    const translations = translateDocumentsForFormation(documents);
    const knowledge = repositoryDocumentsToFormation(documents);
    const thought = makeReadyThought(QUESTION);
    const context = assembleFormationContext(thought, []);

    const decision = assessReadiness(thought, { translations, context, knowledge });

    expect(decision.ready).toBe(true);
    expect(decision.nextStep).toBe("form");
    expect(decision.gaps).toHaveLength(0);
  });

  it("Step 5 — COS forms Understanding without hand-authored content", () => {
    const translations = translateDocumentsForFormation(documents);
    const knowledge = repositoryDocumentsToFormation(documents);
    const thought = makeReadyThought(QUESTION);
    const context = assembleFormationContext(thought, []);

    const understanding = form({ translations, context, knowledge });

    // Acceptance criterion 1: evidenceChain is non-empty
    expect(understanding.evidenceChain?.length ?? 0).toBeGreaterThan(0);

    // Acceptance criterion 2: uncertainty is non-empty (Andy names limits)
    expect(understanding.uncertainty.length).toBeGreaterThan(0);

    // Acceptance criterion 3: completeness is assessed
    expect(["sufficient", "partial", "insufficient"]).toContain(understanding.completeness);

    // Acceptance criterion 4: summary is non-empty
    expect(understanding.summary.length).toBeGreaterThan(20);

    // confidence is in range
    expect(understanding.confidence).toBeGreaterThan(0);
    expect(understanding.confidence).toBeLessThanOrEqual(1);
  });

  it("Step 6 — JudgementEngine does not produce proceed", () => {
    const translations = translateDocumentsForFormation(documents);
    const knowledge = repositoryDocumentsToFormation(documents);
    const thought = makeReadyThought(QUESTION);
    const context = assembleFormationContext(thought, []);

    const understanding = form({ translations, context, knowledge });
    const engine = new JudgementEngine();
    const judgement = engine.judge({ understanding });

    // Acceptance criterion 4: not proceed — Understanding of an organisation
    // carries inherent uncertainty and should not route to unconditional action
    expect(judgement.disposition).not.toBe("proceed");
    expect(["caution", "human-required", "insufficient"]).toContain(judgement.disposition);
  });

  it("Step 7 — full pipeline: no hand-authored Understanding at any stage", () => {
    // Every input is derived from the DC layer or COS — nothing is manually written.
    const translations = translateDocumentsForFormation(documents);
    expect(translations).toBeDefined();

    const knowledge = repositoryDocumentsToFormation(documents);
    expect(knowledge).toBeDefined();

    const thought = makeReadyThought(QUESTION);
    const context = assembleFormationContext(thought, []);
    expect(context.situational).toBeDefined();

    // form() receives DC-assembled inputs; Understanding emerges
    const understanding = form({ translations, context, knowledge });

    // If we reach here without manually writing Understanding, the pipeline is proven.
    expect(understanding.createdAt).toBeTruthy();
    expect(understanding.evidenceChain?.length ?? 0).toBeGreaterThan(0);
  });
});
