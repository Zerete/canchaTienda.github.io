import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { useNavigate } from "react-router-dom";

const Carrito = () => {
  const { carrito, eliminarCancha, vaciarCarrito, total } = useContext(CarritoContext);
  const navigate = useNavigate();

  if (carrito.length === 0) 
    return <p style={{ textAlign: "center", marginTop: "20px", color: "#fff" }}>No hay canchas en el carrito.</p>;

  return (
    <div style={{
      width: "80%",
      margin: "20px auto",
      color: "#fff"  // ← todo el texto en blanco
    }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Carrito de Reservas</h1>

      {carrito.map(c => (
        <div key={c.id} style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "15px",
          borderBottom: "1px solid #fff",
          paddingBottom: "10px"
        }}>
          <img src={c.imagen} alt={c.nombre} style={{ width: "150px", borderRadius: "8px", marginRight: "15px" }} />
          <div style={{ flex: 1 }}>
            <h3 style={{ color: "#fff" }}>{c.nombre}</h3>
            <p style={{ color: "#fff" }}><strong>Superficie:</strong> {c["Tipo de Superficie"]}</p>
            <p style={{ color: "#fff" }}><strong>Precio:</strong> ${c.precioHora?.toLocaleString()} / hora</p>
          </div>
          <button
            onClick={() => eliminarCancha(c.id)}
            style={{
              padding: "6px 10px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Eliminar
          </button>
        </div>
      ))}

      <div style={{ textAlign: "right", fontSize: "18px", fontWeight: "bold", marginTop: "20px", color: "#fff" }}>
        Total: ${total.toLocaleString()}
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={() => navigate("/pago")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px"
          }}
        >
          Confirmar reserva
        </button>
        <button
          onClick={vaciarCarrito}
          style={{
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Vaciar carrito
        </button>
      </div>
    </div>
  );
};

export default Carrito;
