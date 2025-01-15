const express = require("express");
const router = express.Router();
const connection = require("../database/connection");

// Ruta para eliminar un producto del carrito
router.post("/eliminar", (req, res) => {
  const { productoId } = req.body;

  if (!productoId) {
    return res.status(400).json({
      success: false,
      message: "Faltan datos. Asegúrate de enviar el ID del producto.",
    });
  }

  // Asegúrate de que productoId y usuarioId sean números
  if (isNaN(productoId)) {
    return res.status(400).json({
      success: false,
      message: "El ID del producto y el usuario deben ser números.",
    });
  }

  const query = `DELETE FROM carrito WHERE id = ?`;

  connection.query(query, [productoId], (err, result) => {
    if (err) {
      console.error("Error al eliminar el producto:", err);
      return res
        .status(500)
        .json({ success: false, message: "Error al eliminar producto" });
    }

    if (result.affectedRows > 0) {
      return res.json({
        success: true,
        message: "Producto eliminado con éxito",
      });
    } else {
      return res.json({
        success: false,
        message:
          "No se encontró el producto en el carrito o no pertenece al usuario.",
      });
    }
  });
});

module.exports = router;
