# Helping Hand — Copilot Instructions

Repository-wide rules for every GitHub Copilot session in this workspace.
These rules are derived from canonical repository documents only. No rule is invented here.

---

## 1. People first; purpose before architecture; architecture before implementation

> "People come first. Always."

Helping Hand exists to help people flourish. Every engineering decision must serve that purpose. Work in this order without exception:

1. **People** — confirm the change genuinely serves people. If it does not, redesign.
2. **Purpose** — understand why this capability should exist before deciding what it should do.
3. **Understanding** — understand the problem through Constitution, Theory Map, and Founding Principles.
4. **Theory** — confirm the governing theory before defining architecture.
5. **Architecture** — confirm architecture before writing implementation.
6. **Implementation** — implement only after the layers above are settled.

Never let implementation choices redefine purpose, understanding, or theory. Change the software to honour the Constitution; never change the Constitution to suit the software.

**Sources:** `constitution/02-CONSTITUTION.md` (Article I — Humanity), `constitution/00-PREAMBLE.md`, `constitution/04-ENGINEERING-OATH.md`, `docs/OPERATING_MODEL.md` (Operating Cycle), `docs/ENGINEERING_DISCIPLINE.md` (Philosophy Before Code)

---

## 2. Understand before acting — search before creating

> "Before writing code… Understand the problem."

Before creating any file, function, or document:

- Search the repository for an existing canonical equivalent.
- Read the relevant Theory, Architecture, and Engineering documents first.
- Use `knowledge_index.md` and `md_inventory.txt` as entry points.

If a capability already exists in the Companion Operating System or a shared library, inherit it rather than duplicate it.

**Sources:** `docs/ENGINEERING_PRINCIPLES.md` (EP-000), `docs/ENGINEERING_DISCIPLINE.md`, `KNOWLEDGE_ARCHITECTURE.md`

---

## 3. Every governed decision must be traceable

> "Every governed decision must be traceable."

When creating or modifying governed documents or capabilities:

- Declare the traceability chain: Principle → Theory → Architecture → Engineering → Milestone → Evidence.
- If a field does not apply, state "Not Applicable" — do not omit it silently.
- Untraceable decisions are a governance risk and must not be presented as settled.

**Sources:** `docs/architecture/REPOSITORY_TRACEABILITY_STANDARD.md` (HH-ARCH-RTS-001), `docs/engineering/ENGINEERING_PRINCIPLE_002_TRACEABLE_DECISIONS.md` (EP-002)

---

## 4. Evidence before claims — never claim unearned evidence

> "Truth comes before certainty. When knowledge is incomplete, honesty is the correct response."

- Do not assert that a capability is complete, validated, or production-ready without citing specific evidence documents.
- Do not invent sources of truth, runtime authority, or completion status.
- Preserve existing uncertainty markers in documents; do not silently promote candidate work to settled work.

**Sources:** `constitution/02-CONSTITUTION.md` (Article III — Truth), `docs/engineering/VALIDATION_PHILOSOPHY.md` (HH-ENG-001)

---

## 5. Frozen evidence must not be rewritten

> "Frozen historical evidence was deliberately not rewritten in this phase."

Whether a document is frozen is determined by its status, governance classification, or evidence type — not by its directory location. Distinguish between:

- **Authored guidance and formation curriculum** (`docs/formation/`) — living documents that may be evolved under the Formation Authoring Standard. Do not treat entire formation directories as frozen.
- **Governed validation evidence** (`docs/proofs/`, `docs/understanding-journeys/validation/`) — records of accepted proof runs. Do not rewrite after acceptance.
- **Certification artefacts** (`docs/proofs/artifacts/`) — immutable outputs produced by a specific verification execution.
- **Machine-local execution evidence** — historical transcripts that record a specific machine environment (e.g. `provenance-evidence.md`, `PROOF-0012-ANDY-GOVERNED-ADVISORY-INHERITANCE.md`). Preserve as-is; absolute paths in these documents are deliberate portability debt from a named phase.
- **Explicitly frozen milestone records** — documents such as `CANDIDATE_0_PIPELINE_CHECKPOINT_001.md` that are closed and accepted.

Do not edit any frozen document to fix cosmetic issues, update paths, or improve style. Before editing formation content, consult `docs/formation/FORMATION-AUTHORING-STANDARD.md`.

**Sources:** `MACHINE-PORTABILITY-REMEDIATION.md` (Evidence and Documentation Boundary section), `docs/formation/FORMATION-AUTHORING-STANDARD.md`

---

## 6. Smallest justified change

> "Good judgement creates Faff Free software."

Make only the change that is directly required. Do not:

- Refactor surrounding code opportunistically.
- Add features, logging, or abstractions beyond what is asked.
- Redesign architecture to fix a narrow defect.

If wider change appears necessary, surface it separately with a rationale before proceeding.

**Sources:** `docs/ENGINEERING_PRINCIPLES.md` (EP-000 — Good Judgement), `MACHINE-PORTABILITY-REMEDIATION.md` (Scope section)

---

## 7. Portability by default — no secrets, local paths, or private IPs

> "No executable source now contains the old LAN IP."

All code must run correctly on any machine without modification:

- Machine-specific configuration (private IPs, local filesystem paths, MAC usernames), deployment-specific URLs, and secrets must not appear in committed source. Values that differ between environments belong in `.env`; see `.env.example` for the configuration pattern. Public constants that do not vary by environment do not require `.env`.
- Scripts must derive repository-relative paths from module location, using `resolveRepositoryRootFromImportMeta` or an equivalent anchored-path strategy (see `scripts/support/repositoryRoot.ts`). `process.cwd()` must not be used as an implicit repository-root discovery mechanism. It may be used where the script's documented contract explicitly depends upon the invoking directory.
- No private IP address, MAC username, local filesystem path, or secret may appear in committed source.
- When repository access is unavailable, report that honestly rather than inventing a fallback path.

**Sources:** `MACHINE-PORTABILITY-REMEDIATION.md`, `MACHINE-PORTABILITY-VERIFICATION.md`, `scripts/support/repositoryRoot.ts`

---

## 8. Validate understanding before claiming capability

> "Validate understanding before capability. A capability may only inherit from validated understanding."

The validation hierarchy is: Understanding → Inheritance → Profession → Organisation → Ecosystem.

- Do not bypass an unresolved dependency layer.
- Do not mark a layer as passing without running its verification commands and recording the output.
- Focused tests before integration tests; integration tests before full suite claims.

**Sources:** `docs/engineering/VALIDATION_PHILOSOPHY.md` (HH-ENG-001)

---

## 9. Focused tests first

> "Every capability should have: independent tests, inheritance tests, integration tests where appropriate."

When writing or modifying tests:

- Write the narrowest test that covers the specific behaviour in question first.
- Run focused suites (`npm test -- --runInBand <path>`) before running the full suite.
- Evidence documents must be updated when creating or updating governed validation, proofs, milestones, certifications, or completion claims. Routine development should report executed commands and results; it does not require permanent evidence document updates.

**Sources:** `docs/ENGINEERING_DISCIPLINE.md`, `MACHINE-PORTABILITY-VERIFICATION.md` (Commands Run section)

---

## 10. Identify and respect canonical sources

> "Traceability turns documentation into governed relationships."

The canonical source hierarchy for this repository is:

| Layer | Canonical location |
|---|---|
| Constitutional authority | `constitution/` |
| Theory | `docs/theory/` |
| Architecture | `docs/architecture/` |
| Engineering principles | `docs/engineering/`, `docs/ENGINEERING_PRINCIPLES.md` |
| Organisation and governance | `docs/organisation/`, `docs/institution/` |
| Validation evidence | `docs/proofs/`, `docs/understanding-journeys/validation/` |
| Generated indexes | `knowledge_index.md`, `md_inventory.txt` |

When two documents appear to conflict, do not resolve the conflict silently. Apply the following criteria in order:

1. **Constitutional authority** — `constitution/` is the highest layer and supersedes all others.
2. **Document status** — a Released document supersedes a Candidate or Draft document on the same topic within the same layer.
3. **Scope** — a more specific document applies within its defined scope; it does not override a higher-layer general principle.
4. **Supersession** — check whether one document explicitly supersedes another.
5. **Evidence** — claims supported by recorded evidence carry more weight than unsupported claims at the same layer.

If the conflict cannot be resolved by these criteria, surface it explicitly rather than choosing silently.

**Sources:** `docs/architecture/REPOSITORY_TRACEABILITY_STANDARD.md` (HH-ARCH-RTS-001), `docs/engineering/ENGINEERING_PRINCIPLE_002_TRACEABLE_DECISIONS.md` (EP-002)

---

## 11. Preserve provenance and uncertainty

> "If no repository root is available, Andy reports that boundary honestly instead of inventing a path."

- Do not suppress uncertainty. If the evidence is incomplete, say so.
- Distinguish between four provenance categories:
  - **Repository-relative provenance** — the target pattern for new governed artefacts; use `relativePath`, not absolute paths.
  - **Machine-local execution evidence** — historical records that contain absolute paths as portability debt by design. Preserve as-is; do not rewrite.
  - **Frozen historical evidence** — immutable execution records accepted at a specific phase; absolute paths within them are acknowledged technical debt.
  - **Publishable governed evidence** — new artefacts must use repository-relative paths; absolute machine paths must not become the normal pattern for new work.
- Preserve `repositoryRoot`, `absoluteFilePath`, and `relativePath` metadata in provenance-carrying artefacts produced by real executions.
- Do not synthesise provenance that was not produced by a real execution.

**Sources:** `MACHINE-PORTABILITY-REMEDIATION.md` (Repository-Root Strategy section), `MACHINE-PORTABILITY-VERIFICATION.md` (Repository-Root Behavior Proven section)

---

## 12. Human authority — no commit or push without explicit instruction

> "No Digital Colleague may execute significant organisational change without the appropriate human authority."

- Do not run `git commit`, `git push`, or any destructive Git operation unless the user has explicitly requested it in this session.
- Do not amend published commits or force-push.
- Do not modify `git` history or bypass `--no-verify` hooks.
- Prepare changes and present them; the human decides when to commit.

**Sources:** `constitution/05-AUTHORITY-AND-STEWARDSHIP.md` (Human Authority section)

---

## 13. One responsibility per capability

> "Capabilities collaborate. They do not absorb one another."

When designing or extending code:

- Each module, class, or function should own one primary responsibility.
- Universal, reusable behaviour shared across Digital Colleagues belongs in the Companion Operating System (`platform/cos/`). Companion Intelligence primitives — reasoning authority, the Compass, the Navigator, governed behaviour prototypes — belong in `platform/ci/`. Do not place shared capability in `platform/ci/` in place of `platform/cos/`; if the correct home is uncertain, surface the question before implementing.
- Universal capability before professional specialisation.

**Sources:** `docs/ENGINEERING_DISCIPLINE.md` (Inheritance Before Duplication section), `platform/cos/README.md`

---

## 14. Distinguish observation, inference, and conclusion — never invent

> "Truth comes before certainty. When knowledge is incomplete, honesty is the correct response."

When evidence is incomplete or uncertain, distinguish explicitly between:

- what has been directly observed in the repository;
- what is being inferred from available evidence;
- what would require further verification before it can be treated as a conclusion.

Never invent:

- repository facts, file contents, or document statuses;
- scripts, commands, or APIs that have not been verified to exist;
- architecture, components, or capabilities not confirmed in the repository;
- provenance, completion claims, or evidence not produced by a real execution.

If something cannot be verified, say so rather than proceeding as though it is known.

**Sources:** `constitution/02-CONSTITUTION.md` (Article III — Truth), `docs/OPERATING_MODEL.md` ("Helping Hand advances through evidence, not assumption"), `docs/engineering/VALIDATION_PHILOSOPHY.md` (HH-ENG-001), `docs/engineering/ENGINEERING_PRINCIPLE_002_TRACEABLE_DECISIONS.md` (EP-002)

---

*These instructions are derived from and subordinate to the canonical repository documents listed above. When a canonical document is updated, these instructions should be reviewed against it.*
