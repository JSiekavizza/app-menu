const express = require("express");
const { loginUser } = require("../controllers/userController.jsx");

const router = express.Router();

router.post("/login", loginUser); // Endpoint para login

module.exports = router;
