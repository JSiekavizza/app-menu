import React, { useEffect, useState } from "react";
import API_BASE_URL from "../../../apiConfig";
import axios from "axios";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/orders`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (id, status) => {
    try {
      await axios.put(`${API_BASE_URL}/orders/${id}`, { status });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Error al actualizar el estado del pedido:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Pedidos</h1>
      <div className="mt-4">
        {orders.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Productos</th>
                <th className="border p-2">Total</th>
                <th className="border p-2">Estado</th>
                <th className="border p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border">
                  <td className="p-2">{order.id}</td>
                  <td className="p-2">
                    {order.items.map((item) => item.name).join(", ")}
                  </td>
                  <td className="p-2">${order.total}.000</td>
                  <td className="p-2">{order.status}</td>
                  <td className="p-2">
                    <button
                      className="px-3 py-1 bg-green-500 text-white rounded"
                      onClick={() => updateOrderStatus(order.id, "Completado")}
                    >
                      Marcar como Completado
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay pedidos pendientes.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
