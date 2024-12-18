import React, { useState } from "react";
import { register } from "../api/auth.js";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [form, setForm] = useState({
        nombre: "",
        correo_electronico: "",
        contrasena: "",
    });

    const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito
    const [errorMessage, setErrorMessage] = useState(""); // Estado para mensajes de error
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
        try {
            const response = await register(form);
            setSuccessMessage("¡Usuario registrado exitosamente!");
            setTimeout(() => {
                navigate("/products");
            }, 2000);
        } catch (error) {
            setErrorMessage(
                error.response?.data?.error || "Error al registrarse. Inténtalo nuevamente."
            );
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md">
                <h2 className="text-3xl font-extrabold text-center mb-6 text-white">
                    Registrarse
                </h2>

                {/* Mensajes */}
                {successMessage && (
                    <div className="p-4 mb-4 text-sm text-green-400 bg-green-800 rounded-lg">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="p-4 mb-4 text-sm text-red-400 bg-red-800 rounded-lg">
                        {errorMessage}
                    </div>
                )}

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium mb-2">
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="nombre"
                            id="nombre"
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                            placeholder="Tu nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="correo_electronico" className="block text-sm font-medium mb-2">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            name="correo_electronico"
                            id="correo_electronico"
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                            placeholder="correo@example.com"
                            value={form.correo_electronico}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="contrasena" className="block text-sm font-medium mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="contrasena"
                            id="contrasena"
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                            placeholder="********"
                            value={form.contrasena}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Botón Registrarse */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition duration-300"
                    >
                        Registrarse
                    </button>
                </form>

                {/* Enlace a Iniciar Sesión */}
                <p className="text-sm text-center mt-6">
                    ¿Ya tienes una cuenta?{" "}
                    <a
                        href="/login"
                        className="text-blue-400 hover:text-blue-500 font-medium"
                    >
                        Inicia Sesión
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
