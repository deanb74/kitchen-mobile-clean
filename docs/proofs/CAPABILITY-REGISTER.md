# Capability Register

Status: Active
Owner: Companion Runtime Engineering
Date opened: 2026-07-27

## Purpose

Provide one authoritative register for every certified capability identity across Helping Hand.

## Model

- `CSA` identifies the capability specification revision.
- `CC` identifies the long-lived certified capability.
- A single `CC` can map to multiple CSA revisions over time.

## Capability Entries

| Capability ID | Name | Current CSA revision | Runtime version first certified | Certification status | Date certified | Latest review | Evidence location | Successor CSA revisions |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CC-001 | Cleaning Completion | CSA-0003 | 0.1.0 | Certified | 2026-07-27 | 2026-07-27 | docs/proofs/PROOF-0006-CSA-0003-CLEANING-CAPABILITY-VALIDATION.md | None recorded |
| CC-002 | Temperature Control | CSA-0002 | 0.1.0 | Certified | 2026-07-27 | 2026-07-27 | docs/proofs/PROOF-0005-FIRST-LIVE-COMPANION-OPERATION.md | CSA-0003 control row (CSA3-EVT-010) |
| CC-003 | Equipment Fault | CSA-0003 | 0.1.0 | Certified | 2026-07-27 | 2026-07-27 | docs/proofs/PROOF-0007-CC-003-EQUIPMENT-FAULT-CERTIFICATION.md | None recorded |
| CC-004 | Corrective Action | CSA-0003 | 0.1.0 | Certified | 2026-07-27 | 2026-07-27 | docs/proofs/PROOF-0008-CC-004-CORRECTIVE-ACTION-CERTIFICATION.md | None recorded |
| CC-005 | Opening Checks | CSA-0003 | 0.1.0 | Certified | 2026-07-27 | 2026-07-27 | docs/proofs/PROOF-0009-CC-005-OPENING-CHECKS-CERTIFICATION.md | None recorded |
| CC-006 | Closing Checks | CSA-0003 | 0.1.0 | Certified | 2026-07-27 | 2026-07-27 | docs/proofs/PROOF-0010-CC-006-CLOSING-CHECKS-CERTIFICATION.md | None recorded |

## Maintenance Rule

Whenever a capability status changes:

1. Update this register row.
2. Update the CCCM status in the active CSA validation document.
3. Link the relevant PROOF document.
4. Record review date and reviewer outcome.
