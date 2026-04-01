import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Arsenal from "./pages/Arsenal";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile"
import PrivateRoute from "./components/PrivateRoute"
import Checkout from "./pages/Checkout"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/arsenal" element={<Arsenal />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route 
        path="/cart" 
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        } 
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rota protegida: Só entra quem tem o token */}
      <Route 
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route 
        path="/checkout" 
        element={
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        } 
      />
        
    </Routes>
  );
}

export default App;