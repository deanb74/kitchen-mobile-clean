# Repository Governance Review — Strategic Insights Register

**Date:** 2026-08-04  
**Scope:** `docs/STRATEGIC_INSIGHTS_REGISTER.md` and `docs/STRATEGIC_INSIGHTS_REVIEW_001.md`  
**Type:** Governance review only — no files modified, no documents created

---

> The objective is not to improve individual entries. The objective is to determine whether Helping Hand now has an appropriate organisational process for capturing, reviewing, governing and eventually implementing strategic insight.

---

## 1. Executive Summary

The Strategic Insights Register is a sound organisational capability. It is well-structured, founder-supplied, and currently contains 30 entries spanning the full intended scope of Helping Hand. Repository Review 001 provides a substantive analysis grounded in actual repository evidence.

The register is not yet formally institutionalised. It is a candidate mechanism operating without a defined review cadence, a formal relationship to the existing governance and institutional machinery, or a clear owner beyond the founding team.

The most significant governance gap is not in the register itself. It is in the absence of an explicit organisational process connecting the register's lifecycle to the mechanisms that already exist — the Institutional Operating Model, the Ratification Process, and the volume/milestone handover system.

Everything needed to institutionalise the register already exists in the repository. The smallest improvement is to wire the register into the existing institutional review cadence rather than create new governance structures.

---

## 2. Governance Assessment

### Area 1 — Governance Lifecycle

**Current state:** The status lifecycle defined in the register is:

Captured → Under Review → Approved → Planned → In Progress → Implemented → Inherited → Superseded → Archived

**Assessment:** The lifecycle is structurally sound and maps well to Helping Hand's existing evidence-led model. "Inherited" correctly captures the specific terminal state where a capability has become part of the COS inheritance model — this is a Helping Hand-specific state not found in generic product registries, and its presence is a strength.

One genuine gap exists: there is no state that distinguishes between "this insight was reviewed and the organisation chose not to pursue it at this time" and "this insight was reviewed and permanently rejected." Both outcomes are possible; conflating them with "Archived" loses organisational reasoning.

**Recommendation:** Add a single state — **Deferred** — defined as: "Reviewed and consciously set aside pending a specific condition." This differs from Archived (permanent retirement) and from Captured (not yet reviewed). It prevents the register from becoming an unfocused accumulation of unreviewed entries while preserving the insight.

The justification is the `PREVIOUSLY_DISCUSSED` register's own Recommended Destination table, which distinguishes "reconcile before choosing a destination" from outright retirement. Deferred is the equivalent state for strategic insights.

**No other states are justified** by repository evidence. The lifecycle is otherwise proportionate.

---

### Area 2 — Repository Reviews

**Current state:** Repository Review 001 exists as an ad hoc document (`docs/STRATEGIC_INSIGHTS_REVIEW_001.md`). It was produced in response to the SIR being populated, not by a defined trigger.

**Assessment:** The review is substantive and evidenced. The risk is that it remains a one-off rather than becoming a repeating organisational practice. `docs/INSTITUTIONAL_OPERATING_MODEL.md` defines an institutional learning loop (Reality → Evidence → Reflection → Institutional Learning → Standards Updated → Future DCs Improve). Repository Reviews should be an expression of that loop applied to strategic insight, not an independent artefact.

**What should trigger a Repository Review:**
- When 10 or more new SIR entries have been added since the last review
- When a volume is completed (the handover system already defines volume completion as a natural review point)
- When a strategic insight is being proposed for elevation from Captured to Approved
- When a Founder Decision from a previous review has been resolved

**What a Repository Review should produce:**
- Classification and alignment updates for new entries
- Founder decisions required (as Review 001 demonstrates)
- Recommended status changes (not applied automatically — founder-approved)
- A record of which SIR entries have influenced architecture or implementation since the last review

**Where they should live:** `docs/STRATEGIC_INSIGHTS_REVIEW_002.md`, `_003.md`, etc. — the same convention as Review 001. The format is already established and should not be redesigned.

**Recommended trigger formalisation:** Add a single paragraph to the existing `docs/STRATEGIC_INSIGHTS_REGISTER.md` under the "Review Cadence" section, referencing the review trigger conditions. This extends the existing review cadence section rather than creating a new document.

---

### Area 3 — Relationship to PREVIOUSLY_DISCUSSED

**Current state:** The relationship table in `docs/STRATEGIC_INSIGHTS_REGISTER.md` correctly distinguishes the two:
- PREVIOUSLY_DISCUSSED: preserves previous organisational reasoning
- Strategic Insights Register: preserves future organisational opportunity

**Assessment:** The distinction is correct in principle. The operational relationship is incomplete. Two gaps exist:

1. **No explicit routing rule.** A discussion can produce both a PREVIOUSLY_DISCUSSED entry (the reasoning) and one or more SIR entries (the future opportunities the reasoning identified). There is no guidance on when a discussion should produce a PD entry, an SIR entry, or both. Without this, the boundary will blur over time.

2. **No cross-reference standard.** PD-001 references the PREVIOUSLY_DISCUSSED mechanism. The SIR entries do not reference their PD origin (if any). If PD-001 produced SIR entries, those entries should link to PD-001 so the origin of the insight is traceable.

**Recommendations:**
- The routing rule is simple: PREVIOUSLY_DISCUSSED captures reasoning about existing or recently proposed work; the SIR captures identified future possibilities. A discussion that produces both reasoning and future insight should produce entries in both. This can be stated in one sentence added to the Relationship table in the SIR register.
- Cross-referencing should be a field in the SIR entry template: "**Origin Discussion:** [PD-XXX if applicable, else Founder Discussion]." The current "Origin" field records the type but not the specific discussion record. Traceability is incomplete.

---

### Area 4 — Relationship to Architecture

**Current state:** No existing architectural document has a step requiring review of the SIR or PREVIOUSLY_DISCUSSED before proposing new architecture. `docs/architecture/HELPING_HAND_RATIFICATION_PROCESS.md` (HH-GOV-003) begins at "Proposal" — there is no pre-proposal discovery step.

**Assessment:** This is the most practically significant governance gap. Repository Review 001 identified 6 entries as Already Architected and 3 as Already Documented — meaning architecture work has already addressed those insights, probably without the SIR having existed. Going forward, architecture may be proposed without checking whether the SIR has already captured a related insight or contains relevant Founder Decisions that should inform the architecture.

`docs/PREVIOUSLY_DISCUSSED.md` already recommends adding a step 0 (Prior Reasoning Discovery) to the Ratification Process. The same logic applies to the SIR: before a new architectural proposal reaches step 1 (Proposal), the proposer should confirm whether any SIR entry is relevant.

**Recommendation:** The integration point is already identified in `docs/PREVIOUSLY_DISCUSSED.md` under "Integration Recommendations." The smallest improvement is to confirm that the Ratification Process step 0 covers both PREVIOUSLY_DISCUSSED and the SIR. This requires a single line addition to the Ratification Process document when it is next updated — not a new document.

---

### Area 5 — Relationship to Evidence

**Current state:** The SIR lifecycle includes Implemented and Inherited as terminal states. There is no guidance on what evidence standard is required before an insight moves from Approved → Planned → In Progress → Implemented. The existing evidence machinery (`docs/proofs/`, HOER, Institutional Reviews) is fully capable of supporting this, but there is no explicit connection.

**Assessment:** Applying the full HOER → Proof → Institutional Review → Institutional Decision chain to every SIR entry would be disproportionate. Most SIR entries will eventually become ordinary engineering work. The risk is at the other end: major strategic insights (SIR-011 Healthcare, SIR-009 Emotional Intelligence) that carry significant safety or authority implications will require evidence standards that are not currently specified.

**Recommendation:** The SIR's Priority field (Foundational / High / Medium / Low) already provides the natural mechanism for distinguishing evidence requirements:
- Routine implementation: standard engineering evidence (typecheck, tests, implementation report)
- High priority, external-facing, safety-relevant: HOER → Proof → Institutional Review
- Major Programme (Future Professions, Healthcare): full evidence chain including professional authority validation

No new governance machinery is needed — the existing standards apply at the appropriate priority level. This proportionate approach should be noted in the SIR's relationship-to-evidence section.

---

### Area 6 — Board Governance

**Current state:** The SIR states "reviewed periodically by the Founding Board" without defining what "periodically" means. No board meeting cadence is defined in any current governance document.

**Assessment:** A calendar-based cadence (quarterly) is premature for a project at Stage 1. Helping Hand's existing governance model is evidence-triggered rather than calendar-triggered, as defined in `docs/INSTITUTIONAL_OPERATING_MODEL.md`. The SIR review cadence should align with this.

The most natural governance moments are:
- **Volume completion** — the handover system already defines these as reflection points; adding an SIR review to a volume handover is zero additional overhead and consistent with how the organisation has been operating.
- **When an SIR entry is proposed for elevation to Approved** — this naturally requires a board discussion.
- **When a Founder Decision from a previous Repository Review is resolved** — this closes a loop and should be recorded.

**Recommendation:** Define the SIR review cadence as: "At each volume completion, and whenever a Strategic Insight is proposed for elevation from Captured to Approved." This is evidence-triggered, proportionate, and consistent with the existing institutional model. Calendar-triggered reviews are not yet warranted.

---

### Area 7 — Scalability

**Current state:** The SIR is a single markdown file containing a register table plus 30 individual entry sections. At 30 entries the current structure is manageable.

**Assessment:** At 100 entries, a single file containing both the register table and all entry detail sections will become difficult to navigate. The register table will remain useful as an index, but individual entry detail sections will be hard to find and cross-reference. At 200–300 entries spanning multiple years, the single-file structure would likely break down entirely.

**Recommended minimal evolution (not immediate — applicable at 50+ entries):**
- Move individual entry detail sections into a `docs/strategic-insights/` subdirectory, one file per entry (e.g. `SIR-001.md`), matching the existing pattern of `docs/previously-discussed/PD-001.md`.
- Retain the register table as the single navigable index.

**This change is not warranted now.** The current single-file structure is appropriate for 30–50 entries. The recommendation is to make this evolution when entries approach 50, not immediately.

---

### Area 8 — Founder Workflow

**Current state:** The proposed cycle is:

```
Conversation
    ↓
PREVIOUSLY_DISCUSSED
    ↓
Strategic Insight
    ↓
Repository Review
    ↓
Architecture
    ↓
Implementation
    ↓
Evidence
    ↓
Inheritance
```

**Assessment:** The cycle is structurally sound and consistent with `docs/OPERATING_MODEL.md`'s operating cycle. Two stages are underspecified:

1. **Between Repository Review and Architecture:** Repository Review 001 produced Founder Decisions. There is no step that records what those decisions resolved to. The missing step is **Founder Decision Resolution** — when a decision from a Repository Review is made, it should be recorded and the relevant SIR entry updated. This is not a new document; it is a discipline within the existing SIR review process.

2. **Between Evidence and Inheritance:** The existing institutional model (HOER → Proof → Institutional Review → Institutional Decision) covers significant capabilities well. For smaller SIR entries that reach implementation through ordinary engineering work, there is no explicit trigger for the Implemented → Inherited transition. The existing Capability Promotion Register (`docs/architecture/CAPABILITY-PROMOTION-REGISTER.md`) is the correct mechanism for this. The SIR and the Capability Promotion Register should reference each other, but no new process is needed.

**The founder workflow is substantially complete.** The two gaps are discipline gaps (recording decisions, marking inheritance) rather than structural gaps (missing stages).

---

### Area 9 — Organisational Maturity

Based on repository evidence only:

**What the creation of the Strategic Insights Register demonstrates:**

The register's existence, combined with PD-001, the Repository Review, and the governance review, demonstrates that Helping Hand has moved from a primarily engineering-and-evidence mode into an organisational operating mode. The repository now contains:
- A constitutional layer (Released)
- An institutional layer (Active)
- An organisational learning layer (Operating)
- A strategic insight layer (Candidate — just created)

These four layers are all present and interconnected. That is objectively more mature than most early-stage technology organisations at an equivalent stage of product development.

**What the evidence does not yet demonstrate:**

- The founder workflow described above has not yet been exercised. PREVIOUSLY_DISCUSSED has one entry (PD-001). The SIR has 30 entries but no entry has moved beyond "Captured." The mechanisms exist; the cycle has not yet completed.
- The board has not yet operated as Helping Hand's first learning organisation in the formal sense described in PD-001. Board responsibilities are documented in the SIR as candidate understanding, not as settled operating practice.
- The SIR and PREVIOUSLY_DISCUSSED are both still Candidate mechanisms awaiting institutional review.

**The honest assessment:** Helping Hand has strong organisational thinking and weak organisational practice — not because the practice is poor, but because the organisation is at Stage 1 and the operational evidence cycle has only recently begun. The governance machinery is ahead of the evidence base that will validate it. This is appropriate for the stage. The risk is that the governance machinery continues to grow faster than the evidence base.

The Volume VIII exit criterion applies here as much as anywhere: "The framework is complete enough. Future confidence will be earned through execution." The SIR and PREVIOUSLY_DISCUSSED are complete enough. The next maturity step is exercising them through real decisions, not extending them further.

---

## 3. Strengths

1. **Clear purpose distinction** — the SIR is correctly positioned as a future-opportunity register, distinct from the PREVIOUSLY_DISCUSSED reasoning register, the Roadmap, and the Engineering Backlog. No existing document serves the same purpose.

2. **Status lifecycle is appropriate** — the Captured → Implemented → Inherited progression correctly reflects Helping Hand's evidence-led model and includes the Helping Hand-specific "Inherited" state.

3. **Priority field reflects strategic importance, not implementation urgency** — this is an unusual and genuinely useful distinction that most product registers do not make. It prevents implementation pressure from displacing strategic importance.

4. **Repository Review 001 is substantive** — it is grounded in actual repository evidence, not inference. The alignment classifications are honestly differentiated. The Founder Decisions section correctly identifies decisions only founders can make without prescribing answers.

5. **Relationship to existing governance** — the SIR's relationship table already references PREVIOUSLY_DISCUSSED, the Roadmap, and the Engineering Backlog at the right level of abstraction.

6. **Cluster analysis in Review 001** — the seven capability clusters correctly identify shared dependencies and natural sequencing. This is more useful than treating each SIR entry as an independent item.

---

## 4. Gaps

1. **No Deferred status** — insights reviewed and consciously set aside (not archived, not rejected) have no home in the current lifecycle.

2. **No explicit routing rule between PREVIOUSLY_DISCUSSED and SIR** — when a discussion ends, it is not clear whether it produces a PD entry, an SIR entry, or both, or how to decide.

3. **No cross-reference from SIR entries to their origin discussions** — the Origin field records "Founder Discussion" but does not link to a specific PD entry. Traceability is incomplete.

4. **No pre-architecture consultation step** — the Ratification Process begins at "Proposal" without a prior step requiring review of the SIR or PREVIOUSLY_DISCUSSED.

5. **No review cadence defined** — "periodic review by the Founding Board" is not operationalised. It will default to never without a defined trigger.

6. **Founder Decisions from Repository Reviews are untracked** — Review 001 produced eight Founder Decisions. There is no mechanism to record when and how those decisions are resolved.

7. **The SIR and the Capability Promotion Register are not cross-referenced** — when an SIR insight eventually reaches Implemented, the appropriate Capability Promotion review is not referenced as the mechanism for reaching Inherited.

8. **The SIR is a Candidate mechanism with no defined institutional review path** — like PREVIOUSLY_DISCUSSED, it should be reviewed through the institutional process before it is treated as a settled organisational tool.

---

## 5. Recommended Organisational Process

The smallest sufficient organisational process for the Strategic Insights Register has five components:

**Component 1 — Capture discipline**
Any significant founder or board discussion that identifies a future strategic possibility should produce an SIR entry before the conversation closes. The PREVIOUSLY_DISCUSSED register captures the reasoning; the SIR entry captures the possibility. These are complementary, not alternatives. The trigger is the conversation itself, not a formal process step.

**Component 2 — Repository Review trigger**
A Repository Review should be conducted:
- at each volume completion (wired into the existing handover process);
- when 10 or more new SIR entries have been added since the last review;
- when an SIR entry is proposed for elevation from Captured to Approved.

Repository Reviews do not create commitments. They produce Founder Decisions and recommended status changes.

**Component 3 — Founder Decision recording**
When a Founder Decision from a Repository Review is resolved, the resolution should be recorded in the next Repository Review or as an addendum to the relevant SIR entry. Unresolved Founder Decisions from previous reviews should appear in the next review.

**Component 4 — Pre-architecture consultation**
Before any significant architectural proposal is submitted through the Ratification Process, the proposer should confirm whether any SIR entry is relevant. Relevant entries should be cited in the proposal. This extends the existing prior reasoning discovery step already recommended for PREVIOUSLY_DISCUSSED — it does not add a new process step.

**Component 5 — Institutional review of the mechanism itself**
The SIR (as a mechanism, not as individual entries) should be submitted for institutional review through the existing process (`docs/institution/README.md` and `docs/INSTITUTIONAL_OPERATING_MODEL.md`) before it is treated as a settled organisational tool. The same applies to PREVIOUSLY_DISCUSSED. Both are currently candidates. Institutional acceptance would allow them to be referenced in the Ratification Process as required pre-steps.

---

## 6. Minimal Repository Improvements

The following are the smallest changes that would close the identified gaps. None require new documents.

| Gap | Minimal improvement | Location | When |
|-----|--------------------|-----------| -----|
| No Deferred status | Add "Deferred: Reviewed and consciously set aside pending a specific condition" to the Status Lifecycle table | `STRATEGIC_INSIGHTS_REGISTER.md` | Next founder review |
| No routing rule | Add one sentence to the Relationship table: "A discussion that identifies both past reasoning and future possibility should produce entries in both registers." | `STRATEGIC_INSIGHTS_REGISTER.md` | Next founder review |
| No origin cross-reference | Add "**Origin Discussion:** [PD-XXX if applicable]" to the entry template | `STRATEGIC_INSIGHTS_REGISTER.md` | Next founder review |
| No review cadence | Replace "periodically" with the three trigger conditions in the Review Cadence section | `STRATEGIC_INSIGHTS_REGISTER.md` | Next founder review |
| No pre-architecture step | When the Ratification Process is next amended, add SIR consultation to step 0 alongside PREVIOUSLY_DISCUSSED | `docs/architecture/HELPING_HAND_RATIFICATION_PROCESS.md` | After both mechanisms are institutionally accepted |
| SIR and Capability Promotion Register not cross-referenced | Add one line to the Relationship table: "Capability Promotion Register: governs the Implemented → Inherited transition" | `STRATEGIC_INSIGHTS_REGISTER.md` | Next founder review |
| No institutional review trigger | The founders must decide when to submit both PREVIOUSLY_DISCUSSED and the SIR for institutional review | — | Founder decision required |

---

## 7. Founder Decisions

1. **When should PREVIOUSLY_DISCUSSED and the Strategic Insights Register be submitted for institutional review?** Both are candidate mechanisms. Institutional acceptance would allow them to be cited as required steps in the Ratification Process and other governance documents. The earliest appropriate point is after Stage 1 validation, when there is real operational evidence that the mechanisms are being used.

2. **Should the Deferred status be added to the SIR lifecycle?** This is a small change with a meaningful governance consequence: it distinguishes "we have reviewed this and chosen not to pursue it now" from "this has never been reviewed."

3. **Should Repository Reviews become an explicit part of the volume handover process?** Adding "conduct a Repository Review of the SIR" to the volume handover template is a zero-document change that would make the review cadence automatic rather than discretionary.

4. **Who owns the Strategic Insights Register beyond the founding team?** As the organisation grows, the register will need a defined institutional owner and review authority. At this stage the founders own it; the transition point should be defined.

5. **Are there SIR entries that should already move from Captured to Under Review?** Repository Review 001 provides the analysis; the founders must decide which, if any, entries are ready for elevation now versus deferral.

---

## 8. Overall Assessment

The Strategic Insights Register is well-conceived and appropriately positioned. It fills a genuine gap that no existing repository document addressed: the deliberate preservation of future strategic possibilities before they are ready for architecture or implementation.

The governance surrounding it is incomplete in proportion to its novelty and candidacy — this is expected and appropriate. The gaps are practical rather than structural: the lifecycle needs one addition (Deferred), the relationship to PREVIOUSLY_DISCUSSED needs one routing rule, the review cadence needs a defined trigger, and both candidate mechanisms need a path to institutional acceptance.

The most important governance observation is one of restraint: the Volume VIII exit criterion applies here as much as anywhere. The SIR, PREVIOUSLY_DISCUSSED, and their associated review processes are complete enough. Adding more governance machinery before these mechanisms have been exercised through a full organisational learning cycle would repeat the pattern the exit criteria explicitly warned against.

The next governance milestone for the Strategic Insights Register is not structural improvement. It is the first complete cycle: a Founder Decision from Repository Review 001 is resolved, an SIR entry moves from Captured to Under Review, and the result is recorded. That is the evidence that the mechanism works. Everything else follows from that.

---

*No files were modified. No architecture was created. No commitments were made. This review is for founder decision-making only.*
