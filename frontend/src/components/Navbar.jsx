import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const isLoggedIn = !!localStorage.getItem("access");
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0b0e14]/70 backdrop-blur-md border-b flex-none border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">shield_with_heart</span>
            <span className="text-2xl font-extrabold tracking-tighter uppercase italic text-white">
              Armaria<span className="text-primary">Mítica</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-10">
            <Link to="/arsenal" className={`text-sm font-semibold uppercase tracking-widest transition-all ${isActive('/arsenal') ? 'text-primary' : 'text-slate-100 hover:text-primary'}`}>Arsenal</Link>
            <Link to="/profile" className={`text-sm font-semibold uppercase tracking-widest transition-all ${isActive('/profile') ? 'text-primary' : 'text-slate-100 hover:text-primary'}`}>Meu Cofre</Link>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/cart" className="relative group cursor-pointer flex items-center justify-center h-10 w-10 rounded-full hover:bg-white/5 transition-colors">
              <span className={`material-symbols-outlined transition-colors text-2xl group-hover:text-primary ${isActive('/cart') ? 'text-primary' : 'text-slate-100'}`}>shopping_cart</span>
              {itemCount > 0 && (
                 <span className="absolute -top-1 -right-1 bg-primary text-background-dark text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-[#0b0e14]">
                   {itemCount}
                 </span>
              )}
            </Link>
            <Link to={isLoggedIn ? "/profile" : "/login"} className="h-10 w-10 flex items-center justify-center rounded-full border-2 border-primary/30 overflow-hidden hover:border-primary transition-colors bg-[#0b0e14]">
              <img src="/images/helmet_icon.png" alt="Perfil" className="w-full h-full object-cover" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}