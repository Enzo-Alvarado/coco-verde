const express = require("express");
const router = express.Router(); // Define el router
const connection = require("../database/connection"); // Importa la conexión a la base de datos

router.post("/verificar", (req, res) => {
  const { productoId, talle, cantidad, redirectUrl } = req.body;

  if (!req.session || !req.session.userId) {
    // Guarda la URL para redireccionar después del login
    req.session.redirectTo = redirectUrl;
    return res.status(401).send("Usuario no autenticado");
  }

  // Verifica si el talle y la cantidad están presentes
  if (!talle || !cantidad) {
    return res.status(400).send("Debe seleccionar un talle y una cantidad");
  }

  // Lógica para agregar el producto al carrito (si está autenticado)
  const query =
    "INSERT INTO carrito (usuario_id, producto_id, talle, cantidad) VALUES (?, ?, ?, ?)";
  connection.query(
    query,
    [req.session.userId, productoId, talle, cantidad],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error al agregar al carrito");
      }
      res.status(200).send("Producto agregado al carrito");
    }
  );
});

module.exports = router;

// Mostrar el carrito
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
    res.render("carrito", { carrito: results });
  });
});

module.exports = router; // Exporta el router
