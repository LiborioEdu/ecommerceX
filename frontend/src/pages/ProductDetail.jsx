import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../services/productService";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
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
          <div className="lg:col-span-5 flex flex-col gap-6">
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
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-primary mb-4 drop-shadow-md">{product.name}</h1>
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
                 <span className="text-4xl font-bold text-white">{Number(product.price).toFixed(0)} <span className="text-primary text-2xl">Coin</span></span>
                 {product.price > 1000 && <span className="text-slate-500 line-through">{(product.price * 1.2).toFixed(0)} Coin</span>}
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
                  
                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between bg-[#1a1f26]/70 border border-slate-700/50 rounded-xl p-2 mb-2">
                     <span className="text-slate-400 font-bold ml-4 uppercase text-xs tracking-widest flex items-center gap-2">
                         <span className="material-symbols-outlined text-sm">inventory_2</span>
                         Qtd. do Pedido
                     </span>
                     <div className="flex items-center border border-slate-600 rounded-lg overflow-hidden bg-background-dark">
                         <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center">
                             <span className="material-symbols-outlined text-lg">remove</span>
                         </button>
                         <span className="w-12 text-center font-bold text-lg text-white select-none">{quantity}</span>
                         <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center">
                             <span className="material-symbols-outlined text-lg">add</span>
                         </button>
                     </div>
                  </div>

                  <button 
                    onClick={() => addToCart(product, quantity)}
                    className="bg-gradient-to-br from-primary to-amber-700 w-full py-4 rounded-xl text-black font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                  >
                        <span className="material-symbols-outlined">add_shopping_cart</span>
                        Adicionar ao Carrinho
                  </button>
                  <Link to="/cart" className="w-full py-4 text-center rounded-xl bg-slate-800 border border-slate-700 text-white font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-700 transition-all hover:scale-[1.02] active:scale-95">
                        <span className="material-symbols-outlined">shopping_cart_checkout</span>
                        Comprar Agora
                  </Link>
                  <Link to="/arsenal" className="w-full py-4 text-center rounded-xl border border-primary/30 text-primary font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-primary/5 transition-all">
                        <span className="material-symbols-outlined">swords</span>
                        Retornar ao Arsenal
                  </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Lore and Specs Section (Mocked) */}
        <div className="mt-16 bg-[#1a1f26]/40 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 lg:p-12">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             {/* Lore */}
             <div>
                <h3 className="text-xl font-black text-primary uppercase tracking-widest mb-6 flex items-center gap-3 drop-shadow-sm">
                   <span className="material-symbols-outlined">menu_book</span>
                   Registros do Antigo Reino
                </h3>
                <div className="space-y-4 text-slate-400 leading-relaxed text-sm md:text-base italic bg-slate-900/50 p-6 rounded-xl border border-slate-800/80">
                   <p>"Diz a lenda que este artefato foi forjado nas profundezas do vulcão de Khal'Dur, no ano da grande queda estelar. Os ferreiros que o moldaram verteram não apenas magma em seu núcleo, mas também a própria alma de um dragão ancestral."</p>
                   <p>"Muitos guerreiros tentaram empunhá-lo ao longo dos séculos, mas apenas aqueles com o coração incandescente como a própria chama conseguiram despertar seu verdadeiro poder e sobreviver ao teste do tempo."</p>
                </div>
             </div>

             {/* Specs */}
             <div>
                <h3 className="text-xl font-black text-primary uppercase tracking-widest mb-6 flex items-center gap-3 drop-shadow-sm">
                   <span className="material-symbols-outlined">analytics</span>
                   Propriedades Místicas
                </h3>
                <div className="flex flex-col gap-3">
                   <div className="flex justify-between items-center bg-slate-800/30 p-4 rounded-lg border border-slate-700/50 hover:border-primary/30 transition-colors">
                      <span className="text-slate-400 font-bold">Peso</span>
                      <span className="text-white">4.2 Kg</span>
                   </div>
                   <div className="flex justify-between items-center bg-slate-800/30 p-4 rounded-lg border border-slate-700/50 hover:border-primary/30 transition-colors">
                      <span className="text-slate-400 font-bold">Material Base</span>
                      <span className="text-white">Aço Estelar & Prata Arcana</span>
                   </div>
                   <div className="flex justify-between items-center bg-slate-800/30 p-4 rounded-lg border border-slate-700/50 hover:border-primary/30 transition-colors">
                      <span className="text-slate-400 font-bold">Encantamento Ativo</span>
                      <span className="text-amber-500 font-bold tracking-tight">Vontade de Fogo (Dano Contínuo)</span>
                   </div>
                   <div className="flex justify-between items-center bg-slate-800/30 p-4 rounded-lg border border-slate-700/50 hover:border-primary/30 transition-colors">
                      <span className="text-slate-400 font-bold">Restrição de Classe</span>
                      <span className="text-slate-400">Guerreiros, Paladinos</span>
                   </div>
                </div>
             </div>
           </div>
        </div>
      </main>
    </div>
  );
}