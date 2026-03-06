import axios from 'axios';

const api = axios.create({
    // URL base do seu servidor Django (verifique se a porta é a 8000)
    baseURL: 'http://127.0.0.1:8000/api/' 
});

export default api;