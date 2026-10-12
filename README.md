# 1er Pre-Entrega del Proyecto 

## Requerimientos

### Estructura y Layout 
1. El proyecto debe tener una estructura de carpetas organizada
2. Debe contar con un componente Layout.jsx que contenga un Header.jsx, un nav y un Footer.jsx, con una apariencia consistente y funcional 
3. El footer tiene que tener información de la empresa y las tarjetas de al menos 3 personas.

### Catálogo de productos con datos de una API 
1. La aplicación debe tener un componente como ItemListContainer.jsx (o una página que cumpla esa función) que cargue la información de productos desde un archivo productos.json local usando useEffect y fetch.
2. Los productos deben renderizarse utilizando un componente reutilizable Item.jsx, que reciba los datos por props.

### Sistema de ruteo
1. La navegación debe ser gestionada por react-router-dom. Deben existir, como mínimo, las siguientes rutas:
  * /: Vista principal o de bienvenida.
  * /productos:
  * /producto/:id: Vista de detalle de un único producto
  * /carrito: Vista del carrito de compras.
2. El NavBar debe utilizar el componente <Link> para una navegación fluida sin recargas de página.

### Alojamiento online
1. La página debe estar subida a Netlify o Vercel y compartir la url, junto con el link al repositorio de GitHub.
