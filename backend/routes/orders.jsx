const express = require("express");
const {
  getOrders,
  addOrder,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController.jsx");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, getOrders); // Protegido para admins
router.post("/", addOrder); // Permitir pedidos sin autenticación
router.put("/:id", verifyToken, updateOrderStatus); // Protegido para admins
router.delete("/:id", verifyToken, deleteOrder); // Protegido para admins

module.exports = router;
