import { createSlice, current } from "@reduxjs/toolkit";

const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
  },
  reducers: {
    addCountriesData: (state, action) => {
      state.countries.push(action.payload);
    },
    clearData: (state, action) => {
      return { countries: [] };
    },
  },
});

export const { addCountriesData , clearData } = countriesSlice.actions;

export default countriesSlice.reducer;