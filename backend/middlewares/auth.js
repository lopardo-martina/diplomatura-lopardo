function verificarUsuario(req, res, next) {
    if (req.session.usuario) {
        next();
    } else {
        res.redirect("/admin/login");
    }
}


module.exports = verificarUsuario;