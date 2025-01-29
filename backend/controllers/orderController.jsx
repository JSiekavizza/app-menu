const db = require("../data/db.json"); // Simulación con db.json
const fs = require("fs");

// Obtener todos los pedidos
const getOrders = (req, res) => {
  res.status(200).json(db.orders || []);
};

// Crear un nuevo pedido
const createOrder = (req, res) => {
  const { cart, total } = req.body;

  if (!cart || cart.length === 0) {
    return res.status(400).json({ message: "El carrito está vacío" });
  }

  const newOrder = {
    id: Date.now().toString(),
    items: cart,
    total,
    status: "pendiente",
    timestamp: new Date().toISOString(),
  };

  db.orders = db.orders || [];
  db.orders.push(newOrder);

  // Guardar en db.json
  fs.writeFile("./backend/data/db.json", JSON.stringify(db, null, 2), (err) => {
    if (err) {
      console.error("Error al guardar el pedido:", err);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
    res.status(201).json(newOrder);
  });
};

// Actualizar el estado de un pedido
const updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = db.orders.find((order) => order.id === id);
  if (!order) {
    return res.status(404).json({ message: "Pedido no encontrado" });
  }

  order.status = status;

  // Guardar en db.json
  fs.writeFile("./backend/data/db.json", JSON.stringify(db, null, 2), (err) => {
    if (err) {
      console.error("Error al actualizar el pedido:", err);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
    res.status(200).json(order);
  });
};

module.exports = { getOrders, createOrder, updateOrderStatus };
