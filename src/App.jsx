import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataProvider from "./assets/Components/Context/DataContext";

import MenuHome from "./assets/Menu/MenuHome";
import CartContent from "./assets/Components/CartContent/CartContent";
import PizzaProducts from "./assets/Components/Categorias/PizzaProducts";
import EmpanadaProducts from "./assets/Components/Categorias/EmpanadaProducts";
import BebidaProducts from "./assets/Components/Categorias/BebidaProducts";
import PostreProducts from "./assets/Components/Categorias/PostreProducts";
import ProductDetail from "./assets/Components/Productos/ProductDetail";

function App() {
  return (
    <>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <div className="bg-yellow-500 min-h-full p-3">
                  <MenuHome />
                </div>
              }
            />
            <Route path="/carrito" element={<CartContent />}></Route>
            <Route path="/menu-pizzas" element={<PizzaProducts />}></Route>
            <Route
              path="/menu-empanadas"
              element={<EmpanadaProducts />}
            ></Route>
            <Route path="/menu-bebidas" element={<BebidaProducts />}></Route>
            <Route path="/menu-postres" element={<PostreProducts />}></Route>
            <Route path="/producto/:id" element={<ProductDetail />}></Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </>
  );
}

export default App;
