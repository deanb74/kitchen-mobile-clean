import assert from "node:assert/strict";
import type { AuthorityContext } from "../lib/authority/Authority";
import { AuthorityEngine } from "../lib/authority/AuthorityEngine";

const divider = "----------------------------------------";

function buildContext(
  overrides: Partial<AuthorityContext> = {},
): AuthorityContext {
  return {
    actorId: "actor-001",
    authorityProfile: "responsible",
    action: "review-procedure",
    riskLevel: "medium",
    ...overrides,
  };
}

function main(): void {
  const engine = new AuthorityEngine();

  console.log("\nHELPING HAND AUTHORITY ENGINE TEST");
  console.log(divider);

  const allow = engine.assess({
    context: buildContext({
      authorityProfile: "contributor",
      riskLevel: "low",
      action: "note-observation",
    }),
  });

  console.log("\nAllow case");
  console.log(`Decision: ${allow.decision}`);
  console.log(`Level: ${allow.level}`);
  console.log(`Authority score: ${allow.authorityScore}`);

  assert.equal(allow.decision, "allow");
  assert.equal(allow.level, "limited");
  assert.equal(allow.requiresHuman, false);
  assert.equal(allow.authorityScore, 0.4);

  const caution = engine.assess({
    context: buildContext({
      authorityProfile: "contributor",
      riskLevel: "medium",
      action: "update-shared-note",
    }),
  });

  console.log("\nAllow-with-caution case");
  console.log(`Decision: ${caution.decision}`);
  console.log(`Level: ${caution.level}`);
  console.log(`Authority score: ${caution.authorityScore}`);

  assert.equal(caution.decision, "allow-with-caution");
  assert.equal(caution.level, "limited");
  assert.equal(caution.requiresHuman, false);
  assert.equal(caution.authorityScore, 0.2);
  assert.ok(
    caution.boundaries.some(
      (boundary) => boundary.scope === "caution",
    ),
  );

  const humanRequired = engine.assess({
    context: buildContext({
      authorityProfile: "responsible",
      riskLevel: "critical",
      action: "override-safety-lock",
    }),
  });

  console.log("\nRequire-human case");
  console.log(`Decision: ${humanRequired.decision}`);
  console.log(`Level: ${humanRequired.level}`);
  console.log(`Authority score: ${humanRequired.authorityScore}`);

  assert.equal(humanRequired.decision, "require-human");
  assert.equal(humanRequired.level, "standard");
  assert.equal(humanRequired.requiresHuman, true);
  assert.equal(humanRequired.authorityScore, 0.1);
  assert.ok(
    humanRequired.boundaries.some(
      (boundary) => boundary.scope === "escalation",
    ),
  );

  const deny = engine.assess({
    context: buildContext({
      authorityProfile: "observer",
      riskLevel: "low",
      action: "execute-financial-transfer",
    }),
  });

  console.log("\nDeny case");
  console.log(`Decision: ${deny.decision}`);
  console.log(`Level: ${deny.level}`);
  console.log(`Authority score: ${deny.authorityScore}`);

  assert.equal(deny.decision, "deny");
  assert.equal(deny.level, "none");
  assert.equal(deny.requiresHuman, true);
  assert.equal(deny.authorityScore, 0);
  assert.ok(
    deny.boundaries.some(
      (boundary) => boundary.scope === "denial",
    ),
  );

  const mutableContext = buildContext({
    authorityProfile: "accountable",
    riskLevel: "high",
    action: "approve-release",
  });

  const copied = engine.assess({
    context: mutableContext,
  });

  copied.context.riskLevel = "low";

  assert.equal(
    mutableContext.riskLevel,
    "high",
    "Returned context should be a copy, not a shared object.",
  );

  mutableContext.action = "mutated-original-action";

  assert.equal(
    copied.context.action,
    "approve-release",
    "Assessment context should not change when the original input is mutated.",
  );

  console.log(`\n${divider}`);
  console.log("All authority engine checks passed.");
}

main();
