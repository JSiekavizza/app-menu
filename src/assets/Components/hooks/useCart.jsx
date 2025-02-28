import { useContext } from "react";
import { dataContext } from "../Context/DataContext";

const useCart = () => {
  const { cart, setCart } = useContext(dataContext);

  const addToCart = (producto) => {
    const productExist = cart.find((item) => item.id === producto.id);

    if (productExist) {
      setCart(
        cart.map((item) =>
          item.id === producto.id ? { ...item, quanty: item.quanty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...producto, quanty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
  };
};

export default useCart;
