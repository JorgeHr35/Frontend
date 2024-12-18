import React, { useEffect, useState } from "react";
import axios from "axios";

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/categories");
            setCategories(res.data);
        } catch (err) {
            setError("Error al obtener las categorías");
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:4000/api/categories", { nombre, descripcion });
            fetchCategories();
            setNombre("");
            setDescripcion("");
        } catch (err) {
            setError("Error al crear la categoría");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/categories/${id}`);
            fetchCategories();
        } catch (err) {
            setError("Error al eliminar la categoría");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-10 text-blue-400">
                    Gestión de Categorías
                </h1>
                {error && (
                    <p className="text-red-400 text-center font-medium mb-4">{error}</p>
                )}

                {/* Formulario */}
                <form
                    onSubmit={handleCreate}
                    className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
                >
                    <h2 className="text-2xl font-semibold text-blue-300 mb-6">
                        Nueva Categoría
                    </h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Nombre de la categoría"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
                        />
                        <textarea
                            placeholder="Descripción de la categoría"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            rows="3"
                            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Crear Categoría
                        </button>
                    </div>
                </form>

                {/* Lista de Categorías */}
                <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-semibold text-blue-300 mb-6">
                        Categorías Existentes
                    </h2>
                    {categories.length === 0 ? (
                        <p className="text-gray-400 text-center">
                            No hay categorías disponibles.
                        </p>
                    ) : (
                        <ul className="space-y-4">
                            {categories.map((category) => (
                                <li
                                    key={category._id}
                                    className="flex justify-between items-start bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition duration-300"
                                >
                                    <div>
                                        <h3 className="text-lg font-semibold text-blue-300">
                                            {category.nombre}
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            {category.descripcion}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(category._id)}
                                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                                    >
                                        Eliminar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoriesPage;
