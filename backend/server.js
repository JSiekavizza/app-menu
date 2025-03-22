require("dotenv").config(); // Cargar variables de entorno
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000; // Puerto dinámico en Railway
const SECRET_KEY =
  process.env.SECRET_KEY || //"secreto_super_seguro";
  // Middleware
  app.use(
    cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" })
  ); // // Permitir acceso desde Vercel
app.use(bodyParser.json());

console.log("CORS configurado para:", process.env.FRONTEND_URL);

// Middleware para verificar el token en rutas protegidas
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  // Permitir crear pedidos sin autenticación
  if (req.path === "/api/orders" && req.method === "POST") {
    return next();
  }

  if (!token) {
    return res.status(403).json({ message: "Token requerido" });
  }

  jwt.verify(token.replace("Bearer ", ""), SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }
    req.user = decoded;
    next();
  });
};

// Rutas públicas
app.use("/api/users", require("./routes/users.jsx"));
app.use("/api/templates", require("./routes/templates.jsx"));
app.use("/api/categories", require("./routes/categories.jsx"));

// Proteger solo las rutas de administración en `orders`
app.use(
  "/api/orders",
  (req, res, next) => {
    if (req.method === "POST") {
      return next(); // Permitir POST sin autenticación
    }
    verifyToken(req, res, next); // Proteger las demás rutas
  },
  require("./routes/orders.jsx")
);

app.get("/api/config", (req, res) => {
  const db = require("./data/db.json");
  res.status(200).json(db.config);
});

// **Preparación para producción**: Servir archivos estáticos en Railway
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public")));
}

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${PORT}`);
});
