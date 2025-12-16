import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Home = () => {

  const atajos = [
    {
      id: 1,
      titulo: "RESERVA TU CANCHA 📅",
      texto: "Asegura tu partido ahora mismo. Elige fecha y hora en segundos.",
      boton: "IR A RESERVAR",
      link: "/reservas",
      imagen: "https://johancruyffinstitute.com/wp-content/uploads/2016/04/administracion-del-futbol.jpg"
    },
    {
      id: 2,
      titulo: "CONOCE NUESTRAS SEDES 🏟️",
      texto: "Fútbol, Tenis, Vóley y más. Mira fotos y detalles de cada cancha.",
      boton: "VER CANCHAS",
      link: "/canchas",
      imagen: "https://cdn.conmebol.com/wp-content/uploads/2014/12/estadios-copa-america-2015.jpg"
    },
    {
      id: 3,
      titulo: "¿TIENES DUDAS? 📞",
      texto: "Contáctanos para torneos, eventos o preguntas generales.",
      boton: "IR A CONTACTO",
      link: "/contacto",
      imagen: "https://thumbs.dreamstime.com/b/si%C3%A9ntete-verde-un-hermoso-campo-de-f%C3%BAtbol-con-l%C3%ADneas-y-paisajes-brillantes-solares-coloridos-tema-390506197.jpg"
    },
    {
      id: 4,
      titulo: "ACCESO ADMINISTRADOR 👤",
      texto: "Inicia sesión Administrador.",
      boton: "INICIAR SESIÓN",
      link: "/iniciar_sesion",
      imagen: "https://lh3.googleusercontent.com/-kgNtfRIqs9U/VdmrwIW0w-I/AAAAAAAAVTU/zXqBuWquJr4/s600-Ic42/gestion-negocio.jpg" 
    }
  ];

  const [indiceActual, setIndiceActual] = useState(0);

 
  useEffect(() => {
    const intervalo = setInterval(() => {
      siguienteImagen();
    }, 5000);
    return () => clearInterval(intervalo);
  }, [indiceActual]);

  const siguienteImagen = () => {
    setIndiceActual((prev) => (prev === atajos.length - 1 ? 0 : prev + 1));
  };

  const anteriorImagen = () => {
    setIndiceActual((prev) => (prev === 0 ? atajos.length - 1 : prev - 1));
  };

  const slide = atajos[indiceActual];


  const ballStyle = {
    position: "absolute",
    width: "100px",  
    height: "100px",
    zIndex: 5,
    opacity: 0.8,
    animation: "spinSlow 20s linear infinite", 
    objectFit: "contain"
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#121212", color: "white" }}>
      
    
      <style>
        {`
          @keyframes spinSlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>

    
      <div style={{ position: "relative", width: "100%", height: "70vh", overflow: "hidden" }}>
        
      
        <div style={{
            backgroundImage: `url(${slide.imagen})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
            filter: "brightness(40%)",
            transition: "background-image 0.5s ease-in-out"
        }}></div>

       
        <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Tennis_ball.svg/500px-Tennis_ball.svg.png?20061124173635" 
            alt="Tenis"
            style={{ ...ballStyle, top: "30px", left: "30px" }}
        />

     
        <img 
            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Basketball.png" 
            alt="Basquet"
            style={{ ...ballStyle, top: "30px", right: "30px" }}
        />

      
        <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Volley_ball_angelo_gelmi_01.svg/500px-Volley_ball_angelo_gelmi_01.svg.png?20091201034631" 
            alt="Voley"
            style={{ ...ballStyle, bottom: "30px", left: "30px" }}
        />

      
        <img 
            src="https://www.pngall.com/wp-content/uploads/5/Sports-Ball-Transparent.png" 
            alt="Futbol"
            style={{ ...ballStyle, bottom: "30px", right: "30px" }}
        />
        
        
        <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            width: "80%",
            zIndex: 10
        }}>
            <h1 style={{ 
                fontSize: "3rem", fontWeight: "bold", textShadow: "2px 2px 10px rgba(0,0,0,0.8)", marginBottom: "20px", color: "#ffc107"
            }}>
                {slide.titulo}
            </h1>
            <p style={{ fontSize: "1.5rem", marginBottom: "30px", textShadow: "1px 1px 5px rgba(0,0,0,0.8)" }}>
                {slide.texto}
            </p>
            <Link to={slide.link} style={{
                display: "inline-block", padding: "15px 50px", backgroundColor: "#0d6efd", color: "white", fontWeight: "bold",
                borderRadius: "30px", textDecoration: "none", fontSize: "1.2rem", boxShadow: "0 0 20px rgba(13, 110, 253, 0.6)",
                transition: "transform 0.2s", border: "none"
            }}
            onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.target.style.transform = "scale(1)"}
            >
                {slide.boton} ➤
            </Link>
        </div>


        <button onClick={anteriorImagen} style={arrowStyle("left")}>❮</button>
        <button onClick={siguienteImagen} style={arrowStyle("right")}>❯</button>
        

        <div style={{position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "10px", zIndex: 10}}>
            {atajos.map((_, idx) => (
                <div key={idx} onClick={() => setIndiceActual(idx)} style={{
                    width: "12px", height: "12px", borderRadius: "50%", cursor: "pointer",
                    backgroundColor: idx === indiceActual ? "#ffc107" : "rgba(255,255,255,0.5)"
                }}></div>
            ))}
        </div>
      </div>


      <div className="container py-5">
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px", marginTop: "-50px", position: "relative", zIndex: 10}}>
            <InfoCard icono="⚡" titulo="Rápido" desc="Reserva en menos de 1 minuto." />
            <InfoCard icono="🛡️" titulo="Seguro" desc="Tus datos están protegidos." />
            <InfoCard icono="📍" titulo="Céntrico" desc="Sedes en puntos clave de la ciudad." />
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icono, titulo, desc }) => (
    <div style={{
        backgroundColor: "#1e1e1e", padding: "20px", borderRadius: "15px", textAlign: "center", width: "250px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.5)", borderBottom: "4px solid #0d6efd"
    }}>
        <div style={{fontSize: "2.5rem", marginBottom: "10px"}}>{icono}</div>
        <h3 style={{fontSize: "1.2rem", marginBottom: "5px", color: "white"}}>{titulo}</h3>
        <p style={{color: "#888", fontSize: "0.9rem"}}>{desc}</p>
    </div>
);

const arrowStyle = (direction) => ({
    position: "absolute", top: "50%", [direction]: "20px", transform: "translateY(-50%)",
    backgroundColor: "rgba(0,0,0,0.3)", color: "white", border: "none", borderRadius: "50%",
    width: "50px", height: "50px", cursor: "pointer", fontSize: "1.5rem", zIndex: 10,
    display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(5px)"
});

export default Home;