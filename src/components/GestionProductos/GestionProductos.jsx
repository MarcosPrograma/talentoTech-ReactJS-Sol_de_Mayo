import { useState, useEffect } from "react";
import { Container, Spinner, Alert, Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { FaBoxes, FaEdit, FaTrash } from "react-icons/fa";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import FormularioProducto from "./FormularioProducto";
import estilos from "./GestionProductos.module.css";

const COLECCION_PRODUCTOS = "productos";

const BotonAccionLista = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-family: var(--font-heading, "Montserrat", sans-serif);
  font-weight: 600;
  font-size: 0.85rem;
  color: #ffffff;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.15s ease;

  &:focus-visible {
    outline: 2px solid var(--color-turquesa, #52c2d4);
    outline-offset: 2px;
  }
`;

const BotonEditarProd = styled(BotonAccionLista)`
  background-color: #3498db;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-1px);
  }
`;

const BotonEliminarProd = styled(BotonAccionLista)`
  background-color: #e74c3c;

  &:hover {
    background-color: #c0392b;
    transform: translateY(-1px);
  }
`;

const GestionProductos = () => {
  const [productos, setProductos] = useState([]);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);
  const [recargar, setRecargar] = useState(0);

  useEffect(() => {
    let cancelado = false;

    const cargarProductos = async () => {
      try {
        const productosRef = collection(db, COLECCION_PRODUCTOS);
        const snapshot = await getDocs(productosRef);
        if (cancelado) return;

        const lista = snapshot.docs.map((documento) => ({
          id: documento.id,
          ...documento.data(),
        }));
        setProductos(lista);
        setError(null);
      } catch (err) {
        if (cancelado) return;
        console.error("Error al obtener productos:", err);
        setError("No se pudieron cargar los productos desde Firebase.");
      } finally {
        if (!cancelado) {
          setCargando(false);
        }
      }
    };

    cargarProductos();

    return () => {
      cancelado = true;
    };
  }, [recargar]);

  const handleReintentar = () => {
    setCargando(true);
    setError(null);
    setRecargar((prev) => prev + 1);
  };

  const handleGuardarProducto = async (datosProducto, idEdicion) => {
    setEnviando(true);
    setError(null);

    try {
      if (idEdicion) {
        const docRef = doc(db, COLECCION_PRODUCTOS, idEdicion);
        await updateDoc(docRef, datosProducto);
        setProductos((prev) =>
          prev.map((prod) =>
            prod.id === idEdicion ? { id: idEdicion, ...datosProducto } : prod,
          ),
        );
        setProductoAEditar(null);
        alert("Producto actualizado con éxito.");
      } else {
        const productosRef = collection(db, COLECCION_PRODUCTOS);
        const docCreado = await addDoc(productosRef, datosProducto);
        setProductos((prev) => [
          ...prev,
          { id: docCreado.id, ...datosProducto },
        ]);
        alert("Producto agregado con éxito.");
      }
      return true;
    } catch (err) {
      console.error("Error al guardar producto:", err);
      const msg = "Ocurrió un error al guardar el producto en Firebase.";
      setError(msg);
      alert(msg);
      return false;
    } finally {
      setEnviando(false);
    }
  };

  const handleDelete = async (producto) => {
    const confirmacion = window.confirm(
      `¿Estás seguro de que deseás eliminar "${producto.nombre}"? Esta acción no se puede deshacer.`,
    );

    if (!confirmacion) return;

    setError(null);
    try {
      const docRef = doc(db, COLECCION_PRODUCTOS, producto.id);
      await deleteDoc(docRef);
      setProductos((prev) => prev.filter((item) => item.id !== producto.id));
      if (productoAEditar?.id === producto.id) {
        setProductoAEditar(null);
      }
      alert("Producto eliminado con éxito.");
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      const msg = "No se pudo eliminar el producto de Firebase.";
      setError(msg);
      alert(msg);
    }
  };

  return (
    <Container className={estilos.contenedor}>
      <Helmet>
        <title>Gestión de Productos | Sol de Mayo</title>
        <meta
          name="description"
          content="Panel de administración para crear, editar y eliminar productos en Sol de Mayo."
        />
      </Helmet>

      <h2 className={estilos.tituloPrincipal}>
        <FaBoxes aria-hidden="true" className="me-2" />
        Gestión de Productos
      </h2>

      {error && (
        <Alert
          variant="danger"
          role="alert"
          className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4"
        >
          <span>{error}</span>
          <Button
            type="button"
            variant="outline-danger"
            size="sm"
            onClick={handleReintentar}
          >
            Reintentar
          </Button>
        </Alert>
      )}

      <FormularioProducto
        key={productoAEditar?.id ?? "nuevo-producto"}
        productoAEditar={productoAEditar}
        onGuardarProducto={handleGuardarProducto}
        onCancelarEdicion={() => setProductoAEditar(null)}
        enviando={enviando}
      />

      <section>
        <h3 className={estilos.tituloListado}>Catálogo actual</h3>

        {cargando ? (
          <div className="py-4 text-center" role="status" aria-live="polite">
            <Spinner animation="border" role="status" aria-hidden="true" />
            <p className={`${estilos.mensaje} mt-2 mb-0`}>
              Cargando productos...
            </p>
          </div>
        ) : productos.length === 0 ? (
          <p className={estilos.mensaje}>
            No hay productos cargados en el catálogo.
          </p>
        ) : (
          <ul className={estilos.listaProductos}>
            {productos.map((prod) => (
              <li key={prod.id} className={estilos.itemProducto}>
                <div className={estilos.infoProducto}>
                  <img
                    src={prod.imagen || "/images/icon-sol_de_mayo.png"}
                    alt={prod.nombre}
                    className={estilos.miniatura}
                  />
                  <div className={estilos.detallesTexto}>
                    <span className={estilos.nombre}>{prod.nombre}</span>
                    <span className={estilos.meta}>
                      {prod.categoria ? `${prod.categoria} · ` : ""}$
                      {Number(prod.precio).toLocaleString("es-AR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                      {prod.stock !== undefined
                        ? ` · Stock: ${prod.stock}`
                        : ""}
                    </span>
                  </div>
                </div>

                <div className={estilos.acciones}>
                  <BotonEditarProd
                    type="button"
                    onClick={() => setProductoAEditar(prod)}
                    aria-label={`Editar ${prod.nombre}`}
                  >
                    <FaEdit aria-hidden="true" />
                    <span>Editar</span>
                  </BotonEditarProd>

                  <BotonEliminarProd
                    type="button"
                    onClick={() => handleDelete(prod)}
                    aria-label={`Eliminar ${prod.nombre}`}
                  >
                    <FaTrash aria-hidden="true" />
                    <span>Eliminar</span>
                  </BotonEliminarProd>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Container>
  );
};

export default GestionProductos;
