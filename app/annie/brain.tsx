import { ScrollView, View } from "react-native";
import { ThemedText } from "../../components/themed-text";
import { ThemedView } from "../../components/themed-view";
import { think } from "../../lib/annie/brain";

export default function AnnieBrainScreen() {
  const result = think();

  return (
    <ScrollView>
      <ThemedView style={{ padding: 20, gap: 18 }}>

        <ThemedText type="title">
          Annie&apos;s Brain
        </ThemedText>

        <ThemedText>
          This is Annie&apos;s complete Companion Intelligence cycle.
        </ThemedText>

        <View>
          <ThemedText type="subtitle">Decision</ThemedText>
          <ThemedText>{result.decision}</ThemedText>
        </View>

        <View>
          <ThemedText type="subtitle">Observations</ThemedText>

          {result.observations.observations.map((item) => (
            <ThemedText key={item.id}>
              • {item.description}
            </ThemedText>
          ))}
        </View>

        <View>
          <ThemedText type="subtitle">Opportunities</ThemedText>

          {result.opportunities.map((item) => (
            <ThemedText key={item.id}>
              • {item.title}
            </ThemedText>
          ))}
        </View>

        <View>
          <ThemedText type="subtitle">Reflection</ThemedText>

          <ThemedText>
            {result.reflection.lesson}
          </ThemedText>

          <ThemedText>
            Tomorrow: {result.reflection.improveTomorrow}
          </ThemedText>
        </View>

      </ThemedView>
    </ScrollView>
  );
}