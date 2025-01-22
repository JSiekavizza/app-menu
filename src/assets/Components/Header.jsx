import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">Mi Restaurante</div>
      <input
        type="text"
        placeholder="Buscar..."
        className="px-2 py-1 rounded border"
      />
      <nav>
        <a href="/" className="px-3">
          Inicio
        </a>
        <a href="/menu" className="px-3">
          Categorías
        </a>
        <a href="/carrito" className="px-3">
          Carrito
        </a>
      </nav>
    </header>
  );
};

export default Header;
