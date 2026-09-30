import Directorio from '../Directorio/Directorio';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id='contacto'>
      <Directorio/>

      <div className="footer__contenedor">
        <div className="footer__col">
          <h2>Sol de Mayo</h2>
          <p className="footer__subtexto">Tradición y productos regionales. Llevando las tradiciones de nuestra patria directo a tu casa</p>
        </div>

        <div className="footer__col">
          <h4>Nosotros</h4>
          <ul>
            <li><a href="#sobre">Sobre Nosotros</a></li>
            <li><a href="#historia">Nuestra Historia</a></li>
            <li><a href="#faq">Preguntas Frecuentes</a></li>
            <li><a href="#opiniones">Opiniones</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Soporte</h4>
          <ul>
            <li><a href="#privacidad">Política de Privacidad</a></li>
            <li><a href="#cookies">Política de Cookies</a></li>
            <li><a href="#terminos">Términos y Condiciones</a></li>
            <li><a href="#legal">Aviso Legal</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Contacto</h4>
          <ul>
            <li><a href="#instagram">Instagram</a></li>
            <li><a href="#facebook">Facebook</a></li>
            <li><a href="#whatsapp">WhatsApp</a></li>
            <li><a href="#email">Correo Electrónico</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer__derechos">
        <p>&copy; {new Date().getFullYear()} Sol de Mayo. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;