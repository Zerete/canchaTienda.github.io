// src/pages/Contacto.jsx
import React, { useState, useEffect } from "react";

const images = [
  "/src/assets/img/LuisFoto.png",
  "/src/assets/img/angel-lazaro.jpg"
];

function Contacto() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="contacto-page"
      style={{
        width: "60%",
        height: "500px",
        objectFit: "cover",
        borderRadius: "10px",
        transition: "opacity 0.5s ease-in-out",
        marginLeft: "150px",
        opacity: 0.9, 
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "#fff" }}>
        Contáctanos
      </h1>

      <div
        className="contact-layout"
        style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}
      >
 
        <div style={{ flex: "1 1 300px", minWidth: "250px" }}>
          <h2 style={{ color: "#fff" }}>Sobre Nosotros</h2>
          <p style={{ color: "#fff" }}>
            Somos Luis y Angel, dos amigos apasionados por el deporte y la diversión.
            Decidimos crear este servicio de renta de canchas para que todos puedan disfrutar
            de partidos de fútbol, básquetbol, tenis y vóleibol en espacios cómodos y bien equipados.
          </p>
          <p style={{ color: "#fff" }}>
            Nuestra misión es que cada persona tenga la mejor experiencia deportiva,
            ya sea un partido casual con amigos o una competencia organizada.
          </p>
          <h3 style={{ color: "#fff" }}>Contacto Directo</h3>
          <p style={{ color: "#fff" }}>Email: <a style={{ color: "#fff" }} href="mailto:contacto.chanchas@gmail.com">contacto.chanchas@gmail.com</a></p>
          <p style={{ color: "#fff" }}>Teléfono: +56 9 1234 5678</p>
        </div>

  
        <div style={{ flex: "1 1 300px", minWidth: "250px" }}>
          <h2 style={{ textAlign: "right", marginRight: "230px", color: "#fff" }}> 
                Nuestras Fotos</h2>
          <img
            src={images[current]}
            alt={`Foto ${current + 1}`}
            style={{
              width: "60%",
              height: "500px",
              objectFit: "cover",
              borderRadius: "10px",
              transition: "opacity 0.5s ease-in-out",
              marginLeft:"150px",
            }}
          />
        </div>
      </div>

      
      <div
        style={{
          marginTop: "2rem",
          width: "100%",
          height: "400px",
          borderRadius: "54px",
          overflow: "hidden",
        }}
      >
        <iframe
          title="Ubicación"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086554295667!2d-122.41941548468191!3d37.77492927975986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5b6e9f0f%3A0x7d4d5b7fbb49f9f6!2sSan%20Francisco%2C%20CA%2C%20EE.%20UU.!5e0!3m2!1ses-419!2scl!4v1708019200000!5m2!1ses-419!2scl"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default Contacto;
