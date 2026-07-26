export type AuthorityDisposition =
  | "allow"
  | "allow-with-caution"
  | "require-human"
  | "deny";

export type DecisionDisposition =
  | "proceed"
  | "caution"
  | "human-required"
  | "insufficient";

export type ActionOutcome =
  | "succeeded"
  | "failed"
  | "cancelled"
  | "not-attempted";

export type OperationalMode = "online" | "offline" | "degraded";

export interface ContextEnvelope {
  interactionId: string;
  userId: string;
  role: string;
  requestId: string;
  actorId?: string;
  actorRole?: string;
  siteId: string;
  equipmentId: string;
  equipmentType: string;
  currentShift?: string;
  shiftId?: string;
  mode: OperationalMode;
  timestamp: string;
  requestedAt?: string;
  localTimeIso: string;
  networkAvailable: boolean;
  capabilityId: string;
  peopleOutcome: string;
  currentOperationalState: string;
}

export interface DecisionRecord {
  decisionId: string;
  requestId: string;
  disposition: DecisionDisposition;
  recommendedAction: string;
  rationale: string;
  confidence: number;
  uncertainty: string[];
  requiresHuman: boolean;
  createdAt: string;
}

export interface AuthorityRecord {
  authorityId: string;
  requestId: string;
  disposition: AuthorityDisposition;
  reason: string;
  boundaryConditions: string[];
  escalationRequired: boolean;
  createdAt: string;
}

export interface ActionRecord {
  actionId: string;
  requestId: string;
  attempted: boolean;
  outcome: ActionOutcome;
  summary: string;
  sideEffects: string[];
  createdAt: string;
  completedAt?: string;
}

export interface EvidenceArtifact {
  kind: "image" | "audio" | "transcript" | "note" | "system";
  uri?: string;
  detail: string;
}

export interface EvidencePacket {
  evidenceId: string;
  requestId: string;
  context: ContextEnvelope;
  decision: DecisionRecord;
  authority: AuthorityRecord;
  action: ActionRecord;
  artifacts: EvidenceArtifact[];
  provenance: {
    source: "companion-runtime";
    runtimeVersion: string;
  };
  createdAt: string;
}

export interface ReflectionRecord {
  reflectionId: string;
  requestId: string;
  findings: string[];
  recommendations: string[];
  characterCompliant: boolean;
  promotionCandidate: boolean;
  confidence: number;
  createdAt: string;
}

export interface RuntimeTrace {
  context: ContextEnvelope;
  decision: DecisionRecord;
  authority: AuthorityRecord;
  action: ActionRecord;
  evidence: EvidencePacket;
  reflection: ReflectionRecord;
}

export interface CompanionRuntimeRequest {
  requestId: string;
  actorId: string;
  actorRole: string;
  siteId: string;
  shiftId?: string;
  capabilityId: string;
  prompt: string;
  peopleOutcome: string;
  networkAvailable: boolean;
  uncertainty?: string[];
  confidenceHint?: number;
  artifacts?: EvidenceArtifact[];
  contextEnvelope?: ContextEnvelope;
}

export interface CompanionRuntimeResult {
  accepted: boolean;
  trace: RuntimeTrace;
  contractViolations: string[];
  csaConformant: boolean;
}

export interface CompanionActionExecutionResult {
  attempted: boolean;
  outcome: ActionOutcome;
  summary: string;
  sideEffects?: string[];
  artifacts?: EvidenceArtifact[];
}

export type TraceReviewOutcome =
  | "reviewed"
  | "needs-investigation"
  | "expected-safeguard"
  | "candidate-reflection"
  | "candidate-capability-promotion";

export interface TraceReviewRecord {
  outcome: TraceReviewOutcome;
  reviewedAt: string;
}
