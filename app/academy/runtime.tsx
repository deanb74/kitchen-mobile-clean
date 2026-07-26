import { useState } from "react";
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
  firstUncertaintyJourney,
  JourneyRunner,
  MarcMentor,
  type JourneyResult,
} from "../../lib/academy";

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

  const status = result
    ? result.assessment.passed
      ? "Validation passed"
      : "Needs mentoring"
    : "Ready";

  function resetJourney() {
    setResult(null);
    setStage("ready");
  }

  function beginJourney() {
    const journeyResult = academy.run(
      firstUncertaintyJourney,
    );

    setResult(journeyResult);
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
          MARC and Andy's first executable
          learning experience.
        </Text>

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

        <View style={styles.conversation}>
          {(result?.conversation ?? []).map(
            (entry, index) => {
            const isMarc =
              entry.speaker === "MARC";

            const isAndy =
              entry.speaker === "ANDY";

            return (
              <View
                key={`${entry.speaker}-${index}`}
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
              ? "Begin Journey"
              : stage === "running"
                ? "Journey in Progress"
                : "Run Journey Again"}
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