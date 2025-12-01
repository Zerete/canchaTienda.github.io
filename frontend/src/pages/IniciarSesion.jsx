import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function IniciarSesion() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [modoRegistro, setModoRegistro] = useState(false);

  // Estados para registro
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoCorreo, setNuevoCorreo] = useState("");
  const [nuevoPass, setNuevoPass] = useState("");

  const navigate = useNavigate();

  const API_URL = "http://100.30.44.192:8080/auth";

 
  const registrarUsuario = (e) => {
    e.preventDefault();
   
    alert("Para crear cuentas reales de administrador, usa Swagger por el momento.");
    setModoRegistro(false);
  };

 

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Enviando credenciales a AWS...");
      
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usuario,
          password: contrasena,
        }),
      });

      if (response.ok) {
        const token = await response.text();
        
        // Guardamos datos
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", usuario);
        
        console.log("Login exitoso.");
       
        
        
        navigate("/admin"); 
        
      } else {
        setError("Usuario o contraseña incorrectos (Revisa Swagger)");
      }
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor AWS");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/img/totalfondo.jpg')", // Ajusta si tu ruta es diferente
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
          
          <p style={{textAlign: "center", fontSize: "0.8rem", color: "gray"}}>
            (Usa Swagger para crear usuarios Admin)
          </p>

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

          <label>Usuario (admin):</label>
          <input
            type="text"
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
              cursor: "pointer"
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
              cursor: "pointer"
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