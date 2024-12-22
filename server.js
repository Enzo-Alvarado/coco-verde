const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Configuración del servidor
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "clave_secreta",
    resave: false,
    saveUninitialized: false,
  })
);

// Configurar EJS como motor de plantillas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Importar rutas
const authRoutes = require("./routes/auth");
const productosRoutes = require("./routes/productos");
const productosinfoRoutes = require("./routes/productosinfo");
const carritoRoutes = require("./routes/carrito");
const indexRoutes = require("./routes/index");
const registroRoutes = require("./routes/registro");

app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/productos", productosRoutes);
app.use("/productosinfo", productosinfoRoutes);
app.use("/carrito", carritoRoutes);
app.use("/registro", registroRoutes);

// Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
