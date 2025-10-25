import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const softUIPath = `${import.meta.env.BASE_URL}softui/build/index.html`;

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>

      {/*por si qeries cambiar de lugar el botton verde*/}
      <button
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: "800px",
          left: "50px",
          zIndex: 1000,
          backgroundColor: "#22c55e",
          color: "white",
          border: "none",
          padding: "10px 16px",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
        }}
      >
        ← Volver
      </button>

      
      <iframe
        src={softUIPath}
        title="Panel de administración"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
        }}
      />
    </div>
  );
}

