import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./CanchaCard.css";

const CanchaCard = ({ cancha }) => {
  const navigate = useNavigate();


  const imagen = cancha.imagen_url || cancha.imagen || 'https://via.placeholder.com/400x250';
  const precio = cancha.precio_hora || cancha.precioHora || 0;
  const nombre = cancha.nombre || "Cancha";
  

  const descripcionSucia = cancha.descripcion || cancha["Tipo de Superficie"] || "Estándar";

  
  const superficieLimpia = descripcionSucia
    .replace(/\[.*?\]/g, '')     
    .replace(/Superficie:\s*/g, '') 
    .trim();                        

  
  const nombreLower = nombre.toLowerCase();
  const isMantenimiento = nombreLower.includes('mantenimiento') || nombreLower.includes('clausurada');
  const isOcupada = nombreLower.includes('ocupada') || nombreLower.includes('agotado');

  let btnClass = "btn-reservar"; 
  let btnText = "Reservar";
  let isDisabled = false;
  let badge = null;

  if (isMantenimiento) {
    btnClass = "btn-reservar btn-rojo";
    btnText = "Clausurada ⛔";
    isDisabled = true;
    badge = <span className="badge-estado bg-danger">Mantenimiento</span>;
  } else if (isOcupada) {
    btnClass = "btn-reservar btn-amarillo";
    btnText = "No Disponible 🔒";
    isDisabled = true;
    badge = <span className="badge-estado bg-warning">Agotado</span>;
  }


  const handleDescargar = (e) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = imagen;
    link.download = `Cancha-${nombre}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCompartir = (e) => {
    e.stopPropagation();
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: nombre, text: `Mira esta cancha: ${nombre}`, url: url });
    } else {
      navigator.clipboard.writeText(url);
      alert("¡Enlace copiado! 📋");
    }
  };

  const handleReservar = (e) => {
    e.stopPropagation();
    if (!isDisabled) {
      navigate("/pago", { state: { canchaSeleccionada: cancha } });
    }
  };

  return (
    <div className="card-cancha">
      <div className="img-container position-relative">
        <img src={imagen} alt={nombre} onError={(e) => e.target.src='https://via.placeholder.com/400x250'} />
        {badge}
        <div className="acciones-flotantes">
            <button className="btn-accion" onClick={handleDescargar} title="Descargar">⬇️</button>
            <button className="btn-accion" onClick={handleCompartir} title="Compartir">🔗</button>
        </div>
      </div>

      <div className="card-info">
        <h3>{nombre}</h3>
        
        
        <p><strong>Superficie:</strong> {superficieLimpia}</p>
        
        <p className="precio">${parseInt(precio).toLocaleString()} / hora</p>

        <button 
          className={btnClass} 
          onClick={handleReservar}
          disabled={isDisabled}
          style={isDisabled ? { backgroundColor: isMantenimiento ? '#dc3545' : '#ffc107', cursor: 'not-allowed' } : {}}
        >
          {btnText}
        </button>
      </div>
    </div>
  );
};

export default CanchaCard;