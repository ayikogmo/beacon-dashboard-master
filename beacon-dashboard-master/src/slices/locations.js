import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  hasErrors: false,
  location: {
    "locations": {
      "LED": [
          {
              "location": "BGC",
              "route": "",
              "code": "3D-LED"
          }
      ],
      "Gantries": [
          {
              "location": "Buendia",
              "route": "SB",
              "code": "Gantry-0002"
          },
          {
              "location": "GUADIX",
              "route": null,
              "code": "Gantry-0003"
          },
          {
              "location": "MEGAMALL",
              "route": "",
              "code": "Gantry-0004"
          },
          {
              "location": "Buendia",
              "route": "NB",
              "code": "Gantry-0012"
          }
      ]
  }
  },
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
      getLocations: (state) => {
        state.loading = true;
      },
      getLocationsSuccess: (state, {payload} ) => {
        state.location = payload;
        state.loading = false;
        state.hasErrors = false;
      },
      getLocationsFailure: (state) => {
        state.loading = false;
        state.hasErrors = true;
      },
  },
});

const apiUrl = process.env.REACT_APP_API_URL


export const { getLocations, getLocationsSuccess, getLocationsFailure } = locationSlice.actions;
export const locationSelector = (state) => state.location;
export default locationSlice.reducer;


export function fetchLocation() {
  return async (dispatch) => {
    dispatch(getLocations());
    
    try {
      const response = await fetch(
        `${apiUrl}/location`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
  
      const data = await response.json();
      console.log("hello", data);
  
      // dispatch(getLocations(data));
      dispatch(getLocationsSuccess(data));
    } catch (error) {
      dispatch(getLocationsFailure());
    }
   
  }
}




