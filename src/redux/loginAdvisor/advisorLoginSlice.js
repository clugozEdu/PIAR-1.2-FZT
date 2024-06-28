import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApiData } from "../../api/appScript.js";

// Acción async para obtener los datos de los asesores
export const fetchAdvisors = createAsyncThunk(
  "advisorData/fetchAdvisors",
  async (email_user, { rejectWithValue }) => {
    try {
      const response = await getApiData(
        `getAccess&email_user=${email_user}&view_id=1`
      );

      // Guardar token en localStorage solo si la respuesta es exitosa
      if (response.permission) {
        const expirationTime = new Date().getTime() + 7200000;
        const dataWithExpiration = { ...response, expirationTime };
        localStorage.setItem(
          "advisorToken",
          JSON.stringify(dataWithExpiration)
        );
        return dataWithExpiration;
      } else {
        throw new Error("Usuario sin acceso");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  advisor: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Función para cargar el estado inicial desde localStorage
const loadInitialState = () => {
  const storedData = localStorage.getItem("advisorToken");
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      const currentTime = new Date().getTime();

      if (
        parsedData.expirationTime &&
        parsedData.expirationTime > currentTime
      ) {
        return {
          advisor: parsedData.advisor,
          isAuthenticated: parsedData.permission,
          isLoading: false,
          error: null,
        };
      } else {
        localStorage.removeItem("advisorToken");
      }
    } catch (error) {
      return initialState;
    }
  }
  return initialState;
};

const advisorDataSlice = createSlice({
  name: "advisorData",
  initialState: loadInitialState(),
  reducers: {
    logout: (state) => {
      state.advisor = null;
      state.isAuthenticated = false;
      localStorage.removeItem("advisorToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdvisors.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAdvisors.fulfilled, (state, action) => {
        state.advisor = action.payload.advisor;
        state.isAuthenticated = action.payload.permission;
        state.isLoading = false;
      })
      .addCase(fetchAdvisors.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { logout } = advisorDataSlice.actions;

export default advisorDataSlice.reducer;
