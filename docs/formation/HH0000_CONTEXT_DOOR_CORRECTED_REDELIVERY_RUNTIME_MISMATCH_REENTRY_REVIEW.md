# HH-0000 Context Door Corrected-Redelivery Runtime Mismatch Re-entry Review

**Status:** AUTHORISED BOUNDED CORRECTION
**Decision date:** 2026-08-10
**Subject:** HH-0000 Context Door Version 1 corrected redelivery
**Decision owners:** MARC - Humanity / Formation; Cyril - Digital / Technology / Platform
**Decision scope:** Focused Combined Authority re-entry for the corrected-redelivery runtime mismatch only
**Implementation effect:** One bounded correction to Context Door correction-to-redelivery selection is authorised

## Review Boundary

This review determines the governed relationship between:

1. historical or superseded Understanding;
2. current Understanding;
3. correction provenance; and
4. human-facing communication after correction.

It does not modify runtime or tests, reopen the broader Context Door design, revisit unrelated gates or decisions, rewrite historical evidence, or begin live formation use.

## Trigger and Observed Evidence

The canonical re-entry trigger applies because a focused executable test contradicted the accepted correction-redelivery behavior.

The four focused evidence cases genuinely executed with these results:

1. partial-invitation refusal - passed;
2. uncontested progress during disagreement - passed;
3. honest-unknown responsible return path - passed;
4. corrected redelivery - failed.

The corrected-redelivery execution demonstrated that:

1. the original interpretation remained inspectable;
2. the correction was appended with attributable provenance;
3. a new Understanding was formed and included the corrected meaning;
4. the subsequent governed communication included the corrected meaning;
5. the same communication also presented the superseded interpretation as an unqualified current statement.

Observed communication:

> MARC supplied attributable human-interpretation Context: The evidence package is accepted. MARC corrects context-review-status: The evidence package is ready for review, not accepted. Remaining uncertainty: Urgency is unknown. Risk level has not been assessed.

The failure is not destructive history handling. It is selection and presentation of current meaning in the human-facing corrected redelivery.

## Governing Sources Applied

The proposed current-versus-superseded distinction was tested against:

1. `constitution/02-CONSTITUTION.md` - seek first to understand, truth before certainty, and communication as transfer of Understanding;
2. `docs/theory/003-THEORY-OF-UNDERSTANDING.md` - Understanding is contextual meaning rather than recall and preserves uncertainty;
3. `docs/theory/007-THEORY-OF-CONTEXT.md` - Context determines current interpretation and relevance without changing historical information;
4. `docs/theory/001-THEORY-OF-MEMORY.md` - Memory is selective and preserves continuing significance rather than everything;
5. `docs/architecture/CANONICAL-REASONING-RECORD.md` - corrections preserve provenance and later stages do not silently rewrite earlier stages;
6. `docs/architecture/REASONING-LIFECYCLE.md` - corrections append, continuity is preserved, and lifecycle status reflects the newest accepted transition;
7. `docs/formation/HH0000_CONTEXT_DOOR_GOVERNANCE_DECISION.md` - rejected interpretation must not survive as true; Andy reframes and redelivers the resulting Understanding while minimum correction lineage remains separately available;
8. `docs/formation/HH0000_CONTEXT_DOOR_PRE_IMPLEMENTATION_EVIDENCE_PACKAGE.md` - `INT-001` remains visible as superseded provenance while `RST-002-A` communicates corrected `UND-004` as current meaning;
9. `docs/formation/HH0000_CONTEXT_DOOR_PRE_IMPLEMENTATION_GATE.md` - corrections remain append-only and prior interpretation remains visible without being silently rewritten.

These sources distinguish preservation from presentation. None requires superseded meaning to remain part of ordinary current redelivery.

## MARC Assessment - Humanity / Formation

Communication after correction must accurately represent what Andy now understands. Presenting an incorrect interpretation and its correction as two unqualified current statements asks the person to resolve a contradiction that the correction has already resolved. That weakens clarity, misrepresents the current relationship Understanding, and risks making the person repeat a correction they already supplied.

Andy should preserve enough correction history to explain how Understanding changed. This supports trust because a mistake is neither hidden nor silently rewritten. The preserved history belongs in inspectable provenance and may be acknowledged conversationally when acknowledging the misunderstanding helps the person understand the change.

Acknowledging prior misunderstanding is useful when:

1. it takes responsibility for a material misinterpretation;
2. it explains why the corrected redelivery differs;
3. it helps the recipient verify that the correction was understood;
4. the prior meaning is explicitly marked as previous, mistaken, rejected, or superseded.

It is not useful when replaying it creates ambiguity about what Andy currently understands, needlessly repeats sensitive wording, or presents rejected meaning as still operative.

**MARC conclusion:** Ordinary corrected redelivery must communicate current Understanding. Minimum correction history remains inspectable. Historical meaning may be mentioned only with explicit temporal and supersession framing. No new Humanity / Formation principle is required.

## Cyril Assessment - Digital / Technology / Platform

Current and superseded Understanding can be distinguished without destructive history. The existing Context Door record already contains:

1. immutable events;
2. original Context items;
3. append-only correction records linked to their targets;
4. multiple Understanding records and a `currentUnderstandingId`;
5. lineage linking Observations, Translations, Understanding, and source events;
6. a separate human-facing communication record.

These existing structures are sufficient to retain the original interpretation and correction provenance while selecting corrected current meaning for redelivery. A superseded interpretation can also be referenced as history by explicitly labeling its former status and its correction; doing so does not make it current again.

The defect is local to how Context Door forms or selects the corrected current restatement from its existing correction lifecycle. It does not require a new state store, event type, cognitive layer, Authority rule, memory mechanism, dialogue engine, model dependency, or governance concept.

The distinction is deterministically testable through the existing public Context Door surface.

**Cyril conclusion:** The mismatch is a bounded correction-selection and communication-presentation defect. No architectural re-entry is required.

## Current-versus-Superseded Understanding Rule

### Current Understanding

Current Understanding is the newest formed Understanding accepted by the Context Door lifecycle after applying attributable corrections and current Context. It carries the meaning presently used for Judgement, Authority, redelivery, alignment, and any later consented memory candidacy. It preserves unresolved uncertainty and does not silently erase unaffected current meaning.

### Superseded Understanding

Superseded Understanding is a prior interpretation, statement, or formed meaning whose operative meaning has been corrected, contradicted, or replaced by a later attributable correction. It remains historically real as evidence of what was previously understood, but it is not concurrently current and must not govern current redelivery, alignment, or memory candidacy as though true.

### Unresolved Disagreement Is Different

A disputed account is not automatically superseded. Where no correction has established a resulting current meaning, each attributable position and uncertainty remains visible under the existing disagreement rules. This decision applies only to attributable correction and supersession; it does not let one disputed version silently win.

## Provenance Treatment

Append-only provenance remains unchanged. The runtime must continue to preserve, as applicable:

1. the original Context item or interpretation;
2. its Observation and Translation references;
3. the prior Understanding record;
4. the correction event, provider, relationship, event time, and provenance;
5. the resulting Understanding and lineage;
6. the governed communication and later recipient-alignment result.

Preserving history does not make every historical meaning part of current communication. Inspection may show the full correction chain with explicit lifecycle status. No prior record may be deleted, rewritten, or relabeled into a false history.

## Communication Treatment

Ordinary corrected redelivery must:

1. communicate the corrected current Understanding;
2. include unaffected current meaning that remains relevant;
3. preserve current uncertainty;
4. exclude superseded meaning as an unqualified current claim;
5. remain linked to inspectable correction provenance;
6. continue through the existing Judgement, Authority, and Action boundary.

A superseded interpretation may appear in communication only when it is useful to explain or acknowledge the correction and is explicitly framed as historical or mistaken. Permitted meaning includes:

> I previously understood X, but after your correction I now understand Y.

This example defines a relationship between meanings; it is not a mandatory phrase or scripted personality. The communication must make clear that Y, not X, is current.

The runtime must never:

1. present superseded and corrected meanings as concurrently current;
2. silently delete or rewrite the prior interpretation or correction;
3. retain a rejected interpretation as truth, Knowledge, or relationship-memory meaning;
4. hide unresolved uncertainty or unrelated disagreement;
5. treat a correction provider as acquiring broader Authority;
6. enable contribution, execution, memory writing, Learning promotion, or Knowledge change;
7. convert this correction into generic dialogue rewriting.

## Combined Authority Decision

**Outcome:** AUTHORISED BOUNDED CORRECTION

MARC and Cyril independently conclude that the candidate distinction is already supported by constitutional, Theory, architecture, and Context Door governance:

> Current Understanding is communicated. Superseded Understanding remains available as provenance and must not be presented as current meaning.

Historical meaning may be explicitly acknowledged as superseded where that improves truthful explanation. It must not be presented as concurrently current.

No new governance decision or architectural component is required.

## Exact Permitted Runtime Correction

The repair may change only the existing Context Door correction-to-Understanding and corrected-redelivery selection needed to:

1. keep original and corrected records append-only and inspectable;
2. prevent a corrected target's superseded operative meaning from appearing as an unqualified current claim in the newly formed current Understanding or ordinary redelivery;
3. preserve unaffected current evidence and unresolved uncertainty;
4. optionally reference the prior meaning only with explicit historical or superseded framing;
5. keep the existing `Observation -> Translation -> Understanding -> Judgement -> Authority -> Action` separation unchanged.

The repair must remain inside `lib/academy/formation/contextDoor.ts` and its focused tests unless execution proves that this existing surface cannot express the governed distinction. It must not change shared formation, Understanding, Judgement, Authority, Action, Memory, Learning, or Knowledge behavior.

This permission does not authorise a general supersession engine, generic communication rewriter, transcript processor, dialogue state, new persistence, new event category, new Authority semantics, model-specific behavior, or unrelated Context Door capability.

## Required Executable Evidence

After repair, focused evidence must demonstrate that:

1. the original interpretation remains inspectable and unchanged;
2. the correction is appended with provider, event time, relationship, provenance, and target linkage;
3. the prior Understanding remains inspectable as historical;
4. the newest current Understanding reflects the correction;
5. ordinary corrected redelivery communicates the corrected current meaning;
6. the superseded meaning is absent as an unqualified current claim;
7. if historical meaning is mentioned, it is explicitly marked as previous or superseded and the corrected meaning is unmistakably current;
8. unaffected current meaning and unresolved uncertainty remain present;
9. Judgement, Authority, Action, denied outcomes, no-write, and no-promotion boundaries remain unchanged;
10. a later correction appends another event and current transition without rewriting either earlier record;
11. the four focused evidence cases all pass;
12. the complete Context Door suite, affected cognitive and Andy regressions, full repository suite, TypeScript, targeted lint, documentation validation, diagnostics, forbidden-write scan, and diff hygiene pass before the runtime evidence review is updated.

Passing these tests closes only this mismatch. It does not prove live-human behavior, general Context Door validity, Andy's formation, or formation completion.

## Re-entry Implications

No broader governance or architectural re-entry is required for the authorised correction. Return to Combined Authority before implementation expands if the existing Context Door surface cannot express current-versus-superseded selection without:

1. destructive history changes;
2. shared cognitive-contract changes;
3. a new persistence or lifecycle authority;
4. new dialogue or model behavior;
5. weakening provenance, uncertainty, recipient alignment, or no-write boundaries.

## Live Formation Status

**FIRST BOUNDED LIVE FORMATION USE REMAINS BLOCKED.**

The corrected-redelivery repair has not been implemented or validated. The existing runtime evidence review remains unchanged. No live-human behavior or completed formation stage is established by this decision.

## Traceability

**Principle:** `constitution/02-CONSTITUTION.md`; `constitution/05-AUTHORITY-AND-STEWARDSHIP.md`.
**Theory:** `docs/theory/001-THEORY-OF-MEMORY.md`; `docs/theory/003-THEORY-OF-UNDERSTANDING.md`; `docs/theory/007-THEORY-OF-CONTEXT.md`.
**Architecture:** `docs/architecture/CANONICAL-REASONING-RECORD.md`; `docs/architecture/REASONING-LIFECYCLE.md`; existing Context Door correction and communication records.
**Engineering:** Narrow correction authorised within `docs/formation/HH0000_CONTEXT_DOOR_PRE_IMPLEMENTATION_GATE.md`; no implementation performed by this review.
**Milestone:** Not Applicable - no milestone or formation completion is claimed.
**Evidence:** Focused corrected-redelivery failure in `lib/academy/formation/__tests__/context-door.test.ts`; this re-entry decision.

## Exact Next Step

Implement only the authorised Context Door correction-to-current-redelivery selection, then execute the required evidence and validation sequence. Do not begin live formation use before all four focused cases pass and the existing runtime evidence review is updated from executable evidence.