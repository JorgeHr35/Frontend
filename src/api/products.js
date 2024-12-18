import API from "./axiosInstance";

// Obtener productos
export const getAllProducts = async () => (await API.get("/products")).data;

// Obtener producto por ID
export const getProductById = async (id) => (await API.get(`/products/${id}`)).data;

// Crear producto
export const createProduct = async (productData) => {
  const response = await API.post("/products", productData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Actualizar producto
export const updateProduct = async (id, productData) => {
  const response = await API.put(`/products/${id}`, productData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Eliminar producto
export const deleteProduct = async (id) => (await API.delete(`/products/${id}`)).data;

