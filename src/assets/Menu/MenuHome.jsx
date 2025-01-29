import React, { useEffect, useState } from "react";
import { useTemplate } from "../Components/Context/TemplateProvider.jsx"; // Contexto para obtener el template activo
import Template1 from "../Components/Templates/Template1.jsx";
import Template2 from "../Components/Templates/Template2.jsx";
import Template3 from "../Components/Templates/Template3.jsx";
import API_BASE_URL from "../../apiConfig";

const MenuHome = () => {
  const { template } = useTemplate(); // Obtener el template activo desde el contexto
  const [categories, setCategories] = useState([]); // Categorías asociadas al template activo

  useEffect(() => {
    // Función para obtener las categorías del template activo
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/templates/${template}`); // Obtener categorías del template activo
        if (!response.ok) throw new Error("Error al obtener categorías");
        const data = await response.json();
        setCategories(data.categorias); // Actualizar el estado con las categorías
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    fetchCategories();
  }, [template]); // Vuelve a cargar cuando el template activo cambie

  // Renderizar dinámicamente la plantilla activa
  const renderTemplate = () => {
    switch (template) {
      case 1:
        return <Template1 categories={categories} />;
      case 2:
        return <Template2 categories={categories} />;
      case 3:
        return <Template3 categories={categories} />;
      default:
        return <div>Error: No se encontró el template activo.</div>;
    }
  };

  return <>{renderTemplate()}</>;
};

export default MenuHome;
