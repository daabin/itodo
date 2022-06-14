import axios from "axios";

const instance = axios.create({
  baseURL: 'https://rem-rest-api.herokuapp.com/api/tasks',
  timeout: 10000,
  withCredentials: true
});

instance.interceptors.response.use(response => {
    return response.data
}, error => {
    return Promise.reject(error)
})


export default instance