import React from "react";
import Menu from "./Menu";
import CategoryBanner from "../Components/CategoryBanner";

const MenuHome = () => {
  const categories = [
    {
      title: "Pizzas",
      image: "/imagenes/muzzarella.jpg",
      link: "/menu-pizzas",
    },
    {
      title: "Empanadas",
      image: "/imagenes/empanada_carne.jpg",
      link: "/menu-empanadas",
    },
    {
      title: "Bebidas",
      image: "/imagenes/agua.jpg",
      link: "/menu-bebidas",
    },
    {
      title: "Postres",
      image: "/imagenes/almendrado.jpg",
      link: "/menu-postres",
    },
  ];

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
