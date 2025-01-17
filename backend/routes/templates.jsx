const express = require("express");
const {
  getTemplates,
  updateTemplate,
} = require("../controllers/templateController.jsx");
const router = express.Router();

router.get("/", getTemplates);
router.post("/:id", updateTemplate);

module.exports = router;
