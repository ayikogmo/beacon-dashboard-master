import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  hasErrors: false,
  manucount: {},
};

const apiUrl = process.env.REACT_APP_API_URL


const manuCountSlice = createSlice({
  name: "manucount",
  initialState,
  reducers: {
    getManuCount: (state) => {
      state.loading = true;
    },
    getManuCountSuccess: (state, { payload }) => {
      state.manucount = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getManuCountFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const { getManuCount, getManuCountSuccess, getManuCountFailure } =
  manuCountSlice.actions;
export const manuCountSelector = (state) => state.manucount;
export default manuCountSlice.reducer;

export function fetchManuCount(manufacturer, fromDate, toDate, code) {
  return async (dispatch) => {
    dispatch(getManuCount());

    try {
      const response = await fetch(
        `${apiUrl}/manucount`,
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
            code: code,
          }),
        }
      );
      const data = await response.json();

      console.log("manucount", data);
      dispatch(getManuCountSuccess(data));
    } catch (error) {
      dispatch(getManuCountFailure());
    }
  };
}
