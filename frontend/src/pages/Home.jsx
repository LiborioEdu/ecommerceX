import { useEffect } from "react";
import { useState } from "react";
import { getProducts } from "../services/productService";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(data => setProducts(data));
  }, []);

  return (
    // Mudamos bg-gray-950 para a nossa variável bg-background-dark
    <div className="min-h-screen bg-background-dark font-display text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Task 4: Cabeçalho Estilizado (Substituindo o h2 antigo) */}
        <header className="mb-16 space-y-4">
          <div className="flex items-center gap-3">
            {/* A linha dourada decorativa */}
            <span className="w-12 h-[1px] bg-primary"></span>
            <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em]">
              Mercadorias de Elite
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                Arsenal <span className="text-primary italic">Lendário</span>
              </h1>
              <p className="text-slate-500 text-sm max-w-md mt-4 leading-relaxed font-medium">
                Explore artefactos forjados em brasas místicas. Itens únicos para aventureiros que buscam a glória eterna na Terra Média.
              </p>
            </div>

            {/* O "Status da Guilda" que aparece na direita na imagem */}
            <div className="flex items-center gap-4 bg-card-dark border border-slate-800 p-3 rounded-2xl shadow-xl">
               <div className="bg-slate-900 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-primary text-xl">inventory_2</span>
               </div>
               <div className="flex flex-col pr-4">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Disponível</span>
                  <span className="text-sm font-bold">{products.length} Itens Raros</span>
               </div>
            </div>
          </div>
        </header>

        {/* Grid de Produtos - Ajustamos o gap para 8 para dar mais espaço */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-start">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;