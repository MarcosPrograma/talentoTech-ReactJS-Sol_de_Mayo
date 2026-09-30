import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Inicio from "./components/Inicio/Inicio";
import ItemListContainer from "./components/Productos/ItemListContainer";
import ProductoDetalle from "./components/Productos/ProductoDetalle";
import Carrito from "./components/Carrito/Carrito";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<ItemListContainer greeting="Catálogo"/>}/>
        <Route path="/producto/:id" element={<ProductoDetalle/>} />
        <Route path="/carrito" element={<Carrito />} />
      </Route>
    </Routes>
  );
}

export default App;
