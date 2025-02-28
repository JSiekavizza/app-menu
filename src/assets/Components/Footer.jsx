import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center p-4 mt-4">
      <p>&copy; 2025 Mi Restaurante. Todos los derechos reservados.</p>
      <p>Horario: 9 AM - 10 PM | Tel: (555) 123-4567</p>
      <p className="text-yellow-200 mb-5">
        Ingresa a la plataforma Demo de Gestion de pedidos Aqui:
      </p>
      <Link
        to="/login"
        target="_blank"
        className="bg-orange-600 rounded-md p-1 px-5 "
      >
        DASHBOARD
      </Link>
    </footer>
  );
};

export default Footer;
