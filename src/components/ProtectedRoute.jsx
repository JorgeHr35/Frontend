import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { token, user } = useContext(AuthContext);

  if (!token) {
    console.warn("Usuario no autenticado");
    return <Navigate to="/login" replace />;
  }

  if (role && user?.rol !== role) {
    console.warn(`Acceso denegado. Rol requerido: ${role}, actual: ${user?.rol}`);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
