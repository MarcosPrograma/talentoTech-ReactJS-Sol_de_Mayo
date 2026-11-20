import { useState } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingCart,
  FaCheckCircle,
} from "react-icons/fa";
import { useCarrito } from "../../context/CarritoContext";

const BotonComprar = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  background-color: var(--color-turquesa, #52c2d4);
  color: var(--color-texto, #1a1a1a);
  border: none;
  border-radius: var(--borde-pildora, 50px);
  padding: 0.75rem 1.5rem;
  font-family: var(--font-heading, "Montserrat", sans-serif);
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background-color: var(--color-turquesa-hover, #3ea8b7);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid var(--color-turquesa, #52c2d4);
    outline-offset: 2px;
  }
`;

const Carrito = () => {
  const {
    carrito,
    vaciarCarrito,
    eliminarDelCarrito,
    incrementarCantidad,
    decrementarCantidad,
    cobroTotal,
  } = useCarrito();

  const navigate = useNavigate();
  const [compraExitosa, setCompraExitosa] = useState(false);

  const manejarCompra = () => {
    const totalAbonar = cobroTotal();
    vaciarCarrito();
    setCompraExitosa(true);
    alert(
      `¡Gracias por tu compra en Sol de Mayo! Total: $${Number(
        totalAbonar
      ).toLocaleString("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    );
    navigate("/");
  };

  if (carrito.length === 0) {
    return (
      <Container className="py-5 text-center">
        <Helmet>
          <title>Carrito vacío | Sol de Mayo</title>
          <meta
            name="description"
            content="Tu carrito de compras en Sol de Mayo está vacío. Explorá nuestros productos."
          />
        </Helmet>
        {compraExitosa && (
          <Alert variant="success" className="mb-3">
            ¡Tu compra se realizó con éxito!
          </Alert>
        )}
        <Alert variant="light" className="border shadow-sm p-4">
          <FaShoppingCart
            size={32}
            className="mb-2 text-muted"
            aria-hidden="true"
          />
          <h1 className="h3 mb-2">El carrito está vacío</h1>
          <p className="text-muted mb-3">
            Agregá productos desde el catálogo para comenzar tu pedido.
          </p>
          <Button as={Link} to="/productos" variant="dark">
            Ir a Productos
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Helmet>
        <title>Carrito de Compras | Sol de Mayo</title>
        <meta
          name="description"
          content="Revisá las cantidades, subtotales y el total de tu compra en Sol de Mayo."
        />
      </Helmet>

      <h1 className="h2 fw-bold mb-4">Carrito de Compras</h1>

      <Row className="g-4">
        <Col xs={12} lg={8}>
          <div className="d-flex flex-column gap-3">
            {carrito.map((item) => {
              const precioUnitario = Number(item.precio) || 0;
              const subtotal = precioUnitario * item.cantidad;

              return (
                <Card key={item.id} className="shadow-sm">
                  <Card.Body>
                    <Row className="align-items-center g-3">
                      <Col xs={4} sm={3} md={2}>
                        <img
                          src={item.imagen || item.image}
                          alt={item.nombre}
                          className="img-fluid rounded"
                          style={{
                            width: "76px",
                            height: "76px",
                            objectFit: "cover",
                          }}
                        />
                      </Col>

                      <Col xs={8} sm={5} md={5}>
                        <h2 className="h6 fw-semibold mb-1">{item.nombre}</h2>
                        <p className="text-muted small mb-1">
                          Precio unitario: $
                          {precioUnitario.toLocaleString("es-AR")}
                        </p>
                        <p className="fw-semibold mb-0">
                          Subtotal: $
                          {subtotal.toLocaleString("es-AR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </Col>

                      <Col xs={7} sm={4} md={3}>
                        <div
                          className="d-inline-flex align-items-center gap-2"
                          role="group"
                          aria-label={`Cantidad de ${item.nombre}`}
                        >
                          <Button
                            type="button"
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => decrementarCantidad(item.id)}
                            aria-label={`Disminuir cantidad de ${item.nombre}`}
                          >
                            <FaMinus size={12} aria-hidden="true" />
                          </Button>

                          <span className="fw-semibold px-1" aria-live="polite">
                            {item.cantidad}
                          </span>

                          <Button
                            type="button"
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => incrementarCantidad(item.id)}
                            aria-label={`Aumentar cantidad de ${item.nombre}`}
                          >
                            <FaPlus size={12} aria-hidden="true" />
                          </Button>
                        </div>
                      </Col>

                      <Col xs={5} sm={12} md={2} className="text-end">
                        <Button
                          type="button"
                          variant="outline-danger"
                          size="sm"
                          onClick={() => eliminarDelCarrito(item.id)}
                          title="Eliminar producto"
                          aria-label={`Eliminar ${item.nombre} del carrito`}
                        >
                          <FaTrash aria-hidden="true" />
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </Col>

        <Col xs={12} lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="h5 fw-bold mb-3">Resumen del pedido</h2>
              <hr />
              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="fw-semibold">Total</span>
                <span className="h4 fw-bold mb-0">
                  $
                  {cobroTotal().toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className="d-grid gap-2">
                <BotonComprar type="button" onClick={manejarCompra}>
                  <FaCheckCircle aria-hidden="true" />
                  <span>Comprar</span>
                </BotonComprar>

                <Button
                  type="button"
                  variant="outline-danger"
                  onClick={vaciarCarrito}
                  aria-label="Vaciar todo el carrito"
                >
                  <FaTrash className="me-2" aria-hidden="true" />
                  Vaciar Carrito
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Carrito;
