/**
 * KnowledgeGraph Write Guard — Milestone 029
 *
 * The constitutional boundary for the learning loop.
 * Enforces the eight invariants from the Learning Governance Constitution.
 *
 * The guard does not think. It enforces.
 * The intelligence stays in: DC interpretation, Reflection, Learning, Governance.
 * The guard protects the result.
 *
 * The guard does not know: which DC originated the learning, LearningEngine internals,
 * ReflectionEngine internals. It receives ApprovedKnowledgeChange-derived input only.
 */

import type {
    ConceptEvidenceLevel,
    ConceptInheritance,
    ConceptScope,
    ConceptStatus,
} from "../knowledge/Concept";
import type { KnowledgeChangeIntent } from "./KnowledgeGovernance";

export type GuardAction = "permit" | "reject" | "deprecate";

export interface GuardResult {
  permitted: boolean;
  action: GuardAction;
  reason?: string;
  /** Which of the eight governance invariants was violated, if any. */
  invariant?: number;
}

/**
 * Minimum input required for the guard to evaluate a change.
 * Derived from ApprovedKnowledgeChange — the guard does not reach upstream.
 */
export interface GuardInput {
  // The change being proposed
  changeId: string;
  changeIntent: KnowledgeChangeIntent;
  sourceLearningId: string;
  sourceReflectionId: string;
  sourceExecutionId: string;
  reviewedBy?: string;
  reviewedAt?: string;
  confidence: number;

  // Current concept state — retrieved from KnowledgeGraph before guard runs
  targetConcept?: {
    id: string;
    status: ConceptStatus;
    evidenceLevel: ConceptEvidenceLevel;
    scope: ConceptScope;
    owner: string;
    inheritsTo: ConceptInheritance[];
  };

  // Proposed new state — for addConcept and updateConcept
  proposedConcept?: {
    status: ConceptStatus;
    evidenceLevel: ConceptEvidenceLevel;
    scope: ConceptScope;
    inheritsTo: ConceptInheritance[];
  };

  // Pollination origin — three fields require explicit human sign-off
  originatesFromPollination: boolean;
  privacyChecked?: boolean;
  safetyChecked?: boolean;
  contextValidated?: boolean;
}

// Cross-venue inheritance values — anything in this set means the concept
// inherits beyond a single venue and requires multi-source evidence minimum.
const CROSS_VENUE_INHERITANCE = new Set<string>([
  "all",
  "helping-hand",
  "hospitality",
  "healthcare",
  "construction",
]);

function hasCrossVenueInheritance(inheritsTo: ConceptInheritance[]): boolean {
  return inheritsTo.some((target) => CROSS_VENUE_INHERITANCE.has(target));
}

function isSingleSourceEvidence(level: ConceptEvidenceLevel): boolean {
  return level === "candidate" || level === "single-source";
}

/**
 * Evaluate a proposed knowledge change against the eight governance invariants.
 * Returns a GuardResult that the mutation layer must respect.
 *
 * Invariant 1: Constitutional concepts are immutable.
 * Invariant 2: Professional changes require named external authority.
 * Invariant 3: Provenance chain must be unbroken.
 * Invariant 4: Retirement is deprecation, never deletion.
 * Invariant 5: Evidence ceiling — learning loop cannot elevate to constitutional.
 * Invariant 6: Single-source evidence cannot become inherited knowledge.
 * Invariant 7: Pollination sign-offs require explicit human confirmation.
 * Invariant 8: Supersede (rollback) requires named authority.
 */
export function evaluateGuard(input: GuardInput): GuardResult {
  // Invariant 1 — Constitutional immutability (checked first; no override possible)
  if (
    input.targetConcept?.status === "core-principle" &&
    input.targetConcept?.evidenceLevel === "constitutional"
  ) {
    return {
      permitted: false,
      action: "reject",
      reason:
        "Constitutional core-principle concepts are immutable through the learning loop.",
      invariant: 1,
    };
  }

  // Invariant 3 — Provenance chain must be unbroken
  if (
    !input.changeId?.trim() ||
    !input.sourceLearningId?.trim() ||
    !input.sourceReflectionId?.trim() ||
    !input.sourceExecutionId?.trim()
  ) {
    return {
      permitted: false,
      action: "reject",
      reason:
        "Provenance chain is incomplete. All four links (changeId, sourceLearningId, sourceReflectionId, sourceExecutionId) are required.",
      invariant: 3,
    };
  }

  // Invariant 2 — Professional scope requires named external authority
  // Checks both target (update/retire) and proposed (create) concept scope.
  if (
    input.targetConcept?.scope === "professional" ||
    input.proposedConcept?.scope === "professional"
  ) {
    if (!input.reviewedBy?.trim()) {
      return {
        permitted: false,
        action: "reject",
        reason:
          "Changes to professional-scope concepts require a named external authority in reviewedBy.",
        invariant: 2,
      };
    }
  }

  // Invariant 5 — Evidence ceiling: learning loop cannot produce constitutional evidence
  if (input.proposedConcept?.evidenceLevel === "constitutional") {
    return {
      permitted: false,
      action: "reject",
      reason:
        "The learning loop cannot elevate evidenceLevel to constitutional. That requires the constitutional process.",
      invariant: 5,
    };
  }

  // Invariant 6 — Single-source evidence cannot become inherited knowledge
  if (
    input.proposedConcept &&
    hasCrossVenueInheritance(input.proposedConcept.inheritsTo) &&
    isSingleSourceEvidence(input.proposedConcept.evidenceLevel)
  ) {
    return {
      permitted: false,
      action: "reject",
      reason:
        "Knowledge that inherits beyond a single venue requires multi-source evidence minimum. Single-source or candidate evidence is insufficient.",
      invariant: 6,
    };
  }

  // Invariant 7 — Pollination sign-offs require explicit human confirmation
  if (input.originatesFromPollination) {
    if (
      input.privacyChecked !== true ||
      input.safetyChecked !== true ||
      input.contextValidated !== true
    ) {
      return {
        permitted: false,
        action: "reject",
        reason:
          "Changes originating from pollination require explicit human sign-off on privacyChecked, safetyChecked, and contextValidated.",
        invariant: 7,
      };
    }
  }

  // Invariant 8 — Supersede (rollback) requires named authority
  if (input.changeIntent === "supersede" && !input.reviewedBy?.trim()) {
    return {
      permitted: false,
      action: "reject",
      reason:
        "Superseding existing knowledge requires a named authority in reviewedBy.",
      invariant: 8,
    };
  }

  // Invariant 4 — Retirement is deprecation, never deletion
  if (input.changeIntent === "retire") {
    return {
      permitted: true,
      action: "deprecate",
      reason: "Retirement converted to deprecation. The concept is preserved.",
    };
  }

  return { permitted: true, action: "permit" };
}

// ── Convenience constructors ─────────────────────────────────────────────────

/** Permitted guard result. */
export function permitGuard(): GuardResult {
  return { permitted: true, action: "permit" };
}

/** Rejected guard result with a reason. */
export function rejectGuard(reason: string, invariant?: number): GuardResult {
  return { permitted: false, action: "reject", reason, invariant };
}

/** Deprecation guard result (retirement converted). */
export function deprecateGuard(): GuardResult {
  return { permitted: true, action: "deprecate" };
}

