import { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import TarjetaContacto from "../TarjetaContacto/TarjetaContacto";
import estilos from "./Directorio.module.css";

const EncabezadoEquipo = styled.div`
  max-width: 720px;
  margin: 0 auto 2.5rem;
`;

const Directorio = () => {
  const [equipo, setEquipo] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let cancelado = false;

    const cargarEquipo = async () => {
      try {
        const equipoRef = collection(db, "equipo");
        const respuesta = await getDocs(equipoRef);
        if (cancelado) return;

        const listaEquipo = respuesta.docs.map((documento) => ({
          id: documento.id,
          ...documento.data(),
        }));
        setEquipo(listaEquipo);
      } catch (err) {
        if (!cancelado) {
          console.error("Error al obtener los integrantes del equipo:", err);
        }
      } finally {
        if (!cancelado) {
          setCargando(false);
        }
      }
    };

    cargarEquipo();

    return () => {
      cancelado = true;
    };
  }, []);

  if (cargando) {
    return (
      <Container className="py-5 text-center" role="status" aria-live="polite">
        <Spinner animation="border" role="status" aria-hidden="true" />
        <p className={`${estilos.cargando} mt-2 mb-0`}>
          Cargando perfiles del equipo...
        </p>
      </Container>
    );
  }

  return (
    <section
      className={estilos.seccionEquipo}
      id="equipo"
      aria-labelledby="titulo-equipo"
    >
      <Helmet>
        <title>Nuestro Equipo | Sol de Mayo</title>
        <meta
          name="description"
          content="Conocé al equipo detrás de Sol de Mayo y sus medios de contacto."
        />
      </Helmet>

      <EncabezadoEquipo>
        <p className={estilos.subtitulo}>Éramos pocos y parió la abuela</p>
        <h2 id="titulo-equipo" className={estilos.titulo}>
          Nuestro Equipo
        </h2>
      </EncabezadoEquipo>

      <div className={estilos.grilla}>
        {equipo.map((persona) => (
          <TarjetaContacto key={persona.id} {...persona} />
        ))}
      </div>
    </section>
  );
};

export default Directorio;
