import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Items & Shipping */}
          <div className="flex-1 space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Loot Crate Summary</h1>
              <p className="text-slate-500 dark:text-slate-400">Review your legendary acquisitions before finalizing the ritual.</p>
            </div>
            
            {/* Items List */}
            {cart.length === 0 ? (
              <div className="bg-white dark:bg-card-dark rounded-xl p-8 text-center border border-slate-200 dark:border-slate-800">
                  <p className="text-slate-500 dark:text-slate-400 mb-4">O relicário se encontra vazio no momento.</p>
                  <Link to="/" className="text-primary font-bold hover:underline">Retornar à Forja</Link>
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
                              {item.category_name || "Mythic Item"}
                            </p>
                          </div>
                          <p className="font-bold text-primary">{item.price} GP</p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center bg-slate-100 dark:bg-background-dark rounded-lg px-2 border border-slate-300 dark:border-slate-700">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-primary"><span className="material-symbols-outlined text-sm">remove</span></button>
                            <span className="px-4 text-sm font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-primary"><span className="material-symbols-outlined text-sm">add</span></button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
            )}
            
            {/* Shipping Form */}
            {cart.length > 0 && (
                <div className="bg-white dark:bg-card-dark rounded-xl p-6 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="material-symbols-outlined text-primary">map</span>
                    <h2 className="text-xl font-bold">Delivery to Kingdom</h2>
                  </div>
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-wider font-bold text-slate-500">Lord/Lady Name</label>
                      <input className="w-full bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary" placeholder="Sir Alistair of Oakhaven" type="text" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-wider font-bold text-slate-500">Kingdom / Realm</label>
                      <input className="w-full bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary" placeholder="The Iron Reach" type="text" />
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-xs uppercase tracking-wider font-bold text-slate-500">Fortress Address</label>
                      <input className="w-full bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary" placeholder="Throne Room, 3rd Citadel Floor" type="text" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-wider font-bold text-slate-500">Carrier Crow</label>
                      <select className="w-full bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary">
                        <option>Standard Raven (5-7 Cycles)</option>
                        <option>Royal Gryphon (Next Day Dawn)</option>
                        <option>Teleportation Circle (Instant)</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-wider font-bold text-slate-500">Scroll of Note</label>
                      <input className="w-full bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary" placeholder="Optional delivery instructions" type="text" />
                    </div>
                  </form>
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
                  <h2 className="text-2xl font-bold border-b border-primary/10 pb-4">Treasure Audit</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between text-slate-400">
                      <span>Base Loot Value</span>
                      <span>{total.toFixed(2)} GP</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Caravan Insurance</span>
                      <span>0.00 GP</span>
                    </div>
                    <div className="pt-4 border-t border-primary/10 flex justify-between items-end">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-slate-500">Total Contribution</p>
                        <p className="text-3xl font-black text-white">{total.toFixed(2)} <span className="text-primary text-lg">GP</span></p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary mt-1">shield</span>
                      <div className="text-sm">
                        <p className="font-bold text-primary">Dragon-Slayer's Warranty</p>
                        <p className="text-slate-300">Covers damage from fire breath and magic disruption for 30 moon cycles.</p>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full bg-primary hover:bg-primary/90 text-background-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined">payments</span>
                    Finalize Exchange
                  </button>
                  
                  <div className="flex justify-center gap-4 grayscale opacity-50">
                    <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
                    <span className="material-symbols-outlined text-3xl">token</span>
                    <span className="material-symbols-outlined text-3xl">currency_exchange</span>
                  </div>
                  <p className="text-center text-[10px] text-slate-500 uppercase tracking-[0.2em]">
                    Merchant authorized by the High Council
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
                    <span className="text-sm font-bold opacity-75 italic text-slate-500">Propelling adventurers since the Third Era</span>
                </div>
                <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <a className="hover:text-primary transition-colors" href="#">Tavern Rules</a>
                    <a className="hover:text-primary transition-colors" href="#">Map of Origin</a>
                    <a className="hover:text-primary transition-colors" href="#">Scroll of Privacy</a>
                </div>
            </div>
        </footer>
      </main>
    </div>
  );
}