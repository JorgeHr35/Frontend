import axios from "axios";

const API_URL = "http://localhost:4000/api/auth";

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        console.error("Error en la API de registro:", error.response?.data || error.message);
        throw error;
    }
};

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        console.error("Error en la API de inicio de sesión:", error.response?.data || error.message);
        throw error;
    }
};
