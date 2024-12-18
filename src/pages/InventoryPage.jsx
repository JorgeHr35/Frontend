import React, { useEffect, useState } from "react";
import axios from "axios";

const InventoryPage = () => {
    const [inventory, setInventory] = useState([]);
    const [error, setError] = useState("");
    const [updateStock, setUpdateStock] = useState({});

    // Obtener inventario desde el backend
    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/inventory");
                setInventory(response.data);
            } catch (err) {
                setError("Error al cargar el inventario");
            }
        };
        fetchInventory();
    }, []);

    // Actualizar stock de un producto
    const handleUpdateStock = async (id) => {
        try {
            await axios.put(`http://localhost:4000/api/inventory/${id}`, {
                stock: updateStock[id],
            });
            alert("Stock actualizado correctamente");
            window.location.reload(); // Recargar página para actualizar la vista
        } catch (err) {
            setError("Error al actualizar el stock");
        }
    };

    // Manejar cambios en el campo de stock
    const handleChange = (id, value) => {
        setUpdateStock({ ...updateStock, [id]: value });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-400">
                Gestión de Inventario
            </h1>
            {error && (
                <p className="text-red-400 text-center text-lg mb-4">{error}</p>
            )}

            <div className="overflow-x-auto bg-gray-800 shadow-2xl rounded-lg p-6">
                <table className="min-w-full table-auto rounded-lg">
                    {/* Encabezado de la tabla */}
                    <thead className="bg-blue-600 text-white uppercase text-sm">
                        <tr>
                            <th className="py-4 px-6 text-left">Nombre</th>
                            <th className="py-4 px-6 text-left">Categoría</th>
                            <th className="py-4 px-6 text-center">Stock</th>
                            <th className="py-4 px-6 text-center">Acciones</th>
                        </tr>
                    </thead>
                    {/* Cuerpo de la tabla */}
                    <tbody className="divide-y divide-gray-700">
                        {inventory.map((item) => (
                            <tr
                                key={item._id}
                                className="hover:bg-gray-700 transition duration-300"
                            >
                                <td className="py-4 px-6 text-gray-300 font-medium">
                                    {item.nombre}
                                </td>
                                <td className="py-4 px-6 text-gray-400">
                                    {item.categoria}
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <input
                                        type="number"
                                        min="0"
                                        defaultValue={item.stock}
                                        onChange={(e) =>
                                            handleChange(item._id, e.target.value)
                                        }
                                        className="w-20 bg-gray-700 text-white text-center border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <button
                                        onClick={() => handleUpdateStock(item._id)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                                    >
                                        Actualizar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InventoryPage;
