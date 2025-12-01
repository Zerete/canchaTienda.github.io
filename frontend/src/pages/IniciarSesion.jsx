import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function IniciarSesion() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [modoRegistro, setModoRegistro] = useState(false);

  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoCorreo, setNuevoCorreo] = useState("");
  const [nuevoPass, setNuevoPass] = useState("");

  const navigate = useNavigate();

  // 🔥 REGISTRAR NUEVO USUARIO
  const registrarUsuario = (e) => {
    e.preventDefault();

    if (!nuevoNombre || !nuevoCorreo || !nuevoPass) {
      setError("Todos los campos son obligatorios");
      return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.some((u) => u.correo === nuevoCorreo)) {
      setError("Este correo ya está registrado");
      return;
    }

    usuarios.push({
      nombre: nuevoNombre,
      correo: nuevoCorreo,
      password: nuevoPass,
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    setModoRegistro(false);
    setError("");
  };

  // 🔥 INICIAR SESIÓN
  const manejarEnvio = (e) => {
    e.preventDefault();

    // ⚡ ADMIN LOGIN (no requiere correo)
    if (usuario === "admin" && contrasena === "1234") {
      setError("");
      navigate("/admin");
      return;
    }

    // ⚡ LOGIN NORMAL
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const encontrado = usuarios.find(
      (u) => u.correo === usuario && u.password === contrasena
    );

    if (encontrado) {
      setError("");
      navigate("/");
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
      {/* ===================== REGISTRO ===================== */}
      {modoRegistro ? (
        <form
          onSubmit={registrarUsuario}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "2rem",
            borderRadius: "10px",
            width: "330px",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          <h2 style={{ textAlign: "center", color: "#198754" }}>Registrarme</h2>

          <label>Nombre:</label>
          <input
            type="text"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
            style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
          />

          <label>Correo:</label>
          <input
            type="email"
            value={nuevoCorreo}
            onChange={(e) => setNuevoCorreo(e.target.value)}
            style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
          />

          <label>Contraseña:</label>
          <input
            type="password"
            value={nuevoPass}
            onChange={(e) => setNuevoPass(e.target.value)}
            style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.7rem",
              backgroundColor: "#198754",
              color: "white",
              border: "none",
              borderRadius: "5px",
              marginBottom: "1rem",
            }}
          >
            Registrar
          </button>

          <button
            type="button"
            onClick={() => {
              setModoRegistro(false);
              setError("");
            }}
            style={{
              width: "100%",
              padding: "0.7rem",
              backgroundColor: "#0d6efd",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Volver a Iniciar Sesión
          </button>
        </form>
      ) : (
        /* ===================== LOGIN ===================== */
        <form
          onSubmit={manejarEnvio}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "2rem",
            borderRadius: "10px",
            width: "330px",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          <h2 style={{ textAlign: "center", color: "#0d6efd" }}>Iniciar Sesión</h2>

          <label>Correo o usuario (admin):</label>
          <input
            type="text"  // 👈 Puede ser texto normal (permite admin sin @)
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
            required
          />

          <label>Contraseña:</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
            required
          />

          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.7rem",
              backgroundColor: "#0d6efd",
              color: "white",
              borderRadius: "5px",
              marginBottom: "1rem",
              border: "none",
            }}
          >
            Entrar
          </button>

          <button
            type="button"
            onClick={() => {
              setModoRegistro(true);
              setError("");
            }}
            style={{
              width: "100%",
              padding: "0.7rem",
              backgroundColor: "#198754",
              color: "white",
              borderRadius: "5px",
              border: "none",
            }}
          >
            Registrarme
          </button>
        </form>
      )}
    </div>
  );
}

export default IniciarSesion;
