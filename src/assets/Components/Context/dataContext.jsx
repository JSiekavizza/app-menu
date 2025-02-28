import { createContext, useState, useEffect } from "react";
import API_BASE_URL from "../../../apiConfig.js";
import axios from "axios";

export const dataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState({ categorias: [] });
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener el template activo
        const configResponse = await axios.get(`${API_BASE_URL}/config`);
        const activeTemplate = configResponse.data.activeTemplate;

        // Obtener categorías del template activo
        const templateResponse = await axios.get(
          `${API_BASE_URL}/templates/${activeTemplate}`
        );
        setData({ categorias: templateResponse.data.categorias });
      } catch (error) {
        console.error("Error al cargar datos del contexto:", error);
      }
    };

    fetchData();
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
