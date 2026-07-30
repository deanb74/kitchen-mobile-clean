# Capability Certification Roadmap

Date: 2026-07-27
Owner: Companion Runtime Engineering

## Wave 1 - Operational Validation (Current)

Validate six capabilities:

- CC-001 Cleaning Completion (Certified)
- CC-002 Temperature Control (Certified)
- CC-003 Equipment Fault (Certified)
- CC-004 Corrective Action (Certified)
- CC-005 Opening Checks (Certified)
- CC-006 Closing Checks (Certified)

Goal:

- Prove the runtime is capability-agnostic.

## Wave 2 - Cross-Capability Validation

Cross-capability validation questions:

- Does every interaction produce Context?
- Does every interaction produce Authority?
- Does every interaction produce Reflection?
- Does every interaction remain CSA conformant?
- Does every interaction survive restart?

Goal:

- Shift validation emphasis from individual capability behavior to runtime consistency.

## Wave 3 - Venue Brain Validation

Architectural transition:

Operational Event
-> Companion Runtime
-> Interaction Record
-> Capability Register
-> Venue Brain
-> Learning
-> Recommendations
-> Validated Improvements
-> Capability Evolution

Layer distinction:

- Interaction Record = evidence of one event.
- Capability Register = status of one capability.
- Venue Brain = understanding built from many events.

Goal:

- Validate that learned understanding can be derived from multiple certified interactions.
- Ensure learning produces governed outputs that can evolve certified capability safely.

Learning output discipline:

- Learning proposes.
- Evidence supports.
- Humans validate.
- Certified capabilities evolve.

Authority boundary:

- Learning may propose improvements but must not change operational behavior by itself.

Governed improvement chain:

Learning
-> Proposal
-> Human Approval
-> CSA Revision
-> Certification
-> Deployment

## Wave 4 - Learning Loop Closure

Shift in evaluation question:

- From: Did the Digital Colleague perform the task?
- To: What has the Digital Colleague learned through repeated governed execution?

Goal:

- Use reflection, recommendations, and promotion candidates as active learning inputs across certified capabilities.

## Near-Term Priority (Next Week)

1. Wave 1 complete: all six capabilities certified.
2. Implement v1 Venue Brain persistence layer.
3. Execute first multi-capability review across all certified capabilities.

## Volume VIII Operational Proof Entry

Next operational proof:

- PROOF-0011 - First Operational Human Outcome Validation

Goal:

- shift from institutional self-validation to real human-outcome evidence in hospitality,
- capture full evidence chain from situation through reflection,
- determine whether current institutional standards are already sufficient in live operational use.
