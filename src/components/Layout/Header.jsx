import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__contenedor">
        <Link to="/" className="header__logo"> 
          <img src="/images/icon-sol_de_mayo.png" alt="Sol de Mayo" className="header__logo-img"/>
          <h1>Sol de Mayo</h1>
        </Link>

        <nav className="header__nav">
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="#equipo">Nosotros</Link></li>
            <li><Link to="#contacto">Contacto</Link></li>
            <li><Link to="/carrito" className='header__cart-icon' title="Carrito"><img src="images/Carrito.png" alt="Carrito" className="header__cart-img"/></Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;