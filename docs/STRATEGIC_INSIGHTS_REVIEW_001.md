# Helping Hand — Strategic Insights Repository Review 001

**Date:** 2026-08-04  
**Register reviewed:** `docs/STRATEGIC_INSIGHTS_REGISTER.md`  
**Entries reviewed:** SIR-001 through SIR-030  
**Status:** Review only — no files modified, no architecture created, no commitments made

---

> This review shows what Helping Hand already possesses, what remains to be built, what work would be required, what should happen first, what alternatives may be better, and how founder insight could become governed organisational capability.

---

## Per-Entry Review

---

### SIR-001 — Shift4 / Lighthouse Integration

**A. Repository Alignment:** New Strategic Capability  
No Shift4, Lighthouse, or POS integration exists anywhere in the repository. `docs/INFRASTRUCTURE/PLATFORM_ROADMAP.md` references an existing Railway backend but has no third-party payment or POS integration. No architecture document addresses this.

**B. Natural Home:** Platform → third-party integration layer; Professional Intelligence → Hospitality HQ (commercial and operational data)

**C. Work Required:** Significant  
- Vendor API discovery and commercial access (token/API approval)
- Data model for transaction and POS events
- Integration adapter in the platform layer
- Security review (payment data is sensitive)
- Regional token model (US vs EU differ)
- Evidence capture for integrated events
- Testing environment before production

**D. Dependencies and Prerequisites**  
- Hard: stable venue platform (PLATFORM_ROADMAP.md Phase 1/2 complete); API/token access confirmed
- Desirable: Venue Brain operational (to make use of the data)
- External: vendor commercial relationship and API access

**E. Earliest Sensible Implementation Point:** After first production venue is live and the platform security baseline is confirmed. Integrating payment data before the platform is commercially deployed adds risk without return.

**F. Alternative Possibilities:** Validate manually (CSV export from existing POS) before building an API integration. This preserves the insight while deferring engineering until the venue platform is stable.

**G. Capability Boundary:** Within Helping Hand's intended future capability; requires an external dependency (vendor access).

**H. Recommended Register Update:** No change to status or priority. Possible addition: "Requires vendor relationship and API access before design can begin." Next Action: "Validate API access feasibility."

---

### SIR-002 — Food Label Printing

**A. Repository Alignment:** Already Documented (Architecture Research)  
`docs/hardware/HARDWARE_AWARENESS.md` explicitly covers label printing: "Bluetooth label printers, Network label printers" — awareness gained includes "food identity, preparation time, expiry, allergens." Status is "Research Programme." No implementation exists.

**B. Natural Home:** `docs/hardware/HARDWARE_AWARENESS.md` is already the home. Hospitality HQ for professional rules (allergen standards, use-by regulations).

**C. Work Required:** Moderate  
- Printer driver/SDK integration (Bluetooth and network)
- Product and allergen data model
- Label template design and management
- Print queue and offline handling
- Platform engineering for device pairing

**D. Dependencies and Prerequisites**  
- Hard: product and allergen records in the data model
- Desirable: kitchen workflow stable; food safety evidence pipeline proven
- External: printer hardware selection and SDK

**E. Earliest Sensible Implementation Point:** After core kitchen workflow and product/allergen records are stable and validated in live operation.

**F. Alternative Possibilities:** Partner with an existing food safety label printing provider rather than building from scratch.

**G. Capability Boundary:** Within intended future capability; hardware vendor dependency.

**H. Recommended Register Update:** Note the existing `HARDWARE_AWARENESS.md` home. Priority: Medium remains appropriate.

---

### SIR-003 — Automatic Fridge and Freezer Temperatures

**A. Repository Alignment:** Already Documented (Architecture Research)  
`docs/hardware/HARDWARE_AWARENESS.md` covers this explicitly: "Wireless thermometers, Bluetooth probes, IoT fridge sensors, Walk-around probes." The manual temperature workflow is certified at Wave 1 (CC-002). `docs/architecture/COMPANION-RUNTIME-EVOLUTION.md` Milestone 2 (Venue Intelligence) would provide the data layer for automated readings.

**B. Natural Home:** `docs/hardware/HARDWARE_AWARENESS.md` (existing) → Venue Brain Milestone 2 data layer

**C. Work Required:** Significant  
- Sensor hardware selection and pairing protocol
- Calibration governance
- Offline operation and failover
- Alert threshold configuration
- Equipment identity model
- Integration with existing CC-002 corrective-action workflow
- Evidence and compliance audit trail

**D. Dependencies and Prerequisites**  
- Hard: manual temperature workflow validated in live operation; equipment identity model in Venue Brain
- External: sensor hardware selection

**E. Earliest Sensible Implementation Point:** After the manual temperature workflow has been validated in genuine live operation at a production venue.

**F. Alternative Possibilities:** Validate with manual + photo capture workflow first. Sensor integration can inherit the same evidence model rather than creating a new one.

**G. Capability Boundary:** Within intended future capability; hardware and calibration dependency.

**H. Recommended Register Update:** Note existing home in `HARDWARE_AWARENESS.md`. No status change needed.

---

### SIR-004 — Website as the Digital Colleague

**A. Repository Alignment:** New Strategic Capability  
`docs/architecture/DIGITAL-COLLEAGUE-COMPANION-BUILD-BLUEPRINT.md` and CSA define Digital Colleague interaction but exclusively in a mobile app runtime. No web-facing or public-website Digital Colleague exists. `docs/INFRASTRUCTURE/PLATFORM_ROADMAP.md` Phase 3 mentions a website but not a conversational DC interface.

**B. Natural Home:** Customer Experience → web engineering; a new "Customer-Facing Digital Colleague" COS capability

**C. Work Required:** Significant to Major  
- Customer-facing Digital Colleague design (separate from staff-facing)
- Web platform engineering (current platform is React Native / Expo mobile)
- Consent and privacy architecture for public interactions
- Knowledge boundary — what can a public DC know and say?
- Venue-specific instance configuration
- Trust and brand governance

**D. Dependencies and Prerequisites**  
- Hard: Andy's internal validation complete; CI model mature; Customer consent architecture (SIR-007 dependency)
- Desirable: Venue Brain operational for venue-specific responses
- External: web hosting and deployment infrastructure

**E. Earliest Sensible Implementation Point:** After Andy and the internal CI model are validated (Stage 1 complete), and after a customer consent architecture is defined.

**F. Alternative Possibilities:** Begin with a simple conversational widget (non-DC) that links to a live DC session, deferring the full website-as-DC until the CI model is proven externally.

**G. Capability Boundary:** Within intended future capability; web engineering is a new capability the current mobile-first codebase does not yet have.

**H. Recommended Register Update:** Note dependency on SIR-007 and SIR-025 in Next Action. Priority: High remains appropriate.

---

### SIR-005 — Voice-Led Venue Onboarding

**A. Repository Alignment:** Partially Covered  
`expo-speech-recognition` is installed in `package.json`. `lib/onboarding/onboardingEngine.ts` has a structured onboarding engine with stages. `docs/architecture/COMPANION-RUNTIME-EVOLUTION.md` Milestone 4 explicitly defines Voice as an input adapter. Voice today is limited to `VoiceNoteInput.tsx` (a keyboard dictation prompt). Onboarding exists; voice is architecturally planned but not yet active as a primary onboarding modality.

**B. Natural Home:** Extend `lib/onboarding/onboardingEngine.ts` → voice adapter from COMPANION-RUNTIME-EVOLUTION Milestone 4

**C. Work Required:** Moderate  
- Wire voice input to onboarding flow (speech-to-text SDK is installed)
- Confirmation and correction dialogue
- Noise handling (kitchen environment)
- Human review before data commitment
- Regional accent handling (requires model tuning)

**D. Dependencies and Prerequisites**  
- Hard: voice input (Milestone 4 in COMPANION-RUNTIME-EVOLUTION) validated first
- Desirable: Context Engine for structured entity extraction

**E. Earliest Sensible Implementation Point:** After voice input adapter (Milestone 4) is implemented and tested in a quieter environment first.

**F. Alternative Possibilities:** Add voice dictation mode to the existing onboarding form first (partial voice UX) rather than building a fully conversational voice onboarding from scratch.

**G. Capability Boundary:** Within current project capability (SDK installed, onboarding engine exists); regional accent handling is an external dependency.

**H. Recommended Register Update:** Note link to COMPANION-RUNTIME-EVOLUTION Milestone 4 and existing `onboardingEngine.ts`.

---

### SIR-006 — Age-Appropriate and Person-Appropriate Communication

**A. Repository Alignment:** Partially Covered  
`lib/annie/conversation/speak.ts` has `age?: number` in its type signature. `docs/architecture/ANNIE-GRADUATION-AUDIT.md` notes: "Voice, vocabulary, tone, professional language, age appropriateness and relationship context remain with the individual Digital Colleague." The Judgement Engine architecture addresses contextual response selection. No dedicated Context Engine implementation exists.

**B. Natural Home:** Context Engine (SIR-015) → `lib/os/context/` → extend `venueProfileService.ts` with person-profile dimensions

**C. Work Required:** Moderate  
- Person profile data model (role, age, communication preferences, relationship history)
- Privacy and consent governance for storing personal communication preferences
- Response tone policy rules per profile segment
- Integration with Judgement Engine response selection

**D. Dependencies and Prerequisites**  
- Hard: Context Engine (SIR-015) designed and operational
- Governance: privacy architecture for personal profile data

**E. Earliest Sensible Implementation Point:** After Context Engine is designed, as a first domain use-case for the person-profile dimension.

**F. Alternative Possibilities:** Start with role-appropriate communication (already partially present in `AndyDigitalColleague.ts` with `operations-manager` profile detection) before adding age-specific adaptations.

**G. Capability Boundary:** Within intended future capability; privacy governance dependency.

**H. Recommended Register Update:** Note that `lib/annie/conversation/speak.ts` already has age hooks. Link to SIR-015 as prerequisite.

---

### SIR-007 — Staff-Controlled Customer Conversation Handover

**A. Repository Alignment:** New Strategic Capability  
`docs/architecture/JUDGEMENT_ENGINE.md` extensively covers consent-seeking behaviour and escalation. `docs/architecture/ARCHITECTURE_PRINCIPLES.md` addresses consent and safeguarding. No handover workflow from staff to customer interaction exists. The current runtime is staff-only.

**B. Natural Home:** Human Interaction → new capability in Companion OS; Governance → safeguarding and consent standards

**C. Work Required:** Significant  
- Customer consent and privacy model
- Handover initiation protocol (staff-triggered)
- Digital Colleague behaviour change on handover (context switch)
- Safeguarding boundaries and escalation
- Evidence and audit trail for sensitive interactions
- Governance review and ratification

**D. Dependencies and Prerequisites**  
- Hard: Customer consent architecture; Safeguarding framework validated
- Desirable: CI maturity proven with staff before extending to customers

**E. Earliest Sensible Implementation Point:** After safeguarding and consent governance architecture is formally ratified (HH-GOV-003 process) and internal CI model is validated.

**F. Alternative Possibilities:** Begin with a simpler "introduce a customer to the app" flow before a live conversational handover.

**G. Capability Boundary:** Within intended future capability; safeguarding and consent governance must exist first.

**H. Recommended Register Update:** Add dependency on consent and safeguarding architecture as prerequisite in Next Action.

---

### SIR-008 — Helping Hand Beyond the Clock

**A. Repository Alignment:** New Strategic Capability (with architectural foundations)  
The humanity understanding journey series and `constitution/sapling/conditions/06-JUDGEMENT.md` deal with personal and emotional conversation. No beyond-work-hours capability is designed or implemented.

**B. Natural Home:** Human Interaction; Governance → safeguarding standards; Institution → consent and privacy

**C. Work Required:** Significant  
- Safeguarding governance (professional boundaries, escalation)
- Privacy model (off-hours conversations are more personal)
- Consent architecture
- Emotional intelligence capability (SIR-009)
- Boundary definition: what can the DC do vs. when must it escalate?

**D. Dependencies and Prerequisites**  
- Hard: Safeguarding framework; Emotional intelligence capability (SIR-009) operational; Consent architecture
- Governance: ratification before deployment

**E. Earliest Sensible Implementation Point:** After emotional intelligence (SIR-009) is validated in work contexts, and after safeguarding governance is formally ratified.

**F. Alternative Possibilities:** Test the emotional conversation pattern within work contexts first (existing Humanity Understanding Journeys). SIR-007 should be validated before SIR-008.

**G. Capability Boundary:** Within intended future capability; requires safeguarding governance to exist first.

**H. Recommended Register Update:** Note dependency on SIR-009 and safeguarding governance. Priority: Medium remains appropriate.

---

### SIR-009 — Emotional Intelligence as a Shared Capability

**A. Repository Alignment:** Partially Covered (architectural intent, not yet implemented)  
`docs/architecture/JUDGEMENT_ENGINE.md` discusses emotional sensitivity in response selection. The humanity understanding journeys show Andy demonstrating emotional reading. `lib/annie/judgement.ts` exists but is minimal. No dedicated emotional intelligence engine exists as a shared COS capability.

**B. Natural Home:** Companion Operating System → COS universal capability (alongside Observation, Reflection); `platform/cos/` after validation per `lib/annie/`

**C. Work Required:** Significant  
- Emotional context detection model
- Integration with Judgement Engine response selection
- Governance: when to act on emotional signals vs. seek consent
- Formation curriculum for emotional intelligence (extend existing formation)
- Evidence and validation standard

**D. Dependencies and Prerequisites**  
- Hard: Judgement Engine implementation matured
- Desirable: Multiple validated human interactions demonstrating emotional reading

**E. Earliest Sensible Implementation Point:** After Andy's internal validation (Stage 1) produces evidence of emotional context handling.

**F. Alternative Possibilities:** Extract and formalise what the formation and understanding journeys already demonstrate (Andy recognising emotional states and responding appropriately) into a governed COS capability rather than building new technology.

**G. Capability Boundary:** Within intended future capability; promotion to COS requires ratification process.

**H. Recommended Register Update:** Note that formation evidence already exists; SIR-009 is about promotion to shared capability. Priority: High remains.

---

### SIR-010 — Sports Digital Colleagues

**A. Repository Alignment:** New Strategic Capability (future profession)  
`docs/architecture/DIGITAL_COLLEAGUE_INHERITANCE_MAP.md` establishes the inheritance model for future professions. Sports is mentioned as a future application. No architecture, formation, or implementation exists for sports.

**B. Natural Home:** Future Profession → Professional Intelligence architecture; requires a Sports HQ and a sports professional knowledge source

**C. Work Required:** Major Programme  
- Professional knowledge authority for sports (coaching science, performance analysis)
- Sports-specific formation curriculum
- Context and environment adaptation (pitch, stadium, training ground)
- Performance data integration (physical, tactical, psychological)
- Governance: authority boundaries in performance coaching

**D. Dependencies and Prerequisites**  
- Hard: Generic inheritance model demonstrated beyond hospitality
- Hard: Professional knowledge authority available

**E. Earliest Sensible Implementation Point:** After the generic inheritance model is validated for a second profession. Annie/hospitality must prove the model works generally.

**F. Alternative Possibilities:** Partner with a sports science organisation to provide knowledge authority rather than building from scratch.

**G. Capability Boundary:** Within intended future capability; genuinely a future-profession investment requiring professional authority.

**H. Recommended Register Update:** No change. Priority: Medium remains. Note that SIR-010/011/012/013 share the same prerequisite.

---

### SIR-011 — Healthcare Digital Colleague

**A. Repository Alignment:** New Strategic Capability  
`docs/architecture/DIGITAL_COLLEAGUE_INHERITANCE_MAP.md` mentions Healthcare Harry as a future DC. No architecture, formation, or governance exists for healthcare. `docs/architecture/ARCHITECTURE_PRINCIPLES.md` emphasises safeguarding and professional authority, which healthcare requires at a higher level than hospitality.

**B. Natural Home:** Future Profession → Professional Intelligence; requires Healthcare HQ, regulatory compliance architecture, clinical governance

**C. Work Required:** Major Programme  
- Regulatory compliance (CQC, NHS, GDPR health data)
- Clinical professional authority governance
- High-stakes safeguarding architecture
- Medical professional knowledge source
- Formation curriculum for healthcare context
- Privacy architecture for health data (significantly more complex than hospitality)
- Extensive testing and evidence before any live deployment

**D. Dependencies and Prerequisites**  
- Hard: Generic inheritance model proven; Professional clinical authority available; Regulatory compliance architecture
- External: healthcare regulatory approval or safe-harbour model

**E. Earliest Sensible Implementation Point:** After the generic inheritance model is proven beyond hospitality, and after a regulated healthcare pilot partner is identified.

**F. Alternative Possibilities:** Begin with a wellness or workplace mental health context (lower regulatory barrier) before clinical healthcare.

**G. Capability Boundary:** Within intended future capability; external professional authority and regulatory compliance are hard dependencies.

**H. Recommended Register Update:** Priority: High remains. Note that regulatory compliance is a hard external dependency unlike other professions.

---

### SIR-012 — Construction Digital Colleague

**A. Repository Alignment:** New Strategic Capability  
`docs/architecture/DIGITAL_COLLEAGUE_INHERITANCE_MAP.md` mentions Construction Kev. No architecture exists. Construction shares safety-critical characteristics with hospitality and is adjacent to SIR-010/011.

**B. Natural Home:** Future Profession → Professional Intelligence; requires Construction HQ, H&S knowledge source

**C. Work Required:** Major Programme (slightly less complex than healthcare)  
- Construction industry safety knowledge (CDM regulations, RAMS, site safety)
- Environmental and hazard awareness
- Professional qualification recognition
- Formation curriculum for construction context

**D. Dependencies and Prerequisites**  
- Hard: Generic inheritance model demonstrated; Professional H&S knowledge authority

**E. Earliest Sensible Implementation Point:** After generic inheritance model proven; after hospitality live operation provides the template.

**F. Alternative Possibilities:** Site safety checklist / incident reporting as a first bounded capability before a full DC.

**G. Capability Boundary:** Within intended future capability; professional authority dependency.

**H. Recommended Register Update:** No change. Priority: Medium remains.

---

### SIR-013 — Retail Digital Colleague

**A. Repository Alignment:** New Strategic Capability  
`docs/architecture/DIGITAL_COLLEAGUE_INHERITANCE_MAP.md` mentions Retail Riley. No architecture or implementation. Shares the future-profession characteristics with SIR-010/011/012.

**B. Natural Home:** Future Profession → Professional Intelligence; Retail HQ

**C. Work Required:** Major Programme  
- Retail professional knowledge (omnichannel, stock, compliance, customer service standards)
- Commercial intelligence model
- Context (shop floor vs. stockroom vs. online)
- Formation curriculum

**D. Dependencies and Prerequisites**  
- Hard: Generic inheritance model proven beyond hospitality

**E. Earliest Sensible Implementation Point:** After hospitality proves the template; retail is the closest to hospitality in character (customer service, stock, operations) and may be the best second domain.

**F. Alternative Possibilities:** Use retail as the second domain proof (simpler than healthcare or construction from a regulatory standpoint).

**G. Capability Boundary:** Within intended future capability.

**H. Recommended Register Update:** No change. Retail may be a better second domain than healthcare for proving the inheritance model.

---

### SIR-014 — Business and Venue Intelligence for Every Digital Colleague

**A. Repository Alignment:** Already Architected  
`docs/VOLUME_VI_VENUE_BRAIN.md` is entirely dedicated to this insight. The Venue Brain architecture is defined with the full Events→Memory→Knowledge→Understanding→Judgement→Recommendations→Governed Change progression. `docs/architecture/COMPANION-RUNTIME-EVOLUTION.md` Milestone 2 (Venue Intelligence) is the first implementation step.

**B. Natural Home:** `docs/VOLUME_VI_VENUE_BRAIN.md` is already the home.

**C. Work Required:** Major Programme (for the full capability; Milestone 2 is Moderate)  
- Operational day lifecycle (Milestone 1.5, near-term)
- Pattern detection from Interaction Records (Milestone 2)
- Venue knowledge model (equipment, routines, team, suppliers)
- Knowledge applicability matcher (partially implemented in `lib/os/knowledge/`)

**D. Dependencies and Prerequisites**  
- Hard: Companion Runtime multi-capability validation (CSA-0003); operational evidence data flowing reliably
- Desirable: Venue profile established (`lib/os/context/venueProfileService.ts` exists)

**E. Earliest Sensible Implementation Point:** After CSA-0003 multi-capability validation and the first production venue is live.

**F. Alternative Possibilities:** The Venue Brain stages in COMPANION-RUNTIME-EVOLUTION.md already provide the recommended sequence — follow them.

**G. Capability Boundary:** Foundational to the long-term product; partially implemented infrastructure exists.

**H. Recommended Register Update:** Note that `VOLUME_VI_VENUE_BRAIN.md` is already the home and COMPANION-RUNTIME-EVOLUTION.md has the staged roadmap.

---

### SIR-015 — Context Engine for Language, Relationships and Behaviour

**A. Repository Alignment:** Already Architected (partial implementation)  
`docs/architecture/JUDGEMENT_ENGINE.md` defines the architectural role: "Observation → Context Engine → Recall and Memory → Understanding Engine → Judgement Engine → Response." `lib/os/context/venueProfileService.ts` implements venue-level context dimensions including region. `lib/annie/conversation/speak.ts` has `age?: number`. `lib/judgement/JudgementEngine.ts` is implemented. No named "Context Engine" module exists — context is distributed across several `lib/os/context/` and `lib/annie/` components.

**B. Natural Home:** `lib/os/context/` → formalise and extend to a named Context Engine module in COS

**C. Work Required:** Significant  
- Consolidate existing context components into a formal Context Engine
- Add person-profile dimension (age, role, communication preferences, relationship history)
- Emotional context dimension (SIR-009)
- Location/region dimension (already partially present)
- Relationship and history dimension (living memory integration)
- Test suite for context-sensitive response variation

**D. Dependencies and Prerequisites**  
- Desirable: Andy's internal validation exposing repeatable context requirements
- Hard: Privacy governance for person-profile data

**E. Earliest Sensible Implementation Point:** During or after Andy Stage 1 validation when specific context requirements are observable from evidence.

**F. Alternative Possibilities:** Formalise and document the existing context work in `lib/os/context/` as a Context Engine v1 without adding new dimensions, then extend iteratively.

**G. Capability Boundary:** Within current project capability; significant architectural consolidation needed before the broader insight is realised.

**H. Recommended Register Update:** Note existing `lib/os/context/` and `JUDGEMENT_ENGINE.md` as architectural foundation. Priority: Foundational is correct.

---

### SIR-016 — Cross-Intelligence Learning Across Digital Colleagues

**A. Repository Alignment:** Already Architected  
`docs/architecture/DIGITAL_COLLEAGUE_INHERITANCE_MAP.md` defines this entire capability. The inheritance loop is fully described. `lib/knowledge-governance/KnowledgeGovernanceEngine.ts`, `lib/learning/LearningEngine.ts`, and `lib/reflection/ReflectionEngine.ts` are implemented. The governance layer exists. What remains is exercising it across multiple Digital Colleagues.

**B. Natural Home:** Already has its home in `docs/architecture/DIGITAL_COLLEAGUE_INHERITANCE_MAP.md` and the COS governance pipeline.

**C. Work Required:** Small to Moderate (the architecture and engines exist; the work is exercising across professions)  
- Validate learning governance with a second Digital Colleague
- Test that generic learning does not carry profession-specific assumptions
- Establish knowledge applicability rules for two profession domains

**D. Dependencies and Prerequisites**  
- Hard: Multiple Digital Colleagues operational
- Desirable: Knowledge applicability rules proven for at least two profession domains

**E. Earliest Sensible Implementation Point:** After the second Digital Colleague (Annie in a live venue) generates evidence that flows through the learning engine.

**F. Alternative Possibilities:** No better repository-aligned alternative identified — the infrastructure already exists and needs exercising.

**G. Capability Boundary:** Within current project capability; requires multiple operational Digital Colleagues.

**H. Recommended Register Update:** Note existing architecture and engines. Priority: High remains.

---

### SIR-017 — Companion Intelligence for Customers

**A. Repository Alignment:** New Strategic Capability  
No customer-facing Digital Colleague capability exists. `docs/architecture/JUDGEMENT_ENGINE.md` notes consent and safeguarding, but all current design assumes a staff user.

**B. Natural Home:** Customer Experience → new COS capability for customer interaction; requires consent, privacy, and knowledge boundary governance

**C. Work Required:** Significant to Major  
- Customer character profile (different knowledge boundaries from staff)
- Consent and privacy architecture (customers are not employees)
- Knowledge boundary: what can a customer DC know and say?
- Accountability governance for customer-facing responses
- UX design for customer interaction modalities

**D. Dependencies and Prerequisites**  
- Hard: Staff-controlled handover architecture (SIR-007) validated first; Customer consent and privacy architecture
- Desirable: Internal DC model proven before customer deployment

**E. Earliest Sensible Implementation Point:** After SIR-007 is validated and customer consent architecture exists.

**F. Alternative Possibilities:** Begin with a read-only customer-facing experience (menu, venue information) before a live conversational customer DC.

**G. Capability Boundary:** Within intended future capability; consent governance is a hard prerequisite.

**H. Recommended Register Update:** Note SIR-007 as hard prerequisite in Next Action.

---

### SIR-018 — Hardware and Equipment Integration Layer

**A. Repository Alignment:** Already Documented (Research Programme)  
`docs/hardware/HARDWARE_AWARENESS.md` exists explicitly as a "Research Programme" covering: Temperature, Label Printing, Cameras, Voice, Screens, Business Systems. The hardware principle is established. No integration layer is implemented.

**B. Natural Home:** `docs/hardware/HARDWARE_AWARENESS.md` is already the home; the integration layer would live in `platform/` when built.

**C. Work Required:** Major Programme (as a generic layer; individual integrations are Moderate)  
- Generic device abstraction layer
- Hardware-specific adapters (temperature, printer, display, etc.)
- Offline operation
- Evidence capture for hardware-sourced events
- Platform engineering for device pairing and lifecycle

**D. Dependencies and Prerequisites**  
- Hard: Specific hardware use-cases validated first (SIR-002, SIR-003 individually)
- Desirable: Venue Brain operational to consume hardware data

**E. Earliest Sensible Implementation Point:** After at least two hardware integrations are validated individually, then abstract a generic layer from the pattern.

**F. Alternative Possibilities:** Build integrations individually first and extract the generic layer once the pattern is clear, rather than designing the generic layer speculatively.

**G. Capability Boundary:** Within intended future capability; hardware selection is an external dependency.

**H. Recommended Register Update:** Note existing `HARDWARE_AWARENESS.md` as the current home.

---

### SIR-019 — Supplier and Purchasing Intelligence

**A. Repository Alignment:** New Strategic Capability  
No supplier or purchasing capability exists. `docs/VOLUME_VI_VENUE_BRAIN.md`'s Venue Brain includes "Venue Knowledge" which would encompass supplier relationships, but no design for this exists yet.

**B. Natural Home:** Venue Brain (supplier knowledge as Venue Knowledge dimension); Commercial capability in Hospitality HQ

**C. Work Required:** Significant  
- Supplier data model
- Purchasing/order history capture
- Product catalogue and pricing
- Supplier performance tracking
- Integration with existing backend

**D. Dependencies and Prerequisites**  
- Hard: Product and allergen data model in place
- Desirable: Venue Brain operational (Milestone 2+); backend data persistence stable

**E. Earliest Sensible Implementation Point:** After Venue Brain Milestone 2 and after the product data model is defined.

**F. Alternative Possibilities:** Manual supplier record entry before any automated purchasing integration. The DC conversation model can capture supplier info through onboarding dialogue.

**G. Capability Boundary:** Within intended future capability.

**H. Recommended Register Update:** No change. Link to Venue Brain as prerequisite.

---

### SIR-020 — Menu Costing and Commercial Intelligence

**A. Repository Alignment:** New Strategic Capability  
No menu costing or commercial intelligence exists. Architecturally related to SIR-019 (suppliers) and SIR-014 (Venue Brain).

**B. Natural Home:** Venue Brain → Commercial Intelligence dimension; Hospitality HQ professional knowledge

**C. Work Required:** Significant  
- Recipe data model (ingredients, quantities, costs)
- Gross profit calculation
- VAT handling (complex for hospitality: hot food, cold food, dine-in vs. takeaway)
- Menu versioning and pricing management
- Integration with supplier pricing (SIR-019)

**D. Dependencies and Prerequisites**  
- Hard: Product/ingredient data model; Supplier pricing data (SIR-019)
- Desirable: Venue Brain Milestone 2+

**E. Earliest Sensible Implementation Point:** After SIR-019 (supplier data) is operational.

**F. Alternative Possibilities:** Manual GP calculation worksheet captured through a DC conversation before automated costing.

**G. Capability Boundary:** Within intended future capability; VAT complexity may require professional authority input.

**H. Recommended Register Update:** Note dependency on SIR-019. Priority: Medium remains appropriate.

---

### SIR-021 — Payroll and Time-Rounding Intelligence

**A. Repository Alignment:** New Strategic Capability  
No payroll or clocking intelligence exists. The onboarding engine captures team structure but not time records.

**B. Natural Home:** Venue Brain → Operational Intelligence; Hospitality HQ → employment rules; governance for employment data (sensitive)

**C. Work Required:** Significant  
- Shift and attendance data model
- Venue-specific rule configuration (grace periods, intervals)
- Transparent calculation engine with explainability
- Employment law compliance (varies by country; connects to SIR-026)
- Privacy governance for employment data

**D. Dependencies and Prerequisites**  
- Hard: Employment data is legally sensitive; privacy and consent architecture required
- Desirable: Location/region context (SIR-026) — employment rules vary by jurisdiction

**E. Earliest Sensible Implementation Point:** After privacy governance for employment data is established and after Venue Brain is operational.

**F. Alternative Possibilities:** Capture payroll rules through a DC conversation and generate a report for human review, rather than automating pay calculation initially.

**G. Capability Boundary:** Within intended future capability; employment law varies by jurisdiction.

**H. Recommended Register Update:** Note dependency on privacy governance and SIR-026.

---

### SIR-022 — Waste and Utility Intelligence

**A. Repository Alignment:** New Strategic Capability  
Not addressed in `HARDWARE_AWARENESS.md` or the Venue Brain architecture. Narrower scope than most other SIRs.

**B. Natural Home:** Venue Brain → operational data dimensions; potentially Hospitality HQ for waste compliance rules

**C. Work Required:** Moderate  
- Waste and utility data model
- Document ingestion for contracts and invoices (connects to `DocumentCard.tsx` and `EvidenceGallery.tsx` which exist)
- Dispute and anomaly detection

**D. Dependencies and Prerequisites**  
- Desirable: Venue Brain document ingestion capability; `DocumentCard.tsx` and evidence gallery extended for non-food documents

**E. Earliest Sensible Implementation Point:** After Venue Brain is operational and document ingestion is proven for a first domain.

**F. Alternative Possibilities:** Use the existing document evidence capture (`EvidenceViewer.tsx`, `DocumentCard.tsx`) to capture waste invoices manually before building intelligence on top.

**G. Capability Boundary:** Within intended future capability.

**H. Recommended Register Update:** Priority: Low is appropriate.

---

### SIR-023 — Helping Hand Academy as Continuous Development

**A. Repository Alignment:** Strengthens Existing Work  
`docs/architecture/HELPING_HAND_UNIVERSITY_ARCHITECTURE.md` (HH-ARCH-CI-005, Foundation) defines the Academy as the School of Formation within Helping Hand University. The current implementation is initial-formation-focused. `docs/organisational-learning/INSTITUTIONAL_LEARNING_003_CONFLICT_CHARACTER_BASELINE.md` shows a learning cycle that already updated formation standards from evidence.

**B. Natural Home:** `docs/architecture/HELPING_HAND_UNIVERSITY_ARCHITECTURE.md` → extend existing University architecture.

**C. Work Required:** Moderate  
- Extend University architecture to describe post-graduation continuous development
- Define ongoing formation triggers (evidence-based, not time-based)
- Implement recurring formation cycles from institutional learning outputs

**D. Dependencies and Prerequisites**  
- Desirable: First full institutional learning cycle completed with evidence; Andy internal validation generating learning

**E. Earliest Sensible Implementation Point:** During Andy Stage 1 internal validation when the first real learning cycle produces feedback to the formation programme.

**F. Alternative Possibilities:** Extend existing institutional learning → formation standard update pathway (already demonstrated with INSTITUTIONAL_LEARNING_003) to become the continuous development mechanism.

**G. Capability Boundary:** Within current project capability; the mechanism already partially exists.

**H. Recommended Register Update:** Note that INSTITUTIONAL_LEARNING_003 demonstrates the feedback mechanism already works. Priority: High remains.

---

### SIR-024 — Founder and Organisational Insight Capture

**A. Repository Alignment:** Already Implemented (as candidate mechanism)  
`docs/PREVIOUSLY_DISCUSSED.md` and `docs/STRATEGIC_INSIGHTS_REGISTER.md` were created specifically for this purpose. PD-001 is the first entry. SIR-024 is largely self-implementing as a result of the current session.

**B. Natural Home:** Already has its home.

**C. Work Required:** Small (the mechanism is created; ongoing operation requires discipline rather than engineering)  
- Establish a regular review cadence for both documents
- Wire PREVIOUSLY_DISCUSSED into pre-decision workflow (pending ratification)
- Integrate SIR review into board cadence

**D. Dependencies and Prerequisites**  
- Desirable: PREVIOUSLY_DISCUSSED mechanism formally accepted through institutional review

**E. Earliest Sensible Implementation Point:** Immediate — the mechanism is already in use.

**F. Alternative Possibilities:** No better repository-aligned alternative identified.

**G. Capability Boundary:** Within current project capability; governance discipline dependency only.

**H. Recommended Register Update:** Status could move to "In Progress" given the mechanism now exists.

---

### SIR-025 — Digital Colleague as Interface, Not an App Menu

**A. Repository Alignment:** Already Architected  
`docs/architecture/DIGITAL-COLLEAGUE-COMPANION-BUILD-BLUEPRINT.md` states the DC needs full context before suggesting or executing anything. `lib/annie/brain/index.ts` shows Annie orchestrating capabilities without a menu-driven structure. The implementation is still a mobile app with conventional navigation screens.

**B. Natural Home:** This is an architectural and UX principle. Home is `docs/architecture/COMPANION-SYSTEM-ARCHITECTURE.md` and Digital Colleague character architecture.

**C. Work Required:** Significant (architectural shift in the app UX)  
- Conversation-first navigation redesign
- Progressive disclosure of capabilities through conversation
- Context-aware capability surfacing
- Deep link preservation for fallback navigation

**D. Dependencies and Prerequisites**  
- Hard: Digital Colleague conversation quality validated
- Desirable: Context Engine (SIR-015) operational

**E. Earliest Sensible Implementation Point:** After conversational interaction quality is validated internally, as a UX evolution of the existing app.

**F. Alternative Possibilities:** Overlay a conversational entry point on top of existing app navigation, progressively reducing the navigation surface as confidence in the conversational model grows.

**G. Capability Boundary:** Within current project capability; UX redesign is a significant undertaking.

**H. Recommended Register Update:** Note the existing architecture foundations. Priority: Foundational remains.

---

### SIR-026 — Location Awareness

**A. Repository Alignment:** Partially Covered  
`lib/os/knowledge/applicability/knowledgeApplicabilityMatcher.ts` implements region-based knowledge applicability. `lib/os/context/venueProfileService.ts` has `region: ""` as a venue dimension. Knowledge packages have `regions?: string[]` tags. The infrastructure for region-scoped knowledge exists. Cultural adaptation, legal/legislative variation, and language switching do not yet exist.

**B. Natural Home:** Context Engine (SIR-015) → extend existing `lib/os/context/` region dimension to cultural, legislative, and operational dimensions

**C. Work Required:** Significant  
- Cultural and legal dimension taxonomy
- Language/locale switching in DC responses
- Jurisdiction-aware professional knowledge
- Supplier knowledge by region
- Testing across at least two distinct operating regions

**D. Dependencies and Prerequisites**  
- Hard: Context Engine formalised (SIR-015)
- Desirable: Second operating region identified

**E. Earliest Sensible Implementation Point:** After Context Engine is operational and a second deployment region is being planned.

**F. Alternative Possibilities:** Extend the existing region-matching infrastructure in `lib/os/` rather than rebuilding. Add cultural and legislative dimensions to the existing region taxonomy.

**G. Capability Boundary:** Within intended future capability; the core region infrastructure already exists.

**H. Recommended Register Update:** Note existing `knowledgeApplicabilityMatcher.ts` region implementation.

---

### SIR-027 — Digital Colleague Embodiment

**A. Repository Alignment:** Already Architected  
`docs/architecture/COMPANION-SYSTEM-ARCHITECTURE.md` Section 1 (Perception Capabilities) defines: "Vision (camera as eyes), Hearing (microphone as ears), Environment awareness." `docs/architecture/DIGITAL-COLLEAGUE-COMPANION-BUILD-BLUEPRINT.md` expands the implementation. `expo-speech-recognition` is installed; camera access is available. Full embodiment is not yet implemented.

**B. Natural Home:** `docs/architecture/COMPANION-SYSTEM-ARCHITECTURE.md` Section 1 is already the home.

**C. Work Required:** Major Programme  
- Vision: camera capture, image quality, OCR, computer vision
- Hearing: streaming speech-to-text fully wired
- Environment: time, location, shift state — partially exists
- Physical interface design: push-to-talk, wake phrase
- Each modality requires evidence capture and governance

**D. Dependencies and Prerequisites**  
- Hard: Each modality requires individual validation before integration
- Desirable: Context Engine to consume multi-modal signals

**E. Earliest Sensible Implementation Point:** Follow COMPANION-RUNTIME-EVOLUTION.md Milestone 4 (Voice) as the first embodiment step, then camera/vision.

**F. Alternative Possibilities:** No better alternative — follow the staged embodiment sequence in the existing architecture.

**G. Capability Boundary:** Within intended future capability; implemented incrementally per the existing evolution roadmap.

**H. Recommended Register Update:** Note CSA Section 1 and COMPANION-RUNTIME-EVOLUTION.md as existing architectural home.

---

### SIR-028 — Adaptive Appearance

**A. Repository Alignment:** New Strategic Capability (character foundation exists)  
`docs/architecture/COMPANION-SYSTEM-ARCHITECTURE.md` Section 0 (Character Capabilities) defines the character layer. No adaptive appearance system exists.

**B. Natural Home:** Digital Colleague character architecture; potentially a shared COS "appearance profile" capability

**C. Work Required:** Moderate  
- Visual identity design system per profession
- Appearance profile data model
- Cultural appropriateness review
- Asset creation for profession variants

**D. Dependencies and Prerequisites**  
- Desirable: Multiple Digital Colleagues exist to validate the adaptive model

**E. Earliest Sensible Implementation Point:** After a second Digital Colleague is being developed, when the need to differentiate is real rather than theoretical.

**F. Alternative Possibilities:** Establish a visual identity standard (style guide) first before building dynamic adaptation systems.

**G. Capability Boundary:** Within intended future capability; asset design and cultural appropriateness require design and governance input.

**H. Recommended Register Update:** No change. Priority: Medium remains.

---

### SIR-029 — Environmental Awareness

**A. Repository Alignment:** Partially Covered  
`docs/architecture/COMPANION-SYSTEM-ARCHITECTURE.md` Section 1 includes "Environment awareness (time, location, role, shift, network, equipment context)." `lib/annie/environment/` exists (manager, situation, source, observation). Current implementation tracks shift context and operational environment. Physical environment adaptation across profession contexts is not yet implemented.

**B. Natural Home:** Generalise `lib/annie/environment/` → `lib/os/context/` as a COS capability; Context Engine (SIR-015)

**C. Work Required:** Moderate  
- Extend environment taxonomy to cover non-hospitality operational environments
- Behaviour adaptation rules per environment type
- Integration with Context Engine

**D. Dependencies and Prerequisites**  
- Hard: Context Engine (SIR-015) formalised
- Desirable: Multiple profession contexts to validate adaptation

**E. Earliest Sensible Implementation Point:** During Context Engine formalisation — environment taxonomy is a natural first dimension.

**F. Alternative Possibilities:** Generalise existing `lib/annie/environment/` to `lib/os/context/environment/` as the first step.

**G. Capability Boundary:** Within current project capability; partially implemented.

**H. Recommended Register Update:** Note existing `lib/annie/environment/` implementation. Priority: High remains.

---

### SIR-030 — Digital Colleague Senses

**A. Repository Alignment:** Already Architected  
`docs/architecture/COMPANION-SYSTEM-ARCHITECTURE.md` Section 1 (Perception Capabilities) is identical in intent. `docs/hardware/HARDWARE_AWARENESS.md` adds sensor dimensions. The gap between architecture and implementation is significant.

**B. Natural Home:** `docs/architecture/COMPANION-SYSTEM-ARCHITECTURE.md` Section 1 already is the home. At an organisational/philosophical level, the concept should inform Theory and Formation.

**C. Work Required:** Small to add philosophical articulation; Significant to Major for full implementation (see SIR-027)

**D. Dependencies and Prerequisites:** As per SIR-027

**E. Earliest Sensible Implementation Point:** As per SIR-027 embodiment sequence.

**F. Alternative Possibilities:** SIR-030 may be better expressed as a theory or philosophical document ("governed perception") rather than a separate SIR. The technical implementation is covered by SIR-027.

**G. Capability Boundary:** Within intended future capability; SIR-027 is the closer implementation reference.

**H. Recommended Register Update:** Consider noting relationship with SIR-027.

---

## 2. Relationship and Overlap Analysis

**SIR-004 · SIR-017 · SIR-025** — Three expressions of one strategic direction  
SIR-025 is the principle; SIR-004 is its external/web expression; SIR-017 is its customer-facing extension. Implementation sequence: SIR-025 → SIR-004 → SIR-017. SIR-017 requires SIR-007 (consent) first.

**SIR-006 · SIR-009 · SIR-015 · SIR-026 · SIR-029** — The Context Engine cluster  
SIR-015 is the enabling capability. SIR-006, SIR-009, SIR-026, and SIR-029 are all Context Engine dimensions. Sequence: SIR-015 → SIR-029 → SIR-026 → SIR-006 → SIR-009.

**SIR-003 · SIR-018 · SIR-027 · SIR-030** — The Sensing and Hardware cluster  
SIR-027 and SIR-030 are architectural complements (embodiment and senses). SIR-003 and SIR-018 are the operational manifestations. Sequence: SIR-003 and SIR-002 individually → SIR-018 (generic layer) → SIR-027/SIR-030 (full embodiment).

**SIR-010 · SIR-011 · SIR-012 · SIR-013** — Future Professions cluster  
All four share the same hard dependency: generic inheritance model proven beyond hospitality. Recommended sequence: hospitality → retail (SIR-013) → construction (SIR-012) → sports (SIR-010) → healthcare (SIR-011).

**SIR-014 · SIR-019 · SIR-020 · SIR-021 · SIR-022** — Venue Brain intelligence cluster  
SIR-014 is the enabling architecture. All others depend on it. Sequence: SIR-014 → SIR-019 → SIR-020 → SIR-021 → SIR-022.

**SIR-007 · SIR-008** — Human support boundary cluster  
Both require safeguarding governance and consent architecture. SIR-007 must precede SIR-008.

---

## 3. Capability Clusters

**Cluster A — Context Intelligence**  
SIR-015, SIR-006, SIR-009, SIR-026, SIR-029  
Gate: SIR-015 (Context Engine). Sequence: SIR-015 → SIR-029 → SIR-026 → SIR-006 → SIR-009.

**Cluster B — Digital Colleague Interface**  
SIR-025, SIR-004, SIR-017, SIR-005, SIR-007  
Gate: internal CI model validated + consent architecture. Sequence: SIR-025 → SIR-005 → SIR-004 → SIR-007 → SIR-017.

**Cluster C — Sensing and Embodiment**  
SIR-027, SIR-030, SIR-028, SIR-003, SIR-018, SIR-002  
Gate: hardware integration governance + COMPANION-RUNTIME-EVOLUTION milestones. Sequence: SIR-003 → SIR-002 → SIR-018 → SIR-027/SIR-030 → SIR-028.

**Cluster D — Venue and Organisational Intelligence**  
SIR-014, SIR-019, SIR-020, SIR-021, SIR-022, SIR-001, SIR-023  
Gate: Venue Brain Milestone 2 + Companion Runtime multi-capability validation. Sequence: SIR-014 → SIR-001 → SIR-019 → SIR-020 → SIR-021 → SIR-022.

**Cluster E — Human Support and Wellbeing**  
SIR-007, SIR-008, SIR-009, SIR-006  
Gate: consent, safeguarding, emotional intelligence. Sequence: SIR-009 → SIR-006 → SIR-007 → SIR-008.

**Cluster F — Future Professions**  
SIR-010, SIR-011, SIR-012, SIR-013  
Gate: generic inheritance model proven. Sequence: SIR-013 → SIR-012 → SIR-010 → SIR-011.

**Cluster G — Organisational Learning and Governance**  
SIR-016, SIR-023, SIR-024  
Gate: PREVIOUSLY_DISCUSSED and SIR mechanisms; Academy post-graduation lifecycle. Sequence: SIR-024 (already in use) → SIR-023 → SIR-016.

---

## 4. Workload Assessment

| SIR | Insight | Alignment | Workload | Earliest Point | Main Dependency | Alternative | Capability Boundary |
|-----|---------|-----------|----------|----------------|-----------------|-------------|---------------------|
| 001 | Shift4 / Lighthouse | New Strategic Capability | Significant | After first production venue | Vendor API access | Manual CSV first | Within scope; external dependency |
| 002 | Food Label Printing | Already Documented | Moderate | After kitchen workflow live | Product/allergen data model | Partner with label software provider | Within scope; hardware dependency |
| 003 | Auto Temperatures | Already Documented | Significant | After manual workflow live validation | Sensor hardware selection | Manual + photo first | Within scope; hardware dependency |
| 004 | Website as DC | New Strategic Capability | Significant–Major | After Andy Stage 1 + consent arch | Customer consent architecture | Conversational widget overlay first | Within scope; web engineering new |
| 005 | Voice Onboarding | Partially Covered | Moderate | After voice Milestone 4 | Voice adapter proven | Dictation mode on existing form | Within current capability |
| 006 | Person-Appropriate Comms | Partially Covered | Moderate | After Context Engine designed | Context Engine (SIR-015) | Start with role-appropriate first | Within intended scope |
| 007 | Staff-Customer Handover | New Strategic Capability | Significant | After safeguarding governance ratified | Consent and safeguarding architecture | Introduce-to-app flow first | Within intended scope |
| 008 | Beyond the Clock | New Strategic Capability | Significant | After SIR-007 + SIR-009 | Safeguarding governance | Within-work emotional context first | Within intended scope |
| 009 | Emotional Intelligence | Partially Covered | Significant | After Andy Stage 1 validation | Judgement Engine matured | Formalise formation evidence into COS | Within intended scope |
| 010 | Sports DC | New Strategic Capability | Major Programme | After generic inheritance proven | Professional knowledge authority | Partner with sports science org | Within intended scope |
| 011 | Healthcare DC | New Strategic Capability | Major Programme | After second domain proven | Regulatory compliance + clinical authority | Wellness/workplace wellbeing first | Within intended scope; highest regulatory barrier |
| 012 | Construction DC | New Strategic Capability | Major Programme | After generic inheritance proven | H&S professional knowledge | Site safety checklist as bounded first capability | Within intended scope |
| 013 | Retail DC | New Strategic Capability | Major Programme | After hospitality proves template | Generic inheritance model | Retail as second domain proof | Within intended scope |
| 014 | Venue Intelligence | Already Architected | Major Programme | After CSA-0003 + first production venue | Companion Runtime multi-capability | Follow COMPANION-RUNTIME-EVOLUTION stages | Foundational; partially implemented |
| 015 | Context Engine | Already Architected | Significant | During Andy Stage 1 | Privacy governance for person profiles | Formalise existing lib/os/context/ first | Within current capability |
| 016 | Cross-DC Learning | Already Architected | Small–Moderate | After second DC operational | Multiple DCs in operation | No better alternative — infrastructure exists | Within current capability |
| 017 | CI for Customers | New Strategic Capability | Significant–Major | After SIR-007 validated | Customer consent + SIR-007 | Read-only customer experience first | Within intended scope |
| 018 | Hardware Layer | Already Documented | Major Programme | After SIR-002 + SIR-003 individually | Individual integrations first | Build individually then abstract | Within intended scope |
| 019 | Supplier Intelligence | New Strategic Capability | Significant | After Venue Brain Milestone 2 | Product data model + Venue Brain | Manual DC conversation capture first | Within intended scope |
| 020 | Menu Costing | New Strategic Capability | Significant | After SIR-019 | Supplier pricing data | Manual GP worksheet via DC | Within intended scope |
| 021 | Payroll Intelligence | New Strategic Capability | Significant | After privacy governance + Venue Brain | Employment data privacy architecture | Rule capture + human report first | Within intended scope; jurisdiction-dependent |
| 022 | Waste Intelligence | New Strategic Capability | Moderate | After Venue Brain doc ingestion | Venue Brain document layer | Manual evidence capture (existing tools) | Within intended scope |
| 023 | Academy Continuous Dev | Strengthens Existing | Moderate | During Andy Stage 1 | Institutional learning cycle | Extend existing evidence→formation pathway | Within current capability |
| 024 | Founder Insight Capture | Already Implemented | Small | Immediate | Governance discipline | No better alternative | Within current capability |
| 025 | DC as Interface | Already Architected | Significant | After conversational quality validated | Context Engine + DC maturity | Overlay on existing app navigation first | Within current capability |
| 026 | Location Awareness | Partially Covered | Significant | After Context Engine + second region | Context Engine (SIR-015) | Extend existing region infrastructure | Within current capability |
| 027 | DC Embodiment | Already Architected | Major Programme | Follow COMPANION-RUNTIME-EVOLUTION | Staged embodiment validation | Follow existing evolution roadmap | Within intended scope |
| 028 | Adaptive Appearance | New Strategic Capability | Moderate | After second DC in development | Multiple DCs for differentiation | Style guide before dynamic system | Within intended scope |
| 029 | Environmental Awareness | Partially Covered | Moderate | During Context Engine formalisation | Context Engine (SIR-015) | Generalise lib/annie/environment/ first | Within current capability |
| 030 | DC Senses | Already Architected | Major Programme | As per SIR-027 | As per SIR-027 | May merge with SIR-027 at theory level | Within intended scope |

**Totals:**

| Category | Count |
|---|---|
| Already Implemented | 1 (SIR-024) |
| Already Architected | 6 (SIR-014, 015, 016, 025, 027, 030) |
| Already Documented | 3 (SIR-002, 003, 018) |
| Partially Covered | 5 (SIR-005, 006, 009, 026, 029) |
| Strengthens Existing | 2 (SIR-016 partially, SIR-023) |
| New Strategic Capabilities | 14 (SIR-001, 004, 007, 008, 010, 011, 012, 013, 017, 019, 020, 021, 022, 028) |
| Small workloads | 2 (SIR-016, SIR-024) |
| Moderate workloads | 8 (SIR-002, 005, 006, 022, 023, 028, 029, SIR-016) |
| Significant workloads | 11 (SIR-001, 003, 007, 008, 009, 015, 017, 019, 020, 021, 026) |
| Major Programmes | 9 (SIR-004*, 010, 011, 012, 013, 014, 018, 027, 030) |
| Requires External Partnership | 6 (SIR-001, 002, 003, 010, 011, 012, 018) |
| Requires Professional Authority | 4 (SIR-011, 012, 010, 021) |
| Requires Founder Decision | SIR-007, 008, 011, 013, 017, 021, 026 |
| Outside Intended Scope | 0 |

---

## 5. Dependency-Led Strategic Sequence

### Foundations — must precede most other work
1. **Stage 1 internal validation** (Andy + board as first learning organisation — PD-001)
2. **Companion Runtime multi-capability validation** (CSA-0003) — unlocks Venue Brain and most operational intelligence
3. **Context Engine formalisation** (SIR-015 + existing lib/os/context/) — unlocks SIR-006, SIR-026, SIR-029
4. **Voice input adapter** (COMPANION-RUNTIME-EVOLUTION Milestone 4) — unlocks SIR-005, SIR-027

### Enabling Capabilities — unlock multiple others
5. **Venue Brain Milestone 1.5 + 2** (SIR-014) — unlocks SIR-019, SIR-020, SIR-021, SIR-022
6. **Consent and safeguarding architecture** — unlocks SIR-007, SIR-008, SIR-017, SIR-021
7. **Context Engine dimensions** (SIR-029 → SIR-026 → SIR-006 → SIR-009) — sequential extensions

### First Domain Applications — hospitality proven
8. SIR-003 — automatic temperature sensing (after manual workflow live)
9. SIR-002 — food label printing (after product/allergen data)
10. SIR-005 — voice onboarding (after voice adapter proven)
11. SIR-025 — DC as interface (conversation-first UX evolution)
12. SIR-019 → SIR-020 — supplier then commercial intelligence

### External Integrations
13. SIR-001 — Shift4/Lighthouse (after venue platform stable)
14. SIR-018 — generic hardware layer (after SIR-002 and SIR-003 prove the pattern)
15. SIR-004 — website as DC (after internal validation complete + consent architecture)
16. SIR-007 → SIR-017 — customer handover then customer CI

### Future Professions — generic inheritance demonstrated
17. SIR-013 — Retail (closest to hospitality; second domain proof)
18. SIR-012 — Construction
19. SIR-010 — Sports
20. SIR-011 — Healthcare (highest regulatory bar)

### Long-Term Embodiment
21. SIR-027 / SIR-030 — full embodiment per COMPANION-RUNTIME-EVOLUTION
22. SIR-028 — adaptive appearance (once multiple DCs exist)

**Insights that unlock several others:**
- **SIR-015 (Context Engine)** unlocks SIR-006, SIR-026, SIR-029, SIR-025
- **SIR-014 (Venue Brain)** unlocks SIR-019, SIR-020, SIR-021, SIR-022
- **Consent architecture** unlocks SIR-007, SIR-008, SIR-017, SIR-021
- **Stage 1 completion** unlocks all future-profession and external-integration decisions

---

## 6. Suggested Register Updates (recommended, not applied)

| SIR | Recommended Change | Evidence |
|-----|-------------------|----------|
| SIR-002 | Add note: home already exists in `docs/hardware/HARDWARE_AWARENESS.md` | Confirmed at Research Programme status |
| SIR-003 | Same as SIR-002 | Same document |
| SIR-015 | Next Action: "Formalise existing lib/os/context/ as Context Engine v1 before adding new dimensions" | lib/os/context/ and JUDGEMENT_ENGINE.md confirmed |
| SIR-016 | Next Action: "Validate after second DC operational; infrastructure already exists" | lib/learning/, lib/knowledge-governance/ confirmed |
| SIR-018 | Next Action: "Build SIR-002 and SIR-003 individually first; abstract generic layer from the pattern" | HARDWARE_AWARENESS.md principle |
| SIR-024 | Status: recommend "In Progress" — PREVIOUSLY_DISCUSSED.md and SIR are now in use | This review session |
| SIR-026 | Next Action: "Extend existing region taxonomy in lib/os/knowledge/applicability/" | knowledgeApplicabilityMatcher.ts confirmed |
| SIR-027 | Next Action: "Follow COMPANION-RUNTIME-EVOLUTION.md Milestone 4 sequence" | COMPANION-RUNTIME-EVOLUTION.md confirmed |
| SIR-029 | Next Action: "Generalise lib/annie/environment/ to lib/os/context/environment/ as first step" | lib/annie/environment/ confirmed |
| SIR-030 | Consider adding relationship note to SIR-027; consider theory document for "governed perception" | CSA Section 1 already covers the architecture |

---

## 7. Founder Decisions Required

1. **Which second profession?** Retail (SIR-013), construction (SIR-012), sports (SIR-010), or healthcare (SIR-011)? Healthcare has the highest regulatory burden; retail is the closest to hospitality.

2. **When to pursue customer-facing Digital Colleagues?** SIR-004, SIR-007, and SIR-017 all require a customer consent and safeguarding governance framework first. The founders must decide when to design and ratify that framework, and who owns it.

3. **Which hardware integrations first?** SIR-002 (label printing), SIR-003 (temperature sensors), or both simultaneously? The answer determines whether a generic hardware abstraction layer (SIR-018) is worth building early.

4. **Shift4 or Lighthouse — or neither yet?** SIR-001 requires a vendor commercial relationship. Pursue API access now or defer until the venue platform is commercially stable?

5. **Second operating region?** SIR-026 and SIR-021 are both jurisdiction-sensitive. The choice of second region shapes the complexity of cultural and legal adaptation work.

6. **Emotional intelligence and beyond-the-clock support** (SIR-008, SIR-009): what is Helping Hand's responsibility when a staff member is in personal difficulty? This is a values question as much as an engineering one.

7. **PREVIOUSLY_DISCUSSED mechanism acceptance**: SIR-024 is in use but the mechanism is still a candidate. Should it proceed to institutional review now, or after Stage 1 validation?

8. **Payroll intelligence** (SIR-021): native Helping Hand capability or integration with existing payroll systems, and under what professional authority?

---

*No files were modified. No architecture was created. No commitments were made. This review is for founder decision-making only.*
