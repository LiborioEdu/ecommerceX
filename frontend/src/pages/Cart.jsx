import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Cart() {
  // 1. Pegamos as novas funções que você adicionou no Context
  const { cart, removeFromCart, updateQuantity } = useCart();

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
                <div key={item.id} className="bg-gray-800 p-4 rounded-lg flex flex-col md:flex-row justify-between items-center gap-4">
                  {/* Informações do Produto */}
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <img 
                      src={item.image || "https://via.placeholder.com/150"} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded" 
                    />
                    <div>
                      <h2 className="text-xl font-bold">{item.name}</h2>
                      <p className="text-blue-400 font-semibold">R$ {item.price}</p>
                    </div>
                  </div>

                  {/* Controles de Quantidade e Remoção */}
                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                    <div className="flex items-center border border-gray-600 rounded overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 transition"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 font-bold border-x border-gray-600">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 transition"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-xl font-bold min-w-[100px] text-right">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>

                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-400 transition p-2"
                      title="Remover item"
                    >
                      <span className="text-xl font-bold">✕</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg h-fit shadow-2xl sticky top-8">
              <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Resumo</h2>
              <div className="space-y-2 mb-6 text-gray-400">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete:</span>
                  <span className="text-green-400 font-bold uppercase text-sm italic">Grátis</span>
                </div>
              </div>
              <div className="flex justify-between text-lg mb-8 border-t border-gray-700 pt-4">
                <span className="font-bold">Total:</span>
                <span className="text-blue-400 font-bold text-3xl">R$ {total.toFixed(2)}</span>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold text-lg shadow-lg transition transform active:scale-95">
                Finalizar Compra
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}