import { createSlice } from "@reduxjs/toolkit";

const apiUrl = process.env.REACT_APP_API_URL


export const initialState = {
  loading: false,
  hasErrors: false,
  cntperdistpermon: {
    m10: {
      labels: ["JAN", "FEB"],
      data: [3, 4],
    },
    m20: {
      labels: ["FEB"],
      data: [1],
    },
    m30: {
      labels: [],
      data: [2],
    },
  },
};


const barGraphSlice = createSlice({
  name: "cntperdistpermon",
  initialState,
  reducers: {
    getBarGraph: (state) => {
      state.loading = true;
    },
    getBarGraphSuccess: (state, { payload }) => {
      state.cntperdistpermon = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getBarGraphFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const { getBarGraph, getBarGraphSuccess, getBarGraphFailure } =
  barGraphSlice.actions;
export const barGraphSelector = (state) => state.cntperdistpermon;
export default barGraphSlice.reducer;

export function fetchBarGraph(manufacturer, fromDate, toDate, code) {
  return async (dispatch) => {
    dispatch(getBarGraph());

    try {
      const response = await fetch(
        `${apiUrl}/cntperdistpermon`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            manufacturer: manufacturer,
            datetime_from: fromDate,
            datetime_to: toDate,
            code: code
          }),
        }
      );
      const data = await response.json();

      console.log(data);
      dispatch(getBarGraphSuccess(data));
    } catch (error) {
      dispatch(getBarGraphFailure());
    }
  };
}
