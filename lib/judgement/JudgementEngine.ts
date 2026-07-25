import {
    corePrinciples,
    type Concept,
} from "../knowledge";
import type { Understanding } from "../understanding";
import type {
    Judgement,
    JudgementCandidateResponse,
    JudgementDisposition,
    JudgementResponseKind,
} from "./Judgement";

export interface BuildJudgementInput {
  understanding: Understanding;
  candidates?: JudgementCandidateResponse[];
  governingPrinciples?: Concept[];
}

const DEFAULT_CANDIDATES: JudgementCandidateResponse[] = [
  {
    kind: "ask",
    description:
      "Ask a clarifying question before progressing.",
  },
  {
    kind: "advise",
    description:
      "Offer proportionate guidance based on current understanding.",
  },
  {
    kind: "act",
    description: "Take an authorised action.",
  },
  {
    kind: "wait",
    description:
      "Wait until more information or readiness is available.",
  },
  {
    kind: "escalate",
    description:
      "Escalate to an appropriate human decision-maker.",
  },
  {
    kind: "admit-uncertainty",
    description:
      "State uncertainty clearly and avoid over-claiming.",
  },
  {
    kind: "remain-silent",
    description:
      "Choose silence where speaking would not improve the outcome.",
  },
];

const HIGH_RISK_TERMS = [
  "safety",
  "legal",
  "regulatory",
  "authority",
  "consent",
  "safeguard",
  "risk",
  "emergency",
  "harm",
];

const RESPONSE_PRIORITY: Record<
  JudgementDisposition,
  JudgementResponseKind[]
> = {
  proceed: [
    "advise",
    "speak",
    "listen",
    "ask",
    "seek-consent",
    "wait",
    "admit-uncertainty",
    "remain-silent",
    "escalate",
    "act",
  ],
  caution: [
    "ask",
    "seek-consent",
    "admit-uncertainty",
    "wait",
    "listen",
    "speak",
    "advise",
    "act",
    "remain-silent",
    "escalate",
  ],
  "human-required": [
    "escalate",
    "seek-consent",
    "ask",
    "admit-uncertainty",
    "wait",
    "remain-silent",
    "listen",
    "speak",
    "advise",
    "act",
  ],
  insufficient: [
    "ask",
    "admit-uncertainty",
    "wait",
    "remain-silent",
    "seek-consent",
    "escalate",
    "listen",
    "speak",
    "advise",
    "act",
  ],
};

export class JudgementEngine {
  constructor(
    private readonly principles: Concept[] = corePrinciples,
  ) {}

  judge(input: BuildJudgementInput): Judgement {
    const { understanding } = input;
    const candidates =
      input.candidates && input.candidates.length > 0
        ? input.candidates
        : DEFAULT_CANDIDATES;

    const disposition = this.determineDisposition(
      understanding,
    );

    const selected = this.selectCandidate(
      candidates,
      disposition,
    );

    const reason = this.buildReason(
      disposition,
      selected,
      understanding,
    );

    const confidence = this.scoreJudgementConfidence(
      understanding,
      disposition,
      selected,
    );

    const now = new Date().toISOString();

    return {
      understanding,
      candidates: [...candidates],
      selected,
      disposition,
      reason,
      confidence,
      uncertainty: [...understanding.uncertainty],
      governingPrinciples:
        input.governingPrinciples ??
        this.selectPrinciples(selected.kind, disposition),
      requiresHuman:
        disposition === "human-required" ||
        disposition === "insufficient",
      createdAt: now,
      updatedAt: now,
    };
  }

  private determineDisposition(
    understanding: Understanding,
  ): JudgementDisposition {
    if (understanding.confidence < 0.25) {
      return "insufficient";
    }

    if (this.hasHighRiskUncertainty(understanding)) {
      return "human-required";
    }

    if (
      understanding.confidence < 0.6 ||
      understanding.uncertainty.length > 0
    ) {
      return "caution";
    }

    return "proceed";
  }

  private hasHighRiskUncertainty(
    understanding: Understanding,
  ): boolean {
    return understanding.uncertainty.some((item) => {
      const value = item.toLowerCase();

      return HIGH_RISK_TERMS.some((term) =>
        value.includes(term),
      );
    });
  }

  private selectCandidate(
    candidates: JudgementCandidateResponse[],
    disposition: JudgementDisposition,
  ): JudgementCandidateResponse {
    const priority = RESPONSE_PRIORITY[disposition];

    for (const kind of priority) {
      const candidate = candidates.find(
        (item) => item.kind === kind,
      );

      if (candidate) {
        return candidate;
      }
    }

    return candidates[0];
  }

  private buildReason(
    disposition: JudgementDisposition,
    selected: JudgementCandidateResponse,
    understanding: Understanding,
  ): string {
    if (disposition === "insufficient") {
      return (
        "Understanding confidence is too low to progress safely; " +
        `selected \"${selected.kind}\" as the most responsible next step.`
      );
    }

    if (disposition === "human-required") {
      return (
        "High-risk uncertainty requires accountable human involvement; " +
        `selected \"${selected.kind}\".`
      );
    }

    if (disposition === "caution") {
      return (
        "Understanding is partial or uncertain; " +
        `selected \"${selected.kind}\" to reduce risk before commitment.`
      );
    }

    return (
      `Understanding confidence (${understanding.confidence.toFixed(2)}) ` +
      `supports progression; selected \"${selected.kind}\".`
    );
  }

  private scoreJudgementConfidence(
    understanding: Understanding,
    disposition: JudgementDisposition,
    selected: JudgementCandidateResponse,
  ): number {
    const dispositionWeight: Record<
      JudgementDisposition,
      number
    > = {
      proceed: 1,
      caution: 0.9,
      "human-required": 0.8,
      insufficient: 0.7,
    };

    const responseWeight: Record<
      JudgementResponseKind,
      number
    > = {
      ask: 0.98,
      "seek-consent": 0.98,
      "admit-uncertainty": 0.97,
      wait: 0.95,
      escalate: 0.95,
      listen: 0.94,
      "remain-silent": 0.92,
      speak: 0.9,
      advise: 0.9,
      act: 0.88,
    };

    const score =
      understanding.confidence *
      dispositionWeight[disposition] *
      responseWeight[selected.kind];

    return Number(Math.max(0, Math.min(1, score)).toFixed(2));
  }

  private selectPrinciples(
    selectedKind: JudgementResponseKind,
    disposition: JudgementDisposition,
  ): Concept[] {
    const ids = new Set<string>([
      "people-first",
      "understanding",
      "better-outcomes",
    ]);

    if (
      selectedKind === "admit-uncertainty" ||
      selectedKind === "ask"
    ) {
      ids.add("confidence");
    }

    if (
      selectedKind === "speak" ||
      selectedKind === "ask"
    ) {
      ids.add("talk-get");
    }

    if (
      disposition === "human-required" ||
      selectedKind === "escalate"
    ) {
      ids.add("software-is-a-chore");
    }

    return this.principles.filter((concept) =>
      ids.has(concept.id),
    );
  }
}
