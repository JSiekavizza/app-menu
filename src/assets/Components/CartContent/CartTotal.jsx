import { useContext } from "react";
import { dataContext } from "../Context/dataContext";
import { IoLogoWhatsapp } from "react-icons/io";

import React from "react";

const CartTotal = () => {
  const { cart } = useContext(dataContext);

  const total = cart.reduce((acc, el) => acc + el.price * el.quanty, 0);

  return (
    <div className="bg-yellow-500 opacity-90 flex flex-col items-center rounded-md rounded-l-none w-56 lg:w-80 p-5 text-center hover:w-full transition-all mt-5 ">
      <button className="text-4xl font-bold">Realizar Pedido</button>
      <h2 className="text-black"></h2>
      <IoLogoWhatsapp className="text-3xl w-72" />
      <h3 className="text-black">Valor Total: ${total} .000</h3>
    </div>
  );
};

export default CartTotal;
