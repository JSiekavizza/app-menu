const categories = require("../data/db.json").categorias;

const getCategories = (req, res) => {
  res.status(200).json(categories);
};

const getCategoryById = (req, res) => {
  const { id } = req.params;
  const category = categories.find(
    (cat) => cat.nombre.toLowerCase() === id.toLowerCase()
  );

  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404).json({ message: "Categoría no encontrada" });
  }
};

module.exports = { getCategories, getCategoryById };
