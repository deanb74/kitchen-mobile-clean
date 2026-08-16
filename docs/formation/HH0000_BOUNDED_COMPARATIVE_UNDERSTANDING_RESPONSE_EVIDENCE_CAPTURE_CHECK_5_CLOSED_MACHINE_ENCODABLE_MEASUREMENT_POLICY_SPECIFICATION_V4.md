# HH-0000 Check 5 Corrected Canonical Measurement Policy Candidate V4

**Status:** CANDIDATE
**Specification date:** 2026-08-15
**Schema:** `HH-CHECK-5-CLOSED-MEASUREMENT-POLICY-4`
**Canonical payload byte length:** `422479`
**Canonical payload SHA-256:** `e39d39e1e510d5ffa79abcdc81dfef865fbe4d02bdacfd7e99e434c254295f7d`
**Historical closed POLICY-3:** `422369` bytes / `049ec7e81f8fea886648ac9f0691f04ff5be2e2f254dd8f01ad939d249eff99d` / unchanged historical governed Evidence
**Governed implementation-source access:** None
**Check 5:** `UNMEASURED`
**Check 6:** `NOT RUN`
**Implementation:** `UNACCEPTED`
**Authority result:** The one POLICY-4 candidate-construction-and-immediate-validation Authority is consumed by this candidate and exhausted.

# Repository Traceability

**Principle:** Truth before certainty; evidence before claims; human Authority; smallest justified change.
**Theory:** A corrected candidate serializes only settled policy, preserves historical closed bytes, and carries no closure or execution consequence.
**Architecture:** One complete POLICY-4 payload copied from closed POLICY-3 with one new schema identity and the settled namespace import declaration-kind correction.
**Engineering:** Pre-write identity verification, closed three-class structural comparison, deterministic canonicalization, one exclusive write, one immediate reread, and mandatory stop.
**Milestone:** Not Applicable.
**Evidence:** Candidate authorship and candidate-local identity only. No closure, namespace binding ownership, implementation, instrument, Check 5, Check 6, freeze, or acceptance Evidence.

## 1. Normative Boundary

Only the JSON payload between the markers is normative. Prose outside it adds zero machine-policy meaning. The payload remains a candidate and is not closed, final, frozen, accepted, released, authoritative for execution, or Check 5 PASS.

## 2. Canonicalization

Parse the payload once as JSON. Recursively sort every object key by ascending Unicode code point, preserve every array in authored order, serialize with JSON string escaping and no insignificant whitespace, encode as UTF-8 with no BOM and no terminal newline, then measure bytes and SHA-256. The result is the identity recorded above.

## 3. Complete Canonical Machine Payload

HH_CHECK_5_POLICY_PAYLOAD_BEGIN

```json
{
  "schema": "HH-CHECK-5-CLOSED-MEASUREMENT-POLICY-4",
  "decisionSemantics": {
    "status": "CANDIDATE",
    "policyAreaCount": 25,
    "cpdClosed": [
      "CPD-001",
      "CPD-002",
      "CPD-003",
      "CPD-004",
      "CPD-005",
      "CPD-006",
      "CPD-007",
      "CPD-008",
      "CPD-009",
      "CPD-010",
      "CPD-011",
      "CPD-012",
      "CPD-013",
      "CPD-014",
      "CPD-015"
    ],
    "historicalCandidate": {
      "canonicalByteLength": 6350,
      "canonicalSha256": "ff71059e5fbad04831bf8cbc6d408b44b265d8657446a1fe8c2b0c8e8d972186",
      "classification": "HISTORICAL_CANDIDATE_POLICY_EVIDENCE"
    },
    "check5": "UNMEASURED",
    "check6": "NOT_RUN",
    "implementation": "UNACCEPTED"
  },
  "sourceRoles": [
    {
      "role": "PRODUCTION",
      "path": "scripts/academy/support/responseEvidenceCapture.ts",
      "bytes": 16125,
      "sha256": "f986633d8dd0984b385320f61a2d4a38f593284690db3d03ff4d3f10614aacfe"
    },
    {
      "role": "FOCUSED_TEST",
      "path": "scripts/academy/support/__tests__/responseEvidenceCapture.test.ts",
      "bytes": 25324,
      "sha256": "6b56cae73f1dcf8db64bb9a41137b16d46897bc656802a6530a3fe45843eb53f"
    }
  ],
  "publicApiPolicy": {
    "options": {
      "declarationKind": "interface",
      "additionalMembers": false,
      "members": [
        {
          "name": "response",
          "type": {
            "kind": "keyword",
            "name": "string"
          },
          "required": true,
          "readonly": false
        },
        {
          "name": "attemptId",
          "type": {
            "kind": "keyword",
            "name": "string"
          },
          "required": true,
          "readonly": false
        },
        {
          "name": "authorityDocumentId",
          "type": {
            "kind": "keyword",
            "name": "string"
          },
          "required": true,
          "readonly": false
        },
        {
          "name": "externalCaptureRoot",
          "type": {
            "kind": "keyword",
            "name": "string"
          },
          "required": true,
          "readonly": false
        },
        {
          "name": "accessOwner",
          "type": {
            "kind": "keyword",
            "name": "string"
          },
          "required": true,
          "readonly": false
        },
        {
          "name": "reviewPurpose",
          "type": {
            "kind": "keyword",
            "name": "string"
          },
          "required": true,
          "readonly": false
        },
        {
          "name": "retainUntil",
          "type": {
            "kind": "keyword",
            "name": "string"
          },
          "required": true,
          "readonly": false
        },
        {
          "name": "dispositionRule",
          "type": {
            "kind": "named",
            "name": "ResponseCaptureDispositionRule"
          },
          "required": true,
          "readonly": false
        },
        {
          "name": "now",
          "type": {
            "kind": "function",
            "parameters": [],
            "returns": {
              "kind": "named",
              "name": "Date"
            }
          },
          "required": true,
          "readonly": false
        }
      ]
    },
    "reference": {
      "declarationKind": "interface",
      "additionalMembers": false,
      "members": [
        {
          "name": "attemptId",
          "type": {
            "kind": "keyword",
            "name": "string"
          },
          "required": true,
          "readonly": true
        },
        {
          "name": "byteLength",
          "type": {
            "kind": "keyword",
            "name": "number"
          },
          "required": true,
          "readonly": true
        },
        {
          "name": "sha256",
          "type": {
            "kind": "keyword",
            "name": "string"
          },
          "required": true,
          "readonly": true
        },
        {
          "name": "readBytes",
          "type": {
            "kind": "function",
            "parameters": [],
            "returns": {
              "kind": "named",
              "name": "Uint8Array"
            }
          },
          "required": true,
          "readonly": true
        }
      ]
    },
    "outcome": {
      "declarationKind": "typeAlias",
      "unionOrder": [
        "PRESERVATION_VERIFIED",
        "PRESERVATION_INCOMPLETE"
      ],
      "variants": [
        {
          "status": "PRESERVATION_VERIFIED",
          "additionalMembers": false,
          "members": [
            {
              "name": "status",
              "type": {
                "kind": "stringLiteral",
                "value": "PRESERVATION_VERIFIED"
              },
              "required": true,
              "readonly": true
            },
            {
              "name": "reference",
              "type": {
                "kind": "named",
                "name": "VerifiedResponseCaptureReference"
              },
              "required": true,
              "readonly": true
            }
          ]
        },
        {
          "status": "PRESERVATION_INCOMPLETE",
          "additionalMembers": false,
          "members": [
            {
              "name": "status",
              "type": {
                "kind": "stringLiteral",
                "value": "PRESERVATION_INCOMPLETE"
              },
              "required": true,
              "readonly": true
            },
            {
              "name": "attemptId",
              "type": {
                "kind": "keyword",
                "name": "string"
              },
              "required": true,
              "readonly": true
            }
          ]
        }
      ]
    },
    "exportedNames": [
      {
        "kind": "TYPE_ALIAS",
        "name": "ResponseCaptureDispositionRule"
      },
      {
        "kind": "INTERFACE",
        "name": "CaptureResponseEvidenceOptions"
      },
      {
        "kind": "INTERFACE",
        "name": "VerifiedResponseCaptureReference"
      },
      {
        "kind": "TYPE_ALIAS",
        "name": "ResponseCaptureOutcome"
      },
      {
        "kind": "FUNCTION",
        "name": "preserveResponseEvidence"
      }
    ],
    "dispositionRuleValues": [
      "DELETE_WHEN_DUE",
      "SEPARATE_AUTHORITY_REQUIRED_FOR_TRANSFER_OR_DELIVERY"
    ],
    "runtimeRules": {
      "deepFreezeOutcomeAndReference": true,
      "freshReadBytesCopy": true,
      "additionalPublicNames": false
    }
  },
  "functionAndPrivateSeamPolicy": {
    "name": "preserveResponseEvidence",
    "exportedDeclarationCount": 2,
    "uniquePublicNameCount": 1,
    "declarations": [
      {
        "role": "PUBLIC_OVERLOAD",
        "parameters": [
          {
            "name": "options",
            "type": {
              "kind": "named",
              "name": "CaptureResponseEvidenceOptions"
            },
            "required": true
          }
        ],
        "returnType": {
          "kind": "named",
          "name": "ResponseCaptureOutcome"
        },
        "body": false
      },
      {
        "role": "IMPLEMENTATION",
        "parameters": [
          {
            "name": "options",
            "type": {
              "kind": "named",
              "name": "CaptureResponseEvidenceOptions"
            },
            "required": true
          },
          {
            "name": "operations",
            "type": {
              "kind": "named",
              "name": "ResponseCaptureMechanicalOperations"
            },
            "required": false,
            "defaulted": false
          }
        ],
        "returnType": {
          "kind": "named",
          "name": "ResponseCaptureOutcome"
        },
        "body": true
      }
    ],
    "privateSeam": {
      "typeName": "ResponseCaptureMechanicalOperations",
      "exported": false,
      "reachableFromPublicOverload": false,
      "retained": false,
      "returned": false,
      "attachedToOutcomeOrReference": false,
      "operationIds": [
        "SHA256",
        "REPOSITORY_ROOT",
        "REALPATH",
        "LSTAT",
        "STAT",
        "EXISTS",
        "MKDIR",
        "OPEN",
        "WRITE",
        "FSYNC",
        "CLOSE",
        "RENAME",
        "READ_FILE",
        "REMOVE"
      ]
    }
  },
  "imports": {
    "PRODUCTION": [
      {
        "module": "node:crypto",
        "kind": "NAMED_VALUE",
        "bindings": [
          "createHash"
        ]
      },
      {
        "module": "node:fs",
        "kind": "DEFAULT_VALUE",
        "bindings": [
          "fs"
        ]
      },
      {
        "module": "node:path",
        "kind": "DEFAULT_VALUE",
        "bindings": [
          "path"
        ]
      },
      {
        "module": "../../support/repositoryRoot",
        "kind": "NAMED_VALUE",
        "bindings": [
          "resolveRepositoryRootFromDirectory"
        ]
      }
    ],
    "FOCUSED_TEST": [
      {
        "module": "node:crypto",
        "kind": "NAMED_VALUE",
        "bindings": [
          "createHash"
        ]
      },
      {
        "module": "node:fs",
        "kind": "DEFAULT_VALUE",
        "bindings": [
          "fs"
        ]
      },
      {
        "module": "node:os",
        "kind": "DEFAULT_VALUE",
        "bindings": [
          "os"
        ]
      },
      {
        "module": "node:path",
        "kind": "DEFAULT_VALUE",
        "bindings": [
          "path"
        ]
      },
      {
        "module": "@jest/globals",
        "kind": "NAMED_VALUE",
        "bindings": [
          "describe",
          "expect",
          "it",
          "jest"
        ]
      },
      {
        "module": "../../../support/repositoryRoot",
        "kind": "NAMED_VALUE",
        "bindings": [
          "resolveRepositoryRootFromDirectory"
        ]
      },
      {
        "module": "../responseEvidenceCapture",
        "kind": "NAMED_MIXED",
        "typeBindings": [
          "CaptureResponseEvidenceOptions",
          "ResponseCaptureOutcome"
        ],
        "valueBindings": [
          "preserveResponseEvidence"
        ]
      }
    ],
    "prohibitedForms": [
      "ALIAS",
      "DYNAMIC_IMPORT",
      "IMPORT_EXPRESSION",
      "NAMESPACE_IMPORT",
      "RE_EXPORT",
      "REQUIRE",
      "SIDE_EFFECT_IMPORT"
    ]
  },
  "d3v2": {
    "schema": "HH-CHECK-5-D3-STRUCTURAL-FACT-2",
    "predicateSchema": "HH-CHECK-5-D3-PREDICATE-2",
    "closedObjects": true,
    "selectorAlgebra": {
      "modes": [
        "ANY",
        "NONE_OF",
        "ONE_OF"
      ],
      "anyProhibitsValues": true,
      "setModesRequireNonemptySortedUniqueValues": true,
      "crossFieldConjunction": true,
      "withinValuesDisjunction": true,
      "unknownIsWildcard": false
    },
    "identifierNormalization": {
      "splitCharacters": [
        "_",
        "$",
        "/",
        ".",
        ":",
        "-"
      ],
      "splitCamelCase": true,
      "lowercaseAscii": true,
      "retainNonemptyTokens": true,
      "multiTokenMatch": "EXACT_CONSECUTIVE_SEQUENCE",
      "prohibited": [
        "COMMENT",
        "GLOB",
        "IDENTIFIER_SUBSTRING",
        "LITERAL",
        "RAW_SOURCE",
        "REGEX",
        "SIMILARITY",
        "STEMMING",
        "SYNONYM",
        "TEST_TITLE"
      ],
      "unresolved": "UNKNOWN"
    },
    "enums": {
      "SourceRole": [
        "FOCUSED_TEST",
        "PRODUCTION"
      ],
      "NodeKind": [
        "CALL",
        "DEPENDENCY",
        "IMPORT",
        "LITERAL",
        "NEW",
        "PROPERTY_READ",
        "PROPERTY_WRITE",
        "PUBLIC_DECLARATION",
        "PUBLIC_MEMBER"
      ],
      "ProvenanceKind": [
        "BUILTIN_GLOBAL",
        "IMPORT_BINDING",
        "LITERAL",
        "LOCAL_DECLARATION",
        "PARAMETER",
        "PUBLIC_VALUE",
        "SYNTHETIC_FIXTURE",
        "UNKNOWN"
      ],
      "OperationKind": [
        "CALL",
        "DECLARE",
        "FLOW",
        "IMPORT",
        "NEW",
        "READ",
        "WRITE"
      ],
      "Phase": [
        "PROHIBITED",
        "TERMINAL"
      ],
      "TerminalClass": [
        "AUTHORISED_TEST_PROBE",
        "IMPORT_EDGE",
        "ORDINARY_LITERAL",
        "PERMITTED_MECHANICAL_EDGE",
        "PUBLIC_API",
        "TEST_LITERAL_OR_FALSIFIER_DATA"
      ],
      "RootV2": [
        "../../support/repositoryRoot",
        "../../../support/repositoryRoot",
        "../responseEvidenceCapture",
        "@jest/globals",
        "Array",
        "Buffer",
        "Date",
        "Error",
        "EXPECT_CHAIN",
        "JSON",
        "LOCAL_PRIVATE",
        "Map",
        "Number",
        "Object",
        "PRIVATE_SEAM",
        "PUBLIC_VALUE",
        "Reflect",
        "RegExp",
        "Set",
        "SYNTHETIC_FIXTURE",
        "UNKNOWN",
        "Uint8Array",
        "node:crypto/createHash",
        "node:fs",
        "node:os",
        "node:path"
      ],
      "DataLabelV2": [
        "ABSOLUTE_MACHINE_PATH_LITERAL",
        "ATTEMPT_PATH",
        "BOOLEAN",
        "BYTE_LENGTH",
        "CORRUPTED_FICTIONAL_BYTES",
        "DENIED_MEMBER_LITERAL",
        "ERROR_CONTENT_FREE",
        "EXTERNAL_ROOT_PATH",
        "FICTIONAL_BYTES",
        "FICTIONAL_RESPONSE",
        "FILE_DESCRIPTOR",
        "FINAL_RECEIPT_PATH",
        "FINAL_RESPONSE_PATH",
        "GOVERNANCE_FIELD",
        "GOVERNED_SOURCE_PATH",
        "HASH_HEX",
        "INSTRUMENT_BYTES",
        "JSON_LOCAL",
        "LOCAL_COLLECTION",
        "NONE",
        "NUMBER",
        "PATH_SEGMENT",
        "PERSISTED_RESPONSE_BYTES",
        "POLICY_BYTES",
        "PRIVATE_IP_LITERAL",
        "PUBLIC_OUTCOME",
        "PUBLIC_REFERENCE",
        "RECEIPT_BYTES",
        "REPOSITORY_PATH",
        "REPOSITORY_PRECONDITION_PATH",
        "SEMANTIC_RESULT",
        "SOURCE_BYTES",
        "SOURCE_STRING",
        "SUITE_ROOT_PATH",
        "TIMESTAMP",
        "TOKEN_PATH",
        "UNKNOWN",
        "USERNAME_LITERAL"
      ],
      "DestinationLabelV2": [
        "ATTEMPT_FINAL_RECEIPT",
        "ATTEMPT_FINAL_RESPONSE",
        "ATTEMPT_TEMP_RECEIPT",
        "ATTEMPT_TEMP_RESPONSE",
        "CALLBACK",
        "DELIVERY",
        "ERROR_VALUE",
        "EXPECT_ASSERTION",
        "HASH_STATE",
        "LOCAL_ONLY",
        "NETWORK",
        "NONE",
        "OUTPUT",
        "PUBLIC_RETURN",
        "REPOSITORY",
        "RETAINED_STATE",
        "SEMANTIC_RESULT",
        "SUITE_OWNED_TEST_ROOT",
        "TRANSFER",
        "UI_DISPLAY",
        "UNKNOWN"
      ],
      "FlowLabel": [
        "ARGUMENT_TO_CALL",
        "ASSERTION_INPUT",
        "CALLBACK_ARGUMENT",
        "CLOSURE_CAPTURE",
        "COLLECTION_STORE",
        "CONSTRUCTOR_INPUT",
        "ERROR_MESSAGE",
        "FILESYSTEM_CONTENT",
        "FILESYSTEM_PATH",
        "HASH_INPUT",
        "HASH_OUTPUT",
        "JSON_CONTENT",
        "MODULE_SCOPE_STORE",
        "NONE",
        "OUTPUT_CONTENT",
        "PROPERTY_READ_RESULT",
        "PROPERTY_WRITE_VALUE",
        "PUBLIC_MEMBER_VALUE",
        "RECEIVER_OF_CALL",
        "RETURN_VALUE",
        "UNKNOWN"
      ],
      "AncestryRelationV2": [
        "AFTER_PRIOR_CAPTURE_OR_INVOCATION",
        "ESCAPES_TEST_CALLBACK",
        "IN_ASYNC_SCHEDULE",
        "IN_EXPECT_ASSERTION_CALLBACK",
        "IN_FALLBACK_BRANCH",
        "IN_FOCUSED_TEST_MODULE",
        "IN_IMPORTED_JEST_IT_CALLBACK",
        "IN_IMPORTED_JEST_IT_EACH_CALLBACK",
        "IN_LOOP_OR_RETRY",
        "IN_MODULE_SCOPE",
        "IN_PRODUCTION_MODULE",
        "IN_PUBLIC_DECLARATION",
        "IN_RETURN_EXPRESSION",
        "IN_SAME_CALL_PRIVATE_HELPER",
        "POSTDOMINATED_BY_REQUIRED_ASSERTION",
        "UNKNOWN"
      ],
      "ProvenanceFamily": [
        "CASE001_REPOSITORY_SERVICE_OR_EVIDENCE",
        "COGNITIVE_SEMANTIC_ANDY_PROVIDER",
        "DYNAMIC_EXECUTION_PROCESS_CONTROL",
        "ENVIRONMENT_COMPILER_FALLBACK",
        "LOGGING_STDOUT_STDERR",
        "NETWORK_TELEMETRY_ANALYTICS",
        "NONE",
        "OTHER_RESOLVED",
        "UI_CLIPBOARD_SHARE_DISPLAY",
        "UNKNOWN"
      ],
      "ImportForm": [
        "DYNAMIC_REQUIRE",
        "IMPORT_EXPRESSION",
        "NAMESPACE",
        "NOT_IMPORT",
        "RE_EXPORT",
        "SIDE_EFFECT",
        "STATIC_DEFAULT_VALUE",
        "STATIC_NAMED_MIXED",
        "STATIC_NAMED_TYPE",
        "STATIC_NAMED_VALUE",
        "UNKNOWN"
      ],
      "ImportAllowlistStatus": [
        "ALLOWLISTED",
        "NOT_IMPORT",
        "UNALLOWLISTED",
        "UNKNOWN"
      ],
      "ImportBindingStatus": [
        "ALIASED",
        "NO_BINDING",
        "NOT_IMPORT",
        "ORIGINAL_NAME",
        "UNKNOWN"
      ],
      "PublicCapability": [
        "ACCEPTED",
        "APPEND",
        "APPROVED",
        "CHECKER_RESULT",
        "CHMOD",
        "CLEANUP",
        "CLOSE",
        "COMPLIANT",
        "CONTRIBUTION",
        "DELETE",
        "DELIVERABLE",
        "DIRECTORY",
        "DISPOSE",
        "FILE_DESCRIPTOR",
        "FILENAME",
        "HANDLE",
        "MOVE",
        "NONE",
        "PATH",
        "PERMISSION",
        "REMOVE",
        "RENAME",
        "RETAINED_BYTES",
        "RETRYABLE",
        "ROOT",
        "SEMANTIC_RESULT",
        "TRUNCATE",
        "UNKNOWN",
        "UNLINK",
        "URL",
        "WRITE"
      ],
      "ControlFact": [
        "FALLBACK_BRANCH",
        "NONE",
        "SECOND_CAPTURE_OR_INVOCATION",
        "UNKNOWN"
      ],
      "ResponseFlowRelation": [
        "AUTHORISED_BYTE_LENGTH",
        "AUTHORISED_FRESH_COPY",
        "AUTHORISED_HASH",
        "AUTHORISED_PERSISTENCE",
        "NOT_RESPONSE_FLOW",
        "PROHIBITED_TRANSFORMATION_OR_EGRESS",
        "UNKNOWN"
      ],
      "FilesystemMutationRelation": [
        "AUTHORISED_WRITE_OR_REMOVE",
        "NOT_FILESYSTEM_MUTATION",
        "REMOVE_FORBIDDEN_TARGET",
        "RENAME_CROSS_DIRECTORY",
        "RENAME_NONCORRESPONDING_PAIR",
        "UNAUTHORISED_DESTINATION",
        "UNKNOWN"
      ],
      "ProbeFamily": [
        "CHECKER_EXCEPTION_AFTER_VERIFIED_CAPTURE",
        "DENIED_PUBLIC_MEMBER_LOOKUP",
        "FRESH_COPY_MUTATION",
        "FROZEN_OBJECT_MUTATION",
        "INJECTED_MECHANICAL_FAILURE",
        "NOT_PROBE",
        "SYNTHETIC_CORRUPTION",
        "UNKNOWN"
      ],
      "ProbeValidity": [
        "AUTHORISED",
        "NOT_PROBE",
        "UNAUTHORISED",
        "UNKNOWN"
      ],
      "TerminalCandidateStatus": [
        "EXACT_ONE_D4_OR_D6",
        "MULTIPLE_D4_OR_D6",
        "NOT_EXECUTABLE",
        "UNKNOWN",
        "ZERO_D4_OR_D6"
      ],
      "ProhibitedCategory": [
        "CASE001_REPOSITORY_SERVICE_OR_EVIDENCE",
        "COGNITIVE_SEMANTIC_ANDY_PROVIDER",
        "CONTRIBUTION_DELIVERY_TRANSFER",
        "DYNAMIC_EXECUTION_PROCESS_CONTROL",
        "ENVIRONMENT_COMPILER_FALLBACK",
        "LOGGING_STDOUT_STDERR",
        "NETWORK_TELEMETRY_ANALYTICS",
        "PROHIBITED_IMPORT_OR_DYNAMIC_LOAD",
        "PUBLIC_MUTATION_LIFECYCLE",
        "PUBLIC_PATH_ROOT_DESCRIPTOR",
        "PUBLIC_SEMANTIC_PERMISSION_RESULT",
        "RESPONSE_TRANSFORMATION_EGRESS",
        "RETRY_FEEDBACK_SECOND_TURN_ACTION",
        "UI_CLIPBOARD_SHARE_DISPLAY",
        "UNAUTHORISED_TEST_PROBE",
        "UNAUTHORISED_WRITE_OR_REMOVE",
        "UNKNOWN_EXECUTABLE_EDGE"
      ],
      "RecordKind": [
        "AUTHORISED_TEST_PROBE",
        "CALL_EXPRESSION",
        "DEPENDENCY_EDGE",
        "EXECUTABLE_PROPERTY_ACCESS",
        "EXPORTED_NAME",
        "EXPORT_DECLARATION",
        "IMPORTED_BINDING",
        "IMPORT_DECLARATION",
        "LITERAL_DATA",
        "NEW_EXPRESSION",
        "PARSER_DIAGNOSTIC",
        "PROHIBITED_FINDING",
        "PUBLIC_DECLARATION",
        "PUBLIC_MEMBER",
        "SOURCE_IDENTITY",
        "UNKNOWN_FINDING"
      ],
      "ComparisonId": [
        "SOURCE_IDENTITY",
        "IMPORT_ALLOWLIST",
        "PUBLIC_API_ALLOWLIST",
        "NODE_LEDGER_COMPLETE",
        "RECORDS_COMPLETE",
        "COUNTS_EQUAL",
        "PROHIBITED_ZERO",
        "TERMINAL_TOTAL",
        "CAPTURE_IDENTITY",
        "MANIFEST_RECOMPUTABLE"
      ],
      "FailureCode": [
        "AMBIGUOUS_TERMINAL_CLASS",
        "AUTHORITY_ALREADY_USED_OR_STATE_UNAVAILABLE",
        "AUTHORITY_STATE_APPEND_FAILURE",
        "CAPTURE_IDENTITY_MISMATCH",
        "CAPTURE_REREAD_FAILURE",
        "CAPTURE_SCHEMA_FAILURE",
        "CAPTURE_WRITE_FAILURE",
        "COUNT_MISMATCH",
        "IMPORT_ALLOWLIST_MISMATCH",
        "INSTRUMENT_IDENTITY_MISMATCH",
        "MANIFEST_RECOMPUTATION_MISMATCH",
        "MANIFEST_TOO_LARGE",
        "NODE_LEDGER_INCOMPLETE",
        "PARSER_DIAGNOSTIC",
        "PROHIBITED_FINDING",
        "PUBLIC_API_MISMATCH",
        "RECORD_DUPLICATE",
        "RECORD_MISSING",
        "REPOSITORY_IDENTITY_MISMATCH",
        "SOURCE_IDENTITY_MISMATCH",
        "TYPE_NORMALIZATION_UNKNOWN",
        "UNKNOWN_EXECUTABLE_EDGE"
      ],
      "OneUseState": [
        "ACQUIRED_UNCONSUMED",
        "CLOSED_FAIL",
        "CLOSED_PASS",
        "CLOSED_POST_CONSUMPTION_FAILURE",
        "CLOSED_PRE_CONSUMPTION_FAILURE",
        "CONSUMED"
      ],
      "OperationIdV2": [
        "ACTION",
        "ALIASED_IMPORT",
        "ALTERNATE_COMPILER_LOAD",
        "ARRAY_EVERY",
        "ARRAY_INCLUDES",
        "ARRAY_IS_ARRAY",
        "ARRAY_JOIN",
        "ARRAY_MAP",
        "ARRAY_PUSH",
        "ARRAY_SLICE",
        "ARRAY_SOME",
        "ARRAY_SORT",
        "BUFFER_COMPARE",
        "BUFFER_FROM_UTF8",
        "BUFFER_IS_BUFFER",
        "BYTE_LENGTH_READ",
        "BYTE_SLICE",
        "CHECKER_EXCEPTION_AFTER_VERIFIED_CAPTURE",
        "CHILD_PROCESS",
        "CONTRIBUTION",
        "CORRECTION_TURN",
        "CRYPTO_CREATE_HASH_SHA256",
        "DAEMON_CONTROL",
        "DATE_PARSE",
        "DATE_TO_ISO_STRING",
        "DELIVERY",
        "DENIED_PUBLIC_MEMBER_IN",
        "DENIED_PUBLIC_MEMBER_KEYS",
        "DENIED_PUBLIC_MEMBER_REFLECT_GET",
        "DYNAMIC_REQUIRE",
        "ENVIRONMENT_READ",
        "EVAL",
        "EVAL_LOAD",
        "EXPECT_MATCHER",
        "FALLBACK",
        "FEEDBACK",
        "FRESH_COPY_MUTATION",
        "FROZEN_OBJECT_MUTATION",
        "FS_CLOSE",
        "FS_EXISTS",
        "FS_FSYNC",
        "FS_LSTAT",
        "FS_MKDIR",
        "FS_OPEN_EXCLUSIVE",
        "FS_READ_FILE",
        "FS_REALPATH",
        "FS_REMOVE_BOUNDED",
        "FS_RENAME",
        "FS_STAT",
        "FS_WRITE",
        "FUNCTION_CONSTRUCTOR",
        "GLOBAL_COMPILER_LOAD",
        "HASH_DIGEST_HEX",
        "HASH_UPDATE",
        "IMPORT_EXPRESSION",
        "INJECTED_MECHANICAL_FAILURE_PROGRESS",
        "INJECTED_MECHANICAL_FAILURE_THROW",
        "JEST_DESCRIBE",
        "JEST_EXPECT",
        "JEST_FN",
        "JEST_IT",
        "JEST_SPY_ON",
        "JSON_PARSE",
        "JSON_STRINGIFY",
        "LOCAL_PRIVATE_CALL",
        "MAP_GET",
        "MAP_HAS",
        "MAP_SET",
        "MESSAGE",
        "NAMESPACE_IMPORT",
        "NEW_DATE",
        "NEW_ERROR_CONTENT_FREE",
        "NEW_MAP",
        "NEW_SET",
        "NEW_UINT8ARRAY",
        "NODE_PATH_RESOLUTION",
        "NUMBER_IS_FINITE",
        "NUMBER_IS_INTEGER",
        "OBJECT_ENTRIES",
        "OBJECT_FREEZE",
        "OBJECT_KEYS",
        "OBJECT_VALUES",
        "OS_TMPDIR",
        "PATH_BASENAME",
        "PATH_DIRNAME",
        "PATH_IS_ABSOLUTE",
        "PATH_JOIN",
        "PATH_RELATIVE",
        "PATH_RESOLVE",
        "PATH_SEP_READ",
        "PERMISSION_RESULT",
        "PRESERVE_RESPONSE_EVIDENCE_TEST_CALL",
        "PRIVATE_SEAM_CLOSE",
        "PRIVATE_SEAM_EXISTS",
        "PRIVATE_SEAM_FSYNC",
        "PRIVATE_SEAM_LSTAT",
        "PRIVATE_SEAM_MKDIR",
        "PRIVATE_SEAM_OPEN",
        "PRIVATE_SEAM_READ_FILE",
        "PRIVATE_SEAM_REALPATH",
        "PRIVATE_SEAM_REMOVE",
        "PRIVATE_SEAM_RENAME",
        "PRIVATE_SEAM_REPOSITORY_ROOT",
        "PRIVATE_SEAM_SHA256",
        "PRIVATE_SEAM_STAT",
        "PRIVATE_SEAM_WRITE",
        "PROCESS_CONTROL",
        "PUBLICATION",
        "QUEUE",
        "REGEXP_TEST",
        "REPEAT",
        "REPOSITORY_ROOT_RESOLVE",
        "RESPONSE_ALTERNATE_ENCODING",
        "RESPONSE_BASE64",
        "RESPONSE_BOM_PREFIX",
        "RESPONSE_CALLBACK_EGRESS",
        "RESPONSE_ERROR_EGRESS",
        "RESPONSE_EXCERPT",
        "RESPONSE_HEX",
        "RESPONSE_NEWLINE_APPEND",
        "RESPONSE_NORMALIZE",
        "RESPONSE_OUTPUT_EGRESS",
        "RESPONSE_PREFIX",
        "RESPONSE_PREVIEW",
        "RESPONSE_RECEIPT_CONTENT",
        "RESPONSE_SUFFIX",
        "RETRY",
        "RE_EXPORT",
        "SCHEDULE",
        "SECOND_CAPTURE_OR_INVOCATION",
        "SET_ADD",
        "SET_HAS",
        "SHELL_EXECUTION",
        "SIDE_EFFECT_IMPORT",
        "STRING_ENDS_WITH",
        "STRING_INCLUDES",
        "STRING_SPLIT",
        "STRING_STARTS_WITH",
        "STRING_TO_LOWER",
        "STRING_TO_UPPER",
        "STRING_TRIM",
        "SYNTHETIC_CORRUPTION",
        "TRANSFER",
        "UINT8ARRAY_FROM",
        "UNKNOWN",
        "VM_EXECUTION",
        "WORKER_THREADS"
      ],
      "GovernedLiteralId": [
        "NONE",
        "HASH_ALGORITHM_SHA256",
        "HASH_DIGEST_HEX",
        "TEXT_ENCODING_UTF8",
        "FILE_OPEN_EXCLUSIVE_WX",
        "FILE_MODE_OWNER_ONLY_384",
        "UNKNOWN"
      ],
      "ReceiverClass": [
        "NONE",
        "ARRAY",
        "BYTE_SEQUENCE",
        "DATE",
        "MAP",
        "REGEXP",
        "SET",
        "STRING",
        "SYNTHETIC_FIXTURE",
        "UNKNOWN"
      ],
      "CallablePosition": [
        "CALLEE",
        "ARGUMENT_0",
        "ARGUMENT_1",
        "ARGUMENT_2",
        "ARGUMENT_3",
        "ARGUMENT_4",
        "UNKNOWN"
      ],
      "CallableResolution": [
        "NONE",
        "UNIQUE_LOCAL_DECLARATION",
        "UNIQUE_PARAMETER",
        "NONLOCAL_OR_MULTIPLE",
        "UNKNOWN"
      ],
      "CallableScope": [
        "NONE",
        "SAME_FILE_PRIVATE",
        "NESTED_TEST_CALLBACK",
        "EXPORTED",
        "OTHER",
        "UNKNOWN"
      ],
      "CallableCycle": [
        "NONE",
        "ACYCLIC",
        "CYCLIC",
        "UNKNOWN"
      ],
      "CallableCapabilityReturn": [
        "NONE",
        "NO_CAPABILITY_RETURN",
        "CAPABILITY_RETURN",
        "UNKNOWN"
      ],
      "CallableTerminalStatus": [
        "NONE",
        "EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL",
        "ZERO_TERMINAL",
        "MULTIPLE_TERMINAL",
        "PROHIBITED",
        "UNKNOWN"
      ],
      "CallableEscape": [
        "NONE",
        "NO_SURVIVING_CAPTURE",
        "SURVIVING_CAPTURE",
        "UNKNOWN"
      ],
      "OperationRelation": [
        "NONE",
        "ROLE_ROOT_PRODUCTION_IMPORT",
        "ROLE_ROOT_TEST_IMPORT",
        "RENAME_RESPONSE_TEMP_FINAL_SAME_DIRECTORY",
        "RENAME_RECEIPT_TEMP_FINAL_SAME_DIRECTORY",
        "READ_FINAL_RESPONSE",
        "READ_FINAL_RECEIPT",
        "READ_SUITE_FIXTURE",
        "REMOVE_ATTEMPT_TEMP_RESPONSE",
        "REMOVE_ATTEMPT_TEMP_RECEIPT",
        "REMOVE_SUITE_FIXTURE",
        "SYNTHETIC_FIXTURE_MEMBER_TARGET",
        "OPTIONS_OBJECT_CONTAINS_FICTIONAL_RESPONSE",
        "UNKNOWN"
      ],
      "ProbeScope": [
        "NOT_PROBE",
        "ONE_TEST_CALLBACK",
        "MULTIPLE_OR_NO_TEST_CALLBACK",
        "UNKNOWN"
      ],
      "ProbeOperationRole": [
        "DENIED_LOOKUP",
        "DENIED_KEYS_ENUMERATION",
        "READ_BYTES",
        "FIRST_COPY_MUTATION",
        "FROZEN_CHECK",
        "FROZEN_MUTATION",
        "CORRUPTION_TRANSFORM",
        "INJECTED_READ",
        "INJECTED_FAILURE",
        "CHECKER",
        "RESPONSE_REREAD",
        "RECEIPT_REREAD",
        "UNKNOWN"
      ],
      "ProbeValueRole": [
        "NONE",
        "PUBLIC_SUBJECT",
        "DENIED_MEMBER",
        "LOOKUP_RESULT",
        "FIRST_COPY",
        "SECOND_COPY",
        "FICTIONAL_BASELINE",
        "FROZEN_TARGET",
        "TRANSFORMED_BYTES",
        "INJECTED_READ_RESULT",
        "EXPECTED_BYTE_LENGTH",
        "RETURNED_PROGRESS",
        "VERIFIED_REFERENCE",
        "CHECKER_INPUT",
        "RESPONSE_REREAD_VALUE",
        "RECEIPT_REREAD_VALUE",
        "OUTCOME_STATUS",
        "FIRST_FAILURE_IDENTITY",
        "UNKNOWN"
      ],
      "AssertionMatcher": [
        "TO_BE_UNDEFINED",
        "TO_BE_FALSE",
        "NOT_TO_CONTAIN",
        "TO_BE_TRUE",
        "TO_THROW",
        "TO_EQUAL_CONTENT",
        "TO_EQUAL_BYTE_LENGTH",
        "TO_EQUAL_HASH",
        "TO_BE_PRESERVATION_INCOMPLETE",
        "TO_BE_ZERO",
        "TO_BE_FIRST_FAILURE",
        "TO_BE_IDENTITY_UNCHANGED",
        "UNKNOWN"
      ],
      "AssertionExpected": [
        "NONE",
        "UNDEFINED_VALUE",
        "FALSE_VALUE",
        "TRUE_VALUE",
        "DENIED_MEMBER_VALUE",
        "ORIGINAL_FICTIONAL_CONTENT",
        "ORIGINAL_BYTE_LENGTH",
        "ORIGINAL_SHA256",
        "PRESERVATION_INCOMPLETE",
        "ZERO_COUNT",
        "FIRST_FAILURE_OPERATION",
        "PRIOR_REREAD_IDENTITY",
        "UNKNOWN"
      ],
      "ProbeCounter": [
        "LOOKUP_INVOCATION",
        "KEYS_INVOCATION",
        "READ_BYTES_INVOCATION",
        "MUTATION",
        "TRANSFORM",
        "INJECTED_FAILURE",
        "CHECKER_INVOCATION",
        "RETRY",
        "DELIVERY",
        "SEMANTIC_CONSEQUENCE",
        "UNKNOWN"
      ],
      "FailureEffect": [
        "NONE",
        "THROWS_CONTENT_FREE_ERROR",
        "RETURNS_ZERO_PROGRESS",
        "RETURNS_SHORT_PROGRESS",
        "UNKNOWN"
      ],
      "ProbeRelationKind": [
        "SAME_TEST_CALLBACK",
        "ASSERTION_SUBJECT",
        "ASSERTION_POSTDOMINATES_OPERATION",
        "VALUE_IDENTITY_EQUAL",
        "VALUE_CONTENT_EQUAL",
        "VALUE_BYTE_LENGTH_EQUAL",
        "VALUE_SHA256_EQUAL",
        "MUTATES_ONLY",
        "VALUE_FLOWS_ONLY_TO",
        "OPERATION_PRECEDES_OPERATION",
        "CHECKER_INPUT_ONLY_VERIFIED_REFERENCE",
        "FAILURE_IS_FIRST_FAILURE",
        "PROGRESS_LESS_THAN_EXPECTED_LENGTH",
        "UNKNOWN"
      ],
      "EscapeChannel": [
        "MODULE_SCOPE_STORE",
        "SURVIVING_CLOSURE_CAPTURE",
        "RETURN_OR_PRODUCTION_FLOW",
        "TEST_CALLBACK_ESCAPE",
        "FILESYSTEM_OUTSIDE_SUITE",
        "RETRY_FLOW",
        "FEEDBACK_FLOW",
        "DELIVERY_FLOW",
        "UNKNOWN"
      ],
      "ProbeFailureOperation": [
        "NOT_PROBE",
        "PRIVATE_SEAM_SHA256",
        "PRIVATE_SEAM_REPOSITORY_ROOT",
        "PRIVATE_SEAM_REALPATH",
        "PRIVATE_SEAM_LSTAT",
        "PRIVATE_SEAM_STAT",
        "PRIVATE_SEAM_EXISTS",
        "PRIVATE_SEAM_MKDIR",
        "PRIVATE_SEAM_OPEN",
        "PRIVATE_SEAM_WRITE",
        "PRIVATE_SEAM_FSYNC",
        "PRIVATE_SEAM_CLOSE",
        "PRIVATE_SEAM_RENAME",
        "PRIVATE_SEAM_READ_FILE",
        "PRIVATE_SEAM_REMOVE",
        "UNKNOWN"
      ],
      "ProbeFictionalLineage": [
        "NOT_APPLICABLE",
        "EXCLUSIVELY_FICTIONAL",
        "NOT_EXCLUSIVELY_FICTIONAL",
        "UNKNOWN"
      ],
      "ProbeSuiteFixtureOwnership": [
        "NOT_APPLICABLE",
        "EXCLUSIVELY_CURRENT_SUITE_OWNED",
        "NOT_EXCLUSIVELY_CURRENT_SUITE_OWNED",
        "UNKNOWN"
      ],
      "DeniedMemberId": [
        "NONE",
        "accepted",
        "append",
        "approved",
        "chmod",
        "cleanup",
        "close",
        "compliant",
        "contribution",
        "delete",
        "deliver",
        "deliverable",
        "delivery",
        "descriptor",
        "directory",
        "display",
        "dispose",
        "fd",
        "feedback",
        "filename",
        "handle",
        "move",
        "path",
        "permission",
        "preview",
        "print",
        "remove",
        "rename",
        "retry",
        "retryable",
        "root",
        "transfer",
        "truncate",
        "unlink",
        "url",
        "write"
      ],
      "CorruptionTransformId": [
        "ALTER_ONE_MIDDLE_BYTE",
        "APPEND_NEWLINE_0A",
        "NONE",
        "NORMALIZE_FICTIONAL_UTF8_TO_NFC",
        "PREFIX_ONE_BYTE",
        "PREFIX_UTF8_BOM_EFBBBF",
        "SUBSTITUTE_FIXED_FICTIONAL_BYTES",
        "SUFFIX_ONE_BYTE",
        "TRUNCATE_ONE_BYTE"
      ],
      "TerminalReceiverClassValues": [
        "ARRAY",
        "BYTE_SEQUENCE",
        "DATE",
        "MAP",
        "NONE",
        "REGEXP",
        "SET",
        "STRING"
      ],
      "TerminalOperationRelationValues": [
        "NONE",
        "OPTIONS_OBJECT_CONTAINS_FICTIONAL_RESPONSE",
        "READ_FINAL_RECEIPT",
        "READ_FINAL_RESPONSE",
        "READ_SUITE_FIXTURE",
        "REMOVE_ATTEMPT_TEMP_RECEIPT",
        "REMOVE_ATTEMPT_TEMP_RESPONSE",
        "REMOVE_SUITE_FIXTURE",
        "RENAME_RECEIPT_TEMP_FINAL_SAME_DIRECTORY",
        "RENAME_RESPONSE_TEMP_FINAL_SAME_DIRECTORY",
        "ROLE_ROOT_PRODUCTION_IMPORT",
        "ROLE_ROOT_TEST_IMPORT",
        "SYNTHETIC_FIXTURE_MEMBER_TARGET"
      ],
      "TerminalNestedOperationValues": [
        "CHECKER_EXCEPTION_AFTER_VERIFIED_CAPTURE",
        "DENIED_PUBLIC_MEMBER_IN",
        "DENIED_PUBLIC_MEMBER_REFLECT_GET",
        "FRESH_COPY_MUTATION",
        "FROZEN_OBJECT_MUTATION",
        "OBJECT_KEYS",
        "PRIVATE_SEAM_CLOSE",
        "PRIVATE_SEAM_EXISTS",
        "PRIVATE_SEAM_FSYNC",
        "PRIVATE_SEAM_LSTAT",
        "PRIVATE_SEAM_MKDIR",
        "PRIVATE_SEAM_OPEN",
        "PRIVATE_SEAM_READ_FILE",
        "PRIVATE_SEAM_REALPATH",
        "PRIVATE_SEAM_REMOVE",
        "PRIVATE_SEAM_RENAME",
        "PRIVATE_SEAM_REPOSITORY_ROOT",
        "PRIVATE_SEAM_SHA256",
        "PRIVATE_SEAM_STAT",
        "PRIVATE_SEAM_WRITE",
        "SYNTHETIC_CORRUPTION"
      ]
    },
    "factSchema": {
      "requiredFields": [
        "schema",
        "sourceRole",
        "nodeKind",
        "provenanceKind",
        "root",
        "operation",
        "provenanceFamilies",
        "importForm",
        "importAllowlistStatus",
        "importBindingStatus",
        "publicNameCapabilities",
        "publicTypeCapabilities",
        "subjectDataLabels",
        "argumentFacts",
        "destinationLabels",
        "dataFlows",
        "ancestry",
        "controlFacts",
        "responseFlowRelation",
        "filesystemMutationRelation",
        "probeFamily",
        "probeValidity",
        "terminalCandidateStatus",
        "argumentCount",
        "receiverFact",
        "callableFacts",
        "operationRelations",
        "probeStructure"
      ],
      "nonemptySortedUniqueArrays": [
        "provenanceFamilies",
        "publicNameCapabilities",
        "publicTypeCapabilities",
        "subjectDataLabels",
        "destinationLabels",
        "dataFlows",
        "ancestry",
        "controlFacts"
      ],
      "argumentFacts": {
        "order": "UNIQUE_ASCENDING_INDEX",
        "requiredFields": [
          "index",
          "provenanceKind",
          "dataLabels",
          "governedLiteralId"
        ],
        "dataLabels": "NONEMPTY_SORTED_UNIQUE_DATALABELV2"
      },
      "nonApplicable": "NONE_OR_NOT_PREFIXED_VALUE",
      "unresolved": "UNKNOWN",
      "noneAndUnknownExclusive": true
    },
    "predicateSchemaDefinition": {
      "requiredFields": [
        "schema",
        "id",
        "phase",
        "sourceRoles",
        "nodeKinds",
        "provenanceKinds",
        "roots",
        "operations",
        "provenanceFamilies",
        "importForms",
        "importAllowlistStatuses",
        "importBindingStatuses",
        "publicNameCapabilities",
        "publicTypeCapabilities",
        "subjectDataLabels",
        "argumentConstraints",
        "destinationLabels",
        "dataFlows",
        "ancestryAll",
        "ancestryNone",
        "controlFacts",
        "responseFlowRelations",
        "filesystemMutationRelations",
        "probeFamilies",
        "probeValidities",
        "terminalCandidateStatuses",
        "classification"
      ],
      "argumentConstraintsMayBeEmpty": true,
      "allOtherSelectorsRequired": true,
      "irrelevantSelector": {
        "mode": "ANY"
      },
      "argumentOrder": "UNIQUE_ASCENDING_INDEX",
      "additionalProperties": false,
      "requiredFieldsByPhase": {
        "PROHIBITED": [
          "schema",
          "id",
          "phase",
          "sourceRoles",
          "nodeKinds",
          "provenanceKinds",
          "roots",
          "operations",
          "provenanceFamilies",
          "importForms",
          "importAllowlistStatuses",
          "importBindingStatuses",
          "publicNameCapabilities",
          "publicTypeCapabilities",
          "subjectDataLabels",
          "argumentConstraints",
          "destinationLabels",
          "dataFlows",
          "ancestryAll",
          "ancestryNone",
          "controlFacts",
          "responseFlowRelations",
          "filesystemMutationRelations",
          "probeFamilies",
          "probeValidities",
          "terminalCandidateStatuses",
          "classification"
        ],
        "TERMINAL": [
          "schema",
          "id",
          "phase",
          "sourceRoles",
          "nodeKinds",
          "provenanceKinds",
          "roots",
          "operations",
          "provenanceFamilies",
          "importForms",
          "importAllowlistStatuses",
          "importBindingStatuses",
          "publicNameCapabilities",
          "publicTypeCapabilities",
          "subjectDataLabels",
          "argumentCount",
          "argumentConstraints",
          "everyArgument",
          "receiverClasses",
          "receiverProvenanceKinds",
          "receiverDataLabels",
          "callableConstraints",
          "operationRelations",
          "destinationLabels",
          "dataFlows",
          "ancestryAll",
          "ancestryNone",
          "controlFacts",
          "responseFlowRelations",
          "filesystemMutationRelations",
          "probeFamilies",
          "probeValidities",
          "terminalCandidateStatuses",
          "probeStructure",
          "classification"
        ]
      }
    },
    "terminalPredicateExtension": {
      "schema": "HH-CHECK-5-D3-D4-D6-STRUCTURAL-EXTENSION-1",
      "additionalProperties": false,
      "requiredPredicateFields": [
        "schema",
        "id",
        "phase",
        "sourceRoles",
        "nodeKinds",
        "provenanceKinds",
        "roots",
        "operations",
        "provenanceFamilies",
        "importForms",
        "importAllowlistStatuses",
        "importBindingStatuses",
        "publicNameCapabilities",
        "publicTypeCapabilities",
        "subjectDataLabels",
        "argumentCount",
        "argumentConstraints",
        "everyArgument",
        "receiverClasses",
        "receiverProvenanceKinds",
        "receiverDataLabels",
        "callableConstraints",
        "operationRelations",
        "destinationLabels",
        "dataFlows",
        "ancestryAll",
        "ancestryNone",
        "controlFacts",
        "responseFlowRelations",
        "filesystemMutationRelations",
        "probeFamilies",
        "probeValidities",
        "terminalCandidateStatuses",
        "probeStructure",
        "classification"
      ],
      "selectors": {
        "countRange": {
          "modes": [
            "ANY",
            "RANGE"
          ],
          "rangeRequiredFields": [
            "mode",
            "minimum",
            "maximum"
          ],
          "maximumMayBeNull": true,
          "maximumMustBeAtLeastMinimum": true,
          "additionalProperties": false
        },
        "scalar": {
          "modes": [
            "ANY",
            "NONE_OF",
            "ONE_OF"
          ],
          "anyProhibitsValues": true,
          "setModesRequireNonemptySortedUniqueValues": true
        },
        "set": {
          "modes": [
            "ANY",
            "CONTAINS",
            "DISJOINT",
            "EQUALS"
          ],
          "equalsMayBeEmpty": true,
          "otherSetModesRequireNonemptySortedUniqueValues": true
        },
        "recordSet": {
          "modes": [
            "ANY",
            "KEY_EQUAL"
          ],
          "keys": {
            "operations": [
              "role"
            ],
            "assertions": [
              "matcher",
              "expected",
              "subjectRole",
              "operationRole"
            ],
            "relations": [
              "kind",
              "leftRole",
              "rightRole",
              "operationRole"
            ],
            "counters": [
              "counter"
            ],
            "escapes": [
              "valueRole"
            ],
            "roleProvenance": [
              "valueRole"
            ]
          },
          "keySetsMustEqual": true,
          "keysMustBeUnique": true,
          "recordsUseStableSerializedKeyOrder": true,
          "malformedOrUnknownKeysFail": true
        }
      },
      "governedLiteralValues": {
        "HASH_ALGORITHM_SHA256": "sha256",
        "HASH_DIGEST_HEX": "hex",
        "TEXT_ENCODING_UTF8": "utf8",
        "FILE_OPEN_EXCLUSIVE_WX": "wx",
        "FILE_MODE_OWNER_ONLY_384": 384
      },
      "enums": {
        "GovernedLiteralId": [
          "NONE",
          "HASH_ALGORITHM_SHA256",
          "HASH_DIGEST_HEX",
          "TEXT_ENCODING_UTF8",
          "FILE_OPEN_EXCLUSIVE_WX",
          "FILE_MODE_OWNER_ONLY_384",
          "UNKNOWN"
        ],
        "ReceiverClass": [
          "NONE",
          "ARRAY",
          "BYTE_SEQUENCE",
          "DATE",
          "MAP",
          "REGEXP",
          "SET",
          "STRING",
          "SYNTHETIC_FIXTURE",
          "UNKNOWN"
        ],
        "CallablePosition": [
          "CALLEE",
          "ARGUMENT_0",
          "ARGUMENT_1",
          "ARGUMENT_2",
          "ARGUMENT_3",
          "ARGUMENT_4",
          "UNKNOWN"
        ],
        "CallableResolution": [
          "NONE",
          "UNIQUE_LOCAL_DECLARATION",
          "UNIQUE_PARAMETER",
          "NONLOCAL_OR_MULTIPLE",
          "UNKNOWN"
        ],
        "CallableScope": [
          "NONE",
          "SAME_FILE_PRIVATE",
          "NESTED_TEST_CALLBACK",
          "EXPORTED",
          "OTHER",
          "UNKNOWN"
        ],
        "CallableCycle": [
          "NONE",
          "ACYCLIC",
          "CYCLIC",
          "UNKNOWN"
        ],
        "CallableCapabilityReturn": [
          "NONE",
          "NO_CAPABILITY_RETURN",
          "CAPABILITY_RETURN",
          "UNKNOWN"
        ],
        "CallableTerminalStatus": [
          "NONE",
          "EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL",
          "ZERO_TERMINAL",
          "MULTIPLE_TERMINAL",
          "PROHIBITED",
          "UNKNOWN"
        ],
        "CallableEscape": [
          "NONE",
          "NO_SURVIVING_CAPTURE",
          "SURVIVING_CAPTURE",
          "UNKNOWN"
        ],
        "OperationRelation": [
          "NONE",
          "ROLE_ROOT_PRODUCTION_IMPORT",
          "ROLE_ROOT_TEST_IMPORT",
          "RENAME_RESPONSE_TEMP_FINAL_SAME_DIRECTORY",
          "RENAME_RECEIPT_TEMP_FINAL_SAME_DIRECTORY",
          "READ_FINAL_RESPONSE",
          "READ_FINAL_RECEIPT",
          "READ_SUITE_FIXTURE",
          "REMOVE_ATTEMPT_TEMP_RESPONSE",
          "REMOVE_ATTEMPT_TEMP_RECEIPT",
          "REMOVE_SUITE_FIXTURE",
          "SYNTHETIC_FIXTURE_MEMBER_TARGET",
          "OPTIONS_OBJECT_CONTAINS_FICTIONAL_RESPONSE",
          "UNKNOWN"
        ],
        "ProbeScope": [
          "NOT_PROBE",
          "ONE_TEST_CALLBACK",
          "MULTIPLE_OR_NO_TEST_CALLBACK",
          "UNKNOWN"
        ],
        "ProbeOperationRole": [
          "DENIED_LOOKUP",
          "DENIED_KEYS_ENUMERATION",
          "READ_BYTES",
          "FIRST_COPY_MUTATION",
          "FROZEN_CHECK",
          "FROZEN_MUTATION",
          "CORRUPTION_TRANSFORM",
          "INJECTED_READ",
          "INJECTED_FAILURE",
          "CHECKER",
          "RESPONSE_REREAD",
          "RECEIPT_REREAD",
          "UNKNOWN"
        ],
        "ProbeValueRole": [
          "NONE",
          "PUBLIC_SUBJECT",
          "DENIED_MEMBER",
          "LOOKUP_RESULT",
          "FIRST_COPY",
          "SECOND_COPY",
          "FICTIONAL_BASELINE",
          "FROZEN_TARGET",
          "TRANSFORMED_BYTES",
          "INJECTED_READ_RESULT",
          "EXPECTED_BYTE_LENGTH",
          "RETURNED_PROGRESS",
          "VERIFIED_REFERENCE",
          "CHECKER_INPUT",
          "RESPONSE_REREAD_VALUE",
          "RECEIPT_REREAD_VALUE",
          "OUTCOME_STATUS",
          "FIRST_FAILURE_IDENTITY",
          "UNKNOWN"
        ],
        "AssertionMatcher": [
          "TO_BE_UNDEFINED",
          "TO_BE_FALSE",
          "NOT_TO_CONTAIN",
          "TO_BE_TRUE",
          "TO_THROW",
          "TO_EQUAL_CONTENT",
          "TO_EQUAL_BYTE_LENGTH",
          "TO_EQUAL_HASH",
          "TO_BE_PRESERVATION_INCOMPLETE",
          "TO_BE_ZERO",
          "TO_BE_FIRST_FAILURE",
          "TO_BE_IDENTITY_UNCHANGED",
          "UNKNOWN"
        ],
        "AssertionExpected": [
          "NONE",
          "UNDEFINED_VALUE",
          "FALSE_VALUE",
          "TRUE_VALUE",
          "DENIED_MEMBER_VALUE",
          "ORIGINAL_FICTIONAL_CONTENT",
          "ORIGINAL_BYTE_LENGTH",
          "ORIGINAL_SHA256",
          "PRESERVATION_INCOMPLETE",
          "ZERO_COUNT",
          "FIRST_FAILURE_OPERATION",
          "PRIOR_REREAD_IDENTITY",
          "UNKNOWN"
        ],
        "ProbeCounter": [
          "LOOKUP_INVOCATION",
          "KEYS_INVOCATION",
          "READ_BYTES_INVOCATION",
          "MUTATION",
          "TRANSFORM",
          "INJECTED_FAILURE",
          "CHECKER_INVOCATION",
          "RETRY",
          "DELIVERY",
          "SEMANTIC_CONSEQUENCE",
          "UNKNOWN"
        ],
        "FailureEffect": [
          "NONE",
          "THROWS_CONTENT_FREE_ERROR",
          "RETURNS_ZERO_PROGRESS",
          "RETURNS_SHORT_PROGRESS",
          "UNKNOWN"
        ],
        "ProbeRelationKind": [
          "SAME_TEST_CALLBACK",
          "ASSERTION_SUBJECT",
          "ASSERTION_POSTDOMINATES_OPERATION",
          "VALUE_IDENTITY_EQUAL",
          "VALUE_CONTENT_EQUAL",
          "VALUE_BYTE_LENGTH_EQUAL",
          "VALUE_SHA256_EQUAL",
          "MUTATES_ONLY",
          "VALUE_FLOWS_ONLY_TO",
          "OPERATION_PRECEDES_OPERATION",
          "CHECKER_INPUT_ONLY_VERIFIED_REFERENCE",
          "FAILURE_IS_FIRST_FAILURE",
          "PROGRESS_LESS_THAN_EXPECTED_LENGTH",
          "UNKNOWN"
        ],
        "EscapeChannel": [
          "MODULE_SCOPE_STORE",
          "SURVIVING_CLOSURE_CAPTURE",
          "RETURN_OR_PRODUCTION_FLOW",
          "TEST_CALLBACK_ESCAPE",
          "FILESYSTEM_OUTSIDE_SUITE",
          "RETRY_FLOW",
          "FEEDBACK_FLOW",
          "DELIVERY_FLOW",
          "UNKNOWN"
        ],
        "ProbeFailureOperation": [
          "NOT_PROBE",
          "PRIVATE_SEAM_SHA256",
          "PRIVATE_SEAM_REPOSITORY_ROOT",
          "PRIVATE_SEAM_REALPATH",
          "PRIVATE_SEAM_LSTAT",
          "PRIVATE_SEAM_STAT",
          "PRIVATE_SEAM_EXISTS",
          "PRIVATE_SEAM_MKDIR",
          "PRIVATE_SEAM_OPEN",
          "PRIVATE_SEAM_WRITE",
          "PRIVATE_SEAM_FSYNC",
          "PRIVATE_SEAM_CLOSE",
          "PRIVATE_SEAM_RENAME",
          "PRIVATE_SEAM_READ_FILE",
          "PRIVATE_SEAM_REMOVE",
          "UNKNOWN"
        ],
        "ProbeFictionalLineage": [
          "NOT_APPLICABLE",
          "EXCLUSIVELY_FICTIONAL",
          "NOT_EXCLUSIVELY_FICTIONAL",
          "UNKNOWN"
        ],
        "ProbeSuiteFixtureOwnership": [
          "NOT_APPLICABLE",
          "EXCLUSIVELY_CURRENT_SUITE_OWNED",
          "NOT_EXCLUSIVELY_CURRENT_SUITE_OWNED",
          "UNKNOWN"
        ],
        "DeniedMemberId": [
          "NONE",
          "accepted",
          "append",
          "approved",
          "chmod",
          "cleanup",
          "close",
          "compliant",
          "contribution",
          "delete",
          "deliver",
          "deliverable",
          "delivery",
          "descriptor",
          "directory",
          "display",
          "dispose",
          "fd",
          "feedback",
          "filename",
          "handle",
          "move",
          "path",
          "permission",
          "preview",
          "print",
          "remove",
          "rename",
          "retry",
          "retryable",
          "root",
          "transfer",
          "truncate",
          "unlink",
          "url",
          "write"
        ],
        "CorruptionTransformId": [
          "ALTER_ONE_MIDDLE_BYTE",
          "APPEND_NEWLINE_0A",
          "NONE",
          "NORMALIZE_FICTIONAL_UTF8_TO_NFC",
          "PREFIX_ONE_BYTE",
          "PREFIX_UTF8_BOM_EFBBBF",
          "SUBSTITUTE_FIXED_FICTIONAL_BYTES",
          "SUFFIX_ONE_BYTE",
          "TRUNCATE_ONE_BYTE"
        ],
        "TerminalReceiverClassValues": [
          "ARRAY",
          "BYTE_SEQUENCE",
          "DATE",
          "MAP",
          "NONE",
          "REGEXP",
          "SET",
          "STRING"
        ],
        "TerminalOperationRelationValues": [
          "NONE",
          "OPTIONS_OBJECT_CONTAINS_FICTIONAL_RESPONSE",
          "READ_FINAL_RECEIPT",
          "READ_FINAL_RESPONSE",
          "READ_SUITE_FIXTURE",
          "REMOVE_ATTEMPT_TEMP_RECEIPT",
          "REMOVE_ATTEMPT_TEMP_RESPONSE",
          "REMOVE_SUITE_FIXTURE",
          "RENAME_RECEIPT_TEMP_FINAL_SAME_DIRECTORY",
          "RENAME_RESPONSE_TEMP_FINAL_SAME_DIRECTORY",
          "ROLE_ROOT_PRODUCTION_IMPORT",
          "ROLE_ROOT_TEST_IMPORT",
          "SYNTHETIC_FIXTURE_MEMBER_TARGET"
        ],
        "TerminalNestedOperationValues": [
          "CHECKER_EXCEPTION_AFTER_VERIFIED_CAPTURE",
          "DENIED_PUBLIC_MEMBER_IN",
          "DENIED_PUBLIC_MEMBER_REFLECT_GET",
          "FRESH_COPY_MUTATION",
          "FROZEN_OBJECT_MUTATION",
          "OBJECT_KEYS",
          "PRIVATE_SEAM_CLOSE",
          "PRIVATE_SEAM_EXISTS",
          "PRIVATE_SEAM_FSYNC",
          "PRIVATE_SEAM_LSTAT",
          "PRIVATE_SEAM_MKDIR",
          "PRIVATE_SEAM_OPEN",
          "PRIVATE_SEAM_READ_FILE",
          "PRIVATE_SEAM_REALPATH",
          "PRIVATE_SEAM_REMOVE",
          "PRIVATE_SEAM_RENAME",
          "PRIVATE_SEAM_REPOSITORY_ROOT",
          "PRIVATE_SEAM_SHA256",
          "PRIVATE_SEAM_STAT",
          "PRIVATE_SEAM_WRITE",
          "SYNTHETIC_CORRUPTION"
        ]
      },
      "argumentConstraint": {
        "requiredFields": [
          "index",
          "provenanceKinds",
          "dataLabels",
          "governedLiteralIds"
        ],
        "indexOrder": "UNIQUE_ASCENDING",
        "additionalProperties": false
      },
      "everyArgument": {
        "requiredFields": [
          "provenanceKinds",
          "dataLabels",
          "governedLiteralIds"
        ],
        "allChildAnyMeansIrrelevant": true,
        "zeroArgumentResult": true,
        "additionalProperties": false
      },
      "callableConstraint": {
        "requiredFields": [
          "position",
          "resolutions",
          "scopes",
          "cycles",
          "capabilityReturns",
          "terminalStatuses",
          "escapes"
        ],
        "uniqueKey": "position",
        "additionalProperties": false
      },
      "probeStructureSelector": {
        "requiredFields": [
          "scope",
          "deniedMemberIds",
          "corruptionTransformIds",
          "failureOperations",
          "operations",
          "assertions",
          "relations",
          "counters",
          "escapes",
          "roleProvenance"
        ],
        "childRequiredFields": {
          "operations": [
            "role",
            "operations",
            "argumentCount",
            "countWithinScope",
            "inputRoles",
            "outputRoles",
            "failureEffects"
          ],
          "assertions": [
            "matcher",
            "expected",
            "subjectRole",
            "operationRole",
            "sameTestCallback",
            "postDominates"
          ],
          "relations": [
            "kind",
            "leftRole",
            "rightRole",
            "operationRole"
          ],
          "counters": [
            "counter",
            "count"
          ],
          "escapes": [
            "valueRole",
            "channels"
          ],
          "roleProvenance": [
            "valueRole",
            "operationRoles",
            "fictionalLineages",
            "suiteFixtureOwnerships"
          ]
        },
        "additionalProperties": false,
        "childAdditionalProperties": false
      },
      "derivation": {
        "sourceTextMatching": false,
        "completeAstAndControlFlowPerRole": true,
        "unresolvedOrMultipleRoleAssignment": "UNKNOWN",
        "probeValidityRecomputedFromCompleteStructure": true,
        "terminalStatusRecomputedWithProhibitedFirstExactOne": true
      }
    }
  },
  "d4PermittedPredicates": [
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:ARRAY_EVERY:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_PRIVATE"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "ARRAY_EVERY"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ANY"
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "ARRAY"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [
        {
          "position": "ARGUMENT_0",
          "resolutions": {
            "mode": "ONE_OF",
            "values": [
              "UNIQUE_LOCAL_DECLARATION"
            ]
          },
          "scopes": {
            "mode": "ONE_OF",
            "values": [
              "NESTED_TEST_CALLBACK",
              "SAME_FILE_PRIVATE"
            ]
          },
          "cycles": {
            "mode": "ONE_OF",
            "values": [
              "ACYCLIC"
            ]
          },
          "capabilityReturns": {
            "mode": "ONE_OF",
            "values": [
              "NO_CAPABILITY_RETURN"
            ]
          },
          "terminalStatuses": {
            "mode": "ONE_OF",
            "values": [
              "EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL"
            ]
          },
          "escapes": {
            "mode": "ONE_OF",
            "values": [
              "NO_SURVIVING_CAPTURE"
            ]
          }
        }
      ],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "RECEIVER_OF_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:ARRAY_INCLUDES:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_PRIVATE"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "ARRAY_INCLUDES"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "GOVERNANCE_FIELD",
              "PATH_SEGMENT"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "ARRAY"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "RECEIVER_OF_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:ARRAY_IS_ARRAY:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "Array"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "ARRAY_IS_ARRAY"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "JSON_LOCAL",
              "LOCAL_COLLECTION"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:ARRAY_JOIN:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_PRIVATE"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "ARRAY_JOIN"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "GOVERNANCE_FIELD"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "ARRAY"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "RECEIVER_OF_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:ARRAY_MAP:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_PRIVATE"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "ARRAY_MAP"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ANY"
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "ARRAY"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [
        {
          "position": "ARGUMENT_0",
          "resolutions": {
            "mode": "ONE_OF",
            "values": [
              "UNIQUE_LOCAL_DECLARATION"
            ]
          },
          "scopes": {
            "mode": "ONE_OF",
            "values": [
              "NESTED_TEST_CALLBACK",
              "SAME_FILE_PRIVATE"
            ]
          },
          "cycles": {
            "mode": "ONE_OF",
            "values": [
              "ACYCLIC"
            ]
          },
          "capabilityReturns": {
            "mode": "ONE_OF",
            "values": [
              "NO_CAPABILITY_RETURN"
            ]
          },
          "terminalStatuses": {
            "mode": "ONE_OF",
            "values": [
              "EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL"
            ]
          },
          "escapes": {
            "mode": "ONE_OF",
            "values": [
              "NO_SURVIVING_CAPTURE"
            ]
          }
        }
      ],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "RECEIVER_OF_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:ARRAY_PUSH:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_PRIVATE"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "ARRAY_PUSH"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": null
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ONE_OF",
          "values": [
            "GOVERNANCE_FIELD",
            "JSON_LOCAL"
          ]
        },
        "governedLiteralIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "ARRAY"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "COLLECTION_STORE"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:ARRAY_SLICE:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_PRIVATE"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "ARRAY_SLICE"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 2,
        "maximum": 2
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "NUMBER"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        },
        {
          "index": 1,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "NUMBER"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "ARRAY"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "RECEIVER_OF_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:ARRAY_SOME:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_PRIVATE"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "ARRAY_SOME"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ANY"
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "ARRAY"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [
        {
          "position": "ARGUMENT_0",
          "resolutions": {
            "mode": "ONE_OF",
            "values": [
              "UNIQUE_LOCAL_DECLARATION"
            ]
          },
          "scopes": {
            "mode": "ONE_OF",
            "values": [
              "NESTED_TEST_CALLBACK",
              "SAME_FILE_PRIVATE"
            ]
          },
          "cycles": {
            "mode": "ONE_OF",
            "values": [
              "ACYCLIC"
            ]
          },
          "capabilityReturns": {
            "mode": "ONE_OF",
            "values": [
              "NO_CAPABILITY_RETURN"
            ]
          },
          "terminalStatuses": {
            "mode": "ONE_OF",
            "values": [
              "EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL"
            ]
          },
          "escapes": {
            "mode": "ONE_OF",
            "values": [
              "NO_SURVIVING_CAPTURE"
            ]
          }
        }
      ],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "RECEIVER_OF_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:ARRAY_SORT:COUNT_0",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_PRIVATE"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "ARRAY_SORT"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 0,
        "maximum": 0
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "ARRAY"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "RECEIVER_OF_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:ARRAY_SORT:COUNT_1",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_PRIVATE"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "ARRAY_SORT"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ANY"
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "ARRAY"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [
        {
          "position": "ARGUMENT_0",
          "resolutions": {
            "mode": "ONE_OF",
            "values": [
              "UNIQUE_LOCAL_DECLARATION"
            ]
          },
          "scopes": {
            "mode": "ONE_OF",
            "values": [
              "NESTED_TEST_CALLBACK",
              "SAME_FILE_PRIVATE"
            ]
          },
          "cycles": {
            "mode": "ONE_OF",
            "values": [
              "ACYCLIC"
            ]
          },
          "capabilityReturns": {
            "mode": "ONE_OF",
            "values": [
              "NO_CAPABILITY_RETURN"
            ]
          },
          "terminalStatuses": {
            "mode": "ONE_OF",
            "values": [
              "EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL"
            ]
          },
          "escapes": {
            "mode": "ONE_OF",
            "values": [
              "NO_SURVIVING_CAPTURE"
            ]
          }
        }
      ],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "RECEIVER_OF_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:BUFFER_COMPARE:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "Buffer"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "BUFFER_COMPARE"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 2,
        "maximum": 2
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "CORRUPTED_FICTIONAL_BYTES",
              "FICTIONAL_BYTES",
              "INSTRUMENT_BYTES",
              "PERSISTED_RESPONSE_BYTES",
              "POLICY_BYTES",
              "RECEIPT_BYTES",
              "SOURCE_BYTES"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        },
        {
          "index": 1,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "CORRUPTED_FICTIONAL_BYTES",
              "FICTIONAL_BYTES",
              "INSTRUMENT_BYTES",
              "PERSISTED_RESPONSE_BYTES",
              "POLICY_BYTES",
              "RECEIPT_BYTES",
              "SOURCE_BYTES"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:BUFFER_FROM_UTF8:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "Buffer"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "BUFFER_FROM_UTF8"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 2,
        "maximum": 2
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "FICTIONAL_RESPONSE",
              "SOURCE_STRING"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        },
        {
          "index": 1,
          "provenanceKinds": {
            "mode": "ONE_OF",
            "values": [
              "LITERAL"
            ]
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "GOVERNANCE_FIELD"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "TEXT_ENCODING_UTF8"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:BUFFER_IS_BUFFER:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "Buffer"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "BUFFER_IS_BUFFER"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "CORRUPTED_FICTIONAL_BYTES",
              "FICTIONAL_BYTES",
              "INSTRUMENT_BYTES",
              "PERSISTED_RESPONSE_BYTES",
              "POLICY_BYTES",
              "RECEIPT_BYTES",
              "SOURCE_BYTES"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:BYTE_LENGTH_READ:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "PROPERTY_READ"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_PRIVATE"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "BYTE_LENGTH_READ"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "BYTE_SEQUENCE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "PROPERTY_READ_RESULT"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:BYTE_SLICE:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_PRIVATE"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "BYTE_SLICE"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 2,
        "maximum": 2
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "NUMBER"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        },
        {
          "index": 1,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "NUMBER"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "BYTE_SEQUENCE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "RECEIVER_OF_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:CRYPTO_CREATE_HASH_SHA256:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "node:crypto/createHash"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "CRYPTO_CREATE_HASH_SHA256"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ONE_OF",
            "values": [
              "LITERAL"
            ]
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "GOVERNANCE_FIELD"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "HASH_ALGORITHM_SHA256"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "HASH_STATE"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:DATE_PARSE:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "Date"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "DATE_PARSE"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "GOVERNANCE_FIELD",
              "TIMESTAMP"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:DATE_TO_ISO_STRING:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_PRIVATE"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "DATE_TO_ISO_STRING"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 0,
        "maximum": 0
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "DATE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "RECEIVER_OF_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:EXPECT_MATCHER:COUNT_0",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "EXPECT_CHAIN"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "EXPECT_MATCHER"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 0,
        "maximum": 0
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "EXPECT_ASSERTION"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ASSERTION_INPUT"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:EXPECT_MATCHER:COUNT_1",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "EXPECT_CHAIN"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "EXPECT_MATCHER"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ONE_OF",
            "values": [
              "LITERAL",
              "LOCAL_DECLARATION",
              "PARAMETER",
              "PUBLIC_VALUE",
              "SYNTHETIC_FIXTURE"
            ]
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "BOOLEAN",
              "BYTE_LENGTH",
              "CORRUPTED_FICTIONAL_BYTES",
              "DENIED_MEMBER_LITERAL",
              "ERROR_CONTENT_FREE",
              "FICTIONAL_BYTES",
              "FICTIONAL_RESPONSE",
              "GOVERNANCE_FIELD",
              "HASH_HEX",
              "JSON_LOCAL",
              "LOCAL_COLLECTION",
              "NUMBER",
              "PUBLIC_OUTCOME",
              "PUBLIC_REFERENCE",
              "TIMESTAMP"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "EXPECT_ASSERTION"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ASSERTION_INPUT"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:FS_CLOSE:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "node:fs"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "FS_CLOSE"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "FILE_DESCRIPTOR"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "ATTEMPT_TEMP_RECEIPT",
          "ATTEMPT_TEMP_RESPONSE"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:FS_EXISTS:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "node:fs"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "FS_EXISTS"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "ATTEMPT_PATH",
              "EXTERNAL_ROOT_PATH",
              "REPOSITORY_PRECONDITION_PATH",
              "SUITE_ROOT_PATH"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "FILESYSTEM_PATH"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:FS_FSYNC:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "node:fs"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "FS_FSYNC"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "FILE_DESCRIPTOR"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "ATTEMPT_TEMP_RECEIPT",
          "ATTEMPT_TEMP_RESPONSE"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:FS_LSTAT:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "node:fs"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "FS_LSTAT"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "ATTEMPT_PATH",
              "EXTERNAL_ROOT_PATH",
              "REPOSITORY_PRECONDITION_PATH",
              "SUITE_ROOT_PATH"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "FILESYSTEM_PATH"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:FS_MKDIR:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "node:fs"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "FS_MKDIR"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 2,
        "maximum": 2
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "ATTEMPT_PATH",
              "SUITE_ROOT_PATH"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        },
        {
          "index": 1,
          "provenanceKinds": {
            "mode": "ONE_OF",
            "values": [
              "LITERAL"
            ]
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "NUMBER"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "FILE_MODE_OWNER_ONLY_384"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "ATTEMPT_TEMP_RECEIPT",
          "ATTEMPT_TEMP_RESPONSE",
          "SUITE_OWNED_TEST_ROOT"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "FILESYSTEM_PATH"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:FS_OPEN_EXCLUSIVE:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "node:fs"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "FS_OPEN_EXCLUSIVE"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 3,
        "maximum": 3
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "ATTEMPT_PATH"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        },
        {
          "index": 1,
          "provenanceKinds": {
            "mode": "ONE_OF",
            "values": [
              "LITERAL"
            ]
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "GOVERNANCE_FIELD"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "FILE_OPEN_EXCLUSIVE_WX"
            ]
          }
        },
        {
          "index": 2,
          "provenanceKinds": {
            "mode": "ONE_OF",
            "values": [
              "LITERAL"
            ]
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "NUMBER"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "FILE_MODE_OWNER_ONLY_384"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "ATTEMPT_TEMP_RECEIPT",
          "ATTEMPT_TEMP_RESPONSE"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "FILESYSTEM_PATH"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:FS_READ_FILE:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "node:fs"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "FS_READ_FILE"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "ATTEMPT_PATH",
              "SUITE_ROOT_PATH"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "READ_FINAL_RECEIPT",
          "READ_FINAL_RESPONSE",
          "READ_SUITE_FIXTURE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "FILESYSTEM_CONTENT"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:FS_REALPATH:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "node:fs"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "FS_REALPATH"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "ATTEMPT_PATH",
              "EXTERNAL_ROOT_PATH",
              "REPOSITORY_PRECONDITION_PATH",
              "SUITE_ROOT_PATH"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "FILESYSTEM_PATH"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:FS_REMOVE_BOUNDED:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "node:fs"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "FS_REMOVE_BOUNDED"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 2,
        "maximum": 2
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "ATTEMPT_PATH",
              "SUITE_ROOT_PATH"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        },
        {
          "index": 1,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "BOOLEAN"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "REMOVE_ATTEMPT_TEMP_RECEIPT",
          "REMOVE_ATTEMPT_TEMP_RESPONSE",
          "REMOVE_SUITE_FIXTURE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "ATTEMPT_TEMP_RECEIPT",
          "ATTEMPT_TEMP_RESPONSE",
          "SUITE_OWNED_TEST_ROOT"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "FILESYSTEM_PATH"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:FS_RENAME:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "node:fs"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "FS_RENAME"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 2,
        "maximum": 2
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "ATTEMPT_PATH"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        },
        {
          "index": 1,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "ATTEMPT_PATH"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "RENAME_RECEIPT_TEMP_FINAL_SAME_DIRECTORY",
          "RENAME_RESPONSE_TEMP_FINAL_SAME_DIRECTORY"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "ATTEMPT_FINAL_RECEIPT",
          "ATTEMPT_FINAL_RESPONSE"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "FILESYSTEM_PATH"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:FS_STAT:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "node:fs"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "FS_STAT"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "ATTEMPT_PATH",
              "EXTERNAL_ROOT_PATH",
              "REPOSITORY_PRECONDITION_PATH",
              "SUITE_ROOT_PATH"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "FILESYSTEM_PATH"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:FS_WRITE:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "node:fs"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "FS_WRITE"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 5,
        "maximum": 5
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "FILE_DESCRIPTOR"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        },
        {
          "index": 1,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "FICTIONAL_BYTES",
              "RECEIPT_BYTES",
              "SOURCE_BYTES"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        },
        {
          "index": 2,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "NUMBER"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        },
        {
          "index": 3,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "NUMBER"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        },
        {
          "index": 4,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "NUMBER"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "ATTEMPT_TEMP_RECEIPT",
          "ATTEMPT_TEMP_RESPONSE"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "FILESYSTEM_CONTENT"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:HASH_DIGEST_HEX:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_PRIVATE"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "HASH_DIGEST_HEX"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ONE_OF",
            "values": [
              "LITERAL"
            ]
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "GOVERNANCE_FIELD"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "HASH_DIGEST_HEX"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "HASH_OUTPUT"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:HASH_UPDATE:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_PRIVATE"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "HASH_UPDATE"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "FICTIONAL_BYTES",
              "INSTRUMENT_BYTES",
              "PERSISTED_RESPONSE_BYTES",
              "POLICY_BYTES",
              "RECEIPT_BYTES",
              "SOURCE_BYTES"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "HASH_STATE"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "HASH_INPUT"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:JEST_DESCRIBE:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "@jest/globals"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "JEST_DESCRIBE"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 2,
        "maximum": 2
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "GOVERNANCE_FIELD"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        },
        {
          "index": 1,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ANY"
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [
        {
          "position": "ARGUMENT_1",
          "resolutions": {
            "mode": "ONE_OF",
            "values": [
              "UNIQUE_LOCAL_DECLARATION"
            ]
          },
          "scopes": {
            "mode": "ONE_OF",
            "values": [
              "SAME_FILE_PRIVATE"
            ]
          },
          "cycles": {
            "mode": "ONE_OF",
            "values": [
              "ACYCLIC"
            ]
          },
          "capabilityReturns": {
            "mode": "ONE_OF",
            "values": [
              "NO_CAPABILITY_RETURN"
            ]
          },
          "terminalStatuses": {
            "mode": "ONE_OF",
            "values": [
              "EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL"
            ]
          },
          "escapes": {
            "mode": "ONE_OF",
            "values": [
              "NO_SURVIVING_CAPTURE"
            ]
          }
        }
      ],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:JEST_EXPECT:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "@jest/globals"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "JEST_EXPECT"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ONE_OF",
            "values": [
              "LITERAL",
              "LOCAL_DECLARATION",
              "PARAMETER",
              "PUBLIC_VALUE",
              "SYNTHETIC_FIXTURE"
            ]
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "BOOLEAN",
              "BYTE_LENGTH",
              "CORRUPTED_FICTIONAL_BYTES",
              "DENIED_MEMBER_LITERAL",
              "ERROR_CONTENT_FREE",
              "FICTIONAL_BYTES",
              "FICTIONAL_RESPONSE",
              "GOVERNANCE_FIELD",
              "HASH_HEX",
              "JSON_LOCAL",
              "LOCAL_COLLECTION",
              "NUMBER",
              "PUBLIC_OUTCOME",
              "PUBLIC_REFERENCE",
              "TIMESTAMP"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "EXPECT_ASSERTION"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ASSERTION_INPUT"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:JEST_FN:COUNT_0",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "@jest/globals"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "JEST_FN"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 0,
        "maximum": 0
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:JEST_FN:COUNT_1",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "@jest/globals"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "JEST_FN"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ANY"
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [
        {
          "position": "ARGUMENT_0",
          "resolutions": {
            "mode": "ONE_OF",
            "values": [
              "UNIQUE_LOCAL_DECLARATION"
            ]
          },
          "scopes": {
            "mode": "ONE_OF",
            "values": [
              "NESTED_TEST_CALLBACK",
              "SAME_FILE_PRIVATE"
            ]
          },
          "cycles": {
            "mode": "ONE_OF",
            "values": [
              "ACYCLIC"
            ]
          },
          "capabilityReturns": {
            "mode": "ONE_OF",
            "values": [
              "NO_CAPABILITY_RETURN"
            ]
          },
          "terminalStatuses": {
            "mode": "ONE_OF",
            "values": [
              "EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL"
            ]
          },
          "escapes": {
            "mode": "ONE_OF",
            "values": [
              "NO_SURVIVING_CAPTURE"
            ]
          }
        }
      ],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:JEST_IT:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "@jest/globals"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "JEST_IT"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 2,
        "maximum": 2
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "GOVERNANCE_FIELD"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        },
        {
          "index": 1,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ANY"
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [
        {
          "position": "ARGUMENT_1",
          "resolutions": {
            "mode": "ONE_OF",
            "values": [
              "UNIQUE_LOCAL_DECLARATION"
            ]
          },
          "scopes": {
            "mode": "ONE_OF",
            "values": [
              "SAME_FILE_PRIVATE"
            ]
          },
          "cycles": {
            "mode": "ONE_OF",
            "values": [
              "ACYCLIC"
            ]
          },
          "capabilityReturns": {
            "mode": "ONE_OF",
            "values": [
              "NO_CAPABILITY_RETURN"
            ]
          },
          "terminalStatuses": {
            "mode": "ONE_OF",
            "values": [
              "EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL"
            ]
          },
          "escapes": {
            "mode": "ONE_OF",
            "values": [
              "NO_SURVIVING_CAPTURE"
            ]
          }
        }
      ],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:JEST_SPY_ON:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "@jest/globals"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "JEST_SPY_ON"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 2,
        "maximum": 2
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ONE_OF",
            "values": [
              "SYNTHETIC_FIXTURE"
            ]
          },
          "dataLabels": {
            "mode": "ANY"
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        },
        {
          "index": 1,
          "provenanceKinds": {
            "mode": "ONE_OF",
            "values": [
              "LITERAL"
            ]
          },
          "dataLabels": {
            "mode": "ANY"
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "SYNTHETIC_FIXTURE_MEMBER_TARGET"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:JSON_PARSE:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "JSON"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "JSON_PARSE"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "JSON_LOCAL"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "JSON_CONTENT"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:JSON_STRINGIFY:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "JSON"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "JSON_STRINGIFY"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "JSON_LOCAL"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "JSON_CONTENT"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:LOCAL_PRIVATE_CALL:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_DECLARATION"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_PRIVATE"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_PRIVATE_CALL"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [
        {
          "position": "CALLEE",
          "resolutions": {
            "mode": "ONE_OF",
            "values": [
              "UNIQUE_LOCAL_DECLARATION"
            ]
          },
          "scopes": {
            "mode": "ONE_OF",
            "values": [
              "SAME_FILE_PRIVATE"
            ]
          },
          "cycles": {
            "mode": "ONE_OF",
            "values": [
              "ACYCLIC"
            ]
          },
          "capabilityReturns": {
            "mode": "ONE_OF",
            "values": [
              "NO_CAPABILITY_RETURN"
            ]
          },
          "terminalStatuses": {
            "mode": "ONE_OF",
            "values": [
              "EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL"
            ]
          },
          "escapes": {
            "mode": "ONE_OF",
            "values": [
              "NO_SURVIVING_CAPTURE"
            ]
          }
        }
      ],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:MAP_GET:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_PRIVATE"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "MAP_GET"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "GOVERNANCE_FIELD"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "MAP"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "RECEIVER_OF_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:MAP_HAS:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_PRIVATE"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "MAP_HAS"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "GOVERNANCE_FIELD"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "MAP"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "RECEIVER_OF_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:MAP_SET:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_PRIVATE"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "MAP_SET"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 2,
        "maximum": 2
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "GOVERNANCE_FIELD"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        },
        {
          "index": 1,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "GOVERNANCE_FIELD",
              "JSON_LOCAL"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "MAP"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "COLLECTION_STORE"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:NEW_DATE:COUNT_0",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "NEW"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "Date"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "NEW_DATE"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 0,
        "maximum": 0
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "CONSTRUCTOR_INPUT"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:NEW_DATE:COUNT_1",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "NEW"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "Date"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "NEW_DATE"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "GOVERNANCE_FIELD",
              "TIMESTAMP"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "CONSTRUCTOR_INPUT"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:NEW_ERROR_CONTENT_FREE:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "NEW"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "Error"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "NEW_ERROR_CONTENT_FREE"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "ERROR_CONTENT_FREE"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "CONSTRUCTOR_INPUT"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:NEW_MAP:COUNT_0",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "NEW"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "Map"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "NEW_MAP"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 0,
        "maximum": 0
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "CONSTRUCTOR_INPUT"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:NEW_MAP:COUNT_1",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "NEW"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "Map"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "NEW_MAP"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "LOCAL_COLLECTION"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "CONSTRUCTOR_INPUT"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:NEW_SET:COUNT_0",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "NEW"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "Set"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "NEW_SET"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 0,
        "maximum": 0
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "CONSTRUCTOR_INPUT"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:NEW_SET:COUNT_1",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "NEW"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "Set"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "NEW_SET"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "LOCAL_COLLECTION"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "CONSTRUCTOR_INPUT"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:NEW_UINT8ARRAY:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "NEW"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "Uint8Array"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "NEW_UINT8ARRAY"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "FICTIONAL_BYTES",
              "NUMBER"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "CONSTRUCTOR_INPUT"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:NUMBER_IS_FINITE:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "Number"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "NUMBER_IS_FINITE"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "NUMBER"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:NUMBER_IS_INTEGER:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "Number"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "NUMBER_IS_INTEGER"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "NUMBER"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:OBJECT_ENTRIES:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "Object"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "OBJECT_ENTRIES"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "JSON_LOCAL"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:OBJECT_FREEZE:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "Object"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "OBJECT_FREEZE"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "JSON_LOCAL",
              "PUBLIC_OUTCOME",
              "PUBLIC_REFERENCE"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:OBJECT_KEYS:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "Object"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "OBJECT_KEYS"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "JSON_LOCAL",
              "PUBLIC_OUTCOME",
              "PUBLIC_REFERENCE"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "EXPECT_ASSERTION",
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:OBJECT_VALUES:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "Object"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "OBJECT_VALUES"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "JSON_LOCAL"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:OS_TMPDIR:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "node:os"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "OS_TMPDIR"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 0,
        "maximum": 0
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "SUITE_OWNED_TEST_ROOT"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:PATH_BASENAME:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "node:path"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "PATH_BASENAME"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "ATTEMPT_PATH",
              "EXTERNAL_ROOT_PATH",
              "PATH_SEGMENT",
              "REPOSITORY_PRECONDITION_PATH",
              "SUITE_ROOT_PATH"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:PATH_DIRNAME:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "node:path"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "PATH_DIRNAME"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "ATTEMPT_PATH",
              "EXTERNAL_ROOT_PATH",
              "PATH_SEGMENT",
              "REPOSITORY_PRECONDITION_PATH",
              "SUITE_ROOT_PATH"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:PATH_IS_ABSOLUTE:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "node:path"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "PATH_IS_ABSOLUTE"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "ATTEMPT_PATH",
              "EXTERNAL_ROOT_PATH",
              "PATH_SEGMENT",
              "REPOSITORY_PRECONDITION_PATH",
              "SUITE_ROOT_PATH"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:PATH_JOIN:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "node:path"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "PATH_JOIN"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": null
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ONE_OF",
          "values": [
            "ATTEMPT_PATH",
            "EXTERNAL_ROOT_PATH",
            "PATH_SEGMENT",
            "REPOSITORY_PRECONDITION_PATH",
            "SUITE_ROOT_PATH"
          ]
        },
        "governedLiteralIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:PATH_RELATIVE:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "node:path"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "PATH_RELATIVE"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 2,
        "maximum": 2
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "ATTEMPT_PATH",
              "EXTERNAL_ROOT_PATH",
              "PATH_SEGMENT",
              "REPOSITORY_PRECONDITION_PATH",
              "SUITE_ROOT_PATH"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        },
        {
          "index": 1,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "ATTEMPT_PATH",
              "EXTERNAL_ROOT_PATH",
              "PATH_SEGMENT",
              "REPOSITORY_PRECONDITION_PATH",
              "SUITE_ROOT_PATH"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:PATH_RESOLVE:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "node:path"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "PATH_RESOLVE"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": null
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ONE_OF",
          "values": [
            "ATTEMPT_PATH",
            "EXTERNAL_ROOT_PATH",
            "PATH_SEGMENT",
            "REPOSITORY_PRECONDITION_PATH",
            "SUITE_ROOT_PATH"
          ]
        },
        "governedLiteralIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:PATH_SEP_READ:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "PROPERTY_READ"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "node:path"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "PATH_SEP_READ"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "PROPERTY_READ_RESULT"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:PRESERVE_RESPONSE_EVIDENCE_TEST_CALL:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "../responseEvidenceCapture"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "PRESERVE_RESPONSE_EVIDENCE_TEST_CALL"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "FICTIONAL_RESPONSE"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "OPTIONS_OBJECT_CONTAINS_FICTIONAL_RESPONSE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:PRIVATE_SEAM_CLOSE:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "PARAMETER"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "PRIVATE_SEAM"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "PRIVATE_SEAM_CLOSE"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "FILE_DESCRIPTOR"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [
        {
          "position": "CALLEE",
          "resolutions": {
            "mode": "ONE_OF",
            "values": [
              "UNIQUE_PARAMETER"
            ]
          },
          "scopes": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          },
          "cycles": {
            "mode": "ONE_OF",
            "values": [
              "ACYCLIC"
            ]
          },
          "capabilityReturns": {
            "mode": "ONE_OF",
            "values": [
              "NO_CAPABILITY_RETURN"
            ]
          },
          "terminalStatuses": {
            "mode": "ONE_OF",
            "values": [
              "EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL"
            ]
          },
          "escapes": {
            "mode": "ONE_OF",
            "values": [
              "NO_SURVIVING_CAPTURE"
            ]
          }
        }
      ],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "ATTEMPT_TEMP_RECEIPT",
          "ATTEMPT_TEMP_RESPONSE"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:PRIVATE_SEAM_EXISTS:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "PARAMETER"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "PRIVATE_SEAM"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "PRIVATE_SEAM_EXISTS"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "ATTEMPT_PATH",
              "EXTERNAL_ROOT_PATH",
              "REPOSITORY_PRECONDITION_PATH",
              "SUITE_ROOT_PATH"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [
        {
          "position": "CALLEE",
          "resolutions": {
            "mode": "ONE_OF",
            "values": [
              "UNIQUE_PARAMETER"
            ]
          },
          "scopes": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          },
          "cycles": {
            "mode": "ONE_OF",
            "values": [
              "ACYCLIC"
            ]
          },
          "capabilityReturns": {
            "mode": "ONE_OF",
            "values": [
              "NO_CAPABILITY_RETURN"
            ]
          },
          "terminalStatuses": {
            "mode": "ONE_OF",
            "values": [
              "EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL"
            ]
          },
          "escapes": {
            "mode": "ONE_OF",
            "values": [
              "NO_SURVIVING_CAPTURE"
            ]
          }
        }
      ],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "FILESYSTEM_PATH"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:PRIVATE_SEAM_FSYNC:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "PARAMETER"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "PRIVATE_SEAM"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "PRIVATE_SEAM_FSYNC"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "FILE_DESCRIPTOR"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [
        {
          "position": "CALLEE",
          "resolutions": {
            "mode": "ONE_OF",
            "values": [
              "UNIQUE_PARAMETER"
            ]
          },
          "scopes": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          },
          "cycles": {
            "mode": "ONE_OF",
            "values": [
              "ACYCLIC"
            ]
          },
          "capabilityReturns": {
            "mode": "ONE_OF",
            "values": [
              "NO_CAPABILITY_RETURN"
            ]
          },
          "terminalStatuses": {
            "mode": "ONE_OF",
            "values": [
              "EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL"
            ]
          },
          "escapes": {
            "mode": "ONE_OF",
            "values": [
              "NO_SURVIVING_CAPTURE"
            ]
          }
        }
      ],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "ATTEMPT_TEMP_RECEIPT",
          "ATTEMPT_TEMP_RESPONSE"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:PRIVATE_SEAM_LSTAT:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "PARAMETER"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "PRIVATE_SEAM"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "PRIVATE_SEAM_LSTAT"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "ATTEMPT_PATH",
              "EXTERNAL_ROOT_PATH",
              "REPOSITORY_PRECONDITION_PATH",
              "SUITE_ROOT_PATH"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [
        {
          "position": "CALLEE",
          "resolutions": {
            "mode": "ONE_OF",
            "values": [
              "UNIQUE_PARAMETER"
            ]
          },
          "scopes": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          },
          "cycles": {
            "mode": "ONE_OF",
            "values": [
              "ACYCLIC"
            ]
          },
          "capabilityReturns": {
            "mode": "ONE_OF",
            "values": [
              "NO_CAPABILITY_RETURN"
            ]
          },
          "terminalStatuses": {
            "mode": "ONE_OF",
            "values": [
              "EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL"
            ]
          },
          "escapes": {
            "mode": "ONE_OF",
            "values": [
              "NO_SURVIVING_CAPTURE"
            ]
          }
        }
      ],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "FILESYSTEM_PATH"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:PRIVATE_SEAM_MKDIR:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "PARAMETER"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "PRIVATE_SEAM"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "PRIVATE_SEAM_MKDIR"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 2,
        "maximum": 2
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "ATTEMPT_PATH",
              "SUITE_ROOT_PATH"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        },
        {
          "index": 1,
          "provenanceKinds": {
            "mode": "ONE_OF",
            "values": [
              "LITERAL"
            ]
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "NUMBER"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "FILE_MODE_OWNER_ONLY_384"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [
        {
          "position": "CALLEE",
          "resolutions": {
            "mode": "ONE_OF",
            "values": [
              "UNIQUE_PARAMETER"
            ]
          },
          "scopes": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          },
          "cycles": {
            "mode": "ONE_OF",
            "values": [
              "ACYCLIC"
            ]
          },
          "capabilityReturns": {
            "mode": "ONE_OF",
            "values": [
              "NO_CAPABILITY_RETURN"
            ]
          },
          "terminalStatuses": {
            "mode": "ONE_OF",
            "values": [
              "EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL"
            ]
          },
          "escapes": {
            "mode": "ONE_OF",
            "values": [
              "NO_SURVIVING_CAPTURE"
            ]
          }
        }
      ],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "ATTEMPT_TEMP_RECEIPT",
          "ATTEMPT_TEMP_RESPONSE",
          "SUITE_OWNED_TEST_ROOT"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "FILESYSTEM_PATH"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:PRIVATE_SEAM_OPEN:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "PARAMETER"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "PRIVATE_SEAM"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "PRIVATE_SEAM_OPEN"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 3,
        "maximum": 3
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "ATTEMPT_PATH"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        },
        {
          "index": 1,
          "provenanceKinds": {
            "mode": "ONE_OF",
            "values": [
              "LITERAL"
            ]
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "GOVERNANCE_FIELD"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "FILE_OPEN_EXCLUSIVE_WX"
            ]
          }
        },
        {
          "index": 2,
          "provenanceKinds": {
            "mode": "ONE_OF",
            "values": [
              "LITERAL"
            ]
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "NUMBER"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "FILE_MODE_OWNER_ONLY_384"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [
        {
          "position": "CALLEE",
          "resolutions": {
            "mode": "ONE_OF",
            "values": [
              "UNIQUE_PARAMETER"
            ]
          },
          "scopes": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          },
          "cycles": {
            "mode": "ONE_OF",
            "values": [
              "ACYCLIC"
            ]
          },
          "capabilityReturns": {
            "mode": "ONE_OF",
            "values": [
              "NO_CAPABILITY_RETURN"
            ]
          },
          "terminalStatuses": {
            "mode": "ONE_OF",
            "values": [
              "EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL"
            ]
          },
          "escapes": {
            "mode": "ONE_OF",
            "values": [
              "NO_SURVIVING_CAPTURE"
            ]
          }
        }
      ],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "ATTEMPT_TEMP_RECEIPT",
          "ATTEMPT_TEMP_RESPONSE"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "FILESYSTEM_PATH"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:PRIVATE_SEAM_READ_FILE:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "PARAMETER"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "PRIVATE_SEAM"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "PRIVATE_SEAM_READ_FILE"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "ATTEMPT_PATH",
              "SUITE_ROOT_PATH"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [
        {
          "position": "CALLEE",
          "resolutions": {
            "mode": "ONE_OF",
            "values": [
              "UNIQUE_PARAMETER"
            ]
          },
          "scopes": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          },
          "cycles": {
            "mode": "ONE_OF",
            "values": [
              "ACYCLIC"
            ]
          },
          "capabilityReturns": {
            "mode": "ONE_OF",
            "values": [
              "NO_CAPABILITY_RETURN"
            ]
          },
          "terminalStatuses": {
            "mode": "ONE_OF",
            "values": [
              "EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL"
            ]
          },
          "escapes": {
            "mode": "ONE_OF",
            "values": [
              "NO_SURVIVING_CAPTURE"
            ]
          }
        }
      ],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "READ_FINAL_RECEIPT",
          "READ_FINAL_RESPONSE",
          "READ_SUITE_FIXTURE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "FILESYSTEM_CONTENT"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:PRIVATE_SEAM_REALPATH:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "PARAMETER"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "PRIVATE_SEAM"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "PRIVATE_SEAM_REALPATH"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "ATTEMPT_PATH",
              "EXTERNAL_ROOT_PATH",
              "REPOSITORY_PRECONDITION_PATH",
              "SUITE_ROOT_PATH"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [
        {
          "position": "CALLEE",
          "resolutions": {
            "mode": "ONE_OF",
            "values": [
              "UNIQUE_PARAMETER"
            ]
          },
          "scopes": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          },
          "cycles": {
            "mode": "ONE_OF",
            "values": [
              "ACYCLIC"
            ]
          },
          "capabilityReturns": {
            "mode": "ONE_OF",
            "values": [
              "NO_CAPABILITY_RETURN"
            ]
          },
          "terminalStatuses": {
            "mode": "ONE_OF",
            "values": [
              "EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL"
            ]
          },
          "escapes": {
            "mode": "ONE_OF",
            "values": [
              "NO_SURVIVING_CAPTURE"
            ]
          }
        }
      ],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "FILESYSTEM_PATH"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:PRIVATE_SEAM_REMOVE:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "PARAMETER"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "PRIVATE_SEAM"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "PRIVATE_SEAM_REMOVE"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 2,
        "maximum": 2
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "ATTEMPT_PATH",
              "SUITE_ROOT_PATH"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        },
        {
          "index": 1,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "BOOLEAN"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [
        {
          "position": "CALLEE",
          "resolutions": {
            "mode": "ONE_OF",
            "values": [
              "UNIQUE_PARAMETER"
            ]
          },
          "scopes": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          },
          "cycles": {
            "mode": "ONE_OF",
            "values": [
              "ACYCLIC"
            ]
          },
          "capabilityReturns": {
            "mode": "ONE_OF",
            "values": [
              "NO_CAPABILITY_RETURN"
            ]
          },
          "terminalStatuses": {
            "mode": "ONE_OF",
            "values": [
              "EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL"
            ]
          },
          "escapes": {
            "mode": "ONE_OF",
            "values": [
              "NO_SURVIVING_CAPTURE"
            ]
          }
        }
      ],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "REMOVE_ATTEMPT_TEMP_RECEIPT",
          "REMOVE_ATTEMPT_TEMP_RESPONSE",
          "REMOVE_SUITE_FIXTURE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "ATTEMPT_TEMP_RECEIPT",
          "ATTEMPT_TEMP_RESPONSE",
          "SUITE_OWNED_TEST_ROOT"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "FILESYSTEM_PATH"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:PRIVATE_SEAM_RENAME:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "PARAMETER"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "PRIVATE_SEAM"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "PRIVATE_SEAM_RENAME"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 2,
        "maximum": 2
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "ATTEMPT_PATH"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        },
        {
          "index": 1,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "ATTEMPT_PATH"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [
        {
          "position": "CALLEE",
          "resolutions": {
            "mode": "ONE_OF",
            "values": [
              "UNIQUE_PARAMETER"
            ]
          },
          "scopes": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          },
          "cycles": {
            "mode": "ONE_OF",
            "values": [
              "ACYCLIC"
            ]
          },
          "capabilityReturns": {
            "mode": "ONE_OF",
            "values": [
              "NO_CAPABILITY_RETURN"
            ]
          },
          "terminalStatuses": {
            "mode": "ONE_OF",
            "values": [
              "EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL"
            ]
          },
          "escapes": {
            "mode": "ONE_OF",
            "values": [
              "NO_SURVIVING_CAPTURE"
            ]
          }
        }
      ],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "RENAME_RECEIPT_TEMP_FINAL_SAME_DIRECTORY",
          "RENAME_RESPONSE_TEMP_FINAL_SAME_DIRECTORY"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "ATTEMPT_FINAL_RECEIPT",
          "ATTEMPT_FINAL_RESPONSE"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "FILESYSTEM_PATH"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:PRIVATE_SEAM_REPOSITORY_ROOT:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "PARAMETER"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "PRIVATE_SEAM"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "PRIVATE_SEAM_REPOSITORY_ROOT"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "REPOSITORY_PRECONDITION_PATH"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [
        {
          "position": "CALLEE",
          "resolutions": {
            "mode": "ONE_OF",
            "values": [
              "UNIQUE_PARAMETER"
            ]
          },
          "scopes": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          },
          "cycles": {
            "mode": "ONE_OF",
            "values": [
              "ACYCLIC"
            ]
          },
          "capabilityReturns": {
            "mode": "ONE_OF",
            "values": [
              "NO_CAPABILITY_RETURN"
            ]
          },
          "terminalStatuses": {
            "mode": "ONE_OF",
            "values": [
              "EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL"
            ]
          },
          "escapes": {
            "mode": "ONE_OF",
            "values": [
              "NO_SURVIVING_CAPTURE"
            ]
          }
        }
      ],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "ROLE_ROOT_PRODUCTION_IMPORT",
          "ROLE_ROOT_TEST_IMPORT"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:PRIVATE_SEAM_SHA256:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "PARAMETER"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "PRIVATE_SEAM"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "PRIVATE_SEAM_SHA256"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ONE_OF",
            "values": [
              "LITERAL"
            ]
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "GOVERNANCE_FIELD"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "HASH_ALGORITHM_SHA256"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [
        {
          "position": "CALLEE",
          "resolutions": {
            "mode": "ONE_OF",
            "values": [
              "UNIQUE_PARAMETER"
            ]
          },
          "scopes": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          },
          "cycles": {
            "mode": "ONE_OF",
            "values": [
              "ACYCLIC"
            ]
          },
          "capabilityReturns": {
            "mode": "ONE_OF",
            "values": [
              "NO_CAPABILITY_RETURN"
            ]
          },
          "terminalStatuses": {
            "mode": "ONE_OF",
            "values": [
              "EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL"
            ]
          },
          "escapes": {
            "mode": "ONE_OF",
            "values": [
              "NO_SURVIVING_CAPTURE"
            ]
          }
        }
      ],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "HASH_STATE"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:PRIVATE_SEAM_STAT:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "PARAMETER"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "PRIVATE_SEAM"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "PRIVATE_SEAM_STAT"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "ATTEMPT_PATH",
              "EXTERNAL_ROOT_PATH",
              "REPOSITORY_PRECONDITION_PATH",
              "SUITE_ROOT_PATH"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [
        {
          "position": "CALLEE",
          "resolutions": {
            "mode": "ONE_OF",
            "values": [
              "UNIQUE_PARAMETER"
            ]
          },
          "scopes": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          },
          "cycles": {
            "mode": "ONE_OF",
            "values": [
              "ACYCLIC"
            ]
          },
          "capabilityReturns": {
            "mode": "ONE_OF",
            "values": [
              "NO_CAPABILITY_RETURN"
            ]
          },
          "terminalStatuses": {
            "mode": "ONE_OF",
            "values": [
              "EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL"
            ]
          },
          "escapes": {
            "mode": "ONE_OF",
            "values": [
              "NO_SURVIVING_CAPTURE"
            ]
          }
        }
      ],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "FILESYSTEM_PATH"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:PRIVATE_SEAM_WRITE:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "PARAMETER"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "PRIVATE_SEAM"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "PRIVATE_SEAM_WRITE"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 5,
        "maximum": 5
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "FILE_DESCRIPTOR"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        },
        {
          "index": 1,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "FICTIONAL_BYTES",
              "RECEIPT_BYTES",
              "SOURCE_BYTES"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        },
        {
          "index": 2,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "NUMBER"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        },
        {
          "index": 3,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "NUMBER"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        },
        {
          "index": 4,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "NUMBER"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [
        {
          "position": "CALLEE",
          "resolutions": {
            "mode": "ONE_OF",
            "values": [
              "UNIQUE_PARAMETER"
            ]
          },
          "scopes": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          },
          "cycles": {
            "mode": "ONE_OF",
            "values": [
              "ACYCLIC"
            ]
          },
          "capabilityReturns": {
            "mode": "ONE_OF",
            "values": [
              "NO_CAPABILITY_RETURN"
            ]
          },
          "terminalStatuses": {
            "mode": "ONE_OF",
            "values": [
              "EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL"
            ]
          },
          "escapes": {
            "mode": "ONE_OF",
            "values": [
              "NO_SURVIVING_CAPTURE"
            ]
          }
        }
      ],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "ATTEMPT_TEMP_RECEIPT",
          "ATTEMPT_TEMP_RESPONSE"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "FILESYSTEM_CONTENT"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:REGEXP_TEST:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "RegExp"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "REGEXP_TEST"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "GOVERNANCE_FIELD",
              "PATH_SEGMENT",
              "TIMESTAMP"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "REGEXP"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:REPOSITORY_ROOT_RESOLVE:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "../../../support/repositoryRoot",
          "../../support/repositoryRoot"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "REPOSITORY_ROOT_RESOLVE"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "REPOSITORY_PRECONDITION_PATH"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "ROLE_ROOT_PRODUCTION_IMPORT",
          "ROLE_ROOT_TEST_IMPORT"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:SET_ADD:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_PRIVATE"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "SET_ADD"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "GOVERNANCE_FIELD",
              "PATH_SEGMENT"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "SET"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "COLLECTION_STORE"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:SET_HAS:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_PRIVATE"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "SET_HAS"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "GOVERNANCE_FIELD",
              "PATH_SEGMENT"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "SET"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "RECEIVER_OF_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:STRING_ENDS_WITH:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_PRIVATE"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "STRING_ENDS_WITH"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "GOVERNANCE_FIELD",
              "PATH_SEGMENT"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "STRING"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "RECEIVER_OF_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:STRING_INCLUDES:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_PRIVATE"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "STRING_INCLUDES"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "GOVERNANCE_FIELD",
              "PATH_SEGMENT"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "STRING"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "RECEIVER_OF_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:STRING_SPLIT:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_PRIVATE"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "STRING_SPLIT"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "GOVERNANCE_FIELD"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "STRING"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "RECEIVER_OF_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:STRING_STARTS_WITH:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_PRIVATE"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "STRING_STARTS_WITH"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "GOVERNANCE_FIELD",
              "PATH_SEGMENT"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "STRING"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "RECEIVER_OF_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:STRING_TO_LOWER:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_PRIVATE"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "STRING_TO_LOWER"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 0,
        "maximum": 0
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "STRING"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "RECEIVER_OF_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:STRING_TO_UPPER:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_PRIVATE"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "STRING_TO_UPPER"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 0,
        "maximum": 0
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "STRING"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "RECEIVER_OF_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:STRING_TRIM:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_PRIVATE"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "STRING_TRIM"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 0,
        "maximum": 0
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "STRING"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "RECEIVER_OF_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D4:UINT8ARRAY_FROM:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST",
          "PRODUCTION"
        ]
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "CALL"
        ]
      },
      "provenanceKinds": {
        "mode": "ONE_OF",
        "values": [
          "BUILTIN_GLOBAL",
          "IMPORT_BINDING"
        ]
      },
      "roots": {
        "mode": "ONE_OF",
        "values": [
          "Uint8Array"
        ]
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "UINT8ARRAY_FROM"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "RANGE",
        "minimum": 1,
        "maximum": 1
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ANY"
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "CORRUPTED_FICTIONAL_BYTES",
              "FICTIONAL_BYTES",
              "INSTRUMENT_BYTES",
              "PERSISTED_RESPONSE_BYTES",
              "POLICY_BYTES",
              "RECEIPT_BYTES",
              "SOURCE_BYTES"
            ]
          },
          "governedLiteralIds": {
            "mode": "ONE_OF",
            "values": [
              "NONE"
            ]
          }
        }
      ],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ONE_OF",
        "values": [
          "NONE"
        ]
      },
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "LOCAL_ONLY"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "ARGUMENT_TO_CALL"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": []
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": []
        }
      },
      "classification": "PERMITTED_MECHANICAL_EDGE"
    }
  ],
  "d5ProhibitedPredicates": [
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-01-01-IMPORT-ALLOWLIST",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "IMPORT"
        ]
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ONE_OF",
        "values": [
          "UNALLOWLISTED"
        ]
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "PROHIBITED_IMPORT_OR_DYNAMIC_LOAD"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-01-02-IMPORT-FORM",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "IMPORT"
        ]
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ONE_OF",
        "values": [
          "DYNAMIC_REQUIRE",
          "IMPORT_EXPRESSION",
          "NAMESPACE",
          "RE_EXPORT",
          "SIDE_EFFECT"
        ]
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "PROHIBITED_IMPORT_OR_DYNAMIC_LOAD"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-01-03-IMPORT-BINDING",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "IMPORT"
        ]
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ONE_OF",
        "values": [
          "ALIASED"
        ]
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "PROHIBITED_IMPORT_OR_DYNAMIC_LOAD"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-01-04-DYNAMIC-LOAD-OPERATION",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "ALIASED_IMPORT",
          "DYNAMIC_REQUIRE",
          "EVAL_LOAD",
          "IMPORT_EXPRESSION",
          "NAMESPACE_IMPORT",
          "RE_EXPORT",
          "SIDE_EFFECT_IMPORT"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "PROHIBITED_IMPORT_OR_DYNAMIC_LOAD"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-02-01-COGNITIVE-PROVENANCE",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ONE_OF",
        "values": [
          "COGNITIVE_SEMANTIC_ANDY_PROVIDER"
        ]
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "COGNITIVE_SEMANTIC_ANDY_PROVIDER"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-02-02-SEMANTIC-DESTINATION",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "CALLBACK",
          "SEMANTIC_RESULT"
        ]
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "COGNITIVE_SEMANTIC_ANDY_PROVIDER"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-03-01-REPOSITORY-PROVENANCE",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ONE_OF",
        "values": [
          "CASE001_REPOSITORY_SERVICE_OR_EVIDENCE"
        ]
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "CASE001_REPOSITORY_SERVICE_OR_EVIDENCE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-03-02-REPOSITORY-DESTINATION",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "REPOSITORY"
        ]
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "CASE001_REPOSITORY_SERVICE_OR_EVIDENCE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-04-01-NETWORK-PROVENANCE",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ONE_OF",
        "values": [
          "NETWORK_TELEMETRY_ANALYTICS"
        ]
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "NETWORK_TELEMETRY_ANALYTICS"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-04-02-NETWORK-DESTINATION",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "NETWORK"
        ]
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "NETWORK_TELEMETRY_ANALYTICS"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-05-01-UI-PROVENANCE",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ONE_OF",
        "values": [
          "UI_CLIPBOARD_SHARE_DISPLAY"
        ]
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "UI_CLIPBOARD_SHARE_DISPLAY"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-05-02-UI-DESTINATION",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "UI_DISPLAY"
        ]
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "UI_CLIPBOARD_SHARE_DISPLAY"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-06-01-LOGGING-PROVENANCE",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ONE_OF",
        "values": [
          "LOGGING_STDOUT_STDERR"
        ]
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "LOGGING_STDOUT_STDERR"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-06-02-OUTPUT-DESTINATION",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "OUTPUT"
        ]
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "LOGGING_STDOUT_STDERR"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-06-03-OUTPUT-FLOW",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "OUTPUT_CONTENT"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "LOGGING_STDOUT_STDERR"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-07-01-DELIVERY-OPERATION",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "CONTRIBUTION",
          "DELIVERY",
          "MESSAGE",
          "PERMISSION_RESULT",
          "PUBLICATION",
          "TRANSFER"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "CONTRIBUTION_DELIVERY_TRANSFER"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-07-02-DELIVERY-DESTINATION",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "DELIVERY",
          "TRANSFER"
        ]
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "CONTRIBUTION_DELIVERY_TRANSFER"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-08-01-RETRY-OPERATION",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "ACTION",
          "CORRECTION_TURN",
          "FEEDBACK",
          "QUEUE",
          "REPEAT",
          "RETRY",
          "SCHEDULE",
          "SECOND_CAPTURE_OR_INVOCATION"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "RETRY_FEEDBACK_SECOND_TURN_ACTION"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-08-02-RETRY-ANCESTRY",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ONE_OF",
        "values": [
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY"
        ]
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "RETRY_FEEDBACK_SECOND_TURN_ACTION"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-08-03-SECOND-INVOCATION",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ONE_OF",
        "values": [
          "SECOND_CAPTURE_OR_INVOCATION"
        ]
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "RETRY_FEEDBACK_SECOND_TURN_ACTION"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-09-01-PUBLIC-PATH-NAME",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "PUBLIC_DECLARATION",
          "PUBLIC_MEMBER"
        ]
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ONE_OF",
        "values": [
          "DIRECTORY",
          "FILENAME",
          "FILE_DESCRIPTOR",
          "HANDLE",
          "PATH",
          "ROOT",
          "URL"
        ]
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "PUBLIC_PATH_ROOT_DESCRIPTOR"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-09-02-PUBLIC-PATH-TYPE",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "PUBLIC_DECLARATION",
          "PUBLIC_MEMBER"
        ]
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ONE_OF",
        "values": [
          "DIRECTORY",
          "FILENAME",
          "FILE_DESCRIPTOR",
          "HANDLE",
          "PATH",
          "ROOT",
          "URL"
        ]
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "PUBLIC_PATH_ROOT_DESCRIPTOR"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-09-03-PUBLIC-PATH-SUBJECT",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "PUBLIC_DECLARATION",
          "PUBLIC_MEMBER"
        ]
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ONE_OF",
        "values": [
          "ATTEMPT_PATH",
          "EXTERNAL_ROOT_PATH",
          "FILE_DESCRIPTOR",
          "FINAL_RECEIPT_PATH",
          "FINAL_RESPONSE_PATH",
          "GOVERNED_SOURCE_PATH",
          "PATH_SEGMENT",
          "REPOSITORY_PATH",
          "REPOSITORY_PRECONDITION_PATH",
          "SUITE_ROOT_PATH",
          "TOKEN_PATH"
        ]
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ONE_OF",
        "values": [
          "PUBLIC_RETURN"
        ]
      },
      "dataFlows": {
        "mode": "ONE_OF",
        "values": [
          "PUBLIC_MEMBER_VALUE"
        ]
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "PUBLIC_PATH_ROOT_DESCRIPTOR"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-10-01-PUBLIC-MUTATION-NAME",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "PUBLIC_DECLARATION",
          "PUBLIC_MEMBER"
        ]
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ONE_OF",
        "values": [
          "APPEND",
          "CHMOD",
          "CLEANUP",
          "CLOSE",
          "DELETE",
          "DISPOSE",
          "MOVE",
          "REMOVE",
          "RENAME",
          "RETAINED_BYTES",
          "TRUNCATE",
          "UNLINK",
          "WRITE"
        ]
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "PUBLIC_MUTATION_LIFECYCLE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-10-02-PUBLIC-MUTATION-TYPE",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "PUBLIC_DECLARATION",
          "PUBLIC_MEMBER"
        ]
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ONE_OF",
        "values": [
          "APPEND",
          "CHMOD",
          "CLEANUP",
          "CLOSE",
          "DELETE",
          "DISPOSE",
          "MOVE",
          "REMOVE",
          "RENAME",
          "RETAINED_BYTES",
          "TRUNCATE",
          "UNLINK",
          "WRITE"
        ]
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "PUBLIC_MUTATION_LIFECYCLE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-11-01-PUBLIC-SEMANTIC-NAME",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "PUBLIC_DECLARATION",
          "PUBLIC_MEMBER"
        ]
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ONE_OF",
        "values": [
          "ACCEPTED",
          "APPROVED",
          "CHECKER_RESULT",
          "COMPLIANT",
          "CONTRIBUTION",
          "DELIVERABLE",
          "PERMISSION",
          "RETRYABLE",
          "SEMANTIC_RESULT"
        ]
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "PUBLIC_SEMANTIC_PERMISSION_RESULT"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-11-02-PUBLIC-SEMANTIC-TYPE",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ONE_OF",
        "values": [
          "PUBLIC_DECLARATION",
          "PUBLIC_MEMBER"
        ]
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ONE_OF",
        "values": [
          "ACCEPTED",
          "APPROVED",
          "CHECKER_RESULT",
          "COMPLIANT",
          "CONTRIBUTION",
          "DELIVERABLE",
          "PERMISSION",
          "RETRYABLE",
          "SEMANTIC_RESULT"
        ]
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "PUBLIC_SEMANTIC_PERMISSION_RESULT"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-12-01-RESPONSE-RELATION",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ONE_OF",
        "values": [
          "PROHIBITED_TRANSFORMATION_OR_EGRESS"
        ]
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "RESPONSE_TRANSFORMATION_EGRESS"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-13-01-FILESYSTEM-RELATION",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ONE_OF",
        "values": [
          "REMOVE_FORBIDDEN_TARGET",
          "RENAME_CROSS_DIRECTORY",
          "RENAME_NONCORRESPONDING_PAIR",
          "UNAUTHORISED_DESTINATION"
        ]
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "UNAUTHORISED_WRITE_OR_REMOVE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-14-01-DYNAMIC-PROVENANCE",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ONE_OF",
        "values": [
          "DYNAMIC_EXECUTION_PROCESS_CONTROL"
        ]
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "DYNAMIC_EXECUTION_PROCESS_CONTROL"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-14-02-DYNAMIC-OPERATION",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "CHILD_PROCESS",
          "DAEMON_CONTROL",
          "EVAL",
          "FUNCTION_CONSTRUCTOR",
          "PROCESS_CONTROL",
          "SHELL_EXECUTION",
          "VM_EXECUTION",
          "WORKER_THREADS"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "DYNAMIC_EXECUTION_PROCESS_CONTROL"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-15-01-ENVIRONMENT-PROVENANCE",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ONE_OF",
        "values": [
          "ENVIRONMENT_COMPILER_FALLBACK"
        ]
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "ENVIRONMENT_COMPILER_FALLBACK"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-15-02-ENVIRONMENT-OPERATION",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "ALTERNATE_COMPILER_LOAD",
          "ENVIRONMENT_READ",
          "FALLBACK",
          "GLOBAL_COMPILER_LOAD",
          "NODE_PATH_RESOLUTION"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "ENVIRONMENT_COMPILER_FALLBACK"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-15-03-MACHINE-LITERAL-LAUNCH",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ONE_OF",
        "values": [
          "ALTERNATE_COMPILER_LOAD",
          "CHILD_PROCESS",
          "DAEMON_CONTROL",
          "GLOBAL_COMPILER_LOAD",
          "NODE_PATH_RESOLUTION",
          "PROCESS_CONTROL",
          "SHELL_EXECUTION",
          "WORKER_THREADS"
        ]
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [
        {
          "index": 0,
          "provenanceKinds": {
            "mode": "ONE_OF",
            "values": [
              "LITERAL"
            ]
          },
          "dataLabels": {
            "mode": "ONE_OF",
            "values": [
              "ABSOLUTE_MACHINE_PATH_LITERAL",
              "PRIVATE_IP_LITERAL",
              "USERNAME_LITERAL"
            ]
          }
        }
      ],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "ENVIRONMENT_COMPILER_FALLBACK"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-15-04-FALLBACK-CONTROL",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ONE_OF",
        "values": [
          "FALLBACK_BRANCH"
        ]
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "ENVIRONMENT_COMPILER_FALLBACK"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-16-01-UNAUTHORISED-PROBE",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ONE_OF",
        "values": [
          "CHECKER_EXCEPTION_AFTER_VERIFIED_CAPTURE",
          "DENIED_PUBLIC_MEMBER_LOOKUP",
          "FRESH_COPY_MUTATION",
          "FROZEN_OBJECT_MUTATION",
          "INJECTED_MECHANICAL_FAILURE",
          "SYNTHETIC_CORRUPTION"
        ]
      },
      "probeValidities": {
        "mode": "ONE_OF",
        "values": [
          "UNAUTHORISED"
        ]
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "classification": "UNAUTHORISED_TEST_PROBE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D5-17-01-UNKNOWN-EXECUTABLE",
      "phase": "PROHIBITED",
      "sourceRoles": {
        "mode": "ANY"
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ANY"
      },
      "ancestryNone": {
        "mode": "ANY"
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ANY"
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ONE_OF",
        "values": [
          "UNKNOWN",
          "ZERO_D4_OR_D6"
        ]
      },
      "classification": "UNKNOWN_EXECUTABLE_EDGE"
    }
  ],
  "d6AuthorisedProbes": [
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D6:CHECKER_EXCEPTION_AFTER_VERIFIED_CAPTURE:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ANY"
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ANY"
      },
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ONE_OF",
        "values": [
          "IN_IMPORTED_JEST_IT_CALLBACK",
          "IN_IMPORTED_JEST_IT_EACH_CALLBACK"
        ]
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "ESCAPES_TEST_CALLBACK",
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY",
          "IN_MODULE_SCOPE",
          "IN_RETURN_EXPRESSION"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ONE_OF",
        "values": [
          "CHECKER_EXCEPTION_AFTER_VERIFIED_CAPTURE"
        ]
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "ONE_TEST_CALLBACK"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "role": "CHECKER",
              "operations": {
                "mode": "ONE_OF",
                "values": [
                  "CHECKER_EXCEPTION_AFTER_VERIFIED_CAPTURE"
                ]
              },
              "argumentCount": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "countWithinScope": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "inputRoles": {
                "mode": "EQUALS",
                "values": [
                  "CHECKER_INPUT"
                ]
              },
              "outputRoles": {
                "mode": "EQUALS",
                "values": [
                  "FIRST_FAILURE_IDENTITY"
                ]
              },
              "failureEffects": {
                "mode": "ONE_OF",
                "values": [
                  "THROWS_CONTENT_FREE_ERROR"
                ]
              }
            },
            {
              "role": "RECEIPT_REREAD",
              "operations": {
                "mode": "ONE_OF",
                "values": [
                  "CHECKER_EXCEPTION_AFTER_VERIFIED_CAPTURE"
                ]
              },
              "argumentCount": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              },
              "countWithinScope": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "inputRoles": {
                "mode": "EQUALS",
                "values": [
                  "VERIFIED_REFERENCE"
                ]
              },
              "outputRoles": {
                "mode": "EQUALS",
                "values": [
                  "RECEIPT_REREAD_VALUE"
                ]
              },
              "failureEffects": {
                "mode": "ONE_OF",
                "values": [
                  "NONE"
                ]
              }
            },
            {
              "role": "RESPONSE_REREAD",
              "operations": {
                "mode": "ONE_OF",
                "values": [
                  "CHECKER_EXCEPTION_AFTER_VERIFIED_CAPTURE"
                ]
              },
              "argumentCount": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              },
              "countWithinScope": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "inputRoles": {
                "mode": "EQUALS",
                "values": [
                  "VERIFIED_REFERENCE"
                ]
              },
              "outputRoles": {
                "mode": "EQUALS",
                "values": [
                  "RESPONSE_REREAD_VALUE"
                ]
              },
              "failureEffects": {
                "mode": "ONE_OF",
                "values": [
                  "NONE"
                ]
              }
            }
          ]
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "matcher": "TO_BE_IDENTITY_UNCHANGED",
              "expected": "PRIOR_REREAD_IDENTITY",
              "subjectRole": "RECEIPT_REREAD_VALUE",
              "operationRole": "RECEIPT_REREAD",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            },
            {
              "matcher": "TO_BE_IDENTITY_UNCHANGED",
              "expected": "PRIOR_REREAD_IDENTITY",
              "subjectRole": "RESPONSE_REREAD_VALUE",
              "operationRole": "RESPONSE_REREAD",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            }
          ]
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "RECEIPT_REREAD_VALUE",
              "rightRole": "RECEIPT_REREAD_VALUE",
              "operationRole": "RECEIPT_REREAD"
            },
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "RESPONSE_REREAD_VALUE",
              "rightRole": "RESPONSE_REREAD_VALUE",
              "operationRole": "RESPONSE_REREAD"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "RECEIPT_REREAD_VALUE",
              "rightRole": "RECEIPT_REREAD_VALUE",
              "operationRole": "RECEIPT_REREAD"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "RESPONSE_REREAD_VALUE",
              "rightRole": "RESPONSE_REREAD_VALUE",
              "operationRole": "RESPONSE_REREAD"
            },
            {
              "kind": "CHECKER_INPUT_ONLY_VERIFIED_REFERENCE",
              "leftRole": "VERIFIED_REFERENCE",
              "rightRole": "CHECKER_INPUT",
              "operationRole": "CHECKER"
            },
            {
              "kind": "OPERATION_PRECEDES_OPERATION",
              "leftRole": "VERIFIED_REFERENCE",
              "rightRole": "CHECKER_INPUT",
              "operationRole": "CHECKER"
            },
            {
              "kind": "VALUE_IDENTITY_EQUAL",
              "leftRole": "RECEIPT_REREAD_VALUE",
              "rightRole": "VERIFIED_REFERENCE",
              "operationRole": "RECEIPT_REREAD"
            },
            {
              "kind": "VALUE_IDENTITY_EQUAL",
              "leftRole": "RESPONSE_REREAD_VALUE",
              "rightRole": "VERIFIED_REFERENCE",
              "operationRole": "RESPONSE_REREAD"
            }
          ]
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "counter": "CHECKER_INVOCATION",
              "count": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              }
            },
            {
              "counter": "DELIVERY",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "RETRY",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            }
          ]
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "CHECKER_INPUT",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "RECEIPT_REREAD_VALUE",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "RESPONSE_REREAD_VALUE",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "VERIFIED_REFERENCE",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            }
          ]
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "CHECKER_INPUT",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "CHECKER"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            },
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "CHECKER"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            },
            {
              "valueRole": "RECEIPT_REREAD_VALUE",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "RECEIPT_REREAD"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            },
            {
              "valueRole": "RESPONSE_REREAD_VALUE",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "RESPONSE_REREAD"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            },
            {
              "valueRole": "VERIFIED_REFERENCE",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "CHECKER",
                  "RECEIPT_REREAD",
                  "RESPONSE_REREAD"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            }
          ]
        }
      },
      "classification": "AUTHORISED_TEST_PROBE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D6:DENIED_PUBLIC_MEMBER_IN:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ANY"
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ANY"
      },
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ONE_OF",
        "values": [
          "IN_IMPORTED_JEST_IT_CALLBACK",
          "IN_IMPORTED_JEST_IT_EACH_CALLBACK"
        ]
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "ESCAPES_TEST_CALLBACK",
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY",
          "IN_MODULE_SCOPE",
          "IN_RETURN_EXPRESSION"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ONE_OF",
        "values": [
          "DENIED_PUBLIC_MEMBER_LOOKUP"
        ]
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "ONE_TEST_CALLBACK"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "accepted",
            "append",
            "approved",
            "chmod",
            "cleanup",
            "close",
            "compliant",
            "contribution",
            "delete",
            "deliver",
            "deliverable",
            "delivery",
            "descriptor",
            "directory",
            "display",
            "dispose",
            "fd",
            "feedback",
            "filename",
            "handle",
            "move",
            "path",
            "permission",
            "preview",
            "print",
            "remove",
            "rename",
            "retry",
            "retryable",
            "root",
            "transfer",
            "truncate",
            "unlink",
            "url",
            "write"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "role": "DENIED_LOOKUP",
              "operations": {
                "mode": "ONE_OF",
                "values": [
                  "DENIED_PUBLIC_MEMBER_IN"
                ]
              },
              "argumentCount": {
                "mode": "RANGE",
                "minimum": 2,
                "maximum": 2
              },
              "countWithinScope": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "inputRoles": {
                "mode": "EQUALS",
                "values": [
                  "DENIED_MEMBER",
                  "PUBLIC_SUBJECT"
                ]
              },
              "outputRoles": {
                "mode": "EQUALS",
                "values": [
                  "LOOKUP_RESULT"
                ]
              },
              "failureEffects": {
                "mode": "ONE_OF",
                "values": [
                  "NONE"
                ]
              }
            }
          ]
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "matcher": "TO_BE_FALSE",
              "expected": "FALSE_VALUE",
              "subjectRole": "LOOKUP_RESULT",
              "operationRole": "DENIED_LOOKUP",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            }
          ]
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "LOOKUP_RESULT",
              "rightRole": "LOOKUP_RESULT",
              "operationRole": "DENIED_LOOKUP"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "LOOKUP_RESULT",
              "rightRole": "LOOKUP_RESULT",
              "operationRole": "DENIED_LOOKUP"
            }
          ]
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "counter": "LOOKUP_INVOCATION",
              "count": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              }
            }
          ]
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "DENIED_MEMBER",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "LOOKUP_RESULT",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "PUBLIC_SUBJECT",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            }
          ]
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "DENIED_MEMBER",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "DENIED_LOOKUP"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            },
            {
              "valueRole": "LOOKUP_RESULT",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "DENIED_LOOKUP"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            },
            {
              "valueRole": "PUBLIC_SUBJECT",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "DENIED_LOOKUP"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            }
          ]
        }
      },
      "classification": "AUTHORISED_TEST_PROBE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D6:DENIED_PUBLIC_MEMBER_KEYS:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ANY"
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ANY"
      },
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ONE_OF",
        "values": [
          "IN_IMPORTED_JEST_IT_CALLBACK",
          "IN_IMPORTED_JEST_IT_EACH_CALLBACK"
        ]
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "ESCAPES_TEST_CALLBACK",
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY",
          "IN_MODULE_SCOPE",
          "IN_RETURN_EXPRESSION"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ONE_OF",
        "values": [
          "DENIED_PUBLIC_MEMBER_LOOKUP"
        ]
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "ONE_TEST_CALLBACK"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "accepted",
            "append",
            "approved",
            "chmod",
            "cleanup",
            "close",
            "compliant",
            "contribution",
            "delete",
            "deliver",
            "deliverable",
            "delivery",
            "descriptor",
            "directory",
            "display",
            "dispose",
            "fd",
            "feedback",
            "filename",
            "handle",
            "move",
            "path",
            "permission",
            "preview",
            "print",
            "remove",
            "rename",
            "retry",
            "retryable",
            "root",
            "transfer",
            "truncate",
            "unlink",
            "url",
            "write"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "role": "DENIED_KEYS_ENUMERATION",
              "operations": {
                "mode": "ONE_OF",
                "values": [
                  "OBJECT_KEYS"
                ]
              },
              "argumentCount": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "countWithinScope": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "inputRoles": {
                "mode": "EQUALS",
                "values": [
                  "PUBLIC_SUBJECT"
                ]
              },
              "outputRoles": {
                "mode": "EQUALS",
                "values": [
                  "LOOKUP_RESULT"
                ]
              },
              "failureEffects": {
                "mode": "ONE_OF",
                "values": [
                  "NONE"
                ]
              }
            }
          ]
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "matcher": "NOT_TO_CONTAIN",
              "expected": "DENIED_MEMBER_VALUE",
              "subjectRole": "LOOKUP_RESULT",
              "operationRole": "DENIED_KEYS_ENUMERATION",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            }
          ]
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "LOOKUP_RESULT",
              "rightRole": "LOOKUP_RESULT",
              "operationRole": "DENIED_KEYS_ENUMERATION"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "LOOKUP_RESULT",
              "rightRole": "LOOKUP_RESULT",
              "operationRole": "DENIED_KEYS_ENUMERATION"
            }
          ]
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "counter": "KEYS_INVOCATION",
              "count": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              }
            }
          ]
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "DENIED_MEMBER",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "LOOKUP_RESULT",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "PUBLIC_SUBJECT",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            }
          ]
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "DENIED_MEMBER",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "DENIED_KEYS_ENUMERATION"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            },
            {
              "valueRole": "LOOKUP_RESULT",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "DENIED_KEYS_ENUMERATION"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            },
            {
              "valueRole": "PUBLIC_SUBJECT",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "DENIED_KEYS_ENUMERATION"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            }
          ]
        }
      },
      "classification": "AUTHORISED_TEST_PROBE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D6:DENIED_PUBLIC_MEMBER_REFLECT_GET:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ANY"
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ANY"
      },
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ONE_OF",
        "values": [
          "IN_IMPORTED_JEST_IT_CALLBACK",
          "IN_IMPORTED_JEST_IT_EACH_CALLBACK"
        ]
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "ESCAPES_TEST_CALLBACK",
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY",
          "IN_MODULE_SCOPE",
          "IN_RETURN_EXPRESSION"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ONE_OF",
        "values": [
          "DENIED_PUBLIC_MEMBER_LOOKUP"
        ]
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "ONE_TEST_CALLBACK"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "accepted",
            "append",
            "approved",
            "chmod",
            "cleanup",
            "close",
            "compliant",
            "contribution",
            "delete",
            "deliver",
            "deliverable",
            "delivery",
            "descriptor",
            "directory",
            "display",
            "dispose",
            "fd",
            "feedback",
            "filename",
            "handle",
            "move",
            "path",
            "permission",
            "preview",
            "print",
            "remove",
            "rename",
            "retry",
            "retryable",
            "root",
            "transfer",
            "truncate",
            "unlink",
            "url",
            "write"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "role": "DENIED_LOOKUP",
              "operations": {
                "mode": "ONE_OF",
                "values": [
                  "DENIED_PUBLIC_MEMBER_REFLECT_GET"
                ]
              },
              "argumentCount": {
                "mode": "RANGE",
                "minimum": 2,
                "maximum": 2
              },
              "countWithinScope": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "inputRoles": {
                "mode": "EQUALS",
                "values": [
                  "DENIED_MEMBER",
                  "PUBLIC_SUBJECT"
                ]
              },
              "outputRoles": {
                "mode": "EQUALS",
                "values": [
                  "LOOKUP_RESULT"
                ]
              },
              "failureEffects": {
                "mode": "ONE_OF",
                "values": [
                  "NONE"
                ]
              }
            }
          ]
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "matcher": "TO_BE_UNDEFINED",
              "expected": "UNDEFINED_VALUE",
              "subjectRole": "LOOKUP_RESULT",
              "operationRole": "DENIED_LOOKUP",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            }
          ]
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "LOOKUP_RESULT",
              "rightRole": "LOOKUP_RESULT",
              "operationRole": "DENIED_LOOKUP"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "LOOKUP_RESULT",
              "rightRole": "LOOKUP_RESULT",
              "operationRole": "DENIED_LOOKUP"
            }
          ]
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "counter": "LOOKUP_INVOCATION",
              "count": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              }
            }
          ]
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "DENIED_MEMBER",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "LOOKUP_RESULT",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "PUBLIC_SUBJECT",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            }
          ]
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "DENIED_MEMBER",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "DENIED_LOOKUP"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            },
            {
              "valueRole": "LOOKUP_RESULT",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "DENIED_LOOKUP"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            },
            {
              "valueRole": "PUBLIC_SUBJECT",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "DENIED_LOOKUP"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            }
          ]
        }
      },
      "classification": "AUTHORISED_TEST_PROBE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D6:FRESH_COPY_MUTATION:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ANY"
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ANY"
      },
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ONE_OF",
        "values": [
          "IN_IMPORTED_JEST_IT_CALLBACK",
          "IN_IMPORTED_JEST_IT_EACH_CALLBACK"
        ]
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "ESCAPES_TEST_CALLBACK",
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY",
          "IN_MODULE_SCOPE",
          "IN_RETURN_EXPRESSION"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ONE_OF",
        "values": [
          "FRESH_COPY_MUTATION"
        ]
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "ONE_TEST_CALLBACK"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "role": "FIRST_COPY_MUTATION",
              "operations": {
                "mode": "ONE_OF",
                "values": [
                  "FRESH_COPY_MUTATION"
                ]
              },
              "argumentCount": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              },
              "countWithinScope": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "inputRoles": {
                "mode": "EQUALS",
                "values": [
                  "FIRST_COPY"
                ]
              },
              "outputRoles": {
                "mode": "EQUALS",
                "values": [
                  "FIRST_COPY"
                ]
              },
              "failureEffects": {
                "mode": "ONE_OF",
                "values": [
                  "NONE"
                ]
              }
            },
            {
              "role": "READ_BYTES",
              "operations": {
                "mode": "ONE_OF",
                "values": [
                  "FRESH_COPY_MUTATION"
                ]
              },
              "argumentCount": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              },
              "countWithinScope": {
                "mode": "RANGE",
                "minimum": 2,
                "maximum": 2
              },
              "inputRoles": {
                "mode": "EQUALS",
                "values": [
                  "PUBLIC_SUBJECT"
                ]
              },
              "outputRoles": {
                "mode": "EQUALS",
                "values": [
                  "FIRST_COPY",
                  "SECOND_COPY"
                ]
              },
              "failureEffects": {
                "mode": "ONE_OF",
                "values": [
                  "NONE"
                ]
              }
            }
          ]
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "matcher": "TO_EQUAL_BYTE_LENGTH",
              "expected": "ORIGINAL_BYTE_LENGTH",
              "subjectRole": "SECOND_COPY",
              "operationRole": "READ_BYTES",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            },
            {
              "matcher": "TO_EQUAL_CONTENT",
              "expected": "ORIGINAL_FICTIONAL_CONTENT",
              "subjectRole": "SECOND_COPY",
              "operationRole": "READ_BYTES",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            },
            {
              "matcher": "TO_EQUAL_HASH",
              "expected": "ORIGINAL_SHA256",
              "subjectRole": "SECOND_COPY",
              "operationRole": "READ_BYTES",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            }
          ]
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "SECOND_COPY",
              "rightRole": "SECOND_COPY",
              "operationRole": "READ_BYTES"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "SECOND_COPY",
              "rightRole": "SECOND_COPY",
              "operationRole": "READ_BYTES"
            },
            {
              "kind": "MUTATES_ONLY",
              "leftRole": "FIRST_COPY",
              "rightRole": "NONE",
              "operationRole": "FIRST_COPY_MUTATION"
            },
            {
              "kind": "VALUE_BYTE_LENGTH_EQUAL",
              "leftRole": "SECOND_COPY",
              "rightRole": "FICTIONAL_BASELINE",
              "operationRole": "READ_BYTES"
            },
            {
              "kind": "VALUE_CONTENT_EQUAL",
              "leftRole": "SECOND_COPY",
              "rightRole": "FICTIONAL_BASELINE",
              "operationRole": "READ_BYTES"
            },
            {
              "kind": "VALUE_SHA256_EQUAL",
              "leftRole": "SECOND_COPY",
              "rightRole": "FICTIONAL_BASELINE",
              "operationRole": "READ_BYTES"
            }
          ]
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "counter": "MUTATION",
              "count": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              }
            },
            {
              "counter": "READ_BYTES_INVOCATION",
              "count": {
                "mode": "RANGE",
                "minimum": 2,
                "maximum": 2
              }
            }
          ]
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FICTIONAL_BASELINE",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "FIRST_COPY",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "PUBLIC_SUBJECT",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "SECOND_COPY",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            }
          ]
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FICTIONAL_BASELINE",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "READ_BYTES"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            },
            {
              "valueRole": "FIRST_COPY",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "FIRST_COPY_MUTATION",
                  "READ_BYTES"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            },
            {
              "valueRole": "PUBLIC_SUBJECT",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "READ_BYTES"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            },
            {
              "valueRole": "SECOND_COPY",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "READ_BYTES"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            }
          ]
        }
      },
      "classification": "AUTHORISED_TEST_PROBE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D6:FROZEN_OBJECT_MUTATION:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ANY"
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ANY"
      },
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ONE_OF",
        "values": [
          "IN_IMPORTED_JEST_IT_CALLBACK",
          "IN_IMPORTED_JEST_IT_EACH_CALLBACK"
        ]
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "ESCAPES_TEST_CALLBACK",
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY",
          "IN_MODULE_SCOPE",
          "IN_RETURN_EXPRESSION"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ONE_OF",
        "values": [
          "FROZEN_OBJECT_MUTATION"
        ]
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "ONE_TEST_CALLBACK"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "role": "FROZEN_CHECK",
              "operations": {
                "mode": "ONE_OF",
                "values": [
                  "FROZEN_OBJECT_MUTATION"
                ]
              },
              "argumentCount": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "countWithinScope": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "inputRoles": {
                "mode": "EQUALS",
                "values": [
                  "FROZEN_TARGET"
                ]
              },
              "outputRoles": {
                "mode": "EQUALS",
                "values": [
                  "OUTCOME_STATUS"
                ]
              },
              "failureEffects": {
                "mode": "ONE_OF",
                "values": [
                  "NONE"
                ]
              }
            },
            {
              "role": "FROZEN_MUTATION",
              "operations": {
                "mode": "ONE_OF",
                "values": [
                  "FROZEN_OBJECT_MUTATION"
                ]
              },
              "argumentCount": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              },
              "countWithinScope": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "inputRoles": {
                "mode": "EQUALS",
                "values": [
                  "FROZEN_TARGET"
                ]
              },
              "outputRoles": {
                "mode": "EQUALS",
                "values": []
              },
              "failureEffects": {
                "mode": "ONE_OF",
                "values": [
                  "NONE"
                ]
              }
            }
          ]
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "matcher": "TO_BE_TRUE",
              "expected": "TRUE_VALUE",
              "subjectRole": "OUTCOME_STATUS",
              "operationRole": "FROZEN_CHECK",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            },
            {
              "matcher": "TO_THROW",
              "expected": "NONE",
              "subjectRole": "FROZEN_TARGET",
              "operationRole": "FROZEN_MUTATION",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            }
          ]
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "FROZEN_TARGET",
              "rightRole": "FROZEN_TARGET",
              "operationRole": "FROZEN_MUTATION"
            },
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "FROZEN_CHECK"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "FROZEN_TARGET",
              "rightRole": "FROZEN_TARGET",
              "operationRole": "FROZEN_MUTATION"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "FROZEN_CHECK"
            },
            {
              "kind": "VALUE_IDENTITY_EQUAL",
              "leftRole": "FROZEN_TARGET",
              "rightRole": "FROZEN_TARGET",
              "operationRole": "FROZEN_MUTATION"
            }
          ]
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "counter": "MUTATION",
              "count": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              }
            }
          ]
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FROZEN_TARGET",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            }
          ]
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FROZEN_TARGET",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "FROZEN_CHECK",
                  "FROZEN_MUTATION"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "FROZEN_CHECK"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            }
          ]
        }
      },
      "classification": "AUTHORISED_TEST_PROBE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D6:INJECTED_MECHANICAL_FAILURE_PROGRESS:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ANY"
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ANY"
      },
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ONE_OF",
        "values": [
          "IN_IMPORTED_JEST_IT_CALLBACK",
          "IN_IMPORTED_JEST_IT_EACH_CALLBACK"
        ]
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "ESCAPES_TEST_CALLBACK",
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY",
          "IN_MODULE_SCOPE",
          "IN_RETURN_EXPRESSION"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ONE_OF",
        "values": [
          "INJECTED_MECHANICAL_FAILURE"
        ]
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "ONE_TEST_CALLBACK"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "PRIVATE_SEAM_WRITE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "role": "INJECTED_FAILURE",
              "operations": {
                "mode": "ONE_OF",
                "values": [
                  "PRIVATE_SEAM_WRITE"
                ]
              },
              "argumentCount": {
                "mode": "RANGE",
                "minimum": 5,
                "maximum": 5
              },
              "countWithinScope": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "inputRoles": {
                "mode": "EQUALS",
                "values": [
                  "EXPECTED_BYTE_LENGTH"
                ]
              },
              "outputRoles": {
                "mode": "EQUALS",
                "values": [
                  "FIRST_FAILURE_IDENTITY",
                  "OUTCOME_STATUS",
                  "RETURNED_PROGRESS"
                ]
              },
              "failureEffects": {
                "mode": "ONE_OF",
                "values": [
                  "RETURNS_SHORT_PROGRESS",
                  "RETURNS_ZERO_PROGRESS"
                ]
              }
            }
          ]
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "matcher": "TO_BE_FIRST_FAILURE",
              "expected": "FIRST_FAILURE_OPERATION",
              "subjectRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            },
            {
              "matcher": "TO_BE_PRESERVATION_INCOMPLETE",
              "expected": "PRESERVATION_INCOMPLETE",
              "subjectRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            }
          ]
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "FAILURE_IS_FIRST_FAILURE",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "PROGRESS_LESS_THAN_EXPECTED_LENGTH",
              "leftRole": "RETURNED_PROGRESS",
              "rightRole": "EXPECTED_BYTE_LENGTH",
              "operationRole": "INJECTED_FAILURE"
            }
          ]
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "counter": "CHECKER_INVOCATION",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "INJECTED_FAILURE",
              "count": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              }
            },
            {
              "counter": "RETRY",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "SEMANTIC_CONSEQUENCE",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            }
          ]
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "EXPECTED_BYTE_LENGTH",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "RETURNED_PROGRESS",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            }
          ]
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "EXPECTED_BYTE_LENGTH",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            },
            {
              "valueRole": "FICTIONAL_BASELINE",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            },
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            },
            {
              "valueRole": "RETURNED_PROGRESS",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            }
          ]
        }
      },
      "classification": "AUTHORISED_TEST_PROBE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D6:INJECTED_MECHANICAL_FAILURE_THROW:THROW_CLOSE",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ANY"
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ANY"
      },
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ONE_OF",
        "values": [
          "IN_IMPORTED_JEST_IT_CALLBACK",
          "IN_IMPORTED_JEST_IT_EACH_CALLBACK"
        ]
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "ESCAPES_TEST_CALLBACK",
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY",
          "IN_MODULE_SCOPE",
          "IN_RETURN_EXPRESSION"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ONE_OF",
        "values": [
          "INJECTED_MECHANICAL_FAILURE"
        ]
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "ONE_TEST_CALLBACK"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "PRIVATE_SEAM_CLOSE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "role": "INJECTED_FAILURE",
              "operations": {
                "mode": "ONE_OF",
                "values": [
                  "PRIVATE_SEAM_CLOSE"
                ]
              },
              "argumentCount": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "countWithinScope": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "inputRoles": {
                "mode": "EQUALS",
                "values": []
              },
              "outputRoles": {
                "mode": "EQUALS",
                "values": [
                  "FIRST_FAILURE_IDENTITY",
                  "OUTCOME_STATUS"
                ]
              },
              "failureEffects": {
                "mode": "ONE_OF",
                "values": [
                  "THROWS_CONTENT_FREE_ERROR"
                ]
              }
            }
          ]
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "matcher": "TO_BE_FIRST_FAILURE",
              "expected": "FIRST_FAILURE_OPERATION",
              "subjectRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            },
            {
              "matcher": "TO_BE_PRESERVATION_INCOMPLETE",
              "expected": "PRESERVATION_INCOMPLETE",
              "subjectRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            }
          ]
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "FAILURE_IS_FIRST_FAILURE",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            }
          ]
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "counter": "CHECKER_INVOCATION",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "INJECTED_FAILURE",
              "count": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              }
            },
            {
              "counter": "RETRY",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "SEMANTIC_CONSEQUENCE",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            }
          ]
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            }
          ]
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FICTIONAL_BASELINE",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            },
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            }
          ]
        }
      },
      "classification": "AUTHORISED_TEST_PROBE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D6:INJECTED_MECHANICAL_FAILURE_THROW:THROW_EXISTS",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ANY"
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ANY"
      },
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ONE_OF",
        "values": [
          "IN_IMPORTED_JEST_IT_CALLBACK",
          "IN_IMPORTED_JEST_IT_EACH_CALLBACK"
        ]
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "ESCAPES_TEST_CALLBACK",
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY",
          "IN_MODULE_SCOPE",
          "IN_RETURN_EXPRESSION"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ONE_OF",
        "values": [
          "INJECTED_MECHANICAL_FAILURE"
        ]
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "ONE_TEST_CALLBACK"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "PRIVATE_SEAM_EXISTS"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "role": "INJECTED_FAILURE",
              "operations": {
                "mode": "ONE_OF",
                "values": [
                  "PRIVATE_SEAM_EXISTS"
                ]
              },
              "argumentCount": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "countWithinScope": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "inputRoles": {
                "mode": "EQUALS",
                "values": []
              },
              "outputRoles": {
                "mode": "EQUALS",
                "values": [
                  "FIRST_FAILURE_IDENTITY",
                  "OUTCOME_STATUS"
                ]
              },
              "failureEffects": {
                "mode": "ONE_OF",
                "values": [
                  "THROWS_CONTENT_FREE_ERROR"
                ]
              }
            }
          ]
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "matcher": "TO_BE_FIRST_FAILURE",
              "expected": "FIRST_FAILURE_OPERATION",
              "subjectRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            },
            {
              "matcher": "TO_BE_PRESERVATION_INCOMPLETE",
              "expected": "PRESERVATION_INCOMPLETE",
              "subjectRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            }
          ]
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "FAILURE_IS_FIRST_FAILURE",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            }
          ]
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "counter": "CHECKER_INVOCATION",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "INJECTED_FAILURE",
              "count": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              }
            },
            {
              "counter": "RETRY",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "SEMANTIC_CONSEQUENCE",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            }
          ]
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            }
          ]
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FICTIONAL_BASELINE",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            },
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            }
          ]
        }
      },
      "classification": "AUTHORISED_TEST_PROBE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D6:INJECTED_MECHANICAL_FAILURE_THROW:THROW_FSYNC",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ANY"
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ANY"
      },
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ONE_OF",
        "values": [
          "IN_IMPORTED_JEST_IT_CALLBACK",
          "IN_IMPORTED_JEST_IT_EACH_CALLBACK"
        ]
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "ESCAPES_TEST_CALLBACK",
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY",
          "IN_MODULE_SCOPE",
          "IN_RETURN_EXPRESSION"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ONE_OF",
        "values": [
          "INJECTED_MECHANICAL_FAILURE"
        ]
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "ONE_TEST_CALLBACK"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "PRIVATE_SEAM_FSYNC"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "role": "INJECTED_FAILURE",
              "operations": {
                "mode": "ONE_OF",
                "values": [
                  "PRIVATE_SEAM_FSYNC"
                ]
              },
              "argumentCount": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "countWithinScope": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "inputRoles": {
                "mode": "EQUALS",
                "values": []
              },
              "outputRoles": {
                "mode": "EQUALS",
                "values": [
                  "FIRST_FAILURE_IDENTITY",
                  "OUTCOME_STATUS"
                ]
              },
              "failureEffects": {
                "mode": "ONE_OF",
                "values": [
                  "THROWS_CONTENT_FREE_ERROR"
                ]
              }
            }
          ]
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "matcher": "TO_BE_FIRST_FAILURE",
              "expected": "FIRST_FAILURE_OPERATION",
              "subjectRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            },
            {
              "matcher": "TO_BE_PRESERVATION_INCOMPLETE",
              "expected": "PRESERVATION_INCOMPLETE",
              "subjectRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            }
          ]
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "FAILURE_IS_FIRST_FAILURE",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            }
          ]
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "counter": "CHECKER_INVOCATION",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "INJECTED_FAILURE",
              "count": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              }
            },
            {
              "counter": "RETRY",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "SEMANTIC_CONSEQUENCE",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            }
          ]
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            }
          ]
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FICTIONAL_BASELINE",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            },
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            }
          ]
        }
      },
      "classification": "AUTHORISED_TEST_PROBE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D6:INJECTED_MECHANICAL_FAILURE_THROW:THROW_LSTAT",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ANY"
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ANY"
      },
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ONE_OF",
        "values": [
          "IN_IMPORTED_JEST_IT_CALLBACK",
          "IN_IMPORTED_JEST_IT_EACH_CALLBACK"
        ]
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "ESCAPES_TEST_CALLBACK",
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY",
          "IN_MODULE_SCOPE",
          "IN_RETURN_EXPRESSION"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ONE_OF",
        "values": [
          "INJECTED_MECHANICAL_FAILURE"
        ]
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "ONE_TEST_CALLBACK"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "PRIVATE_SEAM_LSTAT"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "role": "INJECTED_FAILURE",
              "operations": {
                "mode": "ONE_OF",
                "values": [
                  "PRIVATE_SEAM_LSTAT"
                ]
              },
              "argumentCount": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "countWithinScope": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "inputRoles": {
                "mode": "EQUALS",
                "values": []
              },
              "outputRoles": {
                "mode": "EQUALS",
                "values": [
                  "FIRST_FAILURE_IDENTITY",
                  "OUTCOME_STATUS"
                ]
              },
              "failureEffects": {
                "mode": "ONE_OF",
                "values": [
                  "THROWS_CONTENT_FREE_ERROR"
                ]
              }
            }
          ]
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "matcher": "TO_BE_FIRST_FAILURE",
              "expected": "FIRST_FAILURE_OPERATION",
              "subjectRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            },
            {
              "matcher": "TO_BE_PRESERVATION_INCOMPLETE",
              "expected": "PRESERVATION_INCOMPLETE",
              "subjectRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            }
          ]
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "FAILURE_IS_FIRST_FAILURE",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            }
          ]
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "counter": "CHECKER_INVOCATION",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "INJECTED_FAILURE",
              "count": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              }
            },
            {
              "counter": "RETRY",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "SEMANTIC_CONSEQUENCE",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            }
          ]
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            }
          ]
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FICTIONAL_BASELINE",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            },
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            }
          ]
        }
      },
      "classification": "AUTHORISED_TEST_PROBE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D6:INJECTED_MECHANICAL_FAILURE_THROW:THROW_MKDIR",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ANY"
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ANY"
      },
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ONE_OF",
        "values": [
          "IN_IMPORTED_JEST_IT_CALLBACK",
          "IN_IMPORTED_JEST_IT_EACH_CALLBACK"
        ]
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "ESCAPES_TEST_CALLBACK",
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY",
          "IN_MODULE_SCOPE",
          "IN_RETURN_EXPRESSION"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ONE_OF",
        "values": [
          "INJECTED_MECHANICAL_FAILURE"
        ]
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "ONE_TEST_CALLBACK"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "PRIVATE_SEAM_MKDIR"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "role": "INJECTED_FAILURE",
              "operations": {
                "mode": "ONE_OF",
                "values": [
                  "PRIVATE_SEAM_MKDIR"
                ]
              },
              "argumentCount": {
                "mode": "RANGE",
                "minimum": 2,
                "maximum": 2
              },
              "countWithinScope": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "inputRoles": {
                "mode": "EQUALS",
                "values": []
              },
              "outputRoles": {
                "mode": "EQUALS",
                "values": [
                  "FIRST_FAILURE_IDENTITY",
                  "OUTCOME_STATUS"
                ]
              },
              "failureEffects": {
                "mode": "ONE_OF",
                "values": [
                  "THROWS_CONTENT_FREE_ERROR"
                ]
              }
            }
          ]
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "matcher": "TO_BE_FIRST_FAILURE",
              "expected": "FIRST_FAILURE_OPERATION",
              "subjectRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            },
            {
              "matcher": "TO_BE_PRESERVATION_INCOMPLETE",
              "expected": "PRESERVATION_INCOMPLETE",
              "subjectRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            }
          ]
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "FAILURE_IS_FIRST_FAILURE",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            }
          ]
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "counter": "CHECKER_INVOCATION",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "INJECTED_FAILURE",
              "count": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              }
            },
            {
              "counter": "RETRY",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "SEMANTIC_CONSEQUENCE",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            }
          ]
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            }
          ]
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FICTIONAL_BASELINE",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            },
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            }
          ]
        }
      },
      "classification": "AUTHORISED_TEST_PROBE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D6:INJECTED_MECHANICAL_FAILURE_THROW:THROW_OPEN",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ANY"
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ANY"
      },
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ONE_OF",
        "values": [
          "IN_IMPORTED_JEST_IT_CALLBACK",
          "IN_IMPORTED_JEST_IT_EACH_CALLBACK"
        ]
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "ESCAPES_TEST_CALLBACK",
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY",
          "IN_MODULE_SCOPE",
          "IN_RETURN_EXPRESSION"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ONE_OF",
        "values": [
          "INJECTED_MECHANICAL_FAILURE"
        ]
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "ONE_TEST_CALLBACK"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "PRIVATE_SEAM_OPEN"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "role": "INJECTED_FAILURE",
              "operations": {
                "mode": "ONE_OF",
                "values": [
                  "PRIVATE_SEAM_OPEN"
                ]
              },
              "argumentCount": {
                "mode": "RANGE",
                "minimum": 3,
                "maximum": 3
              },
              "countWithinScope": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "inputRoles": {
                "mode": "EQUALS",
                "values": []
              },
              "outputRoles": {
                "mode": "EQUALS",
                "values": [
                  "FIRST_FAILURE_IDENTITY",
                  "OUTCOME_STATUS"
                ]
              },
              "failureEffects": {
                "mode": "ONE_OF",
                "values": [
                  "THROWS_CONTENT_FREE_ERROR"
                ]
              }
            }
          ]
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "matcher": "TO_BE_FIRST_FAILURE",
              "expected": "FIRST_FAILURE_OPERATION",
              "subjectRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            },
            {
              "matcher": "TO_BE_PRESERVATION_INCOMPLETE",
              "expected": "PRESERVATION_INCOMPLETE",
              "subjectRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            }
          ]
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "FAILURE_IS_FIRST_FAILURE",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            }
          ]
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "counter": "CHECKER_INVOCATION",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "INJECTED_FAILURE",
              "count": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              }
            },
            {
              "counter": "RETRY",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "SEMANTIC_CONSEQUENCE",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            }
          ]
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            }
          ]
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FICTIONAL_BASELINE",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            },
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            }
          ]
        }
      },
      "classification": "AUTHORISED_TEST_PROBE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D6:INJECTED_MECHANICAL_FAILURE_THROW:THROW_READ_FILE",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ANY"
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ANY"
      },
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ONE_OF",
        "values": [
          "IN_IMPORTED_JEST_IT_CALLBACK",
          "IN_IMPORTED_JEST_IT_EACH_CALLBACK"
        ]
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "ESCAPES_TEST_CALLBACK",
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY",
          "IN_MODULE_SCOPE",
          "IN_RETURN_EXPRESSION"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ONE_OF",
        "values": [
          "INJECTED_MECHANICAL_FAILURE"
        ]
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "ONE_TEST_CALLBACK"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "PRIVATE_SEAM_READ_FILE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "role": "INJECTED_FAILURE",
              "operations": {
                "mode": "ONE_OF",
                "values": [
                  "PRIVATE_SEAM_READ_FILE"
                ]
              },
              "argumentCount": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "countWithinScope": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "inputRoles": {
                "mode": "EQUALS",
                "values": []
              },
              "outputRoles": {
                "mode": "EQUALS",
                "values": [
                  "FIRST_FAILURE_IDENTITY",
                  "OUTCOME_STATUS"
                ]
              },
              "failureEffects": {
                "mode": "ONE_OF",
                "values": [
                  "THROWS_CONTENT_FREE_ERROR"
                ]
              }
            }
          ]
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "matcher": "TO_BE_FIRST_FAILURE",
              "expected": "FIRST_FAILURE_OPERATION",
              "subjectRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            },
            {
              "matcher": "TO_BE_PRESERVATION_INCOMPLETE",
              "expected": "PRESERVATION_INCOMPLETE",
              "subjectRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            }
          ]
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "FAILURE_IS_FIRST_FAILURE",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            }
          ]
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "counter": "CHECKER_INVOCATION",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "INJECTED_FAILURE",
              "count": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              }
            },
            {
              "counter": "RETRY",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "SEMANTIC_CONSEQUENCE",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            }
          ]
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            }
          ]
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FICTIONAL_BASELINE",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            },
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            }
          ]
        }
      },
      "classification": "AUTHORISED_TEST_PROBE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D6:INJECTED_MECHANICAL_FAILURE_THROW:THROW_REALPATH",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ANY"
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ANY"
      },
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ONE_OF",
        "values": [
          "IN_IMPORTED_JEST_IT_CALLBACK",
          "IN_IMPORTED_JEST_IT_EACH_CALLBACK"
        ]
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "ESCAPES_TEST_CALLBACK",
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY",
          "IN_MODULE_SCOPE",
          "IN_RETURN_EXPRESSION"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ONE_OF",
        "values": [
          "INJECTED_MECHANICAL_FAILURE"
        ]
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "ONE_TEST_CALLBACK"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "PRIVATE_SEAM_REALPATH"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "role": "INJECTED_FAILURE",
              "operations": {
                "mode": "ONE_OF",
                "values": [
                  "PRIVATE_SEAM_REALPATH"
                ]
              },
              "argumentCount": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "countWithinScope": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "inputRoles": {
                "mode": "EQUALS",
                "values": []
              },
              "outputRoles": {
                "mode": "EQUALS",
                "values": [
                  "FIRST_FAILURE_IDENTITY",
                  "OUTCOME_STATUS"
                ]
              },
              "failureEffects": {
                "mode": "ONE_OF",
                "values": [
                  "THROWS_CONTENT_FREE_ERROR"
                ]
              }
            }
          ]
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "matcher": "TO_BE_FIRST_FAILURE",
              "expected": "FIRST_FAILURE_OPERATION",
              "subjectRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            },
            {
              "matcher": "TO_BE_PRESERVATION_INCOMPLETE",
              "expected": "PRESERVATION_INCOMPLETE",
              "subjectRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            }
          ]
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "FAILURE_IS_FIRST_FAILURE",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            }
          ]
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "counter": "CHECKER_INVOCATION",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "INJECTED_FAILURE",
              "count": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              }
            },
            {
              "counter": "RETRY",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "SEMANTIC_CONSEQUENCE",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            }
          ]
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            }
          ]
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FICTIONAL_BASELINE",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            },
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            }
          ]
        }
      },
      "classification": "AUTHORISED_TEST_PROBE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D6:INJECTED_MECHANICAL_FAILURE_THROW:THROW_REMOVE",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ANY"
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ANY"
      },
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ONE_OF",
        "values": [
          "IN_IMPORTED_JEST_IT_CALLBACK",
          "IN_IMPORTED_JEST_IT_EACH_CALLBACK"
        ]
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "ESCAPES_TEST_CALLBACK",
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY",
          "IN_MODULE_SCOPE",
          "IN_RETURN_EXPRESSION"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ONE_OF",
        "values": [
          "INJECTED_MECHANICAL_FAILURE"
        ]
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "ONE_TEST_CALLBACK"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "PRIVATE_SEAM_REMOVE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "role": "INJECTED_FAILURE",
              "operations": {
                "mode": "ONE_OF",
                "values": [
                  "PRIVATE_SEAM_REMOVE"
                ]
              },
              "argumentCount": {
                "mode": "RANGE",
                "minimum": 2,
                "maximum": 2
              },
              "countWithinScope": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "inputRoles": {
                "mode": "EQUALS",
                "values": []
              },
              "outputRoles": {
                "mode": "EQUALS",
                "values": [
                  "FIRST_FAILURE_IDENTITY",
                  "OUTCOME_STATUS"
                ]
              },
              "failureEffects": {
                "mode": "ONE_OF",
                "values": [
                  "THROWS_CONTENT_FREE_ERROR"
                ]
              }
            }
          ]
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "matcher": "TO_BE_FIRST_FAILURE",
              "expected": "FIRST_FAILURE_OPERATION",
              "subjectRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            },
            {
              "matcher": "TO_BE_PRESERVATION_INCOMPLETE",
              "expected": "PRESERVATION_INCOMPLETE",
              "subjectRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            }
          ]
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "FAILURE_IS_FIRST_FAILURE",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            }
          ]
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "counter": "CHECKER_INVOCATION",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "INJECTED_FAILURE",
              "count": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              }
            },
            {
              "counter": "RETRY",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "SEMANTIC_CONSEQUENCE",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            }
          ]
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            }
          ]
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FICTIONAL_BASELINE",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            },
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            }
          ]
        }
      },
      "classification": "AUTHORISED_TEST_PROBE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D6:INJECTED_MECHANICAL_FAILURE_THROW:THROW_RENAME",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ANY"
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ANY"
      },
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ONE_OF",
        "values": [
          "IN_IMPORTED_JEST_IT_CALLBACK",
          "IN_IMPORTED_JEST_IT_EACH_CALLBACK"
        ]
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "ESCAPES_TEST_CALLBACK",
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY",
          "IN_MODULE_SCOPE",
          "IN_RETURN_EXPRESSION"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ONE_OF",
        "values": [
          "INJECTED_MECHANICAL_FAILURE"
        ]
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "ONE_TEST_CALLBACK"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "PRIVATE_SEAM_RENAME"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "role": "INJECTED_FAILURE",
              "operations": {
                "mode": "ONE_OF",
                "values": [
                  "PRIVATE_SEAM_RENAME"
                ]
              },
              "argumentCount": {
                "mode": "RANGE",
                "minimum": 2,
                "maximum": 2
              },
              "countWithinScope": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "inputRoles": {
                "mode": "EQUALS",
                "values": []
              },
              "outputRoles": {
                "mode": "EQUALS",
                "values": [
                  "FIRST_FAILURE_IDENTITY",
                  "OUTCOME_STATUS"
                ]
              },
              "failureEffects": {
                "mode": "ONE_OF",
                "values": [
                  "THROWS_CONTENT_FREE_ERROR"
                ]
              }
            }
          ]
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "matcher": "TO_BE_FIRST_FAILURE",
              "expected": "FIRST_FAILURE_OPERATION",
              "subjectRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            },
            {
              "matcher": "TO_BE_PRESERVATION_INCOMPLETE",
              "expected": "PRESERVATION_INCOMPLETE",
              "subjectRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            }
          ]
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "FAILURE_IS_FIRST_FAILURE",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            }
          ]
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "counter": "CHECKER_INVOCATION",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "INJECTED_FAILURE",
              "count": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              }
            },
            {
              "counter": "RETRY",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "SEMANTIC_CONSEQUENCE",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            }
          ]
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            }
          ]
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FICTIONAL_BASELINE",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            },
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            }
          ]
        }
      },
      "classification": "AUTHORISED_TEST_PROBE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D6:INJECTED_MECHANICAL_FAILURE_THROW:THROW_REPOSITORY_ROOT",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ANY"
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ANY"
      },
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ONE_OF",
        "values": [
          "IN_IMPORTED_JEST_IT_CALLBACK",
          "IN_IMPORTED_JEST_IT_EACH_CALLBACK"
        ]
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "ESCAPES_TEST_CALLBACK",
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY",
          "IN_MODULE_SCOPE",
          "IN_RETURN_EXPRESSION"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ONE_OF",
        "values": [
          "INJECTED_MECHANICAL_FAILURE"
        ]
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "ONE_TEST_CALLBACK"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "PRIVATE_SEAM_REPOSITORY_ROOT"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "role": "INJECTED_FAILURE",
              "operations": {
                "mode": "ONE_OF",
                "values": [
                  "PRIVATE_SEAM_REPOSITORY_ROOT"
                ]
              },
              "argumentCount": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "countWithinScope": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "inputRoles": {
                "mode": "EQUALS",
                "values": []
              },
              "outputRoles": {
                "mode": "EQUALS",
                "values": [
                  "FIRST_FAILURE_IDENTITY",
                  "OUTCOME_STATUS"
                ]
              },
              "failureEffects": {
                "mode": "ONE_OF",
                "values": [
                  "THROWS_CONTENT_FREE_ERROR"
                ]
              }
            }
          ]
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "matcher": "TO_BE_FIRST_FAILURE",
              "expected": "FIRST_FAILURE_OPERATION",
              "subjectRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            },
            {
              "matcher": "TO_BE_PRESERVATION_INCOMPLETE",
              "expected": "PRESERVATION_INCOMPLETE",
              "subjectRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            }
          ]
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "FAILURE_IS_FIRST_FAILURE",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            }
          ]
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "counter": "CHECKER_INVOCATION",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "INJECTED_FAILURE",
              "count": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              }
            },
            {
              "counter": "RETRY",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "SEMANTIC_CONSEQUENCE",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            }
          ]
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            }
          ]
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FICTIONAL_BASELINE",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            },
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            }
          ]
        }
      },
      "classification": "AUTHORISED_TEST_PROBE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D6:INJECTED_MECHANICAL_FAILURE_THROW:THROW_SHA256",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ANY"
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ANY"
      },
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ONE_OF",
        "values": [
          "IN_IMPORTED_JEST_IT_CALLBACK",
          "IN_IMPORTED_JEST_IT_EACH_CALLBACK"
        ]
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "ESCAPES_TEST_CALLBACK",
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY",
          "IN_MODULE_SCOPE",
          "IN_RETURN_EXPRESSION"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ONE_OF",
        "values": [
          "INJECTED_MECHANICAL_FAILURE"
        ]
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "ONE_TEST_CALLBACK"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "PRIVATE_SEAM_SHA256"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "role": "INJECTED_FAILURE",
              "operations": {
                "mode": "ONE_OF",
                "values": [
                  "PRIVATE_SEAM_SHA256"
                ]
              },
              "argumentCount": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "countWithinScope": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "inputRoles": {
                "mode": "EQUALS",
                "values": []
              },
              "outputRoles": {
                "mode": "EQUALS",
                "values": [
                  "FIRST_FAILURE_IDENTITY",
                  "OUTCOME_STATUS"
                ]
              },
              "failureEffects": {
                "mode": "ONE_OF",
                "values": [
                  "THROWS_CONTENT_FREE_ERROR"
                ]
              }
            }
          ]
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "matcher": "TO_BE_FIRST_FAILURE",
              "expected": "FIRST_FAILURE_OPERATION",
              "subjectRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            },
            {
              "matcher": "TO_BE_PRESERVATION_INCOMPLETE",
              "expected": "PRESERVATION_INCOMPLETE",
              "subjectRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            }
          ]
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "FAILURE_IS_FIRST_FAILURE",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            }
          ]
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "counter": "CHECKER_INVOCATION",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "INJECTED_FAILURE",
              "count": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              }
            },
            {
              "counter": "RETRY",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "SEMANTIC_CONSEQUENCE",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            }
          ]
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            }
          ]
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FICTIONAL_BASELINE",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            },
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            }
          ]
        }
      },
      "classification": "AUTHORISED_TEST_PROBE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D6:INJECTED_MECHANICAL_FAILURE_THROW:THROW_STAT",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ANY"
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ANY"
      },
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ONE_OF",
        "values": [
          "IN_IMPORTED_JEST_IT_CALLBACK",
          "IN_IMPORTED_JEST_IT_EACH_CALLBACK"
        ]
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "ESCAPES_TEST_CALLBACK",
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY",
          "IN_MODULE_SCOPE",
          "IN_RETURN_EXPRESSION"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ONE_OF",
        "values": [
          "INJECTED_MECHANICAL_FAILURE"
        ]
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "ONE_TEST_CALLBACK"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "PRIVATE_SEAM_STAT"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "role": "INJECTED_FAILURE",
              "operations": {
                "mode": "ONE_OF",
                "values": [
                  "PRIVATE_SEAM_STAT"
                ]
              },
              "argumentCount": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "countWithinScope": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "inputRoles": {
                "mode": "EQUALS",
                "values": []
              },
              "outputRoles": {
                "mode": "EQUALS",
                "values": [
                  "FIRST_FAILURE_IDENTITY",
                  "OUTCOME_STATUS"
                ]
              },
              "failureEffects": {
                "mode": "ONE_OF",
                "values": [
                  "THROWS_CONTENT_FREE_ERROR"
                ]
              }
            }
          ]
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "matcher": "TO_BE_FIRST_FAILURE",
              "expected": "FIRST_FAILURE_OPERATION",
              "subjectRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            },
            {
              "matcher": "TO_BE_PRESERVATION_INCOMPLETE",
              "expected": "PRESERVATION_INCOMPLETE",
              "subjectRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            }
          ]
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "FAILURE_IS_FIRST_FAILURE",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            }
          ]
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "counter": "CHECKER_INVOCATION",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "INJECTED_FAILURE",
              "count": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              }
            },
            {
              "counter": "RETRY",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "SEMANTIC_CONSEQUENCE",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            }
          ]
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            }
          ]
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FICTIONAL_BASELINE",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            },
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            }
          ]
        }
      },
      "classification": "AUTHORISED_TEST_PROBE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D6:INJECTED_MECHANICAL_FAILURE_THROW:THROW_WRITE",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ANY"
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ANY"
      },
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ONE_OF",
        "values": [
          "IN_IMPORTED_JEST_IT_CALLBACK",
          "IN_IMPORTED_JEST_IT_EACH_CALLBACK"
        ]
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "ESCAPES_TEST_CALLBACK",
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY",
          "IN_MODULE_SCOPE",
          "IN_RETURN_EXPRESSION"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ONE_OF",
        "values": [
          "INJECTED_MECHANICAL_FAILURE"
        ]
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "ONE_TEST_CALLBACK"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "PRIVATE_SEAM_WRITE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "role": "INJECTED_FAILURE",
              "operations": {
                "mode": "ONE_OF",
                "values": [
                  "PRIVATE_SEAM_WRITE"
                ]
              },
              "argumentCount": {
                "mode": "RANGE",
                "minimum": 5,
                "maximum": 5
              },
              "countWithinScope": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "inputRoles": {
                "mode": "EQUALS",
                "values": []
              },
              "outputRoles": {
                "mode": "EQUALS",
                "values": [
                  "FIRST_FAILURE_IDENTITY",
                  "OUTCOME_STATUS"
                ]
              },
              "failureEffects": {
                "mode": "ONE_OF",
                "values": [
                  "THROWS_CONTENT_FREE_ERROR"
                ]
              }
            }
          ]
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "matcher": "TO_BE_FIRST_FAILURE",
              "expected": "FIRST_FAILURE_OPERATION",
              "subjectRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            },
            {
              "matcher": "TO_BE_PRESERVATION_INCOMPLETE",
              "expected": "PRESERVATION_INCOMPLETE",
              "subjectRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            }
          ]
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "FIRST_FAILURE_IDENTITY",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            },
            {
              "kind": "FAILURE_IS_FIRST_FAILURE",
              "leftRole": "FIRST_FAILURE_IDENTITY",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_FAILURE"
            }
          ]
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "counter": "CHECKER_INVOCATION",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "INJECTED_FAILURE",
              "count": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              }
            },
            {
              "counter": "RETRY",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "SEMANTIC_CONSEQUENCE",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            }
          ]
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            }
          ]
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FICTIONAL_BASELINE",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            },
            {
              "valueRole": "FIRST_FAILURE_IDENTITY",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_FAILURE"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            }
          ]
        }
      },
      "classification": "AUTHORISED_TEST_PROBE"
    },
    {
      "schema": "HH-CHECK-5-D3-PREDICATE-2",
      "id": "D6:SYNTHETIC_CORRUPTION:ONLY",
      "phase": "TERMINAL",
      "sourceRoles": {
        "mode": "ONE_OF",
        "values": [
          "FOCUSED_TEST"
        ]
      },
      "nodeKinds": {
        "mode": "ANY"
      },
      "provenanceKinds": {
        "mode": "ANY"
      },
      "roots": {
        "mode": "ANY"
      },
      "operations": {
        "mode": "ANY"
      },
      "provenanceFamilies": {
        "mode": "ANY"
      },
      "importForms": {
        "mode": "ANY"
      },
      "importAllowlistStatuses": {
        "mode": "ANY"
      },
      "importBindingStatuses": {
        "mode": "ANY"
      },
      "publicNameCapabilities": {
        "mode": "ANY"
      },
      "publicTypeCapabilities": {
        "mode": "ANY"
      },
      "subjectDataLabels": {
        "mode": "ANY"
      },
      "argumentCount": {
        "mode": "ANY"
      },
      "argumentConstraints": [],
      "everyArgument": {
        "provenanceKinds": {
          "mode": "ANY"
        },
        "dataLabels": {
          "mode": "ANY"
        },
        "governedLiteralIds": {
          "mode": "ANY"
        }
      },
      "receiverClasses": {
        "mode": "ANY"
      },
      "receiverProvenanceKinds": {
        "mode": "ANY"
      },
      "receiverDataLabels": {
        "mode": "ANY"
      },
      "callableConstraints": [],
      "operationRelations": {
        "mode": "ANY"
      },
      "destinationLabels": {
        "mode": "ANY"
      },
      "dataFlows": {
        "mode": "ANY"
      },
      "ancestryAll": {
        "mode": "ONE_OF",
        "values": [
          "IN_IMPORTED_JEST_IT_CALLBACK",
          "IN_IMPORTED_JEST_IT_EACH_CALLBACK"
        ]
      },
      "ancestryNone": {
        "mode": "ONE_OF",
        "values": [
          "ESCAPES_TEST_CALLBACK",
          "IN_ASYNC_SCHEDULE",
          "IN_LOOP_OR_RETRY",
          "IN_MODULE_SCOPE",
          "IN_RETURN_EXPRESSION"
        ]
      },
      "controlFacts": {
        "mode": "ANY"
      },
      "responseFlowRelations": {
        "mode": "ANY"
      },
      "filesystemMutationRelations": {
        "mode": "ANY"
      },
      "probeFamilies": {
        "mode": "ONE_OF",
        "values": [
          "SYNTHETIC_CORRUPTION"
        ]
      },
      "probeValidities": {
        "mode": "ANY"
      },
      "terminalCandidateStatuses": {
        "mode": "ANY"
      },
      "probeStructure": {
        "scope": {
          "mode": "ONE_OF",
          "values": [
            "ONE_TEST_CALLBACK"
          ]
        },
        "deniedMemberIds": {
          "mode": "ONE_OF",
          "values": [
            "NONE"
          ]
        },
        "corruptionTransformIds": {
          "mode": "ONE_OF",
          "values": [
            "ALTER_ONE_MIDDLE_BYTE",
            "APPEND_NEWLINE_0A",
            "NORMALIZE_FICTIONAL_UTF8_TO_NFC",
            "PREFIX_ONE_BYTE",
            "PREFIX_UTF8_BOM_EFBBBF",
            "SUBSTITUTE_FIXED_FICTIONAL_BYTES",
            "SUFFIX_ONE_BYTE",
            "TRUNCATE_ONE_BYTE"
          ]
        },
        "failureOperations": {
          "mode": "ONE_OF",
          "values": [
            "NOT_PROBE"
          ]
        },
        "operations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "role": "CORRUPTION_TRANSFORM",
              "operations": {
                "mode": "ONE_OF",
                "values": [
                  "SYNTHETIC_CORRUPTION"
                ]
              },
              "argumentCount": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "countWithinScope": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "inputRoles": {
                "mode": "EQUALS",
                "values": [
                  "FICTIONAL_BASELINE"
                ]
              },
              "outputRoles": {
                "mode": "EQUALS",
                "values": [
                  "TRANSFORMED_BYTES"
                ]
              },
              "failureEffects": {
                "mode": "ONE_OF",
                "values": [
                  "NONE"
                ]
              }
            },
            {
              "role": "INJECTED_READ",
              "operations": {
                "mode": "ONE_OF",
                "values": [
                  "PRIVATE_SEAM_READ_FILE"
                ]
              },
              "argumentCount": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "countWithinScope": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              },
              "inputRoles": {
                "mode": "EQUALS",
                "values": [
                  "TRANSFORMED_BYTES"
                ]
              },
              "outputRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_READ_RESULT",
                  "OUTCOME_STATUS"
                ]
              },
              "failureEffects": {
                "mode": "ONE_OF",
                "values": [
                  "NONE"
                ]
              }
            }
          ]
        },
        "assertions": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "matcher": "TO_BE_PRESERVATION_INCOMPLETE",
              "expected": "PRESERVATION_INCOMPLETE",
              "subjectRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_READ",
              "sameTestCallback": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              },
              "postDominates": {
                "mode": "ONE_OF",
                "values": [
                  true
                ]
              }
            }
          ]
        },
        "relations": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "kind": "ASSERTION_POSTDOMINATES_OPERATION",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_READ"
            },
            {
              "kind": "ASSERTION_SUBJECT",
              "leftRole": "OUTCOME_STATUS",
              "rightRole": "OUTCOME_STATUS",
              "operationRole": "INJECTED_READ"
            },
            {
              "kind": "VALUE_FLOWS_ONLY_TO",
              "leftRole": "TRANSFORMED_BYTES",
              "rightRole": "INJECTED_READ_RESULT",
              "operationRole": "CORRUPTION_TRANSFORM"
            }
          ]
        },
        "counters": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "counter": "CHECKER_INVOCATION",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "RETRY",
              "count": {
                "mode": "RANGE",
                "minimum": 0,
                "maximum": 0
              }
            },
            {
              "counter": "TRANSFORM",
              "count": {
                "mode": "RANGE",
                "minimum": 1,
                "maximum": 1
              }
            }
          ]
        },
        "escapes": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FICTIONAL_BASELINE",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "INJECTED_READ_RESULT",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            },
            {
              "valueRole": "TRANSFORMED_BYTES",
              "channels": {
                "mode": "EQUALS",
                "values": []
              }
            }
          ]
        },
        "roleProvenance": {
          "mode": "KEY_EQUAL",
          "records": [
            {
              "valueRole": "FICTIONAL_BASELINE",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "CORRUPTION_TRANSFORM"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            },
            {
              "valueRole": "INJECTED_READ_RESULT",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_READ"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            },
            {
              "valueRole": "OUTCOME_STATUS",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "INJECTED_READ"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "NOT_APPLICABLE"
                ]
              }
            },
            {
              "valueRole": "TRANSFORMED_BYTES",
              "operationRoles": {
                "mode": "EQUALS",
                "values": [
                  "CORRUPTION_TRANSFORM",
                  "INJECTED_READ"
                ]
              },
              "fictionalLineages": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_FICTIONAL"
                ]
              },
              "suiteFixtureOwnerships": {
                "mode": "ONE_OF",
                "values": [
                  "EXCLUSIVELY_CURRENT_SUITE_OWNED"
                ]
              }
            }
          ]
        }
      },
      "classification": "AUTHORISED_TEST_PROBE"
    }
  ],
  "classificationAlgorithm": {
    "normalizationRequired": true,
    "prohibitedEvaluation": "ALL",
    "prohibitedMatchCountGreaterThanZero": {
      "decision": "FAIL",
      "report": "ALL_MATCHING_PROHIBITED_FAMILIES"
    },
    "terminalEvaluationCondition": "PROHIBITED_MATCH_COUNT_EQUALS_ZERO",
    "terminalEvaluation": "ALL_D4_D6_AND_NONEXECUTABLE_TERMINAL_PREDICATES",
    "zeroTerminalMatches": {
      "decision": "FAIL",
      "failureCode": "UNKNOWN_EXECUTABLE_EDGE"
    },
    "multipleTerminalMatches": {
      "decision": "FAIL",
      "failureCode": "AMBIGUOUS_TERMINAL_CLASS"
    },
    "exactlyOneTerminalMatch": {
      "decision": "ACCEPT_EXACTLY_ONE_TERMINAL_CLASSIFICATION"
    },
    "predicateOrderAffectsResult": false,
    "firstMatch": false,
    "rescue": false,
    "fallback": false
  },
  "normalizationSchemas": {
    "schemaLanguage": {
      "objectFieldsRequired": true,
      "additionalProperties": false,
      "primitiveTypes": [
        "boolean",
        "hex64",
        "relativePath",
        "string",
        "uint"
      ],
      "arraysOrdered": true,
      "mapRule": "EXACTLY_ONE_SORTED_KEY_PER_CLOSED_ENUM_MEMBER",
      "nullableOnlyWhenExplicit": true
    },
    "NormalizedOperation": "{kind:OperationKind,root:RootV2,path:array<string>,operationId:OperationIdV2}",
    "NormalizedProvenance": "{kind:ProvenanceKind,role:SourceRole,identity:string,dataLabels:array<DataLabelV2>}",
    "NormalizedType": [
      "{kind:keyword,name:string|number|boolean|void|unknown|never}",
      "{kind:stringLiteral,value:string}",
      "{kind:named,name:string,typeArguments:array<NormalizedType>}",
      "{kind:array,readonly:boolean,element:NormalizedType}",
      "{kind:function,parameters:array<{name:string,required:boolean,type:NormalizedType}>,returns:NormalizedType}",
      "{kind:object,members:array<{kind:PROPERTY|METHOD|CALL|CONSTRUCT|GET|SET|INDEX,name:string,required:boolean,readonly:boolean,type:NormalizedType}>}",
      "{kind:union,members:array<NormalizedType>}"
    ],
    "ordering": {
      "objectMembers": "NAME_THEN_KIND",
      "unionMembers": "STABLE_SERIALIZATION",
      "parameters": "DECLARATION_ORDER"
    },
    "unsupportedType": {
      "failureCode": "TYPE_NORMALIZATION_UNKNOWN",
      "substituteRepresentation": false
    }
  },
  "nodeRecordCompleteness": {
    "NodeLedgerEntry": "{nodeId:uint,parentNodeId:uint|null,syntaxKind:string,childCount:uint,recordIds:array<recordId>,nonGovernedReason:NONE|STRUCTURAL_CONTAINER|TOKEN_OR_TRIVIA_EXCLUDED|TYPE_NODE_RECORDED_BY_OWNER|DECLARATION_INTERNAL_RECORDED_BY_OWNER}",
    "recordId": "<ROLE>:<NODE_ID>:<RECORD_KIND>:<ORDINAL>",
    "nodeIds": {
      "start": 0,
      "order": "CONTIGUOUS_PREORDER"
    },
    "recordKinds": [
      "AUTHORISED_TEST_PROBE",
      "CALL_EXPRESSION",
      "DEPENDENCY_EDGE",
      "EXECUTABLE_PROPERTY_ACCESS",
      "EXPORTED_NAME",
      "EXPORT_DECLARATION",
      "IMPORTED_BINDING",
      "IMPORT_DECLARATION",
      "LITERAL_DATA",
      "NEW_EXPRESSION",
      "PARSER_DIAGNOSTIC",
      "PROHIBITED_FINDING",
      "PUBLIC_DECLARATION",
      "PUBLIC_MEMBER",
      "SOURCE_IDENTITY",
      "UNKNOWN_FINDING"
    ],
    "recordSchemas": {
      "SOURCE_IDENTITY": "{path:relativePath,bytes:uint,sha256:hex64}",
      "PARSER_DIAGNOSTIC": "{code:uint,category:WARNING|ERROR|SUGGESTION|MESSAGE,start:uint,length:uint,messageSha256:hex64}",
      "IMPORT_DECLARATION": "{module:string,importKind:DEFAULT_VALUE|NAMED_VALUE|NAMED_TYPE|NAMED_MIXED|SIDE_EFFECT|NAMESPACE,bindingRecordIds:array<recordId>}",
      "IMPORTED_BINDING": "{module:string,importedName:string,localName:string,typeOnly:boolean}",
      "EXPORT_DECLARATION": "{declarationKind:string,nameRecordIds:array<recordId>,default:boolean,reExport:boolean}",
      "EXPORTED_NAME": "{name:string,declarationRecordId:recordId}",
      "CALL_EXPRESSION": "{operation:NormalizedOperation,callee:NormalizedProvenance,arguments:array<NormalizedProvenance>,destinationLabels:array<DestinationLabelV2>,dataFlows:array<FlowLabel>,terminalClass:TerminalClass|null}",
      "NEW_EXPRESSION": "{operation:NormalizedOperation,constructor:NormalizedProvenance,arguments:array<NormalizedProvenance>,destinationLabels:array<DestinationLabelV2>,dataFlows:array<FlowLabel>,terminalClass:TerminalClass|null}",
      "EXECUTABLE_PROPERTY_ACCESS": "{operation:NormalizedOperation,receiver:NormalizedProvenance,computed:boolean,destinationLabels:array<DestinationLabelV2>,dataFlows:array<FlowLabel>,terminalClass:TerminalClass|null}",
      "PUBLIC_DECLARATION": "{declarationKind:INTERFACE|TYPE_ALIAS|FUNCTION,name:string,exported:boolean,normalizedType:NormalizedType}",
      "PUBLIC_MEMBER": "{ownerName:string,memberKind:PROPERTY|METHOD|CALL|CONSTRUCT|GET|SET|INDEX,name:string,required:boolean,readonly:boolean,normalizedType:NormalizedType}",
      "DEPENDENCY_EDGE": "{fromRecordId:recordId,toIdentity:string,edgeKind:IMPORT|CALL|NEW|READ|WRITE|TYPE_REFERENCE}",
      "LITERAL_DATA": "{literalKind:STRING|NUMBER|BOOLEAN|NULL|TEMPLATE,valueSha256:hex64,dataLabels:array<DataLabelV2>,terminalClass:TerminalClass}",
      "AUTHORISED_TEST_PROBE": "{probeId:ProbeId,operationRecordIds:array<recordId>,assertionRecordIds:array<recordId>,escapeCount:uint,terminalClass:TerminalClass}",
      "PROHIBITED_FINDING": "{category:ProhibitedCategory,predicateIds:array<string>,subjectRecordId:recordId}",
      "UNKNOWN_FINDING": "{reason:FailureCode,subjectRecordId:recordId}"
    },
    "rules": {
      "everyVisitedNodeLedgerEntry": true,
      "everyGovernedFactExactlyOneRecord": true,
      "parentChildReconstructsOneTree": true,
      "duplicateOrSkippedIdFails": true,
      "orphanRecordFails": true,
      "unsupportedSyntaxFails": true,
      "parseCount": 1,
      "traversalCount": 1,
      "sideEffectImportDeclaration": "ImportDeclaration with no ImportClause requires importKind=SIDE_EFFECT and bindingRecordIds=[]",
      "namespaceImportDeclaration": "ImportDeclaration with NamespaceImport requires importKind=NAMESPACE"
    }
  },
  "captureSchemas": {
    "EnumerationCapture": {
      "schema": "HH-CHECK-5-ENUMERATION-2",
      "requiredFields": [
        "schema",
        "policy",
        "role",
        "source",
        "compiler",
        "parserDiagnostics",
        "nodeLedger",
        "records",
        "counts",
        "allowlistComparisons",
        "prohibitedCounts",
        "terminalClassificationCounts",
        "decision",
        "failures"
      ],
      "policy": "{schema:string,bytes:uint,sha256:hex64}",
      "source": "{path:relativePath,bytes:uint,sha256:hex64,readCount:1,parseCount:1,traversalCount:1}",
      "compiler": {
        "name": "typescript",
        "version": "5.9.3",
        "entryRelativePath": "node_modules/typescript/lib/typescript.js"
      },
      "parserDiagnostics": "array<PARSER_DIAGNOSTIC>",
      "nodeLedger": "array<NodeLedgerEntry>",
      "records": "array<NON_PARSER_DIAGNOSTIC_RECORD>",
      "counts": "map<RecordKind,uint>",
      "allowlistComparisons": "array<Comparison> IN ComparisonId ORDER",
      "prohibitedCounts": "map<ProhibitedCategory,uint>",
      "terminalClassificationCounts": "map<TerminalClass,uint>",
      "decision": [
        "FAIL",
        "PASS"
      ],
      "failures": "array<Failure>",
      "additionalProperties": false
    },
    "Comparison": "{id:ComparisonId,expectedSha256:hex64|null,observedSha256:hex64|null,equal:boolean}",
    "Failure": "{code:FailureCode,role:SourceRole|null,nodeId:uint|null,recordId:recordId|null,detailSha256:hex64}",
    "passRules": [
      "NO_DIAGNOSTICS",
      "NO_FAILURES",
      "ALL_COMPARISONS_EQUAL",
      "ALL_PROHIBITED_COUNTS_ZERO",
      "EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL_CLASS",
      "ALL_IDENTITIES_AND_COUNTS_EQUAL"
    ]
  },
  "combinedDecisionSchema": {
    "schema": "HH-CHECK-5-COMBINED-DECISION-2",
    "requiredFields": [
      "schema",
      "policy",
      "instrument",
      "repository",
      "captures",
      "aggregateCounts",
      "aggregateProhibitedCounts",
      "aggregateTerminalCounts",
      "decision",
      "failures"
    ],
    "policy": "{schema:string,bytes:uint,sha256:hex64}",
    "instrument": "{bytes:uint,sha256:hex64}",
    "repository": "{identitySchema:HH-CHECK-5-REPOSITORY-IDENTITY-1,result:PASS|FAIL}",
    "captures": {
      "cardinality": 2,
      "order": [
        "PRODUCTION",
        "FOCUSED_TEST"
      ],
      "record": "{role:SourceRole,file:production.enumeration.json|focused-test.enumeration.json,bytes:uint,sha256:hex64,rereadBytes:uint,rereadSha256:hex64}"
    },
    "aggregateCounts": "map<RecordKind,uint>",
    "aggregateProhibitedCounts": "map<ProhibitedCategory,uint>",
    "aggregateTerminalCounts": "map<TerminalClass,uint>",
    "decision": [
      "FAIL",
      "PASS"
    ],
    "failures": "array<Failure>",
    "additionalProperties": false
  },
  "boundedManifestSchema": {
    "schema": "HH-CHECK-5-BOUNDED-MANIFEST-2",
    "maximumCanonicalUtf8Bytes": 4096,
    "terminalBytes": [
      10
    ],
    "requiredFields": [
      "schema",
      "policy",
      "instrument",
      "repository",
      "authority",
      "roles",
      "combined"
    ],
    "roleOrder": [
      "PRODUCTION",
      "FOCUSED_TEST"
    ],
    "roleCardinality": 2,
    "RoleManifest": "{role:SourceRole,sourceBytes:uint,sourceSha256:hex64,parserDiagnosticCount:uint,visitedNodeCount:uint,recordCount:uint,captureBytes:uint,captureSha256:hex64,rereadBytes:uint,rereadSha256:hex64,counts:map<RecordKind,uint>,prohibitedCounts:map<ProhibitedCategory,uint>,terminalCounts:map<TerminalClass,uint>,unknownCount:uint,ambiguousCount:uint,publicAllowlistEqual:boolean,decision:PASS|FAIL}",
    "combined": "{aggregateCounts:map<RecordKind,uint>,aggregateProhibitedCounts:map<ProhibitedCategory,uint>,aggregateTerminalCounts:map<TerminalClass,uint>,stderrBytes:uint,decision:PASS|FAIL,failures:array<Failure>}",
    "prohibitedContent": [
      "ABSOLUTE_PATH",
      "COMPLETE_ENUMERATION",
      "COMPLETE_RECORDS",
      "MACHINE_IDENTIFIER",
      "RESPONSE_CONTENT",
      "SOURCE_CONTENT",
      "STACK_TRACE",
      "UNENUMERATED_FIELD"
    ],
    "recomputedFrom": [
      "AUTHORITY_STATE",
      "INDEPENDENTLY_REREAD_CAPTURES"
    ],
    "additionalProperties": false
  },
  "compilerLoadingPolicy": {
    "moduleFormat": "COMMONJS",
    "loader": "MODULE_CREATE_REQUIRE_PACKAGE_ANCHOR",
    "package": "typescript",
    "version": "5.9.3",
    "resolvedEntryRelativePath": "node_modules/typescript/lib/typescript.js",
    "fallbacks": []
  },
  "repositoryLaunchIdentity": {
    "schema": "HH-CHECK-5-REPOSITORY-IDENTITY-1",
    "rootDerivation": "REALPATH_DIRNAME_PACKAGE_ANCHOR",
    "packageAnchorRelativePath": "package.json",
    "packageName": "kitchen-mobile-clean",
    "requiredRegularNonSymlinkMarkers": [
      "constitution/02-CONSTITUTION.md",
      "docs/engineering/VALIDATION_PHILOSOPHY.md",
      "scripts/support/repositoryRoot.ts"
    ],
    "governedPaths": [
      "scripts/academy/support/responseEvidenceCapture.ts",
      "scripts/academy/support/__tests__/responseEvidenceCapture.test.ts"
    ],
    "compiler": {
      "moduleFormat": "COMMONJS",
      "loader": "MODULE_CREATE_REQUIRE_PACKAGE_ANCHOR",
      "package": "typescript",
      "version": "5.9.3",
      "resolvedEntryRelativePath": "node_modules/typescript/lib/typescript.js",
      "fallbacks": []
    },
    "launchContract": {
      "callerSuppliesPackageAnchor": true,
      "defaultFromCwd": false,
      "canonicalizeAnchorAndParent": true,
      "anchorRegularNonSymlinkPackageJson": true,
      "packageNameEquality": true,
      "markersRegularNonSymlinkMetadataOnly": true,
      "governedPathsLexicallyContainedBeforeExistenceOrRead": true,
      "compilerExactEntryAndVersion": true,
      "mismatchStopBeforeTokenOrSource": true
    }
  },
  "instrumentIdentityGate": {
    "schema": "HH-CHECK-5-INSTRUMENT-IDENTITY-GATE-1",
    "expected": {
      "bytes": "uint",
      "sha256": "hex64"
    },
    "observed": {
      "bytes": "uint",
      "sha256": "hex64"
    },
    "comparison": "EXACT_BYTES_AND_SHA256_EQUAL",
    "selfAttestation": false,
    "substitution": false,
    "mismatch": {
      "failureCode": "INSTRUMENT_IDENTITY_MISMATCH",
      "decision": "FAIL",
      "stopBeforeTokenAcquisition": true
    }
  },
  "oneUseAuthorityState": {
    "tokenSchema": "HH-CHECK-5-ONE-USE-TOKEN-1",
    "tokenInputRequiredFields": [
      "schema",
      "authorityId",
      "policySha256",
      "instrumentSha256",
      "productionSourceSha256",
      "focusedTestSourceSha256"
    ],
    "tokenIdentity": "LOWERCASE_SHA256_OF_UTF8_STABLE_SERIALIZATION",
    "productionSourceSha256": "f986633d8dd0984b385320f61a2d4a38f593284690db3d03ff4d3f10614aacfe",
    "focusedTestSourceSha256": "6b56cae73f1dcf8db64bb9a41137b16d46897bc656802a6530a3fe45843eb53f",
    "stateRoot": {
      "suppliedByAuthority": true,
      "existing": true,
      "canonical": true,
      "private": true,
      "outsideRepository": true,
      "symlink": false,
      "ownerOnlyWhereSupported": true
    },
    "statePathPattern": "<stateRoot>/hh-check5-<tokenId>.ndjson",
    "states": [
      "ACQUIRED_UNCONSUMED",
      "CLOSED_FAIL",
      "CLOSED_PASS",
      "CLOSED_POST_CONSUMPTION_FAILURE",
      "CLOSED_PRE_CONSUMPTION_FAILURE",
      "CONSUMED"
    ],
    "eventSchema": {
      "schema": "HH-CHECK-5-ONE-USE-EVENT-1",
      "requiredFields": [
        "schema",
        "tokenId",
        "sequence",
        "state",
        "timestamp",
        "failureCode"
      ],
      "tokenId": "hex64",
      "sequence": "uint",
      "timestamp": {
        "format": "YYYY-MM-DDTHH:mm:ss.sssZ",
        "asciiBytes": 24,
        "producer": "Date.prototype.toISOString()",
        "decisionInput": false
      },
      "failureCode": "FailureCode|null",
      "additionalProperties": false
    },
    "transitions": [
      {
        "from": "START",
        "to": "ACQUIRED_UNCONSUMED",
        "sequence": 0,
        "failureCode": "NULL"
      },
      {
        "from": "ACQUIRED_UNCONSUMED",
        "to": "CONSUMED",
        "failureCode": "NULL"
      },
      {
        "from": "ACQUIRED_UNCONSUMED",
        "to": "CLOSED_PRE_CONSUMPTION_FAILURE",
        "failureCode": "NON_NULL"
      },
      {
        "from": "CONSUMED",
        "to": "CLOSED_POST_CONSUMPTION_FAILURE",
        "failureCode": "NON_NULL"
      },
      {
        "from": "CONSUMED",
        "to": "CLOSED_PASS",
        "failureCode": "NULL"
      },
      {
        "from": "CONSUMED",
        "to": "CLOSED_FAIL",
        "failureCode": "NON_NULL"
      }
    ],
    "terminalStates": [
      "CLOSED_FAIL",
      "CLOSED_PASS",
      "CLOSED_POST_CONSUMPTION_FAILURE",
      "CLOSED_PRE_CONSUMPTION_FAILURE"
    ],
    "ndjson": {
      "eventSerialization": "STABLE_SORTED_KEYS_UTF8_NO_BOM_NO_INTERNAL_NEWLINE",
      "lineTerminatorByte": 10,
      "blankLines": false,
      "finalNewlineRequired": true,
      "sequenceContiguous": true,
      "tokenIdConstant": true,
      "timestampsValidNondecreasing": true
    },
    "acquisition": {
      "openFlags": "wx",
      "modeDecimal": 384,
      "writeCompleteLine": true,
      "fsync": true,
      "close": true,
      "beforeSourceRead": true
    },
    "laterAppend": {
      "appendOnly": true,
      "noTruncation": true,
      "writeCompleteLine": true,
      "fsync": true,
      "close": true
    },
    "prohibited": [
      "ALTERNATE_FILE",
      "ALTERNATE_PATH",
      "REMOVAL",
      "RENAME",
      "REPAIR",
      "RETRY",
      "REWRITE",
      "TRUNCATION"
    ],
    "existingPathResult": "AUTHORITY_ALREADY_USED_OR_STATE_UNAVAILABLE",
    "StateAppendFailure": "{schema:HH-CHECK-5-STATE-APPEND-FAILURE-1,tokenId:hex64,attemptedSequence:uint,attemptedState:OneUseState,failureCode:AUTHORITY_STATE_APPEND_FAILURE,eventCanonicalSha256:hex64}"
  },
  "authorityConsumptionEvent": {
    "event": "FIRST_COMPLETE_PRODUCTION_GOVERNED_SOURCE_BYTE_READ_RETURN",
    "preconditions": [
      "DURABLE_ACQUIRED_UNCONSUMED_EVENT",
      "LAUNCH_IDENTITY_PASS",
      "INSTRUMENT_IDENTITY_PASS",
      "REPOSITORY_IDENTITY_PASS"
    ],
    "immediateNextAction": "APPEND_AND_FSYNC_CONSUMED_BEFORE_IDENTITY_COMPARISON_OR_SECOND_SOURCE_READ",
    "failedIncompleteRead": "CLOSED_PRE_CONSUMPTION_FAILURE",
    "completeRead": true,
    "consumesAuthority": true
  },
  "failureAndStopSemantics": {
    "failureCodes": [
      "AMBIGUOUS_TERMINAL_CLASS",
      "AUTHORITY_ALREADY_USED_OR_STATE_UNAVAILABLE",
      "AUTHORITY_STATE_APPEND_FAILURE",
      "CAPTURE_IDENTITY_MISMATCH",
      "CAPTURE_REREAD_FAILURE",
      "CAPTURE_SCHEMA_FAILURE",
      "CAPTURE_WRITE_FAILURE",
      "COUNT_MISMATCH",
      "IMPORT_ALLOWLIST_MISMATCH",
      "INSTRUMENT_IDENTITY_MISMATCH",
      "MANIFEST_RECOMPUTATION_MISMATCH",
      "MANIFEST_TOO_LARGE",
      "NODE_LEDGER_INCOMPLETE",
      "PARSER_DIAGNOSTIC",
      "PROHIBITED_FINDING",
      "PUBLIC_API_MISMATCH",
      "RECORD_DUPLICATE",
      "RECORD_MISSING",
      "REPOSITORY_IDENTITY_MISMATCH",
      "SOURCE_IDENTITY_MISMATCH",
      "TYPE_NORMALIZATION_UNKNOWN",
      "UNKNOWN_EXECUTABLE_EDGE"
    ],
    "failureSchema": "{code:FailureCode,role:SourceRole|null,nodeId:uint|null,recordId:recordId|null,detailSha256:hex64}",
    "detailProhibited": [
      "ABSOLUTE_PATH",
      "ERROR_OBJECT",
      "MACHINE_IDENTIFIER",
      "RESPONSE_CONTENT",
      "SOURCE_TEXT",
      "STACK_TRACE"
    ],
    "everyFailure": [
      "RECORD_WHERE_AVAILABLE",
      "CLOSE_STATE_WHERE_POSSIBLE",
      "STOP"
    ],
    "retryCount": 0,
    "repairCount": 0,
    "fallbackCount": 0,
    "alternatePathCount": 0,
    "appendFailureStillClosesByTokenExistence": true
  },
  "cardinality": {
    "governedSourceRoles": 2,
    "sourceReadsPerRole": 1,
    "sourceParsesPerRole": 1,
    "sourceTraversalsPerRole": 1,
    "enumerationCaptures": 2,
    "combinedDecisionCaptures": 1,
    "boundedManifests": 1,
    "oneUseAcquisitions": 1,
    "authorityConsumptionsMaximum": 1,
    "retries": 0,
    "fallbacks": 0,
    "check5ExecutionsUnderCandidateAuthority": 0,
    "check6Executions": 0,
    "acceptanceActions": 0,
    "semanticConsequences": 0
  },
  "passConsequences": {
    "recordDecision": "PASS",
    "appendOneUseState": "CLOSED_PASS",
    "stop": true,
    "check6": false,
    "acceptance": false,
    "freeze": false,
    "semanticConsequence": false,
    "programmeConsequence": false,
    "contribution": false,
    "delivery": false,
    "retry": false,
    "feedback": false,
    "action": false
  },
  "prohibitionOnCheck6AcceptanceSemanticConsequence": {
    "check6": "PROHIBITED",
    "acceptance": "PROHIBITED",
    "freeze": "PROHIBITED",
    "authoritativeForExecution": false,
    "checkerPermissionResult": false,
    "semanticInspection": false,
    "memory": false,
    "learning": false,
    "reflection": false,
    "knowledge": false,
    "retrieval": false,
    "contribution": false,
    "delivery": false,
    "feedback": false,
    "action": false,
    "mandatoryStopAfterCandidateAuthoring": true,
    "nextSeparatelyGovernedGate": "HH-0000 CHECK 5 TERMINAL CANONICAL POLICY CLOSURE REVIEW"
  }
}
```

HH_CHECK_5_POLICY_PAYLOAD_END

## 4. Candidate-Local Construction Boundary

POLICY-4 mechanically preserves the complete POLICY-3 payload except for the new schema identifier, the addition of `NAMESPACE` to `IMPORT_DECLARATION.importKind`, and the directly dependent `NamespaceImport => importKind=NAMESPACE` consistency rule. POLICY-3 remains byte-for-byte unchanged historical governed Evidence.

This candidate remains `CANDIDATE`. Its identity does not establish corrected canonical-policy closure, namespace binding ownership, instrument Authority, Check 5 Authority, Check 6 Authority, freeze, or acceptance.

## 5. Authority Stop

Candidate construction and immediate validation stop here. No closure review is begun or authorised by this action.
