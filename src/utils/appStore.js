import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";

const appStore = configureStore({
  reducer: {
    countries: countriesReducer,
  },
});

export default appStore;