import API from "./axiosInstance";

// Registro de usuario
export const register = async (userData) => {
  try {
    const response = await API.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error en la API de registro:", error.response?.data || error.message);
    throw error;
  }
};

// Inicio de sesión
export const login = async (credentials) => {
  try {
    const response = await API.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Error en la API de inicio de sesión:", error.response?.data || error.message);
    throw error;
  }
};
