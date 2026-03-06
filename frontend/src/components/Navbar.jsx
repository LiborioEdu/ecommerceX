import { Link } from "react-router-dom"; // Não esqueça do import!
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-xl">
      <div className="container mx-auto flex justify-between items-center">
        {/* Link para a Home no Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-400 tracking-tighter">
          Ecommerce<span className="text-white">X</span>
        </Link>

        <div className="space-x-6 flex items-center">
          <Link href="/" className="hover:text-blue-400 transition">Produtos</Link>
          
          {/* O PULO DO GATO: Envolva o carrinho com Link */}
          <Link to="/cart" className="relative flex items-center hover:text-blue-400 transition">
            <span className="text-xl">🛒</span>
            <span className="ml-1 hidden sm:inline">Carrinho</span>
            
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}