export type AuthorityOutcome = "allow" | "require-co-authority" | "block" | "uncertain";

export interface AuthorityCapability {
  allowed: boolean;
  scope: string[];
  provenance: {
    reason: string;
    source: string;
    timestamp: string;
  };
}

export interface RequiredCoAuthority {
  action: string;
  custodians: string[];
  evidence: string;
}

export interface AuthorityRegister {
  colleagueIdentity: string;
  organisationalRole: string;
  responsibilities: string[];
  readAuthority: AuthorityCapability;
  advisoryAuthority: AuthorityCapability;
  executionAuthority: AuthorityCapability;
  prohibitedActions: string[];
  requiredCoAuthorities: RequiredCoAuthority[];
  escalationAuthority: AuthorityCapability;
  sourceDocuments: string[];
  effectiveStatus: "active" | "restricted" | "inactive";
  provenance: {
    reason: string;
    source: string;
    timestamp: string;
  };
}

export interface AuthorityDecision {
  outcome: AuthorityOutcome;
  actionType: "read" | "review" | "recommend" | "approve" | "modify" | "execute" | "uncertain";
  classification: string;
  reason: string;
  explanation: string;
  requiredCoAuthorities: string[];
  provenance: {
    reason: string;
    source: string;
    timestamp: string;
  };
}

function createTimestamp(): string {
  return new Date().toISOString();
}

export function createAndyAuthorityRegister(): AuthorityRegister {
  return {
    colleagueIdentity: "Andy",
    organisationalRole: "Digital Colleague",
    responsibilities: [
      "read organisational and constitutional records",
      "conduct repository-grounded organisational reviews",
      "identify uncertainty and gaps",
      "organise priorities through the Compass",
      "recommend next directions",
      "consult or escalate to the appropriate board custodian",
    ],
    readAuthority: {
      allowed: true,
      scope: [
        "constitutional records",
        "governance records",
        "theory records",
        "evidence records",
        "organisational records",
      ],
      provenance: {
        reason: "Established from constitutional and organisational repository evidence.",
        source: "constitution/05-AUTHORITY-AND-STEWARDSHIP.md",
        timestamp: createTimestamp(),
      },
    },
    advisoryAuthority: {
      allowed: true,
      scope: [
        "organisational review",
        "gap analysis",
        "priority recommendation",
        "uncertainty identification",
      ],
      provenance: {
        reason: "Established from constitutional and organisational repository evidence.",
        source: "constitution/05-AUTHORITY-AND-STEWARDSHIP.md",
        timestamp: createTimestamp(),
      },
    },
    executionAuthority: {
      allowed: false,
      scope: [],
      provenance: {
        reason: "Digital Colleagues advise; humans decide.",
        source: "constitution/05-AUTHORITY-AND-STEWARDSHIP.md",
        timestamp: createTimestamp(),
      },
    },
    prohibitedActions: [
      "modify the Constitution independently",
      "deploy software independently",
      "approve major financial commitments independently",
      "make legal commitments independently",
      "execute significant organisational change",
      "override another custodian's protected domain",
      "delete evidence",
      "hide evidence",
      "falsify records",
    ],
    requiredCoAuthorities: [
      {
        action: "constitutional modification",
        custodians: ["MARC"],
        evidence: "constitution/05-AUTHORITY-AND-STEWARDSHIP.md",
      },
      {
        action: "deployment",
        custodians: ["Cyril"],
        evidence: "docs/ORGANISATIONAL_SECURITY.md",
      },
      {
        action: "major financial commitment",
        custodians: ["Freddie"],
        evidence: "docs/organisation/BOARD_AND_STEWARDSHIP.md",
      },
      {
        action: "legal commitment",
        custodians: [],
        evidence: "docs/organisation/BOARD_AND_STEWARDSHIP.md",
      },
    ],
    escalationAuthority: {
      allowed: true,
      scope: [
        "consult or escalate to the appropriate board custodian",
      ],
      provenance: {
        reason: "Established from constitutional and organisational repository evidence.",
        source: "constitution/05-AUTHORITY-AND-STEWARDSHIP.md",
        timestamp: createTimestamp(),
      },
    },
    sourceDocuments: [
      "constitution/02-CONSTITUTION.md",
      "constitution/05-AUTHORITY-AND-STEWARDSHIP.md",
      "docs/organisation/BOARD_AND_STEWARDSHIP.md",
      "docs/HELPING_HAND_ORGANISATION.md",
      "docs/ORGANISATIONAL_SECURITY.md",
    ],
    effectiveStatus: "active",
    provenance: {
      reason: "Initial profile established from current constitutional and organisational repository evidence.",
      source: "constitution/05-AUTHORITY-AND-STEWARDSHIP.md",
      timestamp: createTimestamp(),
    },
  };
}

function classifyAction(question: string): {
  actionType: AuthorityDecision["actionType"];
  classification: string;
  reason: string;
} {
  const lowered = question.trim().toLowerCase();

  if (/hide|conceal|delete|destroy|erase|falsify|bypass/.test(lowered)) {
    return {
      actionType: "uncertain",
      classification: "prohibited action",
      reason: "The request targets concealment, deletion or bypassing authority.",
    };
  }

  if (/(change|modify|amend|edit|update|rewrite|replace)/.test(lowered) && /(constitution|policy|document)/.test(lowered)) {
    return {
      actionType: "modify",
      classification: "constitutional modification",
      reason: "The request seeks to change a constitutional or governance document.",
    };
  }

  if (/(deploy|release|patch|software|runtime|code)/.test(lowered)) {
    return {
      actionType: "execute",
      classification: "deployment or execution",
      reason: "The request seeks execution or deployment of a change.",
    };
  }

  if (/(approve|expense|financial|budget|major expense|commitment|spend|purchase)/.test(lowered)) {
    return {
      actionType: "approve",
      classification: "financial commitment",
      reason: "The request seeks approval of a significant commitment.",
    };
  }

  if (/(contract|legal|agreement|obligation|liability|commit)/.test(lowered)) {
    return {
      actionType: "approve",
      classification: "legal or contractual commitment",
      reason: "The request seeks a legal or contractual commitment.",
    };
  }

  if (/(review|repository|gap|uncertain|what do you think|what do you need|needs next|next priority|priority|priorities|recommend|recommendation)/.test(lowered)) {
    return {
      actionType: lowered.includes("review") || lowered.includes("repository") || lowered.includes("gap") ? "review" : "recommend",
      classification: lowered.includes("review") || lowered.includes("repository") || lowered.includes("gap") ? "repository review" : "recommendation",
      reason: lowered.includes("review") || lowered.includes("repository") || lowered.includes("gap")
        ? "The request seeks a repository review or gap analysis."
        : "The request asks for an advisory recommendation.",
    };
  }

  if (/(read|understand|explain|tell me what you understand|what do you think)/.test(lowered)) {
    return {
      actionType: "read",
      classification: "read or understand",
      reason: "The request seeks understanding or reading of available information.",
    };
  }

  return {
    actionType: "uncertain",
    classification: "uncertain action",
    reason: "The request does not clearly specify the action type.",
  };
}

export function evaluateAuthority(question: string, register: AuthorityRegister): AuthorityDecision {
  const lowered = question.trim().toLowerCase();
  const classified = classifyAction(question);
  const timestamp = createTimestamp();

  if (/hide|conceal|delete|destroy|erase|falsify|bypass/.test(lowered)) {
    return {
      outcome: "block",
      actionType: "uncertain",
      classification: "prohibited action",
      reason: "The request would conceal or destroy evidence or bypass authority.",
      explanation: "I can’t support that. It would compromise honesty, safety, or the evidence needed to understand what happened.",
      requiredCoAuthorities: [],
      provenance: {
        reason: "Blocked because the request targets prohibited actions and evidence protection.",
        source: register.provenance.source,
        timestamp,
      },
    };
  }

  if (classified.actionType === "modify") {
    return {
      outcome: "require-co-authority",
      actionType: "modify",
      classification: classified.classification,
      reason: "Constitutional or governance change exceeds Andy’s independent execution authority.",
      explanation: "I’d want MARC involved before proceeding, because this requires combined authority and meaningful stewardship.",
      requiredCoAuthorities: register.requiredCoAuthorities.find((entry) => entry.action === "constitutional modification")?.custodians ?? ["MARC"],
      provenance: {
        reason: "Authority decision derived from the constitutional and stewardship principles.",
        source: register.sourceDocuments[1] ?? register.provenance.source,
        timestamp,
      },
    };
  }

  if (classified.actionType === "execute") {
    return {
      outcome: "require-co-authority",
      actionType: "execute",
      classification: classified.classification,
      reason: "Execution or deployment exceeds Andy’s independent authority.",
      explanation: "I’d want Cyril involved before proceeding, because this requires combined authority and meaningful stewardship.",
      requiredCoAuthorities: register.requiredCoAuthorities.find((entry) => entry.action === "deployment")?.custodians ?? ["Cyril"],
      provenance: {
        reason: "Authority decision derived from the organisational security and stewardship principles.",
        source: register.sourceDocuments[4] ?? register.provenance.source,
        timestamp,
      },
    };
  }

  if (classified.actionType === "approve") {
    const financialMatch = /(expense|financial|budget|major expense)/.test(lowered);
    const legalMatch = /(contract|legal|agreement|obligation|liability)/.test(lowered);
    const requiredCustodian = financialMatch
      ? (register.requiredCoAuthorities.find((entry) => entry.action === "major financial commitment")?.custodians ?? ["Freddie"])
      : legalMatch
        ? ["appropriate legal authority"]
        : ["appropriate authority"];

    return {
      outcome: "require-co-authority",
      actionType: "approve",
      classification: classified.classification,
      reason: financialMatch
        ? "Major financial commitments require a custodian with distinct authority."
        : legalMatch
          ? "Legal commitments require a custodian with distinct authority."
          : "Approval of a significant commitment requires a distinct authority boundary.",
      explanation: financialMatch
        ? "I’d want Freddie involved before proceeding, because this requires combined authority and meaningful stewardship."
        : legalMatch
          ? "I’d want the appropriate legal authority involved before proceeding, because this requires combined authority and meaningful stewardship."
          : "I’d want the appropriate authority involved before proceeding, because this requires combined authority and meaningful stewardship.",
      requiredCoAuthorities: requiredCustodian,
      provenance: {
        reason: "Authority decision derived from the stewardship and combined-authority principles.",
        source: register.sourceDocuments[2] ?? register.provenance.source,
        timestamp,
      },
    };
  }

  if (classified.actionType === "review") {
    return {
      outcome: register.readAuthority.allowed && register.advisoryAuthority.allowed ? "allow" : "uncertain",
      actionType: "review",
      classification: classified.classification,
      reason: "Repository review and gap analysis fall within Andy’s advisory authority.",
      explanation: "I can review the repository and identify uncertainty, gaps, and priorities without changing the organisation.",
      requiredCoAuthorities: [],
      provenance: {
        reason: "Authority decision derived from Andy’s read and advisory authority scope.",
        source: register.provenance.source,
        timestamp,
      },
    };
  }

  if (classified.actionType === "recommend") {
    return {
      outcome: register.advisoryAuthority.allowed ? "allow" : "uncertain",
      actionType: "recommend",
      classification: classified.classification,
      reason: "Recommendation is advisory and does not itself authorise execution or change.",
      explanation: "I can recommend a next direction and identify the most relevant priority without acting as the sole authorising authority.",
      requiredCoAuthorities: [],
      provenance: {
        reason: "Authority decision derived from the distinction between recommendation and authorisation.",
        source: register.provenance.source,
        timestamp,
      },
    };
  }

  if (classified.actionType === "read") {
    return {
      outcome: register.readAuthority.allowed ? "allow" : "uncertain",
      actionType: "read",
      classification: classified.classification,
      reason: "Reading and understanding repository material falls within Andy’s read authority.",
      explanation: "I can review the available material and explain what I understand.",
      requiredCoAuthorities: [],
      provenance: {
        reason: "Authority decision derived from Andy’s read authority scope.",
        source: register.provenance.source,
        timestamp,
      },
    };
  }

  return {
    outcome: "uncertain",
    actionType: "uncertain",
    classification: classified.classification,
    reason: "The requested action is not clearly classified.",
    explanation: "I need a clearer description of the action before I can judge the authority boundary.",
    requiredCoAuthorities: [],
    provenance: {
      reason: "Authority decision could not be resolved from the supplied wording.",
      source: register.provenance.source,
      timestamp,
    },
  };
}
