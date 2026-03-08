import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        api.get(`products/${id}/`) 
        .then((res) => {
            setProduct(res.data);
        })
        .catch((err) => {
            console.error("Erro ao buscar produto:", err);
        });
    }, [id]);

    if (!product) return <div className="text-white p-10 text-center mt-20">Carregando...</div>

    return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto p-8 flex flex-col md:flex-row gap-8">
        <img 
            src={product.image || "https://via.placeholder.com/600"} 
            className="w-full md:w-1/2 rounded-lg object-cover shadow-2xl" 
            alt={product.name} 
        />
        <div className="flex-1 flex flex-col justify-center">
          <Link to="/" className="text-blue-400 hover:text-blue-300 transition mb-4 inline-block font-semibold">
            ← Voltar para a Loja
          </Link>
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-3xl text-blue-400 font-bold mt-4">R$ {product.price}</p>
          <p className="text-gray-400 mt-6 text-lg leading-relaxed">{product.description}</p>
          
          {/* MODIFICAÇÃO: Botão conectado ao carrinho */}
          <button 
            onClick={() => addToCart(product)}
            className="mt-8 bg-blue-600 hover:bg-blue-500 w-full py-4 rounded-xl font-bold text-lg shadow-lg transition transform active:scale-95"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}