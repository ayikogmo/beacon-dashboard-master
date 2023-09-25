// import React from "react";
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  hasErrors: false,
  toptenman: {},
};

const apiUrl = process.env.REACT_APP_API_URL


const topTenSlice = createSlice({
  name: "toptenman",
  initialState,
  reducers: {
    getTopTen: (state) => {
      state.loading = true;
    },
    getTopTenSuccess: (state, { payload }) => {
      state.toptenman = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getTopTenFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const { getTopTen, getTopTenSuccess, getTopTenFailure } =
topTenSlice.actions;
export const topTenSelector = (state) => state.toptenman;
export default topTenSlice.reducer;

export function fetchTopTen(startdate, enddate, code) {
  return async (dispatch) => {
    dispatch(getTopTen());

    try {

      //console.log("IN ADMIN", dateRange);
      // console.log(datetime.startdate);
      // var temp_f = new Date(datetime.startdate);
      // temp_f.setSeconds(0);
      // var datetime_f = temp_f.toLocaleString('en-US', { timeZone: 'Asia/Manila' }).replace(",", "")
      // console.log("datetime_f:" + datetime_f);
 
      // console.log(datetime.enddate);
      // var temp_t = new Date(datetime.enddate);
      // temp_t.setSeconds(0);
      // var datetime_t = temp_t.toLocaleString('en-US', { timeZone: 'Asia/Manila' }).replace(",", "")
      
      // console.log("datetime_t:" + datetime_t);
 


      const response = await fetch(
        `${apiUrl}/toptenman`,
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

      console.log(data);
      dispatch(getTopTenSuccess(data));
    } catch (error) {
      dispatch(getTopTenFailure());
    }
  };
}
