import React from "react";
import { useContext } from "react";
import { dataContext } from "../Components/Context/dataContext.jsx";

import { Link } from "react-router-dom";

import TotalItems from "../Components/CartContent/TotalItems.jsx";
import { CiShoppingCart } from "react-icons/ci";
import { PiHandPointingFill } from "react-icons/pi";

const Header = () => {
  const { cart } = useContext(dataContext);

  return (
    <header className="bg-white rounded-md p-4 flex justify-between items-center">
      <Link
        to="/"
        className="flex flex-col items-center font-bold text-5xl text-yellow-500 p-3"
      >
        <PiHandPointingFill />
        <div>
          <h2 className="text-gray-800 text-lg font-h2">
            Pedido Agil a la mesa
          </h2>
        </div>
      </Link>

      <nav>
        <Link className="" to="/carrito">
          <div className="text-5xl">
            <CiShoppingCart className="" />
            {cart.length > 0 ? <TotalItems /> : null}
          </div>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
