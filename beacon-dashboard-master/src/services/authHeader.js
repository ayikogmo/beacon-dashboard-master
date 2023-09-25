

// RETRIEVING DATA

// export default function authHeader() {
//     const user = JSON.parse(localStorage.getItem('user'));

//     // Check if user has JWT
//     if (user && user.accessToken) {
//         return {  "content-type": "application/json", 'x-access-token': user.accessToken}
//     } else {
//         return {}
//     }
// }   

export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
console.log("USSERRR", user)
  if (user && user.token) {
    console.log("USSERRR", user)
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
}



// AUTHORIZATION HEADER
// export default function authHeader() {
//   const user = JSON.parse(localStorage.getItem('user'));

//   if (user && user.token) {
//     return {'x-access-token': user.token };
//   } else {
//     return {};
//   }
// }