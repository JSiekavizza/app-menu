const db = require("../data/db.json");

const loginUser = (req, res) => {
  const { username, password } = req.body;

  // Buscar el usuario en la base de datos simulada
  const user = db.users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  // Simulación de token (en una implementación real se usaría JWT)
  const token = `${user.username}-fake-token`;

  res.json({ message: "Login exitoso", token, user });
};

module.exports = { loginUser };
