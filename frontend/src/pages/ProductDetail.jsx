import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../services/productService";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    // Busca o produto real cadastrado no Backend
    getProduct(id).then((data) => setProduct(data)).catch(() => setProduct(null));
  }, [id]);

  if (!product) return (
     <div className="min-h-screen bg-background-dark font-display text-white flex items-center justify-center">
         <div className="animate-pulse text-primary text-2xl uppercase tracking-widest font-black">Invocando Artefato...</div>
     </div>
  );

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Hero Image Section */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative aspect-square md:aspect-[4/5] rounded-xl overflow-hidden bg-[#1a1f26]/70 backdrop-blur-md border border-primary/20 shadow-[0_0_20px_rgba(245,159,10,0.15)]">
              <img 
                className="w-full h-full object-cover" 
                alt={product.name} 
                src={product.image || "https://placehold.co/600x800/1a1f26/f59e0b?text=Item+Mítico"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                  <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/40 rounded-full text-xs font-bold uppercase tracking-widest mb-2 inline-block">
                    {product.category_name || "Grau Mítico"}
                  </span>
                  <h2 className="text-4xl font-black text-white drop-shadow-md">{product.name}</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-2 text-primary mb-2">
                <span className="material-symbols-outlined fill-1">star</span>
                <span className="material-symbols-outlined fill-1">star</span>
                <span className="material-symbols-outlined fill-1">star</span>
                <span className="material-symbols-outlined fill-1">star</span>
                <span className="material-symbols-outlined text-slate-500">star</span>
                <span className="text-slate-400 text-sm ml-2">(Relatos Antigos)</span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                {product.description || "Forjada a partir dos restos de uma estrela caída no coração do Monte Ignis. Outorgada aos heróis da Primeira Era, agora busca um novo mestre."}
              </p>
              
              <div className="flex items-baseline gap-4 mb-8">
                 <span className="text-4xl font-bold text-white">{Number(product.price).toFixed(0)} <span className="text-primary text-2xl">PO</span></span>
                 {product.price > 1000 && <span className="text-slate-500 line-through">{(product.price * 1.2).toFixed(0)} PO</span>}
              </div>

              {/* RPG Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-[#1a1f26]/70 backdrop-blur-md border border-primary/10 p-4 rounded-xl flex flex-col items-center text-center">
                    <span className="material-symbols-outlined text-primary mb-1">swords</span>
                    <span className="text-xs text-slate-400 uppercase font-bold tracking-tighter">Ataque</span>
                    <span className="text-xl font-bold text-white">842</span>
                </div>
                <div className="bg-[#1a1f26]/70 backdrop-blur-md border border-primary/10 p-4 rounded-xl flex flex-col items-center text-center">
                    <span className="material-symbols-outlined text-accent-blue mb-1">auto_fix_high</span>
                    <span className="text-xs text-slate-400 uppercase font-bold tracking-tighter">Estoque</span>
                    <span className="text-xl font-bold text-white">{product.stock}</span>
                </div>
                <div className="bg-[#1a1f26]/70 backdrop-blur-md border border-primary/10 p-4 rounded-xl flex flex-col items-center text-center">
                    <span className="material-symbols-outlined text-primary mb-1">workspace_premium</span>
                    <span className="text-xs text-slate-400 uppercase font-bold tracking-tighter">Raridade</span>
                    <span className="text-xl font-bold text-white uppercase tracking-wider text-sm mt-1">Épica</span>
                </div>
              </div>

              {/* Buy Actions */}
              <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-gradient-to-br from-primary to-amber-700 w-full py-4 rounded-xl text-black font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                        <span className="material-symbols-outlined">shopping_basket</span>
                        Guardar no Cofre
                  </button>
                  <Link to="/arsenal" className="w-full py-4 text-center rounded-xl border border-primary/30 text-primary font-bold uppercase tracking-widest hover:bg-primary/5 transition-all block">
                        Retornar ao Arsenal
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}