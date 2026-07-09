import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type DocumentCardProps = {
  doc: any;
  onAnalyse: (docId: number) => void;
  onOpen: (doc: any) => void;
};

function formatDocDate(date?: string) {
  if (!date) return "";
  return new Date(date).toLocaleString("en-GB");
}

function getDocIcon(type?: string) {
  if (type === "cleaning") return "🧹";
  if (type === "sfbb") return "📘";
  if (type === "food_spec") return "🍽";
  if (type === "supplier_list") return "☎️";
  if (type === "invoice") return "🧾";
  if (type === "equipment_manual") return "🛠";
  return "📄";
}

export default function DocumentCard({ doc, onAnalyse, onOpen }: DocumentCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onOpen(doc)}>
      <Text style={styles.cardTitle}>
        {getDocIcon(doc.type)} {doc.title}
      </Text>

      <Text style={styles.smallText}>Type: {doc.type || "unknown"}</Text>
      <Text style={styles.smallText}>Status: {doc.status || "uploaded"}</Text>

      {doc.confidence != null ? (
        <Text style={styles.smallText}>
          Confidence: {Math.round(doc.confidence * 100)}%
        </Text>
      ) : null}

      {doc.importSummary ? (
        <Text style={styles.smallText}>{doc.importSummary}</Text>
      ) : null}

      {doc.createdAt ? (
        <Text style={styles.smallText}>Added: {formatDocDate(doc.createdAt)}</Text>
      ) : null}

      <View style={styles.buttonRow}>
        <Button title="Analyse" onPress={() => onAnalyse(doc.id)} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  smallText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  buttonRow: {
    marginTop: 8,
  },
});