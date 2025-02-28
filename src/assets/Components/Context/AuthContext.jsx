import React, { createContext, useState, useEffect } from "react";
import API_BASE_URL from "../../../apiConfig.js";

// Creamos el contexto una sola vez
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) setUser(storedUser);
    }
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("🔑 Token recibido del backend:", data.token);
      console.log("🟢 Usuario autenticado (datos originales):", data.user);

      if (response.ok) {
        localStorage.setItem("token", data.token);

        const cleanUser = {
          id: data.user.id,
          username: data.user.username,
          role: data.user.role,
        };

        setUser(cleanUser);
        setToken(data.token);

        console.log("✅ Usuario autenticado (después de limpiar):", cleanUser);
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
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
