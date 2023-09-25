import { createSlice } from '@reduxjs/toolkit';


// // Update message state when message action is dispatched
const initialState = {};

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessage: (state, action) => {
            return {message: action.payload};
        },
        clearMessage: () => {
            return { message: " "};
        },
    },
});


const { reducer, actions } = messageSlice;

export const { setMessage, clearMessage } = actions
export default reducer;