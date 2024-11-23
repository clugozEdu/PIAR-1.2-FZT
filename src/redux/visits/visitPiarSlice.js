import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApiData } from "../../api/appScript";
import { baseUrlVisit } from "../../api/urls";

// fetch to visits
export const fetchVisit = createAsyncThunk("visitPiar/fechVisits", async () => {
  const response = await getApiData("getVisitPiar", baseUrlVisit);
  return response;
});

// create Slice
const visitPiarSlice = createSlice({
  name: "visitPiar",
  initialState: {
    visitPiar: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVisit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVisit.fulfilled, (state, action) => {
        state.visitPiar = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchVisit.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default visitPiarSlice.reducer;
