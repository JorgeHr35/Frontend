import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/products.js";
import { CartContext } from "../context/CartContext";

const ProductDetailPage = () => {
  const { id } = useParams(); // Obtener el ID del producto desde la URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const { addToCart } = useContext(CartContext); // Contexto del carrito

  // Obtener detalles del producto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError("Error al obtener el producto.");
      }
    };

    fetchProduct();
  }, [id]);

  if (error) return <p className="text-red-400 text-center text-lg mt-8">{error}</p>;
  if (!product) return <p className="text-gray-400 text-center text-lg mt-8">Cargando...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      {/* Contenido del producto */}
      <div className="flex flex-col md:flex-row items-center bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        
        {/* Imagen del Producto */}
        <div className="flex-shrink-0 w-full md:w-1/3">
          <img
            src={
              product.imagen_url
                ? `http://localhost:4000/${product.imagen_url.replace(/\\/g, "/")}`
                : "https://via.placeholder.com/400"
            }
            alt={product.nombre}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Información del Producto */}
        <div className="p-6 flex-1">
          <h1 className="text-4xl font-extrabold text-blue-300 mb-4">{product.nombre}</h1>
          <p className="text-gray-300 text-lg mb-4">{product.descripcion}</p>
          <p className="text-green-400 font-bold text-2xl mb-4">
            Precio: ${product.precio}
          </p>
          <p className="text-gray-400 text-lg mb-2">
            Categoría:{" "}
            <span className="text-blue-400">
              {product.categoria?.nombre || "Sin categoría"}
            </span>
          </p>
          <p className="text-gray-400 text-lg mb-4">
            Stock disponible:{" "}
            <span className="text-green-400 font-semibold">{product.stock}</span>
          </p>

          {/* Botón "Añadir al carrito" */}
          <button
            onClick={() => addToCart(product)}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg transition duration-300 text-lg w-full md:w-auto"
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

