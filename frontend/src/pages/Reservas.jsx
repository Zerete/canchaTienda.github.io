import { useEffect, useState } from "react";
import CanchaCard from "../components/CanchaCard";

function Reservas() {
  const [canchas, setCanchas] = useState([]);

  useEffect(() => {
    fetch("/canchas.json")
      .then(res => res.json())
      .then(data => setCanchas(data))
      .catch(err => console.error("Error cargando canchas:", err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <section style={{ textAlign: "center", marginBottom: "2rem" }}>

  <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#fff" }}>
    Reserva tu cancha
  </h1>
  <p style={{ color: "#f5f5f5" }}>
    Selecciona la cancha que quieras reservar y agrégala al carrito.
  </p>
</section>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
        {canchas.map(cancha => <CanchaCard key={cancha.id} cancha={cancha} />)}
      </div>
    </div>
  );
}

export default Reservas;
