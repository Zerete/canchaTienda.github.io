import { renderHook, act } from "@testing-library/react";
import { CarritoProvider, CarritoContext } from "../context/CarritoContext";
import { useContext } from "react";

test("agrega una cancha al carrito", () => {
  const wrapper = ({ children }) => <CarritoProvider>{children}</CarritoProvider>;
  const { result } = renderHook(() => useContext(CarritoContext), { wrapper });

  act(() => {
    result.current.agregarCancha({ id: 1, nombre: "Cancha A", precio: 10000 });
  });

  expect(result.current.carrito.length).toBe(1);
  expect(result.current.carrito[0].nombre).toBe("Cancha A");
});
