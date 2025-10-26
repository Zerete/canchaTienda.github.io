import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Canchas = () => {
  const [canchas, setCanchas] = useState([]);

  useEffect(() => {
    const fetchCanchas = async () => {
      try {
        const res = await fetch("/canchas.json");
        const data = await res.json();
        setCanchas(data);
      } catch (err) {
        console.error("Error cargando canchas:", err);
      }
    };

    fetchCanchas();
  }, []);

  if (canchas.length === 0) return <p>Cargando canchas...</p>;

  return (
    <div className="container py-5">
      <h1 style={{ color: "#fff", fontWeight: "bold" }}>Canchas disponibles</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {canchas.map((c) => (
          <div
            key={c.id}
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              padding: "10px",
              borderRadius: "10px",
              width: "250px",
              textAlign: "center",
            }}
          >
            <img
              src={c.imagen}
              alt={c.nombre}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h3 style={{ color: "#fff" }}>{c.nombre}</h3>
            <p style={{ color: "#f5f5f5" }}>{c.descripcion}</p>
            <Link
              to={`/canchas/${c.id}`}
              style={{
                display: "inline-block",
                marginTop: "10px",
                padding: "0.5rem 1rem",
                backgroundColor: "#0d6efd",
                color: "#fff",
                borderRadius: "5px",
                textDecoration: "none",
              }}
            >
              Ver detalle
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Canchas;
