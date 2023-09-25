
import axios from 'axios'


const LOGIN_URL = process.env.REACT_APP_API_URL


// LOGIN USER 
// save JWT to localStorage
const login = (username, password) => {
    return axios
      .post(`${LOGIN_URL}/getToken`, {
        username,
        password,
      })
      .then((response) => {
        console.log("DATTAAA", response.data)
        console.log("ACCESSTOKEN", response.data.token);
  
        if (response.data.token) {
          console.log("pumapasok");
          localStorage.setItem("user", JSON.stringify(response.data));
  
          // axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
        }
        return response.data; // Return the response data
      });
  };
  

// Logout user
const logout = () => {
    localStorage.removeItem('user')
    // remove Authorization header on logout
    delete axios.defaults.headers.common['Authorization']; 
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };



const authService = {
    login, 
    logout,
    getCurrentUser
}

export default authService;
