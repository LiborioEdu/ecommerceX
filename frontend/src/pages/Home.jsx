import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: "/images/medieval_void_portal_banner.png", // Portal Escuro Medieval (Gerado com IA)
      subtitle: "Temporada IV: O Portal do Vazio",
      title_1: "Desperte sua",
      title_2: "Lenda Interior",
      button_text: "Explorar Forja Certa",
      link: "/arsenal"
    },
    {
      image: "/images/mystical_sword_banner.png", // Espadas Místicas (Gerado com IA)
      subtitle: "Artefatos Lendários",
      title_1: "Lâminas",
      title_2: "Inigualáveis",
      button_text: "Ver Armamento",
      link: "/arsenal"
    },
    {
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop", // Armaduras de Ferro
      subtitle: "Defesa Intransponível",
      title_1: "Armaduras",
      title_2: "Épicas",
      button_text: "Proteger-se",
      link: "/arsenal"
    }
  ];

  useEffect(() => {
    getProducts().then(data => {
      const items = data.results ? data.results : data;
      setProducts(items);
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <Navbar />

      {/* Hero Carousel Section */}
      <section className="relative pt-20">
        <div className="w-full relative h-[600px] overflow-hidden group">
            
            {heroSlides.map((slide, index) => (
               <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                    {/* Imagem com leve zoom */}
                    <img 
                      className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[10000ms] ease-in-out ${index === currentSlide ? 'scale-105' : 'scale-100'}`} 
                      src={slide.image} 
                      alt={slide.title_1} 
                    />
                    
                    {/* Overlay Escuro para Legibilidade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent"></div>
                    
                    {/* Conteudo do Slide Centralizado */}
                    <div className={`absolute inset-0 flex flex-col justify-end items-center text-center pb-24 px-4 z-20 transition-all duration-700 delay-300 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                       <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm">
                          <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(245,158,11,1)]"></span>
                          <span className="text-xs font-bold text-primary uppercase tracking-widest drop-shadow-md">{slide.subtitle}</span>
                       </div>
                       
                       <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none italic uppercase text-white mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                          {slide.title_1} <br/>
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-300 drop-shadow-none">{slide.title_2}</span>
                       </h1>
                       
                       <button onClick={() => window.location.href=slide.link} className="mt-4 bg-gradient-to-br from-primary to-amber-700 px-10 py-4 auto rounded-xl font-bold text-background-dark uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(245,158,11,0.5)] pointer-events-auto">
                            {slide.button_text} <span className="material-symbols-outlined">explore</span>
                       </button>
                    </div>
               </div>
            ))}

            {/* Setas do Carousel (Ocultas por padrão, aparecem no hover) */}
            <button onClick={prevSlide} aria-label="Slide anterior" className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white flex items-center justify-center backdrop-blur-md z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button onClick={nextSlide} aria-label="Próximo slide" className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white flex items-center justify-center backdrop-blur-md z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                <span className="material-symbols-outlined">chevron_right</span>
            </button>

            {/* Dots do Carousel interativos */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-30">
                {heroSlides.map((_, index) => (
                    <button 
                       key={index} 
                       onClick={() => setCurrentSlide(index)}
                       aria-label={`Ir para o slide ${index + 1}`}
                       className={`h-3 rounded-full cursor-pointer transition-all duration-300 ${index === currentSlide ? 'w-8 bg-primary ring-2 ring-primary/50' : 'w-3 bg-white/30 hover:bg-white/50'}`}>
                    </button>
                ))}
            </div>
        </div>
      </section>

      {/* Category Grid Section (Stitch Style Layout) */}
      <section className="py-16 bg-background-dark/95 relative z-20 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
                
                {/* Categ 1 */}
                <div onClick={() => window.location.href='/arsenal'} className="group cursor-pointer bg-card-dark border border-slate-800 hover:border-primary/50 rounded-2xl p-6 flex flex-col items-center text-center transition-all hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(245,158,11,0.1)]">
                    <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-primary text-3xl">shield</span>
                    </div>
                    <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-1">Armaduras</h3>
                    <p className="text-xs text-slate-500">Defesa Intransponível</p>
                </div>

                {/* Categ 2 */}
                <div onClick={() => window.location.href='/arsenal'} className="group cursor-pointer bg-card-dark border border-slate-800 hover:border-accent-blue/50 rounded-2xl p-6 flex flex-col items-center text-center transition-all hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(56,189,248,0.1)]">
                    <div className="w-16 h-16 rounded-full bg-accent-blue/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-accent-blue text-3xl">science</span>
                    </div>
                    <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-1">Poções</h3>
                    <p className="text-xs text-slate-500">Alquimia Mística</p>
                </div>

                {/* Categ 3 */}
                <div onClick={() => window.location.href='/arsenal'} className="group cursor-pointer bg-card-dark border border-slate-800 hover:border-purple-500/50 rounded-2xl p-6 flex flex-col items-center text-center transition-all hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(168,85,247,0.1)]">
                    <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-purple-400 text-3xl">auto_fix_high</span>
                    </div>
                    <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-1">Relíquias</h3>
                    <p className="text-xs text-slate-500">Vestígios Arcanos</p>
                </div>

                {/* Categ 4 */}
                <div onClick={() => window.location.href='/arsenal'} className="group cursor-pointer bg-card-dark border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 flex flex-col items-center text-center transition-all hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(16,185,129,0.1)]">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-emerald-400 text-3xl">menu_book</span>
                    </div>
                    <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-1">Grimórios</h3>
                    <p className="text-xs text-slate-500">O Bestiário Perdido</p>
                </div>

                {/* Categ 5 */}
                <div onClick={() => window.location.href='/arsenal'} className="group cursor-pointer bg-card-dark border border-slate-800 hover:border-rose-500/50 rounded-2xl p-6 flex flex-col items-center text-center transition-all hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(244,63,94,0.1)]">
                    <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-rose-500 text-3xl">swords</span>
                    </div>
                    <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-1">Armas</h3>
                    <p className="text-xs text-slate-500">Arsenal de Guerra</p>
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