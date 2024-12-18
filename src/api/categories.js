import API from "./axiosInstance";

// Obtener todas las categorías
export const getAllCategories = async () => {
  try {
    const response = await API.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    throw error;
  }
};
