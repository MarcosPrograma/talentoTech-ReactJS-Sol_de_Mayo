import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  getCountFromServer,
  query,
  limit,
  startAfter,
} from "firebase/firestore";
import { Container, Breadcrumb, Spinner, Alert } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { db } from "../../firebase/config";
import { useSearch } from "../../context/SearchContext";
import SearchBar from "../SearchBar/SearchBar";
import Paginador from "../Paginador/Paginador";
import Item from "./Item";
import estilos from "./ItemListContainer.module.css";

const PRODUCTOS_POR_PAGINA = 8;

const BotonSecundario = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-turquesa, #52c2d4);
  color: var(--color-texto, #1a1a1a);
  border: none;
  border-radius: var(--borde-pildora, 50px);
  padding: 0.7rem 1.8rem;
  font-family: var(--font-heading, "Montserrat", sans-serif);
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background-color: var(--color-turquesa-hover, #3ea8b7);
    transform: translateY(-2px);
  }
`;

const ItemListContainer = ({ greeting, subtitulo }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [cambiandoPagina, setCambiandoPagina] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [paginasCache, setPaginasCache] = useState({});
  const [error, setError] = useState(null);

  const { busqueda, limpiarBusqueda } = useSearch();

  useEffect(() => {
    let cancelado = false;

    const cargarCatalogoInicial = async () => {
      setCargando(true);
      setError(null);

      try {
        const productosDB = collection(db, "productos");
        const countSnap = await getCountFromServer(productosDB);
        const totalDocs = countSnap.data().count;
        const calculadoTotalPaginas = Math.max(
          1,
          Math.ceil(totalDocs / PRODUCTOS_POR_PAGINA),
        );

        const q = query(productosDB, limit(PRODUCTOS_POR_PAGINA));
        const resp = await getDocs(q);

        if (cancelado) return;

        const productosData = resp.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const ultimoDoc = resp.docs[resp.docs.length - 1] || null;

        setTotalPaginas(calculadoTotalPaginas);
        setPaginaActual(1);
        setProductos(productosData);
        setPaginasCache({
          1: {
            items: productosData,
            ultimoDoc,
          },
        });
      } catch (err) {
        if (cancelado) return;
        console.error("Error consultando Firestore:", err);
        setError("Ocurrió un error al cargar los productos desde la nube");
      } finally {
        if (!cancelado) {
          setCargando(false);
        }
      }
    };

    cargarCatalogoInicial();

    return () => {
      cancelado = true;
    };
  }, []);

  const irAPagina = async (numeroPagina) => {
    if (
      numeroPagina < 1 ||
      numeroPagina > totalPaginas ||
      numeroPagina === paginaActual ||
      cambiandoPagina
    ) {
      return;
    }

    if (paginasCache[numeroPagina]) {
      setProductos(paginasCache[numeroPagina].items);
      setPaginaActual(numeroPagina);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setCambiandoPagina(true);
    setError(null);

    try {
      const productosDB = collection(db, "productos");
      const nuevaCache = { ...paginasCache };

      let paginaAExplorar = 1;
      while (paginaAExplorar <= numeroPagina) {
        if (nuevaCache[paginaAExplorar]) {
          paginaAExplorar += 1;
          continue;
        }

        const cursorAnterior = nuevaCache[paginaAExplorar - 1]?.ultimoDoc;
        const consulta = cursorAnterior
          ? query(
              productosDB,
              startAfter(cursorAnterior),
              limit(PRODUCTOS_POR_PAGINA),
            )
          : query(productosDB, limit(PRODUCTOS_POR_PAGINA));

        const resp = await getDocs(consulta);
        const items = resp.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const ultimoDoc = resp.docs[resp.docs.length - 1] || null;

        nuevaCache[paginaAExplorar] = { items, ultimoDoc };
        paginaAExplorar += 1;
      }

      setPaginasCache(nuevaCache);
      setProductos(nuevaCache[numeroPagina].items);
      setPaginaActual(numeroPagina);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Error al cambiar de página:", err);
      setError("No se pudo cargar la página seleccionada.");
    } finally {
      setCambiandoPagina(false);
    }
  };

  const terminoNormalizado = busqueda.trim().toLowerCase();
  const productosFiltrados = productos.filter((prod) =>
    (prod.nombre || "").toLowerCase().includes(terminoNormalizado),
  );

  if (cargando) {
    return (
      <div className={estilos.cargando}>
        <Spinner
          animation="border"
          role="status"
          style={{ color: "var(--color-turquesa, #52c2d4)" }}
        />
        <h3 className="mt-3">Cargando catálogo...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5" style={{ maxWidth: "680px" }}>
        <Alert variant="danger" role="alert">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <div className={estilos.contenedor}>
      <Helmet>
        <title>
          {greeting ? `${greeting} | Sol de Mayo` : "Productos | Sol de Mayo"}
        </title>
        <meta
          name="description"
          content="Buscá y explorá el catálogo de productos de Sol de Mayo."
        />
      </Helmet>

      <Breadcrumb className={estilos.breadcrumbs}>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Inicio
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Productos</Breadcrumb.Item>
      </Breadcrumb>

      {(greeting || subtitulo) && (
        <div className={estilos.encabezado}>
          {subtitulo && <p className={estilos.subtitulo}>{subtitulo}</p>}
          {greeting && <h2 className={estilos.titulo}>{greeting}</h2>}
        </div>
      )}

      <SearchBar placeholder="Buscar productos por nombre..." />

      {terminoNormalizado && (
        <p className={estilos.infoResultados}>
          Mostrando <strong>{productosFiltrados.length}</strong>{" "}
          {productosFiltrados.length === 1 ? "resultado" : "resultados"} para{" "}
          <strong>&ldquo;{busqueda}&rdquo;</strong>
        </p>
      )}

      {productosFiltrados.length === 0 ? (
        <div className={estilos.sinResultados}>
          <Alert variant="light" className="border">
            No encontramos productos que coincidan con &ldquo;{busqueda}&rdquo;.
          </Alert>
          <BotonSecundario type="button" onClick={limpiarBusqueda}>
            Limpiar búsqueda
          </BotonSecundario>
        </div>
      ) : (
        <>
          <div className={estilos.grilla}>
            {productosFiltrados.map((prod) => (
              <Item key={prod.id} {...prod} />
            ))}
          </div>

          {!terminoNormalizado && (
            <Paginador
              paginaActual={paginaActual}
              totalPaginas={totalPaginas}
              onCambiarPagina={irAPagina}
              deshabilitado={cambiandoPagina}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ItemListContainer;
