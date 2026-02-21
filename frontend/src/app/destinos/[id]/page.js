"use client";

import "@/styles/destinoDetalle.css";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function DestinoDetalle() {
    const { id } = useParams();
    const [destino, setDestino] = useState(null);

    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:3001/api/destinos/${id}`)
            .then(res => res.json())
            .then(data => setDestino(data))
            .catch(err => console.error("Error:", err));
    }, [id]);

    if (!destino) return <p>Cargando...</p>;

    return (
        <div className="container-destino">
            <div className="destinos">

                <Link href="/destinos" className="volver-link">
                    <svg viewBox="0 0 20 20" fill="currentColor">  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"/>  </svg>
                    Volver a destinos
                </Link>

                <div className="destinos-img">
                    <img src={`/img/${destino.imagen}`} alt={destino.nombre} />
                </div>

                <div className="destinos-content">
                    <div className="destinos-info">
                        <h1>{destino.nombre}</h1>
                        <p className="destinos-descripcion">{destino.descripcion}</p>
                    </div>

                    <div className="destinos-info-card">
                        <p className="info-card-titulo">Detalles del destino</p>

                        <div className="info-row">
                            <div className="info-icon">
                                <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                                </svg>
                            </div>
                            <div className="info-text">
                                <h3 className="info-label">Tipo</h3>
                                <p>{destino.tipo_nombre}</p>
                            </div>
                        </div>

                        <div className="info-row">
                            <div className="info-icon">
                                <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                                </svg>
                            </div>
                            <div className="info-text">
                                <h3 className="info-label">Tiempo estimado</h3>
                                <p>{destino.tiempo}</p>
                            </div>
                        </div>

                         <div className="info-row">
                            <div className="info-icon">
                                <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                                </svg>
                            </div>
                            <div className="info-text">
                                <h3 className="info-label">Precio</h3>
                                <p className="precio">${destino.precio}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
