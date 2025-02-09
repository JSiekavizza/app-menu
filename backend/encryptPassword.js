const bcrypt = require("bcryptjs");

const passwordPlano = "123456"; // 🔑 La contraseña original
const salt = bcrypt.genSaltSync(10);
const passwordEncriptado = bcrypt.hashSync(passwordPlano, salt);

console.log("Contraseña encriptada:", passwordEncriptado);
