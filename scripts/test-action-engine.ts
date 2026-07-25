import assert from "node:assert/strict";
import { ActionEngine } from "../lib/action/ActionEngine";
import type { AuthorityAssessment } from "../lib/authority/Authority";
import type { Judgement } from "../lib/judgement/Judgement";

const divider = "----------------------------------------";

function buildJudgement(
  overrides: Partial<Judgement> = {},
): Judgement {
  const now = "2026-07-25T09:15:30.123Z";

  return {
    understanding: {
      summary: "Base understanding",
      confidence: 0.9,
      uncertainty: [],
      createdAt: now,
      updatedAt: now,
    },
    candidates: [
      {
        kind: "ask",
        description: "Ask for clarity.",
      },
      {
        kind: "wait",
        description: "Wait for context.",
      },
      {
        kind: "remain-silent",
        description: "Remain silent intentionally.",
      },
    ],
    selected: {
      kind: "ask",
      description: "Ask for clarity.",
    },
    disposition: "proceed",
    reason: "Base judgement reason.",
    confidence: 0.9,
    uncertainty: [],
    governingPrinciples: [
      {
        id: "people-first",
        name: "People First",
        aliases: ["human-first"],
        definition: "People come before process.",
        status: "core-principle",
        evidenceLevel: "constitutional",
        scope: "helping-hand",
        owner: "Helping Hand Constitution",
        inheritsTo: ["all"],
        relatedConceptIds: ["understanding"],
        sources: [
          {
            documentPath: "constitution/00-PREAMBLE.md",
          },
        ],
        examples: [
          {
            description: "Prioritise safety and dignity.",
          },
        ],
        createdAt: now,
        updatedAt: now,
        createdBy: "test-suite",
      },
    ],
    requiresHuman: false,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

function buildAuthority(
  overrides: Partial<AuthorityAssessment> = {},
): AuthorityAssessment {
  const now = "2026-07-25T09:15:30.123Z";

  return {
    context: {
      actorId: "actor-001",
      authorityProfile: "responsible",
      action: "approve-release",
      riskLevel: "medium",
    },
    decision: "allow",
    level: "standard",
    authorityScore: 0.7,
    reason: "Base authority reason.",
    boundaries: [
      {
        scope: "action-scope",
        description: "Keep within requested action.",
      },
    ],
    requiresHuman: false,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

function main(): void {
  const engine = new ActionEngine();

  console.log("\nHELPING HAND ACTION ENGINE TEST");
  console.log(divider);

  const allowAction = engine.build({
    judgement: buildJudgement({
      disposition: "proceed",
      selected: {
        kind: "ask",
        description: "Ask for clarity.",
      },
    }),
    authority: buildAuthority({
      decision: "allow",
      requiresHuman: false,
    }),
  });

  assert.equal(allowAction.disposition, "execute");
  assert.equal(allowAction.state, "ready");

  const authorityCautionAction = engine.build({
    judgement: buildJudgement({
      disposition: "proceed",
      selected: {
        kind: "advise",
        description: "Advise within limits.",
      },
    }),
    authority: buildAuthority({
      decision: "allow-with-caution",
      requiresHuman: false,
    }),
  });

  assert.equal(
    authorityCautionAction.disposition,
    "execute-with-caution",
  );
  assert.equal(authorityCautionAction.state, "ready");

  const cautionAction = engine.build({
    judgement: buildJudgement({
      disposition: "caution",
      selected: {
        kind: "advise",
        description: "Advise cautiously.",
      },
    }),
    authority: buildAuthority({
      decision: "allow",
      requiresHuman: false,
    }),
  });

  assert.equal(cautionAction.disposition, "execute-with-caution");
  assert.equal(cautionAction.state, "ready");

  const requireHumanAction = engine.build({
    judgement: buildJudgement({
      disposition: "proceed",
      selected: {
        kind: "act",
        description: "Act now.",
      },
    }),
    authority: buildAuthority({
      decision: "require-human",
      requiresHuman: true,
    }),
  });

  assert.equal(requireHumanAction.disposition, "await-human");
  assert.equal(requireHumanAction.state, "blocked");

  const deniedAction = engine.build({
    judgement: buildJudgement({
      disposition: "proceed",
      selected: {
        kind: "act",
        description: "Act now.",
      },
    }),
    authority: buildAuthority({
      decision: "deny",
      requiresHuman: true,
      boundaries: [
        {
          scope: "denial",
          description: "Denied by authority policy.",
        },
      ],
    }),
  });

  assert.equal(
    deniedAction.disposition,
    "do-not-execute",
    "Judgement must never override an authority denial.",
  );
  assert.equal(deniedAction.state, "blocked");

  const judgementHumanRequiredAction = engine.build({
    judgement: buildJudgement({
      disposition: "human-required",
      requiresHuman: true,
      selected: {
        kind: "escalate",
        description: "Escalate to human.",
      },
    }),
    authority: buildAuthority({
      decision: "allow",
      requiresHuman: false,
    }),
  });

  assert.equal(
    judgementHumanRequiredAction.disposition,
    "await-human",
  );
  assert.equal(judgementHumanRequiredAction.state, "blocked");

  const waitAction = engine.build({
    judgement: buildJudgement({
      disposition: "proceed",
      selected: {
        kind: "wait",
        description: "Wait for readiness trigger.",
      },
    }),
    authority: buildAuthority({
      decision: "allow",
      requiresHuman: false,
    }),
  });

  assert.equal(waitAction.disposition, "execute");
  assert.equal(waitAction.state, "planned");

  const silentAction = engine.build({
    judgement: buildJudgement({
      disposition: "proceed",
      selected: {
        kind: "remain-silent",
        description: "Stay silent intentionally.",
      },
    }),
    authority: buildAuthority({
      decision: "allow",
      requiresHuman: false,
    }),
  });

  assert.equal(silentAction.disposition, "execute");
  assert.equal(silentAction.state, "ready");

  const fixedNow = "2026-07-25T10:11:12.345Z";
  const fixedId = "action-test-fixed-id";

  const deterministic = engine.build({
    judgement: buildJudgement(),
    authority: buildAuthority(),
    actionId: fixedId,
    now: fixedNow,
  });

  assert.equal(deterministic.id, fixedId);
  assert.equal(deterministic.createdAt, fixedNow);
  assert.equal(deterministic.updatedAt, fixedNow);

  const mutableJudgement = buildJudgement({
    selected: {
      kind: "ask",
      description: "Ask once.",
    },
    uncertainty: ["Need one more data point."],
  });

  const mutableAuthority = buildAuthority({
    context: {
      actorId: "actor-007",
      authorityProfile: "responsible",
      action: "approve-release",
      riskLevel: "medium",
    },
    boundaries: [
      {
        scope: "action-scope",
        description: "Stay in scope.",
      },
    ],
  });

  const copiedAction = engine.build({
    judgement: mutableJudgement,
    authority: mutableAuthority,
    now: "2026-07-25T11:22:33.444Z",
  });

  assert.notEqual(copiedAction.judgement, mutableJudgement);
  assert.notEqual(copiedAction.authority, mutableAuthority);
  assert.notEqual(
    copiedAction.boundaries,
    mutableAuthority.boundaries,
  );
  assert.notEqual(
    copiedAction.boundaries[0],
    mutableAuthority.boundaries[0],
  );
  assert.notEqual(
    copiedAction.uncertainty,
    mutableJudgement.uncertainty,
  );

  mutableJudgement.selected.kind = "act";
  mutableJudgement.uncertainty.push("Mutated input uncertainty");
  mutableAuthority.context.action = "mutated-input-action";
  mutableAuthority.boundaries[0].scope = "mutated-input-scope";

  assert.equal(copiedAction.judgement.selected.kind, "ask");
  assert.equal(copiedAction.uncertainty.length, 1);
  assert.equal(
    copiedAction.authority.context.action,
    "approve-release",
  );
  assert.equal(copiedAction.boundaries[0].scope, "action-scope");

  copiedAction.judgement.selected.kind = "wait";
  copiedAction.uncertainty.push("Mutated output uncertainty");
  copiedAction.authority.context.action = "mutated-output-action";
  copiedAction.boundaries[0].scope = "mutated-output-scope";

  assert.equal(mutableJudgement.selected.kind, "act");
  assert.equal(mutableJudgement.uncertainty.length, 2);
  assert.equal(mutableAuthority.context.action, "mutated-input-action");
  assert.equal(mutableAuthority.boundaries[0].scope, "mutated-input-scope");

  console.log(`\n${divider}`);
  console.log("All action engine checks passed.");
}

main();
