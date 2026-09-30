import { useState, useEffect } from "react";
import Item from './Item';
import estilos from './ItemListContainer.module.css';

const ItemListContainer = ({greeting}) => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch('/data/productos.json')
            .then((res) => res.json())
            .then((data) => setProductos(data))
            .catch((err) => console.error("Error al cargar los productos", err))
            .finally(() => setCargando(false));
    }, []);

    if (cargando) return <h3 className={estilos.cargando}>Cargando catálogo...</h3>

    /* Falta agregar volver atrás o un indicador de donde está parado el usuario "Inicio > Productos" */

    return (
        <div className={estilos.contenedor}>
            {(greeting) && (
                <div className={estilos.encabezado}>
                    {greeting && <h2 className={estilos.titulo}>{greeting}</h2>}
                </div>
            )}

            <div className={estilos.grilla}>
                {productos.map((prod) => (
                    <Item key={prod.id} {...prod}/>
                ))}         
            </div>
        </div>
    );
};

export default ItemListContainer;