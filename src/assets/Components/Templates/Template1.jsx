import React from "react";
import Header from "../Header";
import Footer from "../Footer";

const Template1 = ({ categories }) => {
  return (
    <>
      <Header />
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {categories.map((category) => (
          <div key={category.title} className="relative group">
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-40 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg group-hover:bg-opacity-70">
              <h2 className="text-white font-bold text-xl">{category.title}</h2>
            </div>
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
};

export default Template1;
