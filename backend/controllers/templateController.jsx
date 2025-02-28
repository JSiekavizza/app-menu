const db = require("../data/db.json");

const getTemplateById = (req, res) => {
  const { id } = req.params;
  const template = db.templates.find((t) => t.template === parseInt(id));

  if (template) {
    res.status(200).json(template); // Devuelve el template encontrado
  } else {
    res.status(404).json({ message: "Template no encontrado" }); // Error si no existe
  }
};

module.exports = { getTemplateById };
