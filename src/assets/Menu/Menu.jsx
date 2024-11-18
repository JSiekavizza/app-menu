import { useContext } from "react";
import { dataContext } from "../Components/Context/dataContext";

import { Link } from "react-router-dom";

import TotalItems from "../Components/CartContent/TotalItems";
import { CiShoppingCart } from "react-icons/ci";

const Menu = () => {
  const { cart } = useContext(dataContext);

  return (
    <div className="bg-white flex items-center justify-between rounded ">
      <div className="ml-3">
        <Link to="/">
          <img
            className="rounded-full h-24"
            src="/logo.jpg"
            alt="img-logo-pizza"
          ></img>
        </Link>
      </div>
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
