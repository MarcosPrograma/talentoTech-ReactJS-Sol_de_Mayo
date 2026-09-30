import { Link } from "react-router-dom";
import estilos from './Item.module.css'

const Item = ({id, nombre, precio, imagen}) => {
    return (
        <div className={estilos.tarjeta}>
            <Link to={`/producto/${id}`} style={{textDecoration:'none'}}>
                <div className={estilos.imagenContenedor}>
                    <img src={imagen} alt={nombre} className={estilos.imagen}/>
                </div>
                <h3 className={estilos.titulo}>{nombre}</h3>
                <p className={estilos.precio}>${precio?.toLocaleString('es-AR')}</p>
            </Link>

            <div className={estilos.acciones}>
                <button className={estilos.botonComprar} onClick={() => alert(`Agregaste ${nombre} al carrito`)}>COMPRAR</button>
            </div>
        </div>
    );
};

export default Item;