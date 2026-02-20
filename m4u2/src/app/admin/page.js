"use client";

import { useEffect, useState } from "react";
import "@/styles/admin.css";

export default function Admin() {

    // Estado para manejar el formulario
    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        imagen: "",
        tipo_nombre: "",
        tiempo: "",
        precio: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    // para editar destino
    const [editandoId, setEditandoId] = useState(null);
    const [formEditar, setFormEditar] = useState({
        nombre: "",
        descripcion: "",
        imagen: "",
        tipo_nombre: "",
        tiempo: "",
        precio: ""
    });

    const editarDestino = (destino) => {
        setForm({
            nombre: destino.nombre,
            descripcion: destino.descripcion,
            imagen: destino.imagen,
            tipo_nombre: destino.tipo_nombre,
            tiempo: destino.tiempo,
            precio: destino.precio
        });
        setEditandoId(destino.id);
    };

    const iniciarEdicion = (destino) => {
        setEditandoId(destino.id);
        setFormEditar({
            nombre: destino.nombre || "",
            descripcion: destino.descripcion || "",
            imagen: destino.imagen || "",
            tipo_nombre: destino.tipo_nombre || "",
            tiempo: destino.tiempo || "",
            precio: destino.precio || ""
        });
    };

    const handleChangeEditar = (e) => {
        setFormEditar({
            ...formEditar,
            [e.target.name]: e.target.value
        });
    };

    const actualizarDestino = async (id) => {
        await fetch(`http://localhost:3001/api/destinos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formEditar)
        });

        setEditandoId(null);
        obtenerDestinos();
    };



    //para eliminar un destino
    const [destinos, setDestinos] = useState([]);

    const obtenerDestinos = () => {
        fetch("http://localhost:3001/api/destinos")
            .then(res => res.json())
            .then(data => setDestinos(data));
    };

    useEffect(() => {
        obtenerDestinos();
    }, []);

    const eliminarDestino = async (id) => {
        const confirmacion = confirm("¿Seguro que querés eliminar este destino?");
        if (!confirmacion) return;

        await fetch(`http://localhost:3001/api/destinos/${id}`, {
            method: "DELETE"
        });

        obtenerDestinos(); // refresca lista
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = editandoId ? `http://localhost:3001/api/destinos/${editandoId}` : "http://localhost:3001/api/destinos";

        const method = editandoId ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });

        const data = await res.json();
        alert(data.message);

        //refrescar lista
        obtenerDestinos();

        //limpiar el formulario
        setForm({
            nombre: "",
            descripcion: "",
            imagen: "",
            tipo_nombre: "",
            tiempo: "",
            precio: ""
        });

        setEditandoId(null);
    };



    return (
        <div className="admin-page">
            <div className="badge">
                Panel Administrador
            </div>

            <div className="admin-card añadir">
                <div className="admin-card-header">
                    <h1>Crear Destino</h1>
                    <p>Completá los campos para publicar un nuevo destino</p>
                </div>

                <div className="admin-card-body">
                    <form onSubmit={handleSubmit}>

                        <div className="form-destino">
                            <div className="campo campo-full">
                                <label htmlFor="nombre">Nombre del Destino</label>
                                <div className="input-group">
                                    <span className="icon">
                                        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <input name="nombre" placeholder="Nombre" onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="campo campo-full">
                                <label htmlFor="descripcion">Descripción</label>
                                <div className="input-group">
                                    <span className="icon">
                                        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <input name="descripcion" placeholder="Descripción" onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="campo campo-full">
                                <label htmlFor="imagen">Carga la imagen del destino</label>
                                <div className="input-group">
                                    <span className="icon">
                                        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <input name="imagen" placeholder="Imagen.jpg" onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="campo campo-full">
                                <label htmlFor="tipo">Tipo de Destino</label>
                                <div className="input-group">
                                    <span className="icon">
                                        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                        </svg>
                                    </span>
                                    <input name="tipo_destino" placeholder="Tipo de destino" onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="campo campo-full">
                                <label htmlFor="tiempo">Duración estimada</label>
                                <div className="input-group">
                                    <span className="icon">
                                        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <input name="tiempo" placeholder="Tiempo" onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="campo campo-full">
                                <label htmlFor="precio">Precio</label>
                                <div className="input-group">
                                    <span className="icon">$</span>
                                    <input name="precio" placeholder="Precio" onChange={handleChange} required />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn-submit">Crear Destino</button>

                    </form>
                </div>
            </div>

            <div className="admin-card eliminar">
                <div className="admin-card-header">
                    <h1>Destinos existentes</h1>
                    <p>Puede eliminar o editar el Destino seleccionado</p>
                </div>

                <div className="admin-card-body">
                    {destinos.map(destino => (
                        <div className="destino-linea" key={destino.id}>
                            <strong className="nombre-destino">{destino.nombre}</strong>
                            <div className="botones-destino">
                                <button onClick={() => eliminarDestino(destino.id)} className="btn-eliminar">
                                    Eliminar
                                </button>
                                <button onClick={() => iniciarEdicion(destino)} className="btn-editar">
                                    Editar
                                </button>
                            </div>

                            {editandoId === destino.id && (
                                <div className="form-editar">
                                    <div className="campo">
                                        <label htmlFor="nombre">Nombre del destino</label>
                                        <input name="nombre" value={formEditar.nombre} onChange={handleChangeEditar} />
                                    </div>

                                    <div className="campo">
                                        <label htmlFor="tipo_destino">Tipo de destino</label>
                                        <input name="tipo_destino" value={formEditar.tipo_nombre} onChange={handleChangeEditar} />
                                    </div>

                                    <div className="campo campo-full">
                                        <label htmlFor="descripcion">Descripción del destino</label>
                                        <input name="descripcion" value={formEditar.descripcion} onChange={handleChangeEditar} />
                                    </div>

                                    <div className="campo">
                                        <label htmlFor="tiempo">Duración estimada</label>
                                        <input name="tiempo" value={formEditar.tiempo} onChange={handleChangeEditar} />
                                    </div>

                                    <div className="campo">
                                        <label htmlFor="precio">Precio</label>
                                        <div className="input-group">
                                            <span className="icon">$</span>
                                            <input name="precio" value={formEditar.precio} onChange={handleChangeEditar} />
                                        </div>
                                    </div>

                                    <button onClick={() => actualizarDestino(destino.id)} className="btn-guardar">
                                        Guardar datos
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
