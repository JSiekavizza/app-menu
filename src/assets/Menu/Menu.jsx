import { useContext } from "react";
import { dataContext } from "../Components/Context/dataContext";

import { Link } from "react-router-dom";

import TotalItems from "../Components/CartContent/TotalItems";
import { CiShoppingCart } from "react-icons/ci";

const Menu = () => {
  const { cart } = useContext(dataContext);

  return (
    <div className="bg-white flex items-center justify-between rounded ">
      <Link className="flex ml-4" to="/">
        <h1 className="font-bold">Logo Restaurante</h1>
        <h2 className="text-lg font-h2">Pedido Agil a la mesa</h2>
      </Link>
      <Link className="mr-3" to="/carrito">
        <div className="text-5xl">
          <CiShoppingCart className="" />
          {cart.length > 0 ? <TotalItems /> : null}
        </div>
      </Link>
    </div>
  );
};

export default Menu;
