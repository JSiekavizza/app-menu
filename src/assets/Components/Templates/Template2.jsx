import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const Template2 = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    categories.length > 0 ? categories[0] : null
  );

  return (
    <>
      <Header />
      <div className="flex">
        {/* Barra lateral */}
        <aside className="w-1/4 bg-yellow-400 p-4 border-r mt-5">
          <h2 className="text-xl font-bold mb-4">Categorías</h2>
          <ul>
            {categories.map((category) => (
              <li
                key={category.nombre}
                className={`p-2 cursor-pointer rounded ${
                  selectedCategory?.nombre === category.nombre
                    ? "bg-white text-yellow-500"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.nombre}
              </li>
            ))}
          </ul>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 p-4">
          {selectedCategory ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                {selectedCategory.nombre}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedCategory.productos.map((producto) => (
                  <div
                    key={producto.id}
                    className="bg-white p-4 border rounded shadow hover:shadow-lg transition"
                  >
                    <img
                      src={producto.img}
                      alt={producto.name}
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <h3 className="font-bold text-lg mt-2">{producto.name}</h3>
                    <p className="text-gray-600">{producto.ingredientes}</p>
                    <p className="text-green-600 font-bold">
                      ${producto.price}.000
                    </p>
                    <div className="mt-4 flex justify-between">
                      {/* Botón para ver detalles del producto */}
                      <Link
                        to={`/producto/${producto.id}`}
                        className="text-blue-500 hover:underline"
                      >
                        Ver Detalles
                      </Link>
                      {/* Botón para ir a la categoría específica */}
                      <Link
                        to={`/menu/${selectedCategory.nombre.toLowerCase()}`}
                        className="text-black hover:underline"
                      >
                        Ver Más
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>Selecciona una categoría para ver los productos.</p>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Template2;
