import React from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { dataContext } from "../Context/dataContext";
import Header from "../Header.jsx";

const CategoryProducts = () => {
  const { category } = useParams(); // Obtener la categoría desde la URL
  const { data, buyProducts } = useContext(dataContext);

  // Buscar la categoría seleccionada
  const selectedCategory = data.categorias?.find(
    (cat) => cat.nombre.toLowerCase() === category.toLowerCase()
  );

  if (!selectedCategory) {
    return <div>No se encontraron productos para la categoría {category}.</div>;
  }
  return (
    <>
      <Header />
      <div className="bg-white p-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          Productos de {selectedCategory.nombre}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedCategory.productos.map((producto) => (
            <div
              key={producto.id}
              className="p-4 border rounded shadow hover:shadow-lg transition"
            >
              <img
                src={producto.img}
                alt={producto.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="font-bold text-lg mt-2">{producto.name}</h3>
              <p className="text-gray-600">{producto.ingredientes}</p>
              <p className="text-green-600 font-bold">${producto.price}.000</p>
              <button
                className="bg-yellow-500 text-black py-2 px-4 mt-4 rounded hover:bg-yellow-600 transition"
                onClick={() => buyProducts(producto)}
              >
                Añadir al Carrito
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryProducts;
