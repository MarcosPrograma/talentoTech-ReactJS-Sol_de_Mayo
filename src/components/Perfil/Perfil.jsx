import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import  estilos  from "./Perfil.module.css";

const BotonCerrarSesion = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #e74c3c;
  color: #ffffff;
  border: none;
  border-radius: 50px;
  padding: 0.8rem 2.2rem;
  font-family: var(--font-heading, "Montserrat", sans-serif);
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background-color: #c0392b;
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid #e74c3c;
    outline-offset: 3px;
  }
`;

const Perfil = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const manejarCierreSesion = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Hubo un problema al cerrar la sesión");
    }
  };

  return (
    <div className={estilos.contenedor}>
      <Helmet>
        <title>Mi Perfil | Sol de Mayo</title>
        <meta
          name="description"
          content="Consultá los datos de tu cuenta y gestioná tu sesión en Sol de Mayo."
        />
      </Helmet>

      <div className={estilos.tarjeta}>
        <div className={estilos.iconoUsuario} aria-hidden="true">
          <FaUserCircle />
        </div>
        <h2 className={estilos.titulo}>
          ¡Hola de nuevo, <span className={estilos.email}>{user?.email}</span>!
        </h2>
        <p className={estilos.subtitulo}>
          Bienvenido/a a tu espacio personal en <strong>Sol de Mayo</strong>
        </p>

        <div className={estilos.detalles}>
          <p>
            <strong>ID de Usuario:</strong> {user?.uid}
          </p>
          <p>
            <strong>Rol:</strong> {user?.rol || "user"}
          </p>
          <p className="mb-0">
            <strong>Estado de cuenta:</strong> Autenticado
          </p>
        </div>

        <BotonCerrarSesion type="button" onClick={manejarCierreSesion}>
          <FaSignOutAlt aria-hidden="true" />
          <span>Cerrar Sesión</span>
        </BotonCerrarSesion>
      </div>
    </div>
  );
};

export default Perfil;
