"use client"

import Link from "next/link"

export default function DestinoItem({ id, nombre, descripcion, imagen, tipo_nombre, tiempo, precio }) {

    return (
        <Link href={`/destinos/${id}`}>
            <div className="destino-card card">
                <img src={imagen} className="destino-img" alt={nombre} />
                <div className="card-body destino-content">
                    <span className="tipo-destino">{tipo_nombre}</span>
                    <h3>{nombre}</h3>
                    <p className="card-text">{descripcion}</p>
                    <div className="destino-info">
                        <span className="info-item"><i className="fa-regular fa-clock"></i> {tiempo}</span>
                        <span className="info-item"><i className="fa-solid fa-dollar-sign"></i> $ {precio}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}