import React from "react";
import { Link } from "react-router-dom";

const CategoryBanner = ({ title, image, link }) => {
  return (
    <div className="p-4">
      <Link to={link} className="block group">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="rounded-lg object-cover w-full h-40 group-hover:opacity-90"
          />
          <h2 className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold bg-black bg-opacity-50 rounded-lg group-hover:bg-opacity-60">
            {title}
          </h2>
        </div>
      </Link>
    </div>
  );
};

export default CategoryBanner;
