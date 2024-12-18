import axios from "axios";

const API_URL = "http://localhost:4000/api/products";

// Obtener productos
export const getAllProducts = async () => (await axios.get(API_URL)).data;

// Obtener producto por ID
export const getProductById = async (id) => (await axios.get(`${API_URL}/${id}`)).data;

// Crear producto
export const createProduct = async (productData) => {
  const response = await axios.post(API_URL, productData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_URL}/${id}`, productData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Eliminar producto
export const deleteProduct = async (id) => (await axios.delete(`${API_URL}/${id}`)).data;
