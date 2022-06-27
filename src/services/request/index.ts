import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api'
    //baseURL: 'https://backpainellogin.herokuapp.com'
});

export default api;
