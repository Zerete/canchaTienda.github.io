import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Canchas = () => {
  const [canchas, setCanchas] = useState([]);
  const [categoria, setCategoria] = useState("Todas");

  const API_URL = "http://100.30.44.192:8080/api/productos";

  useEffect(() => {
    const fetchCanchas = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Error en red");
        const data = await res.json();
        

        const dataAdaptada = data.map((producto) => ({
            id: producto.id,
            nombre: producto.nombre,
            descripcion: producto.descripcion || "",
            imagen: producto.imagen || "https://via.placeholder.com/300", 
            precioHora: producto.precio
        }));

        setCanchas(dataAdaptada.reverse());
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchCanchas();
  }, []);

  
  const normalizar = (texto) => {
    return texto
      ? texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
      : "";
  };

  const canchasFiltradas = canchas.filter((cancha) => {
    if (categoria === "Todas") return true;

    const textoBusqueda = normalizar(categoria);
    const nombreNormalizado = normalizar(cancha.nombre);
    const descNormalizada = normalizar(cancha.descripcion);

   
    return nombreNormalizado.includes(textoBusqueda) || descNormalizada.includes(textoBusqueda);
  });

  // Estilos de botones
  const btnStyle = (cat) => ({
    padding: "10px 20px",
    margin: "5px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    backgroundColor: categoria === cat ? "#0d6efd" : "#e9ecef", 
    color: categoria === cat ? "white" : "#333",
    transition: "all 0.3s ease"
  });

  return (
    <div className="container py-5">
      <div style={{textAlign: "center", marginBottom: "30px"}}>
        <h1 style={{ color: "#fff", fontWeight: "bold" }}>Canchas disponibles 🏟️</h1>
        <p style={{ color: "#ccc" }}>Filtra por tu deporte favorito</p>
      </div>

      {/* BOTONES DE FILTRO */}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", marginBottom: "40px" }}>
        <button onClick={() => setCategoria("Todas")} style={btnStyle("Todas")}>Todas</button>
        <button onClick={() => setCategoria("Futbol")} style={btnStyle("Futbol")}>⚽ Fútbol</button>
        <button onClick={() => setCategoria("Basquet")} style={btnStyle("Basquet")}>🏀 Básquet</button>
        <button onClick={() => setCategoria("Tenis")} style={btnStyle("Tenis")}>🎾 Tenis</button>
        <button onClick={() => setCategoria("Voley")} style={btnStyle("Voley")}>🏐 Vóley</button>
      </div>

      {/* LISTA */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {canchasFiltradas.length > 0 ? (
            canchasFiltradas.map((c) => (
            <div key={c.id} style={{
                backgroundColor: "rgba(255,255,255,0.1)", 
                padding: "15px", borderRadius: "15px", width: "300px", textAlign: "center",
                boxShadow: "0 4px 6px rgba(0,0,0,0.3)"
            }}>
                <img src={c.imagen} alt={c.nombre} style={{ width: "100%", borderRadius: "10px", height: "180px", objectFit: "cover" }} 
                     onError={(e) => {e.target.src = "https://via.placeholder.com/300?text=Imagen"}}/>
                
                <h3 style={{ color: "#fff", marginTop: "15px" }}>{c.nombre}</h3>
                <div style={{color: "#0d6efd", fontWeight: "bold", fontSize: "1.2rem"}}>${c.precioHora?.toLocaleString()} / hora</div>
                
                {/* Mostramos la descripción pero limpiando la etiqueta de categoría si la tiene */}
                <p style={{ color: "#ccc", fontSize: "0.9rem", height: "40px", overflow: "hidden" }}>
                    {c.descripcion.replace(/\[.*?\]/g, "")} 
                </p>

                <Link to={`/canchas/${c.id}`} style={{
                    display: "inline-block", marginTop: "10px", padding: "10px 20px",
                    backgroundColor: "#0d6efd", color: "#fff", borderRadius: "25px", textDecoration: "none", width: "100%"
                }}>Reservar</Link>
            </div>
            ))
        ) : (
            <div style={{textAlign: "center", padding: "50px", color: "white"}}>
                <h3>😕 No hay canchas de {categoria}</h3>
            </div>
        )}
      </div>
    </div>
  );
};

export default Canchas;