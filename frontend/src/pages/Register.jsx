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
  const [errorInfo, setErrorInfo] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          await api.post("register/", formData);
          navigate("/login");
      } catch (error) {
          console.error(error);
          if (error.response && error.response.data) {
              const mensagensErro = Object.values(error.response.data).flat().join('\n');
              setErrorInfo(`The ritual failed: ${mensagensErro}`);
          } else {
              setErrorInfo("The ritual failed. Connection to the Guild was lost.");
          }
      }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 flex flex-col">
      <Navbar />
      
      {/* Background with heroic aesthetic */}
      <div className="absolute inset-0 z-0 bg-background-dark">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15),transparent_60%)]"></div>
        <img 
            className="w-full h-full object-cover opacity-20" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR3vuJNmonZyfVo2zyakxlh6128Zx2GkUdlGFMligjuJO4mUFauyPgEKQL1Zpqt_n1_Y7l9rmPo-YRMXLKNfJLUL47n2iZbJ1p017Tyf3P1z4uXcJLdu81-jxI7OMtSjMuUykrCqNiDnRi_Q52CW_zelxVASzz61xenwiFWMvl0w7PEkVKptDVJjQ8zEv3zcKq11sdhmfYYX0g88L5gk1m-UAoI38ef_C-sN8z6LcrUghqiBP27YpwFDQ0UltT5fu4g-OUl0XL-AYJ" 
            alt="Mythic Forge Enlistment" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 to-background-dark"></div>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center p-6 mt-20 mb-10">
        <div className="w-full max-w-md bg-[#1a1f26]/80 backdrop-blur-md rounded-2xl border border-secondary/20 p-8 shadow-[0_0_40px_rgba(59,130,246,0.1)] transition-transform hover:border-secondary/50 duration-500">
          <div className="text-center mb-8">
            <span className="material-symbols-outlined text-secondary text-5xl mb-2 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">assignment_ind</span>
            <h2 className="text-3xl font-black uppercase italic tracking-tight text-white">Join the <span className="text-secondary">Ranks</span></h2>
            <p className="text-sm text-slate-400 mt-2 mb-6">Enlist to claim legendary items and mystical artifacts.</p>
            {errorInfo && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3 rounded-lg text-xs font-semibold tracking-wider mb-6 text-left">
                  {errorInfo.split('\n').map((msg, i) => <p key={i}>• {msg}</p>)}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5" htmlFor="username">Adventurer Alias</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">badge</span>
                <input
                  id="username"
                  type="text"
                  placeholder="Choose your moniker"
                  className="w-full bg-slate-900/80 border border-slate-700/50 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-1 focus:ring-secondary focus:border-secondary focus:outline-none transition-all text-white placeholder:text-slate-600"
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5" htmlFor="email">Raven Post (Email)</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">mail</span>
                <input
                  id="email"
                  type="email"
                  placeholder="hero@kingdom.com"
                  className="w-full bg-slate-900/80 border border-slate-700/50 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-1 focus:ring-secondary focus:border-secondary focus:outline-none transition-all text-white placeholder:text-slate-600"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5" htmlFor="password">Secret Ward (Password)</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">lock</span>
                <input
                  id="password"
                  type="password"
                  placeholder="Forge your incantation"
                  className="w-full bg-slate-900/80 border border-slate-700/50 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-1 focus:ring-secondary focus:border-secondary focus:outline-none transition-all text-white placeholder:text-slate-600"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full mt-4 bg-gradient-to-br from-secondary to-blue-800 py-3.5 rounded-xl font-bold text-white uppercase tracking-widest flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-95 transition-transform shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              Forge Alliance
              <span className="material-symbols-outlined text-sm">how_to_reg</span>
            </button>
          </form>

          <div className="mt-8 text-center border-t border-slate-800/50 pt-6">
            <p className="text-sm text-slate-400">
              Already enlisted? <Link to="/login" className="text-secondary font-bold hover:underline">Return to the Guild</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}