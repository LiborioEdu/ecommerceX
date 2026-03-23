import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
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
        // Fix for DRF pagination - extrai 'results' se existir no payload paginado
        const data = res.data.results ? res.data.results : res.data;
        setOrders(data);
      })
      .catch(err => console.error("Erro ao buscar pedidos:", err));
  }, []);

  if (loading) return (
     <div className="min-h-screen bg-background-dark font-display text-white flex items-center justify-center">
         <div className="animate-pulse text-primary text-2xl uppercase tracking-widest font-black">Lendo Pergaminhos...</div>
     </div>
  );

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 flex flex-col">
      <Navbar />

      {/* Heroic Background */}
      <div className="absolute inset-0 z-0 bg-background-dark pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_60%)]"></div>
        <img 
            className="w-full h-full object-cover opacity-10" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz9alSA_c2LhB1w1SFqHe7zw6fKq8gdQFIfCe61vWAft9Ef9RaW7uez6iKgD0KaM6n3Zod70A2xMPsH-jEKcpezHgEmcDq3dL-6IjvWQtEl4kpBrTfChwJv8_FYjD-e2huEH3EtJ5Sb_kHumRev4_sbinvl2ptENBx-ozyYtdJ8fuUq3_F1kB6K2BepkfAao16R8OuCzLhuAtTT4lK2M43e6jAEnvtCEEgF91XAqLhp9mj4Ac-3o0TUhIFfdbqLe1961CEESizyX3o" 
            alt="Guild Background" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 to-background-dark"></div>
      </div>

      <main className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-6 py-28 flex flex-col gap-8">
        
        {userData ? (
          <>
            {/* Cabecalho do Cofre */}
            <div className="bg-[#1a1f26]/80 backdrop-blur-md rounded-2xl border border-secondary/20 p-8 shadow-[0_0_40px_rgba(59,130,246,0.1)] flex md:flex-row flex-col items-center md:items-start gap-8">
               <div className="w-32 h-32 shrink-0 rounded-full border-4 border-secondary/30 overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                  <img className="w-full h-full object-cover" alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz9alSA_c2LhB1w1SFqHe7zw6fKq8gdQFIfCe61vWAft9Ef9RaW7uez6iKgD0KaM6n3Zod70A2xMPsH-jEKcpezHgEmcDq3dL-6IjvWQtEl4kpBrTfChwJv8_FYjD-e2huEH3EtJ5Sb_kHumRev4_sbinvl2ptENBx-ozyYtdJ8fuUq3_F1kB6K2BepkfAao16R8OuCzLhuAtTT4lK2M43e6jAEnvtCEEgF91XAqLhp9mj4Ac-3o0TUhIFfdbqLe1961CEESizyX3o"/>
               </div>
               <div className="flex-1 text-center md:text-left space-y-2">
                 <span className="material-symbols-outlined text-secondary text-4xl mb-2">admin_panel_settings</span>
                 <h2 className="text-3xl font-black uppercase italic tracking-tight text-white">{userData.username}</h2>
                 <p className="text-sm text-slate-400 font-bold tracking-widest uppercase">ID da Guilda: #{userData.id}</p>
                 <p className="text-sm text-slate-400 mt-2">{userData.email}</p>
                 <div className="pt-4">
                    <button 
                      onClick={() => {
                        localStorage.clear();
                        window.location.href = "/login";
                      }}
                      className="text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors flex items-center justify-center md:justify-start gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">logout</span> 
                      Abandonar a Guilda (Sair)
                    </button>
                 </div>
               </div>
            </div>

            {/* Historico de Missoes (Pedidos) */}
            <div>
               <div className="flex items-center gap-3 mb-6">
                 <span className="material-symbols-outlined text-primary text-2xl">history_edu</span>
                 <h3 className="text-2xl font-black uppercase italic tracking-tight text-white border-b border-primary/20 pb-2 flex-1">Registros de Aquisição</h3>
               </div>
               
               {orders.length === 0 ? (
                  <div className="bg-card-dark/50 border border-slate-800 rounded-xl p-8 text-center">
                      <p className="text-slate-500 italic mb-4">Você ainda não desbravou nenhuma masmorra nem finalizou missões mercantis.</p>
                      <Link to="/arsenal" className="text-primary font-bold hover:underline">Visitar a Forja Central</Link>
                  </div>
               ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="bg-card-dark rounded-xl border border-slate-800 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-primary/50 transition-colors">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                             <span className="material-symbols-outlined text-accent-blue text-sm">receipt_long</span>
                             <p className="font-bold text-accent-blue tracking-widest uppercase text-sm">Contrato #{order.id}</p>
                          </div>
                          <p className="text-sm text-slate-400">Firmado em: {new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="text-left md:text-right flex flex-col items-start md:items-end">
                          <p className="text-xl font-bold text-white mb-2">{Number(order.total_price).toFixed(0)} <span className="text-primary text-sm">PO</span></p>
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${order.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/30' : 'bg-secondary/10 text-secondary border-secondary/30'}`}>
                            {order.status || 'Processando'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
               )}
            </div>
          </>
        ) : (
          <div className="text-center p-12 bg-card-dark/50 border border-red-500/20 text-red-400 rounded-xl">
            <span className="material-symbols-outlined text-4xl mb-4">error</span>
            <p>Seus pergaminhos parecem corrompidos. Tente se identificar novamente.</p>
          </div>
        )}

      </main>
    </div>
  );
}