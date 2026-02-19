"use client";

import { useState } from "react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        mail: "",
        mensaje: ""
    });


    const [mensajeEstado, setMensajeEstado] = useState("");


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/api/contacto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMensajeEstado("Mensaje enviado correctamente");
                setFormData({
                    nombre: "",
                    apellido: "",
                    mail: "",
                    mensaje: ""
                });
            } else {
                setMensajeEstado("Error al enviar el mensaje");
            }
        } catch (error) {
            setMensajeEstado("Error del servidor");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="formulario">
            <div className="fila">
                <div className="campo">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" value={formData.nombre} onChange={handleChange} placeholder="Escribe tu nombre" required />
                </div>

                <div className="campo">
                    <label htmlFor="apellido">Apellido</label>
                    <input type="text"  id="apellido" value={formData.apellido} onChange={handleChange} placeholder="Escribe tu Apellido" required />
                </div>
            </div>

            <label htmlFor="mail">Email</label>
            <input type="email" id="mail" value={formData.mail} onChange={handleChange} placeholder="Escribe tu email" required />

            <label htmlFor="mensaje">Mensaje</label>
            <textarea rows="5" id="mensaje" value={formData.mensaje} onChange={handleChange} placeholder="Escribe tu mensaje aquí" required ></textarea>

            <button type="submit" className="btn enviar-btn">
                Enviar
            </button>

            {mensajeEstado && <p>{mensajeEstado}</p>}
        </form>
    );
}