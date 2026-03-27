import React, { useContext, useState, useEffect } from "react";
import ShopContext from "../context/ShopContext";

const AnimeGrid = () => {
  const { products } = useContext(ShopContext);
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      setLoading(true);
      // Show 8 items for mobile and 16 items for laptop
      const itemCount = window.innerWidth < 768 ? 8 : 16;
      const shuffled = [...products]
        .sort(() => Math.random() - 0.5)
        .slice(0, itemCount);
      setTimeout(() => {
        setShuffledProducts(shuffled);
        setLoading(false);
      }, 1000);
    }
  }, [products]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2">
      {/* Skeleton Loader */}
      {loading
        ? Array.from({ length: window.innerWidth < 768 ? 8 : 16 }).map(
            (_, index) => (
              <div
                key={index}
                className="w-full h-40 md:h-48 bg-gray-200 animate-pulse rounded-lg"
              ></div>
            )
          )
        : shuffledProducts.map((product, index) => (
            <div
              key={product.id || index}
              className="w-full h-40 md:h-48 bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                animationDelay: `${(index % 4) * 0.1}s`,
                animationDuration: "0.6s",
              }}
            >
              <a
                href={product.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className="w-full h-full bg-cover bg-center opacity-80 hover:opacity-100 transition-opacity"
                  style={{ backgroundImage: `url(${product.img_url})` }}
                >
                  <div className="w-full h-full flex items-end p-2 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-center text-xs sm:text-sm md:text-lg font-bold text-[#f2de9b] bg-black/50 p-1 rounded-md">
                      {product.title || `Product ${index + 1}`}
                    </h3>
                  </div>
                </div>
              </a>
            </div>
          ))}
    </div>
  );
};

export default AnimeGrid;
