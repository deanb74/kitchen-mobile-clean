// Andy's formation layer — DC layer for Humanity / Helping Hand understanding.
// Inherits all universal formation capabilities; adds only institutional translation and knowledge conversion.

export {
    knowledgeAnswersToFormation, knowledgeAnswerToFormation, repositoryDocumentsToFormation, repositoryDocumentToKnowledgeAnswer
} from "./knowledgeAdapter";

export {
    institutionalTranslationRules, repositoryDocumentToObservation, translateDocumentsForFormation
} from "./translationAdapter";

// Inherited unchanged from Annie's DC-layer formation pipeline.
export {
    assembleFormationContext, assessReadiness, contextEntriesToInstitutional, thoughtToSituationalContext
} from "../../annie/formation";
export type { ReadinessDecision, ReadinessNextStep } from "../../annie/formation";

export {
    applyContextDoorEvent, beginContextDoor, inspectContextDoor
} from "./contextDoor";
export type {
    BeginContextDoorInput,
    ContextDoorAlignmentStatus,
    ContextDoorEvent,
    ContextDoorInspection,
    ContextDoorPhase,
    ContextDoorRecord
} from "./contextDoor";

