import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, rolesPermitidos = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        Cargando sesión...
      </p>
    );
  }

  if (!user || (rolesPermitidos.length > 0 && !rolesPermitidos.includes(user.rol))) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
