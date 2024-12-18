import axios from "axios";

const API_URL = "http://localhost:4000/api/orders";

// Obtener todos los pedidos
export const getAllOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
