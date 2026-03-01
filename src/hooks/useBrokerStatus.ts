import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "optout-hub-broker-status";

export type BrokerStatus = "none" | "submitted" | "removed";

export interface StatusMap {
  [brokerId: string]: BrokerStatus;
}

function loadStatus(): StatusMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as StatusMap;
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

function saveStatus(status: StatusMap): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(status));
  } catch {
    // Ignore storage errors
  }
}

export function useBrokerStatus() {
  const [statusMap, setStatusMap] = useState<StatusMap>(loadStatus);

  useEffect(() => {
    setStatusMap(loadStatus());
  }, []);

  const setStatus = useCallback((brokerId: string, status: BrokerStatus) => {
    setStatusMap((prev) => {
      const next = { ...prev };
      if (status === "none") {
        delete next[brokerId];
      } else {
        next[brokerId] = status;
      }
      saveStatus(next);
      return next;
    });
  }, []);

  const getStatus = useCallback(
    (brokerId: string): BrokerStatus => statusMap[brokerId] ?? "none",
    [statusMap]
  );

  return { statusMap, setStatus, getStatus };
}
