import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 flex flex-col h-full">
      
      {/* 1. Link na Imagem */}
      <Link to={`/product/${product.id}`}>
        <img 
          src={product.image || "https://via.placeholder.com/300"} 
          alt={product.name} 
          className="w-full h-48 object-cover hover:opacity-90 transition cursor-pointer"
        />
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        {/* 2. Link no Título (Removi o H2 duplicado que estava lá fora) */}
        <Link to={`/product/${product.id}`}>
          <h2 className="text-xl font-semibold text-white truncate hover:text-blue-400 transition cursor-pointer">
            {product.name}
          </h2>
        </Link>

        <p className="text-gray-400 text-sm mt-1 h-10 overflow-hidden">
          {product.description}
        </p>

        <div className="mt-auto pt-4 flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-400">R$ {product.price}</span>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition">
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}