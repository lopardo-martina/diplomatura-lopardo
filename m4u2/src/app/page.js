export default function Home() {
  return (
    <main className="holder">
      <section id="inicio" className="hero">
        <div className="hero-overlay"></div>
            <div className="container hero-content holder">
                <h1 className="hero-title">Descubre Buenos Aires de forma sustentable</h1>
                <p className="hero-subtitle">Conecta con la naturaleza, explora con conciencia y viaja responsablemente</p>
                <div className="hero-buttons">
                    <a href="#destinos" className="btn primer-btn">Destinos Sustentables</a>
                    <a href="#buenos-aires" className="btn segundo-btn">Explorar Buenos Aires</a>
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
                    <p>Herramienta s para organizar tu viaje según tu presupuesto y tiempo</p>
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
                <div className="destino-card card">
                    <img src="img/caminito.jpg" className="destino-img" alt="..." />
                    <div className="card-body destino-content">
                        <span className="tipo-destino">Punto histórico</span>
                        <h3>Caminito - La Boca</h3>
                        <p className="card-text">Calle museo con casas de chapa pintadas. Icono cultural de Buenos Aires.</p>
                        <div className="destino-info">
                            <span className="ifo-item card-text pe-4"><small className="text-body-secondary"></small>1-3 horas</span>
                            <span className="ifo-item card-text"><small className="text-body-secondary"></small>Gratis</span>
                        </div>
                    </div>
                </div>
                <div className="destino-card card">
                    <img src="img/malba.jpg" className="destino-img" alt="..." />
                    <div className="card-body destino-content">
                        <span className="tipo-destino">Museo</span>
                        <h3>MALBA - Museo de Arte Latinoamericano</h3>
                        <p className="card-text">Arte latinoamericano de los siglos XX y XXI. Colección permanente y exposiciones temporales.</p>
                        <div className="destino-info">
                            <span className="ifo-item card-text pe-4"><small className="text-body-secondary"></small>2-3 horas</span>
                            <span className="ifo-item card-text"><small className="text-body-secondary"></small>$$$</span>
                        </div>
                    </div>
                </div>
                <div className="destino-card card">
                    <img src="img/jardin-botanico.jpg" className="destino-img" alt="..." />
                    <div className="card-body destino-content">
                        <span className="tipo-destino">Parque</span>
                        <h3>Jardín Botanico</h3>
                        <p className="card-text">7 hectáreas con más de 5.500 especies de plantas. Invernaderos y jardines temáticos.</p>
                        <div className="destino-info">
                            <span className="ifo-item card-text pe-4"><small className="text-body-secondary"></small>1-2 horas</span>
                            <span className="ifo-item card-text"><small className="text-body-secondary"></small>Gratis</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-buttons">
                <a href="destinos.html" className="btn tercer-btn">Ver más destinos</a>
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
                <div className="tip-card card">
                    <div className="card-body">
                        <i className="fa-solid fa-bus card-title"></i>
                        <h3 className="card-subtitle mb-2 text-body-secondary">Transporte Público</h3>
                        <p className="card-text">Usa colectivos, subte y trenes. Son más económicos y reducen emisiones de CO₂.</p>
                    </div>
                </div>
                <div className="tip-card card">
                    <div className="card-body">
                        <i className="fa-solid fa-recycle card-title"></i>
                        <h3 className="card-subtitle mb-2 text-body-secondary">Reduce la Basura</h3>
                        <p className="card-text">Lleva tu botella reutilizable, bolsas de tela y evita plásticos de un solo uso.</p>
                    </div>
                </div>
                <div className="tip-card card">
                    <div className="card-body">
                        <i className="fa-solid fa-person-biking card-title"></i>
                        <h3 className="card-subtitle mb-2 text-body-secondary">Movilidad Activa</h3>
                        <p className="card-text">Camina o usa bicicleta para distancias cortas. Buenos Aires tiene ciclovías en expansión.</p>
                    </div>
                </div>
                <div className="tip-card card">
                    <div className="card-body">
                        <i className="fa-solid fa-seedling card-title"></i>
                        <h3 className="card-subtitle mb-2 text-body-secondary">Apoya lo Local</h3>
                        <p className="card-text">Compra en mercados locales y apoya proyectos comunitarios sustentables.</p>
                    </div>
                </div>
                <div className="tip-card card">
                    <div className="card-body">
                        <i className="fa-solid fa-droplet card-title"></i>
                        <h3 className="card-subtitle mb-2 text-body-secondary">Cuida el Agua</h3>
                        <p className="card-text">Sé consciente del consumo de agua, especialmente en reservas naturales.</p>
                    </div>
                </div>
                <div className="tip-card card">
                    <div className="card-body">
                        <i className="fa-solid fa-mobile-screen card-title"></i>
                        <h3 className="card-subtitle mb-2 text-body-secondary">Documentación Digital</h3>
                        <p className="card-text">Usa tickets digitales y mapas en tu teléfono para reducir papel.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </main> 
  );
}
