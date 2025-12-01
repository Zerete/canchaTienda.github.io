import React, { useState } from "react";

function Admin() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [canchas, setCanchas] = useState(
    JSON.parse(localStorage.getItem("canchas")) || []
  );

  const agregarCancha = (e) => {
    e.preventDefault();

    const nueva = { id: Date.now(), nombre, precioHora: Number(precio), imagen };

    const actualizadas = [...canchas, nueva];
    setCanchas(actualizadas);

    localStorage.setItem("canchas", JSON.stringify(actualizadas));

    alert("Cancha agregada correctamente");

    setNombre("");
    setPrecio("");
    setImagen("");
  };

  return (
    <div style={{ padding: "2rem", color: "#fff" }}>
      <h1>Panel Administrador</h1>
      <h2>Agregar Cancha</h2>

      <form onSubmit={agregarCancha} style={{ maxWidth: "400px" }}>
        <input
          type="text"
          placeholder="Nombre de la cancha"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <input
          type="number"
          placeholder="Precio por hora"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <input
          type="text"
          placeholder="URL de imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#0d6efd",
            color: "white",
            padding: "10px",
            width: "100%",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Agregar Cancha
        </button>
      </form>

      <hr />

      <h2>Canchas Registradas</h2>

      {canchas.length === 0 ? (
        <p>No hay canchas agregadas.</p>
      ) : (
        <ul>
          {canchas.map((c) => (
            <li key={c.id}>
              {c.nombre} - ${c.precioHora}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Admin;
