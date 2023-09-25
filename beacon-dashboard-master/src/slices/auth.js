
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService  from '../services/authService';
import { setMessage } from "./message";


const user = JSON.parse(localStorage.getItem("user"));
console.log("USEERRSDFSF", user)



// LOGIN
export const login = createAsyncThunk('auth/login', async({ username, password }, thunkAPI) => {
    try {
        const data = await authService.login(username, password);
        console.log("USERRR", data)
         return { user: data };
    } catch (error) {
        const message = 
            (error.response &&
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString();
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue();
    }
});


// LOGOUT createAsyncThunk
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
    console.log("LOGOUT")
})


const initialState = user 
  ? {isLoggedIn: true, user}
  : {isLoggedIn: false, user: null};


  const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
      [login.fulfilled]: (state, action) => {
        //console.log("IN???")
        state.isLoggedIn = true;
        state.user = action.payload.user;
        ////return {
        ////  ...state,
        ////  isLoggedIn: true,
        ////  user: action.payload.user,
        ////};
      },
      [login.rejected]: (state) => {
        state.isLoggedIn = false;
        state.user = null;
        ////return {
        ////  ...state,
        ////  isLoggedIn: false,
        ////  user: null,
        ////};
      },
      [logout.fulfilled]: (state) => {
        state.isLoggedIn = false;
        state.user = null;
        ////return {
        ////  ...state,
        ////  isLoggedIn: false,
        ////  user: null,
        ////};
      },
    },
  });
  
  const { reducer } = authSlice;
  export default reducer;
  


// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//       [login.fulfilled]: (state, action) => {
//         state.isLoggedIn = true;
//         state.user = action.payload.user;
//         // localStorage.setItem("isLoggedIn", true);
//         // localStorage.setItem("user", JSON.stringify(action.payload.user));
//       },
//       [login.rejected]: (state, action) => {
//         state.isLoggedIn = false;
//         state.user = null;
//         // localStorage.setItem("isLoggedIn", false);
//         // localStorage.removeItem("user");
//       },
//       [logout.fulfilled]: (state, action) => {
//         state.isLoggedIn = false;
//         state.user = null;
//         // localStorage.setItem("isLoggedIn", false);
//         // localStorage.removeItem("user");
//       },
//     },
//   });


// const { reducer } = authSlice;
// export default reducer;

