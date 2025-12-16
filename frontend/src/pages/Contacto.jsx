import React, { useState } from "react";
import Swal from 'sweetalert2';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    Swal.fire({
      title: 'Enviando mensaje...',
      timer: 2000,
      didOpen: () => { Swal.showLoading() }
    }).then(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Mensaje Enviado!',
        text: 'Nos pondremos  posiblemente en contacto contigo pronto.',
        confirmButtonColor: '#0d6efd'
      });
      setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });
    });
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#4983beff", color: "white", padding: "40px 20px" }}>
      
      <div className="container" style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        <h1 style={{ textAlign: "center", marginBottom: "10px", fontSize: "2.5rem" }}>Contactanos </h1>
        <p style={{ textAlign: "center", color: "#ccc", marginBottom: "50px" }}>
          ¿Tienes dudas sobre torneos o eventos? Escríbenos.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "40px" }}>
          
          {/* 📝 FORMULARIO */}
          <div style={{ flex: 1, minWidth: "300px", backgroundColor: "#1e1e1e", padding: "30px", borderRadius: "15px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
            <h3 style={{ marginBottom: "20px", color: "#ffc107" }}>Envíanos un mensaje</h3>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              
              <input 
                type="text" name="nombre" placeholder="Tu Nombre" required 
                value={formData.nombre} onChange={handleChange}
                style={inputStyle}
              />
              <input 
                type="email" name="email" placeholder="Tu Email" required 
                value={formData.email} onChange={handleChange}
                style={inputStyle}
              />
              <input 
                type="text" name="asunto" placeholder="Asunto" required 
                value={formData.asunto} onChange={handleChange}
                style={inputStyle}
              />
              <textarea 
                name="mensaje" placeholder="¿En qué podemos ayudarte?" required rows="5"
                value={formData.mensaje} onChange={handleChange}
                style={{ ...inputStyle, resize: "none" }}
              />

              <button type="submit" style={btnStyle}>ENVIAR MENSAJE 🚀</button>
            </form>
          </div>

       
          <div style={{ flex: 1, minWidth: "300px", display: "flex", flexDirection: "column", gap: "20px" }}>
            
            
            <div style={cardInfoStyle}>
              <div style={{ fontSize: "2rem" }}>📍</div>
              <div>
                <h4 style={{ margin: 0 }}>Ubicación Central</h4>
                <p style={{ margin: 0, color: "#aaa" }}>Av real 345, Santiago</p>
              </div>
            </div>

            <div style={cardInfoStyle}>
              <div style={{ fontSize: "2rem" }}>📱</div>
              <div>
                <h4 style={{ margin: 0 }}>Teléfono / WhatsApp</h4>
                <p style={{ margin: 0, color: "#aaa" }}>+56 9 1234 5678</p>
              </div>
            </div>

            <div style={cardInfoStyle}>
              <div style={{ fontSize: "2rem" }}>✉️</div>
              <div>
                <h4 style={{ margin: 0 }}>Email</h4>
                <p style={{ margin: 0, color: "#aaa" }}>contacto@canchasreser.cl</p>
              </div>
            </div>

           
            <div style={{ borderRadius: "15px", overflow: "hidden", height: "250px", border: "2px solid #333" }}>
              <iframe 
                title="mapa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.079973278855!2d-70.6482672848008!3d-33.45693998077224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c50e0416e027%3A0x673c683833f24021!2sParque%20O'Higgins!5e0!3m2!1ses!2scl!4v1647890123456!5m2!1ses!2scl" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy">
              </iframe>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// Estilos
const inputStyle = {
  padding: "15px", borderRadius: "8px", border: "none", backgroundColor: "#333", color: "white", outline: "none", fontSize: "1rem"
};

const btnStyle = {
  padding: "15px", borderRadius: "8px", border: "none", backgroundColor: "#0d6efd", color: "white", fontWeight: "bold", cursor: "pointer", fontSize: "1.1rem", transition: "0.3s"
};

const cardInfoStyle = {
  backgroundColor: "#1e1e1e", padding: "20px", borderRadius: "10px", display: "flex", alignItems: "center", gap: "15px", border: "1px solid #333"
};

export default Contacto;