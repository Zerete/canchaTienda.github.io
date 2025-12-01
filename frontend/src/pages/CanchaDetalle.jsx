import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const CanchaDetalle = () => {
  const { id } = useParams();
  const [detalle, setDetalle] = useState(null);

  // ✅ 1. Usamos la IP Elástica de tu servidor AWS
  const API_URL = `http://100.30.44.192:8080/api/productos/${id}`;

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        console.log("Buscando detalle en:", API_URL);
        const res = await fetch(API_URL);
        
        if (!res.ok) {
            throw new Error("No se pudo encontrar la cancha");
        }

        const data = await res.json();
        
        // ✅ 2. Adaptamos los datos: 
        // Como el backend no tiene campos separados para "Dimensiones" o "Jugadores",
        // ponemos valores por defecto o usamos la descripción para que no se rompa la página.
        const canchaAdaptada = {
            ...data,
            precioHora: data.precio, // El backend manda 'precio', tu frontend usa 'precioHora'
            // Si la imagen viene vacía, ponemos una por defecto
            imagen: data.imagen || "https://images.unsplash.com/photo-1579952363873-27f3bde9be2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        };

        setDetalle(canchaAdaptada);
      } catch (err) {
        console.error("Error cargando detalle:", err);
      }
    };

    fetchDetalle();
  }, [id]);

  if (!detalle) return <p style={{color: "white", textAlign: "center", marginTop: "50px"}}>Cargando detalles de la cancha...</p>;

  return (
    <div className="container py-5">
      <h1 style={{ color: "#fff", fontWeight: "bold" }}>{detalle.nombre}</h1>
      <img
        src={detalle.imagen}
        alt={detalle.nombre}
        style={{ width: "100%", borderRadius: "10px", margin: "20px 0", maxHeight: "400px", objectFit: "cover" }}
      />
      
      
      
      <p style={{ color: "#f5f5f5" }}><strong>Descripción:</strong> {detalle.descripcion}</p>
      
      
      <p style={{ color: "#f5f5f5" }}><strong>Dimensiones:</strong> Estándar Profesional</p>
      <p style={{ color: "#f5f5f5" }}><strong>Medidas del arco:</strong> Reglamentarias</p>
      <p style={{ color: "#f5f5f5" }}><strong>Jugadores:</strong> 5 vs 5 / 7 vs 7</p>
      <p style={{ color: "#f5f5f5" }}><strong>Ubicación:</strong> Sede Central</p>
      
      <p style={{ color: "#f5f5f5", fontSize: "1.2rem", marginTop: "10px" }}>
        <strong>Precio por hora:</strong> <span style={{color: "#28a745"}}>${detalle.precioHora?.toLocaleString()}</span>
      </p>
    </div>
  );
};

export default CanchaDetalle;