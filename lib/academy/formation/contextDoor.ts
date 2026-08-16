import type { Observation } from "../../../platform/cos/observation";
import type { Translation } from "../../../platform/cos/translation";
import {
    checkAllInvariants,
    form,
    type FormationContext,
    type FormationInput,
} from "../../../platform/cos/understanding-formation";
import type { Action } from "../../action/Action";
import { ActionEngine } from "../../action/ActionEngine";
import type { AuthorityAssessment } from "../../authority/Authority";
import { AuthorityEngine } from "../../authority/AuthorityEngine";
import type { Judgement, JudgementCandidateResponse } from "../../judgement/Judgement";
import { JudgementEngine } from "../../judgement/JudgementEngine";
import type { Understanding } from "../../understanding/Understanding";
import type { RepositoryDocument } from "../repositoryKnowledgeService";
import { repositoryDocumentsToFormation } from "./knowledgeAdapter";
import {
    repositoryDocumentToObservation,
    translateDocumentsForFormation,
} from "./translationAdapter";

export type ContextDoorPhase =
  | "awaiting-human-context"
  | "awaiting-recipient-alignment"
  | "complete"
  | "incomplete";

export type ContextDoorContextCategory =
  | "current-situation"
  | "current-need"
  | "invited-role"
  | "human-ownership"
  | "open-uncertainty";

export type HumanContextStatus =
  | "confirmed-supplied"
  | "human-interpretation"
  | "unresolved";

export type ContextLifecycleStatus =
  | "active"
  | "stale"
  | "reconfirmed"
  | "no-longer-relevant";

export type ContextDoorAlignmentStatus =
  | "aligned"
  | "partly-aligned"
  | "not-yet-aligned";

export interface ContextDoorProvider {
  id: string;
  role: string;
}

interface ContextDoorEventBase {
  id: string;
  provider: ContextDoorProvider;
  provenance: readonly string[];
  eventTime: string;
  effectiveTime?: string;
  scope: string;
  purpose: string;
}

export interface ContextDoorHumanContextItem {
  id: string;
  category: ContextDoorContextCategory;
  statement: string;
  status: HumanContextStatus;
  relevantTimeframe: string;
  reviewTrigger: string;
}

export interface HumanContextSuppliedEvent extends ContextDoorEventBase {
  type: "human-context-supplied";
  items: readonly ContextDoorHumanContextItem[];
}

export interface CorrectionSuppliedEvent extends ContextDoorEventBase {
  type: "correction-supplied";
  correctsId: string;
  statement: string;
  relationship: "corrects" | "qualifies" | "contradicts";
}

export interface RecipientAlignmentSuppliedEvent extends ContextDoorEventBase {
  type: "recipient-alignment-supplied";
  communicationId: string;
  recipientId: string;
  status: ContextDoorAlignmentStatus;
  reasons: readonly string[];
  remainingUncertainty: readonly string[];
}

export interface RememberInvitedEvent extends ContextDoorEventBase {
  type: "remember-invited";
  contextItemIds: readonly string[];
}

export interface InvitationWithdrawnEvent extends ContextDoorEventBase {
  type: "invitation-withdrawn";
  invitationId: string;
}

export interface ContextualRemovalRequestedEvent extends ContextDoorEventBase {
  type: "contextual-removal-requested";
  contextItemIds: readonly string[];
  treatment:
    | "remove-relationship-candidate"
    | "no-longer-relevant"
    | "requires-governed-review";
  rationale: string;
}

export interface ContextStaleEvent extends ContextDoorEventBase {
  type: "context-stale";
  contextItemIds: readonly string[];
  reason: string;
}

export interface ContextReconfirmedEvent extends ContextDoorEventBase {
  type: "context-reconfirmed";
  contextItemIds: readonly string[];
}

export interface GenericLearningCandidateProposedEvent extends ContextDoorEventBase {
  type: "generic-learning-candidate-proposed";
  content: string;
  sourceUnderstandingIds: readonly string[];
  deidentificationReview: {
    reviewedBy: string;
    reviewedAt: string;
    personSpecificContextRemoved: true;
  };
}

export type ContextDoorEvent =
  | HumanContextSuppliedEvent
  | CorrectionSuppliedEvent
  | RecipientAlignmentSuppliedEvent
  | RememberInvitedEvent
  | InvitationWithdrawnEvent
  | ContextualRemovalRequestedEvent
  | ContextStaleEvent
  | ContextReconfirmedEvent
  | GenericLearningCandidateProposedEvent;

export interface ContextDoorContextItemRecord extends ContextDoorHumanContextItem {
  provider: ContextDoorProvider;
  observationId: string;
  translationId: string;
  eventId: string;
  eventTime: string;
  effectiveTime: string;
  scope: string;
  purpose: string;
  provenance: readonly string[];
  lifecycleStatus: ContextLifecycleStatus;
  lifecycleEventId: string;
  correctionEventIds: readonly string[];
}

export interface ContextDoorLineageEntry {
  observationId: string;
  translationId: string;
  understandingId: string;
  source: Observation["source"];
  sourceEventId?: string;
}

export interface ContextDoorUnderstandingRecord {
  id: string;
  triggerEventId?: string;
  understanding: Understanding;
  translationIds: readonly string[];
  invariantViolations: readonly string[];
}

export interface ContextDoorCommunicationRecord {
  id: string;
  purpose: "clarification" | "restatement";
  content: string;
  sourceUnderstandingId: string;
  judgement: Judgement;
  authority: AuthorityAssessment;
  action: Action;
}

export interface ContextDoorCorrectionRecord {
  eventId: string;
  correctsId: string;
  observationId: string;
  translationId: string;
  provider: ContextDoorProvider;
  statement: string;
  relationship: CorrectionSuppliedEvent["relationship"];
  eventTime: string;
  provenance: readonly string[];
}

export interface ContextDoorAlignmentRecord {
  eventId: string;
  communicationId: string;
  recipientId: string;
  status: ContextDoorAlignmentStatus;
  reasons: readonly string[];
  remainingUncertainty: readonly string[];
  confirmedAt: string;
  provenance: readonly string[];
}

export interface ContextDoorMemoryCandidate {
  id: string;
  invitationId: string;
  understandingId: string;
  understoodMeaning: string;
  contextItemIds: readonly string[];
  recipientAlignmentEventIds: readonly string[];
  status: "candidate" | "withdrawn" | "removed" | "no-longer-relevant";
  createdAt: string;
}

export interface ContextDoorLearningCandidate {
  id: string;
  content: string;
  sourceUnderstandingIds: readonly string[];
  status: "proposal-only";
  destination: "governed-learning-review";
  deidentificationReview: GenericLearningCandidateProposedEvent["deidentificationReview"];
  provenance: readonly string[];
}

export interface ContextDoorDeniedOutcome {
  effect:
    | "implementation"
    | "execution"
    | "contribution-progression"
    | "external-world-action"
    | "durable-memory-write"
    | "knowledge-promotion"
    | "learning-promotion"
    | "formation-completion"
    | "self-authorisation";
  status: "denied";
  reason: string;
}

export interface ContextDoorGovernanceEvidence {
  eventId: string;
  retainedAs: "minimum-hh-governance-evidence";
  evidenceReferences: readonly string[];
}

export interface ContextDoorRecord {
  id: string;
  actorId: string;
  question: string;
  scope: string;
  purpose: string;
  openedAt: string;
  phase: ContextDoorPhase;
  repositoryEvidence: readonly Pick<
    RepositoryDocument,
    "id" | "sourcePath" | "section"
  >[];
  events: readonly ContextDoorEvent[];
  observations: readonly Observation[];
  translations: readonly Translation[];
  translationIds: readonly string[];
  contextItems: readonly ContextDoorContextItemRecord[];
  understandings: readonly ContextDoorUnderstandingRecord[];
  currentUnderstandingId: string;
  lineage: readonly ContextDoorLineageEntry[];
  communications: readonly ContextDoorCommunicationRecord[];
  corrections: readonly ContextDoorCorrectionRecord[];
  alignments: readonly ContextDoorAlignmentRecord[];
  relationshipMemoryCandidate?: ContextDoorMemoryCandidate;
  learningCandidates: readonly ContextDoorLearningCandidate[];
  governanceEvidence: readonly ContextDoorGovernanceEvidence[];
  deniedOutcomes: readonly ContextDoorDeniedOutcome[];
  transcriptStored: false;
  personalMemoryWritePerformed: false;
  knowledgeWritePerformed: false;
  learningPromotionPerformed: false;
}

export interface BeginContextDoorInput {
  conversationId: string;
  actorId: string;
  question: string;
  scope: string;
  purpose: string;
  openedAt: string;
  repository: Pick<{ search(question: string): RepositoryDocument[] }, "search">;
}

export interface ContextDoorInspection {
  recordId: string;
  phase: ContextDoorPhase;
  currentUnderstanding: Understanding;
  uncertainty: readonly string[];
  lineage: readonly ContextDoorLineageEntry[];
  communications: readonly ContextDoorCommunicationRecord[];
  providers: readonly ContextDoorProvider[];
  contextLifecycle: readonly Pick<
    ContextDoorContextItemRecord,
    "id" | "lifecycleStatus" | "effectiveTime" | "reviewTrigger" | "relevantTimeframe"
  >[];
  corrections: readonly ContextDoorCorrectionRecord[];
  alignments: readonly ContextDoorAlignmentRecord[];
  relationshipMemoryCandidate?: ContextDoorMemoryCandidate;
  governanceEvidence: readonly ContextDoorGovernanceEvidence[];
  learningCandidates: readonly ContextDoorLearningCandidate[];
  deniedOutcomes: readonly ContextDoorDeniedOutcome[];
  transcriptStored: false;
  personalMemoryWritePerformed: false;
  knowledgeWritePerformed: false;
  learningPromotionPerformed: false;
}

const DENIED_OUTCOMES: readonly ContextDoorDeniedOutcome[] = [
  "implementation",
  "execution",
  "contribution-progression",
  "external-world-action",
  "durable-memory-write",
  "knowledge-promotion",
  "learning-promotion",
  "formation-completion",
  "self-authorisation",
].map((effect) => ({
  effect: effect as ContextDoorDeniedOutcome["effect"],
  status: "denied" as const,
  reason: "Context Door Version 1 prepares and evidences Understanding only.",
}));

export function beginContextDoor(input: BeginContextDoorInput): ContextDoorRecord {
  requireText(input.conversationId, "conversationId");
  requireText(input.actorId, "actorId");
  requireText(input.question, "question");
  requireText(input.scope, "scope");
  requireText(input.purpose, "purpose");
  requireTimestamp(input.openedAt, "openedAt");

  const documents = input.repository.search(input.question);
  const translations = translateDocumentsForFormation(documents);
  const translatedObservationIds = new Set(
    translations.map((translation) => translation.observationId),
  );
  const observations = documents
    .map(repositoryDocumentToObservation)
    .filter((observation) => translatedObservationIds.has(observation.id));
  const translationIds = translations.map((translation) =>
    translationIdFor(translation.observationId),
  );
  const formationInput: FormationInput = {
    translations,
    context: {
      situational: {
        what: input.question,
        purpose: input.purpose,
      },
      institutional: [],
    },
    knowledge: repositoryDocumentsToFormation(documents),
  };
  const initialUnderstanding = formUnderstanding(
    `${input.conversationId}:understanding:initial`,
    formationInput,
    translationIds,
  );
  const communication = buildCommunication({
    actorId: input.actorId,
    communicationId: `${input.conversationId}:communication:clarification`,
    purpose: "clarification",
    content:
      "What current Context should I understand, what is my invited role, and what should remain unresolved?",
    understandingRecord: initialUnderstanding,
    now: input.openedAt,
  });

  return {
    id: input.conversationId,
    actorId: input.actorId,
    question: input.question,
    scope: input.scope,
    purpose: input.purpose,
    openedAt: input.openedAt,
    phase: "awaiting-human-context",
    repositoryEvidence: documents.map(({ id, sourcePath, section }) => ({
      id,
      sourcePath,
      section,
    })),
    events: [],
    observations,
    translations,
    translationIds,
    contextItems: [],
    understandings: [initialUnderstanding],
    currentUnderstandingId: initialUnderstanding.id,
    lineage: observations.map((observation, index) => ({
      observationId: observation.id,
      translationId: translationIds[index],
      understandingId: initialUnderstanding.id,
      source: observation.source,
    })),
    communications: [communication],
    corrections: [],
    alignments: [],
    learningCandidates: [],
    governanceEvidence: [],
    deniedOutcomes: DENIED_OUTCOMES,
    transcriptStored: false,
    personalMemoryWritePerformed: false,
    knowledgeWritePerformed: false,
    learningPromotionPerformed: false,
  };
}

export function applyContextDoorEvent(
  record: ContextDoorRecord,
  event: ContextDoorEvent,
): ContextDoorRecord {
  validateEvent(record, event);

  switch (event.type) {
    case "human-context-supplied":
      return applyHumanContext(record, event);
    case "correction-supplied":
      return applyCorrection(record, event);
    case "recipient-alignment-supplied":
      return applyAlignment(record, event);
    case "remember-invited":
      return applyRememberInvitation(record, event);
    case "invitation-withdrawn":
      return applyInvitationWithdrawal(record, event);
    case "contextual-removal-requested":
      return applyRemoval(record, event);
    case "context-stale":
      return applyLifecycle(record, event, "stale");
    case "context-reconfirmed":
      return applyLifecycle(record, event, "reconfirmed");
    case "generic-learning-candidate-proposed":
      return applyLearningCandidate(record, event);
    default:
      throw new Error("Unsupported Context Door event type.");
  }
}

export function inspectContextDoor(record: ContextDoorRecord): ContextDoorInspection {
  const current = currentUnderstanding(record);
  const providers = new Map<string, ContextDoorProvider>();
  for (const event of record.events) {
    providers.set(event.provider.id, { ...event.provider });
  }

  return {
    recordId: record.id,
    phase: record.phase,
    currentUnderstanding: { ...current.understanding },
    uncertainty: [...current.understanding.uncertainty],
    lineage: [...record.lineage],
    communications: [...record.communications],
    providers: [...providers.values()],
    contextLifecycle: record.contextItems.map((item) => ({
      id: item.id,
      lifecycleStatus: item.lifecycleStatus,
      effectiveTime: item.effectiveTime,
      reviewTrigger: item.reviewTrigger,
      relevantTimeframe: item.relevantTimeframe,
    })),
    corrections: [...record.corrections],
    alignments: [...record.alignments],
    relationshipMemoryCandidate: record.relationshipMemoryCandidate
      ? { ...record.relationshipMemoryCandidate }
      : undefined,
    governanceEvidence: [...record.governanceEvidence],
    learningCandidates: [...record.learningCandidates],
    deniedOutcomes: [...record.deniedOutcomes],
    transcriptStored: false,
    personalMemoryWritePerformed: false,
    knowledgeWritePerformed: false,
    learningPromotionPerformed: false,
  };
}

function applyHumanContext(
  record: ContextDoorRecord,
  event: HumanContextSuppliedEvent,
): ContextDoorRecord {
  if (event.items.length === 0) {
    throw new Error("Human Context event must contain at least one item.");
  }

  const duplicateItem = event.items.find((item) =>
    record.contextItems.some((existing) => existing.id === item.id),
  );
  if (duplicateItem) {
    throw new Error(`Context item ID already exists: ${duplicateItem.id}`);
  }

  const observations: Observation[] = event.items.map((item) => ({
    id: observationIdFor(item.id),
    category: item.category,
    description: item.statement,
    confidence: confidenceFor(item.status),
    source: "human",
  }));
  const translations: Translation[] = event.items.map((item, index) => ({
    observationId: observations[index].id,
    meaning: attributableMeaning(event.provider, item),
    confidence: confidenceFor(item.status),
  }));
  const translationIds = event.items.map((item) => translationIdFor(item.id));
  const contextItems: ContextDoorContextItemRecord[] = event.items.map(
    (item, index) => ({
      ...item,
      provider: { ...event.provider },
      observationId: observations[index].id,
      translationId: translationIds[index],
      eventId: event.id,
      eventTime: event.eventTime,
      effectiveTime: event.effectiveTime ?? event.eventTime,
      scope: event.scope,
      purpose: event.purpose,
      provenance: [...event.provenance],
      lifecycleStatus: "active",
      lifecycleEventId: event.id,
      correctionEventIds: [],
    }),
  );

  return reformAfterEvent(record, event, {
    observations,
    translations,
    translationIds,
    contextItems,
  });
}

function applyCorrection(
  record: ContextDoorRecord,
  event: CorrectionSuppliedEvent,
): ContextDoorRecord {
  const correctedContext = record.contextItems.find(
    (item) => item.id === event.correctsId,
  );
  const correctedCommunication = record.communications.find(
    (item) => item.id === event.correctsId,
  );
  if (!correctedContext && !correctedCommunication) {
    throw new Error(`Correction target does not exist: ${event.correctsId}`);
  }

  const observation: Observation = {
    id: observationIdFor(event.id),
    category: "correction",
    description: event.statement,
    confidence: 1,
    source: "human",
  };
  const translationId = translationIdFor(event.id);
  const translation: Translation = {
    observationId: observation.id,
    meaning: `${event.provider.id} ${event.relationship} ${event.correctsId}: ${event.statement}`,
    confidence: 1,
  };
  const correction: ContextDoorCorrectionRecord = {
    eventId: event.id,
    correctsId: event.correctsId,
    observationId: observation.id,
    translationId,
    provider: { ...event.provider },
    statement: event.statement,
    relationship: event.relationship,
    eventTime: event.eventTime,
    provenance: [...event.provenance],
  };
  const contextItems = record.contextItems.map((item) =>
    item.id === event.correctsId
      ? {
          ...item,
          correctionEventIds: [...item.correctionEventIds, event.id],
        }
      : item,
  );

  return reformAfterEvent(
    {
      ...record,
      contextItems,
      corrections: [...record.corrections, correction],
    },
    event,
    {
      observations: [observation],
      translations: [translation],
      translationIds: [translationId],
      contextItems: [],
    },
  );
}

function applyAlignment(
  record: ContextDoorRecord,
  event: RecipientAlignmentSuppliedEvent,
): ContextDoorRecord {
  if (event.provider.id !== event.recipientId) {
    throw new Error("Alignment must be supplied by the recipient of the reply.");
  }
  if (!record.communications.some((item) => item.id === event.communicationId)) {
    throw new Error(`Alignment communication does not exist: ${event.communicationId}`);
  }
  if (record.communications.at(-1)?.id !== event.communicationId) {
    throw new Error("Alignment must reference the current reply.");
  }

  const alignment: ContextDoorAlignmentRecord = {
    eventId: event.id,
    communicationId: event.communicationId,
    recipientId: event.recipientId,
    status: event.status,
    reasons: [...event.reasons],
    remainingUncertainty: [...event.remainingUncertainty],
    confirmedAt: event.eventTime,
    provenance: [...event.provenance],
  };
  const alignments = [...record.alignments, alignment];
  const phase = latestCommunicationAlignments(record, alignments).every(
    (item) => item.status === "aligned",
  )
    ? "complete"
    : "incomplete";
  const updated = appendEvidence(
    {
      ...record,
      phase,
      events: [...record.events, event],
      alignments,
    },
    event,
    [event.communicationId],
  );

  return refreshMemoryCandidate(updated);
}

function applyRememberInvitation(
  record: ContextDoorRecord,
  event: RememberInvitedEvent,
): ContextDoorRecord {
  requireContextItems(record, event.contextItemIds);
  const updated = appendEvidence(
    {
      ...record,
      events: [...record.events, event],
    },
    event,
    event.contextItemIds,
  );
  return refreshMemoryCandidate(updated);
}

function applyInvitationWithdrawal(
  record: ContextDoorRecord,
  event: InvitationWithdrawnEvent,
): ContextDoorRecord {
  const invitation = record.events.find(
    (item): item is RememberInvitedEvent =>
      item.type === "remember-invited" && item.id === event.invitationId,
  );
  if (!invitation) {
    throw new Error(`Remember invitation does not exist: ${event.invitationId}`);
  }
  const candidate = record.relationshipMemoryCandidate;
  const relationshipMemoryCandidate =
    candidate?.invitationId === event.invitationId
      ? { ...candidate, status: "withdrawn" as const }
      : candidate;

  return appendEvidence(
    {
      ...record,
      events: [...record.events, event],
      relationshipMemoryCandidate,
    },
    event,
    [event.invitationId],
  );
}

function applyRemoval(
  record: ContextDoorRecord,
  event: ContextualRemovalRequestedEvent,
): ContextDoorRecord {
  requireContextItems(record, event.contextItemIds);
  const contextItems = record.contextItems.map((item) =>
    event.contextItemIds.includes(item.id)
      ? {
          ...item,
          lifecycleStatus:
            event.treatment === "no-longer-relevant"
              ? ("no-longer-relevant" as const)
              : item.lifecycleStatus,
          lifecycleEventId: event.id,
        }
      : item,
  );
  const candidate = record.relationshipMemoryCandidate;
  let relationshipMemoryCandidate = candidate;
  if (candidate && event.contextItemIds.some((id) => candidate.contextItemIds.includes(id))) {
    if (event.treatment === "remove-relationship-candidate") {
      relationshipMemoryCandidate = { ...candidate, status: "removed" };
    } else if (event.treatment === "no-longer-relevant") {
      relationshipMemoryCandidate = {
        ...candidate,
        status: "no-longer-relevant",
      };
    }
  }

  return appendEvidence(
    {
      ...record,
      events: [...record.events, event],
      contextItems,
      relationshipMemoryCandidate,
    },
    event,
    event.contextItemIds,
  );
}

function applyLifecycle(
  record: ContextDoorRecord,
  event: ContextStaleEvent | ContextReconfirmedEvent,
  status: Extract<ContextLifecycleStatus, "stale" | "reconfirmed">,
): ContextDoorRecord {
  requireContextItems(record, event.contextItemIds);
  const contextItems = record.contextItems.map((item) =>
    event.contextItemIds.includes(item.id)
      ? {
          ...item,
          lifecycleStatus: status,
          lifecycleEventId: event.id,
          effectiveTime: event.effectiveTime ?? event.eventTime,
        }
      : item,
  );

  const baseRecord: ContextDoorRecord = {
    ...record,
    events: [...record.events, event],
    contextItems,
  };
  const activeEvidence = activeFormationEvidence(baseRecord);
  const formationInput: FormationInput = {
    translations: activeEvidence.translations,
    context: formationContextFor(baseRecord, contextItems),
    knowledge: [],
  };
  const understanding = formUnderstanding(
    `${record.id}:understanding:${event.id}`,
    formationInput,
    activeEvidence.translationIds,
    event.id,
  );
  const purpose: ContextDoorCommunicationRecord["purpose"] =
    status === "stale" ? "clarification" : "restatement";
  const communication = buildCommunication({
    actorId: record.actorId,
    communicationId: `${record.id}:communication:${event.id}`,
    purpose,
    content:
      status === "stale"
        ? "This Context is stale. Please reconfirm it before it is treated as current."
        : buildRestatement(understanding.understanding),
    understandingRecord: understanding,
    now: event.eventTime,
  });
  const lineage = activeEvidence.observations.map((observation, index) => ({
    observationId: observation.id,
    translationId: activeEvidence.translationIds[index],
    understandingId: understanding.id,
    source: observation.source,
    sourceEventId: sourceEventIdFromRecord(baseRecord, observation.id),
  }));

  return appendEvidence(
    {
      ...baseRecord,
      phase:
        status === "stale"
          ? "awaiting-human-context"
          : "awaiting-recipient-alignment",
      understandings: [...record.understandings, understanding],
      currentUnderstandingId: understanding.id,
      lineage: [...record.lineage, ...lineage],
      communications: [...record.communications, communication],
      relationshipMemoryCandidate: undefined,
    },
    event,
    [understanding.id, communication.id, ...event.contextItemIds],
  );
}

function applyLearningCandidate(
  record: ContextDoorRecord,
  event: GenericLearningCandidateProposedEvent,
): ContextDoorRecord {
  const understandingIds = new Set(record.understandings.map((item) => item.id));
  if (event.sourceUnderstandingIds.some((id) => !understandingIds.has(id))) {
    throw new Error("Learning candidate references an unknown Understanding.");
  }
  if (!event.deidentificationReview.personSpecificContextRemoved) {
    throw new Error("Generic Learning candidate must pass de-identification review.");
  }
  const candidate: ContextDoorLearningCandidate = {
    id: `${record.id}:learning-candidate:${event.id}`,
    content: event.content,
    sourceUnderstandingIds: [...event.sourceUnderstandingIds],
    status: "proposal-only",
    destination: "governed-learning-review",
    deidentificationReview: { ...event.deidentificationReview },
    provenance: [...event.provenance],
  };

  return appendEvidence(
    {
      ...record,
      events: [...record.events, event],
      learningCandidates: [...record.learningCandidates, candidate],
    },
    event,
    event.sourceUnderstandingIds,
  );
}

function reformAfterEvent(
  record: ContextDoorRecord,
  event: HumanContextSuppliedEvent | CorrectionSuppliedEvent,
  additions: {
    observations: Observation[];
    translations: Translation[];
    translationIds: string[];
    contextItems: ContextDoorContextItemRecord[];
  },
): ContextDoorRecord {
  const observations = [...record.observations, ...additions.observations];
  const translations = [...record.translations, ...additions.translations];
  const translationIds = [...record.translationIds, ...additions.translationIds];
  const contextItems = [...record.contextItems, ...additions.contextItems];
  const evidenceRecord: ContextDoorRecord = {
    ...record,
    observations,
    translations,
    translationIds,
    contextItems,
  };
  const currentEvidence = activeFormationEvidence(evidenceRecord);
  const currentObservationIds = new Set(
    currentEvidence.observations.map((observation) => observation.id),
  );
  const currentContextItems = contextItems.filter((item) =>
    currentObservationIds.has(item.observationId),
  );
  const formationInput: FormationInput = {
    translations: currentEvidence.translations,
    context: formationContextFor(record, currentContextItems),
    knowledge: [],
  };
  const understanding = formUnderstanding(
    `${record.id}:understanding:${event.id}`,
    formationInput,
    currentEvidence.translationIds,
    event.id,
  );
  const communication = buildCommunication({
    actorId: record.actorId,
    communicationId: `${record.id}:communication:${event.id}`,
    purpose: "restatement",
    content: buildRestatement(understanding.understanding),
    understandingRecord: understanding,
    now: event.eventTime,
  });
  const newLineage = currentEvidence.observations.map((observation, index) => ({
    observationId: observation.id,
    translationId: currentEvidence.translationIds[index],
    understandingId: understanding.id,
    source: observation.source,
    sourceEventId: sourceEventIdFor(evidenceRecord, event, observation.id),
  }));
  const updated = appendEvidence(
    {
      ...record,
      phase: "awaiting-recipient-alignment",
      events: [...record.events, event],
      observations,
      translations,
      translationIds,
      contextItems,
      understandings: [...record.understandings, understanding],
      currentUnderstandingId: understanding.id,
      lineage: [...record.lineage, ...newLineage],
      communications: [...record.communications, communication],
    },
    event,
    [understanding.id, communication.id],
  );

  return {
    ...updated,
    relationshipMemoryCandidate: undefined,
  };
}

function formUnderstanding(
  id: string,
  input: FormationInput,
  translationIds: readonly string[],
  triggerEventId?: string,
): ContextDoorUnderstandingRecord {
  const understanding = form(input);
  const violations = checkAllInvariants(input, understanding);
  if (violations.length > 0) {
    throw new Error(
      `Understanding invariants failed: ${violations
        .map((item) => item.description)
        .join(" ")}`,
    );
  }
  return {
    id,
    triggerEventId,
    understanding,
    translationIds: [...translationIds],
    invariantViolations: [],
  };
}

function buildCommunication(input: {
  actorId: string;
  communicationId: string;
  purpose: ContextDoorCommunicationRecord["purpose"];
  content: string;
  understandingRecord: ContextDoorUnderstandingRecord;
  now: string;
}): ContextDoorCommunicationRecord {
  const candidates: JudgementCandidateResponse[] =
    input.purpose === "clarification"
      ? [
          {
            kind: "ask",
            description: "Ask only for the human Context required to improve Understanding.",
          },
        ]
      : [
          {
            kind: "speak",
            description: "Restate the evidence-grounded Understanding for recipient alignment.",
          },
          {
            kind: "admit-uncertainty",
            description: "Restate bounded Understanding while preserving what remains unknown.",
          },
        ];
  const judgement = new JudgementEngine().judge({
    understanding: input.understandingRecord.understanding,
    candidates,
  });
  const authority = new AuthorityEngine().assess({
    context: {
      actorId: input.actorId,
      authorityProfile: "contributor",
      action: judgement.selected.kind,
      subject: "hh-0000-context-door-communication",
      riskLevel: "low",
    },
  });
  const action = new ActionEngine().build({
    judgement,
    authority,
    actionId: `${input.communicationId}:action`,
    now: input.now,
  });

  if (action.state !== "ready") {
    throw new Error(
      `Governed Context Door communication was not permitted: ${action.reason}`,
    );
  }

  return {
    id: input.communicationId,
    purpose: input.purpose,
    content: buildGovernedCommunicationContent(input.content, judgement),
    sourceUnderstandingId: input.understandingRecord.id,
    judgement,
    authority,
    action,
  };
}

function buildGovernedCommunicationContent(
  content: string,
  judgement: Judgement,
): string {
  if (
    judgement.disposition !== "insufficient" ||
    judgement.selected.kind !== "admit-uncertainty"
  ) {
    return content;
  }

  const returnPath = judgement.uncertainty.length > 0
    ? " We can come back to this when the missing information is available."
    : "";

  return `I don't know enough yet to answer responsibly.${returnPath} ${content}`;
}

function formationContextFor(
  record: ContextDoorRecord,
  contextItems: readonly ContextDoorContextItemRecord[],
): FormationContext {
  const currentItems = contextItems.filter(
    (item) =>
      item.lifecycleStatus === "active" || item.lifecycleStatus === "reconfirmed",
  );
  const providers = [...new Set(currentItems.map((item) => item.provider.id))];

  return {
    situational: {
      who: providers.join(", ") || undefined,
      what: record.question,
      purpose: record.purpose,
    },
    institutional: currentItems
      .filter((item) => item.status !== "unresolved")
      .map((item) => ({
        category: item.category,
        key: item.id,
        value: item.statement,
        source: "relationship" as const,
      })),
  };
}

function refreshMemoryCandidate(record: ContextDoorRecord): ContextDoorRecord {
  const invitation = [...record.events]
    .reverse()
    .find(
      (item): item is RememberInvitedEvent => item.type === "remember-invited",
    );
  if (!invitation) {
    return { ...record, relationshipMemoryCandidate: undefined };
  }
  const withdrawn = record.events.some(
    (item) =>
      item.type === "invitation-withdrawn" &&
      item.invitationId === invitation.id,
  );
  if (withdrawn) {
    return record.relationshipMemoryCandidate
      ? {
          ...record,
          relationshipMemoryCandidate: {
            ...record.relationshipMemoryCandidate,
            status: "withdrawn",
          },
        }
      : record;
  }

  const currentAlignments = latestCommunicationAlignments(record, record.alignments);
  if (
    currentAlignments.length === 0 ||
    currentAlignments.some((item) => item.status !== "aligned")
  ) {
    return { ...record, relationshipMemoryCandidate: undefined };
  }
  const understanding = currentUnderstanding(record);
  const activeContextIds = record.contextItems
    .filter(
      (item) =>
        item.lifecycleStatus === "active" || item.lifecycleStatus === "reconfirmed",
    )
    .map((item) => item.id);
  if (activeContextIds.some((id) => !invitation.contextItemIds.includes(id))) {
    return { ...record, relationshipMemoryCandidate: undefined };
  }

  return {
    ...record,
    relationshipMemoryCandidate: {
      id: `${record.id}:memory-candidate:${invitation.id}`,
      invitationId: invitation.id,
      understandingId: understanding.id,
      understoodMeaning: understanding.understanding.summary,
      contextItemIds: activeContextIds,
      recipientAlignmentEventIds: currentAlignments.map((item) => item.eventId),
      status: "candidate",
      createdAt: invitation.eventTime,
    },
  };
}

function latestCommunicationAlignments(
  record: ContextDoorRecord,
  alignments: readonly ContextDoorAlignmentRecord[],
): ContextDoorAlignmentRecord[] {
  const latestCommunication = record.communications.at(-1);
  if (!latestCommunication) return [];
  const latestByRecipient = new Map<string, ContextDoorAlignmentRecord>();
  for (const alignment of alignments) {
    if (alignment.communicationId === latestCommunication.id) {
      latestByRecipient.set(alignment.recipientId, alignment);
    }
  }
  return [...latestByRecipient.values()];
}

function appendEvidence<TEvent extends ContextDoorEvent>(
  record: ContextDoorRecord,
  event: TEvent,
  evidenceReferences: readonly string[],
): ContextDoorRecord {
  return {
    ...record,
    governanceEvidence: [
      ...record.governanceEvidence,
      {
        eventId: event.id,
        retainedAs: "minimum-hh-governance-evidence",
        evidenceReferences: [...evidenceReferences],
      },
    ],
  };
}

function currentUnderstanding(record: ContextDoorRecord): ContextDoorUnderstandingRecord {
  const current = record.understandings.find(
    (item) => item.id === record.currentUnderstandingId,
  );
  if (!current) {
    throw new Error(`Current Understanding does not exist: ${record.currentUnderstandingId}`);
  }
  return current;
}

function validateEvent(record: ContextDoorRecord, event: ContextDoorEvent): void {
  requireText(event.id, "event.id");
  requireText(event.provider.id, "event.provider.id");
  requireText(event.provider.role, "event.provider.role");
  requireText(event.scope, "event.scope");
  requireText(event.purpose, "event.purpose");
  requireTimestamp(event.eventTime, "event.eventTime");
  if (event.effectiveTime) {
    requireTimestamp(event.effectiveTime, "event.effectiveTime");
  }
  if (event.provenance.length === 0) {
    throw new Error("Every Context Door event requires provenance.");
  }
  if (record.events.some((existing) => existing.id === event.id)) {
    throw new Error(`Context Door event ID already exists: ${event.id}`);
  }
}

function requireContextItems(
  record: ContextDoorRecord,
  contextItemIds: readonly string[],
): void {
  if (contextItemIds.length === 0) {
    throw new Error("At least one Context item ID is required.");
  }
  const knownIds = new Set(record.contextItems.map((item) => item.id));
  const unknown = contextItemIds.find((id) => !knownIds.has(id));
  if (unknown) {
    throw new Error(`Context item does not exist: ${unknown}`);
  }
}

function buildRestatement(understanding: Understanding): string {
  const uncertainty = understanding.uncertainty.length
    ? ` Remaining uncertainty: ${understanding.uncertainty.join(" ")}`
    : "";
  return `${understanding.summary}${uncertainty}`;
}

function attributableMeaning(
  provider: ContextDoorProvider,
  item: ContextDoorHumanContextItem,
): string {
  if (item.status === "unresolved") {
    return `${provider.id} supplied this as unresolved Context: ${item.statement}`;
  }
  return `${provider.id} supplied attributable ${item.status} Context: ${item.statement}`;
}

function confidenceFor(status: HumanContextStatus): number {
  if (status === "confirmed-supplied") return 1;
  if (status === "human-interpretation") return 0.7;
  return 0;
}

function observationIdFor(id: string): string {
  return `observation:${id}`;
}

function translationIdFor(id: string): string {
  return `translation:${id}`;
}

function sourceEventIdFor(
  record: ContextDoorRecord,
  currentEvent: HumanContextSuppliedEvent | CorrectionSuppliedEvent,
  observationId: string,
): string | undefined {
  if (observationId === observationIdFor(currentEvent.id)) {
    return currentEvent.id;
  }
  const currentHumanItem =
    currentEvent.type === "human-context-supplied"
      ? currentEvent.items.find((item) => observationIdFor(item.id) === observationId)
      : undefined;
  if (currentHumanItem) {
    return currentEvent.id;
  }
  const contextItem = record.contextItems.find(
    (item) => item.observationId === observationId,
  );
  if (contextItem) {
    return contextItem.eventId;
  }
  return record.corrections.find((item) => item.observationId === observationId)?.eventId;
}

function sourceEventIdFromRecord(
  record: ContextDoorRecord,
  observationId: string,
): string | undefined {
  return (
    record.contextItems.find((item) => item.observationId === observationId)?.eventId ??
    record.corrections.find((item) => item.observationId === observationId)?.eventId
  );
}

function activeFormationEvidence(record: ContextDoorRecord): {
  observations: Observation[];
  translations: Translation[];
  translationIds: string[];
} {
  const excludedObservationIds = supersededObservationIds(record);
  for (const observationId of record.contextItems
    .filter(
      (item) =>
        item.lifecycleStatus === "stale" ||
        item.lifecycleStatus === "no-longer-relevant",
    )
    .map((item) => item.observationId)) {
    excludedObservationIds.add(observationId);
  }
  const inactiveContextItemIds = new Set(
    record.contextItems
      .filter(
        (item) =>
          item.lifecycleStatus === "stale" ||
          item.lifecycleStatus === "no-longer-relevant",
      )
      .map((item) => item.id),
  );
  for (const correction of record.corrections) {
    if (inactiveContextItemIds.has(correction.correctsId)) {
      excludedObservationIds.add(correction.observationId);
    }
  }

  const observations: Observation[] = [];
  const translations: Translation[] = [];
  const translationIds: string[] = [];
  record.observations.forEach((observation, index) => {
    if (!excludedObservationIds.has(observation.id)) {
      observations.push(observation);
      translations.push(record.translations[index]);
      translationIds.push(record.translationIds[index]);
    }
  });
  return { observations, translations, translationIds };
}

function supersededObservationIds(record: ContextDoorRecord): Set<string> {
  const superseded = new Set<string>();
  const correctionsByTarget = new Map<string, ContextDoorCorrectionRecord[]>();

  for (const correction of record.corrections) {
    if (correction.relationship !== "corrects") continue;
    const corrections = correctionsByTarget.get(correction.correctsId) ?? [];
    corrections.push(correction);
    correctionsByTarget.set(correction.correctsId, corrections);
  }

  for (const [targetId, corrections] of correctionsByTarget) {
    const target = record.contextItems.find((item) => item.id === targetId);
    if (target) superseded.add(target.observationId);
    for (const correction of corrections.slice(0, -1)) {
      superseded.add(correction.observationId);
    }
  }

  return superseded;
}

function requireText(value: string, field: string): void {
  if (!value.trim()) {
    throw new Error(`${field} is required.`);
  }
}

function requireTimestamp(value: string, field: string): void {
  requireText(value, field);
  if (Number.isNaN(Date.parse(value))) {
    throw new Error(`${field} must be an ISO-compatible timestamp.`);
  }
}