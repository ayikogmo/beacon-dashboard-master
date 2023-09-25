import { createSlice } from "@reduxjs/toolkit";


export const initialState = {
    manufacturer: {}
}

const manuSlice =  createSlice({
    name: "manufacturer",
    initialState,
    reducers: {
        updateManu: (state, {payload}) => {
            console.log(payload);
            state.manufacturer = payload
        }
    }
})


export const { updateManu } = manuSlice.actions;
export const manuSelector = (state) => state.manufacturer;
export default manuSlice.reducer

export function fetchManu(newManu) {
    return async dispatch => {
        dispatch(updateManu(newManu))
    }
}