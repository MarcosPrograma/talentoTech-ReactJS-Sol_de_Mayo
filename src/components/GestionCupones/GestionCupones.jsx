import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { FaTicketAlt, FaPlusCircle, FaTrash } from "react-icons/fa";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import estilos from "./GestionCupones.module.css";

const BotonAccion = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  border: none;
  cursor: pointer;
  font-family: var(--font-heading, "Montserrat", sans-serif);
  font-weight: 700;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease,
    opacity 0.2s ease;

  &:focus-visible {
    outline: 2px solid var(--color-turquesa, #52c2d4);
    outline-offset: 2px;
  }
`;

const BotonGuardar = styled(BotonAccion)`
  background-color: var(--color-turquesa, #52c2d4);
  color: #ffffff;
  border-radius: 50px;
  padding: 0.75rem 1.8rem;
  font-size: 0.9rem;

  &:hover:not(:disabled) {
    background-color: var(--color-turquesa-hover, #3ea8b7);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

const BotonEliminarCupon = styled(BotonAccion)`
  background-color: #e74c3c;
  color: #ffffff;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;

  &:hover {
    background-color: #c0392b;
    transform: translateY(-1px);
  }
`;

const GestionCupones = () => {
  const [cupones, setCupones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    codigo: "",
    descuento: "",
  });

  useEffect(() => {
    let cancelado = false;

    const obtenerCupones = async () => {
      try {
        const cuponesCollection = collection(db, "cupones");
        const respuesta = await getDocs(cuponesCollection);
        if (cancelado) return;

        const lista = respuesta.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setCupones(lista);
        setError(null);
      } catch (err) {
        if (!cancelado) {
          console.error("Error al cargar cupones:", err);
          setError("Ocurrió un error al cargar los cupones");
        }
      } finally {
        if (!cancelado) {
          setCargando(false);
        }
      }
    };

    obtenerCupones();

    return () => {
      cancelado = true;
    };
  }, []);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!form.codigo.trim() || !form.descuento) {
      alert("Por favor, ingresa el código como el porcentaje de descuento");
      return;
    }

    setGuardando(true);
    try {
      const cuponesCollection = collection(db, "cupones");
      const nuevoCupon = {
        codigo: form.codigo.trim().toUpperCase(),
        descuento: Number(form.descuento),
      };

      const docRef = await addDoc(cuponesCollection, nuevoCupon);
      setCupones((prev) => [...prev, { id: docRef.id, ...nuevoCupon }]);
      setForm({ codigo: "", descuento: "" });
      alert("Cupón creado con éxito");
    } catch (err) {
      console.error("Error al guardar:", err);
      alert("Hubo un error al intentar guardar el cupón");
    } finally {
      setGuardando(false);
    }
  };

  const manejarEliminar = async (id, codigo) => {
    const confirmacion = window.confirm(
      `¿Estás seguro de que deseas eliminar "${codigo}"?`,
    );
    if (!confirmacion) return;

    try {
      const docRef = doc(db, "cupones", id);
      await deleteDoc(docRef);
      setCupones((prev) => prev.filter((item) => item.id !== id));
      alert("Cupón eliminado correctamente");
    } catch (err) {
      console.error("Error al eliminar cupón", err);
      alert("No se pudo borrar el cupón");
    }
  };

  return (
    <Container className={estilos.contenedor}>
      <Helmet>
        <title>Administración de Cupones | Sol de Mayo</title>
        <meta
          name="description"
          content="Creá y administrá cupones de descuento para la tienda Sol de Mayo."
        />
      </Helmet>

      <h2 className={estilos.tituloPrincipal}>
        <FaTicketAlt aria-hidden="true" className="me-2" />
        Administración de Cupones
      </h2>

      <form onSubmit={manejarEnvio} className={estilos.formulario}>
        <h3 className={estilos.tituloFormulario}>Crear Cupón de Descuento</h3>
        <Row className="g-3 align-items-center">
          <Col xs={12} md={6}>
            <label htmlFor="codigo-cupon" className="visually-hidden">
              Código del cupón
            </label>
            <input
              id="codigo-cupon"
              type="text"
              name="codigo"
              placeholder="Código del cupón (ej: MARADONA10)"
              value={form.codigo}
              onChange={manejarCambio}
              className={estilos.inputCodigo}
              required
            />
          </Col>
          <Col xs={12} sm={6} md={3}>
            <label htmlFor="descuento-cupon" className="visually-hidden">
              Porcentaje de descuento
            </label>
            <input
              id="descuento-cupon"
              type="number"
              name="descuento"
              placeholder="% Descuento (ej: 15)"
              value={form.descuento}
              onChange={manejarCambio}
              min="1"
              max="100"
              className={estilos.inputDescuento}
              required
            />
          </Col>
          <Col xs={12} sm={6} md={3} className="d-grid">
            <BotonGuardar type="submit" disabled={guardando}>
              <FaPlusCircle aria-hidden="true" />
              <span>{guardando ? "Guardando..." : "Guardar Cupón"}</span>
            </BotonGuardar>
          </Col>
        </Row>
      </form>

      <h3 className={estilos.tituloListado}>Cupones registrados</h3>

      {cargando ? (
        <div className="py-4 text-center" role="status" aria-live="polite">
          <Spinner animation="border" role="status" aria-hidden="true" />
          <p className={`${estilos.mensaje} mt-2 mb-0`}>Cargando cupones...</p>
        </div>
      ) : error ? (
        <Alert variant="danger" role="alert">
          {error}
        </Alert>
      ) : cupones.length === 0 ? (
        <p className={estilos.mensaje}>No hay cupones registrados</p>
      ) : (
        <ul className={estilos.listaCupones}>
          {cupones.map((c) => (
            <li key={c.id} className={estilos.itemCupon}>
              <div className={estilos.infoCupon}>
                <span className={estilos.codigo}>{c.codigo}</span>
                <span className={estilos.descuento}>
                  Descuento: {c.descuento}%
                </span>
              </div>
              <BotonEliminarCupon
                type="button"
                onClick={() => manejarEliminar(c.id, c.codigo)}
                aria-label={`Eliminar cupón ${c.codigo}`}
              >
                <FaTrash aria-hidden="true" />
                <span>Eliminar</span>
              </BotonEliminarCupon>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default GestionCupones;
