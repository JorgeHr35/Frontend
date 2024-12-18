import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import {
  IoPerson,
  IoLogOut,
  IoLogIn,
  IoPersonAdd,
  IoCart,
  IoBag,
  IoLayers,
  IoClipboard,
} from "react-icons/io5";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext); // Accede al carrito
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 shadow-md py-4 px-6 rounded-lg flex justify-between items-center">
      {/* Logo */}
      <Link
        to="/"
        className="text-xl font-bold text-white hover:text-blue-400 transition"
      >
        Tienda Deportiva
      </Link>

      {/* Menú principal */}
      <div className="flex items-center gap-x-6 text-white">
        {token ? (
          <>
            {/* Solo muestra estos enlaces si el usuario está autenticado */}
            <Link
              to="/products"
              className="hover:text-blue-400 flex items-center gap-x-1 transition"
            >
              <IoBag size={20} /> Productos
            </Link>
            <Link
              to="/inventory"
              className="hover:text-blue-400 flex items-center gap-x-1 transition"
            >
              <IoLayers size={20} /> Inventario
            </Link>
            <Link
              to="/categories"
              className="hover:text-blue-400 flex items-center gap-x-1 transition"
            >
              <IoClipboard size={20} /> Categorías
            </Link>
            <Link
              to="/orders"
              className="hover:text-blue-400 flex items-center gap-x-1 transition"
            >
              <IoCart size={20} /> Mis Pedidos
            </Link>

            {/* Carrito de compras */}
            <Link
              to="/cart"
              className="relative hover:text-blue-400 flex items-center transition"
            >
              <IoCart size={20} />
              <span className="ml-1 bg-red-500 text-white rounded-full px-2 text-xs absolute -top-2 -right-3">
                {cart.length}
              </span>
              <span className="ml-2">Carrito</span>
            </Link>

            {/* Administrar Productos */}
            <Link
              to="/admin/products"
              className="hover:text-blue-400 flex items-center gap-x-1 transition"
            >
              Administrar Productos
            </Link>

            {/* Menú Usuario */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-lg transition"
              >
                <IoPerson size={24} className="text-blue-400" />
                <span>Usuario</span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-md w-48 z-10">
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200"
                  >
                    <IoLogOut size={20} className="inline-block mr-2" /> Cerrar
                    Sesión
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Si no ha iniciado sesión, muestra solo estas opciones */}
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg flex items-center gap-x-1 transition"
            >
              <IoLogIn size={20} /> Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg flex items-center gap-x-1 transition"
            >
              <IoPersonAdd size={20} /> Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
