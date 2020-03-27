import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.11:3333' // Esse 3333 é a porta do back-end
});

export default api;