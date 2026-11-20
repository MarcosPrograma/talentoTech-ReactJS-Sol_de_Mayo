import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Inicio from "./components/Inicio/Inicio";
import ItemListContainer from "./components/Productos/ItemListContainer";
import ProductoDetalle from "./components/Productos/ProductoDetalle";
import Carrito from "./components/Carrito/Carrito";
import GestionCupones from "./components/GestionCupones/GestionCupones";
import GestionProductos from "./components/GestionProductos/GestionProductos";
import Perfil from "./components/Perfil/Perfil";
import Login from "./components/Login/Login";
import Registro from "./components/Registro/Registro";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { SearchProvider } from "./context/SearchContext";

function App() {
  return (
    <SearchProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/productos"
            element={<ItemListContainer greeting="Catálogo" />}
          />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/productos"
            element={
              <ProtectedRoute rolesPermitidos={["admin"]}>
                <GestionProductos />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/cupones"
            element={
              <ProtectedRoute rolesPermitidos={["admin"]}>
                <GestionCupones />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </SearchProvider>
  );
}

export default App;
