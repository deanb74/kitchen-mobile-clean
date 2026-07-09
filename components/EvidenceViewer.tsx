import { Button, Image, Modal, StyleSheet, Text, View } from "react-native";

type EvidenceViewerProps = {
  visible: boolean;
  photos: any[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onClose: () => void;
  formatPhotoStage: (stage?: string) => string;
  formatPhotoDate: (date?: string) => string;
};

export default function EvidenceViewer({
  visible,
  photos,
  currentIndex,
  onPrevious,
  onNext,
  onClose,
  formatPhotoStage,
  formatPhotoDate,
}: EvidenceViewerProps) {
  const selectedPhoto = photos?.[currentIndex];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.photoModalOverlay}>
        <View style={styles.photoModalCard}>
          {selectedPhoto && (
            <>
              <Text style={styles.photoModalTitle}>
                {formatPhotoStage(selectedPhoto.stage)}
              </Text>

              <Text style={styles.smallText}>
                {formatPhotoDate(selectedPhoto.createdAt)}
              </Text>

              <Image
                source={{ uri: selectedPhoto.fileUrl }}
                style={styles.photoModalImage}
                resizeMode="contain"
              />

              {selectedPhoto.caption ? (
                <Text style={styles.smallText}>{selectedPhoto.caption}</Text>
              ) : null}

              {photos.length > 1 && (
                <View style={styles.photoNavRow}>
                  <Button title="← Previous" onPress={onPrevious} />

                  <Text style={styles.smallText}>
                    {currentIndex + 1} of {photos.length}
                  </Text>

                  <Button title="Next →" onPress={onNext} />
                </View>
              )}

              <Button title="Close" onPress={onClose} />
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  photoModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  photoModalCard: {
    width: "100%",
    maxHeight: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
  },

  photoModalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },

  photoModalImage: {
    width: "100%",
    height: 420,
    marginVertical: 12,
    backgroundColor: "#000",
    borderRadius: 8,
  },

  photoNavRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 8,
  },

  smallText: {
    fontSize: 12,
    color: "#666",
  },
});