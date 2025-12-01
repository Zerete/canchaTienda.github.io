import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Canchas = () => {
  const [canchas, setCanchas] = useState([]);

  
  
  const API_URL = "http://100.30.44.192:8080/api/productos";

  useEffect(() => {
    const fetchCanchas = async () => {
      try {
        console.log("Intentando conectar a:", API_URL);
        const res = await fetch(API_URL);
        
        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status}`);
        }

        const data = await res.json();
        console.log("Datos recibidos de AWS:", data);

        // ADAPTADOR: Transformamos los datos de Java para que React los entienda
        // Si Java no manda imagen, usamos una por defecto.
        const dataAdaptada = data.map((producto) => ({
            id: producto.id,
            nombre: producto.nombre,
            // Usamos el precio como descripción si no hay descripción
            descripcion: producto.descripcion || `Precio por hora: $${producto.precio}`, 
            // Imagen por defecto si no viene del backend
            imagen: producto.imagen || "https://images.unsplash.com/photo-1579952363873-27f3bde9be2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", 
            precioHora: producto.precio
        }));

        setCanchas(dataAdaptada);
      } catch (err) {
        console.error("Error cargando canchas desde AWS:", err);
      }
    };

    fetchCanchas();
  }, []);

  if (canchas.length === 0) return (
    <div className="container py-5 text-center">
        <p style={{color: "white"}}>Cargando canchas desde AWS... (Si tarda mucho, verifica que tengas productos creados)</p>
    </div>
  );

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
              style={{ width: "100%", borderRadius: "10px", height: "150px", objectFit: "cover" }}
            />
            <h3 style={{ color: "#fff", marginTop: "10px" }}>{c.nombre}</h3>
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