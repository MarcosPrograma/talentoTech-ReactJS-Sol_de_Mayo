import { Pagination } from "react-bootstrap";
import styled from "styled-components";

const ContenedorPaginador = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  margin-top: 2.5rem;

  .pagination {
    gap: 0.35rem;
    margin-bottom: 0;
    flex-wrap: wrap;
    justify-content: center;
  }

  .page-item .page-link {
    border-radius: 50px;
    min-width: 40px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-heading, "Montserrat", sans-serif);
    font-weight: 700;
    font-size: 0.9rem;
    color: var(--color-texto, #1a1a1a);
    background-color: var(--bg-blanco, #ffffff);
    border: 1px solid var(--border, #e8e2db);
    transition: background-color 0.2s ease, color 0.2s ease, transform 0.15s ease;

    &:hover:not(:disabled) {
      background-color: var(--bg-principal, #f4eee0);
      border-color: var(--color-turquesa, #52c2d4);
      color: var(--color-texto, #1a1a1a);
      transform: translateY(-1px);
    }

    &:focus-visible {
      outline: 2px solid var(--color-turquesa, #52c2d4);
      outline-offset: 2px;
      box-shadow: none;
    }
  }

  .page-item.active .page-link {
    background-color: var(--color-turquesa, #52c2d4);
    border-color: var(--color-turquesa, #52c2d4);
    color: var(--color-texto, #1a1a1a);
  }

  .page-item.disabled .page-link {
    opacity: 0.5;
    background-color: var(--bg-blanco, #ffffff);
  }
`;

const TextoPagina = styled.span`
  font-size: 0.85rem;
  color: var(--color-mutado, #6b6b6b);
`;

const Paginador = ({
  paginaActual,
  totalPaginas,
  onCambiarPagina,
  deshabilitado = false,
}) => {
  if (totalPaginas <= 1) return null;

  const numerosPagina = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  return (
    <ContenedorPaginador aria-label="Paginación del catálogo">
      <Pagination>
        <Pagination.Prev
          onClick={() => onCambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1 || deshabilitado}
          aria-label="Página anterior"
        >
          Anterior
        </Pagination.Prev>

        {numerosPagina.map((numero) => (
          <Pagination.Item
            key={numero}
            active={numero === paginaActual}
            disabled={deshabilitado}
            onClick={() => onCambiarPagina(numero)}
            aria-current={numero === paginaActual ? "page" : undefined}
          >
            {numero}
          </Pagination.Item>
        ))}

        <Pagination.Next
          onClick={() => onCambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas || deshabilitado}
          aria-label="Página siguiente"
        >
          Siguiente
        </Pagination.Next>
      </Pagination>

      <TextoPagina>
        Página <strong>{paginaActual}</strong> de <strong>{totalPaginas}</strong>
      </TextoPagina>
    </ContenedorPaginador>
  );
};

export default Paginador;