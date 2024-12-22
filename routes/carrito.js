const express = require("express");
const router = express.Router(); // Define el router
const connection = require("../database/connection"); // Importa la conexión a la base de datos

// Ruta para agregar productos al carrito
router.post("/agregar", (req, res) => {
  const { productoId, talle, cantidad } = req.body;
  const usuarioId = req.session.userId; // Supone que tienes el ID del usuario en la sesión

  if (!usuarioId) {
    return res.status(401).send("Usuario no autenticado");
  }

  const query =
    "INSERT INTO carrito (usuario_id, producto_id, talle, cantidad) VALUES (?, ?, ?, ?)";
  connection.query(
    query,
    [usuarioId, productoId, talle, cantidad],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error al agregar al carrito");
      }
      res.status(200).send("Producto agregado al carrito");
    }
  );
});

// Mostrar el carrito
router.get("/", (req, res) => {
  const usuarioId = req.session.userId;

  const query = `
        SELECT productos.nombre, productos.precio, carrito.cantidad
        FROM carrito
        INNER JOIN productos ON carrito.producto_id = productos.id
        WHERE carrito.usuario_id = ?
    `;
  connection.query(query, [usuarioId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error al cargar el carrito");
    }
    res.render("carrito", { carrito: results });
  });
});

module.exports = router; // Exporta el router
