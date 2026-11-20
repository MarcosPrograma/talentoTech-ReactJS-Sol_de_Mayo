/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [busqueda, setBusqueda] = useState("");

  const limpiarBusqueda = () => setBusqueda("");

  return (
    <SearchContext.Provider value={{ busqueda, setBusqueda, limpiarBusqueda }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}