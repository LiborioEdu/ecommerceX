import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

export default function Home() {
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-xs font-bold text-primary uppercase tracking-widest">Temporada IV: O Portal do Vazio</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none italic uppercase">
                  Desperte sua <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Lenda Interior</span>
              </h1>
              <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
                  Domine o arcano e conquiste o campo de batalha com armamentos obras-primas, forjados nos confins do Reino das Sombras.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => window.location.href='/arsenal'} className="bg-gradient-to-br from-primary to-amber-700 px-8 py-4 rounded-lg font-bold text-background-dark uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                    Entrar na Armaria <span className="material-symbols-outlined">double_arrow</span>
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full"></div>
              <img className="relative z-10 w-full drop-shadow-[0_0_50px_rgba(59,130,246,0.3)]" alt="Espada mítica brilhante" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfQosidHYafiL4Z7jmxvWSCZBlVz1VCF2K9kA4mrJX27mwK1wrNQ_KuwoJQDR6gl2CajFL4EcquFz4_QgntTLyIACtDPv_xZQH3OeKfsimxTee2T_gaVU0QMSnYMXP6emqW-ZRKDT3fV1UcT-upuP0M0HkAROslLsuT4g4FsxgBcoKR9jXe2hRjusyc_8aNak-bEePAsB887osTo8k4oCRu1cP6HV50Zg6-VXv4zmO2if5tzHYbIaNGGJImyDuOXuxoa_4jr-29XNK"/>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gear */}
      <section className="py-20 bg-background-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-primary text-sm font-bold uppercase tracking-[0.3em] mb-2">Artefatos em Destaque</h2>
              <h3 className="text-4xl font-extrabold italic uppercase tracking-tight">Equipamentos Inigualáveis</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
            {products.length === 0 && (
                <p className="text-slate-500 italic col-span-full">As fornalhas estão resfriando no momento...</p>
            )}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-background-dark border-t border-slate-800 pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
                  <p>© 2026 MythicForge Guilda de Mercadores. Todos os direitos reservados no Reino.</p>
              </div>
          </div>
      </footer>

    </div>
  );
}