const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken"); // Importar JWT
const bcrypt = require("bcryptjs"); //  Para encriptar contraseñas

const dbPath = path.join(__dirname, "../data/db.json");
const SECRET_KEY = "secreto_super_seguro"; // Clave para firmar el token

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

    const user = db.users.find((u) => u.username === username);

    if (!user) {
      return res.status(401).json({ message: "🔴 Credenciales incorrectas" });
    }

    // Comparar la contraseña ingresada con la encriptada
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "🔴 Credenciales incorrectas" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "🔴 Credenciales incorrectas" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );
    console.log("Token generado:", token);

    res.json({ message: "✅ Login exitoso", token, user });
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { loginUser };
