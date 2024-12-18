import axios from "axios";

const API_URL = "http://localhost:4000/api/categories";

// Obtener todas las categorías
export const getAllCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    throw error;
  }
};
