import { ScrollView } from "react-native";
import { ThemedText } from "../../components/themed-text";
import { ThemedView } from "../../components/themed-view";
import { createEnvironmentState } from "../../lib/annie/environment";
import { createExperience } from "../../lib/annie/experience";

export default function AnnieExperienceScreen() {
  const environment = createEnvironmentState();
  const experience = createExperience(environment);

  return (
    <ScrollView>
      <ThemedView style={{ padding: 20, gap: 18 }}>
        <ThemedText type="title">Annie’s Experience</ThemedText>

        <ThemedText>{experience.greeting}</ThemedText>

        <ThemedText>{experience.understanding}</ThemedText>

        <ThemedText>{experience.nextStep}</ThemedText>
      </ThemedView>
    </ScrollView>
  );
}