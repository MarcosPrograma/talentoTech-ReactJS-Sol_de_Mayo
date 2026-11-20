import { InputGroup, Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useSearch } from "../../context/SearchContext";

const ContenedorBusqueda = styled.div`
  max-width: 540px;
  margin: 0 auto 2rem;

  .input-group {
    border-radius: var(--borde-pildora, 50px);
    overflow: hidden;
    background-color: var(--bg-blanco, #ffffff);
    box-shadow: var(--sombra-tarjeta, 0 4px 15px rgba(0, 0, 0, 0.05));
    border: 1px solid var(--border, #e8e2db);
  }

  .input-group-text {
    background-color: var(--bg-blanco, #ffffff);
    border: none;
    color: var(--color-turquesa, #52c2d4);
    padding-left: 1.15rem;
  }

  .form-control {
    border: none;
    box-shadow: none;
    font-family: var(--font-body, "Inter", sans-serif);
    font-size: 0.95rem;
    color: var(--color-texto, #1a1a1a);
    background-color: var(--bg-blanco, #ffffff);
    padding: 0.7rem 0.75rem;

    &:focus {
      box-shadow: none;
    }

    &::placeholder {
      color: var(--color-mutado, #6b6b6b);
    }
  }
`;

const BotonLimpiar = styled(Button)`
  background-color: transparent;
  border: none;
  color: var(--color-mutado, #6b6b6b);
  padding-right: 1.15rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover,
  &:focus {
    background-color: transparent;
    color: var(--color-texto, #1a1a1a);
    box-shadow: none;
  }
`;

const SearchBar = ({ placeholder = "Buscar productos por nombre..." }) => {
  const { busqueda, setBusqueda, limpiarBusqueda } = useSearch();

  return (
    <ContenedorBusqueda>
      <InputGroup>
        <InputGroup.Text id="icono-busqueda">
          <FaSearch aria-hidden="true" />
        </InputGroup.Text>
        <Form.Control
          type="search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder={placeholder}
          aria-label="Buscar productos por nombre"
          aria-describedby="icono-busqueda"
        />
        {busqueda && (
          <BotonLimpiar
            type="button"
            onClick={limpiarBusqueda}
            aria-label="Limpiar búsqueda"
            title="Limpiar búsqueda"
          >
            <FaTimes aria-hidden="true" />
          </BotonLimpiar>
        )}
      </InputGroup>
    </ContenedorBusqueda>
  );
};

export default SearchBar;