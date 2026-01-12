export default async function TipItem(){
    return (
        <div className="tip-card card">
            <div className="card-body">
                <i className="fa-solid fa-bus card-title"></i>
                <h3 className="card-first-subtitle card-subtitle mb-2 text-body-secondary">Transporte Público</h3>
                <h5 className="card-subtitle card-second-subtitle">¡Tu huella también cuenta!</h5>
                <p className="card-text">Al elegir transporte público, como colectivos, subtes o trenes, en vez de vehículos particulares, 
                    reducís significativamente tus emisiones de carbono. <br /> Planificar tu viaje con conciencia ambiental también es 
                    parte del compromiso con el planeta. </p>
            </div>
        </div>
    )
}