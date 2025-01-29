import { useContext } from "react";
import { dataContext } from "../Context/dataContext.jsx";
import { IoLogoWhatsapp } from "react-icons/io";
import API_BASE_URL from "../../../apiConfig";
import axios from "axios";
import React from "react";

const CartTotal = () => {
  const { cart, setCart } = useContext(dataContext);
  const total = cart.reduce((acc, el) => acc + el.price * el.quanty, 0);

  const handleOrder = async () => {
    if (cart.length === 0) return alert("El carrito está vacío");

    try {
      const response = await axios.post(`${API_BASE_URL}/orders`, {
        cart,
        total,
      });

      alert("Pedido realizado con éxito!");
      setCart([]); // Vaciar carrito después del pedido
    } catch (error) {
      console.error("Error al realizar el pedido:", error);
      alert("Hubo un error al procesar tu pedido.");
    }
  };

  return (
    <div className="bg-yellow-500 opacity-90 flex flex-col items-center rounded-md rounded-l-none w-56 lg:w-80 p-5 text-center hover:w-full transition-all mt-5">
      <button onClick={handleOrder} className="text-4xl font-bold">
        Realizar Pedido
      </button>
      <IoLogoWhatsapp className="text-3xl w-72" />
      <h3 className="text-black">Valor Total: ${total} .000</h3>
    </div>
  );
};

export default CartTotal;
