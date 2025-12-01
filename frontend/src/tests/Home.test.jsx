import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";
import { MemoryRouter } from "react-router-dom";

test("muestra bienvenida en el inicio", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  expect(screen.getByText(/bienvenido/i)).toBeInTheDocument();
});
