import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type EvidenceGalleryProps = {
  record: any;
  expanded: boolean;
  onToggle: () => void;
  onOpenPhoto: (photos: any[], index: number) => void;
  formatPhotoStage: (stage?: string) => string;
  formatPhotoDate: (date?: string) => string;
};

export default function EvidenceGallery({
  record,
  expanded,
  onToggle,
  onOpenPhoto,
  formatPhotoStage,
  formatPhotoDate,
}: EvidenceGalleryProps) {
  if (!record.photos?.length) return null;

  return (
    <View style={styles.photoEvidenceBox}>
      <TouchableOpacity onPress={onToggle}>
        <Text style={styles.linkText}>
          {expanded ? "▼" : "▶"} Photos ({record.photos.length})
        </Text>
      </TouchableOpacity>

      {expanded &&
        record.photos.map((photo: any, index: number) => (
          <View key={photo.id} style={styles.photoRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onOpenPhoto(record.photos, index)}
            >
              <Image source={{ uri: photo.fileUrl }} style={styles.photoThumbnail} />
            </TouchableOpacity>

            <View>
              <Text style={styles.photoStage}>{formatPhotoStage(photo.stage)}</Text>
              <Text style={styles.smallText}>{formatPhotoDate(photo.createdAt)}</Text>
              {photo.caption ? <Text style={styles.smallText}>{photo.caption}</Text> : null}
            </View>
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  photoEvidenceBox: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
  },
  photoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
  },
  photoThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  photoStage: {
    fontWeight: "600",
  },
  linkText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  smallText: {
    fontSize: 12,
    color: "#666",
  },
});