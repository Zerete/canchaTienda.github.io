import { Link } from "react-router-dom";
import fondoNav from "../assets/img/fondo6.jpg";

export default function NavBar() {
  return (
    <nav
    >
      <Link to="/" className="px-2" style={{ color: "#9210fdff" }}>
       
      </Link>
      <Link to="/canchas" className="px-2"style={{ color: "#9210fdff" }}>
        
      </Link>
      <Link to="/reservas" className="px-2" style={{ color: "#9210fdff" }}>
        
      </Link>
      <Link to="/contacto" className="px-2" style={{ color: "#9210fdff" }}>
        
      </Link>
      <Link to="/admin" className="px-2" style={{ color: "#9210fdff" }}>
        
      </Link>

      
    </nav>
  );
}
