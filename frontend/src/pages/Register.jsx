/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("register/", formData);
            alert("Cadastro Realizado");
            navigate("/login");
        } catch (error) {
            alert("Erro ao cadastrar")
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Criar Conta</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Usuário"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          <button type="submit" className="w-full bg-blue-600 py-2 rounded font-bold">
            Cadastrar
          </button>
        </form>
        <p className="mt-4 text-center">
          Já tem conta? <Link to="/login" className="text-blue-400">Faça login</Link>
        </p>
      </div>
    </div>
    );
}