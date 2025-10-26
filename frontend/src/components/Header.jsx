import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">CanchasReser</h1>
        <nav className="nav">
          <a href="/" className="nav-link">Inicio</a>
          <a href="/canchas" className="nav-link">Canchas</a>
          <a href="/reservas" className="nav-link active">Reservas</a>
          <a href="/carrito" className="nav-link">Carrito</a>
          <a href="/contacto" className="nav-link">Contacto</a>
          <a href="/iniciar_sesion" className="nav-link">InicioSesion</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
