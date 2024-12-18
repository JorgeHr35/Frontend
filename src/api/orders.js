import API from "./axiosInstance";

// Obtener todos los pedidos
export const getAllOrders = async () => {
  try {
    const response = await API.get("/orders");
    return response.data;
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    throw error;
  }
};
