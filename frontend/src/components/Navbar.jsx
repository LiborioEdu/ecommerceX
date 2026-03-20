import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0b0e14]/70 backdrop-blur-md border-b flex-none border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">shield_with_heart</span>
            <span className="text-2xl font-extrabold tracking-tighter uppercase italic text-white">
              Mythic<span className="text-primary">Forge</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-10">
            <Link to="/arsenal" className="text-sm font-semibold uppercase tracking-widest text-slate-100 hover:text-primary transition-all">Arsenal</Link>
            <Link to="/" className="text-sm font-semibold uppercase tracking-widest text-slate-100 hover:text-primary transition-all">Alchemy</Link>
            <Link to="/profile" className="text-sm font-semibold uppercase tracking-widest text-slate-100 hover:text-primary transition-all">Vault</Link>
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
            <Link to="/login" className="h-10 w-10 rounded-full border-2 border-primary/30 overflow-hidden hover:border-primary transition-colors">
              <img className="w-full h-full object-cover" alt="User avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz9alSA_c2LhB1w1SFqHe7zw6fKq8gdQFIfCe61vWAft9Ef9RaW7uez6iKgD0KaM6n3Zod70A2xMPsH-jEKcpezHgEmcDq3dL-6IjvWQtEl4kpBrTfChwJv8_FYjD-e2huEH3EtJ5Sb_kHumRev4_sbinvl2ptENBx-ozyYtdJ8fuUq3_F1kB6K2BepkfAao16R8OuCzLhuAtTT4lK2M43e6jAEnvtCEEgF91XAqLhp9mj4Ac-3o0TUhIFfdbqLe1961CEESizyX3o"/>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}