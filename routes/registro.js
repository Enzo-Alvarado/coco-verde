const express = require("express");
const bcrypt = require("bcryptjs");
const connection = require("../database/connection");

const router = express.Router();

// Mostrar formulario de registro
router.get("/", (req, res) => {
  const error = req.query.error || null; // Obtén el error de la query, si existe
  res.render("registro", { error }); // Pasa 'error' a la vista
});

// Procesar formulario de registro
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const checkEmailQuery = "SELECT * FROM usuario WHERE email = ?";
  connection.query(checkEmailQuery, [email], async (err, results) => {
    if (err) {
      console.error("Error al verificar el email:", err);
      return res.status(500).send("Error en el servidor");
    }

    if (results.length > 0) {
      // Redirige con el mensaje de error si el email ya está registrado
      return res.redirect("/registro?error=email_ya_registrado");
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertQuery = "INSERT INTO usuario (email, password) VALUES (?, ?)";
      connection.query(insertQuery, [email, hashedPassword], (err) => {
        if (err) {
          console.error("Error al registrar el usuario:", err);
          return res.status(500).send("Error en el registro");
        }
        res.redirect("/auth");
      });
    } catch (error) {
      console.error("Error al encriptar la contraseña:", error);
      res.status(500).send("Error en el servidor");
    }
  });
});

module.exports = router;
