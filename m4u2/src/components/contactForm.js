export default function ContactForm() {
    return (
        <>
            <form action="" className="formulario">
                <div className="fila">
                    <div className="campo">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" placeholder="Escribe tu nombre" />
                    </div>
                    <div className="campo">
                        <label htmlFor="apellido">Apellido</label>
                        <input type="text" id="apellido" placeholder="Escribe tu Apellido" />
                    </div>
                </div>

                <label htmlFor="mail">Email</label>
                <input type="email" id="mail" placeholder="Escribe tu email" />

                <label htmlFor="mensaje">Mensaje</label>
                <textarea rows="5" id="mensaje" placeholder="Escribe tu mensaje aquí"></textarea>

                <button type="submit" className="btn enviar-btn">Enviar</button>
            </form>
        </>
    )
}