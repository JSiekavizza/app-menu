import React from "react";
import { useContext, useState } from "react";
import { dataContext } from "../Context/dataContext";

const Products = () => {
  const { data } = useContext(dataContext);

  if (!data.categorias || !Array.isArray(data.categorias)) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {data.categorias.map((categoria) => (
        <div key={categoria.nombre}>
          <h2>{categoria.nombre}</h2>
          <div>
            {categoria.productos.map((producto) => (
              <div key={producto.id}>
                <img src={producto.img} alt={producto.name} />
                <h3>{producto.name}</h3>
                <p>Precio: ${producto.price}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
