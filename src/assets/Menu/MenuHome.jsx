import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import CategoryBanner from "../Components/CategoryBanner.jsx";
import API_BASE_URL from "../../apiConfig";

const MenuHome = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Función para obtener categorías desde el template activo
    const fetchCategories = async () => {
      try {
        // Obtener el template activo desde el backend
        const configResponse = await fetch(`${API_BASE_URL}/config`);
        if (!configResponse.ok)
          throw new Error("Error al obtener configuración");
        const configData = await configResponse.json();

        // Obtener las categorías del template activo
        const templateResponse = await fetch(
          `${API_BASE_URL}/templates/${configData.activeTemplate}`
        );
        if (!templateResponse.ok)
          throw new Error("Error al obtener categorías");
        const templateData = await templateResponse.json();

        // Formatear categorías
        const formattedCategories = templateData.categorias.map((category) => ({
          title: category.nombre,
          image: `/banner-${category.nombre.toLowerCase()}.png`,
          link: `/menu-${category.nombre.toLowerCase()}`,
        }));

        setCategories(formattedCategories);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <Menu />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <CategoryBanner
            key={category.title}
            title={category.title}
            image={category.image}
            link={category.link}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuHome;
