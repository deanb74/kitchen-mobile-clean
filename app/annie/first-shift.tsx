import { router } from "expo-router";
import { Pressable, ScrollView, Text } from "react-native";
import { ThemedText } from "../../components/themed-text";
import { ThemedView } from "../../components/themed-view";

import { think } from "../../lib/annie/brain";
import { createEnvironmentState } from "../../lib/annie/environment";
import { createExperience } from "../../lib/annie/experience";
import { askAnnieWithCompanionRoot } from "../../lib/annie/platform/useCompanionLoop";

export default function AnnieFirstShift() {
  const environment = createEnvironmentState();

  const experience = createExperience(environment);

  const brain = think();

  const companionRoot = askAnnieWithCompanionRoot(
    "Annie, can you help me understand my GP?"
  );

  const companionRootResponse =
    companionRoot.communication.message;

  return (
    <ScrollView>
      <ThemedView style={{ padding: 20, gap: 20 }}>

        <ThemedText type="title">
          HH-0001 • First Shift
        </ThemedText>

        <ThemedText>
          {experience.greeting}
        </ThemedText>

        <ThemedText>
          I'm Annie.
        </ThemedText>

        <ThemedText>
          Thank you for welcoming me to your team.
        </ThemedText>

        <ThemedText>
          I'd love to understand your venue so I can become a useful colleague.
        </ThemedText>

        <ThemedText type="subtitle">
          What I understand so far
        </ThemedText>

        <ThemedText>
          {experience.understanding}
        </ThemedText>

        <ThemedText type="subtitle">
          My next step
        </ThemedText>

        <ThemedText>
          {experience.nextStep}
        </ThemedText>

        <ThemedText type="subtitle">
          My decision
        </ThemedText>

        <ThemedText>
          {brain.decision}
        </ThemedText>

        <ThemedText type="subtitle">
          Today's reflection
        </ThemedText>

        <ThemedText>
          {brain.reflection.lesson}
        </ThemedText>

        <ThemedText type="subtitle">
          Annie
        </ThemedText>

        <ThemedText>
          {companionRootResponse}
        </ThemedText>

        <Pressable
          style={{
            marginTop: 32,
            backgroundColor: "#0A7CFF",
            paddingVertical: 18,
            borderRadius: 12,
            alignItems: "center",
          }}
          onPress={() => router.push("/academy")}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            Enter Helping Hand Academy
          </Text>
        </Pressable>

      </ThemedView>
    </ScrollView>
  );
}