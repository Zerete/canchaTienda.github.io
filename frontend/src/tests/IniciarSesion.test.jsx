import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import IniciarSesion from "../pages/IniciarSesion";

test("muestra error si los campos son incorrectos", async () => {
  render(
    <MemoryRouter>
      <IniciarSesion />
    </MemoryRouter>
  );

  const boton = screen.getByRole("button", { name: /Entrar/i });

  const inputUsuario = screen.getByLabelText(/Usuario:/i);
  const inputContrasena = screen.getByLabelText(/Contraseña:/i);

  fireEvent.change(inputUsuario, { target: { value: "wrong" } });
  fireEvent.change(inputContrasena, { target: { value: "wrong" } });

  fireEvent.click(boton);


  await waitFor(() => {
    expect(
      screen.getByText(/Usuario o contraseña incorrectos/i)
    ).toBeInTheDocument();
  });
});
