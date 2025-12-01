import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CanchaDetalle from "../pages/CanchaDetalle";
import { vi } from "vitest";

beforeEach(() => {
 
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        {
          id: 1,
          nombre: "Cancha VIP",
          imagen: "vip.jpg",
          "Tipo de Superficie": "Superficie sintética",
          "Dimensiones de la Cancha": "20x40",
          Medidas: "5x2",
          Jugadores: 10,
          descripcion: "Cancha de alta calidad",
          ubicacion: "Santiago",
          precioHora: 100
        }
      ])
    })
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

test("muestra detalles de la cancha", async () => {
  render(
    <MemoryRouter initialEntries={["/canchas/1"]}>
      <Routes>
        <Route path="/canchas/:id" element={<CanchaDetalle />} />
      </Routes>
    </MemoryRouter>
  );

 
  await waitFor(() => {
    expect(screen.getByText(/Cancha VIP/i)).toBeInTheDocument();
    expect(screen.getByText(/Superficie sintética/i)).toBeInTheDocument();
    expect(screen.getByText(/Santiago/i)).toBeInTheDocument();
    expect(screen.getByText(/\$100/i)).toBeInTheDocument();
  });
});
