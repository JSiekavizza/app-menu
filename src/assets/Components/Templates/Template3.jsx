import React from "react";
import { useContext } from "react";
import { dataContext } from "../Context/dataContext";

import Header from "../Header";
import Footer from "../Footer";

import { Link } from "react-router-dom";

const Template3 = ({ categories }) => {
  const { buyProducts } = useContext(dataContext);
  return (
    <>
      <Header />
      <main className="p-4">
        {categories.map((category) => (
          <section key={category.nombre} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{category.nombre}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.productos.map((producto) => (
                <div
                  key={producto.id}
                  className="bg-white p-4 border rounded shadow-lg hover:shadow-xl transition"
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
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-yellow-500 text-black py-2 px-4 mt-4 rounded hover:bg-yellow-600 transition"
                      onClick={() => buyProducts(producto)}
                    >
                      Añadir al Carrito
                    </button>

                    <Link
                      to={`/producto/${producto.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Ver Detalles
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
};

export default Template3;
