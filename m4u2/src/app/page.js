"use client";

import "@/styles/home.css";
import DestinoItem from "@/components/destinoItem";
import TipItem from "@/components/tipItem";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Home() {

  // Simulación de datos para destinos y tips
  const [destinosBA, setDestinosBA] = useState([]);
  const [tips, setTips] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/destinos")
      .then(res => res.json())
      .then(data => {
        console.log("DATA FRONT:", data);
        setDestinosBA(data);
      })
      .catch(error => console.error("Error:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/api/tips")
      .then(res => res.json())
      .then(data => {
        console.log("DATA FRONT:", data);
        setTips(data);
      })
      .catch(error => console.error("Error:", error));
  }, []);


  return (
    <main>
      <section id="inicio" className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content holder">
          <h1 className="hero-title">Descubre Buenos Aires de forma sustentable</h1>
          <p className="hero-subtitle">Conecta con la naturaleza, explora con conciencia y viaja responsablemente</p>
          <div className="hero-buttons">
            <Link href="/tips" className="btn primer-btn">Conocer Tips</Link>
            <Link href="/destinos" className="btn segundo-btn">Explorar Buenos Aires</Link>
          </div>
        </div>
      </section>

      <section className="about">
        <div className="container about-content holder">
          <h2>¿Qué es BAirWays?</h2>
          <p>BAirWays es tu guía para descubrir destinos sustentables en Buenos Aires y Argentina. Te ayudamos a planificar viajes responsables,
            conectando con la naturaleza y apoyando iniciativas ecológicas locales.</p>
          <div className="about-caracteristicas">
            <div className="caracteristica">
              <h3>Destinos Verificados</h3>
              <p>Seleccionamos lugares comprometidos con la sustentabilidad y el ecoturismo</p>
            </div>
            <div className="caracteristica">
              <h3>Planificación inteligente</h3>
              <p>Herramientas para organizar tu viaje según tu presupuesto y tiempo</p>
            </div>
            <div className="caracteristica">
              <h3>Impacto positivo</h3>
              <p>Cada viaje contribuye a preservar el medio ambiente y comunidades locales</p>
            </div>
          </div>
        </div>
      </section>


      <section id="buenosAires" className="buenos-aires">
        <div className="container holder">
          <div className="section-header">
            <h2>Buenos Aires y alrededores</h2>
            <p>Descubre museos, parques, puntos históricos y escapadas cercanas</p>
          </div>
          <div className="ba-grid" id="baGrid">
            {destinosBA?.slice(0, 6).map((destino) => (
              <DestinoItem
                key={destino.id}
                id={destino.id}
                nombre={destino.nombre}
                texto={destino.descripcion}
                imagen={`/img/${destino.imagen}`}
                tipo_destino={destino.tipo_nombre}
                tiempo={destino.tiempo}
                precio={destino.precio}
              />
            ))}
          </div>
          <div className="section-buttons">
            <Link href="/destinos" className="btn tercer-btn">Ver más destinos</Link>
          </div>
        </div>
      </section>



      <section id="tips" className="tips">
        <div className="container holder">
          <div className="section-header">
            <h2>Tips para Viajar de forma Sustentable</h2>
            <p>Aprende cómo reducir tu impacto ambiental mientras viajas</p>
          </div>

          <div className="tips-grid">
            {tips?.slice(0, 6).map((tip) => (
              <TipItem
                key={tip.id}
                nombre={tip.titulo}
                //subtitulo={tip.subtitulo}
                texto={tip.descripcion}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
