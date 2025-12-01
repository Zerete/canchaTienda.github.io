// src/pages/Pago.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Fútbol
import formacionImg from "../assets/img/formacion.jpg";
import formacionImgB from "../assets/img/formacionb.jpg";

// Basquet (solo 1 imagen)
import basquetA from "../assets/img/basquetA.jpg";

// Voley (solo 1 imagen)
import voleyA from "../assets/img/vole.jpg";

// Tenis (solo 1 imagen)
import tenisA from "../assets/img/tenisA.jpg";

// POSICIONES — FUTBOL
const posicionesFutbol = [
  { top: 260, left: 230 },
  { top: 225, left: 80 },
  { top: 225, left: 176 },
  { top: 225, left: 282 },
  { top: 225, left: 383 },
  { top: 163, left: 69 },
  { top: 163, left: 183 },
  { top: 163, left: 284 },
  { top: 163, left: 388 },
  { top: 80, left: 311 },
  { top: 80, left: 153 },
];

// POSICIONES — BASQUET (10)
const posicionesBasquet = [
  { top: 220, left: 150 },
  { top: 220, left: 50 },
  { top: 50, left: 150 },
  { top: 140, left: 210 },
  { top: 50, left: 50 },
  { top: 140, left: 260 },
  { top: 220, left: 300 },
  { top: 50, left: 300 },
  { top: 220, left: 400 },
  { top: 50, left: 400 },
];

// POSICIONES — VOLEY (12)
const posicionesVoley = Array.from({ length: 12 }, (_, i) => ({
  top: 250 - (i % 6) * 25,
  left: 200 + (i >= 6 ? 100 : -100),
}));

// POSICIONES — TENIS (4)
const posicionesTenis = [
  { top: 170, left: 290 },
  { top: 170, left: 200 },
  { top: 130, left: 200 },
  { top: 130, left: 290 },
];

// 🔥 NUEVO SISTEMA DE HORARIOS (1h 30min — 10:00 → 22:00)
const generarHoras = () => {
  const horas = [];
  let hora = 10;
  let minutos = 0;

  while (hora < 22 || (hora === 22 && minutos === 0)) {
    const h = hora.toString().padStart(2, "0");
    const m = minutos.toString().padStart(2, "0");
    horas.push(`${h}:${m}`);

    // SUMA 90 MINUTOS EXACTOS
    minutos += 90;
    if (minutos >= 60) {
      hora += Math.floor(minutos / 60); // suma 1 o 2 horas según corresponda
      minutos = minutos % 60;           // convierte 120 → 0, 90 → 30
    }
  }

  return horas;
};

const horasDisponibles = generarHoras();

// RETORNA SOLO LO NECESARIO SEGÚN DEPORTE
const obtenerImagenCancha = (nombreCancha) => {
  const lower = nombreCancha.toLowerCase();

  if (lower.includes("fútbol") || lower.includes("futbol")) {
    return {
      equipoA: formacionImg,
      equipoB: formacionImgB,
      posiciones: posicionesFutbol,
      cantidad: 11,
      doble: true,
    };
  }

  if (lower.includes("básquet") || lower.includes("basquet")) {
    return {
      equipoA: basquetA,
      posiciones: posicionesBasquet,
      cantidad: 10,
      doble: false,
    };
  }

  if (
    lower.includes("volley") ||
    lower.includes("voleibol") ||
    lower.includes("volleyball") ||
    lower.includes("vóley") ||
    lower.includes("voley")
  ) {
    return {
      equipoA: voleyA,
      posiciones: posicionesVoley,
      cantidad: 12,
      doble: false,
    };
  }

  if (lower.includes("tenis")) {
    return {
      equipoA: tenisA,
      posiciones: posicionesTenis,
      cantidad: 4,
      doble: false,
    };
  }

  return null;
};

const Pago = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const cancha = state?.canchaSeleccionada;

  if (!cancha) {
    return <p style={{ color: "#fff", textAlign: "center" }}>No se seleccionó ninguna cancha.</p>;
  }

  // FORMULARIO
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tarjeta, setTarjeta] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [jugadores, setJugadores] = useState([{ nombre: "", rut: "" }]);
  const [error, setError] = useState("");

  // 🔥 LIMITE SEGÚN EL DEPORTE
  const agregarJugador = () => {
    const nombreCancha = cancha.nombre.toLowerCase();
    let maxJugadores = 22;

    if (nombreCancha.includes("tenis")) maxJugadores = 4;
    if (nombreCancha.includes("básquet") || nombreCancha.includes("basquet")) maxJugadores = 10;
    if (
      nombreCancha.includes("volley") ||
      nombreCancha.includes("voleibol") ||
      nombreCancha.includes("volleyball") ||
      nombreCancha.includes("voley")
    )
      maxJugadores = 12;

    if (jugadores.length >= maxJugadores) return;

    setJugadores([...jugadores, { nombre: "", rut: "" }]);
  };

  const eliminarJugador = (index) => {
    if (jugadores.length === 1) return;
    const nuevos = [...jugadores];
    nuevos.splice(index, 1);
    setJugadores(nuevos);
  };

  const handleJugadorChange = (index, field, value) => {
    const nuevos = [...jugadores];
    nuevos[index][field] = value.slice(0, field === "nombre" ? 11 : value.length);
    setJugadores(nuevos);
  };

  const validarRut = (rut) => /^[0-9]+[-]?[0-9kK]?$/.test(rut);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre) return setError("Por favor ingresa tu nombre.");
    if (!email.includes("@")) return setError("Email inválido.");
    if (telefono.length < 8) return setError("Teléfono inválido.");
    if (tarjeta.length !== 16) return setError("Tarjeta inválida.");
    if (!fecha) return setError("Selecciona una fecha.");
    if (!hora) return setError("Selecciona una hora.");

    for (let i = 0; i < jugadores.length; i++) {
      const j = jugadores[i];
      if (!j.nombre) return setError(`Falta el nombre del jugador ${i + 1}`);
      if (!j.rut || !validarRut(j.rut)) return setError(`RUT inválido del jugador ${i + 1}`);
    }

    alert(`✅ Reserva confirmada!\nCancha: ${cancha.nombre}\nGracias ${nombre}\nFecha: ${fecha} – ${hora}`);

    navigate("/");
  };

  const data = obtenerImagenCancha(cancha.nombre);
  const equipoA = jugadores.slice(0, data.cantidad);

  return (
    <div style={{ width: "90%", margin: "20px auto", color: "#fff" }}>
      <h1 style={{ textAlign: "center" }}>Confirmar Pago</h1>

      {/* ---------- CANCHA Y JUGADORES ---------- */}
      <div style={{ marginBottom: "30px" }}>
        {data.doble ? (
          /* FÚTBOL A + B */
          <div style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
            {/* EQUIPO A */}
            <div style={{ position: "relative", width: "500px", height: "300px" }}>
              <img src={data.equipoA} style={{ width: "100%", height: "100%", borderRadius: "10px" }} />
              {equipoA.map((j, i) => {
                const pos = data.posiciones[i];
                return (
                  j.nombre && (
                    <span
                      key={i}
                      style={{
                        position: "absolute",
                        top: pos.top,
                        left: pos.left,
                        color: "yellow",
                        fontWeight: "bold",
                        textShadow: "1px 1px 3px black",
                      }}
                    >
                      {j.nombre}
                    </span>
                  )
                );
              })}
            </div>

            {/* EQUIPO B */}
            <div style={{ position: "relative", width: "500px", height: "300px" }}>
              <img src={data.equipoB} style={{ width: "100%", height: "100%", borderRadius: "10px" }} />

              {jugadores.slice(11, 22).map((j, i) => {
                const pos = data.posiciones[i];
                return (
                  j.nombre && (
                    <span
                      key={i}
                      style={{
                        position: "absolute",
                        top: pos.top,
                        left: pos.left,
                        color: "orange",
                        fontWeight: "bold",
                        textShadow: "1px 1px 3px black",
                      }}
                    >
                      {j.nombre}
                    </span>
                  )
                );
              })}
            </div>
          </div>
        ) : (
          /* UNA IMAGEN (Basquet, Voley, Tenis) */
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: "500px", height: "300px" }}>
              <img src={data.equipoA} style={{ width: "100%", height: "100%", borderRadius: "10px" }} />

              {equipoA.map((j, i) => {
                const pos = data.posiciones[i];
                return (
                  j.nombre && (
                    <span
                      key={i}
                      style={{
                        position: "absolute",
                        top: pos.top,
                        left: pos.left,
                        color: "yellow",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        writingMode: "horizontal-tb",
                        rotate: "0deg",
                        textShadow: "1px 1px 3px black",
                      }}
                    >
                      {j.nombre}
                    </span>
                  )
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ---------- FORMULARIO ---------- */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input placeholder="Nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} style={{ color: "#000" }} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ color: "#000" }} />
        <input placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} style={{ color: "#000" }} />
        <input placeholder="Número de tarjeta" value={tarjeta} onChange={(e) => setTarjeta(e.target.value)} style={{ color: "#000" }} />
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} style={{ color: "#000" }} />

        <select value={hora} onChange={(e) => setHora(e.target.value)} style={{ color: "#000" }}>
          <option>Selecciona la hora</option>
          {horasDisponibles.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>

        <h3>Jugadores</h3>

        {jugadores.map((j, i) => (
          <div key={i} style={{ display: "flex", gap: "10px" }}>
            <input
              placeholder={`Jugador ${i + 1}`}
              value={j.nombre}
              maxLength={11}
              onChange={(e) => handleJugadorChange(i, "nombre", e.target.value)}
              style={{ color: "#000", flex: 1 }}
            />
            <input
              placeholder="RUT"
              value={j.rut}
              onChange={(e) => handleJugadorChange(i, "rut", e.target.value)}
              style={{ color: "#000", width: "150px" }}
            />
            <button type="button" onClick={() => eliminarJugador(i)} style={{ backgroundColor: "red", color: "white" }}>
              X
            </button>
          </div>
        ))}

        <button type="button" onClick={agregarJugador} style={{ backgroundColor: "blue", color: "white" }}>
          Agregar jugador
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" style={{ backgroundColor: "#28a745", color: "white", padding: "10px" }}>
          Confirmar pago
        </button>
      </form>
    </div>
  );
};

export default Pago;
