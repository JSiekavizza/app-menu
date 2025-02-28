import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData.username, formData.password);
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-80"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h2>
        <input
          type="text"
          name="username"
          placeholder="Usuario"
          className="w-full p-2 border rounded mb-2"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="w-full p-2 border rounded mb-2"
          onChange={handleChange}
        />
        <button className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600">
          Ingresar
        </button>
      </form>
      <div className="text-gray-400 mt-5">
        <p>Usuario: admin123</p>
        <p>Contraseña: 123456</p>
      </div>
    </div>
  );
};

export default Login;
