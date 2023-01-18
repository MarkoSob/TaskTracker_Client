import axios from "axios";

const API_URL = "https://markotasktracker.azurewebsites.net/auth/";

// const defaultOptions = {
//   baseURL: <CHANGE-TO-URL  />,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// };


// instance.interceptors.request.use(function (config) {
//   const token = localStorage.getItem('user');
//   config.headers.Authorization =  token ? `Bearer ${token}` : '';
//   return config;
// });

class AuthService {
    async login(username, password) {
        return await axios.post(API_URL + "login", {
            Login: username,
            Password: password
        })
            .then(response => {
                console.log(response.data);
                if (response.data) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    localStorage.setItem("email", username)
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("email");
    }

    resetPassword(email) {
        return axios.put(API_URL + "resetpassword?email=" + email);
    }

    async register(firstname, lastname, email, password) {
        return await axios.post(API_URL + "register", {
            Firstname: firstname,
            Lastname: lastname,
            Email: email,
            Password: password
        })
            .then(response => {
                console.log(response.data);
                return response.data;
            });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
        ;
    }
}

export default new AuthService();