import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function Admin() {
 
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [descripcion, setDescripcion] = useState("");
  
  
  const [categoria, setCategoria] = useState("Futbol");

  const [canchas, setCanchas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idEdicion, setIdEdicion] = useState(null); 
  
  const navigate = useNavigate();

  // CAMBIO REALIZADO AQUÍ:
  const API_URL = "http://3.226.63.93:8080/api/productos";


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/iniciar_sesion");
    } else {
      fetchCanchas();
    }
  }, [navigate]);

  
  const fetchCanchas = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        console.log("Datos recibidos de AWS:", data); 
        setCanchas(data.reverse()); 
      } else {
        console.error("Error al obtener datos");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    } finally {
      setLoading(false);
    }
  };

  
  const eliminarCancha = async (id) => {
    
    const result = await Swal.fire({
      title: '¿Seguro que quieres eliminar esta cancha?',
      text: "No podrás revertir esto.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    
    if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        try {
          const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
          });

          if (res.ok) {
            Swal.fire(
              '¡Eliminado!',
              '🗑️ Cancha eliminada correctamente.',
              'success'
            );
            fetchCanchas();
          } else {
            Swal.fire('Error', 'Error al eliminar (Revisa permisos).', 'error');
          }
        } catch (error) {
          console.error(error);
          Swal.fire('Error', 'Fallo de conexión.', 'error');
        }
    }
  };


  const cargarDatosEdicion = (cancha) => {
    setNombre(cancha.nombre);
    setPrecio(cancha.precio);
    setImagen(cancha.imagen);
    
  
    let descLimpia = cancha.descripcion || "";
    if (descLimpia.includes("[FUTBOL]")) setCategoria("Futbol");
    else if (descLimpia.includes("[BASQUET]")) setCategoria("Basquet");
    else if (descLimpia.includes("[TENIS]")) setCategoria("Tenis");
    else if (descLimpia.includes("[VOLEY]")) setCategoria("Voley");
    

    setDescripcion(descLimpia.replace(/\[.*?\]\s*/g, ""));
    
    setIdEdicion(cancha.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

   
    const descripcionConEtiqueta = `[${categoria.toUpperCase()}] ${descripcion}`;

    const canchaDto = { 
        nombre: nombre, 
        precio: parseInt(precio), 
        imagen: imagen,
        descripcion: descripcionConEtiqueta, 
        stock: 100,      
        disponible: true 
    };

    console.log("Enviando datos:", canchaDto); 

  
    Swal.fire({
        title: 'Guardando...',
        didOpen: () => {
            Swal.showLoading()
        }
    });

    try {
      let response;
      
      if (idEdicion) {
    
        response = await fetch(`${API_URL}/${idEdicion}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(canchaDto),
        });
      } else {
       
        response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(canchaDto),
        });
      }

      if (response.ok) {
        
        Swal.fire({
            icon: 'success',
            title: idEdicion ? "✅ Actualizado correctamente" : "✅ Creado con éxito",
            showConfirmButton: false,
            timer: 1500
        });
        limpiarFormulario();
        fetchCanchas();
      } else {
        const errorText = await response.text(); 
        console.error("Error del servidor:", errorText);
        Swal.fire('Error', `❌ Error al guardar: ${response.status}`, 'error');
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      Swal.fire('Error', 'Error crítico de conexión.', 'error');
    }
  };

  const limpiarFormulario = () => {
    setNombre("");
    setPrecio("");
    setImagen("");
    setDescripcion("");
    setCategoria("Futbol"); 
    setIdEdicion(null);
  };

 
  const handleCerrarSesion = () => {
    Swal.fire({
        title: '¿Salir del panel?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, salir',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("token");
            localStorage.removeItem("usuario");
            navigate("/iniciar_sesion");
            window.location.reload();
        }
    });
  };

  return (
    <div style={{ padding: "2rem", color: "#fff", backgroundColor: "rgba(0, 0, 0, 0.85)", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      
      
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem", borderBottom: "1px solid #444", paddingBottom: "1rem" }}>
        <h1>⚙️ Panel de Administrador</h1>
        <button onClick={handleCerrarSesion} style={btnRojo}>Cerrar Sesión</button>
      </div>

      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        
      
        <div style={{ flex: 1, minWidth: "300px" }}>
          <div style={{ backgroundColor: idEdicion ? "rgba(255, 193, 7, 0.15)" : "rgba(255,255,255,0.1)", padding: "20px", borderRadius: "10px", border: idEdicion ? "2px solid #ffc107" : "1px solid #444" }}>
            <h2 style={{color: idEdicion ? "#ffc107" : "white"}}>{idEdicion ? "✏️ Editando Cancha" : "➕ Nueva Cancha"}</h2>
            
            <form onSubmit={handleSubmit}>
              
            
              <label>Categoría (Deporte):</label>
              <select 
                value={categoria} 
                onChange={(e) => setCategoria(e.target.value)}
                style={{ width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "6px", border: "1px solid #ccc", backgroundColor: "white", color: "#333" }}
              >
                <option value="Futbol">⚽ Fútbol</option>
                <option value="Basquet">🏀 Básquet</option>
                <option value="Tenis">🎾 Tenis</option>
                <option value="Voley">🏐 Vóley</option>
              </select>

              <label>Nombre:</label>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required style={inputStyle} placeholder="Ej: Cancha Norte" />

              <label>Precio por Hora:</label>
              <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required style={inputStyle} placeholder="Ej: 15000" />

              <label>URL de Imagen:</label>
              <input type="text" value={imagen} onChange={(e) => setImagen(e.target.value)} required style={inputStyle} placeholder="https://..." />
              
              <label>Descripción:</label>
              <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} style={{...inputStyle, height: "60px"}} placeholder="Detalles..." />

              <button type="submit" style={idEdicion ? btnAmarillo : btnAzul}>
                {idEdicion ? "Guardar Cambios" : "Crear cancha"}
              </button>

              {idEdicion && <button type="button" onClick={limpiarFormulario} style={btnGris}>Cancelar Edición</button>}
            </form>
          </div>
        </div>

       
        <div style={{ flex: 1.5, minWidth: "300px" }}>
          <h2>📋 Inventario ({canchas.length})</h2>
          
          <div style={{maxHeight: "600px", overflowY: "auto", paddingRight: "10px"}}>
            {loading ? (
                <p style={{textAlign: "center", fontSize: "1.2rem"}}>⌛ Cargando datos de AWS...</p>
            ) : canchas.length === 0 ? (
                <div style={{textAlign: "center", padding: "20px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "10px"}}>
                    <h3>📭 Base de datos vacía</h3>
                    <p>Usa el formulario para crear tu primera cancha.</p>
                </div>
            ) : (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {canchas.map((c) => (
                  <li key={c.id} style={itemListaStyle}>
                    <div style={{display: "flex", alignItems: "center", gap: "15px"}}>
                      <img 
                        src={c.imagen || "https://via.placeholder.com/50"} 
                        alt="cancha" 
                        style={{width: "60px", height: "60px", borderRadius: "8px", objectFit: "cover"}}
                        onError={(e) => {e.target.src = "https://via.placeholder.com/50"}} 
                      />
                      <div>
                        <div style={{fontWeight: "bold", fontSize: "1.1rem"}}>{c.nombre}</div>
                        <div style={{color: "#198754", fontWeight: "bold"}}>${c.precio?.toLocaleString()}</div>
                      
                        <div style={{fontSize: "0.8rem", color: "#666", maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                            {c.descripcion ? c.descripcion.replace(/\[.*?\]/g, "") : ""}
                        </div>
                      </div>
                    </div>
                    
                    <div style={{display: "flex", gap: "8px"}}>
                        <button onClick={() => cargarDatosEdicion(c)} style={btnEditar} title="Editar">✏️</button>
                        <button onClick={() => eliminarCancha(c.id)} style={btnEliminar} title="Eliminar">🗑️</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


const inputStyle = { width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "6px", border: "1px solid #ccc", backgroundColor: "white", color: "#333" };
const itemListaStyle = { backgroundColor: "white", color: "#333", marginBottom: "12px", padding: "15px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 5px rgba(0,0,0,0.2)" };
const btnAzul = { backgroundColor: "#0d6efd", color: "white", padding: "12px", width: "100%", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "1rem" };
const btnAmarillo = { backgroundColor: "#ffc107", color: "black", padding: "12px", width: "100%", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "1rem" };
const btnGris = { backgroundColor: "#6c757d", color: "white", padding: "10px", width: "100%", border: "none", borderRadius: "6px", cursor: "pointer", marginTop: "10px" };
const btnRojo = { backgroundColor: "#dc3545", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" };
const btnEditar = { backgroundColor: "#ffc107", border: "none", borderRadius: "5px", cursor: "pointer", padding: "8px 12px", fontSize: "1.2rem" };
const btnEliminar = { backgroundColor: "#dc3545", border: "none", borderRadius: "5px", cursor: "pointer", padding: "8px 12px", fontSize: "1.2rem", color: "white" };
 
export default Admin;