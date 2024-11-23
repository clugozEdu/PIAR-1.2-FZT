// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import schoolDataSlice from "./schoolData/schoolDataSlice";
// import usersSchoolSlice from "./schoolData/schoolUsersSlice";
import visitPiarSlice from "./visits/visitPiarSlice";
import advisorLoginSlice from "./loginAdvisor/advisorLoginSlice";
import advisorsSharedSlice from "./advisors/advisorsSlice";

const store = configureStore({
  reducer: {
    schoolData: schoolDataSlice,
    advisorData: advisorLoginSlice,
    advisorsShared: advisorsSharedSlice,
    visitsPiar: visitPiarSlice,
  },
});

export default store;
