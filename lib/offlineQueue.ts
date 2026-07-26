import AsyncStorage from "@react-native-async-storage/async-storage";

const QUEUE_KEY = "offlineQueue";

export type OfflineAction =
  | {
      id: string;
      type: "completeTask";
      payload: { taskId: number };
      createdAt: string;
    }
  | {
      id: string;
      type: "logTemperature";
      payload: { fridge: string; value: string; type: string };
      runtimeMeta?: {
        interactionId: string;
        userId: string;
        role: string;
        requestId: string;
        siteId: string;
        equipmentId: string;
        equipmentType: string;
        currentShift?: string;
        peopleOutcome: string;
        originalActionIntent: string;
        originalAttemptedAt: string;
        idempotencyKey: string;
        currentOperationalState: string;
      };
      createdAt: string;
    };

export async function getOfflineQueue(): Promise<OfflineAction[]> {
  const raw = await AsyncStorage.getItem(QUEUE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function addToOfflineQueue(action: OfflineAction) {
  const queue = await getOfflineQueue();
  queue.push(action);
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

export async function clearOfflineQueue() {
  await AsyncStorage.removeItem(QUEUE_KEY);
}

export async function replaceOfflineQueue(queue: OfflineAction[]) {
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

export async function getOfflineQueueCount(): Promise<number> {
  const queue = await getOfflineQueue();
  return queue.length;
}