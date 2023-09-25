import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  datetime: {}
}

const dateTimeSlice = createSlice({
  name: "datetime",
  initialState,
  reducers: {
    updateDateTime: (state, { payload }) => {
      console.log(payload);
      state.datetime = payload
    }
  }
});

export const { updateDateTime } =  dateTimeSlice.actions;
export const dateTimeSelector = (state) => state.datetime;
export default dateTimeSlice.reducer


export function fetchDateTime(newDateTime) {
  return async dispatch => {
    dispatch(updateDateTime(newDateTime))
  }
}