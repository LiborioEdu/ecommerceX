import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Cart() {
  // eslint-disable-next-line no-unused-vars
  const { cart, cartCount } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Seu Carrinho</h1>

        {cart.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-400">O carrinho está vazio.</p>
            <Link to="/" className="text-blue-400 hover:underline mt-4 inline-block">Voltar a comprar</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold">{item.name}</h2>
                    <p className="text-blue-400">R$ {item.price} x {item.quantity}</p>
                  </div>
                  <p className="text-xl font-bold">R$ {(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg h-fit">
              <h2 className="text-2xl font-bold mb-4">Resumo</h2>
              <div className="flex justify-between text-lg mb-6">
                <span>Total:</span>
                <span className="text-green-400 font-bold text-2xl">R$ {total.toFixed(2)}</span>
              </div>
              <button className="w-full bg-green-600 hover:bg-green-500 py-3 rounded-lg font-bold transition">
                Finalizar Compra
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}