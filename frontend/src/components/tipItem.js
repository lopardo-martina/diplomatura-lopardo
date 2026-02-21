export default function TipItem({titulo, subtitulo, descripcion, icono_clase}) {
    return (
        <div className="tip-card card">
            <div className="card-body">
                <i className={`${icono_clase} tip-icon`}></i>
                <h3 className="card-first-subtitle card-subtitle mb-2 text-body-secondary">{titulo}</h3>
                <h5 className="card-subtitle card-second-subtitle">{subtitulo}</h5>
                <p className="card-text">{descripcion}</p>
            </div>
        </div>
    ) 
} 