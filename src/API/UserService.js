import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://markotasktracker.azurewebsites.net/user';

class UserService {
    async getUserInfo(email) {
        let result = await axios.get(API_URL + "?email=" + email, {headers: authHeader()});

        return result;
    }

    async updateUserInfo(id, firstName, lastName) {
        return await axios.put(API_URL + "/" + id, {
            FirstName: firstName,
            LastName: lastName,
        }, {headers: authHeader()});
    }
}

export default new UserService();