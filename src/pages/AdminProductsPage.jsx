import React, { useEffect, useState } from "react";
import addPhotoIcon from "../assets/addphoto.svg";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/products.js";
import { getAllCategories } from "../api/categories.js";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    imagen: null, // Guardar la imagen en Base64
  });
  const [editMode, setEditMode] = useState(false);
  const [productId, setProductId] = useState(null);
  const [error, setError] = useState("");

  // Obtener productos y categorías al cargar la página
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      setError("Error al obtener los productos");
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      setError("Error al obtener las categorías");
    }
  };

  // Manejar cambios en el formulario, incluido el manejo de imágenes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "imagen" && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64Image = reader.result.split(",")[1]; // Eliminar el prefijo Base64
        setFormData({ ...formData, imagen: base64Image });
      };

      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Enviar los datos del formulario al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: formData.precio,
        categoria: formData.categoria,
        imagen_base64: formData.imagen, // Imagen en Base64
      };

      if (editMode) {
        await updateProduct(productId, productData);
        setEditMode(false);
      } else {
        await createProduct(productData);
      }

      setFormData({
        nombre: "",
        descripcion: "",
        precio: "",
        categoria: "",
        imagen: null,
      });

      fetchProducts(); // Actualizar lista de productos
    } catch (err) {
      setError("Error al guardar el producto");
    }
  };

  const handleEdit = (product) => {
    setFormData({
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: product.precio,
      categoria: product.categoria?._id || "",
      imagen: null,
    });
    setProductId(product._id);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      setError("Error al eliminar el producto");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-400">
        Administrar Productos
      </h1>

      {error && <p className="text-red-400 text-center mb-6">{error}</p>}

      {/* Formulario */}
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-blue-300 text-center">
          {editMode ? "Editar Producto" : "Crear Producto"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del Producto"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            name="descripcion"
            placeholder="Descripción del Producto"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-400"
            required
            rows="4"
          />
          <input
            type="number"
            name="precio"
            placeholder="Precio"
            value={formData.precio}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Seleccione una categoría</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.nombre}
              </option>
            ))}
          </select>

          <div className="flex items-center justify-center">
            <label htmlFor="fileInput" className="cursor-pointer">
              <img
                src={addPhotoIcon}
                alt="Agregar Imagen"
                className="w-20 h-20 object-contain border border-gray-600 rounded-full hover:border-blue-400"
              />
            </label>
            <input
              id="fileInput"
              type="file"
              name="imagen"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition duration-300"
          >
            {editMode ? "Actualizar Producto" : "Crear Producto"}
          </button>
        </form>
      </div>

      {/* Lista de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300"
          >
            <img
              src={
                product.imagen_base64
                  ? data:image/png;base64,${product.imagen_base64}
                  : "https://via.placeholder.com/400x300"
              }
              alt={product.nombre}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-blue-300 mb-2 truncate">
                {product.nombre}
              </h2>
              <p className="text-gray-400 mb-2 truncate">{product.descripcion}</p>
              <p className="text-blue-400 font-bold mb-4">
                Precio: ${product.precio}
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-4 rounded-lg transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-lg transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductsPage;
