const express = require("express");
const router = express.Router();
const connection = require("../database/connection");

router.get("/", (req, res) => {
  const usuarioId = req.session.userId || 1; // Ajusta `userId` según cómo gestiones la sesión

  // Consultas para productos y carrito
  const productosQuery = "SELECT * FROM productos LIMIT 3";
  const carritoQuery = `
    SELECT carrito.id, productos.nombre, productos.precio, carrito.cantidad, carrito.talle
    FROM carrito
    INNER JOIN productos ON carrito.producto_id = productos.id
    WHERE carrito.usuario_id = ?
  `;

  connection.query(productosQuery, (err, productosResults) => {
    if (err) {
      console.error("Error al obtener productos:", err);
      return res.status(500).send("Error al obtener productos");
    }

    connection.query(carritoQuery, [usuarioId], (err, carritoResults) => {
      if (err) {
        console.error("Error al obtener carrito:", err);
        return res.status(500).send("Error al obtener carrito");
      }

      res.render("index", {
        title: "Inicio",
        productos: productosResults,
        carrito: carritoResults, // Pasar el carrito a la vista
        usuarioId,
      });
    });
  });
});

module.exports = router;
