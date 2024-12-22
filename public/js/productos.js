const urlParams = new URLSearchParams(window.location.search);
const producto = urlParams.get("producto");

// Obtener el h2 para cambiar el nombre del producto
const nombreProducto = document.getElementById("nombreProducto");

// Cambiar el nombre según el parámetro
if (producto) {
  nombreProducto.textContent = producto;

  // Aquí puedes agregar lógica para actualizar el precio o la imagen si lo deseas
  if (producto === "Remera") {
    document.getElementById("precioProducto").textContent = "$15,000.00";
    nombreProducto.textContent = "Remera";
  } else if (producto === "Buzo") {
    document.getElementById("precioProducto").textContent = "$30,000.00";
    nombreProducto.textContent = "Buzo";
  } else if (producto === "Remera3") {
    document.getElementById("precioProducto").textContent = "$50,000.00";
    nombreProducto.textContent = "Conjunto";
  }
}
