import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const token = localStorage.getItem("access");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-background-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Logo - Mythic Forge */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="material-symbols-outlined text-primary text-3xl group-hover:rotate-12 transition-transform">
            castle
          </span>
          <span className="font-display font-bold text-xl tracking-tight text-white">
            GILMORE<span className="primary">STORE</span>
          </span>
        </Link>

        {/* Links de Navegação (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-slate-400">
          <Link to="/" className="hover:text-primary transition-colors">Arsenal</Link>
          <Link to="/profile" className="hover:text-primary transition-colors">Missões</Link>
        </div>

        {/* Ações / Ícones */}
        <div className="flex items-center gap-4">
          
          {/* Carrinho */}
          <Link to="/checkout" className="relative p-2 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-2xl">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-background-dark text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-background-dark animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User / Auth */}
          {token ? (
            <div className="flex items-center gap-4">
               <Link to="/profile" className="p-2 text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-2xl">account_circle</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="hidden md:block text-xs font-bold uppercase tracking-tighter text-red-500 hover:text-red-400"
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-primary text-background-dark px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}