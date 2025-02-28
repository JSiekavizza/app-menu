<<<<<<< HEAD
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataProvider from "./assets/Components/Context/dataContext";

=======
import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./assets/Components/Context/AuthContext.jsx";
import { AuthProvider } from "./assets/Components/Context/AuthContext.jsx";
import DataProvider from "./assets/Components/Context/dataContext.jsx";
import { TemplateProvider } from "./assets/Components/Context/TemplateProvider.jsx";
import Dashboard from "./assets/Components/Dashboard/Dashboard.jsx";
import Login from "./assets/Components/Auth/Login.jsx";
>>>>>>> front-end
import MenuHome from "./assets/Menu/MenuHome";
import CartContent from "./assets/Components/CartContent/CartContent";
import CategoryProducts from "./assets/Components/Categorias/CategoryProducts.jsx";
import ProductDetail from "./assets/Components/Productos/ProductDetail";

const PrivateRoute = ({ children }) => {
  const { user, token } = useContext(AuthContext);
  return user && token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <AuthProvider>
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
                <Route path="/login" element={<Login />} />
                {/* Rutas protegidas */}
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </BrowserRouter>
          </DataProvider>
        </TemplateProvider>
      </AuthProvider>
    </>
  );
}

export default App;
