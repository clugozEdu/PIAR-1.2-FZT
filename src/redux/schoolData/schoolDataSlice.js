import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApiData } from "../../api/appScript.js";
import { baseUrl } from "../../api/urls.js";

// Action async to fetch schools
export const fetchSchools = createAsyncThunk(
  "schoolData/fetchSchools",
  async () => {
    const response = await getApiData("getUSAssociation", baseUrl);
    return response;
  }
);

const schoolDataSlice = createSlice({
  name: "schoolData",
  initialState: {
    schools: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchools.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSchools.fulfilled, (state, action) => {
        const newMapSchool = new Map();

        action.payload.forEach((school) => {
          if (!newMapSchool.has(school.id_school)) {
            newMapSchool.set(school.id_school, {
              id_school: school.id_school,
              school_name: `${school.code_school} - ${school.country} -  ${school.school_name} - ${school.department} - ${school.municipality}`,
              school_department: school.id_department,
              school_municipality: school.id_municipality,
              school_type: school.school_type,
              school_country: school.id_country,
              school_dependency: school.dependency,
              docents: [],
            });
          }
        });

        action.payload.forEach((user) => {
          if (newMapSchool.has(user.id_school)) {
            const school = newMapSchool.get(user.id_school);

            school.docents.push({
              id: user.id_user,
              Escuela: user.school_name,
              Nombre: user.full_name,
              Grado: user.grade,
              Sección: user.section,
            });
          }
        });

        // console.log(newMapSchool.id_school);

        state.schools = Array.from(newMapSchool.values());
        state.isLoading = false;
      })
      .addCase(fetchSchools.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default schoolDataSlice.reducer;
