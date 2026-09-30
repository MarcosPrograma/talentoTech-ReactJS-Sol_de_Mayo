import {Link} from 'react-router-dom';
import ItemListContainer from '../Productos/ItemListContainer'; 
import estilos from './Inicio.module.css';

const Inicio = () => {
    return(
        <div>
            <section className={estilos.hero}>
                <div>
                    <p className={estilos.heroSubtitulo}>NUEVOS PRODUCTOS PARA VOS</p>
                    <h1 className={estilos.heroTitulo}>Llevando las tradiciones de nuestra patria directo a tu casa</h1>
                    <Link to="/productos" className={estilos.heroBoton}>VER PRODUCTOS</Link>
                </div>
            </section>

            <section className={estilos.seccionProductos}>
                <p className={estilos.subtitulo}>TOMATE UN MATE Y ENCONTRÁ TU FAVORITO</p>
                <h2 className={estilos.titulo}>Nuestros Productos</h2>
                <ItemListContainer/>
                <div style={{textAlign: 'center', marginTop: '2.5rem'}}>
                    <Link to="/productos" className={estilos.botonVerMas}>VER MÁS PRODUCTOS</Link>
                </div>
            </section>
        </div>
    );
};

export default Inicio;