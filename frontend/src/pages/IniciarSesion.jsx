import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function IniciarSesion() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (usuario === "admin" && contrasena === "1234") {
      setError("");
      navigate("/admin");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/src/assets/img/totalfondo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <form
        onSubmit={manejarEnvio}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "2rem",
          borderRadius: "10px",
          width: "320px",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#0d6efd" }}>
          Iniciar Sesión
        </h2>

        <div style={{ marginBottom: "1rem" }}>
          <label>Usuario:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            required
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Contraseña:</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            required
          />
        </div>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.7rem",
            backgroundColor: "#0d6efd",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default IniciarSesion;
