import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import { FaShoppingCart } from "react-icons/fa";
import { useCarrito } from "../../context/CarritoContext";
import estilos from "./Item.module.css";

const BotonComprar = styled.button`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  background-color: var(--color-turquesa, #52c2d4);
  color: var(--color-texto, #1a1a1a);
  border: none;
  padding: 0.65rem 1.2rem;
  border-radius: var(--borde-pildora, 50px);
  font-family: var(--font-heading, "Montserrat", sans-serif);
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background-color: var(--color-turquesa-hover, #3ea8b7);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid var(--color-turquesa, #52c2d4);
    outline-offset: 2px;
  }
`;

const Item = ({ id, nombre, precio, imagen, descripcion }) => {
  const { agregarACarrito } = useCarrito();

  const handleComprar = () => {
    agregarACarrito({
      producto: { id, nombre, precio, imagen, descripcion },
      cantidad: 1,
    });
    alert(`Agregaste ${nombre} al carrito`);
  };

  return (
    <Card as="article" className={`${estilos.tarjeta} border-0`}>
      <Link to={`/producto/${id}`} className="text-decoration-none w-100">
        <div className={estilos.imagenContenedor}>
          <Card.Img
            variant="top"
            src={imagen}
            alt={nombre}
            className={estilos.imagen}
          />
        </div>
        <h3 className={estilos.titulo}>{nombre}</h3>
        <p className={estilos.precio}>
          ${Number(precio)?.toLocaleString("es-AR")}
        </p>
      </Link>

      <div className={estilos.acciones}>
        <BotonComprar type="button" onClick={handleComprar}>
          <FaShoppingCart aria-hidden="true" />
          <span>COMPRAR</span>
        </BotonComprar>
      </div>
    </Card>
  );
};

export default Item;
