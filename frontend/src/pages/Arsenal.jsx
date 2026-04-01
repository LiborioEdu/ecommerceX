import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

export default function Arsenal() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(data => {
      const items = data.results ? data.results : data;
      setProducts(items);
    });
  }, []);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-28 pb-12 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0 space-y-8">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Categoria de Equipamento</h3>
            <div className="space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium cursor-pointer">
                <span className="material-symbols-outlined">category</span> Todos os Equipamentos
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-all cursor-pointer">
                <span className="material-symbols-outlined">shield</span> Armaduras
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-all cursor-pointer">
                <span className="material-symbols-outlined">science</span> Poções
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-all cursor-pointer">
                <span className="material-symbols-outlined">auto_fix_high</span> Relíquias
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-all cursor-pointer">
                <span className="material-symbols-outlined">menu_book</span> Grimórios
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-all cursor-pointer">
                <span className="material-symbols-outlined">swords</span> Armas
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Raridade do Item</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input className="rounded border-slate-700 bg-slate-800 text-primary focus:ring-primary cursor-pointer" type="checkbox"/>
                <span className="text-sm text-slate-400 group-hover:text-slate-100 transition-colors">Comum</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input className="rounded border-slate-700 bg-slate-800 text-primary focus:ring-primary cursor-pointer" type="checkbox"/>
                <span className="text-sm text-slate-400 group-hover:text-slate-100 transition-colors">Incomum</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input className="rounded border-slate-700 bg-slate-800 text-primary focus:ring-primary cursor-pointer" type="checkbox"/>
                <span className="text-sm text-slate-400 group-hover:text-slate-100 transition-colors">Raro</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input className="rounded border-slate-700 bg-slate-800 text-primary focus:ring-primary cursor-pointer" type="checkbox"/>
                <span className="text-sm text-slate-400 group-hover:text-slate-100 transition-colors">Épico</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input className="rounded border-slate-700 bg-slate-800 text-primary focus:ring-primary cursor-pointer" type="checkbox"/>
                <span className="text-sm text-slate-400 group-hover:text-slate-100 transition-colors">Lendário</span>
              </label>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20">
            <p className="text-sm font-bold text-primary mb-1">Dica do Mercador</p>
            <p className="text-xs text-slate-400 leading-relaxed italic">"A Fênix de Brasa brilha mais forte quando um verdadeiro herói se aproxima da loja."</p>
          </div>
        </aside>

        {/* Product Grid Section */}
        <section className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-white mb-1">ARMAMENTO DE ELITE</h2>
              <p className="text-slate-400">Forjado no coração da Montanha Eterna.</p>
            </div>

          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
            {products.length === 0 && (
                <p className="text-slate-500 italic col-span-full">As prateleiras da armaria estão vazias.</p>
            )}
          </div>
        </section>
      </main>

    </div>
  );
}
