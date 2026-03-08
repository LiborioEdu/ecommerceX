/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        const res = await api.post("token/", { username, password });
        // Salva os tokens no localStorage
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        
        alert("Logado com sucesso!");
        navigate("/");
        } catch (err) {
        alert("Usuário ou senha incorretos.");
        }
    };

    return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Usuário"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-green-600 py-2 rounded font-bold">
            Entrar
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-400">
          Não tem conta? <Link to="/register" className="text-blue-400">Cadastre-se</Link>
        </p>
      </div>
    </div>
    );
}