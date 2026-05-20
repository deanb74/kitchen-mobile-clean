type SyncState = "idle" | "syncing" | "synced" | "pending" | "error";

let currentStatus: SyncState = "idle";
let listeners: Array<(status: SyncState) => void> = [];

export function getSyncStatus() {
  return currentStatus;
}

export function setSyncStatus(status: SyncState) {
  currentStatus = status;
  listeners.forEach((listener) => listener(status));
}

export function subscribeToSyncStatus(listener: (status: SyncState) => void) {
  listeners.push(listener);

  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}