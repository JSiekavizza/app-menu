import React, { createContext, useContext, useState, useEffect } from "react";
import API_BASE_URL from "../../../apiConfig.js";

// Crear contexto
const TemplateContext = createContext();

// Proveedor de plantillas
export const TemplateProvider = ({ children }) => {
  const [template, setTemplate] = useState(1); // Por defecto Plantilla 1

  // Obtener configuración del backend
  useEffect(() => {
    const fetchTemplateConfig = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/config`);
        if (!response.ok) throw new Error("Error al obtener configuración");
        const data = await response.json();
        setTemplate(data.activeTemplate); // Actualizar el template activo
      } catch (error) {
        console.error("Error al cargar el template activo:", error);
      }
    };

    fetchTemplateConfig();
  }, []);

  return (
    <TemplateContext.Provider value={{ template, setTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
};

// Hook para usar el contexto
export const useTemplate = () => useContext(TemplateContext);
