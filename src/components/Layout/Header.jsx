import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import styled from "styled-components";
import {
  FaShoppingCart,
  FaSignOutAlt,
  FaUserShield,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useCarrito } from "../../context/CarritoContext";
import "./Header.css";

const BotonSalir = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: transparent;
  border: 1px solid var(--color-texto);
  color: var(--color-texto);
  border-radius: var(--borde-pildora, 50px);
  padding: 0.35rem 0.9rem;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: var(--color-turquesa);
    border-color: var(--color-turquesa);
    color: #ffffff;
  }

  &:focus-visible {
    outline: 2px solid var(--color-turquesa);
    outline-offset: 2px;
  }
`;

const Header = () => {
  const { user, logout } = useAuth();
  const { itemsEnCarrito } = useCarrito();
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const totalItems = itemsEnCarrito();

  const cerrarMenu = () => setMenuAbierto(false);

  const handleLogout = async () => {
    cerrarMenu();
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="header">
      <Navbar
        expand="lg"
        expanded={menuAbierto}
        onToggle={(estaAbierto) => setMenuAbierto(estaAbierto)}
        className="header__navbar py-2"
      >
        <Container className="header__contenedor">
          <Navbar.Brand
            as={Link}
            to="/"
            className="header__logo m-0"
            onClick={cerrarMenu}
          >
            <img
              src="/images/icon-sol_de_mayo.png"
              alt="Sol de Mayo"
              className="header__logo-img"
            />
            <span>Sol de Mayo</span>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="menu-principal"
            aria-label={menuAbierto ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            className="header__toggle"
          >
            {menuAbierto ? (
              <FaTimes size={20} aria-hidden="true" />
            ) : (
              <FaBars size={20} aria-hidden="true" />
            )}
          </Navbar.Toggle>

          <Navbar.Collapse id="menu-principal" className="header__nav">
            <ul>
              <li>
                <Link to="/" onClick={cerrarMenu}>
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/productos" onClick={cerrarMenu}>
                  Productos
                </Link>
              </li>
              <li>
                <a href="/#equipo" onClick={cerrarMenu}>
                  Nosotros
                </a>
              </li>
              <li>
                <a href="/#contacto" onClick={cerrarMenu}>
                  Contacto
                </a>
              </li>

              {user ? (
                <>
                  {user.rol === "admin" && (
                    <>
                      <li>
                        <Link to="/admin/productos" onClick={cerrarMenu}>
                          <FaUserShield aria-hidden="true" className="me-1" />
                          <span>Gestión</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/cupones" onClick={cerrarMenu}>
                          Cupones
                        </Link>
                      </li>
                    </>
                  )}
                  <li>
                    <Link to="/perfil" onClick={cerrarMenu}>
                      <FaUser aria-hidden="true" className="me-1" />
                      <span>Mi Perfil</span>
                    </Link>
                  </li>
                  <li>
                    <BotonSalir type="button" onClick={handleLogout}>
                      <FaSignOutAlt aria-hidden="true" />
                      <span>Cerrar Sesión</span>
                    </BotonSalir>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" onClick={cerrarMenu}>
                      Iniciar Sesión
                    </Link>
                  </li>
                  <li>
                    <Link to="/registro" onClick={cerrarMenu}>
                      Registrarse
                    </Link>
                  </li>
                </>
              )}

              <li>
                <Link
                  to="/carrito"
                  className="header__cart-icon"
                  title="Carrito"
                  aria-label={`Carrito con ${totalItems} productos`}
                  onClick={cerrarMenu}
                >
                  <FaShoppingCart size={20} aria-hidden="true" />
                  {totalItems > 0 && (
                    <span className="header__cart-badge">{totalItems}</span>
                  )}
                </Link>
              </li>
            </ul>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;