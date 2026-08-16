import { describe, expect, it } from "@jest/globals";
import { ActionEngine } from "../../../action/ActionEngine";
import { AuthorityEngine } from "../../../authority/AuthorityEngine";
import { JudgementEngine } from "../../../judgement/JudgementEngine";
import type { Understanding } from "../../../understanding/Understanding";
import type { RepositoryDocument } from "../../repositoryKnowledgeService";
import {
    applyContextDoorEvent,
    beginContextDoor,
    inspectContextDoor,
    type ContextDoorEvent,
    type ContextDoorRecord,
} from "../contextDoor";

const T0 = "2026-08-10T09:00:00.000Z";
const T1 = "2026-08-10T09:01:00.000Z";
const T2 = "2026-08-10T09:02:00.000Z";
const T3 = "2026-08-10T09:03:00.000Z";
const T4 = "2026-08-10T09:04:00.000Z";
const T5 = "2026-08-10T09:05:00.000Z";
const T6 = "2026-08-10T09:06:00.000Z";

const repositoryDocument: RepositoryDocument = {
  id: "doc-context-door-gate",
  title: "Context Door Gate",
  source: "docs/formation/HH0000_CONTEXT_DOOR_PRE_IMPLEMENTATION_GATE.md",
  sourcePath: "docs/formation/HH0000_CONTEXT_DOOR_PRE_IMPLEMENTATION_GATE.md",
  text: "Context Door is bounded to forming and evidencing Understanding.",
  score: 9,
  section: "Exact Bounded Implementation Permission",
  fragment: "Context Door is bounded to forming and evidencing Understanding.",
  reason: "Authorised Context Door boundary",
};

const repository = {
  search: () => [repositoryDocument],
};

const marc = { id: "MARC", role: "Humanity / Formation recipient" };
const cyril = { id: "Cyril", role: "Digital / Technology / Platform recipient" };

function begin(): ContextDoorRecord {
  return beginContextDoor({
    conversationId: "hh0000-context-door-runtime-001",
    actorId: "Andy-HH-0000",
    question: "What current Context should Andy understand?",
    scope: "HH-0000 Context Door Version 1",
    purpose: "Form and evidence bounded current Understanding",
    openedAt: T0,
    repository,
  });
}

function eventBase(
  id: string,
  provider = marc,
  eventTime = T1,
): Pick<
  ContextDoorEvent,
  "id" | "provider" | "provenance" | "eventTime" | "effectiveTime" | "scope" | "purpose"
> {
  return {
    id,
    provider,
    provenance: [`human-event:${id}`],
    eventTime,
    effectiveTime: eventTime,
    scope: "this HH-0000 Context Door conversation",
    purpose: "improve bounded current Understanding",
  };
}

function supplyContext(record = begin()): ContextDoorRecord {
  return applyContextDoorEvent(record, {
    ...eventBase("event-context", marc, T1),
    type: "human-context-supplied",
    items: [
      {
        id: "context-current-need",
        category: "current-need",
        statement: "Preserve meaning, correction, and uncertainty.",
        status: "confirmed-supplied",
        relevantTimeframe: "this review cycle",
        reviewTrigger: "the review purpose or evidence scope changes",
      },
      {
        id: "context-open-question",
        category: "open-uncertainty",
        statement: "Live use may expose another relational Context category.",
        status: "unresolved",
        relevantTimeframe: "until runtime evidence answers it",
        reviewTrigger: "new runtime evidence exists",
      },
    ],
  });
}

function latestCommunication(record: ContextDoorRecord) {
  const communication = record.communications.at(-1);
  if (!communication) throw new Error("Expected a Context Door communication.");
  return communication;
}

function align(
  record: ContextDoorRecord,
  status: "aligned" | "partly-aligned" | "not-yet-aligned" = "aligned",
  provider = marc,
  id = `event-alignment-${provider.id}`,
): ContextDoorRecord {
  return applyContextDoorEvent(record, {
    ...eventBase(id, provider, T3),
    type: "recipient-alignment-supplied",
    communicationId: latestCommunication(record).id,
    recipientId: provider.id,
    status,
    reasons: ["The restatement preserves the meaning addressed to this recipient."],
    remainingUncertainty:
      status === "aligned" ? ["The live category question remains unresolved."] : ["Meaning remains disputed."],
  });
}

function inviteToRemember(record: ContextDoorRecord): ContextDoorRecord {
  return applyContextDoorEvent(record, {
    ...eventBase("event-remember-invitation", marc, T2),
    type: "remember-invited",
    contextItemIds: ["context-current-need", "context-open-question"],
  });
}

describe("HH-0000 Context Door Version 1", () => {
  it("produces an aligned evidence flow through the governed cognitive chain", () => {
    const opened = begin();
    const contextualised = supplyContext(opened);
    const aligned = align(contextualised);
    const inspection = inspectContextDoor(aligned);

    expect(opened.events).toHaveLength(0);
    expect(aligned.phase).toBe("complete");
    expect(inspection.lineage.some((entry) => entry.source === "human")).toBe(true);
    expect(inspection.currentUnderstanding.evidenceChain).toContain(
      "observation:context-current-need",
    );
    expect(inspection.uncertainty.length).toBeGreaterThan(0);

    const communication = latestCommunication(aligned);
    expect(communication.judgement.understanding).toEqual(inspection.currentUnderstanding);
    expect(communication.authority.decision).toMatch(/allow/);
    expect(communication.action.state).toBe("ready");
    expect(communication.action.kind).toMatch(/speak|admit-uncertainty/);
    expect(aligned.alignments[0].recipientId).toBe("MARC");
    expect(aligned.governanceEvidence.map((item) => item.eventId)).toEqual(
      expect.arrayContaining(["event-context", "event-alignment-MARC"]),
    );
    expectGovernedRuntimeEvidence(aligned);
  });

  it("preserves correction history and forms updated Understanding", () => {
    const beforeCorrection = supplyContext();
    const corrected = applyContextDoorEvent(beforeCorrection, {
      ...eventBase("event-correction", marc, T2),
      type: "correction-supplied",
      correctsId: "context-current-need",
      statement: "Preserve meaning, correction, uncertainty, and recipient scope.",
      relationship: "corrects",
    });

    expect(beforeCorrection.corrections).toHaveLength(0);
    expect(corrected.corrections).toHaveLength(1);
    expect(corrected.contextItems.find((item) => item.id === "context-current-need")?.statement)
      .toBe("Preserve meaning, correction, and uncertainty.");
    expect(corrected.corrections[0]).toMatchObject({
      correctsId: "context-current-need",
      provider: marc,
      eventTime: T2,
    });
    expect(inspectContextDoor(corrected).currentUnderstanding.summary).toContain(
      "recipient scope",
    );
    expect(
      corrected.lineage.some(
        (entry) =>
          entry.observationId === "observation:event-correction" &&
          entry.understandingId === corrected.currentUnderstandingId,
      ),
    ).toBe(true);
    expect(
      corrected.lineage.some(
        (entry) =>
          entry.observationId === "observation:context-current-need" &&
          entry.understandingId === corrected.currentUnderstandingId,
      ),
    ).toBe(false);
    expectGovernedRuntimeEvidence(corrected);
  });

  it("redelivers corrected meaning without presenting the superseded meaning as current", () => {
    const initial = applyContextDoorEvent(begin(), {
      ...eventBase("event-incorrect-status", marc, T1),
      type: "human-context-supplied",
      items: [
        {
          id: "context-review-status",
          category: "current-situation",
          statement: "The evidence package is accepted.",
          status: "human-interpretation",
          relevantTimeframe: "this review",
          reviewTrigger: "an attributable correction is supplied",
        },
      ],
    });
    const initialUnderstandingId = initial.currentUnderstandingId;
    const corrected = applyContextDoorEvent(initial, {
      ...eventBase("event-status-correction", marc, T2),
      type: "correction-supplied",
      correctsId: "context-review-status",
      statement: "The evidence package is ready for review, not accepted.",
      relationship: "corrects",
    });
    const communication = latestCommunication(corrected);
    const inspection = inspectContextDoor(corrected);

    expect(corrected.understandings.map((item) => item.id)).toEqual(
      expect.arrayContaining([initialUnderstandingId, corrected.currentUnderstandingId]),
    );
    expect(corrected.contextItems[0].statement).toBe("The evidence package is accepted.");
    expect(inspection.currentUnderstanding.summary).toContain(
      "The evidence package is ready for review, not accepted.",
    );
    expect(inspection.currentUnderstanding.summary).not.toContain(
      "The evidence package is accepted.",
    );
    expect(
      corrected.understandings.find((item) => item.id === initialUnderstandingId)
        ?.understanding.summary,
    ).toContain("The evidence package is accepted.");
    expect(communication.sourceUnderstandingId).toBe(corrected.currentUnderstandingId);
    expect(communication.content).toContain(
      "The evidence package is ready for review, not accepted.",
    );
    expect(communication.content).not.toContain("The evidence package is accepted.");
    expect(inspection.corrections[0]).toMatchObject({
      eventId: "event-status-correction",
      correctsId: "context-review-status",
      provider: marc,
      provenance: ["human-event:event-status-correction"],
    });
    expect(inspection.lineage).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          observationId: "observation:context-review-status",
          sourceEventId: "event-incorrect-status",
        }),
        expect.objectContaining({
          observationId: "observation:event-status-correction",
          sourceEventId: "event-status-correction",
          understandingId: corrected.currentUnderstandingId,
        }),
      ]),
    );
    expect(communication.judgement.understanding).toEqual(
      inspection.currentUnderstanding,
    );
    expect(communication.authority.decision).toMatch(/allow/);
    expect(communication.action.state).toBe("ready");
    expect(inspection.uncertainty.length).toBeGreaterThan(0);
    expect(corrected.personalMemoryWritePerformed).toBe(false);
    expect(corrected.learningPromotionPerformed).toBe(false);
    expect(corrected.knowledgeWritePerformed).toBe(false);

    const correctedAgain = applyContextDoorEvent(corrected, {
      ...eventBase("event-status-correction-later", marc, T3),
      type: "correction-supplied",
      correctsId: "context-review-status",
      statement: "The evidence package is ready for bounded review, not accepted.",
      relationship: "corrects",
    });

    expect(correctedAgain.corrections).toHaveLength(2);
    expect(correctedAgain.corrections[0]).toEqual(corrected.corrections[0]);
    expect(inspectContextDoor(correctedAgain).currentUnderstanding.summary).toContain(
      "The evidence package is ready for bounded review, not accepted.",
    );
    expect(latestCommunication(correctedAgain).content).not.toContain(
      "The evidence package is ready for review, not accepted.",
    );
    expect(
      correctedAgain.lineage.some(
        (entry) =>
          entry.observationId === "observation:event-status-correction-later" &&
          entry.understandingId === correctedAgain.currentUnderstandingId,
      ),
    ).toBe(true);
  });

  it("preserves recipient-specific partly aligned and not-yet-aligned outcomes", () => {
    const contextualised = supplyContext();
    const marcAligned = align(contextualised, "aligned", marc, "event-marc-alignment");
    const disagreed = align(marcAligned, "partly-aligned", cyril, "event-cyril-alignment");

    expect(disagreed.phase).toBe("incomplete");
    expect(disagreed.alignments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: "MARC", status: "aligned" }),
        expect.objectContaining({ recipientId: "Cyril", status: "partly-aligned" }),
      ]),
    );
    expect(disagreed.relationshipMemoryCandidate).toBeUndefined();

    const unknown = align(contextualised, "not-yet-aligned", marc, "event-unknown-alignment");
    expect(unknown.phase).toBe("incomplete");
    expect(unknown.alignments[0].remainingUncertainty).toContain("Meaning remains disputed.");
    expectGovernedRuntimeEvidence(disagreed);
    expectGovernedRuntimeEvidence(unknown);
  });

  it("does not create relationship memory without an invitation", () => {
    const aligned = align(supplyContext());

    expect(aligned.relationshipMemoryCandidate).toBeUndefined();
    expect(aligned.personalMemoryWritePerformed).toBe(false);
    expectGovernedRuntimeEvidence(aligned);
  });

  it("creates only an aligned Understanding candidate after explicit invitation", () => {
    const invited = inviteToRemember(supplyContext());
    const aligned = align(invited);
    const candidate = aligned.relationshipMemoryCandidate;

    expect(candidate).toMatchObject({
      status: "candidate",
      contextItemIds: ["context-current-need", "context-open-question"],
    });
    expect(candidate?.understoodMeaning).toBe(
      inspectContextDoor(aligned).currentUnderstanding.summary,
    );
    expect(candidate).not.toHaveProperty("transcript");
    expect(aligned.personalMemoryWritePerformed).toBe(false);
    expectGovernedRuntimeEvidence(aligned);
  });

  it("refuses a memory candidate when an invitation covers only part of active Context", () => {
    const contextualised = supplyContext();
    const partlyInvited = applyContextDoorEvent(contextualised, {
      ...eventBase("event-partial-invitation", marc, T2),
      type: "remember-invited",
      contextItemIds: ["context-current-need"],
    });
    const aligned = align(partlyInvited);
    const inspection = inspectContextDoor(aligned);

    expect(aligned.contextItems.filter((item) => item.lifecycleStatus === "active"))
      .toHaveLength(2);
    expect(aligned.relationshipMemoryCandidate).toBeUndefined();
    expect(inspection.relationshipMemoryCandidate).toBeUndefined();
    expect(inspection.governanceEvidence).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          eventId: "event-partial-invitation",
          retainedAs: "minimum-hh-governance-evidence",
          evidenceReferences: ["context-current-need"],
        }),
      ]),
    );
    expect(aligned.transcriptStored).toBe(false);
    expect(aligned.personalMemoryWritePerformed).toBe(false);
  });

  it("continues with governed uncontested meaning while recipient disagreement remains visible", () => {
    const contextualised = applyContextDoorEvent(begin(), {
      ...eventBase("event-uncontested-context", marc, T1),
      type: "human-context-supplied",
      items: [
        {
          id: "context-uncontested-role",
          category: "invited-role",
          statement: "Andy may restate the bounded evidence for review.",
          status: "confirmed-supplied",
          relevantTimeframe: "this review",
          reviewTrigger: "the bounded review closes",
        },
      ],
    });
    const communication = latestCommunication(contextualised);
    const marcDisagreed = applyContextDoorEvent(contextualised, {
      ...eventBase("event-marc-disagreement", marc, T2),
      type: "recipient-alignment-supplied",
      communicationId: communication.id,
      recipientId: marc.id,
      status: "partly-aligned",
      reasons: ["MARC says implementation permission remains disputed."],
      remainingUncertainty: ["MARC's implementation-permission account is disputed."],
    });
    const disagreed = applyContextDoorEvent(marcDisagreed, {
      ...eventBase("event-cyril-disagreement", cyril, T3),
      type: "recipient-alignment-supplied",
      communicationId: communication.id,
      recipientId: cyril.id,
      status: "partly-aligned",
      reasons: ["Cyril says implementation permission has already been granted."],
      remainingUncertainty: ["Cyril's implementation-permission account is disputed."],
    });

    expect(communication.content).toContain(
      "Andy may restate the bounded evidence for review.",
    );
    expect(communication.content).not.toMatch(/permission remains disputed|already been granted/);
    expect(communication.judgement.selected.kind).toMatch(/speak|admit-uncertainty/);
    expect(communication.authority.decision).toMatch(/allow/);
    expect(communication.action.state).toBe("ready");
    expect(disagreed.alignments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          recipientId: "MARC",
          status: "partly-aligned",
          reasons: ["MARC says implementation permission remains disputed."],
        }),
        expect.objectContaining({
          recipientId: "Cyril",
          status: "partly-aligned",
          reasons: ["Cyril says implementation permission has already been granted."],
        }),
      ]),
    );
    expect(disagreed.phase).toBe("incomplete");
    expect(disagreed.alignments.every((item) => item.status === "aligned")).toBe(false);
    expect(disagreed.relationshipMemoryCandidate).toBeUndefined();
  });

  it("keeps withdrawal and contextual removal separate from governance evidence", () => {
    const candidate = align(inviteToRemember(supplyContext()));
    const withdrawn = applyContextDoorEvent(candidate, {
      ...eventBase("event-withdrawal", marc, T4),
      type: "invitation-withdrawn",
      invitationId: "event-remember-invitation",
    });
    const removed = applyContextDoorEvent(withdrawn, {
      ...eventBase("event-removal", marc, T5),
      type: "contextual-removal-requested",
      contextItemIds: ["context-current-need"],
      treatment: "remove-relationship-candidate",
      rationale: "The person withdrew the scoped invitation.",
    });
    const noLongerRelevant = applyContextDoorEvent(removed, {
      ...eventBase("event-no-longer-relevant", marc, T6),
      type: "contextual-removal-requested",
      contextItemIds: ["context-open-question"],
      treatment: "no-longer-relevant",
      rationale: "Runtime evidence answered the open question.",
    });

    expect(withdrawn.relationshipMemoryCandidate?.status).toBe("withdrawn");
    expect(removed.relationshipMemoryCandidate?.status).toBe("removed");
    expect(noLongerRelevant.contextItems.find((item) => item.id === "context-open-question"))
      .toMatchObject({ lifecycleStatus: "no-longer-relevant" });
    expect(noLongerRelevant.governanceEvidence.map((item) => item.eventId)).toEqual(
      expect.arrayContaining([
        "event-withdrawal",
        "event-removal",
        "event-no-longer-relevant",
      ]),
    );
    expect(noLongerRelevant.personalMemoryWritePerformed).toBe(false);
    expectGovernedRuntimeEvidence(noLongerRelevant);
  });

  it("marks Context stale and requires attributable reconfirmation", () => {
    const contextualised = supplyContext();
    const stale = applyContextDoorEvent(contextualised, {
      ...eventBase("event-stale", marc, T3),
      type: "context-stale",
      contextItemIds: ["context-current-need"],
      reason: "The review scope changed.",
    });
    const reconfirmed = applyContextDoorEvent(stale, {
      ...eventBase("event-reconfirmed", marc, T4),
      type: "context-reconfirmed",
      contextItemIds: ["context-current-need"],
    });

    expect(inspectContextDoor(stale).contextLifecycle).toContainEqual(
      expect.objectContaining({
        id: "context-current-need",
        lifecycleStatus: "stale",
      }),
    );
    expect(inspectContextDoor(stale).currentUnderstanding.summary).not.toContain(
      "Preserve meaning, correction, and uncertainty.",
    );
    expect(latestCommunication(stale).purpose).toBe("clarification");
    expect(latestCommunication(stale).action.state).toBe("ready");
    expect(inspectContextDoor(reconfirmed).contextLifecycle).toContainEqual(
      expect.objectContaining({
        id: "context-current-need",
        lifecycleStatus: "reconfirmed",
      }),
    );
    expect(inspectContextDoor(reconfirmed).currentUnderstanding.summary).toContain(
      "Preserve meaning, correction, and uncertainty.",
    );
    expect(reconfirmed.phase).toBe("awaiting-recipient-alignment");
    expect(reconfirmed.governanceEvidence.at(-1)?.eventId).toBe("event-reconfirmed");
    expectGovernedRuntimeEvidence(stale);
    expectGovernedRuntimeEvidence(reconfirmed);
  });

  it("emits a de-identified generic Learning candidate as proposal-only", () => {
    const contextualised = supplyContext();
    const proposed = applyContextDoorEvent(contextualised, {
      ...eventBase("event-learning-proposal", marc, T4),
      type: "generic-learning-candidate-proposed",
      content: "Review readiness and evidence acceptance are distinct.",
      sourceUnderstandingIds: [contextualised.currentUnderstandingId],
      deidentificationReview: {
        reviewedBy: "MARC",
        reviewedAt: T4,
        personSpecificContextRemoved: true,
      },
    });

    expect(proposed.learningCandidates[0]).toMatchObject({
      status: "proposal-only",
      destination: "governed-learning-review",
    });
    expect(proposed.learningPromotionPerformed).toBe(false);
    expect(proposed.knowledgeWritePerformed).toBe(false);
    expectGovernedRuntimeEvidence(proposed);
  });

  it("permits a governed clarification while human-required progression remains blocked", () => {
    const understanding = insufficientUnderstanding();
    const judgement = new JudgementEngine().judge({
      understanding,
      candidates: [{ kind: "ask", description: "Ask the human for Context." }],
    });
    const authority = new AuthorityEngine().assess({
      context: {
        actorId: "Andy-HH-0000",
        authorityProfile: "contributor",
        action: "ask",
        subject: "bounded-context-door-clarification",
        riskLevel: "low",
      },
    });
    const action = new ActionEngine().build({
      judgement,
      authority,
      actionId: "action-context-door-clarification",
      now: T1,
    });

    expect(judgement.disposition).toBe("insufficient");
    expect(judgement.requiresHuman).toBe(true);
    expect(authority.decision).toBe("allow");
    expect(action).toMatchObject({
      kind: "ask",
      state: "ready",
      disposition: "execute-with-caution",
      requiresHuman: true,
    });
    expect(begin().deniedOutcomes.every((outcome) => outcome.status === "denied")).toBe(true);
  });

  it("emits an honest unknown with a responsible return path when Understanding remains insufficient", () => {
    const unresolved = applyContextDoorEvent(begin(), {
      ...eventBase("event-genuine-unknown", marc, T1),
      type: "human-context-supplied",
      items: [
        {
          id: "context-genuine-unknown",
          category: "open-uncertainty",
          statement: "The accountable answer is not yet known from the available Context.",
          status: "unresolved",
          relevantTimeframe: "until attributable evidence is available",
          reviewTrigger: "new attributable evidence is supplied",
        },
      ],
    });
    const communication = latestCommunication(unresolved);
    const inspection = inspectContextDoor(unresolved);

    expect(inspection.currentUnderstanding.completeness).not.toBe("sufficient");
    expect(inspection.uncertainty.length).toBeGreaterThan(0);
    expect(communication.judgement.selected.kind).toBe("admit-uncertainty");
    expect(communication.judgement.disposition).not.toBe("proceed");
    expect(communication.authority.decision).toMatch(/allow/);
    expect(communication.action).toMatchObject({
      kind: "admit-uncertainty",
      state: "ready",
      requiresHuman: true,
    });
    expect(communication.content).toMatch(/(?:do not|don't) know/i);
    expect(communication.content).toMatch(/(?:come back|return to you|follow up)/i);
    expect(communication.content).toContain(
      "when the missing information is available",
    );
    expect(communication.content).not.toMatch(
      /(?:background|schedule|remind|I will come back|I'll come back)/i,
    );
    expect(communication.content).toContain(
      "The accountable answer is not yet known from the available Context.",
    );
    expect(unresolved.deniedOutcomes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ effect: "contribution-progression", status: "denied" }),
        expect.objectContaining({ effect: "execution", status: "denied" }),
      ]),
    );
    expect(unresolved.relationshipMemoryCandidate).toBeUndefined();
    expect(unresolved.learningCandidates).toHaveLength(0);
    expect(unresolved.personalMemoryWritePerformed).toBe(false);
    expect(unresolved.knowledgeWritePerformed).toBe(false);
    expect(unresolved.learningPromotionPerformed).toBe(false);
  });

  it("does not turn human-required into arbitrary Action permission", () => {
    const judgement = new JudgementEngine().judge({
      understanding: insufficientUnderstanding(),
      candidates: [{ kind: "act", description: "Perform an unrelated action." }],
    });
    const authority = new AuthorityEngine().assess({
      context: {
        actorId: "Andy-HH-0000",
        authorityProfile: "contributor",
        action: "act",
        riskLevel: "low",
      },
    });
    const action = new ActionEngine().build({ judgement, authority, now: T1 });

    expect(action.kind).toBe("act");
    expect(action.state).toBe("blocked");
    expect(action.disposition).toBe("await-human");
  });

  it("does not emit clarification when Authority denies that communication", () => {
    const judgement = new JudgementEngine().judge({
      understanding: insufficientUnderstanding(),
      candidates: [{ kind: "ask", description: "Ask the human for Context." }],
    });
    const authority = new AuthorityEngine().assess({
      context: {
        actorId: "Andy-HH-0000",
        authorityProfile: "observer",
        action: "ask",
        riskLevel: "low",
      },
    });
    const action = new ActionEngine().build({ judgement, authority, now: T1 });

    expect(authority.decision).toBe("deny");
    expect(action.state).toBe("blocked");
    expect(action.disposition).toBe("do-not-execute");
  });

  it("never stores a transcript or writes personal memory automatically", () => {
    const record = align(inviteToRemember(supplyContext()));
    const inspection = inspectContextDoor(record);

    expect(record.transcriptStored).toBe(false);
    expect(record.personalMemoryWritePerformed).toBe(false);
    expect(inspection.transcriptStored).toBe(false);
    expect(inspection.personalMemoryWritePerformed).toBe(false);
    expect(JSON.stringify(record)).not.toContain("Memory.remember");
    expect(JSON.stringify(record)).not.toContain("PersonContextStore");
  });

  it("never promotes Learning or writes Knowledge automatically", () => {
    const record = supplyContext();

    expect(record.learningCandidates).toHaveLength(0);
    expect(record.learningPromotionPerformed).toBe(false);
    expect(record.knowledgeWritePerformed).toBe(false);
    expect(record.deniedOutcomes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ effect: "learning-promotion", status: "denied" }),
        expect.objectContaining({ effect: "knowledge-promotion", status: "denied" }),
      ]),
    );
  });
});

function insufficientUnderstanding(): Understanding {
  return {
    summary: "Human Context is required before consequential progression.",
    confidence: 0.1,
    uncertainty: ["The human's current Context is unknown."],
    completeness: "insufficient",
    evidenceChain: ["observation-human-context-gap"],
    createdAt: T0,
    updatedAt: T0,
  };
}

function expectGovernedRuntimeEvidence(record: ContextDoorRecord): void {
  const inspection = inspectContextDoor(record);
  const communication = latestCommunication(record);

  expect(inspection.lineage.length).toBeGreaterThan(0);
  expect(inspection.uncertainty.length).toBeGreaterThan(0);
  expect(communication.judgement.understanding.evidenceChain).toBeDefined();
  expect(communication.authority.decision).toBeDefined();
  expect(communication.action.state).toBe("ready");
  expect(record.events.every((event) => event.provenance.length > 0)).toBe(true);
  expect(inspection.contextLifecycle.every((item) => item.effectiveTime.length > 0)).toBe(true);
  expect(record.deniedOutcomes.every((outcome) => outcome.status === "denied")).toBe(true);
}