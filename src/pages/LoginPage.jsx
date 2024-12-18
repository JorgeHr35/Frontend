import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
    const [correo_electronico, setCorreoElectronico] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [mensaje, setMensaje] = useState(null);
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ correo_electronico, contrasena });
            login(response.token, { name: "Usuario", role: "cliente" });
            setMensaje({ text: "¡Inicio de sesión exitoso!", type: "success" });
        } catch (error) {
            setMensaje({
                text: error.response?.data?.error || "Error al iniciar sesión",
                type: "error",
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            {/* Contenedor principal */}
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
                {/* Título */}
                <h2 className="text-3xl font-bold mb-6 text-center">Bienvenido</h2>
                
                {/* Mensajes */}
                {mensaje && (
                    <div
                        className={`p-4 mb-4 text-sm rounded ${
                            mensaje.type === "success" ? "text-green-400 bg-green-800" : "text-red-400 bg-red-800"
                        }`}
                    >
                        {mensaje.text}
                    </div>
                )}

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                            placeholder="Ingresa tu correo"
                            value={correo_electronico}
                            onChange={(e) => setCorreoElectronico(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                            placeholder="Ingresa tu contraseña"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-400">
                                Recuérdame
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300"
                    >
                        Iniciar Sesión
                    </button>
                </form>

                {/* Enlace de registro */}
                <p className="mt-6 text-center text-sm text-gray-400">
                    ¿No tienes una cuenta?{" "}
                    <a href="/register" className="text-blue-400 hover:text-blue-500 font-medium">
                        Regístrate aquí
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
