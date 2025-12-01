import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

test("renderiza el footer con derechos reservados", () => {
  render(<Footer />);
  expect(screen.getByText(/Derechos reservados/i)).toBeInTheDocument();
});
