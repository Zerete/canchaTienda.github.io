import { render, screen } from "@testing-library/react";
import Contacto from "../pages/Contacto";

test("renderiza correctamente la página de contacto", () => {
  render(<Contacto />);

  expect(screen.getByText(/contáctanos/i)).toBeInTheDocument();

  
  expect(
    screen.getByText(/somos luis y angel, dos amigos apasionados/i)
  ).toBeInTheDocument();

 
  expect(screen.getByText(/contacto\.chanchas@gmail\.com/i)).toBeInTheDocument();

 
  expect(screen.getByTitle(/ubicación/i)).toBeInTheDocument();
});
