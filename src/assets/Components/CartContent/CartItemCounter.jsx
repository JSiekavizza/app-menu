import React from "react";
import { useContext } from "react";
import { dataContext } from "../Context/dataContext";

const CartItemCounter = ({ producto }) => {
  const { cart, setCart, buyProducts } = useContext(dataContext);

  const decrese = () => {
    const productExist = cart.find((item) => item.id === producto.id);

    productExist.quanty !== 1 &&
      setCart(
        cart.map((item) =>
          item.id === producto.id
            ? { ...producto, quanty: productExist.quanty - 1 }
            : item
        )
      );
  };
  return (
    <>
      <div className="flex items-center justify-between w-56">
        <p
          className="bg-white text-black cursor-pointer rounded-xl p-2"
          onClick={decrese}
        >
          -
        </p>
        <p>{producto.quanty}</p>
        <p
          className="bg-white text-black cursor-pointer rounded-xl p-2"
          onClick={() => buyProducts(producto)}
        >
          +
        </p>
      </div>
    </>
  );
};

export default CartItemCounter;
