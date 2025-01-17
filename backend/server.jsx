const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/api/categories", require("./routes/categories.jsx"));
app.use("/api/cart", require("./routes/cart.jsx"));
app.use("/api/templates", require("./routes/templates.jsx"));

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
