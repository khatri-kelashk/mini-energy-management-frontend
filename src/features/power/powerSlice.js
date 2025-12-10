import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPowerLive = createAsyncThunk(
  "power/fetchLive",
  async () => {
    const res = await axios.get("/api/power/live");
    // API returns { points: [ ...20 points ] }
    return res.data;
  }
);

const initialState = {
  currentPower: { active: 0, reactive: 0 },
  chartData: [], // array of points { ts, active, reactive }
  isPolling: false,
  loading: false,
  error: null,
};

const powerSlice = createSlice({
  name: "power",
  initialState,
  reducers: {
    startPolling(state) {
      state.isPolling = true;
    },
    stopPolling(state) {
      state.isPolling = false;
    },
    appendPoints(state, action) {
      // action.payload -> array of points (20)
      state.chartData = [...state.chartData, ...action.payload];
      // maintain rolling window of 100
      if (state.chartData.length > 100) {
        state.chartData = state.chartData.slice(state.chartData.length - 100);
      }
      const last = state.chartData[state.chartData.length - 1];
      if (last) {
        state.currentPower = { active: last.active, reactive: last.reactive };
      }
    },
    resetPower(state) {
      state.chartData = [];
      state.currentPower = { active: 0, reactive: 0 };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPowerLive.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchPowerLive.fulfilled, (s, a) => { s.loading = false; })
      .addCase(fetchPowerLive.rejected, (s, a) => { s.loading = false; s.error = a.error.message; });
  },
});

export const { startPolling, stopPolling, appendPoints, resetPower } = powerSlice.actions;
export default powerSlice.reducer;
