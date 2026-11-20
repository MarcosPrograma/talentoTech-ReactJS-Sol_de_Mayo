import { useState } from "react";
import { Row, Col, Alert } from "react-bootstrap";
import styled from "styled-components";
import { FaSave, FaTimes } from "react-icons/fa";
import estilos from "./GestionProductos.module.css";

const crearEstadoInicial = (producto) => ({
  nombre: producto?.nombre ?? "",
  categoria: producto?.categoria ?? "",
  precio: producto?.precio ?? "",
  stock: producto?.stock ?? "",
  imagen: producto?.imagen ?? "",
});

const BotonFormBase = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  border: none;
  border-radius: 50px;
  padding: 0.75rem 1.8rem;
  font-family: var(--font-heading, "Montserrat", sans-serif);
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease,
    opacity 0.2s ease;

  &:focus-visible {
    outline: 2px solid var(--color-turquesa, #52c2d4);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

const BotonGuardarForm = styled(BotonFormBase)`
  background-color: ${({ $edicion }) =>
    $edicion ? "#f39c12" : "var(--color-turquesa, #52c2d4)"};
  color: #ffffff;

  &:hover:not(:disabled) {
    background-color: ${({ $edicion }) =>
      $edicion ? "#d68910" : "var(--color-turquesa-hover, #3ea8b7)"};
    transform: translateY(-2px);
  }
`;

const BotonCancelarForm = styled(BotonFormBase)`
  background-color: #95a5a6;
  color: #ffffff;
  padding: 0.75rem 1.4rem;

  &:hover:not(:disabled) {
    background-color: #7f8c8d;
  }
`;

const FormularioProducto = ({
  productoAEditar,
  onGuardarProducto,
  onCancelarEdicion,
  enviando,
}) => {
  const [formData, setFormData] = useState(() =>
    crearEstadoInicial(productoAEditar),
  );
  const [errorForm, setErrorForm] = useState("");

  const esEdicion = Boolean(productoAEditar);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validarDatos = () => {
    const nombreLimpio = formData.nombre.trim();
    const precioNumerico = Number(formData.precio);
    const stockNumerico = formData.stock === "" ? 0 : Number(formData.stock);

    if (!nombreLimpio) {
      return "El nombre del producto es obligatorio";
    }

    if (Number.isNaN(precioNumerico) || precioNumerico <= 0) {
      return "El precio debe ser un valor numérico mayor que cero";
    }

    if (Number.isNaN(stockNumerico) || stockNumerico < 0) {
      return "El stock no puede ser negativo";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mensajeError = validarDatos();

    if (mensajeError) {
      setErrorForm(mensajeError);
      alert(mensajeError);
      return;
    }

    setErrorForm("");

    const productoPreparado = {
      nombre: formData.nombre.trim(),
      categoria: formData.categoria.trim(),
      precio: Number(formData.precio),
      stock: formData.stock === "" ? 0 : Number(formData.stock),
      imagen: formData.imagen.trim() || "/images/icon-sol_de_mayo.png",
    };

    const exito = await onGuardarProducto(
      productoPreparado,
      productoAEditar?.id,
    );
    if (exito && !productoAEditar) {
      setFormData(crearEstadoInicial(null));
    }
  };

  return (
    <section
      className={`${estilos.formulario} ${
        esEdicion ? estilos.formularioEdicion : ""
      }`}
    >
      <h3 className={estilos.tituloFormulario}>
        <span>{esEdicion ? "Editar Producto" : "Agregar Nuevo Producto"}</span>
        {esEdicion && <span className={estilos.badgeEdicion}>Editando</span>}
      </h3>

      <form onSubmit={handleSubmit} noValidate>
        <Row className="g-3 mb-3">
          <Col xs={12} md={6}>
            <div className={estilos.campo}>
              <label htmlFor="nombre" className={estilos.label}>
                Nombre *
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                className={estilos.input}
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: Yerba Mate Orgánica"
              />
            </div>
          </Col>

          <Col xs={12} md={6}>
            <div className={estilos.campo}>
              <label htmlFor="categoria" className={estilos.label}>
                Categoría
              </label>
              <input
                id="categoria"
                name="categoria"
                type="text"
                className={estilos.input}
                value={formData.categoria}
                onChange={handleChange}
                placeholder="Ej: Almacén"
              />
            </div>
          </Col>

          <Col xs={12} sm={6} md={4}>
            <div className={estilos.campo}>
              <label htmlFor="precio" className={estilos.label}>
                Precio *
              </label>
              <input
                id="precio"
                name="precio"
                type="number"
                step="0.01"
                min="0.01"
                className={estilos.input}
                value={formData.precio}
                onChange={handleChange}
                placeholder="Ej: 4500"
              />
            </div>
          </Col>

          <Col xs={12} sm={6} md={4}>
            <div className={estilos.campo}>
              <label htmlFor="stock" className={estilos.label}>
                Stock
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                className={estilos.input}
                value={formData.stock}
                onChange={handleChange}
                placeholder="Ej: 15"
              />
            </div>
          </Col>

          <Col xs={12} md={4}>
            <div className={estilos.campo}>
              <label htmlFor="imagen" className={estilos.label}>
                URL o ruta de imagen
              </label>
              <input
                id="imagen"
                name="imagen"
                type="text"
                className={estilos.input}
                value={formData.imagen}
                onChange={handleChange}
                placeholder="/images/Banner.png"
              />
            </div>
          </Col>
        </Row>

        {errorForm && (
          <Alert variant="danger" role="alert" className="py-2 mb-3">
            {errorForm}
          </Alert>
        )}

        <div className={estilos.contenedorBotonesForm}>
          {esEdicion && (
            <BotonCancelarForm
              type="button"
              onClick={onCancelarEdicion}
              disabled={enviando}
            >
              <FaTimes aria-hidden="true" />
              <span>Cancelar Edición</span>
            </BotonCancelarForm>
          )}

          <BotonGuardarForm
            type="submit"
            $edicion={esEdicion}
            disabled={enviando}
          >
            <FaSave aria-hidden="true" />
            <span>
              {enviando
                ? "Guardando..."
                : esEdicion
                  ? "Actualizar Producto"
                  : "Agregar Producto"}
            </span>
          </BotonGuardarForm>
        </div>
      </form>
    </section>
  );
};

export default FormularioProducto;
