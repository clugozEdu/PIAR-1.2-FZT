import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApiData } from "../../api/appScript.js";

// Action async to fetch towns
export const fetchTowns = createAsyncThunk("townData/fetchTowns", async () => {
  const response = await getApiData("getTowns");
  return response;
});

const townDataSlice = createSlice({
  name: "townData",
  initialState: {
    towns: [],
    departments: [],
    municipalities: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTowns.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTowns.fulfilled, (state, action) => {
        // set array of departments
        state.towns = action.payload;
        state.departments = action.payload.flatMap((country) =>
          country.regions.flatMap((region) =>
            region.departments.map((department) => ({
              id_country: country.id_country,
              id_department: department.id_department,
              department_name: department.department_name,
            }))
          )
        );

        // set array for muncipalities
        state.municipalities = action.payload.flatMap((country) =>
          country.regions.flatMap((region) =>
            region.departments.flatMap((department) =>
              department.municipalities.map((municipality) => ({
                id_country: country.id_country,
                id_department: department.id_department,
                id_municipality: municipality.id_municipality,
                municipality_name: municipality.municipality_name,
              }))
            )
          )
        );

        state.isLoading = false;
      })
      .addCase(fetchTowns.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default townDataSlice.reducer;
