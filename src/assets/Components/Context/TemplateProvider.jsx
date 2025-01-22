import React, { createContext, useContext, useState, useEffect } from "react";

// Crear contexto
const TemplateContext = createContext();

// Proveedor de plantillas
export const TemplateProvider = ({ children }) => {
  const [template, setTemplate] = useState(1); // Por defecto Plantilla 1

  // Simular carga desde db.json
  useEffect(() => {
    // Aquí cargarías la configuración desde tu backend o db.json
    const config = { template: 1 }; // Simulación
    setTemplate(config.template);
  }, []);

  return (
    <TemplateContext.Provider value={{ template, setTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
};

// Hook para usar el contexto
export const useTemplate = () => useContext(TemplateContext);
