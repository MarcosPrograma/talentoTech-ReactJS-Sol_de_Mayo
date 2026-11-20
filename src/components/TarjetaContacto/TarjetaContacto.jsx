import styled from "styled-components";
import { FaLinkedin } from "react-icons/fa";
import estilos from "./TarjetaContacto.module.css";

const EnlaceLinkedIn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-turquesa);
  text-decoration: none;
  transition:
    color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    color: var(--color-turquesa-hover, #3ea8b7);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid var(--color-turquesa);
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const TarjetaContacto = ({ fotoURL, nombre, rol, linkedinURL }) => {
  return (
    <article className={estilos.tarjeta}>
      <div className={estilos.fotoContenedor}>
        <img src={fotoURL} alt={nombre} className={estilos.foto} />
      </div>

      <h3 className={estilos.nombre}>{nombre}</h3>
      <p className={estilos.rol}>{rol}</p>

      {linkedinURL && (
        <EnlaceLinkedIn
          href={linkedinURL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Perfil de LinkedIn de ${nombre}`}
        >
          <FaLinkedin aria-hidden="true" />
          <span>LinkedIn</span>
        </EnlaceLinkedIn>
      )}
    </article>
  );
};

export default TarjetaContacto;
