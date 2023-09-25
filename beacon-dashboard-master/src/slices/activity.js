// import React from "react";
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  hasErrors: false,
  activitystats: [],
};

const apiUrl = process.env.REACT_APP_API_URL

const activStatsSlice = createSlice({
  name: "activitystats",
  initialState,
  reducers: {
    getActivStats: (state) => {
      state.loading = true;
    },
    getActivStatsSuccess: (state, { payload }) => {
      state.activitystats = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getActivStatsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const { getActivStats, getActivStatsSuccess, getActivStatsFailure } =
  activStatsSlice.actions;
export const activStatsSelector = (state) => state.activitystats;
export default activStatsSlice.reducer;

export function fetchActivStats(manufacturer, code) {
  return async (dispatch) => {
    dispatch(getActivStats());

    try {
      const response = await fetch(
        `${apiUrl}/activitystats`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            manufacturer: manufacturer,
            code: code
            // datetime_from: fromDate,
            // datetime_to: toDate,
          }),
        }
      );
      const data = await response.json();

      console.log("activity", data);
      dispatch(getActivStatsSuccess(data));
    } catch (error) {
      dispatch(getActivStatsFailure());
    }
  };
}
