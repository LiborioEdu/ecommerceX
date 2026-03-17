import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-card-dark border border-slate-800 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-2xl flex flex-col w-full">
      {/* Imagem com tamanho fixo para não distorcer */}
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-900">
        <img
          src={
            product.image ||
            "https://placehold.co/400x500/1a1f26/f59e0b?text=Mythic+Item"
          }
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-background-dark/80 backdrop-blur-md px-2 py-1 rounded-md border border-white/5">
          <span className="text-primary font-bold text-xs uppercase">
            GP {product.price}
          </span>
        </div>
      </div>

      {/* Conteúdo com padding equilibrado */}
      <div className="p-5 flex flex-col gap-3">
        <h3 className="font-bold text-base text-white group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>

        <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2 h-8">
          {product.description || "Descrição do artefacto lendário..."}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-slate-800 hover:bg-primary text-white hover:text-background-dark font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 group/btn border border-slate-700 hover:border-primary"
        >
          <span
            className="material-symbols-outlined !text-xl group-hover/btn:animate-bounce"
            style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
          >
            pan_tool_alt
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em]">
            Adquirir Item
          </span>
        </button>
      </div>
    </div>
  );
}
