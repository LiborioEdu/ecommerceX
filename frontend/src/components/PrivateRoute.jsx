import { Navigate } from "react-router-dom"

export default function PrivateRoute ({ children }) {
    //Verificar se o token de acesso existe no locas storage
    const token = localStorage.getItem("access");

    // Se existe, renderiza o children
    // Se não, redireciona para login
    return token ? children : <Navigate to="/login" />;
}