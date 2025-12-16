import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';


import formacionImg from "../assets/img/formacion.jpg";
import formacionImgB from "../assets/img/formacionb.jpg";
import basquetA from "../assets/img/basquetA.jpg";
import voleyA from "../assets/img/vole.jpg";
import tenisA from "../assets/img/tenisA.jpg";


const posicionesFutbol = [
  { top: 260, left: 230 }, { top: 225, left: 80 }, { top: 225, left: 176 },
  { top: 225, left: 282 }, { top: 225, left: 383 }, { top: 163, left: 69 },
  { top: 163, left: 183 }, { top: 163, left: 284 }, { top: 163, left: 388 },
  { top: 80, left: 311 }, { top: 80, left: 153 },
];

const posicionesBasquet = [
  { top: 220, left: 150 }, { top: 220, left: 50 }, { top: 50, left: 150 },
  { top: 140, left: 210 }, { top: 50, left: 50 }, { top: 140, left: 260 },
  { top: 220, left: 300 }, { top: 50, left: 300 }, { top: 220, left: 400 },
  { top: 50, left: 400 },
];

const posicionesVoley = Array.from({ length: 12 }, (_, i) => ({
  top: 250 - (i % 6) * 25,
  left: 200 + (i >= 6 ? 100 : -100),
}));

const posicionesTenis = [
  { top: 170, left: 290 }, { top: 170, left: 200 },
  { top: 130, left: 200 }, { top: 130, left: 290 },
];

const generarHoras = () => {
  const horas = [];
  let hora = 10;
  let minutos = 0;
  while (hora < 22 || (hora === 22 && minutos === 0)) {
    const h = hora.toString().padStart(2, "0");
    const m = minutos.toString().padStart(2, "0");
    horas.push(`${h}:${m}`);
    minutos += 90;
    if (minutos >= 60) {
      hora += Math.floor(minutos / 60);
      minutos = minutos % 60;
    }
  }
  return horas;
};

const horasDisponibles = generarHoras();

const obtenerImagenCancha = (nombreCancha) => {
  const lower = nombreCancha.toLowerCase();

  if (lower.includes("fútbol") || lower.includes("futbol")) {
    return { equipoA: formacionImg, equipoB: formacionImgB, posiciones: posicionesFutbol, cantidad: 11, doble: true };
  }
  if (lower.includes("básquet") || lower.includes("basquet")) {
    return { equipoA: basquetA, posiciones: posicionesBasquet, cantidad: 10, doble: false };
  }
  if (lower.includes("volley") || lower.includes("voleibol") || lower.includes("vóley") || lower.includes("voley")) {
    return { equipoA: voleyA, posiciones: posicionesVoley, cantidad: 12, doble: false };
  }
  if (lower.includes("tenis")) {
    return { equipoA: tenisA, posiciones: posicionesTenis, cantidad: 4, doble: false };
  }
  return null; 
};


const Pago = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const cancha = state?.canchaSeleccionada;
  

  const mapaRef = useRef(null); 

  if (!cancha) {
    return <p style={{ color: "#fff", textAlign: "center", marginTop: "50px" }}>⚠️ No se seleccionó ninguna cancha. Vuelve al inicio.</p>;
  }

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tarjeta, setTarjeta] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [jugadores, setJugadores] = useState([{ nombre: "", rut: "" }]);
  const [error, setError] = useState("");

  const agregarJugador = () => {
    const nombreCancha = cancha.nombre.toLowerCase();
    let maxJugadores = 22;
    if (nombreCancha.includes("tenis")) maxJugadores = 4;
    if (nombreCancha.includes("básquet") || nombreCancha.includes("basquet")) maxJugadores = 10;
    if (nombreCancha.includes("volley") || nombreCancha.includes("voley")) maxJugadores = 12;

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


  const descargarMapa = async () => {
    if (mapaRef.current) {
        const canvas = await html2canvas(mapaRef.current, { useCORS: true, backgroundColor: "#222" });
        const link = document.createElement('a');
        link.download = `Formacion-${cancha.nombre}.png`;
        link.href = canvas.toDataURL();
        link.click();
        
        Swal.fire({
            icon: 'success',
            title: '¡Descargado!',
            text: 'La imagen de la formación se guardó en tu equipo.',
            timer: 1500,
            showConfirmButton: false
        });
    }
  };

  const compartirMapa = async () => {
    if (mapaRef.current) {
        const canvas = await html2canvas(mapaRef.current, { useCORS: true });
        canvas.toBlob(async (blob) => {
            const file = new File([blob], "formacion.png", { type: "image/png" });
            if (navigator.share) {
                try {
                    await navigator.share({
                        files: [file],
                        title: 'Nuestra Formación',
                        text: `Jugadores confirmados para ${cancha.nombre} ⚽`,
                    });
                } catch (error) {
                    console.log("Cancelado");
                }
            } else {
                Swal.fire('Info', 'Tu dispositivo no soporta compartir directo, usa el botón de Descargar.', 'info');
            }
        });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

 
    if (!nombre) return setError("Por favor ingresa tu nombre.");
    if (!email.includes("@")) return setError("Email inválido.");
    if (telefono.length < 8) return setError("Teléfono inválido.");
    if (tarjeta.length !== 16) return setError("Tarjeta inválida (16 dígitos).");
    if (!fecha) return setError("Selecciona una fecha.");
    if (!hora) return setError("Selecciona una hora.");

    for (let i = 0; i < jugadores.length; i++) {
      const j = jugadores[i];
      if (!j.nombre) return setError(`Falta el nombre del jugador ${i + 1}`);
      if (!j.rut || !validarRut(j.rut)) return setError(`RUT inválido del jugador ${i + 1}`);
    }

    setError(""); 

   
    const datosReserva = {
        canchaId: cancha.id,           
        nombreCancha: cancha.nombre,   
        fecha: fecha,                  
        hora: hora,                    
        cliente: nombre
    };

    try {
        
        const response = await fetch("http://100.30.44.192:8080/api/reservas/crear", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datosReserva)
        });

    
        if (response.ok) {
       
            Swal.fire({
                title: '¡Reserva Confirmada!',
                html: `<b>Cancha:</b> ${cancha.nombre}<br><b>Cliente:</b> ${nombre}<br><b>Horario:</b> ${fecha} a las ${hora}`,
                icon: 'success',
                confirmButtonText: 'Volver al Inicio',
                confirmButtonColor: '#28a745'
            }).then((result) => {
                if (result.isConfirmed) navigate("/");
            });

        } else if (response.status === 409) {
           
            const errorMsg = await response.text(); 
            Swal.fire({
                icon: 'error',
                title: '¡Horario No Disponible!',
                text: '⚠️ Lo sentimos, alguien acaba de reservar esta hora antes que tú. Por favor elige otro horario.',
                confirmButtonColor: '#d33'
            });

        } else {
             
             Swal.fire('Error', 'Hubo un problema al procesar la reserva. Intenta nuevamente.', 'error');
        }

    } catch (error) {
        console.error("Error de conexión:", error);
        
        Swal.fire('Error de Red', 'No se pudo conectar con el servidor. Verifica tu conexión o intenta más tarde.', 'error');
    }
  };


  const data = obtenerImagenCancha(cancha.nombre) || { equipoA: '', posiciones: [], cantidad: 0 };
  const equipoA = jugadores.slice(0, data.cantidad);

  return (
    <div style={{ width: "90%", margin: "20px auto", color: "#fff" }}>
      <h1 style={{ textAlign: "center" }}>Confirmar Pago</h1>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        
        <div ref={mapaRef} style={{ 
            display: "inline-block", 
            padding: "20px", 
            backgroundColor: "#333", 
            borderRadius: "15px",
            marginBottom: "15px"
        }}>
            <h3 style={{margin: "0 0 10px 0", color: "#ffc107"}}>{cancha.nombre} - Formación</h3>
            
            {data.doble ? (
            
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
                <div style={{ position: "relative", width: "500px", height: "300px" }}>
                <img src={data.equipoA} style={{ width: "100%", height: "100%", borderRadius: "10px" }} alt="Equipo A" />
                {equipoA.map((j, i) => {
                    const pos = data.posiciones[i];
                    return j.nombre && pos && (
                        <span key={i} style={{ position: "absolute", top: pos.top, left: pos.left, color: "yellow", fontWeight: "bold", textShadow: "1px 1px 3px black" }}>
                        {j.nombre}
                        </span>
                    );
                })}
                </div>

                <div style={{ position: "relative", width: "500px", height: "300px" }}>
                <img src={data.equipoB} style={{ width: "100%", height: "100%", borderRadius: "10px" }} alt="Equipo B" />
                {jugadores.slice(11, 22).map((j, i) => {
                    const pos = data.posiciones[i];
                    return j.nombre && pos && (
                        <span key={i} style={{ position: "absolute", top: pos.top, left: pos.left, color: "orange", fontWeight: "bold", textShadow: "1px 1px 3px black" }}>
                        {j.nombre}
                        </span>
                    );
                })}
                </div>
            </div>
            ) : (
          
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ position: "relative", width: "500px", height: "300px" }}>
                <img src={data.equipoA} style={{ width: "100%", height: "100%", borderRadius: "10px" }} alt="Cancha" />
                {equipoA.map((j, i) => {
                    const pos = data.posiciones[i];
                    return j.nombre && pos && (
                        <span key={i} style={{ 
                            position: "absolute", top: pos.top, left: pos.left, color: "yellow", fontWeight: "bold", textShadow: "1px 1px 3px black",
                            whiteSpace: "nowrap"
                        }}>
                        {j.nombre}
                        </span>
                    );
                })}
                </div>
            </div>
            )}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <button onClick={descargarMapa} style={{ backgroundColor: "#198754", color: "white", padding: "10px 20px", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
                ⬇️ Descargar Formación
            </button>
            <button onClick={compartirMapa} style={{ backgroundColor: "#0d6efd", color: "white", padding: "10px 20px", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
                🔗 Compartir Formación
            </button>
        </div>

      </div>

      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "800px", margin: "0 auto" }}>
        <input placeholder="Nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} style={{ padding: "10px", borderRadius: "5px", border: "none", color: "#000" }} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: "10px", borderRadius: "5px", border: "none", color: "#000" }} />
        <input placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} style={{ padding: "10px", borderRadius: "5px", border: "none", color: "#000" }} />
        <input placeholder="Número de tarjeta (16 dígitos)" value={tarjeta} onChange={(e) => setTarjeta(e.target.value)} maxLength={16} style={{ padding: "10px", borderRadius: "5px", border: "none", color: "#000" }} />
        
        <div style={{display: "flex", gap: "10px"}}>
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} style={{ padding: "10px", borderRadius: "5px", border: "none", color: "#000", flex: 1 }} />
            <select value={hora} onChange={(e) => setHora(e.target.value)} style={{ padding: "10px", borderRadius: "5px", border: "none", color: "#000", flex: 1 }}>
            <option value="">Selecciona la hora</option>
            {horasDisponibles.map((h) => (
                <option key={h} value={h}>{h}</option>
            ))}
            </select>
        </div>

        <h3>Lista de Jugadores</h3>
        <p style={{fontSize: "0.9rem", color: "#ccc"}}>Escribe los nombres aquí para que aparezcan en la cancha de arriba.</p>

        {jugadores.map((j, i) => (
          <div key={i} style={{ display: "flex", gap: "10px" }}>
            <span style={{color: "white", alignSelf: "center", width: "20px"}}>{i+1}.</span>
            <input
              placeholder={`Nombre Jugador ${i + 1}`}
              value={j.nombre}
              maxLength={11}
              onChange={(e) => handleJugadorChange(i, "nombre", e.target.value)}
              style={{ color: "#000", flex: 1, padding: "8px", borderRadius: "5px", border: "none" }}
            />
            <input
              placeholder="RUT"
              value={j.rut}
              onChange={(e) => handleJugadorChange(i, "rut", e.target.value)}
              style={{ color: "#000", width: "150px", padding: "8px", borderRadius: "5px", border: "none" }}
            />
            <button type="button" onClick={() => eliminarJugador(i)} style={{ backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "5px", width: "35px", cursor: "pointer" }}>
              X
            </button>
          </div>
        ))}

        <button type="button" onClick={agregarJugador} style={{ backgroundColor: "#0d6efd", color: "white", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "10px" }}>
          + Agregar jugador
        </button>

        {error && <div style={{ backgroundColor: "#ffcccc", color: "#cc0000", padding: "10px", borderRadius: "5px", marginTop: "10px", textAlign: "center" }}>{error}</div>}

        <button type="submit" style={{ backgroundColor: "#28a745", color: "white", padding: "15px", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "1.2rem", fontWeight: "bold", marginTop: "20px" }}>
          Confirmar y Pagar
        </button>
      </form>
    </div>
  );
};

export default Pago;