import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSite = createAsyncThunk("site/fetch", async (id) => {
  const res = await axios.get(`/api/site/${id}`);
  return res.data;
});

const initialState = {
  siteInfo: null,
  alarmSummary: { down: 0, critical: 0, major: 0, minor: 0 },
  mode: "Grid Following",
  energyStats: { dates: [], solar: [], grid: [] },
  loading: false,
  error: null,
};

const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: {
    setMode(state, action) { state.mode = action.payload; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSite.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchSite.fulfilled, (s, a) => {
        s.loading = false;
        s.siteInfo = a.payload.siteInfo;
        s.alarmSummary = a.payload.alarmSummary;
        s.mode = a.payload.mode;
        s.energyStats = a.payload.energyStats;
      })
      .addCase(fetchSite.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message;
      });
  }
});

export const { setMode } = siteSlice.actions;
export default siteSlice.reducer;
