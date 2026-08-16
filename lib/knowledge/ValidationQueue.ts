import type {
    CandidateLearning,
    CandidateLearningStatus,
} from "./CandidateLearning";

/**
 * @deprecated
 *
 * ValidationQueue is deprecated as an active learning pathway.
 * See CandidateLearning.ts for full deprecation notice.
 */
export class ValidationQueue {
  private readonly candidates = new Map<string, CandidateLearning>();

  constructor(initialCandidates: CandidateLearning[] = []) {
    for (const candidate of initialCandidates) {
      this.add(candidate);
    }
  }

  add(candidate: CandidateLearning): void {
    if (this.candidates.has(candidate.id)) {
      throw new Error(
        `Candidate learning already exists: ${candidate.id}`,
      );
    }

    this.candidates.set(candidate.id, candidate);
  }

  getById(id: string): CandidateLearning | undefined {
    return this.candidates.get(id);
  }

  getAll(): CandidateLearning[] {
    return [...this.candidates.values()];
  }

  getByStatus(
    status: CandidateLearningStatus,
  ): CandidateLearning[] {
    return this.getAll().filter(
      (candidate) => candidate.status === status,
    );
  }

  validate(
    id: string,
    reviewedBy: string,
    reason: string,
  ): CandidateLearning {
    return this.review(id, "validated", reviewedBy, reason);
  }

  reject(
    id: string,
    reviewedBy: string,
    reason: string,
  ): CandidateLearning {
    return this.review(id, "rejected", reviewedBy, reason);
  }

  private review(
    id: string,
    status: Exclude<CandidateLearningStatus, "pending">,
    reviewedBy: string,
    reason: string,
  ): CandidateLearning {
    const candidate = this.getById(id);

    if (!candidate) {
      throw new Error(`Candidate learning not found: ${id}`);
    }

    const reviewedCandidate: CandidateLearning = {
      ...candidate,
      status,
      reviewedAt: new Date().toISOString(),
      reviewedBy,
      reviewReason: reason,
    };

    this.candidates.set(id, reviewedCandidate);

    return reviewedCandidate;
  }

  get size(): number {
    return this.candidates.size;
  }
}