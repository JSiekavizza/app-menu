import React, { createContext, useState, useEffect } from "react";
import API_BASE_URL from "../../../apiConfig.js";

// Creamos el contexto una sola vez
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      setUser({ username: "admin", role: "admin" }); // Simulación de usuario autenticado
    }
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const text = await response.text(); // 🔎 Verifica la respuesta antes de parsear
      console.log("Respuesta del servidor (texto):", text);

      const data = JSON.parse(text);
      console.log("Respuesta del servidor (JSON):", data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setUser({ username: data.user.username, role: data.user.role });
        setToken(data.token);
        return true;
      } else {
        console.error("Error de autenticación:", data.message);
        return false;
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken("");
  };

  console.log("Usuario autenticado", user);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Exportamos `AuthProvider` como default y `AuthContext` como exportación nombrada
export { AuthContext };
export default AuthProvider;
