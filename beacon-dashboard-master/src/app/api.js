// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { setCredentials, logOut } from '../slices/auth'


// const baseQuery = fetchBaseQuery({
//     baseUrl: 'http://ec2-3-6-170-142.ap-south-1.compute.amazonaws.com:20301',
//     credentials: 'include', //cookie
//     prepareHeaders: (headers, { getState}) => {
//         const token = getState().auth.token
//         if (token){
//             headers.set("authorization", `Bearer ${token}`)
//         }
//         return headers
//     }
// })


// // Wrapper Reauthentication

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//     let result = await baseQuery(args, api, extraOptions)

//     if (result?.error?.originalStatus === 403) {
//         console.log('sending refresh token')
//         //send refresh token to get new access token
//         const refreshResult = await baseQuery('/dashboard/', api, extraOptions)
//         console.log('refreshResult', refreshResult)

//         if (refreshResult?.data) {
//             const user= api.getState().auth.user
//             // store new token
//             api.dispatch(setCredentials({ ...refreshResult.data, user}))
//             // send query with new access token
//             result = await baseQuery(args, api, extraOptions)
//         } else {
//             api.dispatch(logOut())
//         }
//     }

//     return result;
// }


// export const apiSlice = createApi({
//     baseQuery: baseQueryWithReauth,
//     endpoints: builder => ({})
// })