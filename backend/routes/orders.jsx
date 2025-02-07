const express = require("express");
const {
  getOrders,
  addOrder,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController.jsx");

const router = express.Router();

router.get("/", getOrders);
router.post("/", addOrder);
router.put("/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);

module.exports = router;
