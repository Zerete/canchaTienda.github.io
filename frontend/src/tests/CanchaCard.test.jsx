import { render, screen, fireEvent } from "@testing-library/react";

import CanchaCard from "../components/CanchaCard";

import { CarritoContext } from "../context/CarritoContext";

import { MemoryRouter } from "react-router-dom";



describe("CanchaCard", () => {

 const canchaMock = {

  id: 1,

  nombre: "Cancha Test",

  imagen: "test.jpg",

  precioHora: 5000,

  "Tipo de Superficie": "Cesped",

 };



 it("muestra el nombre de la cancha", () => {

  render(

   <CarritoContext.Provider value={{ agregarCancha: jest.fn() }}>

    <MemoryRouter>

     <CanchaCard cancha={canchaMock} />

    </MemoryRouter>

   </CarritoContext.Provider>

  );



  expect(screen.getByText("Cancha Test")).toBeInTheDocument();

  expect(screen.getByText("Superficie: Cesped")).toBeInTheDocument();

  expect(screen.getByText("Precio: $5,000 / hora")).toBeInTheDocument();

 });



 it("llama a agregarCancha al hacer click en Reservar", () => {

  const agregarCanchaMock = jest.fn();

  render(

   <CarritoContext.Provider value={{ agregarCancha: agregarCanchaMock }}>

    <MemoryRouter>

     <CanchaCard cancha={canchaMock} />

    </MemoryRouter>

   </CarritoContext.Provider>

  );



  fireEvent.click(screen.getByText("Reservar"));

  expect(agregarCanchaMock).toHaveBeenCalledWith(canchaMock);

 });

});