import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const dataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState({ categorias: [] });
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios("./Data/db.json").then((res) => setData(res.data));
  }, []);

  const buyProducts = (producto) => {
    const productExist = cart.find((item) => item.id === producto.id);
    console.log(productExist);

    if (productExist) {
      setCart(
        cart.map((item) =>
          item.id === producto.id
            ? { ...item, quanty: item.quanty + 1 } // Incrementar la cantidad
            : item
        )
      );
    } else {
      setCart([...cart, { ...producto, quanty: 1 }]);
    }
  };

  return (
    <dataContext.Provider value={{ data, cart, setCart, buyProducts }}>
      {children}
    </dataContext.Provider>
  );
};

export default DataProvider;
