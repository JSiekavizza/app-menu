import { useContext } from "react";
import { dataContext } from "../Context/dataContext";

const TotalItems = () => {
  const { cart } = useContext(dataContext);

  const ItemsQuanty = cart.reduce((acc, el) => acc + el.quanty, 0);
  return (
    <span className="absolute bg-orange-600 rounded-full text-sm p-2">
      {ItemsQuanty}
    </span>
  );
};

export default TotalItems;
