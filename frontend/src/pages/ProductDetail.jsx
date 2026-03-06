import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function ProductDetail() {
    const {id} = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        api.get(`products/${id}/`) 
    .then((res) => {
      setProduct(res.data);
    })
    .catch((err) => {
      console.error("Erro ao buscar produto:", err);
    });
}, [id]);

    if (!product) return <div className="text-white p-10">Carregando...</div>

    return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto p-8 flex flex-col md:flex-row gap-8">
        <img src={product.image} className="w-full md:w-1/2 rounded-lg" alt={product.name} />
        <div className="flex-1">
          <Link to="/" className="text-blue-400 hover:underline">← Voltar</Link>
          <h1 className="text-4xl font-bold mt-4">{product.name}</h1>
          <p className="text-2xl text-blue-400 font-bold mt-2">R$ {product.price}</p>
          <p className="text-gray-400 mt-6 text-lg">{product.description}</p>
          <button className="mt-8 bg-blue-600 hover:bg-blue-500 w-full py-3 rounded-lg font-bold">
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}