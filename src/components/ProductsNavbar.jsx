import React from "react";
import { Link } from "react-router-dom";

const ProductsNavbar = () => {
    return (
        <nav className="bg-gray-800 text-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Administrar Productos</h1>
                <ul className="flex space-x-4">
                    <li>
                        <Link
                            to="/products/create"
                            className="hover:bg-green-600 bg-green-500 px-3 py-2 rounded"
                        >
                            Crear Producto
                        </Link>
                    </li>
                    
                </ul>
            </div>
        </nav>
    );
};

export default ProductsNavbar;
