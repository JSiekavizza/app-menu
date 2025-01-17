let templates = [
  { id: 1, name: "Minimalista", active: true },
  { id: 2, name: "Moderna", active: false },
  { id: 3, name: "Clásica", active: false },
];

const getTemplates = (req, res) => {
  res.status(200).json(templates);
};

const updateTemplate = (req, res) => {
  const { id } = req.params;

  templates = templates.map((template) =>
    template.id === parseInt(id)
      ? { ...template, active: true }
      : { ...template, active: false }
  );

  res.status(200).json(templates);
};

module.exports = { getTemplates, updateTemplate };
