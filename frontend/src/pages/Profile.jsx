import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
      war_name: '',
      age: '',
      character_class: '',
      description: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("me/");
        setUserData(response.data);
        setEditData({
            war_name: response.data.war_name || '',
            age: response.data.age || '',
            character_class: response.data.character_class || '',
            description: response.data.description || ''
        });
      } catch (error) {
        console.error("Erro ao buscar perfil", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
      setSaving(true);
      try {
          const response = await api.put("me/", editData);
          setUserData(response.data);
          setIsEditing(false);
      } catch (error) {
          console.error("Erro ao salvar perfil", error);
      } finally {
          setSaving(false);
      }
  };

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
            <div className="bg-[#1a1f26]/80 backdrop-blur-md rounded-2xl border border-secondary/20 p-8 shadow-[0_0_40px_rgba(59,130,246,0.1)] flex md:flex-row flex-col items-center md:items-start gap-8 relative overflow-hidden">
               {/* Decorative flair */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mx-10 pointer-events-none"></div>

               <div className="w-32 h-32 shrink-0 rounded-full border-4 border-secondary/30 overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.2)] relative z-10">
                  <img className="w-full h-full object-cover" alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz9alSA_c2LhB1w1SFqHe7zw6fKq8gdQFIfCe61vWAft9Ef9RaW7uez6iKgD0KaM6n3Zod70A2xMPsH-jEKcpezHgEmcDq3dL-6IjvWQtEl4kpBrTfChwJv8_FYjD-e2huEH3EtJ5Sb_kHumRev4_sbinvl2ptENBx-ozyYtdJ8fuUq3_F1kB6K2BepkfAao16R8OuCzLhuAtTT4lK2M43e6jAEnvtCEEgF91XAqLhp9mj4Ac-3o0TUhIFfdbqLe1961CEESizyX3o"/>
               </div>
               
               <div className="flex-1 w-full relative z-10">
                 {isEditing ? (
                    <div className="space-y-4 w-full text-left">
                        <div className="flex items-center gap-3 mb-4">
                           <span className="material-symbols-outlined text-primary text-3xl">edit_note</span>
                           <h2 className="text-2xl font-black uppercase italic tracking-tight text-white border-b border-primary/20 pb-2 flex-1">Forjar Identidade</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Nome de Guerra</label>
                                <input 
                                    className="w-full bg-background-dark/50 border border-slate-700 rounded-lg p-3 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-slate-600 font-bold"
                                    type="text" 
                                    placeholder="Ex: Arthas, o Corajoso"
                                    value={editData.war_name}
                                    onChange={e => setEditData({...editData, war_name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Sua Idade</label>
                                <input 
                                    className="w-full bg-background-dark/50 border border-slate-700 rounded-lg p-3 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-slate-600 font-bold"
                                    type="number" 
                                    placeholder="Ciclos solares vividos"
                                    value={editData.age}
                                    onChange={e => setEditData({...editData, age: e.target.value})}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Classe de Origem</label>
                                <select 
                                    className="w-full bg-background-dark/50 border border-slate-700 rounded-lg p-3 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all cursor-pointer appearance-none font-bold italic"
                                    value={editData.character_class}
                                    onChange={e => setEditData({...editData, character_class: e.target.value})}
                                >
                                    <option value="" className="text-slate-500 bg-background-dark">-- Nenhuma Classe Selecionada --</option>
                                    <option value="Guerreiro" className="bg-background-dark">Guerreiro (Mestre de Armas)</option>
                                    <option value="Arqueiro" className="bg-background-dark">Arqueiro (Lâminas Sombrias)</option>
                                    <option value="Mago" className="bg-background-dark">Mago (Sábio Arcano)</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Sua Biografia / Juramento</label>
                                <textarea 
                                    rows="3"
                                    className="w-full bg-background-dark/50 border border-slate-700 rounded-lg p-3 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-slate-600 resize-none font-medium"
                                    placeholder="Descreva suas origens e batalhas passadas..."
                                    value={editData.description}
                                    onChange={e => setEditData({...editData, description: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 pt-2">
                            <button 
                                onClick={handleSaveProfile}
                                disabled={saving}
                                className="flex-1 bg-primary/20 border border-primary text-primary hover:bg-primary/30 uppercase tracking-widest font-black py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex justify-center items-center gap-2"
                            >
                                {saving ? <span className="material-symbols-outlined animate-spin text-xl">sync</span> : 'Selar Juramento (Salvar)'}
                            </button>
                            <button 
                                onClick={() => {
                                    setEditData({
                                        war_name: userData.war_name || '',
                                        age: userData.age || '',
                                        character_class: userData.character_class || '',
                                        description: userData.description || ''
                                    });
                                    setIsEditing(false);
                                }}
                                disabled={saving}
                                className="px-6 bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 uppercase tracking-widest font-bold py-4 rounded-xl transition-all cursor-pointer"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                 ) : (
                    <div className="text-center md:text-left space-y-4">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div>
                               <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                                   <span className="material-symbols-outlined text-secondary text-3xl">admin_panel_settings</span>
                                   {userData.war_name ? (
                                      <h2 className="text-3xl font-black uppercase italic tracking-tight text-white">{userData.war_name}</h2>
                                   ) : (
                                      <h2 className="text-3xl font-black uppercase italic tracking-tight text-white">{userData.username}</h2>
                                   )}
                               </div>
                               <p className="text-sm text-slate-400 font-bold tracking-widest uppercase">
                                   ID da Guilda: #{userData.id}
                                   {userData.character_class && <span className="text-primary italic font-black"> • {userData.character_class}</span>}
                                   {userData.age && <span> • {userData.age} anos</span>}
                               </p>
                               {userData.war_name && userData.war_name !== userData.username && (
                                   <p className="text-xs text-slate-500 mt-1 font-bold uppercase tracking-widest">Nasceu no reino como: {userData.username}</p>
                               )}
                               <p className="text-xs text-slate-500 mt-1">{userData.email}</p>
                            </div>
                            
                            <button 
                               onClick={() => setIsEditing(true)}
                               className="mx-auto md:mx-0 bg-background-dark/50 hover:bg-slate-800 hover:border-primary/50 border border-slate-700 text-slate-300 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 cursor-pointer group shadow-sm hover:shadow-primary/10"
                            >
                               <span className="material-symbols-outlined text-sm group-hover:text-primary transition-colors">history_edu</span>
                               Reescrever Destino
                            </button>
                        </div>
                        
                        {userData.description && (
                            <div className="mt-6 bg-background-dark/40 border-l-4 border-l-primary/60 border-y border-y-slate-800/50 border-r border-r-slate-800/50 p-5 rounded-r-xl relative">
                                <span className="material-symbols-outlined text-primary/10 absolute top-2 right-4 text-6xl pointer-events-none">format_quote</span>
                                <p className="text-sm text-slate-300 italic leading-relaxed pr-8 relative z-10 font-medium">"{userData.description}"</p>
                            </div>
                        )}

                        <div className="pt-4 flex justify-center md:justify-start">
                           <button 
                             onClick={() => {
                               localStorage.clear();
                               window.location.href = "/login";
                             }}
                             className="text-xs font-bold uppercase tracking-widest text-red-500/70 hover:text-red-400 bg-red-500/5 hover:bg-red-500/10 px-4 py-2 border border-red-500/10 rounded-lg transition-colors flex items-center justify-center md:justify-start gap-2 cursor-pointer"
                           >
                             <span className="material-symbols-outlined text-sm">logout</span> 
                             Abandonar a Guilda
                           </button>
                        </div>
                    </div>
                 )}
               </div>
            </div>

            {/* Histórico de Missões (Baú de Artefatos em Grelha Flat) */}
            <div>
               <div className="flex items-center gap-3 mb-6 block w-full">
                 <span className="material-symbols-outlined text-primary text-3xl">inventory_2</span>
                 <h3 className="text-3xl font-black uppercase italic tracking-tight text-white border-b border-primary/20 pb-2 flex-1">Artefatos Adquiridos</h3>
               </div>
               
               {(() => {
                  const allVaultItems = orders.flatMap(order => order.items || []);
                  
                  if (orders.length === 0 || allVaultItems.length === 0) {
                     return (
                        <div className="bg-card-dark/50 border border-slate-800 rounded-xl p-12 text-center w-full">
                             <span className="material-symbols-outlined text-5xl text-slate-600 mb-4">hourglass_empty</span>
                             <p className="text-slate-400 italic mb-6 text-lg">O seu baú encontra-se coberto de teias de aranha. Nenhuma recompensa obtida ainda.</p>
                             <Link to="/arsenal" className="text-primary font-bold hover:underline bg-primary/10 px-6 py-3 rounded-xl transition-colors hover:bg-primary/20 hover:text-white uppercase tracking-widest text-sm inline-block mt-4">Desbravar a Forja Central</Link>
                         </div>
                     );
                  }

                  return (
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                         {allVaultItems.map((item, index) => {
                             // Mocked stats based on product ID to simulate RPG progression reliably
                             const rarities = ['Comum', 'Incomum', 'Raro', 'Épico', 'Lendário', 'Mítico'];
                             const rarityColors = [
                                 'border-slate-500 text-slate-400 bg-slate-500/10',    // Comum
                                 'border-green-500 text-green-400 bg-green-500/10',    // Incomum
                                 'border-blue-500 text-blue-400 bg-blue-500/10',       // Raro
                                 'border-purple-500 text-purple-400 bg-purple-500/10', // Épico
                                 'border-amber-500 text-amber-500 bg-amber-500/10',    // Lendário
                                 'border-rose-500 text-rose-500 bg-rose-500/10'        // Mítico
                             ];
                             const rarityIndex = (item.product * 7) % rarities.length;
                             const attackPower = 10 + ((item.product * 13) % 150);
                             const rarityName = rarities[rarityIndex];
                             const rarityColor = rarityColors[rarityIndex];

                             return (
                                 <div key={index} className="bg-card-dark/80 backdrop-blur-md rounded-2xl border border-slate-800 overflow-hidden flex flex-col shadow-lg hover:border-primary/50 transition-all duration-300 group cursor-pointer relative hover:-translate-y-1">
                                     <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                     
                                     {/* Item Image Header */}
                                     <div className="h-40 w-full bg-slate-900 border-b border-slate-800 relative overflow-hidden flex items-center justify-center">
                                         {item.product_image ? (
                                            <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                         ) : (
                                            <span className="material-symbols-outlined text-slate-600 text-5xl">swords</span>
                                         )}
                                         
                                         {/* Drop Badge */}
                                         <div className="absolute top-2 right-2 z-10">
                                             <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md border backdrop-blur-sm ${rarityColor}`}>
                                                 {rarityName}
                                             </span>
                                         </div>
                                         <div className="absolute bottom-2 left-2 z-10">
                                             <span className="bg-background-dark/80 backdrop-blur-md text-white text-xs font-black uppercase tracking-widest px-2 py-1 rounded-md border border-slate-700 shadow-sm">
                                                 x{item.quantity} Uni.
                                             </span>
                                         </div>
                                     </div>

                                     {/* Item Info Body */}
                                     <div className="p-4 flex-1 flex flex-col min-h-[140px] z-10">
                                         <p className="text-[10px] text-primary/70 font-bold uppercase tracking-widest mb-1">{item.product_category || 'Equipamento Místico'}</p>
                                         <h4 className="text-lg font-black text-white leading-tight mb-3 group-hover:text-primary transition-colors">{item.product_name || `Artefato #${item.product}`}</h4>
                                         
                                         <div className="mt-auto space-y-2">
                                             <div className="flex items-center justify-between text-xs font-bold text-slate-400 bg-background-dark/50 px-3 py-2 rounded-lg border border-slate-800/80">
                                                 <span className="flex items-center gap-1 uppercase tracking-wider"><span className="material-symbols-outlined text-sm text-rose-500">local_fire_department</span> Poder</span>
                                                 <span className="text-white">{attackPower} ATQ</span>
                                             </div>
                                             
                                             <div className="flex items-center justify-between text-xs font-bold text-slate-400 bg-background-dark/50 px-3 py-2 rounded-lg border border-slate-800/80">
                                                 <span className="flex items-center gap-1 uppercase tracking-wider"><span className="material-symbols-outlined text-sm text-primary">toll</span> Valor Original</span>
                                                 <span className="text-primary">{Number(item.price).toFixed(0)} <span className="text-[10px]">C</span></span>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                             );
                         })}
                     </div>
                  );
               })()}
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