import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "actions";
import { Provider } from "react-redux";
// import { setupListeners } from "@reduxjs/toolkit/query";
// IMPORT SLICES
import genCountSlice from "slices/gencount";
import dateTimeSlice from "slices/datetime";
import lineGraphSlice from "slices/linegraph";
import devManuSlice from "slices/tablegrid";
import topTenSlice from "slices/doughnut";
import activStatsSlice from "slices/activity";
import manuCountSlice from "slices/circularprogress";
import barGraphSlice from "slices/bargraph";
import manuSlice from "slices/bargraph";
import locationSlice from "slices/locations";
import authSlice from "slices/auth";
import messageSlice from "slices/message";

// import UserContext from "components/UserContext"


// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";


// REDUX STORE
const store = configureStore({
  reducer: {
    global: globalReducer,
    gencount: genCountSlice,
    datetime: dateTimeSlice,
    cntlinegraph: lineGraphSlice,
    manuperdist: devManuSlice,
    toptenman: topTenSlice,
    activitystats: activStatsSlice,
    manucount: manuCountSlice,
    cntperdistpermon: barGraphSlice,
    manufacturer:  manuSlice,
    auth: authSlice,
    message: messageSlice,
    location: locationSlice,
    // usercontext: UserContext,
  },
  devTools: true,
  // middleware: (getDefault) => getDefault().concat(rootReducer.middleware),
});
// setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>

);
