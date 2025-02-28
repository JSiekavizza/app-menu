import React, { useEffect, useState } from "react";
import API_BASE_URL from "../../../apiConfig";
import axios from "axios";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("Todos");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${API_BASE_URL}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
      }
    };

    fetchOrders();
  }, []);

  const editOrder = async (order) => {
    let updatedCart = [...order.cart];

    const modalContent = document.createElement("div");
    modalContent.innerHTML = `
    <div id="edit-order">
      ${updatedCart
        .map(
          (item, index) => `
        <div id="product-${index}" class="flex justify-between items-center mb-2">
          <span>${item.name}</span>
          <input type="number" id="quantity-${index}" value="${item.quanty}" min="1" class="border rounded p-1 w-16">
          <button id="remove-${index}" class="bg-red-500 text-white px-2 rounded">❌</button>
        </div>
      `
        )
        .join("")}
    </div>
    <button id="clear-order" class="bg-gray-500 text-white w-full py-2 mt-3 rounded">🗑️ Vaciar Pedido</button>
  `;

    const swalInstance = Swal.fire({
      title: "Editar Pedido",
      html: modalContent,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Guardar Cambios",
      didOpen: () => {
        updatedCart.forEach((item, index) => {
          document
            .getElementById(`quantity-${index}`)
            .addEventListener("input", (e) => {
              updatedCart[index].quanty = parseInt(e.target.value);
            });

          document
            .getElementById(`remove-${index}`)
            .addEventListener("click", () => {
              updatedCart = updatedCart.filter((_, i) => i !== index);
              swalInstance.close();
              editOrder({ ...order, cart: updatedCart });
            });
        });

        document.getElementById("clear-order").addEventListener("click", () => {
          updatedCart = [];
          swalInstance.close();
          editOrder({ ...order, cart: updatedCart });
        });
      },
      preConfirm: () => updatedCart,
    });

    const result = await swalInstance;

    if (!result.value) return;

    const newTotal = result.value.reduce(
      (acc, item) => acc + item.price * item.quanty,
      0
    );

    try {
      const token = localStorage.getItem("token"); // 🔥 Obtener token de autenticación
      if (!token) {
        Swal.fire(
          "Error",
          "No estás autenticado. Inicia sesión primero.",
          "error"
        );
        return;
      }

      const response = await axios.put(
        `${API_BASE_URL}/orders/${order.id}`,
        { cart: result.value, total: newTotal, status: order.status },
        { headers: { Authorization: `Bearer ${token}` } } // 🔑 Enviar token
      );

      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((o) =>
            o.id === order.id
              ? { ...o, cart: result.value, total: newTotal }
              : o
          )
        );
        Swal.fire("Éxito", "Pedido actualizado correctamente", "success");
      }
    } catch (error) {
      console.error("Error al actualizar el pedido:", error);
      Swal.fire("Error", "Hubo un problema al actualizar el pedido", "error");
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token"); // 🔑 Obtener el token guardado
      if (!token) {
        alert("No estás autenticado. Inicia sesión primero.");
        return;
      }

      const response = await axios.put(
        `${API_BASE_URL}/orders/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` }, // 🔥 Enviar el token en headers
        }
      );

      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === id ? { ...order, status } : order
          )
        );
        Swal.fire("¡Éxito!", "Estado del pedido actualizado.", "success");
      } else {
        console.error("Error al actualizar el estado del pedido");
      }
    } catch (error) {
      console.error("Error al actualizar el estado del pedido:", error);
    }
  };

  const deleteOrder = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar pedido?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token"); // 🔑 Obtener el token
        if (!token) {
          alert("No estás autenticado. Inicia sesión primero.");
          return;
        }

        await axios.delete(`${API_BASE_URL}/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` }, // 🔥 Enviar token en headers
        });

        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== id)
        );
        Swal.fire("Eliminado", "El pedido ha sido eliminado.", "success");
      } catch (error) {
        console.error("Error al eliminar el pedido:", error);
      }
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "Todos") return true;
    return order.status === filter;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">📋 Pedidos</h1>

      {/* Botones de filtro */}
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            filter === "Todos" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("Todos")}
        >
          Todos
        </button>
        <button
          className={`px-4 py-2 rounded ${
            filter === "Pendiente" ? "bg-yellow-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("Pendiente")}
        >
          Pendientes
        </button>
        <button
          className={`px-4 py-2 rounded ${
            filter === "Completado" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("Completado")}
        >
          Completados
        </button>
      </div>

      {/* Tabla de pedidos filtrados */}
      <div className="overflow-x-auto">
        {filteredOrders.length > 0 ? (
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
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border">
                  <td className="p-2">{order.id}</td>
                  <td className="p-2">
                    {order.cart
                      .map((item) => `${item.name} (${item.quanty})`)
                      .join(", ")}
                  </td>
                  <td className="p-2">${order.total}.000</td>
                  <td className="p-2">
                    <span
                      className={`px-3 py-1 rounded text-white ${
                        order.status === "Pendiente"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-2 flex gap-2">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                      onClick={() => editOrder(order)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="px-3 py-1 bg-green-500 text-white rounded"
                      onClick={() => updateOrderStatus(order.id, "Completado")}
                    >
                      ✅ Completar
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded"
                      onClick={() => deleteOrder(order.id)}
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center">
            No hay pedidos en esta categoría.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
