import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      
      <div className="text-center py-4">
        <Link to="/" className="navbar-brand p-0 text-decoration-none">
          <h1 className="text-primary m-0">
            <i className="fa-solid fa-soccer-ball me-3"></i>CanchasReser
          </h1>
        </Link>
      </div>

    
      <div
        className="hero-header position-relative text-white d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url(/img/bg-hero.jpg)`, // desde public/img/bg-hero.jpg
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100%",
        }}
      >
     
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-75"></div>

   
        <div className="position-relative text-center">
          <h1 className="display-3 mb-3 text-white" style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.7)" }}>
            Bienvenido a CanchasReser
          </h1>
          <p className="lead text-white" style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.7)" }}>
            Reserva tu cancha favorita al mejor precio
          </p>
        </div>
      </div>

      
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="service-item text-center pt-3 border rounded shadow-sm">
                <div className="p-4">
                  <i className="fa fa-futbol fa-3x text-primary mb-4"></i>
                  <h5 className="mb-3"style={{ color: "#ffffffff" }}>Fútbol</h5>
                  <p style={{ color: "#ffffffff" }}>
                  Reserva canchas de fútbol de pasto sintético o natural.
                  </p>
                </div>
              </div>
            </div>

   
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="service-item text-center pt-3 border rounded shadow-sm">
                <div className="p-4">
                  <i className="fa fa-basketball-ball fa-3x text-primary mb-4"></i>
                  <h5 className="mb-3"style={{ color: "#ffffffff" }}>Básquetbol</h5>
                   <p style={{ color: "#ffffffff" }}>
                  Encuentra canchas techadas o al aire libre.
                  </p>
                </div>
              </div>
            </div>


            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="service-item text-center pt-3 border rounded shadow-sm">
                <div className="p-4">
                  <i className="fa fa-table-tennis fa-3x text-primary mb-4"></i>
                  <h5 className="mb-3"style={{ color: "#ffffffff" }}>Tenis</h5>
                  <p style={{ color: "#ffffffff" }}>
                  Juega en canchas de arcilla, cemento o pasto.
                  </p>
                </div>
              </div>
            </div>


            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
              <div className="service-item text-center pt-3 border rounded shadow-sm">
                <div className="p-4">
                  <i className="fa fa-volleyball-ball fa-3x text-primary mb-4"></i>
                  <h5 className="mb-3"style={{ color: "#ffffffff" }}>Vóleibol</h5>
                   <p style={{ color: "#ffffffff" }}>
                  Disfruta del vóley en canchas de playa o gimnasio.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
