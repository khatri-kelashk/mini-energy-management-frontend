import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// simulate async ticket submission
export const submitTicket = createAsyncThunk(
  "maintenance/submit",
  async (ticketData, { rejectWithValue }) => {
    // simulate API delay and success/failure
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // simulate random failure 10% of time
        if (Math.random() < 0.1) {
          rejectWithValue({ message: "Submission failed" });
          return reject(new Error("Submission failed"));
        }
        resolve({ ...ticketData, id: Date.now() });
      }, 1000);
    });
  }
);

const initialState = {
  tickets: [],
  submitting: false,
  lastSubmitted: null,
  error: null,
};

const maintenanceSlice = createSlice({
  name: "maintenance",
  initialState,
  reducers: {
    clearLast(state) { state.lastSubmitted = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitTicket.pending, (s) => { s.submitting = true; s.error = null; })
      .addCase(submitTicket.fulfilled, (s, a) => {
        s.submitting = false;
        s.tickets.push(a.payload);
        s.lastSubmitted = a.payload;
      })
      .addCase(submitTicket.rejected, (s, a) => {
        s.submitting = false;
        s.error = a.payload || a.error?.message || "Submission Failed";
      });
  }
});

export const { clearLast } = maintenanceSlice.actions;
export default maintenanceSlice.reducer;
