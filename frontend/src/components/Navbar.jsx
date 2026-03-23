import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const isLoggedIn = !!localStorage.getItem("access");

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
            <Link to="/arsenal" className="text-sm font-semibold uppercase tracking-widest text-slate-100 hover:text-primary transition-all">Arsenal</Link>
            <Link to="/" className="text-sm font-semibold uppercase tracking-widest text-slate-100 hover:text-primary transition-all">Alquimia</Link>
            <Link to="/profile" className="text-sm font-semibold uppercase tracking-widest text-slate-100 hover:text-primary transition-all">Meu Cofre</Link>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/cart" className="relative group cursor-pointer">
              <span className="material-symbols-outlined text-slate-100 group-hover:text-primary transition-colors">shopping_cart</span>
              {itemCount > 0 && (
                 <span className="absolute -top-2 -right-2 bg-primary text-background-dark text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-background-dark">
                   {itemCount}
                 </span>
              )}
            </Link>
            <Link to={isLoggedIn ? "/profile" : "/login"} className="h-10 w-10 flex items-center justify-center rounded-full border-2 border-primary/30 overflow-hidden hover:border-primary transition-colors bg-[#0b0e14]">
              <span className="text-xl pb-0.5">👤</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}