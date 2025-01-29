const express = require("express");
const {
  getOrders,
  createOrder,
  updateOrderStatus,
} = require("../controllers/orderController.jsx");
const router = express.Router();

// Obtener todos los pedidos
router.get("/", getOrders);

// Crear un nuevo pedido
router.post("/", createOrder);

// Actualizar el estado de un pedido
router.put("/:id", updateOrderStatus);

module.exports = router;
