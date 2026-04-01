import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8 lg:py-12 mt-16">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Items & Shipping */}
          <div className="flex-1 space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Resumo do Tesouro</h1>
              <p className="text-slate-500 dark:text-slate-400">Vasculhe suas aquisições lendárias antes de finalizar o ritual comercial.</p>
            </div>
            
            {/* Items List */}
            {cart.length === 0 ? (
              <div className="bg-white dark:bg-card-dark rounded-xl p-8 text-center border border-slate-200 dark:border-slate-800">
                  <p className="text-slate-500 dark:text-slate-400 mb-4">O seu relicário interior se encontra vazio no momento.</p>
                  <Link to="/arsenal" className="text-primary font-bold hover:underline">Retornar à Forja Central</Link>
              </div>
            ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-card-dark rounded-xl p-4 flex items-center gap-4 border border-slate-200 dark:border-slate-800 transition-all hover:border-accent-blue/50 group">
                      <div className="relative w-24 h-24 rounded-lg bg-slate-100 dark:bg-background-dark flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700">
                        {item.image ? (
                           <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        ) : (
                           <span className="material-symbols-outlined text-4xl text-primary group-hover:scale-110 transition-transform">swords</span>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/10 to-transparent"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg">{item.name}</h3>
                            <p className="text-sm text-accent-blue flex items-center gap-1">
                              {item.category_name || "Item Mítico"}
                            </p>
                          </div>
                          <p className="font-bold text-primary">{Number(item.price).toFixed(0)} Coin</p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center bg-slate-100 dark:bg-background-dark rounded-lg px-2 border border-slate-300 dark:border-slate-700">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-primary cursor-pointer"><span className="material-symbols-outlined text-sm">remove</span></button>
                            <span className="px-4 text-sm font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-primary cursor-pointer"><span className="material-symbols-outlined text-sm">add</span></button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer">
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
            )}
            

          </div>
          
          {/* Right Column: Summary */}
          {cart.length > 0 && (
              <div className="lg:w-96">
                <style>{`
                    .glass-card {
                        background: rgba(26, 31, 38, 0.7);
                        backdrop-filter: blur(12px);
                        border: 1px solid rgba(245, 159, 10, 0.1);
                    }
                    .mystic-glow {
                        box-shadow: 0 0 15px rgba(56, 189, 248, 0.2);
                    }
                `}</style>
                <div className="glass-card rounded-2xl p-6 sticky top-24 space-y-6 mystic-glow">
                  <h2 className="text-2xl font-bold border-b border-primary/10 pb-4">Auditoria do Tesouro</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between text-slate-400">
                      <span>Valor Base do Saque</span>
                      <span>{total.toFixed(2)} Coin</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400 mb-6">
                      <span>Impostos da Coroa</span>
                      <span>0.00 Coin</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-xl mb-6">
                      <span className="font-bold uppercase tracking-widest text-sm">Valor Total</span>
                        <p className="text-3xl font-black text-white">{total.toFixed(2)} <span className="text-primary text-lg">Coin</span></p>
                    </div>
                  </div>
                  
                  <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary mt-1">shield</span>
                      <div className="text-sm">
                        <p className="font-bold text-primary">Garantia do Matador de Dragões</p>
                        <p className="text-slate-300">Cobre danos causados por sopro de fogo mágico por exatos 30 ciclos lunares.</p>
                      </div>
                    </div>
                  </div>
                  
                  <button onClick={() => navigate('/checkout')} className="w-full bg-primary hover:bg-primary/90 text-background-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20 cursor-pointer">
                    <span className="material-symbols-outlined">payments</span>
                    Finalizar a Compra
                  </button>
                  
                  <div className="flex justify-center gap-4 grayscale opacity-50">
                    <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
                    <span className="material-symbols-outlined text-3xl">token</span>
                    <span className="material-symbols-outlined text-3xl">currency_exchange</span>
                  </div>
                  <p className="text-center text-[10px] text-slate-500 uppercase tracking-[0.2em]">
                    Mercador certificado pelo Alto Conselho da Ordem
                  </p>
                </div>
              </div>
          )}
        </div>
        
        {/* Footer */}
        <footer className="w-full px-4 py-12 border-t border-slate-200 dark:border-slate-800 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">castle</span>
                    <span className="text-sm font-bold opacity-75 italic text-slate-500">Impulsionando aventureiros desde a Terceira Era</span>
                </div>
                <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <a className="hover:text-primary transition-colors" href="#">Regras da Taverna</a>
                    <a className="hover:text-primary transition-colors" href="#">Mapa de Origem</a>
                    <a className="hover:text-primary transition-colors" href="#">Pergaminho de Privacidade</a>
                </div>
            </div>
        </footer>
      </main>
    </div>
  );
}