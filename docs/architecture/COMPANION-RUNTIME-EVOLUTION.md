# Companion Runtime Evolution

Status: Working roadmap
Date opened: 2026-07-27

## Purpose

Define architectural milestones enabled by successful validation of the Companion Runtime.

This roadmap answers:

What becomes possible because we proved it?

## Milestone 1.5 - Operational Day Lifecycle

Current state:

Reset endpoint clears completion state only.

Next state:

Reset request
-> Determine operational day
-> Update taskDate
-> Clear completion state and completion metadata
-> Write ResetLog
-> Daily checks become visible for the new operational day

Scope:

- Treat the operational day as a first-class platform concept.
- Ensure every venue starts each morning with a fresh working state.
- Provide a reliable daily foundation for venue-level learning and future intelligence.

Why it matters:

- Opening checks, closing checks, and cleaning routines must be measured against a consistent operational day.
- Venue Intelligence questions only make sense when task completion is tied to a stable daily lifecycle.

## Milestone 2 - Venue Intelligence (First learning)

Current state:

Interaction Record

Next state:

Interaction Records
-> Patterns
-> Venue Intelligence

Scope:

- No prediction layer yet.
- Focus on reliable pattern detection from governed Interaction Records.
- Convert repeated operational facts into venue-level understanding.

Example outputs:

- Fridge 3 has exceeded 8C four times this month.
- Opening checks are regularly completed 20 minutes late on Tuesdays.
- Cleaning failures are increasing after football matches.

Guiding principle:

Information is specific. Learning is generic.

## Milestone 3 - Operational Communications

Boundary:

Operational communication only if it benefits the people, business or venue.

Operational Communications are treated as Operational Events, not as a separate messaging subsystem.

Example:

FOH: Kitchen, table 12 allergy confirmed.

Flow:

Operational Event
-> Interaction Record
-> Venue Intelligence

Outcome:

Human communication is unified with operational governance, evidence capture, and learning.

## Milestone 4 - Voice (only then)

Precondition:

Companion Runtime pipeline is already proven through multi-capability operational validation.

Implementation principle:

Replace current UI input methods with voice input while keeping runtime governance unchanged.

Example input:

Annie, fridge 3 is at four degrees.

Flow:

Speech
-> Operational Event
-> Companion Runtime
-> Interaction Record

Scope rule:

Voice is an input adapter only. It does not introduce a new governance model.
