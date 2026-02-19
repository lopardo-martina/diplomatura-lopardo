"use client";

import "@/styles/destinoDetalle.css";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
        <div>
            <h1>{destino.nombre}</h1>
            <img src={`/img/${destino.imagen}`} alt={destino.nombre} />
            <p>{destino.descripcion}</p>
            <p>Tipo: {destino.tipo_destino}</p>
            <p>Tiempo estimado: {destino.tiempo}</p>
            <p>Precio: {destino.precio}</p>
        </div>
    );
}
