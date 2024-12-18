import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  // Calcular el total del carrito
  const total = cart.reduce((sum, item) => sum + item.precio, 0);

  // Lógica para crear un pedido
  const handleCreateOrder = async () => {
    try {
      const productos = cart.map((item) => ({
        producto: item._id,
        cantidad: 1, // Asume cantidad fija de 1
      }));

      const response = await axios.post("http://localhost:4000/api/orders", {
        productos,
        total,
      });

      alert("Pedido creado exitosamente");
      console.log("Pedido creado:", response.data);
      clearCart(); // Vacía el carrito tras la compra
    } catch (error) {
      console.error("Error al crear el pedido:", error);
      alert("Hubo un error al realizar la compra");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-400">
        Carrito de Compras
      </h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-400 text-xl">
          Tu carrito está vacío.
        </p>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Lista de Productos */}
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-800 shadow-lg rounded-lg p-4 transition duration-300 hover:shadow-2xl"
              >
                <div>
                  <h2 className="text-lg font-semibold text-blue-300">
                    {item.nombre}
                  </h2>
                  <p className="text-gray-400 mt-1">Precio: ${item.precio}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-300"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          {/* Resumen del Carrito */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-300">Total:</h2>
              <span className="text-3xl font-extrabold text-green-400">
                ${total.toFixed(2)}
              </span>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={clearCart}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Vaciar Carrito
              </button>
              <button
                onClick={handleCreateOrder}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Comprar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

