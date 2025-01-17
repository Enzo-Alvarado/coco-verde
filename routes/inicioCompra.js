const express = require("express");
const router = express.Router(); // Define el router
const connection = require("../database/connection"); // Importa la conexión a la base de datos

router.get("/", (req, res) => {
  const usuarioId = req.session.userId;

  const query = `
          SELECT productos.nombre, productos.precio, carrito.cantidad, carrito.talle
          FROM carrito
          INNER JOIN productos ON carrito.producto_id = productos.id
          WHERE carrito.usuario_id = ?
      `;
  connection.query(query, [usuarioId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error al cargar el carrito");
    }
    res.render("inicioCompra", {
      titulo: "Inicio de compra",
      carrito: results,
    });
  });
});

module.exports = router; // Exporta el router
