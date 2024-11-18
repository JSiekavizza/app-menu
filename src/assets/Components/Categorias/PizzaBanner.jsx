import React from "react";
import { Link } from "react-router-dom";
import BannerPizza from "/public/banner-pizza.png";

const PizzaBanner = () => {
  return (
    <div className="bg-white rounded mt-5 p-3">
      <div className="">
        <div
          className="bg-yellow-500 flex items-center justify-start lg:justify-center w-full h-72 bg-center content-box bg-cover rounded-md"
          style={{
            backgroundImage: `url(${BannerPizza})`,
            backgroundRepeat: "no-repeat",
            width: "100%",
          }}
        >
          <div className="bg-yellow-500 opacity-80 flex flex-col items-center rounded-r-md p-3 w-56 h-72 lg:w-80 lg:rounded hover:w-full transition-all">
            <div className="bg-white  rounded rounded-t-none px-2 justify-center">
              <h2 className="text-black text-xl">Pizza</h2>
            </div>
            <h3 className="text-5xl font-extrabold text-center">Para todos</h3>
            <h3 className="text-xl font-bold text-center">
              Tamaños: Personal, Mediana, Familia
            </h3>
            <h4 className=" text-center">Incluye Gaseosa tamaño grande.</h4>
            <h4 className="text-xl font-bold mb-3">desde $29.000</h4>
          </div>
        </div>
      </div>
      <Link className="flex flex-col justify-center " to="/menu-pizzas">
        <button className="text-black bg-white border border-yellow-500 rounded shadow-xl px-2 py-1.5 mt-3 hover:bg-yellow-500">
          Ver menu
        </button>
      </Link>
    </div>
  );
};

export default PizzaBanner;
