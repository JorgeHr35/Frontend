import API from "./axiosInstance.js";

// Crear un pedido
export const createPedido = async (pedidoData, token) => {
  const response = await API.post("/pedidos", pedidoData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Obtener los pedidos de un cliente
export const getPedidosByCliente = async (clienteId, token) => {
  const response = await API.get(`/pedidos/${clienteId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};