import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAlarms = createAsyncThunk(
  "alarms/fetch",
  async ({ search } = {}) => {
    const params = {};
    if (search) params.search = search;
    const res = await axios.get("/api/alarms", { params });
    // expects array of alarm objects
    return res.data;
  }
);

const initialState = {
  alarms: [],
  filteredAlarms: [],
  favorites: [],
  loading: false,
  error: null,
  favoritesOnly: false,
};

const alarmSlice = createSlice({
  name: "alarms",
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((f) => f !== id);
      } else {
        state.favorites.push(id);
      }
      // update filtered view if needed
      if (state.favoritesOnly) {
        state.filteredAlarms = state.alarms.filter((a) => state.favorites.includes(a.id));
      }
    },
    setFavoritesOnly(state, action) {
      state.favoritesOnly = action.payload;
      if (state.favoritesOnly) {
        state.filteredAlarms = state.alarms.filter((a) => state.favorites.includes(a.id));
      } else {
        state.filteredAlarms = state.alarms;
      }
    },
    setFilteredAlarms(state, action) {
      state.filteredAlarms = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlarms.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchAlarms.fulfilled, (s, a) => {
        s.loading = false;
        s.alarms = a.payload;
        s.filteredAlarms = a.payload;
      })
      .addCase(fetchAlarms.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message;
      });
  },
});

export const { toggleFavorite, setFavoritesOnly, setFilteredAlarms } = alarmSlice.actions;
export default alarmSlice.reducer;
