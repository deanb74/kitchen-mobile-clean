import type { Concept } from "./Concept";

export type ValidationSeverity = "error" | "warning";

export interface KnowledgeValidationIssue {
  severity: ValidationSeverity;
  code: string;
  message: string;
  conceptId?: string;
}

export interface EvidenceLevelCount {
  candidate: number;
  "single-source": number;
  "multi-source": number;
  constitutional: number;
}

export interface KnowledgeHealthReport {
  valid: boolean;

  totalConcepts: number;
  evidenceLevels: EvidenceLevelCount;

  errors: KnowledgeValidationIssue[];
  warnings: KnowledgeValidationIssue[];
}

function normalise(value: string): string {
  return value.trim().toLowerCase();
}

function hasText(value: string | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export class KnowledgeValidator {
  validateConcept(concept: Concept): KnowledgeValidationIssue[] {
    const issues: KnowledgeValidationIssue[] = [];

    if (!hasText(concept.id)) {
      issues.push({
        severity: "error",
        code: "MISSING_ID",
        message: "Concept is missing an id.",
      });
    }

    if (!hasText(concept.name)) {
      issues.push({
        severity: "error",
        code: "MISSING_NAME",
        conceptId: concept.id,
        message: "Concept is missing a name.",
      });
    }

    if (!hasText(concept.definition)) {
      issues.push({
        severity: "error",
        code: "MISSING_DEFINITION",
        conceptId: concept.id,
        message: `Concept "${concept.id}" is missing a definition.`,
      });
    }

    if (!concept.aliases || concept.aliases.length === 0) {
      issues.push({
        severity: "warning",
        code: "MISSING_ALIASES",
        conceptId: concept.id,
        message: `Concept "${concept.id}" has no aliases.`,
      });
    }

    if (!hasText(concept.owner)) {
      issues.push({
        severity: "error",
        code: "MISSING_OWNER",
        conceptId: concept.id,
        message: `Concept "${concept.id}" has no owner.`,
      });
    }

    if (!concept.inheritsTo || concept.inheritsTo.length === 0) {
      issues.push({
        severity: "error",
        code: "MISSING_INHERITANCE",
        conceptId: concept.id,
        message: `Concept "${concept.id}" is not inherited by anyone.`,
      });
    }

    if (!concept.sources || concept.sources.length === 0) {
      const severity: ValidationSeverity =
        concept.evidenceLevel === "candidate" ? "warning" : "error";

      issues.push({
        severity,
        code: "MISSING_SOURCES",
        conceptId: concept.id,
        message:
          concept.evidenceLevel === "candidate"
            ? `Candidate concept "${concept.id}" has no documentary evidence yet.`
            : `Concept "${concept.id}" has no documentary evidence.`,
      });
    }

    if (
      concept.evidenceLevel === "single-source" &&
      concept.sources.length !== 1
    ) {
      issues.push({
        severity: "warning",
        code: "EVIDENCE_LEVEL_MISMATCH",
        conceptId: concept.id,
        message:
          `Concept "${concept.id}" is marked single-source but has ` +
          `${concept.sources.length} sources.`,
      });
    }

    if (
      concept.evidenceLevel === "multi-source" &&
      concept.sources.length < 2
    ) {
      issues.push({
        severity: "error",
        code: "INSUFFICIENT_MULTI_SOURCE_EVIDENCE",
        conceptId: concept.id,
        message:
          `Concept "${concept.id}" is marked multi-source but has fewer ` +
          "than two sources.",
      });
    }

    if (
      concept.evidenceLevel === "constitutional" &&
      concept.sources.length === 0
    ) {
      issues.push({
        severity: "error",
        code: "CONSTITUTIONAL_CONCEPT_WITHOUT_EVIDENCE",
        conceptId: concept.id,
        message:
          `Constitutional concept "${concept.id}" must have documentary evidence.`,
      });
    }

    if (
      !concept.relatedConceptIds ||
      concept.relatedConceptIds.length === 0
    ) {
      issues.push({
        severity: "warning",
        code: "ISOLATED_CONCEPT",
        conceptId: concept.id,
        message: `Concept "${concept.id}" has no relationships.`,
      });
    }

    return issues;
  }

  validateRepository(concepts: Concept[]): KnowledgeHealthReport {
    const issues: KnowledgeValidationIssue[] = [];

    issues.push(...this.findDuplicateIds(concepts));
    issues.push(...this.findDuplicateAliases(concepts));
    issues.push(...this.findBrokenRelationships(concepts));

    for (const concept of concepts) {
      issues.push(...this.validateConcept(concept));
    }

    const errors = issues.filter((issue) => issue.severity === "error");
    const warnings = issues.filter((issue) => issue.severity === "warning");

    return {
      valid: errors.length === 0,

      totalConcepts: concepts.length,

      evidenceLevels: {
        candidate: concepts.filter(
          (concept) => concept.evidenceLevel === "candidate",
        ).length,

        "single-source": concepts.filter(
          (concept) => concept.evidenceLevel === "single-source",
        ).length,

        "multi-source": concepts.filter(
          (concept) => concept.evidenceLevel === "multi-source",
        ).length,

        constitutional: concepts.filter(
          (concept) => concept.evidenceLevel === "constitutional",
        ).length,
      },

      errors,
      warnings,
    };
  }

  findBrokenRelationships(
    concepts: Concept[],
  ): KnowledgeValidationIssue[] {
    const knownIds = new Set(concepts.map((concept) => concept.id));
    const issues: KnowledgeValidationIssue[] = [];

    for (const concept of concepts) {
      for (const relatedId of concept.relatedConceptIds) {
        if (!knownIds.has(relatedId)) {
          issues.push({
            severity: "error",
            code: "BROKEN_RELATIONSHIP",
            conceptId: concept.id,
            message:
              `Concept "${concept.id}" refers to unknown concept ` +
              `"${relatedId}".`,
          });
        }
      }
    }

    return issues;
  }

  findDuplicateIds(concepts: Concept[]): KnowledgeValidationIssue[] {
    const seen = new Set<string>();
    const duplicateIds = new Set<string>();

    for (const concept of concepts) {
      const id = normalise(concept.id);

      if (seen.has(id)) {
        duplicateIds.add(concept.id);
      }

      seen.add(id);
    }

    return Array.from(duplicateIds).map((conceptId) => ({
      severity: "error",
      code: "DUPLICATE_CONCEPT_ID",
      conceptId,
      message: `Duplicate concept id "${conceptId}".`,
    }));
  }

  findDuplicateAliases(
    concepts: Concept[],
  ): KnowledgeValidationIssue[] {
    const aliasOwners = new Map<string, Set<string>>();

    for (const concept of concepts) {
      const searchableNames = [concept.name, ...concept.aliases];

      for (const value of searchableNames) {
        const alias = normalise(value);

        if (!alias) {
          continue;
        }

        const owners = aliasOwners.get(alias) ?? new Set<string>();
        owners.add(concept.id);
        aliasOwners.set(alias, owners);
      }
    }

    const issues: KnowledgeValidationIssue[] = [];

    for (const [alias, owners] of aliasOwners) {
      if (owners.size > 1) {
        issues.push({
          severity: "warning",
          code: "DUPLICATE_ALIAS",
          message:
            `Alias "${alias}" belongs to multiple concepts: ` +
            `${Array.from(owners).join(", ")}.`,
        });
      }
    }

    return issues;
  }
}