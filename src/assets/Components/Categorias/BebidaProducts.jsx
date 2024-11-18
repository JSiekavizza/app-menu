import React from "react";
import { useContext } from "react";
import { dataContext } from "../Context/DataContext";
import { FaLongArrowAltLeft } from "react-icons/fa";

import { Link } from "react-router-dom";

import Menu from "../../Menu/Menu";

const BebidaProducts = () => {
  const { data, buyProducts } = useContext(dataContext);
  const bebidaCategoria = data.categorias?.find(
    (categoria) => categoria.nombre === "Bebidas"
  );

  if (!bebidaCategoria) {
    return <div>No se encontraron productos para Bebidas.</div>;
  }

  return (
    <>
      <Menu className="" />
      <Link className="flex flex-col items-center mt-5" to="/">
        <button className="flex items-center justify-around text-black bg-yellow-500  py-2 px-6 rounded">
          <FaLongArrowAltLeft className=" text-black mr-3" />
          Volver a Productos
        </button>
      </Link>
      <div className="bg-yellow-500  p-2 mt-5">
        <div className="flex justify-center ">
          <h2 className="text-3xl font-extrabold">Bebidas</h2>
        </div>
        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-2  w-full p-3">
          {bebidaCategoria.productos.map((producto) => (
            <div
              className="bg-white object-cover rounded  p-2 hover:p-2"
              key={producto.id}
            >
              <div className="bg-white flex flex-col object-cover w-full  p-2 hover:p-1">
                <img
                  className="rounded-md rounded-b-none h-auto"
                  src={producto.img}
                  alt={producto.name}
                />
                <Link to={`/producto/${producto.id}`}>
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-700  flex flex-col items-center rounded-r-md w-full rounded-b rounded-t-none hover:border-black transition-all">
                    <h3 className="text-xl font-bold ">{producto.name}</h3>
                    <p>{producto.tamaño}</p>
                    <h4 className="text-xl font-bold mb-5">
                      <p>Valor: ${producto.price}.000</p>
                      <p className="border border-black text-center text-sm rounded-md p-2 mt-3 hover:bg-yellow-500">
                        Ver detalles
                      </p>
                    </h4>
                  </div>
                </Link>
              </div>
              <div className="border border-t-0 border-x-0 border-black shadow-lg p-2 my-3">
                <p className="text-lg">
                  <span>{producto.ingredientes}</span>
                </p>
              </div>
              <button
                className="text-black bg-yellow-500 border  rounded shadow-xl px-2 py-1.5 mt-3 hover:border-black"
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

export default BebidaProducts;
