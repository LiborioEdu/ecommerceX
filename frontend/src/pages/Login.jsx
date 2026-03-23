import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorInfo, setErrorInfo] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("token/", { username, password });
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      navigate("/");
    } catch (err) {
      console.error(err);
      setErrorInfo("Credenciais inválidas. O cofre continua selado.");
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 flex flex-col">
      <Navbar />
      
      <div className="absolute inset-0 z-0 bg-background-dark">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.15),transparent_60%)]"></div>
        <img 
            className="w-full h-full object-cover opacity-20" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR3vuJNmonZyfVo2zyakxlh6128Zx2GkUdlGFMligjuJO4mUFauyPgEKQL1Zpqt_n1_Y7l9rmPo-YRMXLKNfJLUL47n2iZbJ1p017Tyf3P1z4uXcJLdu81-jxI7OMtSjMuUykrCqNiDnRi_Q52CW_zelxVASzz61xenwiFWMvl0w7PEkVKptDVJjQ8zEv3zcKq11sdhmfYYX0g88L5gk1m-UAoI38ef_C-sN8z6LcrUghqiBP27YpwFDQ0UltT5fu4g-OUl0XL-AYJ" 
            alt="Fundo épico de armaria" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 to-background-dark"></div>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center p-6 mt-16">
        <div className="w-full max-w-md bg-[#1a1f26]/80 backdrop-blur-md rounded-2xl border border-primary/20 p-8 shadow-[0_0_40px_rgba(245,158,11,0.1)] transition-transform hover:border-primary/50 duration-500">
          <div className="text-center mb-8">
            <span className="material-symbols-outlined text-primary text-5xl mb-2 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">vpn_key</span>
            <h2 className="text-3xl font-black uppercase italic tracking-tight text-white">Adentrar a <span className="text-primary">Guilda</span></h2>
            <p className="text-sm text-slate-400 mt-2 mb-6">Identifique-se para acessar as mercadorias de elite da Armaria.</p>
            {errorInfo && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3 rounded-lg text-sm font-semibold tracking-wider animate-pulse mb-6">
                  {errorInfo}
              </div>
            )}
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5" htmlFor="username">Apelido do Herói (Nome de Usuário)</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm focus-within:text-primary transition-colors">person</span>
                <input
                  id="username"
                  type="text"
                  placeholder="Nome de aventureiro"
                  className="w-full bg-slate-900/80 border border-slate-700/50 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all text-white placeholder:text-slate-600"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5" htmlFor="password">Palavra Secreta (Senha)</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">lock</span>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-900/80 border border-slate-700/50 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all text-white placeholder:text-slate-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full mt-4 bg-gradient-to-br from-primary to-amber-700 py-3.5 rounded-xl font-bold text-background-dark uppercase tracking-widest flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-95 transition-transform shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              Destrancar Portões
              <span className="material-symbols-outlined text-sm">login</span>
            </button>
          </form>

          <div className="mt-8 text-center border-t border-slate-800/50 pt-6">
            <p className="text-sm text-slate-400">
              Não faz parte de uma guilda? <Link to="/register" className="text-primary font-bold hover:underline">Forjar Aliança</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}