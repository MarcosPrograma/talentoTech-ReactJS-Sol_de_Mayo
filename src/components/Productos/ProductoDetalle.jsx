import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import estilos from "./ProductoDetalle.module.css";

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    fetch("/data/productos.json")
      .then((res) => res.json())
      .then((data) => {
        const encontrado = data.find((p) => String(p.id) === String(id));
        setProducto(encontrado);
      })
      .catch((err) => console.error("Error cargando detalle", err))
      .finally(() => setCargando(false));
  }, [id]);

  /* Falta Agregar un botón Agregar al carrito */

  const incrementar = () => setCantidad((prev) => prev + 1);
  const decrementar = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

  if (cargando)
    return <h3 className={estilos.mensaje}>Cargando detalle del producto</h3>;
  if (!producto)
    return <h3 className={estilos.mensaje}>Producto no encontrado</h3>;

  return (
    <div className={estilos.contenedor}>
      <div className={estilos.breadcrumbs}>
        <Link to="/" className={estilos.enlaceVolver}>
          Inicio
        </Link>
        &gt;{" "}
        <Link to="/productos" className={estilos.enlaceVolver}>
          Productos
        </Link>
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
            ${producto.precio?.toLocaleString("es-AR")}
            <span className={estilos.moneda}>ARS</span>
          </p>
          <p className={estilos.descripcion}>{producto.descripcion}</p>
        </div>

        <div className={estilos.acciones}>
          <div className={estilos.selectorCantidad}>
            <button className={estilos.botonCantidad} onClick={decrementar}>
              -
            </button>
            <span>{cantidad}</span>
            <button className={estilos.botonCantidad} onClick={incrementar}>
              +
            </button>
          </div>

          <button
            className={estilos.botonComprar}
            onClick={() =>
              alert(
                `¡Agregaste ${cantidad} unidad(es) de "${producto.nombre}" al carrito!`,
              )
            }
          >
            COMPRAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;
