import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import {
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import Directorio from '../Directorio/Directorio';
import './Footer.css';

const EnlaceContacto = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;

  &:focus-visible {
    outline: 2px solid var(--color-turquesa);
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const Footer = () => {
return (
    <footer className="footer" id="contacto">
      <Directorio />

      <Container className="footer__contenedor">
        <Row className="g-4">
          <Col xs={12} sm={6} lg={3} className="footer__col">
            <h2>Sol de Mayo</h2>
            <p className="footer__subtexto">
              Tradición y productos regionales. Llevando las tradiciones de nuestra
              patria directo a tu casa
            </p>
          </Col>

          <Col xs={12} sm={6} lg={3} className="footer__col">
            <h4>Nosotros</h4>
            <ul>
              <li><a href="#sobre">Sobre Nosotros</a></li>
              <li><a href="#historia">Nuestra Historia</a></li>
              <li><a href="#faq">Preguntas Frecuentes</a></li>
              <li><a href="#opiniones">Opiniones</a></li>
            </ul>
          </Col>

          <Col xs={12} sm={6} lg={3} className="footer__col">
            <h4>Soporte</h4>
            <ul>
              <li><a href="#privacidad">Política de Privacidad</a></li>
              <li><a href="#cookies">Política de Cookies</a></li>
              <li><a href="#terminos">Términos y Condiciones</a></li>
              <li><a href="#legal">Aviso Legal</a></li>
            </ul>
          </Col>

          <Col xs={12} sm={6} lg={3} className="footer__col">
            <h4>Contacto</h4>
            <ul>
              <li>
                <EnlaceContacto href="#instagram" aria-label="Instagram de Sol de Mayo">
                  <FaInstagram aria-hidden="true" />
                  <span>Instagram</span>
                </EnlaceContacto>
              </li>
              <li>
                <EnlaceContacto href="#facebook" aria-label="Facebook de Sol de Mayo">
                  <FaFacebook aria-hidden="true" />
                  <span>Facebook</span>
                </EnlaceContacto>
              </li>
              <li>
                <EnlaceContacto href="#whatsapp" aria-label="WhatsApp de Sol de Mayo">
                  <FaWhatsapp aria-hidden="true" />
                  <span>WhatsApp</span>
                </EnlaceContacto>
              </li>
              <li>
                <EnlaceContacto href="#email" aria-label="Correo electrónico de Sol de Mayo">
                  <FaEnvelope aria-hidden="true" />
                  <span>Correo Electrónico</span>
                </EnlaceContacto>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>

      <div className="footer__derechos">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Sol de Mayo. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;