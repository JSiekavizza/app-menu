const express = require("express");
const {
  getCart,
  addToCart,
  removeFromCart,
} = require("../controllers/cartController.jsx");
const router = express.Router();

router.get("/", getCart);
router.post("/", addToCart);
router.delete("/:id", removeFromCart);

module.exports = router;
