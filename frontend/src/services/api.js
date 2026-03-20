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
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refresh = localStorage.getItem("refresh");
                if (refresh) {
                    const res = await axios.post(`${api.defaults.baseURL}token/refresh/`, { refresh });
                    if (res.data.access) {
                        localStorage.setItem("access", res.data.access);
                        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
                        return api(originalRequest);
                    }
                }
            } catch {
                console.warn("Refresh token expirado. Redirecionando...");
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;