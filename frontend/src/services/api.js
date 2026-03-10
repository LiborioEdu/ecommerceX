import axios from 'axios';

const api = axios.create({
    // URL base do seu servidor Django (verifique se a porta é a 8000)
    baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/',
});

api.interceptors.request.use(
    (config) => {
        const token =localStorage.getItem("access") // Pega o token do login
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// INTERCEPTOR DE RESPOSTA: Lidar com tokens expirados
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("Token expirado ou inválido. Redirecionando...")
            localStorage.removeItem("access");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;