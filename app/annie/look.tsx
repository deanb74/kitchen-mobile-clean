import { SafeAreaView, Text, View } from "react-native";
import { beginObservation } from "../../lib/annie/observation";
import { discoverOpportunitiesFromObservation } from "../../lib/annie/opportunityFromObservation";

export default function AnnieLookScreen() {
  const session = beginObservation();
  const opportunities = discoverOpportunitiesFromObservation(session);

  return (
    <SafeAreaView style={{ flex: 1, padding: 24, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 34, fontWeight: "700" }}>
        👀 Annie is looking...
      </Text>

      <Text style={{ fontSize: 18, lineHeight: 28, marginTop: 18 }}>
        I’m learning to observe before I understand.
      </Text>

      <View style={{ marginTop: 28, gap: 14 }}>
        {session.observations.map((item) => (
          <Text key={item.id} style={{ fontSize: 18, lineHeight: 28 }}>
            {item.description}
          </Text>
        ))}
      </View>

      <Text style={{ fontSize: 24, fontWeight: "700", marginTop: 32 }}>
        I’d like to understand...
      </Text>

      <View style={{ marginTop: 16, gap: 14 }}>
        {session.questions.map((item) => (
          <Text key={item.observationId} style={{ fontSize: 18, lineHeight: 28 }}>
            {item.question}
          </Text>
        ))}
      </View>

      <Text style={{ fontSize: 24, fontWeight: "700", marginTop: 32 }}>
        I may be able to help...
      </Text>

      <View style={{ marginTop: 16, gap: 14 }}>
        {opportunities.map((item) => (
          <Text key={item.id} style={{ fontSize: 18, lineHeight: 28 }}>
            {item.description} Would you like me to do that?
          </Text>
        ))}
      </View>
    </SafeAreaView>
  );
}
