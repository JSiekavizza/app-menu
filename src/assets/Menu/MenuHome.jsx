import React from "react";
import Menu from "./Menu";
import PizzaBanner from "../Components/Categorias/PizzaBanner";
import EmpanadasBanner from "../Components/Categorias/EmpanadasBanner";
import BebidasBanner from "../Components/Categorias/BebidasBanner";
import PostresBanner from "../Components/Categorias/PostresBanner";

const MenuHome = () => {
  return (
    <div>
      <Menu />
      <PizzaBanner />
      <EmpanadasBanner />
      <BebidasBanner />
      <PostresBanner />
    </div>
  );
};

export default MenuHome;
