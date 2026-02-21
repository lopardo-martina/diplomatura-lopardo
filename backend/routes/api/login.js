const express = require("express");
const router = express.Router();
const connection = require("../../db");
const md5 = require("md5");

router.post("/", (req, res) => {
    const { usuario, password } = req.body;

    const passwordEncriptado = md5(password);

    const sql = "SELECT * FROM usuarios WHERE usuario = ? AND password = ?";

    connection.query(sql, [usuario, passwordEncriptado], (err, results) => {
        if (err) return res.status(500).json({ success: false });

        if (results.length > 0) {
            req.session.usuario = results[0].usuario;

            res.json({
                success: true,
                usuario: results[0].usuario
            });
        } else {
            res.json({
                success: false,
                message: "Credenciales incorrectas"
            });
        }
    });
});

module.exports = router;