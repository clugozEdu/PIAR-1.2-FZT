// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import schoolDataSlice from "./schoolData/schoolDataSlice";
// import usersSchoolSlice from "./schoolData/schoolUsersSlice";
// import townDataSlice from "./townData/townDataSlice";
import advisorLoginSlice from "./loginAdvisor/advisorLoginSlice";
import advisorsSharedSlice from "./advisors/advisorsSlice";

const store = configureStore({
  reducer: {
    schoolData: schoolDataSlice,
    // townData: townDataSlice,
    advisorData: advisorLoginSlice,
    // schoolUsers: usersSchoolSlice,
    advisorsShared: advisorsSharedSlice,
  },
});

export default store;
