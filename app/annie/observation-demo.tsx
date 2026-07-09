import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { beginObservation } from "../../lib/annie/observation";

export default function AnnieObservationDemoScreen() {
  const session = beginObservation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text style={{ fontSize: 34, fontWeight: "700", marginBottom: 24 }}>
          👀 Annie is looking...
        </Text>

        <Text style={{ fontSize: 18, lineHeight: 30, marginBottom: 24 }}>
          I’m starting to understand what I can see.
        </Text>

        <View style={{ gap: 14 }}>
          {session.observations.map((observation) => (
            <View
              key={observation.id}
              style={{
                padding: 16,
                borderRadius: 14,
                backgroundColor: "#f3f4f6",
              }}
            >
              <Text style={{ fontSize: 18, lineHeight: 28 }}>
                {observation.description}
              </Text>

              <Text style={{ marginTop: 8, color: "#6b7280" }}>
                Confidence: {Math.round(observation.confidence * 100)}%
              </Text>
            </View>
          ))}
        </View>

        <Text style={{ fontSize: 24, fontWeight: "700", marginTop: 32 }}>
          I’d like to understand...
        </Text>

        <View style={{ gap: 14, marginTop: 16 }}>
          {session.questions.map((question) => (
            <View
              key={question.observationId}
              style={{
                padding: 16,
                borderRadius: 14,
                backgroundColor: "#eef2ff",
              }}
            >
              <Text style={{ fontSize: 18, lineHeight: 28 }}>
                {question.question}
              </Text>

              <Text style={{ marginTop: 8, color: "#6b7280" }}>
                Why: {question.reason}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}