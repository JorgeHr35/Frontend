import React, { useState, useEffect } from "react";
import { getAllProducts } from "../api/products.js";
import { createPedido } from "../api/pedidos.js";

const CreatePedidoPage = () => {
  const [products, setProducts] = useState([]); // Lista de productos
  const [selectedProducts, setSelectedProducts] = useState([]); // Productos seleccionados
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError("Error al obtener los productos");
      }
    };

    fetchProducts();
  }, []);

  const handleProductSelect = (product) => {
    const exists = selectedProducts.find((p) => p.id === product._id);
    if (!exists) {
      setSelectedProducts([
        ...selectedProducts,
        { id: product._id, nombre: product.nombre, cantidad: 1 },
      ]);
    }
  };

  const handleQuantityChange = (id, cantidad) => {
    setSelectedProducts(
      selectedProducts.map((p) =>
        p.id === id ? { ...p, cantidad: parseInt(cantidad) } : p
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Token de autenticación

    if (!token) {
      alert("Debe iniciar sesión para crear un pedido");
      return;
    }

    try {
      const pedidoData = {
        detalles: selectedProducts.map((p) => ({
          producto: p.id,
          cantidad: p.cantidad,
          precio_unitario: products.find((prod) => prod._id === p.id)?.precio,
        })),
      };

      await createPedido(pedidoData, token);
      alert("Pedido creado exitosamente");
      setSelectedProducts([]);
    } catch (error) {
      setError("Error al crear el pedido");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Crear Pedido</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Lista de productos */}
        <div>
          <h2 className="text-lg font-bold mb-2">Seleccionar Productos</h2>
          <ul>
            {products.map((product) => (
              <li
                key={product._id}
                className="flex justify-between p-2 border-b"
              >
                <span>{product.nombre}</span>
                <button
                  onClick={() => handleProductSelect(product)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  Agregar
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Productos seleccionados */}
        <div>
          <h2 className="text-lg font-bold mb-2">Productos Seleccionados</h2>
          <form onSubmit={handleSubmit}>
            {selectedProducts.length === 0 && (
              <p className="text-gray-500">No hay productos seleccionados</p>
            )}
            {selectedProducts.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center p-2 border-b"
              >
                <span>{product.nombre}</span>
                <input
                  type="number"
                  value={product.cantidad}
                  min="1"
                  onChange={(e) =>
                    handleQuantityChange(product.id, e.target.value)
                  }
                  className="w-16 border rounded text-center"
                />
              </div>
            ))}
            {selectedProducts.length > 0 && (
              <button
                type="submit"
                className="bg-blue-500 text-white mt-4 px-4 py-2 rounded hover:bg-blue-600"
              >
                Crear Pedido
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePedidoPage;