import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dataContext } from "../Context/dataContext";

import Header from "../Header.jsx";
import Promo1 from "../Promo/Promo1";

const ProductoDetail = () => {
  const { id } = useParams(); // Obtener el id del producto desde la URL
  const { data, buyProducts } = useContext(dataContext); // Obtener el contexto de datos
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    // Validar que data y data.categorias estén definidos
    if (data?.categorias) {
      const productoEncontrado = data.categorias
        .flatMap((categoria) => categoria.productos)
        .find((producto) => producto.id === id);

      setProducto(productoEncontrado);
    }
  }, [id, data]);

  if (!producto) {
    return <div>No se encontró el producto.</div>;
  }

  const categoria = data?.categorias?.find(
    (categoria) => categoria.nombre.toLowerCase() === producto?.categoria
  );

  const obtenerImagenBanner = () => {
    switch (producto.categoria) {
      case "pizzas":
        return "/bannerPromoPizza.png"; // Imagen de Pizza
      case "empanadas":
        return "/bannerPromoEmpanadas.png"; // Imagen de Empanadas
      case "bebidas":
        return "/bannerPromoBebidas.png"; // Imagen de Bebidas
      case "postres":
        return "/bannerPromoPostres.png"; // Imagen de Postres
      default:
        return "/defaultBanner.png"; // Imagen por defecto
    }
  };

  return (
    <>
      <Header />
      <Promo1
        bannerImage={obtenerImagenBanner()} // Se asegura de obtener la imagen correcta
        categoria={categoria?.nombre}
      />

      <section className="bg-yellow-500 body-font overflow-hidden mt-5">
        <div className="container p-3 mx-auto">
          <div className="lg:w-full bg-white mx-auto flex flex-wrap items-center rounded p-2">
            <img
              className="rounded-md"
              src={producto.img}
              alt={producto.name}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font tracking-widest">
                {producto.categoria} {/* Corregí esta parte */}
              </h2>
              <h1 className="text-2xl font-extrabold mb-1">{producto.name}</h1>

              <p className="leading-relaxed">
                Fam locavore kickstarter distillery. Mixtape chillwave tumeric
                sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
                juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
                seitan poutine tumeric. Gastropub blue bottle austin listicle
                pour-over, neutra jean shorts keytar banjo tattooed umami
                cardigan.
              </p>

              <div className="flex justify-between mx-3 my-3">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${producto.price}.000
                </span>
                <button
                  onClick={() => buyProducts(producto)}
                  className="flex text-black bg-yellow-500 py-2 px-6 rounded"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductoDetail;
