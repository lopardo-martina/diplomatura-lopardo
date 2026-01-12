export default async function DestinoItem(){
    return (
        <div className="destino-card card">
            <img src="/img/ecoparque.jpg" className="destino-img" alt="Ecoparque Buenos Aires" />
            <div className="card-body destino-content">
                <span className="tipo-destino">Parque</span>
                <h3>Ecoparque</h3>
                <p className="card-text">Espacio de conservación y educación ambiental. Antiguo zoológico transformado en centro ecológico.</p>
                <div className="destino-info">
                    <span className="info-item"><i className="fa-regular fa-clock"></i> 2-3 horas</span>
                    <span className="info-item"><i className="fa-solid fa-dollar-sign"></i> Gratis</span>
                </div>
            </div>
        </div>
    )
}