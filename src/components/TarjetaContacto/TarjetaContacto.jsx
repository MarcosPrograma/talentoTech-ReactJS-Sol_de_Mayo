import estilos from './TarjetaContacto.module.css';

const TarjetaContacto = ({foto, nombre, puesto}) => {
    return(
        <div className={estilos.tarjeta}>
            <div className={estilos.fotoContenedor}>
                <img src={foto} alt={nombre} className={estilos.foto}/>
            </div>
            <h3 className={estilos.nombre}>{nombre}</h3>
            <p className={estilos.puesto}>{puesto}</p>
        </div>
    );
};

export default TarjetaContacto;