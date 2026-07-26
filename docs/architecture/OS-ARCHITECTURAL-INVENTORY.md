# OS Architectural Inventory

Date: 2026-07-26

Scope reviewed:
- [lib/os/README.md](../../lib/os/README.md)
- [lib/os/helpingHandOS.ts](../../lib/os/helpingHandOS.ts)
- [lib/os/types.ts](../../lib/os/types.ts)
- Context, recall, knowledge, and routing modules under [lib/os](../../lib/os)
- All tests under [lib/os/__tests__](../../lib/os/__tests__)
- Relevant boundary context in [docs/architecture](../architecture)

---

## 1. Existing OS responsibilities

- Provide a minimal OS facade that answers knowledge questions through routing.
- Define core OS identity, question, and answer types.
- Resolve knowledge through local-first, HQ-fallback behaviour, with offline null return.
- Define knowledge store contracts and provide in-memory storage for tests.
- Turn venue observations into discovery prompts.
- Prioritise prompts for understanding flow.
- Apply situational judgement to decide ask now, defer, interrupt, or nothing to ask.
- Build and maintain venue knowledge profiles from evidential facts.
- Evaluate knowledge applicability by profession, region, venue type, department, equipment, and approval status.
- Expose recall interfaces and types, with placeholder runtime behaviour.

---

## 2. Universal Digital Colleague capabilities already implemented

- Local cache plus HQ query knowledge retrieval flow.
- Offline-safe behaviour that avoids HQ contact.
- Applicability governance for approved knowledge packages.
- Priority-based understanding prompt selection.
- Judgement gating for safety, incident state, and operational intensity.
- Observation to prompt discovery pipeline.
- Evidence-based venue profile lifecycle: add, confirm, remove, setup bootstrap.

---

## 3. Hospitality- or venue-specific implementations

- Hospitality-focused HQ mock answer behaviour.
- Venue discovery rules that encode hospitality contexts such as commercial kitchen, cellar, draught beer, accommodation.
- Anne Arms reference profile and hospitality equipment and capabilities in tests.
- Hospitality procedure applicability examples such as beer line cleaning and food safety.
- Onboarding flow mapped to venue and business context categories.

---

## 4. Boundaries between OS, HQ, Formation, Academy and Governance

- OS: reusable runtime capability surface for colleague operations.
- HQ: upstream profession knowledge service accessed through routing abstraction, not direct bypass.
- Formation: character-first colleague formation before professional and technical depth.
- Academy: delivery of inherited learning, mentorship, and journey progression.
- Governance: decision authority for what becomes shared architecture and what remains local.

Boundary alignment references:
- [docs/architecture/HELPING_HAND_HQ.md](HELPING_HAND_HQ.md)
- [docs/formation/README.md](../formation/README.md)
- [docs/architecture/HELPING_HAND_ACADEMY.md](HELPING_HAND_ACADEMY.md)
- [docs/GOVERNANCE.md](../GOVERNANCE.md)
- [docs/architecture/DIGITAL_COLLEAGUE_GRADUATION_AUDIT.md](DIGITAL_COLLEAGUE_GRADUATION_AUDIT.md)

---

## 5. Duplicated or overlapping concepts

- Understanding overlap between OS context understanding and separate concept-graph understanding engine.
- Judgement overlap between OS ask or defer engine and separate full disposition judgement engine.
- Reflection and learning are implemented outside OS while OS README lists them as OS responsibilities.
- Parallel knowledge stacks exist between OS applicability profile logic and broader non-OS knowledge or governance modules.

---

## 6. Missing capabilities evidenced by current code

- Recall runtime is placeholder and returns no results.
- OS memory module directory is currently empty.
- OS communication, governance, reflection, sync, and understanding directories are empty.
- Routing currently implements profession HQ path only, with no implemented organisation HQ or Helping Hand HQ route.
- No persistent production knowledge store adapter in OS beyond in-memory test store.
- No OS tests for recall runtime, memory runtime, communication runtime, governance runtime, sync runtime, or OS-level reflection and learning runtime.

---

## 7. Documents that already define the relevant standards

- [docs/architecture/COMPANION-INTELLIGENCE-CORE.md](COMPANION-INTELLIGENCE-CORE.md)
- [docs/architecture/ARCHITECTURE_LIFECYCLE_STANDARD.md](ARCHITECTURE_LIFECYCLE_STANDARD.md)
- [docs/architecture/DIGITAL_COLLEAGUE_GRADUATION_AUDIT.md](DIGITAL_COLLEAGUE_GRADUATION_AUDIT.md)
- [docs/architecture/ANNIE-GRADUATION-AUDIT-GOVERNANCE-REVIEW.md](ANNIE-GRADUATION-AUDIT-GOVERNANCE-REVIEW.md)
- [docs/architecture/HELPING_HAND_HQ.md](HELPING_HAND_HQ.md)
- [docs/architecture/HELPING_HAND_ACADEMY.md](HELPING_HAND_ACADEMY.md)
- [docs/formation/README.md](../formation/README.md)
- [docs/GOVERNANCE.md](../GOVERNANCE.md)
- [docs/architecture/GOVERNANCE-CHANGELOG.md](GOVERNANCE-CHANGELOG.md)

---

## 8. Recommendations, prioritising reuse over new creation

- Keep OS as the canonical thin runtime surface, and avoid creating parallel OS-like wrappers.
- Reuse existing rich engines in understanding, judgement, reflection, and learning modules by composing them behind OS contracts.
- Reuse existing graduation and evidence guidance as the governing policy baseline.
- Reuse venue profile and applicability contracts as the canonical mechanism for universal versus local separation.
- Reuse onboarding integration patterns that already call OS context modules.
- Prioritise boundary consolidation over new artefact creation: one understanding model, one judgement model, one reflection-learning path.
- Treat empty OS areas as integration placeholders and fill through composition before proposing new standards or new folder structures.
