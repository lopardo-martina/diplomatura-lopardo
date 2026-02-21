const db = require("./db");
const cors = require("cors");
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const connection = require("./db");
const app = express();
const nodemailer = require("nodemailer");
const session = require("express-session");
const md5 = require("md5");

const verificarUsuario = require("./middlewares/auth");
const loginApiRouter = require("./routes/api/login");

require("dotenv").config();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

// view engine setup
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
//user admin
app.use(session({
    secret: "bsirways_proyecto",
    resave: false,
    saveUninitialized: true
}));


app.use("/admin", verificarUsuario);
app.use("/api/login", loginApiRouter);


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



app.get("/admin/panel", verificarUsuario, (req, res) => {
    res.render("admin/panel", {
        layout: "admin/layout",
        usuario: req.session.usuario
    });
});


// API - para obtener todos los destinos
app.get("/api/destinos", (req, res) => {
    const sql = `
        SELECT destinos.*, tipos_destino.nombre AS tipo_nombre
        FROM destinos
        LEFT JOIN tipos_destino
        ON destinos.tipo_id = tipos_destino.id
    `;

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
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

//Para obtener los tpo de destinos
app.get("/api/tipos-destino", (req, res) => {
    connection.query("SELECT * FROM tipos_destino", (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        res.json(results);
    });
});

// ]Para agregar destino
app.post("/api/destinos", verificarUsuario, (req, res) => {

    const { nombre, descripcion, imagen, tipo_id, tiempo, precio } = req.body;

    const sql = `
    INSERT INTO destinos (nombre, descripcion, imagen, tipo_id, tiempo, precio)
    VALUES (?,?,?,?,?,?)
    `

    connection.query(
        sql,
        [nombre, descripcion, imagen, tipo_id, tiempo, precio],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Destino creado correctamente" });
        }
    )
})

//para eliminar destino
app.delete("/api/destinos/:id", verificarUsuario, (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM destinos WHERE id = ?"

    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Destino eliminado correctamente." })
    })
})


app.put("/api/destinos/:id", verificarUsuario, (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, imagen, tipo_id, tiempo, precio } = req.body;

    const sql = `
    UPDATE destinos
    SET nombre = ?, descripcion = ?, imagen = ?, tipo_id = ?, tiempo = ?, precio = ?
    WHERE id = ?
    `;

    connection.query(
        sql,
        [nombre, descripcion, imagen, tipo_id, tiempo, precio, id],
        (err, result) => {
            console.log("ERROR SQL:", err);
            if (err) return res.status(500).json(err);

            res.json({ message: "Destino actualizado correctamente" });
        }
    );
});



// API - para obtener todos los tips
app.get("/api/tips", (req, res) => {
    const sql = `
        SELECT tips.*, iconos.clase AS icono_clase
        FROM tips
        LEFT JOIN iconos
        ON tips.icono_id = iconos.id
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        res.json(results);
    });
});

//Para obener los iconos para los tips
app.get("/api/iconos", (req, res) => {
    connection.query("SELECT * FROM iconos", (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        res.json(results);
    });
});


// Para agregar un tip
app.post("/api/tips", verificarUsuario, (req, res) => {
    const { titulo, subtitulo, descripcion, icono_id } = req.body;

    const sql = `
    INSERT INTO tips (titulo, subtitulo, descripcion, icono_id)
    VALUES (?,?,?,?)
    `

    connection.query(
        sql,
        [titulo, subtitulo, descripcion, icono_id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Tip creado correctamente" });
        }
    )
})

//para eliminar un tip
app.delete("/api/tips/:id", verificarUsuario, (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM tips WHERE id = ?"

    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Tip eliminado correctamente." })
    })
})


app.put("/api/tips/:id", verificarUsuario, (req, res) => {
    const { id } = req.params;
    const { titulo, subtitulo, descripcion, icono_id } = req.body;

    const sql = `
    UPDATE tips
    SET titulo = ?, subtitulo = ?, descripcion = ?, icono_id = ?
    WHERE id = ?
    `;

    connection.query(
        sql,
        [titulo, subtitulo, descripcion, icono_id, id],
        (err, result) => {
            if (err) {
                console.log("ERROR SQL:", err);
                return res.status(500).json(err);
            }
            res.json({ message: "Tip actualizado correctamente" });
        }
    );
});




//api envio de formulario
app.post("/api/contacto", async (req, res) => {
    const { nombre, apellido, mail, mensaje } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        console.log(req.body);


        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
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