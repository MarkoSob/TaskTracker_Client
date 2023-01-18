import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://markotasktracker.azurewebsites.net/tasks/';

class TaskService {
    async getAll() {
        let result = await axios.get(API_URL, {headers: authHeader()});
        console.log(result);

        return result;
    }

    async deleteById(id) {
        return await axios.delete(API_URL + id, {headers: authHeader()});
    }

    async getAllUserTasks(email) {
        let result = await axios.get(API_URL + "usertasks?" + "email=" + email, {headers: authHeader()});
        console.log(result);

        return result;
    }

    async getById(id) {
        return await axios.get(API_URL + id, {headers: authHeader()});
    }

    async update(id, title, startDate, endDate, description, status, priority, userEmail) {
        return await axios.put(API_URL + id, {
            Title: title,
            Startdate: startDate,
            Enddate: endDate,
            Description: description,
            Status: status,
            Priority: priority,
            Useremail: userEmail
        }, {headers: authHeader()});
    }

    async create(title, startDate, endDate, description, status, priority, userEmail) {
        return await axios.post(API_URL + "createtask", {
            Title: title,
            Startdate: startDate,
            Enddate: endDate,
            Description: description,
            Status: status,
            Priority: priority,
            Useremail: userEmail
        }, {headers: authHeader()});
    }
}

export default new TaskService();