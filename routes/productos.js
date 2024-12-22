const express = require("express");
const router = express.Router(); // Define el router
const connection = require("../database/connection");

router.get("/", (req, res) => {
  const query = "SELECT * FROM productos";
  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error al cargar productos");
    }
    res.render("productos", { productos: results });
  });
});

module.exports = router;
