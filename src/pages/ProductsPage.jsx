import React, { useEffect, useState, useContext } from "react";
import { getAllProducts } from "../api/products.js";
import { CartContext } from "../context/CartContext"; // Importa el contexto del carrito
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const { addToCart } = useContext(CartContext); // Accede a la función del carrito

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError("Error al obtener los productos");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      {/* Título Principal */}
      <h1 className="text-4xl font-extrabold mb-10 text-center text-blue-400">
        Lista de Productos
      </h1>

      {/* Mensaje de error */}
      {error && <p className="text-red-400 text-center text-lg mb-4">{error}</p>}

      {/* Lista de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <Link
              to={`/products/${product._id}`}
              key={product._id}
              className="bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"
            >
              {/* Imagen del Producto */}
              <img
  src={
    product.imagen_url
      ? `http://localhost:4000/${product.imagen_url.replace(/\\/g, "/")}`
      : "https://via.placeholder.com/400"
  }
  alt={product.nombre}
  className="w-full h-48 object-contain"
/>


              {/* Información del Producto */}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-white truncate">
                  {product.nombre}
                </h2>
                <p className="text-gray-400 mt-2 truncate">
                  {product.descripcion || "Sin descripción"}
                </p>
                <p className="text-blue-400 font-bold text-lg mt-4">
                  ${product.precio}
                </p>

                {/* Botón Añadir al Carrito */}
                <button
                  onClick={(e) => {
                    e.preventDefault(); // Previene la navegación por el link al hacer clic
                    addToCart(product);
                  }}
                  className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full transition duration-300"
                >
                  Añadir al Carrito
                </button>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-400 text-lg col-span-full">
            No hay productos disponibles.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;

