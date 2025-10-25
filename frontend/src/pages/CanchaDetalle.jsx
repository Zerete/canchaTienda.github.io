import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const CanchaDetalle = () => {
  const { id } = useParams();
  const [detalle, setDetalle] = useState(null);

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        const res = await fetch("/canchas.json");
        const data = await res.json();
        const cancha = data.find((c) => c.id === Number(id));
        setDetalle(cancha);
      } catch (err) {
        console.error("Error cargando detalle:", err);
      }
    };

    fetchDetalle();
  }, [id]);

  if (!detalle) return <p>Cargando...</p>;

  return (
    <div className="container py-5">
      <h1 style={{ color: "#fff", fontWeight: "bold" }}>{detalle.nombre}</h1>
      <img
        src={detalle.imagen}
        alt={detalle.nombre}
        style={{ width: "100%", borderRadius: "10px", margin: "20px 0" }}
      />
      <p style={{ color: "#f5f5f5" }}><strong>Tipo de Superficie:</strong> {detalle["Tipo de Superficie"]}</p>
      <p style={{ color: "#f5f5f5" }}><strong>Dimensiones:</strong> {detalle["Dimensiones de la Cancha"]}</p>
      <p style={{ color: "#f5f5f5" }}><strong>Medidas del arco:</strong> {detalle.Medidas}</p>
      <p style={{ color: "#f5f5f5" }}><strong>Jugadores:</strong> {detalle.Jugadores}</p>
      <p style={{ color: "#f5f5f5" }}>{detalle.descripcion}</p>
      <p style={{ color: "#f5f5f5" }}><strong>Ubicación:</strong> {detalle.ubicacion}</p>
      <p style={{ color: "#f5f5f5" }}><strong>Precio por hora:</strong> ${detalle.precioHora}</p>
    </div>
  );
};

export default CanchaDetalle;
