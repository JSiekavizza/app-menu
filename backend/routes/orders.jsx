const express = require("express");
const {
  getOrders,
  addOrder,
  updateOrderStatus,
} = require("../controllers/orderController.jsx");

const router = express.Router();

router.get("/", getOrders);
router.post("/", addOrder);
router.put("/:id", updateOrderStatus);

module.exports = router;
