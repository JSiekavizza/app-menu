import React from "react";
import useCart from "../hooks/useCart";

import CartItemCounter from "./CartItemCounter";
import { AiOutlineDelete } from "react-icons/ai";

const CartElements = () => {
  const { cart, removeFromCart } = useCart();

  return cart.map((producto) => (
    <div
      className="bg-white flex flex-col lg:flex-row items-center justify-between
       w-full rounded p-3 "
      key={producto.id}
    >
      <h2 className="text-center text-3xl font-extrabold p-2">
        {producto.name}
      </h2>
      <div className="rounded p-2 lg:rounded w-56 lg:w-1/2 ">
        <img
          className="rounded-md rounded-b-none w-full"
          src={producto.img}
          alt={producto.name}
        />
      </div>
      <div className="flex flex-col items-center lg:justify-between rounded-r-md w-full rounded-b rounded-t-none hover:border-black transition-all">
        <p>{producto.ingredientes}</p>
        <p>{producto.tamaño}</p>
        <h4 className="text-center mb-3">
          <p className="text-center text-xl font-bold mb-5 ">
            Valor: ${producto.price}.000
          </p>
          <span className="text-sm ">
            La confirmación de tu pedido se realiza sin pago ni envío de por
            medio. Tenemos Delivery propio.
          </span>
        </h4>
      </div>
      <div className="flex flex-col items-center justify-around w-full lg:w-1/2 p-3">
        <CartItemCounter producto={producto} />
        <p>Valor: $ {producto.price * producto.quanty}.000</p>
      </div>
      <a
        className="text-black hover:text-red-500 text-3xl 
         flex p-5 cursor-pointer"
        onClick={() => removeFromCart(producto.id)}
      >
        <AiOutlineDelete />
      </a>
    </div>
  ));
};

export default CartElements;
