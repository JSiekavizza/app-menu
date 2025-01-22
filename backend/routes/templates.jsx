const express = require("express");
const { getTemplateById } = require("../controllers/templateController.jsx");
const router = express.Router();

router.get("/:id", getTemplateById);

module.exports = router;
