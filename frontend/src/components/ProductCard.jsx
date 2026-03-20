import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  // Helper function to render colors/labels based on fictional gear rarity
  const getRarity = (price) => {
      if(price > 5000) return { label: "Mythic", color: "bg-primary text-background-dark" };
      if(price > 1000) return { label: "Epic", color: "bg-secondary text-white" };
      return { label: "Rare", color: "bg-slate-600 text-white" };
  };
  const rarity = getRarity(product.price);

  return (
    <div className="bg-card-dark rounded-xl p-4 border border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.4)] group flex flex-col justify-between h-full hover:border-primary/50 transition-colors">
      <Link to={`/product/${product.id}`} className="block relative aspect-[3/4] rounded-lg overflow-hidden mb-4 bg-slate-900 border border-slate-700 isolate">
        <img 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          alt={product.name} 
          src={product.image || "https://placehold.co/400x500/1a1f26/f59e0b?text=Mythic+Item"} 
        />
        <div className={`absolute top-3 left-3 ${rarity.color} font-black px-2 py-1 rounded text-[10px] uppercase shadow-lg z-10`}>
          {rarity.label}
        </div>
      </Link>
      <div className="flex-1 flex flex-col pt-2">
          <Link to={`/product/${product.id}`}>
             <h4 className="text-lg font-bold mb-1 hover:text-primary transition-colors line-clamp-1">{product.name}</h4>
          </Link>
          <p className="text-slate-500 text-sm mb-6 line-clamp-2 h-10">{product.description || "Forged in the depths of the unknown."}</p>
          <div className="flex justify-between items-center mt-auto">
            <span className="text-xl font-black text-primary">{Number(product.price).toFixed(0)} <span className="text-sm">GP</span></span>
            <button 
              onClick={() => addToCart(product)}
              className="bg-secondary/20 hover:bg-secondary text-secondary hover:text-white p-2 rounded-lg transition-colors group-hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]"
              title="Add to Vault"
            >
              <span className="material-symbols-outlined">add_shopping_cart</span>
            </button>
          </div>
      </div>
    </div>
  );
}
