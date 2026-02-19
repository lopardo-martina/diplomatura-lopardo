const db = require("./db");
const cors = require("cors");
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const connection = require("./db");
const app = express();
const nodemailer = require("nodemailer");

require("dotenv").config();

app.use(cors({
    origin: "http://localhost:3000"
}));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Handlebars
app.engine("hbs", exphbs.engine({
    extname: "hbs",
    defaultLayout: "main"
}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Ruta principal
app.get("/", (req, res) => {
    res.render("home");
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});


// API - para obtener todos los destinos
app.get("/api/destinos", (req, res) => {
    db.query("SELECT * FROM destinos", (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Error en la base de datos" });
        } else {
            res.json(results);
        }
    });
});

// API para obtener detalle de un destino por id
app.get("/api/destinos/:id", (req, res) => {
    const { id } = req.params;

    connection.query(
        "SELECT * FROM destinos WHERE id = ?",
        [id],
        (err, results) => {
            if (err) return res.status(500).json(err);
            res.json(results[0])
        }
    );
});

// ]Para agregar destino
app.post("/api/destinos", (req, res) => {
    const { nombre, descripcion, imagen, tipo_destio, tiempo, precio } = req.body;

    const sql = `
    INSERT INTO destinos (nombre, descripcion, imagen, tipo_destino, tiempo, precio)
    VALUES (?,?,?,?,?,?)
    `

    connection.query(
        sql,
        [nombre, descripcion, imagen, tipo_destio, tiempo, precio],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Destino creado correctamente" });
        }
    )
})

//para eliminar destino
app.delete("/api/destinos/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM destinos WHERE id = ?"

    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Destino eliminado correctamente." })
    })
})


app.put("/api/destinos/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, imagen, tipo_destino, tiempo, precio } = req.body;

    const sql = `
    UPDATE destinos
    SET nombre = ?, descripcion = ?, imagen = ?, tipo_destino = ?, tiempo = ?, precio = ?
    WHERE id = ?
    `;

    connection.query(
        sql,
        [nombre, descripcion, imagen, tipo_destino, tiempo, precio, id],
        (err, result) => {
            console.log("ERROR SQL:", err);
            if (err) return res.status(500).json(err);

            res.json({ message: "Destino actualizado correctamente" });
        }
    );
});



// API - para obtener todos los tips
app.get("/api/tips", (req, res) => {
    db.query("SELECT * FROM tips", (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Error en la base de datos" });
        } else {
            res.json(results);
        }
    });
});




//api envio de formulario
app.post("/api/contacto", async (req, res) => {
    const { nombre, apellido, mail, mensaje } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "pruebas.proyectos.lopar@gmail.com",
                pass: "beee bepq aeeq yagv"
            }
        });
        console.log(req.body);


        await transporter.sendMail({
            from: "pruebas.proyectos.lopar@gmail.com",
            to: "pruebas.proyectos.lopar@gmail.com",
            subject: "Nuevo mensaje de contacto",
            text: `
                Nombre: ${nombre}
                Apellido: ${apellido}
                Email: ${mail}
                Mensaje: ${mensaje}
            `
        });

        res.json({ message: "Correo enviado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al enviar correo" });
    }
})