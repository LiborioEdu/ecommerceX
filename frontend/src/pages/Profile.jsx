import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

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

useEffect(() => {
  api.get("orders/")
    .then(res => {
      console.log("Pedidos recebidos:", res.data);
      setOrders(res.data);
    })
    .catch(err => console.error("Erro ao buscar pedidos:", err));
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

          {/* --- INÍCIO DA TASK 9: HISTÓRICO DE PEDIDOS --- */}
          <hr className="my-8 border-gray-700" />
          
          <h3 className="text-2xl font-bold mb-4 text-yellow-500">Histórico de Pedidos</h3>
          
          {orders.length === 0 ? (
            <p className="text-gray-500 italic">Você ainda não realizou nenhuma missão (pedido).</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="p-4 bg-gray-700 rounded-lg border border-gray-600 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-blue-300">Pedido #{order.id}</p>
                    <p className="text-sm text-gray-400">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold">R$ {order.total_price}</p>
                    <span className="text-xs uppercase px-2 py-1 bg-gray-800 rounded text-gray-300">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* --- FIM DA TASK 9 --- */}

        </div>
      ) : (
        <p className="text-red-400">Não foi possível carregar os dados. Tente logar novamente.</p>
      )}
    </div>
  </div>
);
}