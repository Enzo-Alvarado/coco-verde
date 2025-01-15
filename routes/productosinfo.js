const express = require("express");
const router = express.Router();
const connection = require("../database/connection");

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const productoQuery = "SELECT * FROM productos WHERE id = ?";
  const tallesQuery = "SELECT * FROM talles";

  // Ejecutar ambas consultas
  connection.query(productoQuery, [id], (err, productoResults) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error al cargar el producto");
    }

    if (productoResults.length === 0) {
      return res.status(404).send("Producto no encontrado");
    }

    connection.query(tallesQuery, (err, tallesResults) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error al cargar los talles");
      }

      // Renderizar la vista con el producto y los talles
      res.render("productosinfo", {
        producto: productoResults[0],
        talles: tallesResults,
      });
    });
  });
});

module.exports = router;
