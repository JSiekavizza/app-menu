import React from "react";

const Promo1 = ({ bannerImage, categoria }) => {
  return (
    <div>
      <div className="">
        <div
          className="bg-yellow-500 flex items-center justify-start lg:justify-center w-full h-72 bg-center content-box bg-cover rounded-md"
          style={{
            backgroundImage: `url(${bannerImage})`,
            backgroundRepeat: "no-repeat",
            width: "100%",
          }}
        >
          <div className="bg-yellow-500 opacity-80 flex flex-col items-center rounded-r-md w-56 lg:w-80 lg:rounded hover:w-full transition-all">
            <div className="bg-white  rounded rounded-t-none px-2 justify-center">
              <h2 className="text-black text-xl">{categoria}</h2>
            </div>
            <h2 className="text-3xl font-extrabold">Promo</h2>
            <h3 className="text-5xl font-extrabold">Combo</h3>
            <h3 className="text-xl font-bold">Familiar</h3>
            <h4 className=" text-center">Incluye Gaseosa tamaño grande.</h4>
            <h4 className="text-xl font-bold mb-3">desde $29.000</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promo1;
