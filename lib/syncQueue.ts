import axios from "axios";
import { getOfflineQueue, replaceOfflineQueue } from "./offlineQueue";
import { getStoredItem } from "./storage";
import { setSyncStatus } from "./syncStatus";

const API = "https://kitchen-daily-checks-backend.up.railway.app";

export async function syncOfflineQueue() {
  const token = await getStoredItem("token");

  if (!token) {
    setSyncStatus("error");
    return { synced: 0, remaining: 0 };
  }

  const headers = { Authorization: `Bearer ${token}` };
  const queue = await getOfflineQueue();

  if (queue.length === 0) {
    setSyncStatus("synced");
    return { synced: 0, remaining: 0 };
  }

  setSyncStatus("syncing");

  const remaining = [];
  let synced = 0;

  for (const action of queue) {
    try {
      if (action.type === "completeTask") {
        const res = await axios.post(
          `${API}/tasks/${action.payload.taskId}/complete`,
          {},
          { headers }
        );

        if (res.data?.success) {
          synced += 1;
          continue;
        }
      }

      if (action.type === "logTemperature") {
        const res = await axios.post(`${API}/temperatures`, action.payload, {
          headers,
        });

        if (res.data?.success || res.data?.duplicate) {
          synced += 1;
          continue;
        }
      }

      remaining.push(action);
    } catch (error: any) {
      const status = error?.response?.status;

      // Safe conflict cases
      if (action.type === "completeTask" && status === 404) {
        // task missing/reassigned/deleted: keep it pending for review
        remaining.push(action);
        continue;
      }

      if (action.type === "logTemperature" && status === 400) {
        remaining.push(action);
        continue;
      }

      remaining.push(action);
    }
  }

  await replaceOfflineQueue(remaining);

  if (remaining.length === 0) {
    setSyncStatus("synced");
  } else {
    setSyncStatus("pending");
  }

  return { synced, remaining: remaining.length };
}