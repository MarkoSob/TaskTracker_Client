import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://markotasktracker.azurewebsites.net/Image/';

class ImageService {
    async getImagePath(email) {
        let result = await axios.get(API_URL + "?email=" + email, {headers: authHeader()});
        console.log(result);

        return result;
    }

    create(title, startDate, endDate, status, priority, userEmail) {
        return axios.post(API_URL + "createtask", {
            Title: title,
            Startdate: startDate,
            Enddate: endDate,
            Status: status,
            Priority: priority,
            Useremail: userEmail
        }, {headers: authHeader()});
    }
}

export default new ImageService();