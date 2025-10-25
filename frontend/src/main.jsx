import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// importa bootstrap si lo necesitas
import "bootstrap/dist/css/bootstrap.min.css";

// importa CSS que pusiste en public (puedes también importarlas desde public con link en index.html; si las dejaste en public, ya las carga index.html)
// si quieres import localmente en src, copia css a src/assets y haz:
// import "./assets/style.css";

// AOS styles import si usas AOS
import "aos/dist/aos.css";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
