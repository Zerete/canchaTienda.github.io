import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#000", color: "#fff", padding: "40px 20px", borderTop: "4px solid #ffc107" }}>
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "30px" }}>
        
       
        <div style={{ flex: "1 1 300px" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#ffc107", marginBottom: "10px" }}>CanchasReser ⚽</h2>
          <p style={{ color: "#aaa", lineHeight: "1.6" }}>
            La plataforma líder para reservar tu espacio deportivo. 
            Calidad profesional, reservas seguras y el mejor ambiente para tu equipo.
          </p>
        </div>

      
        <div style={{ flex: "1 1 200px" }}>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "15px" }}>Navegación</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "10px" }}><Link to="/" style={linkStyle}>Inicio</Link></li>
            <li style={{ marginBottom: "10px" }}><Link to="/reservas" style={linkStyle}>Reservar</Link></li>
            <li style={{ marginBottom: "10px" }}><Link to="/canchas" style={linkStyle}>Canchas</Link></li>
            <li style={{ marginBottom: "10px" }}><Link to="/contacto" style={linkStyle}>Contacto</Link></li>
          </ul>
        </div>

        
        <div style={{ flex: "1 1 200px" }}>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "15px" }}>Síguenos</h3>
          <div style={{ display: "flex", gap: "15px", fontSize: "1.5rem" }}>
            <span style={{ cursor: "pointer" }}>📸</span>
            <span style={{ cursor: "pointer" }}>🐦</span>
            <span style={{ cursor: "pointer" }}>📘</span>
          </div>
          <p style={{ marginTop: "15px", fontSize: "0.9rem", color: "#666" }}>© 2025 CanchasReser Inc.</p>
        </div>

      </div>
    </footer>
  );
};

const linkStyle = {
  color: "#ccc", textDecoration: "none", transition: "color 0.3s"
};

export default Footer;