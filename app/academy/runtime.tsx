import { useEffect, useState } from "react";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import {
    AndyDigitalColleague,
    candidate0FirstReasoningJourney,
    JourneyRunner,
    MarcMentor,
    type ExaminationRunResult,
    type JourneyResult,
} from "../../lib/academy";
import { buildGovernedPrototype } from "../../platform/ci";

type Speaker = "MARC" | "ANDY" | "ACADEMY";

type ConversationEntry = {
  id: number;
  speaker: Speaker;
  text: string;
};

type JourneyStage =
  | "ready"
  | "running"
  | "complete";

const constitutionalQuestion =
  "Andy, why do you exist?";

const marc = new MarcMentor();
const andy = new AndyDigitalColleague();

const academy = new JourneyRunner({
  mentor: marc,
  learner: andy,
});

export default function AcademyRuntimeScreen() {
  const [stage, setStage] =
    useState<JourneyStage>("ready");

  const [result, setResult] =
    useState<JourneyResult | null>(null);

  const [examinationResult, setExaminationResult] =
    useState<ExaminationRunResult | null>(null);

  const [sceneStep, setSceneStep] = useState<0 | 1 | 2>(0);
  const [sceneMode, setSceneMode] = useState<"site-entry" | "exclusion-zone">("site-entry");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSceneStep((current) => {
        if (current === 2) {
          return 0;
        }
        return (current + 1) as 0 | 1 | 2;
      });
    }, 900);

    return () => clearTimeout(timer);
  }, [sceneStep]);

  const prototype = buildGovernedPrototype({
    fullInputContext: {
      role: "Kev",
      task: "enters a normal construction site",
      setting: "routine site access",
      urgency: "low",
    },
    routeDecision: {
      next: "demonstrate",
      reason: "Professional behaviour should be demonstrated first in normal practice.",
    },
    behaviourIntent: "demonstrate required PPE",
    visibleAction: "Kev puts on a hard hat and eye protection.",
    renderedPresentation: "Kev appears to put on a hard hat and eye protection.",
  });

  const status = examinationResult
    ? "Examination complete"
    : result
      ? result.assessment.passed
        ? "Validation passed"
        : "Needs mentoring"
      : "Ready";

  const conversationEntries: ConversationEntry[] =
    examinationResult
      ? [
          {
            id: 1,
            speaker: "MARC",
            text: examinationResult.question,
          },
          {
            id: 2,
            speaker: "ANDY",
            text: examinationResult.answer,
          },
        ]
      : (result?.conversation ?? []).map(
          (entry, index) => ({
            id: index + 1,
            speaker: entry.speaker,
            text: entry.text,
          }),
        );

  function resetJourney() {
    setResult(null);
    setExaminationResult(null);
    setStage("ready");
  }

  function beginJourney() {
    const journeyResult = academy.run(
      candidate0FirstReasoningJourney,
    );

    setResult(journeyResult);
    setExaminationResult(null);
    setStage("complete");
  }

  function beginExamination() {
    const exam =
      andy.runConstitutionalExamination(
        constitutionalQuestion,
      );

    setExaminationResult(exam);
    setResult(null);
    setStage("complete");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>
          Academy Runtime
        </Text>

        <Text style={styles.subtitle}>
          Candidate 0 runtime supports journey mode and
          examination mode.
        </Text>

        <View style={styles.summaryCard}>
          <Text style={styles.label}>
            Prototype scene
          </Text>

          <Text style={styles.value}>
            {sceneMode === "site-entry" ? "Kev enters the site" : "Kev approaches an exclusion zone"}
          </Text>

          <View style={styles.sceneCard}>
            {sceneMode === "site-entry" ? (
              <>
                <View style={styles.sceneStage}>
                  <Text style={styles.sceneTitle}>Outside site</Text>
                  <Text style={styles.sceneBody}>Kev approaches the boundary without PPE.</Text>
                  <View style={styles.avatarFrame}>
                    <View style={styles.avatarHead} />
                    <View style={styles.avatarTorso} />
                  </View>
                </View>

                <View style={styles.sceneStage}>
                  <Text style={styles.sceneTitle}>Site entry recognised</Text>
                  <Text style={styles.sceneBody}>A brief pause follows the context change.</Text>
                  <View style={styles.avatarFrame}>
                    <View style={styles.avatarHead} />
                    <View style={styles.avatarTorso} />
                    {sceneStep > 0 ? <View style={styles.ppeHat} /> : null}
                    {sceneStep > 0 ? <View style={styles.ppeGlasses} /> : null}
                  </View>
                </View>

                <View style={styles.sceneStage}>
                  <Text style={styles.sceneTitle}>Kev is ready to enter</Text>
                  <Text style={styles.sceneBody}>The PPE appears as a response to the new context.</Text>
                  <View style={styles.avatarFrame}>
                    <View style={styles.avatarHead} />
                    <View style={styles.avatarTorso} />
                    {sceneStep > 1 ? <View style={styles.ppeHat} /> : null}
                    {sceneStep > 1 ? <View style={styles.ppeGlasses} /> : null}
                  </View>
                </View>
              </>
            ) : (
              <>
                <View style={styles.sceneStage}>
                  <Text style={styles.sceneTitle}>Immediate risk recognised</Text>
                  <Text style={styles.sceneBody}>The context changes to danger and urgency.</Text>
                  <View style={styles.avatarFrame}>
                    <View style={styles.avatarHead} />
                    <View style={styles.avatarTorso} />
                    <View style={styles.ppeHat} />
                    <View style={styles.ppeGlasses} />
                  </View>
                </View>

                <View style={styles.sceneStage}>
                  <Text style={styles.sceneTitle}>Warning issued</Text>
                  <Text style={styles.sceneBody}>Kev warns the person immediately.</Text>
                  <View style={styles.avatarFrame}>
                    <View style={styles.avatarHead} />
                    <View style={styles.avatarTorso} />
                    <View style={styles.ppeHat} />
                    <View style={styles.ppeGlasses} />
                    <View style={styles.warningBubble} />
                  </View>
                </View>
              </>
            )}
          </View>

          <View style={styles.toggleRow}>
            <Pressable
              style={styles.toggleButton}
              onPress={() => setSceneMode("site-entry")}
            >
              <Text style={styles.toggleButtonText}>Site entry</Text>
            </Pressable>

            <Pressable
              style={styles.toggleButton}
              onPress={() => setSceneMode("exclusion-zone")}
            >
              <Text style={styles.toggleButtonText}>Exclusion zone</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.label}>
            Mentor
          </Text>

          <Text style={styles.value}>
            MARC
          </Text>

          <Text style={styles.label}>
            Learner
          </Text>

          <Text style={styles.value}>
            Andy · HH-0000
          </Text>

          <Text style={styles.label}>
            Status
          </Text>

          <Text style={styles.value}>
            {status}
          </Text>
        </View>

        {result && (
          <View style={styles.summaryCard}>
            <Text style={styles.label}>Judgement</Text>
            <Text style={styles.traceText}>
              {result.trace.judgement}
            </Text>

            <Text style={styles.label}>
              Unknowns identified
            </Text>

            {result.trace.uncertainty.unknowns.map(
              (unknown) => (
                <Text
                  key={unknown}
                  style={styles.traceText}
                >
                  • {unknown}
                </Text>
              ),
            )}
          </View>
        )}

        {examinationResult && (
          <View style={styles.summaryCard}>
            <Text style={styles.label}>
              Examination Mode
            </Text>
            <Text style={styles.value}>
              Repository-grounded reasoning
            </Text>

            <Text style={styles.label}>
              Retrieval
            </Text>
            <Text style={styles.value}>
              {examinationResult.retrievalActive
                ? "Active"
                : "Not active"}
            </Text>

            <Text style={styles.label}>
              Generated At
            </Text>
            <Text style={styles.traceText}>
              {examinationResult.generatedAt}
            </Text>
          </View>
        )}

        <View style={styles.conversation}>
          {conversationEntries.map((entry) => {
            const isMarc =
              entry.speaker === "MARC";

            const isAndy =
              entry.speaker === "ANDY";

            return (
              <View
                key={`${entry.speaker}-${entry.id}`}
                style={[
                  styles.message,
                  isMarc && styles.marcMessage,
                  isAndy && styles.andyMessage,
                  entry.speaker === "ACADEMY" &&
                    styles.academyMessage,
                ]}
              >
                <Text style={styles.speaker}>
                  {entry.speaker}
                </Text>

                <Text style={styles.messageText}>
                  {entry.text}
                </Text>
              </View>
            );
          })}
        </View>

        {examinationResult && (
          <View style={styles.summaryCard}>
            <Text style={styles.label}>
              Observable Pipeline
            </Text>

            <Text style={styles.traceText}>
              Question Received
            </Text>
            <Text style={styles.traceText}>
              Retrieved Documents
            </Text>
            <Text style={styles.traceText}>
              Context Built
            </Text>
            <Text style={styles.traceText}>
              Constitutional Reasoning
            </Text>
            <Text style={styles.traceText}>
              Generated Response
            </Text>

            <Text style={styles.label}>
              Retrieved Documents
            </Text>
            {examinationResult.retrievedDocuments.map(
              (doc) => (
                <Text
                  key={doc.id}
                  style={styles.traceText}
                >
                  • {doc.id} ({doc.score}) - {doc.title}
                </Text>
              ),
            )}

            <Text style={styles.label}>
              Context Built
            </Text>
            {examinationResult.contextSummary.map(
              (line, index) => (
                <Text
                  key={`context-${index}`}
                  style={styles.traceText}
                >
                  • {line}
                </Text>
              ),
            )}

            <Text style={styles.label}>
              Reasoning Trace
            </Text>
            {examinationResult.reasoningTrace.map(
              (line, index) => (
                <Text
                  key={`reasoning-${index}`}
                  style={styles.traceText}
                >
                  • {line}
                </Text>
              ),
            )}
          </View>
        )}

        {result && (
          <View style={styles.learningCard}>
            <Text style={styles.learningLabel}>
              Andy&apos;s Learning
            </Text>

            <Text style={styles.learningText}>
              {result.lesson}
            </Text>
          </View>
        )}

        {result && (
          <View style={styles.validationCard}>
            <Text style={styles.learningLabel}>
              Journey Validation
            </Text>

            <Text style={styles.validationText}>
              {result.assessment.passed
                ? "PASS"
                : "NEEDS MENTORING"}
            </Text>
          </View>
        )}

        <Pressable
          disabled={stage === "running"}
          style={[
            styles.button,
            stage === "running" &&
              styles.disabledButton,
          ]}
          onPress={beginJourney}
        >
          <Text style={styles.buttonText}>
            {stage === "ready"
              ? "Begin Journey Mode"
              : stage === "running"
                ? "Journey in Progress"
                : "Run Journey Mode Again"}
          </Text>
        </Pressable>

        <Pressable
          disabled={stage === "running"}
          style={[
            styles.button,
            styles.examinationButton,
            stage === "running" &&
              styles.disabledButton,
          ]}
          onPress={beginExamination}
        >
          <Text style={styles.buttonText}>
            Run Examination Mode
          </Text>
        </Pressable>

        {stage === "complete" && (
          <Pressable
            style={styles.resetButton}
            onPress={resetJourney}
          >
            <Text style={styles.resetButtonText}>
              Reset
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F2E9",
  },
  container: {
    padding: 24,
    paddingBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1F2933",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 17,
    lineHeight: 26,
    color: "#52606D",
  },
  summaryCard: {
    marginTop: 24,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  sceneCard: {
    marginTop: 12,
    gap: 16,
  },
  toggleRow: {
    marginTop: 14,
    flexDirection: "row",
    gap: 10,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#0A7CFF",
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  sceneStage: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D9E2EC",
    backgroundColor: "#F8FAFC",
  },
  sceneTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#102A43",
  },
  sceneBody: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 22,
    color: "#486581",
  },
  avatarFrame: {
    marginTop: 14,
    width: 120,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "#E4E7EB",
    position: "relative",
  },
  avatarHead: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#102A43",
    marginBottom: 4,
  },
  avatarTorso: {
    width: 52,
    height: 62,
    borderRadius: 12,
    backgroundColor: "#334E68",
  },
  ppeHat: {
    position: "absolute",
    top: 18,
    width: 56,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#243B53",
  },
  ppeGlasses: {
    position: "absolute",
    top: 46,
    width: 42,
    height: 10,
    borderRadius: 6,
    backgroundColor: "#BCCCDC",
  },
  warningBubble: {
    position: "absolute",
    top: 18,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#D64545",
  },
  label: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: "700",
    color: "#7B8794",
    textTransform: "uppercase",
  },
  value: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2933",
  },
  traceText: {
    marginTop: 6,
    fontSize: 16,
    lineHeight: 24,
    color: "#1F2933",
  },
  learningCard: {
    marginTop: 24,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  learningLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#66788A",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  learningText: {
    fontSize: 18,
    lineHeight: 28,
    color: "#1F2933",
  },
  validationCard: {
    marginTop: 16,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  validationText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2933",
  },
  conversation: {
    marginTop: 24,
    gap: 14,
  },
  message: {
    maxWidth: "88%",
    padding: 16,
    borderRadius: 16,
  },
  marcMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  andyMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCE9FF",
  },
  academyMessage: {
    alignSelf: "stretch",
    maxWidth: "100%",
    backgroundColor: "#E6E0D2",
  },
  speaker: {
    marginBottom: 6,
    fontSize: 12,
    fontWeight: "700",
    color: "#66788A",
  },
  messageText: {
    fontSize: 17,
    lineHeight: 26,
    color: "#1F2933",
  },
  button: {
    marginTop: 32,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#0A7CFF",
  },
  disabledButton: {
    backgroundColor: "#9AA5B1",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  examinationButton: {
    backgroundColor: "#0F766E",
    marginTop: 12,
  },
  resetButton: {
    marginTop: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  resetButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#52606D",
  },
});