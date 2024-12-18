import React, { useEffect, useState, useContext } from "react";
import { getPedidosByCliente } from "../api/pedidos.js";
import { AuthContext } from "../context/AuthContext.jsx";

const PedidosPage = () => {
  const [pedidos, setPedidos] = useState([]);
  const { token } = useContext(AuthContext);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const data = await getPedidosByCliente("clienteId", token); // Reemplaza con el ID real
        setPedidos(data);
      } catch (err) {
        setError("Error al obtener los pedidos");
      }
    };

    fetchPedidos();
  }, [token]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Mis Pedidos</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="space-y-4">
        {pedidos.length === 0 ? (
          <p className="text-gray-500 text-center">No tienes pedidos aún.</p>
        ) : (
          pedidos.map((pedido) => (
            <div key={pedido._id} className="p-4 bg-white rounded shadow">
              <h2 className="text-lg font-bold">Pedido ID: {pedido._id}</h2>
              <p>Fecha: {new Date(pedido.fecha_pedido).toLocaleDateString()}</p>
              <p>Estado: {pedido.estado}</p>
              <ul className="mt-2">
                {pedido.detalles.map((detalle, index) => (
                  <li key={index}>
                    {detalle.producto} - Cantidad: {detalle.cantidad} - Precio:
                    ${detalle.precio_unitario}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PedidosPage;
