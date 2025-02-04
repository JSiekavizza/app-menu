const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../data/db.json");

const getOrders = (req, res) => {
  try {
    const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    res.json(db.orders || []);
  } catch (error) {
    console.error("Error al leer pedidos:", error);
    res.status(500).json({ message: "Error al obtener pedidos" });
  }
};

const addOrder = (req, res) => {
  try {
    const { cart, total } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "El carrito está vacío" });
    }

    const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

    // Asegurar que orders existe en el JSON
    if (!db.orders) {
      db.orders = [];
    }

    const newOrder = {
      id: db.orders.length + 1,
      cart,
      total,
      status: "Pendiente",
    };

    db.orders.push(newOrder);

    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error al agregar pedido:", error);
    res.status(500).json({ message: "Error al procesar el pedido" });
  }
};

// Actualizar estado del pedido
const updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

  const orderIndex = db.orders.findIndex((order) => order.id == id);
  if (orderIndex === -1) {
    return res.status(404).json({ message: "Pedido no encontrado" });
  }

  db.orders[orderIndex].status = status;
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  res.json({ message: "Estado actualizado", order: db.orders[orderIndex] });
};

module.exports = { getOrders, addOrder, updateOrderStatus };
