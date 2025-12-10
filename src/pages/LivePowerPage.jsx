import React, { useCallback } from "react";
import LivePowerChart from "../components/Power/LivePowerChart";
import { useDispatch } from "react-redux";
import { fetchPowerLive, appendPoints, startPolling as startPollingAction, stopPolling as stopPollingAction } from "../features/power/powerSlice";
import usePolling from "../customHooks/usePolling";

/**
 * Container coordinates fetching via usePolling and dispatching results into slice.
 */
export default function LivePowerPage() {
  const dispatch = useDispatch();

  const apiFn = useCallback(async () => {
    try {
      const res = await dispatch(fetchPowerLive()).unwrap();
      if (res && res.points) {
        // map points to ensure ts etc exist
        dispatch(appendPoints(res.points));
      }
    } catch (err) {
      console.error("poll error", err);
    }
  }, [dispatch]);

  const { startPolling, stopPolling, isPolling } = usePolling(apiFn, 60000);

  const onStart = () => {
    dispatch(startPollingAction());
    startPolling();
  };
  const onStop = () => {
    stopPolling();
    dispatch(stopPollingAction());
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Real-Time Power Flow</h2>
      <LivePowerChart onStart={onStart} onStop={onStop} isPolling={isPolling} />
    </div>
  );
}
