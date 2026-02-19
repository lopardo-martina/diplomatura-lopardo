export default async function DestinoItem({imagen, nombre, tipo_destino, texto, tiempo, precio}){
    return (
        <div className="destino-card card">
            <img src={imagen} className="destino-img" alt={nombre} />
            <div className="card-body destino-content">
                <span className="tipo-destino">{tipo_destino}</span>
                <h3>{nombre}</h3>
                <p className="card-text">{texto}</p>
                <div className="destino-info">
                    <span className="info-item"><i className="fa-regular fa-clock"></i> {tiempo} horas</span>
                    <span className="info-item"><i className="fa-solid fa-dollar-sign"></i> $ {precio}</span>
                </div>
            </div>
        </div>
    )
}