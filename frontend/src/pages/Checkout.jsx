/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, total, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleFinishOrder = async () => {
    try {
      const orderData = {
        total_price: total,
        items: cart.map(item => ({
          product: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      };

      await api.post("orders/", orderData);
      alert("Pedido realizado com sucesso!");
      clearCart();
      navigate("/profile");
    } catch (error) {
      alert("Erro ao processar o tesouro. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Finalizar Compra</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        <p className="text-xl mb-4">Total da Jornada: <span className="text-green-400">R$ {total.toFixed(2)}</span></p>
        <button 
          onClick={handleFinishOrder}
          className="bg-green-600 hover:bg-green-700 w-full py-3 rounded-lg font-bold"
        >
          Confirmar e Pagar
        </button>
      </div>
    </div>
  );
}