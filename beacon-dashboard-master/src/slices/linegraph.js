import { createSlice } from "@reduxjs/toolkit";


export const initialState = {
    loading: false,
    hasErrors: false,
    cntlinegraph: {
      "line_10m": {
          "date": [],
          "count": [24]
      },
      "line_20m": {
          "date": [],
          "count": [30]
      },
      "line_30m": {
          "date": [],
          "count": [10]
      }
  }
};

const apiUrl = process.env.REACT_APP_API_URL


const lineGraphSlice = createSlice({
    name: "cntlinegraph",
    initialState,
    reducers: {
        getLineGraph: (state) => {
            state.loading = true;
          },
          getLineGraphSuccess: (state, { payload }) => {
            state.cntlinegraph = payload;
            state.loading = false;
            state.hasErrors = false;
          },
          getLineGraphFailure: (state) => {
            state.loading = false;
            state.hasErrors = true;
          },
    }
})

export const { getLineGraph, getLineGraphSuccess, getLineGraphFailure } = lineGraphSlice.actions;
export const lineGraphSelector = (state) => state.cntlinegraph;
export default lineGraphSlice.reducer



export function fetchLineGraph(startdate, enddate, code) {
    return async (dispatch) => {
      dispatch(getLineGraph());
  
      try {
        const response = await fetch(
          `${apiUrl}/cntlinegraph`,
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
  
        console.log("LINEDATA", data);

        dispatch(getLineGraphSuccess(data));
      } catch (error) {
        dispatch(getLineGraphFailure());
      }
    };
  }