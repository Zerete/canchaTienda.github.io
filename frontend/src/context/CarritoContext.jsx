import { createContext, useState, useEffect } from "react";
export const CarritoContext = createContext();
export const CarritoProvider = ({ children }) => {

 const [carrito, setCarrito] = useState(() => {

  const guardado = localStorage.getItem("carrito");

  return guardado ? JSON.parse(guardado) : [];

 });



 // ✅ Guarda el carrito en localStorage cada vez que cambia

 useEffect(() => {

  localStorage.setItem("carrito", JSON.stringify(carrito));

 }, [carrito]);



 // ✅ Agregar cancha al carrito

 const agregarCancha = (cancha) => {

  if (!carrito.some((c) => c.id === cancha.id)) {

   setCarrito([...carrito, cancha]);

  }

 };



 // ✅ Eliminar cancha del carrito

 const eliminarCancha = (id) => {

  setCarrito(carrito.filter((c) => c.id !== id));

 };



 // ✅ Vaciar carrito completo

 const vaciarCarrito = () => setCarrito([]);



 // ✅ Calcular total

 const total = carrito.reduce((acc, c) => acc + (c.precioHora || 0), 0);



 return (

  <CarritoContext.Provider

   value={{ carrito, agregarCancha, eliminarCancha, vaciarCarrito, total }}

  >

   {children}

  </CarritoContext.Provider>

 );

};