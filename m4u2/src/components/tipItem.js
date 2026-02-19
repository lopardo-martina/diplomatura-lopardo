export default function TipItem({nombre, subtitulo, texto}) {
    return (
        <div className="tip-card card">
            <div className="card-body">
                <i className="fa-solid fa-bus card-title"></i>
                <h3 className="card-first-subtitle card-subtitle mb-2 text-body-secondary">{nombre}</h3>
                <h5 className="card-subtitle card-second-subtitle">{subtitulo}</h5>
                <p className="card-text">{texto}</p>
            </div>
        </div>
    ) 
}