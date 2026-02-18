import "@/styles/home.css";
import DestinoItem from "@/components/destinoItem";
import TipItem from "@/components/tipItem";
import Link from "next/link";

const destinosBA = [
  {
    id: 1,
    nombre: "Tigre",
    descripcion: "Naturaleza, ríos y actividades al aire libre",
    imagen: "/tigre.jpg",
    precio: "1500",
    tiempo: "2-3",
  },
  {
    id: 2,
    nombre: "La Plata",
    descripcion: "Arquitectura y museos históricos",
    imagen: "/laplata.jpg",
    precio: "1500",
    tiempo: "2-3",
  },
  {
    id: 3,
    nombre: "San Antonio de Areco",
    descripcion: "Tradición gaucha y turismo rural",
    imagen: "/areco.jpg",
    precio: "gratis",
    tiempo: "2",
  },
  {
    id: 4,
    nombre: "Tigre",
    descripcion: "Naturaleza, ríos y actividades al aire libre",
    imagen: "/tigre.jpg",
    precio: "4",
    tiempo: "2-3",
  },
  {
    id: 5,
    nombre: "La Plata",
    descripcion: "Arquitectura y museos históricos",
    imagen: "/laplata.jpg",
    precio: "5",
    tiempo: "2-3",
  },
  {
    id: 6,
    nombre: "San Antonio de Areco",
    descripcion: "Tradición gaucha y turismo rural",
    imagen: "/areco.jpg",
    precio: "6",
    tiempo: "2",
  },
  {
    id: 7,
    nombre: "Tigre",
    descripcion: "Naturaleza, ríos y actividades al aire libre",
    imagen: "/tigre.jpg",
    precio: "7",
    tiempo: "2-3",
  },
  {
    id: 8,
    nombre: "La Plata",
    descripcion: "Arquitectura y museos históricos",
    imagen: "/laplata.jpg",
    precio: "8",
    tiempo: "2-3",
  },
  {
    id: 9,
    nombre: "San Antonio de Areco",
    descripcion: "Tradición gaucha y turismo rural",
    imagen: "/areco.jpg",
    precio: "9",
    tiempo: "2",
  },
];

export default function Home() {
  return (
    <main>
      <section id="inicio" className="hero">
        <div className="hero-overlay"></div>
            <div className="container hero-content holder">
                <h1 className="hero-title">Descubre Buenos Aires de forma sustentable</h1>
                <p className="hero-subtitle">Conecta con la naturaleza, explora con conciencia y viaja responsablemente</p>
                <div className="hero-buttons">
                    <Link href="/destinos" className="btn primer-btn">Destinos Sustentables</Link>
                    <Link href="/buenos-aires" className="btn segundo-btn">Explorar Buenos Aires</Link>
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
               {destinosBA.slice(0, 6).map((destino) => (
                <DestinoItem key={destino.id} {...destino} />
               ))}
            </div>
            <div className="section-buttons">
                <a href="/destinos" className="btn tercer-btn">Ver más destinos</a>
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
                <TipItem />
                <TipItem />
                <TipItem />
            </div>
        </div>
      </section>
    </main> 
  );
}
