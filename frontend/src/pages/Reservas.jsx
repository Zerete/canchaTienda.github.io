import { useEffect, useState } from "react";
import CanchaCard from "../components/CanchaCard";

function Reservas() {
  const [canchas, setCanchas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoria, setCategoria] = useState("Todas");


  const API_URL = "http://100.30.44.192:8080/api/productos";

  useEffect(() => {
    const fetchCanchas = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Error al conectar con AWS");
        
        const data = await res.json();
        
        const dataAdaptada = data.map((producto) => ({
            id: producto.id,
            nombre: producto.nombre,
            descripcion: producto.descripcion || "", 
            imagen: producto.imagen || "https://via.placeholder.com/300", 
            precioHora: producto.precio
        }));

        setCanchas(dataAdaptada.reverse());
        setLoading(false);
      } catch (err) {
        console.error("Error cargando canchas:", err);
        setLoading(false);
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

    const busqueda = normalizar(categoria);
    const nombreNorm = normalizar(cancha.nombre);
    const descNorm = normalizar(cancha.descripcion);

    return nombreNorm.includes(busqueda) || descNorm.includes(busqueda);
  });

  const btnStyle = (cat) => ({
    padding: "10px 20px",
    margin: "5px",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "bold",
    backgroundColor: categoria === cat ? "#ffc107" : "rgba(255,255,255,0.2)",
    color: categoria === cat ? "#000" : "#fff",
    transition: "all 0.3s ease",
    border: "1px solid rgba(255,255,255,0.3)"
  });

  return (
    <div style={{ padding: "2rem", minHeight: "100vh" }}>
      
  
      <section style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#fff", marginBottom: "10px" }}>
          Reserva tu cancha 📅
        </h1>
        <p style={{ color: "#e0e0e0", fontSize: "1.1rem" }}>
          Selecciona la categoría, elige tu cancha y agrégala al carrito.
        </p>
      </section>

     
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", marginBottom: "40px" }}>
        <button onClick={() => setCategoria("Todas")} style={btnStyle("Todas")}>Todas</button>
        <button onClick={() => setCategoria("Futbol")} style={btnStyle("Futbol")}>⚽ Fútbol</button>
        <button onClick={() => setCategoria("Basquet")} style={btnStyle("Basquet")}>🏀 Básquet</button>
        <button onClick={() => setCategoria("Tenis")} style={btnStyle("Tenis")}>🎾 Tenis</button>
        <button onClick={() => setCategoria("Voley")} style={btnStyle("Voley")}>🏐 Vóley</button>
      </div>


      {loading ? (
        <p style={{textAlign: "center", color: "white", fontSize: "1.2rem"}}>Cargando disponibilidad...</p>
      ) : (
        <div style={{ 
            display: "flex",              
            flexWrap: "wrap",            
            justifyContent: "center",    
            gap: "2rem",
            maxWidth: "1200px",
            margin: "0 auto"
        }}>
          {canchasFiltradas.length > 0 ? (
            canchasFiltradas.map(cancha => (
                
                <div key={cancha.id} style={{ width: "300px", flexGrow: 1, maxWidth: "350px" }}>
                    <CanchaCard cancha={cancha} />
                </div>
            ))
          ) : (
            <div style={{textAlign: "center", color: "#ccc", padding: "40px", width: "100%"}}>
                <h3>😕 No hay canchas disponibles para {categoria}</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Reservas;