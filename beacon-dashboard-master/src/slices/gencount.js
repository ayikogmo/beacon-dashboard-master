// import React from "react";
import { createSlice } from "@reduxjs/toolkit";


export const initialState = {
  loading: false,
  hasErrors: false,
  gencount: {
    "count_10m": 4573,
    "count_20m": 4255,
    "count_30m": 2355,
    "overall": 14552,
    "change_10m": "No data",
    "change_20m": "No data",
    "change_30m": "No data",
    "change_overall": "No data",
    "text": "Since last 1 day"
  },
};

const apiUrl = process.env.REACT_APP_API_URL


const genCountSlice = createSlice({
  name: "gencount",
  initialState,
  reducers: {
    getGenCount: (state) => {
      state.loading = true;
    },
    getGenCountSuccess: (state, { payload }) => {
      state.gencount = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getGenCountFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const { getGenCount, getGenCountSuccess, getGenCountFailure } =
  genCountSlice.actions;
export const genCountSelector = (state) => state.gencount;
export default genCountSlice.reducer;

export function fetchGenCount(startdate, enddate, code) {
  return async (dispatch) => {
    dispatch(getGenCount());

    try {

      console.log( "HELLOO:" + startdate);
      console.log("HELLOO:" + enddate);

      const response = await fetch(
        `${apiUrl}/gencount`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            datetime_from: startdate,
            datetime_to: enddate,
            code: code
          }),
        }
      );
      const data = await response.json();

      console.log("gencount", data);
      dispatch(getGenCountSuccess(data));
    } catch (error) {
      dispatch(getGenCountFailure());
    }
  };
}
