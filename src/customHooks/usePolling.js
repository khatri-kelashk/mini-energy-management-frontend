import { useRef, useState, useCallback } from "react";

/**
 * usePolling(apiFn, intervalMs)
 * - apiFn must be an async function that performs fetching and state updates
 * - exposes startPolling, stopPolling, isPolling
 *
 * Important: stopPolling clears interval immediately to prevent further calls.
 */
export default function usePolling(apiFn, intervalMs = 60000) {
  const intervalRef = useRef(null);
  const [isPolling, setIsPolling] = useState(false);

  const startPolling = useCallback(async () => {
    if (intervalRef.current) return;
    setIsPolling(true);

    // call once immediately
    try { await apiFn(); } catch (e) { /* swallow - apiFn should handle errors */ }

    intervalRef.current = setInterval(async () => {
      try { await apiFn(); } catch (e) { /* swallow */ }
    }, intervalMs);
  }, [apiFn, intervalMs]);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPolling(false);
  }, []);

  return { startPolling, stopPolling, isPolling };
}
