import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CanchaCard from "../components/CanchaCard";
import { CarritoContext } from "../context/CarritoContext";
import { vi } from "vitest";

describe("CanchaCard", () => {
  const canchaMock = {
    id: 1,
    nombre: "Cancha 1",
    precio: 100,
  };

  test("agrega cancha al hacer clic en botón", () => {
    const agregarCanchaMock = vi.fn();

    render(
      <MemoryRouter>
        <CarritoContext.Provider value={{ agregarCancha: agregarCanchaMock }}>
          <CanchaCard cancha={canchaMock} />
        </CarritoContext.Provider>
      </MemoryRouter>
    );


    const boton = screen.getByRole("button", { name: /Reservar/i });
    fireEvent.click(boton);

    expect(agregarCanchaMock).toHaveBeenCalledWith(canchaMock);
  });
});
