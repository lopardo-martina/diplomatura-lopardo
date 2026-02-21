"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "@/styles/admin.css";

export default function Admin() {

    const router = useRouter();
    useEffect(() => {
        fetch("http://localhost:3001/admin/panel", {
            credentials: "include"
        })
            .then(res => {
                if (res.status === 401) {
                    router.push("/admin/login");
                }
            });
    }, []);

    // Estado para manejar el formulario Destino
    const [formDestino, setFormDestino] = useState({
        nombre: "",
        descripcion: "",
        imagen: "",
        tipo_id: "",
        tiempo: "",
        precio: ""
    });

    const handleChangeDestino = (e) => {
        setFormDestino({
            ...formDestino,
            [e.target.name]: e.target.value
        });
    };

    // Estado para manejar el formulario Destino
    const [formTips, setFormTips] = useState({
        titulo: "",
        subtitulo: "",
        descripcion: "",
        icono_id: ""
    });

    const handleChangeTips = (e) => {
        setFormTips({
            ...formTips,
            [e.target.name]: e.target.value
        });
    };


    // para editar destino
    const [editandoDestinoId, setEditandoDestinoId] = useState(null);
    const [formEditarDestino, setFormEditarDestino] = useState({
        nombre: "",
        descripcion: "",
        imagen: "",
        tipo_id: "",
        tiempo: "",
        precio: ""
    });

    const editarDestino = (destino) => {
        setFormDestino({
            nombre: destino.nombre,
            descripcion: destino.descripcion,
            imagen: destino.imagen,
            tipo_id: destino.tipo_id,
            tiempo: destino.tiempo,
            precio: destino.precio
        });
        setEditandoDestinoId(destino.id);
    };

    const iniciarEdicionDestino = (destino) => {
        setEditandoDestinoId(destino.id);
        setFormEditarDestino({
            nombre: destino.nombre || "",
            descripcion: destino.descripcion || "",
            imagen: destino.imagen || "",
            tipo_id: destino.tipo_id || "",
            tiempo: destino.tiempo || "",
            precio: destino.precio || ""
        });
    };

    const handleChangeEditarDestino = (e) => {
        setFormEditarDestino({
            ...formEditarDestino,
            [e.target.name]: e.target.value
        });
    };

    const actualizarDestino = async (id) => {
        await fetch(`http://localhost:3001/api/destinos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(formEditarDestino)
        });

        setEditandoDestinoId(null);
        obtenerDestinos();
    };

    // para seleccionar el tipo de destino
    const [tiposDestino, setTiposDestino] = useState([]);

    const obtenerTipos = () => {
        fetch("http://localhost:3001/api/tipos-destino")
            .then(res => res.json())
            .then(data => setTiposDestino(data));
    };

    useEffect(() => {
        obtenerTipos();
    }, []);


    // para editar Tips
    const [editandoTipsId, setEditandoTipsId] = useState(null);
    const [formEditarTips, setFormEditarTips] = useState({
        titulo: "",
        subtitulo: "",
        descripcion: "",
        icono_id: ""
    });

    const editarTips = (tips) => {
        setFormTips({
            titulo: tips.titulo,
            subtitulo: tips.subtitulo,
            descripcion: tips.descripcion,
            icono_clase: tips.icono_clase
        });
        setEditandoTipsId(tips.id);
    };

    const iniciarEdicionTips = (tips) => {
        setEditandoTipsId(tips.id);
        setFormEditarTips({
            titulo: tips.titulo || "",
            subtitulo: tips.subtitulo || "",
            descripcion: tips.descripcion || "",
            icono_id: tips.icono_id || ""
        });
    };

    const handleChangeEditarTips = (e) => {
        setFormEditarTips({
            ...formEditarTips,
            [e.target.name]: e.target.value
        });
    };

    const actualizarTips = async (id) => {
        await fetch(`http://localhost:3001/api/tips/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formEditarTips)
        });

        setEditandoTipsId(null);
        obtenerTips();
    };

    // para seleccionar iconos
    const [iconos, setIconos] = useState([]);
    const obtenerIconos = () => {
        fetch("http://localhost:3001/api/iconos")
            .then(res => res.json())
            .then(data => setIconos(data));
    };

    useEffect(() => {
        obtenerIconos();
    }, []);


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
            method: "DELETE",
            credentials: "include"
        });

        obtenerDestinos(); // refresca lista
    };


    //para eliminar un tip
    const [tips, setTips] = useState([]);

    const obtenerTips = () => {
        fetch("http://localhost:3001/api/tips")
            .then(res => res.json())
            .then(data => setTips(data));
    };

    useEffect(() => {
        obtenerTips();
    }, []);

    const eliminarTips = async (id) => {
        const confirmacion = confirm("¿Seguro que querés eliminar este tip?");
        if (!confirmacion) return;

        await fetch(`http://localhost:3001/api/tips/${id}`, {
            method: "DELETE",
            credentials: "include"
        });

        obtenerTips(); // refresca lista
    };


    //submit para crear o editar destino
    const handleSubmitDestino = async (e) => {
        e.preventDefault();

        const url = editandoDestinoId ? `http://localhost:3001/api/destinos/${editandoDestinoId}` : "http://localhost:3001/api/destinos";

        const method = editandoDestinoId ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(formDestino)
        });

        const data = await res.json();
        alert(data.message);

        //refrescar lista
        obtenerDestinos();

        //limpiar el formulario
        setFormDestino({
            nombre: "",
            descripcion: "",
            imagen: "",
            tipo_id: "",
            tiempo: "",
            precio: ""
        });

        setEditandoDestinoId(null);
    };


    //submit para creaor o editar tip
    const handleSubmitTips = async (e) => {
        e.preventDefault();

        const url = editandoTipsId ? `http://localhost:3001/api/tips/${editandoTipsId}` : "http://localhost:3001/api/tips";

        const method = editandoTipsId ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        });

        const data = await res.json();
        alert(data.message);

        //refrescar lista
        obtenerTips();

        //limpiar el formulario
        setFormTips({
            titulo: "",
            subtitulo: "",
            descripcion: "",
            icono_clase: ""
        });

        setEditandoTipsId(null);
    };



    return (
        <div className="admin-page">
            <div className="badge holder">
                Panel Administrador
                <button className="btn btn-logout" onClick={() => { localStorage.removeItem("adminLogueado"); localStorage.removeItem("usuario"); router.push("/admin/login"); }}> Cerrar sesión</button>
            </div>


            <div className="admin-card añadir añadir-destino holder">
                <div className="admin-card-header">
                    <h1>Crear Destino</h1>
                    <p>Completá los campos para publicar un nuevo destino</p>
                </div>

                <div className="admin-card-body">
                    <form onSubmit={handleSubmitDestino}>

                        <div className="form-destino">
                            <div className="campo campo-full">
                                <label htmlFor="nombre">Nombre del Destino</label>
                                <div className="input-group">
                                    <span className="icon">
                                        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <input name="nombre" placeholder="Nombre" onChange={handleChangeDestino} required />
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
                                    <input name="descripcion" placeholder="Descripción" onChange={handleChangeDestino} required />
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
                                    <input name="imagen" placeholder="Imagen.jpg" onChange={handleChangeDestino} required />
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
                                    <select name="tipo_id" value={formDestino.tipo_id} onChange={handleChangeDestino} required>
                                        <option value="">Seleccionar tipo</option>
                                        {tiposDestino.map(tipo => (
                                            <option key={tipo.id} value={tipo.id}>
                                                {tipo.nombre}
                                            </option>
                                        ))}
                                    </select>
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
                                    <input name="tiempo" placeholder="Tiempo" onChange={handleChangeDestino} required />
                                </div>
                            </div>

                            <div className="campo campo-full">
                                <label htmlFor="precio">Precio</label>
                                <div className="input-group">
                                    <span className="icon">$</span>
                                    <input name="precio" placeholder="Precio" onChange={handleChangeDestino} required />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn-submit">Crear Destino</button>

                    </form>
                </div>
            </div>


            <div className="admin-card eliminar-detalles holder">
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
                                <button onClick={() => iniciarEdicionDestino(destino)} className="btn-editar">
                                    Editar
                                </button>
                            </div>

                            {editandoDestinoId === destino.id && (
                                <div className="form-editar">
                                    <button type="button" className="btn-cerrar" onClick={() => setEditandoDestinoId(null)}>
                                        ✕
                                    </button>
                                    <div className="campo">
                                        <label htmlFor="nombre">Nombre del destino</label>
                                        <input name="nombre" value={formEditarDestino.nombre} onChange={handleChangeEditarDestino} />
                                    </div>

                                    <div className="campo">
                                        <label htmlFor="tipo_destino">Tipo de destino</label>
                                        <select name="tipo_id" value={formEditarDestino.tipo_id} onChange={handleChangeEditarDestino} required>
                                            <option value="">Seleccionar tipo</option>
                                            {tiposDestino.map(tipo => (
                                                <option key={tipo.id} value={tipo.id}>
                                                    {tipo.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="campo campo-full">
                                        <label htmlFor="descripcion">Descripción del destino</label>
                                        <input name="descripcion" value={formEditarDestino.descripcion} onChange={handleChangeEditarDestino} />
                                    </div>

                                    <div className="campo">
                                        <label htmlFor="tiempo">Duración estimada</label>
                                        <input name="tiempo" value={formEditarDestino.tiempo} onChange={handleChangeEditarDestino} />
                                    </div>

                                    <div className="campo">
                                        <label htmlFor="precio">Precio</label>
                                        <div className="input-group">
                                            <span className="icon">$</span>
                                            <input name="precio" value={formEditarDestino.precio} onChange={handleChangeEditarDestino} />
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


            <div className="admin-card añadir añadir-tips holder">
                <div className="admin-card-header">
                    <h1>Crear Tip</h1>
                    <p>Completá los campos para publicar un nuevo tip</p>
                </div>

                <div className="admin-card-body card-tips">
                    <form onSubmit={handleSubmitTips}>

                        <div className="form-tips">
                            <div className="campo campo-full">
                                <label htmlFor="titulo">Titulo del Tip</label>
                                <div className="input-group">
                                    <span className="icon">
                                        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <input name="titulo" placeholder="Titulo" onChange={handleChangeTips} required />
                                </div>
                            </div>

                            <div className="campo campo-full">
                                <label htmlFor="subtitulo">Subtitulo</label>
                                <div className="input-group">
                                    <span className="icon">
                                        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                        </svg>
                                    </span>
                                    <select name="icono_id" value={formTips.icono_id} onChange={handleChangeTips} >
                                        <option value="">Seleccionar icono</option>
                                        {iconos.map(icono => (
                                            <option key={icono.id} value={icono.id}>
                                                {icono.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="campo campo-full">
                                <label htmlFor="subtitulo">Subtitulo</label>
                                <div className="input-group">
                                    <span className="icon">
                                        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <input name="subtitulo" placeholder="Subtitulo" onChange={handleChangeTips} required />
                                </div>
                            </div>

                            <div className="campo campo-full">
                                <label htmlFor="descripcion">Descripcion</label>
                                <div className="input-group">
                                    <span className="icon">
                                        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                        </svg>
                                    </span>
                                    <input name="descripcion" placeholder="Descripcion" onChange={handleChangeTips} required />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn-submit">Crear Tip</button>
                    </form>
                </div>
            </div>

            <div className="admin-card eliminar-tips holder">
                <div className="admin-card-header">
                    <h1>Tips existentes</h1>
                    <p>Puede eliminar o editar el Tip seleccionado</p>
                </div>

                <div className="admin-card-body">
                    {tips.map(tips => (
                        <div className="destino-linea" key={tips.id}>
                            <strong className="nombre-destino">{tips.titulo}</strong>
                            <div className="botones-destino">
                                <button onClick={() => eliminarTips(tips.id)} className="btn-eliminar">
                                    Eliminar
                                </button>
                                <button onClick={() => iniciarEdicionTips(tips)} className="btn-editar">
                                    Editar
                                </button>
                            </div>

                            {editandoTipsId === tips.id && (
                                <div className="form-editar">
                                    <button type="button" className="btn-cerrar" onClick={() => setEditandoTipsId(null)}>
                                        ✕
                                    </button>
                                    <div className="campo">
                                        <label htmlFor="titulo">Titulo del Tip</label>
                                        <input name="titulo" value={formEditarTips.titulo} onChange={handleChangeEditarTips} />
                                    </div>

                                    <div className="campo">
                                        <label htmlFor="icono_clase">Icono</label>
                                        <select className="select-editar" name="icono_id" value={formEditarTips.icono_id} onChange={handleChangeEditarTips} >
                                            <option value="">Seleccionar icono</option>
                                            {iconos.map(icono => (
                                                <option key={icono.id} value={icono.id}>
                                                    {icono.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="campo campo-full">
                                        <label htmlFor="subtitulo">Subtitulo del Tip</label>
                                        <input name="subtitulo" value={formEditarTips.subtitulo} onChange={handleChangeEditarTips} />
                                    </div>

                                    <div className="campo campo-full">
                                        <label htmlFor="descripcion">Descripcion</label>
                                        <input name="descripcion" value={formEditarTips.descripcion} onChange={handleChangeEditarTips} />
                                    </div>

                                    <button onClick={() => actualizarTips(tips.id)} className="btn-guardar">
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
