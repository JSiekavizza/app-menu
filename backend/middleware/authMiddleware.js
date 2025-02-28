const jwt = require("jsonwebtoken");

const SECRET_KEY = "secreto_super_seguro";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log("Token recibido en el backend:", token); // 🔍 Verifica el token recibido

  if (!token) {
    return res
      .status(403)
      .json({ message: "🔒 Acceso denegado. Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY); // 🔑 Verifica el token
    req.user = decoded;
    next(); // ✅ Continúa con la ejecución de la ruta
  } catch (error) {
    return res.status(403).json({ message: "🔴 Token inválido." });
  }
};

module.exports = { verifyToken };
