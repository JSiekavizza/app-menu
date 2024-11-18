import { useContext } from "react";
import { dataContext } from "../Context/DataContext";
import { Link } from "react-router-dom";

import { FaLongArrowAltLeft } from "react-icons/fa";

import Menu from "../../Menu/Menu";
import CartElements from "./CartElements";
import CartTotal from "./CartTotal";

const CartContent = () => {
  const { cart } = useContext(dataContext);

  return (
    <>
      <Menu />
      <Link className="flex flex-col items-center mt-5" to="/">
        <button className="flex items-center text-black bg-yellow-500  py-2 px-6 rounded">
          <FaLongArrowAltLeft className="mr-3" />
          Agregar mas productos
        </button>
      </Link>
      {cart.length > 0 ? (
        <>
          <div className="bg-yellow-500 flex flex-col items-center gap-5 justify-between p-5 mt-5 ">
            <CartElements />
            <div className="fixed  items-center w-full">
              <CartTotal />
            </div>
          </div>
        </>
      ) : (
        <h2 className="bg-black text-white text-center text-2xl p-3">
          Tu carrito esta vacio
        </h2>
      )}
    </>
  );
};

export default CartContent;
