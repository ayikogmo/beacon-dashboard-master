// import React from "react";
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  hasErrors: false,
  manuperdist: {},
};

const devManuSlice = createSlice({
  name: "manuperdist",
  initialState,
  reducers: {
    getDevManu: (state) => {
      state.loading = true;
    },
    getDevManuSuccess: (state, { payload }) => {
      state.manuperdist = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getDevManuFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

const apiUrl = process.env.REACT_APP_API_URL


export const { getDevManu, getDevManuSuccess, getDevManuFailure } =
  devManuSlice.actions;
export const devManuSelector = (state) => state.manuperdist;
export default devManuSlice.reducer;

export function fetchDevManu(startdate, enddate, code) {
  return async (dispatch) => {
    dispatch(getDevManu());

    try {

      //console.log("IN ADMIN", dateRange);
      // var datetime_f = datetime.startdate.split("T")[0].split("-")[1] + "/"
      // + datetime.startdate.split("T")[0].split("-")[2] + "/"
      // + datetime.startdate.split("T")[0].split("-")[0] + " 09:10 AM";
      // console.log("datetime_f:" + datetime_f);

      // var datetime_t = datetime.enddate.split("T")[0].split("-")[1] + "/"
      // + datetime.enddate.split("T")[0].split("-")[2] + "/"
      // + datetime.enddate.split("T")[0].split("-")[0] + " 09:15 AM";
      // console.log("datetime_t:" + datetime_t);


      const response = await fetch(
        `${apiUrl}/manuperdist`,
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
      dispatch(getDevManuSuccess(data));
    } catch (error) {
      dispatch(getDevManuFailure());
    }
  };
}
