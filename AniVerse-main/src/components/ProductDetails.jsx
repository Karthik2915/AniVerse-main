import React, { useContext } from "react";
import ShopContext from "../context/ShopContext.jsx";

const ProductDetails = (product, index) => {
  //   const { products } = useContext(ShopContext);

  return (
    <div key={index} style={{ transitionDelay: `${index * 100}ms` }}>
      <h3 className="text-2xl text-[#9ca081] font-semibold mb-2">
        {product.title}
      </h3>
      <img src={product.img_url} alt={product.title} className="w-40 h-60" />
      <p>{product.synopsis}</p>
      <span>{product.genre.join(" ")}</span>
      <a href={product.link} target="_blank" rel="noopener noreferrer">
        More Info
      </a>
    </div>
  );
};

export default ProductDetails;
