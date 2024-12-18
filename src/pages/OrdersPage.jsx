import React, { useEffect, useState } from "react";
import { getAllOrders } from "../api/orders.js";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (err) {
        console.error("Error al obtener pedidos:", err);
        setError("Error al obtener los pedidos.");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-400">
        Mis Pedidos
      </h1>

      {error && (
        <p className="text-red-400 text-center text-lg mb-6">{error}</p>
      )}

      {orders.length === 0 ? (
        <p className="text-gray-400 text-center text-xl">
          No tienes pedidos creados.
        </p>
      ) : (
        <div className="space-y-6 max-w-5xl mx-auto">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-2xl transition duration-300"
            >
              <h2 className="text-2xl font-bold text-blue-300 mb-3">
                Pedido ID: {order._id}
              </h2>
              <p className="text-gray-400">
                Fecha: {new Date(order.fecha).toLocaleString()}
              </p>
              <p className="font-semibold text-lg mt-4 text-gray-300">
                Productos:
              </p>
              <ul className="list-disc ml-6 text-gray-400">
                {order.productos.map((item) => (
                  <li key={item._id} className="mt-2">
                    <span className="text-blue-400 font-medium">
                      {item.producto?.nombre}
                    </span>{" "}
                    - Cantidad: {item.cantidad} -{" "}
                    <span className="text-green-400 font-bold">
                      ${item.producto?.precio}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="font-extrabold text-green-400 mt-6 text-xl">
                Total: ${order.total}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
