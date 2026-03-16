/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      // Verifica se o produto já está no carrinho
      const itemExists = prevCart.find((item) => item.id === product.id);
      if (itemExists) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  }

  const updateQuantity = (productId, amount) => {
    setCart((prevCart) => prevCart.map(item => {
      if (item.id === productId) {
        const newQty = item.quantity + amount;
        return {...item, quantity: newQty >  0 ? newQty : 1};
      }
      return item;
    }));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, total, addToCart, clearCart, cartCount, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);