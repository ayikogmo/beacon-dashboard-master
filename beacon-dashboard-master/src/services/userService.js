import axios from "axios";
import authHeader from './authHeader';


// ACCESSING DATA

const API_URL  = process.env.REACT_APP_API_URL;


//  REQUESTING AUTH RESOURCE

// const getPublicContent = () => {
//    return axios.get(LOGIN_URL + 'all') 
// };

const getUser = () => {
    return axios.get(`${API_URL}/getToken`, { headers: authHeader()});
}





const UserService = {
    getUser
}

export default UserService;