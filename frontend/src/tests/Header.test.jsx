import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

test("renderiza el título y los enlaces del header", () => {
  render(<Header />);


  expect(screen.getByText(/CanchasReser/i)).toBeInTheDocument();


  expect(screen.getByRole("link", { name: "Inicio" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Canchas" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Reservas" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Carrito" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Contacto" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "InicioSesion" })).toBeInTheDocument();
});

