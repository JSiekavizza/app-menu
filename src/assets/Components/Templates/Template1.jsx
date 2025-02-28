import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Link } from "react-router-dom";

const Template1 = ({ categories }) => {
  return (
    <>
      <Header />
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {categories.map((category) => (
          <Link
            to={`/menu/${category.nombre.toLowerCase()}`}
            key={category.nombre}
            className="relative group"
          >
            <img
              src={
                category.image || `/banner-${category.nombre.toLowerCase()}.png`
              }
              alt={category.nombre}
              className="w-full h-40 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg group-hover:bg-opacity-70 transition-all">
              <h2 className="text-white font-bold text-xl">
                {category.nombre}
              </h2>
            </div>
          </Link>
        ))}
      </main>
      <Footer />
    </>
  );
};

export default Template1;
