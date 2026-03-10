import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // O interceptor vai anexar o token automaticamente aqui!
        const response = await api.get("me/");
        setUserData(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfil", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="text-white p-10">Carregando pergaminhos...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 p-8 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-blue-400">Perfil do Aventureiro</h2>
        
        {userData ? (
          <div className="space-y-4 text-lg">
            <p><span className="text-gray-400">Nome de Usuário:</span> {userData.username}</p>
            <p><span className="text-gray-400">E-mail:</span> {userData.email}</p>
            <p><span className="text-gray-400">ID na Guilda:</span> #{userData.id}</p>
            
            <button 
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
              className="mt-6 bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-bold transition"
            >
              Sair da Conta (Logout)
            </button>
          </div>
        ) : (
          <p className="text-red-400">Não foi possível carregar os dados. Tente logar novamente.</p>
        )}
      </div>
    </div>
  );
}