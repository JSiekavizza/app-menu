import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataProvider from "./assets/Components/Context/dataContext.jsx";
import { TemplateProvider } from "./assets/Components/Context/TemplateProvider.jsx";
import MenuHome from "./assets/Menu/MenuHome";
import CartContent from "./assets/Components/CartContent/CartContent";
import CategoryProducts from "./assets/Components/Categorias/CategoryProducts.jsx";
import ProductDetail from "./assets/Components/Productos/ProductDetail";

function App() {
  return (
    <>
      <TemplateProvider>
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
              <Route path="/menu/:category" element={<CategoryProducts />} />
              <Route path="/producto/:id" element={<ProductDetail />}></Route>
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </TemplateProvider>
    </>
  );
}

export default App;
