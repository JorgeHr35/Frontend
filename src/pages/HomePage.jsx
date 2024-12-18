import React from "react";

const HomePage = () => {
    return (
        <div className="h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
            {/* Contenedor Principal */}
            <div className="bg-gray-800 p-10 rounded-lg shadow-2xl max-w-md text-center">
                {/* Título Principal */}
                <h1 className="text-4xl font-extrabold mb-6">
                    ¡Bienvenido a mi Tienda Deportiva!
                </h1>

                {/* Texto Informativo */}
                <p className="text-lg mb-6 leading-relaxed text-gray-300">
                    Explora los mejores productos y ofertas para tus actividades deportivas.
                </p>

                {/* Botón de Acción */}
                <a
                    href="/products"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                >
                    Ver Productos
                </a>
            </div>
        </div>
    );
};

export default HomePage;


