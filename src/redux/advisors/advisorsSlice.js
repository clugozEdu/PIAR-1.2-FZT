import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApiData } from "../../api/appScript";

// action async to get data for advisors
export const fecthAdvisorsShared = createAsyncThunk(
  "advisorsShared/fecthAdvisorsShared",
  async () => {
    const response = await getApiData("getAdvisors");
    return response;
  }
);

const advisorsSharedSlice = createSlice({
  name: "advisorsShared",
  initialState: {
    advisors: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearAdvisors: (state) => {
      state.advisors = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fecthAdvisorsShared.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fecthAdvisorsShared.fulfilled, (state, action) => {
        state.advisors = action.payload;
        state.isLoading = false;
      })
      .addCase(fecthAdvisorsShared.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const { clearAdvisors } = advisorsSharedSlice.actions;
export default advisorsSharedSlice.reducer;
