import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { runAnnieFirstWorkingDay } from "../../lib/annie/firstDay";

export default function AnnieFirstWorkingDayScreen() {
  const day = runAnnieFirstWorkingDay();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text style={{ fontSize: 34, fontWeight: "700" }}>
          Annie’s First Working Day
        </Text>

        <Text style={{ fontSize: 20, lineHeight: 32, marginTop: 24 }}>
          Good morning.
        </Text>

        <Text style={{ fontSize: 20, lineHeight: 32, marginTop: 12 }}>
          I&apos;m Annie.
        </Text>

        <Text style={{ fontSize: 20, lineHeight: 32, marginTop: 12 }}>
          Thank you for inviting me to join your team.
        </Text>

        <Text style={{ fontSize: 20, lineHeight: 32, marginTop: 12 }}>
          Would you show me your venue?
        </Text>

        <Text
          style={{ fontSize: 18, lineHeight: 30, marginTop: 8, color: "#666" }}
        >
          I&apos;d love to start learning how you work.
        </Text>

        <Section title="Here's what I think I can see...">
          {day.observations.map((item) => (
            <Text key={item.id} style={styles.text}>
              {item.description}
            </Text>
          ))}
        </Section>

        <Section title="Could you help me understand a couple of things?">
          {day.questions.map((item) => (
            <Text key={item.observationId} style={styles.text}>
              {item.question}
            </Text>
          ))}
        </Section>

        <Section title="Here's how I think I can already help...">
          {day.opportunities.map((item) => (
            <Text key={item.id} style={styles.text}>
              {item.description} Would you like me to do that?
            </Text>
          ))}
        </Section>

        {day.completedWork.tablePlan && (
          <Section title="Here's my first contribution">
            <Text style={styles.text}>
              I’ve created your first table plan with{" "}
              {day.completedWork.tablePlan.totalCovers} covers.
            </Text>
          </Section>
        )}

        <Text style={{ fontSize: 18, lineHeight: 28, marginTop: 28 }}>
          {day.closing}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={{ marginTop: 32 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 14 }}>
        {title}
      </Text>
      <View style={{ gap: 12 }}>{children}</View>
    </View>
  );
}

const styles = {
  text: {
    fontSize: 18,
    lineHeight: 28,
  },
};