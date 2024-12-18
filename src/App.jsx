import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductsPage from "./pages/ProductsPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext"; // Importa el CartProvider
import ProductDetailPage from "./pages/ProductDetailPage";
import InventoryPage from "./pages/InventoryPage";
import CategoriesPage from "./pages/CategoriesPage";
import CartPage from "./pages/CartPage"; // Página del carrito
import OrdersPage from "./pages/OrdersPage.jsx";


const App = () => {
  return (
    <AuthProvider>
      <CartProvider> {/* Proporciona el carrito */}
        <Navbar />
        <div className="pt-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
