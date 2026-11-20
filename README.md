# 🌞 E-Commerce "Sol de Mayo" 
_Aplicación web de comercio electrónico desarrollada con React + Vite como Proyecto Final del curso de ReactJS en Talento Tech (Agencia de Habilidades para el Futuro de Buenos Aires Ciudad)._

_El proyecto integra navegación SPA, gestión de estado global mediante Context API, autenticación de usuarios y roles con Firebase Authentication, base de datos en tiempo real con Cloud Firestore (CRUD completo de productos), búsqueda dinámica, paginación y diseño responsivo._

## 🌐 Enlaces del Proyecto
* **Demo en línea en Vercel:** https://talento-tech-react-js-sol-de-mayo.vercel.app/
* **Repositorio en GitHub:** https://github.com/MarcosPrograma/talentoTech-ReactJS-Sol_de_Mayo

## 🔐 Credenciales de Acceso
_Para evaluar los distintos niveles de acceso y rutas protegidas de la aplicación, se encuentran habilitadas las siguientes cuentas_

| Rol | Correo electrónico | Contraseña | Permisos |
| :--- | :---: | :---: | :--- |
| **Administrador** | `admin@gmail.com` | `admin123` | Acceso total al catálogo, carrito y Panel de Gestión (CRUD de productos) |
| **Usuario** | `usuario@gmail.com` | `usuario123` | Navegación del catálogo, búsqueda, detalle de productos y gestión del carrito de compras |

_También es posible crear nuevas cuentas desde el formulario de Registro, las cuales obtendrán automáticamente el rol de usuario_

## 🛠️ Tecnologías y Librerías Utilizadas
* **Core:** React 18+, Vite
* **Enrutamiento:** react-router-dom
* **Backend as a Service (BaaS):** Firebase (Authentication & Cloud Firestore)
* **Estilos y UI:** CSS Modules, CSS Nativo, react-bootstrap, bootstrap, styled-components
* **Iconografía y SEO:** react-icons, react-helmet-async

## 🚀 Instalación
### 1. Prerrequisitos
Asegúrate de tener instalado:
* Node.js (versión 18 o superior recomendada)
* npm (incluido con Node.js)
* Git

### 2. Clonar el repositorio
```sh
git clone <URL_DE_TU_REPOSITORIO>
cd talentoTech-ReactJS-Sol_de_Mayo
 ```

### 3. Instalar dependencias
```sh
npm install
 ```

### 4. Configurar variables de entorno
_Crea un archivo .env en la raíz del proyecto (junto a package.json) con las credenciales de tu proyecto de Firebase (y opcionalmente ImgBB si utilizas subida de imágenes):_
_**Importante:** El archivo .env está incluido en .gitignore y nunca debe subirse al repositorio público._

```sh
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
 ```

### 5. Ejecutar el servidor local de desarrollo 
```sh
npm run dev
 ```

### 📋 Consignas
_El desarrollo del proyecto se dividió en dos etapas principales siguiendo los lineamientos de Talento Tech_

### 📌 1er Pre-Entrega del Proyecto
1. Estructura de carpetas organizada por responsabilidades (components, context, pages, firebase).
2. Componente Layout.jsx que integra Header.jsx, barra de navegación (NavBar) y Footer.jsx con apariencia consistente y funcional.
3. Footer.jsx con información institucional de la empresa y tarjetas de presentación de al menos 3 integrantes/referentes.
4. Componente ItemListContainer.jsx encargado de obtener los productos de forma asíncrona mediante useEffect (evolucionado de productos.json local a la colección en Cloud Firestore).
5. Renderizado mediante el componente reutilizable Item.jsx recibiendo la información del producto vía props.
6. Navegación SPA gestionada con react-router-dom incluyendo las rutas principales: 
   * / — Vista principal o de bienvenida.
   * /productos — Catálogo completo de productos.
   * /producto/:id — Vista de detalle de un producto específico.
   * /carrito — Vista del carrito de compras.
7. Uso del componente <Link> en la barra de navegación para transiciones fluidas sin recargar la página.
8. Proyecto versionado en GitHub y desplegado en hosting cloud (Vercel o Netlify).

### 📌 2da Entrega del Proyecto
1. Administración completa del catálogo
   * Crear (addDoc): Formulario controlado para dar de alta nuevos productos con validaciones (nombre obligatorio, precio numérico mayor a cero, stock válido, etc.).
   * Leer (getDocs): Listado actualizado de productos desde Firestore.
   * Actualizar (updateDoc): Edición en línea o mediante formulario precargado de productos existentes.
   * Eliminar (deleteDoc): Borrado de productos con confirmación previa para evitar eliminaciones accidentales y mejorar la experiencia de usuario (UX).
2. Indicadores visuales de carga (spinners) durante las peticiones asíncronas.
3. Alertas descriptivas en pantalla ante fallos de conexión o validación
4. Interfaz adaptable (Mobile-First / Responsiva) utilizando el sistema de grillas de Bootstrap, CSS Modules y styled-components
5. Mejora visual y de accesibilidad mediante iconografía intuitiva con React Icons y metadatos dinámicos por vista con React Helmet
7. Barra de búsqueda en tiempo real (SearchContext + SearchBar): Filtra dinámicamente los productos del catálogo a medida que el usuario escribe, con opción rápida para limpiar el filtro.
8. Paginador de productos (Paginador): Divide el catálogo en páginas con navegación numérica (1, 2, 3...) y controles de Anterior / Siguiente utilizando cursores de Firestore (limit y startAfter) para optimizar los tiempos de carga.
9. Revisión y limpieza de código redundante o archivos sin utilizar.
10. Pruebas de compatibilidad y funcionamiento en los principales navegadores web 
