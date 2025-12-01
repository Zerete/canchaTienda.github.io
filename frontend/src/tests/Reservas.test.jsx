import { render, screen } from "@testing-library/react";
import Reservas from "../pages/Reservas";
import { vi } from "vitest";
import { CarritoContext } from "../context/CarritoContext";
import { MemoryRouter } from "react-router-dom"; 


beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: 1, nombre: "Cancha 1", precio: 100 },
          { id: 2, nombre: "Cancha 2", precio: 120 },
        ]),
    })
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

const mockCarrito = {
  agregarCancha: vi.fn(),
  carrito: [],
  total: 0,
  vaciarCarrito: vi.fn(),
};

test("muestra el título de reservas", () => {
  render(
    <MemoryRouter>
      <CarritoContext.Provider value={mockCarrito}>
        <Reservas />
      </CarritoContext.Provider>
    </MemoryRouter>
  );

  expect(screen.getByText(/reserva tu cancha/i)).toBeInTheDocument();
});

test("renderiza las canchas desde el fetch", async () => {
  render(
    <MemoryRouter>
      <CarritoContext.Provider value={mockCarrito}>
        <Reservas />
      </CarritoContext.Provider>
    </MemoryRouter>
  );

  expect(await screen.findByText(/Cancha 1/i)).toBeInTheDocument();
  expect(await screen.findByText(/Cancha 2/i)).toBeInTheDocument();
});
