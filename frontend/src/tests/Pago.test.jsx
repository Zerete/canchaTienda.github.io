import { render, screen } from "@testing-library/react";
import Pago from "../pages/Pago";
import { CarritoContext } from "../context/CarritoContext";
import { MemoryRouter } from "react-router-dom";

describe("Pago - renderizado básico", () => {
  const carritoMock = [
    { id: 1, nombre: "Cancha 1", precioHora: 100, imagen: "" },
    { id: 2, nombre: "Cancha 2", precioHora: 150, imagen: "" },
  ];

  const totalMock = carritoMock.reduce((acc, c) => acc + c.precioHora, 0);

  test("muestra la página de pago correctamente", () => {
    render(
      <CarritoContext.Provider
        value={{
          carrito: carritoMock,
          total: totalMock,
          vaciarCarrito: () => {},
        }}
      >
        <MemoryRouter>
          <Pago />
        </MemoryRouter>
      </CarritoContext.Provider>
    );


    expect(screen.getByText(/Confirmar Pago/i)).toBeInTheDocument();

   
    expect(screen.getByText("Cancha 1")).toBeInTheDocument();
    expect(screen.getByText("Cancha 2")).toBeInTheDocument();

    
    expect(
      screen.getByText(/Pagar y confirmar reserva/i)
    ).toBeInTheDocument();
  });
});
