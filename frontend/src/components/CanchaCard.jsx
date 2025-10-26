import { useContext } from "react";

import { CarritoContext } from "../context/CarritoContext";

import { useNavigate } from "react-router-dom";



function CanchaCard({ cancha }) {

 const { agregarCancha } = useContext(CarritoContext);

 const navigate = useNavigate();



 const handleReservar = () => {

  agregarCancha(cancha); // ✅ agrega al carrito

  navigate("/carrito"); // ✅ redirige al carrito

 };



 return (

  <div

   style={{

    backgroundColor: "#fff",

    borderRadius: "10px",

    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",

    padding: "1rem",

    textAlign: "center",

   }}

  >

   <img

    src={cancha.imagen}

    alt={cancha.nombre}

    style={{ width: "100%", borderRadius: "10px" }}

   />

   <h3>{cancha.nombre}</h3>

   <p>Superficie: {cancha["Tipo de Superficie"]}</p>

   <p>Precio: ${cancha.precioHora?.toLocaleString()} / hora</p>



   <button

    onClick={handleReservar}

    style={{

     backgroundColor: "#28a745",

     color: "white",

     border: "none",

     borderRadius: "5px",

     padding: "10px 15px",

     cursor: "pointer",

     marginTop: "10px",

    }}

   >

    Reservar

   </button>

  </div>

 );

}



export default CanchaCard;