import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Spinner, Alert } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { FaCartPlus, FaMinus, FaPlus } from "react-icons/fa";
import { db } from "../../firebase/config";
import { useCarrito } from "../../context/CarritoContext";
import estilos from "./ProductoDetalle.module.css";

const BotonAgregar = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background-color: var(--color-turquesa, #52c2d4);
  color: var(--color-texto, #1a1a1a);
  border: none;
  border-radius: 50px;
  padding: 0.85rem 2.2rem;
  font-family: var(--font-heading, "Montserrat", sans-serif);
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background-color: var(--color-turquesa-hover, #3ea8b7);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid var(--color-turquesa, #52c2d4);
    outline-offset: 2px;
  }
`;

const ProductoDetalle = () => {
  const { id } = useParams();
  const { agregarACarrito } = useCarrito();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    if (!id) return;

    let cancelado = false;

    const obtenerProducto = async () => {
      setCargando(true);
      setError(null);

      try {
        const docRef = doc(db, "productos", id);
        const snap = await getDoc(docRef);

        if (cancelado) return;

        if (snap.exists()) {
          setProducto({ id: snap.id, ...snap.data() });
        } else {
          setProducto(null);
        }
      } catch (err) {
        if (cancelado) return;
        console.error("Error cargando detalle desde Firestore:", err);
        setError("Ocurrió un error al cargar el producto.");
      } finally {
        if (!cancelado) {
          setCargando(false);
        }
      }
    };

    obtenerProducto();

    return () => {
      cancelado = true;
    };
  }, [id]);

  const manejarAgregarACarrito = () => {
    if (!producto) return;
    agregarACarrito({ producto, cantidad });
    alert(
      `¡Agregaste ${cantidad} unidad(es) de "${producto.nombre}" al carrito!`,
    );
  };

  const incrementar = () => setCantidad((prev) => prev + 1);
  const decrementar = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

  if (cargando) {
    return (
      <div className={estilos.mensaje}>
        <Spinner
          animation="border"
          role="status"
          style={{ color: "var(--color-turquesa, #52c2d4)" }}
        />
        <h3 className="mt-3">Cargando detalle del producto...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className={estilos.contenedor}>
        <Alert variant="danger" role="alert">
          {error}
        </Alert>
      </div>
    );
  }

  if (!producto) {
    return <h3 className={estilos.mensaje}>Producto no encontrado</h3>;
  }

  return (
    <div className={estilos.contenedor}>
      <Helmet>
        <title>{producto.nombre} | Sol de Mayo</title>
        <meta
          name="description"
          content={
            producto.descripcion || `Comprá ${producto.nombre} en Sol de Mayo.`
          }
        />
      </Helmet>

      <div className={estilos.breadcrumbs}>
        <Link to="/" className={estilos.enlaceVolver}>
          Inicio
        </Link>{" "}
        &gt;{" "}
        <Link to="/productos" className={estilos.enlaceVolver}>
          Productos
        </Link>{" "}
        &gt; <span>{producto.nombre}</span>
      </div>

      <div className={estilos.tarjetaDetalle}>
        <div className={estilos.columnaImagen}>
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className={estilos.imagen}
          />
        </div>

        <div className={estilos.columnaInfo}>
          <h1 className={estilos.titulo}>{producto.nombre}</h1>
          <p className={estilos.precio}>
            ${Number(producto.precio)?.toLocaleString("es-AR")}{" "}
            <span className={estilos.moneda}>ARS</span>
          </p>
          <p className={estilos.descripcion}>{producto.descripcion}</p>

          <div className={estilos.acciones}>
            <div className={estilos.selectorCantidad}>
              <button
                type="button"
                className={estilos.botonCantidad}
                onClick={decrementar}
                aria-label="Disminuir cantidad"
              >
                <FaMinus size={12} aria-hidden="true" />
              </button>
              <span className={estilos.numeroCantidad}>{cantidad}</span>
              <button
                type="button"
                className={estilos.botonCantidad}
                onClick={incrementar}
                aria-label="Aumentar cantidad"
              >
                <FaPlus size={12} aria-hidden="true" />
              </button>
            </div>

            <BotonAgregar type="button" onClick={manejarAgregarACarrito}>
              <FaCartPlus aria-hidden="true" />
              <span>AGREGAR AL CARRITO</span>
            </BotonAgregar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;
