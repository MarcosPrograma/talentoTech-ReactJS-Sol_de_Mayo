import {Link} from 'react-router-dom';
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { FaArrowRight, FaStore } from "react-icons/fa";
import ItemListContainer from '../Productos/ItemListContainer'; 
import estilos from './Inicio.module.css';

const EnlacePildora = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
  font-family: var(--font-heading);
  font-weight: 700;
  border-radius: var(--borde-pildora);
  transition: background-color 0.2s ease, opacity 0.2s ease, transform 0.2s ease;

  &:focus-visible {
    outline: 2px solid var(--color-turquesa);
    outline-offset: 3px;
  }
`;

const BotonHero = styled(EnlacePildora)`
  background-color: var(--color-turquesa);
  color: #ffffff;
  padding: 0.85rem 2.1rem;
  font-size: 0.9rem;

  &:hover {
    background-color: var(--color-turquesa-hover);
    color: #ffffff;
    transform: translateY(-2px);
  }
`;

const BotonVerMas = styled(EnlacePildora)`
  background-color: var(--color-oscuro);
  color: #ffffff;
  font-size: 0.85rem;
  padding: 0.9rem 2.2rem;

  &:hover {
    opacity: 0.9;
    color: #ffffff;
    transform: translateY(-2px);
  }
`;

const Inicio = () => {
return (
    <div>
      <Helmet>
        <title>Inicio | Sol de Mayo</title>
        <meta
          name="description"
          content="Tradición y productos regionales. Llevando las tradiciones de nuestra patria directo a tu casa."
        />
      </Helmet>

      <section className={estilos.hero} aria-label="Presentación de Sol de Mayo">
        <div className={estilos.heroContenido}>
          <p className={estilos.heroSubtitulo}>NUEVOS PRODUCTOS PARA VOS</p>
          <h1 className={estilos.heroTitulo}>
            Llevando las tradiciones de nuestra patria directo a tu casa
          </h1>
          <BotonHero to="/productos">
            <FaStore aria-hidden="true" />
            <span>VER PRODUCTOS</span>
          </BotonHero>
        </div>
      </section>

      <section className={estilos.seccionProductos} aria-labelledby="titulo-inicio-productos">
        <Container fluid="md">
          <p className={estilos.subtitulo}>TOMATE UN MATE Y ENCONTRÁ TU FAVORITO</p>
          <h2 id="titulo-inicio-productos" className={estilos.titulo}>
            Nuestros Productos
          </h2>

          <ItemListContainer />

          <div className={estilos.contenedorVerMas}>
            <BotonVerMas to="/productos">
              <span>VER MÁS PRODUCTOS</span>
              <FaArrowRight aria-hidden="true" />
            </BotonVerMas>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Inicio;