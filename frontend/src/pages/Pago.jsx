import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";

const Pago = () => {
  const { carrito, total, vaciarCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tarjeta, setTarjeta] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre) return setError("Por favor ingresa tu nombre.");
    if (!email.includes("@")) return setError("Email inválido.");
    if (telefono.length < 8) return setError("Teléfono inválido (mínimo 8 dígitos).");
    if (tarjeta.length !== 16 || isNaN(tarjeta)) return setError("Tarjeta inválida (16 números).");

    alert(`✅ Reserva confirmada!\nGracias ${nombre} por tu pago de $${total.toLocaleString()}`);
    vaciarCarrito();
    navigate("/");
  };

  if (carrito.length === 0) 
    return <p style={{ textAlign: "center", marginTop: "20px", color: "#fff" }}>No hay canchas en el carrito.</p>;

  return (
    <div style={{ width: "80%", margin: "20px auto", color: "#fff" }}>
      <h1 style={{ textAlign: "center" }}>Confirmar Pago</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Canchas a reservar:</h2>
        {carrito.map((c) => (
          <div key={c.id} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <img src={c.imagen} alt={c.nombre} style={{ width: "120px", marginRight: "10px", borderRadius: "5px" }} />
            <div>
              <p style={{ color: "#fff" }}><strong>{c.nombre}</strong></p>
              <p style={{ color: "#fff" }}>${c.precioHora?.toLocaleString()} / hora</p>
            </div>
          </div>
        ))}
        <p style={{ fontWeight: "bold", color: "#fff" }}>Total a pagar: ${total.toLocaleString()}</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{ color: "#000" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ color: "#000" }}
        />
        <input
          type="tel"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          style={{ color: "#000" }}
        />
        <input
          type="text"
          placeholder="Número de tarjeta"
          value={tarjeta}
          onChange={(e) => setTarjeta(e.target.value)}
          style={{ color: "#000" }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Pagar y confirmar reserva
        </button>
      </form>
    </div>
  );
};

export default Pago;
