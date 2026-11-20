/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from "react";

export const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe ser usado dentro de un CarritoProvider");
  }
  return context;
};

const STORAGE_KEY = "sol_de_mayo_carrito";

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY);
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
    } catch (err) {
      console.error("Error guardando carrito en localStorage:", err);
    }
  }, [carrito]);

  const agregarACarrito = ({ producto, cantidad = 1 }) => {
    if (!producto || !producto.id) return;

    setCarrito((carritoPrevio) => {
      const itemEnCarrito = carritoPrevio.find((item) => item.id === producto.id);
      if (itemEnCarrito) {
        return carritoPrevio.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      return [...carritoPrevio, { ...producto, cantidad }];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((carritoPrevio) => carritoPrevio.filter((item) => item.id !== id));
  };

  const incrementarCantidad = (id) => {
    setCarrito((carritoPrevio) =>
      carritoPrevio.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  const decrementarCantidad = (id) => {
    setCarrito((carritoPrevio) =>
      carritoPrevio
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const itemsEnCarrito = () => {
    return carrito.reduce((acumulador, item) => acumulador + item.cantidad, 0);
  };

  const cobroTotal = () => {
    return carrito.reduce(
      (acumulador, item) => acumulador + (Number(item.precio) || 0) * item.cantidad,
      0
    );
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarACarrito,
        eliminarDelCarrito,
        incrementarCantidad,
        decrementarCantidad,
        vaciarCarrito,
        itemsEnCarrito,
        cobroTotal,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};