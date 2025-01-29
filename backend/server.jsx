const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Permite solicitudes solo desde tu frontend
  })
);
app.use(bodyParser.json());

// Rutas

app.use("/api/templates", require("./routes/templates.jsx")); // Ruta para templates
app.use("/api/categories", require("./routes/categories.jsx")); // Ruta para categorías
app.use("/api/users", require("./routes/users.jsx"));
app.use("/api/orders", require("./routes/orders.jsx"));

app.get("/api/config", (req, res) => {
  const db = require("./data/db.json"); // Importa los datos desde db.json
  res.status(200).json(db.config); // Envía el config del archivo db.json
});

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
