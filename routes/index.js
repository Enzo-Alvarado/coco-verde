const express = require("express");
const router = express.Router();
const connection = require("../database/connection"); // Importar conexión a la base de datos

router.get("/", (req, res) => {
  connection.query("SELECT * FROM productos LIMIT 3", (err, results) => {
    if (err) {
      console.error("Error al obtener productos:", err);
      return res.status(500).send("Error al obtener productos");
    }
    res.render("index", { title: "Inicio", productos: results }); // Pasar los productos a la vista
  });
});

module.exports = router;
