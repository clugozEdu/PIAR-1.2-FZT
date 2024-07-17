import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApiData } from "../../api/appScript.js";

// Action async to fetch users school
export const fetchUsersSchool = createAsyncThunk(
  "schoolData/fetchUsersSchool",
  async (id_school) => {
    const response = await getApiData(
      `getUSAssociation&id_school=${id_school}`
    );
    return response;
  }
);

const schoolUsersSlice = createSlice({
  name: "schoolUsers",
  initialState: {
    usersSchool: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    resetUsersSchool: (state) => {
      console.log("Reducer resetUsersSchool called"); // Log for debugging
      state.usersSchool = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersSchool.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsersSchool.fulfilled, (state, action) => {
        state.usersSchool = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUsersSchool.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const { resetUsersSchool } = schoolUsersSlice.actions;
export default schoolUsersSlice.reducer;
