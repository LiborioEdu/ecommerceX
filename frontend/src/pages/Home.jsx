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
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <main className="container mx-auto p-8">
        <h2 className="text-3xl font-bold text-white mb-8">
          Nossos Produtos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;