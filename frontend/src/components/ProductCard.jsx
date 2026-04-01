import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const getRarity = (price) => {
      if(price > 5000) return { label: "Mítico", color: "bg-primary text-background-dark" };
      if(price > 1000) return { label: "Épico", color: "bg-secondary text-white" };
      return { label: "Raro", color: "bg-slate-600 text-white" };
  };
  const rarity = getRarity(product.price);

  return (
    <div 
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-card-dark rounded-xl p-4 border border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.4)] group flex flex-col justify-between h-full hover:border-primary/50 transition-colors cursor-pointer"
    >
      <div className="block relative aspect-[3/4] rounded-lg overflow-hidden mb-4 bg-slate-900 border border-slate-700 isolate">
        <img 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          alt={product.name} 
          src={product.image || "https://placehold.co/400x500/1a1f26/f59e0b?text=Item+Mítico"} 
        />
        <div className={`absolute top-3 left-3 ${rarity.color} font-black px-2 py-1 rounded text-[10px] uppercase shadow-lg z-10`}>
          {rarity.label}
        </div>
      </div>
      <div className="flex-1 flex flex-col pt-2">
          <div>
             <h4 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors line-clamp-1">{product.name}</h4>
          </div>
          <p className="text-slate-500 text-sm mb-6 line-clamp-2 h-10 pointer-events-none">{product.description || "Forjada nas profundezas do desconhecido."}</p>
          <div className="flex justify-between items-center mt-auto">
            <span className="text-xl font-black text-primary pointer-events-none">{Number(product.price).toFixed(0)} <span className="text-sm">Coin</span></span>
            <button 
              onClick={(e) => {
                e.stopPropagation(); // Impede que o clique dispare o redirecionamento do card
                addToCart(product);
              }}
              className="bg-slate-800/50 hover:bg-primary/20 text-slate-300 hover:text-primary p-2 rounded-lg transition-colors cursor-pointer z-20 group/btn shadow-[0_0_10px_rgba(245,158,11,0)] hover:shadow-[0_0_10px_rgba(245,158,11,0.3)]"
              title="Colocar no Baú"
            >
              <span className="material-symbols-outlined text-slate-300 group-hover/btn:text-primary transition-colors">add_shopping_cart</span>
            </button>
          </div>
      </div>
    </div>
  );
}
