# Capability Routing Architecture Audit

**Date:** 2026-08-07
**Status:** Candidate - Analysis
**Type:** Discovery only
**Purpose:** Determine whether Helping Hand requires an explicit capability-routing layer, or whether this behaviour already emerges from existing governance and specialist boundaries.

---

## Audit Question

> Does Helping Hand have an explicit capability-routing model, where understanding selects the appropriate specialist capability rather than assuming a single intelligence source?

This audit asks whether capability routing is:

- a named architectural layer;
- an emergent behaviour of existing governance;
- or a distributed responsibility already expressed across HQ, specialist boundaries, and Digital Colleague collaboration.

---

## Working Hypothesis

The current architecture appears to route understanding by destination and boundary rather than through a single central intelligence source.

That routing is visible in the repo, but it does not appear to be concentrated in one universal capability-routing component.

Instead, it is distributed across:

- Helping Hand HQ coordination;
- specialist HQ boundaries;
- Digital Colleague collaboration and handover;
- knowledge-flow rules;
- and governance constraints on upward travel of understanding.

---

## Evidence Observed

### 1. HQ already coordinates specialist collaboration

[Helping Hand HQ](HELPING_HAND_HQ.md) states that HQ:

- enables collaboration between Digital Colleagues;
- coordinates shared understanding;
- performs introductions when another profession is better placed to help;
- preserves context;
- and coordinates handover.

This supports routing by specialist need, but not a separate universal routing engine.

### 2. Collaboration is organised, not singular

[Helping Hand Collaboration](COLLABORATION.md) states that:

- every Digital Colleague has a profession;
- no Digital Colleague is expected to know everything;
- every Digital Colleague should know when another colleague is better placed to help;
- and collaboration happens through HQ.

This is consistent with capability selection emerging from boundaries and roles.

### 3. Knowledge flow already encodes destination-based routing

The current knowledge-flow abstraction in `platform/hq/knowledgeFlow.ts` routes candidate understanding by kind and origin:

- local understanding stays at the Digital Colleague;
- organisational understanding can travel to Organisation HQ;
- professional understanding can travel to Profession HQ;
- cross-profession understanding can travel to Helping Hand HQ;
- sensitive local context blocks upward travel.

That is a routing model, but it is scoped to knowledge level and governance boundary rather than a standalone capability-routing system.

### 4. The architecture explicitly rejects single-source intelligence

[Interdependence Architecture Audit](INTERDEPENDENCE_ARCHITECTURE_AUDIT_2026_08_07.md) concludes that Helping Hand does not achieve intelligence through individual Digital Colleague completeness.

It instead achieves understanding through governed collaboration between specialised perspectives.

That conclusion implies routing toward the right specialist perspective, but it does not yet name a dedicated capability-routing layer.

### 5. Navigation language already exists at the foundation level

[Foundation Summary](../FOUNDATION_SUMMARY.md) states that Companion Intelligence:

- navigates;
- does not own capability;
- selects capability.

This is strong evidence that capability selection is already part of the architectural language, even if not yet formalised as a separate component.

---

## Discovery Result

No explicit, universal capability-routing layer was found as a single owned architectural component.

However, the architecture already exhibits capability routing as an emergent property of existing systems:

- understanding travels to the lowest sensible level first;
- specialist HQs receive the right class of understanding;
- HQ coordinates introductions and handover;
- governance blocks unsafe upward travel;
- and Digital Colleagues are expected to recognise when another specialist is better placed to help.

---

## Interpretation

The repo currently treats capability routing less like a central intelligence dispatcher and more like a governed selection process distributed across roles and boundaries.

In that sense, capability routing already exists as architecture.

What does not yet appear to exist is a single explicit, profession-neutral capability-routing contract named as such.

---

## Open Questions

1. Should capability routing remain an emergent property distributed across HQ, specialist boundaries, and governance?
2. Or should the architecture eventually name a formal capability-routing model as a distinct responsibility?
3. If named, should that model live in HQ, Companion Intelligence, or a shared boundary layer?
4. Would such a contract clarify the bridge between interdependence, specialist HQs, DC collaboration, and future LLM decomposition?

---

## Conclusion

The current architecture does not appear to assume one intelligence source.

It assumes that understanding is routed toward the right specialist capability through governed collaboration, boundary-aware knowledge flow, and HQ-coordinated handover.

That behaviour is already present.

What remains unresolved is whether it should be formalised as an explicit capability-routing layer or left as an emergent system property.
