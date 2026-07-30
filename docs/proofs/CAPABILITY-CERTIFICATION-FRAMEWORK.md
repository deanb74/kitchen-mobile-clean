# Helping Hand Capability Certification Framework

## Purpose

Define a simple, repeatable hierarchy for certifying Helping Hand capabilities.

## Framework Hierarchy

Helping Hand Capability Framework
-> Capability Specification (CSA)
-> Companion Capability Certification Matrix (CCCM)
-> PROOF Document
-> Companion Review
-> Certified Capability

## Identity Model

- CSA = Capability Specification.
- CC = Certified Capability reference.

CSA and CC are intentionally separate identifiers.

A capability may evolve through multiple CSA revisions while retaining one stable CC identity.

## Capability Certification Register

Authoritative register:

- [CAPABILITY-REGISTER.md](CAPABILITY-REGISTER.md)

## Certification Lifecycle

1. Define or update CSA.
2. Implement capability adapter and governed runtime path.
3. Execute engineering validation.
4. Execute Companion Review and capture runtime JSON evidence.
5. Confirm persistence behavior.
6. Publish PROOF document.
7. Promote capability status in CCCM and CC register.

## Governance Note

The Companion Capability Certification Matrix tracks scenario-level validation progress.

The Capability Certification Register tracks long-lived capability certification identity and status.

The Interaction Record captures evidence of one event, while the Venue Brain learns from many records over time.

Learning outputs must remain governed:

- Learning proposes recommendations.
- Evidence supports candidate improvements.
- Humans validate changes.
- Capability evolution occurs through CSA and certification updates.

Operational behavior must never change from learning alone.

Governed sequence:

Learning -> Proposal -> Human Approval -> CSA Revision -> Certification -> Deployment

Roadmap reference:

- [CERTIFICATION-ROADMAP.md](CERTIFICATION-ROADMAP.md)
