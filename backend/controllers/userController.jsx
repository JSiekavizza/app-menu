const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../data/db.json");

const loginUser = (req, res) => {
  const { username, password } = req.body;

  try {
    const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

    console.log(
      "🔎 Contenido de la base de datos después de la corrección:",
      db
    ); // ✅

    if (!db.users || !Array.isArray(db.users)) {
      return res
        .status(500)
        .json({ message: "⚠️ Base de datos no contiene usuarios" });
    }

    const user = db.users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return res.status(401).json({ message: "🔴 Credenciales incorrectas" });
    }

    const token = `${user.username}-fake-token`;

    res.json({ message: "✅ Login exitoso", token, user });
  } catch (error) {
    console.error("🔥 Error en el login:", error);
    res.status(500).json({ message: "⚠️ Error en el servidor" });
  }
};

module.exports = { loginUser };
