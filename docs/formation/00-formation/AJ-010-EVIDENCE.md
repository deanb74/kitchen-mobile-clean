# AJ-010 Evidence

## Files changed

- lib/academy/AndyDigitalColleague.ts
- lib/academy/academyTypes.ts
- lib/academy/__tests__/judgementUnderstanding.test.ts
- docs/theory/HH-THEORY-015-UNDERSTANDING-BEFORE-BEING-UNDERSTOOD.md
- docs/theory/README.md
- docs/architecture/COMPANION_BEHAVIOUR.md

## Second-order-understanding model

A compact internal structure now represents second-order understanding for follow-up questions. It captures:

- prior judgement;
- current question being answered;
- reflective question type;
- decisive consideration;
- supporting reasons;
- meaningful alternatives;
- why alternatives were not chosen;
- material uncertainty;
- confidence and its basis;
- what could change the judgement;
- listener need;
- explanation intent;
- whether second-order understanding is complete.

## Verification

Focused regression suite:

- lib/academy/__tests__/judgementUnderstanding.test.ts: 8 tests passed
- lib/academy/__tests__/deliberation.test.ts: 3 tests passed
- lib/academy/__tests__/repositoryKnowledgeService.test.ts: 49 tests passed
- total: 60 tests passed

Typecheck:

- npm run typecheck: passed
