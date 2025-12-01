import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// PAGINAS
import Home from "./pages/Home";
import Canchas from "./pages/Canchas";
import CanchaDetalle from "./pages/CanchaDetalle";
import Reservas from "./pages/Reservas";
import Contacto from "./pages/Contacto";
import IniciarSesion from "./pages/IniciarSesion";
import Pago from "./pages/Pago";
import Admin from "./pages/Admin"; // ← IMPORT CORRECTO


function AppContent() {
  const location = useLocation();

  // 🔥 Detecta si estás en /admin para ocultar header/nav/footer
  const isAdminRoute =
    location.pathname === "/admin" ||
    location.pathname.startsWith("/admin/");

  return (
    <>
      {/* Oculta Header y NavBar en el panel admin */}
      {!isAdminRoute && <Header />}
      {!isAdminRoute && <NavBar />}

      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          backgroundImage: "url('/img/bg-hero.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* Capa oscura encima del fondo */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 1,
          }}
        ></div>

        {/* Contenido principal */}
        <main
          style={{
            position: "relative",
            zIndex: 2,
            minHeight: "100vh",
            padding: 0,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/canchas" element={<Canchas />} />
            <Route path="/canchas/:id" element={<CanchaDetalle />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/iniciar_sesion" element={<IniciarSesion />} />

            {/* PAGO */}
            <Route path="/pago" element={<Pago />} />

            {/* ADMIN */}
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>

      {/* Oculta el Footer en rutas admin */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default AppContent;
