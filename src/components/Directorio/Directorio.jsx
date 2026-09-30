import {useState, useEffect} from 'react';
import TarjetaContacto from '../TarjetaContacto/TarjetaContacto';
import estilos from './Directorio.module.css';

const Directorio = () => {
    const [equipo, setEquipo] = useState([]);
    const [cargando, setCargando] = useState(true);
    
    useEffect(() => {
        fetch('/data/nosotros.json')
            .then((res) => res.json())
            .then((datos) => setEquipo(datos))
            .catch((err) => console.error(err))
            .finally(() => setCargando(false));
    }, []);

    if (cargando) return null; 
    
    return (
        <section className={estilos.seccionEquipo} id='equipo'>
            <p className={estilos.subtitulo}>Éramos pocos y parió la abuela</p>
            <h2 className={estilos.titulo}>Nuestro Equipo</h2>

            <div className={estilos.grilla}>
                {equipo.map((persona) => (
                    <TarjetaContacto key={persona.id} {...persona}/>
                ))}
            </div>
        </section>
    );
};

export default Directorio;