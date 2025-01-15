//registro de usuario
const express = require("express");
const bcrypt = require("bcryptjs");
const connection = require("../database/connection");

const router = express.Router();

//inicio de sesion
router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM usuario WHERE email = ?";
  connection.query(query, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).send("Usuario no encontrado");
    }

    const usuario = results[0];
    const validPassword = await bcrypt.compare(password, usuario.password);
    if (!validPassword) {
      return res.status(400).send("Contraseña incorrecta");
    }

    req.session.userId = usuario.id;

    const redirectTo = req.session.redirectTo;
    delete req.session.redirectTo; // Limpiar la sesión
    res.redirect(redirectTo || "/");
  });
});

module.exports = router;
